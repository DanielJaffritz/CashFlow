import { useBalanceStore } from "~/stores/useBalanceStore"


const Expenses = () => {
  const expense = useBalanceStore((state) => state.expense);
    return (
      <div className="flex flex-col bg-white shadow p-5 m-5 rounded-2xl items-baseline justify-baseline w-full">
          <div className="flex flex-row items-center">
              <p className="text-zinc-600">Monthly Expenses</p>
              <img src="/assets/dollar.svg" width={30}/>
          </div>
          <h1 className="font-bold text-3xl mt-6">${expense}</h1>
      </div>
    )
}

export default Expenses
