import React, { useState, useEffect } from 'react';
import { Layers, ShieldCheck } from 'lucide-react';
import { financeApi } from '../services/api';
import { AssetAllocationChart } from '../charts/AssetAllocationChart';
import { formatINR } from '../utils/formatters';

export const AssetAllocationPage = () => {
  const [allocation, setAllocation] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const load = async () => {
      const [a, s, sum] = await Promise.all([
        financeApi.getAssetAllocation(),
        financeApi.getSectorAllocation(),
        financeApi.getDashboardSummary()
      ]);
      setAllocation(a);
      setSectors(s);
      setSummary(sum);
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Asset & Sector Allocation Matrix
          </h1>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
            Demo Data
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          Evaluate risk distribution across Indian Equities, MFs, ETFs, Gold, Real Estate, and US Equities
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AssetAllocationChart data={allocation} />

        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Asset Class Weightages</h3>
          <div className="space-y-3">
            {allocation.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-xs shrink-0" style={{ backgroundColor: item.color }}></span>
                  <span className="font-semibold text-slate-800">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-slate-900">{formatINR(item.value)}</span>
                  <span className="text-slate-500 ml-2 font-mono">({item.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
