import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Layers, Lock, Award, FileText } from 'lucide-react';
import { DemoBanner } from '../components/DemoBanner';

export const LandingLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-900">
      <DemoBanner />

      {/* Landing Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-lg shadow-sm border border-slate-800">
              <span className="text-emerald-400 font-extrabold text-xl leading-none">F</span>
              <span className="text-white text-xs -ml-0.5">360</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-bold text-lg text-slate-900 tracking-tight">
                  Finance<span className="text-emerald-600">360</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  INDIA
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-normal">
                All-in-One Fintech Platform
              </p>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <Link to="/markets" className="hover:text-slate-900 transition-colors">
              Markets & Discovery
            </Link>
            <Link to="/portfolio" className="hover:text-slate-900 transition-colors">
              Portfolio Tracking
            </Link>
            <Link to="/sip-calculator" className="hover:text-slate-900 transition-colors">
              SIP & Planning
            </Link>
            <Link to="/compare" className="hover:text-slate-900 transition-colors">
              Asset Comparison
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
            >
              View Dashboard
            </Link>
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <span>Explore Finance360</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Professional Fintech Footer */}
      <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold text-base">
                  F
                </div>
                <span className="font-bold text-white text-base tracking-tight">Finance360</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                Empowering Indian investors with intelligent asset tracking, institutional-grade analytics, goal simulation, and multi-asset wealth management.
              </p>
              <div className="mt-4 flex items-center gap-2 text-emerald-400 font-medium text-[11px]">
                <ShieldCheck size={14} />
                <span>Engineered for precision • 256-bit AES encryption standard</span>
              </div>
            </div>

            <div>
              <h5 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
                Asset Classes
              </h5>
              <ul className="space-y-2">
                <li><Link to="/markets?tab=stocks" className="hover:text-white">NSE & BSE Stocks</Link></li>
                <li><Link to="/markets?tab=mutual-funds" className="hover:text-white">Direct Mutual Funds</Link></li>
                <li><Link to="/markets?tab=etfs" className="hover:text-white">Index & Gold ETFs</Link></li>
                <li><Link to="/markets?tab=reits" className="hover:text-white">REITs & InvITs</Link></li>
                <li><Link to="/markets?tab=us-stocks" className="hover:text-white">US Tech Equities</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
                Planning Tools
              </h5>
              <ul className="space-y-2">
                <li><Link to="/sip-calculator" className="hover:text-white">SIP & Step-Up Calculator</Link></li>
                <li><Link to="/goals" className="hover:text-white">Goal Based Wealth Planner</Link></li>
                <li><Link to="/expenses" className="hover:text-white">Monthly Expense Tracker</Link></li>
                <li><Link to="/financial-health" className="hover:text-white">Financial Health Score</Link></li>
                <li><Link to="/tax-planner" className="hover:text-white">Capital Gains & 80C Tax</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
                Platform
              </h5>
              <ul className="space-y-2">
                <li><Link to="/dashboard" className="hover:text-white">Live Demo Dashboard</Link></li>
                <li><Link to="/compare" className="hover:text-white">Comparison Engine</Link></li>
                <li><Link to="/ai-assistant" className="hover:text-white">AI Finance Assistant</Link></li>
                <li><Link to="/news" className="hover:text-white">Market Intelligence</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
            <p>© 2026 Finance360 Inc. All rights reserved. Indian Fintech Platform.</p>
            <p className="max-w-xl text-center md:text-right text-slate-400 text-[10px] leading-relaxed">
              Disclaimer: Financial calculations, portfolio metrics, and simulations provided on Finance360 are for informational and educational purposes only. Market investments are subject to risk. Please read scheme-related documents carefully.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
