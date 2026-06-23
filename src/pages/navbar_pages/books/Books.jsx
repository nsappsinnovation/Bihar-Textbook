import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import data from "./Book.json";
import Sidebar from "../../../components/Sidebar";
import { Menu, X, Filter, Download } from "lucide-react";

const Books = () => {
  const { classId } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile state
  const [activeSubject, setActiveSubject] = useState("All"); // Subject filter state

  // Find the class data
  const classData = data.classes.find((cls) => cls.id === Number(classId));

  // Placeholder image URL
  const PLACEHOLDER_IMG = "/images/placeholders/no-cover.png";

  useEffect(() => {
    // Close sidebar on route change (mobile)
    setIsSidebarOpen(false);
    // Reset filter on class change
    setActiveSubject("All");
  }, [classId]);

  if (!classData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xl text-gray-400 font-medium">Loading Class Data...</p>
      </div>
    );
  }

  // Get unique subjects for filter
  const allBooks = classData.books.filter(b => !b.localOnly);
  const subjects = ["All", ...new Set(allBooks.map(b => b.title))];

  const filteredBooks = activeSubject === "All"
    ? allBooks
    : allBooks.filter(book => book.title === activeSubject);

  return (
    <div className="flex min-h-screen bg-white font-sans">

      {/* Mobile Sidebar Toggle Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed top-0 bottom-0 left-0 w-64 bg-white z-20 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:block
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar classes={data.classes} currentClassId={classId} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full min-w-0 bg-slate-50/50">

        {/* Mobile Header */}
        <div className="md:hidden sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(true)} className="text-slate-600">
              <Menu size={24} />
            </button>
            <span className="font-bold text-slate-800">Class {classId}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">

          {/* --- Header Section (Refined for new layout) --- */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-2">
              <span className="h-px w-8 bg-blue-600"></span>
              <span className="text-blue-600 font-bold tracking-wider uppercase text-xs">
                Digital Library
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              {classData.name} Textbooks
            </h2>
            <p className="max-w-3xl text-slate-500 text-lg leading-relaxed">
              Access the complete collection of Bihar Board textbooks for {classData.name}. Select a book to read online or download.
            </p>
          </div>

          {/* --- Subject Filter Chips --- */}
          <div className="mb-10 flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex items-center gap-2 text-slate-400 mr-2">
              <Filter size={16} />
              <span className="text-xs font-bold uppercase tracking-wide">Filter:</span>
            </div>
            <button
              onClick={() => setActiveSubject("All")}
              className={`
                    whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-bold transition-all
                    ${activeSubject === "All"
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400"}
                  `}
            >
              All Subjects
            </button>
            {subjects.filter(s => s !== "All").map(subj => (
              <button
                key={subj}
                onClick={() => setActiveSubject(subj)}
                className={`
                     whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-bold transition-all
                     ${activeSubject === subj
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400"}
                   `}
              >
                {subj}
              </button>
            ))}
          </div>

          {/* --- Books Grid --- */}
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} placeholder={PLACEHOLDER_IMG} classId={classId} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
              <div className="text-5xl mb-4 grayscale opacity-50">📚</div>
              <h3 className="text-lg font-bold text-slate-700">No books found</h3>
              <p className="text-slate-400 text-sm">Content for this class is coming soon.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// --- Sub-Component: Book Card (Preserved & Tweaked) ---
const BookCard = ({ book, placeholder, classId }) => {
  const [imgSrc, setImgSrc] = useState(book.image);

  return (
    <div className="group relative flex flex-col bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out border border-slate-100 overflow-hidden hover:-translate-y-1 aspect-[3/4.2]">

      {/* Subject Badge */}
      {book.subject && (
        <div className="absolute top-2 left-2 z-10">
          <span className="px-2 py-0.5 text-[9px] font-bold tracking-wide text-blue-700 bg-white/95 backdrop-blur-sm rounded border border-blue-100 shadow-sm">
            {book.subject.toUpperCase()}
          </span>
        </div>
      )}

      {/* Image Container (75%) */}
      <div className="relative h-[75%] w-full overflow-hidden bg-slate-50">
        <img
          src={imgSrc}
          alt={book.title}
          onError={() => setImgSrc(placeholder)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Overlay Action */}
        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out flex items-center justify-center backdrop-blur-[1px]">
          <Link
            to={`/class/${classId}/read/${book.subject || "General"}`}
            className="bg-white text-slate-900 text-[13px] font-bold py-2.5 px-7 rounded-full shadow-2xl transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-soft-spring hover:bg-blue-600 hover:text-white"
          >
            Read Book
          </Link>
        </div>
      </div>

      {/* Title & Info (25%) */}
      <div className="h-[25%] p-4 bg-white flex flex-col justify-center">
        <h3 className="text-sm font-bold text-slate-800 leading-tight line-clamp-1 mb-1 group-hover:text-blue-600 transition-colors">
          {book.title}
        </h3>
        <p className="text-[10px] text-slate-400 font-medium">Bihar Board • Class {classId}</p>
      </div>
    </div>
  );
};

export default Books;
