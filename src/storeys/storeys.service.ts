import { HttpException, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreyEntity } from './storey.entity';
import { Storey } from './storey.interface';
import { from, Observable } from 'rxjs';
import { checkIfValidUUID } from 'src/utils';

@Injectable()
export class StoreysService {
  constructor(
    @InjectRepository(StoreyEntity)
    private readonly StoreyRepository: Repository<StoreyEntity>,
  ) {}

  async createStorey(storey: Storey) {
    return this.StoreyRepository.save(storey);
  }

  async findStoreys(): Promise<StoreyEntity[]> {
    return this.StoreyRepository.find();
  }

  async findStoreyById(storey_id: string): Promise<StoreyEntity> {
    if (!checkIfValidUUID(storey_id)) {
      throw new HttpException('invalid id supplied', 400);
    }
    const response = await this.StoreyRepository.findOneBy({
      id: storey_id,
    });

    if (!response) {
      throw new HttpException('not found', 404);
    }
    return response;
  }

  async updateStorey(storey_id: string, storey: Storey) {
    if (!checkIfValidUUID(storey_id)) {
      throw new HttpException('invalid id supplied', 400);
    }
    const existGuard = await this.StoreyRepository.findOneBy({
      id: storey_id,
    });

    if (!existGuard) {
      throw new HttpException('storey not found or mismatching id', 422);
    }

    return this.StoreyRepository.update(storey_id, storey);
  }

  async deleteStorey(storey_id: string): Promise<Observable<DeleteResult>> {
    if (!checkIfValidUUID(storey_id)) {
      throw new HttpException('invalid id supplied', 400);
    }
    const response = await this.StoreyRepository.findOneBy({
      id: storey_id,
    });

    if (!response) {
      throw new HttpException('not found', 404);
    }

    await this.StoreyRepository.delete({
      id: storey_id,
    });

    return;
  }
}
