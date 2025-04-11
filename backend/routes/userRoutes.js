import express from "express";
import {
  checkAuth,
  logout,
  getUser,
  login,
  register,
  sendResetCode,
  verifyResetCode,
  resetPassword,
  updateProfile
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

// Public Routes
router.post("/check-auth", checkAuth);
router.post("/logout", logout);
router.post("/login", login);
router.post("/register", register);
router.post("/send-reset-code", sendResetCode);
router.post("/verify-reset-code", verifyResetCode);
router.post("/reset-password", resetPassword);
router.post("/update-profile", updateProfile);

// Protected Routes
router.post("/get-user", authMiddleware, getUser);

export default router;
