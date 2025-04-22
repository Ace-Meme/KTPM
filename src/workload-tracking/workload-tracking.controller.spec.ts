import { Test, TestingModule } from '@nestjs/testing';
import { WorkloadTrackingController } from './workload-tracking.controller';

describe('WorkloadTrackingController', () => {
  let controller: WorkloadTrackingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkloadTrackingController],
    }).compile();

    controller = module.get<WorkloadTrackingController>(WorkloadTrackingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
