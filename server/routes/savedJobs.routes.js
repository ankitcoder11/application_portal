import { Router } from "express";
import { verifyJWT } from './../middlewares/auth.middlewares.js';
import { getSavedJob, saveJob, unSaveJob } from "../controllers/savedJob.controller.js";

const router = Router();
router.route("/").get(verifyJWT, getSavedJob);
router.route("/save").post(verifyJWT, saveJob);
router.route("/unsave/:jobId").delete(verifyJWT, unSaveJob);

export default router