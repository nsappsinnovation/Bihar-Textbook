import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPackage, FiMapPin, FiTruck, FiExternalLink, FiDownload, FiSearch } from 'react-icons/fi';

const wholesalers = [
  { id: 1, name: "Patna Central Depot", location: "Budh Marg, Patna", contact: "0612-2221975", capacity: "High", type: "Main Depot" },
  { id: 2, name: "Muzaffarpur Regional Centre", location: "Mithanpura, Muzaffarpur", contact: "0621-2245678", capacity: "Medium", type: "Regional" },
  { id: 3, name: "Gaya Distribution Point", location: "Civil Lines, Gaya", contact: "0631-2223456", capacity: "Medium", type: "Regional" },
  { id: 4, name: "Bhagalpur Storage Hub", location: "Adampur, Bhagalpur", contact: "0641-2227890", capacity: "Medium", type: "Regional" },
];

const Wholesellerdepo = () => {
  const [isInteracting, setIsInteracting] = useState(false);

  const handleDownload = () => {
    window.open('/whole.pdf', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12">
      {/* ================= HERO SECTION ================= */}
      <section className="relative text-center mb-16 px-6">
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-extrabold text-[#0d0e23] tracking-tight mb-4"
        >
          Wholeseller & <span className="text-blue-600">Depot</span> Network
        </motion.h1>
        
        <p className="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed font-medium">
          Our robust network of depots across Bihar ensures that every student gets their textbooks on time, every time.
        </p>
      </section>

      {/* ================= PDF VIEWER PREVIEW ================= */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-20">
        <div className="lg:col-span-1 space-y-8">
           <div className="p-8 bg-white rounded-[2.5rem] shadow-xl border border-slate-100">
              <h3 className="text-xl font-black text-[#0d0e23] mb-6 flex items-center gap-3">
                 <FiPackage className="text-blue-600" />
                 Official List
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed mb-8">
                Access the complete, updated directory of authorized wholesalers and regional depots for the academic year 2025-26.
              </p>
              <div className="space-y-4">
                 <button 
                  onClick={handleDownload}
                  className="w-full py-4 bg-[#0d0e23] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-lg"
                 >
                    <FiDownload /> Download Full PDF
                 </button>
                 <button 
                  onClick={() => window.open('/whole.pdf', '_blank')}
                  className="w-full py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-50 transition-all"
                 >
                    <FiExternalLink /> View Online
                 </button>
              </div>
           </div>

           <div className="grid grid-cols-1 gap-4">
              <div className="p-5 bg-blue-600 rounded-3xl text-white shadow-xl shadow-blue-200/50">
                 <div className="text-2xl font-black mb-1">38</div>
                 <div className="text-[10px] font-black uppercase tracking-widest opacity-80">District Depots</div>
              </div>
              <div className="p-5 bg-slate-800 rounded-3xl text-white">
                 <div className="text-2xl font-black mb-1">450+</div>
                 <div className="text-[10px] font-black uppercase tracking-widest opacity-80">Authorized Wholesalers</div>
              </div>
           </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
           <div className="bg-slate-50 p-6 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-black uppercase text-slate-400 tracking-tighter">Document Preview: Wholesaler_Directory.pdf</span>
              <div className="flex gap-2">
                 <div className="w-2 h-2 rounded-full bg-red-400" />
                 <div className="w-2 h-2 rounded-full bg-yellow-400" />
                 <div className="w-2 h-2 rounded-full bg-green-400" />
              </div>
           </div>
           <div className="h-[600px] w-full bg-slate-200 flex items-center justify-center relative overflow-hidden group">
              <iframe
                src="/whole.pdf#toolbar=1"
                title="Wholesaler Details"
                className="w-full h-full border-none"
              />
              
              {!isInteracting && (
                <div 
                  className="absolute inset-0 bg-[#0d0e23]/10 backdrop-blur-[2px] flex items-center justify-center cursor-pointer group/overlay transition-all duration-500"
                  onClick={() => setIsInteracting(true)}
                >
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                    <button className="px-8 py-4 bg-white rounded-2xl shadow-2xl border border-slate-200 font-bold text-sm flex items-center gap-3 group-hover/overlay:scale-105 transition-transform pointer-events-none">
                        <FiSearch /> Click to interact with PDF
                    </button>
                  </div>
                </div>
              )}
              
              {isInteracting && (
                <button 
                  onClick={() => setIsInteracting(false)}
                  className="absolute top-4 right-4 z-50 p-3 bg-white/80 backdrop-blur-md rounded-xl border border-slate-200 shadow-xl text-slate-600 hover:bg-white hover:text-blue-600 transition-all"
                  title="Close Interaction"
                >
                  <FiExternalLink className="rotate-180" />
                </button>
              )}
           </div>
        </div>
      </section>

      {/* ================= DEPOT GRID ================= */}
      <section className="max-w-6xl mx-auto px-6">
         <div className="text-center mb-12">
            <h2 className="text-2xl font-black text-[#0d0e23]">Major Hubs</h2>
            <p className="text-slate-400 text-sm font-medium">Strategic locations across Bihar for rapid distribution.</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wholesalers.map((item) => (
              <div key={item.id} className="p-6 bg-white border border-slate-50 shadow-sm rounded-3xl hover:border-blue-200 transition-all hover:translate-y-[-5px]">
                 <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg mb-6">
                    <FiMapPin />
                 </div>
                 <h4 className="text-sm font-black text-[#0d0e23] mb-1">{item.name}</h4>
                 <div className="text-[10px] text-slate-400 font-bold uppercase mb-4">{item.type}</div>
                 <div className="space-y-2 pt-4 border-t border-slate-50">
                    <div className="text-xs text-slate-600 font-medium flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> {item.location}
                    </div>
                    <div className="text-xs text-slate-500 font-bold">{item.contact}</div>
                 </div>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
};

export default Wholesellerdepo;
