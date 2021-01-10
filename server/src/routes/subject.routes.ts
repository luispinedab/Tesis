import {Router} from 'express';
const router = Router();

import {getAsignatura,getAsignaturas,createAsignatura,deleteAsignatura,updateAsignatura} from '../controllers/Subject.controller';
router.get('/asignaturas', getAsignaturas);
router.post('/asignaturas', createAsignatura);
router.get('/asignaturas/:id', getAsignatura);
router.put('/asignaturas/:id', updateAsignatura);
router.delete('/asignaturas/:id', deleteAsignatura);
export default router;