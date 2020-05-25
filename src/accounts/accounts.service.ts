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
    const createdAccount = new this.accountModel(createAccountDto);
    return createdAccount.save();
  }

  async updateOne(updateAccountDto: UpdateAccountDto) {
    const { id } = updateAccountDto;
    await this.accountModel.updateOne({ _id: id }, updateAccountDto);
  }

  async deleteOne(deleteAccountDto: DeleteAccountDto) {
    const { id } = deleteAccountDto;
    await this.accountModel.deleteOne({ _id: id });
  }

  async findAll(query: QueryAccountDto): Promise<Account[]> {
    return this.accountModel
      .find(query)
      .populate('role')
      .exec();
  }

  async findOneByNamePassword(
    name: string,
    password: string,
  ): Promise<Account | undefined> {
    return this.accountModel.findOne({ name, password }).exec();
  }

  async findOne(id: string): Promise<Account | undefined> {
    return this.accountModel.findOne({ _id: id }).exec();
  }
}
