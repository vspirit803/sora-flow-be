import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TasksService } from 'src/tasks/tasks.service';

import { ApplicationRecordCollectionTask } from './application-record-collection-task.schema';
import {
  CreateApplicationRecordCollectionTaskDto,
  DeleteApplicationRecordCollectionTaskDto,
  QueryApplicationRecordCollectionTaskDto,
  UpdateApplicationRecordCollectionTaskDto,
} from './dto';

@Injectable()
export class ApplicationRecordCollectionTasksService {
  constructor(
    @InjectModel('ApplicationRecordCollectionTask')
    private applicationRecordCollectionTaskModel: Model<ApplicationRecordCollectionTask>,
    private readonly tasksService: TasksService,
  ) {}

  async create(createTaskDto: CreateApplicationRecordCollectionTaskDto) {
    const { application, organization, finalTime, reporters = [] } = createTaskDto;
    const createdTask = new this.applicationRecordCollectionTaskModel(createTaskDto);

    //为每一个reporter生成一个任务
    const tasks = await Promise.all(
      reporters.map((eachReporter) =>
        this.tasksService.create({
          organization,
          account: eachReporter,
          finalTime,
          type: 'ApplicationRecordCollection',
          status: 'processing',
          metadata: {
            application,
            applicationRecordCollectionTask: createdTask.id,
          },
        }),
      ),
    );

    createdTask.tasks = tasks.map((eachTask) => eachTask.id);
    return createdTask.save();
  }

  async find(query: QueryApplicationRecordCollectionTaskDto) {
    const {
      pagination: { page, size },
      sort: { key, order },
      ...others
    } = query;
    return this.applicationRecordCollectionTaskModel
      .find(others)
      .sort({ [key]: order === 'DESC' ? -1 : 1 })
      .skip((page - 1) * size)
      .limit(size);
  }

  async updateOne(updateTaskDto: UpdateApplicationRecordCollectionTaskDto) {
    const { id } = updateTaskDto;
    await this.applicationRecordCollectionTaskModel.updateOne({ id }, updateTaskDto);
  }

  async deleteOne(deleteTaskDto: DeleteApplicationRecordCollectionTaskDto) {
    await this.applicationRecordCollectionTaskModel.deleteOne(deleteTaskDto);
  }
}
