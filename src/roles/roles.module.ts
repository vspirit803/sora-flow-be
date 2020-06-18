import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OperateLogsModule } from 'src/operate-logs/operate-logs.module';

import { RoleSchema } from './role.schema';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Role', schema: RoleSchema }]),
    OperateLogsModule,
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
