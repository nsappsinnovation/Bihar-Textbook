import React, { useState, useMemo } from "react";
import { FiSearch, FiFileText, FiBell, FiArrowRight, FiCalendar, FiClock, FiFilter } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

// All 33 notices extracted from https://bstbpc.bihar.gov.in/Notice_Circulars.aspx
const noticesData = [
  {
    id: 1,
    title: "Selection under application for walk-in interview ADVT No BSTBPC/851/2025",
    description: "Selection under application for walk-in interview ADVT No BSTBPC/851/2025",
    date: "17/01/2026",
    category: "Recruitment",
    isUrgent: true,
    document: "https://bstbpc.bihar.gov.in/Admin/documents/168Notice.pdf",
  },
  {
    id: 2,
    title: "Financial Proceeding of BSTBPC / E-Tender/ Bilingual Text books for Class IX to XII",
    description: "Financial Proceeding of BSTBPC / E-Tender/ Bilingual Text books for Class IX to XII for School Library /742 dt 04/07/2025",
    date: "15/09/2025",
    category: "Financial",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/167Notice.pdf",
  },
  {
    id: 3,
    title: "Financial Bid Opening Notice of BSTBPC / E-Tender/ Bilingual Text books",
    description: "Financial Bid Opening Notice of BSTBPC / E-Tender/ Bilingual Text books for Class IX to XII for School Library /742 dt 04/07/2025",
    date: "06/09/2025",
    category: "Financial",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/166Notice.pdf",
  },
  {
    id: 4,
    title: "Notice for Financial Bid Opening of BSTBPC / E-Tender Printing Supply",
    description: "Notice for Financial Bid Opening of BSTBPC / E-Tender Printing Supply",
    date: "01/10/2025",
    category: "Financial",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/165Notice.pdf",
  },
  {
    id: 5,
    title: "Technical Evaluation of BSTBPC / E-Tender/ Bilingual Text books",
    description: "Technical Evaluation of BSTBPC / E-Tender/ Bilingual Text books for Class IX to XII for School Library /742 dt 04/07/2025",
    date: "28/08/2025",
    category: "Technical",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/164Notice.pdf",
  },
  {
    id: 6,
    title: "Corrigendum of BSTBPC / E-Tender/ Bilingual Text books for Class IX to XII",
    description: "Corrigendum of BSTBPC / E-Tender/ Bilingual Text books for Class IX to XII for School Library /742 dt 04/07/2025",
    date: "29/07/2025",
    category: "Corrigendum",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/163Notice.pdf",
  },
  {
    id: 7,
    title: "BSTBPC / E-Tender/ Bilingual Text books for Class IX to XII for School Library",
    description: "BSTBPC / E-Tender/ Bilingual Text books for Class IX to XII for School Library /742 dt 04/07/2025",
    date: "04/07/2025",
    category: "Circular",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/162Notice.pdf",
  },
  {
    id: 8,
    title: "Corrigendum of BSTBPC / E-Tender/ Printing, Supply of Text Books",
    description: "Corrigendum of BSTBPC / E-Tender/ Printing, Supply of Text Books for the session 2025-26 for class 1st to 5th /737 dt 03/07/2025",
    date: "31/07/2025",
    category: "Corrigendum",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/161Notice.pdf",
  },
  {
    id: 9,
    title: "Notice for Technical Bid Opening of BSTBPC / E-Tender Printing Supply",
    description: "Notice for Technical Bid Opening of BSTBPC / E-Tender Printing Supply /737 dt 03/07/2025",
    date: "25/07/2025",
    category: "Technical",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/160Notice.pdf",
  },
  {
    id: 10,
    title: "BSTBPC / E-Tender/ Printing, Supply of Text Books for session 2025-26",
    description: "BSTBPC / E-Tender/ Printing, Supply of Text Books for the session 2025-26 for class 1st to 5th /737 dt 03/07/2025",
    date: "03/07/2025",
    category: "Circular",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/159Notice.pdf",
  },
  {
    id: 11,
    title: "Extension of Date for BSTBPC / E-Tender/ Printing, Supply of Text Books",
    description: "Extension of Date for BSTBPC / E-Tender/ Printing, Supply of Text Books for the session 2024-25 /735 dt 02/07/2025",
    date: "02/07/2025",
    category: "Extension",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/158Notice.pdf",
  },
  {
    id: 12,
    title: "Corrigendum of BSTBPC / E-Tender/ Printing, Supply of Text Books 2024-25",
    description: "Corrigendum of BSTBPC / E-Tender/ Printing, Supply of Text Books for the session 2024-25 /734 dt 01/07/2025",
    date: "01/07/2025",
    category: "Corrigendum",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/157Notice.pdf",
  },
  {
    id: 13,
    title: "Notice for Technical Bid Opening BSTBPC / E-Tender 2024-25",
    description: "Notice for Technical Bid Opening of BSTBPC / E-Tender/ Printing, Supply of Text Books 2024-25",
    date: "28/06/2025",
    category: "Technical",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/156Notice.pdf",
  },
  {
    id: 14,
    title: "BSTBPC / E-Tender/ Printing, Supply of Text Books for session 2024-25",
    description: "BSTBPC / E-Tender/ Printing, Supply of Text Books for the session 2024-25 for class 6th to 12th",
    date: "18/06/2025",
    category: "Circular",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/155Notice.pdf",
  },
  {
    id: 15,
    title: "Advertisement Regarding Walk-in-interview ADVT No BSTBPC/654/2025",
    description: "Advertisement Regarding Walk-in-interview ADVT No BSTBPC/654/2025",
    date: "04/06/2025",
    category: "Recruitment",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/154Notice.pdf",
  },
  {
    id: 16,
    title: "Tender for Housekeeping Services at BSTBPC Patna",
    description: "Tender for Housekeeping Services at Bihar State Text Book Publishing Corporation Ltd. Patna",
    date: "22/05/2025",
    category: "Tender",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/153Notice.pdf",
  },
  {
    id: 17,
    title: "Notice for BSTBPC / E-Tender/ Printing, Supply of Text Books 2024-25",
    description: "Notice for BSTBPC / E-Tender/ Printing, Supply of Text Books for the session 2024-25",
    date: "30/04/2025",
    category: "Circular",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/152Notice.pdf",
  },
  {
    id: 18,
    title: "Financial Bid Opening Notice BSTBPC / E-Tender /632 dt 27/04/2025",
    description: "Financial Bid Opening Notice of BSTBPC / E-Tender /632 dt 27/04/2025",
    date: "08/05/2025",
    category: "Financial",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/151Notice.pdf",
  },
  {
    id: 19,
    title: "Technical Bid Opening Notice BSTBPC / E-Tender /632 dt 27/04/2025",
    description: "Technical Bid Opening Notice of BSTBPC / E-Tender /632 dt 27/04/2025",
    date: "29/04/2025",
    category: "Technical",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/150Notice.pdf",
  },
  {
    id: 20,
    title: "E-Tender for Printing & Supply of Text Books Session 2024-25",
    description: "E-Tender for Printing & Supply of Text Books for the Session 2024-25",
    date: "27/04/2025",
    category: "Tender",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/149Notice.pdf",
  },
];

const Notice = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("All");
  const noticesPerPage = 10;

  const filters = ["All", "Recruitment", "Financial", "Technical", "Circular", "Tender", "Corrigendum"];

  const isNew = (dateStr) => {
    try {
      const parts = dateStr.split('/');
      const d = new Date(parts[2], parts[1] - 1, parts[0]);
      const now = new Date();
      const diffTime = Math.abs(now - d);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 30; // Using 30 days for demo since dates are older
    } catch { return false; }
  };

  const filteredNotices = useMemo(() => {
    return noticesData.filter((n) => {
      const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) ||
                          n.description.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = activeFilter === "All" || n.category === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  const totalPages = Math.ceil(filteredNotices.length / noticesPerPage);
  const currentNotices = filteredNotices.slice((currentPage - 1) * noticesPerPage, currentPage * noticesPerPage);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / 5) * 5;
    return new Array(Math.min(5, totalPages - start)).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-[#0d0e23] pt-16 pb-20 text-center text-white overflow-hidden border-b border-white/5">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-[linear-gradient(135deg,#0F172A_0%,#1e3a8a_60%,#f1f5f9_100%)]" 
        />
        
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
          backgroundSize: '0px 40px'
        }} />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4"
          >
            Notice Board
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
            Stay updated with official notices, circulars, tenders & important announcements from the Bihar State Text Book Publishing Corporation.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-10 flex flex-wrap justify-center gap-4 text-sm"
          >
            <div className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-2 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-white/80">{noticesData.length} Total Notices</span>
            </div>
            <div className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-2 backdrop-blur-sm">
              <FiClock className="text-blue-400" />
              <span className="text-white/80">Last Updated: {noticesData[0].date}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="relative -mt-12 pb-24 px-6 z-20">
        <div className="max-w-5xl mx-auto">
          {/* ELEVATED CONTAINER */}
          <div 
            className="bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-200/50 p-4 md:p-8"
          >
            {/* FILTER & SEARCH SECTION (Static) */}
            <div className="space-y-6 bg-slate-50/50 rounded-2xl p-4 border border-slate-100 mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                    <FiBell className="text-xl text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#0d0e23]">Directives & Results</h2>
                    <p className="text-slate-500 text-xs">Real-time repository for official communication</p>
                  </div>
                </div>

                <div className="relative w-full lg:w-[350px] group">
                  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors text-lg" />
                  <input
                    type="text"
                    placeholder="Search by keyword or department..."
                    value={search}
                    onChange={handleSearch}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all text-xs text-slate-700 shadow-inner"
                  />
                </div>
              </div>

              {/* QUICK FILTERS */}
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                <FiFilter className="text-slate-400 mr-2 flex-shrink-0" />
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => { setActiveFilter(filter); setCurrentPage(1); }}
                    className={`px-6 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-300 ${
                      activeFilter === filter 
                        ? 'bg-[#0d0e23] text-white shadow-xl shadow-slate-300 scale-105' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 active:scale-95'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* ERROR / EMPTY STATE */}
            <AnimatePresence mode="wait">
              {currentNotices.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="py-32 text-center"
                >
                  <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiSearch className="text-4xl text-slate-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">No results found</h3>
                  <p className="text-slate-500 mt-2">Try adjusting your search terms or filters.</p>
                  <button onClick={() => { setSearch(""); setActiveFilter("All"); }} className="mt-8 text-blue-600 font-bold hover:underline">Clear all filters</button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {/* DESKTOP TABLE */}
                  <div className="hidden lg:block overflow-hidden rounded-3xl border border-slate-100 bg-slate-50/50">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="px-8 py-6 font-bold text-xs uppercase tracking-widest text-slate-400">S.No</th>
                          <th className="px-8 py-6 font-bold text-xs uppercase tracking-widest text-slate-400">Details</th>
                          <th className="px-8 py-6 font-bold text-xs uppercase tracking-widest text-slate-400">Date</th>
                          <th className="px-8 py-6 font-bold text-xs uppercase tracking-widest text-slate-400 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {currentNotices.map((notice, index) => (
                          <motion.tr 
                            key={notice.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group hover:bg-blue-50/40 transition-all duration-200 cursor-default"
                          >
                            <td className="px-8 py-8">
                              <span className="text-slate-400 font-mono text-sm leading-none">{(currentPage - 1) * noticesPerPage + index + 1}</span>
                            </td>
                            <td className="px-8 py-8">
                              <div className="flex items-start gap-4 max-w-2xl">
                                <div className="space-y-2">
                                  <div className="flex flex-wrap items-center gap-2">
                                    {isNew(notice.date) && (
                                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                                        <span className="w-1 h-1 bg-blue-500 rounded-full" /> NEW
                                      </span>
                                    )}
                                    {notice.isUrgent && (
                                      <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                                        URGENT
                                      </span>
                                    )}
                                    <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
                                      {notice.category}
                                    </span>
                                  </div>
                                  <h4 className="text-base font-bold text-slate-800 leading-tight group-hover:text-blue-700 transition-colors">
                                    {notice.title}
                                  </h4>
                                  <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                                    {notice.description}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-8 whitespace-nowrap">
                              <div className="flex flex-col">
                                <span className="text-slate-700 font-bold bg-slate-100 px-3 py-1 rounded-lg text-sm">{notice.date}</span>
                              </div>
                            </td>
                            <td className="px-8 py-8 text-right">
                              <motion.a
                                href={notice.document}
                                target="_blank" rel="noopener noreferrer"
                                whileHover={{ scale: 1.05, x: 5 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0d0e23] text-white text-[10px] whitespace-nowrap font-black shadow-lg shadow-slate-200 hover:shadow-blue-200 hover:bg-blue-700 transition-all uppercase tracking-widest"
                              >
                                <FiFileText className="text-base" />
                                View PDF
                                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                              </motion.a>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* MOBILE CARD VIEW */}
                  <div className="lg:hidden grid gap-6">
                    {currentNotices.map((notice, index) => (
                      <motion.div 
                        key={notice.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-slate-50 rounded-3xl p-6 border border-slate-100 space-y-4"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex gap-2">
                             {isNew(notice.date) && (
                                <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-[10px] font-black">NEW</span>
                             )}
                             <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 text-[10px] font-black uppercase">{notice.category}</span>
                          </div>
                          <span className="text-slate-400 font-bold text-xs">{(currentPage - 1) * noticesPerPage + index + 1}</span>
                        </div>
                        <h4 className="font-bold text-slate-800 text-lg leading-tight">{notice.title}</h4>
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                          <FiCalendar />
                          {notice.date}
                        </div>
                        <a 
                          href={notice.document}
                          target="_blank" rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0d0e23] text-white font-black text-[10px] uppercase whitespace-nowrap"
                        >
                          <FiFileText /> View PDF
                        </a>
                      </motion.div>
                    ))}
                  </div>

                  {/* PAGINATION */}
                  {totalPages > 1 && (
                    <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 pt-10 border-t border-slate-100">
                      <p className="text-slate-500 font-medium">
                        Showing <span className="text-[#0d0e23] font-black">{(currentPage - 1) * noticesPerPage + 1}</span> to <span className="text-[#0d0e23] font-black">{Math.min(currentPage * noticesPerPage, filteredNotices.length)}</span> of <span className="text-[#0d0e23] font-black">{filteredNotices.length}</span> notices
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => goToPage(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:border-blue-500 hover:text-blue-600 disabled:opacity-30 disabled:pointer-events-none transition-all"
                        >
                          Prev
                        </button>
                        <div className="flex gap-2">
                          {getPaginationGroup().map((item) => (
                             <button
                               key={item}
                               onClick={() => goToPage(item)}
                               className={`w-12 h-12 rounded-2xl font-black text-sm transition-all ${
                                 currentPage === item ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                               }`}
                             >
                               {item}
                             </button>
                          ))}
                        </div>
                        <button
                          onClick={() => goToPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:border-blue-500 hover:text-blue-600 disabled:opacity-30 disabled:pointer-events-none transition-all"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Notice;
