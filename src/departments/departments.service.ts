import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Department } from './department.schema';
import {
  CreateDepartmentDto,
  DeleteDepartmentDto,
  QueryDepartmentDto,
} from './dto';
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

  return Object.values(itemMap).filter(
    (each) => !each.parentId || !itemMap[each.parentId],
  );
}

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel('Department') private departmentModel: Model<Department>,
  ) {}

  async findDepartments(query: QueryDepartmentDto) {
    const departments = await this.departmentModel.find(query);
    //转为树形结构
    return transformToTree(departments);
  }

  private async findOne(id: string): Promise<Department | undefined> {
    return this.departmentModel.findOne({ id }).exec();
  }

  async create(createDepartmentDto: CreateDepartmentDto) {
    if (createDepartmentDto.parentId) {
      const parent = await this.findOne(createDepartmentDto.parentId);
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
      createdDepartment.save();
    } else {
      const createdDepartment = new this.departmentModel(createDepartmentDto);
      createdDepartment.save();
    }
  }

  async deleteOne(deleteDepartmentDto: DeleteDepartmentDto) {
    const { id } = deleteDepartmentDto;
    await this.departmentModel.deleteMany({ $or: [{ id }, { idPath: id }] });
  }
}
