import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "../utiles/cloudinary.js";

const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const originalName = file.originalname.replace(/\.[^/.]+$/, "");
    const timestamp = Date.now();
    return {
      folder: "resumes",
      resource_type: "raw",
      public_id: `${originalName}-${timestamp}`,
      allowed_formats: ["pdf"],
    };
  },
});

export const uploadResume = multer({ storage: resumeStorage });
