/*
* Nest & Third party imports
*/
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

/*
* Custom imports
*/
import { DefaultMiddleware } from './middleware/default.middleware';
import { AuthMiddleware } from './middleware/auth.middleware';
import { PingController } from './ping/ping.controller';
import { AppController } from './app.controller';
import { AppService } from './service/app.service';
import { ErrorcodesModule } from './errorcodes/errorcodes.module';
import { ApiUtils } from './devutils/apiutils.route';
import { ErrorFilter } from './service/errorhandler.service';
import { ErrorcodesService } from './errorcodes/errorcodes.service';
import { LogService } from './service/logger.service';
//import { OrderService } from './order/order.service';
import { OrderModule } from './devutils/order/order.module';

/*
* Main module and Database connection configuration
*/
@Module({
  imports: [TypeOrmModule.forRoot(), ErrorcodesModule, OrderModule],
  controllers: [PingController, AppController, ApiUtils],
  providers: [LogService, AppService, ErrorcodesService, {
    provide: APP_FILTER,
    useClass: ErrorFilter,
  }],
  exports: [LogService, AppService, ErrorcodesService]
})


/* 
* Middleware Settings
*/
export class AppModule implements NestModule {

  /* For defult middleware apply for all routes */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DefaultMiddleware)
      .forRoutes('*')
    // .apply(AuthMiddleware)
    // .exclude()// add excluded routes which don't to pass through auth middleware 
    // .forRoutes()//Add contrller name
  }

}