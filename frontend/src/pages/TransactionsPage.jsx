import React, { useState, useEffect } from 'react';
import { Plus, Receipt, Download, Filter } from 'lucide-react';
import { financeApi } from '../services/api';
import { useApp } from '../context/AppContext';
import { DataTable } from '../components/DataTable';
import { formatINR, formatDate } from '../utils/formatters';

export const TransactionsPage = () => {
  const { setIsAddTransactionOpen } = useApp();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTx = async () => {
      setLoading(true);
      const data = await financeApi.getTransactions();
      setTransactions(data);
      setLoading(false);
    };
    fetchTx();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Transaction History & Order Book
            </h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
              Demo Data
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit trail of all executed BUY, SELL, SIP installments, and Dividend receipts
          </p>
        </div>

        <button
          onClick={() => setIsAddTransactionOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs self-start sm:self-auto cursor-pointer"
        >
          <Plus size={15} />
          <span>New Transaction</span>
        </button>
      </div>

      <DataTable
        data={transactions}
        searchPlaceholder="Search transactions..."
        filterCategories={['BUY', 'SELL', 'SIP', 'DIVIDEND']}
        categoryKey="type"
        columns={[
          {
            header: 'Date',
            key: 'transactionDate',
            sortable: true,
            render: (row) => <span className="font-mono text-slate-600">{formatDate(row.transactionDate)}</span>
          },
          {
            header: 'Type',
            key: 'type',
            align: 'center',
            render: (row) => (
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  row.type === 'BUY'
                    ? 'bg-blue-100 text-blue-700'
                    : row.type === 'SIP'
                    ? 'bg-emerald-100 text-emerald-700'
                    : row.type === 'SELL'
                    ? 'bg-rose-100 text-rose-700'
                    : 'bg-purple-100 text-purple-700'
                }`}
              >
                {row.type}
              </span>
            )
          },
          {
            header: 'Asset & Type',
            key: 'asset',
            sortable: true,
            render: (row) => (
              <div>
                <div className="font-bold text-xs text-slate-900">{row.asset}</div>
                <div className="text-[10px] text-slate-400">{row.assetType}</div>
              </div>
            )
          },
          {
            header: 'Quantity',
            key: 'quantity',
            align: 'right',
            render: (row) => <span className="font-mono">{row.quantity}</span>
          },
          {
            header: 'Price / NAV',
            key: 'price',
            align: 'right',
            render: (row) => <span className="font-mono">{formatINR(row.price)}</span>
          },
          {
            header: 'Total Value',
            key: 'totalAmount',
            sortable: true,
            align: 'right',
            render: (row) => (
              <span className="font-mono font-bold text-xs text-slate-900">
                {formatINR(row.totalAmount)}
              </span>
            )
          },
          {
            header: 'Status',
            key: 'status',
            align: 'center',
            render: (row) => (
              <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                {row.status}
              </span>
            )
          }
        ]}
      />
    </div>
  );
};
