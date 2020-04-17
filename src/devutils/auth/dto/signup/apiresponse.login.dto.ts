/**
 * nest or third party imports
 */
import { ApiModelProperty } from "@nestjs/swagger";

/*
* Custome imports
*/
import { APIResponseMetadataDTO } from '../../../../shared/dto/apiresponse.metadata.dto'
import { ResponseSignupDTO } from "./response.signup.dto";

export class UserSignupAPIRespDTO extends APIResponseMetadataDTO {

    @ApiModelProperty({ type: ResponseSignupDTO, description: 'API response data' })
    result: ResponseSignupDTO
}