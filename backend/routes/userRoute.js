import { Router } from 'express';
const router = Router();
import { registerController, loginController } from "../controller/authController.js";
import { getUser, userRoomAllotment } from '../controller/userController.js';


router.post("/register", registerController);
router.post("/login", loginController);
router.patch('/userRoomAllotment/:roomId',userRoomAllotment);
router.get('/user/:id',getUser);

export default router;