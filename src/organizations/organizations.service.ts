import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountsService } from 'src/accounts/accounts.service';
import { VersionsService } from 'src/versions/versions.service';

import {
  CreateOrganizationDto,
  DeleteOrganizationDto,
  QueryOrganizationDto,
  UpdateOrganizationDto,
} from './dto';
import { Organization } from './organization.schema';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectModel('Organization') private organizationModel: Model<Organization>,
    @Inject(forwardRef(() => AccountsService))
    private readonly accountsService: AccountsService,
    private readonly versionsService: VersionsService,
  ) {}

  async create(
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    const createdOrganization = new this.organizationModel(
      createOrganizationDto,
    );
    const organizationId = createdOrganization.id;
    const { supervisorId, versionId } = createOrganizationDto;
    const version = await this.versionsService.findOne(versionId);
    const { roleId } = version;
    this.accountsService.joinOrganization(supervisorId, organizationId, [
      roleId,
    ]);

    return createdOrganization.save();
  }

  async updateOne(updateOrganizationDto: UpdateOrganizationDto) {
    const {
      id,
      supervisorId: newSupervisorId,
      versionId: newVersionId,
    } = updateOrganizationDto;
    const organization = await this.findOne(id);
    const {
      supervisorId: oldSupervisorId,
      versionId: oldVersionId,
    } = organization;

    if (
      (newVersionId && newVersionId !== oldVersionId) || //修改版本
      (newSupervisorId && newSupervisorId !== oldSupervisorId) //修改负责人
    ) {
      const oldVersion = await this.versionsService.findOne(oldVersionId);
      const oldRoleId = oldVersion.roleId;
      this.accountsService.removeRole(oldSupervisorId, id, oldRoleId); //移除之前的管理员角色

      //增加新的的管理员角色
      let newRoleId: string;
      if (newVersionId && newVersionId !== oldVersionId) {
        const newVersion = await this.versionsService.findOne(newVersionId);
        newRoleId = newVersion.roleId;
      }
      await this.accountsService.addRole(
        newSupervisorId ?? oldSupervisorId,
        id,
        newRoleId ?? oldRoleId,
      );
    }
    await this.organizationModel.updateOne({ id }, updateOrganizationDto);
  }

  async deleteOne(deleteOrganizationDto: DeleteOrganizationDto) {
    await this.organizationModel.deleteOne(deleteOrganizationDto);
    await this.accountsService.deleteOrganization(deleteOrganizationDto.id);
  }

  async findOne(id: string) {
    return this.organizationModel.findOne({ id });
  }

  async findAll(query: QueryOrganizationDto): Promise<Organization[]> {
    return this.organizationModel
      .find(query)
      .populate('supervisorInfo')
      .populate('versionInfo')
      .exec();
  }

  async addMember(id: string) {
    return this.organizationModel.updateOne(
      { id },
      { $inc: { totalMembers: 1 } },
    );
  }

  async removeMember(id: string) {
    return this.organizationModel.updateOne(
      { id },
      { $inc: { totalMembers: -1 } },
    );
  }
}
