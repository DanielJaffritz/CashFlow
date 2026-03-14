import { useAuth } from '~/hooks/authContext';
import { Link } from 'react-router';
import LinealChart from '~/components/common/afterAuth/LinealChart';
import Menu from '~/components/layout/Menu';
import TotalBalance from '~/components/common/afterAuth/TotalBalance';
import PieChart from '~/components/common/afterAuth/PieChart';
import DashboardList from '~/components/common/afterAuth/DashboardList';
import { useForexStore } from '~/stores/useForexStore';

const dashboard = () => {
  const principal = useForexStore((state) => (state.principal))
  return (
    <section className='flex flex-col md:flex-row transition-all h-screen overflow-hidden bg-bg-app w-full'>
      <aside className='align-bottom'>
        <Menu />
      </aside>

      <div className='flex-1 overflow-y-auto md:w-full'>
        <div className='flex flex-col shadow p-5'>
          <h1 className='text-5xl font-semibold'>Dashboard</h1>
          <p className='text-general-text'>view all your financial activities in one place</p>
        </div>
        <div className='m-5 flex flex-row justify-between items-ceenter'>
          <TotalBalance />
          <div className='flex flex-row gap-10'>
            {Object.entries(principal).map(([key, value]: [string, any], i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-general-text items-center">
                <p className="text-general-text">{key}</p>
                <h2 className="text-3xl font-semibold mt-6">{value}</h2>
              </div>

            ))}
          </div>
        </div>
        <LinealChart />
        <div className='flex flex-row w-full justify-between'>
          <DashboardList />
          <PieChart />
        </div>
      </div>
    </section>
  )
}

export default dashboard

