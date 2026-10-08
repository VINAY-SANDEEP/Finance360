import React, { useState } from 'react';
import { Bot, Send, Sparkles, AlertCircle, User, ShieldCheck } from 'lucide-react';

export const AiAssistantPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: "Hello Rahul! I am your Finance360 AI Assistant. I can explain financial concepts, break down complex mutual fund expense ratios, analyze asset allocation diversification, or explain market valuation multiples.\n\n*Important Disclaimer: I provide educational analysis only, not certified financial or tax advice. I never provide buy/sell stock recommendations.*"
    }
  ]);
  const [input, setInput] = useState('');

  const samplePrompts = [
    'What is P/E ratio and how does it indicate overvaluation?',
    'Explain the difference between Direct and Regular Mutual Funds.',
    'Analyze my portfolio asset allocation balance.',
    'What is LTCG tax on Indian equities under current rules?',
    'Why should I consider an annual Step-Up SIP?'
  ];

  const handleSend = (textToSend = input) => {
    if (!textToSend.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Simulated educational response for Phase 1
    setTimeout(() => {
      let reply = '';
      if (textToSend.toLowerCase().includes('p/e')) {
        reply = "The Price-to-Earnings (P/E) ratio measures a company's current share price relative to its per-share earnings (EPS). In India, the historical 10-year median P/E for the NIFTY 50 is around 21-22x. A high P/E often indicates that the market expects high future earnings growth, but may also mean the stock is trading at a premium valuation.";
      } else if (textToSend.toLowerCase().includes('direct') || textToSend.toLowerCase().includes('mutual fund')) {
        reply = "Direct Mutual Fund plans have zero distributor commissions. This typically lowers their annual Total Expense Ratio (TER) by 0.5% to 1.2% compared to Regular plans. Over a 15-20 year investment horizon, that difference alone can increase your final compounding corpus by 15-25%!";
      } else if (textToSend.toLowerCase().includes('allocation') || textToSend.toLowerCase().includes('portfolio')) {
        reply = "Looking at your simulated portfolio: You currently hold 51.4% in Indian Equities, 25.4% in Mutual Funds, 10.1% in ETFs, 6.6% in Gold, and 4.1% in US Equities. This 80:20 equity-to-hedged asset mix is growth-oriented. For a multi-year horizon (7+ years), it offers strong wealth creation potential while gold provides hedge against domestic volatility.";
      } else {
        reply = `Here is an educational explanation regarding "${textToSend}": In financial planning, disciplined asset allocation and systematic rupee-cost averaging have historically produced superior risk-adjusted outcomes compared to market timing. Keep emergency funds liquid, review expense ratios annually, and align investments with specific time horizons.`;
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'assistant', text: reply }
      ]);
    }, 600);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-100 text-purple-700">
            <Bot size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Finance360 AI Assistant
            </h1>
            <p className="text-xs text-slate-500">
              Interactive financial concept tutor & portfolio diversification analyst
            </p>
          </div>
        </div>
      </div>

      {/* Compliance Disclaimer Banner */}
      <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900 flex items-center gap-2 shrink-0">
        <AlertCircle size={14} className="text-amber-700 shrink-0" />
        <span>
          Educational Assistant Only. Not a SEBI registered investment advisor. Does not provide personalized investment calls or guaranteed return forecasts.
        </span>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 p-4 overflow-y-auto space-y-4 text-xs shadow-xs">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-3 ${
              m.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {m.sender === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0">
                <Bot size={15} />
              </div>
            )}
            <div
              className={`p-3.5 rounded-2xl max-w-lg leading-relaxed whitespace-pre-wrap ${
                m.sender === 'user'
                  ? 'bg-slate-900 text-white rounded-br-xs'
                  : 'bg-slate-100 text-slate-800 rounded-bl-xs'
              }`}
            >
              {m.text}
            </div>
            {m.sender === 'user' && (
              <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 text-[10px] font-bold">
                RS
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Suggested Prompt Pills */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 text-[11px] scrollbar-none shrink-0">
        {samplePrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSend(p)}
            className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 whitespace-nowrap transition-colors cursor-pointer border border-slate-200"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a financial question or ask to analyze your portfolio..."
          className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-slate-400 shadow-xs"
        />
        <button
          type="submit"
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Send</span>
          <Send size={13} />
        </button>
      </form>
    </div>
  );
};
