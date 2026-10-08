import React, { useState } from 'react';
import { GitCompare, ArrowRight, Check } from 'lucide-react';
import { mockStocks, mockMutualFunds, mockEtfs } from '../services/mockDataService';
import { formatINR, formatPercentage } from '../utils/formatters';

export const ComparePage = () => {
  const [assetType, setAssetType] = useState('STOCKS');
  const [item1, setItem1] = useState(mockStocks[0].symbol);
  const [item2, setItem2] = useState(mockStocks[1].symbol);

  const stock1 = mockStocks.find((s) => s.symbol === item1) || mockStocks[0];
  const stock2 = mockStocks.find((s) => s.symbol === item2) || mockStocks[1];

  const mf1 = mockMutualFunds[0];
  const mf2 = mockMutualFunds[1];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Financial Asset Comparison Engine
          </h1>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
            Demo Data
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          Side-by-side metric comparison for valuation ratios, historical compounding, and expense efficiency
        </p>
      </div>

      {/* Selectors */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          {['STOCKS', 'MUTUAL_FUNDS'].map((type) => (
            <button
              key={type}
              onClick={() => setAssetType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                assetType === type
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type === 'STOCKS' ? 'Compare Stocks' : 'Compare Mutual Funds'}
            </button>
          ))}
        </div>

        {assetType === 'STOCKS' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Asset 1</label>
              <select
                value={item1}
                onChange={(e) => setItem1(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs font-medium"
              >
                {mockStocks.map((s) => (
                  <option key={s.symbol} value={s.symbol}>{s.name} ({s.symbol})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Asset 2</label>
              <select
                value={item2}
                onChange={(e) => setItem2(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs font-medium"
              >
                {mockStocks.map((s) => (
                  <option key={s.symbol} value={s.symbol}>{s.name} ({s.symbol})</option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-500">
            Comparing top flagship funds: Parag Parikh Flexi Cap vs Quant Small Cap Fund
          </p>
        )}
      </div>

      {/* Comparison Matrix Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-500 uppercase text-[10px]">
            <tr>
              <th className="p-4 w-1/3">Financial Metric</th>
              <th className="p-4 w-1/3 text-right">
                {assetType === 'STOCKS' ? stock1.symbol : mf1.name}
              </th>
              <th className="p-4 w-1/3 text-right">
                {assetType === 'STOCKS' ? stock2.symbol : mf2.name}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono">
            {assetType === 'STOCKS' ? (
              <>
                <tr>
                  <td className="p-4 font-sans font-semibold text-slate-900">Current Share Price</td>
                  <td className="p-4 text-right font-bold text-slate-900">{formatINR(stock1.price)}</td>
                  <td className="p-4 text-right font-bold text-slate-900">{formatINR(stock2.price)}</td>
                </tr>
                <tr>
                  <td className="p-4 font-sans font-semibold text-slate-900">Market Capitalization</td>
                  <td className="p-4 text-right text-slate-700">{stock1.marketCap}</td>
                  <td className="p-4 text-right text-slate-700">{stock2.marketCap}</td>
                </tr>
                <tr>
                  <td className="p-4 font-sans font-semibold text-slate-900">P/E Ratio (Valuation)</td>
                  <td className="p-4 text-right font-bold">{stock1.peRatio}x</td>
                  <td className="p-4 text-right font-bold">{stock2.peRatio}x</td>
                </tr>
                <tr>
                  <td className="p-4 font-sans font-semibold text-slate-900">Return on Equity (ROE)</td>
                  <td className="p-4 text-right text-emerald-700 font-bold">{stock1.roe}%</td>
                  <td className="p-4 text-right text-emerald-700 font-bold">{stock2.roe}%</td>
                </tr>
                <tr>
                  <td className="p-4 font-sans font-semibold text-slate-900">Dividend Yield</td>
                  <td className="p-4 text-right">{stock1.dividendYield}%</td>
                  <td className="p-4 text-right">{stock2.dividendYield}%</td>
                </tr>
              </>
            ) : (
              <>
                <tr>
                  <td className="p-4 font-sans font-semibold text-slate-900">Current NAV</td>
                  <td className="p-4 text-right font-bold text-slate-900">{formatINR(mf1.nav)}</td>
                  <td className="p-4 text-right font-bold text-slate-900">{formatINR(mf2.nav)}</td>
                </tr>
                <tr>
                  <td className="p-4 font-sans font-semibold text-slate-900">Expense Ratio</td>
                  <td className="p-4 text-right text-emerald-700 font-bold">{mf1.expenseRatio}%</td>
                  <td className="p-4 text-right text-slate-700">{mf2.expenseRatio}%</td>
                </tr>
                <tr>
                  <td className="p-4 font-sans font-semibold text-slate-900">1 Year Return</td>
                  <td className="p-4 text-right font-bold text-emerald-700">+{mf1.return1Y}%</td>
                  <td className="p-4 text-right font-bold text-emerald-700">+{mf2.return1Y}%</td>
                </tr>
                <tr>
                  <td className="p-4 font-sans font-semibold text-slate-900">3 Year CAGR Return</td>
                  <td className="p-4 text-right font-bold text-emerald-700">+{mf1.return3Y}%</td>
                  <td className="p-4 text-right font-bold text-emerald-700">+{mf2.return3Y}%</td>
                </tr>
                <tr>
                  <td className="p-4 font-sans font-semibold text-slate-900">Asset Under Management (AUM)</td>
                  <td className="p-4 text-right text-slate-700">{mf1.aum}</td>
                  <td className="p-4 text-right text-slate-700">{mf2.aum}</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
