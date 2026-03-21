import { useState } from 'react';
import ExpenseDialog from '~/components/common/afterAuth/ExpenseDialog';
import IncomeDialog from '~/components/common/afterAuth/IncomeDialog';
import Expenses from '~/components/common/afterAuth/Expenses';
import Menu from '~/components/layout/Menu';
import TotalBalance from '~/components/common/afterAuth/TotalBalance';
import TransactionsList from '~/components/common/afterAuth/TransactionsList';

const Transactions = () => {
  const [openDialogIncome, setOpenDialogIncome] = useState(false);
  const [openDialogExpense, setOpenDialogExpense] = useState(false);

  return (
    <section className='flex flex-col md:flex-row h-screen overflow-hidden bg-bg-app dark:bg-zinc-900 w-full'>
      <aside>
        <Menu />
      </aside>

      <div className='flex-1 overflow-y-auto md:w-full'>
        <div className='shadow p-4 md:p-7 w-full'>
          <div className=' flex flex-row items-center justify-between'>
            <div>
              <h1 className='text-3xl md:text-5xl font-semibold dark:text-white'>Transactions</h1>
              <p className='text-general-text dark:text-zinc-500'>Manage and track your financial activities</p>
            </div>
            <div className='flex flex-row gap-3 pb-5'>
              <button onClick={() => setOpenDialogIncome(true)} className='border border-zinc-200 dark:border-green-300 hover:bg-green-300 dark:text-white p-2 flex flex-col md:flex-row items-center rounded-md gap-x-2 cursor-pointer'>
                <img src='/assets/add.svg' width={30} className='' />
                Add Income
              </button>
              <button onClick={() => setOpenDialogExpense(true)} className='p-2 flex flex-col md:flex-row items-center rounded-md bg-amber-400 hover:bg-amber-500 gap-x-2 cursor-pointer'>
                <img src='/assets/minus.svg' width={30} />
                Add Expense
              </button>
            </div>
          </div>
          <div className='flex flex-row mt-2 w-full gap-10'>
            <TotalBalance />
            <Expenses />
          </div>
        </div>
        <TransactionsList />
      </div>
      <IncomeDialog isOpen={openDialogIncome} setIsOpen={setOpenDialogIncome} />
      <ExpenseDialog isOpen={openDialogExpense} setIsOpen={setOpenDialogExpense} />
    </section>
  )
}

export default Transactions
