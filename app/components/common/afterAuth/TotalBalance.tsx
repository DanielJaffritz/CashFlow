import { useBalanceStore } from "~/stores/useBalanceStore"


const TotalBalance = () => {
  const balance = useBalanceStore((state) => state.balance);
  return (
    <div className="flex flex-col bg-white shadow p-2 md:p-5 rounded-2xl border border-general-text">
      <div className="flex flex-row items-center">
        <p className="text-zinc-600">Total Balance</p>
        <img src="/assets/dollar.svg" width={30} />
      </div>
      <h1 className="font-bold text-3xl mt-2 md:mt-6">${balance}</h1>
    </div>
  )
}


export default TotalBalance
