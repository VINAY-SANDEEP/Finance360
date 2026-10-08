# Finance360 — All-in-One Personal Finance & Investment Platform

Finance360 is a modern, production-grade financial technology platform tailored specifically for Indian wealth builders and investors. It provides an institutional-grade interface to track investments, explore Indian and US market assets, analyze multi-asset portfolios, compute step-up SIP compounding, plan goal milestones, manage expenses, and interact with an AI-powered financial assistant.

---

## 🏗️ Tech Stack

### Frontend
- **Framework**: React.js 19 with Vite 6/8
- **Styling**: Tailwind CSS v4 (Clean fintech design, accessible contrast, no excessive glassmorphism)
- **Routing**: React Router DOM (v7) with Lazy Loading & Code Splitting
- **Icons**: Lucide React
- **Charts**: Recharts (Interactive Area, Bar, and Donut charts with Indian Rupee formatting)
- **HTTP Client**: Axios (Pre-configured with authorization interceptors and service abstraction)

### Backend (Architecture established for Phase 2)
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB with Mongoose
- **Security**: JWT authentication, bcrypt password hashing, helmet, CORS, rate limiting
- **AI Engine**: Provider-agnostic AI layer (OpenAI API / custom LLM integration)

---

## 📁 Project Architecture

```
renna/
├── frontend/
│   ├── src/
│   │   ├── api/             # API client setup and interceptors
│   │   ├── charts/          # Reusable financial charts (Portfolio, Asset Allocation, SIP Growth)
│   │   ├── components/      # Reusable UI components (Navbar, Sidebar, MobileNav, StatCard, DataTable, Modal, DemoBanner, MetricBadge)
│   │   ├── context/         # React Context (AppContext: user, demo mode, watchlist, notifications)
│   │   ├── layouts/         # AppLayout (fintech dashboard shell) and LandingLayout
│   │   ├── pages/           # LandingPage, DashboardPage, MarketsPage, PortfolioPage, WatchlistPage, SipCalculatorPage, etc.
│   │   ├── services/        # Service abstractions (api.js, mockDataService.js)
│   │   ├── utils/           # formatters.js (INR format, compact Cr/L, percentage), financialCalculators.js
│   │   ├── App.jsx          # Route configuration & code-splitting
│   │   ├── main.jsx         # React DOM mounting
│   │   └── index.css        # Tailwind v4 root styling & typography
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── config/          # Environment & MongoDB configuration
│   │   ├── controllers/     # Controller handlers (Phase 2)
│   │   ├── middleware/      # Auth & error handling middlewares (Phase 2)
│   │   ├── models/          # Mongoose schemas (Phase 2)
│   │   ├── routes/          # Express route definitions (Phase 2)
│   │   ├── services/        # Business logic & market data services (Phase 2)
│   │   ├── utils/           # Validation and math utilities
│   │   └── server.js        # Server entry point
│   ├── .env.example         # Template for environment variables
│   └── package.json
└── README.md
```

---

## 🚀 How to Run the Project (Phase 1)

### 1. Prerequisites
- Node.js >= 18 (Tested on Node.js v22.20.0)
- npm >= 9

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build Frontend for Production
```bash
cd frontend
npm run build
```

---

## 🎯 Phase 1 Completed Features
1. **Full Modular Project Scaffolding**: Structured frontend and backend according to specifications.
2. **Fintech Design System**: Clean typography, subtle borders, accessible status colors (emerald/rose/slate), no excessive glassmorphism or distracting gradients.
3. **Responsive Global Navigation**:
   - Sticky top navbar with live market ticker tape (NIFTY 50, SENSEX, GOLD, USD/INR).
   - Desktop sidebar with categorized collapsible sections (Core, Markets, My Money, Planning, Tools, Settings).
   - Mobile slide-out drawer navigation for touch screens.
4. **Interactive Demo Mode**: Clear persistent indicators and badges showing simulated Indian market data without claiming to be live streaming data.
5. **Fintech Landing Page**: Hero section ("One Place for Your Complete Financial Life"), asset class overview, live dashboard preview, feature pillars, security section, and fintech footer.
6. **Financial Dashboard**:
   - 4 Top KPI Cards (Portfolio Value ₹8,45,620, Invested Amount ₹7,20,000, Total Returns +₹1,25,620 / +17.45%, Today's Change +₹4,250 / +0.51%).
   - Portfolio performance chart with benchmark toggle and time period selection (1D, 1W, 1M, 6M, 1Y, 5Y).
   - Donut asset allocation breakdown.
   - Top market movers (Nifty gainers & losers).
   - Watchlist snippet with target price hit indicators.
   - Recent transactions, active SIP mandates, goals progress, AI insight callouts, and curated market news.
7. **Markets Discovery Module**:
   - Tabbed explorer for Indian Stocks (P/E, ROE, 52W High/Low), Direct Mutual Funds, ETFs (Tracking error, AUM), Physical Gold (24K/22K rates & historical CAGR), REITs & InvITs (Yields & Occupancy), and US Equities with auto INR conversion.
8. **Portfolio & Holdings Management**:
   - Multi-asset consolidated holdings table with filtering, search, and sorting.
   - XIRR annualized return, best/worst performers, and sector risk weights.
9. **Watchlist & Price Alerts**:
   - Real-time simulated price alerts, target price monitoring, and quick buy actions.
10. **SIP & Step-Up Compounding Calculator**:
    - Interactive sliders for monthly investment, expected CAGR return, duration, and annual step-up %.
    - Dual modes for Step-Up SIP and One-Time Lump Sum with visual wealth accumulation charts.
11. **Planning & Tools Previews**:
    - Goal Planner (future inflation-adjusted milestone costs and required SIPs).
    - Cash Flow & Expense Tracker.
    - Financial Health Diagnostic (0–100 educational model).
    - Indian Capital Gains & 80C Tax Planner.
    - Asset Comparison Engine.
    - Market News Feed.
    - AI Financial Assistant interface with strict educational disclaimers.
"# Finance360" 
