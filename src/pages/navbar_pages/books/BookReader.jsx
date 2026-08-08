import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaPlus,
    FaMinus,
    FaDownload,
    FaComments,
    FaBook,
    FaChevronLeft,
    FaChevronRight,
    FaFilePdf,
    FaLightbulb
} from "react-icons/fa";
import { Menu, Search } from "lucide-react";
import Sidebar from "../../../components/Sidebar";
import { getStoredTextbooksData } from "../../../utils/textbookStorage";

const BookReader = () => {
    const { classId, bookSubject } = useParams();
    const [openSection, setOpenSection] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const [textbookData, setTextbookData] = useState(() => getStoredTextbooksData());

    useEffect(() => {
        const handleStorageUpdate = () => {
            setTextbookData(getStoredTextbooksData());
        };
        window.addEventListener("textbooks_updated", handleStorageUpdate);
        return () => window.removeEventListener("textbooks_updated", handleStorageUpdate);
    }, []);

    const toggleSection = (index) => {
        setOpenSection(openSection === index ? null : index);
    };

    const filteredChapters = chapters.filter(c => 
        (c.title && c.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (c.hindiTitle && c.hindiTitle.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Get book data for image
    const classData = textbookData.classes?.find((cls) => cls.id === Number(classId));
    const allBooks = classData?.books || [];
    const book = allBooks.find(b => (b.subject || "General") === bookSubject || b.title === bookSubject);
    const bookImage = book?.image || "/images/placeholders/no-cover.webp";
    const bookTitle = book?.title || bookSubject || "Hindi";

    useEffect(() => {
        setIsSidebarOpen(false);
    }, [classId, bookSubject]);

    // Fetch chapters from manifest or local storage
    useEffect(() => {
        const fetchChapters = async () => {
            try {
                // First check if the book has chapters in local storage
                const classDataLocal = textbookData.classes?.find((cls) => cls.id === Number(classId));
                const allBooksLocal = classDataLocal?.books || [];
                const bookLocal = allBooksLocal.find(b => (b.subject || "General") === bookSubject || b.title === bookSubject);

                if (bookLocal && bookLocal.chapters && bookLocal.chapters.length > 0) {
                    setChapters(bookLocal.chapters);
                    setLoading(false);
                    return;
                }

                // Sanitize slug to match scraper logic: replace non-alphanumeric with '_'
                const subjectSlug = (bookSubject || "Hindi").toLowerCase().replace(/[^a-z0-9]/g, '_');
                const manifestUrl = `/PDFs/Class_${classId}/${subjectSlug}_manifest.json`;

                const response = await fetch(manifestUrl);
                if (response.ok) {
                    const manifestData = await response.json();
                    // Transform manifest chapters to BookReader format
                    const mappedChapters = manifestData.chapters.map(c => ({
                        id: c.id,
                        title: c.title,
                        hindiTitle: c.hindiTitle || c.title,
                        type: "chapter"
                    }));
                    setChapters(mappedChapters);
                } else {
                    // Fallback static list only if fetch fails (e.g. for demo)
                    console.warn("Manifest not found, using fallback chapters");
                    setChapters([
                        { id: 1, title: "Chapter 1", hindiTitle: "हँसते-खेलते", type: "chapter" },
                        { id: 2, title: "Chapter 2", hindiTitle: "हमारा गाँव (चित्रपठन)", type: "chapter" },
                    ]);
                }
            } catch (err) {
                console.error("Error fetching chapters:", err);
                // Fallback on error
                setChapters([
                    { id: 1, title: "Chapter 1", hindiTitle: "हँसते-खेलते", type: "chapter" },
                    { id: 2, title: "Chapter 2", hindiTitle: "हमारा गाँव (चित्रपठन)", type: "chapter" },
                    { id: 3, title: "Chapter 3 (Fallback)", hindiTitle: "...", type: "chapter" },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchChapters();
    }, [classId, bookSubject]);

    return (
        <div className="flex min-h-screen bg-slate-50/50 font-sans">
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
                    fixed top-0 bottom-0 left-0 w-64 bg-white z-20 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:block border-r border-slate-200
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <Sidebar classes={textbookData.classes || []} currentClassId={classId} />
            </aside>

            {/* Main Content */}
            <main className="flex-1 w-full min-w-0 bg-white">
                {/* Mobile Header */}
                <div className="md:hidden sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setIsSidebarOpen(true)} className="text-slate-600">
                            <Menu size={24} />
                        </button>
                        <span className="font-bold text-slate-800">Class {classId} / {bookTitle}</span>
                    </div>
                </div>

                <div className="py-8 px-4 sm:px-8 lg:px-10">
                    <div className="max-w-5xl mx-auto">

                        {/* --- Back Arrow + Book Title on Left --- */}
                        <div className="mb-8 flex items-center gap-3">
                            <Link
                                to={`/books/${classId}`}
                                className="w-8 h-8 rounded-[10px] bg-[#F8FAFC] hover:bg-blue-50 text-[#1e293b] flex items-center justify-center transition-all border border-slate-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] shrink-0"
                                title={`Back to Class ${classId} Books`}
                            >
                                <FaChevronLeft size={12} className="text-blue-600" />
                            </Link>
                            <h1 className="text-xl sm:text-[22px] font-black text-[#0f172a] tracking-tight uppercase mt-0.5">
                                {bookTitle}
                            </h1>
                        </div>

                        {/* --- Full-Width Table of Contents --- */}
                        <div className="w-full space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-5 bg-[#2563eb] rounded-full"></span>
                                    <h2 className="text-lg sm:text-[20px] font-black text-[#0f172a] tracking-tight">Table of Contents</h2>
                                </div>
                                <div className="relative w-full sm:w-64">
                                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                        <Search size={14} className="text-slate-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search chapters..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-8 pr-4 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-[0_2px_4px_rgba(0,0,0,0.02)]"
                                    />
                                </div>
                            </div>

                            <div className="border border-slate-200/80 rounded-[16px] overflow-hidden bg-white shadow-sm">
                                <style>{`
                                    .custom-scrollbar::-webkit-scrollbar {
                                        width: 6px;
                                    }
                                    .custom-scrollbar::-webkit-scrollbar-track {
                                        background: transparent;
                                    }
                                    .custom-scrollbar::-webkit-scrollbar-thumb {
                                        background-color: #cbd5e1;
                                        border-radius: 3px;
                                    }
                                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                                        background-color: #94a3b8;
                                    }
                                `}</style>
                                <div className="max-h-[500px] overflow-y-auto custom-scrollbar" data-lenis-prevent>
                                    {filteredChapters.length > 0 ? (
                                        filteredChapters.map((chapter, index) => (
                                            <Link
                                                key={index}
                                                to={`/book/${classId}/${bookSubject || "Hindi"}/${chapter.id}/flip`}
                                                className="w-full flex items-center justify-between py-4 px-4 sm:px-6 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors group"
                                            >
                                                <div className="flex items-center gap-4 sm:gap-6 min-w-0 pr-4">
                                                    <div className="w-8 sm:w-10 text-[#cbd5e1] text-xs sm:text-sm font-black font-mono shrink-0">
                                                        {String(index + 1).padStart(2, '0')}
                                                    </div>
                                                    <div className="min-w-0 flex flex-col justify-center">
                                                        <h3 className="text-sm sm:text-[15px] font-black text-[#1e293b] leading-snug truncate uppercase">
                                                            {chapter.hindiTitle}
                                                        </h3>
                                                        <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest mt-0.5 truncate">
                                                            {chapter.title}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="inline-flex items-center gap-1.5 bg-[#eff6ff] text-[#2563eb] text-[10px] font-black px-4 py-2 rounded-full transition-colors shrink-0 group-hover:bg-[#2563eb] group-hover:text-white">
                                                    <span>READ NOW</span>
                                                    <FaChevronRight size={8} />
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <div className="text-center py-12 text-slate-500 font-medium text-sm">
                                            No chapters found matching "{searchQuery}"
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BookReader;

