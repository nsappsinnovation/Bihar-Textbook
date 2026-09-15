import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CLASSES, getBooksByClass } from "../../../services/bookService";
import { fileUrl } from "../../../services/api";
import Sidebar from "../../../components/Sidebar";
import { Menu, X, Filter, Download, Search, BookOpen } from "lucide-react";
import { useBookTranslation } from "../../../utils/useBookTranslation";

const Books = () => {
  const { t } = useTranslation();
  const { translateClassName, translateBookTitle } = useBookTranslation();
  const { classId } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile state
  const [searchQuery, setSearchQuery] = useState(""); // Search state
  const [loaded, setLoaded] = useState({ classId: null, books: [] });

  useEffect(() => {
    // Close sidebar on route change (mobile)
    setIsSidebarOpen(false);
    // Reset search on class change
    setSearchQuery("");
  }, [classId]);

  useEffect(() => {
    getBooksByClass(classId)
      .then((books) => setLoaded({ classId, books }))
      .catch(() => setLoaded({ classId, books: [] }));
  }, [classId]);

  // null while the current class is still loading
  const books = loaded.classId === classId ? loaded.books : null;

  // Find the class data
  const classData = CLASSES.find((cls) => cls.id === Number(classId));

  // Placeholder image URL
  const PLACEHOLDER_IMG = "/images/placeholders/no-cover.webp";

  if (!classData || !books) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xl text-gray-400 font-medium">{t("booksPage.loadingClass", "Loading Class Data...")}</p>
      </div>
    );
  }

  // Get unique subjects for filter (exclude Drafts / localOnly unless published)
  const allBooks = books.filter(b => b.status === "Published");

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
        <Sidebar classes={CLASSES} currentClassId={classId} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full min-w-0 bg-slate-50/50 h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hide" data-lenis-prevent="true">

        {/* Mobile Header */}
        <div className="md:hidden sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(true)} className="text-slate-600">
              <Menu size={24} />
            </button>
            <span className="font-bold text-slate-800">{translateClassName(`Class ${classId}`)}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-4 pb-16">

          {/* --- Hero Section --- */}
          <div className="mb-5 flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Left Content (Text) */}
            <div className="flex-1 flex flex-col gap-1 text-center lg:text-left mt-0">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-slate-900 leading-[1.1] mb-1 tracking-tight">
                {translateClassName(classData.name)} <span className="text-blue-600">{t("booksPage.textbooksHeader", "Textbooks")}</span>
              </h1>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-xl">
                {t("booksPage.subtitleDesc", "Access the complete collection of Bihar Board textbooks for {{className}}. Select a book to read online.", { className: translateClassName(classData.name) })}
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
                  placeholder={t("sidebar.searchPlaceholder", "Search books...")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-full text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                />
              </div>
            </div>

          </div>

          {/* --- Books Grid --- */}
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10 px-2 sm:px-4">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} placeholder={PLACEHOLDER_IMG} classId={classId} translateBookTitle={translateBookTitle} t={t} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
              <BookOpen className="w-12 h-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-700">{t("booksPage.noBooksFound", "No books found")}</h3>
              <p className="text-slate-400 text-sm">{t("booksPage.comingSoon", "Content for this class is coming soon.")}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// --- Sub-Component: Book Card (Compact Textbook Style) ---
const BookCard = ({ book, placeholder, classId, translateBookTitle, t }) => {
  const resolvedImage = fileUrl(book.image);

  // Map subjects to beautiful audiobook covers to replace the plain placeholder
  const getFallbackCover = (subject) => {
    const sub = (subject || "").toLowerCase();
    if (sub.includes("hindi") || sub.includes("sarangi") || sub.includes("kompal") || sub.includes("kislay")) return "https://ciet.ncert.gov.in/storage/app/public/photos/17/ahsr1cc.jpg";
    if (sub.includes("ganit") || sub.includes("math") || sub.includes("hisab")) return "https://ciet.ncert.gov.in/storage/app/public/photos/17/aejm1cc.jpg";
    if (sub.includes("english") || sub.includes("mridang") || sub.includes("radiance") || sub.includes("blossom")) return "https://ciet.ncert.gov.in/storage/app/public/photos/17/Audios/Class%201/mridang.jpg";
    if (sub.includes("science") || sub.includes("paryawaran") || sub.includes("mahauliat") || sub.includes("duniya")) return "https://ciet.ncert.gov.in/storage/app/public/photos/19/Bookcover/chve1cc.jpg";
    if (sub.includes("urdu") || sub.includes("gulshan") || sub.includes("farozan") || sub.includes("misbahul")) return "https://ciet.ncert.gov.in/storage/app/public/photos/19/Bookcover/cesa1cc.jpg";
    if (sub.includes("sanskrit") || sub.includes("amrita")) return "https://ciet.ncert.gov.in/storage/app/public/photos/17/Class%202/bhsr1cc.jpg";
    return "https://ciet.ncert.gov.in/storage/app/public/photos/19/Bookcover/cemm1cc.jpg"; // default fallback
  };

  const finalImage = (!resolvedImage || resolvedImage.includes("bookcover") || resolvedImage.includes("no-cover")) 
    ? getFallbackCover(book.subject) 
    : resolvedImage;

  const displayTitle = translateBookTitle ? translateBookTitle(book.title, book.subject) : book.title;

  return (
    <div className="relative aspect-[3/4] bg-white rounded-r-2xl rounded-l-md overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)] transition-all duration-500 group border-y border-r border-slate-200/60 border-l-[4px] border-l-slate-300 cursor-pointer hover:-translate-y-3 hover:rotate-1">
      {/* 3D Physical Book Spine Effect */}
      <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/40 via-black/10 to-transparent z-10 pointer-events-none mix-blend-multiply" />
      <div className="absolute inset-y-0 left-0 w-[2px] bg-white/70 z-10 pointer-events-none" />
      <div className="absolute inset-y-0 left-6 w-[1px] bg-black/10 z-10 pointer-events-none shadow-sm" />
      
      {/* Lighting Glare on Cover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Book Cover Image */}
      <img loading="lazy" decoding="async"
        src={finalImage}
        alt={displayTitle}
        onError={(e) => { e.target.src = getFallbackCover(book.subject); }}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />

      {/* Premium Cinematic Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center pt-12 z-20">
        
        {/* Title */}
        <h3 className="text-white font-bold text-center text-lg md:text-xl mb-5 translate-y-6 group-hover:translate-y-0 transition-all duration-300 line-clamp-2 drop-shadow-md px-4">
          {displayTitle}
        </h3>
        
        {/* Read Now Button */}
        <Link
          to={`/class/${classId}/read/${book.subject || "General"}`}
          className="flex items-center justify-center gap-2 bg-[#F8FAFC] text-[#2563EB] hover:bg-white hover:shadow-lg font-bold py-2.5 px-6 rounded-full transition-all translate-y-6 group-hover:translate-y-0 duration-300 delay-75 active:scale-95"
        >
          <BookOpen className="w-[18px] h-[18px] shrink-0" />
          <span className="text-[15px]">{t ? t("booksPage.readNow", "Read Now") : "Read Now"}</span>
        </Link>
      </div>
    </div>
  );
};

export default Books;


