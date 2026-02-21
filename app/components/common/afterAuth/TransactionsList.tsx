import { collection, getDocs, getFirestore, query, where, orderBy, startAt, endAt, type DocumentData, limit, getCountFromServer, startAfter } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { categories } from '~/constants';
import { useAuth } from '~/hooks/authContext';

const TransactionsList = () => {
    const {user, loading: authloading} = useAuth();
    const db = getFirestore();
    const [search, setSearch] = useState('');
    const [date, setDate] = useState('All dates');
    const [category, setCategory] = useState(['']);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async (isNextPage = false) => {
        if(!user?.uid) return;
        setLoading(true);

        try {

            let q = query(
                collection(db, 'transactions'), 
                orderBy('date', 'desc'), 
                where('userID', '==', user.uid)
            );

            if(category.length !== 1) {
                q = query(q, where('category', 'in', category));
            }
            if(date !== 'All dates'){
                q = query(q, where('date', '>=', date));
            }
            if(search !== ''){
                q = query(q, where('description', '==', search));
            }
           
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));

            setTransactions(data);
        }catch(error){
            console.error('Error buscando', error);
            setLoading(false);
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        if(!authloading && user){
            const handler = setTimeout(() => {
                fetchData();
            }, 500);
            return () => clearTimeout(handler);
        }
    }, [category, search, date])
    

    const handleCheck = (index:string, event:any) => {
        if(event.target.checked) {
            setCategory([...category, index]);
        }else{
            setCategory(category.filter(item => item != index));
        }
    }
    const handleSearch = (event:React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearch(value);
    }
    const getDate = (actDate:any, format="yyyy-mm-dd") => {
            const v = format.replace('mm', actDate.getMonth() + 1).replace('dd', actDate.getDate()).replace('yyyy', actDate.getFullYear());
            setDate(v);
    }
    const getMonth = (actMonth:any, format="yyyy-mm") => {
        const v = format.replace('mm', actMonth.getMonth() + 1).replace('yyyy', actMonth.getFullYear());
        setDate(v);
    }
    const getYear = (actWeek:any, format='yyyy') => {
        const v = format.replace('yyyy', actWeek.getFullYear());
        setDate(v);
    }


  return (
    <div className='flex flex-col'>
      <div className='p-10 flex flex-row justify-between'>


        <div className='flex flex-row gap-5 p-1 rounded-md bg-[#f5efe6]'>
          <input type='radio' name='range' id='all' onChange={() => setDate('All dates')} defaultChecked/>
          <label htmlFor='all' className='rounded-md'>All dates</label>
          <input type='radio' name='range' id='today' onChange={() => getDate(new Date())}/>
          <label htmlFor='today' className='rounded-md' >Today</label>
          <input type="radio" name="range" id="year" onChange={() => getYear(new Date())}/>
          <label htmlFor="year" className='rounded-md'>This year</label>
          <input type="radio" name="range" id="month" onChange={() => getMonth(new Date())}/>
          <label htmlFor="month" className='rounded-md'>This month</label>
        </div>
        <div>
          <input type='text' onChange={handleSearch} placeholder='Search Transations...' className='bg-white p-3 rounded-md border border-[#f5efe6] outline-[#e8e1d5]'></input>
        </div>
      </div>
      
      <div> 
        {categories.map((category, i) => (
          <>
            <input type='checkbox' name='category' id={category} onChange={() => handleCheck(String(i), event)}/>
            <label htmlFor={category} className='rounded-3xl border border-[#f5efe6] m-5'>{category}</label>
          </>
        ))}
      </div>
      <div>
      </div>
        <div>
            {loading === true ? <h1>cargando</h1> :
            <div className="m-10 relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default rounded-2xl">
                <table className="w-full text-sm text-left rtl:text-right text-body bg-white">
                    <thead className=" text-body bg-neutral-secondary-soft border-b rounded-base border-default bg-bg-app">
                        <tr>
                            <th scope="col" className="text-general-text p-6 font-medium">
                                Date
                            </th>
                            <th scope="col" className="text-general-text font-medium">
                                Category
                            </th>
                            <th scope="col" className="text-general-text font-medium">
                                Description
                            </th>
                            <th scope="col" className="text-general-text font-medium">
                                Amount
                            </th>
                            <th scope="col" className="text-general-text font-medium">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                            {transactions.map((transaction:any) => (
                                <tr className='bg-neutral-primary border-b border-default' key={transaction.id}>
                                    <th scope='row' className='px-6 py-4 font-medium text-heading whitespace-nowrap'>
                                        {transaction.date}
                                    </th>
                                    <th className='px-6 py-4'>
                                        {categories[Number(transaction.category)]}
                                    </th>
                                    <th className='px-6 py-4 text-general-text'>
                                        {transaction.description}
                                    </th>
                                    <th className='px-6 py-4'>
                                        {transaction.type === "expense"? 
                                        <p className='text-red-500'>-${transaction.amount}</p>:
                                        <p className='text-green-400'>+${transaction.amount}</p>}
                                    </th>
                                    <th className='px-6 py-4'>
                                        <button></button>
                                    </th>
                                </tr>
                            ))}
                    </tbody>
                </table>
                
            </div>}
        </div>
    </div>
  )
}

export default TransactionsList