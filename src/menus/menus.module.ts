import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MenuSchema } from './menu.schema';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Menu', schema: MenuSchema }])],
  controllers: [MenusController],
  providers: [MenusService],
})
export class MenusModule {}
