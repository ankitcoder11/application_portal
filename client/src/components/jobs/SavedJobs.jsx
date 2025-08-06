import { useEffect, useState } from 'react';
import Loader from '../utiles/Loader';
import Button, { ButtonLink } from '../utiles/Button';
import { PiBuildingsLight } from 'react-icons/pi';
import { HiOutlineMapPin } from 'react-icons/hi2';
import { IoTimeOutline } from 'react-icons/io5';
import { FaArrowRightLong, FaCheck } from 'react-icons/fa6';
import { applyJob, getSavedJob, unSaveJob } from '../../api/application';
import toast from 'react-hot-toast';
import { GoBookmarkSlash } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';

const SavedJobs = () => {
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [applyLoading, setApplyLoading] = useState(false);
    const [unSaveLoading, setUnSaveLoading] = useState(false);

    const fetchSavedJobs = async () => {
        setLoading(true);
        try {
            const response = await getSavedJob();
            setJobs(response?.data);
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSavedJobs();
    }, []);

    const applyNow = async () => {
        setApplyLoading(true)
        try {
            const response = await applyJob({ jobId: selectedJob?._id });
            toast.success(response?.message);
        } catch (error) {
            toast.error(error.message || 'An unexpected error occurred. Please try again.');
            console.error('Error:', error.message);
        } finally {
            setApplyLoading(false);
        }
    }

    const unSaveJobs = async (job) => {
        setUnSaveLoading(true)
        try {
            const response = await unSaveJob(job);
            toast.success(response?.message);
            fetchSavedJobs()
        } catch (error) {
            toast.error(error.message || 'An unexpected error occurred. Please try again.');
            console.error('Error:', error.message);
        } finally {
            setUnSaveLoading(false);
        }
    }

    return (
        <div className='w-full h-[calc(100vh-100px)] relative p-[10px]'>
            {loading ? <Loader /> :
                <div className="flex flex-col gap-[30px] ">
                    {jobs.length === 0 ?
                        <div className='text-2xl w-full font-semibold flex flex-col items-center justify-center gap-[20px] h-full'>
                            <div>No jobs Found</div>
                            <Link to={"/jobs"} className="w-[20%] block max-[800px]:w-[70%]"><ButtonLink text='View Open Positions' color='white' bg='#222222' /></Link>
                        </div>
                        : jobs?.map((job) => (
                            <div
                                key={job?.jobId?._id}
                                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{job?.jobId?.title}</h3>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <div className='mr-2 text-lg'><PiBuildingsLight /></div>
                                                {job?.jobId?.department}
                                            </div>
                                            <div className="flex items-center">
                                                <div className='mr-2 text-lg'><HiOutlineMapPin /></div>
                                                {job?.jobId?.location}
                                            </div>
                                            <div className="flex items-center">
                                                <div className='mr-2 text-lg'><IoTimeOutline /></div>
                                                {job?.jobId?.type}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-semibold text-green-600 mb-2">{job?.jobId?.salary}</div>
                                        <div className="text-xs text-gray-500">{job?.jobId?.posted}</div>
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-6 leading-relaxed">{job?.jobId?.description}</p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {job?.jobId?.skills.map((skill, skillIndex) => (
                                        <span key={skillIndex} className="px-3 py-1 bg-blue-50 text-green-600 text-xs font-medium rounded-full">
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-end gap-[10px]  ">
                                    <div className='px-3 py-[6px] bg-blue-50 text-green-600 text-2xl font-medium rounded-md cursor-pointer' onClick={() => unSaveJobs(job?.jobId?._id)}>
                                        {unSaveLoading ? <div className="mx-auto border-white text-sm h-[23px] w-[23px] animate-spin rounded-full border-[3px] border-t-black" />
                                            : <GoBookmarkSlash />}
                                    </div>
                                    <div>
                                        <Button onClick={() => setSelectedJob(job.jobId)} bg={'#00F295'} text={'Apply Now'} />
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            }
            {selectedJob && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-8 max-[800px]:p-4">
                            <div className="flex justify-between items-start mb-6 max-[800px]:mb-4">
                                <div>
                                    <h3 className="text-3xl max-[800px]:text-2xl font-bold text-gray-900 mb-4 ">{selectedJob.title}</h3>
                                    <div className="flex items-center max-[800px]:items-start gap-6 max-[800px]:gap-2 text-gray-600 max-[800px]:flex-col">
                                        <span className="flex items-center gap-2">
                                            <div className='text-lg'><PiBuildingsLight /></div>
                                            {selectedJob.department}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <div className='text-lg'><HiOutlineMapPin /></div>
                                            {selectedJob.location}
                                        </span>
                                        <span className="bg-blue-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                            {selectedJob.type}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedJob(null)}
                                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
                                >
                                    <div className="text-xl"><RxCross2 /> </div>
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                                {selectedJob.requirements.length > 0 &&

                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h4>
                                        <ul className="space-y-3">
                                            {selectedJob.requirements.map((req, index) => (
                                                <li key={index} className="flex items-center gap-3">
                                                    <div className=" text-green-600"><FaCheck /> </div>
                                                    <span className="text-gray-600">{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                }
                                {selectedJob.responsibilities.length > 0 &&

                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-900 mb-4">Responsibilities</h4>
                                        <ul className="space-y-3">
                                            {selectedJob.responsibilities.map((resp, index) => (
                                                <li key={index} className="flex items-center gap-3">
                                                    <span className='text-green-600'><FaArrowRightLong /></span>
                                                    <span className="text-gray-600">{resp}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                }
                            </div>

                            <div className="flex gap-4 justify-center">
                                <Button onClick={applyNow} isLoading={applyLoading} bg={'#00F295'} text={'Apply Now'} />
                                <Button onClick={() => setSelectedJob(null)} border={'1.5px'} text={'Close'} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SavedJobs;