import { Module } from '@nestjs/common';
import { WorkloadTrackingService } from './workload-tracking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from 'src/entities/staff.entity';
import { WorkloadTrackingController } from './workload-tracking.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([Staff])
  ],
  providers: [WorkloadTrackingService],
  controllers: [WorkloadTrackingController]
})
export class WorkloadTrackingModule {}
