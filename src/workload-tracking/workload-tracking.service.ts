import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from 'src/entities/staff.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkloadTrackingService {
    constructor(@InjectRepository(Staff) private staffRepository: Repository<Staff>) {}

    async trackingWorkloadOfDay(dayOfWeek: number, staffId: number){
        let staff = await this.staffRepository.findOne({where: {id: staffId}, relations: {workingSchedules: true}});
        
        if(!staff){
            throw new BadRequestException(`Staff with id ${staffId} not found`);
        }

        let result : {
            day: number,
            staffId: number,
            description: string,
            worksheet: string,
            workload: {startTime: number, endTime: number}[]
        } = { day : dayOfWeek, staffId: staffId, description: 'Workload from 6am to 6pm', worksheet: "00|01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|", workload: [] };

        //console.log(staff.workingSchedules);
        for(let i=0; i < staff.workingSchedules.length; i++){
            let schedule = staff.workingSchedules[i];
            if(schedule.dayOfWeek === dayOfWeek){
                let startTime = schedule.startTime;
                let endTime = schedule.endTime;
                for(let j = startTime; j < endTime; j++){
                    result.worksheet = result.worksheet.substring(0, j * 3) + '__' + result.worksheet.substring(j * 3 + 2);
                }
                result.workload.push({startTime: schedule.startTime, endTime: schedule.endTime});
            }
        }
        return result;
    }
}
