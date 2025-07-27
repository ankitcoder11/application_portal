import React from 'react'

const ButtonWithBg = ({ text }) => {
    return (
        <div className=' text-center p-[10px] w-full bg-[#00F295] font-bold rounded-md '>{text}</div>
    )
}

export default ButtonWithBg

const ButtonWithoutBg = ({ text }) => {
    return (
        <div className='text-center p-[10px] w-full font-bold rounded-md border-black border-[1.5px]'>{text}</div>
    )
}

export { ButtonWithoutBg }