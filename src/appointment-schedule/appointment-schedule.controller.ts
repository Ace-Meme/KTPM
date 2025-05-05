import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiParam,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { AppointmentScheduleService } from './appointment-schedule.service';
import { ScheduleAppointment, Staff, WorkingSchedule } from '../entities/staff.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@ApiTags('Appointment Schedule')
@Controller('appointment-schedule')
export class AppointmentScheduleController {
  constructor(private readonly service: AppointmentScheduleService) {}

  @Get('staff')
  @ApiOperation({ summary: 'Get all staff with schedules' })
  @ApiResponse({ status: 200, type: [Staff] })
  async getAllStaff() {
    return this.service.getAllStaff();
  }

  @Get('staff/:id/schedules')
  @ApiOperation({ summary: 'Get schedules for a staff member' })
  @ApiResponse({
    status: 200,
    type: [WorkingSchedule],
    description: 'Schedules found',
  })
  @ApiResponse({
    status: 404,
    description: 'Staff not found',
  })
  async getStaffSchedules(@Param('id') id: string) {
    const schedules = await this.service.getStaffSchedules(parseInt(id));
    if (!schedules || schedules.length === 0) {
      throw new NotFoundException('Staff not found or no schedules available');
    }
    return schedules;
  }

  @Post('appointments')
  @ApiOperation({ summary: 'Create a new appointment' })
  @ApiResponse({ status: 201, type: ScheduleAppointment })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
    schema: {
      example: {
        statusCode: 400,
        message: ['Staff is not working during this time slot'],
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Schedule conflict',
    schema: {
      example: {
        statusCode: 409,
        message: 'This time slot has already been booked',
        error: 'Conflict',
      },
    },
  })
  async createAppointment(@Body() createDto: CreateAppointmentDto) {
    return this.service.createAppointment(createDto);
  }

  @Delete('appointments/:id')
  @ApiOperation({ summary: 'Delete an appointment' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({
    type: Object,
    description: 'Successfully deleted',
    schema: { example: { message: 'Deleted appointment with ID 1' } },
  })
  @ApiNotFoundResponse({
    description: 'Appointment not found',
    schema: { example: { statusCode: 404, message: 'Not Found' } },
  })
  async deleteAppointment(@Param('id') id: number) {
    return this.service.deleteAppointment(id);
  }
}
