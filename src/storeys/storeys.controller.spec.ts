import { Test, TestingModule } from '@nestjs/testing';
import { StoreysController } from './storeys.controller';

describe('StoreysController', () => {
  let controller: StoreysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreysController],
    }).compile();

    controller = module.get<StoreysController>(StoreysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
