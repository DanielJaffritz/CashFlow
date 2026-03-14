import { Link } from "react-router"

const Menu = () => {
  return (
    <nav className="p-1 md:p-3 shadow h-full flex flex-row md:flex-col bg-white alignItems: 'center',">
      <div className='md:mr-20 flex-row items-center hidden md:flex'>
        <img src='/favicon.png' width={50} height={5} />
        <p className='text-2xl font-bold'>CashFlow</p>
      </div>
      <div className="flex grow flex-row md:flex-col gap-5 mt-5">
        <Link to='/dashboard' className="flex flex-col md:flex-row items-center gap-1 hover:bg-amber-400 rounded-2xl p-1">
          <img src="/assets/dashboard.svg" width={30} />
          <p>Dashboard</p>
        </Link>
        <Link to='/transactions' className="flex flex-col md:flex-row items-center gap-1 hover:bg-amber-400 rounded-2xl p-1">
          <img src="/assets/transactions.svg" width={30} />
          <p>Transactions</p>
        </Link>
        <Link to='/budgeting' className="flex flex-col md:flex-row items-center gap-1 hover:bg-amber-400 rounded-2xl p-1">
          <img src="/assets/budget_page.svg" width={30} />
          <p>Budgets</p>
        </Link>
        <Link to='/forex' className="flex flex-col md:flex-row items-center gap-1 hover:bg-amber-400 rounded-2xl p-1">
          <img src="/assets/forex.svg" width={30} />
          <p>Forex</p>
        </Link>
      </div>
      <div className="flex flex-row md:flex-col align md:align-bottom md:justify-baseline">
        <Link to='/settings' className="flex flex-col md:flex-row items-center gap-1 hover:bg-amber-400 rounded-2xl p-1">
          <img src="/assets/settings.svg" width={30} className="" />
          <p>Settings</p>
        </Link>
        <Link to='/home' className="flex flex-col md:flex-row items-center gap-1 hover:bg-amber-400 text-red-500 rounded-2xl p-1">
          <img src="/assets/logout.svg" width={30} className='stroke-red-500' />
          <p>Log Out</p>
        </Link>
      </div>
    </nav>
  )
}

export default Menu
