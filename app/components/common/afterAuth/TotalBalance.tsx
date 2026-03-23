import { useBalanceStore } from "~/stores/useBalanceStore"


const TotalBalance = () => {
  const balance = useBalanceStore((state) => state.balance); //gets user's total balance
  return (
    <div className="flex flex-col bg-white shadow p-2 md:p-5 rounded-2xl border border-general-text dark:bg-zinc-800 dark:border-transparent">
      <div className="flex flex-row items-center">
        < p className="text-zinc-600 dark:text-zinc-500" > Total Balance</p >
        <img src="/assets/dollar.svg" width={30} />
      </div >
      <h1 className="font-bold text-3xl mt-2 md:mt-6 dark:text-white">${balance}</h1>
    </div >
  )
}


export default TotalBalance
