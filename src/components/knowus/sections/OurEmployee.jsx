import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiAward, FiHeart, FiTrendingUp, FiSearch } from 'react-icons/fi';

const OurEmployee = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([
    { id: 1, employeeId: 'EMP001', name: 'Azimul Hassan', designation: 'Assistant Cum Cashier', type: 'Regular', department: 'Establishment' },
    { id: 2, employeeId: 'EMP002', name: 'Binod Kumar', designation: 'Sales Assistant', type: 'Regular', department: 'Sales' },
    { id: 3, employeeId: 'EMP003', name: 'Santosh Kumar', designation: 'Dispatch', type: 'Regular', department: 'Dispatch' },
    { id: 4, employeeId: 'EMP004', name: 'Rajesh Hembrom', designation: 'Security Encharge', type: 'Regular', department: 'Security' },
    { id: 5, employeeId: 'EMP005', name: 'Binod Kumar', designation: 'Peon', type: 'Regular', department: 'MD Cell' },
    { id: 6, employeeId: 'EMP006', name: 'Rakesh Kumar', designation: 'Account Assistant', type: 'Contract', department: 'Accounts' },
    { id: 7, employeeId: 'EMP007', name: 'Sukriti Kumari', designation: 'Account Assistant', type: 'Contract', department: 'Accounts' },
    { id: 8, employeeId: 'EMP008', name: 'MD Ashad', designation: 'Assistant', type: 'Contract', department: 'Accounts' },
    { id: 9, employeeId: 'EMP009', name: 'KN Rai', designation: 'Assistant', type: 'Contract', department: 'Legal' },
    { id: 10, employeeId: 'EMP010', name: 'CK Yadav', designation: 'Sales Assistant', type: 'Contract', department: 'Sales' }
  ]);

  useEffect(() => {
    const loadEmployees = () => {
      const saved = localStorage.getItem('module_content_ku-employee_v2');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            const validEmployees = parsed.filter(item => item.type !== 'Outsource');
            setEmployees(validEmployees.map(item => ({
              id: item.id,
              name: item.name || item.title,
              designation: item.designation,
              type: item.type || 'Regular',
              department: item.department,
              employeeId: item.employeeId
            })));
          }
        } catch (e) {
          console.error("Error loading employee data", e);
        }
      }
    };
    loadEmployees();
    window.addEventListener('storage', loadEmployees);
    return () => window.removeEventListener('storage', loadEmployees);
  }, []);

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    emp.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (emp.type || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
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
          Our <span className="text-blue-600">Employees</span>
        </motion.h1>
        
        <p className="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed font-medium">
          Our team of educators, professionals, and innovators works together to make quality education accessible, inclusive, and impactful for every learner in Bihar.
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
                  <th className="w-20 px-4 py-4 text-sm font-bold border-r border-slate-300 text-center">S.No.</th>
                  <th className="px-6 py-4 text-sm font-bold border-r border-slate-300">Name</th>
                  <th className="px-6 py-4 text-sm font-bold border-r border-slate-300">Designation</th>
                  <th className="px-6 py-4 text-sm font-bold border-r border-slate-300">Type</th>
                  <th className="px-6 py-4 text-sm font-bold">Department</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                {filteredEmployees.map((emp, index) => (
                  <tr key={emp.id} className="text-[#0d0e23]">
                    <td className="px-6 py-4 text-sm border-r border-slate-300 font-mono text-slate-600 font-bold text-center">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm border-r border-slate-300 font-semibold">
                      {emp.name}
                    </td>
                    <td className="px-6 py-4 text-sm border-r border-slate-300">
                      {emp.designation}
                    </td>
                    <td className="px-6 py-4 text-sm border-r border-slate-300">
                      {emp.type}
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
