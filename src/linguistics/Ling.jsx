import React, { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { 
  BookOpen, MessageSquare, User, 
  ArrowRight, ArrowRightLeft, Check, Globe
} from "lucide-react";

const lingTheme = {
  backButtonHover: 'hover:text-emerald-600',
  heroHighlightText: 'text-emerald-500',
  
  card1Icon: 'text-emerald-600',
  card1Bg: 'bg-emerald-50',
  card2Icon: 'text-emerald-600',
  card2Bg: 'bg-emerald-50',
  card3Icon: 'text-emerald-600',
  card3Bg: 'bg-emerald-50',
  
  activeBorder: 'border-emerald-500 ring-2 ring-emerald-500/10 shadow-md',
  inactiveBorder: 'border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-emerald-300',
  activeIconBg: 'bg-emerald-500 text-white',
  activeTitleText: 'text-emerald-800',
  inactiveTitleHover: 'text-slate-800 group-hover:text-emerald-600',
  activeSubtitleText: 'text-emerald-600',
  inactiveSubtitleText: 'text-slate-500'
};

const SOURCE_LANGUAGES = [
  { id: "hi" },
  { id: "en" }
];

const TARGET_LANGUAGES = [
  { id: "hi" },
  { id: "en" },
  { id: "bho", isComingSoon: true },
  { id: "mai", isComingSoon: true },
  { id: "mag", isComingSoon: true },
  { id: "anp", isComingSoon: true },
  { id: "bjj", isComingSoon: true },
  { id: "de" },
  { id: "fr" },
  { id: "es" },
  { id: "ja" },
  { id: "it" }
];

export default function LinguisticApp() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [sourceLang, setSourceLang] = useState(() => localStorage.getItem("ling_source_lang") || "hi");
  const [targetLang, setTargetLang] = useState(() => localStorage.getItem("ling_target_lang") || "en");
  const [lastModule, setLastModule] = useState(() => localStorage.getItem("ling_last_module") || "words");

  useEffect(() => {
    if (sourceLang) localStorage.setItem("ling_source_lang", sourceLang);
  }, [sourceLang]);

  useEffect(() => {
    if (targetLang) localStorage.setItem("ling_target_lang", targetLang);
  }, [targetLang]);

  useEffect(() => {
    const saved = localStorage.getItem("ling_last_module");
    if (saved) setLastModule(saved);
  }, []);

  const handleStartLearning = (moduleType = lastModule) => {
    const src = sourceLang || "hi";
    const tgt = targetLang || "en";
    localStorage.setItem("ling_last_module", moduleType);
    localStorage.setItem("ling_source_lang", src);
    localStorage.setItem("ling_target_lang", tgt);
    navigate(`/ling/${moduleType}`, { state: { source: src, target: tgt } });
  };

  const quickStats = [
    { label: t('ling.basicWords', 'Basic Words'), value: t('ling.basicWordsDesc', 'Master foundational vocabulary'), icon: <BookOpen className={lingTheme.card1Icon} />, color: lingTheme.card1Bg, module: 'words' },
    { label: t('ling.basicPhrases', 'Basic Phrases'), value: t('ling.basicPhrasesDesc', 'Learn essential daily sentences'), icon: <MessageSquare className={lingTheme.card2Icon} />, color: lingTheme.card2Bg, module: 'phrases' },
    { label: t('ling.conversations', 'Conversations'), value: t('ling.conversationsDesc', 'Interactive real-life dialogues'), icon: <User className={lingTheme.card3Icon} />, color: lingTheme.card3Bg, module: 'conversations' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex font-sans text-slate-900 overflow-x-hidden">
      
      {/* Main Content */}
      <main className="flex-1 min-w-0 min-h-screen pb-4 overflow-y-auto">

        <div className="px-4 sm:px-6 md:px-12 2xl:px-20 space-y-6 md:space-y-8 pt-4 2xl:max-w-[1600px] 2xl:mx-auto">
          
          {/* Hero & Stats Section */}
          <div className="relative">
            {/* Hero Section */}
            <section className="bg-white rounded-[16px] md:rounded-[24px] overflow-hidden relative border border-slate-100 flex items-center min-h-[200px] sm:min-h-[260px] md:min-h-[300px] lg:h-[387px] lg:min-h-[387px] pb-4 md:pb-6 lg:pb-0">
              <div className="relative z-10 p-5 sm:p-8 md:p-10 lg:w-1/2 space-y-3 md:space-y-4">
                 <h1 className="text-[22px] sm:text-[28px] md:text-[36px] lg:text-[42px] 2xl:text-[52px] font-extrabold leading-[1.05] tracking-tight text-[#1e293b]">
                    {t('ling.letsLearn', "Let's learn")} <br />
                    {t('ling.aNew', 'a new')} <br />
                    <span className={lingTheme.heroHighlightText}>{t('ling.language', 'language')}</span>
                 </h1>
                 <p className="text-slate-500 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-medium leading-relaxed max-w-sm">
                   {t('ling.heroDesc', 'Have a conversation in different languages and explore diverse regional dialects.')}
                 </p>
              </div>

              <div className="hidden lg:block absolute top-0 right-0 w-[55%] h-full">
                 <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
                 <img loading="lazy" decoding="async" src="/images/linguistic/rhs.webp" alt="Language Learning" className="w-full h-full object-cover object-right-top" />
              </div>
            </section>

            {/* Quick Stats Row */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 relative z-20 -mt-8 px-4 md:px-12">
              {quickStats.map((stat, i) => {
                const isActive = lastModule === stat.module;
                return (
                  <div
                    key={i}
                    onClick={() => {
                      setLastModule(stat.module);
                      const target = document.getElementById("content-section");
                      if (target) target.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`bg-white rounded-[16px] p-4 md:p-5 border flex items-center gap-3 md:gap-4 hover:shadow-md transition-all cursor-pointer group ${isActive ? lingTheme.activeBorder : lingTheme.inactiveBorder}`}
                  >
                    <div className={`w-[48px] h-[48px] rounded-[14px] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform [&>svg]:w-6 [&>svg]:h-6 ${isActive ? lingTheme.activeIconBg : stat.color}`}>
                      {React.cloneElement(stat.icon, { className: isActive ? 'text-white' : stat.icon.props.className })}
                    </div>
                    <div>
                      <h4 className={`text-[14px] font-bold leading-tight transition-colors ${isActive ? lingTheme.activeTitleText : lingTheme.inactiveTitleHover}`}>{stat.label}</h4>
                      <p className={`text-[12px] font-medium mt-1 ${isActive ? lingTheme.activeSubtitleText : lingTheme.inactiveSubtitleText}`}>{stat.value}</p>
                    </div>
                  </div>
                );
              })}
            </section>
          </div>

          {/* Content Section (Language Selection) */}
          <div id="content-section" className="px-2 sm:px-6 md:px-12 lg:px-10 xl:px-10 max-w-[1380px] mx-auto mt-8 sm:mt-10">
            <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 mb-12 relative z-30 items-stretch">
              
              {/* Know Language Card */}
              <div className="xl:w-1/3 bg-white border border-slate-100 rounded-[32px] p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative flex flex-col">
                 <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-12 rounded-[16px] bg-emerald-50 flex items-center justify-center text-emerald-500 border border-emerald-100/50 shadow-sm">
                     <MessageSquare size={22} strokeWidth={2.5} />
                   </div>
                   <div>
                     <h3 className="text-[18px] font-extrabold text-slate-800 tracking-tight">{t('ling.LanguageTitle', 'Language')} <span className={lingTheme.heroHighlightText}>{t('ling.langYouKnow', 'you know')}</span></h3>
                     <p className="text-[13px] text-slate-500 font-medium mt-0.5">{t('ling.langYouKnowDesc', 'Select your primary language.')}</p>
                   </div>
                 </div>

                 <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {SOURCE_LANGUAGES.map(lang => (
                      <LanguagePill 
                        key={`src-${lang.id}`} 
                        lang={lang} 
                        selected={sourceLang === lang.id}
                        onClick={() => {
                          setSourceLang(lang.id);
                          if (targetLang === lang.id) setTargetLang(sourceLang || "en");
                        }} 
                        t={t}
                      />
                    ))}
                 </div>
              </div>

              {/* Swap Middle Button */}
              <div className="hidden xl:flex items-center justify-center -mx-5 z-40">
                <div 
                  onClick={() => {
                    if (!sourceLang || !targetLang) return;
                    const isTargetInSource = SOURCE_LANGUAGES.some(l => l.id === targetLang);
                    if (!isTargetInSource) {
                      toast.error("Selected target language is not available as a source language yet.");
                      return;
                    }
                    const temp = sourceLang;
                    setSourceLang(targetLang);
                    setTargetLang(temp);
                  }}
                  className={`w-14 h-14 bg-white border-2 border-slate-50 rounded-full flex items-center justify-center text-emerald-600 shadow-[0_8px_20px_rgba(11,181,98,0.15)] cursor-pointer hover:scale-110 hover:border-slate-100 hover:bg-emerald-50 transition-all relative ${(!sourceLang || !targetLang) && 'opacity-30 cursor-not-allowed grayscale'}`}
                >
                  <ArrowRightLeft size={22} strokeWidth={2.5} />
                </div>
              </div>

              {/* Target Language Card */}
              <div className="xl:w-2/3 bg-white border border-slate-100 rounded-[32px] p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col relative overflow-hidden">
                 {/* Decorative background blur */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                 
                 <div className="flex items-center gap-4 mb-8 relative z-10">
                   <div className="w-12 h-12 rounded-[16px] bg-emerald-50 flex items-center justify-center text-emerald-500 border border-emerald-100/50 shadow-sm">
                     <Globe size={22} strokeWidth={2.5} />
                   </div>
                   <div>
                     <h3 className="text-[18px] font-extrabold text-slate-800 tracking-tight">{t('ling.LanguageTitle', 'Language')} <span className={lingTheme.heroHighlightText}>{t('ling.langYouWant', 'you want to learn')}</span></h3>
                     <p className="text-[13px] text-slate-500 font-medium mt-0.5">{t('ling.langYouWantDesc', 'Select a target language to start the module.')}</p>
                   </div>
                 </div>

                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 relative z-10">
                    {TARGET_LANGUAGES.map(lang => (
                      <LanguagePill 
                        key={`tgt-${lang.id}`} 
                        lang={lang} 
                        selected={targetLang === lang.id}
                        disabled={sourceLang === lang.id || lang.isComingSoon}
                        title={lang.isComingSoon ? t('ling.notAvailable', 'Not available yet') : ""}
                        isTarget={true}
                        onClick={() => setTargetLang(lang.id)} 
                        t={t}
                      />
                    ))}
                 </div>
              </div>
            </div>

            {/* Primary CTA */}
            <div className="flex justify-center mb-16">
              <button 
                disabled={!sourceLang || !targetLang}
                onClick={() => handleStartLearning(lastModule)}
                className={`bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-12 py-4 rounded-full shadow-[0_8px_25px_rgba(11,181,98,0.3)] flex items-center gap-3 transition-all hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(11,181,98,0.4)] group ${(!sourceLang || !targetLang) && 'opacity-50 cursor-not-allowed grayscale hover:translate-y-0 hover:shadow-none'}`}
              >
                {t('ling.startLearning', 'Start Learning')} <ArrowRight size={20} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* Helper Components */

function LanguagePill({ lang, selected, disabled, title, isTarget, onClick, t }) {
  const activeColor = "emerald";
  const displayName = t(`ling.lang_${lang.id}`, lang.id.toUpperCase());
  
  return (
    <button 
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      title={title}
      className={`flex items-center w-full min-w-0 p-1.5 pr-2.5 sm:p-2 sm:pr-4 rounded-xl sm:rounded-2xl border-2 transition-all relative overflow-hidden group outline-none
        ${disabled ? "opacity-50 cursor-not-allowed bg-slate-50/50 border-slate-100" : ""}
        ${selected 
          ? `border-${activeColor}-500 bg-gradient-to-r from-${activeColor}-50 to-white shadow-sm ring-4 ring-${activeColor}-500/10` 
          : `border-slate-100 bg-white hover:border-${activeColor}-300 hover:shadow-md hover:-translate-y-0.5`}`}
    >
      <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center text-[10px] sm:text-[11px] font-bold mr-2 sm:mr-3 shrink-0 transition-colors
        ${selected ? `bg-${activeColor}-500 text-white shadow-sm` : disabled ? "bg-slate-200 text-slate-400" : `bg-slate-50 text-slate-500 group-hover:bg-${activeColor}-50 group-hover:text-${activeColor}-600`}`}>
        {lang.id.toUpperCase()}
      </div>
      
      <span className={`text-[12.5px] sm:text-[13.5px] font-bold tracking-normal sm:tracking-wide flex-1 min-w-0 truncate text-left
        ${selected ? `text-${activeColor}-900` : disabled ? "text-slate-400" : `text-slate-700 group-hover:text-${activeColor}-800`}`}>
        {displayName}
      </span>
      
      {selected && (
        <div className={`w-5 h-5 bg-${activeColor}-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm ml-1.5 sm:ml-2`}>
          <Check size={12} strokeWidth={3} />
        </div>
      )}
    </button>
  );
}
