import { Module } from '@nestjs/common';
import { MenusModule } from 'src/menus/menus.module';
import { RolesModule } from 'src/roles/roles.module';

import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [MenusModule, RolesModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
