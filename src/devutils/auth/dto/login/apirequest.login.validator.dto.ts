/**
 * nest or third part imports
 */
import { ApiModelProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class APIRequestLoginValidatorDTO {

    @ApiModelProperty({ description: 'User name', example: "example@gmail.com" })
    @IsEmail({}, {
        "message": "Invalid email id $value"
    })
    @IsNotEmpty()
    username: string;

    @ApiModelProperty({ description: 'password', example: "***" })
    @IsNotEmpty()
    password: string;
}