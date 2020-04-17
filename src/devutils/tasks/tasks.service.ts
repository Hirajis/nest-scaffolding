import { Injectable } from '@nestjs/common';
import { LogService } from '../../shared/service/logger.service';

@Injectable()
export class TasksService {
    MODULENAME = "TasksService";
    /**
     * Write tasks in this class and configure here in the task configuration to execute as per scheduler configuration in db
     * Make sure jobId is present in the schedulerManagement table
     * To execute multiple tasks in one job assign same jobid to multiple tasks 
     */
    tasksConfig = [{
        "jobId": 2,
        "taskName": "sync source to destination",
        "description": "Data polling from source table",
        "taskFunction": this.sourceToDestinationDataSync()
    }, {
        "jobId": 4,
        "taskName": "sync source to destination",
        "description": "Data polling from destination table",
        "taskFunction": this.destinationToSourceDataSync()
    }];

    constructor(private logger: LogService) {
    }

    async sourceToDestinationDataSync() {
        const taskName = "sourceToDestinationDataSync method";
        //throw new Error("Error in task execurtion");
        try {
            let data = await "sourceToDestinationDataSync";
            return data;
        } catch (e) {
            this.logger.debug(`(${this.MODULENAME})-(${taskName})- ${e.stack}`);
            this.logger.error(`(${this.MODULENAME})-(${taskName})- ${e.message}`);

            throw e;
        }

    }

    async destinationToSourceDataSync() {
        const taskName = "destinationToSourceDataSync method";
        try {
            //throw new Error("Error in task execurtion");
            let data = await "sourceToDestinationDataSync";
            return data;
        } catch (e) {
            this.logger.debug(`(${this.MODULENAME})-(${taskName})- ${e.stack}`);
            this.logger.error(`(${this.MODULENAME})-(${taskName})- ${e.message}`);

            throw e;
        }
    }
}
