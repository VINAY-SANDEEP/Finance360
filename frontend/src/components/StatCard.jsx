import React from 'react';
import { MetricBadge } from './MetricBadge';

export const StatCard = ({
  title,
  value,
  subValue,
  change,
  changePercent,
  changeLabel,
  icon: Icon,
  iconColor = 'text-blue-600 bg-blue-50',
  badgeText,
  className = ''
}) => {
  return (
    <div
      className={`bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        {Icon && (
          <div className={`p-2 rounded-lg ${iconColor} shrink-0`}>
            <Icon size={18} />
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="text-2xl font-bold tracking-tight text-slate-900">
          {value}
        </div>

        {subValue && (
          <div className="text-xs text-slate-500 font-medium">
            {subValue}
          </div>
        )}
      </div>

      {(changePercent !== undefined || change !== undefined || badgeText) && (
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {changePercent !== undefined && (
              <MetricBadge value={changePercent} isPercent={true} size="sm" />
            )}
            {change && (
              <span className={`font-medium ${change.startsWith('+') ? 'text-emerald-700' : change.startsWith('-') ? 'text-rose-700' : 'text-slate-600'}`}>
                {change}
              </span>
            )}
          </div>
          {changeLabel && (
            <span className="text-slate-400 font-normal truncate">
              {changeLabel}
            </span>
          )}
          {badgeText && (
            <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
              {badgeText}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
