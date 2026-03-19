import { collection, getDocs, getFirestore, query, where, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import { categories } from '~/constants';
import { useAuth } from '~/hooks/authContext';
import DesktopTransactionList from './DesktopTransactionList';
import MobileTransactionList from './MobileTransactionList';

const TransactionsList = () => {
  const { user, loading: authloading } = useAuth();
  const db = getFirestore();
  const [search, setSearch] = useState('');
  const [date, setDate] = useState<string | Date>('All dates');
  const [category, setCategory] = useState(['']);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  const fetchData = async () => {
    if (!user?.uid) return;
    setLoading(true);

    try {

      let q = query(
        collection(db, 'transactions'),
        orderBy('date', 'desc'),
        where('userID', '==', user.uid)
      );

      if (category.length !== 1) {
        q = query(q, where('category', 'in', category));
      }
      if (date !== 'All dates') {
        q = query(q, where('date', '>=', date));
      }
      if (search !== '') {
        q = query(q, where('description', '==', search));
      }

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setTransactions(data);
    } catch (error) {
      console.error('Error buscando', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const deleteTransaction = async (transactionID: string) => {
    console.log(transactionID)
    await deleteDoc(doc(db, 'transactions', transactionID))

  }

  useEffect(() => {
    if (!authloading && user) {
      const handler = setTimeout(() => {
        fetchData();
      }, 500);
      return () => clearTimeout(handler);
    }
  }, [category, search, date, user])


  const handleCheck = (NewCategory: string, event: any) => {
    if (event.target.checked) {
      setCategory([...category, NewCategory]);
    } else {
      setCategory(category.filter(item => item != NewCategory));
    }
  }
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
  }
  return (
    <div className='flex flex-col'>
      <div className='p-5 md:p-10 flex flex-col md:flex-row justify-between gap-2'>


        <div className='flex flex-row gap-3 md:gap-5 p-1 rounded-md bg-[#f5efe6]'>
          <input type='radio' name='range' id='all' onChange={() => setDate('All dates')} defaultChecked />
          <label htmlFor='all' className='rounded-md'>All dates</label>
          <input type='radio' name='range' id='today' onChange={() => setDate(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0))} />
          <label htmlFor='today' className='rounded-md' >Today</label>
          <input type="radio" name="range" id="month" onChange={() => setDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1))} />
          <label htmlFor="month" className='rounded-md'>This month</label>
          <input type="radio" name="range" id="year" onChange={() => setDate(new Date(new Date().getFullYear(), 0, 1, 0, 0, 0))} />
          <label htmlFor="year" className='rounded-md'>This year</label>
        </div>
        <div>
          <input type='text' onChange={handleSearch} placeholder='Search Transations...' className='bg-white p-2  md:p-3 rounded-md border border-[#f5efe6] outline-[#e8e1d5]'></input>
        </div>
      </div>

      <div className='grid grid-cols-2 md:flex flex-row m-5'>
        {Array.from(categories.keys()).map((category) => (
          <>
            <input type='checkbox' name='category' id={category} onChange={() => handleCheck(category, event)} />
            <label htmlFor={category} className='rounded-3xl border border-[#f5efe6] m-1'>{category}</label>
          </>
        ))}
      </div>
      <div>
      </div>
      <div>
        {isMobile ? <MobileTransactionList transactions={transactions} setTransactions={setTransactions} delete={deleteTransaction} /> :
          <DesktopTransactionList transactions={transactions} setTransactions={setTransactions} delete={deleteTransaction} />}
      </div>
    </div>
  )
}

export default TransactionsList
