/**
 * Nest and Third party imports
 */
import { NestMiddleware, Injectable } from '@nestjs/common';
import * as OktaJwtVerifier from '@okta/jwt-verifier';

/* 
* Custom imports
*/
import { LogService } from '../service/logger.service';
import { AppService } from '../service/app.service';

const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: 'https://dev-524932.okta.com/oauth2/default',
    clientId: '0oa28fw297VkmwiV4357',
    assertClaims: {
        aud: 'api://default',
    },
});

/* 
* JWT Authentication middleware
*/
@Injectable()
export class OAuth2Middleware implements NestMiddleware {

    MODULENAME = 'AuthMiddleware';

    constructor(private logger: LogService, private appService: AppService) { }

    async use(req: any, res: any, next: () => void) {
        let taskName = "JWTAuthentication";
        const evUniqueID = req.evUniqueID;// event unique request id  
        let httpCode = 200; //default
        let errorCode = 1; //default

        try {

            this.logger.debug(`[${evUniqueID}] ${this.MODULENAME} (${taskName})`);

            let apiMetaData = req.apiMeta;//metadata from default middleware
            let task = this.appService.createTaskMetaData(evUniqueID, taskName, "orders controller executed");//create task
            if (req.headers['authorization']) {

                try {

                    let authorization = req.headers['authorization'].split(' ');//read token from header

                    if (authorization[0] !== 'Bearer') {
                        httpCode = 401;
                        errorCode = 11;
                    } else {
                        const expectedAudience = 'api://default';

                        /* verify token method */
                        req.jwt = await oktaJwtVerifier.verifyAccessToken(authorization[1], expectedAudience);

                        return next();
                    }

                } catch (e) {
                    httpCode = 401;
                    errorCode = 12;

                    if (e.message === "jwt expired") {
                        errorCode = 13;//token expired
                    }

                    this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${e.stack}`);
                }

            } else {
                httpCode = 401;
                errorCode = 11;

            }

            let apiResp = this.appService.endMetaData(evUniqueID, errorCode, "", apiMetaData, task);

            return res.status(httpCode).send(apiResp);

        } catch (e) {

            this.logger.error(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName}): ${e.message}`);
            this.logger.debug(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName}): ${e.stack}`);

            throw e;
        }
    }

};
