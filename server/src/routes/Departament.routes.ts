import {Router} from 'express';
const router = Router();
import {getDepartament} from '../controllers/Departament.controller';

router.get('/Departamentos', getDepartament);
export default router;