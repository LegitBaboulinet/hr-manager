import {Request, Response} from 'express';
import {getManager, Repository} from "typeorm";
import {Employee} from "../entities/employee.entity";

export function getAllEmployees(res: Response): void {
    const employeesRepository: Repository<Employee> = getManager().getRepository(Employee);
    employeesRepository.find()
        .then(
            (employees: Array<Employee>) => {
                res.json(employees);
            }
        )
        .catch(
            (err: string) => {
                // TODO: Catch the error, you lazy cunt
            }
        );
}
