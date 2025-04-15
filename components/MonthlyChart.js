import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, subMonths, parseISO, isValid } from 'date-fns';

export default function MonthlyChart({ transactions }) {
  const processData = () => {
    const monthlyData = {};
    const now = new Date();
    
    const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
      const date = subMonths(now, i);
      return format(date, 'yyyy-MM');
    }).reverse();

    lastSixMonths.forEach(month => {
      monthlyData[month] = { 
        month, 
        income: 0, 
        expense: 0,
        monthDisplay: format(parseISO(`${month}-01`), 'MMM yyyy')
      };
    });

    transactions.forEach(transaction => {
      if (!transaction.date) return;
      const date = new Date(transaction.date);
      if (!isValid(date)) return;
      
      const month = format(date, 'yyyy-MM');
      if (monthlyData[month]) {
        if (transaction.type === 'income') {
          monthlyData[month].income += transaction.amount || 0;
        } else {
          monthlyData[month].expense += transaction.amount || 0;
        }
      }
    });

    return Object.values(monthlyData).map(({ monthDisplay, income, expense }) => ({
      month: monthDisplay,
      income: parseFloat(income.toFixed(2)),
      expense: parseFloat(expense.toFixed(2))
    }));
  };

  const data = processData();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-700">Monthly Cash Flow</h3>
        <div className="flex gap-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <span className="text-xs text-gray-500">Income</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <span className="text-xs text-gray-500">Expense</span>
          </div>
        </div>
      </div>
      
      <div className="h-[300px]">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                contentStyle={{
                  background: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  border: 'none'
                }}
                formatter={(value) => [`$${value.toFixed(2)}`, value > 0 ? 'Income' : 'Expense']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Bar 
                dataKey="income" 
                fill="#4ade80" 
                name="Income"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="expense" 
                fill="#f87171" 
                name="Expense"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p>No transaction data available</p>
          </div>
        )}
      </div>
    </div>
  );
}