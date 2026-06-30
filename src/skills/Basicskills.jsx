import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Shield, 
  Award, 
  Users, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  Info,
  CreditCard,
  DollarSign,
  Navigation,
  RotateCcw
} from 'lucide-react';

const Basicskills = () => {
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
  // SANDBOX 1: ROAD SAFETY & CROSSWALK GAME
  // =========================================================================
  const [pedestrianSignal, setPedestrianSignal] = useState('RED'); // RED, GREEN
  const [carPosition, setCarPosition] = useState(-100); // percentage offset
  const [pedestrianWalk, setPedestrianWalk] = useState(false);
  const [roadCrossStatus, setRoadCrossStatus] = useState(null); // 'SAFE', 'HIT', null

  // Auto-move car when simulation is active
  useEffect(() => {
    let t;
    if (isSimulating && activeModule === 0 && !pedestrianWalk) {
      t = setInterval(() => {
        // If pedestrian signal is RED, car zooms across
        if (pedestrianSignal === 'RED') {
          setCarPosition(-100);
          setTimeout(() => setCarPosition(150), 100);
        } else {
          // If GREEN, car stops at the line (around 20%)
          setCarPosition(20);
        }
      }, 3000);
    }
    return () => clearInterval(t);
  }, [isSimulating, activeModule, pedestrianSignal, pedestrianWalk]);

  const handleCrossRoad = () => {
    playSound('click');
    setPedestrianWalk(true);
    
    // Simulate walking
    setTimeout(() => {
      if (pedestrianSignal === 'GREEN') {
        setRoadCrossStatus('SAFE');
        playSound('success');
      } else {
        setRoadCrossStatus('HIT');
        setCarPosition(50); // Car hits the crosswalk
        playSound('fail');
      }
    }, 1000);
  };

  const togglePedestrianSignal = () => {
    playSound('click');
    setPedestrianSignal(prev => (prev === 'RED' ? 'GREEN' : 'RED'));
    setRoadCrossStatus(null);
    setPedestrianWalk(false);
  };

  // =========================================================================
  // SANDBOX 2: ATM INTERACTIVE SIMULATOR
  // =========================================================================
  const [atmStep, setAtmStep] = useState(0); 
  // Steps: 0: Insert Card, 1: Select Language, 2: Enter PIN, 3: Select Service, 4: Select Amount, 5: Processing, 6: Take Cash, 7: Take Card & Exit
  const [atmPin, setAtmPin] = useState('');
  const [atmSelectedAmount, setAtmSelectedAmount] = useState(0);
  const [atmCardInserted, setAtmCardInserted] = useState(false);
  const [cashDispensed, setCashDispensed] = useState(false);
  const [cardEjected, setCardEjected] = useState(false);

  const handleInsertCard = () => {
    playSound('success');
    setAtmCardInserted(true);
    setTimeout(() => {
      setAtmStep(1);
    }, 800);
  };

  const selectLanguage = (lang) => {
    playSound('click');
    setAtmStep(2);
  };

  const handleAtmPinInput = (num) => {
    playSound('click');
    if (atmPin.length < 4) {
      setAtmPin(prev => prev + num);
    }
  };

  const submitAtmPin = () => {
    if (atmPin.length === 4) {
      playSound('success');
      setAtmStep(3);
    } else {
      playSound('fail');
    }
  };

  const handleSelectService = (service) => {
    playSound('click');
    if (service === 'withdrawal') {
      setAtmStep(4);
    }
  };

  const handleSelectAmount = (amt) => {
    playSound('click');
    setAtmSelectedAmount(amt);
    setAtmStep(5); // Processing
    
    setTimeout(() => {
      setAtmStep(6); // Dispense Cash
      setCashDispensed(true);
      playSound('success');
    }, 2000);
  };

  const collectCash = () => {
    playSound('success');
    setCashDispensed(false);
    setCardEjected(true);
    setAtmStep(7); // Take Card & Exit
  };

  const collectCard = () => {
    playSound('success');
    setCardEjected(false);
    setAtmCardInserted(false);
    setAtmStep(0);
    setAtmPin('');
  };

  // =========================================================================
  // SANDBOX 3: CASHIER BUDGETING & SHOPPING
  // =========================================================================
  const shopItems = [
    { name: 'School Backpack & Notebooks', price: 175, image: '🎒' },
    { name: 'Lunch Box & Water Bottle', price: 95, image: '🍱' },
    { name: 'Drawing Set & Crayons', price: 65, image: '🎨' }
  ];
  const [activeShopItem, setActiveShopItem] = useState(0);
  const [cashTray, setCashTray] = useState([]); // Selected notes
  const [shoppingStep, setShoppingStep] = useState(0); // 0: Pay, 1: Change Question, 2: Result
  const [changeAnswer, setChangeAnswer] = useState(null);

  const availableNotes = [10, 20, 50, 100, 200];

  const addNoteToTray = (note) => {
    playSound('click');
    setCashTray(prev => [...prev, note]);
  };

  const clearTray = () => {
    playSound('click');
    setCashTray([]);
  };

  const handlePay = () => {
    const paidAmount = cashTray.reduce((sum, val) => sum + val, 0);
    const itemPrice = shopItems[activeShopItem].price;
    
    if (paidAmount === itemPrice) {
      playSound('success');
      setShoppingStep(2); // Direct Success
    } else if (paidAmount > itemPrice) {
      playSound('click');
      setShoppingStep(1); // Ask for change
    } else {
      playSound('fail');
      alert(`Insufficient cash! You paid ₹${paidAmount}, but the item costs ₹${itemPrice}.`);
    }
  };

  const handleAnswerChange = (ans) => {
    const paidAmount = cashTray.reduce((sum, val) => sum + val, 0);
    const itemPrice = shopItems[activeShopItem].price;
    const correctChange = paidAmount - itemPrice;

    setChangeAnswer(ans);
    if (ans === correctChange) {
      playSound('success');
    } else {
      playSound('fail');
    }
    setShoppingStep(2);
  };

  // Reset simulator options when active module changes
  useEffect(() => {
    setIsSimulating(false);
    setProgress(0);
    
    // Reset Module 0
    setPedestrianSignal('RED');
    setCarPosition(-100);
    setPedestrianWalk(false);
    setRoadCrossStatus(null);

    // Reset Module 1
    setAtmStep(0);
    setAtmPin('');
    setAtmSelectedAmount(0);
    setAtmCardInserted(false);
    setCashDispensed(false);
    setCardEjected(false);

    // Reset Module 2
    setActiveShopItem(0);
    setCashTray([]);
    setShoppingStep(0);
    setChangeAnswer(null);
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

  const getLoadingStatus = (prog) => {
    if (prog < 25) return "Connecting to interactive simulation...";
    if (prog < 50) return "Loading visual sandbox assets...";
    if (prog < 75) return "Setting up environment physics...";
    if (prog < 90) return "Preparing interactive controls...";
    return "Optimizing simulator interface... Ready!";
  };

  const modules = [
    {
      title: "Road Safety & Signals",
      image: "/images/skills/a1.png",
      description: "Learn vital traffic signals, road crossing rules, and pedestrian safety protocols. Walk safely in public environments.",
      duration: "10 min",
      difficulty: "Beginner"
    },
    {
      title: "How to Use an ATM",
      image: "/images/skills/i1.png",
      description: "A step-by-step interactive simulation to safely use an ATM machine, enter your PIN securely, and withdraw cash.",
      duration: "15 min",
      difficulty: "Intermediate"
    },
    {
      title: "Basic Money Handling",
      image: "/images/skills/image.png",
      description: "Learn how to manage, count, and combine currency notes responsibly to pay exact amounts and verify change in daily life.",
      duration: "12 min",
      difficulty: "Beginner"
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-slate-900 overflow-hidden font-sans pb-24">
      {/* Subtle organic background elements */}
      <div className="absolute top-0 right-0 -z-10 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-emerald-500/5 to-teal-500/5 blur-[120px]" />
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-teal-500/5 to-emerald-500/5 blur-[120px]" />

      {/* Container */}
      <div className="max-w-[1140px] mx-auto px-6 sm:px-8 pt-4">

        {/* Navigation */}
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
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50/80 backdrop-blur-sm text-emerald-750 border border-emerald-200/50 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                Basic Life Skills
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                Essential <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Daily Life</span> Skills
              </h1>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl">
                Practical lessons teaching students road safety, traffic rules, ATM usage, and responsible everyday behavior in modern society. Bridge textbook theory with interactive visual simulations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap gap-3.5 pt-1"
            >
              <button 
                onClick={() => navigate("/life-skills")}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-750 hover:to-teal-750 text-white rounded-full text-xs sm:text-sm font-bold shadow-md shadow-emerald-500/10 hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                Start Learning
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              
              <a 
                href="#simulator-section"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                Try Interactive Simulator
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
                  <Shield size={14} className="text-emerald-600" />
                  Road Safety
                </div>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">Learn vital traffic signals & road crossing rules.</p>
              </div>
              <div className="p-3.5 bg-white hover:bg-slate-50 border border-slate-200/60 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
                <div className="text-slate-900 font-bold flex items-center gap-1.5 text-xs sm:text-sm">
                  <Award size={14} className="text-teal-600" />
                  Financial Basics
                </div>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">Understand banking, ATM use, and safe money habits.</p>
              </div>
              <div className="p-3.5 bg-white hover:bg-slate-50 border border-slate-200/60 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
                <div className="text-slate-900 font-bold flex items-center gap-1.5 text-xs sm:text-sm">
                  <Users size={14} className="text-cyan-600" />
                  Everyday Duty
                </div>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">Build discipline and awareness in public spaces.</p>
              </div>
            </motion.div>
          </div>

          {/* Hero Illustration */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative w-full max-w-[340px] group"
            >
              {/* Soft decorative glow background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-teal-500/15 rounded-full blur-[70px] -z-10 animate-pulse duration-[4000ms]" />
              
              <img
                src="/images/skills/a.png"
                alt="Basic Skills Experience Illustration"
                className="w-full h-auto object-contain select-none group-hover:scale-[1.02] transition-transform duration-500"
              />
            </motion.div>
          </div>
        </section>

        {/* Section title & subtitle for the simulator */}
        <div id="simulator-section" className="text-center max-w-2xl mx-auto mb-10 -mt-20 space-y-2 pt-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-[10px] font-bold tracking-widest uppercase">
            Simulated Sandbox
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Interactive Life Skills Sandbox</h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">Select a life skill topic below to load its interactive simulation inside our viewport player.</p>
        </div>

        {/* Interactive Viewport Section */}
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
                      setActiveModule(idx);
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer relative overflow-hidden group ${
                      activeModule === idx 
                        ? 'border-emerald-500 bg-emerald-50/50 shadow-sm shadow-emerald-500/5' 
                        : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/40 hover:-translate-y-0.5 shadow-sm'
                    }`}
                  >
                    {activeModule === idx && (
                      <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-650" />
                    )}

                    <div className={`p-2.5 rounded-xl border transition-colors duration-300 ${
                      activeModule === idx 
                        ? 'bg-emerald-600 border-emerald-600 text-white' 
                        : 'bg-slate-50 border-slate-100 text-slate-500 group-hover:bg-slate-100'
                    }`}>
                      {idx === 0 && <Navigation size={16} />}
                      {idx === 1 && <CreditCard size={16} />}
                      {idx === 2 && <DollarSign size={16} />}
                    </div>

                    <div className="space-y-0.5">
                      <h3 className="text-sm font-bold text-slate-800 leading-snug group-hover:text-emerald-600 transition-colors">
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
                      <span className="inline-block px-2.5 py-0.5 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-md text-[9px] font-bold font-mono tracking-widest uppercase">
                        PREVIEW STATE
                      </span>
                      <h4 className="text-white font-extrabold text-base tracking-tight">{modules[activeModule].title}</h4>
                      <p className="text-slate-400 text-xs leading-normal max-w-md font-medium">Click 'Launch Sandbox' below to start the interactive safety simulation.</p>
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
                        <div className="w-8 h-8 rounded-full border-2 border-slate-800 border-t-emerald-500 animate-spin mx-auto" />
                        <div className="space-y-1">
                          <p className="text-xs font-bold tracking-wider text-slate-300 font-mono">
                            {getLoadingStatus(progress)}
                          </p>
                          <p className="text-[10px] text-slate-500 font-mono font-medium">Preparing simulation resources...</p>
                        </div>
                        
                        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
                          <motion.div 
                            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full"
                            initial={{ width: '0%' }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "easeInOut" }}
                          />
                        </div>
                        <span className="text-xs text-emerald-400 font-mono">{progress}% READY</span>
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
                    
                    {/* Module 0: Road Safety & Signals */}
                    {activeModule === 0 && (
                      <div className="w-full max-w-md space-y-4 flex flex-col items-center">
                        <div className="text-center space-y-1">
                          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Crosswalk Simulator Game</h4>
                          <p className="text-[11px] text-slate-400">Cross the road safely. Toggle the light to stop oncoming traffic!</p>
                        </div>

                        {/* Visual Road Scene */}
                        <div className="relative w-full h-32 bg-slate-800 border-y-4 border-dashed border-slate-600 rounded-xl overflow-hidden flex items-center justify-center">
                          {/* Grass background top/bottom */}
                          <div className="absolute top-0 left-0 right-0 h-4 bg-emerald-950/40" />
                          <div className="absolute bottom-0 left-0 right-0 h-4 bg-emerald-950/40" />

                          {/* Zebra crossing stripes */}
                          <div className="absolute left-1/2 -translate-x-1/2 w-16 h-full flex justify-between px-1 pointer-events-none">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <div key={s} className="w-2 h-full bg-white/85" />
                            ))}
                          </div>

                          {/* Car Animation */}
                          <motion.div 
                            className="absolute text-2xl z-10"
                            style={{ left: `${carPosition}%` }}
                            animate={{ y: [0, -2, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                          >
                            🚗
                          </motion.div>

                          {/* Pedestrian Character */}
                          <motion.div 
                            className="absolute bottom-2 left-1/2 -translate-x-1/2 text-2xl z-20"
                            animate={pedestrianWalk ? { bottom: '75%' } : { bottom: '8px' }}
                            transition={{ duration: 1 }}
                          >
                            🚶
                          </motion.div>
                        </div>

                        {/* Traffic light control */}
                        <div className="flex gap-4 items-center bg-slate-950 p-3.5 rounded-2xl border border-slate-850 w-full justify-between">
                          <div className="flex items-center gap-3">
                            {/* Visual Signal */}
                            <div className="bg-slate-900 px-2 py-3 rounded-xl flex flex-col gap-2 border border-slate-800">
                              <div className={`w-5 h-5 rounded-full ${pedestrianSignal === 'RED' ? 'bg-red-500 shadow-lg shadow-red-500/50 animate-pulse' : 'bg-red-950'}`} />
                              <div className={`w-5 h-5 rounded-full ${pedestrianSignal === 'GREEN' ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50 animate-pulse' : 'bg-emerald-950'}`} />
                            </div>
                            <div className="space-y-0.5 font-mono text-[10px] text-slate-400">
                              <div>PEDESTRIAN: <span className={pedestrianSignal === 'GREEN' ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>{pedestrianSignal}</span></div>
                              <div>TRAFFIC: <span className="text-white">{pedestrianSignal === 'RED' ? 'FLOWING' : 'STOPPED'}</span></div>
                            </div>
                          </div>
                          
                          <button
                            onClick={togglePedestrianSignal}
                            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-amber-400 hover:text-amber-300 font-bold rounded-xl text-[11px] transition-all cursor-pointer"
                          >
                            🚥 Change Signal
                          </button>
                        </div>

                        {/* Actions */}
                        {roadCrossStatus === null ? (
                          <button
                            onClick={handleCrossRoad}
                            disabled={pedestrianWalk}
                            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer active:scale-95 flex items-center gap-2"
                          >
                            🚶 Walk Across zebra crossing
                          </button>
                        ) : (
                          <div className="space-y-3 w-full">
                            <div className={`p-3.5 rounded-xl border text-xs leading-normal ${roadCrossStatus === 'SAFE' ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-250' : 'bg-red-950/60 border-red-500/30 text-red-250 shadow-[0_0_20px_rgba(239,68,68,0.15)]'}`}>
                              {roadCrossStatus === 'SAFE' ? (
                                <div className="space-y-1">
                                  <div className="font-bold flex items-center gap-1.5 text-emerald-450"><CheckCircle2 size={15} /> Correct Decision!</div>
                                  <p className="text-[10.5px] text-slate-300 leading-normal">You waited for the signal to turn green and crossed safely. Always look left, right, and left again before crossing!</p>
                                </div>
                              ) : (
                                <div className="space-y-1">
                                  <div className="font-bold flex items-center gap-1.5 text-red-400"><AlertTriangle size={15} className="animate-pulse" /> Extreme Danger!</div>
                                  <p className="text-[10.5px] text-slate-300 leading-normal">Never cross while the pedestrian signal is RED. Vehicles are moving at high speed and cannot stop instantly.</p>
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => {
                                setRoadCrossStatus(null);
                                setPedestrianWalk(false);
                              }}
                              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all border border-slate-700 cursor-pointer"
                            >
                              Reset Simulator
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Module 1: ATM Simulator */}
                    {activeModule === 1 && (
                      <div className="w-full max-w-sm space-y-3 flex flex-col items-center">
                        <div className="text-center space-y-1">
                          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">ATM Terminal Simulator</h4>
                          <p className="text-[11px] text-slate-400">Complete a secure cash withdrawal transaction.</p>
                        </div>

                        {/* ATM Screen Container */}
                        <div className="bg-slate-950 border-[6px] border-slate-800 rounded-2xl w-full p-4 flex flex-col min-h-[250px] justify-between relative shadow-2xl">
                          
                          {/* Screen Header */}
                          <div className="flex justify-between items-center text-[8px] font-mono text-emerald-500 border-b border-slate-900 pb-1.5">
                            <span>STATE BANK OF BIHAR</span>
                            <span>TERMINAL #024B</span>
                          </div>

                          {/* Screen Body */}
                          <div className="flex-1 flex flex-col justify-center items-center py-2 text-center text-xs text-slate-200">
                            {atmStep === 0 && (
                              <div className="space-y-2.5">
                                <p className="font-bold text-slate-200 text-sm">Welcome. Please Insert Your Card.</p>
                                <p className="text-[10px] text-slate-400">Use the card slot below to insert your debit card.</p>
                              </div>
                            )}

                            {atmStep === 1 && (
                              <div className="space-y-2 w-full">
                                <p className="font-bold text-slate-200">Select Language / भाषा चुनें</p>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                  <button onClick={() => selectLanguage('en')} className="bg-slate-900 hover:bg-slate-850 border border-slate-800 py-1.5 px-2.5 rounded text-[10px] font-bold text-slate-300 text-left">
                                    ▶ English
                                  </button>
                                  <button onClick={() => selectLanguage('hi')} className="bg-slate-900 hover:bg-slate-850 border border-slate-800 py-1.5 px-2.5 rounded text-[10px] font-bold text-slate-300 text-left">
                                    ▶ हिंदी (Hindi)
                                  </button>
                                </div>
                              </div>
                            )}

                            {atmStep === 2 && (
                              <div className="space-y-3 w-full max-w-[190px]">
                                <p className="font-bold text-slate-200">Enter 4-Digit Secure PIN</p>
                                <div className="bg-slate-900 py-2 rounded border border-slate-800 font-mono text-center tracking-[0.4em] text-lg text-emerald-450 h-10 flex items-center justify-center">
                                  {atmPin.split('').map(() => '*').join('')}
                                </div>
                                <p className="text-[9px] text-slate-500 italic">Always cover the keypad while entering your PIN!</p>
                              </div>
                            )}

                            {atmStep === 3 && (
                              <div className="space-y-2 w-full">
                                <p className="font-bold text-slate-200">Select Transaction Service</p>
                                <div className="grid grid-cols-2 gap-2">
                                  <button onClick={() => handleSelectService('withdrawal')} className="bg-slate-900 hover:bg-slate-850 border border-slate-800 py-1.5 px-2 rounded text-[10px] font-bold text-slate-300 text-left">
                                    ▶ Cash Withdrawal
                                  </button>
                                  <button className="bg-slate-900 opacity-45 border border-slate-850 py-1.5 px-2 rounded text-[10px] font-bold text-slate-500 text-left cursor-not-allowed">
                                    ▶ Balance Inquiry
                                  </button>
                                  <button className="bg-slate-900 opacity-45 border border-slate-855 py-1.5 px-2 rounded text-[10px] font-bold text-slate-500 text-left cursor-not-allowed">
                                    ▶ Mini Statement
                                  </button>
                                  <button className="bg-slate-900 opacity-45 border border-slate-855 py-1.5 px-2 rounded text-[10px] font-bold text-slate-500 text-left cursor-not-allowed">
                                    ▶ PIN Change
                                  </button>
                                </div>
                              </div>
                            )}

                            {atmStep === 4 && (
                              <div className="space-y-2 w-full">
                                <p className="font-bold text-slate-200">Select Withdrawal Amount</p>
                                <div className="grid grid-cols-2 gap-2">
                                  {[500, 1000, 2000, 5000].map((amt) => (
                                    <button 
                                      key={amt} 
                                      onClick={() => handleSelectAmount(amt)}
                                      className="bg-slate-900 hover:bg-slate-850 border border-slate-800 py-1.5 px-2 rounded text-[10px] font-bold text-slate-300 text-left"
                                    >
                                      ▶ ₹{amt}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            {atmStep === 5 && (
                              <div className="space-y-3">
                                <div className="w-8 h-8 rounded-full border-2 border-slate-800 border-t-emerald-500 animate-spin mx-auto" />
                                <p className="font-bold text-slate-300 text-[11px] font-mono">PROCESSING TRANSACTION...</p>
                                <p className="text-[9px] text-slate-500">Please do not remove your card.</p>
                              </div>
                            )}

                            {atmStep === 6 && (
                              <div className="space-y-3">
                                <span className="text-emerald-400 text-2xl animate-bounce block">💵</span>
                                <p className="font-bold text-slate-150">Please Collect Cash</p>
                                <p className="text-[10px] text-slate-400">Click the cash note at the bottom slot to collect your ₹{atmSelectedAmount}.</p>
                              </div>
                            )}

                            {atmStep === 7 && (
                              <div className="space-y-2.5">
                                <span className="text-emerald-450 text-2xl block">✔️</span>
                                <p className="font-bold text-slate-100">Transaction Complete!</p>
                                <div className="bg-slate-900/60 p-2.5 rounded border border-slate-850 text-[9.5px] text-left text-slate-400 leading-normal space-y-1">
                                  <div>🚨 <span className="font-bold text-white">Security Checklist:</span></div>
                                  <ul className="list-disc pl-3 space-y-0.5">
                                    <li>Collect your card and receipt.</li>
                                    <li>Wait for the screen to clear.</li>
                                    <li>Never share your ATM PIN.</li>
                                  </ul>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Screen Footer */}
                          <div className="text-[8px] font-mono text-slate-500 border-t border-slate-900 pt-1.5 text-center">
                            SECURE TRANSACTION SHIELD ACTIVE
                          </div>
                        </div>

                        {/* ATM Physical Slots & Keypads */}
                        <div className="w-full bg-slate-900 border border-slate-800 p-3.5 rounded-2xl space-y-4">
                          
                          {/* Card Slot and Cash Dispenser */}
                          <div className="flex justify-between items-center gap-4 border-b border-slate-800 pb-3">
                            {/* Card Slot */}
                            <div className="space-y-1 flex-1">
                              <span className="text-[8px] font-mono text-slate-500 block uppercase">Card Slot</span>
                              <div className="bg-slate-950 h-8 rounded-lg border border-slate-800 flex items-center justify-center relative overflow-hidden">
                                {atmCardInserted ? (
                                  <motion.div 
                                    initial={{ x: -40 }} 
                                    animate={{ x: 0 }} 
                                    className="w-10 h-6 bg-blue-600 border border-blue-500 rounded text-[7px] font-bold text-white flex items-center justify-center shadow-md"
                                  >
                                    CARD
                                  </motion.div>
                                ) : (
                                  <button 
                                    onClick={handleInsertCard}
                                    className="text-[9px] text-emerald-400 font-bold hover:text-emerald-350 cursor-pointer flex items-center gap-1.5"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Insert Card
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Cash Dispenser */}
                            <div className="space-y-1 flex-1">
                              <span className="text-[8px] font-mono text-slate-500 block uppercase">Cash Dispenser</span>
                              <div className="bg-slate-950 h-8 rounded-lg border border-slate-800 flex items-center justify-center relative overflow-hidden">
                                {cashDispensed && (
                                  <button 
                                    onClick={collectCash}
                                    className="w-14 h-5 bg-emerald-600 hover:bg-emerald-500 border border-emerald-500 rounded text-[9px] font-extrabold text-white flex items-center justify-center shadow-lg animate-bounce cursor-pointer"
                                  >
                                    💵 Take ₹{atmSelectedAmount}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Keypad */}
                          {atmStep === 2 && (
                            <div className="grid grid-cols-3 gap-1.5 max-w-[160px] mx-auto">
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                <button
                                  key={num}
                                  onClick={() => handleAtmPinInput(num.toString())}
                                  className="bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold py-1.5 rounded-lg text-xs font-mono transition-all active:scale-95 border border-slate-700"
                                >
                                  {num}
                                </button>
                              ))}
                              <button
                                onClick={() => setAtmPin('')}
                                className="bg-red-600 hover:bg-red-750 text-white font-bold py-1.5 rounded-lg text-[8px] font-mono transition-all active:scale-95 border border-red-500"
                              >
                                CLEAR
                              </button>
                              <button
                                onClick={() => handleAtmPinInput('0')}
                                className="bg-slate-800 hover:bg-slate-755 text-slate-200 font-bold py-1.5 rounded-lg text-xs font-mono transition-all active:scale-95 border border-slate-700"
                              >
                                0
                              </button>
                              <button
                                onClick={submitAtmPin}
                                className="bg-emerald-600 hover:bg-emerald-650 text-white font-bold py-1.5 rounded-lg text-[8px] font-mono transition-all active:scale-95 border border-emerald-500"
                              >
                                ENTER
                              </button>
                            </div>
                          )}

                          {/* Collect Card Step */}
                          {atmStep === 7 && cardEjected && (
                            <div className="text-center">
                              <button 
                                onClick={collectCard}
                                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs shadow-md animate-pulse cursor-pointer"
                              >
                                💳 Collect Card & End Session
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Module 2: Cashier Budgeting & Shopping */}
                    {activeModule === 2 && (
                      <div className="w-full max-w-md space-y-4 flex flex-col items-center">
                        <div className="text-center space-y-1">
                          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Cash Register Shopping Game</h4>
                          <p className="text-[11px] text-slate-400">Select notes to pay. Compute correct change if you overpay.</p>
                        </div>

                        {/* Shopping Shelf */}
                        <div className="grid grid-cols-3 gap-2 w-full">
                          {shopItems.map((item, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                if (shoppingStep === 0) {
                                  playSound('click');
                                  setActiveShopItem(idx);
                                  setCashTray([]);
                                }
                              }}
                              disabled={shoppingStep !== 0}
                              className={`p-2.5 rounded-xl border flex flex-col items-center text-center gap-1.5 transition-all ${
                                activeShopItem === idx 
                                  ? 'bg-emerald-950 border-emerald-500 text-emerald-400 shadow-md' 
                                  : 'bg-slate-950 border-slate-850 text-slate-450'
                              }`}
                            >
                              <span className="text-xl">{item.image}</span>
                              <span className="text-[8.5px] leading-tight block font-bold font-mono">{item.name}</span>
                              <span className="text-[10px] font-extrabold text-white">₹{item.price}</span>
                            </button>
                          ))}
                        </div>

                        {/* Bill Counter Screen */}
                        <div className="bg-slate-950 border border-slate-850 p-3.5 rounded-xl w-full flex justify-between items-center text-xs font-mono">
                          <div>
                            <div className="text-[8px] text-slate-500">BILL TOTAL</div>
                            <div className="text-white font-extrabold text-base">₹{shopItems[activeShopItem].price}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[8px] text-slate-500 font-mono">CASH ON COUNTER</div>
                            <div className="text-emerald-450 font-extrabold text-base">
                              ₹{cashTray.reduce((sum, val) => sum + val, 0)}
                            </div>
                          </div>
                        </div>

                        {/* Interactive Wallet / Trays */}
                        {shoppingStep === 0 && (
                          <div className="space-y-3 w-full">
                            <div className="space-y-1.5">
                              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Your Wallet (Tap notes to place on counter):</span>
                              <div className="grid grid-cols-5 gap-1.5">
                                {availableNotes.map((note) => (
                                  <button
                                    key={note}
                                    onClick={() => addNoteToTray(note)}
                                    className="p-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg text-[10px] font-bold text-slate-350 hover:text-white flex flex-col items-center gap-1 cursor-pointer transition-all active:scale-95"
                                  >
                                    <span>💵</span>
                                    <span>₹{note}</span>
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Counter Tray */}
                            {cashTray.length > 0 && (
                              <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl flex flex-wrap gap-2 items-center justify-between">
                                <div className="flex flex-wrap gap-1.5">
                                  {cashTray.map((note, idx) => (
                                    <span key={idx} className="px-2 py-0.5 bg-emerald-950 border border-emerald-500 text-emerald-400 rounded text-[9px] font-bold">
                                      ₹{note}
                                    </span>
                                  ))}
                                </div>
                                <button 
                                  onClick={clearTray} 
                                  className="text-[9px] text-red-450 hover:text-red-400 font-bold underline cursor-pointer"
                                >
                                  Clear Counter
                                </button>
                              </div>
                            )}

                            <button
                              onClick={handlePay}
                              disabled={cashTray.length === 0}
                              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition-all disabled:opacity-50 cursor-pointer"
                            >
                              Submit Payment
                            </button>
                          </div>
                        )}

                        {/* Change Selection Question */}
                        {shoppingStep === 1 && (
                          <div className="space-y-3 w-full bg-slate-950 border border-slate-850 p-4 rounded-xl text-center">
                            <h5 className="text-[11px] font-bold text-slate-300">You paid: ₹{cashTray.reduce((sum, val) => sum + val, 0)}. Cashier owes you change.</h5>
                            <p className="text-xs font-extrabold text-amber-400">How much change should you get back?</p>
                            
                            <div className="grid grid-cols-3 gap-2 pt-1.5">
                              {[
                                (cashTray.reduce((sum, val) => sum + val, 0) - shopItems[activeShopItem].price),
                                (cashTray.reduce((sum, val) => sum + val, 0) - shopItems[activeShopItem].price) + 10,
                                (cashTray.reduce((sum, val) => sum + val, 0) - shopItems[activeShopItem].price) - 5
                              ].sort(() => Math.random() - 0.5).map((option) => (
                                <button
                                  key={option}
                                  onClick={() => handleAnswerChange(option)}
                                  className="py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg text-xs font-bold text-slate-300 hover:text-white"
                                >
                                  ₹{option}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Final Result Step */}
                        {shoppingStep === 2 && (
                          <div className="space-y-4 w-full">
                            {/* Check correctness */}
                            {(() => {
                              const paidAmount = cashTray.reduce((sum, val) => sum + val, 0);
                              const itemPrice = shopItems[activeShopItem].price;
                              const correctChange = paidAmount - itemPrice;
                              const isCorrect = correctChange === 0 || changeAnswer === correctChange;

                              return (
                                <div className={`p-4 rounded-xl border text-xs leading-normal ${isCorrect ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-250' : 'bg-red-950/60 border-red-500/30 text-red-250 shadow-[0_0_20px_rgba(239,68,68,0.15)]'}`}>
                                  {isCorrect ? (
                                    <div className="space-y-1">
                                      <div className="font-bold flex items-center gap-1.5 text-emerald-450"><CheckCircle2 size={15} /> Correct Transaction!</div>
                                      <p className="text-[10.5px] text-slate-300 leading-normal">
                                        Perfect! You paid ₹{paidAmount} for the ₹{itemPrice} item {correctChange > 0 ? `and correctly collected ₹${correctChange} change.` : `using exact change.`} Always count your change before leaving the counter!
                                      </p>
                                    </div>
                                  ) : (
                                    <div className="space-y-1">
                                      <div className="font-bold flex items-center gap-1.5 text-red-450"><AlertTriangle size={15} className="animate-pulse" /> Math Error!</div>
                                      <p className="text-[10.5px] text-slate-300 leading-normal">
                                        Oh no! The correct change was ₹{correctChange}, but you collected ₹{changeAnswer}. Take your time and calculate carefully to avoid losing money.
                                      </p>
                                    </div>
                                  )}
                                </div>
                              );
                            })()}

                            <button
                              onClick={() => {
                                setShoppingStep(0);
                                setCashTray([]);
                                setChangeAnswer(null);
                              }}
                              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all border border-slate-700 cursor-pointer"
                            >
                              Play Again
                            </button>
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
                  onClick={() => setIsSimulating(true)}
                  disabled={isSimulating}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-750 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/10 hover:shadow-lg disabled:opacity-50 cursor-pointer"
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
            <h5 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">5+</h5>
            <p className="text-xs sm:text-sm font-bold text-slate-800">Skills Modules</p>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Spanning road awareness, ATM safety, and money handling.</p>
          </div>
          <div className="p-5 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
            <h5 className="text-3xl font-extrabold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">100%</h5>
            <p className="text-xs sm:text-sm font-bold text-slate-800">Practical & Safe</p>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Learn safe behavior patterns in public environments.</p>
          </div>
          <div className="p-5 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
            <h5 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Active</h5>
            <p className="text-xs sm:text-sm font-bold text-slate-800">Interactive Lessons</p>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Includes built-in interactive sandboxes.</p>
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default Basicskills;
