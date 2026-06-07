import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPackage, FiMapPin, FiTruck, FiExternalLink, FiDownload, FiSearch } from 'react-icons/fi';

const defaultHubs = [
  { id: 1, name: "Patna Central Depot", location: "Budh Marg, Patna", contact: "+91 612 222 1975", capacity: "High", type: "Main Depot" },
  { id: 2, name: "Muzaffarpur Regional Centre", location: "Mithanpura, Muzaffarpur", contact: "+91 621 224 5678", capacity: "Medium", type: "Regional" },
  { id: 3, name: "Gaya Distribution Point", location: "Civil Lines, Gaya", contact: "+91 631 222 3456", capacity: "Medium", type: "Regional" },
  { id: 4, name: "Bhagalpur Storage Hub", location: "Adampur, Bhagalpur", contact: "+91 641 222 7890", capacity: "Medium", type: "Regional" },
];

const Wholesellerdepo = () => {
  const [isInteracting, setIsInteracting] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('/whole.pdf');
  const [fileName, setFileName] = useState('Wholesaler_Directory.pdf');
  const [hubs, setHubs] = useState(defaultHubs);
  const [stats, setStats] = useState({ depots: '38', wholesalers: '450+' });

  useEffect(() => {
    const loadData = () => {
      const saved = localStorage.getItem('website_wholesaler_depot');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.officialList && parsed.officialList.pdfUrl) {
            setPdfUrl(parsed.officialList.pdfUrl);
            setFileName(parsed.officialList.fileName || 'Wholesaler_Directory.pdf');
          }
          if (parsed.hubs) setHubs(parsed.hubs);
          if (parsed.stats) setStats(parsed.stats);
        } catch (e) {
          console.error('Failed to parse wholesaler data from storage');
        }
      }
    };
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const handleDownload = () => {
    window.open(pdfUrl, '_blank');
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
      <section className="max-w-5xl mx-auto px-6 mb-12">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
           <div className="bg-slate-50 p-6 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-black uppercase text-slate-400 tracking-tighter">Document Preview: {fileName}</span>
              <div className="flex gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                 <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                 <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
           </div>
           <div className="h-[700px] w-full bg-slate-100 flex items-center justify-center relative overflow-hidden group">
              <iframe
                src={`${pdfUrl}#toolbar=1`}
                title="Wholesaler Details"
                className="w-full h-full border-none"
              />
              
              {!isInteracting && (
                <div 
                  className="absolute inset-0 bg-[#0d0e23]/5 backdrop-blur-[2px] flex items-center justify-center cursor-pointer group/overlay transition-all duration-500"
                  onClick={() => setIsInteracting(true)}
                >
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                    <button className="px-8 py-4 bg-white rounded-2xl shadow-2xl border border-slate-200 font-bold text-sm flex items-center gap-3 group-hover/overlay:scale-105 transition-transform pointer-events-none text-slate-700">
                        <FiSearch className="text-blue-600" /> Click to interact with PDF
                    </button>
                  </div>
                </div>
              )}
              
              {isInteracting && (
                <button 
                  onClick={() => setIsInteracting(false)}
                  className="absolute top-6 right-6 z-50 p-3 bg-white/90 backdrop-blur-md rounded-xl border border-slate-200 shadow-xl text-slate-600 hover:bg-white hover:text-blue-600 transition-all"
                  title="Close Interaction"
                >
                  <FiExternalLink className="rotate-180" />
                </button>
              )}
           </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="max-w-3xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-blue-600 rounded-3xl text-white shadow-lg shadow-blue-200/50 flex flex-col justify-center items-center text-center transform transition-all hover:scale-[1.02]">
                <div className="text-4xl font-black mb-1.5">{stats.depots}</div>
                <div className="text-xs font-bold uppercase tracking-widest opacity-90">District Depots</div>
            </div>
            <div className="p-5 bg-slate-800 rounded-3xl text-white shadow-lg flex flex-col justify-center items-center text-center transform transition-all hover:scale-[1.02]">
                <div className="text-4xl font-black mb-1.5">{stats.wholesalers}</div>
                <div className="text-xs font-bold uppercase tracking-widest opacity-90">Authorized Wholesalers</div>
            </div>
        </div>
      </section>

      {/* ================= DEPOT TABLE ================= */}
      <section className="max-w-5xl mx-auto px-6">
         <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#0d0e23] mb-3">Major Hubs</h2>
            <p className="text-slate-500 text-sm font-medium">Strategic locations across Bihar for rapid distribution.</p>
         </div>
         <div className="overflow-x-auto bg-white rounded-[2rem] shadow-xl border border-slate-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-8 py-6 text-xs font-extrabold text-slate-400 uppercase tracking-widest">Depot Name</th>
                  <th className="px-8 py-6 text-xs font-extrabold text-slate-400 uppercase tracking-widest">Type</th>
                  <th className="px-8 py-6 text-xs font-extrabold text-slate-400 uppercase tracking-widest">Location</th>
                  <th className="px-8 py-6 text-xs font-extrabold text-slate-400 uppercase tracking-widest">Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {hubs.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5 text-sm font-bold text-[#0d0e23]">{item.name}</td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${item.type === 'Main Depot' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm text-slate-500 font-medium">{item.location}</td>
                    <td className="px-8 py-5 text-sm text-slate-500 font-medium">{item.contact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
         </div>
      </section>
    </div>
  );
};

export default Wholesellerdepo;
