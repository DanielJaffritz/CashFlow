import { eachDayOfInterval, eachMonthOfInterval, eachYearOfInterval, format } from "date-fns";

export const getIncomesAndExpenses = (transactions: any[], startDate: Date, endDate: Date, type: string) => {
  let interval: Date[];
  let formatK: string;
  const incomes = transactions.filter(trans => trans.type === 'income')
  const expenses = transactions.filter(trans => trans.type === 'expense')
  switch (type) {

    case 'monthly':
      interval = eachMonthOfInterval({
        start: startDate,
        end: startDate,
      });
      formatK = 'yyyy-MM';
      break;
    case 'yearly':
      interval = eachYearOfInterval({
        start: startDate,
        end: endDate
      });
      formatK = 'yyyy';
      break;
    case 'daily':
      interval = eachDayOfInterval({
        start: startDate,
        end: endDate
      });
      formatK = 'yyyy-MM-dd'
      break;
    default:
      return { labels: [], data: [] }

  }

  // 2. Agrupamos las transacciones existentes en un Mapa para acceso rápido
  const total = transactions.reduce((acc, trans) => {
    const key = format(trans.date.toDate(), formatK);
    acc[key] = (acc[key] || 0) + trans.amount
    return acc
  }, {} as Record<string, number>);

  // 3. Mapeamos el intervalo completo (labels) y extraemos el valor o 0
  const labels = interval.map(date => {
    // Formato legible para el usuario en la gráfica
    return type === 'daily' ? format(date, 'dd') : format(date, 'MMM');
  });
  const data = interval.map(date => {
    const key = format(date, formatK);
    return total[key] || 0

  });
  return { labels, data }
}

