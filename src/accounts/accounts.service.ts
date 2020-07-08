import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Account } from './account.schema';
import {
  CreateAccountDto,
  DeleteAccountDto,
  QueryAccountDto,
  UpdateAccountDto,
} from './dto';

@Injectable()
export class AccountsService {
  constructor(@InjectModel('Account') private accountModel: Model<Account>) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const {
      organizationId,
      roles = [],
      organizations,
      ...others
    } = createAccountDto;
    const createdAccount = new this.accountModel(others);
    if (organizations) {
      createdAccount.organizations = organizations;
    } else {
      createdAccount.organizations = [
        {
          id: organizationId,
          roles,
        },
      ];
    }

    return createdAccount.save();
  }

  async updateOne(updateAccountDto: UpdateAccountDto);
  async updateOne(updateAccountDto: UpdateAccountDto, organizationId: string);
  async updateOne(updateAccountDto: UpdateAccountDto, organizationId?: string) {
    const { id, roles = [], ...others } = updateAccountDto;
    await this.accountModel.updateOne({ id }, others);
    //更新角色
    if (roles && organizationId) {
      await this.accountModel.updateOne(
        { id, 'organizations.id': organizationId },
        { $set: { 'organizations.$.roles': roles } },
      );
    }
  }

  /**
   * 指定账号加入指定组织
   * @param id 账号id
   * @param organizationId 组织id
   * @param roles 角色id列表
   */
  async joinOrganization(
    id: string,
    organizationId: string,
    roles: Array<string>,
  ) {
    await this.accountModel.updateOne(
      { id },
      { $addToSet: { organizations: { id: organizationId, roles } } },
    );
  }

  async deleteOne(deleteAccountDto: DeleteAccountDto) {
    await this.accountModel.deleteOne(deleteAccountDto);
  }

  async findAll(
    query: QueryAccountDto,
    organizationId?: string,
  ): Promise<Account[]> {
    if (!organizationId) {
      return this.accountModel
        .find(query)
        .select({ organizations: false })
        .exec();
      // return this.accountModel.find(query).populate('organizationList').exec();
    }
    return this.accountModel
      .aggregate([
        { $match: query },
        { $unwind: '$organizations' },
        {
          $match: { 'organizations.id': organizationId },
        },
        { $addFields: { roles: '$$ROOT.organizations.roles' } },
        {
          $project: {
            _id: false,
            __v: false,
            password: false,
            organizations: false,
          },
        },
        {
          $lookup: {
            from: 'roles',
            localField: 'roles',
            foreignField: 'id',
            as: 'roles',
          },
        },
        {
          $project: {
            'roles.authorizedOperations': false,
            'roles.organizationId': false,
            'roles.type': false,
            'roles.__v': false,
            'roles._id': false,
          },
        },
      ])
      .exec();
  }

  async findOneByNamePassword(
    name: string,
    password: string,
  ): Promise<Account | undefined> {
    return this.accountModel.findOne({ name, password }).exec();
  }

  async findOne(id: string): Promise<Account | undefined> {
    const account = await this.accountModel
      .findOne({ id })
      .populate('organizationList')
      .populate('organizationRolesList')
      .exec();
    return account;
  }
}
