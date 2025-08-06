import { Router } from "express";
import { createJob, getJobById, getJobs, updateJob } from "../controllers/jobs.controllers.js";
import { verifyAdmin, verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();
router.route("/").get(getJobs);
router.route("/:id").get(getJobById);
router.route("/create").post(verifyJWT, verifyAdmin, createJob);
router.route("/update").post(verifyJWT, verifyAdmin, updateJob);

export default router