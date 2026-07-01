import React, { useState, useEffect, useRef } from 'react';
import { 
  Rocket, Compass, Eye, Shield, Maximize2, Minimize2, 
  Volume2, VolumeX, Info, CheckCircle2, RotateCcw, Orbit, Globe
} from 'lucide-react';

const VrSimulators = () => {
  const [activeSim, setActiveSim] = useState('space'); // 'space' | 'mars' | 'ocean'
  const [isVrMode, setIsVrMode] = useState(false); // Stereoscopic SBS Mode
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [muted, setMuted] = useState(true);
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
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xl relative overflow-hidden" ref={containerRef}>
      {/* Background soft glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header controls */}
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
            onClick={() => setMuted(!muted)}
            className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-full transition-colors active:scale-95"
            title={muted ? "Unmute Ambient Sound" : "Mute Sound"}
          >
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
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

      {/* Simulator Navigation Tabs */}
      <div className="relative z-10 flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-200">
        <button 
          onClick={() => setActiveSim('space')}
          className={`px-5 py-3 rounded-2xl font-bold text-xs flex items-center gap-2.5 transition-all shrink-0 border ${
            activeSim === 'space'
              ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20'
              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-800'
          }`}
        >
          <Rocket size={14} /> Space & Milky Way 360°
        </button>

        <button 
          onClick={() => setActiveSim('mars')}
          className={`px-5 py-3 rounded-2xl font-bold text-xs flex items-center gap-2.5 transition-all shrink-0 border ${
            activeSim === 'mars'
              ? 'bg-amber-600 text-white border-amber-500 shadow-lg shadow-amber-500/20'
              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-800'
          }`}
        >
          <Compass size={14} /> Mars Jezero Crater 360°
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

      {/* Simulation Container */}
      <div className="relative z-10 w-full bg-black rounded-2xl border border-slate-200 overflow-hidden min-h-[380px] sm:min-h-[450px] md:min-h-[520px]">
        {activeSim === 'space' && <SpaceSimulator isVrMode={isVrMode} muted={muted} />}
        {activeSim === 'mars' && <MarsSimulator isVrMode={isVrMode} muted={muted} />}
        {activeSim === 'ocean' && <OceanSimulator isVrMode={isVrMode} muted={muted} />}
      </div>
    </div>
  );
};

/* =========================================================================
   1. Space Orbit & Milky Way Simulator Component
   ========================================================================= */
const SpaceSimulator = ({ isVrMode, muted }) => {
  const canvasRef = useRef(null);
  const [viewMode, setViewMode] = useState('system'); // 'system' | 'galaxy'
  const [activeObject, setActiveObject] = useState(null);
  const isDragging = useRef(false);
  const prevMousePos = useRef({ x: 0, y: 0 });
  const cameraAngle = useRef({ yaw: 0, pitch: 0 });

  const audioCtxRef = useRef(null);
  const ambientOscRef = useRef(null);

  useEffect(() => {
    if (!muted) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(65, ctx.currentTime);
        gainNode.gain.setValueAtTime(0.06, ctx.currentTime);
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(120, ctx.currentTime);
        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.start();
        ambientOscRef.current = osc;
      } catch (err) {
        console.error(err);
      }
    } else {
      if (ambientOscRef.current) {
        try { ambientOscRef.current.stop(); } catch(e){}
        ambientOscRef.current = null;
      }
      if (audioCtxRef.current) {
        try { audioCtxRef.current.close(); } catch(e){}
        audioCtxRef.current = null;
      }
    }
    return () => {
      if (ambientOscRef.current) {
        try { ambientOscRef.current.stop(); } catch(e){}
      }
      if (audioCtxRef.current) {
        try { audioCtxRef.current.close(); } catch(e){}
      }
    };
  }, [muted]);

  const planets = [
    { name: 'Mercury', color: '#9ca3af', dist: 70, size: 3.5, speed: 0.035, desc: 'Smallest and closest planet to the Sun.' },
    { name: 'Venus', color: '#f59e0b', dist: 100, size: 6.5, speed: 0.026, desc: 'Hottest planet in our solar system with a thick toxic atmosphere.' },
    { name: 'Earth', color: '#3b82f6', dist: 135, size: 7, speed: 0.018, desc: 'Our home planet and only known harbor of life.' },
    { name: 'Mars', color: '#ef4444', dist: 170, size: 5.5, speed: 0.013, desc: 'The rusty-red desert planet hosting ancient dry lake beds.' },
    { name: 'Jupiter', color: '#ea580c', dist: 215, size: 14, speed: 0.007, desc: 'Largest gas giant with active stormy belts and the Great Red Spot.' },
    { name: 'Saturn', color: '#eab308', dist: 265, size: 11.5, speed: 0.005, desc: 'Famous for its spectacular ice and rock ring system.', rings: true },
    { name: 'Uranus', color: '#06b6d4', dist: 315, size: 8.5, speed: 0.003, desc: 'An ice giant tilted completely on its side with faint vertical rings.', verticalRings: true },
    { name: 'Neptune', color: '#2563eb', dist: 360, size: 8.5, speed: 0.0025, desc: 'Deep blue gas giant experiencing supersonic storm winds.' },
  ];

  const galaxyHotspots = [
    { name: 'Sagittarius A*', x: 0, y: 0, z: 0, color: '#a855f7', desc: 'The supermassive black hole at the center of the Milky Way, holding 4.1 million solar masses.' },
    { name: 'Sun / Orion Arm', x: 120, y: 0, z: 120, color: '#f59e0b', desc: 'Our solar system resides inside the Orion Spur, approximately 26,000 light years from the core.' },
    { name: 'Pillars of Creation', x: -80, y: 20, z: -100, color: '#10b981', desc: 'A majestic star-forming region of gas columns inside the Eagle Nebula.' }
  ];

  const starsRef = useRef([]);
  if (starsRef.current.length === 0) {
    for (let i = 0; i < 280; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      starsRef.current.push({
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.sin(phi) * Math.sin(theta),
        z: Math.cos(phi),
        brightness: Math.random() * 0.75 + 0.25
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
    let time = 0;

    const render = () => {
      const width = canvas.width = canvas.parentElement.clientWidth;
      const height = canvas.height = canvas.parentElement.clientHeight;
      time += 0.45;

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

        // Draw stars
        ctx.fillStyle = '#ffffff';
        starsRef.current.forEach(star => {
          let x1 = star.x * Math.cos(yaw) - star.z * Math.sin(yaw);
          let z1 = star.x * Math.sin(yaw) + star.z * Math.cos(yaw);
          let y1 = star.y;
          let y2 = y1 * Math.cos(pitch) - z1 * Math.sin(pitch);
          let z2 = y1 * Math.sin(pitch) + z1 * Math.cos(pitch);

          if (z2 > 0) {
            const screenX = centerX + (x1 / z2) * (viewWidth * 0.85);
            const screenY = centerY + (y2 / z2) * (viewWidth * 0.85);
            ctx.globalAlpha = star.brightness;
            ctx.beginPath();
            ctx.arc(screenX, screenY, star.brightness * 1.4, 0, Math.PI * 2);
            ctx.fill();
          }
        });
        ctx.globalAlpha = 1.0;

        if (viewMode === 'system') {
          // Sun
          let sunX = 0, sunY = 0, sunZ = 280;
          let sx1 = sunX * Math.cos(yaw) - sunZ * Math.sin(yaw);
          let sz1 = sunX * Math.sin(yaw) + sunZ * Math.cos(yaw);
          let sy1 = sunY;
          let sy2 = sy1 * Math.cos(pitch) - sz1 * Math.sin(pitch);
          let sz2 = sy1 * Math.sin(pitch) + sz1 * Math.cos(pitch);

          if (sz2 > 0) {
            const sunProjX = centerX + (sx1 / sz2) * (viewWidth * 0.85);
            const sunProjY = centerY + (sy2 / sz2) * (viewWidth * 0.85);
            const sunSize = (40 / sz2) * (viewWidth * 0.85);

            const glow = ctx.createRadialGradient(sunProjX, sunProjY, 0, sunProjX, sunProjY, sunSize * 2.2);
            glow.addColorStop(0, '#fef08a');
            glow.addColorStop(0.2, '#f59e0b');
            glow.addColorStop(0.5, 'rgba(239,68,68,0.18)');
            glow.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(sunProjX, sunProjY, sunSize * 2.2, 0, Math.PI * 2);
            ctx.fill();
          }

          // Planets
          planets.forEach((planet) => {
            const angle = time * planet.speed;
            const px = Math.cos(angle) * planet.dist;
            const pz = Math.sin(angle) * planet.dist + 280;
            const py = 0;

            let rx1 = px * Math.cos(yaw) - pz * Math.sin(yaw);
            let rz1 = px * Math.sin(yaw) + pz * Math.cos(yaw);
            let ry1 = py;
            let ry2 = ry1 * Math.cos(pitch) - rz1 * Math.sin(pitch);
            let rz2 = ry1 * Math.sin(pitch) + rz1 * Math.cos(pitch);

            if (rz2 > 0) {
              const planetProjX = centerX + (rx1 / rz2) * (viewWidth * 0.85);
              const planetProjY = centerY + (ry2 / rz2) * (viewWidth * 0.85);
              const pSize = (planet.size / rz2) * (viewWidth * 0.85);

              if (planet.rings) {
                ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
                ctx.lineWidth = Math.max(1.5, pSize * 0.25);
                ctx.save();
                ctx.translate(planetProjX, planetProjY);
                ctx.scale(1, 0.22);
                ctx.beginPath();
                ctx.arc(0, 0, pSize * 2.0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
              }

              if (planet.verticalRings) {
                ctx.strokeStyle = 'rgba(34, 211, 238, 0.25)';
                ctx.lineWidth = Math.max(1, pSize * 0.12);
                ctx.save();
                ctx.translate(planetProjX, planetProjY);
                ctx.scale(0.18, 1);
                ctx.beginPath();
                ctx.arc(0, 0, pSize * 1.8, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
              }

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

              ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
              ctx.font = 'bold 9px monospace';
              ctx.fillText(planet.name, planetProjX + pSize + 4, planetProjY + 3);
            }
          });
        } else {
          // Galaxy View
          const galRotation = time * 0.002;
          let galX = 0, galY = 0, galZ = 280;
          let gx1 = galX * Math.cos(yaw) - galZ * Math.sin(yaw);
          let gz1 = galX * Math.sin(yaw) + galZ * Math.cos(yaw);
          let gy1 = galY;
          let gy2 = gy1 * Math.cos(pitch) - gz1 * Math.sin(pitch);
          let gz2 = gy1 * Math.sin(pitch) + gz1 * Math.cos(pitch);

          if (gz2 > 0) {
            const galProjX = centerX + (gx1 / gz2) * (viewWidth * 0.85);
            const galProjY = centerY + (gy2 / gz2) * (viewWidth * 0.85);
            const coreSize = (90 / gz2) * (viewWidth * 0.85);

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
              const screenX = centerX + (rx1 / rz2) * (viewWidth * 0.85);
              const screenY = centerY + (ry2 / rz2) * (viewWidth * 0.85);
              const size = (gStar.size / rz2) * (viewWidth * 0.85);

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
              const screenX = centerX + (rx1 / rz2) * (viewWidth * 0.85);
              const screenY = centerY + (ry2 / rz2) * (viewWidth * 0.85);
              const hSize = (8 / rz2) * (viewWidth * 0.85);

              ctx.strokeStyle = spot.color;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.arc(screenX, screenY, hSize + Math.sin(Date.now() * 0.005) * 3, 0, Math.PI * 2);
              ctx.stroke();

              ctx.fillStyle = spot.color;
              ctx.beginPath();
              ctx.arc(screenX, screenY, hSize * 0.5, 0, Math.PI * 2);
              ctx.fill();

              ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
              ctx.font = 'bold 8px monospace';
              ctx.fillText(spot.name, screenX + hSize + 4, screenY + 3);
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
  }, [isVrMode, planets, viewMode]);

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

    if (viewMode === 'system') {
      let clicked = null;
      planets.forEach((planet) => {
        const pz = 280;
        const rx1 = planet.dist * Math.cos(yaw) - pz * Math.sin(yaw);
        const rz1 = planet.dist * Math.sin(yaw) + pz * Math.cos(yaw);
        const ry2 = -rz1 * Math.sin(pitch);
        const rz2 = rz1 * Math.cos(pitch);

        if (rz2 > 0) {
          const ptX = centerX + (rx1 / rz2) * (viewWidth * 0.85);
          const ptY = centerY + (ry2 / rz2) * (viewWidth * 0.85);
          const dist = Math.hypot(clickX - ptX, clickY - ptY);
          if (dist < 15) clicked = planet;
        }
      });
      if (clicked) setActiveObject(clicked);
    } else {
      let clicked = null;
      galaxyHotspots.forEach((spot) => {
        const sz = 280;
        const rx1 = spot.x * Math.cos(yaw) - sz * Math.sin(yaw);
        const rz1 = spot.x * Math.sin(yaw) + sz * Math.cos(yaw);
        const ry2 = spot.y * Math.cos(pitch) - rz1 * Math.sin(pitch);
        const rz2 = spot.y * Math.sin(pitch) + rz1 * Math.cos(pitch);

        if (rz2 > 0) {
          const ptX = centerX + (rx1 / rz2) * (viewWidth * 0.85);
          const ptY = centerY + (ry2 / rz2) * (viewWidth * 0.85);
          const dist = Math.hypot(clickX - ptX, clickY - ptY);
          if (dist < 15) clicked = spot;
        }
      });
      if (clicked) setActiveObject(clicked);
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
    cameraAngle.current.pitch = Math.max(-Math.PI/3, Math.min(Math.PI/3, cameraAngle.current.pitch - deltaY * 0.005));
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

      {/* Mode Selector HUD Toggle - Light Styled */}
      <div className="absolute top-4 left-4 flex gap-1 bg-white/90 backdrop-blur border border-slate-200 p-1 rounded-xl z-20 pointer-events-auto shadow-md">
        <button 
          onClick={() => { setViewMode('system'); setActiveObject(null); }}
          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-colors ${
            viewMode === 'system' 
              ? 'bg-blue-600 text-white shadow-sm' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Solar System View
        </button>
        <button 
          onClick={() => { setViewMode('galaxy'); setActiveObject(null); }}
          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-colors ${
            viewMode === 'galaxy' 
              ? 'bg-blue-600 text-white shadow-sm' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Milky Way Galaxy
        </button>
      </div>

      {/* VR HUD Info overlay - Light Styled */}
      {!isVrMode && (
        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur border border-slate-200/80 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pointer-events-auto shadow-xl">
          <div>
            <h4 className="text-slate-800 text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              {viewMode === 'system' ? 'Solar System Simulator' : 'Milky Way Galaxy Observer'}
            </h4>
            <p className="text-[11px] text-slate-500 mt-1 max-w-md">
              {viewMode === 'system' 
                ? 'Explore the planets (including Saturn, Uranus, Neptune). Click on planets to load details.' 
                : 'Interactive 3D simulation of our spiral galaxy. Explore arms and click objects to scan details.'}
            </p>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {viewMode === 'system' ? (
              planets.map((planet, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveObject(planet)}
                  className="px-2.5 py-1 bg-slate-50 border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-slate-700 rounded text-[9px] font-semibold transition-all"
                >
                  {planet.name}
                </button>
              ))
            ) : (
              galaxyHotspots.map((spot, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveObject(spot)}
                  className="px-2.5 py-1 bg-slate-50 border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-slate-700 rounded text-[9px] font-semibold transition-all"
                >
                  {spot.name}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Object Profile Details Popup - Light Styled */}
      {activeObject && !isVrMode && (
        <div className="absolute top-4 right-4 bg-white/95 border border-slate-200 rounded-2xl p-4 w-72 pointer-events-auto shadow-2xl z-20 animate-fadeIn text-slate-800">
          <div className="flex justify-between items-center mb-2">
            <h5 className="text-slate-900 text-sm font-bold flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: activeObject.color || '#38bdf8' }} />
              {activeObject.name}
            </h5>
            <button onClick={() => setActiveObject(null)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">&times;</button>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">{activeObject.desc}</p>
          <div className="mt-3 pt-2 border-t border-slate-100 flex justify-between text-[9px] text-slate-400 font-mono">
            <span>Type: {viewMode === 'system' ? 'Planetary Body' : 'Galactic Structure'}</span>
            <span>Status: Active</span>
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   2. Mars Jezero Crater Panoramic Tour Simulator
   ========================================================================= */
const MarsSimulator = ({ isVrMode, muted }) => {
  const canvasRef = useRef(null);
  const isDragging = useRef(false);
  const prevMousePos = useRef({ x: 0, y: 0 });
  const cameraAngle = useRef({ yaw: 0, pitch: 0 });
  const [activeInfo, setActiveInfo] = useState(null);

  const audioCtxRef = useRef(null);
  const windOscRef = useRef(null);

  useEffect(() => {
    if (!muted) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0, b1, b2, b3, b4, b5, b6;
        b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          output[i] *= 0.11;
          b6 = white * 0.115926;
        }

        const sourceNode = ctx.createBufferSource();
        sourceNode.buffer = noiseBuffer;
        sourceNode.loop = true;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(260, ctx.currentTime);
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
        sourceNode.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        sourceNode.start();
        windOscRef.current = sourceNode;
      } catch (err) {
        console.error(err);
      }
    } else {
      if (windOscRef.current) {
        try { windOscRef.current.stop(); } catch(e){}
        windOscRef.current = null;
      }
      if (audioCtxRef.current) {
        try { audioCtxRef.current.close(); } catch(e){}
        audioCtxRef.current = null;
      }
    }
    return () => {
      if (windOscRef.current) {
        try { windOscRef.current.stop(); } catch(e){}
      }
      if (audioCtxRef.current) {
        try { audioCtxRef.current.close(); } catch(e){}
      }
    };
  }, [muted]);

  const hotspots = [
    { yaw: 0, pitch: -0.05, label: 'Perseverance Rover', title: 'Perseverance Rover', desc: 'NASA’s heavy robotic explorer landed in Jezero Crater in Feb 2021 to search for ancient biosignatures and collect rock cores.' },
    { yaw: -0.4, pitch: 0.15, label: 'Ingenuity Helicopter', title: 'Ingenuity Helicopter', desc: 'The tiny 1.8 kg rotorcraft that completed 72 historic flights on Mars, proving powered flight is possible in the thin Martian air.' },
    { yaw: 0.5, pitch: -0.1, label: 'Jezero Delta Minerals', title: 'Crater Clay Delta', desc: 'Rich clay and mineral deposits swept by ancient water channels into the lakebed, representing ideal preservation environments for ancient micro-organisms.' },
    { yaw: -1.1, pitch: 0.05, label: 'Mount Sharp Horizon', title: 'Crater Rim', desc: 'The distant rim of Jezero Crater rising in the dusty horizon. The crater spans 45 kilometers wide.' }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const render = () => {
      const width = canvas.width = canvas.parentElement.clientWidth;
      const height = canvas.height = canvas.parentElement.clientHeight;

      const drawViewport = (viewX, viewWidth, stereoOffset) => {
        ctx.save();
        ctx.beginPath();
        ctx.rect(viewX, 0, viewWidth, height);
        ctx.clip();

        const yaw = cameraAngle.current.yaw + stereoOffset;
        const pitch = cameraAngle.current.pitch;

        // Sky
        const skyGrad = ctx.createLinearGradient(viewX, 0, viewX, height * 0.65);
        skyGrad.addColorStop(0, '#581c0c');
        skyGrad.addColorStop(0.4, '#854d0e');
        skyGrad.addColorStop(0.8, '#b45309');
        skyGrad.addColorStop(1, '#ea580c');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(viewX, 0, viewWidth, height * 0.65);

        // Ground
        const groundGrad = ctx.createLinearGradient(viewX, height * 0.65, viewX, height);
        groundGrad.addColorStop(0, '#7c2d12');
        groundGrad.addColorStop(1, '#451a03');
        ctx.fillStyle = groundGrad;
        ctx.fillRect(viewX, height * 0.65, viewWidth, height * 0.35);

        const centerX = viewX + viewWidth / 2;
        const centerY = height / 2;
        const wrapYaw = (yaw % (Math.PI * 2));

        const getProjCoords = (angX, angY) => {
          let diffX = angX - wrapYaw;
          while (diffX < -Math.PI) diffX += Math.PI * 2;
          while (diffX > Math.PI) diffX -= Math.PI * 2;
          let diffY = angY - pitch;
          const screenX = centerX + diffX * (viewWidth * 0.95);
          const screenY = centerY + diffY * (height * 0.8) + height * 0.15;
          return { x: screenX, y: screenY };
        };

        const drawHills = (offsetAngle, scale, heightOffset, color) => {
          ctx.fillStyle = color;
          ctx.beginPath();
          let started = false;
          for (let a = -Math.PI; a <= Math.PI; a += 0.25) {
            const h = Math.sin(a * 4 + offsetAngle) * 35 + Math.cos(a * 7) * 15 + heightOffset;
            const pt = getProjCoords(a, h / height);
            if (!started) {
              ctx.moveTo(pt.x, pt.y);
              started = true;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          }
          const ptEnd = getProjCoords(Math.PI, 1);
          const ptStart = getProjCoords(-Math.PI, 1);
          ctx.lineTo(ptEnd.x, height);
          ctx.lineTo(ptStart.x, height);
          ctx.closePath();
          ctx.fill();
        };

        drawHills(1.2, 1, -50, '#9a3412');
        drawHills(-0.8, 1.2, -100, '#7c2d12');

        // Rover
        ctx.save();
        const rovBase = getProjCoords(0, -0.15);
        ctx.fillStyle = 'rgba(200, 200, 200, 0.95)';
        ctx.strokeStyle = '#27272a';
        ctx.lineWidth = 1.5;

        ctx.fillStyle = '#18181b';
        for (let i = -16; i <= 16; i += 16) {
          ctx.beginPath();
          ctx.arc(rovBase.x + i, rovBase.y + 12, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }

        ctx.fillStyle = '#d4d4d8';
        ctx.fillRect(rovBase.x - 20, rovBase.y - 12, 40, 20);
        ctx.strokeRect(rovBase.x - 20, rovBase.y - 12, 40, 20);

        ctx.strokeStyle = '#52525b';
        ctx.beginPath();
        ctx.moveTo(rovBase.x - 10, rovBase.y - 12);
        ctx.lineTo(rovBase.x - 10, rovBase.y - 34);
        ctx.stroke();
        ctx.fillStyle = '#27272a';
        ctx.fillRect(rovBase.x - 16, rovBase.y - 38, 12, 8);
        ctx.strokeRect(rovBase.x - 16, rovBase.y - 38, 12, 8);

        ctx.fillStyle = '#60a5fa';
        ctx.beginPath();
        ctx.arc(rovBase.x - 10, rovBase.y - 34, 2, 0, Math.PI*2);
        ctx.fill();
        ctx.restore();

        // Helicopter
        ctx.save();
        const flyHeight = -0.05 + Math.sin(Date.now() * 0.003) * 0.05;
        const heliBase = getProjCoords(-0.4, flyHeight);
        ctx.strokeStyle = '#27272a';
        ctx.lineWidth = 1;
        
        ctx.beginPath();
        ctx.moveTo(heliBase.x, heliBase.y - 6);
        ctx.lineTo(heliBase.x, heliBase.y + 10);
        ctx.stroke();

        ctx.save();
        ctx.translate(heliBase.x, heliBase.y - 4);
        ctx.scale(Math.abs(Math.sin(Date.now() * 0.02)), 0.15);
        ctx.fillStyle = '#71717a';
        ctx.beginPath();
        ctx.arc(0, 0, 24, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(heliBase.x - 5, heliBase.y + 2, 10, 8);
        ctx.strokeRect(heliBase.x - 5, heliBase.y + 2, 10, 8);

        ctx.strokeStyle = '#18181b';
        ctx.beginPath();
        ctx.moveTo(heliBase.x - 4, heliBase.y + 10);
        ctx.lineTo(heliBase.x - 12, heliBase.y + 22);
        ctx.moveTo(heliBase.x + 4, heliBase.y + 10);
        ctx.lineTo(heliBase.x + 12, heliBase.y + 22);
        ctx.stroke();
        ctx.restore();

        // Hotspots
        hotspots.forEach((spot) => {
          const pt = getProjCoords(spot.yaw, spot.pitch);
          ctx.fillStyle = 'rgba(234, 88, 12, 0.4)';
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 14 + Math.sin(Date.now() * 0.005) * 4, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.strokeStyle = '#ea580c';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
          ctx.font = 'bold 9px sans-serif';
          const labelWidth = ctx.measureText(spot.label).width;
          ctx.fillRect(pt.x - labelWidth/2 - 4, pt.y - 25, labelWidth + 8, 14);
          ctx.fillStyle = '#ffffff';
          ctx.fillText(spot.label, pt.x - labelWidth/2, pt.y - 15);
        });

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
        drawViewport(0, width / 2, -0.012);
        drawViewport(width / 2, width / 2, 0.012);
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

    let clicked = null;
    hotspots.forEach((spot) => {
      let diffX = spot.yaw - yaw;
      while (diffX < -Math.PI) diffX += Math.PI * 2;
      while (diffX > Math.PI) diffX -= Math.PI * 2;
      let diffY = spot.pitch - pitch;
      const ptX = centerX + diffX * (viewWidth * 0.95);
      const ptY = centerY + diffY * (height * 0.8) + height * 0.15;

      const dist = Math.hypot(clickX - ptX, clickY - ptY);
      if (dist < 22) clicked = spot;
    });

    if (clicked) setActiveInfo(clicked);
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
    cameraAngle.current.pitch = Math.max(-Math.PI/4, Math.min(Math.PI/4, cameraAngle.current.pitch - deltaY * 0.005));
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

      {/* VR HUD Info overlay - Light Styled */}
      {!isVrMode && (
        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur border border-slate-200/80 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pointer-events-auto shadow-xl">
          <div>
            <h4 className="text-slate-800 text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              Mars Jezero Crater 360° virtual tour
            </h4>
            <p className="text-[11px] text-slate-500 mt-1 max-w-md">
              Drag to explore the Jezero Crater desert in 360°. Click glowing hotspots to inspect the Perseverance Rover, Ingenuity Helicopter, and clay mineral deposits.
            </p>
          </div>
        </div>
      )}

      {/* Info Popup Overlay - Light Styled */}
      {activeInfo && !isVrMode && (
        <div className="absolute top-4 right-4 bg-white/95 border border-slate-200 rounded-2xl p-4 w-72 pointer-events-auto shadow-2xl z-20 animate-fadeIn text-slate-800">
          <div className="flex justify-between items-center mb-2">
            <h5 className="text-slate-900 text-sm font-bold flex items-center gap-1.5">
              <Compass size={14} className="text-amber-500 animate-spin-slow" />
              {activeInfo.title}
            </h5>
            <button onClick={() => setActiveInfo(null)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">&times;</button>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">{activeInfo.desc}</p>
          <div className="mt-3 pt-2 border-t border-slate-100 flex justify-between items-center text-[10px]">
            <span className="text-slate-400 font-mono">Location: Jezero Crater, Mars</span>
            <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded text-[9px]">Hotspot Active</span>
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   3. Deep Ocean Trench VR Explorer
   ========================================================================= */
const OceanSimulator = ({ isVrMode, muted }) => {
  const canvasRef = useRef(null);
  const isDragging = useRef(false);
  const prevMousePos = useRef({ x: 0, y: 0 });
  const cameraAngle = useRef({ yaw: 0, pitch: 0 });
  const flashlightPos = useRef({ x: 200, y: 200 });
  const [activeCreature, setActiveCreature] = useState(null);

  const audioCtxRef = useRef(null);
  const sonarIntervalRef = useRef(null);

  useEffect(() => {
    if (!muted) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        const ping = () => {
          if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
          const osc = ctx.createOscillator();
          const gainNode = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(750, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 1.6);
          gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.9);
          osc.connect(gainNode);
          gainNode.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 2.1);
        };

        ping();
        sonarIntervalRef.current = setInterval(ping, 4800);
      } catch (err) {
        console.error(err);
      }
    } else {
      if (sonarIntervalRef.current) {
        clearInterval(sonarIntervalRef.current);
        sonarIntervalRef.current = null;
      }
      if (audioCtxRef.current) {
        try { audioCtxRef.current.close(); } catch(e){}
        audioCtxRef.current = null;
      }
    }
    return () => {
      if (sonarIntervalRef.current) {
        clearInterval(sonarIntervalRef.current);
      }
      if (audioCtxRef.current) {
        try { audioCtxRef.current.close(); } catch(e){}
      }
    };
  }, [muted]);

  const creatures = [
    { yaw: -0.3, pitch: 0.1, name: 'Bioluminescent Jellyfish', desc: 'Glowing jellyfish that utilize green & blue proteins to light up in pitch black water depths exceeding 3,000 meters.', size: 28 },
    { yaw: 0.2, pitch: -0.15, name: 'Anglerfish', desc: 'A predator of the deep trench with a fleshy glowing bulb hanging in front of its mouth to attract prey.', size: 24 },
    { yaw: -0.85, pitch: -0.05, name: 'Giant Squid', desc: 'A mysterious and massive cephalopod that lives at extreme deep ocean pressures. Highly elusive.', size: 45 },
    { yaw: 0.6, pitch: 0.2, name: 'Comb Jelly', desc: 'Creates stunning rainbow-like shimmering lights along its cilia rows, reflecting light in procedural visual waves.', size: 20 }
  ];

  const bubblesRef = useRef([]);
  if (bubblesRef.current.length === 0) {
    for (let i = 0; i < 60; i++) {
      bubblesRef.current.push({
        x: Math.random() * Math.PI * 2,
        y: Math.random() * 2 - 1,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.005 + 0.002
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

      const drawViewport = (viewX, viewWidth, stereoOffset) => {
        ctx.save();
        ctx.beginPath();
        ctx.rect(viewX, 0, viewWidth, height);
        ctx.clip();

        const yaw = cameraAngle.current.yaw + stereoOffset;
        const pitch = cameraAngle.current.pitch;

        const bgGrad = ctx.createLinearGradient(viewX, 0, viewX, height);
        bgGrad.addColorStop(0, '#020617');
        bgGrad.addColorStop(0.5, '#010413');
        bgGrad.addColorStop(1, '#000000');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(viewX, 0, viewWidth, height);

        const centerX = viewX + viewWidth / 2;
        const centerY = height / 2;

        const getProjCoords = (angX, angY) => {
          let diffX = angX - yaw;
          while (diffX < -Math.PI) diffX += Math.PI * 2;
          while (diffX > Math.PI) diffX -= Math.PI * 2;
          let diffY = angY - pitch;
          const screenX = centerX + diffX * (viewWidth * 1.1);
          const screenY = centerY + diffY * (height * 0.9);
          return { x: screenX, y: screenY };
        };

        ctx.fillStyle = 'rgba(14, 165, 233, 0.18)';
        bubblesRef.current.forEach((bubble) => {
          bubble.y += bubble.speed;
          if (bubble.y > 1.2) bubble.y = -1.2;
          const pt = getProjCoords(bubble.x, bubble.y);
          if (pt.x > viewX && pt.x < viewX + viewWidth) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, bubble.size, 0, Math.PI * 2);
            ctx.fill();
          }
        });

        const beamX = centerX + flashlightPos.current.x;
        const beamY = centerY + flashlightPos.current.y;
        const beamRadius = viewWidth * 0.25;

        const lightGrad = ctx.createRadialGradient(beamX, beamY, 0, beamX, beamY, beamRadius);
        lightGrad.addColorStop(0, 'rgba(56, 189, 248, 0.18)');
        lightGrad.addColorStop(0.5, 'rgba(14, 165, 233, 0.08)');
        lightGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = lightGrad;
        ctx.beginPath();
        ctx.arc(beamX, beamY, beamRadius, 0, Math.PI * 2);
        ctx.fill();

        creatures.forEach((creature) => {
          const pt = getProjCoords(creature.yaw, creature.pitch);
          const distToBeam = Math.hypot(pt.x - beamX, pt.y - beamY);
          const isIlluminated = distToBeam < beamRadius;

          ctx.save();
          if (isIlluminated) {
            ctx.globalAlpha = 0.95;
          } else {
            ctx.globalAlpha = 0.22 + Math.abs(Math.sin(Date.now() * 0.002)) * 0.15;
          }

          ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)';
          ctx.lineWidth = 2;
          ctx.fillStyle = 'rgba(14, 165, 233, 0.15)';

          if (creature.name === 'Bioluminescent Jellyfish') {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, creature.size, Math.PI, 0);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();

            ctx.beginPath();
            ctx.lineWidth = 1;
            for (let i = -creature.size + 4; i < creature.size; i += 6) {
              const tx = pt.x + i;
              const ty = pt.y;
              ctx.moveTo(tx, ty);
              const wave = Math.sin(Date.now() * 0.006 + i) * 6;
              ctx.bezierCurveTo(tx, ty + 12, tx + wave, ty + 24, tx + wave/2, ty + 38);
            }
            ctx.stroke();
          } 
          else if (creature.name === 'Anglerfish') {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, creature.size * 0.8, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fill();
            ctx.fillStyle = 'rgba(56, 189, 248, 0.7)';
            ctx.beginPath();
            ctx.moveTo(pt.x - creature.size/2, pt.y);
            ctx.lineTo(pt.x, pt.y + creature.size/4);
            ctx.lineTo(pt.x + creature.size/2, pt.y);
            ctx.stroke();

            ctx.strokeStyle = 'rgba(234, 179, 8, 0.8)';
            ctx.beginPath();
            ctx.moveTo(pt.x + creature.size/3, pt.y - creature.size/2);
            ctx.quadraticCurveTo(pt.x + creature.size * 0.7, pt.y - creature.size, pt.x + creature.size * 0.9, pt.y - creature.size * 0.4);
            ctx.stroke();

            ctx.fillStyle = '#fef08a';
            ctx.beginPath();
            ctx.arc(pt.x + creature.size * 0.9, pt.y - creature.size * 0.4, 4 + Math.sin(Date.now() * 0.01) * 2, 0, Math.PI * 2);
            ctx.fill();
          } 
          else if (creature.name === 'Giant Squid') {
            ctx.beginPath();
            ctx.ellipse(pt.x, pt.y, creature.size * 0.8, creature.size * 0.3, Math.PI / 12, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fill();
            
            ctx.beginPath();
            ctx.moveTo(pt.x - creature.size * 0.7, pt.y);
            ctx.lineTo(pt.x - creature.size * 1.5, pt.y - 8);
            ctx.moveTo(pt.x - creature.size * 0.7, pt.y + 4);
            ctx.lineTo(pt.x - creature.size * 1.4, pt.y + 12);
            ctx.stroke();
          }
          else {
            ctx.beginPath();
            ctx.ellipse(pt.x, pt.y, creature.size, creature.size * 0.7, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fill();

            const hue = (Date.now() / 20) % 360;
            ctx.strokeStyle = `hsla(${hue}, 85%, 65%, 0.85)`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(pt.x - creature.size, pt.y);
            ctx.lineTo(pt.x + creature.size, pt.y);
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

        ctx.strokeStyle = 'rgba(14, 165, 233, 0.12)';
        ctx.lineWidth = 4;
        ctx.strokeRect(viewX + 20, 20, viewWidth - 40, height - 40);

        ctx.fillStyle = 'rgba(14, 165, 233, 0.03)';
        for (let i = 0; i < height; i += 6) {
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
    creatures.forEach((creature) => {
      let diffX = creature.yaw - yaw;
      while (diffX < -Math.PI) diffX += Math.PI * 2;
      while (diffX > Math.PI) diffX -= Math.PI * 2;
      let diffY = creature.pitch - pitch;
      const ptX = centerX + diffX * (viewWidth * 1.1);
      const ptY = centerY + diffY * (height * 0.9);
      const dist = Math.hypot(clickX - ptX, clickY - ptY);
      if (dist < creature.size + 15) clickedCreature = creature;
    });

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

      {/* VR HUD Info overlay - Light Styled */}
      {!isVrMode && (
        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur border border-slate-200/80 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pointer-events-auto shadow-xl">
          <div>
            <h4 className="text-slate-800 text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Submarine Deep-Sea HUD Console
            </h4>
            <p className="text-[11px] text-slate-500 mt-1 max-w-md">
              Aim the searchlight at creatures to illuminate them. Click on any target to trigger the biological database scan.
            </p>
          </div>
        </div>
      )}

      {/* Creature Database Bio Popup - Light Styled */}
      {activeCreature && !isVrMode && (
        <div className="absolute top-4 right-4 bg-white/95 border border-emerald-100 rounded-2xl p-4 w-72 pointer-events-auto shadow-2xl z-20 animate-fadeIn text-slate-800">
          <div className="flex justify-between items-center mb-2">
            <h5 className="text-emerald-600 text-xs font-mono font-bold flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-emerald-500" />
              SCAN COMPLETED
            </h5>
            <button onClick={() => setActiveCreature(null)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">&times;</button>
          </div>
          <h4 className="text-slate-900 text-sm font-extrabold mb-1 tracking-wide">{activeCreature.name}</h4>
          <p className="text-[11px] text-slate-600 leading-relaxed font-sans">{activeCreature.desc}</p>
          <div className="mt-3 pt-2 border-t border-emerald-50 flex justify-between items-center text-[10px] text-slate-400 font-mono">
            <span>Pressure: ~350 atm</span>
            <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded text-[9px]">Class: Abyssal</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VrSimulators;
