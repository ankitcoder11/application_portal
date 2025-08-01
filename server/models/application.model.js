import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
    status: { type: String, default: "pending" }, // pending, shortlisted, rejected
    appliedAt: { type: Date, default: Date.now },
});

export const Application = mongoose.model("Application", applicationSchema)
