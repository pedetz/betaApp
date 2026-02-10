import React from 'react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

const SummaryCard = ({ title, amount, icon: Icon, color }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                <h3 className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
                    ${amount ? amount.toFixed(2) : '0.00'}
                </h3>
            </div>
            <div className={`p-3 rounded-lg ${color}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
        </div>
    </div>
);

export default function SummaryCards({ summary }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <SummaryCard
                title="Total Balance"
                amount={summary.balance}
                icon={Wallet}
                color="bg-blue-600"
            />
            <SummaryCard
                title="Total Income"
                amount={summary.income}
                icon={TrendingUp}
                color="bg-green-500"
            />
            <SummaryCard
                title="Total Expense"
                amount={summary.expense}
                icon={TrendingDown}
                color="bg-red-500"
            />
        </div>
    );
}
