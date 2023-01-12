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
import { StoreyEntity } from './storey.entity';
import { Storey } from './storey.interface';
import { StoreysService } from './storeys.service';

@Controller('assets/storeys')
export class StoreysController {
  constructor(private storeysService: StoreysService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() storey: Storey): Promise<Storey & StoreyEntity> {
    return this.storeysService.createStorey(storey);
  }

  @Get()
  findAll(): Promise<StoreyEntity[]> {
    return this.storeysService.findStoreys();
  }

  @Get(':storey_id')
  findById(@Param('storey_id') storey_id: string): Promise<StoreyEntity> {
    return this.storeysService.findStoreyById(storey_id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':storey_id')
  update(
    @Param('storey_id') storey_id: string,
    @Body() storey: Storey,
  ): Promise<UpdateResult> {
    return this.storeysService.updateStorey(storey_id, storey);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':storey_id')
  delete(
    @Param('storey_id') storey_id: string,
  ): Promise<Observable<DeleteResult>> {
    return this.storeysService.deleteStorey(storey_id);
  }
}
