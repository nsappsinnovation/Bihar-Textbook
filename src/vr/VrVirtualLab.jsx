import React, { useState, useEffect, useRef, Suspense } from 'react';
import ReactPlayer from 'react-player';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture } from '@react-three/drei';
import VRHand from './VRHand';
import { 
  Sliders, 
  Glasses, Hand, Box, MousePointerClick, 
  Paintbrush, Layers, Maximize, Minimize, Globe, 
  Gamepad2, Search, Zap, Hexagon, XCircle, Heart
} from 'lucide-react';
import Real3DHeart from './Real3DHeart';
import Real3DBrain from './Real3DBrain';
import Real3DSkeleton from './Real3DSkeleton';
import Generic3DViewer from './Generic3DViewer';

const vrDemosList = [
  {
    title: "VR Headset Demo",
    desc: "Headset pehenkar virtual world ka preview.",
    icon: <Glasses size={32} />,
    color: "from-blue-500 to-indigo-600",
    shadow: "shadow-blue-500/20",
  },
  {
    title: "3D Object Viewer",
    desc: "Basic 3D object ko 360° me dekhna aur rotate karna.",
    icon: <Box size={32} />,
    color: "from-rose-400 to-pink-500",
    shadow: "shadow-rose-500/20",
  },
  {
    title: "3D Anatomy Explorer",
    desc: "Human heart, brain, ya skeleton ko 3D me explore karna.",
    icon: <Layers size={32} />,
    color: "from-cyan-400 to-blue-500",
    shadow: "shadow-cyan-500/20",
  }
];

const TexturedEarth = () => {
  // Using a realistic NASA Earth map with meshBasicMaterial to ensure it is evenly bright 360 degrees (no night shadows)
  const texture = useTexture('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');
  return (
    <mesh>
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

const VrVirtualLab = () => {
  const [activeTab, setActiveTab] = useState('vr-headset');

  // Tab 2: Color Mixer State
  const [redLight, setRedLight] = useState(255);
  const [greenLight, setGreenLight] = useState(0);
  const [blueLight, setBlueLight] = useState(255);

  // 3D Anatomy State
  const [activeModel, setActiveModel] = useState('heart');
  
  const [heartPuzzle, setHeartPuzzle] = useState({
    aorta: false,
    rightVentricle: false,
    leftVentricle: false
  });
  
  // 3D Object state
  const [activeViewerModel, setActiveViewerModel] = useState('dna');
  const [rotX, setRotX] = useState(-20);
  const [rotY, setRotY] = useState(30);
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const playerRef = useRef(null);

  const handle3DDragStart = (e) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };
  
  const handle3DDragEnd = () => {
    isDragging.current = false;
  };
  
  const handle3DDragMove = (e) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;
    setRotY(prev => prev + deltaX * 0.5);
    setRotX(prev => prev - deltaY * 0.5);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const renderSimulation = () => {
    if (activeTab === "vr-headset") {
      return (
        <div className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center cursor-move rounded-3xl">
          
          <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
              <ambientLight intensity={1.5} color="#ffffff" />
              <directionalLight position={[5, 3, 5]} intensity={2.5} color="#ffffff" />
              <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
              <Suspense fallback={null}>
                <TexturedEarth />
              </Suspense>
              <OrbitControls enableZoom={false} autoRotate={true} autoRotateSpeed={1.5} />
              <VRHand />
            </Canvas>
          </div>

          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          
          <div className="absolute top-6 left-6 z-10 pointer-events-none flex flex-col gap-4">
            <div>
              <h2 className="text-3xl font-black text-white drop-shadow-lg tracking-wider">
                VR Headset Demo
              </h2>
              <p className="text-sky-300 text-sm font-bold mt-1 drop-shadow-md">
                Stereoscopic 3D • 360° Panorama
              </p>
            </div>

            <details className="bg-slate-900/90 border border-slate-700 rounded-2xl w-52 backdrop-blur-md shadow-2xl group pointer-events-auto cursor-pointer">
              <summary className="p-3 flex items-center justify-between outline-none select-none list-none [&::-webkit-details-marker]:hidden">
                <div className="flex items-center gap-2">
                  <Glasses className="text-sky-400" size={16} />
                  <h3 className="font-bold text-sky-400 text-xs">How VR Works</h3>
                </div>
                <span className="text-sky-400 group-open:rotate-180 transition-transform duration-200 text-[10px]">▼</span>
              </summary>
              <div className="px-3 pb-3 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <p className="text-slate-300 text-[11px] leading-relaxed font-medium border-t border-slate-700 pt-2">
                  A VR headset uses <span className="text-white font-bold">two separate lenses</span> to show a slightly different picture to your left and right eye.
                </p>
                <p className="text-slate-300 text-[11px] leading-relaxed font-medium">
                  This tricks your brain into seeing a deep, immersive <span className="text-white font-bold">3D virtual world!</span>
                </p>
              </div>
            </details>
          </div>

          <div className="absolute bottom-8 text-white bg-black/70 px-6 py-3 rounded-full text-sm font-bold border border-white/10 tracking-widest uppercase pointer-events-none z-20">
            Drag Earth to rotate 360°
          </div>
        </div>
      );
    }

    if (activeTab === "3d-viewer") {
      return <Generic3DViewer activeModel={activeViewerModel} />;
    }

    if (activeTab === "3d-anatomy") {
      if (activeModel === 'brain') {
        return <Real3DBrain />;
      }
      if (activeModel === 'heart') {
        return <Real3DHeart />;
      }
      if (activeModel === 'skeleton') {
        return <Real3DSkeleton />;
      }
      return null;
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50/80 via-white to-sky-50/80 border border-indigo-100/50 text-slate-800 p-4 md:p-6 shadow-2xl relative overflow-x-hidden font-sans transition-all duration-300 rounded-[2rem]">
      
      {/* Soft background pastel accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-400/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header controls */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 border-b border-indigo-100/50 pb-5 mb-6 relative z-10">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-black tracking-tight">
            Interactive Digital Laboratory
          </h2>
          <p className="text-slate-500 text-sm font-medium mt-1">Explore concepts through immersive interactive experiences.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Tab Buttons */}
          <div className="flex gap-2 bg-white/60 backdrop-blur-md p-1.5 rounded-2xl border border-white shadow-sm shrink-0">
            <button 
              onClick={() => setActiveTab('vr-headset')}
              className={`px-4 py-2 rounded-xl font-extrabold text-[13px] transition-all flex items-center gap-2 ${
                activeTab === 'vr-headset' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-blue-600 hover:bg-white'
              }`}
            >
              <Glasses size={16} /> VR Headset Demo
            </button>
            
            <div className={`flex items-center gap-2 px-1 rounded-xl transition-all ${activeTab === '3d-viewer' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-white text-slate-500'}`}>
               <Box size={16} className="ml-3" />
               <select 
                 value={activeTab === '3d-viewer' ? activeViewerModel : ''} 
                 onChange={(e) => {
                   setActiveTab('3d-viewer');
                   setActiveViewerModel(e.target.value);
                 }}
                 className={`py-2 pr-4 bg-transparent font-extrabold text-[13px] outline-none cursor-pointer ${activeTab === '3d-viewer' ? 'text-white' : 'text-slate-500 hover:text-blue-600'}`}
               >
                 <option value="" disabled hidden>3D Object Viewer</option>
                 <option value="dna" className="text-slate-700">DNA Strand</option>
                 <option value="virus" className="text-slate-700">Bacteriophage Virus</option>
                 <option value="atom" className="text-slate-700">Atomic Structure</option>
               </select>
            </div>
            
            <div className={`flex items-center gap-2 px-1 rounded-xl transition-all ${activeTab === '3d-anatomy' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-white text-slate-500'}`}>
               <Layers size={16} className="ml-3" />
               <select 
                 value={activeTab === '3d-anatomy' ? activeModel : ''} 
                 onChange={(e) => {
                   setActiveTab('3d-anatomy');
                   setActiveModel(e.target.value);
                 }}
                 className={`py-2 pr-4 bg-transparent font-extrabold text-[13px] outline-none cursor-pointer ${activeTab === '3d-anatomy' ? 'text-white' : 'text-slate-500 hover:text-blue-600'}`}
               >
                 <option value="" disabled hidden>3D Anatomy Explorer</option>
                 <option value="heart" className="text-slate-700">Human Heart</option>
                 <option value="brain" className="text-slate-700">Human Brain</option>
                 <option value="skeleton" className="text-slate-700">Skeleton Structure</option>
               </select>
            </div>

            <button 
              onClick={() => setActiveTab('color')}
              className={`px-4 py-2 rounded-xl font-extrabold text-[13px] transition-all flex items-center gap-2 ${
                activeTab === 'color' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-blue-600 hover:bg-white'
              }`}
            >
              <Sliders size={16} /> Color Mixer
            </button>
          </div>
        </div>
      </div>

      {/* ======================= TAB 2: COLOR MIXER LAB ======================= */}
      {activeTab === 'color' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 relative z-10">
          
          <div className="col-span-1 lg:col-span-3 bg-white/95 border border-blue-100 rounded-2xl p-4 shadow-sm">
            <h2 className="text-xl font-black text-blue-700 tracking-wider">Physics: RGB Light Mixing</h2>
            <p className="mt-2 text-slate-600 text-[13px] font-medium leading-relaxed">
              <span className="font-bold text-blue-600">Why in VR? </span> Every single color you see inside a VR headset or computer screen is made using just 3 tiny lights: <span className="text-rose-600 font-bold">Red</span>, <span className="text-emerald-600 font-bold">Green</span>, and <span className="text-sky-600 font-bold">Blue</span> (RGB). By changing how bright they are, VR screens can create millions of colors to build super realistic virtual worlds!
            </p>
          </div>

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

      {/* ======================= VR EXPERIENCES RENDER ======================= */}
      {['vr-headset', '3d-viewer', '3d-anatomy'].includes(activeTab) && (
        <div className="relative z-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 rounded-3xl overflow-hidden border border-indigo-100 shadow-inner mt-2 h-[600px]">
          {renderSimulation()}
        </div>
      )}

    </div>
  );
};

export default VrVirtualLab;
