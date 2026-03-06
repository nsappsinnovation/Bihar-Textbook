import React from "react";
import { motion } from "framer-motion";
import { 
  FiBookOpen, FiGlobe, FiUsers, FiShield, FiHeart, FiFileText, 
  FiAward, FiTarget, FiTrendingUp, FiCheckCircle, FiExternalLink, FiClock, FiSend 
} from "react-icons/fi";

const CsrPolicy = () => {
  const pillars = [
    {
      icon: <FiBookOpen />,
      title: "Educational Access",
      desc: "Providing textbooks, learning materials, and infrastructure support to government schools in rural and semi-urban areas of Bihar.",
      color: "blue"
    },
    {
      icon: <FiGlobe />,
      title: "Digital Inclusion",
      desc: "Promoting access to digital learning tools, smart classrooms, and digital literacy initiatives to bridge the technological divide.",
      color: "blue"
    },
    {
      icon: <FiHeart />,
      title: "Community Welfare",
      desc: "Supporting health awareness programs, skill development workshops, and meaningful community outreach initiatives.",
      color: "blue"
    },
    {
      icon: <FiShield />,
      title: "Environmental Sustainability",
      desc: "Encouraging eco-friendly printing practices, paper recycling, and green campus initiatives to safeguard our natural resources.",
      color: "blue"
    }
  ];

  const initiatives = [
    { title: "Learning Kit Distribution", desc: "Distributed over 50,000 comprehensive learning kits to students in rural districts across Bihar." },
    { title: "Green Bihar Plantation Drive", desc: "Planted 10,000+ saplings in collaboration with local schools to promote environmental awareness." },
    { title: "Teacher Digital Workshops", desc: "Conducted 100+ digital literacy workshops training educators in modern pedagogical tools." },
    { title: "Inclusive Content Support", desc: "Developed specialized educational materials for differently-abled students for inclusive learning." }
  ];

  return (
    <div className="bg-[#f1f5f9] min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-[#0F172A] pt-32 pb-24 text-center overflow-hidden shadow-2xl">
        {/* Soft Gradient & Radial Glow - STEP 1 & 4 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-[linear-gradient(135deg,#0F172A_0%,#1e3a8a_60%,#f1f5f9_100%)] opacity-90" 
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_30%,rgba(59,130,246,0.25),transparent_60%)] pointer-events-none" />
        
        {/* Abstract Background Decoration - STEP 6 */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
         

          {/* Elegant Text Colors - STEP 3 */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-5xl font-extrabold text-[#f8fafc] tracking-tight mb-6"
          >
            Empowering <span className="text-blue-500">Communities</span>, <br />
            Transforming <span className="text-[#60A5FA]">Futures</span>
          </motion.h1>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-2 bg-gradient-to-r from-blue-600 to-blue-600 mx-auto rounded-full mb-10 shadow-[0_0_25px_rgba(37,99,235,0.6)]" 
          />

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[#cbd5e1] max-w-xl mx-auto text-xs md:text-sm font-light leading-relaxed"
          >
            BSTBPC is committed to building a knowledge-driven society by advancing educational equity and social responsibility across the heart of Bihar.
          </motion.p>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="relative px-6 pb-24 z-20 -mt-12">
        <div className="max-w-5xl mx-auto">
          {/* 🏛 PREMUM MAIN COMMITMENT CARD - STEP 3 */}
          <div 
            className="bg-[#F8FAFC]/90 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_-12px_rgba(15,23,42,0.15)] border border-white/60 p-6 md:p-12 relative overflow-hidden"
          >
             {/* Suble Dotted Pattern Decor - STEP 6 */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0F172A 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
             
             {/* Subtle Watermark - STEP 6 */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none w-[600px]">
                <img src="/bstbpc_logo.png" alt="watermark" className="w-full grayscale" />
             </div>

             <div className="flex flex-col lg:flex-row gap-20 items-start relative z-10">
                <div className="lg:w-3/5 space-y-8">
                  
                  
                  {/* Content Section 1️⃣ */}
                   <h2 className="text-2xl md:text-3xl font-black text-[#0F172A] leading-tight tracking-tight">
                    About Our <br />
                    <span className="text-blue-600">CSR Commitment</span>
                  </h2>
                  <div className="space-y-4 text-slate-500 text-sm md:text-base leading-relaxed font-medium">
                    <p>
                      Bihar State Text Book Publishing Corporation Ltd. (BSTBPC) is committed to advancing social responsibility beyond educational publishing. Our CSR initiatives are designed to contribute meaningfully to inclusive growth, environmental sustainability, and community development across Bihar.
                    </p>
                    <p>
                      We believe that education is a powerful catalyst for change. Through our CSR programs, we aim to support underserved communities, promote equitable access to learning resources, and strengthen institutional capacities at the grassroots level.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                    <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                       <FiCheckCircle className="text-blue-600 text-xl mb-3" />
                       <h4 className="text-sm font-bold text-[#0F172A] mb-1">Statutory Compliance</h4>
                       <p className="text-[11px] text-slate-500">Governed by the Companies Act, 2013 and official government guidelines.</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                       <FiTrendingUp className="text-blue-600 text-xl mb-3" />
                       <h4 className="text-sm font-bold text-[#0F172A] mb-1">Transparent Monitoring</h4>
                       <p className="text-[11px] text-slate-500">Rigorous impact assessment for every project we undertake.</p>
                    </div>
                  </div>
                </div>

                {/* Visual Stats Column */}
                <div className="lg:w-2/5 w-full grid grid-cols-1 gap-6">
                   <div className="bg-[#0F172A] rounded-[2.5rem] p-10 text-white shadow-2xl shadow-blue-900/40 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors" />
                      <FiAward className="text-5xl text-blue-400 mb-6" />
                      <h3 className="text-3xl font-black mb-3 italic">Social Leadership</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">Dedicated to the holistic upliftment of the underprivileged sections of Bihar.</p>
                      <button className="mt-8 flex items-center gap-2 text-blue-400 font-bold text-sm uppercase tracking-widest hover:text-white transition-colors group">
                         Download Policy Report <FiExternalLink className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </button>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-6">
                      <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                         <span className="text-2xl font-black text-blue-600 mb-1">100+</span>
                         <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest leading-none">Districts Supported</span>
                      </div>
                      <div className="bg-blue-600 rounded-2xl p-6 flex flex-col items-center justify-center text-center text-white">
                         <span className="text-2xl font-black mb-1">2%</span>
                         <span className="text-[9px] font-black uppercase opacity-70 tracking-widest leading-none">Profit Allocation</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* VISION & MISSION SECTION - Content Section 2️⃣ */}
          <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
             <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="bg-white rounded-[3rem] p-10 md:p-14 shadow-xl border border-slate-100 flex flex-col justify-center gap-6"
             >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-2xl shadow-sm">
                   <FiTarget />
                </div>
                <h3 className="text-xl font-black text-[#0F172A]">Our CSR Vision</h3>
                <p className="text-slate-500 text-base leading-relaxed font-medium italic">
                  "To build an inclusive and knowledge-driven society by supporting initiatives that promote education, sustainability, and community well-being."
                </p>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="bg-[#0F172A] rounded-[3rem] p-10 md:p-14 shadow-xl text-white flex flex-col justify-center gap-8 shadow-blue-900/20"
             >
                <h3 className="text-xl font-black">Our CSR Mission</h3>
                <ul className="grid grid-cols-1 gap-4">
                   {[
                     "Enhance access to quality education in rural areas",
                     "Promote digital literacy and inclusive learning",
                     "Support environmental sustainability initiatives",
                     "Strengthen social infrastructure through responsible governance"
                   ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-4 text-slate-300 font-medium">
                         <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                            <FiCheckCircle size={14} />
                         </div>
                         {item}
                      </li>
                   ))}
                </ul>
             </motion.div>
          </div>

          {/*  SECTION OVERLAP FX WITH PILLARS - Content Section 4️⃣ + STEP 5 */}
          <div className="mt-32">
              <div className="text-center mb-12 space-y-2">
                 <h2 className="text-2xl md:text-3xl font-black text-[#0F172A] tracking-tight">Key Impact Areas</h2>
                 <p className="text-slate-500 max-w-xl mx-auto text-sm font-medium">Strategic descriptions of our focused social interventions.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {pillars.map((pillar, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-10 rounded-[2.5rem] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_25px_50px_-12px_rgba(37,99,235,0.2)] hover:-translate-y-3 transition-all group flex flex-col h-full"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-${pillar.color}-50 flex items-center justify-center text-${pillar.color}-600 mb-6 group-hover:scale-110 transition-transform text-2xl border border-${pillar.color}-100/50 shadow-sm`}>
                      {pillar.icon}
                    </div>
                    <h3 className="text-lg font-black text-[#0F172A] mb-3 group-hover:text-blue-600 transition-colors">{pillar.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium flex-grow">{pillar.desc}</p>
                    <div className="mt-8 pt-6 border-t border-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
                       <span className={`text-${pillar.color}-600 font-black text-xs uppercase tracking-widest`}>Learn More →</span>
                    </div>
                  </motion.div>
                ))}
              </div>
          </div>

          {/*  RECENT INITIATIVES - Content Section 5️⃣ */}
          <div className="mt-40">
              <div className="flex items-center justify-between mb-12">
                 <h2 className="text-2xl md:text-3xl font-black text-[#0F172A] tracking-tight">Recent Initiatives</h2>
                 <div className="hidden md:flex items-center gap-2 text-blue-600 font-black uppercase text-[10px] tracking-tighter">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                   Live Tracking
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {initiatives.map((item, idx) => (
                   <motion.div 
                     key={idx}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     className="bg-white/40 backdrop-blur-sm border border-white p-8 rounded-[2rem] flex gap-6 hover:bg-white transition-all shadow-sm hover:shadow-lg"
                   >
                     <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black flex-shrink-0 shadow-lg">
                       {idx + 1}
                     </div>
                     <div className="space-y-2">
                        <h4 className="text-xl font-black text-[#0F172A]">{item.title}</h4>
                        <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                     </div>
                   </motion.div>
                 ))}
              </div>
          </div>

          {/* GOVERNANCE / BUDGET / ROADMAP SECTION - Content Sections 3️⃣, 6️⃣, 7️⃣ */}
          <div className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
             {/* Section 3️⃣ */}
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-xl"
             >
                <h3 className="text-lg font-black text-[#0F172A] mb-4 flex items-center gap-3">
                   <FiFileText className="text-blue-600" />
                   CSR Governance
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
                   Our CSR activities are governed by the Companies Act, 2013. A dedicated committee oversees project approval, budget utilization, and impact assessment.
                </p>
                <div className="space-y-4">
                   <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                      <FiCheckCircle className="text-green-500" /> Transparent Reporting
                   </div>
                   <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                      <FiCheckCircle className="text-green-500" /> Statutory Compliance
                   </div>
                </div>
             </motion.div>

             {/* Section 6️⃣ */}
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="bg-[#0F172A] p-8 rounded-3xl text-white shadow-2xl shadow-blue-900/20"
             >
                <h3 className="text-lg font-black mb-4 flex items-center gap-3">
                   <FiTrendingUp className="text-blue-400" />
                   CSR Investment
                </h3>
                <p className="text-slate-400 font-medium leading-relaxed mb-8 text-sm">
                   The Corporation allocates a prescribed percentage of its net profits towards CSR activities annually. Funds are utilized responsibly through structured mechanisms.
                </p>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                   <div className="text-xl font-black text-blue-400 mb-1">AUDITED</div>
                   <div className="text-[9px] font-black tracking-widest text-slate-500 uppercase">Annual Expenditure</div>
                </div>
             </motion.div>

             {/* Section 7️⃣ */}
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-xl"
             >
                <h3 className="text-lg font-black text-[#0F172A] mb-6 flex items-center gap-3">
                   <FiGlobe className="text-blue-600" />
                   Future Roadmap
                </h3>
                <ul className="space-y-4">
                   <li className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                      <span className="text-slate-500 font-bold text-xs">Expansion of digital education programs</span>
                   </li>
                   <li className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                      <span className="text-slate-500 font-bold text-xs">Promoting green printing & sustainability</span>
                   </li>
                   <li className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                      <span className="text-slate-500 font-bold text-xs">Expanding community health awareness</span>
                   </li>
                </ul>
             </motion.div>
          </div>

          {/* PARTNER WITH US - CALL TO ACTION - Content Section 8️⃣ */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-40 bg-gradient-to-br from-[#0F172A] to-[#1e3a8a] rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-[0_40px_100px_rgba(15,23,42,0.4)]"
          >
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,#60A5FA_2px,transparent_0)] bg-[length:40px_40px]" />
             <div className="relative z-10 space-y-8">
                <FiUsers className="text-6xl text-blue-400 mx-auto" />
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                   Partner With Us
                </h2>
                <p className="text-blue-200 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed">
                   We welcome collaboration with educational institutions, NGOs, and community organizations to expand the reach and impact of our CSR initiatives.
                </p>
                <div className="pt-8">
                   <button className="px-12 py-5 bg-white text-[#0F172A] font-black rounded-full shadow-2xl hover:bg-[#60A5FA] hover:text-white transition-all transform hover:scale-105 active:scale-95 uppercase tracking-widest text-sm flex items-center justify-center gap-3 mx-auto group">
                      Explore Partnership <FiSend className="group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>
                <div className="pt-12 text-slate-500 text-sm font-bold flex items-center justify-center gap-4">
                   <FiClock /> Our team typically responds within 48 business hours.
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Decorative Bottom Line Divider */}
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#60A5FA]/20 to-transparent" />
      
      {/* 📊 FOOTER STATS DENSITY */}
      <section className="py-24 bg-white border-t border-slate-100">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            <div>
               <div className="text-2xl font-black text-[#0F172A] mb-1 font-mono">2026</div>
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Strategy Year</div>
            </div>
            <div>
               <div className="text-2xl font-black text-[#0F172A] mb-1 font-mono">15M+</div>
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lives Impacted</div>
            </div>
            <div>
               <div className="text-2xl font-black text-[#0F172A] mb-1 font-mono">100%</div>
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Govt Approval</div>
            </div>
            <div>
               <div className="text-2xl font-black text-[#0F172A] mb-1 font-mono">GOLD</div>
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ethics Rating</div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default CsrPolicy;
