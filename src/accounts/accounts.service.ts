import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './account.schema';
import { CreateAccountDto, QueryAccountDto } from './dto';

@Injectable()
export class AccountsService {
  constructor(@InjectModel('Account') private accountModel: Model<Account>) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const createdAccount = new this.accountModel(createAccountDto);
    return createdAccount.save();
  }

  async findAll(query: QueryAccountDto): Promise<Account[]> {
    return this.accountModel.find(query).exec();
  }

  async findOneByName(name: string): Promise<Account | undefined> {
    return this.accountModel.findOne({ name }).exec();
  }
  async findOne(id: string): Promise<Account | undefined> {
    return this.accountModel.findOne({ id }).exec();
  }
}
