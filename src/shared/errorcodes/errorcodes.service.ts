/* 
* Nest & Third party imports
 */
import { Injectable } from '@nestjs/common';

/* 
* custom imports
*/
import { ErrorCodes } from './errocodes.config';
import { errorCodes } from './interface/errorcode.interface';
import { LogService } from '../service/logger.service';

/* 
* Errorcodes Service
*/
@Injectable()
export class ErrorcodesService {

    MODULENAME = "ErrorcodesService";

    constructor(private logger: LogService, private errorCodes: ErrorCodes) { }

    /**
     * 
     * @param {string} evUniqueID EV unique Id
     * @param {number} errCode Error code
     * @param {string} errMsg  Error message
     */
    getErrorInformation(evUniqueID, errCode, errMsg): errorCodes {
        const taskName = "getErrorInformation";

        try {

            this.logger.debug(`[${evUniqueID}] ${this.MODULENAME}(${taskName})`);

            // convert to int just in case errCode is not
            const eCode = parseInt(errCode);

            // get error info
            const filtered = this.errorCodes.ErrorCodes.filter((item) => {
                return (item.code === eCode);
            });

            if (filtered.length > 0) {

                const filteredItem = filtered[0];

                if (filteredItem.canOverrideMessage) {

                    if (typeof errMsg === 'object') {
                        errMsg = Object.values(errMsg.message[0].constraints)[0];
                    } else {
                        errMsg = errMsg || filteredItem.message;
                    }

                } else {
                    // use default message
                    errMsg = filteredItem.message;
                }

                const errInfo = filteredItem;
                errInfo.message = errMsg;
                return errInfo;

            } else {

                throw new Error(`Unknown error code: ${errCode}`);

            }

        } catch (error) {

            this.logger.debug(`[${evUniqueID}] ${this.MODULENAME}(${taskName}): ${error.stack}`);
            this.logger.error(`[${evUniqueID}] ${this.MODULENAME}(${taskName}): ${error.message}`);

            throw error;
        }
    }
}