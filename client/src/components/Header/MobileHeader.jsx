import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import Button, { ButtonLink } from "../utiles/Button";
import { useAuth } from "../../context/AuthContext";
import PopUp from "../utiles/PopUp";
import ResumeUploader from "../ResumeUploader";

const MobileHeader = ({ setMobile }) => {
    const { isAuthenticated, logout, isAdmin, user } = useAuth();
    const [forClose, setForClose] = useState(true);
    const { pathname } = useLocation();
    const [resumePopUp, setResumePopUp] = useState(false)
    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Jobs', href: '/jobs' },
        { name: 'About', href: '/about' },
    ];
    const handlePreviewResume = (resumeUrl) => {
        const filename = 'resume-preview';
        const previewUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'}/users/download-resume?url=${encodeURIComponent(resumeUrl)}&filename=${encodeURIComponent(filename)}&preview=true`;
        window.open(previewUrl, '_blank');
    };
    return (
        <div className='z-[2] fixed w-full h-full bg-black bg-opacity-50 top-0 left-0 right-0 bottom-0'>
            <div className={`w-[35%] min-w-[290px] h-screen bg-[#00F295] flex flex-col gap-[20px] p-[10px] ${forClose ? 'animate-mobileHeaderOpen' : 'animate-MobileHeaderClose'}`}>
                <div className='text-[20px] p-[5px] flex justify-end' onClick={() => { setForClose(false); setTimeout(() => { setMobile(false); }, 500); }}><RxCross1 /></div>
                <div className="flex flex-col gap-1 ">
                    {navigation.map((item) => (
                        <Link key={item.name} to={item.href}
                            className={`text-sm font-medium transition-colors hover:text-blue-600 
                        ${pathname === item.href ? 'text-blue-600' : 'text-gray-700'}`}
                        >
                            {item.name}
                        </Link>
                    ))}
                    {isAdmin ?
                        <>
                            <Link to={'/admin/post-job'} className={`text-sm font-medium transition-colors hover:text-blue-600
                            ${pathname === '/admin/post-job' ? 'text-blue-600' : 'text-gray-700'}`} >Post Jobs</Link>
                            <Link to={'/admin/manage-job'} className={`text-sm font-medium transition-colors hover:text-blue-600
                            ${pathname === '/admin/manage-job' ? 'text-blue-600' : 'text-gray-700'}`} >Manage Jobs</Link>
                            <Link to={'/admin/view-application'} className={`text-sm font-medium transition-colors hover:text-blue-600
                            ${pathname === '/admin/view-application' ? 'text-blue-600' : 'text-gray-700'}`} >View Applications</Link>
                        </>
                        : isAuthenticated && <>
                            <Link to={'/jobs/my-jobs'} className={`text-sm font-medium transition-colors hover:text-blue-600
                            ${pathname === '/jobs/my-jobs' ? 'text-blue-600' : 'text-gray-700'}`} >My jobs</Link>
                            <Link to={'/jobs/saved-jobs'} className={`text-sm font-medium transition-colors hover:text-blue-600
                            ${pathname === '/jobs/saved-jobs' ? 'text-blue-600' : 'text-gray-700'}`} >Saved jobs</Link>
                        </>
                    }
                </div>
                <div className='flex items-center justify-between w-[50%] '>
                    {isAuthenticated
                        ? <Button onClick={logout} color={'white'} bg={'black'} text={'Logout'} />
                        : <>
                            <Link to="/login"
                                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                            >Log in</Link>
                            <Link to={'/signup'}><ButtonLink color={'white'} bg={'black'} text={'Sign up'} /></Link>
                        </>
                    }
                </div>
                {isAuthenticated && <div className="bg-[#00F295] w-full rounded-md justify-center items-center flex flex-col gap-1 ">
                    <div className="text-xl font-semibold">{user?.fullName}</div>
                    <div className="text-[#333333] ">{user?.email}</div>
                    {user?.resume && <div><Button bg={'black'} color={'white'} onClick={() => handlePreviewResume(user?.resume)} text={'Preview resume'} /></div>}
                    <div><Button bg={'black'} onClick={() => setResumePopUp(true)} color={'white'} text={user?.resume ? 'Upload new resume' : 'Upload resume'} /></div>
                    {resumePopUp && <PopUp close={() => setResumePopUp(false)}><ResumeUploader setResumePopUp={() => setResumePopUp(false)} /></PopUp>}
                </div>}
            </div>
        </div>
    )
}

export default MobileHeader