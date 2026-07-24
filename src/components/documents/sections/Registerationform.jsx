import React, { useState } from "react";
import toast from 'react-hot-toast';
import { FiFileText, FiDownload, FiSearch, FiFilter, FiBriefcase, FiUser, FiHome, FiCheckCircle, FiEye } from "react-icons/fi";
import { motion } from "framer-motion";

const defaultFormsData = [
  { id: 1, title: "Vendor Registration Form", category: "Stakeholder", type: "PDF" },
  { id: 2, title: "Author Empanelment Application", category: "Educational", type: "PDF" },
  { id: 3, title: "Publisher Registration Portal Form", category: "Corporate", type: "DOCX" },
  { id: 4, title: "School Textbook Requisition Form", category: "Stakeholder", type: "PDF" },
  { id: 5, title: "Employee Benefit Claim Form", category: "HR", type: "PDF" },
  { id: 6, title: "New Distribution Agency Request", category: "Corporate", type: "PDF" },
];

const RegistrationForms = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  
  const [formsData, setFormsData] = useState(() => {
    const saved = localStorage.getItem('module_content_dc-reg-forms');
    return saved ? JSON.parse(saved) : defaultFormsData;
  });

  const filteredForms = formsData.filter(form => 
    (filter === "All" || form.category === filter) &&
    form.title.toLowerCase().includes(search.toLowerCase())
  );

  const handlePreview = (form) => {
    if (!form.document) {
      toast.error("No document available for preview.");
      return;
    }
    try {
      if (form.document.startsWith('data:')) {
        const bin = atob(form.document.split(',')[1]);
        const array = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) {
          array[i] = bin.charCodeAt(i);
        }
        const blob = new Blob([array], { type: form.type === 'PDF' ? 'application/pdf' : 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
      } else {
        window.open(form.document, '_blank');
      }
    } catch (err) {
      console.error('View Error:', err);
      toast.error('Error preparing document preview');
    }
  };

  const handleDownload = (form) => {
    if (!form.document) {
      toast.error("No document available for download.");
      return;
    }
    const link = document.createElement('a');
    link.href = form.document;
    link.download = form.title + (form.type === 'PDF' ? '.pdf' : '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
            Resource & <span className="text-blue-500">Registration</span> Forms
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full mb-6" 
          />
          <p className="text-slate-400 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
            Download official registration forms, applications, and requisition documents for all BSTBPC stakeholders.
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
          <div
            className="bg-white rounded-3xl shadow-xl border border-slate-200/60 p-4 md:p-8"
          >
            {/* Search & Filter Bar */}
            <div className="flex flex-col lg:flex-row gap-6 mb-10 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="relative flex-grow">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search forms by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium"
                />
              </div>
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {["All", "Stakeholder", "Educational", "Corporate", "HR"].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                      filter === cat ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Forms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredForms.map((form) => (
                <motion.div 
                  key={form.id}
                  whileHover={{ translateY: -5 }}
                  className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <FiFileText className="text-xl" />
                  </div>
                  <h4 className="text-sm font-black text-[#0d0e23] mb-2 leading-tight h-10 line-clamp-2">{form.title}</h4>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-6 pt-4 border-t border-slate-50">
                    <span>{form.type}</span>
                    <span className="text-blue-500">{form.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handlePreview(form)} className="flex-1 py-3 rounded-xl bg-slate-50 text-[#0d0e23] border border-slate-200 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                      <FiEye /> Preview
                    </button>
                    <button onClick={() => handleDownload(form)} className="flex-1 py-3 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all">
                      <FiDownload /> Download
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredForms.length === 0 && (
              <div className="py-20 text-center text-slate-400">
                <FiFileText className="text-5xl mx-auto mb-4 opacity-20" />
                <p className="font-bold">No forms found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegistrationForms;
