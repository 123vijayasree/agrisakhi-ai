import React, { useState } from 'react';
import { 
  Calendar, 
  ChevronRight, 
  CheckSquare, 
  Square, 
  Play, 
  Clock, 
  Sprout,
  Droplets,
  Bug,
  Award
} from 'lucide-react';
import { CROPS, VERNACULAR_TEXTS } from '../data/agriculturalDb';

interface CalendarTabProps {
  language: string;
}

interface CropStage {
  name: string;
  daysRange: string;
  startDay: number;
  endDay: number;
  icon: any;
  tasks: string[];
}

export const CalendarTab: React.FC<CalendarTabProps> = ({ language }) => {
  const t = VERNACULAR_TEXTS[language] || VERNACULAR_TEXTS.en;

  const [selectedCrop, setSelectedCrop] = useState<string>('Tomato');
  const [sowingDate, setSowingDate] = useState<string>(() => {
    const today = new Date();
    // Default to 25 days ago to place it in the second/third growth stage for visual impact
    today.setDate(today.getDate() - 25);
    return today.toISOString().split('T')[0];
  });

  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  // Defined crop growth stages
  const cropStages: Record<string, CropStage[]> = {
    Tomato: [
      { name: 'Seedling Nursery & Sowing', daysRange: 'Day 0 - 20', startDay: 0, endDay: 20, icon: Sprout, tasks: ['Prepare nursery beds with coco-peat', 'Treat seeds with Trichoderma (10g/kg)', 'Water lightly daily morning', 'Check seedlings for damping-off disease'] },
      { name: 'Transplanting & Early Growth', daysRange: 'Day 21 - 40', startDay: 21, endDay: 40, icon: ChevronRight, tasks: ['Transplant seedlings to main field', 'Install stakes or support strings', 'Apply organic compost / Farmyard Manure', 'First weeding run'] },
      { name: 'Flowering & Irrigation Focus', daysRange: 'Day 41 - 65', startDay: 41, endDay: 65, icon: Droplets, tasks: ['Maintain consistent drip irrigation', 'Apply Boron spray to prevent flower drop', 'Install yellow sticky traps (Whiteflies)', 'Prune lower yellowing leaves'] },
      { name: 'Fruit Development & Pest Alert', daysRange: 'Day 66 - 90', startDay: 66, endDay: 90, icon: Bug, tasks: ['Monitor closely for Early Blight rings', 'Apply Neem oil spray preventative', 'Limit water slightly to enhance sugars', 'Harvest early blush pink fruits'] },
      { name: 'Harvesting & Storing', daysRange: 'Day 91+', startDay: 91, endDay: 130, icon: Award, tasks: ['Pick fully ripe fruits during morning', 'Grade fruits by size and quality', 'Pack in aerated crates', 'Clear crop debris to prevent overwintering pathogens'] }
    ],
    Wheat: [
      { name: 'Sowing & Germination', daysRange: 'Day 0 - 15', startDay: 0, endDay: 15, icon: Sprout, tasks: ['Laser land leveling', 'Treat seeds with Carboxin', 'Sow in rows 22.5cm apart', 'Pre-emergence herbicide application'] },
      { name: 'Tillering & Crown Root Init.', daysRange: 'Day 16 - 35', startDay: 16, endDay: 35, icon: ChevronRight, tasks: ['First irrigation at Crown Root stage (Day 21)', 'Apply first split of Nitrogen (Urea)', 'Manual or chemical weeding', 'Monitor for early Aphids'] },
      { name: 'Jointing & Booting', daysRange: 'Day 36 - 70', startDay: 36, endDay: 70, icon: Droplets, tasks: ['Second irrigation at jointing stage', 'Check flag leaf for stem/leaf rust spots', 'Apply micro-nutrients spray', 'Ensure soil moisture remains optimal'] },
      { name: 'Flowering & Grain Filling', daysRange: 'Day 71 - 100', startDay: 71, endDay: 100, icon: Bug, tasks: ['Irrigate at flowering stage', 'Watch out for head blight or loose smut', 'Bird scaring measures', 'Check grains for milk stage transition'] },
      { name: 'Maturity & Harvesting', daysRange: 'Day 101+', startDay: 101, endDay: 135, icon: Award, tasks: ['Stop irrigation when grain hardens', 'Harvest when moisture is around 12-14%', 'Store in dry bins away from pests', 'Soil preparation for next rotation'] }
    ],
    Rice: [
      { name: 'Seedbed & Nursery', daysRange: 'Day 0 - 25', startDay: 0, endDay: 25, icon: Sprout, tasks: ['Wet bed preparation', 'Soak seeds in salt solution to discard light grains', 'Seed treatment with bio-agents', 'Keep water levels 2cm deep in nursery'] },
      { name: 'Transplanting & Puddling', daysRange: 'Day 26 - 45', startDay: 26, endDay: 45, icon: ChevronRight, tasks: ['Field puddling & leveling', 'Transplant seedlings (2-3 per hill)', 'Keep shallow water depth (2-3cm)', 'Apply basal NPK fertilizer dose'] },
      { name: 'Tillering & Weed Control', daysRange: 'Day 46 - 75', startDay: 46, endDay: 75, icon: Droplets, tasks: ['First weeding session', 'Top dress with Urea', 'Check for stem borer symptoms (dead hearts)', 'Maintain standing water at 5cm'] },
      { name: 'Panicle Initiation & Blast Watch', daysRange: 'Day 76 - 100', startDay: 76, endDay: 100, icon: Bug, tasks: ['Check for Rice Blast diamond spots', 'Apply bio-control (Pseudomonas)', 'Watch out for Brown Planthoppers', 'Monitor soil water levels'] },
      { name: 'Harvest & Threshing', daysRange: 'Day 101+', startDay: 101, endDay: 140, icon: Award, tasks: ['Drain field 10 days before harvesting', 'Harvest when 80% panicles turn golden', 'Thresh and dry grains immediately to 14% moisture', 'Store in jute bags in ventilated warehouse'] }
    ],
    Cotton: [
      { name: 'Sowing & Early Growth', daysRange: 'Day 0 - 20', startDay: 0, endDay: 20, icon: Sprout, tasks: ['Sow seeds in warm damp soil', 'Maintain spacing of 90x60cm', 'Check for soil germination success', 'Apply pre-emergence weed control'] },
      { name: 'Squaring & Branching', daysRange: 'Day 21 - 50', startDay: 21, endDay: 50, icon: ChevronRight, tasks: ['Apply first Nitrogen fertilizer top dress', 'Inter-culture weeding operation', 'Monitor for sucking pests (Jassids/Thrips)', 'Nip terminal buds at Day 45 to promote branches'] },
      { name: 'Flowering & Boll Init.', daysRange: 'Day 51 - 85', startDay: 51, endDay: 85, icon: Droplets, tasks: ['Deep irrigation cycle', 'Install pheromone traps for Bollworms', 'Apply boron/magnesium micronutrients', 'Prune weak lower branches'] },
      { name: 'Boll Development & Splitting', daysRange: 'Day 86 - 120', startDay: 86, endDay: 120, icon: Bug, tasks: ['Monitor boll worm larvae counts', 'Apply Bt / Neem sprays if above ETL', 'Check for boll rot during high rains', 'Ensure field is weed-free for easy picking'] },
      { name: 'Picking & Storage', daysRange: 'Day 121+', startDay: 121, endDay: 160, icon: Award, tasks: ['Harvest only fully open cotton bolls', 'Avoid picking wet cotton in early morning', 'Sort clean cotton from stained bolls', 'Deliver lint to ginning mill APMC yard'] }
    ],
    Potato: [
      { name: 'Sprouting & Planting', daysRange: 'Day 0 - 20', startDay: 0, endDay: 20, icon: Sprout, tasks: ['Chitting/sprouting of seed tubers', 'Apply organic manure to furrows', 'Plant seed tubers 10cm deep', 'Check for soil warmth (>10°C)'] },
      { name: 'Emergence & Earthing Up', daysRange: 'Day 21 - 40', startDay: 21, endDay: 40, icon: ChevronRight, tasks: ['Perform earthing up (hilling) of soil', 'Apply Urea top dress', 'Check for late blight warnings', 'Keep field weed-free to prevent host bugs'] },
      { name: 'Tuber Initiation & Bloom', daysRange: 'Day 41 - 65', startDay: 41, endDay: 65, icon: Droplets, tasks: ['Critical irrigation stage', 'Monitor soil temperature under mulch', 'Watch leaf undersides for white mold', 'Apply potassium sulfate for tuber growth'] },
      { name: 'Tuber Bulking', daysRange: 'Day 66 - 90', startDay: 66, endDay: 90, icon: Bug, tasks: ['Maintain moderate uniform moisture', 'Watch for tuber moth caterpillars', 'Apply protective copper sprays', 'Check sample tubers for scab disease'] },
      { name: 'Dehaulming & Harvest', daysRange: 'Day 91+', startDay: 91, endDay: 120, icon: Award, tasks: ['Cut potato vines (dehaulm) 10 days before digging', 'Dig tubers carefully to avoid cuts', 'Cure potatoes in shade for 7 days', 'Store in dark cold storage at 4°C'] }
    ]
  };

  // Calculate elapsed days
  const getElapsedDays = () => {
    const sowing = new Date(sowingDate);
    const today = new Date();
    const diffTime = today.getTime() - sowing.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const elapsedDays = getElapsedDays();
  const activeStages = cropStages[selectedCrop] || [];

  // Determine which stage is currently active
  const getActiveStageIndex = () => {
    for (let i = 0; i < activeStages.length; i++) {
      const stage = activeStages[i];
      if (elapsedDays >= stage.startDay && (stage.endDay === 130 || stage.endDay === 135 || stage.endDay === 140 || stage.endDay === 160 || stage.endDay === 120 || elapsedDays <= stage.endDay)) {
        return i;
      }
    }
    return activeStages.length - 1;
  };

  const activeStageIdx = getActiveStageIndex();

  const toggleTask = (taskKey: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskKey]: !prev[taskKey]
    }));
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto p-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          {t.calendar}
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {t.calendarSub}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Stage details list */}
        <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-6 lg:col-span-2">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-zinc-100 dark:border-zinc-850 pb-5">
            <div>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold uppercase tracking-wider block">
                Active Crop
              </span>
              <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-50">
                {selectedCrop} Operations Roadmap
              </h3>
            </div>

            {/* Sowing date selector */}
            <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-zinc-650 dark:text-zinc-350">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              <span>Sowing Date:</span>
              <input
                type="date"
                value={sowingDate}
                onChange={(e) => setSowingDate(e.target.value)}
                className="bg-transparent border-none text-xs focus:outline-none cursor-pointer font-semibold dark:text-white"
              />
            </div>
          </div>

          {/* Current Day status header */}
          <div className="p-4 bg-emerald-500/5 dark:bg-emerald-950/10 border border-emerald-500/10 rounded-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500 text-white p-2.5 rounded-xl shadow-sm">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Current Status</span>
                <p className="text-sm font-extrabold text-zinc-850 dark:text-zinc-150">Day {elapsedDays} of cultivation cycle</p>
              </div>
            </div>
            
            <div className="text-right">
              <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Current Stage</span>
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{activeStages[activeStageIdx]?.name}</p>
            </div>
          </div>

          {/* List of Stages */}
          <div className="space-y-4">
            {activeStages.map((stage, idx) => {
              const isActive = idx === activeStageIdx;
              const Icon = stage.icon;

              return (
                <div 
                  key={stage.name}
                  className={`border rounded-2xl transition-all duration-200 ${
                    isActive
                      ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/5 dark:bg-emerald-950/5 shadow-sm'
                      : 'border-zinc-200 dark:border-zinc-850 opacity-75'
                  }`}
                >
                  {/* Stage Summary Line */}
                  <div className="p-4 flex items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-850/60">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl border ${
                        isActive
                          ? 'bg-emerald-100 border-emerald-200 text-emerald-700 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-400'
                          : 'bg-zinc-50 border-zinc-200 text-zinc-400 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-500'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-zinc-850 dark:text-zinc-200 flex items-center gap-2">
                          {stage.name}
                          {isActive && (
                            <span className="bg-emerald-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider flex items-center gap-1 animate-pulse">
                              <Play className="w-2 h-2 fill-current" /> Active
                            </span>
                          )}
                        </h4>
                        <span className="text-[10px] text-zinc-450 dark:text-zinc-500 font-semibold">{stage.daysRange}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tasks checkboxes inside stage */}
                  <div className="p-4 bg-zinc-50/30 dark:bg-zinc-900/5 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {stage.tasks.map((task, tIdx) => {
                      const taskKey = `${selectedCrop}-${stage.name}-${tIdx}`;
                      const isCompleted = !!completedTasks[taskKey];
                      return (
                        <button
                          key={tIdx}
                          onClick={() => toggleTask(taskKey)}
                          className="flex items-start gap-2.5 text-left text-xs text-zinc-650 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors group cursor-pointer"
                        >
                          {isCompleted ? (
                            <CheckSquare className="w-4 h-4 mt-0.5 shrink-0 text-emerald-500" />
                          ) : (
                            <Square className="w-4 h-4 mt-0.5 shrink-0 text-zinc-350 dark:text-zinc-700 group-hover:text-emerald-500 transition-colors" />
                          )}
                          <span className={`${isCompleted ? 'line-through text-zinc-400 dark:text-zinc-500' : ''}`}>
                            {task}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Crop picker side lists */}
        <div className="space-y-6">
          {/* Crop List card */}
          <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Sprout className="w-4 h-4 text-emerald-500" />
              Switch Crops
            </h3>
            <div className="space-y-1.5">
              {CROPS.map((crop) => (
                <button
                  key={crop}
                  onClick={() => setSelectedCrop(crop)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition-all text-left cursor-pointer ${
                    selectedCrop === crop
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-400 font-bold'
                      : 'bg-white border-zinc-100 hover:bg-zinc-50 dark:bg-[#0c0c0f] dark:border-zinc-850 dark:hover:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  <span>{crop} Roadmap</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
