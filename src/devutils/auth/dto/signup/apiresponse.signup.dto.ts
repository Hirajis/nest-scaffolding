/**
 * nest or third party imports
 */
import { ApiModelProperty } from "@nestjs/swagger";

/*
* Custome imports
*/
import { APIResponseMetadataDTO } from '../../../../dto/apiresponse.metadata.dto'
import { ResponseSignupDTO } from "./response.signup.dto";

export class APIResponseSignupDTO extends APIResponseMetadataDTO {

    @ApiModelProperty({ type: ResponseSignupDTO, description: 'API response data' })
    result: ResponseSignupDTO
}