import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({ example: '2023-12-25', description: 'Appointment date (YYYY-MM-DD)' })
  @IsDateString()
  date: Date;

  @ApiProperty({ example: 9, description: 'Start time (6 = 6AM, 13 = 1PM)' })
  @IsInt()
  startTime: number;

  @ApiProperty({ example: 11, description: 'End time' })
  @IsInt()
  endTime: number;

  @ApiProperty({ example: 'General check-up', description: 'Appointment description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 1, description: 'Staff ID (doctor/nurse)' })
  @IsInt()
  staffId: number;
}
