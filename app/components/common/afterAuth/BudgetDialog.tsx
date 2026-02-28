import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore"
import { useEffect, useState, type FormEvent } from "react";
import { categories, dates } from "~/constants";
import { useAuth } from "~/hooks/authContext";
import type { BudgetFormValue, DialogProps } from "~/interfaces"
import { addDays } from 'date-fns'

const BudgetDialog = ({ isOpen, setIsOpen }: DialogProps) => {
  const db = getFirestore();
  const { user } = useAuth();

  const handleSave = async (values: BudgetFormValue) => {
    try {
      await setDoc(doc(db, 'budgets', user!.uid + values.category), {
        objective: values.amount,
        actual: 0,
        category: values.category,
        createdAt: new Date(),
        finishAt: values.date,
        userID: user!.uid
      })
      let q = query(
        collection(db, 'budgets'),
        where('userID', '==', user!.uid));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(data)
      setIsOpen(false)
    } catch (error: any) {
      console.log(error)
    }

  }
  const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values: BudgetFormValue = {
      amount: Number(formData.get('amount')),
      category: formData.get('category') as string,
      date: addDays(new Date(), Number(formData.get('duration')))

    }
    handleSave(values);
  }

  if (!isOpen) return null;
  return (
    <dialog open closedby="any" onClose={() => setIsOpen(false)} className='transition-all flex flex-col w-150 h-150 rounded-2xl fixed top-[50%] left-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%]'>
      <div className="shadow flex flex-row justify-between rounded-t-2xl p-6">
        <h1 className="text-2xl font-semibold">Create a new budget</h1>
        <button onClick={() => setIsOpen(false)} className="cursor-pointer">
          <img src="./assets/close.svg" width={25} />
        </button>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="text-zinc-600 mt-10">Budget Limit</p>
        <form onSubmit={HandleSubmit} className="flex flex-col justify-center items-center">
          <div className="flex flex-row items-center justify-center p-5">
            <img src="assets/dollar.svg" width={40} />
            <input type="number" name="amount" id="amount" placeholder="0.00" step="0.01" min='0' max='99999' required className="w-full text-center text-6xl outline-0 mr-10 text-zinc-600"></input>
          </div>
          <div className="flex flex-row justify-between p-10 w-full">
            <div className="flex flex-col w-full">
              <label>category</label>
              <select defaultValue='' id="category" name="category" required className=' outline-zinc-400 rounded-md p-3 mr-4 border border-zinc-200 bg-bg-app cursor-pointer'>
                <option value='' disabled>Select Category </option>
                {Array.from(categories).map(([key, value], i) => (
                  <option value={key} key={i}>{key}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label>Date limit</label>
              <select defaultValue='' id="duration" name="duration" required className=' outline-zinc-400 rounded-md p-3 mr-4 border border-zinc-200 bg-bg-app cursor-pointer' >
                <option value='' disabled>Select duration</option>
                {Array.from(dates).map(([key, value], i) => (
                  <option value={value} key={i}>{key}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-row justify-between p-5 w-full">
            <button className='outline outline-zinc-400 mr-5 rounded-md cursor-pointer' type="reset">Cancel</button>
            <button className="bg-amber-400 w-full py-3 rounded-md cursor-pointer" type="submit">Save budget</button>
          </div>
          <p className="justify-center items-center">creating a new budget will erase the previous one!</p>
        </form>
      </div>
    </dialog>
  )
}

export default BudgetDialog
