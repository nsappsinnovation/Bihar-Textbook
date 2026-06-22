import React from "react";
import { FiUsers, FiAward, FiBookOpen, FiFileText, FiClock, FiCheckCircle, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

const HRD = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] -mt-24">
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-[#0d0e23] pt-32 pb-20 text-center text-white overflow-hidden border-b border-white/5">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-[linear-gradient(135deg,#0F172A_0%,#1e3a8a_60%,#f1f5f9_100%)]" 
        />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4"
          >
            Human Resources & <span className="text-blue-500">Development</span>
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 100 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1.5 w-24 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-8 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          />
          <p className="text-white/60 text-xs md:text-sm max-w-xl mx-auto leading-relaxed font-light">
            Building a future-ready workforce at BSTBPC through strategic recruitment, continuous learning, and employee excellence programs.
          </p>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="relative -mt-12 pb-24 px-6 z-20">
        <div className="max-w-5xl mx-auto">
          <div 
            className="bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-200/50 p-6 md:p-12 relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left Column - HR Overview */}
              <div className="space-y-10">
                <div className="space-y-6">
                  <h2 className="text-xl md:text-2xl font-black text-[#0d0e23] leading-tight">
                    Nurturing Talent, <br />
                    <span className="text-blue-600">Fostering Excellence</span>
                  </h2>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    At BSTBPC, we believe in holistic employee development and fostering a culture of continuous learning. Our HRD strategies are focused on capacity building, professional growth, and maintaining the highest standards of educational publishing.
                  </p>
                </div>

              

                <div className="space-y-4">
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Key Development Pillars</h3>
                  <div className="space-y-3">
                    {["Talent Acquisition & Planning", "Capacity Building & Upskilling", "Holistic Employee Wellness", "Career Progression & Appraisal"].map((pillar, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-xs font-bold text-slate-700">
                        <FiCheckCircle className="text-blue-500" /> {pillar}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Training & Development */}
              <div className="bg-slate-50/50 rounded-2xl p-6 md:p-8 border border-slate-100">
                <h3 className="text-lg font-black text-[#0d0e23] mb-6 flex items-center gap-3">
                  
                  Development Programs
                </h3>
                <div className="space-y-8">
                  <TimelineItem 
                    title="Foundation & Induction" 
                    desc="Comprehensive onboarding for new team members to align with BSTBPC's educational mission." 
                    status="Ongoing"
                  />
                  <TimelineItem 
                    title="Technical & Digital Upskilling" 
                    desc="Advanced skill training on modern publishing technologies and digital workflow integration." 
                    status="Upcoming"
                  />
                  <TimelineItem 
                    title="Leadership & Capacity Building" 
                    desc="Specialized workshops empowering mid-level managers in strategic educational governance." 
                    status="Quarterly"
                  />
                </div>

                
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* Helper Components */
const StatCard = ({ icon, label, value, color }) => (
  <div className={`p-5 bg-${color}-50/50 rounded-2xl border border-${color}-100 flex items-center gap-4`}>
    <div className={`w-10 h-10 rounded-xl bg-${color}-600 text-white flex items-center justify-center text-xl shadow-lg shadow-${color}-100`}>
      {icon}
    </div>
    <div>
      <div className="text-xl font-black text-[#0d0e23]">{value}</div>
      <div className={`text-[10px] font-bold text-${color}-600 uppercase tracking-wider`}>{label}</div>
    </div>
  </div>
);

const TimelineItem = ({ title, desc, status }) => (
  <div className="relative pl-6 border-l-2 border-slate-200 group">
    <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-blue-600 group-hover:scale-150 transition-transform" />
    <div className="flex justify-between items-start mb-1">
      <h4 className="text-sm font-black text-slate-800">{title}</h4>
      <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-tighter">{status}</span>
    </div>
    <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{desc}</p>
  </div>
);

export default HRD;
