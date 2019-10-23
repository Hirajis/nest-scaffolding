/**
 * nest or third party imports
 */
import { ApiModelProperty } from "@nestjs/swagger";
import { validate, validateOrReject, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max, Allow } from "class-validator";
//import { Transform } from 'class-transformer';

/*
* Custome imports
*/
import { OrderDTO } from "./response.order.dto";
import { max } from "moment";

export class OrderIdDTO {

    @ApiModelProperty({ description: 'order id', example: 1 })
    @Allow()
    id: number;

}

export class CreateOrderDTO extends OrderIdDTO {

    @ApiModelProperty({ description: 'item name', example: "MI TV" })
    itemname: string;

    @ApiModelProperty({ description: 'quantity', example: 1 })
    quantity: string;

}
