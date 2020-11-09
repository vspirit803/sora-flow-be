import { Test, TestingModule } from '@nestjs/testing';

import { ApplicationRecordCollectionTasksController } from './application-record-collection-tasks.controller';

describe('ApplicationRecordCollectionTasksController', () => {
  let controller: ApplicationRecordCollectionTasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationRecordCollectionTasksController],
    }).compile();

    controller = module.get<ApplicationRecordCollectionTasksController>(ApplicationRecordCollectionTasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
