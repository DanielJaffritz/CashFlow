import { useAuth } from '~/hooks/authContext';
import { Link } from 'react-router';
import LinealChart from '~/components/common/afterAuth/LinealChart';
import Menu from '~/components/layout/Menu';
import TotalBalance from '~/components/common/afterAuth/TotalBalance';

const dashboard = () => {
  const { user } = useAuth();
  return (
    <div>
      <section className='flex flex-row bg-bg-app'>
        <Menu />
        <div className='flex flex-col w-full'>
          <div className='flex flex-row'>
            <TotalBalance />
            <div className=' bg-white shadow p-5 m-5 rounded-2xl w-full'>
              <div className="flex flex-row items-center">
                <p className="text-zinc-600">Expenses limit</p>
                <img src="/assets/budget.svg" width={30} />
              </div>
              <progress className='w-full mt-5 bg-gray-50 rounded-full h-5 [&::-webkit-progress-bar]:bg-gray-200 [&::-webkit-progress-value]:bg-amber-400' value={75} max={100}>75% </progress>
            </div>
          </div>
          <LinealChart />
          <h1>welcome {user?.username}</h1>
        </div>
      </section>
    </div>
  )
}

export default dashboard

