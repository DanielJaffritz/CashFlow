import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { endOfMonth, startOfMonth } from "date-fns";
import { collection, getDocs, getFirestore, orderBy, query, where } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { useAuth } from "~/hooks/authContext"
import { getExpensesBreakdown } from "~/utils/getCharts";
Chart.register(ArcElement, Tooltip, Legend)


const PieChart = () => {
  const { user } = useAuth();
  const db = getFirestore();
  const [data, setData] = useState<{}>({});
  const queryData = async () => {
    if (!user?.uid) return;
    let q = query(
      collection(db, 'transactions'),
      orderBy('date', 'desc'),
      where("userID", "==", user.uid),
      where('date', '>=', startOfMonth(new Date())),
      where('date', '<=', endOfMonth(new Date())),
      where('type', '==', 'expense'))

    const querySnapshot = await getDocs(q);
    const dataQuery = querySnapshot.docs.map(doc => ({ amount: doc.data().amount, category: doc.data().category }))
    setData(getExpensesBreakdown(dataQuery))
  }
  const dataValues = {
    labels: Object.keys(data),
    datasets: [{
      label: 'Expenses Breakdown',
      data: Object.values(data),
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 206, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
        'rgb(255, 159, 64)',
        'rgb(100, 50, 255)'
      ],
    }]
  }
  useMemo(() => queryData(), [user])
  return (
    <div className="bg-white rounded-2xl p-5 m-5 md:w-1/2 border border-general-text dark:bg-zinc-800 dark:border-transparent">
      <h1 className="font-semibold text-2xl dark:text-white">Expenses Breakdown</h1>
      <Doughnut data={dataValues} />
    </div>
  )
}

export default PieChart
