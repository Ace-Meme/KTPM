import { Injectable } from '@nestjs/common';
import { WorkloadTrackingService } from 'src/workload-tracking/workload-tracking.service';

@Injectable()
export class ServiceFacadeService {
    constructor(
        private workloadTrackingService: WorkloadTrackingService,
    ) {}
}

