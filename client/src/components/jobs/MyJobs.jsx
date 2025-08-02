import { useEffect, useState } from "react";
import { getAppliedJob } from "../../api/application";
import Loader from "../utiles/Loader";
import { BsFillBuildingsFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const MyJobs = () => {
    const [loading, setLoading] = useState(false);
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        const fetchAppliedJob = async () => {
            setLoading(true);
            try {
                const response = await getAppliedJob();
                setJobs(response?.data);
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false);
            }
        };
        fetchAppliedJob();
    }, [])
    console.log(jobs)
    return (
        <div className="p-[10px] w-full h-full max-[650px]:w-[95%] mx-auto flex flex-col gap-[20px] relative ">
            {loading ? <Loader /> : (
                <div className='flex flex-wrap gap-[20px] '>
                    {jobs.length === 0 && <div className='text-2xl text-center w-full font-semibold'>No jobs Found</div>}
                    {jobs?.map((job, index) => (
                        <Link to={`/jobs/my-jobs/${job.jobId._id}`} className='border p-[10px] rounded-md border-gray-500 w-[48%] max-[580px]:w-[100%] flex justify-between gap-[8px] ' key={index}>
                            <div className='w-[30%] '>
                                <div className='border border-gray-300 rounded-full flex justify-center items-center h-[80px] w-[80px]  '>
                                    {job.jobId.image
                                        ? <img className='w-full h-full rounded-full object-cover' src={job.jobId.image} />
                                        : <div className='text-[50px] '><BsFillBuildingsFill /></div>
                                    }
                                </div>
                            </div>
                            <div className='w-[70%] flex flex-col'>
                                <div className='text-xl font-semibold '>{job.jobId.title}</div>
                                <div className='font-semibold '>{job.jobId.experience}</div>
                                <div className='text-[12px]'>
                                    <strong></strong> at {job.jobId.company} - {job.jobId.location}
                                </div>
                                <div className='text-[14px]'>
                                    {job.jobId.description.length > 200
                                        ? `${job.jobId.description.slice(0, 200)}...`
                                        : job.jobId.description}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyJobs