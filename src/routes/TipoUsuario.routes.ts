import {Router} from 'express';
const router = Router();

//import {getUsers,createUser,getUser, updateUser, deleteUser} from '../controllers/user.controller';
import {getTipoUsuario} from '../controllers/TipoUsuario.controller';
router.get('/Tipo   Usuarios', getTipoUsuario);
/*router.post('/users', createUser);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);*/
export default router;