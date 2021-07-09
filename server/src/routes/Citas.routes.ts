import {Router} from 'express';
const router = Router();

import {getCitas,getCita,createCita, updateCita, deleteCita} from '../controllers/Citas.controller';
router.get('/Citas', getCitas);
router.post('/Citas', createCita);
router.get('/Citas/:id', getCita);
router.put('/Citas/:id', updateCita);
router.delete('/Citas/:id', deleteCita);
export default router;