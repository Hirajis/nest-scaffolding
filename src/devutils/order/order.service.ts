import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';

import { Order } from './entity/order.entity';
import { OrderDTO } from './dto/response.order.dto';
import { TwilioSmsService } from '../../shared/service/twilio/twilio.sms.service';
import { TwilioEmailService } from '../../shared/service/twilio/twilio.email.service';

@Injectable()
export class OrderService {
    constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>, private twilioSms: TwilioSmsService, private twilioEmail: TwilioEmailService) { }

    async findAll(): Promise<OrderDTO[]> {

        // let resp = await this.orderRepository.find();
        let resp = await getConnection()
            .createQueryBuilder()
            .select()
            .from(Order, 'order')
            .execute()

        const data = {
            to: '+911234567890',
            // to1: 'abc.xyz@gmail.com',
            from: 'xyz.abc@mailinator.com',
            subject: 'Just for testing',
            text: 'Just for testing enjoy'
        }

        await this.twilioSms.TwilloSendSMS(data);
        await this.twilioEmail.TwilloSendEmail(data);
        return resp;

    }

    async findById(id: number): Promise<OrderDTO[]> {

        let resp = await this.orderRepository.findByIds([id]);

        return resp;

    }

    async create(order: OrderDTO): Promise<any> {

        let resp = await this.orderRepository.save(order);

        return resp;

    }

    // async update(order): Promise<any> {

    //     let resp = await this.orderRepository.update(1,order:<OrderDTO>);

    //     return resp;

    // }

}
