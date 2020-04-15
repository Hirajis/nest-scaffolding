/**
 * nest or third party imports
 */
import { ApiModelProperty } from "@nestjs/swagger";

/*
* Custome imports
*/
import { APIResponseMetadataDTO } from '../../../../dto/apiresponse.metadata.dto'
import { ResponseTokenDTO } from './response.token.dto'

export class APIResponseTokenDTO extends APIResponseMetadataDTO {

    @ApiModelProperty({ type: ResponseTokenDTO, description: 'API response data' })
    result: ResponseTokenDTO
}