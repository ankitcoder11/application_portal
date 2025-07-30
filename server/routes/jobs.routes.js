import { Router } from "express";
import { createJob, getJobById, getJobs } from "../controllers/jobs.controllers.js";
import { upload } from "../middlewares/upload.js";

const router = Router();
router.route("/").get(getJobs);
router.route("/:id").get(getJobById);
router.route("/create").post(upload.single("image"), createJob);

export default router