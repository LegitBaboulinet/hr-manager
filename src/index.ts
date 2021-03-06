import 'reflect-metadata';

import {createConnection} from "typeorm";
import * as Express from 'express';
import * as cookieSession from 'cookie-session';
import * as bodyParser from 'body-parser';
// Routes
import * as employeeRoutes from './routes/employee.routes';

// Connecting to the database
createConnection()
    .then(
        () => {
            // Creating the server
            const app = new Express();

            // Setting up the server
            app
                .use(cookieSession({secret: 'randomsecret'})) // TODO: Make the secret a parameter
                .use(bodyParser.json())
                .use('/static', Express.static('./public'))
                .use('/static/vue', Express.static('./node_modules/vue/dist'))
                .use('/static/axios', Express.static('./node_modules/axios/dist'))
                .use('/static/semantic', Express.static('./node_modules/semantic-ui/dist'))
                .set('view engine', 'ejs');

            // Connecting the routes
            app.use('/employees', employeeRoutes);

            // Start the server
            app.listen(3000, (err: any) => {
                if (err) throw err;
                console.log('Server is listening on port 3000');
            })
        }
    )
    .catch(
        (err: any) => {
            throw err;
        }
    );




