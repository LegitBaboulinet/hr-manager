import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Employee {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 35})
    firstName: string;

    @Column({length: 35})
    lastName: string;

    @Column({length: 50, nullable: true})
    email: string;

    @Column({length: 20, nullable: true})
    phone: string;

    @Column({length: 1})
    gender: string;

    @Column({length: 255, nullable: true})
    jobDescription: string;
}
