import React, { useState } from "react";
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
    FaFilePdf
} from "react-icons/fa";

const BookReader = () => {
    const { classId, bookSubject } = useParams();
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (index) => {
        setOpenSection(openSection === index ? null : index);
    };

    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch chapters from manifest
    React.useEffect(() => {
        const fetchChapters = async () => {
            try {
                // Sanitize slug to match scraper logic: replace non-alphanumeric with '_'
                const subjectSlug = (bookSubject || "Hindi").toLowerCase().replace(/[^a-z0-9]/g, '_');
                const manifestUrl = `/PDFs/Class_${classId}/${subjectSlug}_manifest.json`;

                const response = await fetch(manifestUrl);
                if (response.ok) {
                    const data = await response.json();
                    // Transform manifest chapters to BookReader format
                    const mappedChapters = data.chapters.map(c => ({
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
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-6xl mx-auto">

                {/* --- Minimal Breadcrumbs --- */}
                <nav className="flex items-center space-x-2 text-[11px] uppercase tracking-wider text-slate-400 mb-10">
                    <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                    <span>/</span>
                    <Link to={`/class/${classId}`} className="hover:text-blue-600 transition-colors">Class {classId}</Link>
                    <span>/</span>
                    <span className="text-slate-600 font-semibold">{bookSubject || "Hindi"}</span>
                </nav>

                {/* --- Simplified Header --- */}
                <div className="mb-14 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8">
                    <div>
                        <p className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-3">
                            Bihar Textbook Digital
                        </p>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                            Class {classId} <span className="font-light text-slate-400">/</span> {bookSubject || "Hindi"}
                        </h1>
                    </div>
                    <Link
                        to={`/class/${classId}`}
                        className="text-xs font-bold text-slate-500 hover:text-blue-600 flex items-center gap-2 transition-colors"
                    >
                        <FaChevronLeft size={10} />
                        BACK TO LIST
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

                    {/* --- Main Content: Minimal Chapter List --- */}
                    <div className="lg:col-span-3">
                        <div className="flex items-center gap-3 mb-8">
                            <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                            <h2 className="text-lg font-bold text-slate-800 tracking-tight">Table of Contents</h2>
                            <span className="text-xs text-slate-400 font-medium ml-2">{chapters.length} Units</span>
                        </div>

                        <div className="border-t border-slate-100">
                            {chapters.map((chapter, index) => (
                                <div key={index} className="border-b border-slate-50">
                                    <button
                                        onClick={() => toggleSection(index)}
                                        className="w-full flex items-center py-5 text-left group transition-all"
                                    >
                                        <div className="w-10 text-slate-300 text-xs font-mono group-hover:text-blue-600 transition-colors">
                                            {String(index + 1).padStart(2, '0')}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-base font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                                                {chapter.hindiTitle}
                                            </h3>
                                            <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">
                                                {chapter.title}
                                            </p>
                                        </div>
                                        <div className={`p-1.5 transition-colors ${openSection === index ? "text-blue-600" : "text-slate-300 group-hover:text-slate-500"}`}>
                                            {openSection === index ? <FaMinus size={10} /> : <FaPlus size={10} />}
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {openSection === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                                className="overflow-hidden bg-slate-50/50"
                                            >
                                                <div className="px-10 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                    <p className="text-xs text-slate-500 italic max-w-sm">
                                                        Access interactive lessons, practice questions, and chapter summaries.
                                                    </p>
                                                    <Link
                                                        to={`/book/${classId}/${bookSubject || "Hindi"}/${chapter.id}/flip`}
                                                        className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-600 text-white text-[11px] font-bold px-5 py-2 rounded transition-all active:scale-95"
                                                    >
                                                        READ NOW
                                                        <FaChevronRight size={8} />
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- Minimal Sidebar --- */}
                    <div className="space-y-10">

                        {/* Minimal App Section */}
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Experience</h4>
                            <div className="group cursor-pointer">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                        <FaDownload size={14} />
                                    </div>
                                    <h5 className="text-sm font-bold text-slate-800">Scan & Go App</h5>
                                </div>
                                <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                                    Read offline with ease. Available for all mobile devices.
                                </p>
                                <button className="text-[10px] font-extrabold text-emerald-600 hover:text-emerald-700 tracking-wider flex items-center gap-1">
                                    DOWNLOAD APP <FaChevronRight size={6} />
                                </button>
                            </div>
                        </div>

                        {/* Minimal Forum Section */}
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Support</h4>
                            <div className="group cursor-pointer">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-colors">
                                        <FaComments size={14} />
                                    </div>
                                    <h5 className="text-sm font-bold text-slate-800">Doubt Corner</h5>
                                </div>
                                <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                                    Ask questions and collaborate with fellow students.
                                </p>
                                <button className="text-[10px] font-extrabold text-rose-600 hover:text-rose-700 tracking-wider flex items-center gap-1">
                                    ASK A QUESTION <FaChevronRight size={6} />
                                </button>
                            </div>
                        </div>

                        {/* Minimal Resources Section */}
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">External</h4>
                            <div className="group cursor-pointer">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <FaBook size={14} />
                                    </div>
                                    <h5 className="text-sm font-bold text-slate-800">NCERT Library</h5>
                                </div>
                                <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                                    Access official NCERT digital textbooks.
                                </p>
                                <button className="text-[10px] font-extrabold text-blue-600 hover:text-blue-700 tracking-wider flex items-center gap-1">
                                    BROWSE NCERT <FaChevronRight size={6} />
                                </button>
                            </div>
                        </div>

                        {/* Quick Download */}
                        <div className="pt-6 border-t border-slate-100 mt-6">
                            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all group">
                                <div className="flex items-center gap-3">
                                    <FaFilePdf className="text-slate-400 group-hover:text-red-500" />
                                    <span className="text-xs font-bold text-slate-700">Full Book PDF</span>
                                </div>
                                <FaDownload size={10} className="text-slate-300 group-hover:text-slate-600" />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookReader;