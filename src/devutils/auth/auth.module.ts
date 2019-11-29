/**
 * nest and third party imports
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * custom imports
 */
import { AuthController } from './auth.controller';
import { Login } from './entity/login.entity';
import { AuthService } from './auth.service';


@Module({
  imports: [TypeOrmModule.forFeature([Login])],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
