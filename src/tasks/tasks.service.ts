import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateTaskDto, DeleteTaskDto, QueryTaskDto, UpdateTaskDto } from './dto';
import { Task } from './task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async find(query: QueryTaskDto) {
    const {
      pagination: { page, size },
      sort: { key, order },
      ...others
    } = query;
    return this.taskModel
      .find(others)
      .sort({ [key]: order === 'DESC' ? -1 : 1 })
      .skip((page - 1) * size)
      .limit(size);
  }

  async updateOne(updateTaskDto: UpdateTaskDto) {
    const { id } = updateTaskDto;
    await this.taskModel.updateOne({ id }, updateTaskDto);
  }

  async deleteOne(deleteTaskDto: DeleteTaskDto) {
    await this.taskModel.deleteOne(deleteTaskDto);
  }
}
