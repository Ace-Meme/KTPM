import { Injectable} from '@nestjs/common';
import { PatientRecord } from '../entities/patient-record.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export interface IPatientMedicalHistoryService {
  getHistoryByPatient(id: string): Promise<PatientRecord[]>;
  deleteHistory (patientId: string): Promise<boolean>;
  hasRecords(patientId: string): Promise<boolean>;
}

@Injectable()
export class PatientMedicalHistoryService implements IPatientMedicalHistoryService {
  constructor(
    @InjectRepository(PatientRecord)
    private readonly patientRecordRepository: Repository<PatientRecord>,
    // private readonly patientRecordService: PatientRecordService,
  ) {}

  async getHistoryByPatient(patientId: string): Promise<PatientRecord[]> {
    const records = await this.patientRecordRepository.find({
      where: { patientID: +patientId },
    })
    return records
  }

  async deleteHistory(patientId: string): Promise<boolean> {
    const result = await this.patientRecordRepository.delete({ patientID: +patientId });
    return result.affected !== undefined && result.affected !== null && result.affected > 0
  }
  
  async hasRecords(patientId: string): Promise<boolean> {
    const count = await this.patientRecordRepository.count({ where: { patientID: +patientId } });
    return count > 0;
  }

}

