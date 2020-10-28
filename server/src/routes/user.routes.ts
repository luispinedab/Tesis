import {Router} from 'express';
const router = Router();

//import {getUsers,createUser,getUser, updateUser, deleteUser} from '../controllers/user.controller';
import {getUsers} from '../controllers/user.controller';
router.get('/Usuarios', getUsers);
/*router.post('/users', createUser);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);*/
export default router;