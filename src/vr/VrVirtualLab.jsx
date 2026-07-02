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
