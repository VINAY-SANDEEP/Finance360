import React, { useState, useMemo } from 'react';
import {
  Calculator,
  TrendingUp,
  Percent,
  Calendar,
  Sparkles,
  ArrowRight,
  Info,
  DollarSign
} from 'lucide-react';
import {
  calculateSip,
  calculateStepUpSip,
  calculateLumpSum
} from '../utils/financialCalculators';
import { SipGrowthChart } from '../charts/SipGrowthChart';
import { StatCard } from '../components/StatCard';
import { formatINR } from '../utils/formatters';

export const SipCalculatorPage = () => {
  const [calculatorType, setCalculatorType] = useState('REGULAR_SIP'); // REGULAR_SIP, STEP_UP_SIP, LUMPSUM
  const [monthlyAmount, setMonthlyAmount] = useState(25000);
  const [lumpsumAmount, setLumpsumAmount] = useState(500000);
  const [expectedReturn, setExpectedReturn] = useState(13);
  const [durationYears, setDurationYears] = useState(10);
  const [stepUpPercent, setStepUpPercent] = useState(10);

  // Calculation results
  const result = useMemo(() => {
    if (calculatorType === 'STEP_UP_SIP') {
      return calculateStepUpSip(monthlyAmount, expectedReturn, durationYears, stepUpPercent);
    }
    if (calculatorType === 'LUMPSUM') {
      return calculateLumpSum(lumpsumAmount, expectedReturn, durationYears);
    }
    return calculateSip(monthlyAmount, expectedReturn, durationYears);
  }, [calculatorType, monthlyAmount, lumpsumAmount, expectedReturn, durationYears, stepUpPercent]);

  // Comparison SIP vs Lumpsum for same total capital
  const comparisonLumpsum = useMemo(() => {
    return calculateLumpSum(monthlyAmount * 12 * durationYears, expectedReturn, durationYears);
  }, [monthlyAmount, durationYears, expectedReturn]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Systematic Investment & Compounding Calculator
          </h1>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-300">
            Financial Engine
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          Simulate Indian Mutual Fund & Equity SIP compounding with annual salary step-up percentages
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center gap-2 p-1 bg-slate-200/80 rounded-xl w-fit text-xs font-bold">
        <button
          onClick={() => setCalculatorType('REGULAR_SIP')}
          className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
            calculatorType === 'REGULAR_SIP'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Regular Monthly SIP
        </button>
        <button
          onClick={() => setCalculatorType('STEP_UP_SIP')}
          className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
            calculatorType === 'STEP_UP_SIP'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Annual Step-Up SIP (+%)
        </button>
        <button
          onClick={() => setCalculatorType('LUMPSUM')}
          className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
            calculatorType === 'LUMPSUM'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          One-time Lump Sum
        </button>
      </div>

      {/* Main Grid: Inputs + Output cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs Card */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs space-y-6">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            Investment Parameters
          </h3>

          {/* Monthly or Lumpsum Amount */}
          {calculatorType !== 'LUMPSUM' ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-700">Monthly Contribution</span>
                <span className="font-mono text-emerald-700 font-bold text-sm">
                  {formatINR(monthlyAmount)}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="200000"
                step="500"
                value={monthlyAmount}
                onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>₹500</span>
                <span>₹50,000</span>
                <span>₹1,00,000</span>
                <span>₹2,00,000</span>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-700">One-time Principal Amount</span>
                <span className="font-mono text-emerald-700 font-bold text-sm">
                  {formatINR(lumpsumAmount)}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="5000000"
                step="10000"
                value={lumpsumAmount}
                onChange={(e) => setLumpsumAmount(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>₹10,000</span>
                <span>₹10,00,000</span>
                <span>₹25,00,000</span>
                <span>₹50,00,000</span>
              </div>
            </div>
          )}

          {/* Expected Annual Return Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-700">Expected Annual Return Rate (CAGR)</span>
              <span className="font-mono text-emerald-700 font-bold text-sm">
                {expectedReturn}% p.a.
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              step="0.5"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>5% (Debt)</span>
              <span>12% (Nifty Index)</span>
              <span>15% (Midcap)</span>
              <span>30%</span>
            </div>
          </div>

          {/* Duration Years */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-700">Investment Horizon</span>
              <span className="font-mono text-emerald-700 font-bold text-sm">
                {durationYears} Years
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={durationYears}
              onChange={(e) => setDurationYears(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>1 Yr</span>
              <span>5 Yrs</span>
              <span>10 Yrs</span>
              <span>20 Yrs</span>
              <span>30 Yrs</span>
            </div>
          </div>

          {/* Step Up Percentage (if Step Up active) */}
          {calculatorType === 'STEP_UP_SIP' && (
            <div className="space-y-2 bg-emerald-50/60 p-3.5 rounded-lg border border-emerald-200">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-emerald-950">Annual Step-Up Rate</span>
                <span className="font-mono text-emerald-700 font-bold text-sm">
                  +{stepUpPercent}% / year
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={stepUpPercent}
                onChange={(e) => setStepUpPercent(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <p className="text-[10px] text-emerald-800">
                Increasing your monthly investment in line with annual salary increments doubles your compounding effect!
              </p>
            </div>
          )}

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
            <Info size={15} className="text-slate-400 shrink-0 mt-0.5" />
            <span>
              Returns assume compound interest compounded monthly. Actual market returns fluctuate with market cycles.
            </span>
          </div>
        </div>

        {/* Right Output & Visualization */}
        <div className="lg:col-span-7 space-y-6">
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Total Invested
              </span>
              <div className="text-xl font-bold font-mono text-slate-900 mt-1">
                {formatINR(result.totalInvested)}
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">Your Capital Contribution</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                Estimated Returns
              </span>
              <div className="text-xl font-bold font-mono text-emerald-600 mt-1">
                +{formatINR(result.estimatedReturns)}
              </div>
              <span className="text-[11px] text-emerald-700/80 font-medium mt-1 block">
                Wealth Gained via Compounding
              </span>
            </div>

            <div className="bg-emerald-900 text-white p-4 rounded-xl border border-emerald-800 shadow-md">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                Total Expected Value
              </span>
              <div className="text-2xl font-extrabold font-mono text-white mt-1">
                {formatINR(result.finalValue)}
              </div>
              <span className="text-[11px] text-emerald-300 mt-1 block">
                Estimated Corpus at Year {durationYears}
              </span>
            </div>
          </div>

          {/* Growth Bar Chart */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Corpus Trajectory Over {durationYears} Years
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Visual breakdown of principal invested vs compounded wealth creation
            </p>
            <SipGrowthChart data={result.yearlyBreakdown} />
          </div>

          {/* SIP vs Lump Sum insight */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs text-xs space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles size={16} className="text-amber-500" />
              Rupee Cost Averaging Advantage
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Systematic Investment Plans (SIPs) help average out market volatility across market highs and lows. By continuing through corrections, you accumulate more fund units at discounted NAVs without timing the market.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
