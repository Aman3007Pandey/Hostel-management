import { Router } from 'express';


import { newRoom, getRoom, getAllRoomForUser, deleteRoom, getAllRoomAdmin } from '../controller/roomController.js';

const router=Router();


router.route('/room/new').post(newRoom);
router.route('/room/all/:hostel').get(getAllRoomAdmin);
router.route('/room/all/user/:userId').get(getAllRoomForUser);
router.route('/room/:id').get(getRoom);
router.route('/room/:roomNo/:hostel').delete(deleteRoom);

export default router;