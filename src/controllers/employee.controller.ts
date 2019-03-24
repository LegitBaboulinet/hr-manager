import {Request, Response} from 'express';
import {getManager, Repository} from "typeorm";
import {Employee} from "../entities/employee.entity";

export function viewEditEmployee(req: Request, res: Response): void {
    const id = req.params['id'];
    if (!isNaN(id)) {
        const employeesRepository: Repository<Employee> = getManager().getRepository(Employee);
        employeesRepository.findOne(id)
            .then(
                (employee: Employee) => {
                    res.render('employeeForm', {employee: employee});
                }
            )
            .catch(
                (err: string) => {
                    // TODO: Catch the error, you lazy cunt
                }
            );
    } else {
        // TODO: Catch the error, you lazy cunt
    }
}

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
