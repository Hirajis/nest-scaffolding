import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './entity/order.entity';
import { OrderDTO } from './dto/response.order.dto';

@Injectable()
export class OrderService {
    constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>) { }

    async findAll(): Promise<OrderDTO[]> {

        let resp = await this.orderRepository.find();

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
