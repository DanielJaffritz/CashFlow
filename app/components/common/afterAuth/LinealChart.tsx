import { Line } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { collection, getAggregateFromServer, getDocs, getFirestore, orderBy, query, sum, where } from 'firebase/firestore'
import { useAuth } from '~/hooks/authContext'
import { useEffect, useState } from 'react'
import { getIncomesAndExpenses } from '~/utils/getChats'
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)


const LinealChart = () => {
  const db = getFirestore();
  const { user } = useAuth();
  const [data, setData] = useState<any[]>([]);

  const todo = async () => {
    if (!user?.uid) return;

    let q = query(
      collection(db, 'transactions'),
      orderBy('date', 'desc'),
      where('userID', '==', user!.uid),
      where('date', '>=', new Date(new Date().getFullYear(), new Date().getMonth(), 1)))
    const queryS = await getDocs(q);
    const dat = queryS.docs.map(doc => ({ date: doc.data().date, amount: doc.data().amount, type: doc.data().type }))
    console.log(dat)

    console.log(getIncomesAndExpenses(dat, new Date(2026, 2, 1, 0, 0, 0), new Date(2026, 2, 31, 23, 59, 59), 'daily'))
  }
  const dataValues = {
    datasets: [
      {
        label: 'Dataset',
        data: [1, 2, 3, 4, 5, 10, 7],
        backgroundColor: 'rgb(53,162, 235)',
        fill: false
      }
    ]
  }
  return (
    <section>
      <div>
        <button onClick={todo}> hola eb</button>
      </div>
    </section>
  )
}

export default LinealChart
