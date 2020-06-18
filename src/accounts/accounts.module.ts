import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OperateLogsModule } from 'src/operate-logs/operate-logs.module';

import { AccountSchema } from './account.schema';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }]),
    OperateLogsModule,
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
