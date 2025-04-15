import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from 'src/entities/staff.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkloadTrackingService {
    constructor(@InjectRepository(Doctor) private patientRepository: Repository<Doctor>) {}

    async tracking(){
        
    }
}
