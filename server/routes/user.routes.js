import { Router } from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser, verifyOtp, forgotPassword, resetPassword } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
const router = Router();
router.route("/register").post(registerUser)
router.route("/verify-otp").post(verifyOtp)
router.route("/login").post(loginUser)
router.route("/forgot-password").post(forgotPassword)
router.route("/reset-password").post(resetPassword)
//secure route
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)

export default router