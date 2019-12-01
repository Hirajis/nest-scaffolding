/*
* Nest & Third party imports
*/
import { Module, Global } from '@nestjs/common';

/*
* Custom imports
*/
import { AppService } from '../service/app.service';
import { ErrorcodesService } from '../errorcodes/errorcodes.service';
import { LogService } from '../service/logger.service';
import { ErrorCodes } from '../errorcodes/errocodes.config';
import { SharedConfig } from './shared.config';

/*
* Main module and Database connection configuration
*/
@Global()
@Module({
    providers: [LogService, AppService, ErrorcodesService, ErrorCodes, SharedConfig],
    exports: [LogService, AppService, ErrorcodesService, ErrorCodes, SharedConfig]
})

export class SharedModule {
}

