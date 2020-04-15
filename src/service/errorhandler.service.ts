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
    let taskName = 'Error Handler service';

    try {

      this.response = host.switchToHttp().getResponse();
      this.request = host.switchToHttp().getRequest();

      let metadata = this.request.apiMeta;//metadata from default middleware
      if (metadata) {

        this.logger.debug(`[${this.request.evUniqueID}] ${this.MODULENAME} (${taskName}) `);

        let task = this.appService.createTaskMetaData(this.request.evUniqueID, taskName, error.stack);//create task

        let status = (error instanceof HttpException) ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        let responseobj = await this.appService.endMetaData(this.request.evUniqueID, 1, error.message, metadata, task);

        return this.response.status(status).json(responseobj);

      }
    } catch (error) {

      this.logger.error(`[${this.request.evUniqueID}] ${this.MODULENAME} (${taskName}): ${error.message}`);
      this.logger.debug(`[${this.request.evUniqueID}] ${this.MODULENAME} (${taskName}): ${error.stack}`);

    }

  }

}