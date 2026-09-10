import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiAward, FiCalendar, FiUser, FiInfo } from 'react-icons/fi';
import { getDirectory } from '../../../services/directoryService';



const BoardOfDirectors = () => {
  const [items, setItems] = React.useState([]);

  // Board members are managed in Admin → Know Us → Board of Directors
  React.useEffect(() => {
    getDirectory('board_member')
      .then((rows) => setItems(rows.map((row) => ({
        id: row.id,
        name: row.name,
        designation: row.designation,
        from: row.tenureFrom || "Current",
        status: row.status || "Active",
      }))))
      .catch(() => setItems([]));
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12">
      {/* ================= HERO SECTION ================= */}
      <section className="relative text-center mb-16 px-6">
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-extrabold text-[#0d0e23] tracking-tight mb-4"
        >
          Board of <span className="text-blue-600">Directors</span>
        </motion.h1>
        
        <p className="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed font-medium">
          The governing body responsible for strategic decision making and oversight of the Corporation's operations.
        </p>
      </section>

      {/* ================= DIRECTORS TABLE ================= */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
         <div className="overflow-x-auto bg-transparent border border-slate-300">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-200 border-b border-slate-300 text-[#0d0e23]">
                  <th className="px-6 py-4 text-sm font-bold border-r border-slate-300">Name</th>
                  <th className="px-6 py-4 text-sm font-bold border-r border-slate-300">Designation</th>
                  <th className="px-6 py-4 text-sm font-bold">Since</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                {items.map((member) => (
                  <tr key={member.id} className="text-[#0d0e23]">
                    <td className="px-6 py-4 text-sm border-r border-slate-300 font-semibold">{member.name}</td>
                    <td className="px-6 py-4 text-sm border-r border-slate-300">{member.designation}</td>
                    <td className="px-6 py-4 text-sm">{member.from}</td>
                  </tr>
                ))}
              </tbody>
            </table>
         </div>
      </section>

      
    </div>
  );
};

/* Helper Components */
const MeetingStat = ({ label, value }) => (
  <div className="flex justify-between items-center py-3 border-b border-slate-300">
    <span className="text-sm font-bold text-slate-500">{label}</span>
    <span className="text-sm font-bold text-[#0d0e23]">{value}</span>
  </div>
);

const DocumentCard = ({ title, size }) => (
  <div className="p-6 bg-transparent border border-slate-300 hover:bg-slate-50 transition-all cursor-pointer group">
    <div className="flex items-center gap-4">
       <div className="w-10 h-10 text-blue-600 flex items-center justify-center text-lg">
          <FiInfo />
       </div>
       <div>
          <h4 className="text-sm font-bold text-[#0d0e23] group-hover:text-blue-600 transition-colors">{title}</h4>
          <span className="text-xs text-slate-500">{size} • PDF</span>
       </div>
    </div>
  </div>
);

export default BoardOfDirectors;
