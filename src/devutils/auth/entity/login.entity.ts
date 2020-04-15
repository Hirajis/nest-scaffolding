import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from "typeorm";


@Entity("login", { schema: "test" })
export class Login {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "id"
    })
    id: number;


    @Column("varchar", {
        nullable: false,
        length: 200,
        name: "username"
    })
    username: string;


    @Column("varchar", {
        nullable: false,
        length: 200,
        name: "password"
    })
    password: string;

}
