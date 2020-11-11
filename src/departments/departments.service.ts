import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Department } from './department.schema';
import { CreateDepartmentDto, DeleteDepartmentDto, QueryDepartmentDto, UpdateDepartmentDto } from './dto';
import { DepartmentVo } from './vo/department.vo';

export function transformToTree(list: Array<Department>): Array<DepartmentVo> {
  const itemMap: { [id: string]: DepartmentVo } = {};
  for (const each of list) {
    itemMap[each.id] = { ...each.toJSON(), children: [] };
  }

  for (const [id, item] of Object.entries(itemMap)) {
    if (item.parentId && itemMap[item.parentId]) {
      itemMap[item.parentId].children.push(itemMap[id]);
    }
  }

  return Object.values(itemMap).filter((each) => !each.parentId || !itemMap[each.parentId]);
}

@Injectable()
export class DepartmentsService {
  constructor(@InjectModel('Department') private departmentModel: Model<Department>) {}

  async findDepartments(query: QueryDepartmentDto) {
    const departments = await this.departmentModel.find(query);
    //转为树形结构
    return transformToTree(departments);
  }

  private async findParent(id: string): Promise<Department | undefined> {
    return this.departmentModel.findOne({ id }).exec();
  }

  async findOne(id: string): Promise<Department | undefined> {
    return this.departmentModel.findOne({ id }).populate('supervisorInfo').populate('membersInfo').exec();
  }

  async create(createDepartmentDto: CreateDepartmentDto) {
    if (createDepartmentDto.parentId) {
      const parent = await this.findParent(createDepartmentDto.parentId);
      if (!parent) {
        throw new HttpException('不存在的parentId', HttpStatus.BAD_REQUEST);
      }
      const { idPath, namePath, id, name } = parent;

      const createdDepartment = new this.departmentModel({
        ...createDepartmentDto,
        parentName: name,
        idPath: [...idPath, id],
        namePath: [...namePath, name],
      });
      createdDepartment.members = [createDepartmentDto.supervisor];
      createdDepartment.save();
    } else {
      const createdDepartment = new this.departmentModel(createDepartmentDto);
      createdDepartment.members = [createDepartmentDto.supervisor];
      createdDepartment.save();
    }
  }

  async updateOne(updateDepartmentDto: UpdateDepartmentDto) {
    const { id } = updateDepartmentDto;
    if (updateDepartmentDto.supervisor) {
      await this.addMembers(id, [updateDepartmentDto.supervisor]);
    }
    await this.departmentModel.updateOne({ id }, updateDepartmentDto);
  }

  async deleteOne(deleteDepartmentDto: DeleteDepartmentDto) {
    const { id } = deleteDepartmentDto;
    await this.departmentModel.deleteMany({ $or: [{ id }, { idPath: id }] });
  }

  async findMembers(id: string) {
    const department = await this.departmentModel.findOne({ id }).populate('membersInfo').exec();
    return department.members;
  }

  async addMembers(id: string, members: Array<string>) {
    await this.departmentModel.updateOne({ id }, { $addToSet: { members: { $each: members } } });
  }

  async removeMember(id: string, member: string) {
    await this.departmentModel.updateOne({ id }, { $pull: { members: member } });
  }
}
