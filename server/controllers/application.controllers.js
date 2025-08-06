import { Application } from "../models/application.model.js";
import { ApiError } from "../utiles/ApiError.js";
import { ApiResponse } from "../utiles/ApiResponse.js";
import { asyncHandler } from "../utiles/asyncHandler.js";

export const applyJob = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { jobId } = req.body;
    const exists = await Application.findOne({ userId, jobId });
    if (exists) return ApiError(res, 409, "Already applied");

    const application = await Application.create({
        userId,
        jobId,
        status: "pending",
        appliedAt: new Date(),
    });

    return res.status(201).json(
        new ApiResponse(201, application, "Application submitted")
    );
});

export const getAppliedJob = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const applications = await Application.find({ userId })
        .populate("jobId")
        .sort({ appliedAt: -1 });
    if (!applications) {
        return ApiError(res, 400, "Server error");
    }
    return res.status(201).json(
        new ApiResponse(201, applications, "Application fetched")
    );
})

export const getAllApplications = asyncHandler(async (req, res) => {
    const applications = await Application.find()
        .populate("userId", "fullName email resume")
        .populate("jobId", "title company")
        .sort({ appliedAt: -1 });

    if (!applications) {
        return ApiError(res, 400, "Unable to fetch applications");
    }

    return res.status(200).json(
        new ApiResponse(200, applications, "All job applications fetched")
    );
});

export const updateStatus = asyncHandler(async (req, res) => {
    const jobId = req.body.jobId;
    const application = await Application.findById(jobId);

    if (!application) {
        return ApiError(res, 404, "Application not found");
    }

    application.status = req.body.status;

    await application.save();

    return res.status(200).json(
        new ApiResponse(200, application, "Status updated successfully")
    );
})