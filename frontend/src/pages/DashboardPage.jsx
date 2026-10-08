import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Clock,
  Sparkles,
  ChevronRight,
  Plus,
  Compass,
  Target,
  Bookmark,
  Receipt,
  HelpCircle,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { financeApi } from '../services/api';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/StatCard';
import { MetricBadge } from '../components/MetricBadge';
import { PortfolioPerformanceChart } from '../charts/PortfolioPerformanceChart';
import { AssetAllocationChart } from '../charts/AssetAllocationChart';
import { formatINR, formatPercentage, formatDate } from '../utils/formatters';

export const DashboardPage = () => {
  const { setIsAddTransactionOpen } = useApp();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [performance, setPerformance] = useState([]);
  const [allocation, setAllocation] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [sips, setSips] = useState([]);
  const [goals, setGoals] = useState([]);
  const [insights, setInsights] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          summaryData,
          perfData,
          allocData,
          wlData,
          stocksData,
          txData,
          sipsData,
          goalsData,
          insightsData,
          newsData
        ] = await Promise.all([
          financeApi.getDashboardSummary(),
          financeApi.getPortfolioPerformance(),
          financeApi.getAssetAllocation(),
          financeApi.getWatchlist(),
          financeApi.getStocks(),
          financeApi.getTransactions(),
          financeApi.getSips(),
          financeApi.getGoals(),
          financeApi.getAiInsights(),
          financeApi.getNews()
        ]);

        setSummary(summaryData);
        setPerformance(perfData);
        setAllocation(allocData);
        setWatchlist(wlData);
        setStocks(stocksData);
        setTransactions(txData);
        setSips(sipsData);
        setGoals(goalsData);
        setInsights(insightsData);
        setNews(newsData);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !summary) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-semibold text-slate-500">Loading your portfolio dashboard...</p>
        </div>
      </div>
    );
  }

  const topGainers = stocks.filter((s) => s.isGainer).slice(0, 3);
  const topLosers = stocks.filter((s) => !s.isGainer).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Financial Overview
            </h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
              Demo Data
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time simulation of holdings, daily P&L, SIP commitments and assets
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAddTransactionOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Plus size={15} />
            <span>Record Transaction</span>
          </button>
          <Link
            to="/portfolio"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold shadow-xs transition-colors"
          >
            <span>Detailed Portfolio</span>
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      {/* TOP SECTION: 4 KPI CARDS (Section 6 Requirement) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Portfolio Value"
          value={formatINR(summary.portfolioValue)}
          subValue={`Cash in Broking Account: ${formatINR(summary.cashBalance)}`}
          changePercent={summary.todaysChangePercentage}
          change={formatINR(summary.todaysChange)}
          changeLabel="Today's Gain"
          icon={Wallet}
          iconColor="text-blue-600 bg-blue-50"
        />

        <StatCard
          title="Invested Amount"
          value={formatINR(summary.investedAmount)}
          subValue={`${summary.activeSipsCount} Active Systematic Plans`}
          badgeText="Principal Invested"
          changeLabel={`Monthly SIP: ${formatINR(summary.monthlySipAmount)}`}
          icon={TrendingUp}
          iconColor="text-indigo-600 bg-indigo-50"
        />

        <StatCard
          title="Total Profit / Loss"
          value={formatINR(summary.totalReturns)}
          subValue="Unrealized + Realized Capital Gains"
          changePercent={summary.totalReturnsPercentage}
          change={`XIRR: ${summary.xirr}%`}
          changeLabel="Annualized Return"
          icon={TrendingUp}
          iconColor="text-emerald-600 bg-emerald-50"
        />

        <StatCard
          title="Today's Change"
          value={formatINR(summary.todaysChange)}
          subValue="Change from yesterday close"
          changePercent={summary.todaysChangePercentage}
          changeLabel="1D Movement"
          icon={TrendingUp}
          iconColor="text-teal-600 bg-teal-50"
        />
      </div>

      {/* CHARTS ROW: Performance & Asset Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PortfolioPerformanceChart data={performance} />
        </div>
        <div className="lg:col-span-1">
          <AssetAllocationChart data={allocation} />
        </div>
      </div>

      {/* AI INSIGHTS NOTIFICATION CALLOUT */}
      <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300">
                AI Portfolio Health Intelligence
              </h3>
              <p className="text-[11px] text-slate-400">
                Automated risk, diversification, and tax efficiency observations
              </p>
            </div>
          </div>
          <Link
            to="/ai-assistant"
            className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1"
          >
            <span>Ask Financial AI</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className="bg-slate-800/80 p-3.5 rounded-lg border border-slate-700/80 space-y-1.5"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-300">{insight.title}</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-700 text-slate-300">
                  {insight.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{insight.message}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ROW 3: Top Market Movers & Watchlist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Market Movers */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Top Market Movers</h3>
              <p className="text-xs text-slate-500">NIFTY 50 active gainers & losers</p>
            </div>
            <Link
              to="/markets?tab=stocks"
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>View All Stocks</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Gainers */}
            <div className="space-y-2.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
                <ArrowUpRight size={14} /> Top Gainers
              </div>
              {topGainers.map((stk) => (
                <div
                  key={stk.symbol}
                  className="p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100 flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-xs text-slate-900">{stk.symbol}</div>
                    <div className="text-[11px] text-slate-500 truncate max-w-[120px]">{stk.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs font-semibold text-slate-900">
                      {formatINR(stk.price)}
                    </div>
                    <MetricBadge value={stk.changePercent} size="sm" />
                  </div>
                </div>
              ))}
            </div>

            {/* Losers */}
            <div className="space-y-2.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1">
                <ArrowDownRight size={14} /> Top Losers
              </div>
              {topLosers.map((stk) => (
                <div
                  key={stk.symbol}
                  className="p-2.5 rounded-lg bg-rose-50/50 border border-rose-100 flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-xs text-slate-900">{stk.symbol}</div>
                    <div className="text-[11px] text-slate-500 truncate max-w-[120px]">{stk.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs font-semibold text-slate-900">
                      {formatINR(stk.price)}
                    </div>
                    <MetricBadge value={stk.changePercent} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Watchlist Snippet */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Watchlist</h3>
              <p className="text-xs text-slate-500">Tracked assets & alert thresholds</p>
            </div>
            <Link
              to="/watchlist"
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>Manage Watchlist</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {watchlist.slice(0, 4).map((item) => (
              <div key={item.id} className="py-2.5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">{item.symbol}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-medium">
                      {item.assetType}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 truncate max-w-xs">{item.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-xs font-bold text-slate-900">
                    {formatINR(item.currentPrice)}
                  </div>
                  <div className="flex items-center justify-end gap-1.5 mt-0.5">
                    <MetricBadge value={item.changePercent} size="sm" />
                    {item.targetHit && (
                      <span className="text-[10px] px-1.5 py-0.2 bg-amber-100 text-amber-800 font-bold rounded">
                        Alert Met
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 4: Recent Transactions, SIP Summary, Financial Goals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900">Recent Transactions</h3>
            <Link to="/transactions" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {transactions.slice(0, 3).map((tx) => (
              <div key={tx.id} className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        tx.type === 'BUY'
                          ? 'bg-blue-100 text-blue-700'
                          : tx.type === 'SIP'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-purple-100 text-purple-700'
                      }`}
                    >
                      {tx.type}
                    </span>
                    <span className="font-bold text-xs text-slate-900 truncate max-w-[120px]">
                      {tx.asset}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    {formatDate(tx.transactionDate)} • {tx.quantity} units
                  </div>
                </div>
                <div className="text-right font-mono text-xs font-bold text-slate-900">
                  {formatINR(tx.totalAmount)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SIP Summary */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900">Active SIP Mandates</h3>
            <Link to="/sip-calculator" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">
              Calculator
            </Link>
          </div>
          <div className="space-y-3">
            {sips.slice(0, 3).map((sip) => (
              <div key={sip.id} className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 truncate max-w-[160px]">
                    {sip.fundName}
                  </span>
                  <span className="font-mono text-xs font-bold text-emerald-700">
                    {formatINR(sip.monthlyAmount)}/mo
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Next: {sip.nextDate}</span>
                  <span className="text-emerald-600 font-medium">Auto-debit Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Goals Progress */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900">Financial Goals</h3>
            <Link to="/goals" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">
              Goal Planner
            </Link>
          </div>
          <div className="space-y-4">
            {goals.slice(0, 3).map((g) => (
              <div key={g.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{g.title}</span>
                  <span className="font-semibold text-slate-700 font-mono">
                    {g.progressPercentage}%
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${g.progressPercentage}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>Saved: {formatINR(g.currentSaved, { compact: true })}</span>
                  <span>Target: {formatINR(g.targetAmount, { compact: true })} ({g.targetYear})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 5: Market News Snapshot */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Market Intelligence & News</h3>
            <p className="text-xs text-slate-500">Curated macroeconomic & policy updates</p>
          </div>
          <Link to="/news" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
            <span>All News</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {news.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-lg bg-slate-50 hover:bg-slate-100/70 border border-slate-200 transition-colors space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                  <span className="font-bold text-slate-700">{item.source}</span>
                  <span>{item.time}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-600 line-clamp-2 mt-1 leading-normal">
                  {item.summary}
                </p>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded w-fit">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
