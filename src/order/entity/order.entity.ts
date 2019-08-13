import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    order_id: number;

    @Column({ length: 45 })
    customer_name: string;
}