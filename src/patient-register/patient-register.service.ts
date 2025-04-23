import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../entities/patient.entity';

// Moved interfaces directly into the service file
export interface PatientRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  phoneNumber?: string;
  address?: string;
}

export interface PatientRegistrationResult {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
}

export interface IPatientRegisterService {
  registerPatient(data: PatientRegistrationData): Promise<PatientRegistrationResult>;
  validatePatientData(data: PatientRegistrationData): Promise<boolean>;
  isEmailAvailable(email: string): Promise<boolean>;
}

@Injectable()
export class PatientRegisterService implements IPatientRegisterService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  async registerPatient(data: PatientRegistrationData): Promise<PatientRegistrationResult> {
    await this.validatePatientData(data);
    await this.isEmailAvailable(data.email);

    // Create new patient
    const patient = this.patientRepository.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      dateOfBirth: data.dateOfBirth,
      phoneNumber: data.phoneNumber,
      address: data.address,
    });

    // Save to database
    const savedPatient = await this.patientRepository.save(patient);

    // Return result
    return {
      id: savedPatient.id,
      firstName: savedPatient.firstName,
      lastName: savedPatient.lastName,
      email: savedPatient.email,
      createdAt: savedPatient.createdAt,
    };
  }

  async validatePatientData(data: PatientRegistrationData): Promise<boolean> {
    // Check date of birth is in the past
    if (data.dateOfBirth > new Date()) {
      throw new BadRequestException('Date of birth must be in the past');
    }

    // Add any other validation rules here
    return true;
  }

  async isEmailAvailable(email: string): Promise<boolean> {
    const existingPatient = await this.patientRepository.findOne({ where: { email } });
    if (existingPatient) {
      throw new BadRequestException('Email is already registered');
    }
    return true;
  }
}