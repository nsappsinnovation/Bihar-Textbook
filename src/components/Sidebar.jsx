import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ChevronDown, ChevronRight, Book, GraduationCap, Clock, ChevronLeft } from "lucide-react";

const Sidebar = ({ classes, currentClassId }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedClasses, setExpandedClasses] = useState([Number(currentClassId)]);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentClassId && !expandedClasses.includes(Number(currentClassId))) {
            setExpandedClasses(prev => [...prev, Number(currentClassId)]);
        }
    }, [currentClassId]);

    // Auto-scroll active class into view
    useEffect(() => {
        if (currentClassId) {
            const timer = setTimeout(() => {
                const activeEl = document.querySelector(".sidebar-active-class");
                const container = document.querySelector(".sidebar-scroll-container");
                if (activeEl && container) {
                    const containerRect = container.getBoundingClientRect();
                    const activeRect = activeEl.getBoundingClientRect();
                    const scrollOffset = activeRect.top - containerRect.top - (containerRect.height / 2) + (activeRect.height / 2);
                    container.scrollBy({ top: scrollOffset, behavior: "smooth" });
                }
            }, 150);
            return () => clearTimeout(timer);
        }
    }, [currentClassId]);

    // Handle toggle
    const toggleClass = (id) => {
        setExpandedClasses(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    // Advanced filtering: match class name OR any book title within the class
    const filteredClasses = classes.map(cls => {
        const classMatches = cls.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchingBooks = cls.books?.filter(book =>
            !book.localOnly && book.title.toLowerCase().includes(searchTerm.toLowerCase())
        ) || [];

        return {
            ...cls,
            isMatch: classMatches || matchingBooks.length > 0,
            matchingBooks: matchingBooks
        };
    }).filter(cls => cls.isMatch);

    return (
        <div className="w-full md:w-64 flex-shrink-0 flex flex-col bg-white border-r border-slate-200 sticky top-24 h-[calc(100vh-6rem)] overflow-hidden z-30 transition-all duration-300">
            {/* Search Header */}
            <div className="p-5 sticky top-0 bg-white z-10 border-b border-slate-100">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Search books..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700"
                    />
                </div>
            </div>

            {/* Navigation List */}
            <div className="sidebar-scroll-container flex-1 py-4 px-4 space-y-1 overflow-y-auto no-scrollbar scrollbar-hide">
                <div className="px-3 mb-4 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Navigation</span>
                    <span className="bg-blue-50 text-blue-600 text-[9px] font-bold px-2 py-0.5 rounded-md border border-blue-100">Classrooms</span>
                </div>

                {filteredClasses.length > 0 ? (
                    filteredClasses.map((cls) => {
                        const isActive = Number(currentClassId) === cls.id;
                        const isExpanded = expandedClasses.includes(cls.id) || searchTerm !== "";

                        return (
                            <div key={cls.id} className="mb-1">
                                {/* Class Header (Collapsible) */}
                                <div
                                    onClick={() => {
                                        toggleClass(cls.id);
                                        if (!isActive) navigate(`/books/${cls.id}`);
                                    }}
                                    className={`
                                        group flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-all duration-200
                                        ${isActive
                                            ? "sidebar-active-class bg-blue-600 text-white shadow-md shadow-blue-200"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}
                                    `}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold transition-all
                                            ${isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600"}
                                            `}
                                        >
                                            {cls.id}
                                        </div>
                                        <span className="text-sm font-bold tracking-tight">{cls.name}</span>
                                    </div>
                                    <ChevronDown
                                        size={14}
                                        className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""} ${isActive ? "text-white/70" : "text-slate-300 group-hover:text-blue-500"}`}
                                    />
                                </div>

                                {/* Books List (Collapsible Content) */}
                                {isExpanded && cls.books && (
                                    <div className="mt-1 ml-4 pl-4 border-l-2 border-slate-100 space-y-0.5 relative animate-in fade-in slide-in-from-top-1 duration-200">
                                        {cls.books
                                            .filter(b => !b.localOnly)
                                            .filter(b => searchTerm === "" || b.title.toLowerCase().includes(searchTerm.toLowerCase()))
                                            .map((book) => (
                                                <Link
                                                    key={book.id}
                                                    to={`/class/${cls.id}/read/${book.subject || "General"}`}
                                                    className="
                                                    flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-medium text-slate-500 
                                                    hover:text-blue-600 hover:bg-blue-50/50 transition-all group/item
                                                "
                                                >
                                                    <span className="truncate flex-1">{book.title}</span>
                                                    {searchTerm !== "" && book.title.toLowerCase().includes(searchTerm.toLowerCase()) && (
                                                        <span className="text-[8px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-bold uppercase tracking-tighter shadow-sm">Match</span>
                                                    )}
                                                </Link>
                                            ))}
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className="py-12 text-center text-slate-400">
                        <p className="text-sm font-bold">No results found</p>
                    </div>
                )}
            </div>

            {/* Simplified Library Info Footer */}
            <div className="p-5 border-t border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-3 text-slate-400">
                    <Book size={16} />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Digital Archive</span>
                        <span className="text-[10px] font-medium">Bihar Text Book • 2026</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
