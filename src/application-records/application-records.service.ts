import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TasksService } from 'src/tasks/tasks.service';

import { ApplicationRecord } from './application-record.schema';
import { CreateApplicationRecordDto, QueryApplicationRecordDto, UpdateApplicationRecordDto } from './dto';

@Injectable()
export class ApplicationRecordsService {
  constructor(
    @InjectModel('ApplicationRecord')
    private applicationRecordModel: Model<ApplicationRecord>,
    private readonly tasksService: TasksService,
  ) {}

  async findAll(query: QueryApplicationRecordDto): Promise<ApplicationRecord[]> {
    return this.applicationRecordModel
      .find(query, { organization: false, application: false })
      .populate('populatedAccount', { nickname: true })
      .exec();
  }

  async create(createApplicationRecordDto: CreateApplicationRecordDto): Promise<ApplicationRecord> {
    const { task, ...others } = createApplicationRecordDto;
    const createdApplicationRecord = new this.applicationRecordModel(others);
    if (task) {
      //若填写表单属于某个填表任务
      this.tasksService.updateOne({
        id: task,
        status: 'completed',
        metadata: { applicationRecord: createdApplicationRecord.id },
      });
    }
    return createdApplicationRecord.save();
  }

  async updateOne(updateApplicationRecordDto: UpdateApplicationRecordDto) {
    const { id, data, ...others } = updateApplicationRecordDto;
    await this.applicationRecordModel.updateOne({ id }, { ...others, data: data as Types.Map<any> });
  }
}
