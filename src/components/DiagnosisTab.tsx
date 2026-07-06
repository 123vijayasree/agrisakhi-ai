import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Leaf, 
  Beaker, 
  CheckCircle, 
  HelpCircle, 
  Clock, 
  ChevronRight, 
  CloudSun
} from 'lucide-react';
import { AGRICULTURAL_DB, CROPS, VERNACULAR_TEXTS } from '../data/agriculturalDb';
import type { Disease } from '../data/agriculturalDb';

interface DiagnosisTabProps {
  language: string;
  currentWeather: { temp: number; humidity: number; windSpeed: number };
}

interface DiagnosisHistory {
  date: string;
  crop: string;
  diseaseName: string;
  severity: string;
}

export const DiagnosisTab: React.FC<DiagnosisTabProps> = ({ language, currentWeather }) => {
  const t = VERNACULAR_TEXTS[language] || VERNACULAR_TEXTS.en;
  
  const [selectedCrop, setSelectedCrop] = useState<string>('Tomato');
  const [symptomText, setSymptomText] = useState<string>('');
  const [diagnosedDisease, setDiagnosedDisease] = useState<Disease | null>(null);
  const [confidence, setConfidence] = useState<number>(0);
  const [isDiagnosing, setIsDiagnosing] = useState<boolean>(false);
  const [severity, setSeverity] = useState<string>('Medium');
  
  // Local state for diagnosis history
  const [history, setHistory] = useState<DiagnosisHistory[]>([
    { date: 'Jun 28, 2026', crop: 'Tomato', diseaseName: 'Early Blight', severity: 'Low' },
    { date: 'Jul 02, 2026', crop: 'Cotton', diseaseName: 'American Bollworm', severity: 'High' }
  ]);

  // Common symptoms preset to help farmers input easily
  const symptomsPresets: Record<string, string[]> = {
    Tomato: ['dark spots', 'brown spots', 'curling leaves', 'yellow leaf edges', 'stunted growth'],
    Wheat: ['rust spots', 'orange pustules', 'reddish brown powder', 'damaged stems'],
    Rice: ['spindle shaped spots', 'diamond spots', 'gray centers on leaves', 'rotted neck'],
    Cotton: ['chewed bolls', 'bored holes in squares', 'boll dropping', 'holes in leaves'],
    Potato: ['water soaked lesions', 'white growth under leaves', 'rotting tubers', 'foul odor']
  };

  const handlePresetClick = (preset: string) => {
    setSymptomText(prev => {
      const cleanPrev = prev.trim();
      if (!cleanPrev) return preset;
      if (cleanPrev.toLowerCase().includes(preset.toLowerCase())) return prev;
      return `${cleanPrev}, ${preset}`;
    });
  };

  const performDiagnosis = () => {
    if (!symptomText.trim()) return;

    setIsDiagnosing(true);
    setDiagnosedDisease(null);

    setTimeout(() => {
      const lowerInput = symptomText.toLowerCase();
      const diseasesForCrop = AGRICULTURAL_DB.filter(d => d.crop === selectedCrop);

      let bestMatch: Disease | null = null;
      let maxScore = 0;
      let matchedWordCount = 0;

      diseasesForCrop.forEach(disease => {
        let score = 0;
        let matchedKeywords = 0;
        
        disease.symptoms.forEach(keyword => {
          if (lowerInput.includes(keyword.toLowerCase())) {
            score += 2;
            matchedKeywords++;
          }
        });

        // Add small fuzzy score for scientific names or types
        if (lowerInput.includes(disease.type.toLowerCase())) score += 1;
        if (disease.scientificName && lowerInput.includes(disease.scientificName.toLowerCase())) score += 2;

        if (score > maxScore) {
          maxScore = score;
          bestMatch = disease;
          matchedWordCount = matchedKeywords;
        }
      });

      if (bestMatch) {
        // Calculate dynamic confidence score (e.g. 50% minimum + match ratio)
        const matchRatio = matchedWordCount / (bestMatch as Disease).symptoms.length;
        const finalConfidence = Math.min(Math.round(55 + matchRatio * 40), 98);
        
        setDiagnosedDisease(bestMatch);
        setConfidence(finalConfidence);
        
        // Random severity based on symptoms description length/words
        const length = symptomText.length;
        const determinedSeverity = length > 80 ? 'High' : (length > 40 ? 'Medium' : 'Low');
        setSeverity(determinedSeverity);

        // Add to history
        const newHistItem: DiagnosisHistory = {
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          crop: selectedCrop,
          diseaseName: (bestMatch as Disease).name,
          severity: determinedSeverity
        };
        setHistory(prev => [newHistItem, ...prev]);

      } else {
        setDiagnosedDisease(null);
        setConfidence(0);
      }
      setIsDiagnosing(false);
    }, 850);
  };

  // Weather analysis to check if current weather conditions exacerbate disease
  const getWeatherWarning = (disease: Disease) => {
    const triggers = disease.weatherTriggers;
    const { temp, humidity } = currentWeather;
    let matches = 0;
    let totalParams = 0;

    if (triggers.minTemp) {
      totalParams++;
      if (temp >= triggers.minTemp && (!triggers.maxTemp || temp <= triggers.maxTemp)) matches++;
    }
    if (triggers.minHumidity) {
      totalParams++;
      if (humidity >= triggers.minHumidity) matches++;
    }
    if (triggers.maxHumidity) {
      totalParams++;
      if (humidity <= triggers.maxHumidity) matches++;
    }

    if (totalParams > 0 && matches / totalParams >= 0.5) {
      return {
        isHighRisk: true,
        message: `⚠️ Favorable Weather Alert: Current weather (${temp}°C, ${humidity}% humidity) is highly optimal for ${disease.name} development. Spread risk is high.`
      };
    }

    return {
      isHighRisk: false,
      message: `Weather correlation: Current weather parameters present a standard growth risk for this condition.`
    };
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto p-6 animate-fade-in">
      {/* Tab Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            {t.doctor}
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {t.doctorSub}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Cols: Form & Presets */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-md"></span>
              New Diagnosis
            </h3>

            <div className="space-y-4">
              {/* Crop Picker */}
              <div>
                <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                  {t.cropLabel}
                </label>
                <div className="flex flex-wrap gap-2">
                  {CROPS.map((crop) => (
                    <button
                      key={crop}
                      onClick={() => {
                        setSelectedCrop(crop);
                        setSymptomText('');
                      }}
                      className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 cursor-pointer ${
                        selectedCrop === crop
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-400 font-bold shadow-sm'
                          : 'bg-white border-zinc-250 text-zinc-650 hover:bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-850'
                      }`}
                    >
                      {crop}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Description */}
              <div>
                <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                  {t.symptomsLabel}
                </label>
                <textarea
                  value={symptomText}
                  onChange={(e) => setSymptomText(e.target.value)}
                  placeholder={t.inputPlaceholder}
                  rows={4}
                  className="w-full bg-zinc-55 border border-zinc-200 dark:border-zinc-800 dark:bg-[#09090b] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-zinc-850 dark:text-zinc-100 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                />
              </div>

              {/* Preset Symptoms tags */}
              <div>
                <span className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">
                  Quick Symptom Presets (Click to add)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {symptomsPresets[selectedCrop]?.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handlePresetClick(preset)}
                      className="px-2.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200/60 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:border-zinc-800 dark:text-zinc-400 text-xs transition-colors cursor-pointer"
                    >
                      + {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Diagnose Trigger Button */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={performDiagnosis}
                  disabled={!symptomText.trim() || isDiagnosing}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl px-6 py-3 font-semibold text-sm transition-all shadow-md shadow-emerald-600/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isDiagnosing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      Diagnosing...
                    </>
                  ) : (
                    t.diagnoseBtn
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Diagnostic results card */}
          {diagnosedDisease && (
            <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-zinc-100 dark:border-zinc-850 pb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-400">
                      {diagnosedDisease.type} Issue
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                      severity === 'High' 
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-450' 
                        : (severity === 'Medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400')
                    }`}>
                      {severity} Severity
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                    {diagnosedDisease.name}
                  </h3>
                  {diagnosedDisease.scientificName && (
                    <span className="text-xs font-medium italic text-zinc-500">
                      Pathogen: {diagnosedDisease.scientificName}
                    </span>
                  )}
                </div>

                {/* Confidence Bar */}
                <div className="flex flex-col items-end shrink-0">
                  <span className="text-xs text-zinc-500 font-semibold mb-1">
                    {t.confidenceScore}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-zinc-200 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${confidence}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      {confidence}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Disease Description */}
              <div>
                <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-250 mb-2">Description</h4>
                <p className="text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed">
                  {diagnosedDisease.description}
                </p>
              </div>

              {/* Weather Analysis Component */}
              {(() => {
                const weatherCheck = getWeatherWarning(diagnosedDisease);
                return (
                  <div className={`p-4 rounded-xl border text-sm flex gap-3 ${
                    weatherCheck.isHighRisk 
                      ? 'bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/40 text-amber-800 dark:text-amber-300'
                      : 'bg-zinc-50 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
                  }`}>
                    <CloudSun className={`w-5 h-5 shrink-0 ${weatherCheck.isHighRisk ? 'text-amber-600 dark:text-amber-400' : 'text-zinc-400'}`} />
                    <div>
                      <span className="font-semibold block mb-0.5">Microclimate Analysis</span>
                      <span className="text-xs">{weatherCheck.message}</span>
                    </div>
                  </div>
                );
              })()}

              {/* Treatment Protocols split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {diagnosedDisease.treatments.map((treatment) => (
                  <div 
                    key={treatment.name}
                    className={`p-4 rounded-xl border flex flex-col justify-between gap-3 bg-zinc-50/50 dark:bg-zinc-900/10 ${
                      treatment.type === 'organic' 
                        ? 'border-emerald-100 dark:border-emerald-950' 
                        : 'border-zinc-200 dark:border-zinc-800'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                          treatment.type === 'organic' 
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-450' 
                            : 'bg-zinc-250 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                        }`}>
                          {treatment.type === 'organic' ? <Leaf className="w-3 h-3" /> : <Beaker className="w-3 h-3" />}
                          {treatment.type === 'organic' ? t.organicSol : t.chemicalSol}
                        </span>
                        
                        {/* Leaf rating or caution icon */}
                        {treatment.type === 'organic' ? (
                          <div className="flex text-emerald-600 dark:text-emerald-400 text-xs">
                            {Array.from({ length: treatment.ecoFriendlyRating }).map((_, i) => (
                              <Leaf key={i} className="w-3.5 h-3.5 fill-current" />
                            ))}
                          </div>
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                        )}
                      </div>

                      <h5 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-1">{treatment.name}</h5>
                      <div className="space-y-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                        <p><strong>Active:</strong> {treatment.ingredient}</p>
                        <p><strong>Dosage:</strong> <span className="font-mono text-zinc-800 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-1 rounded">{treatment.dosage}</span></p>
                        <p><strong>Frequency:</strong> {treatment.frequency}</p>
                        <p className="mt-2 text-zinc-650 dark:text-zinc-350 bg-white dark:bg-zinc-950 p-2 rounded-lg border border-zinc-100 dark:border-zinc-900">
                          {treatment.application}
                        </p>
                      </div>
                    </div>

                    {treatment.safetyNote && (
                      <div className="text-[10px] text-zinc-400 dark:text-zinc-500 italic bg-amber-50/50 dark:bg-amber-950/10 p-2 rounded border border-amber-200/30">
                        <strong>Safety Note:</strong> {treatment.safetyNote}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Prevention Rules */}
              <div className="border-t border-zinc-100 dark:border-zinc-850 pt-5">
                <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-250 mb-3">{t.preventiveSteps}</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                  {diagnosedDisease.prevention.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* No Match Fallback */}
          {!diagnosedDisease && symptomText.trim() && !isDiagnosing && (
            <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm text-center">
              <HelpCircle className="w-12 h-12 text-zinc-350 mx-auto mb-3" />
              <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200">No matching crop disease found</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 max-w-sm mx-auto mt-1.5">
                Try listing general symptom keywords like "curling leaves", "brown spots", "orange rust", or click the symptom presets above.
              </p>
            </div>
          )}
        </div>

        {/* Right 1 Col: Diagnostic History & Quick Tips */}
        <div className="space-y-6">
          {/* History Card */}
          <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-3.5 flex items-center gap-2">
              <Clock className="w-4 h-4 text-zinc-400" />
              Diagnosis History
            </h3>
            <div className="space-y-3">
              {history.map((hist, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-850 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-150 cursor-pointer"
                  onClick={() => {
                    const found = AGRICULTURAL_DB.find(d => d.name === hist.diseaseName);
                    if (found) {
                      setDiagnosedDisease(found);
                      setSelectedCrop(hist.crop);
                      setSymptomText(found.symptoms[0]);
                      setConfidence(88);
                      setSeverity(hist.severity);
                    }
                  }}
                >
                  <div className="min-w-0">
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold">{hist.date}</span>
                    <h4 className="font-bold text-xs text-zinc-800 dark:text-zinc-200 truncate">{hist.crop}: {hist.diseaseName}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      hist.severity === 'High' 
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-450' 
                        : (hist.severity === 'Medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400')
                    }`}>
                      {hist.severity}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guidelines info card */}
          <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 rounded-2xl p-5 shadow-sm">
            <h3 className="text-xs font-bold text-emerald-850 dark:text-emerald-400 uppercase tracking-wider mb-2.5">
              Sakhi Doctor Guidelines
            </h3>
            <ul className="space-y-2 text-xs text-emerald-800/90 dark:text-emerald-300/80">
              <li className="flex gap-2">
                <span className="text-emerald-550 shrink-0">•</span>
                <span>Select the specific crop type before typing symptoms to restrict diagnosis filter.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-550 shrink-0">•</span>
                <span>Include multiple details like leaf color, leaf underside mold, spot shape, and stem damage.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-550 shrink-0">•</span>
                <span>Organic protocols are safer for young crops; use chemical inputs as secondary control measures when disease severity is High.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
