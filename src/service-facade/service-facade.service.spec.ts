import { Test, TestingModule } from '@nestjs/testing';
import { ServiceFacadeService } from './service-facade.service';

describe('ServiceFacadeService', () => {
  let service: ServiceFacadeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceFacadeService],
    }).compile();

    service = module.get<ServiceFacadeService>(ServiceFacadeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
