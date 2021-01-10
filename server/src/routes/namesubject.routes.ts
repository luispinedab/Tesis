import {Router} from 'express';
const router = Router();
import {getNombreAsignatura} from '../controllers/NameSubject.controller';

router.get('/NombreAsignaturas', getNombreAsignatura);
export default router;