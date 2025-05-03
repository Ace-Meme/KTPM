import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePatientRecordDto {
  @IsOptional()
  @IsNumber()
  id?: number;

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