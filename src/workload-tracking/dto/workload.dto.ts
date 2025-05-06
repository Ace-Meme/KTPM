import { ApiProperty } from "@nestjs/swagger";

export class WorkloadDTO {
    @ApiProperty({ description: 'Date in number', example: 1 })
    date: number;
    @ApiProperty({ description: 'Staff ID', example: 1 })
    staffId: number;
}