/**
 * nest or third party imports
 */
import { ApiModelProperty } from "@nestjs/swagger";

/*
* Custome imports
*/
import { APIResponseMetadataDTO } from '../../../../dto/apiresponse.metadata.dto'
import { UserSignupRespDTO } from "./response.signup.dto";

export class UserSignupAPIRespDTO extends APIResponseMetadataDTO {

    @ApiModelProperty({ type: UserSignupRespDTO, description: 'API response data' })
    result: UserSignupRespDTO
}