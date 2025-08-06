import { useEffect, useState } from "react";
import { getAllAppliedJobs, updateStatus } from "../../api/application";
import Button from "../utiles/Button";
import Loader from "../utiles/Loader";
import toast from "react-hot-toast";

const AllApplicationsAdmin = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stausLoading, setStatusLoading] = useState(false);

  const fetchAppllications = async () => {
    setLoading(true);
    try {
      const response = await getAllAppliedJobs();
      setJobs(response?.data);
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppllications();
  }, []);

  const handlePreviewResume = (resumeUrl) => {
    const filename = 'resume-preview';
    const previewUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'}/users/download-resume?url=${encodeURIComponent(resumeUrl)}&filename=${encodeURIComponent(filename)}&preview=true`;
    window.open(previewUrl, '_blank');
  };

  const handleChange = async (event, job) => {
    setStatusLoading(true);
    const selectedStatus = event.target.value;

    try {
      const response = await updateStatus({ jobId: job._id, status: selectedStatus });
      toast.success(response?.message);
      fetchAppllications();
    } catch (error) {
      toast.error(error.message || 'An unexpected error occurred. Please try again.');
      console.error('Error:', error.message);
    } finally {
      setStatusLoading(false);
    }
  };

  return (
    <div className='w-full h-[calc(100vh-100px)] flex flex-col gap-[20px] relative p-[10px]'>
      {loading ? <Loader /> :
        jobs?.map((job, index) => (
          <div key={index}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <div className="flex justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.userId.fullName}</h3>
              <div><Button bg={'#00F295'} onClick={() => handlePreviewResume(job.userId.resume)} text={'Resume'} /></div>
              <div className="text-right">
                <div className="text-lg font-semibold text-green-600 mb-2">{job.userId.email}</div>
                <div className="text-xs text-gray-500">{new Date(job.appliedAt).toLocaleString()}</div>
              </div>
            </div>
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.jobId.title}</h3>
              <div className="p-2 border rounded w-[125px] ">{stausLoading ? <div className="mx-auto p-2 border-white text-sm h-[20px] w-[20px] animate-spin rounded-full border-[3px] border-t-black" />
                : <select className="pr-2 w-full outline-none"
                  name="status" value={job.status} onChange={(e) => handleChange(e, job)}
                >
                  <option value="pending">Pending</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                </select>
              }
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AllApplicationsAdmin