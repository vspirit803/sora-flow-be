import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'src/logger/logger.module';

import { MenuSchema } from './menu.schema';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Menu', schema: MenuSchema }]),
    LoggerModule,
  ],
  controllers: [MenusController],
  providers: [MenusService],
})
export class MenusModule {}
