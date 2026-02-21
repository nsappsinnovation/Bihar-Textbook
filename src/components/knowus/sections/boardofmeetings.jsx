import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiAward, FiCalendar, FiUser, FiInfo } from 'react-icons/fi';

const directors = [
  { id: 1, name: "Shri. S. Siddharth, IAS", designation: "ACS, Dept. of Education (Chairman)", from: "Current", status: "Active" },
  { id: 2, name: "Shri. Sunny Sinha", designation: "Managing Director", from: "Current", status: "Active" },
  { id: 3, name: "Shri. Anand Sharma", designation: "Director, Primary Education", from: "2023", status: "Active" },
  { id: 4, name: "Ms. Rekha Kumari", designation: "Director, Secondary Education", from: "2022", status: "Active" },
  { id: 5, name: "Shri. Manoj Kumar", designation: "Spl. Secretary, Finance Dept.", from: "2023", status: "Active" },
];

const BoardOfDirectors = () => {
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

      {/* ================= DIRECTORS GRID ================= */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {directors.map((member, idx) => (
              <motion.div 
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:border-blue-200 transition-all group"
              >
                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-600 text-2xl font-black mb-6 group-hover:scale-110 transition-transform">
                    {member.photo ? <img src={member.photo} className="w-full h-full object-cover rounded-2xl" /> : <FiUser />}
                 </div>
                 <h3 className="text-xl font-black text-[#0d0e23] mb-1 group-hover:text-blue-600 transition-colors">{member.name}</h3>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">{member.designation}</p>
                 
                 <div className="pt-6 border-t border-slate-50 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                       <FiCalendar className="text-blue-500" /> Since {member.from}
                    </div>
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-lg uppercase tracking-widest">
                       {member.status}
                    </span>
                 </div>
              </motion.div>
            ))}
         </div>
      </section>

      {/* ================= BOARD MEETINGS SECTION ================= */}
      <section className="max-w-6xl mx-auto px-6">
         <motion.div 
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="bg-[#0d0e23] rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden"
         >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[80px] -mr-20 -mt-20 rounded-full" />
            
            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12">
               <div className="max-w-md">
                  <h2 className="text-2xl md:text-3xl font-black mb-6 flex items-center gap-4">
                     <FiInfo className="text-blue-400" />
                     Board Meetings
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium mb-8">
                    The Board meets at regular intervals to review progress, approve budgets, and set policy directions for the upcoming academic cycles.
                  </p>
                  <div className="space-y-4">
                     <MeetingStat label="Last Meeting" value="24 Jan 2024" />
                     <MeetingStat label="Upcoming" value="To be scheduled" />
                     <MeetingStat label="Venue" value="Patna, HQ" />
                  </div>
               </div>

               <div className="w-full lg:w-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DocumentCard title="2023-24 Minutes" size="1.4 MB" />
                  <DocumentCard title="Annual Report 21-22" size="4.8 MB" />
                  <DocumentCard title="Policy Guidelines" size="850 KB" />
                  <DocumentCard title="Board Charter" size="2.1 MB" />
               </div>
            </div>
         </motion.div>
      </section>
    </div>
  );
};

/* Helper Components */
const MeetingStat = ({ label, value }) => (
  <div className="flex justify-between items-center py-3 border-b border-white/5">
    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
    <span className="text-sm font-black text-blue-400">{value}</span>
  </div>
);

const DocumentCard = ({ title, size }) => (
  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group">
    <div className="flex items-center gap-4">
       <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center text-lg">
          <FiInfo />
       </div>
       <div>
          <h4 className="text-sm font-black text-white group-hover:text-blue-400 transition-colors">{title}</h4>
          <span className="text-[10px] font-bold text-slate-500 uppercase">{size} • PDF</span>
       </div>
    </div>
  </div>
);

export default BoardOfDirectors;
