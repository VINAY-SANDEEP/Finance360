import React from 'react';
import { HeartPulse, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';

export const FinancialHealthPage = () => {
  const score = 78;

  const categories = [
    { name: 'Emergency Liquidity Fund', score: 90, status: 'Optimal', comment: '6+ months living expenses parked in liquid funds' },
    { name: 'Savings Rate (>35%)', score: 85, status: 'Strong', comment: '50.9% of income saved into investments' },
    { name: 'Portfolio Diversification', score: 75, status: 'Good', comment: 'Well spread across 6 asset classes; slightly high equity' },
    { name: 'Debt & Leverage Level', score: 95, status: 'Excellent', comment: 'Zero unsecured credit card debt; home loan well serviced' },
    { name: 'Goal Funding Trajectory', score: 65, status: 'Moderate', comment: 'Dream Home downpayment is on track, education SIP needs step-up' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Financial Health Diagnostic Score
          </h1>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
            Educational Model
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          Algorithmic assessment of liquidity, leverage, diversification, and goal resilience
        </p>
      </div>

      {/* Main Score Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-xs flex flex-col sm:flex-row items-center gap-8">
        <div className="relative flex items-center justify-center shrink-0">
          <div className="w-36 h-36 rounded-full border-8 border-emerald-100 border-t-emerald-600 flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold text-slate-900 font-mono">{score}</span>
            <span className="text-xs font-semibold text-slate-400">/ 100</span>
          </div>
        </div>

        <div className="space-y-3 flex-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <ShieldCheck size={14} className="text-emerald-600" />
            Financially Robust (Grade A)
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Your finances show resilient savings and low leverage.
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
            You maintain an emergency cushion and deploy a significant surplus into compounding assets. Increasing international diversification and setting up an annual 10% step-up will accelerate goal achievement.
          </p>
        </div>
      </div>

      {/* Pillar Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((c) => (
          <div key={c.name} className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">{c.name}</span>
              <span className="font-mono font-bold text-slate-800">{c.score}/100</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${c.score}%` }}></div>
            </div>
            <div className="text-[11px] text-slate-500 flex justify-between pt-1">
              <span>{c.comment}</span>
              <span className="font-semibold text-emerald-700">{c.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
        <AlertTriangle size={16} className="text-amber-700 shrink-0 mt-0.5" />
        <span>
          Educational Disclaimer: This scoring system is an automated educational framework based on personal finance best practices and does NOT constitute professional certified financial planning advice.
        </span>
      </div>
    </div>
  );
};
