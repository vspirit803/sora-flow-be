import { Injectable } from '@nestjs/common';
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
    // return 'success' as any;
  }

  async updateOne(updateOrganizationDto: UpdateOrganizationDto) {
    const { id } = updateOrganizationDto;
    await this.organizationModel.updateOne({ id }, updateOrganizationDto);
  }

  async deleteOne(deleteOrganizationDto: DeleteOrganizationDto) {
    await this.organizationModel.deleteOne(deleteOrganizationDto);
  }

  async findAll(query: QueryOrganizationDto): Promise<Organization[]> {
    return this.organizationModel.find(query).exec();
  }
}
