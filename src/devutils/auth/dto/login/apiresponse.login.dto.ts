/**
 * nest or third party imports
 */
import { ApiModelProperty } from "@nestjs/swagger";

/*
* Custome imports
*/
import { APIResponseMetadataDTO } from '../../../../dto/apiresponse.metadata.dto'
import { ResponseLoginDTO } from './response.login.dto'

export class APIResponseLoginDTO extends APIResponseMetadataDTO {

    @ApiModelProperty({ type: ResponseLoginDTO, description: 'API response data', default: [] })
    result: ResponseLoginDTO
}