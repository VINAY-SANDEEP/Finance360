import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export const MetricBadge = ({
  value,
  isPercent = true,
  decimals = 2,
  size = 'md',
  showIcon = true,
  className = ''
}) => {
  const num = Number(value);
  const isPositive = num > 0;
  const isNegative = num < 0;
  const isZero = num === 0 || isNaN(num);

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs font-medium px-2.5 py-1',
    lg: 'text-sm font-semibold px-3 py-1.5'
  };

  const colorClasses = isPositive
    ? 'text-emerald-700 bg-emerald-50 border border-emerald-200/60'
    : isNegative
    ? 'text-rose-700 bg-rose-50 border border-rose-200/60'
    : 'text-slate-600 bg-slate-100 border border-slate-200';

  const iconSize = size === 'sm' ? 12 : size === 'lg' ? 16 : 14;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md tracking-tight ${sizeClasses[size]} ${colorClasses} ${className}`}
    >
      {showIcon && (
        <>
          {isPositive && <ArrowUpRight size={iconSize} className="shrink-0" />}
          {isNegative && <ArrowDownRight size={iconSize} className="shrink-0" />}
          {isZero && <Minus size={iconSize} className="shrink-0" />}
        </>
      )}
      <span>
        {isPositive ? '+' : ''}
        {num.toFixed(decimals)}
        {isPercent ? '%' : ''}
      </span>
    </span>
  );
};
