import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  PieChart,
  Calculator,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Coins,
  Building2,
  Globe2,
  FileSpreadsheet,
  Target,
  WalletCards,
  Bot,
  Lock,
  BarChart3,
  ChevronRight
} from 'lucide-react';
import { mockDashboardSummary, mockMarketIndices } from '../services/mockDataService';
import { formatINR, formatNumberIN } from '../utils/formatters';

export const LandingPage = () => {
  return (
    <div className="bg-slate-50 text-slate-900">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Fintech Platform for Indian Investors & Wealth Builders
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            One Place for Your Complete Financial Life
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Track investments, explore markets, plan your goals, and understand your money — all from one intelligent platform.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Finance360</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-xs transition-colors flex items-center justify-center"
            >
              View Dashboard
            </Link>
          </div>

          {/* Security guarantee line */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-emerald-600" /> Direct Mutual Funds
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-emerald-600" /> Multi-Asset Tracking
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-emerald-600" /> Bank-Grade Privacy
            </span>
          </div>
        </div>

        {/* Live Demo Dashboard Preview Card */}
        <div className="mt-14 max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden">
          <div className="bg-slate-900 text-slate-300 px-5 py-3 border-b border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <span className="font-mono text-slate-400 text-[11px]">finance360.internal/dashboard</span>
            </div>
            <span className="text-[11px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-mono">
              Live Mock Session
            </span>
          </div>

          <div className="p-6 bg-slate-50/50 space-y-6">
            {/* Top 4 KPI metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Portfolio Value
                </span>
                <div className="text-2xl font-bold text-slate-900 mt-1">₹8,45,620</div>
                <span className="text-xs text-emerald-600 font-semibold mt-1 inline-block">
                  +17.45% Overall
                </span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Invested Amount
                </span>
                <div className="text-2xl font-bold text-slate-900 mt-1">₹7,20,000</div>
                <span className="text-xs text-slate-500 mt-1 inline-block">4 Active SIPs</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Total Profit/Loss
                </span>
                <div className="text-2xl font-bold text-emerald-600 mt-1">+₹1,25,620</div>
                <span className="text-xs text-emerald-600 font-semibold mt-1 inline-block">
                  +18.2% XIRR
                </span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Today's Gain
                </span>
                <div className="text-2xl font-bold text-emerald-600 mt-1">+₹4,250</div>
                <span className="text-xs text-emerald-600 font-semibold mt-1 inline-block">
                  +0.51% 1D
                </span>
              </div>
            </div>

            {/* Quick interactive banner inside preview */}
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-600 text-white shrink-0">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-950">
                    AI Portfolio Optimization Insight
                  </h4>
                  <p className="text-emerald-800 text-[11px]">
                    Your equity ratio is well-balanced across Nifty 50 and Direct Flexi Cap funds.
                  </p>
                </div>
              </div>
              <Link
                to="/dashboard"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shrink-0 shadow-xs"
              >
                Open Full Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SUPPORTED ASSET CLASSES */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              One Portfolio, All Indian & Global Asset Classes
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              No more juggling between five different brokerage apps. Aggregate and analyze everything together.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { title: 'Indian Equities', sub: 'NSE & BSE Stocks', icon: TrendingUp, color: 'text-blue-600 bg-blue-50' },
              { title: 'Mutual Funds', sub: 'Direct Growth Plans', icon: PieChart, color: 'text-emerald-600 bg-emerald-50' },
              { title: 'ETFs & Index', sub: 'Nifty, Gold, Debt', icon: FileSpreadsheet, color: 'text-purple-600 bg-purple-50' },
              { title: 'Physical Gold', sub: '24K / 22K & Gold ETF', icon: Coins, color: 'text-amber-600 bg-amber-50' },
              { title: 'REITs & InvITs', sub: 'Yielding Commercial Real Estate', icon: Building2, color: 'text-pink-600 bg-pink-50' },
              { title: 'US Stocks', sub: 'Apple, Nvidia, Microsoft', icon: Globe2, color: 'text-cyan-600 bg-cyan-50' }
            ].map((asset, i) => {
              const Icon = asset.icon;
              return (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all text-center flex flex-col items-center justify-center space-y-2"
                >
                  <div className={`p-3 rounded-xl ${asset.color}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{asset.title}</h3>
                    <p className="text-[10px] text-slate-500 mt-0.5">{asset.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. PLATFORM CAPABILITIES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
            Institutional Quality Features
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
            Engineered for Serious Wealth Creation
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Combining smart tools, real-time analytics, and automated calculations to give you clarity over every rupee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all space-y-4">
            <div className="p-3 w-fit rounded-xl bg-blue-50 text-blue-600">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-base font-bold text-slate-900">Portfolio & Asset Allocation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Real-time weighted allocation across equity, debt, gold, and real estate. Track XIRR returns, capital gains, dividend yields, and benchmark against NIFTY 50.
            </p>
            <Link
              to="/portfolio"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>Explore Portfolio Module</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all space-y-4">
            <div className="p-3 w-fit rounded-xl bg-emerald-50 text-emerald-600">
              <Calculator size={24} />
            </div>
            <h3 className="text-base font-bold text-slate-900">Step-Up SIP & Goal Planning</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Calculate the true compounding potential of annual step-up SIPs. Map your investments directly to long-term goals like home ownership, retirement, and child education.
            </p>
            <Link
              to="/sip-calculator"
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>Calculate SIP Compounding</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all space-y-4">
            <div className="p-3 w-fit rounded-xl bg-purple-50 text-purple-600">
              <Bot size={24} />
            </div>
            <h3 className="text-base font-bold text-slate-900">AI Financial Intelligence</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ask deep questions about financial concepts, P/E ratios, mutual fund classifications, tax efficiency, and portfolio diversification with contextual explanations.
            </p>
            <Link
              to="/ai-assistant"
              className="text-xs font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1"
            >
              <span>Meet AI Assistant</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. SECURITY & PRIVACY */}
      <section className="py-16 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-emerald-400 text-xs font-semibold border border-slate-700">
                <Lock size={12} />
                Strict Privacy First
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight">
                Your Financial Privacy is Non-Negotiable
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Finance360 is built with security-first architecture. All passwords use bcrypt hashing, all communications are encrypted over TLS, and financial calculations are performed with verifiable formulas.
              </p>
              <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-medium text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                  <span>JWT Protected Routes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                  <span>Configurable Tax Modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                  <span>No Third-Party Ad Trackers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                  <span>Local Mock & Live API Modes</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/80 p-8 rounded-2xl border border-slate-700 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/20">
                <ShieldCheck size={36} />
              </div>
              <h3 className="text-lg font-bold">Ready to Experience Finance360?</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Explore the complete demo application with pre-configured Indian portfolios, market explorers, and calculators.
              </p>
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                Launch Interactive Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
