import LinealChart from '~/components/common/afterAuth/LinealChart';
import Menu from '~/components/layout/Menu';
import TotalBalance from '~/components/common/afterAuth/TotalBalance';
import PieChart from '~/components/common/afterAuth/PieChart';
import DashboardList from '~/components/common/afterAuth/DashboardList';
import { useForexStore } from '~/stores/useForexStore';

const dashboard = () => {
  const principal = useForexStore((state) => (state.principal))
  return (
    <section className='flex flex-col md:flex-row h-screen overflow-hidden bg-bg-app w-full dark:bg-zinc-900'>
      <aside>
        <Menu />
      </aside>

      <div className='flex-1 overflow-y-auto md:w-full'>
        <div className='flex flex-col shadow p-2 md:p-5'>
          <h1 className='text-3xl md:text-5xl font-semibold dark:text-white'>Dashboard</h1>
          <p className='text-general-text dark:text-zinc-400'>view all your financial activities in one place</p>
        </div>
        <div className='m-5 grid grid-cols-1 md:flex flex-row justify-between gap-5'>
          <TotalBalance />
          <div className='flex flex-row gap-5 md:gap-10'>
            {Object.entries(principal).map(([key, value]: [string, any], i) => (
              <div key={i} className="bg-white rounded-2xl p-2 md:p-5 border border-general-text items-center dark:bg-zinc-800 dark:border-transparent">
                <p className="text-general-text dark:text-zinc-500">{key}</p>
                <h2 className="text-3xl font-semibold mt-3 md:mt-6 dark:text-white">{value}</h2>
              </div>

            ))}
          </div>
        </div>
        <LinealChart />
        <div className='flex flex-col md:flex-row w-full justify-between'>
          <DashboardList />
          <PieChart />
        </div>
      </div>
    </section>
  )
}

export default dashboard

