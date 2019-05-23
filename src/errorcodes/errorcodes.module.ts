/* 
* NEST & Third party imports
*/
import { Module } from '@nestjs/common';

/* 
* Custom imports
*/
import { ErrorcodesService } from './errorcodes.service';
import { ErrorcodesController } from './errorcodes.controller';
import { GeneralCodes } from './general.errocodes.config';
import { LogService } from '../service/logger.service';


@Module({
  providers: [LogService, ErrorcodesService, GeneralCodes],
  controllers: [ErrorcodesController],
  exports: [ErrorcodesService, GeneralCodes]
})
export class ErrorcodesModule { }
