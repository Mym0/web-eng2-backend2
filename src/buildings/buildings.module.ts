import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingEntity } from './building.entity';
import { BuildingsController } from './buildings.controller';
import { BuildingsService } from './buildings.service';

@Module({
  imports: [TypeOrmModule.forFeature([BuildingEntity])],
  controllers: [BuildingsController],
  providers: [BuildingsService],
})
export class BuildingsModule {}
