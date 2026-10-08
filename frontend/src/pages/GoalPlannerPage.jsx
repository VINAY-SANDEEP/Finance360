import React, { useState } from 'react';
import { Target, Home, GraduationCap, Shield, Car, Heart, Plane, Plus, Info } from 'lucide-react';
import { mockGoals } from '../services/mockDataService';
import { formatINR } from '../utils/formatters';

export const GoalPlannerPage = () => {
  const [goals, setGoals] = useState(mockGoals);

  // Quick calculator inputs for new/current goal
  const [goalName, setGoalName] = useState('Dream Home');
  const [currentCost, setCurrentCost] = useState(3500000);
  const [yearsRemaining, setYearsRemaining] = useState(5);
  const [inflationRate, setInflationRate] = useState(6.0);
  const [expectedReturn, setExpectedReturn] = useState(12.0);
  const [currentSavings, setCurrentSavings] = useState(500000);

  // Future cost = PV * (1 + inflation)^years
  const futureCost = Math.round(currentCost * Math.pow(1 + inflationRate / 100, yearsRemaining));
  
  // Future value of existing savings = Savings * (1 + return)^years
  const fvExistingSavings = Math.round(currentSavings * Math.pow(1 + expectedReturn / 100, yearsRemaining));
  
  // Shortfall to be funded
  const shortfall = Math.max(0, futureCost - fvExistingSavings);
  
  // Required monthly investment PMT = Shortfall / [ ((1+r)^n - 1) / r * (1+r) ]
  const monthlyRate = expectedReturn / 100 / 12;
  const totalMonths = yearsRemaining * 12;
  const requiredMonthly = monthlyRate > 0 && totalMonths > 0
    ? Math.round((shortfall * monthlyRate) / ((Math.pow(1 + monthlyRate, totalMonths) - 1) * (1 + monthlyRate)))
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Goal-Based Wealth Planner
          </h1>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
            Demo Data
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          Map target milestone costs, account for Indian inflation (CPI), and calculate required monthly SIP
        </p>
      </div>

      {/* Active Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {goals.map((g) => (
          <div key={g.id} className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">{g.category}</span>
                <h3 className="font-bold text-sm text-slate-900">{g.title}</h3>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Target: {g.targetYear}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Progress</span>
                <span className="font-mono">{g.progressPercentage}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-2.5 rounded-full"
                  style={{ width: `${g.progressPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Accumulated</span>
                <span className="font-mono font-bold text-slate-800">{formatINR(g.currentSaved)}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Future Cost</span>
                <span className="font-mono font-bold text-slate-800">{formatINR(g.targetAmount)}</span>
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg text-[11px] text-slate-600 flex justify-between">
              <span>Required Monthly SIP:</span>
              <span className="font-mono font-bold text-emerald-700">{formatINR(g.monthlyRequired)}/mo</span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Goal Inflation Calculator */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs space-y-6">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          Simulate a Goal (Inflation & SIP Calculation)
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Goal Milestone</label>
              <select
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
              >
                <option value="Dream Home">House Down Payment</option>
                <option value="Child Higher Education">Child Higher Education</option>
                <option value="Retirement Corpus">Financial Freedom / Retirement</option>
                <option value="Luxury Car">Automobile</option>
                <option value="World Travel">International Sabbatical</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Current Cost Today: {formatINR(currentCost)}</span>
              </div>
              <input
                type="range"
                min="500000"
                max="20000000"
                step="500000"
                value={currentCost}
                onChange={(e) => setCurrentCost(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Time Horizon (Years)</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={yearsRemaining}
                  onChange={(e) => setYearsRemaining(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Inflation Rate (% p.a.)</label>
                <input
                  type="number"
                  step="0.5"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Expected Return (% p.a.)</label>
                <input
                  type="number"
                  step="0.5"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Current Allocated Savings</label>
                <input
                  type="number"
                  step="10000"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Future Adjusted Milestone Cost
              </span>
              <div className="text-3xl font-extrabold font-mono text-slate-900 mt-1">
                {formatINR(futureCost)}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                At {inflationRate}% inflation, today's {formatINR(currentCost)} will require {formatINR(futureCost)} in {yearsRemaining} years.
              </p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="text-xs font-bold text-emerald-950 block">
                Required Monthly SIP to Achieve Goal
              </span>
              <div className="text-2xl font-bold font-mono text-emerald-700 mt-1">
                {formatINR(requiredMonthly)} / month
              </div>
              <span className="text-[11px] text-emerald-800 block mt-1">
                Assuming {expectedReturn}% CAGR equity/hybrid portfolio growth
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
