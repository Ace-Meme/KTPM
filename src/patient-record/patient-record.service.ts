import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientRecordDto } from './dto/create-patient-record.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientRecord } from '../entities/patient-record.entity';
import { UpdatePatientRecordDto } from './dto/update-patient-record.dto';


@Injectable()
export class PatientRecordService {
  constructor(
    @InjectRepository(PatientRecord)
    private readonly patientRecordRepository: Repository<PatientRecord>,
  ) {}

  async findAll(): Promise<PatientRecord[]> {
    return this.patientRecordRepository.find({
      relations: ['patient'], 
    });
  }

  async findOne(id: number): Promise<PatientRecord> {
    const record = await this.patientRecordRepository.findOne({
      where: { patientID: id },
      relations: ['patient'], 
    });

    if (!record) {
      throw new NotFoundException(`Patient record with ID ${id} not found`);
    }

    return record;
  }

  async create(createDto: CreatePatientRecordDto): Promise<PatientRecord> {
    const newRecord = this.patientRecordRepository.create(createDto);
    return this.patientRecordRepository.save(newRecord);
  }

  async update(id: number, updateDto: UpdatePatientRecordDto): Promise<PatientRecord> {
    const record = await this.findOne(id);

    Object.assign(record, updateDto);
    return this.patientRecordRepository.save(record);
  }

  async remove(id: number): Promise<void> {
    const record = await this.findOne(id);

    await this.patientRecordRepository.remove(record);
  }
}
