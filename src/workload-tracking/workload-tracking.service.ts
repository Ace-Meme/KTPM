import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from 'src/entities/staff.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkloadTrackingService {
    constructor(@InjectRepository(Staff) private staffRepository: Repository<Staff>) {}

    detectFirstDayOfWeek(date: Date): Date {
        const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)
        const firstDayOfWeek = new Date(date);
        firstDayOfWeek.setDate(date.getDate() - dayOfWeek);
        return firstDayOfWeek;
    }
    async trackingWorkloadOfDay(dayOfWeek: Date, staffId: number){
        let staff = await this.staffRepository.findOne({where: {id: staffId}, relations: {schedules: true}});
        
        if(!staff){
            throw new BadRequestException(`Staff with id ${staffId} not found`);
        }

        let result : {
            day: Date,
            staffId: number,
            description: string,
            worksheet: string,
            workload: {startTime: number, endTime: number, description: string}[]
        } = { day : dayOfWeek, staffId: staffId, description: 'Workload from 6am to 6pm', worksheet: "000000000000", workload: [] };

        let startTime = 6;
        for(let i=0; i < staff.schedules.length; i++){
            let schedule = staff.schedules[i];
            if(schedule.date.getTime() === dayOfWeek.getTime()){
                let startTime = schedule.startTime;
                let endTime = schedule.endTime;
                for(let j = startTime; j < endTime; j++){
                    result.worksheet = result.worksheet.substring(0, j - startTime) + '1' + result.worksheet.substring(j+1 + startTime);
                }
                result.workload.push({startTime: schedule.startTime, endTime: schedule.endTime, description: schedule.description});
            }
        }
        return result;
    }
    async trackingWorkloadOfWeek(dayOfWeek: Date, staffId: number){
        let firstDayOfWeek = this.detectFirstDayOfWeek(dayOfWeek);
        let staff = await this.staffRepository.findOne({where: {id: staffId}, relations: {schedules: true}});

        if(!staff){
            throw new BadRequestException(`Staff with id ${staffId} not found`);
        }

        let result = { week : firstDayOfWeek, staffId: staffId, description: 'Workload from 6am to 6pm everyday', workload: [] };
        for(let i = 0; i < 7; i++){
            let workload = "000000000000"
            let currentDate = new Date(firstDayOfWeek);
            currentDate.setDate(firstDayOfWeek.getDate() + i);
            for(let j = 0; j < staff.schedules.length; j++){
                let schedule = staff.schedules[j];
                if(schedule.date.getTime() === currentDate.getTime()){
                    let startTime = schedule.startTime;
                    let endTime = schedule.endTime;
                    for(let k = startTime; k < endTime; k++){
                        workload = workload.substring(0, k) + '1' + workload.substring(k+1);
                    }
                }
            }
        }
    }
}
