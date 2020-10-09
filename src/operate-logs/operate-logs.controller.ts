import { Controller, Get } from '@nestjs/common';

import { OperateLogsService } from './operate-logs.service';

@Controller('operate-logs')
export class OperateLogsController {
  constructor(private readonly operateLogsService: OperateLogsService) {}

  @Get('count')
  async getCount() {
    return this.operateLogsService.getCount();
  }
}
