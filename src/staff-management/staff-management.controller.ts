import { Controller, Get, Post, Param, Body, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateStaffDTO } from './create-staff.dto';
import { StaffManagementService } from './staff-management.service';
import { Staff } from '../entities/staff.entity';

@ApiTags('Staff Management')
@Controller('staff-management')
export class StaffManagementController {
  constructor(private readonly staffService: StaffManagementService) {}

  @Post('add')
  @ApiOperation({ summary: 'Add a new staff member', description: 'Creates a new staff member and saves it to the database.' })
  @ApiBody({
    description: 'The data required to create a new staff member.',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'John Doe' },
        type: { type: 'string', enum: ['Doctor', 'Nurse'], example: 'Doctor' },
        contactDetails: {
          type: 'object',
          properties: {
            phone: { type: 'string', example: '123-456-7890' },
            email: { type: 'string', example: 'john.doe@example.com' },
            address: {
              type: 'object',
              properties: {
                street: { type: 'string', example: '123 Main St' },
                city: { type: 'string', example: 'Anytown' },
                zipcode: { type: 'string', example: '12345' },
                country: { type: 'string', example: 'USA' },
              },
            },
          },
        },
      },
      oneOf: [
        {
          type: 'object',
          properties: {
            specialization: { type: 'string', example: 'Cardiology' }, // For Doctor
          },
          required: ['specialization'],
        },
        {
          type: 'object',
          properties: {
            department: { type: 'string', example: 'Emergency' }, // For Nurse
          },
          required: ['department'],
        },
      ],
    },
  })
  @ApiResponse({ status: 400, description: 'Missing required fields in request body. / Bad request!' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async addStaff(@Body() body: CreateStaffDTO) {
    return await this.staffService.addStaff(body);
  }

  @Get('staff/:id')
  @ApiOperation({ summary: 'Get staff details', description: 'Fetches details of a staff member by their ID.' })
  @ApiResponse({
    status: 200,
    description: 'The staff member details.',
    schema: {
      example: {
        id: 1,
        name: 'John Doe',
        type: 'Doctor',
        contactDetails: {
          phone: '123-456-7890',
          email: 'john.doe@example.com',
          address: {
            street: '123 Main St',
            city: 'Anytown',
            zipcode: '12345',
            country: 'USA',
          },
        },
        specialization: "Cardiology",
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid ID.' })
  @ApiResponse({ status: 404, description: 'Staff member not found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async getStaffDetail(@Param('id') id: number): Promise<Staff> {
    return await this.staffService.getStaffDetail(id);
  }

  @Get('allStaffs')
  @ApiOperation({ summary: 'List all staff members', description: 'Fetches a list of all staff members in the system.' })
  @ApiResponse({
    status: 200,
    description: 'A list of all staff members.',
    schema: {
      example: [
        {
          id: 1,
          name: 'John Doe',
          type: 'Doctor',
          contactDetails: {
            phone: '123-456-7890',
            email: 'john.doe@example.com',
            address: {
              street: '123 Main St',
              city: 'Anytown',
              zipcode: '12345',
              country: 'USA',
            },
          },
          specialization: "Cardiology",
        },
        {
          id: 2,
          name: 'Jane Smith',
          type: 'Nurse',
          contactDetails: {
            phone: '987-654-3210',
            email: 'jane.smith@example.com',
            address: {
              street: '456 Elm St',
              city: 'Othertown',
              zipcode: '67890',
              country: 'USA',
            },
          },
          department: "Emergency",
        },
      ],
    },
  })
  @ApiResponse({ status: 404, description: 'No staff members found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async listAllStaff() {
    return await this.staffService.listAllStaff();
  }

  @Get('list-doctors')
  @ApiOperation({ summary: 'List all doctors', description: 'Fetches a list of all doctors in the system.' })
  @ApiResponse({
    status: 200,
    description: 'A list of all doctors.',
    schema: {
      example: [
        {
          id: 1,
          name: 'John Doe',
          type: 'Doctor',
          contactDetails: {
            phone: '123-456-7890',
            email: 'john.doe@example.com',
            address: {
              street: '123 Main St',
              city: 'Anytown',
              zipcode: '12345',
              country: 'USA',
            },
          },
          specialization: "Cardiology",
        },
      ],
    },
  })
  @ApiResponse({ status: 404, description: 'No doctors found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async listDoctors() {
    return await this.staffService.listDoctor();
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Update staff information', description: 'Updates the information of a staff member by their ID.' })
  @ApiBody({
    description: 'The data required to update a staff member.',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Updated Name' },
        type: { type: 'string', enum: ['Doctor', 'Nurse'], example: 'Doctor' },
        contactDetails: {
          type: 'object',
          properties: {
            phone: { type: 'string', example: '123-456-7890' },
            email: { type: 'string', example: 'updated.email@example.com' },
            address: {
              type: 'object',
              properties: {
                street: { type: 'string', example: 'Updated Street' },
                city: { type: 'string', example: 'Updated City' },
                zipcode: { type: 'string', example: '12345' },
                country: { type: 'string', example: 'Updated Country' },
              },
              required: ['street', 'city', 'zipcode', 'country'],
            },
          },
          required: ['phone', 'email', 'address'],
        },
        
      },
      oneOf: [
        {
          type: 'object',
          properties: {
            specialization: { type: 'string', example: 'Updated Specialization' }, // For Doctor
          },
          required: ['specialization'],
        },
        {
          type: 'object',
          properties: {
            department: { type: 'string', example: 'Updated Department' }, // For Nurse
          },
          required: ['department'],
        },
      ],
    },
  })
  @ApiResponse({ status: 200, description: 'The staff member has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Staff member not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async updateStaff(@Param('id') id: number, @Body() body: Partial<CreateStaffDTO>) {
    return await this.staffService.updateStaff(id, body);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a staff member', description: 'Deletes a staff member by their ID.' })
  @ApiResponse({
    status: 200,
    description: 'The staff member has been successfully deleted.',
    schema: {
      example: {
        message: 'Staff member with ID 1 has been deleted successfully.',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Staff member not found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async deleteStaff(@Param('id') id: number) {
    return await this.staffService.delete(id);
  }
}