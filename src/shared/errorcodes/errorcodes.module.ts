/* 
* NEST & Third party imports
*/
import { Module } from '@nestjs/common';

/* 
* Custom imports
*/
import { ErrorcodesService } from './errorcodes.service';
import { ErrorcodesController } from './errorcodes.controller';
import { ErrorCodes } from './errocodes.config';


@Module({
  providers: [ErrorcodesService, ErrorCodes],
  controllers: [ErrorcodesController]
})

export class ErrorcodesModule { }
