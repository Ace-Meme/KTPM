import { Body, Controller, Post } from '@nestjs/common';
import { WorkloadTrackingService } from './workload-tracking.service';
import { ApiOperation } from '@nestjs/swagger';
import { WorkloadDTO } from './dto/workload.dto';

@Controller('workload-tracking')
export class WorkloadTrackingController {
    constructor(
        private workloadTrackingService: WorkloadTrackingService,
    ) {}
    @Post('dayOfWeek')
    async getWorkloadOfDay(@Body() body: WorkloadDTO) {
        return this.workloadTrackingService.trackingWorkloadOfDay(body.date, body.staffId);
    }
}
