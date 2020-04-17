/* 
* NEST & Third party imports
*/
import { ApiModelProperty } from "@nestjs/swagger";

/**
 * custom imports
 */
import { ResponseMetadataDTO } from "./response.metadata.dto";

/* Data transfer object for user entitty */
export class APIResponseMetadataDTO {

    // MODULENAME = "APIResponseMetadataDTO";

    // constructor(private logger: LogService, private errorService: ErrorcodesService) {
    // }

    @ApiModelProperty({ type: ResponseMetadataDTO, description: 'This will give detail info of request to caller' })
    metadata: ResponseMetadataDTO

}
