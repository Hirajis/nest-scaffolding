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
import { LogService } from '../service/logger.service';


/* Default middleware */
@Injectable()
export class DefaultMiddleware implements NestMiddleware {

    MODULENAME = "DefaultMiddleware";

    constructor(private logger: LogService) {
    }

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

        let apiResp = {};

        try {

            /* create unique ID */
            const callGUID = uuid();

            this.logger.debug(`[${callGUID}](${this.MODULENAME}) - ${taskName}`);

            // assign a unique id to this request and response
            req.evUniqueID = callGUID;
            res.locals.evUniqueID = callGUID;//to share between middlewares

            // create API response metadata object since we can setup initial information
            apiResp["evUniqueID"] = callGUID;
            apiResp["requestURL"] = req.originalUrl;
            apiResp["apiServer"] = this.hashAPIServer(req.evUniqueID);
            apiResp["apiBuildVersion"] = process.env.npm_package_version || '--NOT AVAILABLE--';
            apiResp["requestTS"] = moment().format();
            apiResp["elapsedTimeInMS"] = Date.now();
            apiResp["errMsg"] = "--NOT SPECIFIED--";
            apiResp["errCode"] = 1;
            apiResp["tasks"] = [];

            req.apiMeta = apiResp;

            next();

        } catch (error) {

            this.logger.error(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName}): ${error.message}`);
            this.logger.debug(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName}): ${error.stack}`);

            throw error;
        }
    }

}