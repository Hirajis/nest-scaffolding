/*
 * Nest and Third party imports
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import * as crypto from "crypto";
import * as os from "os";
import * as moment from "moment";

/* 
* custom imports
*/
import { apiResponse } from '../interfaces/metadata.interface';
import { LogService } from '../service/logger.service';


/* Default middleware */
@Injectable()
export class DefaultMiddleware implements NestMiddleware {

    MODULENAME = "DefaultMiddleware";

    apiResp = <apiResponse>{};

    constructor(private logger: LogService) { }

    /**
 * Hash API server name
 * @param evUniqueID req unique id
 */
    hashAPIServer(evUniqueID) {

        let taskName = "hashAPIServer";

        try {

            this.logger.debug(`[${evUniqueID}] ${this.MODULENAME} (${taskName})`);

            let hash = crypto.createHash('sha256');
            hash.update(os.hostname());

            return hash.digest('base64');

        } catch (error) {

            this.logger.error(`[${evUniqueID}] ${this.MODULENAME} (${taskName}): ${error.message}`);
            this.logger.debug(`[${evUniqueID}] ${this.MODULENAME} (${taskName}): ${error.stack}`);

            throw error;
        }
    };


    use(req: any, res: any, next: () => void) {

        let taskName = "defaut middleware handler";

        try {

            /* create unique ID */
            const callGUID = uuid();

            this.logger.debug(`[${callGUID}] ${this.MODULENAME} (${taskName})`);

            // assign a unique id to this request and response
            req.evUniqueID = callGUID;
            res.locals.evUniqueID = callGUID;//to share between middlewares

            // create API response metadata object since we can setup initial information
            this.apiResp.evUniqueID = callGUID;
            this.apiResp.requestURL = req.originalUrl;
            this.apiResp.apiServer = this.hashAPIServer(req.evUniqueID);
            this.apiResp.apiBuildVersion = process.env.npm_package_version || '--NOT AVAILABLE--';
            this.apiResp.requestTS = moment().format();
            this.apiResp.elapsedTimeInMS = Date.now();
            this.apiResp.tasks = [];

            req.metadata = this.apiResp;

            next();

        } catch (error) {

            this.logger.error(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName}): ${error.message}`);
            this.logger.debug(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName}): ${error.stack}`);

            throw error;
        }
    }

}