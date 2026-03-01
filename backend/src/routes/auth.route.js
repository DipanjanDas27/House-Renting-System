import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { strictLimiter } from "../middlewares/rateLimiter.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";

import { register, login, logout, refreshToken } from "../controllers/auth.controller.js";
import { sendOtp, verifyOtp, verifyForgotPasswordOtp, sendForgotPasswordOtp } from "../controllers/otp.controller.js";
import { changePassword, resetPassword } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", strictLimiter, upload.single("profileImage"), register);
router.post("/login", strictLimiter, login);
router.post("/refresh", strictLimiter, refreshToken);
router.post("/logout", verifyAuth, logout);
router.post("/send-otp", verifyAuth, strictLimiter, sendOtp);
router.post("/verify-otp", verifyAuth, strictLimiter, verifyOtp);
router.patch("/me/change-password", verifyAuth, strictLimiter, changePassword);
router.post("/forgot-password", strictLimiter, sendForgotPasswordOtp);
router.post("/verify-forgot-otp", strictLimiter, verifyForgotPasswordOtp);
router.post("/reset-password", strictLimiter, resetPassword);

export default router;