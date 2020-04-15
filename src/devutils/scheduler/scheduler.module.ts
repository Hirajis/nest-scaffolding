import { Module, forwardRef } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { SchedulerController } from './scheduler.controller';
import { SchedulerManagement } from './entity/scheduler.management.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from '../tasks/tasks.module';
import { TasksService } from '../tasks/tasks.service';
import { SchedulerLoggerTable } from './entity/scheduler.logger.entity';
import { SchedulerQueryBuilderService } from './scheduler.query.builder';

@Module({
    imports: [TypeOrmModule.forFeature([SchedulerManagement, SchedulerLoggerTable]), TasksModule],
    controllers: [SchedulerController],
    providers: [SchedulerQueryBuilderService, SchedulerService, TasksService]
})

export class SchedulerModule { }
