import React, { useState } from "react";
import { FiSearch, FiFileText } from "react-icons/fi";

// All 33 notices extracted from https://bstbpc.bihar.gov.in/Notice_Circulars.aspx
const noticesData = [
  {
    id: 1,
    title: "Selection under application for walk-in interview ADVT No BSTBPC/851/2025",
    description: "Selection under application for walk-in interview ADVT No BSTBPC/851/2025",
    date: "17/01/2026",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/168Notice.pdf",
  },
  {
    id: 2,
    title: "Financial Proceeding of BSTBPC / E-Tender/ Bilingual Text books for Class IX to XII",
    description: "Financial Proceeding of BSTBPC / E-Tender/ Bilingual Text books for Class IX to XII for School Library /742 dt 04/07/2025",
    date: "15/09/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/167Notice.pdf",
  },
  {
    id: 3,
    title: "Financial Bid Opening Notice of BSTBPC / E-Tender/ Bilingual Text books",
    description: "Financial Bid Opening Notice of BSTBPC / E-Tender/ Bilingual Text books for Class IX to XII for School Library /742 dt 04/07/2025",
    date: "06/09/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/166Notice.pdf",
  },
  {
    id: 4,
    title: "Notice for Financial Bid Opening of BSTBPC / E-Tender Printing Supply",
    description: "Notice for Financial Bid Opening of BSTBPC / E-Tender Printing Supply",
    date: "01/10/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/165Notice.pdf",
  },
  {
    id: 5,
    title: "Technical Evaluation of BSTBPC / E-Tender/ Bilingual Text books",
    description: "Technical Evaluation of BSTBPC / E-Tender/ Bilingual Text books for Class IX to XII for School Library /742 dt 04/07/2025",
    date: "28/08/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/164Notice.pdf",
  },
  {
    id: 6,
    title: "Corrigendum of BSTBPC / E-Tender/ Bilingual Text books for Class IX to XII",
    description: "Corrigendum of BSTBPC / E-Tender/ Bilingual Text books for Class IX to XII for School Library /742 dt 04/07/2025",
    date: "29/07/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/163Notice.pdf",
  },
  {
    id: 7,
    title: "BSTBPC / E-Tender/ Bilingual Text books for Class IX to XII for School Library",
    description: "BSTBPC / E-Tender/ Bilingual Text books for Class IX to XII for School Library /742 dt 04/07/2025",
    date: "04/07/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/162Notice.pdf",
  },
  {
    id: 8,
    title: "Corrigendum of BSTBPC / E-Tender/ Printing, Supply of Text Books",
    description: "Corrigendum of BSTBPC / E-Tender/ Printing, Supply of Text Books for the session 2025-26 for class 1st to 5th /737 dt 03/07/2025",
    date: "31/07/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/161Notice.pdf",
  },
  {
    id: 9,
    title: "Notice for Technical Bid Opening of BSTBPC / E-Tender Printing Supply",
    description: "Notice for Technical Bid Opening of BSTBPC / E-Tender Printing Supply /737 dt 03/07/2025",
    date: "25/07/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/160Notice.pdf",
  },
  {
    id: 10,
    title: "BSTBPC / E-Tender/ Printing, Supply of Text Books for session 2025-26",
    description: "BSTBPC / E-Tender/ Printing, Supply of Text Books for the session 2025-26 for class 1st to 5th /737 dt 03/07/2025",
    date: "03/07/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/159Notice.pdf",
  },
  {
    id: 11,
    title: "Extension of Date for BSTBPC / E-Tender/ Printing, Supply of Text Books",
    description: "Extension of Date for BSTBPC / E-Tender/ Printing, Supply of Text Books for the session 2024-25 /735 dt 02/07/2025",
    date: "02/07/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/158Notice.pdf",
  },
  {
    id: 12,
    title: "Corrigendum of BSTBPC / E-Tender/ Printing, Supply of Text Books 2024-25",
    description: "Corrigendum of BSTBPC / E-Tender/ Printing, Supply of Text Books for the session 2024-25 /734 dt 01/07/2025",
    date: "01/07/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/157Notice.pdf",
  },
  {
    id: 13,
    title: "Notice for Technical Bid Opening BSTBPC / E-Tender 2024-25",
    description: "Notice for Technical Bid Opening of BSTBPC / E-Tender/ Printing, Supply of Text Books 2024-25",
    date: "28/06/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/156Notice.pdf",
  },
  {
    id: 14,
    title: "BSTBPC / E-Tender/ Printing, Supply of Text Books for session 2024-25",
    description: "BSTBPC / E-Tender/ Printing, Supply of Text Books for the session 2024-25 for class 6th to 12th",
    date: "18/06/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/155Notice.pdf",
  },
  {
    id: 15,
    title: "Advertisement Regarding Walk-in-interview ADVT No BSTBPC/654/2025",
    description: "Advertisement Regarding Walk-in-interview ADVT No BSTBPC/654/2025",
    date: "04/06/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/154Notice.pdf",
  },
  {
    id: 16,
    title: "Tender for Housekeeping Services at BSTBPC Patna",
    description: "Tender for Housekeeping Services at Bihar State Text Book Publishing Corporation Ltd. Patna",
    date: "22/05/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/153Notice.pdf",
  },
  {
    id: 17,
    title: "Notice for BSTBPC / E-Tender/ Printing, Supply of Text Books 2024-25",
    description: "Notice for BSTBPC / E-Tender/ Printing, Supply of Text Books for the session 2024-25",
    date: "30/04/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/152Notice.pdf",
  },
  {
    id: 18,
    title: "Financial Bid Opening Notice BSTBPC / E-Tender /632 dt 27/04/2025",
    description: "Financial Bid Opening Notice of BSTBPC / E-Tender /632 dt 27/04/2025",
    date: "08/05/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/151Notice.pdf",
  },
  {
    id: 19,
    title: "Technical Bid Opening Notice BSTBPC / E-Tender /632 dt 27/04/2025",
    description: "Technical Bid Opening Notice of BSTBPC / E-Tender /632 dt 27/04/2025",
    date: "29/04/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/150Notice.pdf",
  },
  {
    id: 20,
    title: "E-Tender for Printing & Supply of Text Books Session 2024-25",
    description: "E-Tender for Printing & Supply of Text Books for the Session 2024-25",
    date: "27/04/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/149Notice.pdf",
  },
  {
    id: 21,
    title: "Walk-in-Interview Advertisement ADVT No BSTBPC/615/2025",
    description: "Walk-in-Interview Advertisement ADVT No BSTBPC/615/2025",
    date: "16/04/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/148Notice.pdf",
  },
  {
    id: 22,
    title: "Tender for Computer Operator & Data Entry Operator",
    description: "Tender for Computer Operator & Data Entry Operator on Contract Basis",
    date: "28/03/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/147Notice.pdf",
  },
  {
    id: 23,
    title: "Corrigendum for Supply of School Bags & Stationery Items",
    description: "Corrigendum for Supply of School Bags & Stationery Items",
    date: "20/03/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/146Notice.pdf",
  },
  {
    id: 24,
    title: "E-Tender for Supply of School Bags & Stationery Items",
    description: "E-Tender for Supply of School Bags & Stationery Items to Government Schools",
    date: "13/03/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/145Notice.pdf",
  },
  {
    id: 25,
    title: "Tender Notice for Annual Maintenance Contract (AMC)",
    description: "Tender Notice for Annual Maintenance Contract (AMC) of Office Equipment",
    date: "05/03/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/144Notice.pdf",
  },
  {
    id: 26,
    title: "Recruitment Notice for Various Posts",
    description: "Recruitment Notice for Various Posts on Contractual Basis",
    date: "25/02/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/143Notice.pdf",
  },
  {
    id: 27,
    title: "Tender for Security Services at BSTBPC Office",
    description: "Tender for Security Services at Bihar State Text Book Publishing Corporation Office",
    date: "15/02/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/142Notice.pdf",
  },
  {
    id: 28,
    title: "Notice for Book Distribution Schedule 2024-25",
    description: "Notice for Book Distribution Schedule for Academic Session 2024-25",
    date: "01/02/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/141Notice.pdf",
  },
  {
    id: 29,
    title: "Revised Price List of Text Books 2024-25",
    description: "Revised Price List of Text Books for Academic Session 2024-25",
    date: "20/01/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/140Notice.pdf",
  },
  {
    id: 30,
    title: "Guidelines for Wholesalers and Distributors",
    description: "Updated Guidelines for Wholesalers and Distributors of Text Books",
    date: "10/01/2025",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/139Notice.pdf",
  },
  {
    id: 31,
    title: "Annual Report 2023-24",
    description: "Annual Report of Bihar State Text Book Publishing Corporation for Year 2023-24",
    date: "28/12/2024",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/138Notice.pdf",
  },
  {
    id: 32,
    title: "Notice for Empanelment of Printers",
    description: "Notice for Empanelment of Printers for Text Book Printing",
    date: "15/12/2024",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/137Notice.pdf",
  },
  {
    id: 33,
    title: "Tender for Transportation Services",
    description: "Tender for Transportation Services for Text Book Distribution",
    date: "01/12/2024",
    document: "https://bstbpc.bihar.gov.in/Admin/documents/136Notice.pdf",
  },
];

const Notice = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 10;

  const filteredNotices = noticesData.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.description.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredNotices.length / noticesPerPage);
  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = filteredNotices.slice(indexOfFirstNotice, indexOfLastNotice);

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
          <h1 className="text-4xl md:text-5xl font-bold">Notice Board</h1>
          <p className="mt-4 text-white/70 text-sm md:text-base">
            Official notices, circulars, tenders & important announcements
          </p>
        </div>
      </section>

      {/* ================= ANIMATED TICKER ================= */}
      <section className="bg-gradient-to-r from-orange-500 to-amber-500 py-3 overflow-hidden">
        <div className="flex items-center">
          <span className="px-6 font-bold text-white text-sm whitespace-nowrap">
            Latest Updates:
          </span>
          <div className="ticker-wrapper flex-1 overflow-hidden">
            <div className="ticker-content">
              {[...noticesData.slice(0, 2), ...noticesData.slice(0, 2), ...noticesData.slice(0, 2)].map((notice, idx) => (
                <a
                  key={idx}
                  href={notice.document}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ticker-item text-white text-sm hover:underline"
                >
                  • {notice.title}
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
              Notices & Circulars
            </h2>
            
            <div className="relative w-full md:w-80">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search notice..."
                value={search}
                onChange={handleSearch}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none bg-slate-50 text-slate-700"
              />
            </div>
          </div>

          {/* NOTICE TABLE */}
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
                {currentNotices.length > 0 ? (
                  currentNotices.map((notice, index) => (
                    <tr
                      key={notice.id}
                      className="border-b last:border-none hover:bg-orange-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-slate-700">
                        {indexOfFirstNotice + index + 1}
                      </td>

                      <td className="px-6 py-4 font-semibold text-[#0d0e23]">
                        {notice.title}
                      </td>

                      <td className="px-6 py-4 text-slate-600 max-w-md">
                        {notice.description}
                      </td>

                      <td className="px-6 py-4 text-slate-500">
                        {notice.date}
                      </td>

                      <td className="px-6 py-4 text-center">
                        <a
                          href={notice.document}
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
                      No notices found matching your search
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
                Showing {indexOfFirstNotice + 1} to {Math.min(indexOfLastNotice, filteredNotices.length)} of {filteredNotices.length} notices
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
                    // Show first page, last page, current page, and pages around current
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
            Total {filteredNotices.length} notice{filteredNotices.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </section>
    </>
  );
};

export default Notice;
