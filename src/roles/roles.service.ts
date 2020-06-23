import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  CreateRoleDto,
  DeleteRoleDto,
  QueryRoleDto,
  UpdateRoleDto,
} from './dto';
import { Role } from './role.schema';

@Injectable()
export class RolesService {
  constructor(@InjectModel('Role') private roleModel: Model<Role>) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const createdRole = new this.roleModel(createRoleDto);
    return createdRole.save();
  }

  async findAll(query: QueryRoleDto): Promise<Role[]> {
    return this.roleModel.find(query).exec();
  }

  async findOne(id: string): Promise<Role | undefined> {
    return this.roleModel.findOne({ id }).exec();
  }

  async findByRoles(roles: Array<string>) {
    return this.roleModel
      .find({ id: { $in: roles } }, { authorizedOperations: true })
      .exec();
  }

  async updateOne(updateRoleDto: UpdateRoleDto) {
    const { id } = updateRoleDto;
    await this.roleModel.updateOne({ id }, updateRoleDto);
  }

  async deleteOne(deleteRoleDto: DeleteRoleDto) {
    await this.roleModel.deleteOne(deleteRoleDto);
  }
}
