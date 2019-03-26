import {Request, Response} from 'express';
import {getManager, Repository} from "typeorm";
import * as Joi from 'joi';
import {Employee} from "../entities/employee.entity";
import {error400, error404, error500} from "./error.controller";

const employeeSchema = Joi.object().keys({
    id: Joi.number().integer().min(1),
    firstName: Joi.string().min(2).max(35).required(),
    lastName: Joi.string().min(2).max(35).required(),
    emailAddress: Joi.string().min(5).max(50),
    phoneNumber: Joi.string().min(4).max(12),
    genderType: Joi.string().min(1).max(1),
    jobDescription: Joi.string().min(0).max(255)
});

export function getAllEmployees(req: Request, res: Response): void {
    const employeesRepository: Repository<Employee> = getManager().getRepository(Employee);
    employeesRepository.find({order: {lastName: 'ASC', firstName: 'ASC'}})
        .then(
            (employees: Array<Employee>) => {
                res.json(employees);
            }
        )
        .catch(
            () => {
                error500(req, res);
            }
        );
}

export function createEmployee(req: Request, res: Response): void {
    const employeesRepository: Repository<Employee> = getManager().getRepository(Employee);

    if (req.body.employee) {
        Joi.validate(req.body.employee, employeeSchema)
            .then(
                () => {
                    req.body.employee.genderType = req.body.employee.genderType.toUpperCase();
                    if (req.body.employee.genderType === 'M' || req.body.employee.genderType === 'F') {
                        const employee: Employee = new Employee();
                        employee.firstName = req.body.employee.firstName;
                        employee.lastName = req.body.employee.lastName;
                        employee.emailAddress = req.body.employee.emailAddress;
                        employee.phoneNumber = req.body.employee.phoneNumber;
                        employee.genderType = req.body.employee.genderType;
                        employee.jobDescription = req.body.employee.jobDescription;

                        employeesRepository.save(employee)
                            .then(
                                () => {
                                    res.json();
                                }
                            )
                            .catch(
                                (err: string) => {
                                    error500(req, res);
                                }
                            );
                    } else {
                        error400(req, res);
                    }
                }
            )
            .catch(
                (err: string) => {
                    error400(req, res);
                }
            );
    } else {
        error400(req, res);
    }
}

export function editEmployee(req: Request, res: Response): void {
    const employeesRepository: Repository<Employee> = getManager().getRepository(Employee);

    console.log((req.body.employee.genderType === 'M' || req.body.employee.genderType === 'F'));

    if (req.body.employee) {
        Joi.validate(req.body.employee, employeeSchema)
            .then(
                () => {
                    req.body.employee.genderType = req.body.employee.genderType.toUpperCase();
                    if ((req.body.employee.genderType === 'M' || req.body.employee.genderType === 'F') && !isNaN(req.params['id'])) {
                        employeesRepository.findOne(req.params.id)
                            .then(
                                (employee: Employee) => {
                                    employee.firstName = req.body.employee.firstName;
                                    employee.lastName = req.body.employee.lastName;
                                    employee.emailAddress = req.body.employee.emailAddress;
                                    employee.phoneNumber = req.body.employee.phoneNumber;
                                    employee.genderType = req.body.employee.genderType;
                                    employee.jobDescription = req.body.employee.jobDescription;

                                    employeesRepository.save(employee)
                                        .then(
                                            () => {
                                                res.json();
                                            }
                                        )
                                        .catch(
                                            (err: string) => {
                                                console.log('err', err);
                                                error500(req, res);
                                            }
                                        );
                                }
                            )
                            .catch(
                                (err: string) => {
                                    error400(req, res);
                                }
                            );
                    } else {
                        error400(req, res);
                    }
                }
            )
            .catch(
                (err: string) => {
                    error400(req, res);
                }
            );
    } else {
        error400(req, res);
    }
}

export function viewEditEmployee(req: Request, res: Response): void {
    const id = req.params['id'];
    if (!isNaN(id)) {
        const employeesRepository: Repository<Employee> = getManager().getRepository(Employee);
        employeesRepository.findOne(id)
            .then(
                (employee: Employee) => {
                    if (employee) {
                        res.render('employeeForm', {employee: employee});
                    } else {
                        error404(req, res, true);
                    }
                }
            )
            .catch(
                () => {
                    error404(req, res, true);
                }
            );
    } else {
        error404(req, res, true);
    }
}
