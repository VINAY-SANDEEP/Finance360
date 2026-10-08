import React, { useState } from 'react';
import { Newspaper, Search, ExternalLink, Filter } from 'lucide-react';
import { mockNews } from '../services/mockDataService';

export const NewsPage = () => {
  const [newsList, setNewsList] = useState(mockNews);
  const [selectedCat, setSelectedCat] = useState('ALL');
  const [search, setSearch] = useState('');

  const categories = ['ALL', 'Indian Market', 'RBI & Economy', 'Mutual Funds', 'Gold & Commodities'];

  const filteredNews = newsList.filter((item) => {
    if (selectedCat !== 'ALL' && item.category !== selectedCat) return false;
    if (!search) return true;
    return (
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.summary.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Market Intelligence & Financial News
          </h1>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
            Real-Time Feed
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          Curated macroeconomic announcements, monetary policies, and sector updates
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search financial news..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto text-xs scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCat === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNews.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-3 flex flex-col justify-between hover:border-slate-300 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                <span className="font-bold text-slate-700">{item.source}</span>
                <span>{item.time}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {item.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                {item.category}
              </span>
              <span className="text-xs text-slate-400 hover:text-slate-700 font-medium flex items-center gap-1 cursor-pointer">
                <span>Read Full Wire</span>
                <ExternalLink size={12} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
