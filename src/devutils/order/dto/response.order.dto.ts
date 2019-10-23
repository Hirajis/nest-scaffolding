/**
 * nest or third part imports
 */
import { ApiModelProperty } from "@nestjs/swagger";
//import { APIResponseMetadataDTO } from '../../../dto/response.metadata.dto'

export class OrderDTO {

    @ApiModelProperty({ description: 'row id', example: 1 })
    id: number;

    @ApiModelProperty({ description: 'item name', example: "MI TV" })
    itemname: string;

    @ApiModelProperty({ description: 'quantity', example: 1 })
    quantity: string;
}