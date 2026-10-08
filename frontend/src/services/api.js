/**
 * API Service Abstraction Layer
 * Supports switching between Demo Mode (Mock Data) and Live REST APIs seamlessly.
 */

import axios from 'axios';
import {
  mockDashboardSummary,
  mockMarketIndices,
  mockPortfolioPerformance,
  mockAssetAllocation,
  mockSectorAllocation,
  mockHoldings,
  mockStocks,
  mockMutualFunds,
  mockEtfs,
  mockGoldData,
  mockReitsAndInvits,
  mockUsStocks,
  mockWatchlist,
  mockRecentTransactions,
  mockSipSummary,
  mockGoals,
  mockAiInsights,
  mockNews
} from './mockDataService';

// Backend API client configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach JWT token automatically if stored
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('finance360_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Flag to control mock mode vs real backend
const USE_DEMO_DATA = true;

export const financeApi = {
  // Dashboard
  getDashboardSummary: async () => {
    if (USE_DEMO_DATA) return mockDashboardSummary;
    const res = await apiClient.get('/dashboard/summary');
    return res.data;
  },

  getMarketIndices: async () => {
    if (USE_DEMO_DATA) return mockMarketIndices;
    const res = await apiClient.get('/markets/indices');
    return res.data;
  },

  getPortfolioPerformance: async (timeframe = '1Y') => {
    if (USE_DEMO_DATA) return mockPortfolioPerformance;
    const res = await apiClient.get(`/portfolio/performance?timeframe=${timeframe}`);
    return res.data;
  },

  getAssetAllocation: async () => {
    if (USE_DEMO_DATA) return mockAssetAllocation;
    const res = await apiClient.get('/portfolio/allocation');
    return res.data;
  },

  getSectorAllocation: async () => {
    if (USE_DEMO_DATA) return mockSectorAllocation;
    const res = await apiClient.get('/portfolio/sectors');
    return res.data;
  },

  // Holdings
  getHoldings: async () => {
    if (USE_DEMO_DATA) return mockHoldings;
    const res = await apiClient.get('/portfolio/holdings');
    return res.data;
  },

  // Stocks
  getStocks: async () => {
    if (USE_DEMO_DATA) return mockStocks;
    const res = await apiClient.get('/stocks');
    return res.data;
  },

  // Mutual Funds
  getMutualFunds: async () => {
    if (USE_DEMO_DATA) return mockMutualFunds;
    const res = await apiClient.get('/mutual-funds');
    return res.data;
  },

  // ETFs
  getEtfs: async () => {
    if (USE_DEMO_DATA) return mockEtfs;
    const res = await apiClient.get('/etfs');
    return res.data;
  },

  // Gold
  getGoldData: async () => {
    if (USE_DEMO_DATA) return mockGoldData;
    const res = await apiClient.get('/markets/gold');
    return res.data;
  },

  // REITs & InvITs
  getReitsAndInvits: async () => {
    if (USE_DEMO_DATA) return mockReitsAndInvits;
    const res = await apiClient.get('/markets/reits-invits');
    return res.data;
  },

  // US Stocks
  getUsStocks: async () => {
    if (USE_DEMO_DATA) return mockUsStocks;
    const res = await apiClient.get('/markets/us-stocks');
    return res.data;
  },

  // Watchlist
  getWatchlist: async () => {
    if (USE_DEMO_DATA) return mockWatchlist;
    const res = await apiClient.get('/watchlist');
    return res.data;
  },

  // Transactions
  getTransactions: async () => {
    if (USE_DEMO_DATA) return mockRecentTransactions;
    const res = await apiClient.get('/transactions');
    return res.data;
  },

  // SIPs
  getSips: async () => {
    if (USE_DEMO_DATA) return mockSipSummary;
    const res = await apiClient.get('/sips');
    return res.data;
  },

  // Goals
  getGoals: async () => {
    if (USE_DEMO_DATA) return mockGoals;
    const res = await apiClient.get('/goals');
    return res.data;
  },

  // AI Insights
  getAiInsights: async () => {
    if (USE_DEMO_DATA) return mockAiInsights;
    const res = await apiClient.get('/ai/insights');
    return res.data;
  },

  // News
  getNews: async () => {
    if (USE_DEMO_DATA) return mockNews;
    const res = await apiClient.get('/news');
    return res.data;
  }
};
