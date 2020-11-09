import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from 'src/tasks/tasks.module';

import { ApplicationRecordCollectionTaskSchema } from './application-record-collection-task.schema';
import { ApplicationRecordCollectionTasksController } from './application-record-collection-tasks.controller';
import { ApplicationRecordCollectionTasksService } from './application-record-collection-tasks.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'ApplicationRecordCollectionTask',
        schema: ApplicationRecordCollectionTaskSchema,
      },
    ]),
    TasksModule,
  ],
  providers: [ApplicationRecordCollectionTasksService],
  controllers: [ApplicationRecordCollectionTasksController],
})
export class ApplicationRecordCollectionTasksModule {}
