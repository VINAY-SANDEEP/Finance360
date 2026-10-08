import React, { useState } from 'react';
import { ReceiptCent, AlertCircle, Info, ShieldCheck } from 'lucide-react';
import { formatINR } from '../utils/formatters';

export const TaxPlannerPage = () => {
  const [stcgGains, setStcgGains] = useState(25000);
  const [ltcgGains, setLtcgGains] = useState(185000);
  const [elssInvestment, setElssInvestment] = useState(150000);
  const [npsInvestment, setNpsInvestment] = useState(50000);

  // India FY2024-25/26 tax regime calculations:
  // Equity STCG: 20%
  // Equity LTCG: 12.5% on profits over ₹1,25,000 exemption limit
  const ltcgExemptionLimit = 125000;
  const taxableLtcg = Math.max(0, ltcgGains - ltcgExemptionLimit);
  const ltcgTax = Math.round(taxableLtcg * 0.125);
  const stcgTax = Math.round(stcgGains * 0.20);
  const totalCapitalGainsTax = ltcgTax + stcgTax;

  // 80C tax deduction savings (assuming 30% tax bracket + cess = 31.2%)
  const elssTaxSaved = Math.round(Math.min(150000, elssInvestment) * 0.312);
  const npsTaxSaved = Math.round(Math.min(50000, npsInvestment) * 0.312);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            India Capital Gains & Tax Planning
          </h1>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
            FY 2025-26 Rules
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          Estimate capital gains tax liabilities on equity & debt, and optimize 80C/NPS deductions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Capital Gains Section */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Equity Capital Gains Calculator</h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Short-Term Capital Gains (STCG &lt; 12 months)
              </label>
              <input
                type="number"
                value={stcgGains}
                onChange={(e) => setStcgGains(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono"
              />
              <span className="text-[10px] text-slate-400">Taxed at flat 20% (Section 111A)</span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Long-Term Capital Gains (LTCG &gt; 12 months)
              </label>
              <input
                type="number"
                value={ltcgGains}
                onChange={(e) => setLtcgGains(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono"
              />
              <span className="text-[10px] text-slate-400">
                First ₹1,25,000 exempt; balance taxed at 12.5% (Section 112A)
              </span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-600">LTCG Exemption Applied:</span>
              <span className="font-mono text-emerald-600 font-bold">
                -{formatINR(Math.min(ltcgGains, ltcgExemptionLimit))}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">STCG Tax Payable (20%):</span>
              <span className="font-mono text-slate-900">{formatINR(stcgTax)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">LTCG Tax Payable (12.5%):</span>
              <span className="font-mono text-slate-900">{formatINR(ltcgTax)}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm">
              <span className="text-slate-900">Total Capital Gains Tax:</span>
              <span className="font-mono text-rose-700">{formatINR(totalCapitalGainsTax)}</span>
            </div>
          </div>
        </div>

        {/* Deductions & Tax Saving Section */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Tax Saving Allocations (Old Regime)</h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                ELSS Mutual Funds (Section 80C)
              </label>
              <input
                type="number"
                value={elssInvestment}
                onChange={(e) => setElssInvestment(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono"
              />
              <span className="text-[10px] text-slate-400">Capped at ₹1.5 Lakh max deduction</span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                National Pension Scheme NPS (Section 80CCD(1B))
              </label>
              <input
                type="number"
                value={npsInvestment}
                onChange={(e) => setNpsInvestment(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono"
              />
              <span className="text-[10px] text-slate-400">Additional deduction up to ₹50,000</span>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2 text-xs">
            <div className="flex justify-between text-emerald-950">
              <span>Tax Saved via ELSS (30% slab):</span>
              <span className="font-mono font-bold text-emerald-700">+{formatINR(elssTaxSaved)}</span>
            </div>
            <div className="flex justify-between text-emerald-950">
              <span>Tax Saved via NPS (30% slab):</span>
              <span className="font-mono font-bold text-emerald-700">+{formatINR(npsTaxSaved)}</span>
            </div>
            <div className="pt-2 border-t border-emerald-200 flex justify-between font-bold text-sm text-emerald-950">
              <span>Total Direct Tax Saved:</span>
              <span className="font-mono text-emerald-800">+{formatINR(elssTaxSaved + npsTaxSaved)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
        <Info size={16} className="text-slate-400 shrink-0 mt-0.5" />
        <span>
          Compliance Disclaimer: Tax computations are for educational and planning simulation only. Tax rules are governed by the Income Tax Department of India and the Finance Act. Please verify current provisions with a certified Chartered Accountant.
        </span>
      </div>
    </div>
  );
};
