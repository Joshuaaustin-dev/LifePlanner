import express from "express";
import { updateTokens } from "../controllers/shopController.js";
const router = express.Router();

router.post("/update-tokens", updateTokens);

export default router;
