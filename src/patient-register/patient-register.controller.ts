import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { PatientRegisterService, PatientRegistrationResult } from './patient-register.service';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterPatientDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  dateOfBirth: Date;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  address?: string;
}

export class PatientRegisteredResponseDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  message: string;
}

@Controller('patients')
export class PatientRegisterController {
  constructor(private readonly patientRegisterService: PatientRegisterService) {}

  @Post('register')
  async registerPatient(@Body() registerPatientDto: RegisterPatientDto): Promise<PatientRegisteredResponseDto> {
    const result = await this.patientRegisterService.registerPatient(registerPatientDto);
    
    return {
      ...result,
      message: 'Patient registered successfully',
    };
  }
}