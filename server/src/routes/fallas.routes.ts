import {Router} from 'express';
const router = Router();
import {getFallasbyStudent,getFallas,createFalla, getFallasbyGrade} from '../controllers/fallas.controller';
router.get('/fallas', getFallas);
router.post('/fallas', createFalla);
router.get('/fallas/curso/:id', getFallasbyGrade);
router.get('/fallas/estudiante/:id', getFallasbyStudent);
export default router;