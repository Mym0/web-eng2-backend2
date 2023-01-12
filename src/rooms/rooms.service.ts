import { HttpException, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from './room.entity';
import { Room } from './room.interface';
import {  Observable } from 'rxjs';
import { checkIfValidUUID } from 'src/utils';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly RoomRepository: Repository<RoomEntity>,
  ) {}

  async createRoom(room: Room) {
    return this.RoomRepository.save(room);
  }

  async findRooms(): Promise<RoomEntity[]> {
    return this.RoomRepository.find();
  }

  async findRoomById(room_id: string): Promise<RoomEntity> {
    if (!checkIfValidUUID(room_id)) {
      throw new HttpException('invalid id supplied', 400);
    }
    const response = await this.RoomRepository.findOneBy({
      id: room_id,
    });
console.log(
  response,'response'
);

    if (!response) {
      throw new HttpException('not found', 404);
    }
    return response;
  }

  async updateRoom(room_id: string, room: Room) {
    if (!checkIfValidUUID(room_id)) {
      throw new HttpException('invalid id supplied', 400);
    }
    const existGuard = await this.RoomRepository.findOneBy({
      id: room_id,
    });

    if (!existGuard) {
      throw new HttpException('room not found or mismatching id', 422);
    }

    return this.RoomRepository.update(room_id, room);
  }

  async deleteRoom(room_id: string): Promise<Observable<DeleteResult>> {
    if (!checkIfValidUUID(room_id)) {
      throw new HttpException('invalid id supplied', 400);
    }
    const response = await this.RoomRepository.findOneBy({
      id: room_id,
    });

    if (!response) {
      throw new HttpException('not found', 404);
    }

    await this.RoomRepository.delete({
      id: room_id,
    });

    return;
  }
}
