import { Module } from '@nestjs/common';
import { ServiceFacadeService } from './service-facade.service';
import { WorkloadTrackingModule } from 'src/workload-tracking/workload-tracking.module';

@Module({
  imports: [
    WorkloadTrackingModule
  ],
  providers: [ServiceFacadeService]
})
export class ServiceFacadeModule {}
