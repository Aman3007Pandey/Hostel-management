import {Router} from 'express';
import { addMenu, getFoodByDay, getPresentMenu, getUsers, giveAccess, removeAccess, updateMenu } from '../controller/messController.js';
import {
  addMessComplain,
  getSingleUserMessComplain,
  getAllMessComplains,
  deleteMessComplain,
  updateMessComplain,
  assignToAdmin,
} from "../controller/messComplainController.js";
import mw from '../utils/middleware.js';

const router=Router();

router.route('/mess/addMenu').post(addMenu);
router.route('/mess/updateMenu').patch(updateMenu);
router.route('/mess/getFoodByDay/:day').get(getFoodByDay);
router.route('/mess/:day/:mealTime').get(getPresentMenu);
router.route("/mess/getUsers").get(getUsers);
router.route("/mess/giveAccess/:id").patch(giveAccess);
router.route("/mess/removeAccess/:id").patch(removeAccess);

router.post("/mess/registerComplain/:id", mw, addMessComplain);
// router.get("/mess/getSingleMessComplain/:id", mw, getSingleUserMessComplain);
router.get("/getSingleMessComplain/:id", mw, getSingleUserMessComplain);
router.delete("/mess/deleteComplain/:id", deleteMessComplain);
router.get("/mess/getAllComplains", getAllMessComplains);
router.patch("/mess/updateComplain/:id", updateMessComplain);
router.patch("/mess/assignToAdmin/:id", assignToAdmin);


export default router;