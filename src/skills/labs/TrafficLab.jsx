import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, RefreshCw, Heart } from 'lucide-react';

const TrafficLab = () => {
  // --- Traffic Lab State ---
  const [trafficLight, setTrafficLight] = useState('green');
  const [isCrossing, setIsCrossing] = useState(false);
  const [crossingResult, setCrossingResult] = useState('');
  const [trafficHealth, setTrafficHealth] = useState(100);
  const [trafficTimer, setTrafficTimer] = useState(7);
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [activeCarType, setActiveCarType] = useState('🏎️');
  const [crashDetails, setCrashDetails] = useState(null);

  useEffect(() => {
    if (!isAutoMode) return;

    const interval = setInterval(() => {
      setTrafficTimer(prev => {
        if (prev <= 1) {
          let nextLight = 'green';
          let nextTime = 7;

          if (trafficLight === 'green') {
            nextLight = 'yellow';
            nextTime = 3;
          } else if (trafficLight === 'yellow') {
            nextLight = 'red';
            nextTime = 8;
          } else {
            nextLight = 'green';
            nextTime = 7;
            const cars = ['🏎️', '🚑', '🚚', '🚌', '🚓', '🚜', '🏍️'];
            setActiveCarType(cars[Math.floor(Math.random() * cars.length)]);
          }

          setTrafficLight(nextLight);
          return nextTime;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isAutoMode, trafficLight]);

  // --- TRAFFIC FUNCTIONS ---
  const handleCrossRoad = () => {
    if (isCrossing || trafficHealth <= 0) return;
    setIsCrossing(true);
    setCrossingResult('');
    setCrashDetails(null);

    setTimeout(() => {
      if (trafficLight === 'red') {
        setCrossingResult('safe');
        setIsCrossing(false);
      } else {
        setCrossingResult('crash');
        setTrafficHealth(0);

        const injuries = [
          "Severe Concussion & Bone Fractures",
          "Internal Bleeding & Multiple Bruises",
          "Traumatic Head Injury & Broken Leg",
          "Critical Whiplash & Spinal Shock"
        ];
        const speeds = [50, 65, 80, 45, 95];
        const randomSpeed = speeds[Math.floor(Math.random() * speeds.length)];
        const randomInjury = injuries[Math.floor(Math.random() * injuries.length)];

        // stopping distance = reaction distance + braking distance
        const reactionDist = Math.round(randomSpeed * (5 / 18) * 1.5);
        const brakingDist = Math.round((randomSpeed * randomSpeed) / (250 * 0.7));
        const totalStopping = reactionDist + brakingDist;

        setCrashDetails({
          speed: randomSpeed,
          injury: randomInjury,
          reactionDist,
          brakingDist,
          totalStopping,
          description: `You tried to cross on a ${trafficLight.toUpperCase()} light. A vehicle was speeding at ${randomSpeed} km/h. At this speed, the vehicle needs about ${totalStopping} meters of visibility and braking space to stop completely. By stepping onto the road suddenly, you left the driver with zero chance of braking in time, leading to a collision with ${(0.5 * 1200 * Math.pow(randomSpeed * (5 / 18), 2) / 1000).toFixed(1)} kJ of kinetic energy impact!`
        });

        setTimeout(() => {
          setIsCrossing(false);
        }, 1500);
      }
    }, 1200);
  };

  const resetTrafficLab = () => {
    setTrafficLight('green');
    setIsCrossing(false);
    setCrossingResult('');
    setTrafficHealth(100);
    setTrafficTimer(7);
    setIsAutoMode(true);
    setCrashDetails(null);
  };

  const handleSetLight = (color) => {
    setIsAutoMode(false);
    setTrafficLight(color);
    if (color === 'green') setTrafficTimer(7);
    else if (color === 'yellow') setTrafficTimer(3);
    else if (color === 'red') setTrafficTimer(8);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-5 md:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Left Column: Guidelines, Mode Selectors & Signals */}
        <div className="lg:col-span-5 space-y-4 text-left">
          <div>
            <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider bg-emerald-50 px-3 py-1.5 rounded-full">
              Practical Lab 02
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-2">Traffic Safety Sandbox</h2>
            <p className="text-xs text-slate-500 font-bold mt-1">Learn traffic lights and pedestrian guidelines for safe road crossing.</p>
          </div>

          {/* Controller Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4.5 text-white space-y-4 shadow-md">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
              <h3 className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5 text-sky-400">
                <Activity size={14} /> Simulator Controls
              </h3>
              <div className="flex items-center gap-1.5 bg-slate-800 px-2 py-1 rounded-lg border border-slate-700">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Auto Cycle</span>
                <button
                  onClick={() => setIsAutoMode(!isAutoMode)}
                  className={`w-7 h-4 rounded-full transition-all duration-300 relative ${isAutoMode ? 'bg-emerald-500' : 'bg-slate-600'
                    }`}
                >
                  <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-all duration-300 ${isAutoMode ? 'right-0.5' : 'left-0.5'
                    }`} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 items-center">
              {/* Timer Countdown */}
              <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest">Signal Timer</span>
                <div className={`text-2xl font-black font-mono mt-1 ${trafficLight === 'red' ? 'text-red-400' : trafficLight === 'yellow' ? 'text-yellow-400' : 'text-emerald-400'
                  }`}>
                  {isAutoMode ? `${trafficTimer}s` : 'MANUAL'}
                </div>
                {/* Glowing indicator ring */}
                <div className={`absolute bottom-0 inset-x-0 h-1 ${trafficLight === 'red' ? 'bg-red-500 animate-pulse' : trafficLight === 'yellow' ? 'bg-yellow-500' : 'bg-emerald-500'
                  }`} />
              </div>

              {/* Signal Lights manual switcher */}
              <div className="space-y-1.5 text-center">
                <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest block">Manual Signal</span>
                <div className="flex gap-1 justify-center">
                  {['green', 'yellow', 'red'].map(color => (
                    <button
                      key={color}
                      onClick={() => handleSetLight(color)}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${trafficLight === color
                        ? color === 'red' ? 'bg-red-950 border-red-400 shadow-md shadow-red-500/50' : color === 'yellow' ? 'bg-yellow-500 border-yellow-300 text-slate-900' : 'bg-emerald-800 border-emerald-400 shadow-md shadow-emerald-500/50'
                        : 'bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-400'
                        }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full ${color === 'red' ? 'bg-red-500' : color === 'yellow' ? 'bg-yellow-500' : 'bg-emerald-500'
                        }`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Rules Card */}
          <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 space-y-3">
            <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-2">
              🚦 Indian Traffic Light Rules
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0 mt-1 shadow-sm shadow-red-400" />
                <div className="text-[11px] leading-relaxed">
                  <strong className="text-slate-800">RED LIGHT (रुको):</strong> Vehicles must stop completely. Safe time for pedestrians to use the zebra crossing.
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 shrink-0 mt-1 shadow-sm shadow-yellow-400" />
                <div className="text-[11px] leading-relaxed">
                  <strong className="text-slate-800">YELLOW LIGHT (तैयार रहो):</strong> Vehicles slow down to stop. Do NOT start crossing now.
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0 mt-1 shadow-sm shadow-green-400" />
                <div className="text-[11px] leading-relaxed">
                  <strong className="text-slate-800">GREEN LIGHT (चलो):</strong> Vehicles move. Pedestrians must stay on the sidewalk/footpath.
                </div>
              </div>
            </div>
          </div>

          {/* Pedestrian Safety Tips */}
          <div className="bg-white border border-slate-100 rounded-xl p-4 space-y-3.5 shadow-sm">
            <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-2">
              🚶‍♂️ Pedestrian Safety Tips
            </h3>

            {/* Safety Illustration Image */}
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50 relative aspect-[16/10] group">
              <img
                src="/images/life skill/pedestrian_safety_rules.png"
                alt="Pedestrian Safety Illustration"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute bottom-0 inset-x-0 bg-slate-900/75 backdrop-blur-[2px] px-3 py-1.5 text-[8.5px] text-white font-extrabold text-center uppercase tracking-wider border-t border-slate-800">
                Use zebra crossing when light is RED 🛑
              </div>
            </div>

            <ul className="text-[11px] text-slate-500 space-y-1.5 list-disc pl-4 font-semibold">
              <li>Always cross at designated <strong>Zebra Crossings</strong>.</li>
              <li>Look <strong>Right, Left, then Right again</strong> before stepping on the road.</li>
              <li>Do not use mobile phones or wear headphones while crossing.</li>
              <li>Make eye contact with drivers to ensure they see you.</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Interactive Road Viewport */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center bg-slate-50 p-2 rounded-xl border border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 pl-2">Zebra Crossing Interactive Sandbox</span>
            <button
              onClick={resetTrafficLab}
              className="p-1.5 bg-white hover:bg-slate-50 rounded-lg text-slate-500 border border-slate-200 transition-colors cursor-pointer"
            >
              <RefreshCw size={12} />
            </button>
          </div>

          {/* ROAD VIEWPORT WITH SHAKE ANIMATION */}
          <motion.div
            animate={
              crossingResult === 'crash' && trafficHealth === 0
                ? {
                  x: [0, -12, 12, -12, 12, -6, 6, 0],
                  y: [0, 6, -6, 6, -6, 3, -3, 0]
                }
                : {}
            }
            transition={{ duration: 0.6 }}
            className="relative bg-slate-900 rounded-2xl h-[280px] w-full border border-slate-700 overflow-hidden shadow-2xl flex flex-col justify-between select-none"
          >
            {/* Top Sidewalk (Safe Zone) */}
            <div className="h-9 bg-gradient-to-b from-emerald-800 to-emerald-700 border-b-4 border-slate-600 flex items-center justify-between px-4 z-20">
              <div className="text-[9px] text-emerald-100 font-black font-mono tracking-widest flex items-center gap-1">
                🌳 SAFE SIDEWALK (सुरक्षित फुटपाथ)
              </div>
              {trafficLight === 'red' ? (
                <span className="text-[9px] text-green-300 font-bold bg-green-950/60 px-2 py-0.5 rounded border border-green-800 animate-pulse">CROSS SAFE 🚶</span>
              ) : (
                <span className="text-[9px] text-red-300 font-bold bg-red-950/60 px-2 py-0.5 rounded border border-red-800">WAIT HERE 🛑</span>
              )}
            </div>

            {/* Lanes (Asphalt Road) */}
            <div className="flex-1 relative flex items-center bg-slate-800">
              {/* Lane Divider line */}
              <div className="absolute inset-x-0 h-1 border-t-2 border-dashed border-yellow-400 top-1/2 -translate-y-1/2 opacity-75" />

              {/* Solid White stop lines */}
              <div className="absolute left-[33%] top-0 bottom-1/2 w-1.5 bg-white opacity-90 shadow-sm" />
              <div className="absolute right-[33%] top-1/2 bottom-0 w-1.5 bg-white opacity-90 shadow-sm" />

              {/* Zebra Crossing Stripes */}
              <div className="absolute left-[40%] right-[40%] top-0 bottom-0 flex flex-col justify-evenly py-1 pointer-events-none bg-slate-950/10">
                {[0, 1, 2, 3, 4, 5, 6].map(idx => (
                  <div key={idx} className="h-3 w-full bg-white/95 rounded-sm shadow-sm" />
                ))}
              </div>

              {/* Top Car (Left to Right) */}
              <motion.div
                animate={
                  trafficLight === 'red'
                    ? { left: '18%' }
                    : crossingResult === 'crash'
                      ? { left: '43%' }
                      : { left: ['-20%', '110%'] }
                }
                transition={
                  trafficLight === 'red'
                    ? { duration: 0.5, type: 'spring', stiffness: 120 }
                    : crossingResult === 'crash'
                      ? { duration: 1.1, ease: 'easeOut' }
                      : {
                        duration: trafficLight === 'yellow' ? 6 : 2.2,
                        repeat: Infinity,
                        ease: 'linear'
                      }
                }
                className="absolute top-4 text-4xl -scale-x-100 z-20 flex items-center"
              >
                <span>{activeCarType}</span>
                {/* Alert marker for fast car */}
                {trafficLight === 'green' && !isCrossing && (
                  <span className="absolute -top-3 left-2 bg-red-500 text-white text-[7px] font-black px-1 rounded animate-bounce">FAST</span>
                )}
              </motion.div>

              {/* Bottom Car (Right to Left) */}
              <motion.div
                animate={
                  trafficLight === 'red'
                    ? { left: '68%' }
                    : { left: ['110%', '-25%'] }
                }
                transition={
                  trafficLight === 'red'
                    ? { duration: 0.5, type: 'spring', stiffness: 120 }
                    : {
                      duration: trafficLight === 'yellow' ? 7 : 2.5,
                      repeat: Infinity,
                      ease: 'linear'
                    }
                }
                className="absolute bottom-4 text-4xl z-20"
              >
                🚙
              </motion.div>

              {/* Pedestrian Actor */}
              <motion.div
                animate={
                  isCrossing
                    ? crossingResult === 'crash'
                      ? {
                        y: [0, -75, -75, -50],
                        x: [0, 0, 0, -30],
                        rotate: [0, 0, 360, 90],
                        scale: [1, 1, 1.25, 1]
                      }
                      : { y: [0, -200] }
                    : trafficHealth <= 0
                      ? { y: -75, x: -30, rotate: 90 }
                      : { y: 0, x: 0, rotate: 0 }
                }
                transition={
                  isCrossing && crossingResult === 'crash'
                    ? { times: [0, 0.6, 0.65, 1], duration: 1.8, ease: "easeOut" }
                    : { duration: 2, ease: "linear" }
                }
                className="absolute left-[47.5%] text-3xl z-30 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                style={{ bottom: '-15px' }}
              >
                {crossingResult === 'crash' && trafficHealth === 0 ? '💥' : trafficHealth <= 0 ? '💀' : '🚶‍♂️'}
              </motion.div>

              {/* Crash Explosion Flash overlay */}
              {isCrossing && crossingResult === 'crash' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0, 0.8, 0] }}
                  transition={{ times: [0, 0.58, 0.62, 1], duration: 1.8 }}
                  className="absolute inset-0 bg-red-600/70 z-40 pointer-events-none flex items-center justify-center text-white text-5xl font-black font-sans tracking-wider"
                >
                  COLLISION!
                </motion.div>
              )}
            </div>

            {/* Bottom Sidewalk (Start Zone) */}
            <div className="h-9 bg-gradient-to-t from-emerald-800 to-emerald-700 border-t-4 border-slate-600 flex items-center justify-between px-4 z-20">
              <div className="text-[9px] text-emerald-100 font-black font-mono tracking-widest">
                🚶‍♂️ PEDESTRIAN STAND POINT (प्रारंभ बिंदु)
              </div>
              <span className="text-[9px] text-emerald-200 font-bold">CROSS HERE ON RED ONLY</span>
            </div>

            {/* Glowing 3D Traffic Light Pole */}
            <div className="absolute right-5 top-10 flex flex-col items-center z-30">
              {/* Light Housing Box */}
              <div className="bg-[#0f172a] border-2 border-slate-700 rounded-xl py-2 px-1.5 flex flex-col gap-1.5 shadow-2xl relative">
                {/* Red Light */}
                <div className="relative">
                  <div className={`w-5 h-5 rounded-full transition-all duration-300 ${trafficLight === 'red' ? 'bg-red-500 shadow-[0_0_12px_#ef4444] scale-105' : 'bg-red-950 opacity-60'
                    }`} />
                </div>
                {/* Yellow Light */}
                <div className="relative">
                  <div className={`w-5 h-5 rounded-full transition-all duration-300 ${trafficLight === 'yellow' ? 'bg-yellow-500 shadow-[0_0_12px_#eab308] scale-105' : 'bg-yellow-950 opacity-60'
                    }`} />
                </div>
                {/* Green Light */}
                <div className="relative">
                  <div className={`w-5 h-5 rounded-full transition-all duration-300 ${trafficLight === 'green' ? 'bg-green-500 shadow-[0_0_12px_#22c55e] scale-105' : 'bg-green-950 opacity-60'
                    }`} />
                </div>

                {/* Mini Pedestrian Signal below */}
                <div className="border-t border-slate-800 mt-1 pt-1.5 flex flex-col gap-1 items-center">
                  <span className="text-[6px] font-black text-slate-500 uppercase tracking-widest">PED</span>
                  <div className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${trafficLight === 'red' ? 'bg-green-950 text-green-400 border border-green-800' : 'bg-red-950 text-red-400 border border-red-900'
                    }`}>
                    {trafficLight === 'red' ? '🚶' : '🛑'}
                  </div>
                </div>
              </div>
              {/* Metal Pole */}
              <div className="w-1.5 h-16 bg-gradient-to-r from-slate-400 to-slate-500 shadow-lg" />
              {/* Base */}
              <div className="w-6 h-1.5 bg-slate-600 rounded-t" />
            </div>

            {/* HUD DISPLAY OVERLAY */}
            <div className="absolute top-11 left-3 right-20 flex justify-between pointer-events-none z-20">
              {/* HP Bar */}
              <div className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-full border border-slate-800 backdrop-blur-sm shadow-md">
                <Heart size={12} className={`text-red-500 ${trafficHealth > 0 ? 'animate-pulse' : ''}`} />
                <span className="text-[9px] font-black text-slate-355 tracking-wider mr-1">HP</span>
                <div className="w-20 bg-slate-800 h-1.5 rounded-full overflow-hidden border border-slate-700">
                  <motion.div
                    animate={{ width: `${trafficHealth}%` }}
                    className={`h-full ${trafficHealth > 50 ? 'bg-emerald-500' : trafficHealth > 0 ? 'bg-yellow-500' : 'bg-red-600'
                      }`}
                  />
                </div>
                <span className="text-[9px] font-black text-white ml-1 font-mono">{trafficHealth}</span>
              </div>
            </div>

            {/* WASTED OVERLAY (GAMING STYLE) */}
            <AnimatePresence>
              {trafficHealth <= 0 && !isCrossing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-red-950/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6 text-center select-none"
                >
                  <motion.h1
                    initial={{ scale: 0.5, letterSpacing: '0px' }}
                    animate={{ scale: [1, 1.1, 1], letterSpacing: '4px' }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-red-500 font-black text-5xl tracking-widest uppercase drop-shadow-[0_4px_12px_rgba(239,68,68,0.5)] font-serif"
                  >
                    WASTED
                  </motion.h1>
                  <p className="text-white text-xs font-bold mt-2 uppercase tracking-widest text-slate-350">
                    💥 Critical Crash: Crossed on {trafficLight.toUpperCase()} Signal 💥
                  </p>
                  <p className="text-[10px] text-red-300 font-medium max-w-xs leading-relaxed mt-3">
                    Vehicles have a high braking/stopping distance. Never step into their path!
                  </p>

                  <button
                    onClick={resetTrafficLab}
                    className="mt-6 px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-750 text-white font-black text-[11px] tracking-wider uppercase rounded-xl transition-all shadow-lg shadow-red-900 active:scale-95 cursor-pointer"
                  >
                    Respawn / Try Again 🔄
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* CONTROLS */}
          <div className="space-y-4 pt-3 border-t border-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="text-left">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Pedestrian Action</span>
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 25px rgba(16, 185, 129, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCrossRoad}
                  disabled={isCrossing || trafficHealth <= 0}
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-sm tracking-widest uppercase rounded-2xl shadow-[0_6px_0_#047857,0_10px_20px_rgba(16,185,129,0.35)] hover:brightness-110 active:translate-y-1 active:shadow-[0_2px_0_#047857,0_4px_10px_rgba(16,185,129,0.25)] transition-all flex items-center justify-center gap-3 select-none cursor-pointer border border-emerald-400/40 disabled:opacity-40 disabled:pointer-events-none disabled:shadow-none"
                >
                  <motion.span
                    animate={isCrossing ? {} : { rotate: [0, -6, 6, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="text-lg"
                  >
                    🚶‍♂️
                  </motion.span>
                  <div className="text-left leading-none">
                    <div className="font-extrabold text-[12px] tracking-wider">CROSS ROAD NOW</div>
                    <div className="text-[8px] text-emerald-100 font-bold tracking-widest opacity-80 mt-0.5">जेब्रा क्रॉसिंग से सड़क पार करें</div>
                  </div>
                </motion.button>
              </div>

              {trafficHealth <= 0 && (
                <button
                  onClick={resetTrafficLab}
                  className="px-4 py-2 border border-red-300 text-red-650 hover:bg-red-50 rounded-xl text-[10.5px] font-bold transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  Reset Simulator 🔄
                </button>
              )}
            </div>

            {/* Safe message banner */}
            <AnimatePresence mode="wait">
              {crossingResult === 'safe' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl p-4 flex items-center gap-3 text-xs shadow-md border border-emerald-400/20 text-left relative overflow-hidden"
                >
                  {/* Subtle background glow */}
                  <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-white/10 rounded-full blur-xl pointer-events-none" />

                  {/* Success Star Badge */}
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0 border border-white/10 text-base font-bold font-mono">
                    ★
                  </div>

                  <div>
                    <div className="font-black text-white text-[12.5px] tracking-wide uppercase font-sans">
                      PERFECT CROSSING! (उत्कृष्ट!)
                    </div>
                    <p className="text-[10.5px] text-emerald-50 font-medium mt-0.5 leading-relaxed">
                      Excellent timing. You crossed safely while the vehicle signal was Red and all cars were stopped behind the stop line.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ROAD SAFETY STORYBOOK (GAMIFIED COMPARISON) */}
          <div className="mt-6 border border-slate-200 rounded-3xl overflow-hidden shadow-sm bg-white font-sans text-left">
            {/* Header Tab Bar */}
            <div className="bg-slate-50 border-b border-slate-200 px-5 py-3.5 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
                Safety Logbook / सुरक्षा डायरी
              </span>
              <span className={`text-[9px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider ${crossingResult === 'safe'
                ? 'bg-green-100 text-green-700'
                : crossingResult === 'crash'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-slate-200 text-slate-600'
                }`}>
                {crossingResult === 'safe' ? 'Safe Cross (सुरक्षित)' : crossingResult === 'crash' ? 'Crash Alert' : 'Standby'}
              </span>
            </div>

            <div className="p-5">
              <AnimatePresence mode="wait">
                {/* State 1: Welcome/Ready to start */}
                {!crossingResult && trafficHealth > 0 && (
                  <motion.div
                    key="welcome"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-6 space-y-2.5"
                  >
                    <div className="text-3xl">🚦</div>
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                      How do we cross the road safely? / सुरक्षित कैसे पार करें?
                    </h4>
                    <p className="text-[11px] text-slate-500 max-w-sm mx-auto leading-relaxed font-semibold">
                      Wait for the pedestrian green light (vehicles must show Red). Click the button above to cross!
                    </p>
                  </motion.div>
                )}

                {/* State 2: Safe Crossing Story */}
                {crossingResult === 'safe' && (
                  <motion.div
                    key="safe-story"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center"
                  >
                    {/* Left text column */}
                    <div className="md:col-span-8 space-y-3">
                      <div className="inline-block bg-green-50 border border-green-200 text-green-800 rounded-full px-3 py-0.5 text-[9px] font-black uppercase tracking-wider">
                        Safe Walk / सुरक्षित कदम
                      </div>
                      <h4 className="text-sm font-black text-slate-900 leading-tight">
                        Why crossing on Red signal was correct:
                      </h4>

                      <div className="space-y-2 text-[10.5px] text-slate-650 leading-relaxed font-semibold font-sans">
                        <p>
                          <strong>1. Vehicles are standing still:</strong> The traffic light is Red, so cars must stop behind the stop line.
                        </p>
                        <p>
                          <strong>2. Easy to see you:</strong> Since cars are stopped, drivers are looking ahead. They see you walk safely across the zebra crossing.
                        </p>
                        <p>
                          <strong>3. Zero movement:</strong> Stopped cars have no speed and no energy. There is no risk of slipping!
                        </p>
                      </div>
                    </div>

                    {/* Right illustration column */}
                    <div className="md:col-span-4 bg-green-50/50 border border-green-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-2">
                      <span className="text-4xl">🛑</span>
                      <div className="text-[10px] font-black text-green-900 uppercase tracking-wider">
                        Cars stopped safely
                      </div>
                      <p className="text-[9px] text-green-700 leading-normal font-semibold max-w-[150px]">
                        Always cross when the vehicles are standing still.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* State 3: Unsafe Crossing Story */}
                {crossingResult === 'crash' && (
                  <motion.div
                    key="crash-story"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center"
                  >
                    {/* Left text column */}
                    <div className="md:col-span-8 space-y-3">
                      <div className="inline-block bg-red-50 border border-red-200 text-red-800 rounded-full px-3 py-0.5 text-[9px] font-black uppercase tracking-wider">
                        Crash Alert / दुर्घटना का कारण
                      </div>
                      <h4 className="text-sm font-black text-slate-900 leading-tight">
                        Why crossing on Green or Yellow is dangerous:
                      </h4>

                      <div className="space-y-2 text-[10.5px] text-slate-650 leading-relaxed font-semibold font-sans">
                        <p>
                          <strong>1. Cars are moving fast:</strong> The light is Green/Yellow for cars. Drivers are speeding up and do not expect anyone on the road.
                        </p>
                        <p>
                          <strong>2. Heavy cars slide:</strong> Cars cannot stop instantly. When brakes are pressed, the heavy car slides forward on the asphalt like sliding on soap!
                        </p>
                        <p>
                          <strong>3. No space to stop:</strong> If you walk in front of a zooming car, the driver has no space to stop, causing a collision.
                        </p>
                      </div>
                    </div>

                    {/* Right illustration column */}
                    <div className="md:col-span-4 bg-red-50/50 border border-red-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-2">
                      <span className="text-4xl">🚗💨</span>
                      <div className="text-[10px] font-black text-red-900 uppercase tracking-wider">
                        Cars need braking space
                      </div>
                      <p className="text-[9px] text-red-700 leading-normal font-semibold max-w-[150px]">
                        Vehicles are heavy and slide forward. Never step in front of them!
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TrafficLab;
