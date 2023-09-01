import {Router} from 'express';
import { addMenu, getFoodByDay, getPresentMenu, getUsers, giveAccess, removeAccess, updateMenu } from '../controller/messController.js';

const router=Router();

router.route('/mess/addMenu').post(addMenu);
router.route('/mess/updateMenu').patch(updateMenu);
router.route('/mess/getFoodByDay/:day').get(getFoodByDay);
router.route('/mess/:day/:mealTime').get(getPresentMenu);
router.route("/mess/getUsers").get(getUsers);
router.route("/mess/giveAccess/:id").patch(giveAccess);
router.route("/mess/removeAccess/:id").patch(removeAccess);


export default router;