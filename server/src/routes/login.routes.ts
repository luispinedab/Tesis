import {Router} from 'express';
const router = Router();

import {login, logout} from '../controllers/login.controller';
router.post('/login', login);
router.get('/logout', logout);
export default router;