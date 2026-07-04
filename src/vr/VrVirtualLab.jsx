import React, { useState, useEffect, useRef } from 'react';
import { Sliders } from 'lucide-react';

const VrVirtualLab = () => {
  const [activeTab, setActiveTab] = useState('optics'); // 'optics' | 'color'
  
  // Tab 1: Optics State
  const [lensDist, setLensDist] = useState(70); 
  const [ipd, setIpd] = useState(64); 
  const [refreshRate, setRefreshRate] = useState(90); 
  const [foveatedMode, setFoveatedMode] = useState(true);
  const [gazePoint, setGazePoint] = useState({ x: 130, y: 65 });

  // Tab 2: Color Mixer State
  const [redLight, setRedLight] = useState(255);
  const [greenLight, setGreenLight] = useState(0);
  const [blueLight, setBlueLight] = useState(255);

  const canvasRef = useRef(null);
  const latencyCanvasRef = useRef(null);

  // Ray tracing canvas renderer for Tab 1 (Super High-DPI Crisp Rendering)
  useEffect(() => {
    if (activeTab !== 'optics') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // 4x supersampling via High-DPI scaling to completely eliminate blur and pixelation
    const dpr = Math.max(window.devicePixelRatio || 1, 2) * 2;
    const logicalWidth = 540;
    const logicalHeight = 240;

    canvas.width = logicalWidth * dpr;
    canvas.height = logicalHeight * dpr;
    canvas.style.width = '100%';
    canvas.style.height = 'auto';
    canvas.style.aspectRatio = '540 / 240';

    ctx.save();
    ctx.scale(dpr, dpr);

    // Dark high-contrast background
    ctx.fillStyle = '#080e1e';
    ctx.fillRect(0, 0, logicalWidth, logicalHeight);

    // Subtle ambient radial glow behind optical components
    const bgGlow = ctx.createRadialGradient(270, 120, 10, 270, 120, 220);
    bgGlow.addColorStop(0, 'rgba(30, 58, 138, 0.3)');
    bgGlow.addColorStop(0.6, 'rgba(15, 23, 42, 0.15)');
    bgGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = bgGlow;
    ctx.fillRect(0, 0, logicalWidth, logicalHeight);

    // Ultra-crisp grid lines
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.35)';
    ctx.lineWidth = 0.75;
    for (let x = 0; x <= logicalWidth; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, logicalHeight);
      ctx.stroke();
    }
    for (let y = 0; y <= logicalHeight; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(logicalWidth, y);
      ctx.stroke();
    }

    // 1. Draw VR Screen (Right Side)
    const screenX = 460;
    
    ctx.save();
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 12;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(screenX, 40, 20, 160);
    ctx.restore();

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(screenX, 40, 20, 160);
    
    // Vivid RGB subpixel gradient on the screen
    const screenGrad = ctx.createLinearGradient(screenX, 40, screenX, 200);
    screenGrad.addColorStop(0, '#ff2a5f'); 
    screenGrad.addColorStop(0.5, '#00e599'); 
    screenGrad.addColorStop(1, '#6366f1'); 
    ctx.fillStyle = screenGrad;
    ctx.fillRect(screenX + 3, 43, 14, 154);

    // Crisp label badge for VR Screen
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.fillRect(screenX - 22, 14, 68, 18);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
    ctx.lineWidth = 1;
    ctx.strokeRect(screenX - 22, 14, 68, 18);

    ctx.fillStyle = '#38bdf8';
    ctx.font = '700 10px "Inter", "Segoe UI", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("VR SCREEN", screenX + 12, 27);
    ctx.textAlign = 'left';

    // 2. Draw Magic Glass Lens
    const lensX = screenX - 60 - (lensDist - 30) * 1.6;
    
    ctx.save();
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.moveTo(lensX, 40);
    ctx.quadraticCurveTo(lensX + 20, 120, lensX, 200);
    ctx.quadraticCurveTo(lensX - 20, 120, lensX, 40);
    ctx.closePath();
    
    const lensGrad = ctx.createLinearGradient(lensX - 15, 40, lensX + 15, 200);
    lensGrad.addColorStop(0, 'rgba(56, 189, 248, 0.55)');
    lensGrad.addColorStop(0.5, 'rgba(14, 165, 233, 0.18)');
    lensGrad.addColorStop(1, 'rgba(56, 189, 248, 0.55)');
    ctx.fillStyle = lensGrad;
    ctx.fill();

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.restore();

    // Specular glass reflection curve inside lens
    ctx.beginPath();
    ctx.moveTo(lensX - 4, 60);
    ctx.quadraticCurveTo(lensX + 5, 120, lensX - 4, 180);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Label for LENS
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.fillRect(lensX - 20, 14, 40, 18);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
    ctx.lineWidth = 1;
    ctx.strokeRect(lensX - 20, 14, 40, 18);

    ctx.fillStyle = '#38bdf8';
    ctx.font = '700 10px "Inter", "Segoe UI", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("LENS", lensX, 27);
    ctx.textAlign = 'left';

    // 3. Draw Kid's Eye
    const eyeX = 80;
    const eyeY = 120;
    
    // Label badge for YOUR EYE
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.fillRect(eyeX - 35, eyeY - 56, 70, 18);
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.45)';
    ctx.lineWidth = 1;
    ctx.strokeRect(eyeX - 35, eyeY - 56, 70, 18);

    ctx.fillStyle = '#f1f5f9';
    ctx.font = '700 10px "Inter", "Segoe UI", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("YOUR EYE", eyeX, eyeY - 43);
    ctx.textAlign = 'left';

    // White sclera with shadow shading
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 8;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(eyeX, eyeY, 32, -Math.PI / 4, Math.PI / 4, true);
    ctx.arc(eyeX - 44, eyeY, 32, Math.PI / 4, -Math.PI / 4, true);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Iris with realistic radial gradient
    const irisGrad = ctx.createRadialGradient(eyeX + 6, eyeY, 2, eyeX + 6, eyeY, 16);
    irisGrad.addColorStop(0, '#38bdf8');
    irisGrad.addColorStop(1, '#0284c7');
    ctx.fillStyle = irisGrad;
    ctx.beginPath();
    ctx.arc(eyeX + 6, eyeY, 16, 0, Math.PI * 2);
    ctx.fill();
    
    // Pupil
    ctx.fillStyle = '#020617';
    ctx.beginPath();
    ctx.arc(eyeX + 8, eyeY, 8.5, 0, Math.PI * 2);
    ctx.fill();

    // Corneal reflection sparkle
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(eyeX + 5, eyeY - 5, 3, 0, Math.PI * 2);
    ctx.fill();

    // 4. Trace Laser Light Rays
    const isOptimal = Math.abs(lensDist - 70) <= 5;
    const rayColors = ['#ff2a5f', '#00e599', '#6366f1'];
    const sourcesY = [60, 120, 180];
    
    sourcesY.forEach((sy, index) => {
      ctx.save();
      ctx.strokeStyle = rayColors[index];
      ctx.lineWidth = 2.5;
      ctx.shadowColor = rayColors[index];
      ctx.shadowBlur = 10;
      
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
      ctx.restore();

      // Inside eyeball refraction paths
      let retinaTargetY = eyeY - (sy - eyeY) * 0.4;
      if (!isOptimal) {
        retinaTargetY = eyeY - (targetY1 - eyeY) * 0.55;
      }
      ctx.strokeStyle = rayColors[index] + '90'; 
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(eyeX + 8, targetY1);
      ctx.lineTo(eyeX - 12, retinaTargetY);
      ctx.stroke();

      // Draw light focus dots on retina
      ctx.save();
      if (isOptimal) {
        ctx.fillStyle = '#00e599';
        ctx.shadowColor = '#00e599';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(eyeX - 12, retinaTargetY, 3.5, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = '#ff2a5f';
        ctx.shadowColor = '#ff2a5f';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(eyeX - 12, retinaTargetY, 6.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    // Focus status top banner
    ctx.save();
    if (isOptimal) {
      ctx.shadowColor = 'rgba(16, 185, 129, 0.4)';
      ctx.shadowBlur = 14;
      ctx.fillStyle = '#059669';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(150, 10, 240, 26, 8);
      else ctx.fillRect(150, 10, 240, 26);
      ctx.fill();
      
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 1.5;
      if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(150, 10, 240, 26, 8); ctx.stroke(); }
      else ctx.strokeRect(150, 10, 240, 26);

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 11px "Inter", "Segoe UI", system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText("✓ PERFECT FOCUS! (Crisp on Retina)", 270, 27);
    } else {
      ctx.shadowColor = 'rgba(239, 68, 68, 0.4)';
      ctx.shadowBlur = 14;
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(150, 10, 240, 26, 8);
      else ctx.fillRect(150, 10, 240, 26);
      ctx.fill();
      
      ctx.strokeStyle = '#f87171';
      ctx.lineWidth = 1.5;
      if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(150, 10, 240, 26, 8); ctx.stroke(); }
      else ctx.strokeRect(150, 10, 240, 26);

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 11px "Inter", "Segoe UI", system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(lensDist > 70 ? "⚠ BLURRY: Lens Too Far Away" : "⚠ BLURRY: Lens Too Close", 270, 27);
    }
    ctx.restore();
    ctx.restore();

  }, [lensDist, activeTab]);

  // Frametime visual graph (High-DPI Supersampled)
  useEffect(() => {
    if (activeTab !== 'optics') return;
    const canvas = latencyCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let frameTimes = Array(25).fill(11);

    const drawLatency = () => {
      const dpr = Math.max(window.devicePixelRatio || 1, 2) * 2;
      const logicalWidth = 120;
      const logicalHeight = 50;
      
      canvas.width = logicalWidth * dpr;
      canvas.height = logicalHeight * dpr;
      canvas.style.width = '100%';
      canvas.style.height = '50px';

      ctx.save();
      ctx.scale(dpr, dpr);

      ctx.fillStyle = '#080e1e';
      ctx.fillRect(0, 0, logicalWidth, logicalHeight);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, logicalHeight / 2);
      ctx.lineTo(logicalWidth, logicalHeight / 2);
      ctx.stroke();

      const targetMs = refreshRate === 120 ? 8 : refreshRate === 90 ? 11 : 16;
      frameTimes.shift();
      const nextTime = targetMs + (Math.random() - 0.5) * 0.8;
      frameTimes.push(nextTime);

      const lineColor = refreshRate === 120 ? '#00e599' : refreshRate === 90 ? '#38bdf8' : '#ff2a5f';
      ctx.strokeStyle = lineColor;
      ctx.shadowColor = lineColor;
      ctx.shadowBlur = 6;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      frameTimes.forEach((time, index) => {
        const x = (index / (frameTimes.length - 1)) * logicalWidth;
        const y = logicalHeight - (time / 22) * logicalHeight;
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.restore();

      animId = requestAnimationFrame(drawLatency);
    };

    drawLatency();
    return () => cancelAnimationFrame(animId);
  }, [refreshRate, activeTab]);

  const handleFoveatedClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setGazePoint({ x, y });
  };

  return (
    <div className="bg-gradient-to-br from-blue-50/90 via-indigo-50/70 to-purple-50/90 border-2 border-blue-200 text-slate-800 rounded-3xl p-5 shadow-xl relative overflow-hidden font-sans">
      
      {/* Soft background pastel accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-rose-400/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-400/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Header controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-blue-200/80 pb-4 mb-5 relative z-10">
        <div>
          
          <h2 className="text-lg md:text-xl font-extrabold text-slate-900 mt-1.5 tracking-tight">
            Explore interactive optics and color mixing simulations.
          </h2>
         
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
            onClick={() => setActiveTab('color')}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
              activeTab === 'color' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/50'
            }`}
          >
            Color Mixer Lab
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
              <div className="flex justify-between items-center">
                <span className="block text-xs font-bold text-slate-800">Screen Smoothness</span>
                <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {refreshRate} Hz
                </span>
              </div>
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
                    {hz === 60 ? 'Slow (60)' : hz === 90 ? 'Fast (90)' : 'Super (120)'}
                  </button>
                ))}
              </div>
              <div className="mt-2.5 bg-slate-950 rounded-xl p-2.5 border border-slate-800 flex items-center justify-between shadow-inner">
                <div className="flex flex-col">
                  <span className="text-[9.5px] font-extrabold text-slate-400 uppercase tracking-wider">Frame Time</span>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {refreshRate === 120 ? '8.3 ms' : refreshRate === 90 ? '11.1 ms' : '16.6 ms'}
                  </span>
                </div>
                <canvas ref={latencyCanvasRef} className="w-28 h-9 block rounded border border-slate-800" />
              </div>
            </div>
          </div>

          {/* Canvas optics grid */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border border-blue-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-blue-50/90 px-4 py-2 border-b border-blue-100 flex justify-between items-center text-[11px] font-extrabold text-blue-900 tracking-wide">
                <span>OPTICAL BENCH: LIGHT REFRACTION</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> ONLINE (HD)</span>
              </div>
              <canvas ref={canvasRef} className="w-full block" />
            </div>
          </div>

        </div>
      )}

      {/* ======================= TAB 2: COLOR MIXER LAB ======================= */}
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

    </div>
  );
};

export default VrVirtualLab;
