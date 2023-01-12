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
import { RoomEntity } from './room.entity';
import { Room } from './room.interface';
import { RoomsService } from './rooms.service';

@Controller('assets/rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() room: Room): Promise<Room & RoomEntity> {
    return this.roomsService.createRoom(room);
  }

  @Get()
  findAll(): Promise<RoomEntity[]> {
    return this.roomsService.findRooms();
  }

  @Get(':room_id')
  findById(@Param('room_id') room_id: string): Promise<RoomEntity> {
    return this.roomsService.findRoomById(room_id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':room_id')
  update(
    @Param('room_id') room_id: string,
    @Body() room: Room,
  ): Promise<UpdateResult> {
    return this.roomsService.updateRoom(room_id, room);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':room_id')
  delete(@Param('room_id') room_id: string): Promise<Observable<DeleteResult>> {
    return this.roomsService.deleteRoom(room_id);
  }
}
