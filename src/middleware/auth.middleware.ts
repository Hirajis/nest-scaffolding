/**
 * Nest and Third party imports
 */
import { NestMiddleware, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

/* 
* Custom imports
*/
import { LogService } from '../service/logger.service';

/* 
* JWT Authentication middleware
*/
@Injectable()
export class AuthMiddleware implements NestMiddleware {

  MODULENAME = 'AuthMiddleware';

  constructor(private logger: LogService) { }

  async use(req: any, res: any, next: () => void) {

    let taskName = "JWTAuthentication";

    try {

      this.logger.debug(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName})`);

      const token = req.headers.authorization;

      if (token) {

        try {

          /* verify token method */
          let check = await jwt.verify(token, process.env.JWTSECRET);
          req.check = check;
          next();

        } catch (error) {

          this.logger.error(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName}): ${JSON.stringify(error.message)}`);
          this.logger.debug(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName}): ${JSON.stringify(error.message)}`);

          throw (error);
        }

      } else {

        this.logger.error(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName}): Auth token missing`);
        this.logger.debug(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName}):Auth token missing`);


        throw new Error("Auth token missing");

      }

    } catch (error) {

      this.logger.error(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName}): ${error.message}`);
      this.logger.debug(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName}): ${error.message}`);

      throw error;
    }
  }

};
