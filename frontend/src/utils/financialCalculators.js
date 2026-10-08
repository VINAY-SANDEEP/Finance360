/**
 * Financial Calculators for SIP, Step-Up, Lumpsum, and Asset Allocations
 */

// Regular SIP calculation
export const calculateSip = (monthlyInvestment, expectedReturnRate, durationYears) => {
  const P = Number(monthlyInvestment);
  const i = Number(expectedReturnRate) / 100 / 12; // monthly rate
  const n = Number(durationYears) * 12; // total months

  if (P <= 0 || n <= 0) {
    return { totalInvested: 0, estimatedReturns: 0, finalValue: 0, yearlyBreakdown: [] };
  }

  let finalValue = 0;
  if (i === 0) {
    finalValue = P * n;
  } else {
    // Formula: P * [ ( (1 + i)^n - 1 ) / i ] * (1 + i)
    finalValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  }

  const totalInvested = P * n;
  const estimatedReturns = Math.max(0, finalValue - totalInvested);

  // Generate yearly breakdown for charting
  const yearlyBreakdown = [];
  for (let y = 1; y <= durationYears; y++) {
    const months = y * 12;
    const invested = P * months;
    const val = i === 0 ? invested : P * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
    yearlyBreakdown.push({
      year: `Yr ${y}`,
      yearNumber: y,
      invested: Math.round(invested),
      returns: Math.round(Math.max(0, val - invested)),
      totalValue: Math.round(val)
    });
  }

  return {
    totalInvested: Math.round(totalInvested),
    estimatedReturns: Math.round(estimatedReturns),
    finalValue: Math.round(finalValue),
    yearlyBreakdown
  };
};

// Step-Up SIP calculation (Annual step-up in contribution)
export const calculateStepUpSip = (initialMonthly, expectedReturnRate, durationYears, stepUpPercent) => {
  const r = Number(expectedReturnRate) / 100 / 12;
  const s = Number(stepUpPercent) / 100;
  const years = Number(durationYears);

  let currentMonthly = Number(initialMonthly);
  let totalInvested = 0;
  let corpus = 0;
  const yearlyBreakdown = [];

  for (let y = 1; y <= years; y++) {
    for (let m = 1; m <= 12; m++) {
      corpus = (corpus + currentMonthly) * (1 + r);
      totalInvested += currentMonthly;
    }

    yearlyBreakdown.push({
      year: `Yr ${y}`,
      yearNumber: y,
      invested: Math.round(totalInvested),
      returns: Math.round(Math.max(0, corpus - totalInvested)),
      totalValue: Math.round(corpus),
      monthlyContribution: Math.round(currentMonthly)
    });

    // Step up monthly amount at the end of each year
    currentMonthly = currentMonthly * (1 + s);
  }

  return {
    totalInvested: Math.round(totalInvested),
    estimatedReturns: Math.round(Math.max(0, corpus - totalInvested)),
    finalValue: Math.round(corpus),
    yearlyBreakdown
  };
};

// Lumpsum calculation
export const calculateLumpSum = (principal, expectedReturnRate, durationYears) => {
  const P = Number(principal);
  const r = Number(expectedReturnRate) / 100;
  const n = Number(durationYears);

  const finalValue = P * Math.pow(1 + r, n);
  const totalInvested = P;
  const estimatedReturns = Math.max(0, finalValue - totalInvested);

  const yearlyBreakdown = [];
  for (let y = 1; y <= n; y++) {
    const val = P * Math.pow(1 + r, y);
    yearlyBreakdown.push({
      year: `Yr ${y}`,
      yearNumber: y,
      invested: Math.round(totalInvested),
      returns: Math.round(Math.max(0, val - totalInvested)),
      totalValue: Math.round(val)
    });
  }

  return {
    totalInvested: Math.round(totalInvested),
    estimatedReturns: Math.round(estimatedReturns),
    finalValue: Math.round(finalValue),
    yearlyBreakdown
  };
};
