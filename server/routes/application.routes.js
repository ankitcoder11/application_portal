import { Router } from "express";
import { applyJob, getAppliedJob } from "../controllers/application.controllers.js";
import { verifyJWT } from './../middlewares/auth.middlewares.js';

const router = Router();
router.route("/").get(verifyJWT, getAppliedJob);
router.route("/apply").post(verifyJWT, applyJob);

export default router