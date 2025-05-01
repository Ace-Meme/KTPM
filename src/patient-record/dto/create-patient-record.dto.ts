import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePatientRecordDto {
  @IsNumber()
  @IsNotEmpty()
  patientID: number; 

  @IsString()
  @IsOptional()
  description?: string; 
  
  @IsNotEmpty()
  recordDate: Date; 
  @IsString()
  @IsNotEmpty()
  diagnosis: string;
}