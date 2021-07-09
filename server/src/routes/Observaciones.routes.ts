import {Router} from 'express';
const router = Router();

import {getObservaciones_ver,getfaltas_tipoFaltas,getfaltas,gettipofaltas,getObservacion,getObservaciones,updateObservacion,createObservacion,deleteObservacion} from '../controllers/Observaciones.controller';
router.get('/Observaciones', getObservaciones);
router.get('/TipoFaltas', gettipofaltas);
router.get('/Faltas', getfaltas);
router.get('/Faltas/:id', getfaltas_tipoFaltas);
router.get('/Observaciones/menu/:id', getObservaciones_ver);
router.post('/Observaciones', createObservacion);
router.get('/Observaciones/:id', getObservacion);
router.put('/Observaciones/:id', updateObservacion);
router.delete('/Observaciones/:id', deleteObservacion);
export default router;