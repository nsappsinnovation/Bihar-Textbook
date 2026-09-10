import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiExternalLink } from 'react-icons/fi';
import { getSetting } from '../../../services/settingService';
import { fileUrl } from '../../../services/api';

const RegisterPrinters = () => {
  const [isInteracting, setIsInteracting] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('/printer.pdf'); // Fallback PDF if none exists
  const [fileName, setFileName] = useState('EMPANALLED_PRINTERS.PDF');

  // The printer list PDF is stored in the "printer_registry_doc" setting
  useEffect(() => {
    getSetting('printer_registry_doc')
      .then((path) => {
        if (path) {
          setPdfUrl(fileUrl(path));
          setFileName(path.split('/').pop().toUpperCase());
        }
      })
      .catch(() => {});
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
          Empanalled <span className="text-blue-600">Printers</span>
        </motion.h1>
        
        <p className="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed font-medium">
          Our empanalled network of high-tech printing houses ensuring quality and integrity in every page.
        </p>
      </section>

      {/* ================= PDF VIEWER PREVIEW ================= */}
      <section className="max-w-5xl mx-auto px-6 mb-12">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
           <div className="bg-slate-50 p-6 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-black uppercase text-slate-400 tracking-tighter">Document Preview: {fileName}</span>
              <div className="flex gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                 <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                 <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
           </div>
           <div className="h-[700px] w-full bg-slate-100 flex items-center justify-center relative overflow-hidden group">
              <iframe
                src={`${pdfUrl}#toolbar=1`}
                title="Empanalled Printers Directory"
                className="w-full h-full border-none"
              />
              
              {!isInteracting && (
                <div 
                  className="absolute inset-0 bg-[#0d0e23]/5 backdrop-blur-[2px] flex items-center justify-center cursor-pointer group/overlay transition-all duration-500"
                  onClick={() => setIsInteracting(true)}
                >
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                    <button className="px-8 py-4 bg-white rounded-2xl shadow-2xl border border-slate-200 font-bold text-sm flex items-center gap-3 group-hover/overlay:scale-105 transition-transform pointer-events-none text-slate-700">
                        <FiSearch className="text-blue-600" /> Click to interact with PDF
                    </button>
                  </div>
                </div>
              )}
              
              {isInteracting && (
                <button 
                  onClick={() => setIsInteracting(false)}
                  className="absolute top-6 right-6 z-50 p-3 bg-white/90 backdrop-blur-md rounded-xl border border-slate-200 shadow-xl text-slate-600 hover:bg-white hover:text-blue-600 transition-all"
                  title="Close Interaction"
                >
                  <FiExternalLink className="rotate-180" />
                </button>
              )}
           </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterPrinters;
