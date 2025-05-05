import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentScheduleController } from './appointment-schedule.controller';

describe('AppointmentScheduleController', () => {
  let controller: AppointmentScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentScheduleController],
    }).compile();

    controller = module.get<AppointmentScheduleController>(AppointmentScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
