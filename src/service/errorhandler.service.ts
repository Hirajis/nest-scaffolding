/* 
* Nset and third party imports
*/
import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus, Injectable } from '@nestjs/common';

/* 
* Custom imports
*/
import { AppService } from './app.service';
import { LogService } from '../service/logger.service';


/* 
* Error Handler middleware
* Handle error thrown from anywhere in whole application
*/
@Catch()
@Injectable()
export class ErrorFilter implements ExceptionFilter {

  MODULENAME = "ErrorFilter";
  response;
  request;

  //create instance
  constructor(private logger: LogService, private appService: AppService) { }

  async catch(error: Error, host: ArgumentsHost) {
    let taskName = 'Error-Service';

    try {

      this.response = host.switchToHttp().getResponse();
      this.request = host.switchToHttp().getRequest();


      if (this.request.metadata) {
        this.logger.debug(`[${this.request.evUniqueID}] ${this.MODULENAME} (${taskName}) `);

        let status = (error instanceof HttpException) ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        this.logger.error(`[${this.request.evUniqueID}] ${this.MODULENAME} (${taskName}): ${JSON.stringify(error.message)}`);
        this.logger.debug(`[${this.request.evUniqueID}] ${this.MODULENAME} (${taskName}): ${JSON.stringify(error.stack)}`);

        const task = {
          name: taskName,
          info: error.stack,
          elapsedTimeInMs: Date.now()
        }

        let responseobj = await this.appService.endMetaData(this.request.evUniqueID, 1, error.message, this.request.metadata, task);
        return this.response.status(status).json(responseobj);

      }
    } catch (error) {

      this.logger.error(`[${this.request.evUniqueID}] ${this.MODULENAME} (${taskName}): ${JSON.stringify(error.message)}`);
      this.logger.debug(`[${this.request.evUniqueID}] ${this.MODULENAME} (${taskName}): ${JSON.stringify(error.stack)}`);

    }

  }

}