import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import AuthenticationController from './controllers/AuthenticationController';
import AutosController from './controllers/AutosController';

const app: Application =  express();

const corsOption: CorsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

app.use(cors(corsOption));
app.use(bodyParser.json());

AuthenticationController.mount(app);
AutosController.mount(app);

export default app;
