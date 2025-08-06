import { Router } from "express";
import { applyJob, getAllApplications, getAppliedJob, updateStatus } from "../controllers/application.controllers.js";
import { verifyAdmin, verifyJWT } from './../middlewares/auth.middlewares.js';

const router = Router();
router.route("/").get(verifyJWT, getAppliedJob);
router.route("/apply").post(verifyJWT, applyJob);
router.route("/get-all-applications").get(verifyJWT, verifyAdmin, getAllApplications);
router.route("/update-status").post(verifyJWT, verifyAdmin, updateStatus);


export default router