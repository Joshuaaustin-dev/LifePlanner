import express from "express";
import { getUser, login, register, resetPassword } from "../controllers/userController.js";
const router = express.Router();

router.post("/get-user", getUser);
router.post("/login", login);
router.post("/register", register);
router.post("/reset-password", resetPassword);

export default router;
