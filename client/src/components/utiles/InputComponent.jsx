import { VscEye, VscEyeClosed } from "react-icons/vsc"

const InputComponent = ({ placeholder, icon, name, errors, touched, changeHandler, value }) => {
    return (
        <>
            <div className='bg-gray-300 p-[10px] w-full max-[550px]:w-[95%] flex items-center gap-[10px] font-bodyFont relative rounded-md border-black border-[1.5px]'>
                <input type='text' placeholder={placeholder} name={name} value={value} onChange={changeHandler}
                    className='bg-gray-300 outline-none text-[14px] w-full text-black placeholder-gray-700 ' />
                <div className='text-gray-900'>{icon}</div>
                {errors && touched && <p className='absolute text-[10px] bottom-[-12px] text-red-400'> {errors}</p>}
            </div>
        </>
    )
}

export default InputComponent

const InputPasswordComponent = ({ placeholder, icon, name, errors, touched, changeHandler, value, showPassword, setShowPassword }) => {
    return (
        <>
            <div className='bg-gray-300 p-[10px] w-full max-[550px]:w-[95%] flex items-center gap-[10px] font-bodyFont relative rounded-md border-black border-[1.5px]'>
                <input type={showPassword ? 'text' : 'password'} placeholder={placeholder} name={name} value={value} onChange={changeHandler} autoComplete={name}
                    className='bg-gray-300 outline-none text-[14px] w-full placeholder-gray-700 ' />
                <p className='text-gray-700 cursor-pointer' onClick={setShowPassword}>{showPassword ? <VscEyeClosed /> : <VscEye />}</p>
                <div className='text-gray-900'>{icon}</div>
                {errors && touched && <p className='absolute text-[10px] bottom-[-12px] text-red-400'> {errors}</p>}
            </div>
        </>
    )
}

export { InputPasswordComponent }