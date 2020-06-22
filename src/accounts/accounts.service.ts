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

  async updateOne(updateAccountDto: UpdateAccountDto) {
    const { id } = updateAccountDto;
    await this.accountModel.updateOne({ id }, updateAccountDto);
    // const { id, organizations, ...others } = updateAccountDto;
    // await this.accountModel.updateOne({ id }, others);
    // if(organizations){

    // }
    // const { id } = updateAccountDto;
    // for (const key in organizationRoleMap) {
    //   const rolesList = organizationRoleMap[key];
    //   await this.accountModel.updateOne(
    //     { id },
    //     { ['organizationRoleMap.' + key]: rolesList },
    //   );
    // }
  }

  async deleteOne(deleteAccountDto: DeleteAccountDto) {
    await this.accountModel.deleteOne(deleteAccountDto);
  }

  async findAll(query: QueryAccountDto): Promise<Account[]> {
    return this.accountModel.find(query).populate('role').exec();
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
