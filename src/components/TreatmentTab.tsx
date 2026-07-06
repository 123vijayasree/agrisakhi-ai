import React, { useState } from 'react';
import { 
  Leaf, 
  Beaker, 
  Search, 
  AlertTriangle, 
  Printer, 
  Share2, 
  FileText 
} from 'lucide-react';
import { AGRICULTURAL_DB, CROPS, VERNACULAR_TEXTS } from '../data/agriculturalDb';

interface TreatmentTabProps {
  language: string;
}

export const TreatmentTab: React.FC<TreatmentTabProps> = ({ language }) => {
  const t = VERNACULAR_TEXTS[language] || VERNACULAR_TEXTS.en;

  const [selectedCrop, setSelectedCrop] = useState<string>('Tomato');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<'all' | 'organic' | 'chemical'>('all');
  const [activeDiseaseId, setActiveDiseaseId] = useState<string>('');

  // Get diseases matching filter criteria
  const getFilteredDiseases = () => {
    let list = AGRICULTURAL_DB.filter(d => d.crop === selectedCrop);
    
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter(d => 
        d.name.toLowerCase().includes(term) || 
        d.scientificName?.toLowerCase().includes(term) ||
        d.symptoms.some(s => s.toLowerCase().includes(term))
      );
    }
    
    return list;
  };

  const filteredDiseases = getFilteredDiseases();

  // If no active disease is set, pick the first one from list
  React.useEffect(() => {
    if (filteredDiseases.length > 0 && !filteredDiseases.some(d => d.id === activeDiseaseId)) {
      setActiveDiseaseId(filteredDiseases[0].id);
    }
  }, [selectedCrop, searchTerm, filteredDiseases]);

  const activeDisease = AGRICULTURAL_DB.find(d => d.id === activeDiseaseId);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto p-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            {t.treatments}
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {t.treatmentsSub}
          </p>
        </div>
      </div>

      {/* Main Grid Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Col: Disease List & Filters */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-4">
            
            {/* Crop Selector */}
            <div>
              <span className="block text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider mb-2">
                Filter by Crop
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {CROPS.map(crop => (
                  <button
                    key={crop}
                    onClick={() => {
                      setSelectedCrop(crop);
                      setActiveDiseaseId('');
                    }}
                    className={`px-2 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      selectedCrop === crop
                        ? 'bg-emerald-500 border-emerald-600 text-white font-bold'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-650 hover:bg-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-850'
                    }`}
                  >
                    {crop}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 dark:text-zinc-500 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search disease or pathogen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-9 pr-4 py-2.5 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none dark:text-white"
              />
            </div>

            {/* Treatment Type Segmented Control */}
            <div>
              <span className="block text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider mb-2">
                Protocol Category
              </span>
              <div className="flex bg-zinc-55 dark:bg-zinc-900/60 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
                {(['all', 'organic', 'chemical'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`flex-1 text-[11px] py-1.5 font-bold rounded-lg transition-all capitalize cursor-pointer ${
                      filterType === type
                        ? 'bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                        : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-350'
                    }`}
                  >
                    {type === 'all' ? 'Compare Both' : `${type}`}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Disease List Results */}
          <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm space-y-2 max-h-[400px] overflow-y-auto">
            <span className="block text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider mb-2 px-1">
              Common Diseases ({filteredDiseases.length})
            </span>
            {filteredDiseases.length > 0 ? (
              filteredDiseases.map((disease) => {
                const isActive = disease.id === activeDiseaseId;
                return (
                  <button
                    key={disease.id}
                    onClick={() => setActiveDiseaseId(disease.id)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                      isActive
                        ? 'bg-emerald-50 border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-800/80 text-emerald-850 dark:text-emerald-450 shadow-sm'
                        : 'bg-white border-zinc-100 hover:bg-zinc-50 dark:bg-[#0c0c0f] dark:border-zinc-850 dark:hover:bg-zinc-900/50'
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-xs text-zinc-900 dark:text-zinc-100 leading-tight">
                        {disease.name}
                      </h4>
                      <span className="text-[10px] italic text-zinc-500 dark:text-zinc-500 font-medium">
                        {disease.scientificName || 'Scientific name unknown'}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-850 text-zinc-650 dark:text-zinc-400">
                      {disease.type}
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="text-center py-8 text-xs text-zinc-450">
                No diseases found matching filters.
              </div>
            )}
          </div>
        </div>

        {/* Right 2 Cols: Details comparison */}
        <div className="lg:col-span-2">
          {activeDisease ? (
            <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-6">
              {/* Header inside details */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-zinc-100 dark:border-zinc-850 pb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/40 text-emerald-850 dark:text-emerald-400">
                      {selectedCrop}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-850 text-zinc-700 dark:text-zinc-300">
                      {activeDisease.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                    {activeDisease.name} Treatment Protocols
                  </h3>
                  <span className="text-xs italic text-zinc-400 font-medium">
                    Pathogen agent: {activeDisease.scientificName}
                  </span>
                </div>

                {/* Print/Share Actions */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => window.print()}
                    className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 bg-white dark:bg-zinc-900 shadow-sm cursor-pointer"
                    title="Print Treatment Advisory Card"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(`AgriSakhi Advisory: Treatment for ${activeDisease.name} in ${selectedCrop}. Organic: ${activeDisease.treatments[0]?.name}, Chemical: ${activeDisease.treatments[1]?.name || 'N/A'}`);
                      alert('Advisory copied to clipboard!');
                    }}
                    className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 bg-white dark:bg-zinc-900 shadow-sm cursor-pointer"
                    title="Copy Advisory to Clipboard"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Specific treatments side-by-side or filtered */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {activeDisease.treatments
                  .filter(t => filterType === 'all' || t.type === filterType)
                  .map((t, idx) => (
                    <div 
                      key={idx}
                      className={`p-5 rounded-xl border flex flex-col justify-between gap-4 ${
                        t.type === 'organic' 
                          ? 'bg-emerald-50/10 border-emerald-250 dark:bg-emerald-950/5 dark:border-emerald-800/60'
                          : 'bg-zinc-50/40 border-zinc-200 dark:bg-zinc-900/10 dark:border-zinc-800/80'
                      }`}
                    >
                      <div>
                        {/* Type indicator and eco-rating */}
                        <div className="flex justify-between items-center mb-3">
                          <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                            t.type === 'organic' 
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400' 
                              : 'bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                          }`}>
                            {t.type === 'organic' ? <Leaf className="w-3.5 h-3.5" /> : <Beaker className="w-3.5 h-3.5" />}
                            {t.type} Solution
                          </span>

                          {t.type === 'organic' ? (
                            <div className="flex text-emerald-600 dark:text-emerald-400 text-xs">
                              {Array.from({ length: t.ecoFriendlyRating }).map((_, i) => (
                                <Leaf key={i} className="w-3.5 h-3.5 fill-current" />
                              ))}
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-950/10 px-1.5 py-0.5 rounded border border-amber-250/20">
                              <AlertTriangle className="w-3 h-3" /> Toxic Class II
                            </div>
                          )}
                        </div>

                        <h4 className="font-bold text-base text-zinc-900 dark:text-zinc-50 mb-2">
                          {t.name}
                        </h4>
                        
                        <div className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                          <p>
                            <strong className="text-zinc-500">Active Compound:</strong><br /> 
                            <span className="font-medium text-zinc-800 dark:text-zinc-200">{t.ingredient}</span>
                          </p>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="bg-white dark:bg-zinc-950 p-2 rounded-lg border border-zinc-150 dark:border-zinc-850">
                              <strong className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wide block">Dosage</strong>
                              <span className="font-mono font-bold text-zinc-850 dark:text-zinc-200">{t.dosage}</span>
                            </div>
                            <div className="bg-white dark:bg-zinc-950 p-2 rounded-lg border border-zinc-150 dark:border-zinc-850">
                              <strong className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wide block">Frequency</strong>
                              <span className="font-bold text-zinc-850 dark:text-zinc-200">{t.frequency}</span>
                            </div>
                          </div>
                          <p className="mt-3 bg-white dark:bg-zinc-950 p-2.5 rounded-lg border border-zinc-150 dark:border-zinc-850 leading-relaxed">
                            <strong className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wide block mb-1">Application Steps</strong>
                            {t.application}
                          </p>
                        </div>
                      </div>

                      {t.safetyNote && (
                        <div className="text-[10px] leading-relaxed text-zinc-500 dark:text-zinc-400 italic bg-amber-500/5 dark:bg-amber-950/10 p-3 rounded-lg border border-amber-500/10">
                          <strong>Safety Advisory:</strong> {t.safetyNote}
                        </div>
                      )}
                    </div>
                  ))}
              </div>

              {/* Favorable Environment Warning */}
              <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs space-y-1">
                <span className="font-bold text-zinc-850 dark:text-zinc-200 block">Favorable Infection Environment</span>
                <p className="text-zinc-500 dark:text-zinc-400">
                  This pathogen propagates rapidly under: <strong className="text-zinc-700 dark:text-zinc-300 font-semibold">{activeDisease.favorableWeather}</strong>
                </p>
              </div>

              {/* Prevention Rules checklist */}
              <div className="border-t border-zinc-100 dark:border-zinc-850 pt-5">
                <h4 className="text-sm font-bold text-zinc-850 dark:text-zinc-200 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-500" />
                  Long-term Cultural Practices & Prevention
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-zinc-650 dark:text-zinc-400">
                  {activeDisease.prevention.map((p, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-12 text-center shadow-sm">
              <Search className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-350">Select a crop disease to view treatment protocols</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
