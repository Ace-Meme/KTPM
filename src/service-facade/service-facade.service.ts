import { Injectable } from '@nestjs/common';
import { WorkloadTrackingService } from 'src/workload-tracking/workload-tracking.service';
import { PatientRegisterService, PatientRegistrationData, PatientRegistrationResult } from 'src/patient-register/patient-register.service';

@Injectable()
export class ServiceFacadeService {
    constructor(
        private workloadTrackingService: WorkloadTrackingService,
        private patientRegisterService: PatientRegisterService,
    ) {}

    // Patient Registration Facade Methods
  async registerPatient(data: PatientRegistrationData): Promise<PatientRegistrationResult> {
    return await this.patientRegisterService.registerPatient(data);
  }
}

