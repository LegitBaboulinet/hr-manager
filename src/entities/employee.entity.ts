import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Employee {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {length: 35})
    firstName: string;

    @Column('varchar', {length: 35})
    lastName: string;

    @Column('varchar', {length: 50, nullable: true})
    emailAddress: string;

    @Column('varchar', {length: 12, nullable: true})
    phoneNumber: string;

    @Column('char', {length: 1, nullable: true})
    genderType: string;

    @Column('varchar', {length: 255, nullable: true})
    jobDescription: string;
}
