import { Body, Controller, Post } from '@nestjs/common';
import { WorkloadTrackingService } from './workload-tracking.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('workload-tracking')
export class WorkloadTrackingController {
    constructor(
        private workloadTrackingService: WorkloadTrackingService,
    ) {}
    @ApiOperation({ summary: 'Get workload for a day' })
    @Post('dayOfWeek')
    async getWorkloadOfDay(@Body('date') date: string, @Body('staffId') staffId: number) {
        return this.workloadTrackingService.trackingWorkloadOfDay(new Date(date), staffId);
    }
}
