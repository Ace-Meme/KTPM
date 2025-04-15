import { Module } from '@nestjs/common';
import { ServiceFacadeService } from './service-facade.service';

@Module({
  providers: [ServiceFacadeService]
})
export class ServiceFacadeModule {}
