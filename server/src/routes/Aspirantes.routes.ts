import {Router} from 'express';
const router = Router();

import {getAspirantes,createAspirante, updateAspirante, deleteAspirante,getAspirante} from '../controllers/Aspirantes.controller';
router.get('/Aspirantes', getAspirantes);
router.post('/Aspirantes', createAspirante);
router.put('/Aspirantes/:id', updateAspirante);
router.get('/Aspirantes/:id', getAspirante);
router.delete('/Aspirantes/:id', deleteAspirante);
export default router;