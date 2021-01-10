import {Router} from 'express';
const router = Router();
import {getNivelCurso} from '../controllers/levelgrade.controller';

router.get('/NivelCursos', getNivelCurso);
export default router;