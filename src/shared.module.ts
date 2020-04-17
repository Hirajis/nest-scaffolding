/*
* Nest & Third party imports
*/
import { Module, Global } from '@nestjs/common';

/*
* Custom imports
*/
import { AppService } from './shared/service/app.service';
import { ErrorcodesService } from './shared/errorcodes/errorcodes.service';
import { LogService } from './shared/service/logger.service';
import { ErrorCodes } from './shared/errorcodes/errocodes.config';

/*
* Main module and Database connection configuration
*/
@Global()
@Module({
    providers: [LogService, AppService, ErrorcodesService, ErrorCodes],
    exports: [LogService, AppService, ErrorcodesService, ErrorCodes]
})

export class SharedModule {
}

