import { Line } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { collection, getAggregateFromServer, getDocs, getFirestore, orderBy, query, sum, where } from 'firebase/firestore'
import { useAuth } from '~/hooks/authContext'
import { useEffect, useState } from 'react'
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)


const LinealChart = () => {
  const db = getFirestore();
  const { user } = useAuth();
  const [data, setData] = useState<any[]>([]);

  const fetchData = async () => {
    if (!user?.uid) return;
    let q = query(
      collection(db, 'transactions'),
      orderBy('date', 'desc'),
      where('userID', '==', user!.uid))
    q = query(q, where('date', '>=', new Date(new Date().getFullYear(), new Date().getMonth(), 1, 0, 0, 0)))
    const querySnapshot = await getAggregateFromServer(q, { totalIncomes: sum('amount') });
    console.log(querySnapshot.data().totalIncomes)
    setData(prev => [...prev, [new Date().getMonth(), querySnapshot.data().totalIncomes]])

  }
  useEffect(() => {
    fetchData();
  }, [user])
  const labels = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august']
  const dataValues = {
    labels,
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

        {data.map((month) => (
          <div>{month[0]}</div>
        ))}
      </div>
      <Line
        data={dataValues}
        redraw={true} />


    </section>
  )
}

export default LinealChart
