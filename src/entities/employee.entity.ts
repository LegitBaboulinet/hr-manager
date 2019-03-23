import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Employee {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 35})
    firstName: string;

    @Column({length: 35})
    lastName: string;

    @Column({length: 50})
    email: string;

    @Column({length: 20})
    phone: string;
}
