import { CiLock, CiMail } from 'react-icons/ci'
import women from '/women.png'
import InputComponent, { InputPasswordComponent } from './utiles/InputComponent';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ButtonWithBg, { ButtonWithoutBg } from './utiles/Button';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const formikLoginSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required.')
            .email('Invalid email address.'),
        password: Yup.string()
            .required('New password is required.')
    });

    // const loginUser = async (values) => {
    //     setLoginLoading(true)
    //     try {
    //         const response = await loginUsers({
    //             email: values.email,
    //             password: values.password
    //         });
    //         if (!response?.data?.user?.isOtpVerified) {
    //             toast.success(response.message);
    //             navigate(`/login/verify-otp/${response?.data?.user?._id}`)
    //             return;
    //         }
    //         Cookies.set('accessToken', response?.data?.accessToken, { expires: 1 });
    //         localStorage.setItem('user', JSON.stringify(response?.data?.user))
    //         setIsAdmin(response?.data?.user?.email === 'ankit@gmail.com');
    //         toast.success(response.message);
    //         formikLogin.resetForm();
    //         setShowPassword(false)
    //         window.location.reload();
    //     } catch (error) {
    //         toast.error(error.message || 'An unexpected error occurred. Please try again.');
    //         console.error('Error:', error.message);
    //     } finally {
    //         setLoginLoading(false);
    //     }
    // };

    const formikLogin = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: formikLoginSchema,
        // onSubmit: (values) => loginUser(values),
    })

    return (
        <div className='w-full h-screen flex items-center justify-center bg-gradient-to-b from-[#9FFFB5] to-[#00A56D] font-robot'>
            <div className='w-[70%] h-[85%] bg-[#F3F3F3] flex p-[40px] justify-between rounded-md'>
                <form className='w-[50%] flex flex-col gap-[15px] '>
                    <div className='text-4xl font-semibold text-[#333333]'>Welcome to the Nottingham Building Society</div>
                    <div className='text-xl'>If you already have an accout, please sign in below.</div>
                    <InputComponent icon={<CiMail />} placeholder={'Email'} name={'email'} value={formikLogin?.values?.email} changeHandler={formikLogin.handleChange} errors={formikLogin?.errors?.email} touched={formikLogin?.touched?.email} />
                    <InputPasswordComponent icon={<CiLock />} showPassword={showPassword} setShowPassword={() => setShowPassword(prev => !prev)} placeholder={'Password'} name={'password'} value={formikLogin?.values?.password} changeHandler={formikLogin.handleChange} errors={formikLogin?.errors?.password} touched={formikLogin?.touched?.password} />
                    <div className='font-bodyFont text-[12px] text-right underline'>Forgot your Password?</div>
                    <div className='flex justify-between w-full'>
                        <div className='w-[40%]'><ButtonWithBg text={'Login'} /></div>
                        <div className='w-[40%]'><ButtonWithoutBg text={'Sign Up'} /></div>
                    </div>
                </form>
                <div className='w-[45%] h-full relative '>
                    <img className='w-[450px] h-[400px] z-[2] relative ' src={women} />
                    <div className='absolute w-[300px] h-[300px] bottom-[22px] bg-gradient-to-b from-[#00E3A5] to-[#005941] right-3 shadow-2xl rounded-full shadow-black '></div>
                </div>
            </div>
        </div>
    )
}

export default Login