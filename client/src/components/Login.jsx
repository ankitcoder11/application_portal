import { CiMail } from 'react-icons/ci'
import women from '/women.png'

const Login = () => {
    return (
        <div className='w-full h-screen flex items-center justify-center bg-gradient-to-b from-[#9FFFB5] to-[#00A56D]'>
            <div className='w-[85%] h-[80%] bg-[#F3F3F3] flex'>
                <div className='w-[60%]'>
                    <div>Welcome to the Nottingham Building Society</div>
                    <div>If you already have an accout, please sign in below.</div>
                </div>
                <div className='w-[40%] h-full '>
                    <img className='w-[350px] h-[400px]' src={women} />
                </div>
            </div>
        </div>
    )
}

export default Login