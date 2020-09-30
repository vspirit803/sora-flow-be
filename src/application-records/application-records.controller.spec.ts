import { Test, TestingModule } from '@nestjs/testing';

import { ApplicationRecordsController } from './application-records.controller';

describe('ApplicationRecordsController', () => {
  let controller: ApplicationRecordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationRecordsController],
    }).compile();

    controller = module.get<ApplicationRecordsController>(ApplicationRecordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
