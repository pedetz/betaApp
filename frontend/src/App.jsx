import React, { useEffect, useState } from 'react';
import { getTransactions, addTransaction, deleteTransaction, getSummary } from './services/api';
import SummaryCards from './components/SummaryCards';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import ExpenseChart from './components/ExpenseChart';
import { LayoutDashboard } from 'lucide-react';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [txs, sum] = await Promise.all([getTransactions(), getSummary()]);
      setTransactions(txs);
      setSummary(sum);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddTransaction = async (transaction) => {
    await addTransaction(transaction);
    fetchData(); // Refresh data
  };

  const handleDeleteTransaction = async (id) => {
    await deleteTransaction(id);
    fetchData(); // Refresh data
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600 rounded-lg">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Finance Dashboard</h1>
          </div>
          {/* Optional: Dark Mode Toggle could go here */}
        </header>

        <SummaryCards summary={summary} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <TransactionForm onSubmit={handleAddTransaction} />
            <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />
          </div>
          <div className="lg:col-span-1">
            <ExpenseChart transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
