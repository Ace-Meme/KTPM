import { Module } from '@nestjs/common';
import { WorkloadTrackingService } from './workload-tracking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from 'src/entities/staff.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Doctor])
  ],
  providers: [WorkloadTrackingService]
})
export class WorkloadTrackingModule {}
