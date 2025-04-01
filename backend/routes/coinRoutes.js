import express from "express";
import { deductCoins } from "../controllers/coinController.js";
const router = express.Router();

router.post("/deduct-coins", deductCoins);
export default router;
