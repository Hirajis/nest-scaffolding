/**
 * Nest and Third party imports
 */
import { Controller, Post, Req, Res, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

/**
 * Custom imports
 */
import { LogService } from '../../service/logger.service';
import { AppService } from '../../service/app.service';
import { AuthService } from './auth.service';
import { APIResponseMetadataDTO } from '../../dto/apiresponse.metadata.dto';
import { UserLoginAPIRespDTO } from './dto/login/apiresponse.login.dto';
import { UserLoginDTO } from './dto/login/apirequest.login.validator.dto';
import { UserSignupAPIRespDTO } from './dto/signup/apiresponse.login.dto';
import { UserSignupDTO } from './dto/signup/apirequest.signup.validator.dto';

@Controller('auth')
export class AuthController {
    MODULENAME = "AuthController";

    constructor(private logger: LogService, private appService: AppService, private authService: AuthService) {
    }

    //login
    @Post('/login')
    @ApiOperation({ title: 'login' })
    @ApiResponse({ status: 200, description: 'Success', type: UserLoginAPIRespDTO })
    @ApiResponse({ status: 404, description: 'Not Found', type: APIResponseMetadataDTO })
    async login(@Req() req, @Body() body: UserLoginDTO, @Res() res) {
        const taskName = "login method";
        let httpCode = 200; //default
        let errorCode = 0; //default
        const evUniqueID = req.evUniqueID;// event unique request id 

        try {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-${taskName}`);

            let apiMetaData = req.apiMeta;//metadata from default middleware
            let task = this.appService.createTaskMetaData(evUniqueID, taskName, "login method executed");//create task

            let resp = await this.authService.login(body);

            if (resp && resp['errorCode']) {
                httpCode = resp['httpCode'];
                errorCode = resp['errorCode'];

                resp = null;
            }

            let apiResp = this.appService.endMetaData(evUniqueID, errorCode, "", apiMetaData, task);
            apiResp['result'] = resp;

            return res.status(httpCode).send(apiResp);

        } catch (e) {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${e.stack}`);
            this.logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${e.message}`);

            throw e;

        }
    }

    //signup
    @Post('/signup')
    @ApiOperation({ title: 'signup' })
    @ApiResponse({ status: 200, description: 'Success', type: UserSignupAPIRespDTO })
    @ApiResponse({ status: 404, description: 'Not Found', type: APIResponseMetadataDTO })
    async signup(@Req() req, @Body() body: UserSignupDTO, @Res() res) {
        const taskName = "signup method";
        let httpCode = 200; //default
        let errorCode = 0; //default
        const evUniqueID = req.evUniqueID;// event unique request id 

        try {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-${taskName}`);

            let apiMetaData = req.apiMeta;//metadata from default middleware
            let task = this.appService.createTaskMetaData(evUniqueID, taskName, "signup method executed");//create task

            let resp = await this.authService.signup(body);

            let apiResp = this.appService.endMetaData(evUniqueID, errorCode, "", apiMetaData, task);
            apiResp['result'] = resp;

            return res.status(httpCode).send(apiResp);

        } catch (e) {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${e.stack}`);
            this.logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${e.message}`);

            throw e;

        }
    }

}
