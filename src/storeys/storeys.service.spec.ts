import { Test, TestingModule } from '@nestjs/testing';
import { StoreysService } from './storeys.service';

describe('StoreysService', () => {
  let service: StoreysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreysService],
    }).compile();

    service = module.get<StoreysService>(StoreysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
