/**
 * Nest and Third party imports
 */
import { NestMiddleware, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

/* 
* Custom imports
*/
import { LogService } from '../service/logger.service';
import { AppService } from 'src/service/app.service';

/* 
* JWT Authentication middleware
*/
@Injectable()
export class AuthMiddleware implements NestMiddleware {

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
            /* verify token method */
            req.jwt = await jwt.verify(authorization[1], process.env.JWTSECRET);

            return next();
          }

        } catch (e) {
          httpCode = 403;
          errorCode = 12;

          this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${e.stack}`);
          this.logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${e.message}`);

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
