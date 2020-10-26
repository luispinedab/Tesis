import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import UserRoutes from './routes/user.routes';

import {createConnection} from 'typeorm';
const app = express();

createConnection();
//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use(UserRoutes);

app.listen(3000);
console.log('Server on Port',3000);