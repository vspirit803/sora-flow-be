import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateOperateLogDto } from './dto';
import { OperateLog } from './operate-log.schema';

@Injectable()
export class OperateLogsService {
  constructor(
    @InjectModel('OperateLog') private operateLogModel: Model<OperateLog>,
  ) {}

  async create(createOperateLogDto: CreateOperateLogDto): Promise<OperateLog> {
    const createdOperateLog = new this.operateLogModel(createOperateLogDto);
    return createdOperateLog.save();
  }
}