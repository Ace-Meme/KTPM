import { Module } from '@nestjs/common';
import { PatientMedicalHistoryController } from './patient-medical-history.controller';
import { PatientMedicalHistoryService } from './patient-medical-history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from '../entities/patient.entity';
import { PatientRecord } from 'src/entities/patient-record.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Patient, PatientRecord])],
  controllers: [PatientMedicalHistoryController],
  providers: [PatientMedicalHistoryService]
})
export class PatientMedicalHistoryModule {}
