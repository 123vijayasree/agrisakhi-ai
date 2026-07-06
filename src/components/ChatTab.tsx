import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Trash2
} from 'lucide-react';
import { AGRICULTURAL_DB, VERNACULAR_TEXTS } from '../data/agriculturalDb';

interface ChatTabProps {
  language: string;
  apiKey: string;
  currentWeather: { temp: number; humidity: number; windSpeed: number; rainfall: number };
}

interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  isSimulated?: boolean;
}

export const ChatTab: React.FC<ChatTabProps> = ({ 
  language, 
  apiKey,
  currentWeather
}) => {
  const t = VERNACULAR_TEXTS[language] || VERNACULAR_TEXTS.en;

  const greetings: Record<string, string> = {
    en: 'Namaste! I am AgriSakhi, your farming companion. Describe your crop issues (e.g. "my rice leaves have gray diamond spots") or ask me any question about organic treatments, fertilizer ratios, or weather precautions.',
    hi: 'नमस्ते! मैं कृषि सखी हूँ, आपका खेती साथी। अपनी फसल की समस्याएं बताएं (जैसे "मेरे धान के पत्तों पर हीरे के आकार के धब्बे हैं") या जैविक उपचार, खाद अनुपात, या मौसम सावधानियों के बारे में कोई भी प्रश्न पूछें।',
    mr: 'नमस्ते! मी कृषी सखी आहे, तुमचा शेती साथीदार. तुमच्या पिकाच्या समस्या सांगा (उदा. "माझ्या भाताच्या पानांवर हिऱ्याच्या आकाराचे डाग आहेत") किंवा सेंद्रिय उपचार, खत प्रमाण, किंवा हवामान सावधानीबद्दल विचारा.',
    ta: 'வணக்கம்! நான் விவசாய சகி, உங்கள் விவசாய நண்பர். உங்கள் பயிர் பிரச்சனைகளை விவரிக்கவும் (எ.கா. "என் நெல் இலைகளில் வைரம் வடிவ புள்ளிகள் உள்ளன") அல்லது இயற்கை சிகிச்சை, உர விகிதம், அல்லது வானிலை முன்னெச்சரிக்கை பற்றி கேளுங்கள்.'
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: greetings[language] || greetings.en,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Vernacular Preset Prompt Buttons
  const presetPrompts: Record<string, string[]> = {
    en: [
      'My tomato leaves have black rings. What treatment to use?',
      'How to control Bollworms in Cotton crop organically?',
      'What are the optimal NPK fertilizer ratios for Potatoes?',
      'Will current humid weather worsen crop fungal infections?'
    ],
    hi: [
      'टमाटर के पत्तों पर काले छल्ले हैं। क्या उपाय करें?',
      'कपास में इल्ली (Bollworm) को जैविक तरीके से कैसे नियंत्रित करें?',
      'आलू की फसल के लिए सही NPK खाद का अनुपात क्या है?',
      'क्या अभी के उमस भरे मौसम में फंगस रोग बढ़ेगा?'
    ],
    mr: [
      'टोमॅटोच्या पानांवर काळे डाग आले आहेत, काय फवारणी करावी?',
      'कापसातील बोंडअळी सेंद्रिय पद्धतीने कशी नियंत्रणात आणावी?',
      'बटाटा पिकासाठी खत व्यवस्थापन कसे करावे?',
      'सध्याच्या दमट हवामानामुळे पिकांवर बुरशीचा प्रादुर्भाव वाढेल का?'
    ],
    ta: [
      'என் தக்காளி இலைகளில் கருப்பு வளையங்கள் உள்ளன. என்ன சிகிச்சை செய்வது?',
      'பருத்தியில் காய்புழுக்களை இயற்கை முறையில் எப்படி கட்டுப்படுத்துவது?',
      'உருளைக்கிழங்கிற்கு சரியான NPK உர விகிதம் என்ன?',
      'தற்போதைய ஈரப்பத வானிலை பயிரில் பூஞ்சை நோய்களை அதிகரிக்குமா?'
    ]
  };

  const currentPresets = presetPrompts[language] || presetPrompts.en;

  // Local Rule-Based Simulator for Agricultural Diagnosis
  const runSimulatedFarmingAdvisor = (input: string): string => {
    const cleanInput = input.toLowerCase();
    
    // Find matching crop disease
    let matchedDisease = null;
    let maxMatchCount = 0;

    for (const disease of AGRICULTURAL_DB) {
      let matches = 0;
      // Match crop name
      if (cleanInput.includes(disease.crop.toLowerCase())) matches += 2;
      // Match symptoms keywords
      disease.symptoms.forEach(sym => {
        if (cleanInput.includes(sym.toLowerCase())) matches += 3;
      });

      if (matches > maxMatchCount && matches > 2) {
        maxMatchCount = matches;
        matchedDisease = disease;
      }
    }

    if (matchedDisease) {
      const d = matchedDisease;
      const organic = d.treatments.find(t => t.type === 'organic');
      const chemical = d.treatments.find(t => t.type === 'chemical');
      
      let weatherAlert = '';
      if (currentWeather.humidity > 80 && d.weatherTriggers.minHumidity) {
        weatherAlert = `\n\n⚠️ **Microclimate Warning:** Current high humidity (${currentWeather.humidity}%) matches the optimal growth requirements of this pathogen, which could lead to rapid spread in your fields.`;
      }

      return `Based on your description, I have diagnosed this as **${d.name}** (${d.type} infection) affecting your **${d.crop}** crop.${weatherAlert}

### 🌿 1. Organic Treatment Protocol (Recommended)
* **Treatment:** ${organic?.name}
* **Active Ingredient:** ${organic?.ingredient}
* **Dosage & Frequency:** ${organic?.dosage} | ${organic?.frequency}
* **Application Mode:** ${organic?.application}

### 🧪 2. Chemical Control (Emergency)
* **Chemical Brand:** ${chemical?.name}
* **Active Ingredient:** ${chemical?.ingredient}
* **Dosage:** ${chemical?.dosage}
* **Application Mode:** ${chemical?.application}
* **Safety Instruction:** ${chemical?.safetyNote || 'Wear protective gears and avoid harvesting for 10 days.'}

### 🛡️ 3. Cultural & Prevention Guidelines
${d.prevention.map(p => `* ${p}`).join('\n')}`;
    }

    // Generic agricultural information fallbacks
    if (cleanInput.includes('npk') || cleanInput.includes('fertilizer') || cleanInput.includes('खाद') || cleanInput.includes('खत')) {
      return `For optimizing N-P-K fertilizer ratio dosage, please visit the **Soil Health Companion** tab in AgriSakhi. 
      
As a rule of thumb:
* **Tomatoes:** 120:80:60 kg/Hectare (high potassium for fruiting).
* **Wheat:** 120:60:40 kg/Hectare (high nitrogen at tillering).
* **Rice:** 100:50:50 kg/Hectare (applied during puddling and vegetative splits).
* **Cotton:** 100:50:50 kg/Hectare.
* **Potatoes:** 150:100:120 kg/Hectare.`;
    }

    if (cleanInput.includes('weather') || cleanInput.includes('humidity') || cleanInput.includes('rain') || cleanInput.includes('मौसम') || cleanInput.includes('हवामान')) {
      return `Here is your current microclimate summary:
* **Temperature:** ${currentWeather.temp}°C
* **Humidity:** ${currentWeather.humidity}%
* **Rainfall:** ${currentWeather.rainfall} mm
* **Wind Speed:** ${currentWeather.windSpeed} km/h

*Advisor Tip:* High humidity (above 80%) promotes fungal spore germination. Wind speeds above 15 km/h will result in chemical drift; delay spraying until conditions calm down.`;
    }

    return `I am AgriSakhi, your farming companion. I couldn't find a direct disease match for those symptoms in my database. 

Could you specify the crop name (Tomato, Wheat, Rice, Cotton, or Potato) and describe symptoms in more detail? 
*Example:* "my tomato leaf has concentric brown rings" or "cotton boll dropping issues".`;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    if (!textToSend) {
      setInputText('');
    }

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Append User Message
    const userMsg: Message = { sender: 'user', text, timestamp };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    // If API Key is configured, make real Gemini Call
    if (apiKey) {
      try {
        const systemPrompt = `You are AgriSakhi AI, an intelligent, smart, and compassionate farming companion agent. 
You communicate with small and rural farmers. Always use simple, clear, formatting, bullet points, and highly structured, actionable agricultural advice.
When farmers ask about crop diseases, diagnose their issue, describe symptoms, provide clear organic remedies (prioritized), chemical controls (with caution notes), and weather-related precautions.
Current Weather Context: Temp ${currentWeather.temp}°C, Humidity ${currentWeather.humidity}%, Wind ${currentWeather.windSpeed} km/h.
Provide advice in a warm, helpful tone. Keep responses readable. Support their native language (if they write in Hindi or Marathi, respond in Hindi or Marathi respectively).`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: `${systemPrompt}\n\nFarmer Request: ${text}` }] }]
            })
          }
        );

        const data = await response.json();
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (responseText) {
          setMessages(prev => [
            ...prev,
            { sender: 'bot', text: responseText, timestamp }
          ]);
        } else {
          throw new Error('Empty response');
        }
      } catch (err) {
        console.error(err);
        // Fallback to simulator if API call fails
        const simulatedReply = runSimulatedFarmingAdvisor(text);
        setMessages(prev => [
          ...prev,
          { 
            sender: 'bot', 
            text: `⚠️ *Connection failed (using Offline agricultural agent fallback):*\n\n${simulatedReply}`, 
            timestamp,
            isSimulated: true 
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Simulate Response after 800ms
      setTimeout(() => {
        const simulatedReply = runSimulatedFarmingAdvisor(text);
        setMessages(prev => [
          ...prev,
          { 
            sender: 'bot', 
            text: simulatedReply, 
            timestamp,
            isSimulated: true 
          }
        ]);
        setIsLoading(false);
      }, 800);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const clearChat = () => {
    if (window.confirm('Do you want to clear your conversation history?')) {
      setMessages([
        {
          sender: 'bot',
          text: 'Conversation history cleared. How can I help you today?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-73px)] max-w-[1600px] mx-auto animate-fade-in bg-zinc-50 dark:bg-[#09090b]">
      {/* Tab Subtitle */}
      <div className="px-8 py-4 bg-white dark:bg-[#0c0c0f] border-b border-zinc-200 dark:border-zinc-850 flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-base font-extrabold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            {t.chat}
          </h2>
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-medium">
            {apiKey ? 'Live Gemini AI Agent Mode' : 'Local Agricultural Simulation Agent Mode'}
          </p>
        </div>

        <button
          onClick={clearChat}
          className="p-2 text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-350 hover:bg-zinc-100 dark:hover:bg-zinc-850 rounded-xl transition-all cursor-pointer"
          title="Clear Chat History"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
        {messages.map((msg, idx) => {
          const isBot = msg.sender === 'bot';
          return (
            <div 
              key={idx}
              className={`flex items-start gap-3.5 max-w-3xl ${isBot ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
            >
              {/* Avatar */}
              <div className={`p-2.5 rounded-xl border shrink-0 ${
                isBot 
                  ? 'bg-emerald-100 border-emerald-200 text-emerald-700 dark:bg-emerald-950 dark:border-emerald-900 dark:text-emerald-400' 
                  : 'bg-zinc-100 border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-850 dark:text-zinc-300'
              }`}>
                {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div className="space-y-1">
                <div className={`px-4 py-3 rounded-2xl border text-sm shadow-sm leading-relaxed whitespace-pre-line ${
                  isBot 
                    ? 'bg-white border-zinc-150 text-zinc-800 dark:bg-[#0c0c0f] dark:border-zinc-850 dark:text-zinc-200' 
                    : 'bg-emerald-600 border-emerald-700 text-white dark:bg-emerald-700 dark:border-emerald-800'
                }`}>
                  {msg.text}
                </div>
                <div className={`text-[10px] text-zinc-400 dark:text-zinc-500 font-medium ${isBot ? 'text-left pl-1' : 'text-right pr-1'}`}>
                  {msg.timestamp} {msg.isSimulated && '• Local Database'}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex items-start gap-3.5 mr-auto">
            <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-250 dark:border-emerald-900 shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-150 dark:border-zinc-850 rounded-2xl px-4 py-3 text-xs flex items-center gap-2 text-zinc-500">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span>AgriSakhi is formulating advice...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Preset prompt helper tray */}
      <div className="px-8 py-2 bg-zinc-100/40 dark:bg-zinc-950/20 border-t border-zinc-200/50 dark:border-zinc-850/50 shrink-0">
        <div className="flex gap-2 overflow-x-auto pb-1.5 max-w-full">
          {currentPresets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p)}
              className="px-3 py-1.5 bg-white dark:bg-zinc-900 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-medium text-zinc-650 dark:text-zinc-400 transition-colors shrink-0 cursor-pointer shadow-sm"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Input box bottom bar */}
      <div className="p-4 bg-white dark:bg-[#0c0c0f] border-t border-zinc-200 dark:border-zinc-850 flex gap-2.5 items-center shrink-0">
        <input
          type="text"
          placeholder="Ask AgriSakhi e.g. How do I prevent early blight in tomatoes?"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:text-white"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim() || isLoading}
          className="bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded-xl shadow-md shadow-emerald-600/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
