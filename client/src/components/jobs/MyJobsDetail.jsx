import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getJob } from '../../api/jobs';
import { BsFillBuildingsFill } from 'react-icons/bs';
import Loader from '../utiles/Loader';
import Button from '../utiles/Button';

const MyJobsDetail = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await getJob(id);
                setJob(res.data);
            } catch (err) {
                console.error('Error fetching job:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [id]);

    return (
        <div className='w-full h-full '>
            {loading ? <Loader /> :
                <>
                    <div className='border border-gray-600 rounded-full flex justify-center items-center h-[120px] w-[120px] mx-auto  '>
                        {job?.image
                            ? <img className='w-full h-full rounded-full object-cover' src={job?.image} />
                            : <div className='text-[50px] '><BsFillBuildingsFill /></div>
                        }
                    </div>
                    <h1 className='text-[25px] font-semibold '>{job?.title}</h1>
                    <p><span className='text-lg font-medium'>Location:</span> {job?.location}</p>
                    <p><span className='text-lg font-medium'>Experience:</span> {job?.experience}</p>
                    <p><span className='text-lg font-medium'>Skills:</span> {job?.skills}</p>
                    <p><span className='text-lg font-medium'>Posted on:</span> {new Date(job?.createdAt).toLocaleString()}</p>
                    <p><span className='text-lg font-medium'>Job Type:</span> {job?.type}</p>
                    <p>{job?.description}</p>
                    <div className='flex gap-[10px] '>
                        <div className='w-[20%]'><Button color={'#d0d0d0'} bg={'black'} text={'Applied'} /></div>
                    </div>
                </>
            }
        </div>
    );
};

export default MyJobsDetail;