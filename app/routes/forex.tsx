import { useEffect, useState } from "react"
import Menu from "~/components/layout/Menu"
import { useForexStore } from "~/stores/useForexStore";

const forex = () => {
  const fetchData = useForexStore((state) => state.fetchData)
  const data = useForexStore((state) => state.data)
  const principal = useForexStore((state) => state.principal)

  useEffect(() => {
    const lastCleanup = localStorage.getItem('lastCleanup');
    const today = new Date().toLocaleDateString();
    if (lastCleanup !== today) {
      localStorage.removeItem('user-storage');
    }
    localStorage.setItem('lastCleanup', today);
    fetchData()
  }, [])
  return (
    <section className='flex flex-col md:flex-row transition-all h-screen overflow-hidden bg-bg-app w-full'>
      <aside className="align-bottom">
        <Menu />
      </aside>
      <div className='flex-1 overflow-y-auto w-full' >
        <div className='flex flex-col shadow p-5'>
          <h1 className="font-semibold text-5xl">Forex Overview</h1>
          <p className="text-general-text">Stay informed about markets</p>
        </div >
        <div className="flex flex-row m-5 gap-10">
          {Object.entries(principal).map(([key, value]: [string, any], i) => (
            <div key={i} className="bg-white rounded-2xl p-3 border border-general-text">
              <p className="text-general-text">{key}</p>
              <h2 className="text-3xl font-semibold">{value}</h2>
            </div>

          ))}
        </div>
        <div className=" flex flex-col m-5 rounded-2xl bg-white border border-general-text p-10">
          <h1>All Markets</h1>
          <ul className="w-full mt-5 flex flex-col items-center">
            {Object.entries(data).map(([key, value]: [string, any], i) => (
              <li key={i} className="flex flex-row font-semibold mb-10 w-full justify-between border-b border-general-text">
                <p>USD/{key}</p>
                <p className="text-amber-400">{value}</p>
              </li>
            ))}
          </ul>
        </div>
      </div >

    </section>
  )
}

export default forex
