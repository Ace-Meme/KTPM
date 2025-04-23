import { Test, TestingModule } from '@nestjs/testing';
import { PatientRegisterController } from './patient-register.controller';

describe('PatientRegisterController', () => {
  let controller: PatientRegisterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientRegisterController],
    }).compile();

    controller = module.get<PatientRegisterController>(PatientRegisterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
