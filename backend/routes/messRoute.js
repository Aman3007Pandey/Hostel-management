import {Router} from 'express';
import { addMenu, getFoodByDay, getPresentMenu, updateMenu } from '../controller/messController.js';

const router=Router();

router.route('/mess/addMenu').post(addMenu);
router.route('/mess/updateMenu').patch(updateMenu);
router.route('/mess/getFoodByDay/:day').get(getFoodByDay);
router.route('/mess/:day/:mealTime').get(getPresentMenu);


export default router;