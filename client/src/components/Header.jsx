import React from 'react'
import Button, { ButtonLink } from './utiles/Button'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <div className='bg-[#00F295] p-[20px] rounded-md'>
      <div className='flex justify-between w-[95%] mx-auto items-center'>
        <div className='w-[20%]'>
          <p className='text-4xl font-semibold'>Nottingham</p>
          <p className='text-xl text-right font-semibold'>Building Society</p>
        </div>
        <div className='flex w-[35%] justify-between font-medium'>
          <div>Home</div>
          <div>Open Jobs</div>
          <div>About Us</div>
          <div>Contact Us</div>
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