import React, { useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const THEMES = {
  blue: {
    primary: 'bg-blue-600',
    primaryHover: 'hover:bg-blue-700',
    text: 'text-blue-600',
    textLight: 'text-blue-500',
    bgLight: 'bg-blue-50',
    borderLight: 'border-blue-100',
    borderHover: 'hover:border-blue-300',
    glow: 'shadow-blue-500/20',
    blob: 'bg-blue-400/10',
    pill: 'bg-blue-600 text-white',
  },
  emerald: {
    primary: 'bg-emerald-600',
    primaryHover: 'hover:bg-emerald-700',
    text: 'text-emerald-600',
    textLight: 'text-emerald-500',
    bgLight: 'bg-emerald-50',
    borderLight: 'border-emerald-100',
    borderHover: 'hover:border-emerald-300',
    glow: 'shadow-emerald-500/20',
    blob: 'bg-emerald-400/10',
    pill: 'bg-emerald-600 text-white',
  },
  amber: {
    primary: 'bg-amber-600',
    primaryHover: 'hover:bg-amber-700',
    text: 'text-amber-600',
    textLight: 'text-amber-500',
    bgLight: 'bg-amber-50',
    borderLight: 'border-amber-100',
    borderHover: 'hover:border-amber-300',
    glow: 'shadow-amber-500/20',
    blob: 'bg-amber-400/10',
    pill: 'bg-amber-600 text-white',
  },
  purple: {
    primary: 'bg-purple-600',
    primaryHover: 'hover:bg-purple-700',
    text: 'text-purple-600',
    textLight: 'text-purple-500',
    bgLight: 'bg-purple-50',
    borderLight: 'border-purple-100',
    borderHover: 'hover:border-purple-300',
    glow: 'shadow-purple-500/20',
    blob: 'bg-purple-400/10',
    pill: 'bg-purple-600 text-white',
  }
};

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const MissionLandingLayout = ({ themeName = 'blue', hero, overview, modules }) => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const theme = THEMES[themeName] || THEMES.blue;

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 400, behavior: "smooth" });
  };

  return (
    <div className="relative bg-[#FDFDFF] font-sans overflow-hidden">
      
      {/* Dynamic Background Orbs */}
      <div className={`absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] ${theme.blob} pointer-events-none`} />
      <div className={`absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[150px] ${theme.blob} pointer-events-none`} />

      {/* Back Navigation */}
      <div className="max-w-[1300px] mx-auto px-6 relative">
        <div className="absolute top-6 left-6 z-50">
          <button 
            onClick={() => navigate("/#missions-grid")} 
            className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:shadow-md transition-all group"
          >
            <ArrowLeft size={22} strokeWidth={2.5} className="group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 lg:pt-16 pb-16 px-6">
        <div className="max-w-[1300px] mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-8">
            
            {/* Left: Text Content */}
            <div className="lg:w-[48%] space-y-5 z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <h1 className="text-[36px] lg:text-[46px] font-extrabold text-[#111827] leading-[1.1] tracking-tight">
                  {hero.title.split(' ').map((word, i, arr) => (
                    <React.Fragment key={i}>
                      {i === arr.length - 1 ? <span className={theme.text}>{word}</span> : word}{" "}
                    </React.Fragment>
                  ))}
                </h1>
                <p className="text-[17px] font-bold text-slate-700 leading-snug max-w-lg">
                  {hero.highlight}
                </p>
                <p className="text-[14px] text-slate-500 leading-relaxed font-medium max-w-md">
                  {hero.description}
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Link to={hero.action.path}>
                  <button className={`px-6 py-3 ${theme.primary} ${theme.primaryHover} ${theme.glow} text-white rounded-full text-[14px] font-bold shadow-lg transition-all duration-300 flex items-center gap-2 group`}>
                    {hero.action.label} 
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </motion.div>

              {/* Feature Bento */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6"
              >
                {hero.features.map((feature, idx) => (
                  <div key={idx} className={`bg-white/60 backdrop-blur-xl border border-slate-200 ${theme.borderHover} p-4 rounded-[16px] shadow-sm hover:shadow-md transition-all duration-300 ${idx === 2 ? 'sm:col-span-2' : ''}`}>
                    <h3 className="text-[14px] font-bold text-slate-900 mb-0.5 tracking-tight">{feature.title}</h3>
                    <p className="text-[12.5px] text-slate-500 font-medium leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Immersive Image */}
            <div className="lg:w-[48%] relative z-10 flex justify-center lg:justify-end">
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative will-change-transform"
              >
                {/* Image Glow */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${theme.blob} blur-[80px] rounded-full scale-90 -z-10`} />
                <img
                  src={hero.image}
                  alt={hero.title}
                  className="w-full max-w-[460px] object-contain drop-shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Parallax Section */}
      <section className="py-16 px-6 relative z-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Content Side */}
            <div className="lg:w-1/2 flex flex-col relative z-10">
               <h2 className={`${theme.text} text-[13px] font-black uppercase tracking-[0.25em] mb-4`}>
                 {overview.title}
               </h2>
               <h3 className="text-[36px] lg:text-[42px] font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
                 {overview.heading}
               </h3>
               <p className="text-[17px] text-slate-500 leading-relaxed font-medium mb-10">
                 {overview.description}
               </p>

               <div className="space-y-5">
                 {overview.points.map((point, i) => (
                   <div key={i} className="flex items-start gap-4">
                     <div className={`mt-0.5 ${theme.text}`}>
                        <CheckCircle2 size={22} strokeWidth={2.5} />
                     </div>
                     <p className="text-[15px] font-bold text-slate-700 leading-snug">{point}</p>
                   </div>
                 ))}
               </div>
            </div>

            {/* Image Side (Sleek, Not Bulky) */}
            <div className="lg:w-1/2 relative flex justify-center">
               <div className="relative w-full max-w-[460px]">
                 {/* Decorative background shape */}
                 <div className={`absolute top-[-5%] right-[-5%] w-full h-full rounded-[40px] ${theme.bgLight} -z-10`} />
                 
                 {/* Main Image Container */}
                 <div className="rounded-[32px] overflow-hidden border border-slate-100 shadow-xl relative bg-white p-2">
                    <div className="rounded-[24px] overflow-hidden relative aspect-square">
                      <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors duration-700 z-10" />
                      <img
                        src={overview.image}
                        alt={overview.heading}
                        className="w-full h-full object-cover transform-gpu transition-transform duration-[1.5s] hover:scale-[1.05] will-change-transform"
                      />
                    </div>
                 </div>

                 {/* Floating Glass Badge */}
                 <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-xl p-5 rounded-2xl border border-slate-100 shadow-xl flex items-center gap-4 animate-bounce" style={{ animationDuration: '4s' }}>
                    <div className={`w-12 h-12 rounded-full ${theme.bgLight} ${theme.text} flex items-center justify-center`}>
                       <CheckCircle2 size={24} />
                    </div>
                    <div>
                       <p className="text-[13px] font-bold text-slate-900">Certified</p>
                       <p className="text-[11px] font-medium text-slate-500">Quality Program</p>
                    </div>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="py-14 px-6 relative z-20">
        <div className="max-w-[1200px] mx-auto">
          
          <div className="mb-8 space-y-2">
            <h2 className={`${theme.text} text-[13px] font-black uppercase tracking-[0.25em]`}>
              {modules.title}
            </h2>
            <h3 className="text-[28px] lg:text-[32px] font-extrabold text-slate-900 leading-tight tracking-tight">
              {modules.heading}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {modules.items.map((item, i) => (
              <div
                key={i}
                className="bg-white border border-slate-100 rounded-[16px] p-3 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
              >
                <div className="w-full aspect-[16/9] rounded-[10px] overflow-hidden bg-slate-50 mb-3 shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 px-1">
                  <h4 className="text-[15px] font-bold text-slate-900 leading-snug mb-1.5 tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-[12.5px] text-slate-500 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default MissionLandingLayout;
