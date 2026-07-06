import React from 'react';
import { Sun, Moon, MapPin, Calendar } from 'lucide-react';

interface HeaderProps {
  location: string;
  setLocation: (loc: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  location,
  setLocation,
  darkMode,
  setDarkMode,
}) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const locations = [
    { name: 'Vidarbha (MH)', region: 'Cotton & Soybean Belt' },
    { name: 'Khanna (PB)', region: 'Wheat Grain Bowl' },
    { name: 'Gondia (MH)', region: 'Rice Paddy Basin' },
    { name: 'Agra Rural (UP)', region: 'Potato Belt' },
    { name: 'Guntur (AP)', region: 'Chilli & Cotton Belt' }
  ];

  return (
    <header className="bg-white dark:bg-[#0c0c0f] border-b border-zinc-200 dark:border-zinc-850 px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm backdrop-blur-md bg-white/95 dark:bg-[#0c0c0f]/95">
      {/* Location Selector */}
      <div className="flex items-center gap-2">
        <div className="bg-emerald-50 dark:bg-emerald-950/40 p-1.5 rounded-lg text-emerald-600 dark:text-emerald-400">
          <MapPin className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold uppercase tracking-wider leading-none">
            Active Farm Location
          </span>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 bg-transparent border-none focus:outline-none p-0 cursor-pointer"
          >
            {locations.map((loc) => (
              <option 
                key={loc.name} 
                value={loc.name}
                className="bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 font-medium"
              >
                {loc.name} — {loc.region}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Date & Settings Controls */}
      <div className="flex items-center gap-6">
        {/* Date Display */}
        <div className="hidden md:flex items-center gap-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 px-3.5 py-1.5 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-400">
          <Calendar className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
          <span>{currentDate}</span>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 hover:text-zinc-900 dark:hover:text-zinc-150 transition-all cursor-pointer shadow-sm"
          title="Toggle Theme"
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
