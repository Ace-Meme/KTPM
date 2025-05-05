import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduleAppointment, Staff, WorkingSchedule } from '../entities/staff.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentScheduleService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    @InjectRepository(WorkingSchedule)
    private scheduleRepository: Repository<WorkingSchedule>,
    @InjectRepository(ScheduleAppointment)
    private appointmentRepository: Repository<ScheduleAppointment>
  ) {}

  async getAllStaff() {
    return this.staffRepository.find({ relations: ['workingSchedules'] });
  }

  async getStaffSchedules(staffId: number) {
    const staff = await this.staffRepository.findOne({ 
      where: { id: staffId },
      relations: ['workingSchedules'] 
    });

    if (!staff) {
      throw new NotFoundException({
        statusCode: 404,
        message: `Staff with ID ${staffId} not found`,
        error: 'Not Found',
        timestamp: new Date().toISOString()
      });
    }

    return staff.workingSchedules;
  }

  async createAppointment(createDto: CreateAppointmentDto): Promise<ScheduleAppointment> {
    try {
      // 1. Check if staff exists
      const staff = await this.staffRepository.findOne({ 
        where: { id: createDto.staffId },
        relations: ['workingSchedules'] 
      });

      if (!staff) {
        throw new NotFoundException(`Staff with ID ${createDto.staffId} does not exist`);
      }

      // 2. Validate date
      const appointmentDate = new Date(createDto.date);
      if (isNaN(appointmentDate.getTime())) {
        throw new BadRequestException('Invalid date');
      }

      // 3. Validate time
      if (createDto.startTime >= createDto.endTime) {
        throw new BadRequestException('End time must be after start time');
      }

      // 4. Check working hours
      const dayOfWeek = appointmentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
      const workDay = staff.workingSchedules.find(
        schedule => schedule.dayOfWeek === dayOfWeek && !schedule.isDayOff
      );

      if (!workDay) {
        throw new BadRequestException(`Staff does not work on ${this.getDayName(dayOfWeek)}`);
      }

      if (createDto.startTime < workDay.startTime || createDto.endTime > workDay.endTime) {
        throw new BadRequestException(
          `Staff works only from ${workDay.startTime}h to ${workDay.endTime}h`
        );
      }

      // 5. Check for overlapping appointments
      const existingAppointment = await this.appointmentRepository
        .createQueryBuilder('appointment')
        .leftJoin('appointment.staff', 'staff')
        .where('staff.id = :staffId', { staffId: createDto.staffId })
        .andWhere('appointment.date = :date', { date: createDto.date })
        .andWhere(
          '(appointment.startTime < :endTime AND appointment.endTime > :startTime)',
          {
            startTime: createDto.startTime,
            endTime: createDto.endTime,
          }
        )
        .getOne();

      if (existingAppointment) {
        throw new ConflictException('This time slot has already been booked');
      }

      // 6. Create appointment
      const appointment = this.appointmentRepository.create({
        date: createDto.date,
        startTime: createDto.startTime,
        endTime: createDto.endTime,
        description: createDto.description,
        staff: staff
      });

      return await this.appointmentRepository.save(appointment);
    } catch (error) {
      console.error('Error while creating appointment:', error);
      throw error;
    }
  }

  async deleteAppointment(id: number): Promise<{ message: string }> {
    const result = await this.appointmentRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    return { message: `Deleted appointment with ID ${id}` };
  }

  private getDayName(dayOfWeek: number): string {
    const days = [
      'Sunday', 'Monday', 'Tuesday',
      'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];
    return days[dayOfWeek];
  }
}
