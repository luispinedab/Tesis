import {Router} from 'express';
const router = Router();

import {getExperienciasEscolares,getExperienciasEscolar,createExperienciasEscolar, updateExperienciasEscolar, deleteExperienciasEscolar} from '../controllers/ExperienciasEscolares.controller';
router.get('/ExperienciasEscolares', getExperienciasEscolares);
router.post('/ExperienciasEscolares', createExperienciasEscolar);
router.get('/ExperienciasEscolares/:id', getExperienciasEscolar);
router.put('/ExperienciasEscolares/:id', updateExperienciasEscolar);
router.delete('/ExperienciasEscolares/:id', deleteExperienciasEscolar);
export default router;