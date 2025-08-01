import { useEffect, useState } from 'react';
import { BsFillBuildingsFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { getJobs } from '../../api/jobs';
import Loader from '../utiles/Loader';
import { CiSearch } from 'react-icons/ci';
import Button from '../utiles/Button';
import { useAuth } from '../../context/AuthContext';

const AllJobList = () => {
    const { isAuthenticated } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [toSearch, setToSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const fetchJobs = async () => {
        setLoading(true);
        try {
            const response = await getJobs(1, 10, toSearch);
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
        <div className={`${!isAuthenticated && "p-[10px]"} w-full h-full max-[650px]:w-[95%] mx-auto flex flex-col gap-[20px] relative `}>
            <form
                onSubmit={() => {
                    if (toSearch.trim() || jobs.length === 0) {
                        fetchJobs();
                    }
                }}
                className='px-[10px] w-[80%] mx-auto max-[550px]:w-[95%] flex items-center gap-[10px] font-bodyFont relative  bg-white rounded-md'>
                <div className='text-gray-900 text-2xl '><CiSearch /> </div>
                <input type='text' placeholder='Job title or location' name={'search'} value={toSearch} onChange={(e) => setToSearch(e.target.value)}
                    className='py-[20px] outline-none w-full text-black placeholder-gray-700 ' />
                <div className='w-[30%] '>
                    <Button isLoading={loading} bg={'black'} color={'white'}
                        onClick={() => {
                            if (toSearch.trim() || jobs.length === 0) {
                                fetchJobs();
                            }
                        }}
                        text={'Search'} />
                </div>
            </form>
            {loading ? <Loader /> : (
                <div className='flex flex-wrap gap-[20px] '>
                    {jobs.length === 0 && <div className='text-2xl text-center w-full font-semibold'>No jobs Found</div>}
                    {jobs?.map((job, index) => (
                        <Link to={`/jobs/${job._id}`} className='border p-[10px] rounded-md border-gray-500 w-[48%] max-[580px]:w-[100%] flex justify-between gap-[8px] ' key={index}>
                            <div className='w-[30%] '>
                                <div className='border border-gray-300 rounded-full flex justify-center items-center h-[80px] w-[80px]  '>
                                    {job.image
                                        ? <img className='w-full h-full rounded-full object-cover' src={job.image} />
                                        : <div className='text-[50px] '><BsFillBuildingsFill /></div>
                                    }
                                </div>
                            </div>
                            <div className='w-[70%] flex flex-col'>
                                <div className='text-xl font-semibold '>{job.title}</div>
                                <div className='font-semibold '>{job.experience}</div>
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
                </div>
            )}
        </div>
    );
};

export default AllJobList;