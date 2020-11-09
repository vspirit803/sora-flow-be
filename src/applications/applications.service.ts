import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Application } from './application.schema';
import { CreateApplicationDto, DeleteApplicationDto, QueryApplicationDto, UpdateApplicationDto } from './dto';

@Injectable()
export class ApplicationsService {
  constructor(@InjectModel('Application') private applicationModel: Model<Application>) {}

  async findOne(id: string) {
    return await this.applicationModel
      .findOne({ id })
      .populate('populatedCreator', { nickname: true })
      .populate('populatedLastModifier', { nickname: true });
  }

  async findAll(query: QueryApplicationDto): Promise<Application[]> {
    return this.applicationModel.find(query).select({ formModel: false }).exec();
  }

  async create(createApplicationDto: CreateApplicationDto): Promise<Application> {
    const createdApplication = new this.applicationModel(createApplicationDto);
    return createdApplication.save();
  }

  async updateOne(updateApplicationDto: UpdateApplicationDto) {
    const { id } = updateApplicationDto;
    await this.applicationModel.updateOne({ id }, updateApplicationDto);
  }

  async deleteOne(deleteApplicationDto: DeleteApplicationDto) {
    await this.applicationModel.deleteOne(deleteApplicationDto);
  }
}
