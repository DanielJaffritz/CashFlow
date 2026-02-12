import React from 'react'
import { Link } from 'react-router'

const HomePageNav = () => {
  return (
    <header>
        <nav className='flex flex-row justify-between shadow'>
            <div className='flex flex-row items-center'>
                <img src='/favicon.png' width={50} height={5}/>
                <p className='text-2xl font-bold'>CashFlow</p>
            </div>
            <div className='flex flex-row p-1 gap-5 items-center'>
                <p className='hover:text-amber-400 transition-all cursor-pointer'>Features</p>
                <p className='hover:text-amber-400 transition-all cursor-pointer'>Pricing</p>
                <p className='hover:text-amber-400 transition-all cursor-pointer'>Forex</p>
                <p className='hover:text-amber-400 transition-all cursor-pointer'>About</p>
            </div>
            <div className='flex flex-row p-5 gap-5 items-center'>
                <Link to='/SignIn' className='hover:text-amber-400 '>
                    Sign in
                </Link>
                <Link to='/SignUp' className='bg-amber-400 p-2 pr-2.5 pl-2.5 rounded-md hover:text-amber-50'>
                    Join CashFlow
                </Link>
            </div>
        </nav>
    </header>

  )
}

export default HomePageNav