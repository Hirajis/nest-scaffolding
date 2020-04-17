import { Injectable, OnModuleInit } from '@nestjs/common';
import { CronExpression, SchedulerRegistry, Cron } from '@nestjs/schedule';
import { CronJob } from 'cron';
import * as _ from 'lodash';
import { LogService } from '../../shared/service/logger.service';
import { TasksService } from '../tasks/tasks.service'
import { SchedulerQueryBuilderService } from './scheduler.query.builder';

@Injectable()
export class SchedulerService implements OnModuleInit {
    MODULENAME = 'SchedulerService';

    constructor(private logger: LogService, private readonly schedulerRegistry: SchedulerRegistry, public tasksService: TasksService, public queryService: SchedulerQueryBuilderService) {
    }

    onModuleInit() {
        this.registerJobsOnAppStartUp();
    }

    /**
     * Create job on app start up
     */
    async registerJobsOnAppStartUp() {
        const taskName = "registerJobsOnAppStartUp method";

        try {
            let jobsConfig = await this.queryService.getJobConfig();

            jobsConfig.forEach((job) => {
                if (job.isActive && job.jobType == 'cron') {
                    this.registerCronJob(job.id, job.name, job.cronPattern);
                } else if (job.isActive && job.jobType == 'interval') {
                    this.registerIntervalJob(job.id, job.name, job.cronTimeInMs);
                } else if (job.isActive && job.jobType == 'timeout') {
                    this.registerTimeoutJob(job.id, job.name, job.cronTimeInMs);
                }

            })

        } catch (e) {
            this.logger.debug(`(${this.MODULENAME})-(${taskName})- ${e.stack}`);
            this.logger.error(`(${this.MODULENAME})-(${taskName})- ${e.message}`);

            throw e;
        }

    }

    /**
     * Reschedule failed job
     */
    // @Cron('5 * * * * *')
    // async rescheduleJobs() {
    //     const taskName = "rescheduleJobs method";

    //     try {
    //         let jobs = await this.queryService.getJobsByJobState('Error');

    //         jobs.forEach((job) => {

    //             if (job.isActive && job.jobState == 'Error') {

    //                 if (job.jobType == 'cron') {
    //                     this.registerCronJob(job.id, job.name, job.cronPattern);
    //                 } else if (job.jobType == 'interval') {
    //                     this.registerIntervalJob(job.id, job.name, job.cronTimeInMs);
    //                 } else if (job.jobType == 'timeout') {
    //                     this.registerTimeoutJob(job.id, job.name, job.cronTimeInMs);
    //                 }

    //             }

    //         })
    //     } catch (e) {
    //         this.logger.debug(`(${this.MODULENAME})-(${taskName})- ${e.stack}`);
    //         this.logger.error(`(${this.MODULENAME})-(${taskName})- ${e.message}`);

    //         throw e;
    //     }
    // }

    /**
     * delete the job by job id
     * @param jobId job id to delete the job
     */
    async deleteJob(jobId: number) {
        const taskName = 'deleteJob method';

        try {

            //delete job by id
            this.queryService.deleteJobByJobId(jobId).then(async (resp) => {
                const job = await this.queryService.getJobConfigById(jobId);

                if (job.jobType == 'cron') {
                    this.deleteCron(job.name);
                } else if (job.jobType == 'interval') {
                    this.deleteInterval(job.name);
                } else if (job.jobType == 'timeout') {
                    this.deleteTimeout(job.name);
                }

            }).catch((e) => {
                this.queryService.schedulerLogger(e.message, `(${this.MODULENAME})-(${taskName})- ${e.message}`, jobId);

                this.logger.debug(`[${jobId}](${this.MODULENAME})-(${taskName})- ${e.stack}`);
                this.logger.error(`[${jobId}](${this.MODULENAME})-(${taskName})- ${e.message}`);
            })

        } catch (e) {
            this.queryService.schedulerLogger(e.message, `(${this.MODULENAME})-(${taskName})- ${e.message}`, jobId);

            this.logger.debug(`[${jobId}](${this.MODULENAME})-(${taskName})- ${e.stack}`);
            this.logger.error(`[${jobId}](${this.MODULENAME})-(${taskName})- ${e.message}`);

            throw e;

        }
    }

    /**
     * stops the job by job id
     * @param jobId job id to stop the job
     */
    async stopJob(jobId: number) {
        const taskName = 'stopJobByJobName method';

        try {

            this.queryService.deactivateJobByJobId(jobId).then(async (resp) => {
                const job = await this.queryService.getJobConfigById(jobId);

                if (job.jobType == 'cron') {
                    this.deleteCron(job.name);
                } else if (job.jobType == 'interval') {
                    this.deleteInterval(job.name);
                } else if (job.jobType == 'timeout') {
                    this.deleteTimeout(job.name);
                }

            }).catch((e) => {
                this.queryService.schedulerLogger(e.message, `(${this.MODULENAME})-(${taskName})- ${e.message}`, jobId);

                this.logger.debug(`[${jobId}](${this.MODULENAME})-(${taskName})- ${e.stack}`);
                this.logger.error(`[${jobId}](${this.MODULENAME})-(${taskName})- ${e.message}`);
            })

        } catch (e) {

            this.logger.debug(`[${jobId}](${this.MODULENAME})-(${taskName})- ${e.stack}`);
            this.logger.error(`[${jobId}](${this.MODULENAME})-(${taskName})- ${e.message}`);

            throw e;
        }
    }

    /**
     * start the job by job id
     * @param jobId job id to start the job
     */
    async startJob(jobId: number) {
        const taskName = 'startJob method';

        try {
            //start the stoped job
            this.queryService.activateJobByJobId(jobId).then(async (resp) => {
                const job = await this.queryService.getJobConfigById(jobId);

                if (job.jobType == 'cron') {
                    this.registerCronJob(job.id, job.name, job.cronPattern);
                } else if (job.jobType == 'interval') {
                    this.registerIntervalJob(job.id, job.name, job.cronTimeInMs);
                } else if (job.jobType == 'timeout') {
                    this.registerTimeoutJob(job.id, job.name, job.cronTimeInMs);
                }

            }).catch((e) => {
                this.queryService.schedulerLogger(e.message, `(${this.MODULENAME})-(${taskName})- ${e.message}`, jobId);

                this.logger.debug(`[${jobId}](${this.MODULENAME})-(${taskName})- ${e.stack}`);
                this.logger.error(`[${jobId}](${this.MODULENAME})-(${taskName})- ${e.message}`);
            })

        } catch (e) {
            this.queryService.schedulerLogger(e.message, `(${this.MODULENAME})-(${taskName})- ${e.message}`, jobId);

            this.logger.debug(`[${jobId}](${this.MODULENAME})-(${taskName})- ${e.stack}`);
            this.logger.error(`[${jobId}](${this.MODULENAME})-(${taskName})- ${e.message}`);

            throw e;

        }
    }

    /**
     * Create the cron job
     * @param jobId job id
     * @param name job name 
     * @param cronPattern job pattern
     */
    async registerCronJob(jobId: number, name: string, cronPattern: string) {
        const taskName = 'registerCronJob method';

        try {
            const job = new CronJob(`${cronPattern}`, () => {
                this.logger.debug(`Cron pattern (${cronPattern} for job ${name} to run!`);

                this.executeTask(jobId);
            });

            let taskObj = _.filter(this.tasksService.tasksConfig, ['jobId', jobId])[0];

            if (taskObj) {
                this.schedulerRegistry.addCronJob(name, job);
                job.start();

                this.queryService.updateJobStateByJobId(jobId, 'Started');
                this.logger.debug(
                    `job ${name} added for each minute for ${cronPattern} pattern!`,
                );
            }

        } catch (e) {
            //update job state when job failed
            this.queryService.updateJobStateByJobId(jobId, 'Error');

            this.queryService.schedulerLogger(e.message, `(${this.MODULENAME})-(${taskName})- ${e.message}`, jobId);

            this.logger.debug(`[${jobId}](${this.MODULENAME})-(${taskName})- ${e.stack}`);
            this.logger.error(`[${jobId}](${this.MODULENAME})-(${taskName})- ${e.message}`);

            throw e;
        }

    }

    /**
     * Execute the tasks dynamically as per job id added in task configuration
     * @param jobId job id
     * @param isAdhoc true - for adhoc job start, false - for non adhoc
     */
    async executeTask(jobId: number, isAdhoc?: boolean) {
        const taskName = 'executeTask';

        try {
            let taskObj = _.filter(this.tasksService.tasksConfig, ['jobId', Number(jobId)])[0];

            if (taskObj) {
                taskObj.taskFunction.then((resp) => {
                    this.logger.debug(resp);
                }).catch((e) => {

                    // log error details in case of job failure
                    this.queryService.schedulerLogger(e.message, `(${this.MODULENAME})-(${taskName})- ${e.message}`, jobId);

                    this.logger.debug(`[${jobId}](${this.MODULENAME})-(${taskName})- ${e.stack}`);
                    this.logger.error(`[${jobId}](${this.MODULENAME})-(${taskName})- ${e.message}`);
                })

            }

        } catch (e) {
            this.queryService.schedulerLogger(e.message, `(${this.MODULENAME})-(${taskName})- ${e.message}`, jobId);

            this.logger.debug(`[${jobId}](${this.MODULENAME})-(${taskName})- ${e.stack}`);
            this.logger.error(`[${jobId}](${this.MODULENAME})-(${taskName})- ${e.message}`);

            throw e;
        }
    }

    /**
     * delete registered job by job name
     * @param name job name
     */
    async deleteCron(name: string) {
        const taskName = "deleteCron method";

        try {
            this.schedulerRegistry.deleteCronJob(name);

            this.logger.debug(`job ${name} deleted!`);
        } catch (e) {
            this.logger.debug(`(${this.MODULENAME})-(${taskName})- ${e.stack}`);
            this.logger.error(`(${this.MODULENAME})-(${taskName})- ${e.message}`);

            throw e;
        }

    }

    /**
     * This will registered interval job
     * @param jobId job id
     * @param name job name
     * @param seconds job time in seconds
     */
    async registerIntervalJob(jobId: number, name: string, seconds: number) {
        const taskName = "registerIntervalJob method";

        try {
            const callback = () => {
                //execute task 
                this.executeTask(jobId);

                this.logger.debug(`Interval ${name} executing at time (${seconds})!`);
            };

            const interval = setInterval(callback, seconds);
            this.schedulerRegistry.addInterval(name, interval);
            //update job status
            this.queryService.updateJobStateByJobId(jobId, 'Started');
        } catch (e) {
            //update job state when job failed
            this.queryService.updateJobStateByJobId(jobId, 'Error');

            // log error details in case of job failure
            this.queryService.schedulerLogger(e.message, `(${this.MODULENAME})-(${taskName})- ${e.message}`, jobId);

            this.logger.debug(`[${jobId}](${this.MODULENAME})-(${taskName})- ${e.stack}`);
            this.logger.error(`[${jobId}](${this.MODULENAME})-(${taskName})- ${e.message}`);

            throw e;
        }
    }

    /**
     * Delete registered job from memory
     * @param name job name
     */
    async deleteInterval(name: string) {
        const taskName = "deleteInterval method";

        try {

            this.schedulerRegistry.deleteInterval(name);

            this.logger.debug(`Interval ${name} deleted!`);
        } catch (e) {

            this.logger.debug(`(${this.MODULENAME})-(${taskName})- ${e.stack}`);
            this.logger.error(`(${this.MODULENAME})-(${taskName})- ${e.message}`);

            throw e;
        }
    }

    /**
     * Registered timeout job
     * @param jobId job id
     * @param name job name
     * @param seconds time in seconds
     */
    async registerTimeoutJob(jobId: number, name: string, seconds: number) {
        const taskName = "registerTimeoutJob method";

        try {

            const callback = () => {
                //execute task 
                this.executeTask(jobId);
                //update job status after execution
                this.queryService.updateJobStateByJobId(jobId, 'Stopped');
                //deactive job after execution
                this.queryService.deactivateJobByJobId(jobId);
                this.logger.debug(`Timeout ${name} executing after (${seconds})!`);
            };

            const timeout = setTimeout(callback, seconds);
            this.schedulerRegistry.addTimeout(name, timeout);
            //update job status
            this.queryService.updateJobStateByJobId(jobId, 'Started');
        } catch (e) {

            //update job state when job failed
            this.queryService.updateJobStateByJobId(jobId, 'Error');

            // log error details in case of job failure
            this.queryService.schedulerLogger(e.message, `(${this.MODULENAME})-(${taskName})- ${e.message}`, jobId);

            this.logger.debug(`[${jobId}](${this.MODULENAME})-(${taskName})- ${e.stack}`);
            this.logger.error(`[${jobId}](${this.MODULENAME})-(${taskName})- ${e.message}`);

            throw e;
        }
    }

    /**
     * Delete registered timeout job by job name
     * @param name job name
     */
    async deleteTimeout(name: string) {
        const taskName = "deleteInterval method";

        try {

            this.schedulerRegistry.deleteTimeout(name);

            this.logger.debug(`Timeout ${name} deleted!`);
        } catch (e) {

            this.logger.debug(`(${this.MODULENAME})-(${taskName})- ${e.stack}`);
            this.logger.error(`(${this.MODULENAME})-(${taskName})- ${e.message}`);

            throw e;
        }
    }

}
