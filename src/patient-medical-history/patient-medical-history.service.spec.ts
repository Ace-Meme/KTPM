import { Test, TestingModule } from '@nestjs/testing';
import { PatientMedicalHistoryService } from './patient-medical-history.service';

describe('PatientMedicalHistoryService', () => {
  let service: PatientMedicalHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientMedicalHistoryService],
    }).compile();

    service = module.get<PatientMedicalHistoryService>(PatientMedicalHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
