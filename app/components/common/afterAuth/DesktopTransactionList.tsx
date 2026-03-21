import { format } from "date-fns"
import type { transactionsProps } from "~/interfaces"

const DesktopTransactionList = ({ transactions, setTransactions }: transactionsProps) => {
  return (
    <div className="m-5 md:m-10 relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default rounded-2xl">
      <table className="w-full text-sm text-left rtl:text-right text-body bg-white from-amber-400">
        <thead className=" text-body bg-neutral-secondary-soft border-b rounded-base border-default bg-bg-app dark:bg-zinc-700">
          <tr key={'list'}>
            <th scope="col" className="text-general-text p-2 md:p-6 font-medium dark:text-zinc-400">
              Date
            </th>
            <th scope="col" className="text-general-text font-medium dark:text-zinc-400">
              Category
            </th>
            <th scope="col" className="text-general-text font-medium dark:text-zinc-400">
              Description
            </th>
            <th scope="col" className="text-general-text font-medium dark:text-zinc-400">
              Amount
            </th>
            <th scope="col" className="text-general-text font-medium dark:text-zinc-400">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction: any) => (
            <tr className='bg-neutral-primary border-b border-default dark:bg-zinc-800' key={transaction.id}>
              <th scope='row' className='px-1 py-4 font-medium text-heading whitespace-nowrap dark:text-white'>
                {format(transaction.date.toDate(), 'MMMM do, yyyy')}
              </th>
              <th className='px-6 py-4 dark:text-white'>
                {transaction.category}
              </th>
              <th className='px-6 py-4'>
                <p className='text-general-text dark:text-zinc-400'>{transaction.description}</p>
              </th>
              <th className='px-6 py-4'>
                {transaction.type === "expense" ?
                  <p className='text-red-500'>-${transaction.amount}</p> :
                  <p className='text-green-400'>+${transaction.amount}</p>}
              </th>
              <th className='px-6 py-4'>
                <button className='cursor-pointer hover:bg-red-100 rounded-md dark:bg-zinc-700'><img src='assets/delete.svg' width={30} onClick={() => delete (transaction.id)} /></button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default DesktopTransactionList
