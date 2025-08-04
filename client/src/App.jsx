import { Link, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header"
import Login from "./components/Login"
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import { Toaster } from "react-hot-toast";
import RedirectIfLoggedIn from "./components/RedirectIfLoggedIn";
import { useAuth } from "./context/AuthContext";
import OTPVerify from "./components/login/OTPVerify";
import ForgotPassword from "./components/login/ForgotPassword";
import ResetPassword from "./components/login/ResetPassword";
import AuthLayout from "./components/login/AuthLayout";
import AllJobList from "./components/jobs/AllJobList";
import JobPost from "./components/jobs/JobPost";
import RoleBasedRoute from "./components/RoleBasedRoute";
import MyJobs from "./components/jobs/MyJobs";
import SavedJobs from "./components/jobs/SavedJobs";
import About from "./components/About";


const App = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const { pathname } = useLocation();
  const isAuthPage = [
    "/login",
    "/signup",
    "/forgot-password",
  ].includes(pathname) ||
    pathname.startsWith("/verify-otp") ||
    pathname.startsWith("/reset-password");
  return (
    <div className={`${!isAuthPage ? "p-[10px]" : ""} flex flex-col gap-[10px] `}>
      {/* <div className='flex flex-col gap-[10px] p-[10px] '> */}
      <Toaster />
      {!isAuthPage && <Header />}
      <div className="flex w-full gap-[10px] ">
        {!isAuthPage && (isAuthenticated && <div className=" w-[25%] h-[calc(100vh-100px)] gap-[10px] flex flex-col ">
          <div className="bg-[#00F295] w-full rounded-md h-1/2 justify-center items-center flex flex-col ">
            <div className="text-xl font-semibold">{user?.fullName}</div>
            <div className="text-[#333333] ">{user?.email}</div>
          </div>
          <div className="bg-[#00F295] w-full rounded-md h-1/2 justify-center items-center flex flex-col">
            {isAdmin ?
              <div className="flex flex-col gap-[10px] font-medium ">
                <Link to={'/admin/post-job'} className={`${pathname === '/admin/post-job' ? 'text-blue-600 border-b-[1.5px] border-blue-600 ' : 'border-b-[1.5px] border-[#00F295]'} p-[5px]`} >Post Jobs</Link>
                <Link to={'/admin/manage-job'} className={`${pathname === '/admin/manage-job' ? 'text-blue-600 border-b-[1.5px] border-blue-600 ' : 'border-b-[1.5px] border-[#00F295]'} p-[5px]`} >Manage Jobs</Link>
              </div>
              : <div>
                <div className="flex flex-col gap-[10px] font-medium ">
                  <Link to={'/jobs/my-jobs'} className={`${pathname === '/jobs/my-jobs' ? 'text-blue-600 border-b-[1.5px] border-blue-600 ' : 'border-b-[1.5px] border-[#00F295]'} p-[5px]`} >My jobs</Link>
                  <Link to={'/jobs/saved-jobs'} className={`${pathname === '/jobs/saved-jobs' ? 'text-blue-600 border-b-[1.5px] border-blue-600 ' : 'border-b-[1.5px] border-[#00F295]'} p-[5px]`} >Saved jobs</Link>
                </div>
              </div>
            }
          </div>
        </div>)}
        <div className={`${!isAuthPage && isAuthenticated ? "w-[75%] " : "w-full"} bg-[#00F295] rounded-md overflow-auto`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<AllJobList />} />
            <Route path="/jobs/my-jobs" element={<MyJobs />} />
            <Route path="/jobs/saved-jobs" element={<SavedJobs />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={
              <RedirectIfLoggedIn>
                <AuthLayout><Login /></AuthLayout>
              </RedirectIfLoggedIn>
            } />
            <Route path="/signup" element={
              <RedirectIfLoggedIn>
                <AuthLayout><SignUp /></AuthLayout>
              </RedirectIfLoggedIn>
            } />
            <Route path="/forgot-password" element={
              <RedirectIfLoggedIn>
                <AuthLayout><ForgotPassword /></AuthLayout>
              </RedirectIfLoggedIn>
            } />
            <Route path="/verify-otp/:userId" element={
              <RedirectIfLoggedIn>
                <AuthLayout><OTPVerify /></AuthLayout>
              </RedirectIfLoggedIn>
            } />
            <Route path="/reset-password/:id" element={
              <RedirectIfLoggedIn>
                <AuthLayout><ResetPassword /></AuthLayout>
              </RedirectIfLoggedIn>
            } />
            <Route path="/admin/*"
              element={
                <RoleBasedRoute>
                  <Routes>
                    <Route path="post-job" element={<JobPost />} />
                    <Route path="manage-job" element={<AllJobList />} />
                  </Routes>
                </RoleBasedRoute>
              } />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App