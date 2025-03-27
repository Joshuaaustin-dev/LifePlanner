import express from "express";
import {
  checkAuth,
  getUser,
  login,
  register,
  resetPassword,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

// Public Routes
router.post("/check-auth", checkAuth);
router.post("/login", login);
router.post("/register", register);
router.post("/reset-password", resetPassword);

// Protected Routes
router.post("/get-user", authMiddleware, getUser);

export default router;
