import React, { useState } from "react";
import { FiSearch, FiFileText } from "react-icons/fi";

import tendersData from "../data/tenders.json";

const Tenders = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tendersPerPage = 10;

  const filteredTenders = tendersData.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredTenders.length / tendersPerPage);
  const indexOfLastTender = currentPage * tendersPerPage;
  const indexOfFirstTender = indexOfLastTender - tendersPerPage;
  const currentTenders = filteredTenders.slice(indexOfFirstTender, indexOfLastTender);

  // Reset to page 1 when search changes
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-[#0d0e23] py-20 text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1b4b] via-[#0d0e23] to-[#050610]" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
          backgroundSize: '30px 30px'
        }} />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold">Tenders</h1>
          <p className="mt-4 text-white/70 text-sm md:text-base">
            Current tenders, e-tenders & procurement opportunities
          </p>
        </div>
      </section>

      {/* ================= ANIMATED TICKER ================= */}
      <section className="bg-gradient-to-r from-orange-500 to-amber-500 py-3 overflow-hidden">
        <div className="flex items-center">
          <span className="px-6 font-bold text-white text-sm whitespace-nowrap">
            Latest Tenders:
          </span>
          <div className="ticker-wrapper flex-1 overflow-hidden">
            <div className="ticker-content">
              {[...tendersData.slice(0, 2), ...tendersData.slice(0, 2), ...tendersData.slice(0, 2)].map((tender, idx) => (
                <a
                  key={idx}
                  href={tender.document}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ticker-item text-white text-sm hover:underline"
                >
                  • {tender.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .ticker-wrapper {
          position: relative;
          overflow: hidden;
        }
        
        .ticker-content {
          display: flex;
          animation: scroll 40s linear infinite;
          white-space: nowrap;
        }
        
        .ticker-item {
          display: inline-block;
          padding: 0 2rem;
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        
        .ticker-content:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ================= MAIN CONTENT ================= */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* SEARCH BAR */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <h2 className="text-3xl font-bold text-[#0d0e23]">
              Active Tenders
            </h2>
            
            <div className="relative w-full md:w-80">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search tender..."
                value={search}
                onChange={handleSearch}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none bg-slate-50 text-slate-700"
              />
            </div>
          </div>

          {/* TENDERS TABLE */}
          <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-slate-100">
            <table className="min-w-full text-sm">
              <thead className="bg-gradient-to-r from-[#2a2b8d] to-[#3a3bbd] text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">S. No.</th>
                  <th className="px-6 py-4 text-left font-semibold">Title</th>
                  <th className="px-6 py-4 text-left font-semibold">Description</th>
                  <th className="px-6 py-4 text-left font-semibold">Date</th>
                  <th className="px-6 py-4 text-center font-semibold">Document</th>
                </tr>
              </thead>

              <tbody>
                {currentTenders.length > 0 ? (
                  currentTenders.map((tender, index) => (
                    <tr
                      key={tender.id}
                      className="border-b last:border-none hover:bg-orange-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-slate-700">
                        {indexOfFirstTender + index + 1}
                      </td>

                      <td className="px-6 py-4 font-semibold text-[#0d0e23]">
                        {tender.title}
                      </td>

                      <td className="px-6 py-4 text-slate-600 max-w-md">
                        {tender.description}
                      </td>

                      <td className="px-6 py-4 text-slate-500">
                        {tender.date}
                      </td>

                      <td className="px-6 py-4 text-center">
                        <a
                          href={tender.document}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2a2b8d] hover:bg-[#3a3bbd] text-white text-xs font-semibold transition-all shadow-md hover:shadow-lg"
                        >
                          <FiFileText />
                          View PDF
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-12 text-center text-slate-500"
                    >
                      No tenders found matching your search
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Showing {indexOfFirstTender + 1} to {Math.min(indexOfLastTender, filteredTenders.length)} of {filteredTenders.length} tenders
              </p>

              <div className="flex items-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    currentPage === 1
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-white text-[#2a2b8d] border border-slate-200 hover:bg-[#2a2b8d] hover:text-white'
                  }`}
                >
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => goToPage(pageNumber)}
                          className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${
                            currentPage === pageNumber
                              ? 'bg-[#2a2b8d] text-white shadow-md'
                              : 'bg-white text-slate-700 border border-slate-200 hover:bg-orange-50'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (
                      pageNumber === currentPage - 2 ||
                      pageNumber === currentPage + 2
                    ) {
                      return <span key={pageNumber} className="px-2 text-slate-400">...</span>;
                    }
                    return null;
                  })}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    currentPage === totalPages
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-white text-[#2a2b8d] border border-slate-200 hover:bg-[#2a2b8d] hover:text-white'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          <p className="mt-8 text-center text-sm text-slate-500">
            Total {filteredTenders.length} tender{filteredTenders.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </section>
    </>
  );
};

export default Tenders;
