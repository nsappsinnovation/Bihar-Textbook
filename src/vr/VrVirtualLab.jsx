import React, { useState, useEffect, useRef } from 'react';
import { 
  Eye, Sliders, RefreshCw, Cpu, Layers, HelpCircle, 
  CheckCircle, Zap, Star, ShieldAlert, Heart
} from 'lucide-react';

const VrVirtualLab = () => {
  const [activeTab, setActiveTab] = useState('optics'); // 'optics' | 'assembly' | 'color' | 'depth'
  
  // Tab 1: Optics State
  const [lensDist, setLensDist] = useState(70); 
  const [ipd, setIpd] = useState(64); 
  const [refreshRate, setRefreshRate] = useState(90); 
  const [foveatedMode, setFoveatedMode] = useState(true);
  const [gazePoint, setGazePoint] = useState({ x: 130, y: 65 });

  // Tab 2: Assembly State
  const [assembledParts, setAssembledParts] = useState({
    display: false,
    lenses: false,
    imu: false,
    cushion: false
  });
  const [hoveredInfo, setHoveredInfo] = useState(null);

  // Tab 3: Color Mixer State
  const [redLight, setRedLight] = useState(255);
  const [greenLight, setGreenLight] = useState(0);
  const [blueLight, setBlueLight] = useState(255);

  // Tab 4: 3D Magic Depth State
  const [depthOffset, setDepthOffset] = useState(10);

  const canvasRef = useRef(null);
  const latencyCanvasRef = useRef(null);

  // Ray tracing canvas renderer for Tab 1
  useEffect(() => {
    if (activeTab !== 'optics') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const width = canvas.width = 540;
    const height = canvas.height = 240;

    // Dark optical bench background for high contrast glowing light rays
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.4)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // 1. Draw VR Screen (Right Side)
    const screenX = 460;
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(screenX, 40, 20, 160);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 4;
    ctx.strokeRect(screenX, 40, 20, 160);
    
    // Draw rainbow colors on the VR Screen
    const screenGrad = ctx.createLinearGradient(screenX, 40, screenX, 200);
    screenGrad.addColorStop(0, '#f43f5e'); 
    screenGrad.addColorStop(0.5, '#10b981'); 
    screenGrad.addColorStop(1, '#6366f1'); 
    ctx.fillStyle = screenGrad;
    ctx.fillRect(screenX + 3, 44, 14, 152);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText("VR SCREEN", screenX - 25, 30);

    // 2. Draw Magic Lens
    const lensX = screenX - 60 - (lensDist - 30) * 1.6;
    
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(lensX, 40);
    ctx.quadraticCurveTo(lensX + 18, 120, lensX, 200);
    ctx.quadraticCurveTo(lensX - 18, 120, lensX, 40);
    ctx.closePath();
    ctx.fillStyle = 'rgba(56, 189, 248, 0.3)';
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = '#38bdf8';
    ctx.fillText("LENS", lensX - 12, 30);

    // 3. Draw Kid's Eye
    const eyeX = 80;
    const eyeY = 120;
    
    // Draw white sclera
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(eyeX, eyeY, 32, -Math.PI / 4, Math.PI / 4, true);
    ctx.arc(eyeX - 44, eyeY, 32, Math.PI / 4, -Math.PI / 4, true);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Iris
    ctx.fillStyle = '#0ea5e9';
    ctx.beginPath();
    ctx.arc(eyeX + 6, eyeY, 16, 0, Math.PI * 2);
    ctx.fill();
    
    // Pupil
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(eyeX + 8, eyeY, 8, 0, Math.PI * 2);
    ctx.fill();

    // Sparkle dot in eye
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(eyeX + 5, eyeY - 5, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 9px sans-serif';
    ctx.fillText("YOUR EYE", eyeX - 20, eyeY - 38);

    // 4. Trace Light Rays
    const isOptimal = Math.abs(lensDist - 70) <= 5;
    const rayColors = ['#f43f5e', '#10b981', '#6366f1'];
    const sourcesY = [60, 120, 180];
    
    sourcesY.forEach((sy, index) => {
      ctx.strokeStyle = rayColors[index];
      ctx.lineWidth = 2.5;
      
      // Ray 1: Screen to Lens
      ctx.beginPath();
      ctx.moveTo(screenX, sy);
      ctx.lineTo(lensX, sy);
      ctx.stroke();

      // Ray 2: Lens refraction to Pupil
      let targetY1 = sy;
      if (lensDist > 75) {
        targetY1 = eyeY + (sy - eyeY) * -0.5; 
      } else if (lensDist < 65) {
        targetY1 = eyeY + (sy - eyeY) * 1.4; 
      } else {
        targetY1 = sy; 
      }

      ctx.beginPath();
      ctx.moveTo(lensX, sy);
      ctx.lineTo(eyeX + 8, targetY1);
      ctx.stroke();

      // Inside eyeball paths
      let retinaTargetY = eyeY - (sy - eyeY) * 0.4;
      if (!isOptimal) {
        retinaTargetY = eyeY - (targetY1 - eyeY) * 0.55;
      }
      ctx.strokeStyle = rayColors[index] + '80'; 
      ctx.beginPath();
      ctx.moveTo(eyeX + 8, targetY1);
      ctx.lineTo(eyeX - 12, retinaTargetY);
      ctx.stroke();

      // Draw light focus dots on retina
      if (isOptimal) {
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(eyeX - 12, retinaTargetY, 3, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(eyeX - 12, retinaTargetY, 6, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Focus status banner
    if (isOptimal) {
      ctx.fillStyle = 'rgba(16, 185, 129, 0.95)';
      ctx.fillRect(170, 10, 200, 26);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText("PERFECT FOCUS!", 270, 26);
      ctx.textAlign = 'left';
    } else {
      ctx.fillStyle = 'rgba(239, 68, 68, 0.9)';
      ctx.fillRect(170, 10, 200, 26);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(lensDist > 70 ? "BLURRY: Too Far" : "BLURRY: Too Close", 270, 26);
      ctx.textAlign = 'left';
    }

  }, [lensDist, activeTab]);

  // Frametime visual graph
  useEffect(() => {
    if (activeTab !== 'optics') return;
    const canvas = latencyCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let frameTimes = Array(25).fill(11);

    const drawLatency = () => {
      const width = canvas.width = 120;
      const height = canvas.height = 60;

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      const targetMs = refreshRate === 120 ? 8 : refreshRate === 90 ? 11 : 16;
      frameTimes.shift();
      const nextTime = targetMs + (Math.random() - 0.5) * 0.8;
      frameTimes.push(nextTime);

      ctx.strokeStyle = refreshRate === 120 ? '#10b981' : refreshRate === 90 ? '#38bdf8' : '#e11d48';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      frameTimes.forEach((time, index) => {
        const x = (index / (frameTimes.length - 1)) * width;
        const y = height - (time / 22) * height;
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      animId = requestAnimationFrame(drawLatency);
    };

    drawLatency();
    return () => cancelAnimationFrame(animId);
  }, [refreshRate, activeTab]);

  const mountPart = (part) => {
    setAssembledParts(prev => ({
      ...prev,
      [part]: true
    }));
  };

  const resetAssembly = () => {
    setAssembledParts({
      display: false,
      lenses: false,
      imu: false,
      cushion: false
    });
  };

  const assemblyComplete = Object.values(assembledParts).every(v => v === true);

  const handleFoveatedClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setGazePoint({ x, y });
  };

  const componentsList = [
    {
      key: 'display',
      title: 'Bright OLED Screen',
      desc: 'High-density display module showing stereoscopic visuals.',
      power: '9V Battery',
      icon: <Layers size={18} className="text-rose-500" />
    },
    {
      key: 'lenses',
      title: 'Pancake Optical Lenses',
      desc: 'Special magnifying lenses that bend rays for clear 3D focus.',
      power: 'Passive',
      icon: <Eye size={18} className="text-sky-500" />
    },
    {
      key: 'imu',
      title: 'Motion & Turn Sensor',
      desc: 'Gyroscope that tracks head movements in 360 degrees.',
      power: '3V Low',
      icon: <Cpu size={18} className="text-amber-500" />
    },
    {
      key: 'cushion',
      title: 'Soft Face Gasket',
      desc: 'Contoured breathable foam for comfort and light blocking.',
      power: 'Passive',
      icon: <Heart size={18} className="text-emerald-500" />
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50/90 via-indigo-50/70 to-purple-50/90 border-2 border-blue-200 text-slate-800 rounded-3xl p-5 shadow-xl relative overflow-hidden font-sans">
      
      {/* Soft background pastel accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-rose-400/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-400/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Header controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-blue-200/80 pb-4 mb-5 relative z-10">
        <div>
          <span className="px-3 py-1 bg-yellow-100 border border-yellow-300 text-yellow-800 text-[11px] font-extrabold rounded-full tracking-wider uppercase flex items-center gap-1 w-max shadow-sm">
            KIDS VR WORKSHOP
          </span>
          <h2 className="text-lg md:text-xl font-extrabold text-slate-900 mt-1.5 tracking-tight">
            How does a VR Headset work?
          </h2>
          <p className="text-slate-600 text-xs mt-1 font-medium">
            Explore interactive optics, hardware assembly, and 3D depth simulations.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-1 bg-white/90 p-1.5 rounded-xl border border-blue-200 shadow-sm shrink-0">
          <button 
            onClick={() => setActiveTab('optics')}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
              activeTab === 'optics' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/50'
            }`}
          >
            Lens Focus Lab
          </button>
          <button 
            onClick={() => setActiveTab('assembly')}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
              activeTab === 'assembly' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/50'
            }`}
          >
            Build a VR Box
          </button>
          <button 
            onClick={() => setActiveTab('color')}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
              activeTab === 'color' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/50'
            }`}
          >
            Color Mixer Lab
          </button>
          <button 
            onClick={() => setActiveTab('depth')}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
              activeTab === 'depth' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/50'
            }`}
          >
            3D Magic Depth
          </button>
        </div>
      </div>

      {/* ======================= TAB 1: OPTICS LAB ======================= */}
      {activeTab === 'optics' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 relative z-10">
          
          {/* Left panel */}
          <div className="bg-white/95 border border-blue-100 rounded-2xl p-4 space-y-4 shadow-sm">
            <h3 className="text-xs font-extrabold tracking-wider text-blue-700 flex items-center gap-1.5 uppercase">
              <Sliders size={14} className="text-blue-600" /> Adjust Settings
            </h3>

            {/* Lens Distance Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800">Move Lens</span>
              </div>
              <input 
                type="range"
                min="30"
                max="110"
                value={lensDist}
                onChange={(e) => setLensDist(parseInt(e.target.value))}
                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <p className="text-[10.5px] text-slate-500 font-medium leading-normal">
                Align the lens until light rays enter the eye straight.
              </p>
            </div>

            {/* Eye Spacing Slider */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800">Eye Width Spacing</span>
                <span className="font-mono text-emerald-600 font-bold">{ipd}mm</span>
              </div>
              <input 
                type="range"
                min="58"
                max="72"
                value={ipd}
                onChange={(e) => setIpd(parseInt(e.target.value))}
                className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <p className="text-[10.5px] text-slate-500 font-medium leading-normal">
                Match lens spacing to your eye centers to prevent double vision.
              </p>
            </div>

            {/* Screen Speed Toggle */}
            <div className="space-y-2.5 pt-3 border-t border-slate-100">
              <span className="block text-xs font-bold text-slate-800">Screen Smoothness</span>
              <div className="grid grid-cols-3 gap-1.5">
                {[60, 90, 120].map((hz) => (
                  <button
                    key={hz}
                    onClick={() => setRefreshRate(hz)}
                    className={`py-1.5 rounded-lg font-bold text-xs border transition-all ${
                      refreshRate === hz 
                        ? 'bg-blue-600 border-blue-500 text-white shadow-sm' 
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {hz === 60 ? 'Slow' : hz === 90 ? 'Fast' : 'Super'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Canvas optics grid */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border border-blue-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-blue-50/80 px-4 py-1.5 border-b border-blue-100 flex justify-between items-center text-[10px] font-extrabold text-blue-800">
                <span>OPTICAL BENCH: LIGHT REFRACTION</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> ONLINE</span>
              </div>
              <canvas ref={canvasRef} className="w-full block" />
            </div>

            {/* Eye-following spotlight screen */}
            <div className="bg-white/95 border border-blue-100 rounded-2xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4 shadow-sm">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-extrabold text-slate-800">
                    Eye-Following Screen
                  </h4>
                  <button
                    onClick={() => setFoveatedMode(!foveatedMode)}
                    className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold transition-all ${
                      foveatedMode ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {foveatedMode ? 'ON' : 'OFF'}
                  </button>
                </div>
                <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                  Click the dark display box. The headset only renders high details where your eyes look to save power.
                </p>
                <div className="mt-3 p-2 bg-emerald-50/80 rounded-lg text-[10px] text-emerald-800 font-bold border border-emerald-200 flex justify-between">
                  <span>Battery Saved:</span>
                  <span>{foveatedMode ? 'Saved 35% Power' : '0%'}</span>
                </div>
              </div>

              {/* Foveated grid */}
              <div 
                onClick={handleFoveatedClick}
                className="h-28 bg-slate-900 rounded-xl relative border border-slate-800 cursor-pointer overflow-hidden shadow-inner"
              >
                <div className="absolute inset-0 grid grid-cols-10 grid-rows-4 opacity-40">
                  {Array(40).fill(0).map((_, idx) => {
                    const row = Math.floor(idx / 10);
                    const col = idx % 10;
                    const cellX = col * 30 + 15;
                    const cellY = row * 26 + 13;
                    const dist = Math.hypot(cellX - gazePoint.x, cellY - gazePoint.y);
                    
                    let bg = 'border-slate-800';
                    if (foveatedMode) {
                      if (dist < 40) bg = 'bg-emerald-500/20 border-emerald-500/40';
                      else if (dist < 80) bg = 'bg-blue-500/5 border-blue-500/10';
                    } else {
                      bg = 'bg-emerald-500/15 border-emerald-500/40';
                    }

                    return <div key={idx} className={`border ${bg} transition-colors duration-150`} />;
                  })}
                </div>

                <div 
                  className="absolute w-8 h-8 rounded-full border border-emerald-400/80 bg-emerald-400/20 pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                  style={{ left: gazePoint.x, top: gazePoint.y }}
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>

                <div className="absolute bottom-1 right-2 text-[8px] text-slate-400 font-mono">
                  Click to move gaze
                </div>
              </div>
            </div>

            {/* Quick status cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-white border border-blue-100 p-2.5 rounded-xl text-center shadow-sm">
                <span className="block text-[10px] text-slate-500 font-bold">EYE COMFORT</span>
                <span className="text-xs font-extrabold text-emerald-600">Optimal / Safe</span>
              </div>
              <div className="bg-white border border-blue-100 p-2.5 rounded-xl text-center shadow-sm">
                <span className="block text-[10px] text-slate-500 font-bold">FIELD OF VIEW</span>
                <span className="text-xs font-extrabold text-blue-600">110 Degree Wide</span>
              </div>
              <div className="col-span-2 sm:col-span-1 bg-white border border-blue-100 p-2.5 rounded-xl flex items-center justify-between shadow-sm">
                <div>
                  <span className="block text-[9px] text-slate-500 font-bold">LATENCY</span>
                  <span className="text-xs font-extrabold text-slate-800">{refreshRate}Hz Graph</span>
                </div>
                <canvas ref={latencyCanvasRef} className="w-16 h-8 border border-slate-800 rounded" />
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ======================= TAB 2: ASSEMBLY WORKBENCH ======================= */}
      {activeTab === 'assembly' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 relative z-10">
          
          {/* Left tray */}
          <div className="bg-white/95 border border-blue-100 rounded-2xl p-4 space-y-3 shadow-sm">
            <h3 className="text-xs font-extrabold text-blue-700 flex items-center gap-1.5 uppercase">
              <Layers size={14} className="text-blue-600" /> VR Box Parts Tray
            </h3>
            <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
              Click on each component below to assemble the headset chassis.
            </p>

            <div className="space-y-2">
              {componentsList.map((comp) => {
                const isMounted = assembledParts[comp.key];
                return (
                  <div
                    key={comp.key}
                    onMouseEnter={() => setHoveredInfo(comp)}
                    onMouseLeave={() => setHoveredInfo(null)}
                    onClick={() => !isMounted && mountPart(comp.key)}
                    className={`border p-2.5 rounded-xl text-left cursor-pointer transition-all flex items-center justify-between shadow-sm ${
                      isMounted 
                        ? 'bg-emerald-50/80 border-emerald-300 opacity-75 cursor-default' 
                        : 'bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50/40'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg">
                        {comp.icon}
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-800">{comp.title}</h4>
                      </div>
                    </div>
                    <div>
                      {isMounted ? (
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[9px] font-extrabold border border-emerald-200">
                          MOUNTED
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-[9px] font-extrabold border border-blue-200">
                          ADD
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Simple detail description */}
            <div className="mt-3 p-3 bg-blue-50/60 border border-blue-200 rounded-xl min-h-[60px] flex flex-col justify-center text-center">
              {hoveredInfo ? (
                <>
                  <h4 className="text-[11px] font-extrabold text-blue-800">{hoveredInfo.title}</h4>
                  <p className="text-[10px] text-slate-600 font-medium leading-normal mt-1">{hoveredInfo.desc}</p>
                </>
              ) : (
                <p className="text-[10px] text-slate-500 italic">
                  Hover over parts to inspect specifications.
                </p>
              )}
            </div>
          </div>

          {/* Visual assembly bench */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border border-blue-100 rounded-2xl p-5 min-h-[340px] flex flex-col justify-between relative shadow-sm">
              
              <div className="flex justify-between items-center text-[10px] font-extrabold text-blue-800 pb-2 border-b border-blue-100">
                <span>VR HEADSET WORKBENCH</span>
                <span>PARTS INSERTED: {Object.values(assembledParts).filter(Boolean).length}/4</span>
              </div>

              {/* Chassis Illustration */}
              <div className="my-auto flex flex-col items-center justify-center py-6">
                
                <div className="relative w-64 h-32 border-2 border-dashed border-blue-300 rounded-[35px] flex items-center justify-center bg-blue-50/30">
                  <span className="absolute -top-5 text-[9px] text-blue-600 uppercase tracking-wider font-extrabold">
                    VR Box Outer Shell
                  </span>

                  {/* 1. Screen slot */}
                  <div className={`absolute left-3 w-4 h-22 rounded border transition-all flex items-center justify-center ${
                    assembledParts.display 
                      ? 'bg-rose-500/20 border-rose-500/80 text-rose-600 font-bold' 
                      : 'border-dashed border-slate-300 text-slate-400'
                  }`}>
                    <span className="text-[8px] font-extrabold rotate-90 whitespace-nowrap">SCREEN</span>
                  </div>

                  {/* 2. Lens slot */}
                  <div className={`absolute left-16 w-3.5 h-18 rounded-full border transition-all flex items-center justify-center ${
                    assembledParts.lenses 
                      ? 'bg-sky-500/20 border-sky-500/80 text-sky-600 font-bold' 
                      : 'border-dashed border-slate-300 text-slate-400'
                  }`}>
                    <span className="text-[8px] font-extrabold rotate-90">LENS</span>
                  </div>

                  {/* 3. IMU Gyro sensor */}
                  <div className={`absolute top-5 right-16 w-7 h-7 rounded border transition-all flex items-center justify-center ${
                    assembledParts.imu 
                      ? 'bg-amber-500/20 border-amber-500/80 text-amber-600 font-bold' 
                      : 'border-dashed border-slate-300 text-slate-400'
                  }`}>
                    <Cpu size={12} className={assembledParts.imu ? 'animate-pulse' : ''} />
                  </div>

                  {/* 4. Sponge Cushion */}
                  <div className={`absolute right-3 w-5 h-26 rounded-r-xl border transition-all flex items-center justify-center ${
                    assembledParts.cushion 
                      ? 'bg-emerald-500/20 border-emerald-500/80 text-emerald-600 font-bold' 
                      : 'border-dashed border-slate-300 text-slate-400'
                  }`}>
                    <span className="text-[8px] font-extrabold rotate-90">FOAM</span>
                  </div>

                  {/* Assembly complete visual banner */}
                  {assemblyComplete ? (
                    <div className="absolute inset-0 bg-white/95 rounded-[35px] flex flex-col items-center justify-center p-4 border-2 border-emerald-500 shadow-xl animate-fadeIn">
                      <h4 className="text-xs font-extrabold mt-1 text-emerald-600 tracking-wider">CONGRATULATIONS!</h4>
                      <p className="text-[10px] text-slate-700 font-medium text-center mt-1 max-w-[200px]">
                        Your VR headset is fully assembled and ready to use!
                      </p>
                      <button 
                        onClick={resetAssembly}
                        className="mt-3 px-3 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-[9px] font-bold text-slate-800 transition-colors"
                      >
                        Reset Workbench
                      </button>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-transparent pointer-events-none flex items-center justify-center">
                      <span className="text-[9px] bg-white/90 px-2.5 py-1 border border-blue-200 text-blue-800 font-bold rounded shadow-sm">
                        Attach {4 - Object.values(assembledParts).filter(Boolean).length} more parts!
                      </span>
                    </div>
                  )}

                </div>

              </div>

              {/* Status bar */}
              <div className="border-t border-slate-100 pt-2 flex justify-between items-center">
                <div className="flex gap-1">
                  {['display', 'lenses', 'imu', 'cushion'].map(key => (
                    <div 
                      key={key}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        assembledParts[key] ? 'bg-emerald-500 shadow-sm' : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
                
                {assemblyComplete ? (
                  <span className="text-[10px] text-emerald-600 font-extrabold flex items-center gap-1">
                    HEADSET INTEGRATION SUCCESSFUL
                  </span>
                ) : (
                  <span className="text-[10px] text-amber-600 font-extrabold flex items-center gap-1">
                    Setup incomplete. Please insert all parts.
                  </span>
                )}
              </div>

            </div>
          </div>

        </div>
      )}

      {/* ======================= TAB 3: COLOR MIXER LAB ======================= */}
      {activeTab === 'color' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 relative z-10">
          <div className="bg-white/95 border border-blue-100 rounded-2xl p-4 space-y-4 shadow-sm">
            <h3 className="text-xs font-extrabold tracking-wider text-blue-700 uppercase">
              RGB Light Sliders
            </h3>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-rose-600 font-extrabold">
                  <span>Red Light</span>
                  <span>{redLight}</span>
                </div>
                <input 
                  type="range" min="0" max="255" value={redLight}
                  onChange={(e) => setRedLight(parseInt(e.target.value))}
                  className="w-full h-2 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-rose-600"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-emerald-600 font-extrabold">
                  <span>Green Light</span>
                  <span>{greenLight}</span>
                </div>
                <input 
                  type="range" min="0" max="255" value={greenLight}
                  onChange={(e) => setGreenLight(parseInt(e.target.value))}
                  className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-sky-600 font-extrabold">
                  <span>Blue Light</span>
                  <span>{blueLight}</span>
                </div>
                <input 
                  type="range" min="0" max="255" value={blueLight}
                  onChange={(e) => setBlueLight(parseInt(e.target.value))}
                  className="w-full h-2 bg-sky-100 rounded-lg appearance-none cursor-pointer accent-sky-600"
                />
              </div>
            </div>

            <div className="bg-blue-50/80 p-3 rounded-xl border border-blue-200 text-[11px] text-slate-700 space-y-1 font-medium">
              <div className="font-extrabold text-blue-900">Color Formulas:</div>
              <div>Red + Green = Yellow</div>
              <div>Green + Blue = Cyan</div>
              <div>Red + Blue = Magenta</div>
              <div>Red + Green + Blue = White Light</div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white border border-blue-100 rounded-2xl p-5 flex flex-col items-center justify-center min-h-[300px] text-center shadow-sm">
            <span className="text-xs text-slate-500 font-extrabold mb-4 uppercase tracking-wider">MIXED LIGHT OUTPUT</span>
            
            {/* The mixed color bulb */}
            <div 
              className="w-32 h-32 rounded-full border-4 border-white shadow-xl transition-all duration-150 mb-4"
              style={{ 
                backgroundColor: `rgb(${redLight}, ${greenLight}, ${blueLight})`,
                boxShadow: `0 8px 30px rgba(${redLight}, ${greenLight}, ${blueLight}, 0.4)`
              }}
            />

            <span className="text-sm font-extrabold text-slate-800 px-4 py-1.5 bg-slate-100 border border-slate-200 rounded-xl">
              RGB: ({redLight}, {greenLight}, {blueLight})
            </span>
            <p className="text-slate-600 font-medium text-xs mt-3 max-w-sm">
              VR screens use tiny Red, Green, and Blue subpixels close to each other. When they glow together, your eye mixes them to see this output.
            </p>
          </div>
        </div>
      )}

      {/* ======================= TAB 4: 3D MAGIC DEPTH LAB ======================= */}
      {activeTab === 'depth' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 relative z-10">
          <div className="bg-white/95 border border-blue-100 rounded-2xl p-4 space-y-4 shadow-sm">
            <h3 className="text-xs font-extrabold tracking-wider text-blue-700 uppercase">
              3D Offset Slider
            </h3>
            <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
              VR feeds slightly shifted images to each eye to trick your brain into seeing depth.
            </p>

            <div className="space-y-2">
              <span className="block text-xs font-extrabold text-slate-800">Adjust 3D Shift</span>
              <input 
                type="range" min="0" max="40" value={depthOffset}
                onChange={(e) => setDepthOffset(parseInt(e.target.value))}
                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="bg-blue-50/80 p-3 rounded-xl border border-blue-200 text-[11px] text-slate-700 font-medium">
              <div className="font-extrabold text-blue-900 mb-1">Status:</div>
              {depthOffset === 0 ? (
                <span className="text-rose-600 font-bold">Flat 2D View - No 3D depth</span>
              ) : depthOffset > 15 && depthOffset < 25 ? (
                <span className="text-emerald-600 font-extrabold">Optimal 3D Separation</span>
              ) : (
                <span className="text-blue-600 font-bold">Strong 3D Separation</span>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 bg-white border border-blue-100 rounded-2xl p-5 flex flex-col items-center justify-center min-h-[300px] overflow-hidden relative shadow-sm">
            <span className="text-xs text-slate-500 font-extrabold mb-4 uppercase tracking-wider">SIMULATED 3D STEREOSCOPY</span>
            
            {/* Stereoscopic overlays container */}
            <div className="w-72 h-40 bg-slate-900 border border-slate-800 rounded-xl relative flex items-center justify-center shadow-inner">
              
              {/* Left eye image (Red) */}
              <div 
                className="absolute transition-all duration-75 flex flex-col items-center justify-center"
                style={{ 
                  transform: `translateX(${-depthOffset}px)`, 
                  color: 'rgba(239, 68, 68, 0.8)',
                  mixBlendMode: 'screen' 
                }}
              >
                <div className="w-16 h-16 border-4 border-current rounded-xl flex items-center justify-center font-bold text-2xl">
                  3D
                </div>
                <span className="text-[9px] font-mono mt-1 font-bold">LEFT EYE</span>
              </div>

              {/* Right eye image (Cyan) */}
              <div 
                className="absolute transition-all duration-75 flex flex-col items-center justify-center"
                style={{ 
                  transform: `translateX(${depthOffset}px)`, 
                  color: 'rgba(6, 182, 212, 0.8)',
                  mixBlendMode: 'screen' 
                }}
              >
                <div className="w-16 h-16 border-4 border-current rounded-xl flex items-center justify-center font-bold text-2xl">
                  3D
                </div>
                <span className="text-[9px] font-mono mt-1 font-bold">RIGHT EYE</span>
              </div>

            </div>

            <p className="text-slate-600 font-medium text-xs mt-4 max-w-sm text-center">
              Slide to separate the images. In VR, lenses send the Red image to your left eye and Cyan image to your right eye to create pop-out depth.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};

export default VrVirtualLab;
