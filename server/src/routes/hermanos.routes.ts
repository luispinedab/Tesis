import {Router} from 'express';
const router = Router();

import {getHermanos,getHermano,createHermano, updateHermano, deleteHermano} from '../controllers/Hermanos.controller';
router.get('/Hermanos', getHermanos);
router.post('/Hermanos', createHermano);
router.get('/Hermanos/:id', getHermano);
router.put('/Hermanos/:id', updateHermano);
router.delete('/Hermanos/:id', deleteHermano);
export default router;