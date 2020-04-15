import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from "typeorm";


@Entity("schedulerlogger", { schema: "test" })
export class SchedulerLoggerTable {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "id"
    })
    id: number;

    @Column("int", {
        nullable: false,
        name: "jobId"
    })
    jobId: number;

    @Column("varchar", {
        nullable: false,
        name: "name"
    })
    name: string;

    @Column("varchar", {
        nullable: false,
        name: "errorType"
    })
    errorType: string;


    @Column("varchar", {
        nullable: false,
        name: "errorMessage"
    })
    errorMessage: string;


    @Column("varchar", {
        nullable: false,
        name: "description"
    })
    description: string;

}
