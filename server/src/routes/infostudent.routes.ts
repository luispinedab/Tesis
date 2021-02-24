import {Router} from 'express';
const router = Router();

import {getInfoestudiantes,getInfoestudiante,createInfoestudiante, updateInfoestudiante, deleteInfoestudiante,getlastinfoestudiante} from '../controllers/InfoStudent.controller';
router.get('/Infoestudiantes', getInfoestudiantes);
router.get('/LastInfoestudiante', getlastinfoestudiante);
router.post('/Infoestudiantes', createInfoestudiante);
router.get('/Infoestudiantes/:id', getInfoestudiante);
router.put('/Infoestudiantes/:id', updateInfoestudiante);
router.delete('/Infoestudiantes/:id', deleteInfoestudiante);
export default router;