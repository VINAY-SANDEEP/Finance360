import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { formatINR } from '../utils/formatters';

export const SipGrowthChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl border border-slate-700 text-xs">
          <div className="font-semibold text-slate-300 mb-1">{label}</div>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400">Total Invested:</span>
              <span className="font-mono text-slate-200">
                {formatINR(payload[0]?.value)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-emerald-400">Estimated Returns:</span>
              <span className="font-mono font-bold text-emerald-400">
                {formatINR(payload[1]?.value)}
              </span>
            </div>
            <div className="pt-1 border-t border-slate-800 flex items-center justify-between gap-4 font-bold">
              <span>Expected Corpus:</span>
              <span className="font-mono text-white">
                {formatINR((payload[0]?.value || 0) + (payload[1]?.value || 0))}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="year"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#64748b' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#64748b' }}
            tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ paddingBottom: 12, fontSize: 12 }}
          />
          <Bar
            dataKey="invested"
            name="Invested Amount"
            stackId="a"
            fill="#94a3b8"
            radius={[0, 0, 4, 4]}
          />
          <Bar
            dataKey="returns"
            name="Estimated Returns"
            stackId="a"
            fill="#10b981"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
