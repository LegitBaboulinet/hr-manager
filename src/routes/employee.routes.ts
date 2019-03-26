import {Request, Response, Router} from 'express';
// Controller
import {createEmployee, editEmployee, getAllEmployees, viewEditEmployee} from "../controllers/employee.controller";

const employeeRoutes = new Router()
    .get('/test', (req, res) => {
        res.send('<h1>Hello world</h1>')
    })
    .get('/all', (req: Request, res: Response) => {
        getAllEmployees(res);
    })
    .post('/new', (req: Request, res: Response) => {
        createEmployee(req, res);
    })
    .put('/:id', (req: Request, res: Response) => {
        editEmployee(req, res);
    })
    .get('/', (req: Request, res: Response) => {
        res.render('employees');
    })
    .get('/new', (req: Request, res: Response) => {
        res.render('employeeForm', {employee: null});
    })
    .get('/:id', (req: Request, res: Response) => {
        viewEditEmployee(req, res);
    });

export = employeeRoutes;
