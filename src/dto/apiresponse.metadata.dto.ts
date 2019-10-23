/* 
* NEST & Third party imports
*/
import { ApiModelProperty } from "@nestjs/swagger";
import * as moment from 'moment';

/**
 * custom imports
 */
import { ResponseMetadataDTO } from "./response.metadata.dto";

import { LogService } from "src/service/logger.service";
import { ErrorcodesService } from "src/errorcodes/errorcodes.service";


/* Data transfer object for user entitty */
export class APIResponseMetadataDTO {

    // MODULENAME = "APIResponseMetadataDTO";

    // constructor(private logger: LogService, private errorService: ErrorcodesService) {
    // }

    @ApiModelProperty({ type: ResponseMetadataDTO, description: 'This will give detail info of request to caller' })
    metadata: ResponseMetadataDTO

}
