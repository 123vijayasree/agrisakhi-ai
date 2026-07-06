import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  MapPin, 
  Search, 
  Info
} from 'lucide-react';
import { MANDI_PRICES, VERNACULAR_TEXTS } from '../data/agriculturalDb';

interface MandiTabProps {
  language: string;
}

export const MandiTab: React.FC<MandiTabProps> = ({ language }) => {
  const t = VERNACULAR_TEXTS[language] || VERNACULAR_TEXTS.en;

  const [searchTerm, setSearchTerm] = useState('');

  const filteredPrices = MANDI_PRICES.filter(p => 
    p.crop.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto p-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            {t.mandiTitle}
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {t.mandiSub}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-zinc-400 dark:text-zinc-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search crop mandi prices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none dark:text-white"
          />
        </div>
      </div>

      {/* Grid of Prices */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredPrices.length > 0 ? (
          filteredPrices.map((item) => (
            <div 
              key={item.crop}
              className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-4"
            >
              {/* Top Crop row */}
              <div className="flex justify-between items-start border-b border-zinc-100 dark:border-zinc-850 pb-3">
                <div>
                  <h3 className="font-extrabold text-base text-zinc-900 dark:text-zinc-50">
                    {item.crop}
                  </h3>
                  <span className="text-[10px] text-zinc-450 dark:text-zinc-500 font-semibold uppercase tracking-wider block">
                    Price per Quintal (100 kg)
                  </span>
                </div>

                {/* Trend Badge */}
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                    item.trend === 'up'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400'
                      : (item.trend === 'down'
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-450'
                          : 'bg-zinc-150 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300')
                  }`}>
                    {item.trend === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
                    {item.trend === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
                    {item.trend === 'stable' && <Minus className="w-3.5 h-3.5" />}
                    {item.change}
                  </span>
                </div>
              </div>

              {/* Price Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-50/50 dark:bg-zinc-900/10 p-3 rounded-xl border border-zinc-150 dark:border-zinc-850">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wide block font-semibold">Price Range</span>
                  <span className="text-base font-bold text-zinc-800 dark:text-zinc-200">{item.priceRange}</span>
                </div>
                <div className="bg-zinc-50/50 dark:bg-zinc-900/10 p-3 rounded-xl border border-zinc-150 dark:border-zinc-850">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wide block font-semibold">Average Price</span>
                  <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">₹{item.avgPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Markets List */}
              <div className="space-y-2">
                <span className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Nearby Market Yards
                </span>
                <div className="space-y-1.5">
                  {item.markets.map((m, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-2.5 bg-zinc-50 dark:bg-zinc-900 rounded-lg text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                        <div>
                          <span className="font-semibold text-zinc-800 dark:text-zinc-200">{m.name}</span>
                          <span className="text-[9px] text-zinc-400 dark:text-zinc-500 ml-1.5">({m.distance})</span>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-zinc-700 dark:text-zinc-300">
                        ₹{m.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-12 text-center">
            <Search className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-350">No prices found for "{searchTerm}"</h3>
          </div>
        )}
      </div>

      {/* Advisory card */}
      <div className="p-4 bg-blue-50 border border-blue-200 text-blue-800 dark:bg-blue-950/20 dark:border-blue-900/40 dark:text-blue-300 rounded-2xl text-xs flex gap-3 leading-relaxed">
        <Info className="w-4 h-4 mt-0.5 shrink-0 text-blue-500" />
        <div>
          <span className="font-bold block mb-0.5">APMC Mandi Price Disclaimer</span>
          <p className="text-zinc-550 dark:text-zinc-400">
            Market prices are simulated based on seasonal averages and wholesale arrivals across AGMARKNET databases. Distances are calculated from your active farm location context. Check with local APMC commission agents before transporting produce.
          </p>
        </div>
      </div>
    </div>
  );
};
