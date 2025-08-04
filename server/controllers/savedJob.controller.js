import { SavedJob } from "../models/savedJob.model.js";
import { ApiError } from "../utiles/ApiError.js";
import { ApiResponse } from "../utiles/ApiResponse.js";
import { asyncHandler } from "../utiles/asyncHandler.js";

export const saveJob = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { jobId } = req.body;
    const exists = await SavedJob.findOne({ userId, jobId });
    if (exists) return ApiError(res, 409, "Already Saved");

    const application = await SavedJob.create({
        userId,
        jobId,
        savedAt: new Date(),
    });

    return res.status(201).json(
        new ApiResponse(201, application, "Application saved")
    );
});
export const getSavedJob = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const applications = await SavedJob.find({ userId })
        .populate("jobId")
        .sort({ appliedAt: -1 });
    if (!applications) {
        return ApiError(res, 400, "Server error");
    }
    return res.status(201).json(
        new ApiResponse(201, applications, "Application fetched")
    );
})
export const unSaveJob = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { jobId } = req.params;

    if (!jobId) {
        return res.status(400).json(
            new ApiResponse(400, {}, "Job ID is required")
        );
    }

    const deletedJob = await SavedJob.findOneAndDelete({ jobId, userId });

    if (!deletedJob) {
        return res.status(404).json(
            new ApiResponse(404, {}, "Saved job not found")
        );
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Job unsaved successfully")
    );
});