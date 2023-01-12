import { RoomsModule } from './rooms/rooms.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { config } from './orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreysModule } from './storeys/storeys.module';
import { BuildingsModule } from './buildings/buildings.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UsersModule,
    AuthModule,
    RoomsModule,
    StoreysModule,
    BuildingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
