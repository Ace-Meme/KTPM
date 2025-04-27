import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from '../entities/patient.entity';
import { PatientRecord } from '../entities/patient-record.entity';
import { PatientRecordService } from './patient-record.service';
import { PatientRecordController } from './patient-record.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, PatientRecord])],
  providers: [PatientRecordService],
  controllers: [PatientRecordController],
  exports: [PatientRecordService],
})
export class PatientRecordModule {}