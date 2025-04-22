import { Body, Controller, Post } from '@nestjs/common';
import { WorkloadTrackingService } from './workload-tracking.service';

@Controller('workload-tracking')
export class WorkloadTrackingController {
    constructor(
        private workloadTrackingService: WorkloadTrackingService,
    ) {}

    @Post('dayOfWeek')
    async getDayOfWeek(@Body('date') date: string, @Body('staffId') staffId: number) {
        return this.workloadTrackingService.trackingWorkloadOfWeek(new Date(date), staffId);
    }
}
