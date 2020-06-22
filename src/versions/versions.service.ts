import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoleDto } from 'src/roles/dto';
import { RolesService } from 'src/roles/roles.service';

import {
  CreateVersionDto,
  DeleteVersionDto,
  QueryVersionDto,
  UpdateVersionDto,
} from './dto';
import { Version } from './version.schema';

@Injectable()
export class VersionsService {
  constructor(
    @InjectModel('Version') private versionModel: Model<Version>,
    private readonly rolesService: RolesService,
  ) {}

  async create(
    createVersionDto: CreateVersionDto,
    organizationId: string,
  ): Promise<Version> {
    const { authorizedOperations } = createVersionDto;
    const createRoleDto: CreateRoleDto = {
      name: 'admin',
      text: '管理员',
      authorizedOperations,
      organizationId,
      type: 'version',
    };
    const createdRole = await this.rolesService.create(createRoleDto);

    const createdVersion = new this.versionModel({
      name: createVersionDto.name,
      roleId: createdRole.id,
    });
    return createdVersion.save();
  }

  async findAll(query: QueryVersionDto): Promise<Version[]> {
    return this.versionModel.find(query).exec();
  }

  async findOne(id: string): Promise<Version | undefined> {
    return this.versionModel.findOne({ id }).exec();
  }

  async updateOne(updateVersionDto: UpdateVersionDto) {
    const { id, authorizedOperations, ...others } = updateVersionDto;
    await this.versionModel.updateOne({ id }, others);

    if (authorizedOperations) {
      const version = await this.findOne(id);
      const roleId = version.roleId;
      await this.rolesService.updateOne({ id: roleId, authorizedOperations });
    }
  }

  async deleteOne(deleteVersionDto: DeleteVersionDto) {
    await this.versionModel.deleteOne(deleteVersionDto);
  }
}
