import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSchema } from './account.schema';
import { AccountsService } from './accounts.service';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }])],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports:[AccountsService]
})
export class AccountsModule {}
