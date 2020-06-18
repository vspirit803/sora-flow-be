import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OperateLogsModule } from 'src/operate-logs/operate-logs.module';

import { MenuSchema } from './menu.schema';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Menu', schema: MenuSchema }]),
    OperateLogsModule,
  ],
  controllers: [MenusController],
  providers: [MenusService],
})
export class MenusModule {}
