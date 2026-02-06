import { Link } from "react-router"

const Menu = () => {
  return (
    <nav className="p-2">
       <div className='flex flex-row items-center'>
          <img src='/favicon.png' width={50} height={5}/>
          <p className='text-2xl font-bold'>CashFlow</p>
        </div>
        <div>
          <Link to='/dashboard' className="flex flex-row items-center justify-center gap-1">
            <img src="/assets/dashboard.svg" width={40}/>
            <p className="font-semibold">Dashboard</p>
          </Link>
          <Link to='/transactions' className="flex flex-row items-center justify-center gap-1">
            <img src="/assets/dashboard.svg" width={40}/>
            <p className="font-semibold">Dashboard</p>
          </Link>
          <Link to='/budgeting' className="flex flex-row items-center justify-center gap-1">
            <img src="/assets/dashboard.svg" width={40}/>
            <p className="font-semibold">Dashboard</p>
          </Link>
        </div>
    </nav>
  )
}

export default Menu