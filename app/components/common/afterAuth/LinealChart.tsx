import { Line } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { collection, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore'
import { useAuth } from '~/hooks/authContext'
import { useMemo, useState } from 'react'
import { getIncomesAndExpenses } from '~/utils/getCharts'
import { endOfMonth, endOfYear, startOfMonth, startOfYear, subMonths, subYears } from 'date-fns'
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)


const LinealChart = () => {
  const db = getFirestore();
  const { user } = useAuth();
  const [data, setData] = useState<{ labels: string[], income: any[], expense: any[] }>({ labels: [], income: [], expense: [] });
  const [netGrowth, setNetGrowth] = useState<number>(1)

  const queryResult = async (StartOfLastPeriod: Date, startDate: Date, endDate: Date, type: string) => {
    if (!user?.uid) return;

    let q = query(
      collection(db, 'transactions'),
      orderBy('date', 'desc'),
      where('userID', '==', user.uid),
      where('date', '>=', startDate),
      where('date', '<=', endDate))
    const querySnapshot = await getDocs(q);
    const queryData = querySnapshot.docs.map(doc => ({ date: doc.data().date, amount: doc.data().amount, type: doc.data().type }))
    const actualNetIncome = queryData.reduce((a, b) => a + (b.type === 'income' ? b.amount : -b.amount), 0)

    setData(getIncomesAndExpenses(queryData, startDate, endDate, type))
    let sum = query(collection(db, 'transactions'),
      orderBy('date', 'desc'),
      where('userID', '==', user.uid),
      where('date', '>=', StartOfLastPeriod),
      where('date', '<', startDate))
    const oldPeriodQuerySnapshot = await getDocs(sum);
    const dataSum = oldPeriodQuerySnapshot.docs.map(doc => ({ amount: doc.data().amount, type: doc.data().type }))
    const oldNetIncome = dataSum.reduce((a, b) => a + (b.type === 'income' ? b.amount : -b.amount), 0);
    setNetGrowth((actualNetIncome - oldNetIncome) / oldNetIncome)
  }
  const dataValues = {
    labels: data.labels,
    datasets: [
      {
        label: 'Incomes',
        data: data.income,
        backgroundColor: 'rgba(239, 198, 79, 0.1)',
        borderColor: 'rgb(239, 198, 79)',
        fill: 'origin'
      },
      {
        label: 'Expenses',
        data: data.expense,
        backgroundColor: 'rgb(53,162, 235)',
        fill: false,
        borderDash: [5, 5]
      },
    ]
  }
  const options = {
    scales: {
      x: {
        grid: {
          display: false
        },
      },
      y: {
        grid: {
          display: false
        },
      },
    },
  }
  useMemo(() => queryResult(startOfMonth(subMonths(new Date(), 1)), startOfMonth(new Date()), endOfMonth(new Date()), 'daily'), [user])


  return (
    <div className='bg-white rounded-2xl m-5 p-5 border border-general-text'>
      <div className='flex flex-row justify-between'>
        <div>
          <h1 className='text-2xl font-semibold'>Cash Flow: Income vs Expense</h1>
          <p className='text-general-text'>comparison of your inflows and outflows</p>
        </div>
        <div className='flex flex-col md:flex-row gap-2 p-1 rounded-md bg-[#f5efe6]'>
          <input type='radio' name='range' id='daily' defaultChecked onChange={() => queryResult(startOfMonth(subMonths(new Date(), 1)), startOfMonth(new Date()), endOfMonth(new Date()), 'daily')} />
          <label htmlFor='daily'>Daily</label>
          <input type='radio' name='range' id='monthly' onChange={() => queryResult(startOfYear(subYears(new Date, 1)), startOfYear(new Date()), endOfYear(new Date()), 'monthly')} />
          <label htmlFor='monthly'>Monthly</label>
        </div>
      </div>
      <div>
        <p className='text-general-text mt-2 md:mt-5'>NET GROWTH</p>
        <h1 className='text-3xl font-semibold'>{netGrowth.toFixed(2)}$</h1>
        <Line options={options} data={dataValues}>
        </Line>
      </div>
    </div>
  )
}

export default LinealChart
