import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiAward, FiHeart, FiTrendingUp } from 'react-icons/fi';

const OurEmployee = () => {
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

      {/* ================= STATS SECTION ================= */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard icon={<FiUsers />} value="300+" label="Total Staff" color="blue" />
          <StatCard icon={<FiAward />} value="15+" label="Dept Heads" color="blue" />
          <StatCard icon={<FiHeart />} value="10yrs" label="Avg Tenure" color="blue" />
          <StatCard icon={<FiTrendingUp />} value="98%" label="Satisfaction" color="blue" />
        </div>
      </section>

      {/* ================= EMPLOYEE CULTURE SECTION ================= */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-transparent border border-slate-300 p-8 md:p-12 text-[#0d0e23] relative overflow-hidden"
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold leading-tight italic">
                "Our employees are not just workers, they are the architects of a more literate Bihar."
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                At BSTBPC, we foster an environment of continuous learning, mutual respect, and social purpose. Every member of our team plays a critical role in the state's educational progress.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                 <button className="px-6 py-3 border border-slate-300 bg-slate-100 font-bold text-sm tracking-widest hover:bg-slate-200 transition-all">
                    Employee Login
                 </button>
                 <button className="px-6 py-3 bg-transparent font-bold text-sm tracking-widest hover:bg-slate-100 transition-all border border-slate-300">
                    Welfare Portal
                 </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 bg-transparent border border-slate-300 divide-y divide-slate-300">
               <CultureCard title="Diversity" desc="Inclusive workplace policy" />
               <CultureCard title="Excellence" desc="Merit-based recognition" />
               <CultureCard title="Wellness" desc="Healthcare & mental health" />
               <CultureCard title="Growth" desc="Personal training sessions" />
            </div>
          </div>
        </motion.div>
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
