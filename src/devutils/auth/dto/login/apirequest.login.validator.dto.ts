/**
 * nest or third part imports
 */
import { ApiModelProperty } from "@nestjs/swagger";

export class UserLoginDTO {

    @ApiModelProperty({ description: 'User name', example: "example@gmail.com" })
    username: string;

    @ApiModelProperty({ description: 'password', example: "###" })
    password: string;
}