import { Route, Routes, useLocation } from "react-router-dom";
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

const App = () => {
  const { user, isAuthenticated } = useAuth();
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
      <Toaster />
      {!isAuthPage && <Header />}
      <div className="flex w-full gap-[10px] ">
        {!isAuthPage && (isAuthenticated && <div className=" w-[25%] h-[calc(100vh-140px)] gap-[10px] flex flex-col ">
          <div className="bg-[#00F295] w-full rounded-md h-1/2 justify-center items-center flex flex-col ">
            <div className="text-xl font-semibold">{user?.fullName}</div>
            <div className="text-[#333333] ">{user?.email}</div>
          </div>
          <div className="bg-[#00F295] w-full rounded-md h-1/2 justify-center items-center flex flex-col">
          </div>
        </div>)}
        <div className={`${!isAuthPage && isAuthenticated ? "w-[75%] h-[calc(100vh-140px)]" : "w-full h-[calc(100vh-140px)]"} bg-[#00F295] rounded-md`}>
          <Routes>
            <Route path="/" element={<Home />} />
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
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App