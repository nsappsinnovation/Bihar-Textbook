import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiAward, FiHeart, FiTrendingUp, FiSearch } from 'react-icons/fi';

const OurEmployee = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([
    { id: 1, name: "Shri. Manoj Kumar", designation: "Accountant", department: "Finance", employeeId: "EMP001" },
    { id: 2, name: "Ms. Suman Kumari", designation: "Office Assistant", department: "Administration", employeeId: "EMP002" },
    { id: 3, name: "Shri. Rakesh Singh", designation: "Data Entry Operator", department: "Production", employeeId: "EMP003" },
    { id: 4, name: "Ms. Anita Devi", designation: "Clerk", department: "Sales", employeeId: "EMP004" },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('module_content_ku-employees');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setEmployees(parsed.map(item => ({
            id: item.id,
            name: item.title,
            designation: item.designation,
            department: item.department,
            employeeId: item.employeeId
          })));
        }
      } catch (e) {
        console.error("Error loading employee data", e);
      }
    }
  }, []);

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    emp.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
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
          Our <span className="text-blue-600">Employee</span> Pride
        </motion.h1>
        
        <p className="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed font-medium">
          The heartbeat of BSTBPC. Meet the dedicated team working tirelessly behind the scenes to educate the future of Bihar.
        </p>
      </section>

      
      {/* ================= EMPLOYEE LIST SECTION ================= */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <div className="bg-transparent border border-slate-300 overflow-hidden font-sans">
          <div className="p-6 border-b border-slate-300 flex flex-col md:flex-row justify-between items-center gap-6 bg-transparent">
            <div>
              <h3 className="text-lg font-bold text-[#0d0e23]">Employee Directory</h3>
              <p className="text-xs text-slate-500">Official registry of BSTBPC staff members</p>
            </div>
            <div className="relative w-full md:w-80">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by name, role or dept..."
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
                  <th className="px-6 py-4 text-sm font-bold border-r border-slate-300">Employee ID</th>
                  <th className="px-6 py-4 text-sm font-bold border-r border-slate-300">Name</th>
                  <th className="px-6 py-4 text-sm font-bold border-r border-slate-300">Designation</th>
                  <th className="px-6 py-4 text-sm font-bold">Department</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="text-[#0d0e23]">
                    <td className="px-6 py-4 text-sm border-r border-slate-300 font-mono text-blue-600 font-bold">
                      {emp.employeeId}
                    </td>
                    <td className="px-6 py-4 text-sm border-r border-slate-300 font-semibold">
                      {emp.name}
                    </td>
                    <td className="px-6 py-4 text-sm border-r border-slate-300">
                      {emp.designation}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 bg-slate-100 text-xs font-bold uppercase tracking-wider text-slate-600">
                        {emp.department}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredEmployees.length === 0 && (
            <div className="py-10 text-center text-slate-500">
               <p className="text-sm">No employees found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

/* Helper Components */
const StatCard = ({ icon, value, label, color }) => (
  <div className="bg-transparent p-6 border border-slate-300 flex flex-col items-center text-center">
    <div className={`w-12 h-12 text-blue-600 flex items-center justify-center text-xl mb-4`}>
       {icon}
    </div>
    <div className="text-2xl font-bold text-[#0d0e23]">{value}</div>
    <div className="text-xs font-bold uppercase text-slate-500 tracking-tighter">{label}</div>
  </div>
);

const CultureCard = ({ title, desc }) => (
  <div className="p-4 flex justify-between items-center bg-transparent">
    <h4 className="text-sm font-bold text-[#0d0e23] mb-1">{title}</h4>
    <p className="text-xs text-slate-500">{desc}</p>
  </div>
);

export default OurEmployee;
