/**
 * Nest and Third party imports
 */
import { NestMiddleware, Injectable, MiddlewareFunction } from '@nestjs/common';
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

  /*
  * Verify token if token unauthorized throw error msg otherwise continue. 
   */
  resolve(): MiddlewareFunction {
    return async (req, res, next) => {

      let taskName = "JWTAuthentication";

      try {

        this.logger.debug(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName})- In resolve method`);

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

            next(error);
          }

        } else {

          this.logger.error(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName}): Auth token missing`);
          this.logger.debug(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName}):Auth token missing`);

          next({ message: "Auth token missing", name: "JWT Token error", stack: "Please Send the auth token to every request" });

        }

      } catch (error) {

        this.logger.error(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName}): ${error.message}`);
        this.logger.debug(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName}): ${error.message}`);

        next(error);
      }

    }

  }

};
