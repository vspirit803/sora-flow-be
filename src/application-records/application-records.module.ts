import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ApplicationRecordSchema } from './application-record.schema';
import { ApplicationRecordsController } from './application-records.controller';
import { ApplicationRecordsService } from './application-records.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ApplicationRecord', schema: ApplicationRecordSchema },
    ]),
  ],
  controllers: [ApplicationRecordsController],
  providers: [ApplicationRecordsService],
})
export class ApplicationRecordsModule {}
