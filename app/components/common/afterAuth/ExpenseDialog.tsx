import React, { type Dispatch, type SetStateAction } from 'react'
import FileUploader from './FileUploader';
interface ExpenseDialogProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ExpenseDialog = ({isOpen, setIsOpen}: ExpenseDialogProps) => {
    const HandleSubmit = () => {
        //
    }
    if(!isOpen) return null;
    return (
        <dialog open closedby="any" onClose={() => setIsOpen(false)} className='transition-all flex flex-col w-150 h-220 rounded-2xl fixed top-[50%] left-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%]'>
            <div className="shadow flex flex-row justify-between rounded-t-2xl p-6">
                <h1 className="text-2xl font-semibold">Add New Expense</h1>
                <button onClick={() => setIsOpen(false)} className="cursor-pointer">
                    <img src="assets/close.svg" width={25}/>
                </button>
            </div>
            <div className="flex flex-col items-center justify-center">
                <p className="text-zinc-600 mt-10">Transaction Amount</p>
                <form>
                    <div className="flex flex-row items-center justify-center p-5">
                        <img src="assets/dollar.svg" width={40}/>
                        <input type="number" name="amount" id="amount" placeholder="0.00" step="0.01" min='0' max='99999' className="w-full text-center text-6xl outline-0 mr-10 text-zinc-600"></input>
                    </div>
                    <div className="flex flex-row justify-between p-10 w-full">
                        <div className="flex flex-col w-full">
                            <label>category</label>
                            <select id="category" name="category" className=' outline-zinc-400 rounded-md p-3 mr-4 border border-zinc-200 bg-bg-app'>
                                <option value='' disabled selected>Select Category </option>
                                <option value='1'>emergencies</option>
                            </select>
                        </div>
                        <div className="flex flex-col w-full">
                            <label>Date</label>
                            <input id="date" name="date" type="date" className="p-3 mr-4 appearance-none outline-zinc-400 rounded-md border border-zinc-200 bg-bg-app"></input>
                        </div>
                    </div>
                    <div className="w-full px-10">
                        <p>Description</p>
                        <textarea id='description' name="description" rows={4} maxLength={110} placeholder="Description of your expense" className="resize-none w-full outline-zinc-400 border border-zinc-200 bg-bg-app"></textarea>
                    </div>
                    <div className="w-full px-10 py-2">
                        <p>Receipt attachment(opcional)</p>
                        <FileUploader />
                    </div>
                    <div className="flex flex-row justify-between p-5">
                        <button className='outline outline-zinc-400 mr-5 rounded-md cursor-pointer' type="reset">Cancel</button>
                        <button className="bg-amber-400 w-full py-3 rounded-md cursor-pointer" type="submit" onClick={HandleSubmit}>Save Expense</button>
                    </div>
                </form>
            </div> 
        </dialog>
  )
}

export default ExpenseDialog