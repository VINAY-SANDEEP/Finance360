import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Bell,
  Plus,
  Menu,
  X,
  TrendingUp,
  Shield,
  CheckCircle2,
  ChevronDown,
  User,
  Settings,
  LogOut
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockMarketIndices } from '../services/mockDataService';
import { MetricBadge } from './MetricBadge';
import { formatNumberIN } from '../utils/formatters';

export const Navbar = ({ onOpenMobileMenu }) => {
  const { user, notifications, markAllNotificationsRead, setIsAddTransactionOpen } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      {/* Ticker Bar (Top micro-bar) */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 overflow-x-auto scrollbar-none flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-6 shrink-0">
          <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            INDIAN MARKETS:
          </span>
          {mockMarketIndices.slice(0, 4).map((idx) => (
            <div key={idx.symbol} className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">{idx.symbol}</span>
              <span className="text-white font-mono">{formatNumberIN(idx.price, 2)}</span>
              <span
                className={`font-medium ${
                  idx.isPositive ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {idx.isPositive ? '+' : ''}
                {idx.changePercent}%
              </span>
            </div>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3 text-slate-400 text-[10px]">
          <span>Exchange Rates: USD/INR ₹86.40</span>
          <span>•</span>
          <span className="text-emerald-400">Markets Open</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="h-16 px-4 lg:px-6 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Brand */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden focus:outline-hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-lg shadow-sm border border-slate-800">
              <span className="text-emerald-400 font-extrabold text-xl leading-none">F</span>
              <span className="text-white text-xs -ml-0.5">360</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-bold text-base text-slate-900 tracking-tight">
                  Finance<span className="text-emerald-600">360</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  IN
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-normal leading-tight">
                Fintech Investment OS
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Search input */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search stocks, mutual funds, ETFs, gold (e.g. RELIANCE, NIFTYBEES)..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs text-slate-900 placeholder-slate-400 rounded-lg border border-slate-200 focus:border-slate-400 focus:outline-hidden transition-colors"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Add Transaction Button */}
          <button
            type="button"
            onClick={() => setIsAddTransactionOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors shrink-0 cursor-pointer"
          >
            <Plus size={15} />
            <span className="hidden sm:inline">Add Transaction</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-3 z-50">
                <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Notifications</h4>
                    <p className="text-[11px] text-slate-500">{unreadCount} unread alerts</p>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[11px] text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 text-xs transition-colors hover:bg-slate-50 ${
                        !item.read ? 'bg-emerald-50/40' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-slate-900">{item.title}</span>
                        <span className="text-[10px] text-slate-400 shrink-0">{item.time}</span>
                      </div>
                      <p className="text-slate-600 mt-1 text-[11px] leading-relaxed">
                        {item.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1.5 pl-2 rounded-lg hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center border border-slate-300">
                {user.initials}
              </div>
              <div className="hidden xl:block text-left">
                <div className="text-xs font-semibold text-slate-900 leading-tight">
                  {user.name}
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  {user.riskProfile}
                </div>
              </div>
              <ChevronDown size={14} className="text-slate-400 hidden xl:block" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-xs">
                <div className="px-4 py-2 border-b border-slate-100">
                  <div className="font-semibold text-slate-900">{user.name}</div>
                  <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                  <div className="mt-1 flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                    <CheckCircle2 size={12} /> PAN KYC Verified
                  </div>
                </div>
                <div className="py-1">
                  <Link
                    to="/dashboard"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-50"
                  >
                    <TrendingUp size={14} /> My Dashboard
                  </Link>
                  <Link
                    to="/portfolio"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-50"
                  >
                    <User size={14} /> Portfolio & Holdings
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-50"
                  >
                    <Settings size={14} /> Account Settings
                  </Link>
                </div>
                <div className="border-t border-slate-100 pt-1">
                  <Link
                    to="/"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 text-rose-600 hover:bg-rose-50"
                  >
                    <LogOut size={14} /> Switch to Landing Page
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
