import {Router} from 'express';
const router = Router();

import {getUsers,createUser,getUser, updateUser, deleteUser} from '../controllers/user.controller';
router.get('/usuarios', getUsers);
router.post('/usuarios', createUser);
router.get('/usuarios/:id', getUser);
router.put('/usuarios/:id', updateUser);
router.delete('/usuarios/:id', deleteUser);
export default router;