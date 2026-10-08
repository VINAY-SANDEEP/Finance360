/**
 * Currency and financial number formatters for Indian Fintech standard
 */

// Formats number to Indian Rupee (INR) format e.g. ₹8,45,620 or ₹12.5 Cr
export const formatINR = (amount, { compact = false, decimals = 2 } = {}) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  
  const num = Number(amount);
  
  if (compact) {
    const absNum = Math.abs(num);
    const sign = num < 0 ? '-' : '';
    if (absNum >= 10000000) {
      return `${sign}₹${(absNum / 10000000).toFixed(2)} Cr`;
    }
    if (absNum >= 100000) {
      return `${sign}₹${(absNum / 100000).toFixed(2)} L`;
    }
    if (absNum >= 1000) {
      return `${sign}₹${(absNum / 1000).toFixed(1)} K`;
    }
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals > 0 ? 0 : 0
  }).format(num);
};

// Formats USD price e.g. $182.40
export const formatUSD = (amount, decimals = 2) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals
  }).format(Number(amount));
};

// Formats percentage e.g. +14.25% or -2.10%
export const formatPercentage = (val, { showSign = true, decimals = 2 } = {}) => {
  if (val === undefined || val === null || isNaN(val)) return '0.00%';
  const num = Number(val);
  const formatted = Math.abs(num).toFixed(decimals);
  if (num > 0) return `${showSign ? '+' : ''}${formatted}%`;
  if (num < 0) return `-${formatted}%`;
  return `${formatted}%`;
};

// Formats plain numbers with Indian commas
export const formatNumberIN = (val, decimals = 0) => {
  if (val === undefined || val === null || isNaN(val)) return '0';
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals
  }).format(Number(val));
};

// Formats date to readable Indian standard e.g. 08 Oct 2026
export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};
