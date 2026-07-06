import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DiagnosisTab } from './components/DiagnosisTab';
import { WeatherTab } from './components/WeatherTab';
import { TreatmentTab } from './components/TreatmentTab';
import { SoilTab } from './components/SoilTab';
import { MandiTab } from './components/MandiTab';
import { CalendarTab } from './components/CalendarTab';
import { ChatTab } from './components/ChatTab';
import { KisanSevaTab } from './components/KisanSevaTab';

interface WeatherContext {
  temp: number;
  humidity: number;
  windSpeed: number;
  rainfall: number;
}

const LOCATION_WEATHER_MAP: Record<string, WeatherContext> = {
  'Vidarbha (MH)': { temp: 29, humidity: 82, windSpeed: 16, rainfall: 18 },
  'Khanna (PB)': { temp: 28, humidity: 48, windSpeed: 8, rainfall: 0 },
  'Gondia (MH)': { temp: 24, humidity: 92, windSpeed: 12, rainfall: 45 },
  'Agra Rural (UP)': { temp: 19, humidity: 88, windSpeed: 10, rainfall: 4 },
  'Guntur (AP)': { temp: 34, humidity: 55, windSpeed: 21, rainfall: 0 }
};

function App() {
  const [activeTab, setActiveTab] = useState<string>('diagnosis');
  const [language, setLanguage] = useState<string>('en');
  const [location, setLocation] = useState<string>('Vidarbha (MH)');
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('agrisakhi_gemini_api_key') || '';
  });
  
  // Set dark mode active by default for premium dark aesthetic
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('agrisakhi_dark_mode');
    return saved !== null ? saved === 'true' : true;
  });

  // Dynamic weather state linked to active location
  const [currentWeather, setCurrentWeather] = useState<WeatherContext>(
    LOCATION_WEATHER_MAP['Vidarbha (MH)']
  );

  useEffect(() => {
    const weather = LOCATION_WEATHER_MAP[location] || LOCATION_WEATHER_MAP['Vidarbha (MH)'];
    setCurrentWeather(weather);
  }, [location]);

  // Sync dark mode HTML classes
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('agrisakhi_dark_mode', String(darkMode));
  }, [darkMode]);

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50 transition-colors duration-200">
      
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        apiKey={apiKey}
        setApiKey={setApiKey}
      />

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Controls */}
        <Header
          location={location}
          setLocation={setLocation}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Dynamic Inner Tab View */}
        <main className="flex-1 overflow-y-auto">
          {activeTab === 'diagnosis' && (
            <DiagnosisTab language={language} currentWeather={currentWeather} />
          )}
          {activeTab === 'weather' && (
            <WeatherTab language={language} currentWeather={currentWeather} location={location} />
          )}
          {activeTab === 'treatments' && (
            <TreatmentTab language={language} />
          )}
          {activeTab === 'soil' && (
            <SoilTab language={language} />
          )}
          {activeTab === 'mandi' && (
            <MandiTab language={language} />
          )}
          {activeTab === 'calendar' && (
            <CalendarTab language={language} />
          )}
          {activeTab === 'chat' && (
            <ChatTab language={language} apiKey={apiKey} currentWeather={currentWeather} />
          )}
          {activeTab === 'kisan' && (
            <div className="p-6 max-w-3xl mx-auto">
              <KisanSevaTab language={language} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
