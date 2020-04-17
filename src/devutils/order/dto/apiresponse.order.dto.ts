/**
 * nest or third party imports
 */
import { ApiModelProperty } from "@nestjs/swagger";

/*
* Custome imports
*/
import { APIResponseMetadataDTO } from '../../../shared/dto/apiresponse.metadata.dto'
import { OrderDTO } from './response.order.dto'

export class OrderListAPIRespDTO extends APIResponseMetadataDTO {

    @ApiModelProperty({ type: [OrderDTO], description: 'API response data' })
    result: Array<OrderDTO>
}