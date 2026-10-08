import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  CircleDollarSign,
  PieChart,
  Calculator,
  Compass,
  SlidersHorizontal,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Layers,
  FileSpreadsheet,
  Coins,
  Building2,
  Globe2,
  Bookmark,
  Receipt,
  Target,
  WalletCards,
  HeartPulse,
  ReceiptCent,
  GitCompare,
  Newspaper,
  Bot,
  UserCheck
} from 'lucide-react';

export const navigationSections = [
  {
    title: 'Core',
    items: [
      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard }
    ]
  },
  {
    title: 'Markets',
    icon: TrendingUp,
    id: 'markets',
    items: [
      { name: 'All Markets', path: '/markets', icon: TrendingUp },
      { name: 'Stocks (NSE/BSE)', path: '/markets?tab=stocks', icon: Layers },
      { name: 'Mutual Funds', path: '/markets?tab=mutual-funds', icon: CircleDollarSign },
      { name: 'ETFs & Index', path: '/markets?tab=etfs', icon: FileSpreadsheet },
      { name: 'Gold & Silver', path: '/markets?tab=gold', icon: Coins },
      { name: 'REITs & InvITs', path: '/markets?tab=reits', icon: Building2 },
      { name: 'US Stocks', path: '/markets?tab=us-stocks', icon: Globe2 }
    ]
  },
  {
    title: 'My Money',
    icon: PieChart,
    id: 'my-money',
    items: [
      { name: 'Portfolio', path: '/portfolio', icon: PieChart },
      { name: 'Watchlist', path: '/watchlist', icon: Bookmark },
      { name: 'Transactions', path: '/transactions', icon: Receipt },
      { name: 'Asset Allocation', path: '/asset-allocation', icon: Layers }
    ]
  },
  {
    title: 'Planning',
    icon: Calculator,
    id: 'planning',
    items: [
      { name: 'SIP Calculator', path: '/sip-calculator', icon: Calculator },
      { name: 'Goal Planner', path: '/goals', icon: Target },
      { name: 'Expense Tracker', path: '/expenses', icon: WalletCards },
      { name: 'Financial Health', path: '/financial-health', icon: HeartPulse },
      { name: 'Tax Planner (IN)', path: '/tax-planner', icon: ReceiptCent }
    ]
  },
  {
    title: 'Tools & Intelligence',
    icon: Compass,
    id: 'tools',
    items: [
      { name: 'Comparison Engine', path: '/compare', icon: GitCompare },
      { name: 'Market News', path: '/news', icon: Newspaper },
      { name: 'AI Finance Assistant', path: '/ai-assistant', icon: Bot, isAi: true }
    ]
  },
  {
    title: 'Settings',
    items: [
      { name: 'Profile & Security', path: '/settings', icon: UserCheck }
    ]
  }
];

export const Sidebar = () => {
  const location = useLocation();
  const [collapsedGroups, setCollapsedGroups] = useState({});

  const toggleGroup = (id) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const isActive = (path) => {
    if (path.includes('?')) {
      return location.pathname + location.search === path;
    }
    return location.pathname === path;
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 h-full flex flex-col border-r border-slate-800 select-none">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">
            Navigation
          </span>
        </div>
        <span className="text-[10px] bg-slate-800 text-emerald-400 font-mono px-2 py-0.5 rounded border border-slate-700">
          v1.0-Phase1
        </span>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs scrollbar-none">
        {navigationSections.map((section, idx) => {
          if (!section.id) {
            // Direct items without collapsible header
            return (
              <div key={idx} className="space-y-1">
                {section.items.map((item) => {
                  const active = isActive(item.path);
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                        active
                          ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                          : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                      }`}
                    >
                      <Icon size={16} className={active ? 'text-white' : 'text-slate-400'} />
                      <span className="flex-1">{item.name}</span>
                    </NavLink>
                  );
                })}
              </div>
            );
          }

          const isCollapsed = collapsedGroups[section.id];
          const GroupIcon = section.icon;

          return (
            <div key={section.id} className="space-y-1">
              <button
                type="button"
                onClick={() => toggleGroup(section.id)}
                className="w-full flex items-center justify-between px-3 py-1.5 text-slate-400 hover:text-slate-200 uppercase tracking-wider text-[11px] font-semibold cursor-pointer transition-colors"
              >
                <span className="flex items-center gap-2">
                  <GroupIcon size={13} className="text-slate-400" />
                  {section.title}
                </span>
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
              </button>

              {!isCollapsed && (
                <div className="space-y-0.5 pl-2">
                  {section.items.map((item) => {
                    const active = isActive(item.path);
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors text-xs font-medium ${
                          active
                            ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                            : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                        }`}
                      >
                        <Icon
                          size={15}
                          className={active ? 'text-white' : item.isAi ? 'text-purple-400' : 'text-slate-400'}
                        />
                        <span className="flex-1 truncate">{item.name}</span>
                        {item.isAi && (
                          <span className="text-[9px] uppercase tracking-wider font-bold bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/30">
                            AI
                          </span>
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sidebar Footer info */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/60 text-[11px] text-slate-400">
        <div className="flex items-center gap-2 mb-1 text-slate-300 font-medium">
          <ShieldCheck size={14} className="text-emerald-400" />
          <span>Fintech Grade Security</span>
        </div>
        <p className="text-[10px] text-slate-500 leading-normal">
          Portfolio data simulated locally. Ready for live REST API connectivity.
        </p>
      </div>
    </aside>
  );
};
