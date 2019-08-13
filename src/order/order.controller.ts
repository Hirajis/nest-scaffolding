import { Controller, Get, Req, Res } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

/* 
* Custome imports
*/
import { AppService } from '../service/app.service';
import { OrderService } from './order.service';
import { LogService } from '../service/logger.service';

@Controller('order')
export class OrderController {

    MODULENAME = "OrderController";



    constructor(private logger: LogService, private appService: AppService, private orderService: OrderService) {

    }

    //Ping route
    @Get()
    // @ApiOperation({ title: 'orders route to fech all orders' })
    //@ApiResponse({ status: 200, description: 'Success', type: responseMetadataDTO })
    //@ApiResponse({ status: 404, description: 'Not Found', type: responseMetadataDTO })
    orders(@Req() req, @Res() res) {
        const taskName = "/orders";
        const httpCode = 200; //default

        try {

            this.logger.debug(`[${req.evUniqueID}](${this.MODULENAME})-${taskName}`);

            const task = {
                name: taskName,
                info: "orders controller executed",
                elapsedTimeInMs: Date.now()
            }

            //throw new Error("error");
            this.orderService.findAll().then((resp) => {
                let pingdata = this.appService.endMetaData(req.evUniqueID, 0, "Executed Successfully", req.metadata, task);
                pingdata['result'] = resp;

                return res.status(httpCode).send(pingdata);
            })

        } catch (error) {

            this.logger.debug(`[${req.evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
            this.logger.error(`[${req.evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);

            throw error;

        }

    }
}
