import React from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, Monitor, Heart, Leaf, FileText, 
  TrendingUp, CheckCircle2, Eye, Target, Map,
  Calendar, Users, ShieldCheck
} from "lucide-react";

const CsrPolicy = () => {
  const pillars = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Educational Access",
      desc: "Providing textbooks, learning materials, and infrastructure support to government schools in rural and semi-urban areas."
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Digital Inclusion",
      desc: "Promoting access to digital learning tools, smart classrooms, and digital literacy initiatives to bridge the technological divide."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Community Welfare",
      desc: "Supporting health awareness programs, skill development workshops, and meaningful community outreach initiatives."
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Environmental Sustainability",
      desc: "Encouraging eco-friendly printing practices, paper recycling, and green campus initiatives to safeguard our resources."
    }
  ];

  const initiatives = [
    { title: "Learning Kit\nDistribution", desc: "Distributed over 50,000 comprehensive learning kits to students in rural districts across Bihar." },
    { title: "Green Bihar\nPlantation Drive", desc: "Planted 10,000+ saplings in collaboration with local schools to promote environmental awareness." },
    { title: "Teacher Digital\nWorkshops", desc: "Conducted 100+ digital literacy workshops training educators in modern pedagogical tools." },
    { title: "Inclusive Content\nSupport", desc: "Developed specialized educational materials for differently-abled students for inclusive learning." }
  ];

  return (
    <div className="bg-[#FAFAFA] min-h-screen font-sans text-slate-800 pb-20">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full h-[500px] flex items-center overflow-hidden bg-white">
        {/* Background Image - The plant */}
        <div 
            className="absolute inset-0 z-0 opacity-80" 
            style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
                backgroundPosition: 'right center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}
        />
        
        {/* Gradient Overlay to fade left side to white */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/75 to-transparent z-10 w-full md:w-[70%]" />

        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[40px] md:text-[56px] font-black text-slate-900 leading-[1.1] tracking-tight mb-8"
            >
              Empowering <span className="text-blue-700">Communities</span>,<br />
              Transforming <span className="text-blue-700">Futures</span>
              <div className="w-16 h-1 bg-blue-600 mt-6 rounded-full"></div>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-600 text-sm md:text-base font-medium leading-relaxed max-w-lg"
            >
              BSTBPC is committed to building a knowledge-driven society by advancing educational equity and social responsibility across the heart of Bihar.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ================= ABOUT CSR COMMITMENT ================= */}
      <section className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
        <div className="bg-white rounded-[32px] p-8 md:p-14 shadow-[0_10px_40px_rgb(0,0,0,0.04)] border border-slate-100">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                
                {/* Left Side: Text */}
                <div className="lg:w-5/12 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                        About Our <br />
                        <span className="text-blue-700">CSR Commitment</span>
                    </h2>
                    <div className="space-y-4 text-[16px] text-slate-600 font-medium leading-relaxed">
                        <p>
                            Bihar State Text Book Publishing Corporation Ltd. (BSTBPC) is committed to advancing social responsibility beyond educational publishing. Our CSR initiatives are designed to contribute meaningfully to inclusive growth, environmental sustainability, and community development across Bihar.
                        </p>
                        <p>
                            We believe that education is a powerful catalyst for change. Through our CSR programs, we aim to support underserved communities, promote equitable access to learning resources, and strengthen institutional capacities at the grassroots level.
                        </p>
                    </div>
                </div>

                {/* Right Side: Vision & Mission Cards */}
                <div className="lg:w-7/12 space-y-6">
                    {/* Vision Card */}
                    <div className="bg-[#FAFAFA] border border-slate-200 rounded-3xl p-8 flex gap-6 items-start">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 shadow-sm">
                            <Eye className="text-blue-600 w-7 h-7" />
                        </div>
                        <div>
                            <h3 className="text-[17px] font-black text-slate-900 mb-2">Our CSR Vision</h3>
                            <p className="text-[14px] text-slate-600 font-medium italic leading-relaxed">
                                "To build an inclusive and knowledge-driven society by supporting initiatives that promote education, sustainability, and community well-being."
                            </p>
                        </div>
                    </div>

                    {/* Mission Card */}
                    <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-8 flex gap-6 items-start">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shrink-0 border border-blue-50 shadow-sm">
                            <Target className="text-blue-600 w-7 h-7" />
                        </div>
                        <div>
                            <h3 className="text-[17px] font-black text-slate-900 mb-4">Our CSR Mission</h3>
                            <ul className="space-y-3">
                                {[
                                    "Enhance access to quality education in rural areas",
                                    "Promote digital literacy and inclusive learning",
                                    "Support environmental sustainability initiatives",
                                    "Strengthen social infrastructure through responsible governance"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <CheckCircle2 className="text-blue-500 w-5 h-5 shrink-0 mt-0.5" />
                                        <span className="text-[13px] text-slate-700 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
      </section>

      {/* ================= KEY IMPACT AREAS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center mb-12">
            <h2 className="text-[26px] font-black text-slate-900 tracking-tight mb-2">Key Impact Areas</h2>
            <p className="text-[14px] text-slate-500 font-medium">Strategic descriptions of our focused social interventions.</p>
            <div className="w-10 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => (
                <div key={idx} className="bg-white border border-slate-100 rounded-[32px] p-8 text-center shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-100">
                        <div className="text-blue-600">
                            {pillar.icon}
                        </div>
                    </div>
                    <h3 className="text-[16px] font-black text-slate-900 mb-3">{pillar.title}</h3>
                    <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
                        {pillar.desc}
                    </p>
                </div>
            ))}
        </div>
      </section>

      

      {/* ================= GOVERNANCE, INVESTMENT, ROADMAP ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CSR Governance */}
        <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <FileText className="text-blue-600 w-6 h-6" />
                <h3 className="text-[16px] font-black text-slate-900">CSR Governance</h3>
            </div>
            <p className="text-[13px] text-slate-600 font-medium leading-relaxed mb-8">
                Our CSR activities are governed by the Companies Act, 2013. A dedicated committee oversees project approval, budget utilization, and impact assessment.
            </p>
            <div className="space-y-4">
                <div className="flex items-center gap-3 text-[13px] font-bold text-slate-800">
                    <CheckCircle2 className="text-blue-500 w-5 h-5" /> Transparent Reporting
                </div>
                <div className="flex items-center gap-3 text-[13px] font-bold text-slate-800">
                    <CheckCircle2 className="text-blue-500 w-5 h-5" /> Statutory Compliance
                </div>
            </div>
        </div>

        {/* CSR Investment */}
        <div className="bg-slate-800 rounded-[32px] p-8 shadow-xl text-white relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
            
            <div className="flex items-center gap-3 mb-6 relative z-10">
                <TrendingUp className="text-blue-400 w-6 h-6" />
                <h3 className="text-[16px] font-black text-white">CSR Investment</h3>
            </div>
            <p className="text-[13px] text-slate-300 font-medium leading-relaxed mb-10 relative z-10">
                The Corporation allocates a prescribed percentage of its net profits towards CSR activities annually. Funds are utilized responsibly through structured mechanisms.
            </p>
            
            <div className="bg-white/10 border border-white/20 rounded-2xl p-4 flex items-center gap-4 relative z-10 backdrop-blur-sm">
                <ShieldCheck className="text-white w-8 h-8 opacity-80" strokeWidth={1.5} />
                <div>
                    <div className="text-[12px] font-black text-white tracking-wider">AUDITED</div>
                    <div className="text-[9px] font-bold text-blue-300 uppercase tracking-widest mt-0.5">Annual Expenditure</div>
                </div>
            </div>
        </div>

        {/* Future Roadmap */}
        <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <Map className="text-blue-600 w-6 h-6" />
                <h3 className="text-[16px] font-black text-slate-900">Future Roadmap</h3>
            </div>
            <ul className="space-y-5">
                <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></div>
                    <span className="text-[13px] text-slate-600 font-bold leading-relaxed">Expansion of digital education programs</span>
                </li>
                <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></div>
                    <span className="text-[13px] text-slate-600 font-bold leading-relaxed">Promoting green printing & sustainability</span>
                </li>
                <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></div>
                    <span className="text-[13px] text-slate-600 font-bold leading-relaxed">Expanding community health awareness</span>
                </li>
            </ul>
        </div>

      </section>

      {/* ================= FOOTER STATS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-10">
        <div className="bg-slate-50 border border-slate-100 rounded-[32px] p-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center shadow-sm">
            
            <div className="flex flex-col items-center">
                <Calendar className="text-blue-600 w-6 h-6 mb-3 opacity-80" strokeWidth={1.5} />
                <div className="text-2xl font-black text-slate-900 mb-1">2026</div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Strategy Year</div>
            </div>

            <div className="flex flex-col items-center border-t sm:border-t-0 sm:border-l border-slate-200 pt-6 sm:pt-0">
                <Users className="text-blue-600 w-6 h-6 mb-3 opacity-80" strokeWidth={1.5} />
                <div className="text-2xl font-black text-slate-900 mb-1">15M+</div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Lives Impacted</div>
            </div>

            <div className="flex flex-col items-center border-t sm:border-t-0 sm:border-l border-slate-200 pt-6 sm:pt-0">
                <ShieldCheck className="text-blue-600 w-6 h-6 mb-3 opacity-80" strokeWidth={1.5} />
                <div className="text-2xl font-black text-slate-900 mb-1">100%</div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Govt Approval</div>
            </div>

        </div>
      </section>

    </div>
  );
};

export default CsrPolicy;
