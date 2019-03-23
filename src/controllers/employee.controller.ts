import {Request, Response} from 'express';
import {getManager, Repository} from "typeorm";
import {Employee} from "../entities/employee.entity";

export function getAllEmployees(req: Request, res: Response): void {
    const employeesRepository: Repository<Employee> = getManager().getRepository(Employee);
    const employees = employeesRepository.find();
    res.json(employees);
}
