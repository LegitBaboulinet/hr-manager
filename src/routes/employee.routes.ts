import {Request, Response, Router} from 'express';
// Controller
import {getAllEmployees} from "../controllers/employee.controller";

const employeeRoutes = new Router()
    .get('/all', (req: Request, res: Response) => {
        getAllEmployees(req, res);
    });

export = employeeRoutes;
