import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { formatINR } from '../utils/formatters';

export const AssetAllocationChart = ({ data }) => {
  const totalValue = data.reduce((acc, curr) => acc + curr.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-2.5 rounded-lg shadow-xl border border-slate-700 text-xs">
          <div className="font-semibold text-slate-200">{item.name}</div>
          <div className="text-emerald-400 font-mono font-bold mt-0.5">
            {formatINR(item.value)} ({item.percentage}%)
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
      <div className="mb-2">
        <h3 className="text-sm font-bold text-slate-900">Asset Allocation</h3>
        <p className="text-xs text-slate-500">Distribution across asset classes</p>
      </div>

      <div className="h-52 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={data}
              innerRadius={55}
              outerRadius={78}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total</span>
          <span className="text-xs font-bold text-slate-900 font-mono">
            {formatINR(totalValue, { compact: true })}
          </span>
        </div>
      </div>

      {/* Custom Legend */}
      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-xs">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-slate-600">
            <div className="flex items-center gap-1.5 truncate">
              <span
                className="w-2.5 h-2.5 rounded-xs shrink-0"
                style={{ backgroundColor: item.color }}
              ></span>
              <span className="truncate text-[11px]">{item.name}</span>
            </div>
            <span className="font-semibold text-slate-900 text-[11px] ml-1">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
