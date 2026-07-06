import React from 'react';
import { 
  Stethoscope, 
  CloudSun, 
  ShieldAlert, 
  CalendarRange, 
  MessageSquare, 
  Sprout, 
  TrendingUp, 
  Key, 
  Check, 
  Globe2,
  LifeBuoy
} from 'lucide-react';
import { VERNACULAR_TEXTS } from '../data/agriculturalDb';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  apiKey,
  setApiKey,
}) => {
  const t = VERNACULAR_TEXTS[language] || VERNACULAR_TEXTS.en;
  
  const [showKeyInput, setShowKeyInput] = React.useState(false);
  const [tempKey, setTempKey] = React.useState(apiKey);

  const menuItems = [
    { id: 'diagnosis', label: t.doctor, sub: t.doctorSub, icon: Stethoscope },
    { id: 'weather', label: t.weather, sub: t.weatherSub, icon: CloudSun },
    { id: 'treatments', label: t.treatments, sub: t.treatmentsSub, icon: ShieldAlert },
    { id: 'soil', label: t.soil, sub: t.soilSub, icon: Sprout },
    { id: 'mandi', label: t.mandi, sub: t.mandiSub, icon: TrendingUp },
    { id: 'calendar', label: t.calendar, sub: t.calendarSub, icon: CalendarRange },
    { id: 'chat', label: t.chat, sub: t.chatSub, icon: MessageSquare },
    { id: 'kisan', label: 'Kisan Seva', sub: 'Govt schemes & helplines 🇮🇳', icon: LifeBuoy },
  ];

  const handleSaveKey = () => {
    setApiKey(tempKey);
    localStorage.setItem('agrisakhi_gemini_api_key', tempKey);
    setShowKeyInput(false);
  };

  return (
    <aside className="w-80 bg-white dark:bg-[#0c0c0f] border-r border-zinc-200 dark:border-zinc-850 flex flex-col h-screen sticky top-0 shrink-0">
      {/* Brand Header with Indian Tricolor bar */}
      <div className="border-b border-zinc-200 dark:border-zinc-850">
        <div className="tricolor-bar dark:tricolor-bar-dark" />
        <div className="p-5 flex items-center gap-3">
          <div className="bg-orange-50 dark:bg-orange-950/40 p-2.5 rounded-xl border border-orange-200 dark:border-orange-900/60">
            <Sprout className="w-7 h-7 text-orange-500 dark:text-orange-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-none">
              {t.title}
            </h1>
            <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">
              🇮🇳 {t.subtitle}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-start gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 group text-left ${
                isActive
                  ? item.id === 'kisan'
                    ? 'bg-gradient-to-r from-orange-500 to-green-600 text-white shadow-md'
                    : 'bg-orange-500 text-white shadow-md shadow-orange-500/10'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <Icon className={`w-5 h-5 mt-0.5 shrink-0 transition-transform group-hover:scale-110 ${
                isActive ? 'text-white' : 'text-zinc-450 dark:text-zinc-500 group-hover:text-emerald-500 dark:group-hover:text-emerald-400'
              }`} />
              <div>
                <div className={`font-semibold text-sm leading-tight ${isActive ? 'text-white' : 'text-zinc-900 dark:text-zinc-100'}`}>
                  {item.label}
                </div>
                <div className={`text-[11px] mt-0.5 font-normal leading-tight ${isActive ? 'text-emerald-100' : 'text-zinc-500 dark:text-zinc-500'}`}>
                  {item.sub}
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer Area: Language & API settings */}
      <div className="p-4 border-t border-zinc-200 dark:border-zinc-850 space-y-4 bg-zinc-50/50 dark:bg-zinc-900/10">
        
        {/* Language Selector */}
        <div className="bg-white dark:bg-zinc-900 p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-1.5">
          <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-450 uppercase tracking-wider flex items-center gap-1.5 px-1">
            <Globe2 className="w-3.5 h-3.5" />
            Language
          </span>
          <div className="grid grid-cols-3 gap-1">
            {[
              { code: 'en', label: 'EN' },
              { code: 'hi', label: 'हिन्दी' },
              { code: 'mr', label: 'मराठी' },
              { code: 'ta', label: 'தமிழ்' },
              { code: 'te', label: 'తెలుగు' },
              { code: 'gu', label: 'ગુજ.' },
              { code: 'bn', label: 'বাং.' },
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`px-2 py-1.5 text-xs font-semibold rounded-md transition-all text-center ${
                  language === lang.code
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 bg-transparent border border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gemini API Key configuration */}
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] p-3.5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowKeyInput(!showKeyInput)}
              className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-2 cursor-pointer w-full"
            >
              <Key className="w-3.5 h-3.5 text-zinc-500" />
              <span>Gemini AI Key</span>
              {apiKey ? (
                <span className="ml-auto flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                  <Check className="w-3 h-3" /> Enabled
                </span>
              ) : (
                <span className="ml-auto text-[10px] text-zinc-400 dark:text-zinc-500">
                  (Simulated)
                </span>
              )}
            </button>
          </div>

          {showKeyInput && (
            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-900">
              <input
                type="password"
                placeholder={t.apiPlaceholder}
                value={tempKey}
                onChange={(e) => setTempKey(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md px-2 py-1.5 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none dark:text-white"
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowKeyInput(false)}
                  className="px-2.5 py-1 text-[10px] font-semibold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-350 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveKey}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-md text-[10px] font-semibold shadow-sm cursor-pointer"
                >
                  Save Key
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
