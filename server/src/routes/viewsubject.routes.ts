import {Router} from 'express';
const router = Router();

import {getAsignatura,getAsignaturas,createAsignatura,deleteAsignatura,updateAsignatura} from '../controllers/viewasignaturas.controller';
router.get('/viewasignaturas', getAsignaturas);
router.post('/viewasignaturas', createAsignatura);
router.get('/viewasignaturas/:id', getAsignatura);
router.put('/viewasignaturas/:id', updateAsignatura);
router.delete('/viewasignaturas/:id', deleteAsignatura);
export default router;