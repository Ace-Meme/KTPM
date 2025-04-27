import { IsOptional, IsString } from 'class-validator';

export class UpdatePatientRecordDto {
  @IsString()
  @IsOptional()
  diagnosis?: string; 

  @IsString()
  @IsOptional()
  description?: string; 
}