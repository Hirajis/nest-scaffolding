/**
 * nest or third party imports
 */
import { ApiModelProperty } from "@nestjs/swagger";

/*
* Custome imports
*/
import { APIResponseMetadataDTO } from '../../../../dto/apiresponse.metadata.dto'
import { UserLoginRespDTO } from './response.login.dto'

export class UserLoginAPIRespDTO extends APIResponseMetadataDTO {

    @ApiModelProperty({ type: UserLoginRespDTO, description: 'API response data' })
    result: UserLoginRespDTO
}