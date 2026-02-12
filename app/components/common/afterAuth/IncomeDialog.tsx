import { useCallback, useState, type Dispatch, type FormEvent, type SetStateAction } from "react";
import FileUploader from "./FileUploader";
import { useBalanceStore } from "~/stores/useBalanceStore";

interface IncomeDialogProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}
interface balanceStore {
    balance:number
}
interface FormValue {
    amount:number;
    category:string;
    date:string;
    description:string;
    file: File | null | undefined;
}

const IncomeDialog = ({isOpen, setIsOpen}: IncomeDialogProps) => {
    const [file, setFile ] = useState<File | null>(null);
    const {balance} = useBalanceStore() as balanceStore;
    const increase = useBalanceStore((state:any) => state.increaseBalace)

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleSave = (values: FormValue) => {
        increase(values.amount)
    }

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const values:FormValue = {
            amount: Number(formData.get('amount')),
            category: formData.get('category') as string,
            date: formData.get('date') as string,
            description: formData.get('description') as string,
            file: file,
        }
        handleSave(values)
    }
    if(!isOpen) return null;
    return (
        <dialog open closedby="any" onClose={() => setIsOpen(false)} className='transition-all flex flex-col w-150 h-220 rounded-2xl fixed top-[50%] left-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%]'>
            <div className="shadow flex flex-row justify-between rounded-t-2xl p-6">
                <h1 className="text-2xl font-semibold">Add New Income</h1>
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
                        <textarea id='description' name="description" rows={4} maxLength={110} placeholder="Description of your income" className="resize-none w-full outline-zinc-400 border border-zinc-200 bg-bg-app"></textarea>
                    </div>
                    <div className="w-full px-10 py-2">
                        <p>Receipt attachment(opcional)</p>
                        <FileUploader onFileSelect={handleFileSelect}/>
                    </div>
                    <div className="flex flex-row justify-between p-5">
                        <button className='outline outline-zinc-400 mr-5 rounded-md cursor-pointer' type="reset">Cancel</button>
                        <button className="bg-amber-400 w-full py-3 rounded-md cursor-pointer" type="submit">Save Income</button>
                    </div>
                </form>
            </div> 
        </dialog>
    )
}

export default IncomeDialog