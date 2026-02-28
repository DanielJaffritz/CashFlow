import { useAuth } from '~/hooks/authContext';
import { useState } from 'react';
import ExpenseDialog from '~/components/common/afterAuth/ExpenseDialog';
import IncomeDialog from '~/components/common/afterAuth/IncomeDialog';
import Expenses from '~/components/common/afterAuth/Expenses';
import Menu from '~/components/layout/Menu';
import TotalBalance from '~/components/common/afterAuth/TotalBalance';
import TransactionsList from '~/components/common/afterAuth/TransactionsList';

const Transactions = () => {
  const { user } = useAuth();
  const [openDialogIncome, setOpenDialogIncome] = useState(false);
  const [openDialogExpense, setOpenDialogExpense] = useState(false);

  return (
    <section className='flex flex-row h-screen overflow-hidden bg-bg-app w-full'>
      <aside>
        <Menu />
      </aside>

      <div className='flex-1 overflow-y-auto'>
        <div className='shadow p-7 w-full'>
          <div className=' flex flex-row items-center justify-between'>
            <div className=''>
              <h1 className='text-5xl font-semibold'>Transactions</h1>
              <p className='text-general-text'>Manage and track your financial activities</p>
            </div>
            <div className='flex flex-row gap-5 border-b border-zinc-200 pb-5'>
              <button onClick={() => setOpenDialogIncome(true)} className='border border-zinc-200 hover:bg-green-100 p-2 flex flex-row items-center rounded-md gap-x-2 cursor-pointer'>
                <img src='/assets/add.svg' width={30} className='' />
                Add Income
              </button>
              <button onClick={() => setOpenDialogExpense(true)} className='p-2 flex flex-row items-center rounded-md bg-amber-400 hover:bg-amber-500 gap-x-2 cursor-pointer'>
                <img src='/assets/minus.svg' width={30} />
                Add Expense
              </button>
            </div>
          </div>
          <div className='flex flex-row mt-2 w-full'>
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
