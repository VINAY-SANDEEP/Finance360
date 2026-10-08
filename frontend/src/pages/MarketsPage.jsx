import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  TrendingUp,
  CircleDollarSign,
  FileSpreadsheet,
  Coins,
  Building2,
  Globe2,
  Plus,
  Bookmark,
  Check,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  DollarSign
} from 'lucide-react';
import { financeApi } from '../services/api';
import { useApp } from '../context/AppContext';
import { DataTable } from '../components/DataTable';
import { MetricBadge } from '../components/MetricBadge';
import { formatINR, formatUSD, formatPercentage, formatNumberIN } from '../utils/formatters';

export const MarketsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'stocks';
  const { toggleWatchlist, isInWatchlist, setIsAddTransactionOpen } = useApp();

  const [stocks, setStocks] = useState([]);
  const [mutualFunds, setMutualFunds] = useState([]);
  const [etfs, setEtfs] = useState([]);
  const [goldData, setGoldData] = useState(null);
  const [reitsInvits, setReitsInvits] = useState(null);
  const [usStocks, setUsStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarkets = async () => {
      setLoading(true);
      try {
        const [stk, mf, etf, gold, reit, us] = await Promise.all([
          financeApi.getStocks(),
          financeApi.getMutualFunds(),
          financeApi.getEtfs(),
          financeApi.getGoldData(),
          financeApi.getReitsAndInvits(),
          financeApi.getUsStocks()
        ]);
        setStocks(stk);
        setMutualFunds(mf);
        setEtfs(etf);
        setGoldData(gold);
        setReitsInvits(reit);
        setUsStocks(us);
      } catch (e) {
        console.error('Error fetching markets:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchMarkets();
  }, []);

  const handleTabChange = (tabId) => {
    setSearchParams({ tab: tabId });
  };

  const tabs = [
    { id: 'stocks', label: 'Stocks (NSE/BSE)', icon: TrendingUp },
    { id: 'mutual-funds', label: 'Mutual Funds', icon: CircleDollarSign },
    { id: 'etfs', label: 'ETFs & Index', icon: FileSpreadsheet },
    { id: 'gold', label: 'Physical Gold & ETFs', icon: Coins },
    { id: 'reits', label: 'REITs & InvITs', icon: Building2 },
    { id: 'us-stocks', label: 'US Equities', icon: Globe2 }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Markets & Asset Discovery
            </h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
              Demo Data
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Institutional-grade explorer for Indian Equities, MFs, ETFs, Gold, REITs and US Tech
          </p>
        </div>

        <button
          onClick={() => setIsAddTransactionOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs self-start sm:self-auto cursor-pointer"
        >
          <Plus size={15} />
          <span>Add to Portfolio</span>
        </button>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-emerald-400' : 'text-slate-400'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT 1: STOCKS */}
      {currentTab === 'stocks' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-500">NIFTY 50 Level</span>
              <div className="text-lg font-bold text-slate-900 mt-0.5 font-mono">25,145.20</div>
              <span className="text-xs font-semibold text-emerald-600">+0.45% Today</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-500">BSE SENSEX</span>
              <div className="text-lg font-bold text-slate-900 mt-0.5 font-mono">82,380.60</div>
              <span className="text-xs font-semibold text-emerald-600">+0.42% Today</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-500">Advances / Declines</span>
              <div className="text-lg font-bold text-slate-900 mt-0.5">34 / 16</div>
              <span className="text-xs text-slate-500">Market Breadth Positive</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-500">Avg Market P/E</span>
              <div className="text-lg font-bold text-slate-900 mt-0.5 font-mono">22.8x</div>
              <span className="text-xs text-slate-500">10Y Median: 21.5x</span>
            </div>
          </div>

          <DataTable
            data={stocks}
            searchPlaceholder="Search company or symbol (e.g. RELIANCE, TCS)..."
            filterCategories={['IT Services', 'Banking & Financials', 'Energy & Petrochemicals', 'FMCG & Diversified']}
            columns={[
              {
                header: 'Company / Symbol',
                key: 'symbol',
                sortable: true,
                render: (row) => (
                  <div>
                    <div className="font-bold text-xs text-slate-900">{row.symbol}</div>
                    <div className="text-[11px] text-slate-500 truncate max-w-[180px]">{row.name}</div>
                  </div>
                )
              },
              {
                header: 'Current Price',
                key: 'price',
                sortable: true,
                align: 'right',
                render: (row) => (
                  <div className="font-mono font-bold text-xs text-slate-900">
                    {formatINR(row.price)}
                  </div>
                )
              },
              {
                header: '1D Change',
                key: 'changePercent',
                sortable: true,
                align: 'right',
                render: (row) => <MetricBadge value={row.changePercent} size="sm" />
              },
              {
                header: 'Market Cap',
                key: 'marketCap',
                sortable: true,
                align: 'right',
                render: (row) => <span className="font-mono text-slate-700">{row.marketCap}</span>
              },
              {
                header: 'P/E Ratio',
                key: 'peRatio',
                sortable: true,
                align: 'right',
                render: (row) => <span className="font-mono font-medium">{row.peRatio}x</span>
              },
              {
                header: 'ROE',
                key: 'roe',
                sortable: true,
                align: 'right',
                render: (row) => <span className="font-mono font-medium">{row.roe}%</span>
              },
              {
                header: '52W High / Low',
                key: 'high52',
                align: 'right',
                render: (row) => (
                  <div className="text-[11px] font-mono text-slate-600">
                    <span>{formatINR(row.high52, { decimals: 0 })}</span> /{' '}
                    <span className="text-slate-400">{formatINR(row.low52, { decimals: 0 })}</span>
                  </div>
                )
              },
              {
                header: 'Action',
                align: 'center',
                render: (row) => {
                  const watched = isInWatchlist(row.symbol);
                  return (
                    <button
                      type="button"
                      onClick={() => toggleWatchlist(row)}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        watched
                          ? 'bg-amber-50 text-amber-600 border-amber-200'
                          : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-700'
                      }`}
                      title={watched ? 'Remove from Watchlist' : 'Add to Watchlist'}
                    >
                      <Bookmark size={14} className={watched ? 'fill-amber-500' : ''} />
                    </button>
                  );
                }
              }
            ]}
          />
        </div>
      )}

      {/* TAB CONTENT 2: MUTUAL FUNDS */}
      {currentTab === 'mutual-funds' && (
        <div className="space-y-4">
          <DataTable
            data={mutualFunds}
            searchPlaceholder="Search mutual funds (e.g. Parag Parikh, Quant)..."
            filterCategories={['Flexi Cap', 'Small Cap', 'Large Cap', 'Mid Cap', 'ELSS', 'Index Fund', 'Hybrid']}
            columns={[
              {
                header: 'Scheme Name / AMC',
                key: 'name',
                sortable: true,
                render: (row) => (
                  <div>
                    <div className="font-bold text-xs text-slate-900">{row.name}</div>
                    <div className="text-[11px] text-slate-500">{row.amc} • <span className="text-emerald-700 font-medium">{row.category}</span></div>
                  </div>
                )
              },
              {
                header: 'NAV (₹)',
                key: 'nav',
                sortable: true,
                align: 'right',
                render: (row) => <span className="font-mono font-bold text-xs">{formatINR(row.nav)}</span>
              },
              {
                header: 'AUM',
                key: 'aum',
                sortable: true,
                align: 'right',
                render: (row) => <span className="font-mono text-slate-700">{row.aum}</span>
              },
              {
                header: 'Expense Ratio',
                key: 'expenseRatio',
                sortable: true,
                align: 'right',
                render: (row) => (
                  <span className="font-mono text-xs font-semibold text-emerald-700">
                    {row.expenseRatio}%
                  </span>
                )
              },
              {
                header: '1Y Return',
                key: 'return1Y',
                sortable: true,
                align: 'right',
                render: (row) => <MetricBadge value={row.return1Y} size="sm" />
              },
              {
                header: '3Y Return (CAGR)',
                key: 'return3Y',
                sortable: true,
                align: 'right',
                render: (row) => <MetricBadge value={row.return3Y} size="sm" />
              },
              {
                header: 'Risk Level',
                key: 'risk',
                align: 'center',
                render: (row) => (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    row.risk === 'Very High'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : row.risk === 'High'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {row.risk}
                  </span>
                )
              }
            ]}
          />
        </div>
      )}

      {/* TAB CONTENT 3: ETFs */}
      {currentTab === 'etfs' && (
        <div className="space-y-4">
          <DataTable
            data={etfs}
            searchPlaceholder="Search ETFs (e.g. NIFTYBEES, GOLDBEES)..."
            filterCategories={['Equity ETFs', 'Gold ETFs', 'Silver ETFs', 'Bond ETFs', 'International ETFs']}
            columns={[
              {
                header: 'ETF Symbol & Name',
                key: 'symbol',
                sortable: true,
                render: (row) => (
                  <div>
                    <div className="font-bold text-xs text-slate-900">{row.symbol}</div>
                    <div className="text-[11px] text-slate-500">{row.name}</div>
                  </div>
                )
              },
              {
                header: 'Price (₹)',
                key: 'price',
                sortable: true,
                align: 'right',
                render: (row) => <span className="font-mono font-bold text-xs">{formatINR(row.price)}</span>
              },
              {
                header: 'AUM',
                key: 'aum',
                sortable: true,
                align: 'right',
                render: (row) => <span className="font-mono text-slate-700">{row.aum}</span>
              },
              {
                header: 'Expense Ratio',
                key: 'expenseRatio',
                sortable: true,
                align: 'right',
                render: (row) => <span className="font-mono font-semibold text-emerald-700">{row.expenseRatio}%</span>
              },
              {
                header: 'Tracking Error',
                key: 'trackingError',
                align: 'right',
                render: (row) => <span className="font-mono text-slate-600">{row.trackingError}</span>
              },
              {
                header: 'Underlying Index',
                key: 'underlyingIndex',
                render: (row) => <span className="text-slate-600 text-[11px]">{row.underlyingIndex}</span>
              },
              {
                header: '1Y Return',
                key: 'return1Y',
                sortable: true,
                align: 'right',
                render: (row) => <MetricBadge value={row.return1Y} size="sm" />
              }
            ]}
          />
        </div>
      )}

      {/* TAB CONTENT 4: GOLD */}
      {currentTab === 'gold' && goldData && (
        <div className="space-y-6">
          {/* Gold prices row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-amber-500/10 border border-amber-300 p-5 rounded-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                24K Gold Rate (99.9% Pure)
              </span>
              <div className="text-2xl font-bold text-amber-950 font-mono mt-1">
                {formatINR(goldData.price10g24k)} <span className="text-xs font-normal text-amber-800">/ 10 grams</span>
              </div>
              <div className="text-xs text-amber-800 font-semibold mt-1">
                Per gram: {formatINR(goldData.price24kPerGram)}
              </div>
            </div>

            <div className="bg-amber-500/5 border border-amber-200 p-5 rounded-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                22K Gold Rate (Jewellery standard)
              </span>
              <div className="text-2xl font-bold text-amber-950 font-mono mt-1">
                {formatINR(goldData.price22kPerGram * 10)} <span className="text-xs font-normal text-amber-800">/ 10 grams</span>
              </div>
              <div className="text-xs text-amber-800 font-semibold mt-1">
                Per gram: {formatINR(goldData.price22kPerGram)}
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Day's Movement
              </span>
              <div className="text-2xl font-bold text-emerald-600 font-mono mt-1">
                +{formatINR(goldData.dailyChange)}
              </div>
              <MetricBadge value={goldData.dailyChangePercent} size="sm" className="mt-1" />
            </div>
          </div>

          {/* Historical comparison table */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900">
              Gold vs NIFTY 50 vs Active Mutual Funds (Annual Return Comparison)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Calendar Year</th>
                    <th className="p-3 text-right">Physical Gold Return</th>
                    <th className="p-3 text-right">NIFTY 50 Index Return</th>
                    <th className="p-3 text-right">Top Mutual Fund Average</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {goldData.historicalPerformance.map((row) => (
                    <tr key={row.year} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900 font-sans">{row.year}</td>
                      <td className="p-3 text-right text-amber-700 font-semibold">+{row.goldReturn}%</td>
                      <td className="p-3 text-right text-blue-700 font-semibold">+{row.niftyReturn}%</td>
                      <td className="p-3 text-right text-emerald-700 font-semibold">+{row.mfAverage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: REITS & INVITS */}
      {currentTab === 'reits' && reitsInvits && (
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Real Estate Investment Trusts (REITs)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {reitsInvits.reits.map((r) => (
                <div key={r.symbol} className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{r.symbol}</span>
                    <span className="text-xs font-mono font-bold text-slate-900">{formatINR(r.price)}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">{r.name}</div>
                  <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Yield:</span>
                      <span className="font-bold text-emerald-700 font-mono">{r.distributionYield}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Occupancy:</span>
                      <span className="font-semibold text-slate-800">{r.occupancy}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 pt-1">{r.assetType}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Infrastructure Investment Trusts (InvITs)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reitsInvits.invits.map((inv) => (
                <div key={inv.symbol} className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{inv.symbol}</span>
                    <span className="text-xs font-mono font-bold text-slate-900">{formatINR(inv.price)}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">{inv.name}</div>
                  <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Distribution Yield:</span>
                      <span className="font-bold text-emerald-700 font-mono">{inv.yield}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Annual Payout:</span>
                      <span className="font-semibold text-slate-800">{inv.distribution}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 pt-1">{inv.assetInformation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 6: US STOCKS */}
      {currentTab === 'us-stocks' && (
        <div className="space-y-4">
          <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Info size={16} className="text-blue-600 shrink-0" />
              <span className="text-blue-900">
                US Equities denominated in USD. Converted automatically to INR at current rate of <strong>₹86.40 / USD</strong>.
              </span>
            </div>
          </div>

          <DataTable
            data={usStocks}
            searchPlaceholder="Search US tech stocks (e.g. AAPL, NVDA)..."
            columns={[
              {
                header: 'Company / Symbol',
                key: 'symbol',
                sortable: true,
                render: (row) => (
                  <div>
                    <div className="font-bold text-xs text-slate-900">{row.symbol}</div>
                    <div className="text-[11px] text-slate-500">{row.name}</div>
                  </div>
                )
              },
              {
                header: 'Price (USD)',
                key: 'usdPrice',
                sortable: true,
                align: 'right',
                render: (row) => <span className="font-mono font-bold text-xs">{formatUSD(row.usdPrice)}</span>
              },
              {
                header: 'INR Equivalent (₹)',
                key: 'inrEquivalent',
                sortable: true,
                align: 'right',
                render: (row) => <span className="font-mono font-bold text-emerald-700">{formatINR(row.inrEquivalent)}</span>
              },
              {
                header: 'Market Cap',
                key: 'marketCap',
                align: 'right',
                render: (row) => <span className="font-mono text-slate-700">{row.marketCap}</span>
              },
              {
                header: 'P/E',
                key: 'peRatio',
                sortable: true,
                align: 'right',
                render: (row) => <span className="font-mono">{row.peRatio}x</span>
              },
              {
                header: '1D Change',
                key: 'changePercent',
                sortable: true,
                align: 'right',
                render: (row) => <MetricBadge value={row.changePercent} size="sm" />
              }
            ]}
          />
        </div>
      )}
    </div>
  );
};
