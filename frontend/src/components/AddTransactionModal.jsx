import React, { useState } from 'react';
import { Modal } from './Modal';
import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/formatters';
import { CheckCircle2 } from 'lucide-react';

export const AddTransactionModal = () => {
  const { isAddTransactionOpen, setIsAddTransactionOpen } = useApp();
  const [assetType, setAssetType] = useState('Stock');
  const [transactionType, setTransactionType] = useState('BUY');
  const [assetName, setAssetName] = useState('RELIANCE');
  const [quantity, setQuantity] = useState('10');
  const [price, setPrice] = useState('2985.40');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [fees, setFees] = useState('20');
  const [notes, setNotes] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const totalInvestment = Number(quantity || 0) * Number(price || 0) + Number(fees || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setIsAddTransactionOpen(false);
    }, 1200);
  };

  return (
    <Modal
      isOpen={isAddTransactionOpen}
      onClose={() => setIsAddTransactionOpen(false)}
      title="Record New Transaction"
      subtitle="Log a trade or SIP allocation to calculate holdings and XIRR"
      maxWidth="max-w-lg"
    >
      {successMsg ? (
        <div className="py-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 size={28} />
          </div>
          <h4 className="text-base font-bold text-slate-900">Transaction Recorded</h4>
          <p className="text-xs text-slate-500">
            Portfolio holdings and average buy price updated successfully in demo state.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Transaction Type Buttons */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">Transaction Type</label>
            <div className="grid grid-cols-4 gap-2">
              {['BUY', 'SELL', 'SIP', 'DIVIDEND'].map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setTransactionType(type)}
                  className={`py-2 text-center rounded-lg font-bold transition-colors ${
                    transactionType === type
                      ? type === 'BUY' || type === 'SIP'
                        ? 'bg-emerald-600 text-white'
                        : type === 'SELL'
                        ? 'bg-rose-600 text-white'
                        : 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Asset Type */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Asset Class</label>
              <select
                value={assetType}
                onChange={(e) => setAssetType(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-hidden focus:border-slate-400"
              >
                <option value="Stock">Stock (Equity)</option>
                <option value="Mutual Fund">Mutual Fund</option>
                <option value="ETF">ETF (Exchange Traded Fund)</option>
                <option value="Gold">Gold / Silver</option>
                <option value="REIT">REIT / InvIT</option>
                <option value="US Stock">US Equity</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Symbol / Asset Name</label>
              <input
                type="text"
                value={assetName}
                onChange={(e) => setAssetName(e.target.value)}
                placeholder="e.g. RELIANCE, PPFAS"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-hidden focus:border-slate-400"
                required
              />
            </div>
          </div>

          {/* Quantity & Price */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {assetType === 'Mutual Fund' ? 'Units' : 'Quantity / Shares'}
              </label>
              <input
                type="number"
                step="any"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-hidden focus:border-slate-400"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {assetType === 'Mutual Fund' ? 'NAV (₹)' : 'Price per Share (₹)'}
              </label>
              <input
                type="number"
                step="any"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-hidden focus:border-slate-400"
                required
              />
            </div>
          </div>

          {/* Date & Fees */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-hidden focus:border-slate-400"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Brokerage / STT / Fees (₹)</label>
              <input
                type="number"
                step="any"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-hidden focus:border-slate-400"
              />
            </div>
          </div>

          {/* Total Calculated summary */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
            <span className="text-slate-600 font-medium">Estimated Total Value:</span>
            <span className="text-sm font-bold text-slate-900 font-mono">
              {formatINR(totalInvestment)}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAddTransactionOpen(false)}
              className="px-4 py-2 border border-slate-200 rounded-lg font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-xs cursor-pointer"
            >
              Confirm Transaction
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
