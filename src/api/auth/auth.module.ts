import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/core';
import { GuardModule } from 'src/common';
import { BcryptService } from 'src/infrastructure';

@Module({
  imports:[TypeOrmModule.forFeature([Users]),GuardModule],
  controllers: [AuthController],
  providers: [AuthService,BcryptService],
})
export class AuthModule {}
