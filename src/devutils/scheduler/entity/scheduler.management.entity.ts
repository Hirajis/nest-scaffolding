import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from "typeorm";


@Entity("schedulermanagement", { schema: "test" })
export class SchedulerManagement {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "id"
    })
    id: number;

    @Column("varchar", {
        nullable: false,
        length: 256,
        name: "name"
    })
    name: string;


    @Column("varchar", {
        nullable: false,
        length: 256,
        name: "description"
    })
    description: string;


    @Column("tinyint", {
        nullable: false,
        width: 1,
        name: "isActive"
    })
    isActive: boolean;


    @Column("int", {
        nullable: true,
        name: "cronTimeInMs"
    })
    cronTimeInMs: number | null;


    @Column("varchar", {
        nullable: false,
        name: "cronPattern"
    })
    cronPattern: string;


    @Column("varchar", {
        nullable: false,
        name: "jobType"
    })
    jobType: string;


    @Column("varchar", {
        nullable: false,
        name: "jobState"
    })
    jobState: string;


    @Column("timestamp", {
        nullable: false,
        default: () => "CURRENT_TIMESTAMP",
        name: "createdTS"
    })
    createdTS: Date;


    @Column("timestamp", {
        nullable: true,
        default: () => "CURRENT_TIMESTAMP",
        name: "updatedTS"
    })
    updatedTS: Date | null;

}
