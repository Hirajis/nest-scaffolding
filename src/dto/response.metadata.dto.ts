/* 
* NEST & Third party imports
*/
import { ApiModelProperty } from "@nestjs/swagger";

/**
 * custom imports
 */
import { TasksDataDTO } from "./task.metadta.dto";



/* Data transfer object for user entitty */
export class ResponseMetadataDTO {

    @ApiModelProperty({ description: 'Request URI', example: '/v1/ping' })
    requestURL: string;

    @ApiModelProperty({ description: 'Request unique id', example: '12fcd324-922e-418c-9fe7-242e5a1e2e34' })
    evUniqueID: string;

    @ApiModelProperty({ description: 'Request timestamp', example: "2019-10-10T08:06:43+05:30" })
    requestTS: string;

    @ApiModelProperty({ description: 'Total elapsed time processsing the request', example: 915 })
    elapsedTimeInMS: number;

    @ApiModelProperty({ description: 'Host that serves the request', example: "MKzlZpr0mVihX2YXoFHQ6EjToyJPsDZSw7jMk0L/8G8=" })
    apiServer: string;

    @ApiModelProperty({ description: 'API build version', example: "1.0.0" })
    apiBuildVersion: string;

    @ApiModelProperty({ description: 'Error code (0=OK, >0=error)', example: 0 })
    errCode: Number;

    @ApiModelProperty({ description: 'Error message', example: "OK" })
    errMsg: string;

    @ApiModelProperty({ type: [TasksDataDTO], description: 'Available in non-PROD environment for auditing tasks taken to process this request' })
    tasks: Array<TasksDataDTO>
}
