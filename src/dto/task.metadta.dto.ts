import { ApiModelProperty } from "@nestjs/swagger";

export class TasksDataDTO {
    @ApiModelProperty({ description: 'Task name', example: "/ping" })
    name: string;

    @ApiModelProperty({ description: 'Task information', example: "controller executed" })
    info: string;

    @ApiModelProperty({ description: 'Task start timestamp', example: "2019-10-10T08:06:43+05:30" })
    startTS: string;

    @ApiModelProperty({ description: 'Total elapsed time processsing the task', example: 76 })
    elapsedTimeInMS: number
}