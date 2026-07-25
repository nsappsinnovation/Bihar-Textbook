import React from "react";
import { motion } from "framer-motion";

const CsrPolicy = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-24 pb-56 text-center text-white overflow-hidden bg-gradient-to-br from-[#0b2b4f] to-[#124d9c]">
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
            CSR Policy
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 100 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1.5 w-24 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-8 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-white/60 text-xs md:text-sm max-w-xl mx-auto leading-relaxed font-light"
          >
            Corporate Social Responsibility Policy for Bihar State Text Book Publishing Corporation Ltd.
          </motion.p>
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
          {/* ELEVATED CONTAINER */}
          <div className="bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-200/50 p-4 md:p-8">
            <div className="w-full h-[800px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center">
              <iframe 
                src="/csr-policy.pdf" 
                className="w-full h-full border-0" 
                title="CSR Policy Document"
              >
                <p className="text-slate-500 text-sm">
                  This browser does not support PDFs. 
                  <a href="/csr-policy.pdf" className="text-blue-600 underline ml-1">Download the PDF</a>.
                </p>
              </iframe>
            </div>
            <div className="mt-6 flex justify-center">
                <a 
                    href="/csr-policy.pdf" 
                    download="CSR_Policy_BSTBPC.pdf" 
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#0b2b4f] text-white font-bold text-sm shadow-[0_10px_20px_rgba(11,43,79,0.2)] hover:bg-[#124d9c] hover:shadow-[0_15px_30px_rgba(18,77,156,0.3)] hover:-translate-y-1 transition-all duration-300"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download CSR Policy
                </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CsrPolicy;
