import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockWatchlist } from '../services/mockDataService';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Demo mode is on by default in Phase 1
  const [isDemoMode, setIsDemoMode] = useState(true);
  
  // User profile mock
  const [user, setUser] = useState({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    riskProfile: 'Moderately Aggressive',
    initials: 'RS',
    panVerified: true
  });

  // Watchlist state (reactive for add/remove)
  const [watchlist, setWatchlist] = useState(mockWatchlist);

  // Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Target Price Hit: Infosys',
      message: 'INFY has crossed your target price threshold of ₹1,900 (Current: ₹1,918.60).',
      time: '15 mins ago',
      read: false,
      type: 'price-alert'
    },
    {
      id: 'notif-2',
      title: 'Upcoming SIP Scheduled',
      message: 'Parag Parikh Flexi Cap Fund SIP of ₹10,000 is due on 05 Nov 2026.',
      time: '2 hours ago',
      read: false,
      type: 'sip-reminder'
    },
    {
      id: 'notif-3',
      title: 'Quarterly Rebalancing Recommendation',
      message: 'Equity allocation currently at 76.8%, exceeding your target 70% threshold.',
      time: '1 day ago',
      read: true,
      type: 'insight'
    }
  ]);

  // Modal control for adding transactions
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);

  const toggleWatchlist = (asset) => {
    setWatchlist((prev) => {
      const exists = prev.some((item) => item.symbol === asset.symbol);
      if (exists) {
        return prev.filter((item) => item.symbol !== asset.symbol);
      } else {
        return [
          ...prev,
          {
            id: `wl-${Date.now()}`,
            symbol: asset.symbol,
            name: asset.name,
            assetType: asset.assetType || 'Stock',
            currentPrice: asset.price || asset.currentPrice || 0,
            change: asset.change || 0,
            changePercent: asset.changePercent || 0,
            alertThreshold: (asset.price || asset.currentPrice || 0) * 1.05,
            targetHit: false
          }
        ];
      }
    });
  };

  const isInWatchlist = (symbol) => {
    return watchlist.some((item) => item.symbol === symbol);
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        isDemoMode,
        setIsDemoMode,
        user,
        setUser,
        watchlist,
        toggleWatchlist,
        isInWatchlist,
        notifications,
        markAllNotificationsRead,
        isAddTransactionOpen,
        setIsAddTransactionOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
