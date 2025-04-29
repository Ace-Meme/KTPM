import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff, StaffType } from '../entities/staff.entity';
import { CreateStaffDTO } from './create-staff.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class StaffManagementService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepo: Repository<Staff>,
  ) {}

  // Add new staff
  async addStaff(dto: CreateStaffDTO) {
    try {
      // Kiểm tra logic dựa trên type
      if (dto.type === StaffType.DOCTOR && !dto.specialization) {
        throw new BadRequestException('Specialization is required for Doctor.');
      }
      if (dto.type === StaffType.NURSE && !dto.department) {
        throw new BadRequestException('Department is required for Nurse.');
      }
      if (dto.type === StaffType.DOCTOR && dto.department) {
        throw new BadRequestException('Department is not allowed for Doctor.');
      }
      if (dto.type === StaffType.NURSE && dto.specialization) {
        throw new BadRequestException('Specialization is not allowed for Nurse.');
      }

      const staff = plainToInstance(Staff, dto); // Convert DTO to entity
      return await this.staffRepo.save(staff);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException('Missing required fields in request body.');
      }
      throw new InternalServerErrorException('Failed to add staff member.');
    }
  }

  // Get staff details by id
  async getStaffDetail(id: number) {
    const staff = await this.staffRepo.findOne({ where: { id } });
    if (!staff) {
      throw new NotFoundException(`Staff with ID ${id} not found.`);
    }
    return staff;
  }

  // List all staff
  async listAllStaff() {
    const staffList = await this.staffRepo.find();
    if (staffList.length === 0) {
      throw new NotFoundException('No staff members found.');
    }
    return staffList;
  }

  // List all doctors
  async listDoctor() {
    const doctors = await this.staffRepo.find({ where: { type: StaffType.DOCTOR } });
    if (doctors.length === 0) {
      throw new NotFoundException('No doctors found.');
    }
    return doctors;
  }

  // Delete staff by ID
  async delete(id: number) {
    const result = await this.staffRepo.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Failed to delete staff with ID ${id}. Staff not found.`);
    }
    return { message: `Staff member with ID ${id} has been deleted successfully.` };
  }

  async updateStaff(id: number, dto: Partial<CreateStaffDTO>) {
    try {
      const staff = await this.staffRepo.findOne({ where: { id } });
      if (!staff) {
        throw new NotFoundException(`Staff with ID ${id} not found.`);
      }
  
      // Kiểm tra logic dựa trên type
      if (dto.type === StaffType.DOCTOR && dto.department) {
        throw new BadRequestException('Department is not allowed for Doctor.');
      }
      if (dto.type === StaffType.NURSE && dto.specialization) {
        throw new BadRequestException('Specialization is not allowed for Nurse.');
      }
  
      // Cập nhật thông tin
      const updatedStaff = this.staffRepo.merge(staff, dto);
      return await this.staffRepo.save(updatedStaff);
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update staff member.');
    }
  }
}