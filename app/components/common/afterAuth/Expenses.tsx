import { useEffect } from "react";
import { useAuth } from "~/hooks/authContext";
import { useBalanceStore } from "~/stores/useBalanceStore"


const Expenses = () => {
  const expense = useBalanceStore((state) => state.expense);
  const decrease = useBalanceStore((state) => state.decrease);
  const { user } = useAuth();

  useEffect(() => {
    const lastCleanup = localStorage.getItem('lastMonthlyCleanup');
    const thisMonth = new Date().getMonth().toString();
    if (lastCleanup !== thisMonth) {
      decrease(expense, user!.uid)
    }
    localStorage.setItem('lastMonthlyCleanup', thisMonth);

  }, [user])
  return (
    <div className="flex flex-col bg-white shadow p-2 md:p-5 rounded-2xl border border-general-text">
      <div className="flex flex-row items-center">
        <p className="text-zinc-600">Monthly Expenses</p>
        <img src="/assets/dollar.svg" width={30} />
      </div>
      <h1 className="font-bold text-3xl mt-2 md:mt-6">${expense}</h1>
    </div>
  )
}

export default Expenses
