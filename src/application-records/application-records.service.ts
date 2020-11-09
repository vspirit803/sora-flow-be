import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ApplicationRecord } from './application-record.schema';
import { CreateApplicationRecordDto, QueryApplicationRecordDto } from './dto';

@Injectable()
export class ApplicationRecordsService {
  constructor(
    @InjectModel('ApplicationRecord')
    private applicationRecordModel: Model<ApplicationRecord>,
  ) {}

  async findAll(query: QueryApplicationRecordDto): Promise<ApplicationRecord[]> {
    return this.applicationRecordModel
      .find(query, { organization: false, application: false })
      .populate('populatedAccount', { nickname: true })
      .exec();
  }

  async create(createApplicationRecordDto: CreateApplicationRecordDto): Promise<ApplicationRecord> {
    const createdApplicationRecord = new this.applicationRecordModel(createApplicationRecordDto);
    return createdApplicationRecord.save();
  }
}
