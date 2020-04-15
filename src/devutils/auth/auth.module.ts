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
import { OrderModule } from '../order/order.module';
import { OrderService } from '../order/order.service';


@Module({
  imports: [TypeOrmModule.forFeature([Login]), OrderModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
