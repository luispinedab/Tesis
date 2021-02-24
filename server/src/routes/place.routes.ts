import {Router} from 'express';
const router = Router();
import {getPlace, getPlaces} from '../controllers/place.controller';

router.get('/Lugares', getPlaces);
router.get('/Lugares/:id', getPlace);
export default router;