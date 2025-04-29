import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceFacadeModule } from './service-facade/service-facade.module';
import { WorkloadTrackingModule } from './workload-tracking/workload-tracking.module';
import { Patient } from './entities/patient.entity'; 
import { Staff, ScheduleAppointment, Doctor, Nurse } from './entities/staff.entity'; 
import { PatientRegisterModule } from './patient-register/patient-register.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database/hospital.db',
      entities: [
        Patient,     
        Staff,
        ScheduleAppointment,    
        Doctor,
        Nurse  
      ],
      synchronize: true,
      //autoLoadEntities: true,
    }),
    ServiceFacadeModule,
    WorkloadTrackingModule,
    PatientRegisterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
