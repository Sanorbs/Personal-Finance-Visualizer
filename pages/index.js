import Head from 'next/head';
import Link from 'next/link';
import { FiArrowRight, FiDollarSign, FiPieChart, FiCreditCard } from 'react-icons/fi';

export default function Home() {
  return (
    <>
      <Head>
        <title>Finance Visualizer | Personal Finance Dashboard</title>
      </Head>
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-orange-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Smart Finance <span className="text-orange-600">Management</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Visualize your spending, track budgets, and achieve financial freedom
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <Link href="/dashboard" className="flex items-center justify-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-lg font-medium transition-colors shadow-lg hover:shadow-xl">
                Get Started <FiArrowRight />
              </Link>
              <Link href="/transactions" className="flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-orange-600 rounded-lg text-lg font-medium transition-colors border-2 border-orange-600">
                View Transactions
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md border border-orange-100 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-orange-100 rounded-full text-orange-600">
                <FiDollarSign className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Track Expenses</h3>
              <p className="text-gray-600">Monitor where your money goes each month with detailed analytics</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md border border-orange-100 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-orange-100 rounded-full text-orange-600">
                <FiPieChart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Visual Insights</h3>
              <p className="text-gray-600">Beautiful charts to understand your financial patterns</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md border border-orange-100 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-orange-100 rounded-full text-orange-600">
                <FiCreditCard className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Budget Control</h3>
              <p className="text-gray-600">Set and maintain budgets to reach your financial goals</p>
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="mt-20 bg-orange-50 rounded-xl p-8 text-center">
            <blockquote className="max-w-3xl mx-auto">
            <p className="text-xl italic text-gray-700 mb-4">
  &ldquo;This dashboard transformed how I manage my finances. The visualizations make complex data simple to understand.&rdquo;
</p>
              <footer className="text-orange-600 font-medium">- Happy User</footer>
            </blockquote>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-orange-600 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to take control of your finances?</h2>
            <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-orange-600 rounded-lg text-lg font-medium transition-colors shadow-lg">
              Start Now <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}