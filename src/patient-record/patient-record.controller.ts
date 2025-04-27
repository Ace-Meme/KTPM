import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PatientRecordService } from './patient-record.service';
import { PatientRecord } from '../entities/patient-record.entity';
import { CreatePatientRecordDto } from './dto/create-patient-record.dto';
import { UpdatePatientRecordDto } from './dto/update-patient-record.dto';

@Controller('patient-records')
export class PatientRecordController {
  constructor(private readonly service: PatientRecordService) {}

  @Get()
  async findAll(): Promise<PatientRecord[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PatientRecord> {
    return this.service.findOne(id);
  }

  @Post()
  async create(@Body() createDto: CreatePatientRecordDto): Promise<PatientRecord> {
    return this.service.create(createDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDto: UpdatePatientRecordDto,
  ): Promise<PatientRecord> {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.service.remove(id);
  }
}
