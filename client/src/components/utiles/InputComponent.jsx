
const InputComponent = ({ placeholder, icon, name, errors, touched, changeHandler, value }) => {
    return (
        <>
            <div className='bg-gray-100 p-[10px] w-1/2 max-[550px]:w-[95%] flex items-center gap-[10px] font-bodyFont relative'>
                <div className='text-gray-700'>{icon}</div>
                <input type='text' placeholder={placeholder} name={name} value={value} onChange={changeHandler}
                    className='bg-gray-100 outline-none text-[14px] w-full ' />
                {errors && touched && <p className='absolute text-[10px] bottom-[-12px] text-red-400'> {errors}</p>}
            </div>
        </>
    )
}

export default InputComponent