import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, CheckCircle2, Star, Flame, Trophy, 
  Search, Landmark, Scroll, Database, Globe, History, Compass, 
  Map, User, MessageCircle, Shield, LayoutGrid, Clock, Award,
  Milestone, BookOpen, Heart, UserCircle, Briefcase, Flag
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeritageDashboard = () => {
  const navigate = useNavigate();

  const categories = [
    { label: 'Ancient Civilizations', icon: <Landmark size={20} />, active: true },
    { label: 'Indian Heritage', icon: <Landmark size={20} /> },
    { label: 'World Heritage', icon: <Globe size={20} /> },
    { label: 'Artifacts Collection', icon: <Database size={20} /> },
    { label: 'Manuscripts & Documents', icon: <Scroll size={20} /> },
    { label: 'Freedom Struggle', icon: <Flag size={20} /> },
    { label: 'Folk Culture & Traditions', icon: <UserCircle size={20} /> },
    { label: 'More Categories', icon: <LayoutGrid size={20} /> },
  ];

  const eras = [
    { name: 'Indus Valley Civilization', date: '3300 BCE – 1300 BCE', image: 'https://images.unsplash.com/photo-1599507591144-66a1ef8a1e8a?auto=format&fit=crop&q=80&w=200' },
    { name: 'Maurya Empire', date: '322 BCE – 185 BCE', image: 'https://images.unsplash.com/photo-1564507595616-b35231df6d4d?auto=format&fit=crop&q=80&w=200' },
    { name: 'Gupta Period', date: '320 CE – 550 CE', image: 'https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=200' },
    { name: 'Medieval India', date: '1206 CE – 1707 CE', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=200' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-slate-900 pb-2">
      {/* Back Button */}
      <button
        onClick={() => navigate("/heritage-archive")}
        className="fixed top-5 left-5 z-50 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-[#B45309] hover:shadow-lg transition-all border border-slate-100 group"
      >
        <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>

      {/* Hero Section */}
      <section className="relative pt-0 pb-0 px-6 md:px-12 lg:px-12 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-black text-[#1E293B] leading-[1.1]">
              Let's explore <br />
              <span className="text-[#B45309]">Heritage Archive</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl font-medium max-w-md">
              Discover, learn and preserve our rich history and cultural heritage.
            </p>
            <button className="px-8 py-3.5 bg-[#B45309] text-white rounded-full font-bold text-base flex items-center gap-3 hover:bg-[#92400E] transition-all active:scale-95 group">
              Start exploring <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="relative h-[450px] flex items-center justify-center">
            {/* Characters */}
            <div className="relative z-20 w-full h-full">
              <img src="/images/heritage/rhs.png" alt="Heritage Explorers" className="w-full h-full object-contain object-center scale-110" />
            </div>
          </div>
        </div>
      </section>

      {/* Category Selection */}
      <section className="px-6 md:px-12 lg:px-12 py-0">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-xl font-black text-slate-900 mb-4 tracking-tight">Choose what you want to explore</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              { label: 'Ancient Civilizations', icon: '🏺', color: 'bg-amber-50', active: true },
              { label: 'Indian Heritage', icon: '🏰', color: 'bg-orange-50' },
              { label: 'World Heritage', icon: '🌍', color: 'bg-blue-50' },
              { label: 'Artifacts', icon: '🗿', color: 'bg-slate-50' },
              { label: 'Manuscripts', icon: '📜', color: 'bg-emerald-50' },
              { label: 'Freedom Struggle', icon: '🇮🇳', color: 'bg-red-50' },
              { label: 'Folk Culture', icon: '🎨', color: 'bg-purple-50' },
            ].map((cat, i) => (
              <div 
                key={i} 
                className={`px-3 py-1.5 rounded-xl border flex items-center gap-2.5 transition-all cursor-pointer group hover:shadow-sm ${
                  cat.active ? 'bg-white border-amber-200 shadow-sm' : 'bg-white border-slate-100'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 text-base shadow-inner ${cat.color}`}>
                  {cat.icon}
                </div>
                <span className="text-[12px] font-black text-slate-700 leading-tight text-left">
                  {cat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Grid */}
      <section className="px-6 md:px-12 lg:px-12 py-4">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Continue Learning - Ultra Compact */}
          <div className="lg:col-span-5 bg-white rounded-[40px] p-4 border border-slate-100 shadow-sm flex flex-col min-h-[170px] justify-center">
            <h3 className="text-xs font-black mb-2 text-slate-700 tracking-widest uppercase">Continue Learning</h3>
            <div className="bg-[#F8F9FF] rounded-[24px] p-4 flex flex-row items-center gap-4 flex-1">
              <div className="w-40 h-40 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 shadow-inner shrink-0">
                <img src="images/heritage/chola.png" alt="Chola Dynasty" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-2">
                <h4 className="font-black text-slate-900 text-base -mt-6 tracking-tight leading-tight">The Chola Dynasty</h4>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[65%] h-full bg-[#B45309] rounded-full shadow-sm" />
                  </div>
                  <span className="text-[12px] font-black text-slate-400">65%</span>
                </div>
                <p className="text-[14px] text-slate-500 leading-tight font-medium line-clamp-2">
                  Learn about the powerful Chola empire, their art and architecture.
                </p>
                <button className="px-4 py-2 bg-[#B45309] text-white rounded-xl font-bold text-[10px] flex items-center gap-2 hover:bg-[#92400E] transition-all active:scale-95 w-max">
                  Continue <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Explore by Era - Cleaned Layout - Ultra Compact */}
          <div className="lg:col-span-3 bg-white rounded-[40px] p-4 border border-slate-100 shadow-sm flex flex-col min-h-[170px]">
            <h3 className="text-xs font-black mb-2 text-slate-700 tracking-widest uppercase">Explore by Era</h3>
            <div className="space-y-1.5 flex-1 overflow-y-auto pr-1 custom-scrollbar">
              {eras.map((era, i) => (
                <div key={i} className="flex items-center gap-3 p-1 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group">
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                    <img src={era.image} alt={era.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-[11px] font-black text-slate-800 truncate leading-none mb-1">{era.name}</h5>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none">{era.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-2 text-[9px] font-black text-amber-600 hover:text-amber-700 transition-colors flex items-center justify-center gap-1">
              View all eras <ArrowRight size={10} />
            </button>
          </div>

          {/* Daily Discovery - Standardized - Ultra Compact */}
          <div className="lg:col-span-4 bg-white rounded-[40px] p-4 border border-slate-100 shadow-sm flex flex-col min-h-[170px] justify-center">
             <h3 className="text-xs font-black mb-2 text-slate-700 tracking-widest uppercase">Daily Discovery</h3>
             <div className="bg-[#FFF9ED] rounded-[24px] p-4 flex flex-row items-center gap-4 flex-1">
                <div className="flex-1 space-y-2">
                  <h4 className="text-base font-black text-[#92400E] -mt-12 mb-6">Did you know?</h4>
                  <p className="text-[14px] text-[#92400E]/80 font-medium leading-tight">
                    The Konark Sun Temple was designed like a giant chariot with 24 wheels.
                  </p>
                </div>
                <div className="w-40 h-full rounded-xl overflow-hidden shadow-md border-2 border-white shrink-0 relative group">
                   <img src="/images/heritage/konark.png" alt="Konark" className="w-full h-full object-cover" />
                </div>
             </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default HeritageDashboard;
