import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from "typeorm";


@Entity("order", { schema: "test" })
export class Order {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "id"
    })
    id: number;


    @Column("varchar", {
        nullable: false,
        length: 200,
        name: "itemname"
    })
    itemname: string;


    @Column("varchar", {
        nullable: false,
        length: 200,
        name: "quantity"
    })
    quantity: string;


}
