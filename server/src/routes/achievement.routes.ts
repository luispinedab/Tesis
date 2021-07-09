import {Router} from 'express';
const router = Router();

import {getNotasbyEstudiante,getNotasbyMateria,updateNota,getNotas,createNota,getassignedLogros_menu,getLogros_Asignar,getassignedLogros,createassignedLogro,getLogro,getLogros,updateLogro,createLogro,deleteLogro} from '../controllers/achievement.controller';
router.get('/logros', getLogros);
router.get('/notas', getNotas);
router.get('/notas/materia/:id', getNotasbyMateria);
router.get('/notas/estudiante/:id', getNotasbyEstudiante);
router.get('/logrosasignados', getassignedLogros);
router.get('/logros/menu/:id', getLogros_Asignar);
router.get('/logros/menu1/:id', getassignedLogros_menu);
router.post('/logros', createLogro);
router.post('/notas', createNota);
router.post('/logrosasignados', createassignedLogro);
router.get('/logros/:id', getLogro);
router.put('/logros/:id', updateLogro);
router.put('/notas',updateNota);
router.delete('/logros/:id', deleteLogro);
export default router;