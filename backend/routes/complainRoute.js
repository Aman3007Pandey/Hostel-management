import express from "express";
const router = express.Router();
import mw from "../utils/middleware.js";
import { addComplainController, getSingleUserComplain, deleteComplain, getAllComplains, updateComplain } from "../controller/complainController.js";

router.post("/registerComplain/:id", mw, addComplainController);
router.get("/getSingleComplain/:id", mw, getSingleUserComplain);
router.delete("/deleteComplain/:id", deleteComplain);
router.get("/getAllComplains", getAllComplains);
router.patch("/updateComplain/:id", updateComplain);

export default router;