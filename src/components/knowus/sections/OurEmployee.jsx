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
      <section className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0d0e23] rounded-[2.5rem] p-12 text-white overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[100px] -mr-32 -mt-32 rounded-full" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-black leading-tight italic">
                "Our employees are not just workers, they are the architects of a more literate Bihar."
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                At BSTBPC, we foster an environment of continuous learning, mutual respect, and social purpose. Every member of our team plays a critical role in the state's educational progress.
              </p>
              <div className="flex gap-4">
                 <button className="px-6 py-3 bg-blue-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30">
                    Employee Login
                 </button>
                 <button className="px-6 py-3 bg-white/10 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10">
                    Welfare Portal
                 </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
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
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
    <div className={`w-12 h-12 rounded-2xl bg-${color}-50 text-${color}-600 flex items-center justify-center text-xl mb-4`}>
       {icon}
    </div>
    <div className="text-2xl font-black text-[#0d0e23]">{value}</div>
    <div className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">{label}</div>
  </div>
);

const CultureCard = ({ title, desc }) => (
  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
    <h4 className="text-sm font-black text-blue-400 mb-1">{title}</h4>
    <p className="text-[10px] text-slate-400 font-medium">{desc}</p>
  </div>
);

export default OurEmployee;
