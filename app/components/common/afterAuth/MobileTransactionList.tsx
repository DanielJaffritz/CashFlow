import { format } from "date-fns"
import type { transactionsProps } from "~/interfaces"

const MobileTransactionList = ({ transactions, setTransactions }: transactionsProps) => {
  return (
    <div className="p-5">
      {transactions.map((transaction: any) => (
        <div className="flex flex-row justify-between mb-5 border-b border-general-text dark:border-zinc-300">
          <div className="flex flex-col">
            <h1 className="font-semibold text-[20px] dark:text-white">{transaction.description}</h1>
            <p className="text-general-text text-[15px] dark:text-zinc-400">{format(transaction.date.toDate(), 'MMMM do, yyyy')}</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-col items-end">
              {transaction.type === 'income' ? <h1 className="text-[20px] font-semibold text-green-400">+{transaction.amount}$</h1>
                : <h1 className="text-[20px] font-semibold text-red-500">-{transaction.amount}$</h1>}
              <p className="text-[15px] dark:text-white">{transaction.category}</p>
            </div>
            <button className="rounded-md dark:bg-zinc-700">
              <img src="assets/delete.svg" width={20} />
            </button>
          </div>

        </div>
      ))}
    </div>

  )
}

export default MobileTransactionList
