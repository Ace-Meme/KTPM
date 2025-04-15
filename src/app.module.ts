import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceFacadeModule } from './service-facade/service-facade.module';
import { WorkloadTrackingModule } from './workload-tracking/workload-tracking.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database/hospital.db',
      entities: [],
      synchronize: true,
    }),
    ServiceFacadeModule,
    WorkloadTrackingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
