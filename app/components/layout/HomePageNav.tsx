import { Link } from 'react-router'

const HomePageNav = () => {
  return (
    <nav className='bg-white dark:bg-zinc-900 flex flex-row w-full justify-between shadow dark:border-b border-b-zinc-800'>
      <div className='flex flex-row items-center'>
        <img src='/favicon.png' width={50} height={5} />
        <p className='dark:text-white text-1xl md:text-2xl font-bold'>CashFlow</p>
      </div>
      <div className='hidden md:flex flex-row p-0 md:p-1 gap-2 md:gap-5 items-center'>
        <p className='dark:text-white hover:text-amber-400 transition-all cursor-pointer'>Features</p>
        <p className='dark:text-white hover:text-amber-400 transition-all cursor-pointer'>Pricing</p>
        <p className='dark:text-white hover:text-amber-400 transition-all cursor-pointer'>Forex</p>
        <p className='dark:text-white hover:text-amber-400 transition-all cursor-pointer'>About</p>
      </div>
      <div className='flex flex-row p-1 md:p-5 gap-2 md:gap-5 items-center'>
        <Link to='/SignIn' className='dark:text-white hover:text-amber-400 '>
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
