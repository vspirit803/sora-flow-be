import { Controller } from '@nestjs/common';

import { OperateLogsService } from './operate-logs.service';

@Controller('operate-logs')
export class OperateLogsController {
  constructor(private readonly operateLogsService: OperateLogsService) {}
}
