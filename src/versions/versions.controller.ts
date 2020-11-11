import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrganizationAuthGuard } from 'src/auth/organization-auth.guard';
import { UseOperateLog } from 'src/Decorators/operate-log.decorator';
import { ExcludeUndefinedPipe } from 'src/Pipes/excludeUndefined.pipe';

import { CreateVersionDto, DeleteVersionDto, QueryVersionDto, UpdateVersionDto } from './dto';
import { VersionsService } from './versions.service';

@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { excludeExtraneousValues: true },
  }),
)
@UseGuards(JwtAuthGuard)
@UseOperateLog('版本')
@Controller('versions')
export class VersionsController {
  constructor(private readonly versionsService: VersionsService) {}

  @Get()
  @UsePipes(ExcludeUndefinedPipe)
  async findAll(@Query() query: QueryVersionDto) {
    return this.versionsService.findAll(query);
  }

  @UseGuards(OrganizationAuthGuard)
  @Post()
  async create(
    @Body()
    createVersionDto: CreateVersionDto,
    @Req() req,
  ) {
    const organizationId = req.user.organizationId;
    await this.versionsService.create(createVersionDto, organizationId);
  }

  @UseGuards(OrganizationAuthGuard)
  @Patch()
  @UsePipes(ExcludeUndefinedPipe)
  async updateOne(@Body() updateVersionDto: UpdateVersionDto) {
    await this.versionsService.updateOne(updateVersionDto);
  }

  @Delete()
  async deleteOne(@Body() deleteVersionDto: DeleteVersionDto) {
    await this.versionsService.deleteOne(deleteVersionDto);
  }
}
