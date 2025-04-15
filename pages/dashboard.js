import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import MonthlyChart from '../components/MonthlyChart';
import CategoryChart from '../components/CategoryChart';
import SummaryCards from '../components/SummaryCards';

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/transactions');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setTransactions(data.filter(t => t.date && !isNaN(new Date(t.date).getTime())));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return (
    <Layout>
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-blue-100"></div>
          <p className="text-gray-500">Loading your financial data...</p>
        </div>
      </div>
    </Layout>
  );

  if (error) return (
    <Layout>
      <div className="max-w-md mx-auto mt-8 p-4 bg-red-50 rounded-lg border border-red-200">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-sm text-red-700">{error}</p>
        </div>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Financial Dashboard</h1>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
        </div>

        <SummaryCards transactions={transactions} />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-sm border border-gray-100">
            <MonthlyChart transactions={transactions} />
          </div>
          <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-sm border border-gray-100">
            <CategoryChart transactions={transactions} />
          </div>
        </div>
      </div>
    </Layout>
  );
}