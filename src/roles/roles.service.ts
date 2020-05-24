import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateRoleDto, QueryRoleDto } from './dto';
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
    return this.roleModel.findOne({ _id: id }).exec();
  }
}
