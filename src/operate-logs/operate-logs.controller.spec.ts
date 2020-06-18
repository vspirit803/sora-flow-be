import { Test, TestingModule } from '@nestjs/testing';
import { OperateLogsController } from './operate-logs.controller';

describe('OperateLogs Controller', () => {
  let controller: OperateLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperateLogsController],
    }).compile();

    controller = module.get<OperateLogsController>(OperateLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
