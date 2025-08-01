import { Router } from "express";
import { applyJob } from "../controllers/application.controllers.js";
import { verifyJWT } from './../middlewares/auth.middlewares.js';

const router = Router();
router.route("/").post(verifyJWT, applyJob);

export default router