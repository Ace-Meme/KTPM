import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleAppointment, Staff, WorkingSchedule } from '../entities/staff.entity';
import { AppointmentScheduleService } from './appointment-schedule.service';
import { AppointmentScheduleController } from './appointment-schedule.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Staff, WorkingSchedule, ScheduleAppointment])
  ],
  providers: [AppointmentScheduleService],
  controllers: [AppointmentScheduleController]
})
export class AppointmentScheduleModule {}