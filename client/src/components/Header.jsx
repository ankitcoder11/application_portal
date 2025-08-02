import Button, { ButtonLink } from './utiles/Button'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
// import logo from '/logoJob.png'

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const { pathname } = useLocation();
  return (
    <div className='bg-[#00F295] p-[15px] rounded-md'>
      <div className='flex justify-between w-[95%] mx-auto items-center'>
        <div className='w-[20%]'>
          <p className='text-4xl font-semibold'>Nottingham</p>
          <p className='text-xl text-right font-semibold'>Building Society</p>
          {/* <img src={logo} /> */}
        </div>
        <div className='flex w-[35%] justify-between font-medium '>
          <Link to={'/'} className={`${pathname === '/' && 'text-blue-600 border-b-[1.5px] pb-[5px] border-blue-600 '}`} >Home</Link>
          <Link to={'/jobs'} className={`${pathname.includes('/jobs') && 'text-blue-600 border-b-[1.5px] pb-[5px] border-blue-600 '}`}>Jobs</Link>
          <Link to={'/aboutus'} className={`${pathname === '/aboutus' && 'text-blue-600 border-b-[1.5px] pb-[5px] border-blue-600 '}`}>About Us</Link>
          <Link to={'/contactus'} className={`${pathname === '/contactus' && 'text-blue-600 border-b-[1.5px] pb-[5px] border-blue-600 '}`}>Contact Us</Link>
        </div>
        {
          isAuthenticated ?
            <div className='w-[15%]'><Button onClick={logout} color={'white'} bg={'black'} text={'Logout'} /></div>
            :
            <Link to={'/login'} className='w-[15%]'><ButtonLink color={'white'} bg={'black'} text={'Login'} /></Link>
        }
      </div>
    </div>
  )
}

export default Header