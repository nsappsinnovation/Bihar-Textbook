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
import { Menu } from "lucide-react";
import Sidebar from "../components/Sidebar";
import data from "./Book.json";

const BookReader = () => {
    const { classId, bookSubject } = useParams();
    const [openSection, setOpenSection] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSection = (index) => {
        setOpenSection(openSection === index ? null : index);
    };

    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get book data for image
    const classData = data.classes?.find((cls) => cls.id === Number(classId));
    const allBooks = classData?.books || [];
    const book = allBooks.find(b => (b.subject || "General") === bookSubject || b.title === bookSubject);
    const bookImage = book?.image || "/images/placeholders/no-cover.png";
    const bookTitle = book?.title || bookSubject || "Hindi";

    useEffect(() => {
        setIsSidebarOpen(false);
    }, [classId, bookSubject]);

    // Fetch chapters from manifest
    useEffect(() => {
        const fetchChapters = async () => {
            try {
                // Sanitize slug to match scraper logic: replace non-alphanumeric with '_'
                const subjectSlug = (bookSubject || "Hindi").toLowerCase().replace(/[^a-z0-9]/g, '_');
                const manifestUrl = `/PDFs/Class_${classId}/${subjectSlug}_manifest.json`;

                const response = await fetch(manifestUrl);
                if (response.ok) {
                    const manifestData = await response.json();
                    // Transform manifest chapters to BookReader format
                    const mappedChapters = manifestData.chapters.map(c => ({
                        id: c.id,
                        title: c.title, // Use title from scraper
                        hindiTitle: c.title, // Fallback if no hindi title available yet
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
                <Sidebar classes={data.classes || []} currentClassId={classId} />
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

                <div className="py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">

                        {/* --- Minimal Breadcrumbs --- */}
                        <nav className="flex items-center space-x-2 text-[11px] uppercase tracking-wider text-slate-400 mb-10">
                            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                            <span>/</span>
                            <Link to={`/books/${classId}`} className="hover:text-blue-600 transition-colors">Class {classId}</Link>
                            <span>/</span>
                            <span className="text-slate-600 font-semibold">{bookTitle}</span>
                        </nav>

                        {/* --- Simplified Header --- */}
                        <div className="mb-14 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8">
                            <div>
                                <p className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-3">
                                    Bihar Textbook Digital
                                </p>
                                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                                    Class {classId} <span className="font-light text-slate-400">/</span> {bookTitle}
                                </h1>
                            </div>
                            <Link
                                to={`/books/${classId}`}
                                className="text-xs font-bold text-slate-500 hover:text-blue-600 flex items-center gap-2 transition-colors"
                            >
                                <FaChevronLeft size={10} />
                                BACK TO LIST
                            </Link>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-16 border-t border-slate-100 pt-12">

                            {/* --- Left Column: ~65% Table of Contents --- */}
                            <div className="lg:w-[65%] space-y-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="w-[5px] h-[22px] bg-[#2563eb] rounded-[2px]"></span>
                                    <h2 className="text-[20px] font-bold text-[#1e293b] tracking-tight">Table of Contents</h2>
                                    <span className="text-[12px] font-medium text-[#94a3b8] px-2">{chapters.length} Units</span>
                                </div>

                                <div className="border-t border-slate-100">
                                    {chapters.map((chapter, index) => (
                                        <div key={index} className="border-b border-slate-100 last:border-0 relative">
                                            <button
                                                onClick={() => toggleSection(index)}
                                                className="w-full flex items-center py-6 text-left group transition-all hover:bg-slate-50/50"
                                            >
                                                <div className="w-16 text-[#cbd5e1] text-[15px] font-bold font-mono transition-colors">
                                                    {String(index + 1).padStart(2, '0')}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-[16px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                                                        {chapter.hindiTitle}
                                                    </h3>
                                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                                        {chapter.title}
                                                    </p>
                                                </div>
                                                <div className={`w-8 h-8 flex items-center justify-end transition-colors ${openSection === index ? "text-[#94a3b8]" : "text-[#cbd5e1] group-hover:text-[#94a3b8]"}`}>
                                                    {openSection === index ? <FaMinus size={12} strokeWidth={1} /> : <FaPlus size={12} strokeWidth={1} />}
                                                </div>
                                            </button>

                                            <AnimatePresence>
                                                {openSection === index && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="overflow-hidden bg-[#f8fafc] border-t border-slate-100"
                                                    >
                                                        <div className="px-16 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                            <p className="text-[13px] text-slate-500 max-w-lg">
                                                                Access interactive lessons, practice questions, and chapter summaries.
                                                            </p>
                                                            <Link
                                                                to={`/book/${classId}/${bookSubject || "Hindi"}/${chapter.id}/flip`}
                                                                className="inline-flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-blue-700 text-white text-[11px] font-bold px-6 py-2.5 rounded-lg shadow-sm transition-all active:scale-95 whitespace-nowrap"
                                                            >
                                                                READ NOW
                                                                <FaChevronRight size={10} />
                                                            </Link>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* --- Right Column: ~35% Side Stack --- */}
                            <div className="lg:w-[35%] lg:pl-8">
                                <div className="sticky top-[100px] h-[calc(100vh-120px)] overflow-y-auto pb-10 space-y-10 pr-4" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>

                                    {/* EXPERIENCE */}
                                    <div>
                                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3 mb-5">Experience</h4>
                                        <div className="group cursor-pointer">
                                            <div className="flex items-start gap-4 mb-3">
                                                <div className="w-10 h-10 rounded-xl bg-[#f0fdf4] text-[#16a34a] flex items-center justify-center shrink-0 transition-colors">
                                                    <FaDownload size={16} />
                                                </div>
                                                <div>
                                                    <h5 className="text-[15px] font-bold text-slate-800 group-hover:text-[#16a34a] transition-colors mb-1.5">Scan & Go App</h5>
                                                    <p className="text-[12px] text-slate-500 leading-relaxed mb-3">
                                                        Read offline with ease. Available for all mobile devices.
                                                    </p>
                                                    <button className="text-[10px] font-bold text-[#16a34a] tracking-[0.05em] flex items-center gap-1.5 uppercase transition-transform group-hover:translate-x-1">
                                                        DOWNLOAD APP <FaChevronRight size={8} strokeWidth={3} className="ml-0.5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* RESOURCES */}
                                    <div>
                                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3 mb-5">Resources</h4>
                                        <div className="group cursor-pointer">
                                            <div className="flex items-start gap-4 mb-3">
                                                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 transition-colors">
                                                    <FaFilePdf size={16} />
                                                </div>
                                                <div>
                                                    <h5 className="text-[15px] font-bold text-slate-800 group-hover:text-purple-600 transition-colors mb-1.5">Full Book PDF</h5>
                                                    <p className="text-[12px] text-slate-500 leading-relaxed mb-3">
                                                        Download the complete book in high quality format.
                                                    </p>
                                                    <button className="text-[10px] font-bold text-purple-600 tracking-[0.05em] flex items-center gap-1.5 uppercase transition-transform group-hover:translate-x-1">
                                                        DOWNLOAD PDF <FaChevronRight size={8} strokeWidth={3} className="ml-0.5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* EXTERNAL */}
                                    <div>
                                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3 mb-5">External</h4>
                                        <div className="group cursor-pointer">
                                            <div className="flex items-start gap-4 mb-3">
                                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 transition-colors">
                                                    <FaBook size={16} />
                                                </div>
                                                <div>
                                                    <h5 className="text-[15px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-1.5">NCERT Library</h5>
                                                    <p className="text-[12px] text-slate-500 leading-relaxed mb-3">
                                                        Access official NCERT digital textbooks.
                                                    </p>
                                                    <button className="text-[10px] font-bold text-blue-600 tracking-[0.05em] flex items-center gap-1.5 uppercase transition-transform group-hover:translate-x-1">
                                                        BROWSE NCERT <FaChevronRight size={8} strokeWidth={3} className="ml-0.5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

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