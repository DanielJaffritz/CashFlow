import { Link } from 'react-router'

const Hero = () => {
  return (
    <section className='w-full dark:bg-zinc-900'>
      <div className='flex flex-col md:flex-row gap-6 justify-between p-10 w-full'>
        <div className='flex flex-col items-baseline gap-3 w-full md:w-110'>
          <p className='text-amber-400 font-semibold text-xs md:text-2xl'>FINANCIAL INTELLIGENCE</p>
          <h1 className='dark:text-white text-3xl md:text-7xl font-bold'>Master your <span className='dark:text-amber-400'>wealth</span></h1>
          <p className='text-xs text-zinc-600 dark:text-zinc-400 font-semibold'>Take total control of your financial future with real-time tracking. automated budgeting, and global market insights</p>
          <Link to='/SignUp' className='bg-amber-400 rounded-md p-2.5 hover:text-amber-50 flex flex-row items-center'>
            Get Started
            <img src='/assets/arrow-right.svg' width={25} />
          </Link>
        </div>
        <div className='rounded-md w-full md:w-1/2 '>
          <img src='/assets/darkMode.png' className='shadow-2xl' />
        </div>
      </div>

      <div className='bg-zinc-200 dark:bg-[#0e0d24] rounded-2xl m-5 border border-general-text dark:border-transparent'>
        <div className='p-5 pt-15'>
          <h2 className='font-bold text-2xl dark:text-white'>Powerful Tools for Your Success</h2>
          <p className='text-zinc-600 dark:text-zinc-400'>Designed for professionals who demand precision in their financial life. Every feature is crafted to give you an edge</p>
        </div>
        <div className='p-5 pt-15 pb-20 flex flex-col md:flex-row gap-10'>
          <div className='bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-general-text dark:border-transparent'>
            <img src='/assets/bar-chart.svg' width={50} className='bg-amber-400 p-2 rounded-2xl' />
            <h3 className='font-semibold dark:text-white'>Income and expense Tracking</h3>
            <p className='dark:text-zinc-400'>Monitor every penny in real time with automated logging and categorization.</p>
          </div>
          <div className='bg-white dark:bg-zinc-900 rounded-2xl p-5 pb-10 border border-general-text dark:border-transparent'>
            <img src='/assets/budgeting.svg' width={50} className='bg-amber-400 rounded-2xl p-2' />
            <h3 className='font-semibold dark:text-white'>Smart Budgeting</h3>
            <p className='dark:text-zinc-400'>Set intelligent limits and receive proactive alerts to keep your savings on track.</p>
          </div>
          <div className='bg-white dark:bg-zinc-900 rounded-2xl p-5 pb-10 border border-general-text dark:border-transparent'>
            <img src='/assets/forex.svg' width={50} className='bg-amber-400 rounded-2xl p-2' />
            <h3 className='font-semibold dark:text-white'>Forex Overview</h3>
            <p className='dark:text-zinc-400'>Stay informed with market rates and currency fluctuations at a glance.</p>
          </div>
        </div>
      </div>

      <div className='bg-neutral-800 mt-10 m-5 p-10 rounded-2xl flex flex-col items-baseline border-general-text'>
        <h1 className='text-white text-4xl font-bold mr-70'>Ready to take control of your finances?</h1>
        <p className='text-general-text dark:text-zinc-400 mt-5 mr-0 md:mr-70'>Join over 10.000 users who are already using CashFlow to build their wealth and secure their financial freedom.</p>
        <Link to='SignUp' className='bg-amber-400 rounded-md p-2.5 hover:bg-amber-500 mt-5'>
          Start now
        </Link>
      </div>

    </section>
  )
}

export default Hero
