import { Test, TestingModule } from '@nestjs/testing';
import { WorkloadTrackingService } from './workload-tracking.service';

describe('WorkloadTrackingService', () => {
  let service: WorkloadTrackingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkloadTrackingService],
    }).compile();

    service = module.get<WorkloadTrackingService>(WorkloadTrackingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
