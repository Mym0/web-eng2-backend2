import { HttpException, Injectable } from '@nestjs/common';
import { DeleteResult, Equal, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildingEntity } from './building.entity';
import { Building } from './building.interface';
import { Observable } from 'rxjs';
import { checkIfValidUUID } from 'src/utils';

@Injectable()
export class BuildingsService {
  constructor(
    @InjectRepository(BuildingEntity)
    private readonly BuildingRepository: Repository<BuildingEntity>,
  ) {}

  async createBuilding(building: Building): Promise<Building & BuildingEntity> {
    const response = await this.BuildingRepository.findOneBy({
      name: building.name,
    });

    if (response) {
      throw new HttpException('already exists', 422);
    }
    return this.BuildingRepository.save(building);
  }

  async findBuildings(): Promise<BuildingEntity[]> {
    return this.BuildingRepository.find();
  }

  async findBuildingById(building_id: string): Promise<BuildingEntity> {
    if (!checkIfValidUUID(building_id)) {
      throw new HttpException('invalid id supplied', 400);
    }
    const response = await this.BuildingRepository.findOneBy({
      id: building_id,
    });

    if (!response) {
      throw new HttpException('not found', 404);
    }
    return response;
  }

  async updateBuilding(building_id: string, building: Building) {
    if (!checkIfValidUUID(building_id)) {
      throw new HttpException('invalid id supplied', 400);
    }
    const existGuard = await this.BuildingRepository.findOneBy({
      id: building_id,
    });

    if (!existGuard) {
      throw new HttpException('building not found or mismatching id', 422);
    }

    return this.BuildingRepository.update(building_id, building);
  }

  async deleteBuilding(building_id: string): Promise<Observable<DeleteResult>> {
    if (!checkIfValidUUID(building_id)) {
      throw new HttpException('invalid id supplied', 400);
    }
    const response = await this.BuildingRepository.findOneBy({
      id: building_id,
    });

    if (!response) {
      throw new HttpException('not found', 404);
    }

    await this.BuildingRepository.delete({
      id: building_id,
    });

    return;
  }
}
