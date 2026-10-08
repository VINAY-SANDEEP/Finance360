import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './layouts/AppLayout';
import { LandingLayout } from './layouts/LandingLayout';

// Lazy loaded pages for performance and code-splitting
const LandingPage = lazy(() => import('./pages/LandingPage').then(m => ({ default: m.LandingPage })));
const DashboardPage = lazy(() => import('./pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const MarketsPage = lazy(() => import('./pages/MarketsPage').then(m => ({ default: m.MarketsPage })));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage').then(m => ({ default: m.PortfolioPage })));
const WatchlistPage = lazy(() => import('./pages/WatchlistPage').then(m => ({ default: m.WatchlistPage })));
const TransactionsPage = lazy(() => import('./pages/TransactionsPage').then(m => ({ default: m.TransactionsPage })));
const AssetAllocationPage = lazy(() => import('./pages/AssetAllocationPage').then(m => ({ default: m.AssetAllocationPage })));
const SipCalculatorPage = lazy(() => import('./pages/SipCalculatorPage').then(m => ({ default: m.SipCalculatorPage })));
const GoalPlannerPage = lazy(() => import('./pages/GoalPlannerPage').then(m => ({ default: m.GoalPlannerPage })));
const ExpenseTrackerPage = lazy(() => import('./pages/ExpenseTrackerPage').then(m => ({ default: m.ExpenseTrackerPage })));
const FinancialHealthPage = lazy(() => import('./pages/FinancialHealthPage').then(m => ({ default: m.FinancialHealthPage })));
const TaxPlannerPage = lazy(() => import('./pages/TaxPlannerPage').then(m => ({ default: m.TaxPlannerPage })));
const ComparePage = lazy(() => import('./pages/ComparePage').then(m => ({ default: m.ComparePage })));
const NewsPage = lazy(() => import('./pages/NewsPage').then(m => ({ default: m.NewsPage })));
const AiAssistantPage = lazy(() => import('./pages/AiAssistantPage').then(m => ({ default: m.AiAssistantPage })));
const SettingsPage = lazy(() => import('./pages/SettingsPage').then(m => ({ default: m.SettingsPage })));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[350px]">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-xs font-semibold text-slate-500">Loading Finance360 module...</span>
    </div>
  </div>
);

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public / Landing Route */}
            <Route element={<LandingLayout />}>
              <Route path="/" element={<LandingPage />} />
            </Route>

            {/* Authenticated / App Dashboard Routes */}
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/markets" element={<MarketsPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/watchlist" element={<WatchlistPage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/asset-allocation" element={<AssetAllocationPage />} />
              <Route path="/sip-calculator" element={<SipCalculatorPage />} />
              <Route path="/goals" element={<GoalPlannerPage />} />
              <Route path="/expenses" element={<ExpenseTrackerPage />} />
              <Route path="/financial-health" element={<FinancialHealthPage />} />
              <Route path="/tax-planner" element={<TaxPlannerPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/ai-assistant" element={<AiAssistantPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>

            {/* Catch-all redirect to Landing */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
