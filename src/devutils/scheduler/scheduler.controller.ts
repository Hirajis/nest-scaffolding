import { Controller, Get, Req, Res, Delete, Query, Put, Post, Body, Param } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { ApiResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { LogService } from '../../shared/service/logger.service';
import { AppService } from '../../shared/service/app.service';
import { APIResponseMetadataDTO } from 'src/shared/dto/apiresponse.metadata.dto';

@ApiUseTags('scheduler')
@Controller('scheduler/job')
export class SchedulerController {
    MODULENAME = "SchedulerController";

    constructor(private schedulerService: SchedulerService, private logger: LogService, private appService: AppService) { }

    //Ping route
    @Get('/ping')
    @ApiOperation({ title: 'Ping route for health check' })
    @ApiResponse({ status: 200, description: 'Success', type: APIResponseMetadataDTO })
    @ApiResponse({ status: 404, description: 'Not Found', type: APIResponseMetadataDTO })
    ping(@Req() req, @Res() res) {
        const taskName = "/ping";
        const httpCode = 200; //default

        try {

            this.logger.debug(`[${req.evUniqueID}](${this.MODULENAME})-${taskName}`);

            let apiMetaData = req.apiMeta;//metadata from default middleware
            let task = this.appService.createTaskMetaData(req.evUniqueID, taskName, "Scheduler ping controller executed");//create task

            let resp = this.appService.endMetaData(req.evUniqueID, 0, "", apiMetaData, task);

            return res.status(httpCode).send(resp);

        } catch (error) {

            this.logger.debug(`[${req.evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
            this.logger.error(`[${req.evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);

            throw error;

        }

    }

    @Get(':jobId/start')//start the job
    @ApiOperation({ title: 'start job by job id' })
    @ApiResponse({ status: 200, description: 'Success', type: APIResponseMetadataDTO })
    @ApiResponse({ status: 404, description: 'Not Found', type: APIResponseMetadataDTO })
    async startIntervalJob(@Req() req, @Param('jobId') jobId: number, @Res() res) {
        const taskName = "/start route";
        const httpCode = 200; //default
        const evUniqueID = req.evUniqueID;

        try {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-${taskName}`);

            let apiMetaData = req.apiMeta;//metadata from default middleware
            let task = this.appService.createTaskMetaData(evUniqueID, taskName, "start job API executed");//create task

            let resp = await this.schedulerService.startJob(jobId);

            let endMetaData = this.appService.endMetaData(evUniqueID, 0, "", apiMetaData, task);

            return res.status(httpCode).send(endMetaData);
        } catch (e) {
            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${e.stack}`);
            this.logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${e.message}`);

            throw e;
        }
    }

    @Get(':jobId/stop')
    @ApiOperation({ title: 'stop job by job id' })//stop the job
    @ApiResponse({ status: 200, description: 'Success', type: APIResponseMetadataDTO })
    @ApiResponse({ status: 404, description: 'Not Found', type: APIResponseMetadataDTO })
    async stopIntervalJob(@Req() req, @Param('jobId') jobId: number, @Res() res) {
        const taskName = "/start route";
        const httpCode = 200; //default
        const evUniqueID = req.evUniqueID;

        try {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-${taskName}`);

            let apiMetaData = req.apiMeta;//metadata from default middleware
            let task = this.appService.createTaskMetaData(evUniqueID, taskName, "stop job API executed");//create task

            let resp = await this.schedulerService.stopJob(jobId);

            let endMetaData = this.appService.endMetaData(evUniqueID, 0, "", apiMetaData, task);

            return res.status(httpCode).send(endMetaData);
        } catch (e) {
            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${e.stack}`);
            this.logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${e.message}`);

            throw e;
        }

    }

    @Post(':jobId/adhoc')//run the job on demand
    @ApiOperation({ title: 'on demand job run by id(AdHoc start)' })
    @ApiResponse({ status: 200, description: 'Success', type: APIResponseMetadataDTO })
    @ApiResponse({ status: 404, description: 'Not Found', type: APIResponseMetadataDTO })
    async adhocStartJob(@Req() req, @Param('jobId') jobId: number, @Res() res) {
        const taskName = "/adhoc route";
        const httpCode = 200; //default
        const evUniqueID = req.evUniqueID;

        try {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-${taskName}`);

            let apiMetaData = req.apiMeta;//metadata from default middleware
            let task = this.appService.createTaskMetaData(evUniqueID, taskName, "adhoc job API executed");//create task

            let resp = await this.schedulerService.executeTask(jobId, true);

            let endMetaData = this.appService.endMetaData(evUniqueID, 0, "", apiMetaData, task);

            return res.status(httpCode).send(endMetaData);
        } catch (e) {
            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${e.stack}`);
            this.logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${e.message}`);

            throw e;
        }

    }

    @Delete(':jobId/delete')
    @ApiOperation({ title: 'delete job by id' })//delete the job
    @ApiResponse({ status: 200, description: 'Success', type: APIResponseMetadataDTO })
    @ApiResponse({ status: 404, description: 'Not Found', type: APIResponseMetadataDTO })
    async deleteJob(@Req() req, @Param('jobId') jobId: number, @Res() res) {
        const taskName = "/delete route";
        const httpCode = 200; //default
        const evUniqueID = req.evUniqueID;

        try {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-${taskName}`);

            let apiMetaData = req.apiMeta;//metadata from default middleware
            let task = this.appService.createTaskMetaData(evUniqueID, taskName, "delete job API executed");//create task

            let resp = await this.schedulerService.deleteJob(jobId);

            let endMetaData = this.appService.endMetaData(evUniqueID, 0, "", apiMetaData, task);

            return res.status(httpCode).send(endMetaData);
        } catch (e) {
            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${e.stack}`);
            this.logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${e.message}`);

            throw e;
        }

    }

}
