import {Router} from 'express';
const router = Router();
import {getTipoUsuario} from '../controllers/TipoUsuario.controller';

router.get('/TipoUsuarios', getTipoUsuario);
export default router;