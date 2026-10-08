import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { formatINR } from '../utils/formatters';

export const PortfolioPerformanceChart = ({ data, initialTimeframe = '1Y' }) => {
  const [timeframe, setTimeframe] = useState(initialTimeframe);
  const [showBenchmark, setShowBenchmark] = useState(true);

  const timeframes = ['1D', '1W', '1M', '6M', '1Y', '5Y'];

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl border border-slate-700 text-xs">
          <div className="font-semibold text-slate-300 mb-1.5">{label}</div>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                My Portfolio:
              </span>
              <span className="font-mono font-bold">
                {formatINR(payload[0]?.value)}
              </span>
            </div>
            {payload[1] && (
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                  NIFTY 50 TRI:
                </span>
                <span className="font-mono font-medium text-slate-300">
                  {formatINR(payload[1]?.value)}
                </span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
      {/* Header with time periods */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Portfolio Performance</h3>
          <p className="text-xs text-slate-500">
            Net asset valuation compared against NIFTY 50 TRI benchmark
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Benchmark toggle */}
          <button
            type="button"
            onClick={() => setShowBenchmark(!showBenchmark)}
            className={`text-xs px-2.5 py-1 rounded-md border font-medium transition-colors cursor-pointer ${
              showBenchmark
                ? 'bg-slate-100 text-slate-800 border-slate-300'
                : 'text-slate-400 border-slate-200 hover:text-slate-600'
            }`}
          >
            NIFTY 50 Benchmark
          </button>

          {/* Time range buttons */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            {timeframes.map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  timeframe === tf
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart container */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="benchmarkGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />

            <XAxis
              dataKey="period"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#64748b' }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#64748b' }}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              domain={['dataMin - 20000', 'dataMax + 20000']}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="portfolio"
              name="Portfolio"
              stroke="#10b981"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#portfolioGradient)"
            />

            {showBenchmark && (
              <Area
                type="monotone"
                dataKey="benchmark"
                name="Benchmark"
                stroke="#94a3b8"
                strokeDasharray="4 4"
                strokeWidth={1.5}
                fillOpacity={1}
                fill="url(#benchmarkGradient)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
