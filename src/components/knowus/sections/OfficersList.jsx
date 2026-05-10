import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiMapPin, FiSearch, FiBriefcase } from 'react-icons/fi';

const OfficersList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [officers, setOfficers] = useState([
    { id: 1, name: "Shri. Rajesh Kumar", designation: "Chief Administrative Officer", email: "rajesh.cao@bihar.gov.in", phone: "+91 612 222 1975", photo: "" },
    { id: 2, name: "Ms. Neha Sharma", designation: "General Manager (Sales)", email: "neha.gm@bstbpc.in", phone: "+91 612 222 1976", photo: "" },
    { id: 3, name: "Shri. Amit Singh", designation: "Finance Controller", email: "amit.finance@bstbpc.in", phone: "+91 612 222 1977", photo: "" },
    { id: 4, name: "Shri. Vipul Agarwal", designation: "Production Manager", email: "vipul.prod@bstbpc.in", phone: "+91 612 222 1978", photo: "" },
    { id: 5, name: "Ms. Priyanka Verma", designation: "Academic Coordinator", email: "priyanka.acad@bstbpc.in", phone: "+91 612 222 1979", photo: "" },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('module_content_ku-officers');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setOfficers(parsed.map(item => ({
            id: item.id,
            name: item.title,
            designation: item.designation,
            email: item.email,
            phone: item.phone,
            photo: item.document || ""
          })));
        }
      } catch (e) {
        console.error("Error loading officers data", e);
      }
    }
  }, []);

  const filteredOfficers = officers.filter(off => 
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
          className="bg-transparent border border-slate-300 overflow-hidden font-sans"
        >
          <div className="p-6 border-b border-slate-300 flex flex-col md:flex-row justify-between items-center gap-6 bg-transparent">
            <h3 className="text-lg font-bold text-[#0d0e23] flex items-center gap-2">
               Administrative Hierarchy
            </h3>
            <div className="relative w-full md:w-80">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by name or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2 bg-transparent border border-slate-300 focus:border-blue-500 transition-all outline-none text-sm text-[#0d0e23]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-200 border-b border-slate-300 text-[#0d0e23]">
                  <th className="px-6 py-4 text-sm font-bold border-r border-slate-300">Officer Info</th>
                  <th className="px-6 py-4 text-sm font-bold border-r border-slate-300">Designation</th>
                  <th className="px-6 py-4 text-sm font-bold">Contact Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                {filteredOfficers.map((officer) => (
                  <tr key={officer.id} className="text-[#0d0e23]">
                    <td className="px-6 py-4 text-sm border-r border-slate-300">
                      <div className="flex flex-col">
                        <span className="font-semibold">{officer.name}</span>
                        <span className="text-xs text-slate-500 mt-1">Bihar Education Dept.</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm border-r border-slate-300">
                      <span>{officer.designation}</span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-2"><FiMail className="text-slate-400" /> {officer.email}</span>
                        <span className="flex items-center gap-2"><FiPhone className="text-slate-400" /> {officer.phone}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOfficers.length === 0 && (
            <div className="py-10 text-center text-slate-500">
               <p className="text-sm">No officers found matching your search.</p>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default OfficersList;
