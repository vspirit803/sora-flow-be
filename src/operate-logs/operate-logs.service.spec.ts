import { Test, TestingModule } from '@nestjs/testing';
import { OperateLogsService } from './operate-logs.service';

describe('OperateLogsService', () => {
  let service: OperateLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperateLogsService],
    }).compile();

    service = module.get<OperateLogsService>(OperateLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
