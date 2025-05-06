import { ApiProperty } from "@nestjs/swagger";

export class WorkloadDTO {
    @ApiProperty({ description: 'Date in YYYY-MM-DD format', example: '2023-10-01' })
    date: string;
    @ApiProperty({ description: 'Staff ID', example: 1 })
    staffId: number;
}