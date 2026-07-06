import React, { useState } from 'react';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  CloudRain, 
  AlertTriangle, 
  Info, 
  CheckCircle,
  TrendingUp
} from 'lucide-react';
import { VERNACULAR_TEXTS } from '../data/agriculturalDb';

interface WeatherTabProps {
  language: string;
  currentWeather: { temp: number; humidity: number; windSpeed: number; rainfall: number };
  location: string;
}

export const WeatherTab: React.FC<WeatherTabProps> = ({ 
  language, 
  currentWeather,
  location 
}) => {
  const t = VERNACULAR_TEXTS[language] || VERNACULAR_TEXTS.en;
  
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  // 7-day forecast mock data linked to the region
  const forecastData = [
    { day: 'Mon', temp: 28, humidity: 82, rain: 12, wind: 14, risk: 'High Blight Risk' },
    { day: 'Tue', temp: 29, humidity: 85, rain: 22, wind: 18, risk: 'High Blight Risk' },
    { day: 'Wed', temp: 26, humidity: 90, rain: 45, wind: 11, risk: 'Fungal / Mold Risk' },
    { day: 'Thu', temp: 27, humidity: 78, rain: 5, wind: 15, risk: 'Medium Risk' },
    { day: 'Fri', temp: 31, humidity: 65, rain: 0, wind: 19, risk: 'Wind Spray Alert' },
    { day: 'Sat', temp: 32, humidity: 55, rain: 0, wind: 12, risk: 'Safe' },
    { day: 'Sun', temp: 30, humidity: 60, rain: 2, wind: 8, risk: 'Safe' }
  ];

  // Dynamic analysis
  const getMicroclimateInsights = () => {
    const { temp, humidity, windSpeed, rainfall } = currentWeather;
    const insights = [];

    if (humidity > 80 && temp >= 20 && temp <= 30) {
      insights.push({
        type: 'danger',
        title: 'Fungal Propagation Warning',
        desc: `High humidity (${humidity}%) and warm weather (${temp}°C) create perfect breeding conditions for Fungal Pathogens like Early Blight, Rice Blast, and Late Blight. Monitor fields daily.`
      });
    }

    if (windSpeed > 15) {
      insights.push({
        type: 'warning',
        title: 'Pesticide Spray Spray Warning',
        desc: `Current wind speed (${windSpeed} km/h) exceeds safe spraying levels. Chemical or organic sprays will drift, causing reduced efficacy and toxic hazards to neighboring plots.`
      });
    }

    if (temp > 35 && humidity < 45) {
      insights.push({
        type: 'warning',
        title: 'Sucking Pest Alert',
        desc: `Arid, high-temperature conditions accelerate the multiplication of sucking pests like Spider Mites, Aphids, and Whiteflies. Deploy yellow traps and check leaf undersides.`
      });
    }

    if (rainfall > 20) {
      insights.push({
        type: 'info',
        title: 'Irrigation Suspension Advice',
        desc: `Substantial rainfall (${rainfall} mm) recorded. Defer mechanical irrigation schedules for 48 hours and check crop field drainage pathways to prevent waterlogging.`
      });
    }

    if (insights.length === 0) {
      insights.push({
        type: 'success',
        title: 'Standard Microclimate Conditions',
        desc: 'All measured parameter sets fall within normal thresholds. Perfect weather for standard weeding, compost application, and soil loosening activities.'
      });
    }

    return insights;
  };

  const insights = getMicroclimateInsights();

  // SVG Chart Dimensions
  const chartWidth = 700;
  const chartHeight = 180;
  const padding = 30;

  // Temperature line points calculation
  const tempPoints = forecastData.map((d, i) => {
    const x = padding + (i * (chartWidth - padding * 2)) / (forecastData.length - 1);
    // Map temp (range 20 to 35) to height (chartHeight - padding) to padding
    const y = chartHeight - padding - ((d.temp - 20) * (chartHeight - padding * 2)) / 15;
    return { x, y, val: d.temp, day: d.day };
  });

  const tempPath = tempPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  // Humidity line points calculation
  const humPoints = forecastData.map((d, i) => {
    const x = padding + (i * (chartWidth - padding * 2)) / (forecastData.length - 1);
    // Map humidity (range 40 to 100) to height
    const y = chartHeight - padding - ((d.humidity - 40) * (chartHeight - padding * 2)) / 60;
    return { x, y, val: d.humidity, day: d.day };
  });

  const humPath = humPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto p-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          {t.weather}
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {t.weatherSub} in <span className="font-semibold text-emerald-600 dark:text-emerald-400">{location}</span>
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Temp KPI */}
        <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="bg-orange-50 dark:bg-orange-950/30 p-3 rounded-xl text-orange-600 dark:text-orange-400">
            <Thermometer className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-zinc-450 dark:text-zinc-500 font-semibold uppercase tracking-wider block leading-none">
              Temperature
            </span>
            <span className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 font-mono">
              {currentWeather.temp}°C
            </span>
            <span className="block text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">
              Normal range: 22 - 32°C
            </span>
          </div>
        </div>

        {/* Humidity KPI */}
        <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-xl text-blue-600 dark:text-blue-400">
            <Droplets className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-zinc-450 dark:text-zinc-500 font-semibold uppercase tracking-wider block leading-none">
              Humidity
            </span>
            <span className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 font-mono">
              {currentWeather.humidity}%
            </span>
            <span className="block text-[10px] text-blue-600 dark:text-blue-450 mt-0.5 font-medium">
              High Spore Risk
            </span>
          </div>
        </div>

        {/* Rainfall KPI */}
        <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="bg-sky-50 dark:bg-sky-950/30 p-3 rounded-xl text-sky-600 dark:text-sky-400">
            <CloudRain className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-zinc-450 dark:text-zinc-500 font-semibold uppercase tracking-wider block leading-none">
              Rainfall
            </span>
            <span className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 font-mono">
              {currentWeather.rainfall} mm
            </span>
            <span className="block text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">
              Cumulative last 24h
            </span>
          </div>
        </div>

        {/* Wind Speed KPI */}
        <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="bg-teal-50 dark:bg-teal-950/30 p-3 rounded-xl text-teal-600 dark:text-teal-400">
            <Wind className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-zinc-450 dark:text-zinc-500 font-semibold uppercase tracking-wider block leading-none">
              Wind Speed
            </span>
            <span className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 font-mono">
              {currentWeather.windSpeed} km/h
            </span>
            <span className={`block text-[10px] font-medium mt-0.5 ${currentWeather.windSpeed > 15 ? 'text-amber-600 dark:text-amber-450' : 'text-emerald-600 dark:text-emerald-400'}`}>
              {currentWeather.windSpeed > 15 ? 'Unsafe for spraying' : 'Safe for spraying'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Charts & Warnings */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left 2 Cols: 7-day Visualizations */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Temperature Chart Card */}
          <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              7-Day Temperature Trend (°C)
            </h3>
            
            {/* SVG Plot */}
            <div className="relative overflow-x-auto">
              <svg className="w-full min-w-[600px] h-[190px]" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
                {/* Grid Lines */}
                <line x1={padding} y1={padding} x2={chartWidth - padding} y2={padding} stroke="rgba(128, 128, 128, 0.1)" strokeDasharray="3" />
                <line x1={padding} y1={chartHeight / 2} x2={chartWidth - padding} y2={chartHeight / 2} stroke="rgba(128, 128, 128, 0.1)" strokeDasharray="3" />
                <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="rgba(128, 128, 128, 0.2)" />

                {/* X axis labels */}
                {tempPoints.map((p, idx) => (
                  <text 
                    key={idx} 
                    x={p.x} 
                    y={chartHeight - 8} 
                    textAnchor="middle" 
                    className="text-[10px] font-semibold fill-zinc-400 dark:fill-zinc-500"
                  >
                    {p.day}
                  </text>
                ))}

                {/* Y axis helpers */}
                <text x={padding - 8} y={padding + 4} textAnchor="end" className="text-[9px] fill-zinc-400 font-mono">35°C</text>
                <text x={padding - 8} y={chartHeight / 2 + 4} textAnchor="end" className="text-[9px] fill-zinc-400 font-mono">27°C</text>
                <text x={padding - 8} y={chartHeight - padding + 4} textAnchor="end" className="text-[9px] fill-zinc-400 font-mono">20°C</text>

                {/* Path with Gradient Fill */}
                <path
                  d={`${tempPath} L ${tempPoints[tempPoints.length - 1].x} ${chartHeight - padding} L ${tempPoints[0].x} ${chartHeight - padding} Z`}
                  fill="url(#tempGrad)"
                  opacity="0.1"
                />
                
                {/* Main Line */}
                <path
                  d={tempPath}
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Definition for Gradients */}
                <defs>
                  <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Data Points / Interactivity */}
                {tempPoints.map((p, idx) => (
                  <g 
                    key={idx}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredDay(idx)}
                    onMouseLeave={() => setHoveredDay(null)}
                  >
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={hoveredDay === idx ? '6' : '4'}
                      className="fill-white dark:fill-zinc-950 stroke-orange-500 transition-all"
                      strokeWidth="2"
                    />
                    {hoveredDay === idx && (
                      <g>
                        <rect 
                          x={p.x - 22} 
                          y={p.y - 28} 
                          width="44" 
                          height="20" 
                          rx="4" 
                          className="fill-zinc-900 dark:fill-zinc-100 shadow-lg"
                        />
                        <text 
                          x={p.x} 
                          y={p.y - 14} 
                          textAnchor="middle" 
                          className="text-[10px] font-bold fill-white dark:fill-zinc-950"
                        >
                          {p.val}°C
                        </text>
                      </g>
                    )}
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Humidity Chart Card */}
          <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              7-Day Relative Humidity Trend (%)
            </h3>
            
            {/* SVG Plot */}
            <div className="relative overflow-x-auto">
              <svg className="w-full min-w-[600px] h-[190px]" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
                {/* Grid Lines */}
                <line x1={padding} y1={padding} x2={chartWidth - padding} y2={padding} stroke="rgba(128, 128, 128, 0.1)" strokeDasharray="3" />
                <line x1={padding} y1={chartHeight / 2} x2={chartWidth - padding} y2={chartHeight / 2} stroke="rgba(128, 128, 128, 0.1)" strokeDasharray="3" />
                <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="rgba(128, 128, 128, 0.2)" />

                {/* X axis labels */}
                {humPoints.map((p, idx) => (
                  <text 
                    key={idx} 
                    x={p.x} 
                    y={chartHeight - 8} 
                    textAnchor="middle" 
                    className="text-[10px] font-semibold fill-zinc-400 dark:fill-zinc-500"
                  >
                    {p.day}
                  </text>
                ))}

                {/* Y axis helpers */}
                <text x={padding - 8} y={padding + 4} textAnchor="end" className="text-[9px] fill-zinc-400 font-mono">100%</text>
                <text x={padding - 8} y={chartHeight / 2 + 4} textAnchor="end" className="text-[9px] fill-zinc-400 font-mono">70%</text>
                <text x={padding - 8} y={chartHeight - padding + 4} textAnchor="end" className="text-[9px] fill-zinc-400 font-mono">40%</text>

                {/* Path with Gradient Fill */}
                <path
                  d={`${humPath} L ${humPoints[humPoints.length - 1].x} ${chartHeight - padding} L ${humPoints[0].x} ${chartHeight - padding} Z`}
                  fill="url(#humGrad)"
                  opacity="0.1"
                />
                
                {/* Main Line */}
                <path
                  d={humPath}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Definition for Gradients */}
                <defs>
                  <linearGradient id="humGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Data Points */}
                {humPoints.map((p, idx) => (
                  <g 
                    key={idx}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredDay(idx)}
                    onMouseLeave={() => setHoveredDay(null)}
                  >
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={hoveredDay === idx ? '6' : '4'}
                      className="fill-white dark:fill-zinc-950 stroke-blue-500 transition-all"
                      strokeWidth="2"
                    />
                    {hoveredDay === idx && (
                      <g>
                        <rect 
                          x={p.x - 22} 
                          y={p.y - 28} 
                          width="44" 
                          height="20" 
                          rx="4" 
                          className="fill-zinc-900 dark:fill-zinc-100 shadow-lg"
                        />
                        <text 
                          x={p.x} 
                          y={p.y - 14} 
                          textAnchor="middle" 
                          className="text-[10px] font-bold fill-white dark:fill-zinc-950"
                        >
                          {p.val}%
                        </text>
                      </g>
                    )}
                  </g>
                ))}
              </svg>
            </div>
          </div>

        </div>

        {/* Right 1 Col: Insights & Warnings */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Info className="w-4 h-4 text-emerald-500" />
              Microclimate Agro-Insights
            </h3>

            <div className="space-y-3">
              {insights.map((insight, idx) => (
                <div 
                  key={idx}
                  className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1.5 ${
                    insight.type === 'danger'
                      ? 'bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950/20 dark:border-rose-900/40 dark:text-rose-300'
                      : (insight.type === 'warning'
                          ? 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950/20 dark:border-amber-900/40 dark:text-amber-300'
                          : (insight.type === 'info'
                              ? 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950/20 dark:border-blue-900/40 dark:text-blue-300'
                              : 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-900/40 dark:text-emerald-300'))
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold uppercase tracking-wide">
                    {insight.type === 'danger' && <AlertTriangle className="w-3.5 h-3.5" />}
                    {insight.type === 'warning' && <AlertTriangle className="w-3.5 h-3.5" />}
                    {insight.type === 'info' && <Info className="w-3.5 h-3.5" />}
                    {insight.type === 'success' && <CheckCircle className="w-3.5 h-3.5" />}
                    {insight.title}
                  </div>
                  <p className="text-zinc-650 dark:text-zinc-400 font-medium">
                    {insight.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Advice Tip Card */}
          <div className="bg-emerald-500 text-white rounded-2xl p-5 shadow-md shadow-emerald-500/10 space-y-2">
            <h4 className="font-bold text-sm">Advisor Tips of the Day</h4>
            <p className="text-xs text-emerald-100 leading-relaxed">
              If planning foliar spray application, prioritize early mornings (5:30 AM to 8:00 AM) or evenings after 5:30 PM. Winds are calmest and stomatal opening is highest, ensuring maximum plant absorption and safety to beneficial pollinators.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
