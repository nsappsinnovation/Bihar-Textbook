import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, Play, Camera, Clock, Target, ChevronRight,
  BookOpen, MessageSquare, User
} from "lucide-react";

const CATEGORIES = [
  { label: "Greetings", icon: "🤟", color: "#22C55E", bg: "#EDFFF5" },
  { label: "Daily Life", icon: "☕", color: "#3B82F6", bg: "#EFF6FF" },
  { label: "Emotions", icon: "😊", color: "#A855F7", bg: "#F5F3FF" },
  { label: "Family", icon: "👨‍👩‍👧", color: "#EF4444", bg: "#FEF2F2" },
  { label: "Food", icon: "🍔", color: "#F59E0B", bg: "#FFFBEB" },
  { label: "School", icon: "📘", color: "#3B82F6", bg: "#EFF6FF" },
  { label: "Numbers", icon: "123", color: "#22C55E", bg: "#EDFFF5" },
];

const CONVERSATIONS = [
  {
    he: { label: "Hello", image: "/images/s3.png" },
    she: { label: "I love you", image: "/images/s1.png" },
  },
  {
    he: { label: "Thank you", image: "/images/s4.png" },
    she: { label: "You're welcome", image: "/images/s2.png" },
  },
];

const CONTINUE_ITEMS = [
  { title: "Basic Greetings", done: 8, total: 12 },
  { title: "Daily Expressions", done: 6, total: 15 },
  { title: "Emotions", done: 4, total: 12 },
];

export default function SignLearn() {
  const navigate = useNavigate();
  const [convoIdx, setConvoIdx] = useState(0);
  const convo = CONVERSATIONS[convoIdx];

  return (
    <div className="min-h-screen bg-[#F7FDF9] font-sans text-[#1A1C2E] px-4 md:px-10">
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .float { animation: float 3s ease-in-out infinite; }
        .no-scrollbar::-webkit-scrollbar { display:none; }
      `}</style>

      {/* Back Button */}
      <button
        onClick={() => navigate("/sign")}
        className="fixed top-5 left-5 z-50 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-green-600 hover:shadow-lg transition-all border border-slate-100 group"
      >
        <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>

      {/* ─── HERO ──────────────────────────────────────────────── */}
      <section className="bg-white px-16 pt-10 pb-4 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-center">

          {/* Left text */}
          <div className="flex-1 space-y-4 min-w-[240px]">
            <h1 className="text-4xl md:text-4xl font-black leading-tight">
              Let's learn<br /><span className="text-[#22C55E]">Sign Language</span>
              
            </h1>
            <p className="text-slate-500 text-base leading-relaxed max-w-xs">
              Have real conversations using signs and expressions.
            </p>
            <button
              onClick={() => navigate("/sign-module", { state: { type: "conversations" } })}
              className="mt-2 px-7 py-3 bg-[#22C55E] text-white rounded-full font-bold text-sm flex items-center gap-2 hover:bg-green-600 transition-all shadow-lg shadow-green-200 hover:-translate-y-0.5"
            >
              Start a Conversation <ArrowRight size={18} />
            </button>
          </div>

          {/* Hero cards carousel */}
          <div className="flex-[2] flex items-center justify-center gap-4 relative">
            <div className="relative flex items-end gap-2">
              <img src="/images/signlanguage/rhs.png" alt="Characters" className="w-[520px] md:w-[640px] h-auto object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ─────────────────────────────────────────── */}
      <section className="px-6 py-6 max-w-7xl mx-auto">
        <h2 className="text-lg font-black text-slate-800 mb-5">Choose what you want to learn</h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat, i) => (
            <button
              key={i}
              onClick={() => navigate("/sign-module", { state: { category: cat.label, type: "practice" } })}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-slate-100 shadow-sm whitespace-nowrap font-bold text-sm text-slate-700 transition-all hover:shadow-md hover:-translate-y-0.5 flex-shrink-0"
            >
              <span
                className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                style={{ backgroundColor: cat.bg, color: cat.color }}
              >
                {cat.icon}
              </span>
              <span style={{ color: cat.color }} className="font-bold">{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ─── MAIN CARDS ROW ─────────────────────────────────────── */}
      <section className="px-6 pb-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* LEFT: Let's start a conversation */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <span className="w-8 h-8 bg-[#EDFFF5] rounded-full flex items-center justify-center text-[#22C55E] text-base">💬</span>
            <h3 className="text-lg font-black text-[#22C55E]">Let's start a conversation</h3>
          </div>

          {/* Cards Row */}
          <div className="flex items-center justify-center gap-3">

            {/* Boy avatar */}
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-green-100 bg-green-50 flex-shrink-0">
              <img src="/images/signlanguage/boy.png" alt="Boy" className="w-10 h-15 object-cover object-top" />
            </div>

            {/* HE SIGNS card */}
            <div className="relative bg-[#EDFFF5] rounded-2xl p-4 flex flex-col items-center w-48 border border-green-100">
              <p className="text-[10px] font-black text-[#22C55E] uppercase tracking-widest mb-3">He Signs</p>
              <img src="/images/signlanguage/hand.png" alt="Thank you" className="w-28 h-28 object-contain" />
              
            </div>

            {/* Circular arrows */}
            <div className="flex flex-col items-center gap-1 text-slate-300 flex-shrink-0">
              <svg width="36" height="50" viewBox="0 0 36 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28 8C28 8 34 14 34 22C34 30 28 35 18 35" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" fill="none"/>
                <path d="M22 32L18 36L22 40" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 42C8 42 2 36 2 28C2 20 8 15 18 15" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" fill="none"/>
                <path d="M14 18L18 14L14 10" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* SHE REPLIES card */}
            <div className="relative bg-[#FFF8E8] rounded-2xl p-4 flex flex-col items-center w-48 border border-yellow-100">
              <p className="text-[10px] font-black text-[#F59E0B] uppercase tracking-widest mb-3">She Replies</p>
              <img src="/images/signlanguage/handl.png" alt="You're welcome" className="w-28 h-28 object-contain" />
             
            </div>

            {/* Girl avatar */}
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-yellow-100 bg-yellow-50 flex-shrink-0">
              <img src="/images/signlanguage/girl.png" alt="Girl" className="w-11 h-15 object-cover object-right" />
            </div>
          </div>

          {/* Labels */}
          <div className="flex justify-center gap-3 mt-3 px-14">
            <p className="text-sm font-bold text-slate-700 w-48 text-center">Thank you</p>
            <div className="w-12" />
            <p className="text-sm font-bold text-slate-700 w-48 text-center">You're welcome</p>
          </div>

          {/* Continue button */}
          <button onClick={() => navigate("/sign-module", { state: { type: "conversations" } })} className="mt-5 w-full bg-[#22C55E] text-white py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-green-600 transition-all shadow-md">
            Continue Conversation <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* RIGHT: Practice a sign */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-1">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🤚</span>
                <h3 className="text-base font-black text-slate-800">Practice a sign</h3>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-0.5 ml-7">Watch, learn and try</p>
            </div>
            <button onClick={() => navigate("/sign-module", { state: { category: "greetings", type: "camera" } })} className="flex items-center gap-2 px-4 py-2 bg-[#7C3AED] text-white rounded-full text-xs font-bold hover:bg-purple-700 transition-all">
              <Camera size={14} /> Try with Camera
            </button>
          </div>

          <div className="flex gap-4 mt-5">
            {/* Thumbs up sign */}
            <div className="flex-1 bg-slate-50 rounded-2xl flex items-center justify-center h-48 p-4">
              <img src="/images/signlanguage/thumb.png" alt="Practice" className="w-full h-full object-contain" />
            </div>
            {/* Outline / ghost hand */}
            <div className="flex-1 bg-slate-50 rounded-2xl flex items-center justify-center h-48 p-4 ">
              <img src="/images/signlanguage/ghosthand.png" alt="Try" className="w-full h-full object-contain grayscale" />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-4">
              <button onClick={() => navigate("/sign-module", { state: { category: "greetings", type: "practice" } })} className="flex items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-green-600 transition-colors">
                <Play size={16} className="text-[#22C55E]" /> Watch
              </button>

            </div>
            {/* Progress ring */}
            <div className="flex items-center gap-2 bg-green-50 rounded-2xl px-4 py-2">
              <div>
                <p className="text-xs font-black text-green-700">Good job!</p>
                <p className="text-[10px] text-slate-400">Keep practicing</p>
              </div>
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="24" cy="24" r="20" fill="transparent" stroke="#DCFCE7" strokeWidth="4" />
                  <circle cx="24" cy="24" r="20" fill="transparent" stroke="#22C55E" strokeWidth="4"
                    strokeDasharray="125.6" strokeDashoffset={125.6 - 0.85 * 125.6} strokeLinecap="round" />
                </svg>
                <span className="absolute text-[11px] font-black text-green-700">85%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTINUE LEARNING ──────────────────────────────────── */}
      <section className="px-6 pb-12 max-w-7xl mx-auto">
         <div className="flex justify-between items-center mb-5">
            <h3 className="text-2xl font-black text-[#1A1C2E]">Continue learning</h3>
            <button className="text-[15px] font-bold text-[#22C55E] flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              See all <ArrowRight size={18} strokeWidth={2.5} />
            </button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ContinueItem icon={<BookOpen size={18} />} color="#0BB562" bg="#E8F5E9" title="Greetings" progress={66} text="8 / 12" onClick={() => navigate("/sign-module", { state: { category: "greetings", type: "practice" } })} />
            <ContinueItem icon={<MessageSquare size={18} />} color="#FF9800" bg="#FFF3E0" title="Daily Life" progress={40} text="6 / 15" onClick={() => navigate("/sign-module", { state: { category: "daily life", type: "practice" } })} />
            <ContinueItem icon={<User size={18} />} color="#9C27B0" bg="#F3E5F5" title="Emotions" progress={33} text="4 / 12" onClick={() => navigate("/sign-module", { state: { category: "emotions", type: "practice" } })} />
         </div>
      </section>
    </div>
  );
}

function ContinueItem({ icon, color, bg, title, progress, text, onClick }) {
  return (
    <div onClick={onClick} className="bg-white rounded-[24px] p-5 shadow-sm border border-slate-100 flex items-center gap-4 cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all group">
      <div className="w-12 h-12 rounded-[16px] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform" style={{ backgroundColor: bg, color: color }}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-slate-800 text-[15px] mb-1.5 truncate">{title}</h4>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${progress}%`, backgroundColor: color }}></div>
          </div>
          <span className="text-xs font-bold text-slate-400 min-w-[36px]">{text}</span>
        </div>
      </div>
    </div>
  );
}
