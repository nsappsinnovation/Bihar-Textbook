import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPrinter, FiCheckCircle, FiSearch, FiShield, FiBriefcase, FiMapPin } from 'react-icons/fi';

const printersData = [
  { id: 1, name: "Bihar State Corrugated Boxes Ltd.", type: "Packaging & Printing", location: "Patna", status: "Active", capacity: "High" },
  { id: 2, name: "Ganga Digital Offset", type: "Textbook Production", location: "Hajipur", status: "Active", capacity: "Medium" },
  { id: 3, name: "Prabhat Printing Press", type: "Security Printing", location: "Bhagalpur", status: "Under Review", capacity: "Medium" },
  { id: 4, name: "Modern Paper Converters", type: "Notebooks & Forms", location: "Muzaffarpur", status: "Active", capacity: "Low" },
];

const RegisterPrinters = () => {
  const [search, setSearch] = useState("");

  const filteredPrinters = printersData.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12">
      {/* ================= HERO SECTION ================= */}
      <section className="relative text-center mb-16 px-6">
        
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-extrabold text-[#0d0e23] tracking-tight mb-4"
        >
          Registered <span className="text-blue-600">Printers</span>
        </motion.h1>
        
        <p className="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed font-medium">
          Our empaneled network of high-tech printing houses ensuring quality and integrity in every page.
        </p>
      </section>

      {/* ================= SEARCH & LIST ================= */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-8 items-start">
           
           {/* Sidebar Info */}
           <div className="w-full md:w-80 space-y-6">
              <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
                 <h3 className="text-lg font-black text-[#0d0e23] mb-4">Empanelment Status</h3>
                 <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
                   BSTBPC invites applications for registration of printers for the academic cycle.
                 </p>
                 <div className="space-y-4">
                    <StatusInfo label="Total Registered" value="48" color="blue" />
                    <StatusInfo label="In Evaluation" value="12" color="blue" />
                    <StatusInfo label="Capacity (P.A)" value="50M+" color="slate" />
                 </div>
                 <button className="w-full mt-8 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                    Apply for Empanelment
                 </button>
              </div>

              <div className="p-6 bg-[#0d0e23] rounded-3xl text-white">
                 <FiShield className="text-blue-400 text-2xl mb-4" />
                 <h4 className="text-sm font-black mb-2 tracking-tight">Quality Assurance</h4>
                 <p className="text-[10px] text-slate-400 leading-relaxed">
                    All registered printers must comply with BSTBPC's rigorous quality and security standards for textbook production.
                 </p>
              </div>
           </div>

           {/* Main List */}
           <div className="flex-grow space-y-6 w-full">
              <div className="relative">
                <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                <input 
                  type="text" 
                  placeholder="Search by printer name or location..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 rounded-[2rem] bg-white border border-slate-200 shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                 {filteredPrinters.map((printer) => (
                    <motion.div 
                       key={printer.id}
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       className="group p-6 bg-white border border-slate-100 rounded-[1.5rem] hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                    >
                       <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                             <FiPrinter />
                          </div>
                          <div>
                             <h4 className="font-black text-[#0d0e23] group-hover:text-blue-600 transition-colors">{printer.name}</h4>
                             <div className="flex items-center gap-3 mt-1">
                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-1">
                                   <FiBriefcase /> {printer.type}
                                </span>
                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-1">
                                   <FiMapPin /> {printer.location}
                                </span>
                             </div>
                          </div>
                       </div>
                       
                       <div className="flex items-center gap-6 pr-4">
                          <div className="text-right">
                             <div className="text-[9px] font-black text-slate-400 uppercase mb-1">Status</div>
                             <div className={`text-[11px] font-black ${printer.status === 'Active' ? 'text-blue-600' : 'text-blue-500'} flex items-center gap-1`}>
                                <FiCheckCircle /> {printer.status}
                             </div>
                          </div>
                          <button className="h-10 px-5 rounded-xl border border-slate-200 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                             Profile
                          </button>
                       </div>
                    </motion.div>
                 ))}
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

/* Helper Components */
const StatusInfo = ({ label, value, color }) => (
  <div className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0">
    <span className="text-[11px] font-bold text-slate-500">{label}</span>
    <span className={`text-xs font-black text-${color}-600 bg-${color}-50 px-3 py-1 rounded-lg`}>{value}</span>
  </div>
);

export default RegisterPrinters;
