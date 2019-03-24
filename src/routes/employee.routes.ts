import {Request, Response, Router} from 'express';
// Controller
import {getAllEmployees} from "../controllers/employee.controller";

const employeeRoutes = new Router()
    .get('/', (req: Request, res: Response) => {
        res.render('employees');
    })
    .get('/all', (req: Request, res: Response) => {
        getAllEmployees(res);
    });

export = employeeRoutes;
