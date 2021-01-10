import {Router} from 'express';
const router = Router();

import {getLogro,getLogros,updateLogro,createLogro,deleteLogro} from '../controllers/achievement.controller';
router.get('/logros', getLogros);
router.post('/logros', createLogro);
router.get('/logros/:id', getLogro);
router.put('/logros/:id', updateLogro);
router.delete('/logros/:id', deleteLogro);
export default router;