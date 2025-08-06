import { useState } from 'react';
import { userResume } from '../api/users';
import toast from 'react-hot-toast';
import Button from './utiles/Button';
import { useAuth } from '../context/AuthContext';

const ResumeUploader = ({ setResumePopUp }) => {
  const { user } = useAuth();
  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
    } else {
      toast.error("Please select a valid PDF file.");
      setResumeFile(null);
    }
  };

  const handleUpload = async () => {
    if (!resumeFile) {
      toast.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);

    try {
      setUploading(true);
      const res = await userResume(formData);
      user.resume = res?.data?.resumeUrl;
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Resume uploaded successfully!");
      setResumePopUp();
    } catch (error) {
      toast.error(error.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block mb-4 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-green-500 transition-colors cursor-pointer ">
        <i className="ri-upload-cloud-2-line text-2xl text-gray-400 mb-2"></i>
        {resumeFile?.name ? <div className="text-gray-600 mb-1">{resumeFile?.name}</div> : <p className="text-gray-600 mb-1">Click to upload or drag and drop</p>}
        {!resumeFile?.name && <p className="text-xs text-gray-500">PDF, DOC, or DOCX (max 5MB)</p>}
        <input
          type="file"
          name="resume"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
      <Button bg={'black'} isLoading={uploading} color={'white'} onClick={handleUpload} text={'Upload'} />
    </div>
  );
};

export default ResumeUploader;