import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../api/users";
import { CiMail } from "react-icons/ci";
import InputComponent from "../utiles/InputComponent";
import Button from "../utiles/Button";
import toast from "react-hot-toast";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState("");
    const [isValid, setIsValid] = useState(true);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async () => {
        const isEmailValid = emailRegex.test(email);
        setIsValid(isEmailValid);

        if (!isEmailValid) {
            return;
        }

        setLoading(true);
        try {
            const response = await forgotPassword({ email });
            toast.success(response.message);
            navigate('/login');
        } catch (error) {
            toast.error(error.message || 'Verification failed. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='w-full h-full flex flex-col items-center justify-center gap-[15px]'>
            <div className='relative w-[90%] flex flex-col items-center'>
                <InputComponent icon={<CiMail />} placeholder={'Enter your email'} name={'email'} value={email} changeHandler={handleChange} />
                {!isValid && <p className='absolute text-[10px] bottom-[-15px] text-red-400'> Please enter a valid email.</p>}
            </div>
            <div className='w-[20%]'>
                <Button text="Send" onClick={handleSubmit} bg={'#00F295'} isLoading={loading} />
            </div>
        </form>
    );
};

export default ForgotPassword