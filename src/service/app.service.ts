/* 
* Nest & Third party imports
*/
import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import * as crypt from 'crypto';
import * as jwt from 'jsonwebtoken';

/* 
* Custom imports
*/
import { TasksDataDTO } from '../dto/task.metadta.dto';
import { APIResponseMetadataDTO } from '../dto/apiresponse.metadata.dto';
import { ResponseMetadataDTO } from '../dto/response.metadata.dto';

import { ErrorcodesService } from '../errorcodes/errorcodes.service';
import { LogService } from './logger.service';

/* 
* shared service
*/
@Injectable()
export class AppService {

    MODULENAME = "AppService";

    constructor(private logger: LogService, private errorService: ErrorcodesService) { }

    /**
     * @param {string} evUniqueID EV Unique ID
     * @param {number} errCode  Error code
     * @param {string} errMsg   Error message
     * @param {JSON}   metadata JSON metadata object
     * @param {JSON}   task   task metadata object
     */
    endMetaData(evUniqueID: string, errCode: number, errMsg: string, metadata: ResponseMetadataDTO, task: TasksDataDTO): APIResponseMetadataDTO {

        const taskName = "endMetaData method";

        try {


            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-${taskName}`);

            const errorData = this.errorService.getErrorInformation(evUniqueID, errCode, errMsg);

            metadata.errCode = errorData.code;
            metadata.errMsg = errorData.message;
            metadata.elapsedTimeInMS = moment(Date.now()).diff(metadata.requestTS, 'milliseconds');
            if (process.env.NODE_ENV == 'development') {
                metadata.tasks[metadata.tasks.push({
                    name: task.name,
                    info: task.info,
                    startTS: moment().format(),
                    elapsedTimeInMS: moment(Date.now()).diff(task.elapsedTimeInMS, 'milliseconds')
                }) - 1];
            }

            return { metadata };

        } catch (error) {

            this.logger.error(`[${evUniqueID}](${this.MODULENAME})-${taskName}-${error.message}`);
            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-${taskName}-${error.stack}`);

            throw error;
        }
    }

    /**
     * @param {string} evUniqueID EV Unique ID
     * @param {number} task  task name
     * @param {string} info  task info
     */
    createTaskMetaData(evUniqueID, task, info): TasksDataDTO {

        const taskName = "createTaskMetaData method";

        try {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-${taskName}`);

            const taskMetaData = {
                name: task,
                info: info,
                elapsedTimeInMS: Date.now(),
                startTS: moment().format(),
            }

            return taskMetaData;

        } catch (error) {

            this.logger.error(`[${evUniqueID}](${this.MODULENAME})-${taskName}-${error.message}`);
            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-${taskName}-${error.stack}`);

            throw error;
        }
    }

    /**
     * Genarate JWT Token
     * @param {*} evUniqueID EV unique id
     * @param {*} data is user payload
     */
    async generateJWT(evUniqueID, data) {

        let taskName = 'generateJWT';

        try {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- QueryData: ${JSON.stringify(data)}`);

            let jwtHeader = {
                "alg": "HS256",
                "typ": "JWT"
            };

            return jwt.sign(data, process.env.JWTSECRET, { algorithm: 'HS256', header: jwtHeader });

        } catch (error) {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
            this.logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);

            throw error;
        }
    }

    /**
    * Manually generate JWT
    * @param {String} evUniqueID EV unique ID
    * @param {JSON} payload JWT payload
    */
    generateJWTManual(evUniqueID, payload) {

        const taskName = 'generateJWTManual';

        try {

            this.logger.debug(`[${evUniqueID}] ${this.MODULENAME}(${taskName}): ${JSON.stringify(payload)}`);

            let header = {
                "alg": "HS256",
                "typ": "JWT"
            };

            // base64urlencode
            const hdrEncoded = this.cleanUpJWTManual(evUniqueID, Buffer.from(JSON.stringify(header)).toString('base64'));

            // const payEncoded = encodeURI(Buffer.from(payload).toString('base64'));
            const payEncoded = this.cleanUpJWTManual(evUniqueID, Buffer.from(JSON.stringify(payload)).toString('base64'));

            const combined = hdrEncoded + '.' + payEncoded;

            // hash
            const origSig = crypt.createHmac('sha256', process.env.JWTSECRET).update(combined).digest('base64');
            const jwtSig = this.cleanUpJWTManual(evUniqueID, origSig);

            return `${combined}.${jwtSig}`;

        } catch (error) {

            this.logger.error(`[${evUniqueID}] ${this.MODULENAME}(${taskName}): ${error.message}`);
            this.logger.debug(`[${evUniqueID}] ${this.MODULENAME}(${taskName}): ${error.stack}`);

            throw error;
        }
    }

    /**
     * Clean up invalid Base64 chars to be used in JWT (for JWT generated manually)
     * @param {String} evUniqueID EV unique ID
     * @param {string} val Base64 JWT to clean up
     */
    cleanUpJWTManual(evUniqueID, val) {

        const taskName = 'cleanUpJWT';

        try {
            this.logger.debug(`[${evUniqueID}] ${this.MODULENAME}(${taskName}): ${val}`);

            val = val.replace(/\+/gi, '-');
            val = val.replace(/\//gi, '_');
            val = val.split('=')[0];

            return val;

        } catch (e) {

            this.logger.error(`[${evUniqueID}] ${this.MODULENAME}(${taskName}): ${e.message}`);
            this.logger.debug(`[${evUniqueID}] ${this.MODULENAME}(${taskName}): ${e.stack}`);

            throw e;
        }
    }
}
