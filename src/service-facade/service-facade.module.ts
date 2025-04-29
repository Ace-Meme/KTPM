import { Module } from '@nestjs/common';
import { ServiceFacadeService } from './service-facade.service';
import { WorkloadTrackingModule } from 'src/workload-tracking/workload-tracking.module';
import { PatientRegisterModule } from 'src/patient-register/patient-register.module'; 
import { PatientRecordModule } from 'src/patient-record/patient-record.module';
import { StaffManagementModule } from 'src/staff-management/staff-management.module';

@Module({
  imports: [
    WorkloadTrackingModule,
    PatientRegisterModule,
    PatientRecordModule, // Added PatientRecordModule
    StaffManagementModule,
  ],
  providers: [ServiceFacadeService],
  exports: [ServiceFacadeService]
})
export class ServiceFacadeModule {}