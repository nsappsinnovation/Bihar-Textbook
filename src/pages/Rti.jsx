import React from "react";
import { FiInfo, FiUser, FiPhone, FiMail, FiMapPin, FiExternalLink, FiShield, FiFileText, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";

const RTI = () => {
  const [rtiData, setRtiData] = React.useState({ 
    officer: 'Shri. Rajesh Kumar', 
    phone: '06122221975', 
    email: 'rti.bstbpc@bihar.gov.in', 
    address: 'Pathya Pustak Bhawan, Buddh Marg, Budh Vihar, Fraser Road Area, Patna - 800001' 
  });

  React.useEffect(() => {
    const saved = localStorage.getItem('module_content_dc-rti');
    if (saved) {
      setRtiData(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] -mt-24">
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-48 pb-56 text-center text-white overflow-hidden bg-gradient-to-br from-[#0b2b4f] to-[#124d9c]">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 md:left-32 grid grid-cols-3 gap-2 opacity-20">
            {[...Array(9)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white"></div>)}
        </div>
        <div className="absolute bottom-40 right-10 md:right-32 grid grid-cols-3 gap-2 opacity-20">
            {[...Array(9)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white"></div>)}
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4"
          >
            Right To <span className="text-blue-500">Information</span> (RTI)
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1.5 w-20 bg-blue-500 mx-auto rounded-full mb-6" 
          />
          <p className="text-white/80 text-xs md:text-sm max-w-xl mx-auto leading-relaxed font-light">
            Ensuring transparency and accountability in governance through the Right to Information Act, 2005.
          </p>
        </div>

        {/* CSS Wave Bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
          <svg className="relative block w-full h-[60px] md:h-[120px]" preserveAspectRatio="none" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M0 0C480 130 960 130 1440 0V100H0V0Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="relative -mt-44 pb-24 px-6 z-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - PIO Details */}
            <div className="lg:col-span-1 space-y-6">
              <div
                className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100"
              >
                
                <h3 className="text-lg font-black text-[#0d0e23] mb-8">Nodal Officer</h3>
                
                <div className="space-y-6">
                  <ContactItem icon={<FiUser />} label="Public Information Officer" value={rtiData.officer} />
                  <ContactItem icon={<FiPhone />} label="Contact Number" value={rtiData.phone} />
                  <ContactItem icon={<FiMail />} label="Email Address" value={rtiData.email} />
                  <ContactItem icon={<FiMapPin />} label="Office Address" value={rtiData.address} />
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100">
                  <a href="https://rtionline.gov.in/" target="_blank" rel="noopener noreferrer" className="w-full py-4 rounded-xl bg-[#0d0e23] text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-blue-100">
                    File Online RTI <FiExternalLink />
                  </a>
                </div>
              </div>
            </div>

            {/* Middle/Right Column - Guidelines */}
            <div className="lg:col-span-2 space-y-8">
              <div 
                className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-100"
              >
                <h2 className="text-xl md:text-2xl font-black text-[#0d0e23] mb-6 flex items-center gap-4">
                 
                  Proactive Disclosures
                </h2>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-10">
                  Under Section 4(1)(b) of the RTI Act 2005, every public authority has the obligation to provide information to the public at regular intervals through various means of communication.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Organization Structure",
                    "Duties & Responsibilities",
                    "Decision Making Process",
                    "Directory of Officers",
                    "Monthly Remuneration",
                    "Budget Allocation",
                    "Execution of Subsidy Programs",
                    "Grant of Licenses"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 transition-all group cursor-default">
                      <FiCheckCircle className="text-blue-500 flex-shrink-0" />
                      <span className="text-[11px] font-bold text-slate-700">{item}</span>
                    </div>
                  ))}
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
const ContactItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 mt-1">
      {icon}
    </div>
    <div>
      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</div>
      <div className="text-xs font-bold text-slate-800 leading-tight">{value}</div>
    </div>
  </div>
);

const FiDownload = ({ className }) => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

export default RTI;
