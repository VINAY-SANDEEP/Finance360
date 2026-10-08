import React, { useState } from 'react';
import {
  Bookmark,
  Bell,
  Trash2,
  TrendingUp,
  Plus,
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MetricBadge } from '../components/MetricBadge';
import { formatINR } from '../utils/formatters';

export const WatchlistPage = () => {
  const { watchlist, toggleWatchlist, setIsAddTransactionOpen } = useApp();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  const filteredItems = watchlist.filter((item) => {
    if (filterType !== 'ALL' && item.assetType !== filterType) return false;
    if (!search) return true;
    return (
      item.symbol.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Watchlists & Price Alerts
            </h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
              Demo Data
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor target price breakouts and momentum triggers before deploying capital
          </p>
        </div>

        <button
          onClick={() => setIsAddTransactionOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs self-start sm:self-auto cursor-pointer"
        >
          <Plus size={15} />
          <span>Quick Buy / Add Transaction</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search watchlist assets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-hidden focus:border-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto text-xs">
          {['ALL', 'Stock', 'ETF', 'Gold ETF'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filterType === t
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Watchlist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const isNearTarget = item.currentPrice >= item.alertThreshold * 0.98;
          return (
            <div
              key={item.id}
              className={`bg-white rounded-xl border p-5 shadow-xs transition-all hover:border-slate-300 relative space-y-3 ${
                item.targetHit
                  ? 'border-amber-300 ring-1 ring-amber-300'
                  : 'border-slate-200'
              }`}
            >
              {/* Header row */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{item.symbol}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                      {item.assetType}
                    </span>
                  </div>
                  <h4 className="text-xs text-slate-500 truncate max-w-[200px] mt-0.5">
                    {item.name}
                  </h4>
                </div>

                <button
                  onClick={() => toggleWatchlist(item)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Remove from watchlist"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              {/* Price & Change */}
              <div className="flex items-baseline justify-between pt-2">
                <div>
                  <div className="text-xl font-bold font-mono text-slate-900">
                    {formatINR(item.currentPrice)}
                  </div>
                  <div className="text-[10px] text-slate-400">Current Market Price</div>
                </div>
                <MetricBadge value={item.changePercent} size="md" />
              </div>

              {/* Alert Threshold Info */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <Bell size={13} className={item.targetHit ? 'text-amber-600' : 'text-slate-400'} />
                  <span className="text-slate-500 text-[11px]">Alert Threshold:</span>
                  <span className="font-mono font-bold text-slate-800">
                    {formatINR(item.alertThreshold)}
                  </span>
                </div>

                {item.targetHit ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                    <CheckCircle2 size={11} /> Target Hit
                  </span>
                ) : (
                  <span className="text-[10px] font-medium text-slate-400">
                    Watching
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
          <Bookmark size={32} className="mx-auto text-slate-300 mb-2" />
          <h4 className="font-bold text-slate-800 text-sm">No Assets in Watchlist</h4>
          <p className="text-xs text-slate-400 mt-1">
            Browse Markets to star your favorite stocks, funds, or ETFs.
          </p>
        </div>
      )}
    </div>
  );
};
