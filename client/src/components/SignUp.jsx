import { useState } from 'react'
import women from '/women-2.png'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputComponent, { InputPasswordComponent } from './utiles/InputComponent'
import { CiLock, CiMail, CiMobile1, CiUser } from 'react-icons/ci'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { registerUsers } from '../api/users';
import Button, { ButtonLink } from './utiles/Button';

const formikSignUpSchema = Yup.object().shape({
    fullName: Yup.string()
        .required('Full name is required.')
        .min(2, 'Full name must be at least 2 characters.'),
    email: Yup.string()
        .required('Email is required.')
        .email('Invalid email address.'),
    password: Yup.string()
        .required('Password is required.')
        .min(8, 'Password must be at least 8 characters long.')
        .max(30, 'Password must be less than 30 characters long.')
        .test('has-lowercase', 'Password must contain at least one lowercase letter.', value => /[a-z]/.test(value))
        .test('has-uppercase', 'Password must contain at least one uppercase letter.', value => /[A-Z]/.test(value))
        .test('has-number', 'Password must contain at least one number.', value => /\d/.test(value))
        .test('has-special-char', 'Password must contain at least one special character.', value => /[@$!%*?&]/.test(value)),
    confirmPassword: Yup.string()
        .required('Please confirm your password.')
        .oneOf([Yup.ref('password'), null], 'Passwords must match.')
});

const SignUp = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const createUser = async (values) => {
        setLoading(true)
        try {
            const response = await registerUsers({
                fullName: values.fullName,
                email: values.email,
                password: values.password,
                mobileNumber: values.mobileNumber
            });
            toast.success(response?.message);
            formikSignup.resetForm();
            navigate(`/login/verify-otp/${response?.data._id}`)
        } catch (error) {
            toast.error(error.message || 'An unexpected error occurred. Please try again.');
            console.error('Error:', error.message);
        } finally {
            setLoading(false);
        }
    };
    const formikSignup = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: formikSignUpSchema,
        onSubmit: (values) => createUser(values),
    })

    return (
        <>
            <div className='w-[45%] h-full relative '>
                <img className='w-[450px] h-[400px] z-[2] relative ' src={women} />
                <div className='absolute w-[300px] h-[280px] bottom-[5px] left-[5px] bg-gradient-to-b from-[#00E3A5] to-[#005941] shadow-2xl rounded-full shadow-black '></div>
            </div>
            <form onSubmit={formikSignup.handleSubmit} className='w-[50%] flex flex-col gap-[15px] '>
                <div className='text-4xl font-semibold text-[#333333]'>Sign Up</div>
                <InputComponent icon={<CiUser />} placeholder={'Full Name'} name={'fullName'} value={formikSignup?.values?.fullName} changeHandler={formikSignup.handleChange} errors={formikSignup?.errors?.fullName} touched={formikSignup?.touched?.fullName} />
                <InputComponent icon={<CiMail />} placeholder={'Email'} name={'email'} value={formikSignup?.values?.email} changeHandler={formikSignup.handleChange} errors={formikSignup?.errors?.email} touched={formikSignup?.touched?.email} />
                <InputPasswordComponent icon={<CiLock />} showPassword={showPassword} setShowPassword={() => setShowPassword(prev => !prev)} placeholder={'Password'} name={'password'} value={formikSignup?.values?.password} changeHandler={formikSignup.handleChange} errors={formikSignup?.errors?.password} touched={formikSignup?.touched?.password} />
                <InputPasswordComponent icon={<CiLock />} showPassword={showPassword} setShowPassword={() => setShowPassword(prev => !prev)} placeholder={'Confirm Password'} name={'confirmPassword'} value={formikSignup?.values?.confirmPassword} changeHandler={formikSignup.handleChange} errors={formikSignup?.errors?.confirmPassword} touched={formikSignup?.touched?.confirmPassword} />
                <div className='flex justify-between w-full'>
                    <div className='w-[40%]'><Button isLoading={loading} onClick={formikSignup.handleSubmit} bg={'#00F295'} text={'Register'} /></div>
                    <Link to={'/login'} className='w-[40%]'><ButtonLink text={'Login'} border={'1.5px'} /></Link>
                </div>
            </form>
        </>
    )
}

export default SignUp