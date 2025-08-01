import { useEffect, useState } from "react";
import { getJobs } from "../api/jobs";
import { BsFillBuildingsFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ButtonLink } from "./utiles/Button";
import Loader from "./utiles/Loader";
import { useAuth } from "../context/AuthContext";

const Home = () => {
    const { isAuthenticated } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchJobs = async () => {
        setLoading(true);

        try {
            const response = await getJobs(1, 3, '');
            setJobs(response?.data?.jobs);
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);
    return (
        <div className={`${!isAuthenticated && "p-[10px]"} flex flex-col gap-[10px] h-full`}>
            <div className="text-4xl font-semibold w-[50%] "><span className="text-blue-700">Find the</span> most exciting remote-friendly jobs</div>
            <div className="text-[#333333] w-[50%] font-medium ">Jobsek is our love letter to find remote or onsite work with 45.000- Jobs, Unlock your new career working from anywhere in the world</div>
            {loading ? <Loader /> :
                <div className='flex flex-wrap gap-[10px] '>
                    {jobs?.map((job, index) => (
                        <Link to={`/jobs/${job._id}`} className='border p-[10px] rounded-md shadow-sm hover:shadow-md transition border-gray-500 w-[35%] max-[580px]:w-[100%] flex justify-between gap-[5px] items-center ' key={index}>
                            <div className='w-[25%] '>
                                <div className='border border-gray-500 rounded-full flex justify-center items-center h-[70px] w-[70px]'>
                                    {job.image
                                        ? <img className='w-full h-full rounded-full object-cover' src={job.image} />
                                        : <div className='text-[50px] '><BsFillBuildingsFill /></div>
                                    }
                                </div>
                            </div>
                            <div className='w-[70%] flex flex-col gap-[8px]'>
                                <div className='text-[20px] font-semibold '>{job.title}</div>
                                <div className='text-[12px]'>
                                    <strong></strong> at {job.company} - {job.location}
                                </div>
                                <div className='text-[14px]'>
                                    {job.description.length > 200
                                        ? `${job.description.slice(0, 200)}...`
                                        : job.description}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>}
            <Link to={'/jobs'} className='w-[15%]'><ButtonLink color={'white'} bg={'black'} text={'Search More Jobs'} /></Link>
        </div>
    )
}

export default Home