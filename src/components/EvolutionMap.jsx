import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Map, MonitorPlay, Glasses, Sparkles, BookHeadphones, MapPin, Cpu, Printer } from 'lucide-react';

const milestones = [
  {
    year: '1965',
    title: 'Foundation',
    description: 'BSTBPC was established with a vision to provide quality and accessible textbooks across Bihar.',
    icon: BookOpen,
    color: 'from-amber-400 to-orange-500',
    glow: 'rgba(245, 158, 11, 0.4)',
    accent: '#f59e0b'
  },
  {
    year: '1967',
    title: 'GDR Printing Project',
    description: 'VEB Polygraph (GDR) printing project selected to modernize and standardize textbook production.',
    icon: Printer,
    color: 'from-teal-400 to-emerald-500',
    glow: 'rgba(16, 185, 129, 0.4)',
    accent: '#10b981'
  },
  {
    year: '1972',
    title: 'Production Started',
    description: 'First textbook printing unit started production in Bihar, boosting local publishing capability.',
    icon: Cpu,
    color: 'from-rose-400 to-pink-500',
    glow: 'rgba(244, 63, 94, 0.4)',
    accent: '#f43f5e'
  },
  {
    year: '1970s–2000s',
    title: 'Statewide Expansion',
    description: 'Textbook printing and distribution network scaled rapidly to cover schools in all 38 districts of Bihar.',
    icon: Map,
    color: 'from-blue-400 to-indigo-500',
    glow: 'rgba(59, 130, 246, 0.4)',
    accent: '#3b82f6'
  },
  {
    year: '2010s–2020s',
    title: 'Digital Innovation',
    description: 'Transitioned to e-tenders, online textbook access, digital portals, and advanced administration.',
    icon: MonitorPlay,
    color: 'from-purple-400 to-pink-500',
    glow: 'rgba(168, 85, 247, 0.4)',
    accent: '#d946ef'
  }
];

import mapData from './biharMapData.json';

const GEOJSON_TO_DISTRICT = {
  "Araria": "Araria",
  "Arwal": "Arwal",
  "Aurangabad": "Aurangabad",
  "Banka": "Banka",
  "Begusarai": "Begusarai",
  "Kaimur (Bhabua)": "Kaimur (Bhabhua)",
  "Bhagalpur": "Bhagalpur",
  "Bhojpur": "Bhojpur (Aarah)",
  "Buxar": "Buxar",
  "Gaya": "Gaya",
  "Gopalganj": "Gopalganj",
  "Jamui": "Jamui",
  "Jehanabad": "Jehanabad",
  "Katihar": "Katihar",
  "Khagaria": "Khagaria",
  "Kishanganj": "Kishanganj",
  "Madhepura": "Madhepura",
  "Muzaffarpur": "Muzaffarpur",
  "Nalanda": "Nalanda (Biharsharif)",
  "Nawada": "Nawada",
  "Pashchim Champaran": "West Champaran (Bettiah)",
  "Patna": "Patna HQ",
  "Purba Champaran": "East Champaran (Motihari)",
  "Purnia": "Purnia",
  "Rohtas": "Rohtas (Sasaram)",
  "Saharsa": "Saharsa",
  "Samastipur": "Samastipur",
  "Saran": "Saran (Chappra)",
  "Sheikhpura": "Sheikhpura",
  "Sheohar": "Sheohar",
  "Sitamarhi": "Sitamarhi",
  "Supaul": "Supaul",
  "Vaishali": "Vaishali (Hajipur)",
  "Darbhanga": "Darbhanga",
  "Madhubani": "Madhubani",
  "Munger": "Munger",
  "Siwan": "Siwan",
  "Lakhisarai": "Lakhisarai"
};

const KEY_DISTRICTS = [
  "Patna",
  "Muzaffarpur",
  "Gaya",
  "Purnia",
  "Bhagalpur",
  "Darbhanga",
  "Rohtas",
  "Pashchim Champaran",
  "Saran"
];

// Nodes mapped to the actual shape of Bihar ONLY for the key connected districts
const cities = KEY_DISTRICTS.map((geoKey) => {
  const distName = GEOJSON_TO_DISTRICT[geoKey] || geoKey;
  const feature = mapData.paths.find(p => 
    p.district.toLowerCase() === geoKey.toLowerCase() || 
    p.district.toLowerCase().includes(geoKey.toLowerCase())
  );
  return {
    id: geoKey.toLowerCase().replace(/\s+/g, '-'),
    label: distName,
    district: geoKey,
    main: geoKey === 'Patna',
    cx: feature ? feature.centroid[0] : 0,
    cy: feature ? feature.centroid[1] : 0,
    x: feature ? `${(feature.centroid[0]/mapData.width)*100}%` : '0%',
    y: feature ? `${(feature.centroid[1]/mapData.height)*100}%` : '0%'
  };
});

const connections = [
  ['patna', 'muzaffarpur'],
  ['patna', 'gaya'],
  ['patna', 'bhagalpur'],
  ['patna', 'rohtas'],
  ['patna', 'darbhanga'],
  ['patna', 'saran'],
  ['muzaffarpur', 'pashchim-champaran'],
  ['darbhanga', 'purnia'],
  ['bhagalpur', 'purnia'],
  ['rohtas', 'gaya']
];

const EvolutionMap = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredDistrict, setHoveredDistrict] = useState(null);

  // Auto advance timeline
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % milestones.length);
    }, 5000); // changes every 5 seconds for better reading time
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-[#fcfcfd] py-16 px-6 md:px-12 lg:px-24 font-sans text-slate-900 overflow-hidden relative border-y border-slate-100">
      
      

      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          
          {/* Left Column: Heading, Text & Timeline */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-5/12 flex flex-col justify-center"
          >
            <div className="flex items-center gap-2 mb-4">
               <motion.div 
                 initial={{ width: 0 }}
                 whileInView={{ width: 24 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: 0.3 }}
                 className="h-px bg-blue-600"
               ></motion.div>
               <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">Our Evolution</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4 leading-tight">
               Journey &amp; <br /> <span className="text-slate-400 font-medium">Digital Footprint</span>
            </h2>
            <p className="text-sm text-slate-500 font-medium leading-relaxed mb-10 pr-4">
               From physical textbook printing in 1965 to modern immersive digital learning in 2024. Witness our expansion and modernization across all 38 districts of Bihar.
            </p>

            {/* The Milestones Timeline */}
            <div className="relative pl-6 min-h-[450px]">
              <div className="space-y-8 relative z-10">
                {milestones.map((milestone, index) => {
                  const isActive = index === activeIndex;
                  const isPast = index < activeIndex;
                  const Icon = milestone.icon;
                  
                  return (
                    <div 
                      key={milestone.year} 
                      className={`relative flex items-start gap-5 cursor-pointer group transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                      onClick={() => setActiveIndex(index)}
                    >
                      {/* Line to next item */}
                      {index < milestones.length - 1 && (
                        <div 
                          className="absolute left-[19px] top-[24px] w-0.5 bg-slate-200 z-0" 
                          style={{ bottom: '-56px' }}
                        >
                          <motion.div 
                            className="w-full bg-blue-500 origin-top"
                            initial={{ height: 0 }}
                            animate={{ height: isPast ? '100%' : '0%' }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                          />
                        </div>
                      )}

                      {/* Node Icon */}
                      <div className="relative z-10 flex-shrink-0 mt-1">
                        <motion.div 
                          className={`w-10 h-10 rounded-full flex items-center justify-center border-[3px] border-white shadow-sm transition-colors duration-500 ${isActive || isPast ? 'bg-gradient-to-br ' + milestone.color : 'bg-slate-200'}`}
                          animate={{
                            scale: isActive ? 1.2 : 1,
                            boxShadow: isActive ? `0 0 15px ${milestone.glow}` : '0 2px 4px rgba(0,0,0,0.05)',
                          }}
                        >
                          <Icon className={`w-4 h-4 ${isActive || isPast ? 'text-white' : 'text-slate-400'}`} />
                        </motion.div>
                      </div>

                      {/* Node Content */}
                      <div className="pt-0.5">
                        <div className="flex items-baseline gap-3 mb-1">
                          <span className={`text-xl font-black ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r ' + milestone.color : 'text-slate-400'}`}>
                            {milestone.year}
                          </span>
                          <h3 className={`text-lg font-bold ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
                            {milestone.title}
                          </h3>
                        </div>
                        <AnimatePresence>
                          {isActive && (
                            <motion.p 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-sm text-slate-500 leading-relaxed overflow-hidden"
                            >
                              {milestone.description}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Actual Bihar Map with Animations */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-7/12 flex items-center justify-center relative min-h-[450px]"
          >
            <div className="w-full relative aspect-[4/3]">
              
              {/* The Actual Bihar Map Image (Light Vector Theme) */}
              <svg 
                viewBox={`0 0 ${mapData.width} ${mapData.height}`} 
                className="absolute inset-0 w-full h-full drop-shadow-xl pointer-events-auto"
                style={{ zIndex: 5 }}
              >
                {/* Base Map Paths */}
                <g className="map-districts">
                  {mapData.paths.map((p) => {
                    const isHovered = hoveredDistrict === p.district;
                    const isPatna = p.district.toLowerCase() === 'patna';
                    const isMilestoneCity = cities.some(c => p.district.toLowerCase().includes(c.district.toLowerCase()));
                    
                    // Logic for timeline sync
                    let baseFill = "#f8fafc"; // default very light
                    if (activeIndex === 0) {
                      baseFill = isPatna ? "#e2e8f0" : "#fbfcfd";
                    } else if (activeIndex === 1) {
                      baseFill = (isPatna || p.district === 'Muzaffarpur') ? "#e2e8f0" : "#fbfcfd";
                    } else if (activeIndex === 2) {
                      baseFill = (isPatna || p.district === 'Muzaffarpur' || p.district === 'Gaya') ? "#e2e8f0" : "#fbfcfd";
                    } else if (activeIndex >= 3) {
                      baseFill = isMilestoneCity ? "#e2e8f0" : "#f1f5f9";
                    }

                    return (
                      <motion.path
                        key={p.district}
                        d={p.d}
                        fill={isHovered ? "#93c5fd" : baseFill}
                        stroke={isHovered ? "#3b82f6" : (activeIndex === 0 && !isPatna ? "#f1f5f9" : "#cbd5e1")}
                        strokeWidth={isHovered ? "2" : "1"}
                        className="transition-all duration-700 cursor-pointer"
                        onMouseEnter={() => setHoveredDistrict(p.district)}
                        onMouseLeave={() => setHoveredDistrict(null)}
                      />
                    );
                  })}
                </g>

                {/* Map Connections (SVG Layer) */}
                <g className="map-connections" style={{ zIndex: 10 }}>
                  {connections.map(([sourceId, targetId], i) => {
                    const source = cities.find(c => c.id === sourceId);
                    const target = cities.find(c => c.id === targetId);
                    
                    const isVisible = activeIndex >= 3; // Show from 1970s-2000s expansion
                    const isAnimated = activeIndex >= 4; // Data flow from 2010s-2020s
                    
                    return (
                      <g key={`conn-${i}`}>
                        {/* Base Line */}
                        <motion.line
                          x1={source.cx} y1={source.cy}
                          x2={target.cx} y2={target.cy}
                          stroke="rgba(148, 163, 184, 0.4)"
                          strokeWidth="1.5"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: isVisible ? 1 : 0 }}
                          transition={{ duration: 1, ease: "easeInOut" }}
                        />
                        {/* Animated Data Flow Line */}
                        {isAnimated && (
                          <motion.line
                            x1={source.cx} y1={source.cy}
                            x2={target.cx} y2={target.cy}
                            stroke={milestones[activeIndex]?.accent || "#10b981"}
                            strokeWidth="2.5"
                            strokeDasharray="4 8"
                            initial={{ strokeDashoffset: 100, opacity: 0 }}
                            animate={{ strokeDashoffset: 0, opacity: 1 }}
                            transition={{
                              strokeDashoffset: { repeat: Infinity, duration: 1.5, ease: "linear" },
                              opacity: { duration: 0.5 }
                            }}
                          />
                        )}
                      </g>
                    );
                  })}
                </g>
              </svg>

              {/* City Nodes & Labels Layer */}
              {cities.map((city, idx) => {
                const isHQ = city.main;
                let isVisible = false;
                if (activeIndex === 0) {
                  isVisible = isHQ;
                } else if (activeIndex === 1) {
                  isVisible = isHQ || city.id === 'muzaffarpur';
                } else if (activeIndex === 2) {
                  isVisible = isHQ || city.id === 'muzaffarpur' || city.id === 'gaya';
                } else {
                  isVisible = true; // All show from 1970s-2000s onwards
                }
                const activeColor = milestones[activeIndex]?.accent || '#3b82f6';
                const nodeColor = isHQ ? activeColor : (isVisible ? '#94a3b8' : 'transparent');

                return (
                  <div 
                    key={city.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-auto group"
                    style={{ left: city.x, top: city.y, zIndex: isHQ ? 30 : 20 }}
                  >
                    <AnimatePresence>
                      {isVisible && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", delay: isHQ ? 0 : idx * 0.1 }}
                          className="relative"
                        >
                          {/* Pin / Node */}
                          <div 
                            className={`rounded-full flex items-center justify-center ${isHQ ? 'w-5 h-5 shadow-[0_0_20px_currentColor]' : 'w-2.5 h-2.5 shadow-md'}`}
                            style={{ backgroundColor: nodeColor, color: nodeColor }}
                          >
                            {isHQ && <div className="w-2 h-2 bg-white rounded-full"></div>}
                          </div>

                          {/* Ping Animation for HQ */}
                          {isHQ && (
                            <div 
                              className="absolute inset-0 rounded-full animate-ping opacity-75"
                              style={{ backgroundColor: activeColor }}
                            ></div>
                          )}

                          {/* Label Tooltip - Premium Light Theme */}
                          <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 px-3 py-1.5 rounded-xl bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-slate-100 text-slate-800 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:mt-2 transition-all duration-300 ${isHQ ? 'opacity-100 mt-2' : ''}`}>
                            {city.label}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Floating Tech Elements (2024 Phase) - Light Theme */}
              <AnimatePresence>
                {activeIndex === 4 && (
                  <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 40 }}>
                    <motion.div
                      initial={{ opacity: 0, y: 30, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                      className="absolute top-[10%] left-[5%] flex items-center gap-2.5 bg-white/90 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-fuchsia-100 shadow-[0_8px_30px_rgba(217,70,239,0.15)]"
                    >
                      <Glasses className="w-5 h-5 text-fuchsia-600" />
                      <span className="text-slate-700 text-[10px] font-bold uppercase tracking-wider">VR Active</span>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: -30, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: "spring", bounce: 0.5, delay: 0.4 }}
                      className="absolute bottom-[20%] right-[0%] flex items-center gap-2.5 bg-white/90 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-cyan-100 shadow-[0_8px_30px_rgba(6,182,212,0.15)]"
                    >
                      <BookHeadphones className="w-5 h-5 text-cyan-600" />
                      <span className="text-slate-700 text-[10px] font-bold uppercase tracking-wider">Audiobooks</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ type: "spring", bounce: 0.5, delay: 0.6 }}
                      className="absolute top-[20%] right-[15%] flex items-center gap-2.5 bg-white/90 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-blue-100 shadow-[0_8px_30px_rgba(59,130,246,0.15)]"
                    >
                      <Cpu className="w-5 h-5 text-blue-600" />
                      <span className="text-slate-700 text-[10px] font-bold uppercase tracking-wider">AI Synced</span>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

              {/* Map Footer Status Pill (Floating) */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl border border-slate-200 px-6 py-3 rounded-full flex items-center gap-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]">
                 <div className="flex items-center gap-3">
                   <div className="relative flex h-2.5 w-2.5">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: milestones[activeIndex].accent }}></span>
                     <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: milestones[activeIndex].accent }}></span>
                   </div>
                    <span className="text-slate-800 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                      {activeIndex === 0 ? 'HQ Initialized' : activeIndex === 1 ? 'Printing Selected' : activeIndex === 2 ? 'Production Started' : activeIndex === 3 ? 'Network Expanded' : 'Digital Era Deployed'}
                    </span>
                 </div>
                 <div className="hidden sm:block w-px h-4 bg-slate-200"></div>
                 <div className="hidden sm:flex items-center gap-1.5 text-slate-400 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">
                   <MapPin size={12} className="text-slate-400" /> Bihar Region
                 </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default EvolutionMap;
