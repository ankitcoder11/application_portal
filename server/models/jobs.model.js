import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: String,
    department: String,
    location: String,
    type: String,
    experience: String,
    description: String,
    requirements: [String],
    responsibilities: [String],
    salary: String,
    posted: { type: Date, default: Date.now },
    skills: [String],
    status: { type: String, enum: ['open', 'closed'], default: 'open' },
}, { timestamps: true });

export const Job = mongoose.model("Job", jobSchema)