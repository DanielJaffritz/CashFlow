import { format } from "date-fns";
import { collection, getDocs, getFirestore, limit, orderBy, query, where } from "firebase/firestore";
import { useMemo, useState } from "react";
import { Link } from "react-router"
import { categories } from "~/constants";
import { useAuth } from "~/hooks/authContext";

const DashboardList = () => {
  const { user } = useAuth();
  const db = getFirestore();
  const [transactions, setTransactions] = useState<any[]>([]);

  const fetchData = async () => {
    if (!user?.uid) return;
    let q = query(
      collection(db, 'transactions'),
      orderBy('date', 'desc'),
      where('userID', '==', user.uid),
      limit(5));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    setTransactions(data)
  }

  useMemo(() => fetchData(), [user])
  return (
    <div className="bg-white rounded-2xl md:w-full p-3 md:p-5 m-5 border border-general-text">
      <div className="border-b p-3 md:p-5 flex flex-row items-center justify-between">
        <h1 className="font-semibold text-2xl">Recent Transactions</h1>
        <Link to='/transactions' className="text-amber-400 hover:text-amber-600 font-semibold">
          View All
        </Link>
      </div>
      <div>
        <table className="w-full text-sm text-left rtl:text-right text-body bg-white from-amebr-400">
          <thead className="text-body bg-neutral-secondary-soft rounded-base boder-default">
            <tr key={'list'}>
              <th scope='col' className="text-general-text p-6 font-medium">
                Details
              </th>
              <th scope="col" className="text-general-text font-medium">
                Category
              </th>
              <th scope="col" className="text-general-text font-medium">
                Date
              </th>
              <th scope="col" className="text-general-text font-medium">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr>
                <th className="flex flex-row">

                  <img src={categories.get(transaction.category)} width={30} className="bg-amber-50 p-1 rounded-4xl" />
                  {transaction.description}
                </th>
                <th>
                  {transaction.category}
                </th>
                <th>
                  {format(transaction.date.toDate(), 'MMM d, yyyy')}
                </th>
                <th>
                  {transaction.type === 'income' ?
                    <p className="text-green-400">{transaction.amount}$</p>
                    : <p className="text-red-500">-{transaction.amount}$</p>}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DashboardList
