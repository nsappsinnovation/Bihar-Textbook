import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, AlertTriangle, RefreshCw, Smartphone, Zap, ShieldAlert } from 'lucide-react';

// --- Reusable Animated Road Background ---
const AnimatedRoad = ({ speed = 2, isMoving = false, showCrosswalk = false, showDivider = true }) => {
  return (
    <div className="absolute inset-0 bg-[#2d3748] flex flex-col justify-center overflow-hidden">
      {/* Top Grass/Curb */}
      <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-emerald-800 to-emerald-700 border-b-4 border-slate-500 shadow-[inset_0_4px_10px_rgba(0,0,0,0.3)]" />
      
      {/* Road Surface Texture */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent to-black pointer-events-none" />

      {/* Center Dashed Line */}
      {showDivider && (
        <div className="absolute inset-x-0 h-1 top-1/2 -translate-y-1/2 flex overflow-hidden opacity-80">
          <motion.div 
            animate={isMoving ? { x: [0, -96] } : { x: 0 }} 
            transition={{ repeat: isMoving ? Infinity : 0, duration: isMoving ? speed : 0, ease: "linear" }}
            className="flex w-max"
          >
            {[...Array(30)].map((_, i) => (
              <div key={i} className="w-12 h-1.5 shrink-0 bg-yellow-400 mx-6 rounded-full shadow-[0_0_5px_rgba(250,204,21,0.5)]" />
            ))}
          </motion.div>
        </div>
      )}

      {/* Crosswalk */}
      {showCrosswalk && (
        <div className="absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-24 flex flex-col justify-between py-1 z-10">
           {[...Array(7)].map((_, i) => (
             <div key={i} className="w-full h-4 bg-white/90 rounded-sm shadow-sm" />
           ))}
        </div>
      )}

      {/* Bottom Grass/Curb */}
      <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-emerald-800 to-emerald-700 border-t-4 border-slate-500 shadow-[inset_0_-4px_10px_rgba(0,0,0,0.3)]" />
    </div>
  );
};

const CrossingSimulator = () => {
  const [trafficLight, setTrafficLight] = useState('green');
  const [isCrossing, setIsCrossing] = useState(false);
  const [crossingResult, setCrossingResult] = useState('');
  const [trafficTimer, setTrafficTimer] = useState(7);
  const [isAutoMode, setIsAutoMode] = useState(true);

  useEffect(() => {
    if (!isAutoMode) return;
    const interval = setInterval(() => {
      setTrafficTimer(prev => {
        if (prev <= 1) {
          let nextLight = 'green';
          let nextTime = 7;
          if (trafficLight === 'green') { nextLight = 'yellow'; nextTime = 3; }
          else if (trafficLight === 'yellow') { nextLight = 'red'; nextTime = 6; }
          setTrafficLight(nextLight);
          return nextTime;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isAutoMode, trafficLight]);

  const handleCrossRoad = () => {
    if (isCrossing || crossingResult === 'crash') return;
    setIsCrossing(true);
    setCrossingResult('');
    setTimeout(() => {
      if (trafficLight === 'red') {
        setCrossingResult('safe');
        setTimeout(() => setIsCrossing(false), 2000);
      } else {
        setCrossingResult('crash');
      }
    }, 1200);
  };

  const reset = () => {
    setTrafficLight('green');
    setIsCrossing(false);
    setCrossingResult('');
    setTrafficTimer(7);
    setIsAutoMode(true);
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center gap-4">
           <div className="flex bg-slate-100 p-1.5 rounded-full border border-slate-200">
             {['red', 'yellow', 'green'].map(c => (
               <button
                 key={c}
                 onClick={() => { setIsAutoMode(false); setTrafficLight(c); }}
                 className={`w-10 h-10 rounded-full mx-1 flex items-center justify-center transition-all cursor-pointer ${
                   trafficLight === c 
                    ? c === 'red' ? 'bg-red-500 shadow-[0_4px_15px_rgba(239,68,68,0.5)] scale-110'
                    : c === 'yellow' ? 'bg-yellow-400 shadow-[0_4px_15px_rgba(250,204,21,0.5)] scale-110'
                    : 'bg-emerald-500 shadow-[0_4px_15px_rgba(16,185,129,0.5)] scale-110'
                    : 'bg-white hover:bg-slate-50 border border-slate-200'
                 }`}
               >
                  {trafficLight === c && <div className="w-4 h-4 bg-white/40 rounded-full blur-[2px]" />}
               </button>
             ))}
           </div>
           <div className="text-xs font-black tracking-widest text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200">
             {isAutoMode ? `AUTO: 00:0${trafficTimer}` : 'MANUAL OVERRIDE'}
           </div>
        </div>
        <button onClick={reset} className="p-3 bg-slate-100 rounded-xl border border-slate-200 hover:bg-slate-200 transition-colors cursor-pointer text-slate-500 hover:text-slate-700 mt-4 sm:mt-0">
          <RefreshCw size={18} />
        </button>
      </div>

      {/* Simulator Viewport */}
      <motion.div
        animate={crossingResult === 'crash' ? { x: [0, -12, 12, -8, 8, 0], y: [0, 8, -8, 4, -4, 0] } : {}}
        transition={{ duration: 0.5 }}
        className="relative rounded-3xl h-[320px] w-full border-8 border-slate-800 overflow-hidden shadow-2xl flex flex-col justify-between select-none"
      >
        <AnimatedRoad speed={0} isMoving={false} showCrosswalk={true} />

        {/* Top Car (Left to Right) -> Emoji default is left, so scale-x-[-1] makes it go right */}
        <motion.div
          animate={
            trafficLight === 'red' ? { left: '15%' } 
            : crossingResult === 'crash' ? { left: '42%' }
            : { left: ['-20%', '120%'] }
          }
          transition={
            trafficLight === 'red' ? { duration: 0 }
            : crossingResult === 'crash' ? { duration: 0.2 }
            : { duration: trafficLight === 'yellow' ? 6 : 2, repeat: Infinity, ease: 'linear' }
          }
          className="absolute top-8 z-20 text-6xl drop-shadow-xl scale-x-[-1]"
        >
          🚕
        </motion.div>
        
        {/* Bottom Car (Right to Left) -> Emoji default is left, no scale needed */}
        <motion.div
          animate={
            trafficLight === 'red' ? { right: '15%' } 
            : { right: ['-20%', '120%'] }
          }
          transition={
            trafficLight === 'red' ? { duration: 0 }
            : { duration: trafficLight === 'yellow' ? 5 : 1.5, repeat: Infinity, ease: 'linear' }
          }
          className="absolute bottom-10 z-20 text-6xl drop-shadow-xl"
        >
          🏎️
        </motion.div>

        {/* Pedestrian */}
        <motion.div
          animate={
            isCrossing 
              ? crossingResult === 'crash'
                ? { y: [0, -110, -110], x: [0, -60, -60], rotate: [0, 360, 90], scale: [1, 1.5, 1] }
                : { y: [0, -260] }
              : crossingResult === 'crash'
                ? { y: -110, x: -60, rotate: 90 }
                : { y: 0, x: 0, rotate: 0 }
          }
          transition={ !isCrossing ? { duration: 0 } : crossingResult === 'crash' ? { duration: 0.6, ease: "easeOut" } : { duration: 2.2, ease: "linear" } }
          className="absolute left-[48%] text-5xl z-30 drop-shadow-xl"
          style={{ bottom: '-15px' }}
        >
          {crossingResult === 'crash' ? '💥' : '🚶‍♂️'}
        </motion.div>

        {/* Overlays */}
        <AnimatePresence>
          {crossingResult === 'crash' && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="absolute inset-0 bg-red-950/80 z-40 flex flex-col items-center justify-center text-white backdrop-blur-sm border-[12px] border-red-600">
              <span className="text-5xl md:text-7xl font-black uppercase tracking-widest text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]">WASTED</span>
              <span className="text-sm md:text-base font-semibold leading-relaxed mt-4 text-red-100 bg-red-900/50 px-6 py-2 rounded-full border border-red-500/50">Never cross on {trafficLight.toUpperCase()} light! Vehicles cannot stop in time.</span>
            </motion.div>
          )}
          {crossingResult === 'safe' && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 bg-emerald-900/80 z-40 flex flex-col items-center justify-center text-white backdrop-blur-sm">
              <span className="text-5xl md:text-7xl font-black uppercase tracking-widest text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.8)]">SAFE PASSAGE</span>
              <span className="text-sm md:text-base font-semibold leading-relaxed mt-4 text-emerald-100 bg-emerald-900/50 px-6 py-2 rounded-full border border-emerald-500/50">Perfect! You crossed safely while cars were stopped on Red.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="flex justify-center">
        <button
          onClick={crossingResult === 'crash' || crossingResult === 'safe' ? reset : handleCrossRoad}
          disabled={isCrossing && crossingResult === ''}
          className={`px-12 py-5 font-black text-sm tracking-widest uppercase rounded-2xl shadow-[0_6px_0_rgba(0,0,0,0.2)] active:translate-y-1.5 active:shadow-none transition-all cursor-pointer ${
            crossingResult === 'crash' || crossingResult === 'safe'
            ? 'bg-slate-100 hover:bg-slate-200 text-slate-600 shadow-[0_6px_0_#e2e8f0]'
            : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_6px_0_#047857]'
          }`}
        >
          {crossingResult === 'crash' || crossingResult === 'safe' ? 'Reset Scenario' : 'Cross The Road'}
        </button>
      </div>
    </div>
  );
};

const SpeedingSimulator = () => {
  const [speed, setSpeed] = useState('normal');
  const [status, setStatus] = useState('idle'); // idle, driving, braking, crash, safe
  
  const handleTest = () => {
    setStatus('driving');
    // Start braking after a short delay
    setTimeout(() => {
      setStatus('braking');
      // Outcome
      setTimeout(() => {
        setStatus(speed === 'fast' ? 'crash' : 'safe');
      }, speed === 'fast' ? 500 : 800);
    }, 1200);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-center gap-3">
        <button onClick={() => { setSpeed('normal'); setStatus('idle'); }} className={`px-5 py-3 rounded-2xl text-xs md:text-sm font-black uppercase tracking-wider transition-all cursor-pointer ${speed === 'normal' ? 'bg-emerald-600 text-white shadow-[0_4px_20px_rgba(5,150,105,0.4)] scale-105' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>Normal (40 km/h)</button>
        <button onClick={() => { setSpeed('fast'); setStatus('idle'); }} className={`px-5 py-3 rounded-2xl text-xs md:text-sm font-black uppercase tracking-wider transition-all cursor-pointer ${speed === 'fast' ? 'bg-emerald-600 text-white shadow-[0_4px_20px_rgba(5,150,105,0.4)] scale-105' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>Speeding (90 km/h)</button>
      </div>
      
      <motion.div
        animate={status === 'crash' ? { x: [0, -15, 15, -10, 10, 0] } : {}}
        className="relative rounded-3xl h-[260px] w-full border-8 border-slate-800 overflow-hidden shadow-2xl flex items-center select-none"
      >
         <AnimatedRoad 
            isMoving={status === 'driving' || (status === 'braking' && speed === 'fast')} 
            speed={speed === 'fast' ? 0.2 : 0.6} 
         />
         
         {/* The sudden Obstacle */}
         <motion.div 
           animate={
             status === 'idle' ? { right: '-20%' } 
             : (status === 'driving' || status === 'braking' || status === 'safe') ? { right: '20%' }
             : { right: '15%' } // slightly bumped on crash
           }
           transition={{ duration: status === 'idle' ? 0 : status === 'driving' ? 1.2 : 0.2 }}
           className="absolute z-20 drop-shadow-2xl text-6xl"
         >
           🐄
         </motion.div>
         
         {/* Skid Marks */}
         {status === 'braking' || status === 'crash' || status === 'safe' ? (
           <motion.div 
             initial={{ opacity: 0, scaleX: 0 }}
             animate={{ opacity: 0.8, scaleX: 1 }}
             transition={{ duration: 0.5 }}
             className="absolute top-[55%] h-6 bg-black/60 blur-[1px] origin-right z-10"
             style={{ left: '5%', right: speed === 'fast' ? '40%' : '65%' }}
           />
         ) : null}

         {/* Player Car (Left to Right) */}
         <motion.div
           animate={
             status === 'idle' ? { left: '5%', rotate: 0 }
             : status === 'driving' ? { left: speed === 'fast' ? '40%' : '20%', rotate: 0 }
             : status === 'braking' ? { left: speed === 'fast' ? '60%' : '35%', rotate: -8 }
             : status === 'safe' ? { left: '45%', rotate: 0 } // Stops safely
             : { left: '72%', rotate: -15, y: -10 } // Crashes
           }
           transition={ { 
             duration: status === 'idle' ? 0 
                     : status === 'driving' ? 1.2 
                     : status === 'braking' ? (speed === 'fast' ? 0.5 : 0.8) 
                     : 0.3,
             ease: status === 'braking' ? 'easeOut' : 'linear'
           } }
           className={`absolute top-1/2 -translate-y-1/2 z-30 flex items-center text-7xl scale-x-[-1] transition-all duration-300 ${status === 'braking' ? 'drop-shadow-[15px_0_20px_rgba(239,68,68,0.9)]' : 'drop-shadow-xl'}`}
         >
           {status === 'crash' ? '💥' : '🏎️'}
           {status === 'braking' && (
             <div className="absolute -left-16 -top-8 bg-red-600 text-white text-sm font-black px-4 py-1.5 rounded-full animate-bounce scale-x-[-1] shadow-[0_0_15px_rgba(239,68,68,0.8)] border-2 border-white">
               BRAKING!
             </div>
           )}
         </motion.div>

         <AnimatePresence>
           {status === 'crash' && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} className="absolute inset-0 bg-red-950/80 z-40 flex flex-col items-center justify-center text-white backdrop-blur-sm border-[12px] border-red-600">
                <span className="text-5xl md:text-7xl font-black uppercase tracking-widest text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]">CRASHED!</span>
                <span className="text-sm md:text-base font-semibold leading-relaxed mt-4 text-red-100 bg-red-900/50 px-6 py-2 rounded-full border border-red-500/50">High speed heavily increases braking distance. You couldn't stop in time!</span>
              </motion.div>
           )}
           {status === 'safe' && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} className="absolute inset-0 bg-emerald-900/80 z-40 flex flex-col items-center justify-center text-white backdrop-blur-sm">
                <span className="text-5xl md:text-7xl font-black uppercase tracking-widest text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.8)]">SAFE STOP</span>
                <span className="text-sm md:text-base font-semibold leading-relaxed mt-4 text-emerald-100 bg-emerald-900/50 px-6 py-2 rounded-full border border-emerald-500/50">Normal speed gave you plenty of time and distance to brake safely.</span>
              </motion.div>
           )}
         </AnimatePresence>
      </motion.div>

      <div className="flex justify-center">
        <button onClick={status === 'idle' ? handleTest : () => setStatus('idle')} className={`px-12 py-5 font-black text-sm tracking-widest uppercase rounded-2xl active:translate-y-1.5 active:shadow-none transition-all cursor-pointer ${status === 'idle' ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_6px_0_#047857]' : 'bg-slate-100 hover:bg-slate-200 text-slate-600 shadow-[0_6px_0_#e2e8f0]'}`}>
          {status === 'idle' ? 'Test Scenario' : 'Reset Scenario'}
        </button>
      </div>
    </div>
  )
};

const WrongSideSimulator = () => {
  const [side, setSide] = useState('correct');
  const [status, setStatus] = useState('idle');
  
  const handleTest = () => {
    setStatus('running');
    setTimeout(() => {
      setStatus(side === 'correct' ? 'safe' : 'crash');
    }, side === 'wrong' ? 1200 : 2500); // Crash happens faster if wrong side
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-center gap-3">
        <button onClick={() => { setSide('correct'); setStatus('idle'); }} className={`px-5 py-3 rounded-2xl text-xs md:text-sm font-black uppercase tracking-wider transition-all cursor-pointer ${side === 'correct' ? 'bg-emerald-600 text-white shadow-[0_4px_20px_rgba(5,150,105,0.4)] scale-105' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>Drive Left (Correct Lane)</button>
        <button onClick={() => { setSide('wrong'); setStatus('idle'); }} className={`px-5 py-3 rounded-2xl text-xs md:text-sm font-black uppercase tracking-wider transition-all cursor-pointer ${side === 'wrong' ? 'bg-emerald-600 text-white shadow-[0_4px_20px_rgba(5,150,105,0.4)] scale-105' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>Drive Right (Wrong Side)</button>
      </div>
      
      <motion.div
        animate={status === 'crash' ? { x: [0, -20, 20, -10, 10, 0] } : {}}
        className="relative rounded-3xl h-[280px] w-full border-8 border-slate-800 overflow-hidden shadow-2xl flex flex-col justify-center select-none"
      >
         <AnimatedRoad isMoving={status === 'running' || status === 'safe'} speed={0.3} />
         
         {/* Incoming heavy traffic (Right to Left on BOTTOM lane) */}
         <motion.div
           animate={
             status === 'idle' ? { right: '-30%' } 
             : status === 'crash' ? { right: '35%' }
             : { right: '120%' }
           }
           transition={{ duration: status === 'idle' ? 0 : status === 'crash' ? 1.2 : 2.5, ease: 'linear' }}
           className="absolute bottom-12 z-20 drop-shadow-xl text-7xl"
         >
           🚛
         </motion.div>
         
         {/* Player Car (Left to Right on TOP lane if correct) */}
         <motion.div
           animate={{
             left: status === 'idle' ? '10%' : status === 'crash' ? '40%' : '10%',
             top: side === 'correct' ? '25px' : '150px', 
             rotate: status === 'crash' ? 25 : 0
           }}
           transition={{ duration: status === 'idle' ? 0 : status === 'crash' ? 1.2 : 0.5, ease: 'linear' }}
           className="absolute z-30 drop-shadow-xl text-7xl scale-x-[-1]"
         >
           {status === 'crash' ? '💥' : '🚗'}
         </motion.div>

         <AnimatePresence>
           {status === 'crash' && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} className="absolute inset-0 bg-red-950/80 z-40 flex flex-col items-center justify-center text-white backdrop-blur-sm border-[12px] border-red-600">
                <span className="text-4xl md:text-6xl font-black uppercase tracking-widest text-center text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]">HEAD-ON COLLISION!</span>
                <span className="text-sm md:text-base font-semibold leading-relaxed mt-4 text-center bg-red-900/50 px-6 py-2 rounded-full border border-red-500/50 text-red-100">Driving on the wrong side leaves no escape route for oncoming traffic.</span>
              </motion.div>
           )}
           {status === 'safe' && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} className="absolute inset-0 bg-emerald-900/80 z-40 flex flex-col items-center justify-center text-white backdrop-blur-sm">
                <span className="text-4xl md:text-6xl font-black uppercase tracking-widest text-center text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.8)]">SAFE PASSAGE</span>
                <span className="text-sm md:text-base font-semibold leading-relaxed mt-4 text-center bg-emerald-900/50 px-6 py-2 rounded-full border border-emerald-500/50 text-emerald-100">Sticking to the correct lane ensures smooth and safe traffic flow.</span>
              </motion.div>
           )}
         </AnimatePresence>
      </motion.div>

      <div className="flex justify-center">
        <button onClick={status === 'idle' ? handleTest : () => setStatus('idle')} className={`px-12 py-5 font-black text-sm tracking-widest uppercase rounded-2xl active:translate-y-1.5 active:shadow-none transition-all cursor-pointer ${status === 'idle' ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_6px_0_#047857]' : 'bg-slate-100 hover:bg-slate-200 text-slate-600 shadow-[0_6px_0_#e2e8f0]'}`}>
          {status === 'idle' ? 'Test Scenario' : 'Reset Scenario'}
        </button>
      </div>
    </div>
  )
};

const DistractedSimulator = () => {
  const [focus, setFocus] = useState('road');
  const [status, setStatus] = useState('idle');
  
  const handleTest = () => {
    setStatus('running');
    setTimeout(() => {
      setStatus(focus === 'road' ? 'safe' : 'crash');
    }, 2500);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-center gap-3">
        <button onClick={() => { setFocus('road'); setStatus('idle'); }} className={`px-5 py-3 rounded-2xl text-xs md:text-sm font-black uppercase tracking-wider transition-all cursor-pointer ${focus === 'road' ? 'bg-emerald-600 text-white shadow-[0_4px_20px_rgba(5,150,105,0.4)] scale-105' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>Eyes on Road</button>
        <button onClick={() => { setFocus('phone'); setStatus('idle'); }} className={`px-5 py-3 rounded-2xl text-xs md:text-sm font-black uppercase tracking-wider transition-all cursor-pointer ${focus === 'phone' ? 'bg-emerald-600 text-white shadow-[0_4px_20px_rgba(5,150,105,0.4)] scale-105' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>Texting on Phone</button>
      </div>
      
      <motion.div 
        animate={status === 'crash' ? { x: [0, -20, 20, -10, 10, 0] } : {}}
        className="relative rounded-3xl h-[280px] w-full border-8 border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center select-none"
      >
         {/* Curved road simulation - using horizontal movement but car drifts vertically */}
         <AnimatedRoad isMoving={status === 'running' || status === 'safe'} speed={0.4} />

         {/* Tree / Barrier indicating the edge of the road */}
         <div className="absolute top-0 inset-x-0 h-4 bg-yellow-400/80 z-20 shadow-[0_4px_10px_rgba(0,0,0,0.5)] border-b-2 border-yellow-500" />
         
         {/* Player Car (Left to Right on TOP lane) */}
         <motion.div
           animate={
             status === 'idle' ? { left: '20%', top: '50px', rotate: 0 }
             : focus === 'road' ? { left: '20%', top: ['50px', '40px', '60px', '50px'], rotate: 0 } // Safe: slight bumps
             : status === 'crash' ? { left: '45%', top: '15px', rotate: -15 } // Crash: hits the barrier
             : { left: ['20%', '45%'], top: ['50px', '15px'], rotate: [0, -15] } // Drifting motion
           }
           transition={{ 
             duration: status === 'idle' ? 0 : (status === 'crash' ? 0.2 : 2.5), 
             ease: 'linear',
             repeat: (focus === 'road' && status === 'running') ? Infinity : 0
           }}
           className="absolute z-30 drop-shadow-xl text-7xl scale-x-[-1]"
         >
           {status === 'crash' ? '💥' : '🚙'}
           
           {/* The Phone Popup if distracted */}
           <AnimatePresence>
             {focus === 'phone' && status === 'running' && (
               <motion.div 
                 initial={{ opacity: 0, scale: 0, y: 20 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0 }}
                 className="absolute top-16 -left-12 z-40 bg-white/95 rounded-2xl shadow-xl p-3 border-2 border-slate-200 scale-x-[-1]"
               >
                 <div className="animate-bounce">
                   📱
                 </div>
                 <div className="absolute -top-3 -right-3 text-red-500 bg-white rounded-full">
                   <ShieldAlert size={20} />
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
         </motion.div>

         <AnimatePresence>
           {status === 'crash' && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} className="absolute inset-0 bg-red-950/80 z-40 flex flex-col items-center justify-center text-white backdrop-blur-sm border-[12px] border-red-600">
                <span className="text-4xl md:text-6xl font-black uppercase tracking-widest text-center text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]">LANE DEPARTURE!</span>
                <span className="text-sm md:text-base font-semibold leading-relaxed mt-4 text-center bg-red-900/50 px-6 py-2 rounded-full border border-red-500/50 text-red-100">Taking your eyes off the road for seconds causes you to drift and crash.</span>
              </motion.div>
           )}
           {status === 'safe' && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} className="absolute inset-0 bg-emerald-900/80 z-40 flex flex-col items-center justify-center text-white backdrop-blur-sm">
                <span className="text-4xl md:text-6xl font-black uppercase tracking-widest text-center text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.8)]">FOCUSED DRIVE</span>
                <span className="text-sm md:text-base font-semibold leading-relaxed mt-4 text-center bg-emerald-900/50 px-6 py-2 rounded-full border border-emerald-500/50 text-emerald-100">Staying attentive keeps you safely centered in your lane.</span>
              </motion.div>
           )}
         </AnimatePresence>
      </motion.div>

      <div className="flex justify-center">
        <button onClick={status === 'idle' ? handleTest : () => setStatus('idle')} className={`px-12 py-5 font-black text-sm tracking-widest uppercase rounded-2xl active:translate-y-1.5 active:shadow-none transition-all cursor-pointer ${status === 'idle' ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_6px_0_#047857]' : 'bg-slate-100 hover:bg-slate-200 text-slate-600 shadow-[0_6px_0_#e2e8f0]'}`}>
          {status === 'idle' ? 'Test Scenario' : 'Reset Scenario'}
        </button>
      </div>
    </div>
  )
};

const TrafficLab = () => {
  const [activeScenario, setActiveScenario] = useState('crossing');

  return (
    <div className="bg-white rounded-[32px] border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.03)] p-6 md:p-8">
      <div className="w-full text-left space-y-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">Road Safety Simulators</h2>
          <p className="text-slate-500 text-sm md:text-base font-semibold leading-relaxed mt-2 max-w-xl">Experience realistic road hazards and learn why traffic rules save lives.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-3 pb-2">
          {[
            { id: 'crossing', label: 'Zebra Crossing', icon: <Activity size={18} /> },
            { id: 'speeding', label: 'Over Speeding', icon: <Zap size={18} /> },
            { id: 'wrongSide', label: 'Wrong Side', icon: <AlertTriangle size={18} /> },
            { id: 'distracted', label: 'Distracted Driving', icon: <Smartphone size={18} /> }
          ].map(sc => (
            <button
              key={sc.id}
              onClick={() => setActiveScenario(sc.id)}
              className={`px-5 py-3 rounded-2xl text-xs md:text-sm font-black uppercase tracking-wider flex items-center gap-2.5 transition-all cursor-pointer ${
                activeScenario === sc.id
                  ? 'bg-emerald-600 text-white shadow-[0_4px_20px_rgba(5,150,105,0.4)] scale-105'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {sc.icon} {sc.label}
            </button>
          ))}
        </div>

        {/* Dynamic Simulator Container */}
        <div className="mt-8 bg-slate-50 p-6 md:p-8 rounded-[32px] border border-slate-200">
          <AnimatePresence mode="wait">
             {activeScenario === 'crossing' && (
               <motion.div key="crossing" initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.95}} transition={{duration:0.2}}>
                 <CrossingSimulator />
               </motion.div>
             )}
             {activeScenario === 'speeding' && (
               <motion.div key="speeding" initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.95}} transition={{duration:0.2}}>
                 <SpeedingSimulator />
               </motion.div>
             )}
             {activeScenario === 'wrongSide' && (
               <motion.div key="wrongSide" initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.95}} transition={{duration:0.2}}>
                 <WrongSideSimulator />
               </motion.div>
             )}
             {activeScenario === 'distracted' && (
               <motion.div key="distracted" initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.95}} transition={{duration:0.2}}>
                 <DistractedSimulator />
               </motion.div>
             )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TrafficLab;
