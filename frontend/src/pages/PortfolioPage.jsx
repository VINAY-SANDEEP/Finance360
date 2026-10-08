import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Plus,
  Trash2,
  Edit2,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Percent,
  Layers,
  Sparkles
} from 'lucide-react';
import { financeApi } from '../services/api';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/StatCard';
import { MetricBadge } from '../components/MetricBadge';
import { DataTable } from '../components/DataTable';
import { AssetAllocationChart } from '../charts/AssetAllocationChart';
import { formatINR, formatPercentage } from '../utils/formatters';

export const PortfolioPage = () => {
  const { setIsAddTransactionOpen } = useApp();
  const [holdings, setHoldings] = useState([]);
  const [allocation, setAllocation] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      setLoading(true);
      try {
        const [hData, aData, sData, sumData] = await Promise.all([
          financeApi.getHoldings(),
          financeApi.getAssetAllocation(),
          financeApi.getSectorAllocation(),
          financeApi.getDashboardSummary()
        ]);
        setHoldings(hData);
        setAllocation(aData);
        setSectors(sData);
        setSummary(sumData);
      } catch (err) {
        console.error('Error fetching portfolio:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  const handleDeleteHolding = (id) => {
    setHoldings((prev) => prev.filter((h) => h.id !== id));
  };

  if (loading || !summary) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Find best and worst performer
  const sortedByPnl = [...holdings].sort((a, b) => b.pnlPercentage - a.pnlPercentage);
  const bestPerformer = sortedByPnl[0];
  const worstPerformer = sortedByPnl[sortedByPnl.length - 1];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Portfolio Holdings & Analytics
            </h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
              Demo Data
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Holistic view of all consolidated assets, XIRR returns, and sector weightages
          </p>
        </div>

        <button
          onClick={() => setIsAddTransactionOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs self-start sm:self-auto cursor-pointer"
        >
          <Plus size={15} />
          <span>Add Holding</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Current Value"
          value={formatINR(summary.portfolioValue)}
          changePercent={summary.todaysChangePercentage}
          changeLabel="1D P&L"
          icon={Wallet}
        />
        <StatCard
          title="Invested Capital"
          value={formatINR(summary.investedAmount)}
          badgeText="Total Cost"
          icon={TrendingUp}
          iconColor="text-indigo-600 bg-indigo-50"
        />
        <StatCard
          title="Total Profit / Loss"
          value={formatINR(summary.totalReturns)}
          changePercent={summary.totalReturnsPercentage}
          changeLabel="Absolute Return"
          icon={TrendingUp}
          iconColor="text-emerald-600 bg-emerald-50"
        />
        <StatCard
          title="Annualized Return"
          value={`${summary.xirr}%`}
          badgeText="XIRR"
          subValue="Compounded Annual Growth"
          icon={Percent}
          iconColor="text-purple-600 bg-purple-50"
        />
        <StatCard
          title="Best Performer"
          value={bestPerformer ? bestPerformer.symbol : '-'}
          subValue={bestPerformer ? formatINR(bestPerformer.pnl) : ''}
          changePercent={bestPerformer ? bestPerformer.pnlPercentage : 0}
          changeLabel="Return"
          icon={Sparkles}
          iconColor="text-amber-600 bg-amber-50"
        />
      </div>

      {/* Breakdown Row: Allocation & Sectors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AssetAllocationChart data={allocation} />

        {/* Sector Allocation Breakdown */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Sector & Industry Weights</h3>
            <p className="text-xs text-slate-500 mb-4">Concentration risk evaluation across Indian economy</p>
          </div>

          <div className="space-y-3">
            {sectors.map((sec) => (
              <div key={sec.sector} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">{sec.sector}</span>
                  <span className="font-bold text-slate-900 font-mono">{sec.percentage}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${sec.percentage * 2}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Largest Sector: Financial Services (28.5%)</span>
            <span className="text-emerald-600 font-medium">Within prudent &lt; 30% cap</span>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Consolidated Holdings ({holdings.length})</h3>
        </div>

        <DataTable
          data={holdings}
          searchPlaceholder="Search holdings by name or symbol..."
          filterCategories={['Stock', 'Mutual Fund', 'ETF', 'Gold', 'REIT', 'US Stock']}
          categoryKey="assetType"
          columns={[
            {
              header: 'Asset / Symbol',
              key: 'symbol',
              sortable: true,
              render: (row) => (
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-slate-900">{row.symbol}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-medium">
                      {row.assetType}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 truncate max-w-[200px]">{row.name}</div>
                </div>
              )
            },
            {
              header: 'Quantity / Units',
              key: 'shares',
              sortable: true,
              align: 'right',
              render: (row) => (
                <span className="font-mono text-xs text-slate-800">
                  {row.shares || row.units}
                </span>
              )
            },
            {
              header: 'Avg Price',
              key: 'avgBuyPrice',
              sortable: true,
              align: 'right',
              render: (row) => (
                <span className="font-mono text-xs text-slate-600">
                  {row.assetType === 'US Stock' ? `$${row.avgBuyPrice}` : formatINR(row.avgBuyPrice)}
                </span>
              )
            },
            {
              header: 'Current Price / NAV',
              key: 'currentPrice',
              sortable: true,
              align: 'right',
              render: (row) => (
                <span className="font-mono font-bold text-xs text-slate-900">
                  {row.assetType === 'US Stock' ? `$${row.currentPrice}` : formatINR(row.currentPrice)}
                </span>
              )
            },
            {
              header: 'Invested Value',
              key: 'investedValue',
              sortable: true,
              align: 'right',
              render: (row) => <span className="font-mono text-xs">{formatINR(row.investedValue)}</span>
            },
            {
              header: 'Current Value',
              key: 'currentValue',
              sortable: true,
              align: 'right',
              render: (row) => (
                <span className="font-mono font-bold text-xs text-slate-900">
                  {formatINR(row.currentValue)}
                </span>
              )
            },
            {
              header: 'Overall P&L',
              key: 'pnl',
              sortable: true,
              align: 'right',
              render: (row) => (
                <div className="text-right">
                  <div className={`font-mono font-bold text-xs ${row.pnl >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {row.pnl >= 0 ? '+' : ''}{formatINR(row.pnl)}
                  </div>
                  <MetricBadge value={row.pnlPercentage} size="sm" />
                </div>
              )
            },
            {
              header: 'Weight',
              key: 'weight',
              sortable: true,
              align: 'right',
              render: (row) => <span className="font-mono font-medium text-slate-600">{row.weight}%</span>
            },
            {
              header: 'Action',
              align: 'center',
              render: (row) => (
                <div className="flex items-center justify-center gap-1">
                  <button
                    onClick={() => handleDeleteHolding(row.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                    title="Remove holding"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )
            }
          ]}
        />
      </div>
    </div>
  );
};
