import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PatientMedicalHistoryService } from './patient-medical-history.service'
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Patient Medical History')
@Controller('patient-medical-history')
export class PatientMedicalHistoryController {
  constructor(private readonly service: PatientMedicalHistoryService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get patient medical history', description: 'Retrieves the medical history of a patient.' })
  @ApiParam({ name: 'id', description: 'ID of the patient whose medical history to be retrieved.' })
  async getHistoryByPatient(@Param('id') patientId: string) {
    return await this.service.getHistoryByPatient(patientId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete patient medical history', description: 'Deletes the medical history of a patient.' })
  @ApiParam({ name: 'id', description: 'ID of the patient whose medical history to be deleted.' })
  async deleteHistory(@Param('id') patientId: string) {    
    const res = await this.service.deleteHistory(patientId);
    if (!res) {
      throw new Error('Failed to delete history');
    }
    return { message: 'History deleted successfully' };
  }
  
  @Post(':id')
  @ApiOperation({ summary: 'Check if patient has records', description: 'Checks if the patient has any medical records.' })
  @ApiParam({ name: 'id', description: 'ID of the patient to check for records.' })
  async hasRecords(@Param('id') patientId: string) {    const res = await this.service.hasRecords(patientId);
    return { hasRecords: res };
  }
}
