import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';

@Entity('rooms')
export class RoomEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  storey_id: string;
}
