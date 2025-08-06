import Button, { ButtonLink } from './utiles/Button'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const { pathname } = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Jobs', href: '/jobs' },
    { name: 'About', href: '/about' },
  ];
  return (
    <div className='bg-[#00F295] p-[10px] rounded-md'>
      <div className='flex justify-between w-[95%] mx-auto items-center'>
        <Link to={'/'} className='w-[15%]'>
          <p className='text-xl font-semibold'>Nottingham</p>
          <p className='text-sm text-right font-semibold'>Building Society</p>
        </Link>
        <div className="flex items-center justify-between w-[20%] ">
          {navigation.map((item) => (
            <Link key={item.name} to={item.href}
              className={`text-sm font-medium transition-colors hover:text-blue-600 
              ${pathname === item.href ? 'text-blue-600' : 'text-gray-700'}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className='flex items-center justify-between w-[10%] '>
          {isAuthenticated
            ? <Button onClick={logout} color={'white'} bg={'black'} text={'Logout'} />
            : <>
              <Link to="/login"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >Log in</Link>
              <Link to={'/signup'}><ButtonLink color={'white'} bg={'black'} text={'Sign up'} /></Link>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Header