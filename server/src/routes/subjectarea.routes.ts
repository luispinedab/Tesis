import {Router} from 'express';
const router = Router();
import {getArea} from '../controllers/SubjectArea.controller';

router.get('/Area', getArea);
export default router;