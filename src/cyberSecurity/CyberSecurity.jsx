import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Shield, 
  Lock, 
  Unlock,
  Cpu, 
  Smartphone, 
  Key, 
  Eye, 
  Mail, 
  Play, 
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldAlert
} from 'lucide-react';

const CyberSecurity = () => {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [progress, setProgress] = useState(0);

  // Interactive Sandbox States
  const [smsChoice, setSmsChoice] = useState(null);
  const [deepfakeChoice, setDeepfakeChoice] = useState(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [emailChoice, setEmailChoice] = useState(null);
  const [hoveredPart, setHoveredPart] = useState(null);
  
  // Staggered telemetry state for Deepfake lab
  const [visibleTelemetry, setVisibleTelemetry] = useState(0);

  const getLoadingStatus = (prog) => {
    if (prog < 25) return "Initializing Sandbox Safezone...";
    if (prog < 50) return "Loading signature databases...";
    if (prog < 75) return "Configuring simulation container...";
    if (prog < 90) return "Spinning up interactive sandbox...";
    return "Sanitizing local input vectors... Ready!";
  };

  const modules = [
    {
      title: "Scam Call & SMS Detection",
      image: "/images/cybersecurity/lesson1.png",
      description: "Learn to read SMS headers, detect spoofed sender IDs, and identify scam messages containing urgent demands, fake lottery winnings, or suspicious links.",
      duration: "10 min",
      difficulty: "Beginner"
    },
    {
      title: "AI Deepfake Verifier",
      image: "/images/cybersecurity/lesson2.png",
      description: "Learn how to spot AI-generated profile pictures and deepfake videos. Analyze facial inconsistencies, unnatural lighting, and strange ear or teeth rendering.",
      duration: "15 min",
      difficulty: "Intermediate"
    },
    {
      title: "Password Strength Sandbox",
      image: "/images/cybersecurity/lesson3.png",
      description: "Test your password strength and see how long it takes a hacker to crack it. Learn the power of passphrases over simple character substitutions.",
      duration: "12 min",
      difficulty: "Intermediate"
    },
    {
      title: "Phishing Email Analyzer",
      image: "/images/cybersecurity/lesson4.png",
      description: "Inspect email headers, analyze suspicious sender addresses, and hover over links to check where they actually lead before clicking.",
      duration: "20 min",
      difficulty: "Advanced"
    }
  ];

  // Reset simulator options when active module changes
  useEffect(() => {
    setIsSimulating(false);
    setProgress(0);
    setSmsChoice(null);
    setDeepfakeChoice(null);
    setPasswordInput('');
    setEmailChoice(null);
    setHoveredPart(null);
    setVisibleTelemetry(0);
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

  // Stagger telemetry loading for deepfake lab
  useEffect(() => {
    if (isSimulating && progress === 100 && activeModule === 1) {
      setVisibleTelemetry(0);
      const t1 = setTimeout(() => setVisibleTelemetry(1), 300);
      const t2 = setTimeout(() => setVisibleTelemetry(2), 600);
      const t3 = setTimeout(() => setVisibleTelemetry(3), 900);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [isSimulating, progress, activeModule]);

  // Password analysis function
  const analyzePassword = (pwd) => {
    if (!pwd) {
      return { 
        score: 0, 
        text: 'Empty', 
        color: 'bg-slate-200', 
        time: 'N/A', 
        feedback: 'Type something to begin testing.',
        len: 0,
        hasLower: false,
        hasUpper: false,
        hasDigit: false,
        hasSymbol: false,
        hasSpace: false
      };
    }
    
    let score = 0;
    const hasLower = /[a-z]/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    const hasDigit = /[0-9]/.test(pwd);
    const hasSymbol = /[^A-Za-z0-9]/.test(pwd);
    const hasSpace = /\s/.test(pwd);
    const len = pwd.length;

    const varietyCount = [hasLower, hasUpper, hasDigit, hasSymbol, hasSpace].filter(Boolean).length;

    if (len < 6) {
      score = 1;
    } else if (len >= 6 && len < 10) {
      score = varietyCount >= 3 ? 2 : 1;
    } else if (len >= 10 && len < 14) {
      score = varietyCount >= 3 ? 3 : 2;
    } else {
      score = varietyCount >= 4 ? 4 : 3;
    }

    let text = 'Weak';
    let color = 'bg-red-500';
    let time = 'Instantly';
    let feedback = '';

    if (score === 1) {
      text = 'Weak (Hackable Instantly)';
      color = 'bg-red-500';
      time = 'Instantly';
      feedback = 'Add letters, numbers, and make it at least 10 characters long.';
    } else if (score === 2) {
      text = 'Medium (Cracked in minutes)';
      color = 'bg-orange-500';
      time = '5 minutes';
      feedback = 'Try mixing in uppercase letters, symbols, or use a multi-word passphrase.';
    } else if (score === 3) {
      text = 'Strong (Highly secure)';
      color = 'bg-emerald-500';
      time = '45 years';
      feedback = 'Excellent! Safe against standard dictionary and brute-force attacks.';
    } else if (score === 4) {
      text = 'Unbreakable Passphrase';
      color = 'bg-cyan-500';
      time = '80 trillion years';
      feedback = 'Outstanding! Using spaces/words makes it extremely resilient to supercomputers.';
    }

    return { score, text, color, time, feedback, len, hasLower, hasUpper, hasDigit, hasSymbol, hasSpace };
  };

  const passwordDetails = analyzePassword(passwordInput);

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-slate-900 overflow-hidden font-sans pb-24">
      {/* Subtle organic background elements */}
      <div className="absolute top-0 right-0 -z-10 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-emerald-50/50 to-teal-50/50 blur-[120px]" />
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-teal-50/50 to-cyan-50/50 blur-[120px]" />

      {/* Container */}
      <div className="max-w-[1140px] mx-auto px-6 sm:px-8 pt-4">

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
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16 -mt-16">
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50/80 backdrop-blur-sm text-emerald-700 border border-emerald-200/50 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                Cyber Security Mission
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
              Cyber Security<span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Awareness </span> 
              </h1>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl">
                Learn to protect yourself against online scams, phishing attempts, and digital threats. Tailored for Grades 6–12, our virtual modules bridge textbook theory with interactive hands-on safety sandboxes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap gap-3.5 pt-1"
            >
              <button 
                onClick={() => navigate("/cyber-security-dashboard")}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-full text-xs sm:text-sm font-bold shadow-md shadow-emerald-500/10 hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                Start Learning
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              
              <a 
                href="#simulator-section"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                Try Sandbox Simulator
              </a>
            </motion.div>

            {/* Specs Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-3 gap-4 sm:gap-6 pt-5 border-t border-slate-200/80"
            >
              <div className="p-3.5 bg-white hover:bg-slate-50 border border-slate-200/60 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
                <div className="text-slate-900 font-bold flex items-center gap-1.5 text-xs sm:text-sm">
                  <Shield size={14} className="text-emerald-600" />
                  Scam Shield
                </div>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">Spot fake links, bank frauds, and scam calls.</p>
              </div>
              <div className="p-3.5 bg-white hover:bg-slate-50 border border-slate-200/60 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
                <div className="text-slate-900 font-bold flex items-center gap-1.5 text-xs sm:text-sm">
                  <Lock size={14} className="text-teal-600" />
                  Access Lock
                </div>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">Build strong passwords and enable 2FA protection.</p>
              </div>
              <div className="p-3.5 bg-white hover:bg-slate-50 border border-slate-200/60 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
                <div className="text-slate-900 font-bold flex items-center gap-1.5 text-xs sm:text-sm">
                  <Cpu size={14} className="text-cyan-600" />
                  Threat Defend
                </div>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">Detect malicious files and verify AI deepfakes.</p>
              </div>
            </motion.div>
          </div>

          {/* Original Hero Illustration - Adjusted position to the right & floating animation disabled */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-[480px] group flex justify-center lg:justify-end"
            >
              {/* Soft glow background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-teal-500/15 rounded-full blur-[70px] -z-10" />
              
              <div className="relative flex justify-center lg:justify-end">
                <img
                  src="/images/skills/c.png"
                  alt="Cyber Security Experience Illustration"
                  className="w-full max-w-[420px] max-h-[380px] lg:max-h-[460px] object-contain  select-none scale-110 lg:translate-x-0 transition-transform duration-500 ease-out"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section title & subtitle for the simulator */}
        <div id="simulator-section" className="text-center max-w-2xl mx-auto mb-10 space-y-2 pt-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-[10px] font-bold tracking-widest uppercase">
            Simulated Sandbox
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Interactive Defense Viewport</h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">Select a digital threat topic below to load its interactive exercise inside our sandbox player.</p>
        </div>

        {/* Interactive Viewport Section - Significantly Improved */}
        <section className="bg-white/90 backdrop-blur-lg border border-slate-200/80 rounded-[32px] shadow-2xl shadow-slate-100/60 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          
          {/* Left Column: Selector */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Select threat sandbox</span>
              
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
                      <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-600" />
                    )}

                    <div className={`p-2.5 rounded-xl border transition-colors duration-300 ${
                      activeModule === idx 
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/10' 
                        : 'bg-slate-50 border-slate-100 text-slate-500 group-hover:bg-slate-100'
                    }`}>
                      {idx === 0 && <Smartphone size={16} />}
                      {idx === 1 && <Eye size={16} />}
                      {idx === 2 && <Key size={16} />}
                      {idx === 3 && <Mail size={16} />}
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

          {/* Right Column: Viewport Simulator - Highly Improved */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-slate-950 rounded-3xl p-4 border border-slate-800/80 flex-1 flex flex-col min-h-[420px] sm:min-h-[480px] relative overflow-hidden shadow-2xl shadow-black/40">
              
              {/* Simulator Header / Window Controls */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-900 mb-3 text-slate-500 text-[10px] font-mono select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/85 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/85 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/85 inline-block" />
                </div>
                <div className="text-[9px] tracking-widest text-slate-400 font-bold bg-slate-900/60 px-3 py-1 rounded-md border border-slate-800/60">
                  SECURE_SANDBOX_V1.04
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  ONLINE
                </div>
              </div>

              {/* Screen Area */}
              <div className="relative flex-1 rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center border border-slate-850">
                
                {/* Static Image with zoom-on-hover - Shown when NOT simulated preview */}
                {!isSimulating && progress < 100 && (
                  <div className="w-full h-full absolute inset-0 overflow-hidden group/screen bg-slate-950">
                    <img
                      src={modules[activeModule].image}
                      alt={modules[activeModule].title}
                      className="w-full h-full object-cover opacity-60 select-none transition-transform duration-[2.5s] group-hover/screen:scale-105"
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

                {/* SIM STATUS Badge */}
                <div className="absolute top-4 left-4 z-10 bg-slate-950/80 border border-slate-800/80 backdrop-blur-md text-[9px] text-slate-400 font-mono px-2.5 py-0.5 rounded-md flex items-center gap-1.5 shadow-md">
                  <span className={`w-1.5 h-1.5 rounded-full ${isSimulating && progress === 100 ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
                  {isSimulating && progress === 100 ? 'ACTIVE LAB' : 'STANDBY'}
                </div>

                {/* Loading / Simulating Animation */}
                <AnimatePresence>
                  {isSimulating && progress < 100 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6 text-center text-white"
                    >
                      <div className="space-y-4 max-w-xs w-full">
                        <div className="w-9 h-9 rounded-full border-2 border-slate-800 border-t-emerald-500 animate-spin mx-auto" />
                        <div className="space-y-1">
                          <p className="text-xs font-bold tracking-wider text-slate-200 font-mono">
                            {getLoadingStatus(progress)}
                          </p>
                          <p className="text-[10px] text-slate-500 font-mono font-medium">Spawning virtualization layer...</p>
                        </div>
                        
                        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-850">
                          <motion.div 
                            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full"
                            initial={{ width: '0%' }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "easeInOut" }}
                          />
                        </div>
                        <span className="text-xs text-emerald-400 font-mono font-bold">{progress}% COMPILED</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Active Interactive Simulation Screen */}
                {isSimulating && progress === 100 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 z-10 w-full h-full bg-slate-900 overflow-y-auto overscroll-contain scroll-smooth p-4 sm:p-6 custom-scrollbar flex flex-col items-center justify-start text-left text-slate-200"
                    style={{ WebkitOverflowScrolling: 'touch' }}
                  >
                    {/* Module 0: SMS Detection */}
                    {activeModule === 0 && (
                      <div className="space-y-4 w-full max-w-sm pt-2">
                        {/* High Fidelity Phone UI container */}
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                          className="bg-slate-950 border-8 border-slate-800 rounded-[36px] overflow-hidden shadow-2xl relative w-full h-[380px] flex flex-col"
                        >
                          {/* Screen notch */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-800 rounded-b-xl z-20" />
                          
                          {/* Fake Status Bar */}
                          <div className="bg-slate-900/40 px-5 pt-3 pb-1 flex items-center justify-between text-[9px] font-semibold text-slate-400 font-mono tracking-wider z-10 relative">
                            <span>12:42 PM</span>
                            <div className="flex items-center gap-1.5">
                              <span>LTE</span>
                              <span>94%</span>
                            </div>
                          </div>

                          {/* Chat Header (Fixed) */}
                          <div className="bg-slate-900 border-b border-slate-850 px-4 py-3 flex items-center gap-3 relative z-10 shrink-0">
                            <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 shadow-inner">
                              <Smartphone size={14} />
                            </div>
                            <div>
                              <div className="text-xs font-extrabold text-slate-100 flex items-center gap-1.5">
                                AD-BIHARBNK
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              </div>
                              <div className="text-[8px] text-slate-400 tracking-wider uppercase font-bold">Incoming Shortcode SMS</div>
                            </div>
                          </div>

                          {/* Chat Messages - Scrollable container */}
                          <div 
                            className="p-4 space-y-4 bg-[radial-gradient(circle_at_bottom,rgba(16,185,129,0.02)_0%,transparent_70%)] flex-1 overflow-y-auto overscroll-contain scroll-smooth custom-scrollbar"
                            style={{ WebkitOverflowScrolling: 'touch' }}
                          >
                            <div className="text-[9px] text-center text-slate-500 font-mono tracking-widest uppercase">Today</div>
                            
                            <motion.div 
                              initial={{ opacity: 0, x: -20, scale: 0.9 }}
                              animate={{ opacity: 1, x: 0, scale: 1 }}
                              transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                              className="bg-slate-900 border border-slate-800 text-slate-200 rounded-2xl rounded-tl-none p-3.5 text-xs leading-relaxed max-w-[92%] space-y-2.5 shadow-md relative"
                            >
                              <p className="font-extrabold text-red-400 flex items-center gap-1.5 tracking-tight border-b border-slate-800/80 pb-1.5">
                                <AlertTriangle size={13} className="animate-pulse" />
                                URGENT SUSPENSION WARNING
                              </p>
                              <p className="font-medium text-slate-300 text-[11px]">
                                Dear Bihar Bank User, your netbanking access is suspended due to missing PAN documents. Reactivate instantly now to avoid a ₹5,000 penalty:
                              </p>
                              <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-850">
                                <span className="text-[8px] text-slate-500 block mb-0.5 font-bold uppercase tracking-wider">Tap To Go:</span>
                                <span className="text-blue-400 underline font-mono select-all break-all cursor-pointer font-bold text-[11px] block">
                                  http://biharbank-verify.in/netbanking
                                </span>
                              </div>
                            </motion.div>

                            <AnimatePresence mode="wait">
                              {smsChoice !== null && (
                                <motion.div 
                                  key={smsChoice}
                                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                                  className={`p-4 rounded-2xl border text-xs leading-relaxed font-medium space-y-2 shadow-lg ${
                                    smsChoice === 'trusted' 
                                      ? 'bg-red-950/50 border-red-500/30 text-red-200 shadow-red-500/5' 
                                      : 'bg-emerald-950/50 border-emerald-500/30 text-emerald-200 shadow-emerald-500/5'
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5 font-bold text-xs">
                                    {smsChoice === 'trusted' ? (
                                      <>
                                        <AlertTriangle size={15} className="text-red-400 shrink-0 animate-pulse" />
                                        <span className="text-red-400">Security Breach Warning</span>
                                      </>
                                    ) : (
                                      <>
                                        <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                                        <span className="text-emerald-400">Threat Blocked</span>
                                      </>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-slate-300">
                                    {smsChoice === 'trusted' 
                                      ? "Oh no! Clicking fake links takes you to cloned phishing sites. Scammers capture netbanking logins and prompt for OTPs to empty accounts." 
                                      : "Excellent decision! Scammers threaten penalties and use lookalike URLs (biharbank-verify.in) instead of official bank portals. Block and report this number."
                                    }
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Actions Panel - Fixed at bottom */}
                          <div className="p-3 bg-slate-900 border-t border-slate-850 z-10 shrink-0">
                            {smsChoice === null ? (
                              <div className="grid grid-cols-2 gap-2.5">
                                <button
                                  onClick={() => setSmsChoice('trusted')}
                                  className="px-3 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-red-400 hover:text-red-300 font-bold rounded-xl text-xs transition-all cursor-pointer active:scale-95 text-center flex items-center justify-center gap-1"
                                >
                                  Click on Link
                                </button>
                                <button
                                  onClick={() => setSmsChoice('flagged')}
                                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer active:scale-95 text-center flex items-center justify-center gap-1"
                                >
                                  Don't Click
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setSmsChoice(null)}
                                className="w-full py-2 bg-slate-950 hover:bg-slate-900 text-slate-300 border border-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95 text-center"
                              >
                                Try Again
                              </button>
                            )}
                          </div>
                        </motion.div>
                      </div>
                    )}

                    {/* Module 1: AI Deepfake Verifier */}
                    {activeModule === 1 && (
                      <div className="space-y-4 max-w-md mx-auto pt-1">
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="relative border border-slate-800 rounded-2xl overflow-hidden aspect-video bg-slate-950 flex items-center justify-between p-4"
                        >
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.04)_0%,transparent_80%)]" />
                          
                          {/* Face Avatar Biometric Frame */}
                          <div className="relative w-28 h-28 rounded-2xl border-2 border-emerald-500/30 overflow-hidden bg-slate-900 flex items-center justify-center shadow-lg shadow-black/40">
                            <Eye size={36} className="text-emerald-500/40 animate-pulse" />
                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/30 to-transparent" />
                            
                            {/* Scanning biometric grid nodes */}
                            <div className="absolute inset-2 border border-emerald-500/10 border-dashed rounded-lg animate-pulse" />
                            <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-bounce" />
                          </div>

                          {/* Telemetry Labels Staggered Animations */}
                          <div className="flex-1 ml-4 bg-slate-900/90 border border-slate-850 p-3 rounded-xl font-mono text-[9px] space-y-1.5 text-emerald-400 shadow-md border-l-2 border-l-emerald-500">
                            <div className="text-slate-500 font-bold border-b border-slate-800 pb-1 uppercase tracking-wider mb-1 text-[8px]">BIOMETRIC TELEMETRY</div>
                            {visibleTelemetry >= 1 ? (
                              <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="flex justify-between">
                                <span>👁️ IRIS SYMMETRY:</span> <span className="text-red-400 font-bold">UNSTABLE</span>
                              </motion.div>
                            ) : (
                              <div className="text-slate-600">👁️ IRIS SYMMETRY: ...</div>
                            )}
                            {visibleTelemetry >= 2 ? (
                              <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="flex justify-between">
                                <span>👂 ACCESSORIES:</span> <span className="text-red-400 font-bold">ASYMMETRIC</span>
                              </motion.div>
                            ) : (
                              <div className="text-slate-600">👂 ACCESSORIES: ...</div>
                            )}
                            {visibleTelemetry >= 3 ? (
                              <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="flex justify-between">
                                <span>🖼️ BACKGROUND:</span> <span className="text-red-400 font-bold">SYNTHETIC</span>
                              </motion.div>
                            ) : (
                              <div className="text-slate-600">🖼️ BACKGROUND: ...</div>
                            )}
                          </div>
                          
                          <div className="absolute top-2.5 right-2.5 bg-red-950/90 border border-red-900/40 px-2 py-0.5 rounded font-mono text-[7px] text-red-400 tracking-widest font-bold">
                            94% AI
                          </div>
                        </motion.div>

                        <div className="text-center space-y-1">
                          <h4 className="text-xs font-bold text-slate-300">Is this candidate profile photo authentic or AI-generated?</h4>
                          <p className="text-[10px] text-slate-500">Analyze the biometric telemetry indicators above.</p>
                        </div>

                        {/* Action Buttons */}
                        {deepfakeChoice === null ? (
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              onClick={() => setDeepfakeChoice('real')}
                              className="px-4 py-2.5 bg-slate-850 hover:bg-slate-800 border border-slate-800 text-slate-400 font-bold rounded-xl text-xs transition-all cursor-pointer active:scale-95"
                            >
                              Authentic Photo
                            </button>
                            <button
                              onClick={() => setDeepfakeChoice('deepfake')}
                              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer active:scale-95"
                            >
                              AI-Generated Deepfake
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <AnimatePresence mode="wait">
                              {deepfakeChoice === 'real' ? (
                                <motion.div 
                                  key="deepfake-fail"
                                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: -15 }}
                                  className="p-5 rounded-2xl border bg-red-950/40 border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.15)] space-y-3"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/40 shrink-0">
                                      <AlertTriangle size={18} />
                                    </div>
                                    <h4 className="font-extrabold text-sm text-red-400 tracking-tight">Incorrect Classification</h4>
                                  </div>
                                  <p className="text-slate-300 text-[11px] leading-relaxed font-medium">
                                    This profile picture is synthetic. Clues: Notice asymmetrical iris reflections, blurring where ears join cheeks, and double-earring errors.
                                  </p>
                                </motion.div>
                              ) : (
                                <motion.div 
                                  key="deepfake-pass"
                                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: -15 }}
                                  className="p-5 rounded-2xl border bg-emerald-950/40 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)] space-y-3"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40 shrink-0">
                                      <CheckCircle2 size={18} />
                                    </div>
                                    <h4 className="font-extrabold text-sm text-emerald-400 tracking-tight">Threat Spotted!</h4>
                                  </div>
                                  <p className="text-slate-300 text-[11px] leading-relaxed font-medium">
                                    Correct! AI images frequently struggle with accessories (like mismatching earrings), lighting symmetry on eyes, and natural looking backgrounds.
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            <button
                              onClick={() => setDeepfakeChoice(null)}
                              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-all border border-slate-700 cursor-pointer active:scale-[0.98]"
                            >
                              Reset Scanner
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Module 2: Password Strength Sandbox */}
                    {activeModule === 2 && (
                      <div className="space-y-4 max-w-md mx-auto pt-1">
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-xl"
                        >
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Test Password Input</label>
                            <div className="relative">
                              <input
                                type={showPassword ? "text" : "password"}
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                placeholder="Type a password (e.g. apple123, bihar-text-rules)"
                                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-mono"
                              />
                              <button 
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 text-[9px] font-bold cursor-pointer"
                              >
                                {showPassword ? 'HIDE' : 'SHOW'}
                              </button>
                            </div>
                          </div>

                          {/* Metrics Output */}
                          {passwordInput ? (
                            <div className="space-y-4">
                              {/* Strength bar */}
                              <div className="space-y-1.5">
                                <div className="flex justify-between text-[9px] font-bold">
                                  <span className="text-slate-400">STRENGTH:</span>
                                  <span className={passwordDetails.score <= 2 ? 'text-red-400' : 'text-emerald-400'}>{passwordDetails.text}</span>
                                </div>
                                
                                {/* 4-Segment glowing strength indicator */}
                                <div className="grid grid-cols-4 gap-1.5">
                                  {[1, 2, 3, 4].map((seg) => (
                                    <div key={seg} className="h-2 rounded-full bg-slate-900 border border-slate-850 overflow-hidden">
                                      <motion.div 
                                        className={`h-full ${passwordDetails.color}`}
                                        initial={{ width: 0 }}
                                        animate={{ width: passwordDetails.score >= seg ? '100%' : '0%' }}
                                        transition={{ duration: 0.3 }}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Hacking time estimation */}
                              <motion.div 
                                initial={{ scale: 0.95 }}
                                animate={{ scale: 1 }}
                                className="bg-slate-900 border border-slate-850 p-3.5 rounded-xl flex items-center justify-between shadow-inner"
                              >
                                <div className="space-y-0.5">
                                  <div className="text-[8px] font-bold text-slate-400">ESTIMATED TIME TO CRACK</div>
                                  <div className={`text-sm font-extrabold font-mono tracking-tight ${passwordDetails.score >= 3 ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {passwordDetails.time}
                                  </div>
                                </div>
                                <div className="text-slate-500 bg-slate-950 p-2 rounded-lg border border-slate-800">
                                  {passwordDetails.score >= 3 ? (
                                    <Lock size={16} className="text-emerald-500 animate-pulse" />
                                  ) : (
                                    <Unlock size={16} className="text-red-400" />
                                  )}
                                </div>
                              </motion.div>

                              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-850 flex gap-2 items-start text-[10px] text-slate-450 leading-relaxed">
                                <Info size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                                <p>💡 {passwordDetails.feedback}</p>
                              </div>
                            </div>
                          ) : (
                            <div className="py-8 text-center text-slate-500 text-xs flex flex-col items-center justify-center gap-2 border border-dashed border-slate-850 rounded-xl">
                              <Key size={22} className="text-slate-700 animate-bounce" />
                              Type above to benchmark password safety against cyber threats.
                            </div>
                          )}
                        </motion.div>

                        {/* Checklist */}
                        <div className="grid grid-cols-2 gap-2.5 text-[9px] font-bold font-mono p-1.5 text-slate-450 bg-slate-950/30 rounded-xl border border-slate-850/40">
                          <div className="flex items-center gap-1.5">
                            {passwordDetails.len >= 12 ? (
                              <CheckCircle2 size={10} className="text-emerald-500" />
                            ) : (
                              <span className="w-2.5 h-2.5 rounded-full bg-slate-800 inline-block" />
                            )}
                            <span className={passwordDetails.len >= 12 ? 'text-slate-200' : 'text-slate-500'}>Length 12+ chars</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {(passwordDetails.hasDigit && passwordDetails.hasSymbol) ? (
                              <CheckCircle2 size={10} className="text-emerald-500" />
                            ) : (
                              <span className="w-2.5 h-2.5 rounded-full bg-slate-800 inline-block" />
                            )}
                            <span className={(passwordDetails.hasDigit && passwordDetails.hasSymbol) ? 'text-slate-200' : 'text-slate-500'}>Numbers & Symbols</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {(passwordDetails.hasLower && passwordDetails.hasUpper) ? (
                              <CheckCircle2 size={10} className="text-emerald-500" />
                            ) : (
                              <span className="w-2.5 h-2.5 rounded-full bg-slate-800 inline-block" />
                            )}
                            <span className={(passwordDetails.hasLower && passwordDetails.hasUpper) ? 'text-slate-200' : 'text-slate-500'}>Upper & Lowercase</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {passwordDetails.hasSpace ? (
                              <CheckCircle2 size={10} className="text-emerald-500" />
                            ) : (
                              <span className="w-2.5 h-2.5 rounded-full bg-slate-800 inline-block" />
                            )}
                            <span className={passwordDetails.hasSpace ? 'text-slate-200' : 'text-slate-500'}>Passphrase (Spaces)</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Module 3: Phishing Email Analyzer */}
                    {activeModule === 3 && (
                      <div className="space-y-4 max-w-lg mx-auto pt-1">
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl text-xs"
                        >
                          {/* Browser bar */}
                          <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center gap-2">
                            <div className="flex gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                            </div>
                            <div className="bg-slate-950 border border-slate-850 px-3 py-1 rounded-md text-[9px] font-mono text-slate-400 flex-1 ml-4 truncate">
                              https://webmail.school-portal.edu/inbox
                            </div>
                          </div>

                          {/* Email Body */}
                          <div className="p-4 space-y-3.5">
                            <div className="border-b border-slate-850 pb-3 space-y-1">
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-slate-400 min-w-[50px]">From:</span>
                                <span 
                                  onMouseEnter={() => setHoveredPart('sender')}
                                  onMouseLeave={() => setHoveredPart(null)}
                                  onClick={() => setHoveredPart(hoveredPart === 'sender' ? null : 'sender')}
                                  className={`px-1.5 py-0.5 rounded cursor-help border transition-colors ${hoveredPart === 'sender' ? 'bg-amber-950/40 border-amber-500 text-amber-300 shadow-sm' : 'border-dashed border-slate-700 text-slate-200'}`}
                                >
                                  Bihar Board Helpdesk &lt;results-verify@securemail-verify.com&gt; 🔍
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-slate-400 min-w-[50px]">Subject:</span>
                                <span className="font-bold text-white">RE-VERIFY ROLL NUMBER: Class 10/12 Credentials Required</span>
                              </div>
                            </div>

                            <div className="space-y-3 leading-relaxed text-slate-300 text-[11px] font-medium">
                              <p>Dear Candidate,</p>
                              <p>We detected duplicate candidate enrollment details for your class. You are requested to verify your identification index immediately by running the official portal manager tool below:</p>
                              
                              <div className="pt-2">
                                <button
                                  onMouseEnter={() => setHoveredPart('link')}
                                  onMouseLeave={() => setHoveredPart(null)}
                                  onClick={() => setHoveredPart(hoveredPart === 'link' ? null : 'link')}
                                  className={`px-4 py-2.5 rounded-lg font-extrabold flex items-center gap-1.5 cursor-help border transition-all ${hoveredPart === 'link' ? 'bg-red-950/40 border-red-500 text-red-300 shadow-md' : 'bg-slate-900 border-slate-800 text-slate-300'}`}
                                >
                                  Download Verification App (.exe) 🔍
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Telemetry Inspect Card */}
                        <div className="relative min-h-[80px]">
                          <AnimatePresence mode="wait">
                            {hoveredPart ? (
                              <motion.div
                                key={hoveredPart}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex items-start gap-2.5 shadow-lg shadow-black/25"
                              >
                                <Info size={16} className="text-amber-400 shrink-0 mt-0.5" />
                                <div className="space-y-1 text-left">
                                  <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest font-mono">INSPECTOR WARNING</span>
                                  <p className="text-[11px] text-slate-300 leading-normal font-medium">
                                    {hoveredPart === 'sender' && "The email domain 'securemail-verify.com' is NOT the official 'biharboard.bihar.gov.in' domain. Scammers buy lookalike domains to bypass basic checks."}
                                    {hoveredPart === 'link' && "Hover reveals Target URL: 'external-site-login.net/verification_assistant.exe'. This is an executable file (.exe) which will run software script on your PC, likely installing spyware/malware."}
                                  </p>
                                </div>
                              </motion.div>
                            ) : (
                              <motion.div
                                key="idle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex items-start gap-2.5"
                              >
                                <Info size={16} className="text-cyan-400 shrink-0 mt-0.5 animate-pulse" />
                                <div className="space-y-1 text-left">
                                  <span className="text-[9px] font-bold text-slate-450 uppercase tracking-widest font-mono">Inspector Tooltip</span>
                                  <p className="text-[11px] text-slate-400 leading-normal font-medium">
                                    Hover your cursor over elements showing a magnifying glass 🔍 inside the email to inspect credentials.
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Action Choices */}
                        {emailChoice === null ? (
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              onClick={() => setEmailChoice('safe')}
                              className="px-4 py-2.5 bg-slate-850 hover:bg-slate-800 border border-slate-800 text-slate-400 font-bold rounded-xl text-xs transition-all cursor-pointer active:scale-95"
                            >
                              Trust Email & Install
                            </button>
                            <button
                              onClick={() => setEmailChoice('phishing')}
                              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer active:scale-95"
                            >
                              Flag as Phishing Attack
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <AnimatePresence mode="wait">
                              {emailChoice === 'safe' ? (
                                <motion.div 
                                  key="email-fail"
                                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: -15 }}
                                  className="p-5 rounded-2xl border bg-red-950/40 border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.15)] space-y-3"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/40 shrink-0">
                                      <AlertTriangle size={18} />
                                    </div>
                                    <h4 className="font-extrabold text-sm text-red-400 tracking-tight">Device Compromised</h4>
                                  </div>
                                  <p className="text-slate-300 text-[11px] leading-relaxed font-medium">
                                    Danger! You downloaded and executed a malware script. Real board support queries never require students to run software executables (.exe) to view or verify marks.
                                  </p>
                                </motion.div>
                              ) : (
                                <motion.div 
                                  key="email-pass"
                                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: -15 }}
                                  className="p-5 rounded-2xl border bg-emerald-950/40 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)] space-y-3"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40 shrink-0">
                                      <CheckCircle2 size={18} />
                                    </div>
                                    <h4 className="font-extrabold text-sm text-emerald-400 tracking-tight">Attack Deflected</h4>
                                  </div>
                                  <p className="text-slate-300 text-[11px] leading-relaxed font-medium">
                                    Masterfully spotted! The spoofed sender address (`securemail-verify.com`) and the `.exe` payload hosted on the external malicious domain were clear phishing vectors.
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            <button
                              onClick={() => setEmailChoice(null)}
                              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-all border border-slate-700 cursor-pointer active:scale-[0.98]"
                            >
                              Reset Analyzer
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}

              </div>

              {/* Viewport Control Panel */}
              <div className="mt-3.5 flex items-center justify-between border-t border-slate-900/60 pt-3 px-1 text-slate-400 bg-slate-950/45 rounded-xl">
                <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1.5 pl-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${isSimulating && progress === 100 ? 'bg-emerald-500' : 'bg-slate-650'} animate-pulse`} />
                  {isSimulating && progress === 100 ? 'SYSTEM LOCK: SECURE' : 'SANDBOX READY'}
                </div>

                {/* Launch / Reset Button */}
                {isSimulating && progress === 100 ? (
                  <button
                    onClick={() => {
                      setIsSimulating(false);
                      setProgress(0);
                    }}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
                  >
                    Return to Standby
                  </button>
                ) : (
                  <button
                    onClick={() => setIsSimulating(true)}
                    disabled={isSimulating}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/10 hover:shadow-lg disabled:opacity-50 cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <Play size={11} fill="currentColor" />
                    Launch Sandbox
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-slate-200/80 max-w-4xl mx-auto text-center">
          <div className="p-5 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
            <h5 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">100%</h5>
            <p className="text-xs sm:text-sm font-bold text-slate-800">Secure Environment</p>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Isolated test chamber to analyze phishing and malware safety.</p>
          </div>
          <div className="p-5 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
            <h5 className="text-3xl font-extrabold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Curriculum</h5>
            <p className="text-xs sm:text-sm font-bold text-slate-800">Board Standards Aligned</p>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Covers essential digital citizenship standards for school boards.</p>
          </div>
          <div className="p-5 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
            <h5 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Practical</h5>
            <p className="text-xs sm:text-sm font-bold text-slate-800">Learn-By-Doing Tasks</p>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Built-in Interactive scenarios with immediate feedback metrics.</p>
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default CyberSecurity;
