import { useState } from "react";
import {
  FiArrowLeft,
  FiDownload,
  FiChevronDown,
  FiChevronUp,
  FiMenu,
  FiX,
} from "react-icons/fi";

const BookReader = ({ book, classData, onBack }) => {
  const [expandedChapters, setExpandedChapters] = useState({});
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Sample table of contents structure
  const tableOfContents = {
    chapters: [
      {
        id: 1,
        title: "Chapter 1: Introduction",
        pages: 12,
        sections: [
          { id: "1.1", title: "1.1 What is Learning?" },
          { id: "1.2", title: "1.2 Importance of Education" },
          { id: "1.3", title: "1.3 Learning Methods" },
        ],
      },
      {
        id: 2,
        title: "Chapter 2: Fundamentals",
        pages: 18,
        sections: [
          { id: "2.1", title: "2.1 Basic Concepts" },
          { id: "2.2", title: "2.2 Key Principles" },
          { id: "2.3", title: "2.3 Applications" },
        ],
      },
      {
        id: 3,
        title: "Chapter 3: Advanced Topics",
        pages: 22,
        sections: [
          { id: "3.1", title: "3.1 Deep Learning" },
          { id: "3.2", title: "3.2 Practical Examples" },
          { id: "3.3", title: "3.3 Case Studies" },
        ],
      },
      {
        id: 4,
        title: "Chapter 4: Practice",
        pages: 15,
        sections: [
          { id: "4.1", title: "4.1 Exercises" },
          { id: "4.2", title: "4.2 Solutions" },
        ],
      },
      {
        id: 5,
        title: "Chapter 5: Review",
        pages: 10,
        sections: [
          { id: "5.1", title: "5.1 Summary" },
          { id: "5.2", title: "5.2 Quick Quiz" },
        ],
      },
    ],
  };

  const toggleChapter = (chapterId) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  const handleDownload = () => {
    alert(`Downloading ${book.title}...`);
  };

  const currentChapterInfo = tableOfContents.chapters.find(
    (c) => c.id === selectedChapter,
  );

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* MOBILE TOGGLE */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed bottom-6 right-6 z-50 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg"
      >
        {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* LEFT SIDEBAR - TABLE OF CONTENTS */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 w-full md:w-96 bg-gradient-to-b from-gray-50 to-white border-r-2 border-gray-200 flex flex-col overflow-hidden fixed md:relative h-screen z-40`}
      >
        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-950 text-white p-5 border-b-2 border-blue-950">
          <button
            onClick={onBack}
            className="flex items-center gap-2 hover:gap-3 transition-all text-blue-100 hover:text-white font-semibold mb-3"
          >
            <FiArrowLeft className="text-xl" />
            Back to Books
          </button>
          <h3 className="font-bold text-lg line-clamp-2">{book.title}</h3>
          <p className="text-xs text-blue-100 mt-1">{classData.name}</p>
        </div>

        {/* TABLE OF CONTENTS - SCROLLABLE */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {/* PREFACE */}
          <button className="w-full text-left px-4 py-3 rounded-lg text-sm font-semibold text-gray-700 hover:bg-blue-100 hover:text-blue-800 transition-all border-l-4 border-transparent hover:border-blue-700">
            📄 Preface
          </button>

          {/* CONTENTS */}
          <button className="w-full text-left px-4 py-3 rounded-lg text-sm font-semibold text-gray-700 hover:bg-blue-100 hover:text-blue-800 transition-all border-l-4 border-transparent hover:border-blue-700">
            📋 Contents
          </button>

          {/* DIVIDER */}
          <div className="h-px bg-gradient-to-r from-gray-300 to-transparent my-3" />

          {/* CHAPTERS */}
          {tableOfContents.chapters.map((chapter) => (
            <div key={chapter.id}>
              <button
                onClick={() => {
                  toggleChapter(chapter.id);
                  setSelectedChapter(chapter.id);
                  setCurrentPage(1);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-between border-l-4 ${
                  selectedChapter === chapter.id
                    ? "bg-gradient-to-r from-blue-700 to-blue-800 text-white border-blue-900 shadow-lg"
                    : "text-gray-700 border-transparent hover:bg-blue-100 hover:border-blue-600"
                }`}
              >
                <span className="flex-1 line-clamp-1 text-left">
                  {chapter.title}
                </span>
                <span
                  className={`text-xs ml-2 px-2 py-1 rounded ${
                    selectedChapter === chapter.id
                      ? "bg-white/20 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  p{chapter.pages}
                </span>
                {expandedChapters[chapter.id] ? (
                  <FiChevronUp className="ml-2 flex-shrink-0" />
                ) : (
                  <FiChevronDown className="ml-2 flex-shrink-0" />
                )}
              </button>

              {/* SECTIONS - COLLAPSIBLE */}
              {expandedChapters[chapter.id] && (
                <div className="ml-2 mt-2 space-y-1 border-l-2 border-blue-300 pl-2">
                  {chapter.sections.map((section) => (
                    <button
                      key={section.id}
                      className="w-full text-left px-3 py-2 rounded text-xs font-medium text-gray-600 hover:text-blue-800 hover:bg-blue-100 transition-all border-l-3 border-transparent hover:border-blue-700 line-clamp-1"
                    >
                      {section.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* DOWNLOAD BUTTON */}
        <div className="p-4 border-t-2 border-gray-200 bg-white">
          <button
            onClick={handleDownload}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
          >
            <FiDownload className="text-lg" />
            Download PDF
          </button>
        </div>
      </div>

      {/* RIGHT SIDE - PDF VIEWER */}
      <div className="hidden md:flex flex-1 flex-col bg-gray-900 overflow-hidden">
        {/* TOP BAR */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-950 text-white p-4 flex items-center justify-between shadow-lg">
          <div>
            <h2 className="text-xl font-bold">{book.title}</h2>
            {currentChapterInfo && (
              <p className="text-sm text-blue-100">
                📖 Reading: {currentChapterInfo.title}
              </p>
            )}
          </div>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <FiDownload className="text-lg" />
            Download
          </button>
        </div>

        {/* PDF VIEWER AREA */}
        <div className="flex-1 overflow-auto flex items-center justify-center p-6">
          {selectedChapter ? (
            <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-3xl w-full">
              {/* PAGE CONTENT SIMULATION */}
              <div className="mb-8">
                <h3 className="text-4xl font-bold text-gray-800 mb-4">
                  {currentChapterInfo.title}
                </h3>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-700 to-blue-600 rounded"></div>
              </div>

              {/* SAMPLE CONTENT */}
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-sm text-gray-500">
                  Page {currentPage} of {currentChapterInfo.pages}
                </p>
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-6 rounded-xl border-2 border-blue-300">
                  <p className="font-semibold text-gray-800 mb-3">
                    📚 Chapter Overview
                  </p>
                  <p>
                    This chapter covers important concepts and principles. The
                    content is organized into{" "}
                    {currentChapterInfo.sections.length} sections for better
                    understanding and structured learning.
                  </p>
                </div>

                {/* SECTIONS LIST */}
                <div className="mt-6">
                  <p className="font-semibold text-gray-800 mb-3">
                    📋 Sections in this Chapter:
                  </p>
                  <ul className="space-y-2">
                    {currentChapterInfo.sections.map((section) => (
                      <li key={section.id} clabluee="flex items-start gap-3">
                        <span className="text-green-600 font-bold mt-1">▸</span>
                        <span className="text-gray-700">{section.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* PAGE NAVIGATION */}
              <div className="mt-8 pt-6 border-t-2 border-gray-200 flex items-center justify-between">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-800 font-bold rounded-lg transition-colors"
                >
                  ← Previous
                </button>
                <span className="text-sm font-semibold text-gray-600">
                  Page{" "}
                  <span className="text-blue-600 font-bold">{currentPage}</span>{" "}
                  of{" "}
                  <span className="text-blue-600 font-bold">
                    {currentChapterInfo.pages}
                  </span>
                </span>
                <button
                  onClick={() =>
                    setCurrentPage(
                      Math.min(currentChapterInfo.pages, currentPage + 1),
                    )
                  }
                  disabled={currentPage === currentChapterInfo.pages}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-800 font-bold rounded-lg transition-colors"
                >
                  Next →
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-8xl mb-6">📖</div>
              <h3 className="text-3xl font-bold text-white mb-3">
                Welcome to PDF Reader
              </h3>
              <p className="text-gray-300 text-lg">
                Select a chapter from the sidebar to start reading
              </p>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE - SHOW READER HINT */}
      <div className="md:hidden absolute inset-0 bg-white flex items-center justify-center pointer-events-none">
        <div className="text-center pointer-events-auto">
          <p className="text-lg text-gray-600 mb-4">
            Tap the menu icon below to open the table of contents
          </p>
          <p className="text-sm text-gray-500">
            For best reading experience, use a desktop or tablet
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookReader;
