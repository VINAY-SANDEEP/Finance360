/**
 * Comprehensive Mock Data Service for Finance360
 * Clearly labeled as Demo/Mock data.
 * Designed with a clean abstraction so real API clients can replace it seamlessly.
 */

export const USD_TO_INR_RATE = 86.40;

export const mockDashboardSummary = {
  isDemo: true,
  lastUpdated: new Date().toISOString(),
  portfolioValue: 845620,
  investedAmount: 720000,
  totalReturns: 125620,
  totalReturnsPercentage: 17.45,
  todaysChange: 4250,
  todaysChangePercentage: 0.51,
  xirr: 18.2,
  cashBalance: 45000,
  activeSipsCount: 4,
  monthlySipAmount: 25000
};

export const mockMarketIndices = [
  { symbol: 'NIFTY 50', name: 'Nifty 50 Index', price: 25145.20, change: 112.40, changePercent: 0.45, isPositive: true },
  { symbol: 'SENSEX', name: 'BSE Sensex 30', price: 82380.60, change: 345.80, changePercent: 0.42, isPositive: true },
  { symbol: 'NIFTY BANK', name: 'Nifty Bank Index', price: 51890.15, change: -120.30, changePercent: -0.23, isPositive: false },
  { symbol: 'GOLD (10g)', name: 'Gold 24K 999', price: 78450.00, change: 480.00, changePercent: 0.62, isPositive: true },
  { symbol: 'S&P 500', name: 'US S&P 500', price: 5815.20, change: 24.10, changePercent: 0.42, isPositive: true },
  { symbol: 'USD/INR', name: 'US Dollar to INR', price: 86.40, change: -0.05, changePercent: -0.06, isPositive: false }
];

export const mockPortfolioPerformance = [
  { period: 'Jan', portfolio: 720000, benchmark: 720000 },
  { period: 'Feb', portfolio: 735000, benchmark: 728000 },
  { period: 'Mar', portfolio: 748000, benchmark: 736000 },
  { period: 'Apr', portfolio: 765000, benchmark: 752000 },
  { period: 'May', portfolio: 758000, benchmark: 749000 },
  { period: 'Jun', portfolio: 782000, benchmark: 766000 },
  { period: 'Jul', portfolio: 799000, benchmark: 778000 },
  { period: 'Aug', portfolio: 812000, benchmark: 790000 },
  { period: 'Sep', portfolio: 832000, benchmark: 805000 },
  { period: 'Oct', portfolio: 845620, benchmark: 815000 }
];

export const mockAssetAllocation = [
  { name: 'Indian Equities', value: 435000, percentage: 51.4, color: '#2563eb' },
  { name: 'Mutual Funds', value: 215000, percentage: 25.4, color: '#10b981' },
  { name: 'ETFs & Index', value: 85000, percentage: 10.1, color: '#8b5cf6' },
  { name: 'Gold & Commodities', value: 55620, percentage: 6.6, color: '#f59e0b' },
  { name: 'US Equities', value: 35000, percentage: 4.1, color: '#06b6d4' },
  { name: 'REITs & InvITs', value: 20000, percentage: 2.4, color: '#ec4899' }
];

export const mockSectorAllocation = [
  { sector: 'Financial Services', percentage: 28.5 },
  { sector: 'Information Technology', percentage: 21.2 },
  { sector: 'Consumer Goods & Retail', percentage: 14.8 },
  { sector: 'Automobile & Auto Parts', percentage: 11.5 },
  { sector: 'Energy & Utilities', percentage: 9.6 },
  { sector: 'Healthcare & Pharma', percentage: 8.4 },
  { sector: 'Others / Cash', percentage: 6.0 }
];

export const mockHoldings = [
  {
    id: 'hold-1',
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd.',
    assetType: 'Stock',
    category: 'Large Cap',
    shares: 45,
    avgBuyPrice: 2680.00,
    currentPrice: 2985.40,
    investedValue: 120600,
    currentValue: 134343,
    pnl: 13743,
    pnlPercentage: 11.39,
    todaysChange: 1340,
    todaysChangePercent: 1.01,
    weight: 15.89
  },
  {
    id: 'hold-2',
    symbol: 'TCS',
    name: 'Tata Consultancy Services Ltd.',
    assetType: 'Stock',
    category: 'Large Cap',
    shares: 25,
    avgBuyPrice: 3850.00,
    currentPrice: 4210.80,
    investedValue: 96250,
    currentValue: 105270,
    pnl: 9020,
    pnlPercentage: 9.37,
    todaysChange: -420,
    todaysChangePercent: -0.40,
    weight: 12.45
  },
  {
    id: 'hold-3',
    symbol: 'PPFAS-FLEXI',
    name: 'Parag Parikh Flexi Cap Fund - Direct (G)',
    assetType: 'Mutual Fund',
    category: 'Flexi Cap',
    units: 1750.45,
    avgBuyPrice: 72.50,
    currentPrice: 85.20,
    investedValue: 126907,
    currentValue: 149138,
    pnl: 22231,
    pnlPercentage: 17.52,
    todaysChange: 745,
    todaysChangePercent: 0.50,
    weight: 17.64
  },
  {
    id: 'hold-4',
    symbol: 'NIFTYBEES',
    name: 'Nippon India Nifty 50 ETF',
    assetType: 'ETF',
    category: 'Index ETF',
    shares: 320,
    avgBuyPrice: 245.00,
    currentPrice: 278.60,
    investedValue: 78400,
    currentValue: 89152,
    pnl: 10752,
    pnlPercentage: 13.71,
    todaysChange: 410,
    todaysChangePercent: 0.46,
    weight: 10.54
  },
  {
    id: 'hold-5',
    symbol: 'GOLDBEES',
    name: 'Nippon India Gold ETF',
    assetType: 'Gold',
    category: 'Commodity',
    shares: 820,
    avgBuyPrice: 62.00,
    currentPrice: 71.40,
    investedValue: 50840,
    currentValue: 58548,
    pnl: 7708,
    pnlPercentage: 15.16,
    todaysChange: 350,
    todaysChangePercent: 0.60,
    weight: 6.92
  },
  {
    id: 'hold-6',
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Limited',
    assetType: 'Stock',
    category: 'Large Cap',
    shares: 60,
    avgBuyPrice: 1580.00,
    currentPrice: 1715.20,
    investedValue: 94800,
    currentValue: 102912,
    pnl: 8112,
    pnlPercentage: 8.56,
    todaysChange: 680,
    todaysChangePercent: 0.67,
    weight: 12.17
  },
  {
    id: 'hold-7',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    assetType: 'US Stock',
    category: 'Mega Tech',
    shares: 3,
    avgBuyPrice: 195.00, // USD
    currentPrice: 228.50, // USD
    investedValue: 50544, // in INR @ ₹86.40
    currentValue: 59227, // in INR
    pnl: 8683,
    pnlPercentage: 17.18,
    todaysChange: 520,
    todaysChangePercent: 0.89,
    weight: 7.00
  },
  {
    id: 'hold-8',
    symbol: 'EMBASSY',
    name: 'Embassy Office Parks REIT',
    assetType: 'REIT',
    category: 'Commercial Real Estate',
    shares: 250,
    avgBuyPrice: 360.00,
    currentPrice: 395.50,
    investedValue: 90000,
    currentValue: 98875,
    pnl: 8875,
    pnlPercentage: 9.86,
    todaysChange: 220,
    todaysChangePercent: 0.22,
    weight: 11.69
  }
];

export const mockStocks = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd.',
    category: 'Energy & Petrochemicals',
    marketCap: '₹20,18,500 Cr',
    price: 2985.40,
    change: 29.80,
    changePercent: 1.01,
    peRatio: 28.4,
    pbRatio: 2.3,
    eps: 105.1,
    roe: 9.2,
    dividendYield: 0.35,
    high52: 3217.90,
    low52: 2221.05,
    volume: '5.2M',
    isGainer: true,
    isNifty50: true
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    category: 'IT Services',
    marketCap: '₹15,22,400 Cr',
    price: 4210.80,
    change: -16.90,
    changePercent: -0.40,
    peRatio: 31.8,
    pbRatio: 15.2,
    eps: 132.4,
    roe: 48.5,
    dividendYield: 1.32,
    high52: 4592.25,
    low52: 3311.00,
    volume: '2.1M',
    isGainer: false,
    isNifty50: true
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd.',
    category: 'Banking & Financials',
    marketCap: '₹13,05,200 Cr',
    price: 1715.20,
    change: 11.45,
    changePercent: 0.67,
    peRatio: 18.9,
    pbRatio: 2.8,
    eps: 90.75,
    roe: 16.8,
    dividendYield: 1.14,
    high52: 1794.00,
    low52: 1363.55,
    volume: '14.8M',
    isGainer: true,
    isNifty50: true
  },
  {
    symbol: 'INFY',
    name: 'Infosys Limited',
    category: 'IT Services',
    marketCap: '₹7,95,000 Cr',
    price: 1918.60,
    change: 32.10,
    changePercent: 1.70,
    peRatio: 29.5,
    pbRatio: 8.9,
    eps: 65.05,
    roe: 31.4,
    dividendYield: 2.45,
    high52: 1991.45,
    low52: 1358.35,
    volume: '8.4M',
    isGainer: true,
    isNifty50: true
  },
  {
    symbol: 'ICICIBANK',
    name: 'ICICI Bank Ltd.',
    category: 'Banking & Financials',
    marketCap: '₹8,90,400 Cr',
    price: 1268.30,
    change: 18.20,
    changePercent: 1.46,
    peRatio: 18.2,
    pbRatio: 3.1,
    eps: 69.70,
    roe: 18.5,
    dividendYield: 0.85,
    high52: 1325.00,
    low52: 910.15,
    volume: '9.6M',
    isGainer: true,
    isNifty50: true
  },
  {
    symbol: 'TATAMOTORS',
    name: 'Tata Motors Limited',
    category: 'Automotive',
    marketCap: '₹3,45,800 Cr',
    price: 945.75,
    change: -12.40,
    changePercent: -1.30,
    peRatio: 10.8,
    pbRatio: 3.6,
    eps: 87.55,
    roe: 33.2,
    dividendYield: 0.65,
    high52: 1179.05,
    low52: 642.00,
    volume: '11.2M',
    isGainer: false,
    isNifty50: true
  },
  {
    symbol: 'ITC',
    name: 'ITC Limited',
    category: 'FMCG & Diversified',
    marketCap: '₹6,15,900 Cr',
    price: 492.10,
    change: 3.45,
    changePercent: 0.71,
    peRatio: 28.1,
    pbRatio: 8.4,
    eps: 17.50,
    roe: 30.1,
    dividendYield: 2.80,
    high52: 528.55,
    low52: 399.30,
    volume: '7.8M',
    isGainer: true,
    isNifty50: true
  },
  {
    symbol: 'BHARTIARTL',
    name: 'Bharti Airtel Limited',
    category: 'Telecom',
    marketCap: '₹9,80,200 Cr',
    price: 1685.00,
    change: -24.50,
    changePercent: -1.43,
    peRatio: 72.4,
    pbRatio: 9.8,
    eps: 23.25,
    roe: 14.2,
    dividendYield: 0.50,
    high52: 1779.00,
    low52: 901.00,
    volume: '4.5M',
    isGainer: false,
    isNifty50: true
  }
];

export const mockMutualFunds = [
  {
    id: 'mf-1',
    name: 'Parag Parikh Flexi Cap Fund - Direct (G)',
    amc: 'PPFAS Mutual Fund',
    category: 'Flexi Cap',
    nav: 85.20,
    aum: '₹74,500 Cr',
    expenseRatio: 0.63,
    return1Y: 28.4,
    return3Y: 22.8,
    return5Y: 24.1,
    risk: 'Very High',
    rating: 5
  },
  {
    id: 'mf-2',
    name: 'Quant Small Cap Fund - Direct (G)',
    amc: 'Quant Mutual Fund',
    category: 'Small Cap',
    nav: 268.45,
    aum: '₹23,100 Cr',
    expenseRatio: 0.77,
    return1Y: 41.2,
    return3Y: 34.6,
    return5Y: 38.2,
    risk: 'Very High',
    rating: 5
  },
  {
    id: 'mf-3',
    name: 'Mirae Asset Large Cap Fund - Direct (G)',
    amc: 'Mirae Asset Mutual Fund',
    category: 'Large Cap',
    nav: 124.80,
    aum: '₹38,200 Cr',
    expenseRatio: 0.55,
    return1Y: 22.1,
    return3Y: 16.4,
    return5Y: 17.8,
    risk: 'High',
    rating: 4
  },
  {
    id: 'mf-4',
    name: 'Motilal Oswal Midcap Fund - Direct (G)',
    amc: 'Motilal Oswal Mutual Fund',
    category: 'Mid Cap',
    nav: 112.30,
    aum: '₹18,900 Cr',
    expenseRatio: 0.68,
    return1Y: 52.3,
    return3Y: 36.1,
    return5Y: 31.4,
    risk: 'Very High',
    rating: 5
  },
  {
    id: 'mf-5',
    name: 'Mirae Asset ELSS Tax Saver - Direct (G)',
    amc: 'Mirae Asset Mutual Fund',
    category: 'ELSS',
    nav: 44.50,
    aum: '₹22,400 Cr',
    expenseRatio: 0.61,
    return1Y: 27.8,
    return3Y: 20.2,
    return5Y: 21.6,
    risk: 'High',
    rating: 4
  },
  {
    id: 'mf-6',
    name: 'UTI Nifty 50 Index Fund - Direct (G)',
    amc: 'UTI Mutual Fund',
    category: 'Index Fund',
    nav: 172.10,
    aum: '₹19,200 Cr',
    expenseRatio: 0.18,
    return1Y: 24.5,
    return3Y: 16.8,
    return5Y: 18.2,
    risk: 'High',
    rating: 5
  },
  {
    id: 'mf-7',
    name: 'ICICI Prudential Balanced Advantage - Direct (G)',
    amc: 'ICICI Prudential MF',
    category: 'Hybrid',
    nav: 72.80,
    aum: '₹61,000 Cr',
    expenseRatio: 0.88,
    return1Y: 18.6,
    return3Y: 14.5,
    return5Y: 15.3,
    risk: 'Moderate',
    rating: 4
  }
];

export const mockEtfs = [
  {
    symbol: 'NIFTYBEES',
    name: 'Nippon India ETF Nifty 50 BeES',
    category: 'Equity ETFs',
    price: 278.60,
    aum: '₹34,800 Cr',
    expenseRatio: 0.04,
    trackingError: '0.03%',
    volume: '2.8M',
    return1Y: 24.8,
    underlyingIndex: 'Nifty 50 TRI'
  },
  {
    symbol: 'GOLDBEES',
    name: 'Nippon India ETF Gold BeES',
    category: 'Gold ETFs',
    price: 71.40,
    aum: '₹14,500 Cr',
    expenseRatio: 0.79,
    trackingError: '0.12%',
    volume: '3.4M',
    return1Y: 28.5,
    underlyingIndex: 'Domestic Physical Gold'
  },
  {
    symbol: 'JUNIORBEES',
    name: 'Nippon India ETF Nifty Next 50 Junior BeES',
    category: 'Equity ETFs',
    price: 792.20,
    aum: '₹4,900 Cr',
    expenseRatio: 0.15,
    trackingError: '0.08%',
    volume: '420K',
    return1Y: 48.6,
    underlyingIndex: 'Nifty Next 50 TRI'
  },
  {
    symbol: 'SILVERBEES',
    name: 'Nippon India Silver ETF',
    category: 'Silver ETFs',
    price: 94.20,
    aum: '₹3,200 Cr',
    expenseRatio: 0.50,
    trackingError: '0.18%',
    volume: '1.2M',
    return1Y: 34.2,
    underlyingIndex: 'Domestic Silver 999'
  },
  {
    symbol: 'MON100',
    name: 'Motilal Oswal Nasdaq 100 ETF',
    category: 'International ETFs',
    price: 184.50,
    aum: '₹7,100 Cr',
    expenseRatio: 0.58,
    trackingError: '0.24%',
    volume: '850K',
    return1Y: 32.4,
    underlyingIndex: 'Nasdaq 100 Index'
  },
  {
    symbol: 'BHARATBOND',
    name: 'Edelweiss Bharat Bond ETF 2030',
    category: 'Bond ETFs',
    price: 1320.40,
    aum: '₹11,400 Cr',
    expenseRatio: 0.0005,
    trackingError: '0.02%',
    volume: '150K',
    return1Y: 7.8,
    underlyingIndex: 'Nifty BHARAT Bond Index - April 2030'
  }
];

export const mockGoldData = {
  price24kPerGram: 7845,
  price22kPerGram: 7191,
  price10g24k: 78450,
  dailyChange: 480,
  dailyChangePercent: 0.62,
  historicalPerformance: [
    { year: '2020', goldReturn: 28.0, niftyReturn: 14.9, mfAverage: 16.2 },
    { year: '2021', goldReturn: -4.2, niftyReturn: 24.1, mfAverage: 28.5 },
    { year: '2022', goldReturn: 13.8, niftyReturn: 4.3, mfAverage: 5.8 },
    { year: '2023', goldReturn: 15.2, niftyReturn: 20.0, mfAverage: 24.3 },
    { year: '2024', goldReturn: 24.6, niftyReturn: 18.5, mfAverage: 26.8 },
    { year: '2025-26', goldReturn: 28.5, niftyReturn: 16.2, mfAverage: 21.4 }
  ],
  goldEtfs: [
    { name: 'Nippon Gold BeES', aum: '₹14,500 Cr', expenseRatio: '0.79%', return1Y: '28.5%' },
    { name: 'HDFC Gold ETF', aum: '₹6,200 Cr', expenseRatio: '0.55%', return1Y: '28.2%' },
    { name: 'SBI Gold ETF', aum: '₹4,800 Cr', expenseRatio: '0.51%', return1Y: '28.1%' }
  ]
};

export const mockReitsAndInvits = {
  reits: [
    {
      symbol: 'EMBASSY',
      name: 'Embassy Office Parks REIT',
      price: 395.50,
      marketCap: '₹37,450 Cr',
      distributionYield: '6.85%',
      occupancy: '89.4%',
      assetType: 'Grade-A Commercial Offices (Bengaluru, Mumbai, Pune, Noida)',
      return1Y: 18.4
    },
    {
      symbol: 'MINDSPACE',
      name: 'Mindspace Business Parks REIT',
      price: 348.00,
      marketCap: '₹20,600 Cr',
      distributionYield: '6.40%',
      occupancy: '91.2%',
      assetType: 'Commercial IT Parks (Mumbai, Hyderabad, Pune, Chennai)',
      return1Y: 16.2
    },
    {
      symbol: 'BROOKFIELD',
      name: 'Brookfield India Real Estate Trust',
      price: 264.20,
      marketCap: '₹11,900 Cr',
      distributionYield: '7.10%',
      occupancy: '86.5%',
      assetType: 'Commercial Real Estate Portfolio',
      return1Y: 14.8
    }
  ],
  invits: [
    {
      symbol: 'PGINVIT',
      name: 'PowerGrid Infrastructure Investment Trust',
      price: 114.80,
      marketCap: '₹10,400 Cr',
      yield: '10.2%',
      distribution: '₹12.00 / unit/yr',
      assetInformation: 'Power Transmission Lines across India backed by PowerGrid Corp',
      return1Y: 12.5
    },
    {
      symbol: 'IRBINVIT',
      name: 'IRB InvIT Fund',
      price: 68.40,
      marketCap: '₹3,950 Cr',
      yield: '9.8%',
      distribution: '₹7.50 / unit/yr',
      assetInformation: 'Toll Road concessions and Highway infrastructure across 6 states',
      return1Y: 15.1
    }
  ]
};

export const mockUsStocks = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    usdPrice: 228.50,
    inrEquivalent: 228.50 * USD_TO_INR_RATE,
    marketCap: '$3.48 Trillion',
    peRatio: 34.2,
    dividendYield: 0.44,
    changePercent: 0.89,
    isGainer: true
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    usdPrice: 424.15,
    inrEquivalent: 424.15 * USD_TO_INR_RATE,
    marketCap: '$3.15 Trillion',
    peRatio: 35.8,
    dividendYield: 0.71,
    changePercent: 1.15,
    isGainer: true
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    usdPrice: 135.20,
    inrEquivalent: 135.20 * USD_TO_INR_RATE,
    marketCap: '$3.32 Trillion',
    peRatio: 52.4,
    dividendYield: 0.03,
    changePercent: 2.85,
    isGainer: true
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    usdPrice: 188.90,
    inrEquivalent: 188.90 * USD_TO_INR_RATE,
    marketCap: '$1.98 Trillion',
    peRatio: 42.1,
    dividendYield: 0.00,
    changePercent: -0.45,
    isGainer: false
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc. (Google)',
    usdPrice: 168.30,
    inrEquivalent: 168.30 * USD_TO_INR_RATE,
    marketCap: '$2.09 Trillion',
    peRatio: 23.9,
    dividendYield: 0.48,
    changePercent: 0.65,
    isGainer: true
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    usdPrice: 242.80,
    inrEquivalent: 242.80 * USD_TO_INR_RATE,
    marketCap: '$775 Billion',
    peRatio: 64.2,
    dividendYield: 0.00,
    changePercent: -1.82,
    isGainer: false
  }
];

export const mockWatchlist = [
  {
    id: 'wl-1',
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd.',
    assetType: 'Stock',
    currentPrice: 2985.40,
    change: 29.80,
    changePercent: 1.01,
    alertThreshold: 3100.00,
    targetHit: false
  },
  {
    id: 'wl-2',
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    assetType: 'Stock',
    currentPrice: 4210.80,
    change: -16.90,
    changePercent: -0.40,
    alertThreshold: 4100.00,
    targetHit: false
  },
  {
    id: 'wl-3',
    symbol: 'INFY',
    name: 'Infosys Limited',
    assetType: 'Stock',
    currentPrice: 1918.60,
    change: 32.10,
    changePercent: 1.70,
    alertThreshold: 1900.00,
    targetHit: true
  },
  {
    id: 'wl-4',
    symbol: 'NIFTYBEES',
    name: 'Nippon India Nifty 50 ETF',
    assetType: 'ETF',
    currentPrice: 278.60,
    change: 1.25,
    changePercent: 0.45,
    alertThreshold: 270.00,
    targetHit: false
  },
  {
    id: 'wl-5',
    symbol: 'GOLDBEES',
    name: 'Nippon India Gold ETF',
    assetType: 'Gold ETF',
    currentPrice: 71.40,
    change: 0.42,
    changePercent: 0.60,
    alertThreshold: 75.00,
    targetHit: false
  }
];

export const mockRecentTransactions = [
  {
    id: 'tx-1',
    type: 'SIP',
    asset: 'Parag Parikh Flexi Cap Fund',
    assetType: 'Mutual Fund',
    quantity: 117.37,
    price: 85.20,
    totalAmount: 10000,
    transactionDate: '2026-10-05',
    fees: 0,
    status: 'Completed'
  },
  {
    id: 'tx-2',
    type: 'BUY',
    asset: 'HDFC Bank Ltd.',
    assetType: 'Stock',
    quantity: 15,
    price: 1710.00,
    totalAmount: 25650,
    transactionDate: '2026-10-02',
    fees: 45.20,
    status: 'Completed'
  },
  {
    id: 'tx-3',
    type: 'DIVIDEND',
    asset: 'Tata Consultancy Services',
    assetType: 'Stock',
    quantity: 25,
    price: 28.00,
    totalAmount: 700,
    transactionDate: '2026-09-28',
    fees: 0,
    status: 'Credited'
  },
  {
    id: 'tx-4',
    type: 'BUY',
    asset: 'Nippon India Gold ETF',
    assetType: 'Gold',
    quantity: 70,
    price: 70.80,
    totalAmount: 4956,
    transactionDate: '2026-09-20',
    fees: 12.50,
    status: 'Completed'
  }
];

export const mockSipSummary = [
  {
    id: 'sip-1',
    fundName: 'Parag Parikh Flexi Cap Fund',
    monthlyAmount: 10000,
    nextDate: '05 Nov 2026',
    status: 'Active',
    totalInvestedToDate: 120000
  },
  {
    id: 'sip-2',
    fundName: 'Quant Small Cap Fund',
    monthlyAmount: 5000,
    nextDate: '10 Nov 2026',
    status: 'Active',
    totalInvestedToDate: 45000
  },
  {
    id: 'sip-3',
    fundName: 'UTI Nifty 50 Index Fund',
    monthlyAmount: 5000,
    nextDate: '15 Nov 2026',
    status: 'Active',
    totalInvestedToDate: 60000
  },
  {
    id: 'sip-4',
    fundName: 'Nippon India Gold BeES',
    monthlyAmount: 5000,
    nextDate: '20 Nov 2026',
    status: 'Active',
    totalInvestedToDate: 40000
  }
];

export const mockGoals = [
  {
    id: 'goal-1',
    title: 'Dream Home Downpayment',
    category: 'House',
    targetAmount: 3500000,
    currentSaved: 1650000,
    targetYear: 2028,
    monthlyRequired: 38500,
    progressPercentage: 47.1
  },
  {
    id: 'goal-2',
    title: 'Child Higher Education',
    category: 'Education',
    targetAmount: 2500000,
    currentSaved: 950000,
    targetYear: 2033,
    monthlyRequired: 14200,
    progressPercentage: 38.0
  },
  {
    id: 'goal-3',
    title: 'Emergency Liquidity Fund',
    category: 'Safety',
    targetAmount: 600000,
    currentSaved: 540000,
    targetYear: 2026,
    monthlyRequired: 10000,
    progressPercentage: 90.0
  }
];

export const mockAiInsights = [
  {
    id: 'insight-1',
    type: 'Allocation Advisory',
    title: 'Equity Exposure is Above Target',
    message: 'Your portfolio currently holds 76.8% in equity-oriented assets (Indian Equities + Flexi MFs + US Stocks). Ensure this matches your 7+ year horizon and risk capacity.',
    impact: 'Medium',
    category: 'Diversification'
  },
  {
    id: 'insight-2',
    type: 'Cost Optimization',
    title: 'Direct Plans are Saving Fees',
    message: 'All your active mutual funds are in Direct plans with average expense ratio of 0.61%, saving an estimated ₹8,200 annually over regular distributor plans.',
    impact: 'Positive',
    category: 'Expense Ratio'
  },
  {
    id: 'insight-3',
    type: 'Tax Warning',
    title: 'LTCG Exemption Threshold',
    message: 'Your unrealized equity profits are ₹1,25,620. The current annual LTCG tax-free exemption under Section 112A is ₹1.25 Lakh. Harvesting before fiscal close can optimize taxes.',
    impact: 'Important',
    category: 'Tax Efficiency'
  }
];

export const mockNews = [
  {
    id: 'news-1',
    title: 'RBI Monetary Policy: Repo Rate Held Steady at 6.50% Amid Robust Domestic Growth',
    source: 'Financial Express',
    category: 'RBI & Economy',
    time: '2 hours ago',
    summary: 'The Monetary Policy Committee unanimously maintained the key policy rates, citing strong domestic consumption and moderating core inflation.'
  },
  {
    id: 'news-2',
    title: 'Nifty Reclaims 25,100 Driven by IT Rallies and Sustained DII Inflows',
    source: 'LiveMint',
    category: 'Indian Market',
    time: '3 hours ago',
    summary: 'Domestic Institutional Investors bought shares worth ₹2,800 crore, countering foreign outflows as tech majors advanced on strong digital spending cues.'
  },
  {
    id: 'news-3',
    title: 'Gold Near All-Time Highs on Central Bank Accumulation and Global Macro Cues',
    source: 'Economic Times',
    category: 'Gold & Commodities',
    time: '5 hours ago',
    summary: 'Spot gold held firmly above ₹78,000 per 10 grams as retail festive demand coincided with persistent central bank reserves diversification.'
  },
  {
    id: 'news-4',
    title: 'SEBI Clarifies New Disclosure Norms for High-AUM Quant & Alternative Funds',
    source: 'Moneycontrol',
    category: 'Mutual Funds',
    time: '7 hours ago',
    summary: 'The market regulator introduced streamlined portfolio disclosure timelines to bolster investor transparency without compromising proprietary algorithms.'
  }
];
