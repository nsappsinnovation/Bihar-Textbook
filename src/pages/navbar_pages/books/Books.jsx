import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getStoredTextbooksData } from "../../../utils/textbookStorage";
import Sidebar from "../../../components/Sidebar";
import { Menu, X, Filter, Download, Search, BookOpen } from "lucide-react";
import { useResolvedUrl } from "../../../utils/fileStorage";

const Books = () => {
  const { classId } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile state
  const [searchQuery, setSearchQuery] = useState(""); // Search state
  const [textbookData, setTextbookData] = useState(() => getStoredTextbooksData());

  useEffect(() => {
    // Close sidebar on route change (mobile)
    setIsSidebarOpen(false);
    // Reset search on class change
    setSearchQuery("");
  }, [classId]);

  useEffect(() => {
    const handleStorageUpdate = () => {
      setTextbookData(getStoredTextbooksData());
    };
    window.addEventListener("textbooks_updated", handleStorageUpdate);
    return () => window.removeEventListener("textbooks_updated", handleStorageUpdate);
  }, []);

  // Find the class data
  const classData = textbookData?.classes?.find((cls) => cls.id === Number(classId));

  // Placeholder image URL
  const PLACEHOLDER_IMG = "/images/placeholders/no-cover.png";

  if (!classData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xl text-gray-400 font-medium">Loading Class Data...</p>
      </div>
    );
  }

  // Get unique subjects for filter (exclude Drafts / localOnly unless published)
  const allBooks = classData.books.filter(b => b.status ? b.status === "Published" : !b.localOnly);

  const filteredBooks = allBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (book.subject && book.subject.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div className="flex h-[calc(100vh-6rem)] overflow-hidden bg-white font-sans">

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
          fixed top-0 bottom-0 left-0 w-64 z-20 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:sticky md:top-0 md:h-[calc(100vh-6rem)] md:flex md:flex-col
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar classes={textbookData.classes} currentClassId={classId} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full min-w-0 bg-slate-50/50 h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hide" data-lenis-prevent="true">

        {/* Mobile Header */}
        <div className="md:hidden sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(true)} className="text-slate-600">
              <Menu size={24} />
            </button>
            <span className="font-bold text-slate-800">Class {classId}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-4 pb-16">

          {/* --- Hero Section --- */}
          <div className="mb-5 flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Left Content (Text) */}
            <div className="flex-1 flex flex-col gap-1 text-center lg:text-left mt-0">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-slate-900 leading-[1.1] mb-1 tracking-tight">
                {classData.name} <span className="text-blue-600">Textbooks</span>
              </h1>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-xl">
                Access the complete collection of Bihar Board textbooks for {classData.name}. Select a book to read online.
              </p>
            </div>

            {/* Right Content (Search Bar) */}
            <div className="w-full lg:w-64 shrink-0 flex justify-center lg:justify-end">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                  <Search size={15} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-full text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                />
              </div>
            </div>

          </div>

          {/* --- Books Grid --- */}
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} placeholder={PLACEHOLDER_IMG} classId={classId} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
              <BookOpen className="w-12 h-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-700">No books found</h3>
              <p className="text-slate-400 text-sm">Content for this class is coming soon.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// --- Sub-Component: Book Card (Compact Textbook Style) ---
const BookCard = ({ book, placeholder, classId }) => {
  const resolvedImage = useResolvedUrl(book.image);

  const authorName = book.author || "Bihar Board";
  const rawDescription =
    book.description ||
    `Official Bihar Board Class ${classId} textbook for '${book.title}'.`;
  const descriptionText = rawDescription.replace(/[\s\.]*Complete digital reading material\s*&\s*chapters\.?/gi, "");

  return (
    <div className="bg-white rounded-2xl border border-blue-200 p-3 sm:p-4 shadow-[0_2px_14px_rgba(37,99,235,0.06)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.15)] hover:border-blue-300 transition-all duration-300 grid grid-cols-2 gap-3.5 sm:gap-4 group">
      {/* Book Cover Image (Left 50%) */}
      <div className="relative w-full h-full rounded-xl overflow-hidden shadow-sm border border-blue-100 bg-blue-50/40 min-h-[160px] sm:min-h-[200px]">
        <img
          src={resolvedImage || placeholder}
          alt={book.title}
          onError={(e) => { e.target.src = placeholder; }}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Book Metadata, Description & Button (Right 50%) */}
      <div className="flex flex-col justify-between min-w-0 py-0.5">
        <div className="flex flex-col flex-1">
          {/* Book Title */}
          <h3 className="text-sm sm:text-xl font-bold text-slate-800 leading-snug line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors font-display">
            {book.title}
          </h3>

          {/* Author / Publisher */}
          <p className="text-xs sm:text-sm font-semibold text-slate-400 mb-1.5">
            {authorName}
          </p>

          {/* Description / Summary */}
          <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed line-clamp-4 sm:line-clamp-5">
            {descriptionText}
          </p>
        </div>

        {/* Read Now Button (Full width of the right 50% column) */}
        <div className="mt-3">
          <Link
            to={`/class/${classId}/read/${book.subject || "General"}`}
            className="w-full flex items-center justify-center gap-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold py-2 px-4 rounded-xl shadow-sm shadow-blue-500/20 transition-all text-xs sm:text-sm"
          >
            <BookOpen className="w-4 h-4 text-white shrink-0" />
            <span>Read Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Books;


