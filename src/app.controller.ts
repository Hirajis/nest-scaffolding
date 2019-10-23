/* 
* NEST & Third party imports
*/
import { Controller, Get, Req, Res } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiOperation, ApiResponse } from '@nestjs/swagger';

import * as moment from 'moment';

/* 
* Custome imports
*/
import { AppService } from './service/app.service';
import { LogService } from './service/logger.service';
import { ResponseMetadataDTO } from './dto/response.metadata.dto';

@Controller('ping')
export class AppController {
  MODULENAME = "ROOTCONTROLLER";

  constructor(private logger: LogService, private appService: AppService) {
  }

  //Ping route
  @Get()
  @ApiOperation({ title: 'Ping route for health check' })
  @ApiResponse({ status: 200, description: 'Success', type: ResponseMetadataDTO })
  @ApiResponse({ status: 404, description: 'Not Found', type: ResponseMetadataDTO })
  ping(@Req() req, @Res() res) {
    const taskName = "/ping";
    const httpCode = 200; //default

    try {

      this.logger.debug(`[${req.evUniqueID}](${this.MODULENAME})-${taskName}`);

      let apiMetaData = req.apiMeta;//metadata from default middleware
      let task = this.appService.createTaskMetaData(req.evUniqueID, taskName, "Ping controller executed");//create task

      let resp = this.appService.endMetaData(req.evUniqueID, 0, "", apiMetaData, task);

      return res.status(httpCode).send(resp);

    } catch (error) {

      this.logger.debug(`[${req.evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
      this.logger.error(`[${req.evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);

      throw error;

    }

  }
}