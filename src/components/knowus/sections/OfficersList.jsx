import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiMapPin, FiSearch, FiBriefcase } from 'react-icons/fi';

const officersData = [
  { id: 1, name: "Shri. Rajesh Kumar", designation: "Chief Administrative Officer", email: "rajesh.cao@bihar.gov.in", phone: "+91 612 222 1975", photo: "" },
  { id: 2, name: "Ms. Neha Sharma", designation: "General Manager (Sales)", email: "neha.gm@bstbpc.in", phone: "+91 612 222 1976", photo: "" },
  { id: 3, name: "Shri. Amit Singh", designation: "Finance Controller", email: "amit.finance@bstbpc.in", phone: "+91 612 222 1977", photo: "" },
  { id: 4, name: "Shri. Vipul Agarwal", designation: "Production Manager", email: "vipul.prod@bstbpc.in", phone: "+91 612 222 1978", photo: "" },
  { id: 5, name: "Ms. Priyanka Verma", designation: "Academic Coordinator", email: "priyanka.acad@bstbpc.in", phone: "+91 612 222 1979", photo: "" },
];

const OfficersList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOfficers = officersData.filter(off => 
    off.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    off.designation.toLowerCase().includes(searchTerm.toLowerCase())
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
          Officers <span className="text-blue-600">List</span>
        </motion.h1>
        
        <p className="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed font-medium">
          Our dedicated leadership team driving the mission of excellence in education and distribution across Bihar.
        </p>
      </section>

      {/* ================= SEARCH & TABLE ================= */}
      <section className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200/60 overflow-hidden"
        >
          <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/50">
            <h3 className="text-lg font-black text-[#0d0e23] flex items-center gap-2">
               Administrative Hierarchy
            </h3>
            <div className="relative w-full md:w-80">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by name or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-sm font-medium"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Officer Info</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Designation</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Contact Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOfficers.map((officer) => (
                  <tr key={officer.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-slate-100 flex items-center justify-center text-blue-600 text-xl font-black">
                          {officer.photo ? <img src={officer.photo} className="w-full h-full object-cover rounded-2xl" /> : <FiUser />}
                        </div>
                        <div>
                          <div className="text-sm font-black text-[#0d0e23] group-hover:text-blue-600 transition-colors">{officer.name}</div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Bihar Education Dept.</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200/50">
                        <FiBriefcase className="text-blue-500" />
                        {officer.designation}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-blue-600 transition-colors cursor-pointer">
                          <FiMail className="text-slate-400" /> {officer.email}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                          <FiPhone className="text-slate-400" /> {officer.phone}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOfficers.length === 0 && (
            <div className="py-20 text-center text-slate-400">
              <FiUser className="text-5xl mx-auto mb-4 opacity-20" />
              <p className="font-bold">No officers found matching your search.</p>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default OfficersList;
