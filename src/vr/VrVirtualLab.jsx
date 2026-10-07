import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import ReactPlayer from 'react-player';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture } from '@react-three/drei';
import VRHand from './VRHand';
import { 
  Sliders, 
  Glasses, Hand, Box, MousePointerClick, 
  Paintbrush, Layers, Maximize, Minimize, Globe, 
  Gamepad2, Search, Zap, Hexagon, XCircle, Heart,
  ChevronDown, Check
} from 'lucide-react';
import Real3DHeart from './Real3DHeart';
import Real3DBrain from './Real3DBrain';
import Real3DSkeleton from './Real3DSkeleton';
import Generic3DViewer from './Generic3DViewer';



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

const CustomDropdown = ({ icon: Icon, placeholder, value, options, activeTab, tabKey, onSelect, menuClassName = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isActive = activeTab === tabKey;
  const selectedOption = options.find(o => o.value === value);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative max-sm:w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`max-sm:w-full max-sm:justify-center flex items-center gap-2 px-3.5 py-2 rounded-xl font-extrabold text-[13px] transition-all cursor-pointer ${
          isActive 
            ? 'bg-blue-600 text-white shadow-md' 
            : 'text-slate-500 hover:text-blue-600 hover:bg-white'
        }`}
      >
        <Icon size={16} />
        <span>{isActive && selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown size={14} className={`transition-transform duration-200 opacity-70 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute top-full left-0 mt-2 w-52 max-w-[calc(100vw-3rem)] ${menuClassName} bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl shadow-2xl z-50 p-1.5 animate-in fade-in zoom-in-95 duration-150`}>
          <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 py-1.5 border-b border-slate-100 mb-1">
            {placeholder}
          </div>
          {options.map((opt) => {
            const isSelected = isActive && value === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onSelect(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center justify-between cursor-pointer ${
                  isSelected 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-slate-700 hover:bg-slate-100/80 hover:text-blue-600'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && <Check size={14} className="text-blue-600" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const VrVirtualLab = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('vr-headset');
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const vrDemosList = [
    {
      title: t('vrVirtualLab.demos.vrHeadset.title'),
      desc: t('vrVirtualLab.demos.vrHeadset.desc'),
      icon: <Glasses size={32} />,
      color: "from-blue-500 to-indigo-600",
      shadow: "shadow-blue-500/20",
    },
    {
      title: t('vrVirtualLab.demos.objectViewer.title'),
      desc: t('vrVirtualLab.demos.objectViewer.desc'),
      icon: <Box size={32} />,
      color: "from-rose-400 to-pink-500",
      shadow: "shadow-rose-500/20",
    },
    {
      title: t('vrVirtualLab.demos.anatomy.title'),
      desc: t('vrVirtualLab.demos.anatomy.desc'),
      icon: <Layers size={32} />,
      color: "from-cyan-400 to-blue-500",
      shadow: "shadow-cyan-500/20",
    }
  ];

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
            <Canvas camera={{ position: [0, 0, isMobile ? 8.5 : 6], fov: 60 }}>
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
          
          <div className="absolute top-3 left-3 sm:top-6 sm:left-6 z-10 pointer-events-none flex flex-col gap-2 sm:gap-4">
            <div>
              <h2 className="text-xl sm:text-3xl font-black text-white drop-shadow-lg tracking-wider">
                {t('vrVirtualLab.vrDemo.title')}
              </h2>
              <p className="text-sky-300 text-xs sm:text-sm font-bold mt-0.5 sm:mt-1 drop-shadow-md">
                {t('vrVirtualLab.vrDemo.subtitle')}
              </p>
            </div>

            <details className="bg-slate-900/90 border border-slate-700 rounded-xl sm:rounded-2xl w-44 sm:w-52 backdrop-blur-md shadow-2xl group pointer-events-auto cursor-pointer">
              <summary className="p-2 sm:p-3 flex items-center justify-between outline-none select-none list-none [&::-webkit-details-marker]:hidden">
                <div className="flex items-center gap-2">
                  <Glasses className="text-sky-400" size={16} />
                  <h3 className="font-bold text-sky-400 text-xs">{t('vrVirtualLab.vrDemo.howItWorks')}</h3>
                </div>
                <span className="text-sky-400 group-open:rotate-180 transition-transform duration-200 text-[10px]">▼</span>
              </summary>
              <div className="px-3 pb-3 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <p className="text-slate-300 text-[11px] leading-relaxed font-medium border-t border-slate-700 pt-2">
                  {t('vrVirtualLab.vrDemo.howP1')}
                </p>
                <p className="text-slate-300 text-[11px] leading-relaxed font-medium">
                  {t('vrVirtualLab.vrDemo.howP2')}
                </p>
              </div>
            </details>
          </div>

          <div className="absolute bottom-3 sm:bottom-8 text-white bg-black/70 px-3 py-1.5 sm:px-6 sm:py-3 rounded-full text-[10px] sm:text-sm font-bold border border-white/10 tracking-wider sm:tracking-widest uppercase pointer-events-none z-20 whitespace-nowrap">
            {t('vrVirtualLab.vrDemo.dragPrompt')}
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
    <div className="bg-gradient-to-br from-indigo-50/80 via-white to-sky-50/80 border border-indigo-100/50 text-slate-800 p-2.5 sm:p-4 md:p-6 shadow-2xl relative overflow-x-hidden font-sans transition-all duration-300 rounded-2xl sm:rounded-[2rem]">
      
      {/* Soft background pastel accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-400/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header controls */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-2.5 sm:gap-4 border-b border-indigo-100/50 pb-3 sm:pb-5 mb-3 sm:mb-6 relative z-40">
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-black tracking-tight">
            {t('vrVirtualLab.heading')}
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm font-medium mt-0.5 sm:mt-1">{t('vrVirtualLab.subheading')}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          {/* Tab Buttons */}
          <div className="grid grid-cols-2 sm:flex w-full sm:w-auto gap-1.5 sm:gap-2 bg-white/60 backdrop-blur-md p-1 sm:p-1.5 rounded-2xl border border-white shadow-sm relative z-50">
            <button 
              onClick={() => setActiveTab('vr-headset')}
              className={`px-4 py-2 rounded-xl font-extrabold text-[13px] transition-all flex items-center justify-center gap-2 ${
                activeTab === 'vr-headset' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-blue-600 hover:bg-white'
              }`}
            >
              <Glasses size={16} /> {t('vrVirtualLab.tabs.vrHeadset')}
            </button>
            
            <CustomDropdown 
              icon={Box}
              placeholder={t('vrVirtualLab.tabs.objectViewer')}
              value={activeViewerModel}
              activeTab={activeTab}
              tabKey="3d-viewer"
              menuClassName="max-sm:left-auto max-sm:right-0"
              options={[
                { label: t('vrVirtualLab.models.dna'), value: 'dna' },
                { label: t('vrVirtualLab.models.virus'), value: 'virus' },
                { label: t('vrVirtualLab.models.atom'), value: 'atom' }
              ]}
              onSelect={(val) => {
                setActiveTab('3d-viewer');
                setActiveViewerModel(val);
              }}
            />
            
            <CustomDropdown 
              icon={Layers}
              placeholder={t('vrVirtualLab.tabs.anatomy')}
              value={activeModel}
              activeTab={activeTab}
              tabKey="3d-anatomy"
              options={[
                { label: t('vrVirtualLab.models.heart'), value: 'heart' },
                { label: t('vrVirtualLab.models.brain'), value: 'brain' },
                { label: t('vrVirtualLab.models.skeleton'), value: 'skeleton' }
              ]}
              onSelect={(val) => {
                setActiveTab('3d-anatomy');
                setActiveModel(val);
              }}
            />

            <button 
              onClick={() => setActiveTab('color')}
              className={`px-4 py-2 rounded-xl font-extrabold text-[13px] transition-all flex items-center justify-center gap-2 ${
                activeTab === 'color' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-blue-600 hover:bg-white'
              }`}
            >
              <Sliders size={16} /> {t('vrVirtualLab.tabs.colorMixer')}
            </button>
          </div>
        </div>
      </div>

      {/* ======================= TAB 2: COLOR MIXER LAB ======================= */}
      {activeTab === 'color' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-5 relative z-10">
          
          <div className="col-span-1 lg:col-span-3 bg-white/95 border border-blue-100 rounded-2xl p-3 sm:p-4 shadow-sm">
            <h2 className="text-xl font-black text-blue-700 tracking-wider">{t('vrVirtualLab.colorMixer.heading')}</h2>
            <p className="mt-2 text-slate-600 text-[13px] font-medium leading-relaxed">
              <span className="font-bold text-blue-600">{t('vrVirtualLab.colorMixer.whyVR')} </span> {t('vrVirtualLab.colorMixer.explanation')}
            </p>
          </div>

          <div className="bg-white/95 border border-blue-100 rounded-2xl p-3 sm:p-4 space-y-3 sm:space-y-4 shadow-sm">
            <h3 className="text-xs font-extrabold tracking-wider text-blue-700 uppercase">
              {t('vrVirtualLab.colorMixer.slidersLabel')}
            </h3>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-rose-600 font-extrabold">
                  <span>{t('vrVirtualLab.colorMixer.red')}</span>
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
                  <span>{t('vrVirtualLab.colorMixer.green')}</span>
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
                  <span>{t('vrVirtualLab.colorMixer.blue')}</span>
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
              <div className="font-extrabold text-blue-900">{t('vrVirtualLab.colorMixer.formulasLabel')}</div>
              <div>{t('vrVirtualLab.colorMixer.formula1')}</div>
              <div>{t('vrVirtualLab.colorMixer.formula2')}</div>
              <div>{t('vrVirtualLab.colorMixer.formula3')}</div>
              <div>{t('vrVirtualLab.colorMixer.formula4')}</div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white border border-blue-100 rounded-2xl p-3 sm:p-5 flex flex-col items-center justify-center min-h-[200px] sm:min-h-[300px] text-center shadow-sm">
            <span className="text-xs text-slate-500 font-extrabold mb-4 uppercase tracking-wider">{t('vrVirtualLab.colorMixer.outputLabel')}</span>
            
            {/* The mixed color bulb */}
            <div 
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-xl transition-all duration-150 mb-3 sm:mb-4"
              style={{ 
                backgroundColor: `rgb(${redLight}, ${greenLight}, ${blueLight})`,
                boxShadow: `0 8px 30px rgba(${redLight}, ${greenLight}, ${blueLight}, 0.4)`
              }}
            />

            <span className="text-sm font-extrabold text-slate-800 px-4 py-1.5 bg-slate-100 border border-slate-200 rounded-xl">
              RGB: ({redLight}, {greenLight}, {blueLight})
            </span>
            <p className="text-slate-600 font-medium text-xs mt-3 max-w-sm">
              {t('vrVirtualLab.colorMixer.outputDesc')}
            </p>
          </div>
        </div>
      )}

      {/* ======================= VR EXPERIENCES RENDER ======================= */}
      {['vr-headset', '3d-viewer', '3d-anatomy'].includes(activeTab) && (
        <div className="relative z-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 rounded-3xl overflow-hidden border border-indigo-100 shadow-inner mt-1 sm:mt-2 h-[480px] sm:h-[600px]">
          {renderSimulation()}
        </div>
      )}

    </div>
  );
};

export default VrVirtualLab;
