import React, { useState } from 'react';
import { WalletCards, Plus, ArrowUpRight, ArrowDownRight, PieChart } from 'lucide-react';
import { formatINR } from '../utils/formatters';

export const ExpenseTrackerPage = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(150000);
  const [expenses, setExpenses] = useState([
    { id: 1, category: 'Rent', amount: 35000, date: '2026-10-01' },
    { id: 2, category: 'Food & Groceries', amount: 16000, date: '2026-10-03' },
    { id: 3, category: 'Bills & Utilities', amount: 8500, date: '2026-10-04' },
    { id: 4, category: 'Travel & Commute', amount: 7200, date: '2026-10-05' },
    { id: 5, category: 'Shopping', amount: 6500, date: '2026-10-06' },
    { id: 6, category: 'Healthcare', amount: 3200, date: '2026-10-07' }
  ]);

  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const totalSavings = monthlyIncome - totalExpense;
  const savingsRate = ((totalSavings / monthlyIncome) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Cash Flow & Expense Tracking
          </h1>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
            Demo Data
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          Monitor recurring burn rate, discretionary spends, and net household savings rate
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <span className="text-xs font-bold text-slate-500 uppercase">Monthly Income</span>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1">{formatINR(monthlyIncome)}</div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">Primary Salary & Dividends</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <span className="text-xs font-bold text-slate-500 uppercase">Total Expenses</span>
          <div className="text-2xl font-bold font-mono text-rose-600 mt-1">{formatINR(totalExpense)}</div>
          <span className="text-xs text-slate-500 mt-1 block">{((totalExpense / monthlyIncome) * 100).toFixed(1)}% of income spent</span>
        </div>

        <div className="bg-emerald-900 text-white p-5 rounded-xl border border-emerald-800">
          <span className="text-xs font-bold text-emerald-300 uppercase">Monthly Surplus / Savings</span>
          <div className="text-2xl font-bold font-mono text-white mt-1">{formatINR(totalSavings)}</div>
          <span className="text-xs text-emerald-300 font-semibold mt-1 block">{savingsRate}% Healthy Savings Rate</span>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
        <h3 className="text-sm font-bold text-slate-900">October 2026 Expense Breakdown</h3>
        <div className="divide-y divide-slate-100">
          {expenses.map((exp) => (
            <div key={exp.id} className="py-3 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900">{exp.category}</span>
                <span className="text-slate-400 text-[11px] block">{exp.date}</span>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-slate-900">{formatINR(exp.amount)}</span>
                <span className="text-[10px] text-slate-400 block">
                  {((exp.amount / totalExpense) * 100).toFixed(1)}% of total
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
