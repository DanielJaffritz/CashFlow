import { differenceInDays } from "date-fns";
import { collection, getFirestore, query, where, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import BudgetDialog from "~/components/common/afterAuth/BudgetDialog";
import Menu from "~/components/layout/Menu"
import { categories } from "~/constants";
import { useAuth } from "~/hooks/authContext"
import { clsx } from 'clsx'

const Budgeting = () => {
  const { user } = useAuth();
  const [openDialogBudget, setOpenDialogBudget] = useState(false);
  const [budgets, setBudgets] = useState<any[]>([]);
  const db = getFirestore();
  const [loading, setLoading] = useState(true);

  const deleteBudget = async (category: string) => {
    await deleteDoc(doc(db, 'budgets', user!.uid + category))
  }
  const getStatus = (spent: number, limit: number) => {
    return spent > limit
  }

  useEffect(() => {
    if (!user?.uid) return;

    const q = query(collection(db, 'budgets'), where('userID', '==', user!.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      try {


        const data: any = [];
        querySnapshot.forEach((doc) => { data.push({ id: doc.id, ...doc.data() }) });
        setBudgets(data);
        setLoading(false)
      } catch (error) {
        console.error()
        setLoading(false)
      }
    })
    return () => unsubscribe();

  }, [user])


  return (
    <section className="flex flex-col md:flex-row h-screen overflow-hidden w-full">
      <aside className="border-e border-zinc-100 dark:border-zinc-900">
        <Menu />
      </aside>


      <div className="flex-1 overflow-y-auto w-full bg-bg-app dark:bg-zinc-900">
        <div className="flex shadow p-7 w-full flex-row items-center justify-between bg-bg-app dark:bg-zinc-900">
          <div>
            <h1 className="text-3xl md:text-5xl font-semibold dark:text-white">Monthly Budget Overview</h1>
            <p className="text-general-text dark:text-zinc-500">Control all your financial activites</p>
          </div>
          <div>
            <button onClick={() => setOpenDialogBudget(true)} className="flex flex-row items-center bg-amber-400 hover:bg-amber-500 rounded-md p-1 md:p-3 cursor-pointer">
              <img src="assets/plus.svg" width={30} />
              Create New Budget
            </button>
          </div>
        </div>
        {budgets.length === 0 && !loading ? <div className="flex flex-col items-center justify-center mt-20 gap-5">
          <h2 className="text-2xl text-zinc-600 dark:text-zinc-400">No budgets yet</h2>
          <button onClick={() => setOpenDialogBudget(true)} className="bg-amber-400 hover:bg-amber-500 rounded-md p-2 cursor-pointer">Create Budget</button>
        </div> :
          <div className="flex flex-row">
            <div className="grid grid-cols-2 p-5 md:p-10 w-full md:w-4/5 gap-5">
              {budgets.map((element: any) => (
                <div className={clsx('flex flex-col bg-white rounded-2xl p-2 md:p-4 dark:bg-zinc-800', getStatus(element.actual, element.objective)
                  ? 'border-2 border-red-300' : 'border border-general-text dark:border-transparent')}>

                  <div className="flex flex-row justify-between">
                    <div className="flex flex-row items-center">
                      <img src={categories.get(element.category)} width={40} className={clsx('rounded-2xl p-1', getStatus(element.actual, element.objective)
                        ? 'bg-red-50' : 'bg-zinc-200 dark:bg-zinc-700')} />
                      <h2 className="text-2xs md:text-2xl font-semibold dark:text-white">{element.category}</h2>
                    </div>
                    <p className={clsx('rounded-3xl p-1 md:p-2 dark:text-zinc-400', getStatus(element.actual, element.objective)
                      ? 'bg-red-50 text-red-400' : 'bg-zinc-200 dark:bg-zinc-700')}>{Math.round(element.actual / element.objective * 100)} %</p>
                  </div>
                  <div className="mt-3">
                    <div className="flex flex-row justify-between">
                      <p className="text-general-text dark:text-zinc-400">${element.actual} spent</p>
                      {getStatus(element.actual, element.objective) ? <p className='text-red-400'>OVER BUDGET</p> : <p className="dark:text-white">{element.objective}</p>}
                    </div>
                    <progress value={element.actual / element.objective * 100} max='100' className={clsx("rounded-md mt-5 md:mt-10 border w-full bg-gray-50 [&::-webkit-progress-bar]:bg-gray-200 [&::-webkit-progress-value]:rounded-md [&::-webkit-progress-bar]:rounded-md [&::-webkit-progress-value]:bg-amber-400 border-gray-200",
                      getStatus(element.actual, element.objective) ? '[&::-webkit-progress-value]:bg-red-400' : '[&::-webkit-progress-value]:bg-amber-400 ')}></progress>
                  </div>
                  <div className="flex flex-row justify-between mt-5 md:mt-10">
                    {new Date() === element.finishAt ? <p>completed</p> :
                      <p className="dark:text-white">{differenceInDays(
                        element.finishAt?.toDate ? element.finishAt.toDate() : new Date(element.finishAt),
                        element.createdAt?.toDate ? element.createdAt.toDate() : new Date(element.createdAt))} days left
                      </p>}
                    <p className={clsx('', getStatus(element.actual, element.objective) ? 'text-red-400' : 'text-amber-400')}>${element.objective - element.actual} left</p>
                  </div>
                  <button className="mt-2 cursor-pointer" onClick={() => deleteBudget(element.category)}><img src="assets/delete.svg" width={30} /></button>
                </div>
              ))}
            </div>
          </div>}
      </div>
      <BudgetDialog isOpen={openDialogBudget} setIsOpen={setOpenDialogBudget} />
    </section>
  )
}

export default Budgeting
