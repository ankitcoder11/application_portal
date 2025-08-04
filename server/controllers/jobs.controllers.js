import { Job } from "../models/jobs.model.js";
import { ApiError } from "../utiles/ApiError.js";
import { ApiResponse } from "../utiles/ApiResponse.js";
import { asyncHandler } from "../utiles/asyncHandler.js";

// Get all jobs
// export const getJobs = asyncHandler(async (req, res) => {
//     let { page = 1, limit = 10 } = req.query;
//     page = parseInt(page);
//     limit = parseInt(limit);

//     if (page < 1 || limit < 1) {
//         return ApiError(res, 400, "Page and limit must be positive integers");
//     }

//     const skip = (page - 1) * limit;
//     const [jobs, total] = await Promise.all([
//         Job.find().skip(skip).limit(limit),
//         Job.countDocuments()
//     ]);

//     return res.status(200).json(
//         new ApiResponse(200, {
//             page,
//             limit,
//             total,
//             jobs
//         }, "Jobs fetched successfully")
//     );
// });
// Get all jobs with search
export const getJobs = asyncHandler(async (req, res) => {
    let { page = 1, limit = 10, search = '' } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    search = search.trim();
    if (page < 1 || limit < 1) {
        return ApiError(res, 400, "Page and limit must be positive integers");
    }
    const skip = (page - 1) * limit;
    // Create a dynamic filter for search
    const searchFilter = search
        ? {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } }
            ]
        }
        : {};

    const [jobs, total] = await Promise.all([
        Job.find(searchFilter).skip(skip).limit(limit),
        Job.countDocuments(searchFilter)
    ]);

    return res.status(200).json(
        new ApiResponse(200, {
            page,
            limit,
            total,
            jobs
        }, "Jobs fetched successfully")
    );
});

// Get a single job
export const getJobById = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id);

    if (!job) {
        return ApiError(res, 404, "Job not found");
    }

    return res.status(200).json(
        new ApiResponse(200, job, "Job fetched successfully")
    );
});

// Create a new job
export const createJob = asyncHandler(async (req, res) => {
    const {
        title,
        department,
        location,
        type,
        experience,
        description,
        salary,
        requirements,
        responsibilities,
        skills,
    } = req.body;

    if ([title, location, type, description].some(field => field?.trim() === "")) {
        return ApiError(res, 400, "All job fields are required");
    }

    const job = new Job({
        title,
        department,
        location,
        type,
        experience,
        description,
        salary,
        requirements,
        responsibilities,
        skills,
    });

    await job.save();

    return res.status(201).json(
        new ApiResponse(201, job, "Job created successfully")
    );
});

export const updateJob = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, company, location, type, description } = req.body;

    const job = await Job.findById(id);
    if (!job) {
        return ApiError(res, 404, "Job not found");
    }

    // Update only provided fields
    job.title = title ?? job.title;
    job.company = company ?? job.company;
    job.location = location ?? job.location;
    job.type = type ?? job.type;
    job.description = description ?? job.description;

    if (req.file?.path) {
        job.image = req.file.path;
    }

    await job.save();

    return res.status(200).json(
        new ApiResponse(200, job, "Job updated successfully")
    );
});