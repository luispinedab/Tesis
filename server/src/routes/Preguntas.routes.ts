import {Router} from 'express';
const router = Router();
import {getPreguntas,getPreguntasbygrade,getRespuestasbypreguta} from '../controllers/preguntas.controller';
router.get('/preguntas', getPreguntas);
router.get('/preguntas/curso/:id', getPreguntasbygrade);
router.get('/Respuestas/:id', getRespuestasbypreguta);
export default router;