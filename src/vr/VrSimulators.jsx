import React, { useState, useEffect, useRef } from 'react';
import { 
  Rocket, Eye, Shield, Maximize2, Minimize2, 
  Info, CheckCircle2, RotateCcw, Orbit, Globe
} from 'lucide-react';

const VrSimulators = () => {
  const [activeSim, setActiveSim] = useState('space'); // 'space' | 'ocean'
  const [isVrMode, setIsVrMode] = useState(false); // Stereoscopic SBS Mode
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => console.error(err));
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  return (
    <div 
      className={`transition-all relative overflow-hidden ${
        isFullscreen 
          ? 'fixed inset-0 w-screen h-screen bg-black z-50 p-0 rounded-none border-0 flex flex-col' 
          : 'bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xl'
      }`} 
      ref={containerRef}
    >
      {/* Background soft glows - only in window mode */}
      {!isFullscreen && (
        <>
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
        </>
      )}

      {/* Header controls - Hidden when in Fullscreen so zero text appears */}
      {!isFullscreen && (
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <span className="px-3 py-1 bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold rounded-full tracking-wider uppercase">
              360° Immersive Labs
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 mt-2 tracking-tight">
              Interactive VR Simulation Hub
            </h2>
            <p className="text-slate-500 text-xs md:text-sm mt-1">
              Drag to look around in 360°. Toggle VR mode to view through Cardboard/VR headsets.
            </p>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <button 
              onClick={() => setIsVrMode(!isVrMode)}
              className={`px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 transition-all active:scale-95 border ${
                isVrMode 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Eye size={14} /> {isVrMode ? 'VR Mode Active' : 'Enable SBS VR Mode'}
            </button>
            
            <button 
              onClick={toggleFullscreen}
              className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-full transition-colors active:scale-95"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
          </div>
        </div>
      )}

      {/* Simulator Navigation Tabs - Hidden when in Fullscreen */}
      {!isFullscreen && (
        <div className="relative z-10 flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-200">
          <button 
            onClick={() => setActiveSim('space')}
            className={`px-5 py-3 rounded-2xl font-bold text-xs flex items-center gap-2.5 transition-all shrink-0 border ${
              activeSim === 'space'
                ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            <Rocket size={14} /> Space 360°
          </button>

          <button 
            onClick={() => setActiveSim('ocean')}
            className={`px-5 py-3 rounded-2xl font-bold text-xs flex items-center gap-2.5 transition-all shrink-0 border ${
              activeSim === 'ocean'
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            <Shield size={14} /> Deep Ocean Trench VR
          </button>
        </div>
      )}

      {/* Minimal icon-only exit fullscreen button without text */}
      {isFullscreen && (
        <button 
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 z-50 p-2.5 bg-black/40 hover:bg-black/80 text-white/70 hover:text-white rounded-full border border-white/20 backdrop-blur transition-all"
          title="Exit Fullscreen"
        >
          <Minimize2 size={16} />
        </button>
      )}

      {/* Simulation Container */}
      <div className={`relative z-10 w-full bg-black overflow-hidden flex-1 ${
        isFullscreen ? 'h-full min-h-screen rounded-none border-0' : 'rounded-2xl border border-slate-200 min-h-[380px] sm:min-h-[450px] md:min-h-[520px]'
      }`}>
        {activeSim === 'space' && <SpaceSimulator isVrMode={isVrMode} isFullscreen={isFullscreen} />}
        {activeSim === 'ocean' && <OceanSimulator isVrMode={isVrMode} isFullscreen={isFullscreen} />}
      </div>
    </div>
  );
};

/* =========================================================================
   1. Space Orbit & Milky Way Simulator Component
   ========================================================================= */
const SpaceSimulator = ({ isVrMode, isFullscreen }) => {
  const canvasRef = useRef(null);
  const [viewMode, setViewMode] = useState('system'); // 'system' | 'galaxy'
  const [activeObject, setActiveObject] = useState(null);
  const zoom = 1.0; // Fixed zoom level
  const isDragging = useRef(false);
  const prevMousePos = useRef({ x: 0, y: 0 });
  const cameraAngle = useRef({ yaw: 0, pitch: 0 });
  const timeRef = useRef(0);

  const planets = [
    { 
      name: 'Mercury', 
      color: '#9ca3af', 
      dist: 70, 
      size: 3.5, 
      speed: 0.035, 
      desc: 'Smallest and closest planet to the Sun. It experiences extreme temperature swings from baking hot days to freezing cold nights.',
      moons: []
    },
    { 
      name: 'Venus', 
      color: '#f59e0b', 
      dist: 100, 
      size: 6.5, 
      speed: 0.026, 
      desc: 'Hottest planet in our solar system with a thick toxic atmosphere of greenhouse gases.',
      moons: []
    },
    { 
      name: 'Earth', 
      color: '#3b82f6', 
      dist: 135, 
      size: 7, 
      speed: 0.018, 
      desc: 'Our home planet and only known harbor of life, covered in liquid water oceans.',
      moons: [
        { name: 'Luna', dist: 13, size: 1.5, speed: 0.065, color: '#d1d5db' }
      ]
    },
    { 
      name: 'Mars', 
      color: '#ef4444', 
      dist: 170, 
      size: 5.5, 
      speed: 0.013, 
      desc: 'The rusty-red desert planet hosting ancient dry river beds and massive volcanoes.',
      moons: [
        { name: 'Phobos', dist: 9, size: 0.9, speed: 0.08, color: '#a1a1aa' },
        { name: 'Deimos', dist: 13, size: 0.7, speed: 0.055, color: '#71717a' }
      ]
    },
    { 
      name: 'Jupiter', 
      color: '#ea580c', 
      dist: 215, 
      size: 14, 
      speed: 0.007, 
      desc: 'Largest gas giant with active stormy belts and the famous Great Red Spot storm.',
      moons: [
        { name: 'Io', dist: 22, size: 1.4, speed: 0.045, color: '#facc15' },
        { name: 'Europa', dist: 26, size: 1.2, speed: 0.035, color: '#93c5fd' },
        { name: 'Ganymede', dist: 31, size: 1.8, speed: 0.025, color: '#cbd5e1' },
        { name: 'Callisto', dist: 36, size: 1.6, speed: 0.018, color: '#64748b' }
      ]
    },
    { 
      name: 'Saturn', 
      color: '#eab308', 
      dist: 265, 
      size: 11.5, 
      speed: 0.005, 
      desc: 'Famous for its spectacular ice and rock ring system, Saturn has over 140 moons.', 
      rings: true,
      moons: [
        { name: 'Titan', dist: 24, size: 2.1, speed: 0.03, color: '#fbbf24' },
        { name: 'Rhea', dist: 30, size: 1.2, speed: 0.02, color: '#cbd5e1' }
      ]
    },
    { 
      name: 'Uranus', 
      color: '#06b6d4', 
      dist: 315, 
      size: 8.5, 
      speed: 0.003, 
      desc: 'An ice giant tilted completely on its side with faint vertical rings.', 
      verticalRings: true,
      moons: [
        { name: 'Titania', dist: 18, size: 1.1, speed: 0.035, color: '#cbd5e1' },
        { name: 'Oberon', dist: 22, size: 1.0, speed: 0.025, color: '#cbd5e1' }
      ]
    },
    { 
      name: 'Neptune', 
      color: '#2563eb', 
      dist: 360, 
      size: 8.5, 
      speed: 0.0025, 
      desc: 'Deep blue gas giant experiencing supersonic storm winds and frozen ice chemistry.',
      moons: [
        { name: 'Triton', dist: 18, size: 1.3, speed: -0.03, color: '#93c5fd' }
      ]
    },
  ];

  const galaxyHotspots = [
    { 
      name: 'Sagittarius A*', 
      x: 0, 
      y: 0, 
      z: 0, 
      color: '#a855f7', 
      desc: 'The supermassive black hole at the center of the Milky Way, holding 4.1 million solar masses.',
      stats: { dist: '26,000 ly', mass: '4.1M Suns', type: 'Supermassive BH' }
    },
    { 
      name: 'Sun / Orion Arm', 
      x: 120, 
      y: 0, 
      z: 120, 
      color: '#f59e0b', 
      desc: 'Our solar system resides inside the Orion Spur, approximately 26,000 light years from the core.',
      stats: { dist: '0 ly', mass: '1.0 Sun', type: 'Yellow Dwarf System' }
    },
    { 
      name: 'Pillars of Creation', 
      x: -80, 
      y: 20, 
      z: -100, 
      color: '#10b981', 
      desc: 'A majestic star-forming region of gas columns inside the Eagle Nebula.',
      stats: { dist: '6,500 ly', mass: 'N/A', type: 'Emission Nebula' }
    }
  ];

  const starsRef = useRef([]);
  if (starsRef.current.length === 0) {
    for (let i = 0; i < 350; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      starsRef.current.push({
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.sin(phi) * Math.sin(theta),
        z: Math.cos(phi),
        brightness: Math.random() * 0.75 + 0.25,
        twinkleSpeed: 0.01 + Math.random() * 0.03
      });
    }
  }

  // Pre-generate mini spiral galaxies for background depth in Solar System & Galaxy views
  const miniGalaxiesRef = useRef([]);
  if (miniGalaxiesRef.current.length === 0) {
    const colors = [
      { c1: '#c084fc', c2: '#a855f7' }, // Purple
      { c1: '#38bdf8', c2: '#0284c7' }, // Blue
      { c1: '#fbcfe8', c2: '#ec4899' }, // Pink
      { c1: '#99f6e4', c2: '#0d9488' }  // Teal
    ];
    for (let i = 0; i < 8; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      miniGalaxiesRef.current.push({
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.sin(phi) * Math.sin(theta),
        z: Math.cos(phi),
        size: 16 + Math.random() * 14,
        angle: Math.random() * Math.PI * 2,
        rotSpeed: 0.002 + Math.random() * 0.003,
        colors: colors[i % colors.length]
      });
    }
  }

  const galaxyStarsRef = useRef([]);
  if (galaxyStarsRef.current.length === 0) {
    const armsCount = 4;
    for (let i = 0; i < 1800; i++) {
      const armIndex = i % armsCount;
      const dist = Math.pow(Math.random(), 1.5) * 260;
      const angle = (dist * 0.02) + (armIndex * (Math.PI * 2 / armsCount)) + (Math.random() * 0.25 - 0.12);
      galaxyStarsRef.current.push({
        x: Math.cos(angle) * dist,
        y: (Math.random() - 0.5) * (30 * (1 - dist / 260)),
        z: Math.sin(angle) * dist,
        size: Math.random() * 1.2 + 0.4,
        colorIndex: Math.floor(dist / 65)
      });
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const render = () => {
      const width = canvas.width = canvas.parentElement.clientWidth;
      const height = canvas.height = canvas.parentElement.clientHeight;
      timeRef.current += 0.45;
      const time = timeRef.current;

      const drawViewport = (viewX, viewWidth, stereoOffset) => {
        ctx.save();
        ctx.beginPath();
        ctx.rect(viewX, 0, viewWidth, height);
        ctx.clip();

        ctx.fillStyle = '#020617';
        ctx.fillRect(viewX, 0, viewWidth, height);

        const centerX = viewX + viewWidth / 2;
        const centerY = height / 2;

        const yaw = cameraAngle.current.yaw + stereoOffset;
        const pitch = cameraAngle.current.pitch;

        // Draw realistic Milky Way cosmic background nebula (screen blend mode)
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        
        // Define beautiful colorful nebulae
        const nebulaCenters = [
          { yaw: 0.6, pitch: 0.25, color: 'rgba(124, 58, 237, 0.11)', size: viewWidth * 0.6 },  // Violet
          { yaw: -0.8, pitch: -0.3, color: 'rgba(29, 78, 216, 0.09)', size: viewWidth * 0.8 },   // Deep Blue
          { yaw: 2.4, pitch: 0.15, color: 'rgba(219, 39, 119, 0.07)', size: viewWidth * 0.5 },  // Pink
          { yaw: -2.3, pitch: 0.35, color: 'rgba(217, 119, 6, 0.05)', size: viewWidth * 0.6 }   // Dust Orange
        ];

        nebulaCenters.forEach((neb) => {
          let diffX = neb.yaw - yaw;
          while (diffX < -Math.PI) diffX += Math.PI * 2;
          while (diffX > Math.PI) diffX -= Math.PI * 2;
          let diffY = neb.pitch - pitch;

          const nX = centerX + diffX * (viewWidth * 1.15);
          const nY = centerY + diffY * (height * 1.0);

          const radGrad = ctx.createRadialGradient(nX, nY, 0, nX, nY, neb.size);
          radGrad.addColorStop(0, neb.color);
          radGrad.addColorStop(0.3, neb.color.replace('0.1', '0.04').replace('0.09', '0.03'));
          radGrad.addColorStop(1, 'rgba(0,0,0,0)');
          
          ctx.fillStyle = radGrad;
          ctx.beginPath();
          ctx.arc(nX, nY, neb.size, 0, Math.PI * 2);
          ctx.fill();
        });

        // Glowing Milky Way dust lane
        for (let angle = -Math.PI; angle <= Math.PI; angle += 0.08) {
          const bandPitch = Math.sin(angle) * 0.22 + 0.05;
          let diffX = angle - yaw;
          while (diffX < -Math.PI) diffX += Math.PI * 2;
          while (diffX > Math.PI) diffX -= Math.PI * 2;
          let diffY = bandPitch - pitch;

          const bX = centerX + diffX * (viewWidth * 1.15);
          const bY = centerY + diffY * (height * 1.0);

          const glowSize = (110 + Math.cos(angle * 4) * 30) * zoom;
          const radGrad = ctx.createRadialGradient(bX, bY, 0, bX, bY, glowSize);
          radGrad.addColorStop(0, 'rgba(139, 92, 246, 0.045)');
          radGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.02)');
          radGrad.addColorStop(1, 'rgba(0,0,0,0)');
          
          ctx.fillStyle = radGrad;
          ctx.beginPath();
          ctx.arc(bX, bY, glowSize, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        // Draw twinkling background stars
        ctx.fillStyle = '#ffffff';
        starsRef.current.forEach(star => {
          let x1 = star.x * Math.cos(yaw) - star.z * Math.sin(yaw);
          let z1 = star.x * Math.sin(yaw) + star.z * Math.cos(yaw);
          let y1 = star.y;
          let y2 = y1 * Math.cos(pitch) - z1 * Math.sin(pitch);
          let z2 = y1 * Math.sin(pitch) + z1 * Math.cos(pitch);

          if (z2 > 0) {
            const screenX = centerX + (x1 / z2) * (viewWidth * 0.85 * zoom);
            const screenY = centerY + (y2 / z2) * (viewWidth * 0.85 * zoom);
            
            // Twinkle effect based on sine wave
            const twinkle = Math.sin(time * star.twinkleSpeed + star.brightness * 10) * 0.2;
            ctx.globalAlpha = Math.max(0.15, Math.min(1.0, star.brightness + twinkle));
            
            ctx.beginPath();
            ctx.arc(screenX, screenY, Math.max(0.6, star.brightness * 1.6), 0, Math.PI * 2);
            ctx.fill();
          }
        });
        ctx.globalAlpha = 1.0;

        // Draw small mini galaxies (Milky Ways) in the background
        miniGalaxiesRef.current.forEach(gal => {
          let x1 = gal.x * Math.cos(yaw) - gal.z * Math.sin(yaw);
          let z1 = gal.x * Math.sin(yaw) + gal.z * Math.cos(yaw);
          let y1 = gal.y;
          let y2 = y1 * Math.cos(pitch) - z1 * Math.sin(pitch);
          let z2 = y1 * Math.sin(pitch) + z1 * Math.cos(pitch);

          if (z2 > 0) {
            const screenX = centerX + (x1 / z2) * (viewWidth * 0.85 * zoom);
            const screenY = centerY + (y2 / z2) * (viewWidth * 0.85 * zoom);
            const size = (gal.size / z2) * zoom;
            
            if (size > 1) {
              ctx.save();
              ctx.translate(screenX, screenY);
              ctx.rotate(gal.angle + time * gal.rotSpeed);
              ctx.scale(1, 0.45); // angled perspective
              
              // Core glow
              const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.45);
              coreGrad.addColorStop(0, '#ffffff');
              coreGrad.addColorStop(0.3, gal.colors.c1);
              coreGrad.addColorStop(1, 'rgba(0,0,0,0)');
              ctx.fillStyle = coreGrad;
              ctx.beginPath();
              ctx.arc(0, 0, size * 0.45, 0, Math.PI * 2);
              ctx.fill();
              
              // Spiral arms
              ctx.fillStyle = gal.colors.c2;
              const arms = 2;
              for (let a = 0; a < arms; a++) {
                const baseAngle = a * Math.PI;
                for (let j = 0; j < 30; j++) {
                  const dist = (j / 30) * size;
                  const theta = baseAngle + (dist * 0.22);
                  const px = Math.cos(theta) * dist;
                  const py = Math.sin(theta) * dist;
                  ctx.globalAlpha = (1 - dist / size) * 0.55;
                  ctx.beginPath();
                  ctx.arc(px, py, Math.max(0.4, (1 - dist / size) * 1.5), 0, Math.PI * 2);
                  ctx.fill();
                }
              }
              ctx.restore();
              ctx.globalAlpha = 1.0;
            }
          }
        });

        if (viewMode === 'system') {
          // Draw Sun with Realistic Corona & Rays
          let sunX = 0, sunY = 0, sunZ = 0;
          let sx1 = sunX * Math.cos(yaw) - sunZ * Math.sin(yaw);
          let sz1 = sunX * Math.sin(yaw) + sunZ * Math.cos(yaw);
          let sy1 = sunY;
          let sy2 = sy1 * Math.cos(pitch) - sz1 * Math.sin(pitch);
          let sz2 = sy1 * Math.sin(pitch) + sz1 * Math.cos(pitch);
          sz2 += 280;

          if (sz2 > 0) {
            const sunProjX = centerX + (sx1 / sz2) * (viewWidth * 0.85 * zoom);
            const sunProjY = centerY + (sy2 / sz2) * (viewWidth * 0.85 * zoom);
            const sunSize = (40 / sz2) * (viewWidth * 0.85 * zoom);

            // Sun Corona Rays
            ctx.save();
            ctx.globalCompositeOperation = 'screen';
            const raysCount = 12;
            for (let r = 0; r < raysCount; r++) {
              const rayAngle = (time * 0.005) + (r * (Math.PI * 2 / raysCount));
              const len = sunSize * (1.8 + Math.sin(time * 0.05 + r) * 0.25);
              ctx.strokeStyle = 'rgba(245, 158, 11, 0.12)';
              ctx.lineWidth = sunSize * 0.2;
              ctx.beginPath();
              ctx.moveTo(sunProjX, sunProjY);
              ctx.lineTo(sunProjX + Math.cos(rayAngle) * len, sunProjY + Math.sin(rayAngle) * len);
              ctx.stroke();
            }
            ctx.restore();

            // Sun Glow
            const glow = ctx.createRadialGradient(sunProjX, sunProjY, 0, sunProjX, sunProjY, sunSize * 2.3);
            glow.addColorStop(0, '#ffffff');
            glow.addColorStop(0.15, '#fef08a');
            glow.addColorStop(0.35, '#f59e0b');
            glow.addColorStop(0.65, 'rgba(239, 68, 68, 0.22)');
            glow.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(sunProjX, sunProjY, sunSize * 2.3, 0, Math.PI * 2);
            ctx.fill();
          }

          // Draw Planets & Moons
          planets.forEach((planet) => {
            // Draw Orbit ring
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.lineWidth = 1;
            for (let i = 0; i <= 64; i++) {
              const oAngle = (i / 64) * Math.PI * 2;
              const ox = Math.cos(oAngle) * planet.dist;
              const oz = Math.sin(oAngle) * planet.dist;
              
              let ox1 = ox * Math.cos(yaw) - oz * Math.sin(yaw);
              let oz1 = ox * Math.sin(yaw) + oz * Math.cos(yaw);
              let oy2 = -oz1 * Math.sin(pitch);
              let oz2 = oz1 * Math.cos(pitch) + 280;
              
              if (oz2 > 0) {
                 const optX = centerX + (ox1 / oz2) * (viewWidth * 0.85 * zoom);
                 const optY = centerY + (oy2 / oz2) * (viewWidth * 0.85 * zoom);
                 if (i === 0) ctx.moveTo(optX, optY);
                 else ctx.lineTo(optX, optY);
              }
            }
            ctx.stroke();

            const angle = time * planet.speed;
            const px = Math.cos(angle) * planet.dist;
            const pz = Math.sin(angle) * planet.dist;
            const py = 0;

            let rx1 = px * Math.cos(yaw) - pz * Math.sin(yaw);
            let rz1 = px * Math.sin(yaw) + pz * Math.cos(yaw);
            let ry1 = py;
            let ry2 = ry1 * Math.cos(pitch) - rz1 * Math.sin(pitch);
            let rz2 = ry1 * Math.sin(pitch) + rz1 * Math.cos(pitch);
            rz2 += 280;

            if (rz2 > 0) {
              const planetProjX = centerX + (rx1 / rz2) * (viewWidth * 0.85 * zoom);
              const planetProjY = centerY + (ry2 / rz2) * (viewWidth * 0.85 * zoom);
              const pSize = (planet.size / rz2) * (viewWidth * 0.85 * zoom);

              // Draw Rings (Saturn)
              if (planet.rings) {
                ctx.strokeStyle = 'rgba(251, 191, 36, 0.45)';
                ctx.lineWidth = Math.max(1.5, pSize * 0.28);
                ctx.save();
                ctx.translate(planetProjX, planetProjY);
                ctx.scale(1, 0.25);
                ctx.beginPath();
                ctx.arc(0, 0, pSize * 2.1, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
              }

              // Draw Vertical Rings (Uranus)
              if (planet.verticalRings) {
                ctx.strokeStyle = 'rgba(34, 211, 238, 0.3)';
                ctx.lineWidth = Math.max(1, pSize * 0.14);
                ctx.save();
                ctx.translate(planetProjX, planetProjY);
                ctx.scale(0.2, 1);
                ctx.beginPath();
                ctx.arc(0, 0, pSize * 1.9, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
              }

              // Planet Spherical Shading Gradient
              const grad = ctx.createRadialGradient(
                planetProjX - pSize/3, planetProjY - pSize/3, 0,
                planetProjX, planetProjY, pSize
              );
              grad.addColorStop(0, '#ffffff');
              grad.addColorStop(0.35, planet.color);
              grad.addColorStop(1, '#000000');

              ctx.fillStyle = grad;
              ctx.beginPath();
              ctx.arc(planetProjX, planetProjY, pSize, 0, Math.PI * 2);
              ctx.fill();

              // Draw planet atmosphere glow (realistic)
              if (planet.name === 'Earth' || planet.name === 'Neptune' || planet.name === 'Venus') {
                ctx.strokeStyle = planet.name === 'Earth' ? 'rgba(59, 130, 246, 0.35)' : planet.name === 'Neptune' ? 'rgba(37, 99, 235, 0.35)' : 'rgba(245, 158, 11, 0.25)';
                ctx.lineWidth = Math.max(1, pSize * 0.15);
                ctx.beginPath();
                ctx.arc(planetProjX, planetProjY, pSize + ctx.lineWidth/2, 0, Math.PI * 2);
                ctx.stroke();
              }

              // Draw Moons orbiting this planet
              if (planet.moons) {
                planet.moons.forEach((moon) => {
                  const mAngle = (time * moon.speed) + (planet.name.charCodeAt(0) * 10);
                  const mx = px + Math.cos(mAngle) * moon.dist;
                  const mz = pz + Math.sin(mAngle) * moon.dist;
                  const my = Math.sin(mAngle) * (moon.dist * 0.15); // Add a 3D tilt

                  let mx1 = mx * Math.cos(yaw) - mz * Math.sin(yaw);
                  let mz1 = mx * Math.sin(yaw) + mz * Math.cos(yaw);
                  let my1 = my;
                  let my2 = my1 * Math.cos(pitch) - mz1 * Math.sin(pitch);
                  let mz2 = my1 * Math.sin(pitch) + mz1 * Math.cos(pitch);
                  mz2 += 280;

                  if (mz2 > 0) {
                    const moonProjX = centerX + (mx1 / mz2) * (viewWidth * 0.85 * zoom);
                    const moonProjY = centerY + (my2 / mz2) * (viewWidth * 0.85 * zoom);
                    const mSize = (moon.size / mz2) * (viewWidth * 0.85 * zoom);

                    // Draw Moon Body
                    ctx.fillStyle = moon.color;
                    ctx.beginPath();
                    ctx.arc(moonProjX, moonProjY, Math.max(0.7, mSize), 0, Math.PI * 2);
                    ctx.fill();

                    // Moon shadow overlay
                    ctx.fillStyle = 'rgba(0,0,0,0.45)';
                    ctx.beginPath();
                    ctx.arc(moonProjX + mSize * 0.2, moonProjY + mSize * 0.2, mSize, -Math.PI/2, Math.PI/2);
                    ctx.fill();
                  }
                });
              }

              // Label
              ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
              ctx.font = 'bold 9px monospace';
              ctx.fillText(planet.name, planetProjX + pSize + 4, planetProjY + 3);
            }
          });
        } else {
          // Galaxy View (Zoom Out view of Milky Way)
          const galRotation = time * 0.002;
          let galX = 0, galY = 0, galZ = 280;
          let gx1 = galX * Math.cos(yaw) - galZ * Math.sin(yaw);
          let gz1 = galX * Math.sin(yaw) + galZ * Math.cos(yaw);
          let gy1 = galY;
          let gy2 = gy1 * Math.cos(pitch) - gz1 * Math.sin(pitch);
          let gz2 = gy1 * Math.sin(pitch) + gz1 * Math.cos(pitch);

          if (gz2 > 0) {
            const galProjX = centerX + (gx1 / gz2) * (viewWidth * 0.85 * zoom);
            const galProjY = centerY + (gy2 / gz2) * (viewWidth * 0.85 * zoom);
            const coreSize = (90 / gz2) * (viewWidth * 0.85 * zoom);

            const coreGlow = ctx.createRadialGradient(galProjX, galProjY, 0, galProjX, galProjY, coreSize);
            coreGlow.addColorStop(0, '#ffffff');
            coreGlow.addColorStop(0.2, '#fef08a');
            coreGlow.addColorStop(0.5, 'rgba(168,85,247,0.3)');
            coreGlow.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = coreGlow;
            ctx.beginPath();
            ctx.arc(galProjX, galProjY, coreSize, 0, Math.PI * 2);
            ctx.fill();
          }

          galaxyStarsRef.current.forEach((gStar) => {
            let rx = gStar.x * Math.cos(galRotation) - gStar.z * Math.sin(galRotation);
            let rz = gStar.x * Math.sin(galRotation) + gStar.z * Math.cos(galRotation) + 280;
            let ry = gStar.y;

            let rx1 = rx * Math.cos(yaw) - rz * Math.sin(yaw);
            let rz1 = rx * Math.sin(yaw) + rz * Math.cos(yaw);
            let ry1 = ry;
            let ry2 = ry1 * Math.cos(pitch) - rz1 * Math.sin(pitch);
            let rz2 = ry1 * Math.sin(pitch) + rz1 * Math.cos(pitch);

            if (rz2 > 0) {
              const screenX = centerX + (rx1 / rz2) * (viewWidth * 0.85 * zoom);
              const screenY = centerY + (ry2 / rz2) * (viewWidth * 0.85 * zoom);
              const size = (gStar.size / rz2) * (viewWidth * 0.85 * zoom);

              const colors = [
                '#ffffff',
                '#fbcfe8',
                '#c084fc',
                '#60a5fa',
                '#38bdf8'
              ];

              ctx.fillStyle = colors[gStar.colorIndex] || '#ffffff';
              ctx.globalAlpha = Math.max(0.1, 1 - (rz2 / 500));
              ctx.beginPath();
              ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
              ctx.fill();
            }
          });
          ctx.globalAlpha = 1.0;

          // Upgraded sci-fi marks on Milky Way Galaxy map
          galaxyHotspots.forEach((spot) => {
            let sx = spot.x * Math.cos(galRotation) - spot.z * Math.sin(galRotation);
            let sz = spot.x * Math.sin(galRotation) + spot.z * Math.cos(galRotation) + 280;
            let sy = spot.y;

            let rx1 = sx * Math.cos(yaw) - sz * Math.sin(yaw);
            let rz1 = sx * Math.sin(yaw) + sz * Math.cos(yaw);
            let ry1 = sy;
            let ry2 = ry1 * Math.cos(pitch) - rz1 * Math.sin(pitch);
            let rz2 = ry1 * Math.sin(pitch) + rz1 * Math.cos(pitch);

            if (rz2 > 0) {
              const screenX = centerX + (rx1 / rz2) * (viewWidth * 0.85 * zoom);
              const screenY = centerY + (ry2 / rz2) * (viewWidth * 0.85 * zoom);
              const hSize = (8 / rz2) * (viewWidth * 0.85 * zoom);

              // 1. Radar Ring Pulsing
              const pulse = Math.sin(Date.now() * 0.004) * 4 + 6;
              ctx.strokeStyle = spot.color;
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.arc(screenX, screenY, hSize + pulse, 0, Math.PI * 2);
              ctx.stroke();

              // 2. Crosshair Target corners
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
              ctx.lineWidth = 1;
              for (let r = 0; r < 4; r++) {
                const rot = r * Math.PI / 2;
                ctx.save();
                ctx.translate(screenX, screenY);
                ctx.rotate(rot);
                ctx.beginPath();
                ctx.moveTo(hSize + 3, -2);
                ctx.lineTo(hSize + 3, -3);
                ctx.lineTo(hSize + 2, -3);
                ctx.stroke();
                ctx.restore();
              }

              // 3. Leader line
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
              ctx.beginPath();
              ctx.moveTo(screenX, screenY - hSize - 2);
              ctx.lineTo(screenX + 10, screenY - hSize - 12);
              ctx.lineTo(screenX + 45, screenY - hSize - 12);
              ctx.stroke();

              // 4. Hotspot Core
              ctx.fillStyle = spot.color;
              ctx.beginPath();
              ctx.arc(screenX, screenY, hSize * 0.5, 0, Math.PI * 2);
              ctx.fill();

              // 5. Text Label
              ctx.fillStyle = '#ffffff';
              ctx.font = 'bold 9px monospace';
              ctx.fillText(spot.name, screenX + 12, screenY - hSize - 16);
            }
          });
        }

        if (isVrMode) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(centerX - 8, centerY);
          ctx.lineTo(centerX + 8, centerY);
          ctx.moveTo(centerX, centerY - 8);
          ctx.lineTo(centerX, centerY + 8);
          ctx.stroke();
        }
        ctx.restore();
      };

      if (isVrMode) {
        drawViewport(0, width / 2, -0.015);
        drawViewport(width / 2, width / 2, 0.015);
      } else {
        drawViewport(0, width, 0);
      }
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [viewMode, zoom, isVrMode]);

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const width = canvas.width;
    const height = canvas.height;
    const viewWidth = isVrMode ? width / 2 : width;
    const centerX = viewWidth / 2;
    const centerY = height / 2;
    const yaw = cameraAngle.current.yaw;
    const pitch = cameraAngle.current.pitch;
    const time = timeRef.current;

    if (viewMode === 'system') {
      let clickedPlanet = null;
      planets.forEach((planet) => {
        const angle = time * planet.speed;
        const px = Math.cos(angle) * planet.dist;
        const pz = Math.sin(angle) * planet.dist;

        let rx1 = px * Math.cos(yaw) - pz * Math.sin(yaw);
        let rz1 = px * Math.sin(yaw) + pz * Math.cos(yaw);
        let ry2 = -rz1 * Math.sin(pitch);
        let rz2 = rz1 * Math.cos(pitch);
        rz2 += 280;

        if (rz2 > 0) {
          const ptX = centerX + (rx1 / rz2) * (viewWidth * 0.85 * zoom);
          const ptY = centerY + (ry2 / rz2) * (viewWidth * 0.85 * zoom);
          const pSize = (planet.size / rz2) * (viewWidth * 0.85 * zoom);
          
          const dist = Math.hypot(clickX - ptX, clickY - ptY);
          if (dist < Math.max(12, pSize * 1.5)) {
            clickedPlanet = planet;
          }
        }
      });
      if (clickedPlanet) setActiveObject(clickedPlanet);
    } else {
      let clickedSpot = null;
      const galRotation = time * 0.002;
      galaxyHotspots.forEach((spot) => {
        let sx = spot.x * Math.cos(galRotation) - spot.z * Math.sin(galRotation);
        let sz = spot.x * Math.sin(galRotation) + spot.z * Math.cos(galRotation) + 280;

        let rx1 = sx * Math.cos(yaw) - sz * Math.sin(yaw);
        let rz1 = sx * Math.sin(yaw) + sz * Math.cos(yaw);
        let ry2 = -rz1 * Math.sin(pitch);
        let rz2 = rz1 * Math.cos(pitch);

        if (rz2 > 0) {
          const ptX = centerX + (rx1 / rz2) * (viewWidth * 0.85 * zoom);
          const ptY = centerY + (ry2 / rz2) * (viewWidth * 0.85 * zoom);
          const hSize = (8 / rz2) * (viewWidth * 0.85 * zoom);
          const dist = Math.hypot(clickX - ptX, clickY - ptY);
          if (dist < hSize * 2.5 + 8) clickedSpot = spot;
        }
      });
      if (clickedSpot) setActiveObject(clickedSpot);
    }
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    prevMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - prevMousePos.current.x;
    const deltaY = e.clientY - prevMousePos.current.y;
    cameraAngle.current.yaw += deltaX * 0.005;
    cameraAngle.current.pitch = Math.max(-Math.PI/2, Math.min(Math.PI/2, cameraAngle.current.pitch - deltaY * 0.005));
    prevMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden select-none cursor-grab active:cursor-grabbing">
      <canvas 
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleCanvasClick}
        className="w-full flex-1"
      />



      {/* Object Profile Details Popup - Smaller size */}
      {activeObject && !isVrMode && (
        <div className="absolute top-16 right-4 bg-white/95 border border-slate-200 rounded-xl p-3 w-56 pointer-events-auto shadow-2xl z-20 animate-fadeIn text-slate-800">
          <div className="flex justify-between items-center mb-1.5">
            <h5 className="text-slate-900 text-xs font-bold flex items-center gap-1.5 truncate">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: activeObject.color || '#38bdf8' }} />
              {activeObject.name}
            </h5>
            <button onClick={() => setActiveObject(null)} className="text-slate-400 hover:text-slate-600 text-xs font-bold shrink-0 ml-1">&times;</button>
          </div>
          <p className="text-[10px] text-slate-600 leading-relaxed">{activeObject.desc}</p>
          {viewMode === 'system' && activeObject.moons && activeObject.moons.length > 0 && (
            <div className="mt-1.5 text-[8px] text-slate-500 bg-slate-50 p-1.5 rounded border border-slate-100">
              <strong className="text-slate-700">Moons ({activeObject.moons.length}):</strong>{' '}
              {activeObject.moons.map(m => m.name).join(', ')}
            </div>
          )}
          {activeObject.stats && (
            <div className="mt-1.5 grid grid-cols-2 gap-1 bg-slate-50 p-1.5 rounded border border-slate-100 text-[8px] text-slate-500 font-mono">
              <div><strong className="text-slate-700">Distance:</strong> {activeObject.stats.dist}</div>
              <div><strong className="text-slate-700">Mass:</strong> {activeObject.stats.mass}</div>
              <div className="col-span-2"><strong className="text-slate-700">Type:</strong> {activeObject.stats.type}</div>
            </div>
          )}
          <div className="mt-2 pt-1.5 border-t border-slate-100 flex justify-between text-[8px] text-slate-400 font-mono">
            <span>Type: {viewMode === 'system' ? 'Planet' : 'Galaxy'}</span>
            <span>Active</span>
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   2. Deep Ocean Trench VR Explorer
   ========================================================================= */
const OceanSimulator = ({ isVrMode, isFullscreen }) => {
  const canvasRef = useRef(null);
  const isDragging = useRef(false);
  const prevMousePos = useRef({ x: 0, y: 0 });
  const cameraAngle = useRef({ yaw: 0, pitch: 0 });
  const flashlightPos = useRef({ x: 200, y: 200 });
  const [activeCreature, setActiveCreature] = useState(null);

  // Sea Bed Rocks and Swaying Seaweed Plants
  const seabedElementsRef = useRef([]);
  if (seabedElementsRef.current.length === 0) {
    for (let i = 0; i < 45; i++) {
      const yaw = -Math.PI + Math.random() * Math.PI * 2;
      const type = Math.random() > 0.45 ? 'grass' : 'stone';
      const size = type === 'grass' ? (50 + Math.random() * 70) : (12 + Math.random() * 28);
      const color = type === 'grass' 
        ? [`#047857`, `#059669`, `#10b981`, `#34d399`][Math.floor(Math.random() * 4)] // Greens
        : [`#4b5563`, `#374151`, `#1f2937`, `#6b7280`][Math.floor(Math.random() * 4)]; // Rock Grays
      
      seabedElementsRef.current.push({
        yaw,
        pitch: 0.42 + Math.random() * 0.12, // Lower hemisphere (seabed area)
        type,
        size,
        color,
        offset: Math.random() * 100,
        bladesCount: type === 'grass' ? Math.floor(4 + Math.random() * 4) : 0
      });
    }
  }

  // Swimming Fishes List (Clownfish, Blue Tang, Yellow Tang, Sea Turtle, Great White Shark)
  const fishesRef = useRef([]);
  if (fishesRef.current.length === 0) {
    const fishTypes = ['clownfish', 'blueTang', 'yellowTang', 'turtle', 'shark'];
    for (let i = 0; i < 18; i++) {
      const type = fishTypes[i % fishTypes.length];
      const size = type === 'shark' ? 55 : type === 'turtle' ? 42 : 18 + Math.random() * 7;
      const speed = type === 'shark' ? 0.0008 : type === 'turtle' ? 0.0005 : 0.001 + Math.random() * 0.0015;
      
      fishesRef.current.push({
        yaw: Math.random() * Math.PI * 2,
        pitch: -0.35 + Math.random() * 0.65, // swimming at various depths
        type,
        size,
        speed: Math.random() > 0.5 ? speed : -speed, // Random initial direction
        swimOffset: Math.random() * 100,
        color: type === 'clownfish' ? '#f97316' : type === 'blueTang' ? '#2563eb' : type === 'yellowTang' ? '#eab308' : type === 'turtle' ? '#10b981' : '#475569'
      });
    }
  }

  const creatures = [
    { yaw: -0.3, pitch: 0.1, name: 'Bioluminescent Jellyfish', desc: 'Glowing jellyfish that utilize green & blue proteins to light up in pitch black water depths exceeding 3,000 meters.', size: 28 },
    { yaw: 0.2, pitch: -0.15, name: 'Anglerfish', desc: 'A predator of the deep trench with a fleshy glowing bulb hanging in front of its mouth to attract prey.', size: 24 },
    { yaw: -0.85, pitch: -0.05, name: 'Giant Squid', desc: 'A mysterious and massive cephalopod that lives at extreme deep ocean pressures. Highly elusive.', size: 45 },
    { yaw: 0.6, pitch: 0.2, name: 'Comb Jelly', desc: 'Creates stunning rainbow-like shimmering lights along its cilia rows, reflecting light in procedural visual waves.', size: 20 }
  ];

  const bubblesRef = useRef([]);
  if (bubblesRef.current.length === 0) {
    for (let i = 0; i < 70; i++) {
      bubblesRef.current.push({
        x: Math.random() * Math.PI * 2,
        y: Math.random() * 2 - 1,
        size: Math.random() * 1.6 + 0.5,
        speed: Math.random() * 0.005 + 0.002
      });
    }
  }

  // Pre-generate steam/smoke particles for the hydrothermal volcanic vent on the seabed
  const ventParticlesRef = useRef([]);
  if (ventParticlesRef.current.length === 0) {
    for (let i = 0; i < 35; i++) {
      ventParticlesRef.current.push({
        yOffset: Math.random() * 95,
        xOffset: (Math.random() - 0.5) * 6,
        size: Math.random() * 3 + 1,
        speed: 0.6 + Math.random() * 0.8,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
  }

  // Procedural detailed drawing code for fishes
  const drawClownfish = (ctx, size, time, offset) => {
    const tailWag = Math.sin(time * 0.13 + offset) * (size * 0.16);
    
    // Body (orange gradient)
    const bodyGrad = ctx.createLinearGradient(-size, 0, size, 0);
    bodyGrad.addColorStop(0, '#ea580c');
    bodyGrad.addColorStop(0.55, '#f97316');
    bodyGrad.addColorStop(1, '#ffedd5');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.moveTo(-size * 0.8, 0);
    ctx.bezierCurveTo(-size * 0.4, -size * 0.5, size * 0.4, -size * 0.5, size * 0.8, 0);
    ctx.bezierCurveTo(size * 0.4, size * 0.5, -size * 0.4, size * 0.5, -size * 0.8, 0);
    ctx.fill();

    // White stripes with black borders
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.2;
    
    // Stripe 1 (Middle)
    ctx.beginPath();
    ctx.moveTo(-size * 0.1, -size * 0.45);
    ctx.quadraticCurveTo(0, 0, -size * 0.1, size * 0.45);
    ctx.lineTo(size * 0.08, size * 0.42);
    ctx.quadraticCurveTo(size * 0.18, 0, size * 0.08, -size * 0.42);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Stripe 2 (Head)
    ctx.beginPath();
    ctx.moveTo(size * 0.4, -size * 0.35);
    ctx.quadraticCurveTo(size * 0.45, 0, size * 0.4, size * 0.35);
    ctx.lineTo(size * 0.52, size * 0.28);
    ctx.quadraticCurveTo(size * 0.58, 0, size * 0.52, -size * 0.28);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Tail Fin (wagging)
    ctx.fillStyle = '#f97316';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-size * 0.8, 0);
    ctx.quadraticCurveTo(-size * 1.1, -size * 0.45 + tailWag, -size * 1.35 + tailWag, -size * 0.5 + tailWag);
    ctx.quadraticCurveTo(-size * 1.1, tailWag, -size * 1.35 + tailWag, size * 0.5 + tailWag);
    ctx.quadraticCurveTo(-size * 1.1, size * 0.45 + tailWag, -size * 0.8, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Eye
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(size * 0.52, -size * 0.1, size * 0.12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(size * 0.55, -size * 0.1, size * 0.06, 0, Math.PI * 2);
    ctx.fill();

    // Dorsal fin
    ctx.fillStyle = '#ea580c';
    ctx.beginPath();
    ctx.moveTo(-size * 0.3, -size * 0.46);
    ctx.quadraticCurveTo(size * 0.1, -size * 0.68, size * 0.4, -size * 0.36);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

  const drawBlueTang = (ctx, size, time, offset) => {
    const tailWag = Math.sin(time * 0.12 + offset) * (size * 0.18);
    
    // Body (royal blue gradient)
    const bodyGrad = ctx.createLinearGradient(-size, 0, size, 0);
    bodyGrad.addColorStop(0, '#1d4ed8');
    bodyGrad.addColorStop(0.65, '#2563eb');
    bodyGrad.addColorStop(1, '#3b82f6');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.moveTo(-size * 0.8, 0);
    ctx.bezierCurveTo(-size * 0.4, -size * 0.55, size * 0.4, -size * 0.55, size * 0.8, 0);
    ctx.bezierCurveTo(size * 0.4, size * 0.55, -size * 0.4, size * 0.55, -size * 0.8, 0);
    ctx.fill();

    // Black pattern along the back
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(-size * 0.4, -size * 0.38);
    ctx.bezierCurveTo(0, -size * 0.46, size * 0.4, -size * 0.32, size * 0.5, -size * 0.1);
    ctx.quadraticCurveTo(size * 0.2, -size * 0.16, 0, -size * 0.21);
    ctx.quadraticCurveTo(-size * 0.2, -size * 0.21, -size * 0.4, -size * 0.38);
    ctx.closePath();
    ctx.fill();

    // Yellow tail fin (wagging)
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(-size * 0.75, 0);
    ctx.quadraticCurveTo(-size * 1.1, -size * 0.52 + tailWag, -size * 1.35 + tailWag, -size * 0.62 + tailWag);
    ctx.lineTo(-size * 1.35 + tailWag, size * 0.62 + tailWag);
    ctx.quadraticCurveTo(-size * 1.1, size * 0.52 + tailWag, -size * 0.75, 0);
    ctx.closePath();
    ctx.fill();

    // Fin outline
    ctx.strokeStyle = '#1d4ed8';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-size * 0.75, 0);
    ctx.lineTo(-size * 1.35 + tailWag, -size * 0.62 + tailWag);
    ctx.moveTo(-size * 0.75, 0);
    ctx.lineTo(-size * 1.35 + tailWag, size * 0.62 + tailWag);
    ctx.stroke();

    // Yellow highlights on pelvic fin
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(size * 0.1, size * 0.2);
    ctx.quadraticCurveTo(size * 0.3, size * 0.42, size * 0.4, size * 0.18);
    ctx.closePath();
    ctx.fill();

    // Eye
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(size * 0.52, -size * 0.12, size * 0.11, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(size * 0.56, -size * 0.12, size * 0.05, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawYellowTang = (ctx, size, time, offset) => {
    const tailWag = Math.sin(time * 0.12 + offset) * (size * 0.15);
    
    // Body (bright yellow gradient, round disk-like)
    const bodyGrad = ctx.createLinearGradient(-size, 0, size, 0);
    bodyGrad.addColorStop(0, '#d97706');
    bodyGrad.addColorStop(0.5, '#eab308');
    bodyGrad.addColorStop(1, '#fef08a');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.moveTo(-size * 0.7, 0);
    ctx.bezierCurveTo(-size * 0.4, -size * 0.72, size * 0.4, -size * 0.72, size * 0.7, 0);
    ctx.bezierCurveTo(size * 0.4, size * 0.72, -size * 0.4, size * 0.72, -size * 0.7, 0);
    ctx.fill();

    // Long yellow dorsal/anal fins
    ctx.fillStyle = '#fbbf24';
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-size * 0.4, -size * 0.55);
    ctx.quadraticCurveTo(size * 0.2, -size * 0.86, size * 0.6, -size * 0.32);
    ctx.lineTo(size * 0.5, -size * 0.2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-size * 0.4, size * 0.55);
    ctx.quadraticCurveTo(size * 0.2, size * 0.86, size * 0.6, size * 0.32);
    ctx.lineTo(size * 0.5, size * 0.2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Tail (wagging)
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.moveTo(-size * 0.7, 0);
    ctx.lineTo(-size * 1.1 + tailWag, -size * 0.45 + tailWag);
    ctx.lineTo(-size * 1.1 + tailWag, size * 0.45 + tailWag);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Eye
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(size * 0.45, -size * 0.1, size * 0.12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(size * 0.48, -size * 0.1, size * 0.05, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawSeaTurtle = (ctx, size, time, offset) => {
    const flipperAngle = Math.sin(time * 0.05 + offset) * 0.38;
    
    // Shell (green oval, textured)
    const shellGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
    shellGrad.addColorStop(0, '#10b981');
    shellGrad.addColorStop(0.7, '#047857');
    shellGrad.addColorStop(1, '#064e3b');
    ctx.fillStyle = shellGrad;
    ctx.strokeStyle = '#022c22';
    ctx.lineWidth = 1.5;
    
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.9, size * 0.65, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Drawing mosaic pattern on the shell
    ctx.strokeStyle = 'rgba(2, 44, 34, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.5, size * 0.35, 0, 0, Math.PI * 2);
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
      ctx.moveTo(Math.cos(a) * size * 0.5, Math.sin(a) * size * 0.35);
      ctx.lineTo(Math.cos(a) * size * 0.9, Math.sin(a) * size * 0.65);
    }
    ctx.stroke();

    // Flippers
    ctx.fillStyle = '#34d399';
    ctx.strokeStyle = '#047857';
    ctx.lineWidth = 1;
    
    // Front flipper (Top/Right)
    ctx.save();
    ctx.translate(size * 0.4, -size * 0.4);
    ctx.rotate(-Math.PI / 4 + flipperAngle);
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.6, size * 0.18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Front flipper (Bottom/Right)
    ctx.save();
    ctx.translate(size * 0.4, size * 0.4);
    ctx.rotate(Math.PI / 4 - flipperAngle);
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.6, size * 0.18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Back flippers
    ctx.save();
    ctx.translate(-size * 0.6, -size * 0.35);
    ctx.rotate(-Math.PI / 6 - flipperAngle * 0.5);
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.35, size * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.translate(-size * 0.6, size * 0.35);
    ctx.rotate(Math.PI / 6 + flipperAngle * 0.5);
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.35, size * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Head
    ctx.fillStyle = '#34d399';
    ctx.beginPath();
    ctx.ellipse(size * 1.05, 0, size * 0.24, size * 0.16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Turtle eye
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(size * 1.15, -size * 0.05, 1.8, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawShark = (ctx, size, time, offset) => {
    const tailWag = Math.sin(time * 0.09 + offset) * (size * 0.21);
    
    // Body (steely grey back, white belly)
    const bodyGrad = ctx.createLinearGradient(0, -size * 0.3, 0, size * 0.3);
    bodyGrad.addColorStop(0, '#64748b'); // Grey
    bodyGrad.addColorStop(0.5, '#94a3b8'); // Mid-grey
    bodyGrad.addColorStop(0.55, '#f1f5f9'); // White belly transition
    bodyGrad.addColorStop(1, '#ffffff'); // White
    
    ctx.fillStyle = bodyGrad;
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.5;
    
    ctx.beginPath();
    ctx.moveTo(-size * 0.9, 0);
    ctx.bezierCurveTo(-size * 0.5, -size * 0.35, size * 0.5, -size * 0.35, size * 0.9, -size * 0.05); // Pointy snout
    ctx.bezierCurveTo(size * 0.5, size * 0.35, -size * 0.5, size * 0.35, -size * 0.9, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Gill slits
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(size * 0.4 - i * 4, -size * 0.1);
      ctx.lineTo(size * 0.4 - i * 4, size * 0.08);
      ctx.stroke();
    }

    // Pectoral Fin (Top/Side)
    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.moveTo(size * 0.15, -size * 0.15);
    ctx.quadraticCurveTo(size * 0.3, -size * 0.5, size * 0.42, -size * 0.5);
    ctx.quadraticCurveTo(size * 0.3, -size * 0.2, size * 0.15, -size * 0.05);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Large Shark Dorsal Fin
    ctx.fillStyle = '#475569';
    ctx.beginPath();
    ctx.moveTo(-size * 0.15, -size * 0.22);
    ctx.quadraticCurveTo(-size * 0.4, -size * 0.65, -size * 0.45, -size * 0.65);
    ctx.quadraticCurveTo(-size * 0.3, -size * 0.3, -size * 0.05, -size * 0.22);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Tail fin (wagging back and forth)
    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.moveTo(-size * 0.85, 0);
    ctx.quadraticCurveTo(-size * 1.1, -size * 0.55 + tailWag, -size * 1.35 + tailWag, -size * 0.75 + tailWag);
    ctx.quadraticCurveTo(-size * 1.05, tailWag, -size * 1.35 + tailWag, size * 0.55 + tailWag);
    ctx.quadraticCurveTo(-size * 1.1, size * 0.45 + tailWag, -size * 0.85, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Eye
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(size * 0.7, -size * 0.12, 1.8, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawFishBody = (ctx, type, size, time, offset) => {
    if (type === 'clownfish') drawClownfish(ctx, size, time, offset);
    else if (type === 'blueTang') drawBlueTang(ctx, size, time, offset);
    else if (type === 'yellowTang') drawYellowTang(ctx, size, time, offset);
    else if (type === 'turtle') drawSeaTurtle(ctx, size, time, offset);
    else if (type === 'shark') drawShark(ctx, size, time, offset);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let time = 0;

    const render = () => {
      const width = canvas.width = canvas.parentElement.clientWidth;
      const height = canvas.height = canvas.parentElement.clientHeight;
      time += 0.45;

      // Update moving fishes positions
      fishesRef.current.forEach((fish) => {
        fish.yaw += fish.speed;
        if (fish.yaw > Math.PI) fish.yaw -= Math.PI * 2;
        if (fish.yaw < -Math.PI) fish.yaw += Math.PI * 2;
        // subtle depth oscillation
        fish.pitch += Math.sin(time * 0.015 + fish.swimOffset) * 0.0012;
        fish.pitch = Math.max(-0.4, Math.min(0.4, fish.pitch));
      });

      const drawViewport = (viewX, viewWidth, stereoOffset) => {
        ctx.save();
        ctx.beginPath();
        ctx.rect(viewX, 0, viewWidth, height);
        ctx.clip();

        const yaw = cameraAngle.current.yaw + stereoOffset;
        const pitch = cameraAngle.current.pitch;

        // Sea Water Gradient Background
        const bgGrad = ctx.createLinearGradient(viewX, 0, viewX, height);
        bgGrad.addColorStop(0, '#0c4a6e'); // Light Blue deep-sea
        bgGrad.addColorStop(0.5, '#075985');
        bgGrad.addColorStop(1, '#021e35'); // Deep dark water
        ctx.fillStyle = bgGrad;
        ctx.fillRect(viewX, 0, viewWidth, height);

        const centerX = viewX + viewWidth / 2;
        const centerY = height / 2;

        const getProjCoords = (angX, angY) => {
          let diffX = angX - yaw;
          while (diffX < -Math.PI) diffX += Math.PI * 2;
          while (diffX > Math.PI) diffX -= Math.PI * 2;
          let diffY = angY - pitch;
          const screenX = centerX + diffX * (viewWidth * 1.15);
          const screenY = centerY + diffY * (height * 0.9);
          return { x: screenX, y: screenY };
        };

        // 1. Draw beautiful underwater light rays (caustics)
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        const rayGrad = ctx.createLinearGradient(0, 0, width, height);
        rayGrad.addColorStop(0, 'rgba(56, 189, 248, 0.12)'); // Cyan rays
        rayGrad.addColorStop(0.4, 'rgba(20, 184, 166, 0.05)');
        rayGrad.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.fillStyle = rayGrad;
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          const startX = viewX + (i * (viewWidth / 4.5)) + Math.sin(time * 0.002 + i * 5) * 20;
          ctx.moveTo(startX, 0);
          ctx.lineTo(startX + 60, 0);
          ctx.lineTo(startX - 80, height);
          ctx.lineTo(startX - 180, height);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();

        // 2. Draw Hydrothermal Vent (Volcanic smoke chimney) on the seabed
        const ventPt = getProjCoords(-0.5, 0.45);
        if (ventPt.x > viewX - 80 && ventPt.x < viewX + viewWidth + 80) {
          ctx.save();
          ctx.translate(ventPt.x, ventPt.y);
          
          // Vent Chimney (Volcanic rock structure)
          const ventGrad = ctx.createLinearGradient(-35, 0, 35, 0);
          ventGrad.addColorStop(0, '#1c1917');
          ventGrad.addColorStop(0.5, '#44403c');
          ventGrad.addColorStop(1, '#0c0a09');
          ctx.fillStyle = ventGrad;
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(-32, 0);
          ctx.lineTo(-12, -75);
          ctx.lineTo(12, -75);
          ctx.lineTo(32, 0);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Glowing lava fissures
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.75)';
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.moveTo(-15, -15);
          ctx.lineTo(-8, -48);
          ctx.lineTo(-3, -62);
          ctx.moveTo(10, -22);
          ctx.lineTo(7, -54);
          ctx.stroke();

          // Chimney opening red magma glow
          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.ellipse(0, -75, 12, 4, 0, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.ellipse(0, -75, 12, 4, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();

          // Draw steam/smoke bubbles rising from the vent opening
          ventParticlesRef.current.forEach((part) => {
            part.yOffset -= part.speed;
            part.xOffset += Math.sin(time * 0.05 + part.yOffset * 0.1) * 0.28;

            if (part.yOffset < -130) {
              part.yOffset = 0;
              part.xOffset = (Math.random() - 0.5) * 6;
              part.opacity = Math.random() * 0.5 + 0.3;
            }

            const px = ventPt.x + part.xOffset;
            const py = ventPt.y - 75 + part.yOffset;

            if (px > viewX - 10 && px < viewX + viewWidth + 10) {
              // Gas/heat opacity fade out as it rises
              const fade = 1 - Math.abs(part.yOffset) / 130;
              ctx.fillStyle = `rgba(239, 68, 68, ${part.opacity * fade})`;
              ctx.beginPath();
              ctx.arc(px, py, part.size * (1 - part.yOffset / -260), 0, Math.PI * 2);
              ctx.fill();

              // Outer heat distortion blur ring
              ctx.fillStyle = `rgba(249, 115, 22, ${part.opacity * 0.25 * fade})`;
              ctx.beginPath();
              ctx.arc(px, py, part.size * 2.2 * (1 - part.yOffset / -260), 0, Math.PI * 2);
              ctx.fill();
            }
          });
        }

        // 3. Draw Seabed Elements (Detailed Rocks and Swaying Seaweed)
        seabedElementsRef.current.forEach((el) => {
          const pt = getProjCoords(el.yaw, el.pitch);
          
          if (pt.x > viewX - el.size && pt.x < viewX + viewWidth + el.size) {
            ctx.save();
            ctx.translate(pt.x, pt.y);
            
            if (el.type === 'stone') {
              // Draw highly realistic shaded 3D stones/rocks
              ctx.fillStyle = el.color;
              ctx.strokeStyle = '#111827';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(-el.size, 0);
              ctx.quadraticCurveTo(-el.size * 0.8, -el.size * 0.65, 0, -el.size * 0.7);
              ctx.quadraticCurveTo(el.size * 0.85, -el.size * 0.55, el.size, 0);
              ctx.closePath();
              ctx.fill();
              ctx.stroke();

              // Top Highlight
              ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
              ctx.beginPath();
              ctx.moveTo(-el.size * 0.6, -el.size * 0.25);
              ctx.quadraticCurveTo(-el.size * 0.35, -el.size * 0.55, 0, -el.size * 0.55);
              ctx.quadraticCurveTo(el.size * 0.35, -el.size * 0.45, 0, 0);
              ctx.closePath();
              ctx.fill();

              // Dark shadow at bottom of rock
              ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
              ctx.beginPath();
              ctx.moveTo(-el.size * 0.8, 0);
              ctx.quadraticCurveTo(0, -el.size * 0.15, el.size * 0.8, 0);
              ctx.closePath();
              ctx.fill();
            } else {
              // Draw swaying kelp seaweed blades
              ctx.lineWidth = Math.max(1.5, el.size * 0.06);
              ctx.lineCap = 'round';
              
              for (let b = 0; b < el.bladesCount; b++) {
                const bladeOffset = el.offset + b * 15;
                const bladeHeight = el.size * (0.8 + Math.sin(b * 12) * 0.25);
                const startX = (b - el.bladesCount / 2) * 4.5;
                
                // Sway oscillation based on sine wave and blade depth
                const sway = Math.sin(time * 0.015 + bladeOffset) * (el.size * 0.25);
                
                // Beautiful gradient for seaweed
                const grassGrad = ctx.createLinearGradient(startX, 0, startX + sway, -bladeHeight);
                grassGrad.addColorStop(0, '#064e3b'); // Dark bottom
                grassGrad.addColorStop(0.6, el.color);
                grassGrad.addColorStop(1, '#6ee7b7'); // Bright top
                
                ctx.strokeStyle = grassGrad;
                ctx.beginPath();
                ctx.moveTo(startX, 0);
                ctx.bezierCurveTo(
                  startX - 4, -bladeHeight / 3,
                  startX + sway / 2, -bladeHeight * 2 / 3,
                  startX + sway, -bladeHeight
                );
                ctx.stroke();
              }
            }
            ctx.restore();
          }
        });

        // Searchlight flash beam coordinate math
        const beamX = centerX + flashlightPos.current.x;
        const beamY = centerY + flashlightPos.current.y;
        const beamRadius = viewWidth * 0.25;

        // 4. Draw Bioluminescent Particles / Twinkling Plankton (Reflecting searchlight)
        bubblesRef.current.forEach((bubble) => {
          bubble.y += bubble.speed;
          if (bubble.y > 1.2) bubble.y = -1.2;
          const pt = getProjCoords(bubble.x, bubble.y);

          if (pt.x > viewX && pt.x < viewX + viewWidth) {
            const distToBeam = Math.hypot(pt.x - beamX, pt.y - beamY);
            const insideBeam = distToBeam < beamRadius;

            // Reflective brightness shift inside flashlight beam
            ctx.fillStyle = insideBeam ? 'rgba(255, 255, 255, 0.9)' : 'rgba(56, 189, 248, 0.45)';
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, bubble.size, 0, Math.PI * 2);
            ctx.fill();

            // Tiny center core
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, bubble.size * 0.45, 0, Math.PI * 2);
            ctx.fill();
          }
        });

        const lightGrad = ctx.createRadialGradient(beamX, beamY, 0, beamX, beamY, beamRadius);
        lightGrad.addColorStop(0, 'rgba(56, 189, 248, 0.18)');
        lightGrad.addColorStop(0.5, 'rgba(14, 165, 233, 0.08)');
        lightGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = lightGrad;
        ctx.beginPath();
        ctx.arc(beamX, beamY, beamRadius, 0, Math.PI * 2);
        ctx.fill();

        let targetHighlighted = false;

        // 5. Draw Swimming Fishes (Clownfish, Blue Tang, Yellow Tang, Turtles, Sharks)
        fishesRef.current.forEach((fish) => {
          const pt = getProjCoords(fish.yaw, fish.pitch);
          const distToBeam = Math.hypot(pt.x - beamX, pt.y - beamY);
          const isIlluminated = distToBeam < beamRadius;

          if (pt.x > viewX - fish.size * 1.5 && pt.x < viewX + viewWidth + fish.size * 1.5) {
            ctx.save();
            ctx.translate(pt.x, pt.y);
            
            // Flip drawing horizontally if fish is swimming to the left
            if (fish.speed < 0) {
              ctx.scale(-1, 1);
            }

            // Adjust opacity depending on if searchlight hits it
            if (isIlluminated) {
              ctx.globalAlpha = 0.95;
              targetHighlighted = true;
            } else {
              ctx.globalAlpha = 0.45 + Math.abs(Math.sin(time * 0.003 + fish.swimOffset)) * 0.2; // deep water dark visibility
            }

            drawFishBody(ctx, fish.type, fish.size, time, fish.swimOffset);

            // Draw selection box outline if illuminated by beam (for scanning)
            if (isIlluminated) {
              ctx.strokeStyle = 'rgba(16, 185, 129, 0.45)';
              ctx.lineWidth = 1.2;
              ctx.beginPath();
              ctx.arc(0, 0, fish.size * 1.25, 0, Math.PI * 2);
              ctx.stroke();
            }

            ctx.restore();
          }
        });

        // 6. Draw deep-sea creatures (Jellyfish, Anglerfish, Squid)
        creatures.forEach((creature) => {
          const pt = getProjCoords(creature.yaw, creature.pitch);
          const distToBeam = Math.hypot(pt.x - beamX, pt.y - beamY);
          const isIlluminated = distToBeam < beamRadius;

          ctx.save();
          if (isIlluminated) {
            ctx.globalAlpha = 0.95;
            targetHighlighted = true;
          } else {
            ctx.globalAlpha = 0.22 + Math.abs(Math.sin(time * 0.005)) * 0.15;
          }

          ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)';
          ctx.lineWidth = 2;
          ctx.fillStyle = 'rgba(14, 165, 233, 0.15)';

          if (creature.name === 'Bioluminescent Jellyfish') {
            // Semi-transparent glowing bell
            ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, creature.size, Math.PI, 0);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Inner bioluminescent details
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, creature.size * 0.6, Math.PI, 0);
            ctx.stroke();

            // Swaying tentacles
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
            ctx.beginPath();
            ctx.lineWidth = 1.2;
            for (let i = -creature.size + 4; i < creature.size; i += 6) {
              const tx = pt.x + i;
              const ty = pt.y;
              ctx.moveTo(tx, ty);
              const wave = Math.sin(time * 0.08 + i) * 6;
              ctx.bezierCurveTo(tx, ty + 12, tx + wave, ty + 24, tx + wave/2, ty + 42);
            }
            ctx.stroke();
          } 
          else if (creature.name === 'Anglerfish') {
            // Shaded body
            const bodyGrad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, creature.size);
            bodyGrad.addColorStop(0, '#1e293b');
            bodyGrad.addColorStop(0.8, '#0f172a');
            bodyGrad.addColorStop(1, '#020617');
            ctx.fillStyle = bodyGrad;
            
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, creature.size * 0.8, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fill();

            // Teeth
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.moveTo(pt.x + creature.size * 0.3, pt.y - 4);
            ctx.lineTo(pt.x + creature.size * 0.45, pt.y - 2);
            ctx.lineTo(pt.x + creature.size * 0.3, pt.y);
            ctx.lineTo(pt.x + creature.size * 0.45, pt.y + 4);
            ctx.lineTo(pt.x + creature.size * 0.25, pt.y + 8);
            ctx.closePath();
            ctx.fill();

            // Glowing bulb lure
            ctx.strokeStyle = 'rgba(234, 179, 8, 0.8)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(pt.x + creature.size/3, pt.y - creature.size/2);
            ctx.quadraticCurveTo(pt.x + creature.size * 0.7, pt.y - creature.size, pt.x + creature.size * 0.9, pt.y - creature.size * 0.4);
            ctx.stroke();

            // Pulsing Lure Glow
            const lX = pt.x + creature.size * 0.9;
            const lY = pt.y - creature.size * 0.4;
            const lureGlow = 4 + Math.sin(time * 0.09) * 2.5;
            
            const lGrad = ctx.createRadialGradient(lX, lY, 0, lX, lY, lureGlow * 3.5);
            lGrad.addColorStop(0, '#ffffff');
            lGrad.addColorStop(0.35, '#fef08a');
            lGrad.addColorStop(0.7, 'rgba(234, 179, 8, 0.25)');
            lGrad.addColorStop(1, 'rgba(0,0,0,0)');
            
            ctx.fillStyle = lGrad;
            ctx.beginPath();
            ctx.arc(lX, lY, lureGlow * 3.5, 0, Math.PI * 2);
            ctx.fill();
          } 
          else if (creature.name === 'Giant Squid') {
            // Dark reddish squid
            const squidGrad = ctx.createLinearGradient(pt.x - creature.size, pt.y, pt.x + creature.size, pt.y);
            squidGrad.addColorStop(0, '#991b1b');
            squidGrad.addColorStop(0.65, '#dc2626');
            squidGrad.addColorStop(1, '#f87171');
            ctx.fillStyle = squidGrad;

            ctx.beginPath();
            ctx.ellipse(pt.x, pt.y, creature.size * 0.85, creature.size * 0.32, Math.PI / 12, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fill();
            
            // Squid eye
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(pt.x + creature.size * 0.35, pt.y + 2, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(pt.x + creature.size * 0.38, pt.y + 2, 2.5, 0, Math.PI * 2);
            ctx.fill();

            // Tentacles (animated)
            ctx.strokeStyle = '#991b1b';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            const w1 = Math.sin(time * 0.05) * 12;
            const w2 = Math.cos(time * 0.05) * 10;
            ctx.moveTo(pt.x - creature.size * 0.7, pt.y);
            ctx.bezierCurveTo(pt.x - creature.size * 1.1, pt.y - 5 + w1, pt.x - creature.size * 1.3, pt.y - 12 + w2, pt.x - creature.size * 1.6, pt.y - 8 + w1);
            ctx.moveTo(pt.x - creature.size * 0.7, pt.y + 4);
            ctx.bezierCurveTo(pt.x - creature.size * 1.1, pt.y + 8 + w2, pt.x - creature.size * 1.3, pt.y + 16 + w1, pt.x - creature.size * 1.55, pt.y + 12 + w2);
            ctx.stroke();
          }
          else {
            // Comb Jelly - rainbow shimmer colors
            ctx.beginPath();
            ctx.ellipse(pt.x, pt.y, creature.size, creature.size * 0.7, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fill();

            const hue = (time * 1.5) % 360;
            ctx.strokeStyle = `hsla(${hue}, 85%, 65%, 0.85)`;
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            ctx.ellipse(pt.x, pt.y, creature.size * 0.9, creature.size * 0.6, 0, 0, Math.PI * 2);
            ctx.stroke();
          }

          if (isIlluminated) {
            ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, creature.size + 10, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.fillStyle = '#10b981';
            ctx.font = 'bold 8px monospace';
            ctx.fillText("READY TO SCAN", pt.x - 30, pt.y - creature.size - 14);
          }
          ctx.restore();
        });

        // 7. Spinning Target Lock on flash beam when hovering a creature
        if (targetHighlighted) {
          ctx.save();
          ctx.translate(beamX, beamY);
          ctx.rotate(time * 0.015);
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 6]);
          ctx.beginPath();
          ctx.arc(0, 0, 48, 0, Math.PI * 2);
          ctx.stroke();
          
          ctx.setLineDash([]);
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.65)';
          for (let c = 0; c < 4; c++) {
            ctx.rotate(Math.PI / 2);
            ctx.beginPath();
            ctx.moveTo(15, -15);
            ctx.lineTo(25, -15);
            ctx.lineTo(25, -5);
            ctx.stroke();
          }
          ctx.restore();
        }

        // 8. Draw Submarine Glass Cockpit Viewport Frame
        ctx.strokeStyle = 'rgba(30, 41, 59, 0.92)';
        ctx.lineWidth = 14;
        ctx.strokeRect(viewX, 0, viewWidth, height);

        // Glass glare overlay
        const glassGlow = ctx.createLinearGradient(viewX, 0, viewX + viewWidth, height);
        glassGlow.addColorStop(0, 'rgba(255, 255, 255, 0.02)');
        glassGlow.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
        glassGlow.addColorStop(1, 'rgba(255, 255, 255, 0.02)');
        ctx.fillStyle = glassGlow;
        ctx.fillRect(viewX, 0, viewWidth, height);

        // 9. Draw Scrolling Compass Tape at the top HUD center
        const compassX = viewX + viewWidth / 2;
        const compassY = 32;
        ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        ctx.fillRect(compassX - 100, compassY - 14, 200, 24);
        ctx.strokeStyle = 'rgba(14, 165, 233, 0.4)';
        ctx.lineWidth = 1;
        ctx.strokeRect(compassX - 100, compassY - 14, 200, 24);
        
        ctx.save();
        ctx.beginPath();
        ctx.rect(compassX - 95, compassY - 12, 190, 20);
        ctx.clip();
        ctx.fillStyle = '#38bdf8';
        ctx.font = '7px monospace';
        ctx.textAlign = 'center';
        
        const yawDeg = Math.round((yaw * 180 / Math.PI) + 180) % 360;
        for (let offsetDeg = -45; offsetDeg <= 45; offsetDeg += 5) {
          const tickDeg = (Math.floor(yawDeg / 5) * 5 + offsetDeg + 360) % 360;
          const tickOffsetDeg = tickDeg - yawDeg;
          const tx = compassX + tickOffsetDeg * 2.0;
          
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
          ctx.beginPath();
          ctx.moveTo(tx, compassY + 2);
          ctx.lineTo(tx, compassY + (tickDeg % 30 === 0 ? -6 : -2));
          ctx.stroke();
          
          if (tickDeg % 30 === 0) {
            let label = tickDeg.toString();
            if (tickDeg === 0 || tickDeg === 360) label = 'N';
            else if (tickDeg === 90) label = 'E';
            else if (tickDeg === 180) label = 'S';
            else if (tickDeg === 270) label = 'W';
            ctx.fillText(label, tx, compassY - 4);
          }
        }
        ctx.restore();
        
        // Red pointer marker
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(compassX, compassY - 18);
        ctx.lineTo(compassX - 4, compassY - 24);
        ctx.lineTo(compassX + 4, compassY - 24);
        ctx.closePath();
        ctx.fill();

        // Scan line grids
        ctx.strokeStyle = 'rgba(14, 165, 233, 0.1)';
        ctx.lineWidth = 4;
        ctx.strokeRect(viewX + 20, 20, viewWidth - 40, height - 40);

        ctx.fillStyle = 'rgba(14, 165, 233, 0.025)';
        for (let i = 0; i < height; i += 7) {
          ctx.fillRect(viewX, i, viewWidth, 2);
        }
        ctx.restore();
      };

      if (isVrMode) {
        drawViewport(0, width / 2, -0.015);
        drawViewport(width / 2, width / 2, 0.015);
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(width / 2, 0);
        ctx.lineTo(width / 2, height);
        ctx.stroke();
      } else {
        drawViewport(0, width, 0);
      }
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isVrMode]);

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const width = canvas.width;
    const height = canvas.height;
    const viewWidth = isVrMode ? width / 2 : width;
    const centerX = viewWidth / 2;
    const centerY = height / 2;
    const yaw = cameraAngle.current.yaw;
    const pitch = cameraAngle.current.pitch;

    let clickedCreature = null;
    
    // Check main bio creatures list
    creatures.forEach((creature) => {
      let diffX = creature.yaw - yaw;
      while (diffX < -Math.PI) diffX += Math.PI * 2;
      while (diffX > Math.PI) diffX -= Math.PI * 2;
      let diffY = creature.pitch - pitch;
      const ptX = centerX + diffX * (viewWidth * 1.15);
      const ptY = centerY + diffY * (height * 0.9);
      const dist = Math.hypot(clickX - ptX, clickY - ptY);
      if (dist < creature.size + 18) clickedCreature = creature;
    });

    // Check swimming fishes
    if (!clickedCreature) {
      fishesRef.current.forEach((fish) => {
        let diffX = fish.yaw - yaw;
        while (diffX < -Math.PI) diffX += Math.PI * 2;
        while (diffX > Math.PI) diffX -= Math.PI * 2;
        let diffY = fish.pitch - pitch;
        const ptX = centerX + diffX * (viewWidth * 1.15);
        const ptY = centerY + diffY * (height * 0.9);
        const dist = Math.hypot(clickX - ptX, clickY - ptY);
        if (dist < fish.size * 1.5) {
          clickedCreature = {
            name: fish.type === 'clownfish' ? 'Orange Clownfish' : 
                  fish.type === 'blueTang' ? 'Royal Blue Tang' : 
                  fish.type === 'yellowTang' ? 'Yellow Tang' : 
                  fish.type === 'turtle' ? 'Green Sea Turtle' : 'Great White Shark',
            desc: fish.type === 'clownfish' ? 'Clownfish live in symbiosis with stinging sea anemones, which protect them from predators while the clownfish cleans away parasites.' :
                  fish.type === 'blueTang' ? 'Recognizable by their royal blue body and yellow tail. They play a vital role in coral reefs by grazing on algae to prevent it from suffocating corals.' :
                  fish.type === 'yellowTang' ? 'A vibrant yellow marine fish that belongs to the surgeonfish family. They are active grazers found in shallow reefs.' :
                  fish.type === 'turtle' ? 'A majestic marine reptile that can travel thousands of miles across oceans. They are currently endangered due to human activities.' : 
                  'The ocean’s apex predator, capable of detecting a single drop of blood in 25 gallons of water and swimming at speeds of up to 35 mph.',
            size: fish.size,
            isFish: true
          };
        }
      });
    }

    if (clickedCreature) setActiveCreature(clickedCreature);
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    prevMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    flashlightPos.current = {
      x: x - canvas.width / 2,
      y: y - canvas.height / 2
    };

    if (!isDragging.current) return;
    const deltaX = e.clientX - prevMousePos.current.x;
    const deltaY = e.clientY - prevMousePos.current.y;
    cameraAngle.current.yaw += deltaX * 0.005;
    cameraAngle.current.pitch = Math.max(-Math.PI/4, Math.min(Math.PI/4, cameraAngle.current.pitch - deltaY * 0.005));
    prevMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden select-none cursor-crosshair">
      <canvas 
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleCanvasClick}
        className="w-full flex-1"
      />

     

      {/* Creature Database Bio Popup - Smaller size */}
      {activeCreature && !isVrMode && (
        <div className="absolute top-16 right-4 bg-white/95 border border-emerald-100 rounded-xl p-3 w-56 pointer-events-auto shadow-2xl z-20 animate-fadeIn text-slate-800">
          <div className="flex justify-between items-center mb-1.5">
            <h5 className="text-emerald-600 text-[10px] font-mono font-bold flex items-center gap-1 truncate">
              <CheckCircle2 size={10} className="text-emerald-500 shrink-0" />
              SCAN COMPLETED
            </h5>
            <button onClick={() => setActiveCreature(null)} className="text-slate-400 hover:text-slate-600 text-xs font-bold shrink-0 ml-1">&times;</button>
          </div>
          <h4 className="text-slate-900 text-xs font-extrabold mb-1 tracking-wide truncate">{activeCreature.name}</h4>
          <p className="text-[10px] text-slate-600 leading-relaxed font-sans">{activeCreature.desc}</p>
          <div className="mt-2 pt-1.5 border-t border-emerald-50 flex justify-between items-center text-[8px] text-slate-400 font-mono">
            <span>Pressure: ~350 atm</span>
            <span className="px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded text-[8px]">Class: Abyssal</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VrSimulators;
