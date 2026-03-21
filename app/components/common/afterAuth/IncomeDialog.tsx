import { type FormEvent } from "react";
import { useBalanceStore } from "~/stores/useBalanceStore";
import type { FormValue, DialogProps } from "~/interfaces";
import { categories } from "~/constants";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useAuth } from "~/hooks/authContext";


const IncomeDialog = ({ isOpen, setIsOpen }: DialogProps) => {
  const increase = useBalanceStore((state) => state.increase);
  const db = getFirestore();
  const { user } = useAuth();

  const handleSave = async (values: FormValue) => {
    try {
      await increase(values.amount, user!.uid);


      await addDoc(collection(db, "transactions"), {
        userID: user!.uid,
        amount: values.amount,
        category: values.category,
        date: values.date,
        description: values.description,
        type: 'income'
      })
      setIsOpen(false)
    } catch (error: any) {
      console.log(error)
    }

  }

  const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values: FormValue = {
      amount: Number(formData.get('amount')),
      category: formData.get('category') as string,
      date: new Date(String(formData.get('date'))),
      description: formData.get('description') as string,
    }
    handleSave(values);
  }
  if (!isOpen) return null;
  return (
    <dialog open closedby="any" onClose={() => setIsOpen(false)} className='transition-all flex flex-col w-full md:w-1/2 md:h-5/6 shadow-2xl rounded-2xl fixed top-[50%] left-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%] dark:bg-zinc-800'>
      <div className="shadow flex flex-row justify-between rounded-t-2xl p-6">
        <h1 className="text-2xl font-semibold dark:text-white">Add New Income</h1>
        <button onClick={() => setIsOpen(false)} className="cursor-pointer">
          <img src="assets/close.svg" width={25} />
        </button>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="text-zinc-600 mt-10 dark:text-zinc-400">Transaction Amount</p>
        <form onSubmit={HandleSubmit} className="flex flex-col justify-center items-center">
          <div className="flex flex-row p-10 md:p-5">
            <img src="assets/dollar.svg" width={40} />
            <input type="number" name="amount" id="amount" placeholder="0.00" step="0.01" min='0' max='99999' required className="w-full text-center text-4xl md:text-5xl outline-0 mr-10 text-zinc-600 dark:text-zinc-400"></input>
          </div>
          <div className="flex flex-row w-full justify-between px-5">
            <div className="flex flex-col w-35 md:w-full">
              <label>category</label>
              <select defaultValue='' id="category" name="category" required className=' outline-zinc-400 rounded-md p-3 mr-1 md:mr-5 dark:bg-zinc-700 dark:text-white border border-zinc-200 dark:border-transparent bg-bg-app'>
                <option value='' disabled>Select Category </option>
                {Array.from(categories.keys()).map((option, i) => (
                  <option value={option} key={i}>{option}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-35 md:w-full">
              <label>Date</label>
              <input id="date" name="date" type="date" required className="p-3 appearance-none outline-zinc-400 rounded-md border border-zinc-200 dark:border-transparent bg-bg-app dark:bg-zinc-700 dark:text-white"></input>
            </div>
          </div>
          <div className="w-full flex flex-col px-5">
            <p className="dark:text-white">Description</p>
            <textarea id='description' name="description" rows={4} maxLength={110} placeholder="Description of your income" required className="resize-none w-full dark:text-white outline-zinc-400 border border-zinc-200 bg-bg-app dark:bg-zinc-700 dark:border-transparent"></textarea>
          </div>
          <div className="flex flex-row justify-between p-5">
            <button className='outline outline-zinc-400 hover:bg-zinc-400 p-3 mr-5 rounded-md cursor-pointer dark:text-white' type="reset">Cancel</button>
            <button className="bg-amber-400 hover:bg-amber-500 w-full p-3 rounded-md cursor-pointer" type="submit">Save Income</button>
          </div>
        </form>
      </div>
    </dialog>
  )
}

export default IncomeDialog
