import React from 'react';
import { AlertCircle, Info, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DemoBanner = () => {
  const { isDemoMode } = useApp();

  if (!isDemoMode) return null;

  return (
    <div className="bg-amber-50/90 border-b border-amber-200/80 px-4 py-2 text-xs text-amber-900 flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-2 font-medium">
        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-amber-200 text-amber-900 border border-amber-300">
          Demo Mode
        </span>
        <span className="flex items-center gap-1">
          <Info size={14} className="text-amber-700 shrink-0" />
          <span>
            Simulated Indian Market & Portfolio Data. No live broker or exchange connection is required.
          </span>
        </span>
      </div>

      <div className="flex items-center gap-3 text-[11px] text-amber-800">
        <span className="hidden sm:inline">NIFTY 50 • Direct MFs • Indian Equities • ETFs</span>
        <span className="bg-white/80 px-2 py-0.5 rounded border border-amber-200 font-medium">
          Phase 1 Architecture Ready
        </span>
      </div>
    </div>
  );
};
