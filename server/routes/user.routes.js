import { Router } from "express";
import { loginUser, registerUser, verifyOtp, forgotPassword, resetPassword, uploadResumeController, downloadResumeController } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { uploadResume } from "../middlewares/uploadResume.js";
const router = Router();
router.route("/register").post(registerUser)
router.route("/verify-otp").post(verifyOtp)
router.route("/login").post(loginUser)
router.route("/forgot-password").post(forgotPassword)
router.route("/reset-password").post(resetPassword)
//secure route
router.get('/download-resume', downloadResumeController);

router.route("/upload-resume").post(verifyJWT, uploadResume.single("resume"), uploadResumeController)


export default router