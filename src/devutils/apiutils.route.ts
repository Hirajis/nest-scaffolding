/* 
* Nest & Third party imports
*/
import { Get, Req, Res, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { ApiExcludeEndpoint } from "@nestjs/swagger";

/* 
*Custom imports
*/
import { LogService } from '../service/logger.service';
import { AppService } from "../service/app.service";


/* 
* AppUtils Contoller
*/
@Controller('/apiutils/auth-token')
export class ApiUtils {

    MODULENAME = "ApiUtils";

    constructor(private logger: LogService, private appService: AppService) { }

    /**
     * 
     * @param req 
     * @param res - render on html template
     */
    @Get()
    @ApiExcludeEndpoint()
    authToken(@Req() req, @Res() res) {

        let taskname = "Auth token get method";

        try {

            this.logger.debug(`[${req.evUniqueID}](${this.MODULENAME})-(${taskname})`);

            // data
            const curDate = new Date();
            const expDate = new Date();

            expDate.setSeconds(curDate.getSeconds() + 300);

            const data = {
                "evUniqueID": req.evUniqueID,
                "username": 'Safal@1234',
                "exp": expDate.getTime(),
                "iat": curDate.getTime(),
                "useJWT": '',
                "jwt": '',
                "errMsg": ''
            };

            res.render('auth-token', { data: data });

        } catch (error) {

            this.logger.debug(`[${req.evUniqueID}](${this.MODULENAME})-(${taskname})- ${error.stack}`);
            this.logger.error(`[${req.evUniqueID}](${this.MODULENAME})-(${taskname})- ${error.message}`);

            throw error;
        }
    }

    /**
     * 
     * @param res - render on html template
     * @param req - user payload
     */
    @Post()
    @ApiExcludeEndpoint()
    async encodeJWT(@Req() req, @Res() res) {

        let taskName = "Auth token encode";

        try {

            this.logger.debug(`[${req.evUniqueID}](${this.MODULENAME})-(${taskName})- QueryData: ${JSON.stringify(req.body)}`);

            const data = {
                "evUniqueID": req.evUniqueID,
                "username": req.body.username,
                "exp": req.body.exp,
                "iat": req.body.iat,
                "useJWT": req.body.useJWT ? 'CHECKED' : '',
                "jwt": req.body.jwt,
                "errMsg": ''
            };


            let jwtPayload = {
                "userID": req.body.username,
                "exp": 0,
                "iat": 0,
            };

            // exp and iat - normalize them
            let exp = new Date(data.exp);
            let iat = new Date(data.iat);

            data.exp = exp.getTime();
            data.iat = iat.getTime();

            // exp and iat MUST be in seconds since EPOCH
            jwtPayload.exp = Math.floor(exp.getTime() / 1000);
            jwtPayload.iat = Math.floor(iat.getTime() / 1000);

            if (data.useJWT === 'CHECKED') {
                data.jwt = await this.appService.generateJWT(req.evUniqueID, jwtPayload);
            } else {
                data.jwt = await this.appService.generateJWTManual(req.evUniqueID, jwtPayload);
            }

            res.render('auth-token', { data: data })

        } catch (error) {

            this.logger.debug(`[${req.evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
            this.logger.error(`[${req.evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);

            throw error;

        }
    }
}