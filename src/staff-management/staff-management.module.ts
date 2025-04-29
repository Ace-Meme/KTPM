import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from '../entities/staff.entity';
import { StaffManagementController } from './staff-management.controller';
import { StaffManagementService } from './staff-management.service';

@Module({
  imports: [TypeOrmModule.forFeature([Staff])],
  providers: [StaffManagementService],
  controllers: [StaffManagementController],
})
export class StaffManagementModule {}