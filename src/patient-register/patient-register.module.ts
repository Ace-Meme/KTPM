import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from '../entities/patient.entity';
import { PatientRegisterController } from './patient-register.controller';
import { PatientRegisterService } from './patient-register.service';

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  controllers: [PatientRegisterController],
  providers: [PatientRegisterService],
  exports: [PatientRegisterService],
})
export class PatientRegisterModule {}