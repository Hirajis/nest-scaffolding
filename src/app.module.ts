import { Module, NestModule, MiddlewareConsumer, RequestMethod, forwardRef } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultMiddleware } from './shared/middleware/default.middleware';
import { AuthMiddleware } from './shared/middleware/auth.middleware';
//import { OAuth2Middleware } from './middleware/oauth2.middleware';
import { AppController } from './app.controller';
import { ErrorcodesModule } from './shared/errorcodes/errorcodes.module';
import { ApiUtils } from './devutils/apiutils.route';
import { ErrorFilter } from './shared/service/errorhandler.service';
import { OrderModule } from './devutils/order/order.module';
import { AuthModule } from './devutils/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { OrderController } from './devutils/order/order.controller';
import { SchedulerModule } from './devutils/scheduler/scheduler.module';
//import { ScheduleModule } from 'nest-schedule';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './devutils/tasks/tasks.service';
import { TasksModule } from './devutils/tasks/tasks.module';

/*
* Nest & Third party imports
*/

/*
* Custom imports
*/

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
      //.apply(OAuth2Middleware)
      .forRoutes(OrderController)//Add contrller name
  }

}