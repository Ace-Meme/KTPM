import { Test, TestingModule } from '@nestjs/testing';
import { PatientMedicalHistoryController } from './patient-medical-history.controller';

describe('PatientMedicalHistoryController', () => {
  let controller: PatientMedicalHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientMedicalHistoryController],
    }).compile();

    controller = module.get<PatientMedicalHistoryController>(PatientMedicalHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
