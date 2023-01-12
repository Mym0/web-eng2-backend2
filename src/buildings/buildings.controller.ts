import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { BuildingEntity } from './building.entity';
import { Building } from './building.interface';
import { BuildingsService } from './buildings.service';

@Controller('assets/buildings')
export class BuildingsController {
  constructor(private buildingsService: BuildingsService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() building: Building): Promise<Building & BuildingEntity> {
    return this.buildingsService.createBuilding(building);
  }

  @Get()
  findAll(): Promise<BuildingEntity[]> {
    return this.buildingsService.findBuildings();
  }

  @Get(':building_id')
  findById(@Param('building_id') building_id: string): Promise<BuildingEntity> {
    return this.buildingsService.findBuildingById(building_id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':building_id')
  update(
    @Param('building_id') building_id: string,
    @Body() building: Building,
  ): Promise<UpdateResult> {
    return this.buildingsService.updateBuilding(building_id, building);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':building_id')
  delete(
    @Param('building_id') building_id: string,
  ): Promise<Observable<DeleteResult>> {
    return this.buildingsService.deleteBuilding(building_id);
  }
}
