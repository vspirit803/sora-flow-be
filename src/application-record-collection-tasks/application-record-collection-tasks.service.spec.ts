import { Test, TestingModule } from '@nestjs/testing';

import { ApplicationRecordCollectionTasksService } from './application-record-collection-tasks.service';

describe('ApplicationRecordCollectionTasksService', () => {
  let service: ApplicationRecordCollectionTasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationRecordCollectionTasksService],
    }).compile();

    service = module.get<ApplicationRecordCollectionTasksService>(ApplicationRecordCollectionTasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
