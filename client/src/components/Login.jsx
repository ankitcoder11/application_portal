import { CiLock, CiMail } from 'react-icons/ci'
import women from '/women.png'
import InputComponent, { InputPasswordComponent } from './utiles/InputComponent';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginUsers } from '../api/users';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Button, { ButtonLink } from './utiles/Button';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const formikLoginSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required.')
            .email('Invalid email address.'),
        password: Yup.string()
            .required('Password is required.')
    });

    const loginUser = async (values) => {
        setLoading(true)
        try {
            const response = await loginUsers({
                email: values.email,
                password: values.password
            });
            if (!response?.data?.user?.isOtpVerified) {
                toast.success(response.message);
                navigate(`/verify-otp/${response?.data?.user?._id}`)
                return;
            }
            login(response);
            navigate("/");
            toast.success(response.message);
        } catch (error) {
            toast.error(error.message || 'An unexpected error occurred. Please try again.');
            console.error('Error:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const formikLogin = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: formikLoginSchema,
        onSubmit: (values) => loginUser(values),
    })

    return (
        <>
            <form onSubmit={formikLogin.handleSubmit} className='w-[50%] max-[800px]:w-[100%] flex flex-col gap-[15px] max-[800px]:gap-[10px] '>
                <div className='text-4xl max-[800px]:text-2xl font-semibold text-[#333333]'>Welcome to the Nottingham Building Society</div>
                <div className='text-xl max-[800px]:text-base'>If you already have an accout, please sign in below.</div>
                <InputComponent icon={<CiMail />} placeholder={'Email'} name={'email'} value={formikLogin?.values?.email} changeHandler={formikLogin.handleChange} errors={formikLogin?.errors?.email} touched={formikLogin?.touched?.email} />
                <InputPasswordComponent icon={<CiLock />} showPassword={showPassword} setShowPassword={() => setShowPassword(prev => !prev)} placeholder={'Password'} name={'password'} value={formikLogin?.values?.password} changeHandler={formikLogin.handleChange} errors={formikLogin?.errors?.password} touched={formikLogin?.touched?.password} />
                <Link to={'/forgot-password'} className='font-bodyFont text-[12px] text-right underline'>Forgot your Password?</Link>
                <div className='flex justify-between w-full'>
                    <div className='w-[40%]'><Button isLoading={loading} bg={'#00F295'} onClick={formikLogin.handleSubmit} text={'Login'} /></div>
                    <Link to={'/signup'} className='w-[40%]'><ButtonLink text={'Sign Up'} border={'1.5px'} /></Link>
                </div>
            </form>
            <div className='w-[45%] h-full relative max-[800px]:hidden '>
                <img className='w-[450px] h-[400px] z-[2] relative ' src={women} />
                <div className='absolute w-[300px] h-[300px] bottom-[22px] bg-gradient-to-b from-[#00E3A5] to-[#005941] right-3 shadow-2xl rounded-full shadow-black '></div>
            </div>
        </>
    )
}

export default Login