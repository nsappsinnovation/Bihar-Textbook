import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Home, BookOpen, MessageSquare, Compass, BarChart2, User, 
  Settings, Flame, Star, Search, ArrowRight, ArrowLeft, ArrowRightLeft, Check, Calendar, Shield, Languages
} from "lucide-react";

// Mock data matching the screenshot
const LANGUAGES = [
  { id: "hi", name: "Hindi", flag: "https://flagcdn.com/w40/in.png" },
  { id: "en", name: "English", flag: "https://flagcdn.com/w40/us.png" },
  { id: "de", name: "German", flag: "https://flagcdn.com/w40/de.png" },
  { id: "fr", name: "French", flag: "https://flagcdn.com/w40/fr.png" },
  { id: "es", name: "Spanish", flag: "https://flagcdn.com/w40/es.png" },
  { id: "ja", name: "Japanese", flag: "https://flagcdn.com/w40/jp.png" },
  { id: "zh", name: "Chinese", flag: "https://flagcdn.com/w40/cn.png" },
  { id: "ar", name: "Arabic", flag: "https://flagcdn.com/w40/sa.png" },
  { id: "ru", name: "Russian", flag: "https://flagcdn.com/w40/ru.png" },
  { id: "ko", name: "Korean", flag: "https://flagcdn.com/w40/kr.png" }
];

export default function LinguisticApp() {
  const navigate = useNavigate();
  const [sourceLang, setSourceLang] = useState(() => localStorage.getItem("ling_source_lang") || "hi");
  const [targetLang, setTargetLang] = useState(() => localStorage.getItem("ling_target_lang") || "en");
  const [activeNav, setActiveNav] = useState("Home");
  const [lastModule, setLastModule] = useState(() => localStorage.getItem("ling_last_module") || "words");
  
  // Real-time states
  const [streak, setStreak] = useState(0);
  const [dailyProgress, setDailyProgress] = useState(0);
  const [wordsProgress, setWordsProgress] = useState(0);
  const [phrasesProgress, setPhrasesProgress] = useState(0);
  const [convProgress, setConvProgress] = useState(0);

  useEffect(() => {
    if (sourceLang) localStorage.setItem("ling_source_lang", sourceLang);
  }, [sourceLang]);

  useEffect(() => {
    if (targetLang) localStorage.setItem("ling_target_lang", targetLang);
  }, [targetLang]);

  useEffect(() => {
    const saved = localStorage.getItem("ling_last_module");
    if (saved) setLastModule(saved);

    // Load dynamic data
    setStreak(parseInt(localStorage.getItem("ling_streak") || "0"));
    setDailyProgress(parseInt(localStorage.getItem("ling_daily_progress") || "0"));
    setWordsProgress(parseInt(localStorage.getItem("ling_words_progress") || "0"));
    setPhrasesProgress(parseInt(localStorage.getItem("ling_phrases_progress") || "0"));
    setConvProgress(parseInt(localStorage.getItem("ling_conversations_progress") || "0"));
  }, []);

  const handleStartLearning = (moduleType = lastModule) => {
    const src = sourceLang || "hi";
    const tgt = targetLang || "en";
    localStorage.setItem("ling_last_module", moduleType);
    localStorage.setItem("ling_source_lang", src);
    localStorage.setItem("ling_target_lang", tgt);
    navigate(`/ling/${moduleType}`, { state: { source: src, target: tgt } });
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-[#2D3142] flex flex-col overflow-x-hidden -mt-6">
      {/* Main Content Area */}
      <main className="flex-1 px-2 md:px-4 lg:px-8 pb-8 max-w-[1400px] mx-auto w-full overflow-hidden relative">
       {/* Back Button */}
             <button
               onClick={() => navigate("/")}
               className="fixed top-5 left-5 z-50 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-blue-600 hover:shadow-lg transition-all border border-slate-100 group"
             >
               <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
             </button>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-24 relative mt-0">
          <div className="space-y-1 z-10 w-[45%] mx-10">
           <h1 className="text-4xl md:text-5xl font-black leading-tight">
              Let's learn <br />
              <span className="text-[#22C55E]">a new language</span>
            </h1>
           <p className="text-slate-500 text-base leading-relaxed max-w-xs">
              Have a conversation in different languages
            </p>
          </div>
          <div className="relative flex items-end justify-center w-full lg:w-[55%] min-h-[340px] mt-12 lg:mt-0">
             {/* Background soft blob */}
             <div className="absolute left-[-10%] top-[-10%] w-[450px] h-[450px] bg-[#F1FAED] rounded-full -z-10 blur-3xl opacity-90"></div>
             
             {/* Combined RHS Image */}
             <div className="relative z-10 mr-10">
                <img 
                  src="/images/linguistic/rhs.png" 
                  alt="Learning Characters" 
                  className="w-[500px] xl:w-[800px] h-auto object-contain" 
                />
             </div>
             
             {/* Background Decoration Leaves */}
             <div className="absolute right-0 -bottom-16 opacity-60 -z-10">
                <LeafIcon className="w-72 h-72 text-[#C8E6C9] fill-[#C8E6C9]" />
             </div>
          </div>
        </div>

        {/* Selection Cards Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12 relative z-30 -mt-40">
          
          {/* Know Language Card */}
          <div className="bg-white border border-[slate-500] rounded-[40px] px-10 py-7 shadow-xl shadow-slate-100/50">
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-[15px] font-bold text-[#1A1C2E]">Choose the language <span className="text-[#0BB562]">you know</span></h3>
               
             </div>

             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {LANGUAGES.map(lang => (
                  <LanguagePill 
                    key={`src-${lang.id}`} 
                    lang={lang} 
                    selected={sourceLang === lang.id}
                    onClick={() => {
                      setSourceLang(lang.id);
                      if (targetLang === lang.id) setTargetLang(sourceLang || "en");
                    }} 
                  />
                ))}
             </div>
          </div>

          {/* Swap Middle Button */}
          <div 
            onClick={() => {
              if (!sourceLang || !targetLang) return;
              const temp = sourceLang;
              setSourceLang(targetLang);
              setTargetLang(temp);
            }}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white border border-[#F0F0F0] rounded-full flex items-center justify-center text-[#0BB562] shadow-xl z-40 hidden xl:flex hover:scale-110 transition-transform cursor-pointer ${(!sourceLang || !targetLang) && 'opacity-30 cursor-not-allowed'}`}
          >
            <ArrowRightLeft size={20} strokeWidth={2.5} />
          </div>

          {/* Target Language Card */}
          <div className="bg-white border border-[slate-500] rounded-[40px] px-10 py-7 shadow-xl shadow-slate-100/50">
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-[15px] font-bold text-[#1A1C2E]">Choose the language <span className="text-[#0BB562]">you want to learn</span></h3>
               
             </div>

             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {LANGUAGES.map(lang => (
                  <LanguagePill 
                    key={`tgt-${lang.id}`} 
                    lang={lang} 
                    selected={targetLang === lang.id}
                    disabled={sourceLang === lang.id}
                    onClick={() => setTargetLang(lang.id)} 
                  />
                ))}
             </div>
          </div>

        </div>

        {/* Primary CTA */}
        <div className="flex justify-center mb-8 -mt-6">
          <button 
            disabled={!sourceLang || !targetLang}
            onClick={() => handleStartLearning(lastModule)}
            className={`bg-[#0BB562] hover:bg-[#099A52] text-white font-bold px-12 py-4 rounded-full shadow-[0_8px_20px_rgba(11,181,98,0.2)] flex items-center gap-3 transition-all hover:-translate-y-0.5 group ${(!sourceLang || !targetLang) && 'opacity-50 cursor-not-allowed grayscale'}`}
          >
            {lastModule === 'words' ? 'Start Learning' : `Continue ${lastModule.charAt(0).toUpperCase() + lastModule.slice(1)}`} <ArrowRight size={20} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ModuleCard 
            title="Basic Words"
            desc="Learn everyday words with interactive practice"
            icon={<PlantIcon />}
            bg="#F1FAF6"
            titleColor="#065F46"
            linkColor="#10B981"
            imgSrc="/images/linguistic/plant_3d.png"
            onClick={() => handleStartLearning("words")}
          />
          <ModuleCard 
            title="Basic Phrases"
            desc={<>Learn useful phrases for<br /> daily conversations</>}
            icon={<ChatBubbleIcon />}
            bg="#FFF8EA"
            titleColor="#92400E"
            linkColor="#F59E0B"
            imgSrc="/images/linguistic/l4.png"
            onClick={() => handleStartLearning("phrases")}
          />
          <ModuleCard 
            title="Conversations"
            desc={<>Practice real conversations<br /> with AI characters</>}
            icon={<CharactersIcon />}
            bg="#F5F3FF"
            titleColor="#5B21B6"
            linkColor="#8B5CF6"
            imgSrc="/images/linguistic/hero_3d.png"
            onClick={() => handleStartLearning("conversations")}
          />
        </div>

        {/* Footer Section */}
        <div className="pb-7">
           <div className="flex justify-between items-center mb-5">
              <h3 className="text-2xl font-black text-[#1A1C2E]">Continue learning</h3>
              <button className="text-[15px] font-bold text-[#0BB562] flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                See all <ArrowRight size={18} strokeWidth={2.5} />
              </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ContinueItem icon={<BookOpen size={18} />} color="#0BB562" bg="#E8F5E9" title="Basic Words" progress={(wordsProgress / 20) * 100} text={`${wordsProgress} / 20`} onClick={() => handleStartLearning("words")} />
              <ContinueItem icon={<MessageSquare size={18} />} color="#FF9800" bg="#FFF3E0" title="Basic Phrases" progress={(phrasesProgress / 20) * 100} text={`${phrasesProgress} / 20`} onClick={() => handleStartLearning("phrases")} />
              <ContinueItem icon={<User size={18} />} color="#9C27B0" bg="#F3E5F5" title="Conversations" progress={(convProgress / 10) * 100} text={`${convProgress} / 10`} onClick={() => handleStartLearning("conversations")} />
           </div>
        </div>

      </main>

      <style jsx>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }
        .delay-100 {
          animation-delay: 0.5s;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #E2E8F0;
          border-radius: 10px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #CBD5E1;
        }
      `}</style>
    </div>
  );
}

/* Helper Components */

function SidebarItem({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl font-bold transition-all relative
        ${active ? "bg-[#E8F5E9] text-[#0BB562]" : "text-[#B0B0B0] hover:bg-slate-50 hover:text-slate-600"}`}
    >
      {icon}
      <span className="text-[13px]">{label}</span>
    </button>
  );
}

function LanguagePill({ lang, selected, disabled, onClick }) {
  return (
    <button 
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={`flex flex-col items-center justify-center gap-2 p-3 rounded-2xl border-2 transition-all relative overflow-hidden
        ${disabled ? "opacity-30 cursor-not-allowed grayscale" : ""}
        ${selected 
          ? "border-[#0BB562] bg-[#F1F8F1] shadow-sm" 
          : "border-[#F0F0F0] bg-white hover:border-slate-300"}`}
    >
      <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-100">
        <img src={lang.flag} alt={lang.name} className="w-full h-full object-cover scale-150" />
      </div>
      <span className={`text-[12px] font-bold ${selected ? "text-[#2E7D32]" : "text-slate-600"}`}>{lang.name}</span>
      
      {selected && (
        <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#0BB562] rounded-full flex items-center justify-center text-white">
          <Check size={10} strokeWidth={4} />
        </div>
      )}
    </button>
  );
}

function ModuleCard({ title, desc, icon, bg, titleColor, linkColor, imgSrc, onClick }) {
  return (
    <div 
      onClick={onClick}
      style={{ backgroundColor: bg }} 
      className="rounded-[36px] px-6 pt-6 pb-5 relative overflow-hidden group cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 min-h-[140px] flex flex-col border border-black/5 w-full"
    >
      <div className="flex items-start gap-2 mb-2">
        {/* Triple-layer Icon container */}
       <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0 -ml-2 -mt-2">
          <div className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ backgroundColor: linkColor }}>
             <div className="text-white scale-90">
               {icon}
             </div>
          </div>
        </div>
        <div className="-mt-3 pr-5 text-left">
          <h4 className="text-[16px] font-black leading-tight mb-1" style={{ color: titleColor }}>{title}</h4>
          <p className="text-[12px] font-medium text-slate-500 leading-relaxed max-w-[200px]">{desc}</p>
        </div>
      </div>
      
      <div className="mt-auto">
        <button style={{ color: linkColor }} className="flex items-center gap-2 text-[15px] font-black group-hover:gap-3 transition-all">
          Start learning <ArrowRight size={18} strokeWidth={3} />
        </button>
      </div>

      {/* 3D Graphic at Bottom Right */}
      <div className="absolute -right-4 -bottom-6 w-32 h-40 transition-transform duration-700 pointer-events-none flex items-end justify-end p-2">
        {imgSrc && <img src={imgSrc} alt="" className="w-full h-full object-contain" onError={(e) => e.target.style.display='none'} />}
      </div>
    </div>
  );
}

function ContinueItem({ icon, color, bg, title, sub, progress, text, onClick }) {
  return (
    <div onClick={onClick} className="bg-white border border-[#F0F0F0] rounded-3xl p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-all cursor-pointer group">
       <div className="flex items-center gap-4">
          <div style={{ backgroundColor: bg, color: color }} className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <div className="space-y-1">
            <h4 className="text-[15px] font-bold text-[#1A1C2E]">{title} <span className="text-slate-300 font-medium">- {sub}</span></h4>
            <div className="w-32 h-1.5 bg-[#F5F5F5] rounded-full overflow-hidden">
               <div style={{ width: `${progress}%`, backgroundColor: color }} className="h-full rounded-full" />
            </div>
          </div>
       </div>
       <span className="text-[14px] font-bold text-slate-400 group-hover:text-[#0BB562] transition-colors">{text}</span>
    </div>
  );
}

/* Custom Icons */
function LanguagesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 8 6 6" /><path d="m4 14 6-6 2-3" /><path d="M2 5h12" /><path d="M7 2h1" /><path d="m22 22-5-10-5 10" /><path d="M14 18h6" />
    </svg>
  );
}

function CalendarIcon({ size }) {
  return <Calendar size={size} />;
}

function ShieldIcon({ size }) {
  return <Shield size={size} strokeWidth={2.5} />;
}

function LeafIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a7 7 0 0 1-10 10Z" /><path d="M11 20c-1.5.5-3 1-5 1a4 4 0 0 1-4-4c0-2 1.5-3.5 1-5 2.5 0 4 1.5 5 1" /><path d="M11 20l1-5" />
    </svg>
  );
}

function PlantIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[#4CAF50]" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 10v12" /><path d="M15 14v8" /><path d="M10 22h4" /><path d="M10 15c0-3 2.5-5 5-5s5 2 5 5" /><path d="M7 10c0-3-2.5-5-5-5s-5 2-5 5" /><path d="M12 2v6" />
    </svg>
  );
}

function ChatBubbleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[#FF9800]" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function CharactersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[#9C27B0]" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" /><circle cx="17" cy="11" r="3" /><path d="M13 21v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1" />
    </svg>
  );
}
