import { useState } from "react"

const Expenses = () => {
  return (
    <div className="flex flex-col bg-white shadow p-5 m-5 rounded-2xl items-baseline justify-baseline">
        <div className="flex flex-row items-center">
            <p className="text-zinc-600">Monthly Expenses</p>
            <img src="/assets/dollar.svg" width={30}/>
        </div>
        <h1 className="font-bold text-3xl mt-6">10000$</h1>
        <p className="text-zinc-600"><span className="text-green-500"> +2.4 more</span> from last month</p>

    </div>
  )
}

export default Expenses