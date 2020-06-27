import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  CreateMenuDto,
  DeleteMenuDto,
  QueryMenuDto,
  UpdateMenuDto,
} from './dto';
import { Menu } from './menu.schema';
import { MenuTreeItem, transformToTree } from './transformToTree';

@Injectable()
export class MenusService {
  constructor(@InjectModel('Menu') private menuModel: Model<Menu>) {}

  async findMenuTree(query: QueryMenuDto): Promise<MenuTreeItem[]> {
    return transformToTree(await this.findMenus(query));
  }

  async findMenus(query: QueryMenuDto): Promise<Menu[]> {
    const { id, name } = query;
    const condition = [];
    if (id) {
      condition.push({ id });
    }
    if (name) {
      condition.push({ $or: [{ name }, { namePath: name }] });
    }
    const menuItems = await this.menuModel
      .find(condition.length ? { $and: condition } : {})
      .exec();
    return menuItems;
  }

  async create(createMenuDto: CreateMenuDto) {
    if (createMenuDto.parentId) {
      const parent = await this.findOne(createMenuDto.parentId);
      if (!parent) {
        throw new HttpException('不存在的parentId', HttpStatus.BAD_REQUEST);
      }
      if (parent.type === 'item') {
        throw new HttpException(
          '不能给菜单项添加子菜单',
          HttpStatus.BAD_REQUEST,
        );
      }
      const { idPath, namePath, id, name } = parent;

      const createdMenu = new this.menuModel({
        ...createMenuDto,
        parentName: name,
        idPath: [...idPath, id],
        namePath: [...namePath, name],
      });
      createdMenu.save();
    } else {
      const createdMenu = new this.menuModel(createMenuDto);
      createdMenu.save();
    }
  }

  async deleteOne(deleteMenuDto: DeleteMenuDto) {
    const { id } = deleteMenuDto;
    await this.menuModel.deleteMany({ $or: [{ id }, { idPath: id }] });
  }

  async updateOne(updateMenuDto: UpdateMenuDto) {
    const { id, enable, ...others } = updateMenuDto;
    await this.menuModel.updateOne({ id }, others);
    if (enable !== undefined) {
      //enable/disable node and it's children
      await this.menuModel.updateMany(
        { $or: [{ id }, { idPath: id }] },
        { enable },
      );
    }
  }

  private async findOne(id: string): Promise<Menu | undefined> {
    return this.menuModel.findOne({ id }).exec();
  }
}
