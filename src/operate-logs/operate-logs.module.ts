import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OperateLogSchema } from './operate-log.schema';
import { OperateLogsController } from './operate-logs.controller';
import { OperateLogsService } from './operate-logs.service';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: 'OperateLog', schema: OperateLogSchema }])],
  providers: [OperateLogsService],
  controllers: [OperateLogsController],
  exports: [OperateLogsService],
})
export class OperateLogsModule {}
