import { Test, TestingModule } from '@nestjs/testing';
import { PatientRecordController } from './patient-record.controller';
import { PatientRecordService } from './patient-record.service';
import { CreatePatientRecordDto } from './dto/create-patient-record.dto';
import { UpdatePatientRecordDto } from './dto/update-patient-record.dto';

const mockService = {
  findAll: jest.fn().mockResolvedValue([]),
  findOne: jest.fn().mockResolvedValue(null),
  create: jest.fn().mockResolvedValue(null),
  update: jest.fn().mockResolvedValue(null),
  remove: jest.fn().mockResolvedValue(null),
};

describe('PatientRecordController', () => {
  let controller: PatientRecordController;
  let service: PatientRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientRecordController],
      providers: [
        {
          provide: PatientRecordService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<PatientRecordController>(PatientRecordController);
    service = module.get<PatientRecordService>(PatientRecordService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all records', async () => {
    const records = [{ patientID: 1, diagnosis: 'Test Diagnosis' }];
    mockService.findAll.mockResolvedValue(records);

    const result = await controller.findAll();
    expect(result).toEqual(records);
    expect(mockService.findAll).toHaveBeenCalled();
  });

  it('should return one record by ID', async () => {
    const record = { patientID: 1, diagnosis: 'Test Diagnosis' };
    mockService.findOne.mockResolvedValue(record);

    const result = await controller.findOne(1);
    expect(result).toEqual(record);
    expect(mockService.findOne).toHaveBeenCalledWith(1);
  });

  it('should create a new record', async () => {
    const createDto: CreatePatientRecordDto = {
      patientID: 1,
      doctorID: 2,
      diagnosis: 'Test Diagnosis',
      recordDate: new Date(),
      description: undefined, // Explicitly include optional properties
    };
    const createdRecord = { ...createDto };
    mockService.create.mockResolvedValue(createdRecord);

    const result = await controller.create(createDto);
    expect(result).toEqual(createdRecord);
    expect(mockService.create).toHaveBeenCalledWith(createDto);
  });

  it('should update a record', async () => {
    const updateDto: UpdatePatientRecordDto = { diagnosis: 'Updated Diagnosis' };
    const updatedRecord = { patientID: 1, diagnosis: 'Updated Diagnosis' };
    mockService.update.mockResolvedValue(updatedRecord);

    const result = await controller.update(1, updateDto);
    expect(result).toEqual(updatedRecord);
    expect(mockService.update).toHaveBeenCalledWith(1, updateDto);
  });

  it('should remove a record', async () => {
    mockService.remove.mockResolvedValue(undefined);

    await controller.remove(1);
    expect(mockService.remove).toHaveBeenCalledWith(1);
  });
});
