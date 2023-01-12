import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreyEntity } from './storey.entity';
import { StoreysController } from './storeys.controller';
import { StoreysService } from './storeys.service';

@Module({
  imports: [TypeOrmModule.forFeature([StoreyEntity])],
  controllers: [StoreysController],
  providers: [StoreysService],
})
export class StoreysModule {}
