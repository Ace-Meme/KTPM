import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePatientRecordDto {
  @IsNumber()
  @IsNotEmpty()
  patientID: number; 

  @IsNumber()
  @IsNotEmpty()
  doctorID: number; 

  @IsString()
  @IsOptional()
  description?: string; 
  
  @IsNotEmpty()
  recordDate: Date; 
  @IsString()
  @IsNotEmpty()
  diagnosis: string;
}