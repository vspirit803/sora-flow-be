import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { findItemsWrapper } from 'src/utils';

import { CreateOperateLogDto, QueryOperateLogDto } from './dto';
import { OperateLog } from './operate-log.schema';

@Injectable()
export class OperateLogsService {
  constructor(@InjectModel('OperateLog') private operateLogModel: Model<OperateLog>) {}

  async create(createOperateLogDto: CreateOperateLogDto): Promise<OperateLog> {
    const createdOperateLog = new this.operateLogModel(createOperateLogDto);
    return createdOperateLog.save();
  }

  async getCount() {
    const count = await this.operateLogModel.countDocuments({
      operateTarget: '菜单',
    });
    return count;
  }

  async find(query: QueryOperateLogDto) {
    const {
      pagination: { page, size },
      sort: { key, order },
      ...others
    } = query;

    return findItemsWrapper(this.operateLogModel, others, page, size, { [key]: order === 'DESC' ? -1 : 1 });
  }
}
