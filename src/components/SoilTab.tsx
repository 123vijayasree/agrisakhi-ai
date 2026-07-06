import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sliders, 
  AlertCircle, 
  ThumbsUp, 
  BookOpen 
} from 'lucide-react';
import { SOIL_RECOMMENDER, CROPS, VERNACULAR_TEXTS } from '../data/agriculturalDb';

interface SoilTabProps {
  language: string;
}

export const SoilTab: React.FC<SoilTabProps> = ({ language }) => {
  const t = VERNACULAR_TEXTS[language] || VERNACULAR_TEXTS.en;

  const [selectedCrop, setSelectedCrop] = useState<string>('Tomato');
  
  // Soil Form Inputs
  const [phInput, setPhInput] = useState<string>('6.5');
  const [nitrogen, setNitrogen] = useState<'low' | 'optimal' | 'high'>('optimal');
  const [phosphorus, setPhosphorus] = useState<'low' | 'optimal' | 'high'>('low');
  const [potassium, setPotassium] = useState<'low' | 'optimal' | 'high'>('optimal');
  
  const [report, setReport] = useState<{
    pHStatus: 'low' | 'optimal' | 'high';
    phAdvice: string;
    npkAdvice: string[];
  } | null>(null);

  const recommender = SOIL_RECOMMENDER.find(r => r.crop === selectedCrop);

  const runAnalysis = () => {
    if (!recommender) return;
    const ph = parseFloat(phInput);
    
    // Parse pH optimal range (e.g. "6.0 - 6.8")
    const phClean = recommender.optimalPh.split(' ')[0];
    const [minPh, maxPh] = phClean.split('-').map(Number);
    
    let pHStatus: 'low' | 'optimal' | 'high' = 'optimal';
    let phAdvice = '';

    if (isNaN(ph) || ph < 1 || ph > 14) {
      alert('Please enter a valid pH value between 1 and 14');
      return;
    }

    if (ph < minPh) {
      pHStatus = 'low';
      phAdvice = recommender.remedies.lowPh;
    } else if (ph > maxPh) {
      pHStatus = 'high';
      phAdvice = recommender.remedies.highPh;
    } else {
      pHStatus = 'optimal';
      phAdvice = 'Your soil pH is in the optimal range. No lime or sulfur additions needed.';
    }

    // NPK Advice
    const npkAdvice: string[] = [];
    if (nitrogen === 'low') {
      npkAdvice.push(`Nitrogen Deficiency: ${recommender.deficiencySymptoms.N} Remedy: ${recommender.remedies.lowN}`);
    }
    if (phosphorus === 'low') {
      npkAdvice.push(`Phosphorus Deficiency: ${recommender.deficiencySymptoms.P} Remedy: ${recommender.remedies.lowP}`);
    }
    if (potassium === 'low') {
      npkAdvice.push(`Potassium Deficiency: ${recommender.deficiencySymptoms.K} Remedy: ${recommender.remedies.lowK}`);
    }

    setReport({ pHStatus, phAdvice, npkAdvice });
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto p-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          {t.soil}
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {t.soilSub}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Cols: Input Form & Soil Report */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-md"></span>
              Soil Parameters Entry
            </h3>

            {/* Crop Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Target Crop
              </label>
              <div className="flex flex-wrap gap-2">
                {CROPS.map(crop => (
                  <button
                    key={crop}
                    onClick={() => {
                      setSelectedCrop(crop);
                      setReport(null);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      selectedCrop === crop
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-400 font-bold'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-650 hover:bg-zinc-150 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-850'
                    }`}
                  >
                    {crop}
                  </button>
                ))}
              </div>
            </div>

            {/* Parameter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Soil pH input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Soil pH Level
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    max="14"
                    step="0.1"
                    value={phInput}
                    onChange={(e) => {
                      setPhInput(e.target.value);
                      setReport(null);
                    }}
                    className="w-24 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-sm font-semibold font-mono focus:outline-none dark:text-white"
                  />
                  <div className="text-xs text-zinc-450 dark:text-zinc-500">
                    Optimal range: <strong className="text-zinc-700 dark:text-zinc-300 font-semibold">{recommender?.optimalPh}</strong>
                  </div>
                </div>
              </div>

              {/* NPK levels */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Primary Nutrients (N - P - K)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {/* Nitrogen */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-zinc-400 text-center">N (Nitrogen)</span>
                    <select
                      value={nitrogen}
                      onChange={(e) => {
                        setNitrogen(e.target.value as any);
                        setReport(null);
                      }}
                      className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-1.5 text-xs focus:outline-none dark:text-white"
                    >
                      <option value="low">Low</option>
                      <option value="optimal">Optimal</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  {/* Phosphorus */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-zinc-400 text-center">P (Phosphorus)</span>
                    <select
                      value={phosphorus}
                      onChange={(e) => {
                        setPhosphorus(e.target.value as any);
                        setReport(null);
                      }}
                      className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-1.5 text-xs focus:outline-none dark:text-white"
                    >
                      <option value="low">Low</option>
                      <option value="optimal">Optimal</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  {/* Potassium */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-zinc-400 text-center">K (Potassium)</span>
                    <select
                      value={potassium}
                      onChange={(e) => {
                        setPotassium(e.target.value as any);
                        setReport(null);
                      }}
                      className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-1.5 text-xs focus:outline-none dark:text-white"
                    >
                      <option value="low">Low</option>
                      <option value="optimal">Optimal</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Run button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={runAnalysis}
                className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl px-5 py-2.5 font-semibold text-xs transition-all shadow-md shadow-emerald-600/10 cursor-pointer"
              >
                Analyze Soil & Advise
              </button>
            </div>
          </div>

          {/* Analysis Report Output Card */}
          {report && (
            <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-5">
              <div className="border-b border-zinc-100 dark:border-zinc-850 pb-4">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  Soil Health Analysis Advisory Report
                </h3>
                <span className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wide">
                  Optimized for crop: {selectedCrop}
                </span>
              </div>

              {/* pH Diagnosis */}
              <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-zinc-150 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-900/10 items-start">
                <Sliders className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">pH Assessment:</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${
                      report.pHStatus === 'optimal' 
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-450' 
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400'
                    }`}>
                      {report.pHStatus} ({phInput})
                    </span>
                  </div>
                  <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed">
                    {report.phAdvice}
                  </p>
                </div>
              </div>

              {/* NPK Diagnosis */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-250 block">Nutrient Deficiency Remedies</span>
                {report.npkAdvice.length > 0 ? (
                  <div className="space-y-2">
                    {report.npkAdvice.map((advice, idx) => (
                      <div key={idx} className="flex gap-2.5 p-3 bg-amber-500/5 border border-amber-250/20 rounded-xl text-xs text-amber-905 dark:text-amber-300">
                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" />
                        <p>{advice}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex gap-2.5 p-4 bg-emerald-500/5 border border-emerald-250/20 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 items-start">
                    <ThumbsUp className="w-4 h-4 mt-0.5 shrink-0 text-emerald-500" />
                    <div>
                      <span className="font-bold block mb-0.5">Perfect Nutrient Balance!</span>
                      <p>All Primary macronutrient classes (NPK) show optimal values. Maintain this balance with standard soil rotation, mulching, and farmyard manure splits.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Col: Optimal soil matrix reference */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-500" />
              Optimal Soil Matrix
            </h3>

            {recommender && (
              <div className="space-y-3 text-xs">
                <div className="border-b border-zinc-100 dark:border-zinc-850 pb-2.5">
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold block uppercase">Target Crop</span>
                  <span className="font-bold text-zinc-850 dark:text-zinc-200">{recommender.crop}</span>
                </div>
                <div className="border-b border-zinc-100 dark:border-zinc-850 pb-2.5">
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold block uppercase">{t.optimalPh}</span>
                  <span className="font-bold text-zinc-850 dark:text-zinc-200">{recommender.optimalPh}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold block uppercase">{t.optimalNpk}</span>
                  <span className="font-mono font-bold text-zinc-850 dark:text-zinc-205">{recommender.optimalNpk}</span>
                  <span className="block text-[9px] text-zinc-400 mt-0.5">(N:P:K active dosage per Hectare)</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
