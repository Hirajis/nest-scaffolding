/* 
* NEST & Third party imports
*/
import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';


@Controller()
export class AppController {

    constructor() { }
    @Get()
    @ApiExcludeEndpoint()
    getHello(): string {
      return "Hello World!"
    }
}