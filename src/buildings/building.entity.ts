import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';

@Entity('buildings')
export class BuildingEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    nullable: false,
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({
    nullable: false,
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  address: string;
}
