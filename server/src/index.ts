import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import UserRoutes from './routes/user.routes';
import TipoUsuarioRoutes from './routes/TipoUsuario.routes';
import GradeRoutes from './routes/grade.routes';
import LevelGradeRoutes from './routes/levelgrade.routes';
import NameSubjectRoutes from './routes/namesubject.routes';
import SubjectAreaRoutes from './routes/subjectarea.routes';
import SubjectRoutes from './routes/subject.routes';
import ViewAsignaturaRoutes from './routes/viewsubject.routes';
import AchiecementRoutes from './routes/achievement.routes';
import {createConnection} from 'typeorm';
const app = express();

createConnection();
//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use(UserRoutes,TipoUsuarioRoutes,GradeRoutes,LevelGradeRoutes,NameSubjectRoutes,SubjectAreaRoutes,SubjectRoutes,AchiecementRoutes,ViewAsignaturaRoutes);


app.listen(3000);
console.log('Server on Port',3000);