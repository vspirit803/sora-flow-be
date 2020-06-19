import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { VersionSchema } from './version.schema';
import { VersionsController } from './versions.controller';
import { VersionsService } from './versions.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Version', schema: VersionSchema }]),
  ],
  controllers: [VersionsController],
  providers: [VersionsService],
})
export class VersionsModule {}
