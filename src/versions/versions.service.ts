import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  CreateVersionDto,
  DeleteVersionDto,
  QueryVersionDto,
  UpdateVersionDto,
} from './dto';
import { Version } from './version.schema';

@Injectable()
export class VersionsService {
  constructor(@InjectModel('Version') private versionModel: Model<Version>) {}

  async create(createVersionDto: CreateVersionDto): Promise<Version> {
    const createdVersion = new this.versionModel(createVersionDto);
    return createdVersion.save();
  }

  async findAll(query: QueryVersionDto): Promise<Version[]> {
    return (
      this.versionModel
        .find(query)
        // .populate('authorizedOperationsList')
        .exec()
    );
  }

  async findOne(id: string): Promise<Version | undefined> {
    return this.versionModel.findOne({ id }).exec();
  }

  async updateOne(updateVersionDto: UpdateVersionDto) {
    const { id } = updateVersionDto;
    await this.versionModel.updateOne({ id }, updateVersionDto);
  }

  async deleteOne(deleteVersionDto: DeleteVersionDto) {
    await this.versionModel.deleteOne(deleteVersionDto);
  }
}
