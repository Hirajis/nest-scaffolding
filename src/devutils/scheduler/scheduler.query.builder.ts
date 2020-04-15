import { SchedulerManagement } from "./entity/scheduler.management.entity";
import { getConnection } from "typeorm";
import { SchedulerLoggerTable } from "./entity/scheduler.logger.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SchedulerQueryBuilderService {


    async getJobConfigById(jobId) {
        return await getConnection().createQueryBuilder().select('job')
            .from(SchedulerManagement, "job")
            .where("job.id = :id", { id: jobId })
            .getOne()
    }

    async getJobsByJobState(jobState) {
        return await getConnection().createQueryBuilder().select('job')
            .from(SchedulerManagement, "job")
            .where("job.jobState = :jobState", { jobState: jobState })
            .getMany()
    }

    async getJobConfig() {
        return await getConnection()
            .createQueryBuilder()
            .select('job')
            .from(SchedulerManagement, "job")
            .getMany();
    }

    async updateJobStateByJobId(jobId, jobState) {
        await getConnection()
            .createQueryBuilder()
            .update(SchedulerManagement)
            .set({ jobState: jobState })
            .where("id = :id", { id: jobId })
            .execute();
    }

    async activateJobByJobId(jobId) {
        await getConnection()
            .createQueryBuilder()
            .update(SchedulerManagement)
            .set({ "isActive": true })
            .where("id = :id", { id: jobId })
            .execute();
        //Update jobState to running
        this.updateJobStateByJobId(jobId, "Started");
    }

    async deactivateJobByJobId(jobId) {
        await getConnection()
            .createQueryBuilder()
            .update(SchedulerManagement)
            .set({ "isActive": false })
            .where("id = :id", { id: jobId })
            .execute();
        //Update jobState to stopped
        this.updateJobStateByJobId(jobId, "Stopped");
    }

    async deleteJobByJobId(jobId) {
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(SchedulerManagement)
            .where("id = :id", { id: jobId })
            .execute();
    }

    async schedulerLogger(message, description, jobId) {
        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(SchedulerLoggerTable)
            .values([
                { errorType: "Error", errorMessage: message, description: description, jobId: jobId }
            ])
            .execute();
    }
}

