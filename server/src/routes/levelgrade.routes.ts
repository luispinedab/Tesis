import {Router} from 'express';
const router = Router();
import {getNivelCurso,getNivelCursos} from '../controllers/levelgrade.controller';

router.get('/NivelCursos', getNivelCursos);
router.get('/NivelCursos/:id', getNivelCurso);
export default router;