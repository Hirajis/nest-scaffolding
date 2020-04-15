/**
 * nest or third part imports
 */
import { ApiModelProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class APIRequestTokenValidatorDTO {

    @ApiModelProperty({ description: 'Refresh token', example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkhpcmFqaSIshdCI6fdfMTU3NDk0MTAwMX0.hLuelcTS56Jx7mmoLL6tNUj6zipbPU4K8V5dadfP4Afd" })
    @IsNotEmpty()
    refreshToken: string;
}