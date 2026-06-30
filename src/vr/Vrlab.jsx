import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  Compass, 
  Cpu, 
  BookOpen, 
  Target, 
  Move 
} from 'lucide-react';

const Vrlab = () => {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState(0);
  const [panActive, setPanActive] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [progress, setProgress] = useState(0);

  const getLoadingStatus = (prog) => {
    if (prog < 25) return "Initializing WebGL Engine...";
    if (prog < 50) return "Downloading 3D meshes & materials...";
    if (prog < 75) return "Rendering high-fidelity shader passes...";
    if (prog < 90) return "Buffering stereoscopic controller logic...";
    return "Optimizing spatial audio & readying room...";
  };

  const modules = [
    {
      title: "Explore Ancient History",
      image: "/images/vr/v1.png",
      description: "Step into ancient temples, explore historical monuments, and walk through civilizations as if you were physically there.",
      duration: "15 min",
      difficulty: "Beginner"
    },
    {
      title: "Virtual Science Lab",
      image: "/images/vr/v2.png",
      description: "Perform advanced physics and biology experiments, examine DNA double-helixes, and manipulate molecules in safe 3D space.",
      duration: "20 min",
      difficulty: "Intermediate"
    },
    {
      title: "Space Exploration",
      image: "/images/vr/v3.png",
      description: "Journey across the solar system, tour planetary rings, and watch supernova explosions in a detailed astronomical simulation.",
      duration: "25 min",
      difficulty: "Advanced"
    },
    {
      title: "Classroom VR Tours",
      image: "/images/vr/i2.png",
      description: "Join fellow students in collaborative virtual learning spaces led by guides to explore complex, interactive textbook topics.",
      duration: "10 min",
      difficulty: "Beginner"
    }
  ];

  // Simulation progress timer
  useEffect(() => {
    let interval;
    if (isSimulating) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 120);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isSimulating]);

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-slate-900 overflow-hidden font-sans pb-24">
      {/* Subtle organic background elements */}
      <div className="absolute top-0 right-0 -z-10 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-blue-500/5 to-indigo-500/5 blur-[120px]" />
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-cyan-500/5 to-blue-500/5 blur-[120px]" />

      {/* Container */}
      <div className="max-w-[1140px] mx-auto px-6 sm:px-8 pt-2 sm:pt-4">

        {/* Navigation - Simple Align Back Arrow */}
        <div className="mb-4">
          <button 
            onClick={() => navigate("/#missions-grid")} 
            className="group w-10 h-10 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-full shadow-sm flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all duration-300 cursor-pointer"
            aria-label="Back to missions"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16 -mt-24">
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50/80 backdrop-blur-sm text-blue-700 border border-blue-200/50 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                Virtual Reality Mission
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                Immersive <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Virtual Reality</span> Lab
              </h1>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl">
                Experience high-fidelity 3D science labs, historic monument tours, and space exploration. Tailored for Grades 8–12, our virtual modules bridge textbook theory with interactive visual reality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap gap-3.5 pt-1"
            >
              <button 
                onClick={() => navigate("/vr-dashboard")}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full text-xs sm:text-sm font-bold shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                Start Exploring
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              
              <a 
                href="#simulator-section"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                Try Viewport Demo
              </a>
            </motion.div>

            {/* Premium Minimal Specs Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-3 gap-4 sm:gap-6 pt-5 border-t border-slate-200/80"
            >
              <div className="p-3.5 bg-white hover:bg-slate-50 border border-slate-200/60 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
                <div className="text-slate-900 font-bold flex items-center gap-1.5 text-xs sm:text-sm">
                  <Cpu size={14} className="text-blue-600" />
                  Grades 8-12
                </div>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">Curated for secondary school lessons.</p>
              </div>
              <div className="p-3.5 bg-white hover:bg-slate-50 border border-slate-200/60 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
                <div className="text-slate-900 font-bold flex items-center gap-1.5 text-xs sm:text-sm">
                  <Target size={14} className="text-indigo-600" />
                  Aligned
                </div>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">Meets board curriculum standards.</p>
              </div>
              <div className="p-3.5 bg-white hover:bg-slate-50 border border-slate-200/60 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
                <div className="text-slate-900 font-bold flex items-center gap-1.5 text-xs sm:text-sm">
                  <Compass size={14} className="text-violet-600" />
                  3D Viewport
                </div>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">Interactive preview mode included.</p>
              </div>
            </motion.div>
          </div>

          {/* Larger Hero Illustration - Clean and Professional */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative w-full max-w-[480px] group"
            >
              {/* Soft decorative glow background with subtle breathing animation */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-indigo-500/25 rounded-full blur-[70px] -z-10 animate-pulse duration-[4000ms]" />
              
              <img
                src="/images/vr/vr.png"
                alt="VR Experience Illustration"
                className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(59,130,246,0.18)] select-none group-hover:scale-[1.02] transition-transform duration-500"
              />
            </motion.div>
          </div>
        </section>

        {/* Section title & subtitle for the simulator */}
        <div id="simulator-section" className="text-center max-w-2xl mx-auto mb-10 space-y-2 pt-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-[10px] font-bold tracking-widest uppercase">
            Simulated Sandbox
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Interactive VR Viewport</h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">Select a virtual learning module below to load its preview inside our viewport player.</p>
        </div>

        {/* Interactive Viewport Section - Sleek Glassmorphism */}
        <section className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-[32px] shadow-xl shadow-slate-100/50 p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          
          {/* Left Column: Selector */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Select learning world</span>
              
              <div className="space-y-3">
                {modules.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!isSimulating) {
                        setActiveModule(idx);
                      }
                    }}
                    disabled={isSimulating}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer relative overflow-hidden group ${
                      activeModule === idx 
                        ? 'border-blue-500 bg-blue-50/50 shadow-sm shadow-blue-500/5' 
                        : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/40 hover:-translate-y-0.5 shadow-sm'
                    }`}
                  >
                    {activeModule === idx && (
                      <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600" />
                    )}

                    <div className={`p-2.5 rounded-xl border transition-colors duration-300 ${
                      activeModule === idx 
                        ? 'bg-blue-600 border-blue-600 text-white' 
                        : 'bg-slate-50 border-slate-100 text-slate-500 group-hover:bg-slate-100'
                    }`}>
                      {idx === 0 && <BookOpen size={16} />}
                      {idx === 1 && <Cpu size={16} />}
                      {idx === 2 && <Compass size={16} />}
                      {idx === 3 && <Target size={16} />}
                    </div>

                    <div className="space-y-0.5">
                      <h3 className="text-sm font-bold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {item.difficulty} • {item.duration}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Description card */}
            <div className="bg-slate-50/60 border border-slate-100/80 p-5 rounded-2xl">
              <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">Module Objective</h4>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                {modules[activeModule].description}
              </p>
            </div>
          </div>

          {/* Right Column: Viewport Simulator */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-slate-950 rounded-2xl p-3.5 border border-slate-900/60 flex-1 flex flex-col min-h-[360px] sm:min-h-[400px] relative overflow-hidden shadow-xl shadow-slate-950/20">
              
              {/* Screen Area */}
              <div className="relative flex-1 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center border border-slate-800/80">
                
                {/* 3D Panned Image */}
                <motion.div
                  className="w-full h-full absolute inset-0"
                  animate={panActive ? {
                    scale: 1.12,
                    x: [0, 12, -12, 0],
                    y: [0, -8, 8, 0]
                  } : { scale: 1, x: 0, y: 0 }}
                  transition={panActive ? {
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                  } : { duration: 0.4 }}
                >
                  <img
                    src={modules[activeModule].image}
                    alt={modules[activeModule].title}
                    className="w-full h-full object-cover opacity-90 select-none"
                  />
                </motion.div>

                {/* HUD Overlays when Gyro Look Around is Active */}
                {panActive && !isSimulating && (
                  <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
                    {/* Central Crosshair */}
                    <div className="relative w-8 h-8 flex items-center justify-center">
                      <div className="absolute w-6 h-6 border border-white/30 rounded-full animate-ping" />
                      <div className="absolute w-1.5 h-1.5 bg-white/70 rounded-full" />
                      <div className="absolute top-0 bottom-0 left-1/2 w-[1.5px] bg-white/25 -translate-x-1/2 h-8" />
                      <div className="absolute left-0 right-0 top-1/2 h-[1.5px] bg-white/25 -translate-y-1/2 w-8" />
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-950/80 border border-slate-800 text-[10px] text-blue-400 font-mono px-3 py-1 rounded-full tracking-wider uppercase flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                      Gyro lock active
                    </div>
                  </div>
                )}

                {/* LIVE Badge */}
                <div className="absolute top-4 left-4 z-10 bg-slate-950/70 border border-slate-800/80 backdrop-blur-sm text-[9px] text-slate-400 font-mono px-2 py-0.5 rounded-md flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  SIM FEED
                </div>

                {/* Simple clean framing corners */}
                <div className="absolute inset-4 pointer-events-none z-10">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/25" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/25" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/25" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/25" />
                </div>

                {/* Clean Loading State */}
                <AnimatePresence>
                  {isSimulating && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6 text-center text-white"
                    >
                      {progress < 100 ? (
                        <div className="space-y-4 max-w-xs w-full">
                          <div className="w-8 h-8 rounded-full border-2 border-slate-800 border-t-blue-500 animate-spin mx-auto" />
                          <div className="space-y-1">
                            <p className="text-xs font-bold tracking-wider text-slate-300 font-mono">
                              {getLoadingStatus(progress)}
                            </p>
                            <p className="text-[10px] text-slate-500 font-mono font-medium">Preparing simulation resources...</p>
                          </div>
                          
                          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
                            <motion.div 
                              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full"
                              initial={{ width: '0%' }}
                              animate={{ width: `${progress}%` }}
                              transition={{ ease: "easeInOut" }}
                            />
                          </div>
                          <span className="text-xs text-blue-400 font-mono">{progress}% READY</span>
                        </div>
                      ) : (
                        <motion.div 
                          initial={{ scale: 0.97, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="space-y-5 max-w-sm"
                        >
                          <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          
                          <div className="space-y-1">
                            <h4 className="text-sm font-bold">Virtual Room Ready</h4>
                            <p className="text-[11px] text-slate-400 font-medium">{modules[activeModule].title}</p>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-2">
                            <button
                              onClick={() => navigate("/vr-dashboard")}
                              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-blue-600/15 hover:shadow-lg cursor-pointer animate-pulse"
                            >
                              Enter Simulation
                            </button>
                            <button
                              onClick={() => {
                                setIsSimulating(false);
                                setProgress(0);
                              }}
                              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition-all border border-slate-700 cursor-pointer"
                            >
                              Reset
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Viewport Control Panel - Sleek Terminal Bar */}
              <div className="mt-3.5 flex flex-wrap gap-3 items-center justify-between border-t border-slate-900/60 pt-3 px-1 text-slate-400 bg-slate-950/45 rounded-xl">
                <div className="flex items-center gap-2">
                  {/* Look Around Toggle */}
                  <button
                    onClick={() => setPanActive(!panActive)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      panActive 
                        ? 'bg-blue-950/40 border-blue-900 text-blue-300 shadow-inner' 
                        : 'border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Move size={12} />
                    {panActive ? 'Panning...' : 'Look Around'}
                  </button>
                </div>

                {/* Launch Button */}
                <button
                  onClick={() => setIsSimulating(true)}
                  disabled={isSimulating}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-blue-500/10 hover:shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  <Play size={11} fill="currentColor" />
                  Launch Preview
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Sober Info Stats Grid - Upgraded to Gorgeous Bordered Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-slate-200/80 max-w-4xl mx-auto text-center">
          <div className="p-5 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
            <h5 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">10+</h5>
            <p className="text-xs sm:text-sm font-bold text-slate-800">Virtual Learning Rooms</p>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Spanning physics, history, and astronomy tours.</p>
          </div>
          <div className="p-5 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
            <h5 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">100%</h5>
            <p className="text-xs sm:text-sm font-bold text-slate-800">Curriculum Aligned</p>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Mapped directly to board textbook lessons.</p>
          </div>
          <div className="p-5 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
            <h5 className="text-3xl font-extrabold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">Active</h5>
            <p className="text-xs sm:text-sm font-bold text-slate-800">Interactive Lessons</p>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Includes built-in interactive simulations.</p>
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default Vrlab;
