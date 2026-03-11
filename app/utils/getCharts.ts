import { eachDayOfInterval, eachMonthOfInterval, format } from "date-fns";
import { categories } from "~/constants";

export const getIncomesAndExpenses = (
  transactions: any[],
  startDate: Date,
  endDate: Date,
  type: string
) => {
  let interval: Date[];
  let formatK: string;

  switch (type) {
    case 'monthly':
      interval = eachMonthOfInterval({ start: startDate, end: endDate });
      formatK = 'yyyy-MM';
      break;
    case 'daily':
      interval = eachDayOfInterval({ start: startDate, end: endDate });
      formatK = 'yyyy-MM-dd';
      break;
    default:
      interval = [];
      return { labels: [], income: [], expense: [] };
  }

  // 1. Agrupar montos por fecha y tipo
  const totals = transactions.reduce((acc, trans) => {
    const key = format(trans.date.toDate(), formatK);
    if (!acc[key]) acc[key] = { income: 0, expense: 0 };

    if (trans.type === 'income') acc[key].income += trans.amount;
    if (trans.type === 'expense') acc[key].expense += trans.amount;

    return acc;
  }, {} as Record<string, { income: number; expense: number }>);

  // 2. Generar labels (eje X)
  const labels: string[] = interval.map(date =>
    type === 'daily' ? format(date, 'dd') : format(date, 'MMM')
  );

  // 3. Generar series de datos (eje Y)
  const income: any[] = interval.map(date => totals[format(date, formatK)]?.income || 0);
  const expense: any[] = interval.map(date => totals[format(date, formatK)]?.expense || 0);

  const netIncome: number = transactions.reduce((acc, trans) => acc + (trans.type === 'income' ? trans.amount : -trans.amount), 1);
  return { labels, income, expense, netIncome };
}

export const getExpensesBreakdown = (transactions: any[]) => {
  const ExpenseCategories = Array.from(categories.keys()).reduce((acc: any, element: any) => {
    acc[element] = (acc[element] || 0)
    return acc
  }, {})

  for (const trans of transactions) {
    ExpenseCategories[trans.category] += trans.amount
  }
  return ExpenseCategories

}
