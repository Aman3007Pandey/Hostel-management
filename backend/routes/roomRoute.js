import { Router } from 'express';


import { newRoom, getRoom, getAllRoom, getAllRoomForUser } from '../controller/roomController.js';

const router=Router();


router.route('/room/new').post(newRoom);
router.route('/room/all').get(getAllRoom);
router.route('/room/all/user/:userId').get(getAllRoomForUser);
router.route('/room/:id').get(getRoom);

export default router;