import { useEffect, useState } from 'react';
import { getJobs } from '../../api/jobs';
import Loader from '../utiles/Loader';
import { CiSearch } from 'react-icons/ci';
import Button from '../utiles/Button';
import { PiBuildingsLight } from 'react-icons/pi';
import { HiOutlineMapPin } from 'react-icons/hi2';
import { IoTimeOutline } from 'react-icons/io5';
import { FaArrowRightLong, FaCheck } from 'react-icons/fa6';
import Pagination from '@mui/material/Pagination';
import UpdateJobComponent from './UpdateJobComponent';

const ManageJobs = () => {
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [toSearch, setToSearch] = useState('');
    const [loading, setLoading] = useState(false);
    // Pagination
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(10);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const response = await getJobs(page, limit, toSearch);
            setJobs(response?.data?.jobs);
            const total = response.data.total;
            setTotalPages(Math.ceil(total / limit));
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, [page, limit]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };
    const handleLimitChange = (event) => {
        setLimit(event.target.value);
        setPage(1);
    };

    return (
        <div className='w-full h-[calc(100vh-100px)] flex flex-col gap-[20px] relative p-[10px]'>
            <form onSubmit={() => { if (toSearch.trim() || jobs.length === 0) { fetchJobs() } }}
                className='px-[10px] w-[80%] mx-auto max-[550px]:w-[95%] flex items-center gap-[10px] font-bodyFont relative  bg-white rounded-md'>
                <div className='text-gray-700 text-2xl '><CiSearch /> </div>
                <input type='text' placeholder='Job title or location' name={'search'} value={toSearch} onChange={(e) => setToSearch(e.target.value)}
                    className='py-[15px] outline-none w-full text-black placeholder-gray-700 ' />
                <div className='w-[20%] '>
                    <Button isLoading={loading} bg={'black'} color={'white'}
                        onClick={() => {
                            if (toSearch.trim() || jobs.length === 0) {
                                fetchJobs();
                            }
                        }}
                        text={'Search'} />
                </div>
            </form>
            {loading ? <Loader /> :
                <div className="flex flex-col gap-[30px] ">
                    {jobs.length === 0 ?
                        <div className='text-2xl w-full font-semibold flex flex-col items-center justify-center gap-[20px] h-full'>
                            No jobs Found
                        </div>
                        : jobs.map((job, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <div className='mr-2 text-lg'><PiBuildingsLight /></div>
                                                {job.department}
                                            </div>
                                            <div className="flex items-center">
                                                <div className='mr-2 text-lg'><HiOutlineMapPin /></div>
                                                {job.location}
                                            </div>
                                            <div className="flex items-center">
                                                <div className='mr-2 text-lg'><IoTimeOutline /></div>
                                                {job.type}
                                            </div>
                                            <div className='flex items-center'>Experience :<span className='text-green-600 font-medium ml-1'>{job.experience}</span></div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-semibold text-green-600 mb-2">{job.salary}</div>
                                        <div className="text-xs text-gray-500">{new Date(job.posted).toLocaleString()}</div>
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-6 leading-relaxed">{job.description}</p>

                                <div className="grid md:grid-cols-2 gap-8 mb-8">
                                    {job.requirements.length > 0 &&
                                        <div>
                                            <h4 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h4>
                                            <ul className="space-y-3">
                                                {job.requirements.map((req, index) => (
                                                    <li key={index} className="flex items-center gap-3">
                                                        <div className=" text-green-600"><FaCheck /> </div>
                                                        <span className="text-gray-600">{req}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    }
                                    {job.responsibilities.length > 0 &&
                                        <div>
                                            <h4 className="text-xl font-semibold text-gray-900 mb-4">Responsibilities</h4>
                                            <ul className="space-y-3">
                                                {job.responsibilities.map((resp, index) => (
                                                    <li key={index} className="flex items-center gap-3">
                                                        <span className='text-green-600'><FaArrowRightLong /></span>
                                                        <span className="text-gray-600">{resp}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    }
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {job.skills.map((skill, skillIndex) => (
                                        <span key={skillIndex} className="px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full">
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-end gap-[10px] ">
                                    <Button onClick={() => setSelectedJob(job)} bg={'#00F295'} text={'Update job'} />
                                </div>
                            </div>
                        ))}
                </div>
            }
            <div>
                <label htmlFor="custom-limit-select" className='mr-2'>
                    Jobs per page:
                </label>
                <select
                    id="custom-limit-select"
                    value={limit}
                    onChange={handleLimitChange}
                    className='outline-none px-[6px] py-2 rounded-md text-sm '
                >
                    {[5, 10, 20, 50].map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="black"
                variant="outlined" shape="rounded"
                showFirstButton
                showLastButton
                className='pb-[10px] '
            />
            {selectedJob && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-8 max-[700px]:p-4">
                            <UpdateJobComponent job={selectedJob} setJob={setSelectedJob} fetchJobs={fetchJobs} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageJobs;