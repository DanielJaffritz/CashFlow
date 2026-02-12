import { useBalanceStore } from "~/stores/useBalanceStore"


const TotalBalance = () => {
  const balance = useBalanceStore((state) => state.balance);
  const increase = useBalanceStore((state) => state.increase);
    return (
      <div className="flex flex-col bg-white shadow p-5 m-5 rounded-2xl items-baseline justify-baseline">
          <div className="flex flex-row items-center">
              <p className="text-zinc-600">Total Balance</p>
              <img src="/assets/dollar.svg" width={30}/>
          </div>
          <h1 className="font-bold text-3xl mt-6">{balance}$</h1>
          <button onClick={() => increase(1)}>CLick</button>
      </div>
    )
  }


export default TotalBalance