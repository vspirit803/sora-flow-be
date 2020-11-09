import { Body, Controller, Get, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrganizationAuthGuard } from 'src/auth/organization-auth.guard';
import { UseOperateLog } from 'src/Decorators/operate-log.decorator';
import { User } from 'src/Decorators/user.decorator';
import { ExcludeUndefinedPipe } from 'src/Pipes/excludeUndefined.pipe';

import { ApplicationRecordCollectionTasksService } from './application-record-collection-tasks.service';
import { CreateApplicationRecordCollectionTaskDto, QueryApplicationRecordCollectionTaskDto } from './dto';

@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { excludeExtraneousValues: true },
  }),
)
@UseGuards(JwtAuthGuard)
@UseOperateLog('应用采集任务')
@Controller('application-record-collection-tasks')
export class ApplicationRecordCollectionTasksController {
  constructor(private readonly applicationRecordCollectionTasksService: ApplicationRecordCollectionTasksService) {}

  @Get()
  @UseGuards(OrganizationAuthGuard)
  @UsePipes(ExcludeUndefinedPipe)
  async findAll(@Query() query: QueryApplicationRecordCollectionTaskDto, @User() user) {
    return this.applicationRecordCollectionTasksService.find({
      publisher: user.id,
      organization: user.organizationId,
      ...query,
    });
  }

  @UseGuards(OrganizationAuthGuard)
  @UsePipes(ExcludeUndefinedPipe)
  @Post()
  async create(
    @Body()
    createApplicationRecordCollectionTaskDto: CreateApplicationRecordCollectionTaskDto,
    @User() user,
  ) {
    await this.applicationRecordCollectionTasksService.create({
      publisher: user.id,
      organization: user.organizationId,
      status: 'processing',
      ...createApplicationRecordCollectionTaskDto,
    });
  }
}
