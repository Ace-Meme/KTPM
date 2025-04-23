import { Test, TestingModule } from '@nestjs/testing';
import { PatientRegisterService } from './patient-register.service';

describe('PatientRegisterService', () => {
  let service: PatientRegisterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientRegisterService],
    }).compile();

    service = module.get<PatientRegisterService>(PatientRegisterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
