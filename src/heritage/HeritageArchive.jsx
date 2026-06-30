import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Landmark, 
  Database, 
  Search, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders,
  FileText,
  BookOpen
} from 'lucide-react';

const HeritageArchive = () => {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [progress, setProgress] = useState(0);

  // Sound Feedback using Web Audio API
  const playSound = (type) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      if (type === 'success') {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.12); // E5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.24); // G5
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);
        osc.start();
        osc.stop(ctx.currentTime + 0.45);
      } else if (type === 'fail') {
        osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
        osc.frequency.setValueAtTime(174.61, ctx.currentTime + 0.15); // F3
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else if (type === 'click') {
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      }
    } catch (e) {}
  };

  // =========================================================================
  // SANDBOX 0: OCR SCANNER
  // =========================================================================
  const [scanTarget, setScanTarget] = useState('nalanda'); // nalanda, mauryan, british
  const [scanStatus, setScanStatus] = useState('READY'); // READY, SCANNING, DONE
  const [scanPercentage, setScanPercentage] = useState(0);

  const handleStartScan = () => {
    playSound('click');
    setScanStatus('SCANNING');
    setScanPercentage(0);
  };

  useEffect(() => {
    let t;
    if (scanStatus === 'SCANNING') {
      t = setInterval(() => {
        setScanPercentage((prev) => {
          if (prev >= 100) {
            clearInterval(t);
            return 100;
          }
          return prev + 25;
        });
      }, 250);
    }
    return () => clearInterval(t);
  }, [scanStatus]);

  // Handle completion of scan
  useEffect(() => {
    if (scanStatus === 'SCANNING' && scanPercentage === 100) {
      setScanStatus('DONE');
      playSound('success');
    }
  }, [scanPercentage, scanStatus]);

  // =========================================================================
  // SANDBOX 1: METADATA CATALOGING
  // =========================================================================
  const [catalogTarget, setCatalogTarget] = useState('nalanda'); // nalanda, mauryan, british
  const [selectedEra, setSelectedEra] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [catalogFeedback, setCatalogFeedback] = useState(null); // 'CORRECT', 'INCORRECT', null

  const handleCheckCatalog = () => {
    let correct = false;
    if (catalogTarget === 'nalanda') {
      if (selectedEra === 'Gupta Empire' && selectedLanguage === 'Sanskrit') correct = true;
    } else if (catalogTarget === 'mauryan') {
      if (selectedEra === 'Mauryan Empire' && selectedLanguage === 'Prakrit') correct = true;
    } else {
      if (selectedEra === 'British Raj' && selectedLanguage === 'English') correct = true;
    }

    if (correct) {
      setCatalogFeedback('CORRECT');
      playSound('success');
    } else {
      setCatalogFeedback('INCORRECT');
      playSound('fail');
    }
  };

  // =========================================================================
  // SANDBOX 2: RESTORATION LAB
  // =========================================================================
  const [inkContrast, setInkContrast] = useState(30);
  const [deNoise, setDeNoise] = useState(10);
  const [restorationSuccess, setRestorationSuccess] = useState(false);

  useEffect(() => {
    if (inkContrast >= 75 && deNoise >= 65) {
      if (!restorationSuccess) {
        setRestorationSuccess(true);
        playSound('success');
      }
    } else {
      setRestorationSuccess(false);
    }
  }, [inkContrast, deNoise]);

  const getLoadingStatus = (prog) => {
    if (prog < 25) return "Connecting to digital repository...";
    if (prog < 50) return "Loading high-resolution historical assets...";
    if (prog < 75) return "Initializing OCR text-extraction engine...";
    if (prog < 90) return "Setting up interactive restoration workspace...";
    return "Optimizing archival simulator... Ready!";
  };

  const modules = [
    {
      title: "Document Digitization",
      image: "/images/generated/heritage_collection.png",
      description: "Gathering historical textbooks, manuscripts, and educational records. High-resolution scanning and OCR processing.",
      duration: "15 min",
      difficulty: "Beginner"
    },
    {
      title: "Digital Cataloging",
      image: "/images/generated/pustak_digital.png",
      description: "Organizing digital assets into a searchable and structured database using correct historical metadata tagging.",
      duration: "10 min",
      difficulty: "Intermediate"
    },
    {
      title: "Manuscript Restoration Lab",
      image: "/images/generated/heritage_archive_indian.png",
      description: "Adjust digital imaging parameters to restore faded ink and remove noise from ancient, degraded manuscripts.",
      duration: "20 min",
      difficulty: "Advanced"
    }
  ];

  // Reset simulator options when active module changes
  useEffect(() => {
    setIsSimulating(false);
    setProgress(0);
    
    // Reset Module 0
    setScanTarget('nalanda');
    setScanStatus('READY');
    setScanPercentage(0);

    // Reset Module 1
    setCatalogTarget('nalanda');
    setSelectedEra('');
    setSelectedLanguage('');
    setCatalogFeedback(null);

    // Reset Module 2
    setInkContrast(30);
    setDeNoise(10);
    setRestorationSuccess(false);
  }, [activeModule]);

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
      }, 100);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isSimulating]);

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-slate-900 overflow-hidden font-sans pb-24">
      {/* Subtle organic background elements */}
      <div className="absolute top-0 right-0 -z-10 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-amber-500/5 to-orange-500/5 blur-[120px]" />
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-orange-500/5 to-amber-500/5 blur-[120px]" />

      {/* Container */}
      <div className="max-w-[1140px] mx-auto px-6 sm:px-8 pt-4">

        {/* Navigation */}
        <div className="mb-4 mt-2">
          <button 
            onClick={() => navigate("/#missions-grid")} 
            className="group w-10 h-10 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-full shadow-sm flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all duration-300 cursor-pointer"
            aria-label="Back to missions"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16 -mt-4">
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50/80 backdrop-blur-sm text-amber-750 border border-amber-200/50 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                Education Heritage Archive
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                Preserving the <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Legacy of</span> Education
              </h1>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl">
                A centralized digital repository safeguarding Bihar's rich educational history and manuscripts. Bridge textbook theory with interactive restoration and archiving sandboxes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap gap-3.5 pt-1"
            >
              <button 
                onClick={() => navigate("/heritage-dashboard")}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-750 hover:to-orange-750 text-white rounded-full text-xs sm:text-sm font-bold shadow-md shadow-amber-500/10 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                Start Exploring
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              
              <a 
                href="#simulator-section"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                Try Interactive Archiving
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
                  <Landmark size={14} className="text-amber-600" />
                  Preservation
                </div>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">Protect rare books, manuscripts, and old files.</p>
              </div>
              <div className="p-3.5 bg-white hover:bg-slate-50 border border-slate-200/60 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
                <div className="text-slate-900 font-bold flex items-center gap-1.5 text-xs sm:text-sm">
                  <Database size={14} className="text-orange-600" />
                  Digital Access
                </div>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">High-resolution scans accessible globally online.</p>
              </div>
              <div className="p-3.5 bg-white hover:bg-slate-50 border border-slate-200/60 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
                <div className="text-slate-900 font-bold flex items-center gap-1.5 text-xs sm:text-sm">
                  <Search size={14} className="text-yellow-600" />
                  Research Ready
                </div>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">A searchable database tailored for students.</p>
              </div>
            </motion.div>
          </div>

          {/* Hero Illustration */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative w-full max-w-[440px] group"
            >
              {/* Soft decorative glow background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-orange-500/15 rounded-full blur-[70px] -z-10 animate-pulse duration-[4000ms]" />
              
              <img
                src="/images/heritage/heritage archive.png"
                alt="Heritage Archive Experience Illustration"
                className="w-full h-auto object-contain select-none group-hover:scale-[1.02] transition-transform duration-500"
              />
            </motion.div>
          </div>
        </section>

        {/* Section title & subtitle for the simulator */}
        <div id="simulator-section" className="text-center max-w-2xl mx-auto mb-10 space-y-2 pt-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-50 text-amber-755 border border-amber-100 rounded-full text-[10px] font-bold tracking-widest uppercase">
            Simulated Sandbox
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Interactive Archival Viewport</h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">Select an archiving phase below to load its interactive simulation inside our viewport player.</p>
        </div>

        {/* Interactive Viewport Section */}
        <section className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-[32px] shadow-xl shadow-slate-100/50 p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          
          {/* Left Column: Selector */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Select archiving phase</span>
              
              <div className="space-y-3">
                {modules.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveModule(idx);
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer relative overflow-hidden group ${
                      activeModule === idx 
                        ? 'border-amber-500 bg-amber-50/50 shadow-sm shadow-amber-500/5' 
                        : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/40 hover:-translate-y-0.5 shadow-sm'
                    }`}
                  >
                    {activeModule === idx && (
                      <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-600" />
                    )}

                    <div className={`p-2.5 rounded-xl border transition-colors duration-300 ${
                      activeModule === idx 
                        ? 'bg-amber-600 border-amber-600 text-white' 
                        : 'bg-slate-50 border-slate-100 text-slate-500 group-hover:bg-slate-100'
                    }`}>
                      {idx === 0 && <FileText size={16} />}
                      {idx === 1 && <BookOpen size={16} />}
                      {idx === 2 && <Sliders size={16} />}
                    </div>

                    <div className="space-y-0.5">
                      <h3 className="text-sm font-bold text-slate-800 leading-snug group-hover:text-amber-600 transition-colors">
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
            <div className="bg-slate-950 rounded-2xl p-3.5 border border-slate-900/60 flex-1 flex flex-col min-h-[420px] sm:min-h-[460px] relative overflow-hidden shadow-xl shadow-slate-950/20">
              
              {/* Screen Area */}
              <div className="relative flex-1 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center border border-slate-800/80">
                
                {/* Static Image with zoom-on-hover - Shown when NOT simulated preview */}
                {!isSimulating && (
                  <div className="w-full h-full absolute inset-0 overflow-hidden group/screen bg-slate-950">
                    <img
                      src={modules[activeModule].image}
                      alt={modules[activeModule].title}
                      className="w-full h-full object-cover opacity-65 select-none transition-transform duration-[2.5s] group-hover/screen:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/40" />
                    
                    <div className="absolute bottom-6 left-6 right-6 text-left space-y-2 z-10">
                      <span className="inline-block px-2.5 py-0.5 bg-amber-600/20 text-amber-455 border border-amber-500/30 rounded-md text-[9px] font-bold font-mono tracking-widest uppercase">
                        PREVIEW STATE
                      </span>
                      <h4 className="text-white font-extrabold text-base tracking-tight">{modules[activeModule].title}</h4>
                      <p className="text-slate-400 text-xs leading-normal max-w-md font-medium">Click 'Launch Sandbox' below to start the interactive archiving simulation.</p>
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
                  {isSimulating && progress < 100 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6 text-center text-white"
                    >
                      <div className="space-y-4 max-w-xs w-full">
                        <div className="w-8 h-8 rounded-full border-2 border-slate-800 border-t-amber-500 animate-spin mx-auto" />
                        <div className="space-y-1">
                          <p className="text-xs font-bold tracking-wider text-slate-300 font-mono">
                            {getLoadingStatus(progress)}
                          </p>
                          <p className="text-[10px] text-slate-500 font-mono font-medium">Preparing simulation resources...</p>
                        </div>
                        
                        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
                          <motion.div 
                            className="bg-gradient-to-r from-amber-500 to-orange-500 h-full"
                            initial={{ width: '0%' }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "easeInOut" }}
                          />
                        </div>
                        <span className="text-xs text-amber-400 font-mono">{progress}% READY</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Active Interactive Simulation Screen */}
                {isSimulating && progress === 100 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 z-10 w-full h-full bg-slate-900 p-4 sm:p-6 flex flex-col items-center justify-center text-left text-slate-200 overflow-y-auto custom-scrollbar"
                  >
                    
                    {/* Module 0: Document Digitization */}
                    {activeModule === 0 && (
                      <div className="w-full max-w-sm space-y-4 flex flex-col items-center">
                        <div className="text-center space-y-1">
                          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">High-Res OCR Scanner</h4>
                          <p className="text-[11px] text-slate-400">Select a document to extract historical text.</p>
                        </div>

                        {/* Select Target Document */}
                        <div className="flex gap-2 w-full">
                          {[
                            { id: 'nalanda', label: 'Nalanda Charter' },
                            { id: 'mauryan', label: 'Mauryan Edict' },
                            { id: 'british', label: '1850 Textbook' }
                          ].map((doc) => (
                            <button
                              key={doc.id}
                              onClick={() => {
                                if (scanStatus !== 'SCANNING') {
                                  playSound('click');
                                  setScanTarget(doc.id);
                                  setScanStatus('READY');
                                }
                              }}
                              className={`flex-1 py-1.5 rounded-lg border text-[10px] font-bold transition-all ${
                                scanTarget === doc.id 
                                  ? 'bg-amber-950 border-amber-500 text-amber-400' 
                                  : 'bg-slate-950 border-slate-800 text-slate-455 hover:text-white'
                              }`}
                            >
                              {doc.label}
                            </button>
                          ))}
                        </div>

                        {/* Document Viewport */}
                        <div className="w-full aspect-video bg-slate-950 border border-slate-850 rounded-xl relative overflow-hidden flex items-center justify-center p-4">
                          {scanStatus === 'READY' && (
                            <div className="text-center space-y-1">
                              <span className="text-2xl block">📜</span>
                              <p className="text-[10px] text-slate-400 font-bold font-mono">DOCUMENT PRE-LOADED</p>
                              <p className="text-[9px] text-slate-500">Ready for digital scanner sweep.</p>
                            </div>
                          )}

                          {scanStatus === 'SCANNING' && (
                            <div className="w-full h-full flex flex-col items-center justify-center space-y-2 relative">
                              {/* Glowing Scan Line */}
                              <motion.div 
                                className="absolute left-0 right-0 h-0.5 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)] z-10"
                                animate={{ top: ['0%', '100%', '0%'] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                              />
                              <span className="text-base font-bold text-slate-200 animate-pulse">Scanning Page...</span>
                              <span className="text-[9px] font-mono text-amber-455">{scanPercentage}% COMPLETED</span>
                            </div>
                          )}

                          {scanStatus === 'DONE' && (
                            <div className="w-full h-full overflow-y-auto custom-scrollbar text-[10px] font-mono leading-relaxed text-slate-300 space-y-2 text-left">
                              <div className="border-b border-slate-850 pb-1 text-amber-400 font-bold flex justify-between">
                                <span>[EXTRACTED TEXT]</span>
                                <span className="text-[8px] text-emerald-400">OCR ACCURACY: 98.4%</span>
                              </div>
                              {scanTarget === 'nalanda' && (
                                <p className="italic">"The great monastery of Nalanda, where thousands of scholars gather to study the sacred sciences, philosophy, and astronomy..."</p>
                              )}
                              {scanTarget === 'mauryan' && (
                                <p className="italic">"Beloved-of-the-Gods, King Piyadasi, conquers through Dharma. Let these edicts be engraved on stone pillars throughout the empire..."</p>
                              )}
                              {scanTarget === 'british' && (
                                <p className="italic">"First Lesson in Geography: The division of land and sea. Bihar, bounded by the Himalayas in the north and Ganga flowing through..."</p>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Scan Button */}
                        {scanStatus === 'READY' && (
                          <button
                            onClick={handleStartScan}
                            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer active:scale-95"
                          >
                            🔍 Start OCR Scan
                          </button>
                        )}

                        {scanStatus === 'DONE' && (
                          <button
                            onClick={() => setScanStatus('READY')}
                            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all border border-slate-700 cursor-pointer"
                          >
                            Scan Another Document
                          </button>
                        )}
                      </div>
                    )}

                    {/* Module 1: Digital Cataloging */}
                    {activeModule === 1 && (
                      <div className="w-full max-w-sm space-y-4 flex flex-col items-center">
                        <div className="text-center space-y-1">
                          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Metadata Archiving Game</h4>
                          <p className="text-[11px] text-slate-400">Tag the active document with correct historical metadata.</p>
                        </div>

                        {/* Target Document Switcher */}
                        <div className="flex gap-2 w-full">
                          {[
                            { id: 'nalanda', label: 'Nalanda Scroll' },
                            { id: 'mauryan', label: 'Mauryan Pillar Edict' },
                            { id: 'british', label: '1850 Geography' }
                          ].map((doc) => (
                            <button
                              key={doc.id}
                              onClick={() => {
                                playSound('click');
                                setCatalogTarget(doc.id);
                                setCatalogFeedback(null);
                                setSelectedEra('');
                                setSelectedLanguage('');
                              }}
                              className={`flex-1 py-1.5 rounded-lg border text-[10px] font-bold transition-all ${
                                catalogTarget === doc.id 
                                  ? 'bg-amber-950 border-amber-500 text-amber-400' 
                                  : 'bg-slate-950 border-slate-800 text-slate-455 hover:text-white'
                              }`}
                            >
                              {doc.label}
                            </button>
                          ))}
                        </div>

                        {/* Document Label Info */}
                        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-850 w-full text-xs font-mono space-y-1 text-slate-450 text-left">
                          <div>ITEM: <span className="text-white font-bold">{
                            catalogTarget === 'nalanda' ? 'Nalanda Charter Scroll' : 
                            catalogTarget === 'mauryan' ? 'Lauriya Areraj Pillar inscription' : 
                            'Bihar School Textbook (Early Raj edition)'
                          }</span></div>
                          <div>TYPE: <span className="text-white">Historical Manuscript / Record</span></div>
                        </div>

                        {/* Options Selectors */}
                        <div className="space-y-3.5 w-full">
                          {/* Era Selection */}
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block text-left">Select Era / Dynasty</label>
                            <div className="grid grid-cols-3 gap-2">
                              {['Gupta Empire', 'Mauryan Empire', 'British Raj'].map((era) => (
                                <button
                                  key={era}
                                  onClick={() => { playSound('click'); setSelectedEra(era); }}
                                  className={`py-1.5 rounded-lg border text-[10px] font-bold transition-all ${
                                    selectedEra === era 
                                      ? 'bg-amber-950 border-amber-500 text-amber-455' 
                                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                                  }`}
                                >
                                  {era}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Language Selection */}
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block text-left">Select Language</label>
                            <div className="grid grid-cols-3 gap-2">
                              {['Sanskrit', 'Prakrit', 'English'].map((lang) => (
                                <button
                                  key={lang}
                                  onClick={() => { playSound('click'); setSelectedLanguage(lang); }}
                                  className={`py-1.5 rounded-lg border text-[10px] font-bold transition-all ${
                                    selectedLanguage === lang 
                                      ? 'bg-amber-950 border-amber-500 text-amber-455' 
                                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                                  }`}
                                >
                                  {lang}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Check Button & Feedback */}
                        {catalogFeedback === null ? (
                          <button
                            onClick={handleCheckCatalog}
                            disabled={!selectedEra || !selectedLanguage}
                            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs shadow-md transition-all disabled:opacity-50 cursor-pointer active:scale-95"
                          >
                            🏷️ Save Metadata
                          </button>
                        ) : (
                          <div className="space-y-3 w-full">
                            <div className={`p-3.5 rounded-xl border text-xs leading-normal ${catalogFeedback === 'CORRECT' ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-250' : 'bg-red-950/60 border-red-500/30 text-red-250 shadow-[0_0_20px_rgba(239,68,68,0.15)]'}`}>
                              {catalogFeedback === 'CORRECT' ? (
                                <div className="space-y-1">
                                  <div className="font-bold flex items-center gap-1.5 text-emerald-450"><CheckCircle2 size={15} /> Catalog Match!</div>
                                  <p className="text-[10.5px] text-slate-300 leading-normal">
                                    Correct! This document is now cataloged under <span className="text-white font-bold">{selectedEra}</span> in <span className="text-white font-bold">{selectedLanguage}</span>. It can now be searched in the public database!
                                  </p>
                                </div>
                              ) : (
                                <div className="space-y-1">
                                  <div className="font-bold flex items-center gap-1.5 text-red-400"><AlertTriangle size={15} className="animate-pulse" /> Classification Mismatch!</div>
                                  <p className="text-[10.5px] text-slate-300 leading-normal">
                                    The metadata tag is incorrect for this document. Verify its historical origin and language and try again.
                                  </p>
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => {
                                setCatalogFeedback(null);
                                setSelectedEra('');
                                setSelectedLanguage('');
                              }}
                              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all border border-slate-700 cursor-pointer"
                            >
                              Try Again
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Module 2: Restoration Lab */}
                    {activeModule === 2 && (
                      <div className="w-full max-w-sm space-y-4 flex flex-col items-center">
                        <div className="text-center space-y-1">
                          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Manuscript Restoration Lab</h4>
                          <p className="text-[11px] text-slate-400">Adjust parameters to make the faded text readable.</p>
                        </div>

                        {/* Image comparison container */}
                        <div className="w-full aspect-video bg-slate-950 border border-slate-850 rounded-xl relative overflow-hidden flex items-center justify-center">
                          {/* Simulated Faded/Restored Text */}
                          <div className="text-center font-serif p-4 rounded text-xs select-none tracking-wide max-w-[220px]">
                            <span 
                              style={{ 
                                opacity: inkContrast / 100, 
                                filter: `blur(${(100 - deNoise) / 18}px)`,
                                color: '#f59e0b',
                                textShadow: restorationSuccess ? '0 0 8px rgba(245,158,11,0.5)' : 'none'
                              }}
                              className="font-extrabold text-sm transition-all duration-300 block"
                            >
                              ऋग्वेद संहिता <br />
                              तत सवितुर वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात
                            </span>
                            <span className="text-[8.5px] text-slate-550 font-sans block mt-3 font-mono">
                              [RESTORED MANUSCRIPT VIEW]
                            </span>
                          </div>

                          {/* Status Badge */}
                          <div className="absolute top-2 right-2 bg-slate-900/80 px-2 py-0.5 rounded font-mono text-[8px] border border-slate-800">
                            STATUS: <span className={restorationSuccess ? 'text-emerald-455 font-bold' : 'text-red-400'}>{restorationSuccess ? 'LEGIBLE' : 'FADED'}</span>
                          </div>
                        </div>

                        {/* Sliders */}
                        <div className="space-y-3.5 w-full">
                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] font-mono text-slate-400">
                              <span>INK CONTRAST:</span>
                              <span className="text-amber-400 font-bold">{inkContrast}%</span>
                            </div>
                            <input 
                              type="range" 
                              min="0" 
                              max="100" 
                              value={inkContrast} 
                              onChange={(e) => setInkContrast(Number(e.target.value))}
                              className="w-full accent-amber-500 bg-slate-900 h-1 rounded-lg cursor-pointer"
                            />
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] font-mono text-slate-400">
                              <span>DE-NOISE FILTER:</span>
                              <span className="text-amber-400 font-bold">{deNoise}%</span>
                            </div>
                            <input 
                              type="range" 
                              min="0" 
                              max="100" 
                              value={deNoise} 
                              onChange={(e) => setDeNoise(Number(e.target.value))}
                              className="w-full accent-amber-500 bg-slate-900 h-1 rounded-lg cursor-pointer"
                            />
                          </div>
                        </div>

                        {/* Restoration Success Alert */}
                        {restorationSuccess && (
                          <div className="p-3 bg-emerald-950/60 border border-emerald-500/30 text-emerald-250 text-[11px] rounded-xl leading-normal w-full flex items-start gap-2">
                            <CheckCircle2 size={15} className="shrink-0 mt-0.5 text-emerald-450" />
                            <div>
                              <span className="font-bold block">Restoration Successful!</span>
                              At high contrast and high de-noise, the ancient Sanskrit characters of the Rigveda Gayatri Mantra become fully legible.
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                  </motion.div>
                )}
              </div>

              {/* Viewport Control Panel */}
              <div className="mt-3.5 flex flex-wrap gap-3 items-center justify-between border-t border-slate-900/60 pt-3 px-1 text-slate-400 bg-slate-950/45 rounded-xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-500">CONTROL UNIT</span>
                </div>

                {/* Launch Button */}
                <button
                  onClick={() => {
                    console.log("Launch Sandbox clicked in Heritage Page!");
                    setIsSimulating(true);
                  }}
                  disabled={isSimulating}
                  className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-750 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/10 hover:shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  <Play size={11} fill="currentColor" />
                  Launch Sandbox
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Sober Info Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-slate-200/80 max-w-4xl mx-auto text-center">
          <div className="p-5 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
            <h5 className="text-3xl font-extrabold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">10k+</h5>
            <p className="text-xs sm:text-sm font-bold text-slate-800">Digitized Pages</p>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Preserved rare books, ancient scripts, and school registers.</p>
          </div>
          <div className="p-5 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
            <h5 className="text-3xl font-extrabold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">100%</h5>
            <p className="text-xs sm:text-sm font-bold text-slate-800">Open Access</p>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Free digital library for scholars, students, and researchers.</p>
          </div>
          <div className="p-5 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
            <h5 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">Active</h5>
            <p className="text-xs sm:text-sm font-bold text-slate-800">Archival Work</p>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Includes digital cataloging and restoration sandboxes.</p>
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default HeritageArchive;
