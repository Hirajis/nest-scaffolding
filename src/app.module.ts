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
import { AppController } from './app.controller';
import { ErrorcodesModule } from './errorcodes/errorcodes.module';
import { ApiUtils } from './devutils/apiutils.route';
import { ErrorFilter } from './service/errorhandler.service';
import { OrderModule } from './devutils/order/order.module';
import { AuthModule } from './devutils/auth/auth.module';
import { SharedModule } from './shared.module';
import { AuthController } from './devutils/auth/auth.controller';
import { OrderController } from './devutils/order/order.controller';

/*
* Main module and Database connection configuration
*/
@Module({
  imports: [TypeOrmModule.forRoot(), ErrorcodesModule, OrderModule, AuthModule, SharedModule],
  controllers: [AppController, ApiUtils],
  providers: [{
    provide: APP_FILTER,
    useClass: ErrorFilter,
  }]
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
      .apply(AuthMiddleware)
      //.exclude()// add excluded routes which don't to pass through auth middleware 
      .forRoutes(OrderController)//Add contrller name
  }

}