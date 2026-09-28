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
import { CLASSES, findBook } from "../../../services/bookService";
import { useTranslation } from "react-i18next";
import { useBookTranslation } from "../../../utils/useBookTranslation";

const BookReader = () => {
    const { classId, bookSubject } = useParams();
    const { t, i18n } = useTranslation();
    const { translateBookTitle, translateClassName } = useBookTranslation();
    const [openSection, setOpenSection] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Book lookup result, tagged with the book it belongs to; anything else counts as loading
    const bookKey = `${classId}/${bookSubject}`;
    const [result, setResult] = useState({ key: null, status: "loading", book: null });
    const status = result.key === bookKey ? result.status : "loading"; // "loading" | "ready" | "notFound" | "error"
    const book = result.key === bookKey ? result.book : null;
    const chapters = book?.chapters || [];
    const [searchQuery, setSearchQuery] = useState("");


    const toggleSection = (index) => {
        setOpenSection(openSection === index ? null : index);
    };

    const filteredChapters = chapters.filter(c => 
        (c.title && c.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (c.hindiTitle && c.hindiTitle.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const bookTitle = book?.title || bookSubject || "";

    useEffect(() => {
        setIsSidebarOpen(false);
    }, [classId, bookSubject]);

    // The book and its chapters come only from the API (Admin → Books)
    useEffect(() => {
        let active = true;
        const key = `${classId}/${bookSubject}`;
        findBook(classId, bookSubject)
            .then((bookFromApi) => active && setResult({ key, status: bookFromApi ? "ready" : "notFound", book: bookFromApi }))
            .catch(() => active && setResult({ key, status: "error", book: null }));
        return () => {
            active = false;
        };
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
                <Sidebar classes={CLASSES} currentClassId={classId} />
            </aside>

            {/* Main Content */}
            <main className="flex-1 w-full min-w-0 bg-white">
                {/* Mobile Header */}
                <div className="md:hidden sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setIsSidebarOpen(true)} className="text-slate-600">
                            <Menu size={24} />
                        </button>
                        <span className="font-bold text-slate-800">{translateClassName(`Class ${classId}`)} / {translateBookTitle(bookTitle, bookSubject)}</span>
                    </div>
                </div>

                <div className="py-8 px-4 sm:px-8 lg:px-10">
                    <div className="max-w-5xl mx-auto">

                        {/* --- Back Arrow + Book Title on Left --- */}
                        <div className="mb-8 flex items-center gap-3">
                            <Link
                                to={`/books/${classId}`}
                                className="w-8 h-8 rounded-[10px] bg-[#F8FAFC] hover:bg-blue-50 text-[#1e293b] flex items-center justify-center transition-all border border-slate-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] shrink-0"
                                title={`Back to ${translateClassName(`Class ${classId}`)} Books`}
                            >
                                <FaChevronLeft size={12} className="text-blue-600" />
                            </Link>
                            <h1 className="text-xl sm:text-[22px] font-black text-[#0f172a] tracking-tight uppercase mt-0.5">
                                {translateBookTitle(bookTitle, bookSubject)}
                            </h1>
                        </div>

                        {/* --- Full-Width Table of Contents --- */}
                        <div className="w-full space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-5 bg-[#2563eb] rounded-full"></span>
                                    <h2 className="text-lg sm:text-[20px] font-black text-[#0f172a] tracking-tight">{t("booksPage.reader.tableOfContents", "Table of Contents")}</h2>
                                </div>
                                <div className="relative w-full sm:w-64">
                                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                        <Search size={14} className="text-slate-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder={t("booksPage.reader.searchChapters", "Search chapters...")}
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
                                                            {i18n.language === 'hi' ? (chapter.hindiTitle || chapter.title) : chapter.title}
                                                        </h3>
                                                    </div>
                                                </div>
                                                <div className="inline-flex items-center gap-1.5 bg-[#eff6ff] text-[#2563eb] text-[10px] font-black px-4 py-2 rounded-full transition-colors shrink-0 group-hover:bg-[#2563eb] group-hover:text-white">
                                                    <span>{t("booksPage.reader.readNow", "READ NOW")}</span>
                                                    <FaChevronRight size={8} />
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        status === "loading" ? (
                                            <div className="p-4 space-y-3" aria-hidden>
                                                {[0, 1, 2, 3].map((i) => <div key={i} className="h-12 rounded-xl bg-slate-100 animate-pulse" />)}
                                            </div>
                                        ) : (
                                            <div className="text-center py-12 text-slate-500 font-medium text-sm">
                                                {status === "notFound"
                                                    ? t("booksPage.reader.bookNotFound", "This book is not available.")
                                                    : status === "error"
                                                        ? t("booksPage.reader.loadError", "Could not load this book. Please try again later.")
                                                        : searchQuery
                                                            ? <>{t("booksPage.reader.noChaptersFound", "No chapters found matching")} "{searchQuery}"</>
                                                            : t("booksPage.reader.noChaptersYet", "Chapters for this book have not been uploaded yet.")}
                                            </div>
                                        )
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

