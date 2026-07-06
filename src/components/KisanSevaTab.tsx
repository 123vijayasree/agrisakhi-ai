import React from 'react';
import {
  Phone, Shield, CreditCard, ShoppingCart, TestTube, Wheat,
  ExternalLink, AlertCircle, CheckCircle, Clock, IndianRupee
} from 'lucide-react';

interface KisanSevaPanelProps {
  language: string;
}

const HELPLINES = [
  {
    name: 'Kisan Call Centre (KCC)',
    number: '1800-180-1551',
    namein: { hi: 'किसान कॉल सेंटर', mr: 'किसान कॉल सेंटर', ta: 'கிசான் கால் சென்டர்', te: 'కిసాన్ కాల్ సెంటర్', gu: 'કિસાન કૉલ સેન્ટર', bn: 'কিসান কল সেন্টার' },
    desc: 'Free 24×7 agricultural advice in your local language',
    color: 'from-orange-400 to-orange-600',
    icon: Phone
  },
  {
    name: 'PM-KISAN Helpline',
    number: '155261',
    namein: { hi: 'पीएम-किसान हेल्पलाइन', mr: 'पीएम-किसान हेल्पलाइन', ta: 'பி.எம்-கிசான் உதவி', te: 'PM-కిసాన్ హెల్ప్‌లైన్', gu: 'PM-કિસાન હેલ્પલાઇન', bn: 'PM-কিসান হেল্পলাইন' },
    desc: 'For PM-KISAN scheme registration & payment issues',
    color: 'from-green-500 to-green-700',
    icon: IndianRupee
  },
  {
    name: 'Fasal Bima / PMFBY Helpline',
    number: '14447',
    namein: { hi: 'फसल बीमा / PMFBY हेल्पलाइन', mr: 'पीक विमा / PMFBY हेल्पलाइन', ta: 'பயிர் காப்பீடு உதவி', te: 'పంట బీమా హెల్ప్‌లైన్', gu: 'પાક વીમા / PMFBY હેલ્પલાઇન', bn: 'ফসল বিমা হেল্পলাইন' },
    desc: 'Register crop loss claims & check insurance status',
    color: 'from-blue-500 to-blue-700',
    icon: Shield
  },
  {
    name: 'eNAM / Mandi Portal',
    number: '1800-270-0224',
    namein: { hi: 'ई-नाम मंडी पोर्टल', mr: 'ई-नाम मंडी पोर्टल', ta: 'ஈ-நாம் மண்டி போர்டல்', te: 'ఈ-నామ్ మండీ పోర్టల్', gu: 'ઈ-NAM મંડી પોર્ટલ', bn: 'ই-নাম মান্ডি পোর্টাল' },
    desc: 'Online sale of produce at best prices across India',
    color: 'from-purple-500 to-purple-700',
    icon: ShoppingCart
  }
];

const GOVT_SCHEMES = [
  {
    name: 'PM-KISAN',
    fullName: 'Pradhan Mantri Kisan Samman Nidhi',
    benefit: '₹6,000/year in 3 installments of ₹2,000',
    eligibility: 'All landholding farmer families with cultivable land',
    howToApply: 'Visit nearest CSC or pmkisan.gov.in with Aadhaar & land records',
    icon: IndianRupee,
    color: 'border-l-orange-500',
    badgeColor: 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
    status: 'Active'
  },
  {
    name: 'PMFBY',
    fullName: 'Pradhan Mantri Fasal Bima Yojana',
    benefit: 'Crop insurance coverage up to full sum insured at subsidised premium (2% Kharif, 1.5% Rabi)',
    eligibility: 'All farmers growing notified crops in notified areas',
    howToApply: 'Register through bank, CSC, or insuranceofcrops.gov.in before cut-off date',
    icon: Shield,
    color: 'border-l-blue-500',
    badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
    status: 'Active'
  },
  {
    name: 'Kisan Credit Card',
    fullName: 'Kisan Credit Card (KCC) Scheme',
    benefit: 'Credit up to ₹3 lakh at 4% interest rate for crop expenses',
    eligibility: 'All farmers, sharecroppers, oral lessees and SHGs',
    howToApply: 'Apply at any nationalized bank or cooperative bank with land records',
    icon: CreditCard,
    color: 'border-l-green-500',
    badgeColor: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',
    status: 'Active'
  },
  {
    name: 'Soil Health Card',
    fullName: 'Soil Health Card (SHC) Scheme',
    benefit: 'Free soil testing and personalized fertilizer recommendations',
    eligibility: 'All farmers across India — once every 2 years',
    howToApply: 'Contact local KVK (Krishi Vigyan Kendra) or soilhealth.dac.gov.in',
    icon: TestTube,
    color: 'border-l-amber-500',
    badgeColor: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
    status: 'Active'
  },
  {
    name: 'eNAM',
    fullName: 'National Agriculture Market (e-NAM)',
    benefit: 'Access to pan-India online APMC market — sell produce at best price',
    eligibility: 'All farmers registered with their local APMC mandi',
    howToApply: 'Register at enam.gov.in or through FPO / local APMC office',
    icon: ShoppingCart,
    color: 'border-l-purple-500',
    badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
    status: 'Active'
  },
  {
    name: 'RKVY',
    fullName: 'Rashtriya Krishi Vikas Yojana',
    benefit: 'Grants for agri infrastructure — storage, processing, irrigation',
    eligibility: 'Farmers, FPOs, cooperatives applying through State Agriculture Dept.',
    howToApply: 'Contact District Agriculture Officer or rkvy.nic.in',
    icon: Wheat,
    color: 'border-l-teal-500',
    badgeColor: 'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300',
    status: 'Active'
  }
];

const IMPORTANT_DATES = [
  { event: 'Kharif PM-KISAN Cut-off', date: 'July 31', note: 'Enrollment deadline for Kharif season installment' },
  { event: 'PMFBY Kharif Enrollment', date: 'August 15', note: 'Last date to enroll crops for Kharif insurance' },
  { event: 'Rabi Sowing Advisory', date: 'October 1', note: 'IMD releases Rabi season rainfall forecast' },
  { event: 'PMFBY Rabi Enrollment', date: 'December 31', note: 'Last date to enroll crops for Rabi insurance' },
];

export const KisanSevaTab: React.FC<KisanSevaPanelProps> = ({ language }) => {

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl kisan-pattern">
        <div className="tricolor-bar" />
        <div className="bg-gradient-to-br from-orange-50 via-white to-green-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900 p-5 border border-orange-100 dark:border-zinc-800 rounded-b-2xl">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg flex-shrink-0">
              <span className="text-xl">🇮🇳</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                Kisan Seva Portal
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                Government schemes, helplines & important dates for Indian farmers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Helpline Numbers */}
      <div>
        <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Phone className="w-4 h-4 text-orange-500" />
          Kisan Helpline Numbers — Free Calls
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {HELPLINES.map((h) => {
            const Icon = h.icon;
            return (
              <div
                key={h.name}
                className="scheme-card flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm cursor-default"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${h.color} flex items-center justify-center flex-shrink-0 shadow`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                    {(h.namein as Record<string, string>)[language] || h.name}
                  </div>
                  <div className="text-base font-bold text-orange-600 dark:text-orange-400 font-mono tracking-wide">
                    {h.number}
                  </div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-500 leading-tight mt-0.5 line-clamp-1">
                    {h.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Government Schemes */}
      <div>
        <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4 text-green-600" />
          Major Government Schemes
        </h3>
        <div className="space-y-3">
          {GOVT_SCHEMES.map((scheme) => {
            const Icon = scheme.icon;
            return (
              <div
                key={scheme.name}
                className={`scheme-card bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm border-l-4 ${scheme.color} p-4`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-zinc-600 dark:text-zinc-400 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-zinc-900 dark:text-white text-sm">{scheme.name}</span>
                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block">{scheme.fullName}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 flex items-center gap-1 ${scheme.badgeColor}`}>
                    <CheckCircle className="w-3 h-3" /> {scheme.status}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex items-start gap-1.5">
                    <IndianRupee className="w-3.5 h-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-700 dark:text-zinc-300"><strong>Benefit:</strong> {scheme.benefit}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-700 dark:text-zinc-300"><strong>Eligibility:</strong> {scheme.eligibility}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-600 dark:text-zinc-400">{scheme.howToApply}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Important Dates */}
      <div>
        <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-500" />
          Important Kisan Dates 2025–26
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {IMPORTANT_DATES.map((d, i) => (
            <div
              key={i}
              className="scheme-card flex items-start gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 shadow-sm"
            >
              <div className="w-12 h-12 rounded-lg bg-orange-50 dark:bg-orange-950/40 border border-orange-100 dark:border-orange-900 flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-[10px] font-bold text-orange-500 uppercase">{d.date.split(' ')[0]}</span>
                <span className="text-base font-black text-orange-600 dark:text-orange-400 leading-tight">{d.date.split(' ')[1]}</span>
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{d.event}</div>
                <div className="text-[11px] text-zinc-500 dark:text-zinc-500 mt-0.5 leading-snug">{d.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* IMD Weather Advisory Banner */}
      <div className="rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 p-4 flex items-start gap-3">
        <span className="text-2xl">🌦️</span>
        <div>
          <div className="text-sm font-bold text-blue-800 dark:text-blue-300">IMD Weather & Agro-Advisory</div>
          <div className="text-xs text-blue-700 dark:text-blue-400 mt-1">
            Get free district-level weather forecasts and crop advisories from India Meteorological Department (IMD). Call <strong>1800-180-1717</strong> or visit <strong>imd.gov.in</strong>.
          </div>
        </div>
      </div>

      <p className="text-[11px] text-center text-zinc-400 dark:text-zinc-600 pb-2">
        AgriSakhi AI • Jai Kisan 🌾 • Data sourced from GOI Agri Dept.
      </p>
    </div>
  );
};
