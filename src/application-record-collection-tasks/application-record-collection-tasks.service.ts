import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const { application, organization, finalTime, title, reporters = [] } = createTaskDto;
    const createdTask = new this.applicationRecordCollectionTaskModel(createTaskDto);

    //为每一个reporter生成一个任务
    const tasks = await Promise.all(
      reporters.map((eachReporter) =>
        this.tasksService.create({
          organization,
          account: eachReporter,
          finalTime,
          type: 'ApplicationRecordReport',
          status: 'processing',
          metadata: {
            application,
            applicationRecordCollectionTask: createdTask.id,
            title,
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
      .populate('populatedTasks', { status: true })
      .sort({ [key]: order === 'DESC' ? -1 : 1 })
      .skip((page - 1) * size)
      .limit(size);
  }

  async findOneByUserId(applicationRecordCollectionTaskId: string, userId: string) {
    const applicationRecordCollectionTask = await this.applicationRecordCollectionTaskModel
      .findOne({ id: applicationRecordCollectionTaskId })
      .populate({
        path: 'populatedTasks',
        match: { account: userId },
        select: { id: true, status: true, metadata: true },
      })
      .populate('populatedPublisher', { id: true, name: true, nickname: true })
      .exec();
    if (!applicationRecordCollectionTask) {
      throw new HttpException('不存在的任务', HttpStatus.BAD_REQUEST);
    }
    const { tasks, ...others } = applicationRecordCollectionTask.toJSON();
    if (tasks.length === 0) {
      throw new HttpException('您没有该应用的填报任务', HttpStatus.BAD_REQUEST);
    }

    const [task] = tasks;
    return { ...others, task };
  }

  async updateOne(updateTaskDto: UpdateApplicationRecordCollectionTaskDto) {
    const { id } = updateTaskDto;
    await this.applicationRecordCollectionTaskModel.updateOne({ id }, updateTaskDto);
  }

  async deleteOne(deleteTaskDto: DeleteApplicationRecordCollectionTaskDto) {
    await this.applicationRecordCollectionTaskModel.deleteOne(deleteTaskDto);
  }
}
