import {Router} from 'express';
const router = Router();

import {updateNota,getInfoestudiantes_grade1,getInfoestudiantebyaspirante,getInfoestudiantes_curso,updateInfoestudiantes,getInfoestudiantes_grade,getInfoestudiantes,getInfoestudiante,createInfoestudiante, updateInfoestudiante, deleteInfoestudiante,getlastinfoestudiante} from '../controllers/InfoStudent.controller';
router.get('/Infoestudiantes', getInfoestudiantes);
router.get('/LastInfoestudiante', getlastinfoestudiante);
router.get('/Infoestudiantes/grade/:id', getInfoestudiantes_grade);
router.get('/Infoestudiantes/grade1/:id', getInfoestudiantes_grade1);
router.get('/Infoestudiantes/curso/:id', getInfoestudiantes_curso);
router.get('/Infoestudiantes/aspirante/:id', getInfoestudiantebyaspirante);
router.post('/updateinfoestudiantes', updateInfoestudiantes);
router.put('/Infoestudiantes/notas',updateNota);
router.post('/Infoallestudiantes', createInfoestudiante);
router.get('/Infoestudiantes/:id', getInfoestudiante);
router.put('/Infoestudiantes/:id', updateInfoestudiante);
router.delete('/Infoestudiantes/:id', deleteInfoestudiante);
export default router;