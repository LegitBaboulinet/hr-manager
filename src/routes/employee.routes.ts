import {Request, Response, Router} from 'express';
// Controller
import {getAllEmployees, viewEditEmployee} from "../controllers/employee.controller";

const employeeRoutes = new Router()
    .get('/', (req: Request, res: Response) => {
        res.render('employees');
    })
    .get('/new', (req: Request, res: Response) => {
        res.render('employeeForm', {id: null});
    })
    .get('/:id', (req: Request, res: Response) => {
        viewEditEmployee(req, res);
    })
    .get('/all', (req: Request, res: Response) => {
        getAllEmployees(res);
    });

export = employeeRoutes;
