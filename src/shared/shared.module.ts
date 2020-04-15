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
import { TwilioSmsService } from '../service/twilio/twilio.sms.service';
import { TwilioEmailService } from '../service/twilio/twilio.email.service';

/*
* Main module and Database connection configuration
*/
@Global()
@Module({
    providers: [LogService, AppService, ErrorcodesService, ErrorCodes, SharedConfig,TwilioSmsService,TwilioEmailService],
    exports: [LogService, AppService, ErrorcodesService, ErrorCodes, SharedConfig,TwilioSmsService,TwilioEmailService]
})

export class SharedModule {
}

