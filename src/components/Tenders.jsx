import React, { useState } from "react";
import { FiSearch, FiFileText } from "react-icons/fi";

// Tenders data extracted from https://bstbpc.bihar.gov.in/Tenders.aspx
const tendersData = [
  {
    id: 1,
    title: "PreBid Clarification Cum Corrigendum - Adolescent Life Skill Package",
    description: "PreBid Clarification Cum Corrigendum of Printing and Supply of 1 Adolescent Life Skill Package Facilitator Handbook 2 Career Card Part-I II and 3 Financial Literacy Facilitator Manual and Pamphlet Set",
    date: "15/01/2026",
    document: "https://bstbpc.bihar.gov.in/Admin/tender/405tender.pdf",
  },
  {
    id: 2,
    title: "Printing and Supply - Adolescent Life Skill Package",
    description: "Printing and Supply of 1 Adolescent Life Skill Package Facilitator Handbook 2 Career Card Part-I II and 3 Financial Literacy Facilitator Manual and Pamphlet Set and delivering at all the 38 District Head Quarters of Bihar",
    date: "10/01/2026",
    document: "https://bstbpc.bihar.gov.in/Admin/tender/403tender.pdf",
  },
  {
    id: 3,
    title: "Corrigendum 02 - Bilingual Text books for Class IX to XII",
    description: "Corrigendum 02 BSTBPC / E-Tender/Bilingual Text books for Class for Class IX to XII for School Library/742 DT 04/07/2025",
    date: "20/12/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/tender/402tender.pdf",
  },
  {
    id: 4,
    title: "Corrigendum 03 - SS Text books for Class-I to VIII",
    description: "Corrigendum 03 BSTBPC/E-Tender/SS Text books for Class-I to VIIIAY 2026-27/ 719 dt 01/07/2025",
    date: "15/12/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/tender/401tender.pdf",
  },
  {
    id: 5,
    title: "Corrigendum 01 - Bilingual Text books for Class IX to XII",
    description: "Corrigendum 01 BSTBPC / E-Tender/ Bilingual Text books for Class IX to XII for School Library /742 dt 04/07/2025",
    date: "10/12/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/tender/400tender.pdf",
  },
  {
    id: 6,
    title: "PreBid Clarification - Bilingual Text books",
    description: "PreBid Clarification BSTBPC / E-Tender/ Bilingual Text books for Class IX to XII for School Library /742 dt 04/07/2025",
    date: "05/12/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/tender/399tender.pdf",
  },
  {
    id: 7,
    title: "Corrigendum 02 - SSA Textbook Class I to VIII",
    description: "Corrigendum 02 BSTBPC/E-Tender/SSA Textbook Class I to VIII/AY 2026-27/719 dated 01-07-2025",
    date: "01/12/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/tender/398tender.pdf",
  },
  {
    id: 8,
    title: "PreBid Clarification Cum Corrigendum 1 - SSA Textbook",
    description: "PreBid Clarification Cum Corrigendum 1- BSTBPC/E-Tender/SSA Textbook Class I to VIII/AY 2026-27/719 dated 01-07-2025",
    date: "25/11/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/tender/396tender.pdf",
  },
  {
    id: 9,
    title: "Prebid clarification - Training Module for Police Department",
    description: "Prebid clarification cum corrigendum Printing of Training Module for Police Department 2025 and delivering at the place located by the Police Department Bihar",
    date: "20/11/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/tender/395tender.pdf",
  },
  {
    id: 10,
    title: "Pre-bid Clarification - Chahak-2025",
    description: "Pre-bid Clarification BSTBPC / E-Tender/ Chahak -2025- 710 dt 27/06/2025",
    date: "15/11/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/tender/394tender.pdf",
  },
  {
    id: 11,
    title: "Printing of Training Module for Police Department 2025",
    description: "Printing of Training Module for Police Department 2025 and delivering at the place located by the Police Department Bihar",
    date: "10/11/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/tender/393tender.pdf",
  },
  {
    id: 12,
    title: "Printing & Supply of Bilingual Text Books",
    description: "Printing Supply of Bilingual Text Books for Class IX to XII for School Library",
    date: "05/11/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/tender/392tender.pdf",
  },
  {
    id: 13,
    title: "E-Tender - SS Text books for Class-I to VIII",
    description: "BSTBPC/E-Tender/SS Text books for Class-I to VIIIAY 2026-27/ 719 dt 01/07/2025",
    date: "01/11/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/tender/391tender.pdf",
  },
  {
    id: 14,
    title: "Corrigendum-4 - Printing for Police Department",
    description: "Corrigendum- 4 - BSTBPC /E-Tender/Printing for Various Items of Police Department /2025/620 dated 05062025",
    date: "25/10/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/tender/390tender.pdf",
  },
  {
    id: 15,
    title: "Printing of School Workbook Chahak for class-I",
    description: "Printing of School Workbook Chahak for class-I Session 2025-26 and delivering at all the 38 District Head Quarters within State of Bihar",
    date: "20/10/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/tender/389tender.pdf",
  },
  {
    id: 16,
    title: "Corrigendum-3 - Printing for Police Department",
    description: "Corrigendum- 3 - BSTBPC /E-Tender/Printing for Various Items of Police Department /2025/620 dated 05062025",
    date: "15/10/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/tender/388tender.pdf",
  },
  {
    id: 17,
    title: "Corrigendum-2 - Printing for Police Department",
    description: "Corrigendum- 2 - BSTBPC /E-Tender/Printing for Various Items of Police Department /2025/620 dated 05062025",
    date: "10/10/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/tender/387tender.pdf",
  },
  {
    id: 18,
    title: "PRE BID CLARIFICATION - Police Department Items",
    description: "BSTBPC /E-Tender/Printing for Various Items of Police Department /2025/620 dated 05062025 PRE BID CLARIFICATION-CUM-CORRIGENDUM dated 19/06/2025",
    date: "05/10/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/tender/386tender.pdf",
  },
  {
    id: 19,
    title: "Printing with paper - Police Department Items",
    description: "Printing with paper and Supply of Various Items of Police Department at Central Cloth Godown in Patna Bihar or at the place located by the police department",
    date: "01/10/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/tender/385tender.pdf",
  },
  {
    id: 20,
    title: "Pre bid clarification - Chahak-2025-26",
    description: "Pre bid clarification of BSTBPC/E-Tender/Chahak-2025-26/508 dated 26-04-2025",
    date: "25/09/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/tender/383tender.pdf",
  },
  {
    id: 21,
    title: "Printing of School Workbook Chahak for Class-I",
    description: "Printing of School Workbook Chahak for Class-I Session 2025-26 and delivering at all the 38 District Head Quarters of Bihar",
    date: "20/09/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/tender/382tender.pdf",
  },
  {
    id: 22,
    title: "Printing of Transfer Certificate 2025",
    description: "Printing of Transfer Certificate 2025 and delivering at all the 38 District Head Quarters within the State of Bihar",
    date: "15/09/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/tender/381tender.pdf",
  },
  {
    id: 23,
    title: "Printing & Supply of Certificate for Government Schools",
    description: "Printing Supply of Certificate for Government Schools of Bihar",
    date: "10/09/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/tender/380tender.pdf",
  },
  {
    id: 24,
    title: "Corrigendum 5 - SSA Textbooks Class-I to VIII",
    description: "Corrigendum 5 BSTBPC/E-Tender/SSA Textbooks Class-I to VIII/2025-26/3033 dt 28-08-2024",
    date: "05/09/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/tender/379tender.pdf",
  },
  {
    id: 25,
    title: "Corrigendum 4 - SSA Textbooks Class-I to VIII",
    description: "Corrigendum 4 BSTBPC/E-Tender/SSA Textbooks Class-I to VIII/2025-26/3033 dt 28-08-2024",
    date: "01/09/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/tender/378tender.pdf",
  },
];

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
