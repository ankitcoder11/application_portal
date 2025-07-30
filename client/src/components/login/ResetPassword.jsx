import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../api/users";
import toast from "react-hot-toast";
import { InputPasswordComponent } from "../utiles/InputComponent";
import { CiLock } from "react-icons/ci";
import Button from "../utiles/Button";

const ResetPassword = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setPassword(e.target.value);
        setIsValid(true)
    };

    // Regex for password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;

    const validatePassword = (password) => {
        // Check if password matches the regex
        if (password.length < 8 || password.length > 30) {
            setErrorMessage("Password must be between 8 and 30 characters.");
            return false;
        }
        if (!passwordRegex.test(password)) {
            setErrorMessage("Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.");
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {

        if (!validatePassword(password)) {
            setIsValid(false);
            return;
        }

        setLoading(true);
        try {
            const response = await resetPassword({ newPassword: password, resetToken: id });
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
        <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-[15px] w-full h-full'>
            <div className='relative w-[90%] flex flex-col items-center'>
                <InputPasswordComponent
                    icon={<CiLock />}
                    showPassword={showPassword}
                    setShowPassword={() => setShowPassword((prev) => !prev)}
                    placeholder={'Password'}
                    name={'password'}
                    value={password}
                    changeHandler={handleChange}
                />
                {!isValid && <p className='absolute text-[10px] bottom-[-15px] text-red-400'>{errorMessage}</p>}
            </div>
            <div className="w-[30%]">
                <Button bg={'#00F295'} text="Reset Password" onClick={handleSubmit} isLoading={loading} />
            </div>
        </form>
    );
};

export default ResetPassword;