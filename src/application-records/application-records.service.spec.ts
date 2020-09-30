import { Test, TestingModule } from '@nestjs/testing';

import { ApplicationRecordsService } from './application-records.service';

describe('ApplicationRecordsService', () => {
  let service: ApplicationRecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationRecordsService],
    }).compile();

    service = module.get<ApplicationRecordsService>(ApplicationRecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
