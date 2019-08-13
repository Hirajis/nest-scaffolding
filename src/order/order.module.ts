import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/* 
* Custome imports
*/
import { AppService } from '../service/app.service';
import { LogService } from '../service/logger.service';
import { ErrorcodesService } from '../errorcodes/errorcodes.service';
import { GeneralCodes } from '../errorcodes/general.errocodes.config';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entity/order.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [LogService, ErrorcodesService, GeneralCodes, AppService, OrderService],
  exports: [OrderService]
})

export class OrderModule { }
