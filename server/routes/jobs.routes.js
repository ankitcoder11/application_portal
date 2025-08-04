import { Router } from "express";
import { createJob, getJobById, getJobs } from "../controllers/jobs.controllers.js";
import { verifyAdmin, verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();
router.route("/").get(getJobs);
router.route("/:id").get(getJobById);
router.route("/create").post(verifyJWT, verifyAdmin, createJob);
// upload.single("image"),

export default router