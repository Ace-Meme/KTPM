import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentScheduleService } from './appointment-schedule.service';

describe('AppointmentScheduleService', () => {
  let service: AppointmentScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentScheduleService],
    }).compile();

    service = module.get<AppointmentScheduleService>(AppointmentScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
