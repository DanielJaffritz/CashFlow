import { Link } from 'react-router'

const HomePageNav = () => {
  return (
    <nav className='flex flex-row w-full justify-between shadow'>
      <div className='flex flex-row items-center'>
        <img src='/favicon.png' width={50} height={5} />
        <p className='text-1xl md:text-2xl font-bold'>CashFlow</p>
      </div>
      <div className='hidden md:flex flex-row p-0 md:p-1 gap-2 md:gap-5 items-center'>
        <p className='hover:text-amber-400 transition-all cursor-pointer'>Features</p>
        <p className='hover:text-amber-400 transition-all cursor-pointer'>Pricing</p>
        <p className='hover:text-amber-400 transition-all cursor-pointer'>Forex</p>
        <p className='hover:text-amber-400 transition-all cursor-pointer'>About</p>
      </div>
      <div className='flex flex-row p-1 md:p-5 gap-2 md:gap-5 items-center'>
        <Link to='/SignIn' className='hover:text-amber-400 '>
          Sign in
        </Link>
        <Link to='/SignUp' className='bg-amber-400 p-1 md:p-2 pr-1 md:pr-2.5 pl-1 md:pl-2.5 rounded-md hover:bg-amber-500'>
          Join CashFlow
        </Link>
      </div>
    </nav>

  )
}

export default HomePageNav
