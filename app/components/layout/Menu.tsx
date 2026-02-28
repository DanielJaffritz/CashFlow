import { Link } from "react-router"

const Menu = () => {
  return (
    <nav className="p-3 shadow h-full min-h-screen flex flex-col bg-white">
      <div className='mr-40 flex flex-row items-center'>
        <img src='/favicon.png' width={50} height={5} />
        <p className='text-2xl font-bold'>CashFlow</p>
      </div>
      <div className="flex grow flex-col gap-5 mt-5">
        <Link to='/dashboard' className="flex flex-row items-center gap-1 hover:bg-amber-400 rounded-2xl p-1">
          <img src="/assets/dashboard.svg" width={30} />
          <p>Dashboard</p>
        </Link>
        <Link to='/transactions' className="flex flex-row items-center gap-1 hover:bg-amber-400 rounded-2xl p-1">
          <img src="/assets/transactions.svg" width={30} />
          <p>Transactions</p>
        </Link>
        <Link to='/budgeting' className="flex flex-row items-center gap-1 hover:bg-amber-400 rounded-2xl p-1">
          <img src="/assets/budget_page.svg" width={30} />
          <p>Budgets</p>
        </Link>
      </div>
      <div className="flex flex-col align-bottom justify-baseline">
        <Link to='/settings' className="flex flex-row items-center gap-1 hover:bg-amber-400 rounded-2xl p-1">
          <img src="/assets/settings.svg" width={30} className="" />
          <p>Settings</p>
        </Link>
        <Link to='home' className="flex flex-row items-center gap-1 hover:bg-amber-400 text-red-500 rounded-2xl p-1">
          <img src="/assets/logout.svg" width={30} className='stroke-red-500' />
          <p>Log Out</p>
        </Link>
      </div>
    </nav>
  )
}

export default Menu
