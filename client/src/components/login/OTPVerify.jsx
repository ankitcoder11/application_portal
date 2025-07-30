import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { otpVerifyApi } from "../../api/users";
import toast from "react-hot-toast";
import Button from "../utiles/Button";

const OTPVerify = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [otp, setOtp] = useState(Array(6).fill(''));
    const userId = location.pathname.split("/").pop();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/[^0-9]/.test(value)) return;
        setError('')

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    const handleSubmit = async () => {
        if (otp.some((digit) => digit === '')) {
            setError('Please enter all OTP digits')
            return;
        }
        setLoading(true);
        try {
            const response = await otpVerifyApi({ otp: otp.join(''), userId });
            toast.success(response.message);
            navigate('/login');
        } catch (error) {
            toast.error(error.message || 'Verification failed. Please try again.');
            console.error(error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className='flex flex-col items-center justify-center w-full h-full gap-[10px]'>
            <h2 className="text-2xl max-[530px]:text-xl font-semibold text-center">OTP Verification</h2>
            <p className="text-sm">Enter OTP sent to your email</p>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-[20px]">
                <div className="flex gap-[10px] max-[530px]:gap-[5px] items-center justify-center relative">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-input-${index}`}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            className="w-14 max-[530px]:w-8 h-14 max-[530px]:h-8 text-center text-2xl max-[530px]:text-lg font-bold max-[530px]:font-semibold border-2 border-gray-300 rounded-md focus:outline-none focus:border-black"
                        />
                    ))}
                    {error && <p className='absolute text-[10px] bottom-[-15px] text-red-400'>{error}</p>}
                </div>
                <Button text="Verify" bg={'#00F295'} onClick={handleSubmit} isLoading={loading} />
            </form>
        </div>
    );
};

export default OTPVerify;