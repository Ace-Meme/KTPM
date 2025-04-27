import { Test, TestingModule } from '@nestjs/testing';
import { PatientRecordService } from './patient-record.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PatientRecord } from '../entities/patient-record.entity';
import { Repository } from 'typeorm';

const mockRepository = {
  find: jest.fn().mockResolvedValue([]),
  findOne: jest.fn().mockResolvedValue(null),
  save: jest.fn().mockResolvedValue(null),
  remove: jest.fn().mockResolvedValue(null),
  create: jest.fn(),
};

describe('PatientRecordService', () => {
  let service: PatientRecordService;
  let repository: Repository<PatientRecord>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientRecordService,
        {
          provide: getRepositoryToken(PatientRecord),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PatientRecordService>(PatientRecordService);
    repository = module.get<Repository<PatientRecord>>(getRepositoryToken(PatientRecord));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all records', async () => {
    const records = [{ patientID: 1, diagnosis: 'Test Diagnosis' }];
    mockRepository.find.mockResolvedValue(records);

    const result = await service.findAll();
    expect(result).toEqual(records);
    expect(mockRepository.find).toHaveBeenCalled();
  });

  it('should find one record by ID', async () => {
    const record = { patientID: 1, diagnosis: 'Test Diagnosis' };
    mockRepository.findOne.mockResolvedValue(record);

    const result = await service.findOne(1);
    expect(result).toEqual(record);
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { patientID: 1 }, relations: ['patient'] });
  });

  it('should create a new record', async () => {
    const createDto = { patientID: 1, doctorID: 2, diagnosis: 'Test Diagnosis', recordDate: new Date() };
    const savedRecord = { ...createDto };  
    mockRepository.create.mockReturnValue(savedRecord);  
    mockRepository.save.mockResolvedValue(savedRecord);   
  
    const result = await service.create(createDto);
    expect(result).toEqual(savedRecord);
    expect(mockRepository.create).toHaveBeenCalledWith(createDto);  
    expect(mockRepository.save).toHaveBeenCalledWith(savedRecord);  
  });
  

  it('should update a record', async () => {
    const updateDto = { diagnosis: 'Updated Diagnosis' };
    const existingRecord = { patientID: 1, diagnosis: 'Old Diagnosis' };
    mockRepository.findOne.mockResolvedValue(existingRecord);
    mockRepository.save.mockResolvedValue({ ...existingRecord, ...updateDto });

    const result = await service.update(1, updateDto);
    expect(result).toEqual({ ...existingRecord, ...updateDto });
    expect(mockRepository.save).toHaveBeenCalledWith({ ...existingRecord, ...updateDto });
  });

  it('should remove a record', async () => {
    const record = { patientID: 1, diagnosis: 'Test Diagnosis' };
    mockRepository.findOne.mockResolvedValue(record);
    mockRepository.remove.mockResolvedValue(record);

    await service.remove(1);
    expect(mockRepository.remove).toHaveBeenCalledWith(record);
  });
});
