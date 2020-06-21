import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  CreateOrganizationDto,
  DeleteOrganizationDto,
  QueryOrganizationDto,
  UpdateOrganizationDto,
} from './dto';
import { Organization } from './organization.schema';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectModel('Organization') private organizationModel: Model<Organization>,
  ) {}

  async create(
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    const createdOrganization = new this.organizationModel(
      createOrganizationDto,
    );
    return createdOrganization.save();
  }

  async updateOne(updateOrganizationDto: UpdateOrganizationDto) {
    const { id } = updateOrganizationDto;
    await this.organizationModel.updateOne({ id }, updateOrganizationDto);
  }

  async deleteOne(deleteOrganizationDto: DeleteOrganizationDto) {
    await this.organizationModel.deleteOne(deleteOrganizationDto);
  }

  async findAll(query: QueryOrganizationDto): Promise<Organization[]> {
    return this.organizationModel.find(query).exec();
  }
}
