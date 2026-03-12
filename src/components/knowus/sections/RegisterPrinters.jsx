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
              <div className="bg-transparent p-6 border border-slate-300">
                 <h3 className="text-lg font-bold text-[#0d0e23] mb-4">Empanelment Status</h3>
                 <p className="text-sm text-slate-500 mb-6">
                   BSTBPC invites applications for registration of printers for the academic cycle.
                 </p>
                 <div className="space-y-4">
                    <StatusInfo label="Total Registered" value="48" color="blue" />
                    <StatusInfo label="In Evaluation" value="12" color="blue" />
                    <StatusInfo label="Capacity (P.A)" value="50M+" color="slate" />
                 </div>
                 <button className="w-full mt-8 py-3 bg-blue-600 text-white text-sm font-bold transition-all">
                    Apply for Empanelment
                 </button>
              </div>

              <div className="p-6 bg-transparent border border-slate-300">
                 <FiShield className="text-blue-600 text-2xl mb-4" />
                 <h4 className="text-base font-bold text-[#0d0e23] mb-2">Quality Assurance</h4>
                 <p className="text-sm text-slate-600">
                    All registered printers must comply with BSTBPC's rigorous quality and security standards for textbook production.
                 </p>
              </div>
           </div>

           {/* Main List */}
           <div className="flex-grow space-y-6 w-full">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                <input 
                  type="text" 
                  placeholder="Search by printer name or location..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-6 py-3 bg-transparent border border-slate-300 focus:border-blue-500 outline-none transition-all text-sm text-[#0d0e23]"
                />
              </div>

              <div className="overflow-x-auto bg-transparent border border-slate-300">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-200 border-b border-slate-300 text-[#0d0e23]">
                      <th className="px-6 py-4 text-sm font-bold border-r border-slate-300">Printer Info</th>
                      <th className="px-6 py-4 text-sm font-bold border-r border-slate-300">Location</th>
                      <th className="px-6 py-4 text-sm font-bold border-r border-slate-300">Status</th>
                      <th className="px-6 py-4 text-sm font-bold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-300">
                    {filteredPrinters.map((printer) => (
                      <tr key={printer.id} className="text-[#0d0e23]">
                        <td className="px-6 py-4 text-sm border-r border-slate-300">
                          <div className="flex flex-col">
                            <span className="font-semibold">{printer.name}</span>
                            <span className="text-xs text-slate-500 mt-1">{printer.type}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm border-r border-slate-300">
                          {printer.location}
                        </td>
                        <td className="px-6 py-4 text-sm border-r border-slate-300">
                          {printer.status}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button className="px-4 py-2 border border-slate-300 text-xs font-bold hover:bg-slate-100 transition-all">
                             Profile
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
