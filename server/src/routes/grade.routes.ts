import {Router} from 'express';
const router = Router();
import {getGrades} from '../controllers/grade.controller';
//import {getGrade,getGrades,createGrade,updateGrade,deleteGrade} from '../controllers/grade.controller';

router.get('/cursos', getGrades);
// router.post('/cursos', createGrade);
// router.get('/cursos/:id', getGrade);
// router.put('/cursos/:id', updateGrade);
// router.delete('/cursos/:id', deleteGrade);
export default router;