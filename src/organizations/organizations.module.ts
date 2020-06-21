import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OperateLogsModule } from 'src/operate-logs/operate-logs.module';

import { OrganizationSchema } from './organization.schema';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Organization', schema: OrganizationSchema },
    ]),
    OperateLogsModule,
  ],
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
})
export class OrganizationsModule {}
