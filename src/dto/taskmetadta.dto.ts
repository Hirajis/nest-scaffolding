import { ApiModelProperty } from "@nestjs/swagger";

export class tasksDataDTO {
    @ApiModelProperty({description:'Task name'})
    name: string;

    @ApiModelProperty({description:'Task information'})
    info: string;
    
    @ApiModelProperty({description:'Task start timestamp'})
    startTS: string;
    
    @ApiModelProperty({description:'Total elapsed time processsing the task'})
    elapsedTimeInMS: Number
}