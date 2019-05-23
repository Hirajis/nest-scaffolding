/* 
* NEST & Third party imports
*/
import { ApiModelProperty } from "@nestjs/swagger";
import { tasksDataDTO } from "./taskmetadta.dto";



/* Data transfer object for user entitty */
export class responseMetadataDTO {

    @ApiModelProperty({description:'Request URI'})
    requestURL: string;

    @ApiModelProperty({description:'Request unique id'})
    evUniqueID: string;

    @ApiModelProperty({description:'Request timestamp'})
    requestTS: string;

    @ApiModelProperty({description:'Total elapsed time processsing the request'})
    elapsedTimeInMS: number;

    @ApiModelProperty({description:'Host that serves the request'})
    apiServer: string;

    @ApiModelProperty({description:'API build version'})
    apiBuildVersion: string;

    @ApiModelProperty({description:'Error code (0=OK, >0=error)'})
    errCode: Number;

    @ApiModelProperty({description:'Error message'})
    errMsg: string;

    @ApiModelProperty({description:'Request timestamp'})
    errName: string;

    @ApiModelProperty({type:tasksDataDTO,description:'Available in non-PROD environment for auditing tasks taken to process this request'})
    tasks:Array<tasksDataDTO>
}
