import { Controller, Get, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrganizationAuthGuard } from 'src/auth/organization-auth.guard';
import { UseOperateLog } from 'src/Decorators/operate-log.decorator';
import { User } from 'src/Decorators/user.decorator';
import { ExcludeUndefinedPipe } from 'src/Pipes/excludeUndefined.pipe';

import { QueryOperateLogDto } from './dto';
import { OperateLogsService } from './operate-logs.service';
@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { excludeExtraneousValues: true },
  }),
)
@UseGuards(JwtAuthGuard)
@UseOperateLog('操作日志')
@Controller('operate-logs')
export class OperateLogsController {
  constructor(private readonly operateLogsService: OperateLogsService) {}

  @Get('count')
  async getCount() {
    return this.operateLogsService.getCount();
  }

  @Get()
  @UsePipes(ExcludeUndefinedPipe)
  @UseGuards(OrganizationAuthGuard)
  async findAll(@Query() query: QueryOperateLogDto, @User() user) {
    return this.operateLogsService.find({
      organizationId: user.organizationId as string,
      ...query,
    });
  }
}
