import express from "express";
import { confirmPayment, session } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/confirm-payment", confirmPayment);
router.post("/create-session", session)
export default router;
