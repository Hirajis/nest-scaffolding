import { Controller, Get, Req, Res, Query, Param, Post, Delete, Body } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

/* 
* Custome imports
*/
import { AppService } from '../../shared/service/app.service';
import { OrderService } from './order.service';
import { LogService } from '../../shared/service/logger.service';

import { APIResponseMetadataDTO } from '../../shared/dto/apiresponse.metadata.dto';
import { OrderListAPIRespDTO } from './dto/apiresponse.order.dto';
import { CreateOrderDTO, OrderIdDTO } from './dto/apirequest.validator.dto';

@ApiBearerAuth()
@ApiUseTags('orders')
@Controller('orders')
export class OrderController {
    MODULENAME = "OrderController";

    constructor(private logger: LogService, private appService: AppService, private orderService: OrderService) {
    }

    //get orders
    @Get()
    @ApiOperation({ title: 'Get orders' })
    @ApiResponse({ status: 200, description: 'Success', type: OrderListAPIRespDTO })
    @ApiResponse({ status: 404, description: 'Not Found', type: APIResponseMetadataDTO })
    async getOrders(@Req() req, @Res() res) {
        const taskName = "getOrders";
        const httpCode = 200; //default
        const evUniqueID = req.evUniqueID;

        try {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-${taskName}`);

            let apiMetaData = req.apiMeta;//metadata from default middleware
            let task = this.appService.createTaskMetaData(evUniqueID, taskName, "orders controller executed");//create task

            let resp = await this.orderService.findAll();

            let endMetaData = this.appService.endMetaData(evUniqueID, 0, "", apiMetaData, task);
            endMetaData['result'] = resp;

            return res.status(httpCode).send(endMetaData);

        } catch (e) {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${e.stack}`);
            this.logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${e.message}`);

            throw e;

        }

    }

    //get order
    @Get("/:id")
    @ApiOperation({ title: 'Get order' })
    @ApiResponse({ status: 200, description: 'Success', type: OrderListAPIRespDTO })
    @ApiResponse({ status: 404, description: 'Not Found', type: APIResponseMetadataDTO })
    async getOrderById(@Req() req, @Param() param: OrderIdDTO, @Res() res) {
        const taskName = "getOrderById";
        const httpCode = 200; //default
        const evUniqueID = req.evUniqueID;

        try {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-${taskName}`);

            let apiMetaData = req.apiMeta;//metadata from default middleware
            let task = this.appService.createTaskMetaData(evUniqueID, taskName, "orders controller executed");//create task

            let resp = await this.orderService.findById(req.params.id);

            let endMetaData = this.appService.endMetaData(evUniqueID, 0, "", apiMetaData, task);
            endMetaData['result'] = resp;

            return res.status(httpCode).send(endMetaData);

        } catch (e) {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${e.stack}`);
            this.logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${e.message}`);

            throw e;

        }

    }

    //Create an order
    @Post()
    @ApiOperation({ title: 'Create an order' })
    @ApiResponse({ status: 201, description: 'Record created success', type: APIResponseMetadataDTO })
    @ApiResponse({ status: 404, description: 'Not Found', type: APIResponseMetadataDTO })
    async createOrder(@Req() req, @Body() createOrder: CreateOrderDTO, @Res() res) {
        const taskName = "createOrder";
        const httpCode = 200; //default
        const evUniqueID = req.evUniqueID;

        try {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-${taskName}`);

            let apiMetaData = req.apiMeta;//metadata from default middleware
            let task = this.appService.createTaskMetaData(evUniqueID, taskName, "orders controller executed");//create task

            let resp = await this.orderService.create(createOrder);

            let endMetaData = this.appService.endMetaData(evUniqueID, 0, "", apiMetaData, task);
            endMetaData['result'] = resp;

            return res.status(httpCode).send(endMetaData);

        } catch (e) {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${e.stack}`);
            this.logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${e.message}`);

            throw e;

        }

    }

    //update an order
    @Post("/:id")
    @ApiOperation({ title: 'Update order' })
    @ApiResponse({ status: 200, description: 'Success', type: APIResponseMetadataDTO })
    @ApiResponse({ status: 404, description: 'Not Found', type: APIResponseMetadataDTO })
    async updateOrder(@Req() req, @Res() res) {
        const taskName = "updateOrder";
        const httpCode = 200; //default
        const evUniqueID = req.evUniqueID;

        try {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-${taskName}`);

            let apiMetaData = req.apiMeta;//metadata from default middleware
            let task = this.appService.createTaskMetaData(evUniqueID, taskName, "orders controller executed");//create task

            let resp = await this.orderService.create(req.body);

            let endMetaData = this.appService.endMetaData(evUniqueID, 0, "", apiMetaData, task);
            endMetaData['result'] = resp;

            return res.status(httpCode).send(endMetaData);

        } catch (e) {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${e.stack}`);
            this.logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${e.message}`);

            throw e;

        }

    }

    //Delete order
    @Delete("/:id")
    @ApiOperation({ title: 'Delete order' })
    @ApiResponse({ status: 200, description: 'Success', type: APIResponseMetadataDTO })
    @ApiResponse({ status: 404, description: 'Not Found', type: APIResponseMetadataDTO })
    async deleteOrder(@Req() req, @Res() res) {
        const taskName = "Delete order";
        const httpCode = 200; //default
        const evUniqueID = req.evUniqueID;

        try {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-${taskName}`);

            let apiMetaData = req.apiMeta;//metadata from default middleware
            let task = this.appService.createTaskMetaData(evUniqueID, taskName, "orders controller executed");//create task

            let resp = await this.orderService.create(req.body);

            let endMetaData = this.appService.endMetaData(evUniqueID, 0, "", apiMetaData, task);
            endMetaData['result'] = resp;

            return res.status(httpCode).send(endMetaData);

        } catch (e) {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${e.stack}`);
            this.logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${e.message}`);

            throw e;

        }

    }
}
