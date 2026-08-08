import React, { useState, useRef, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {
    Search,
    ZoomIn,
    ZoomOut,
    Maximize,
    Bookmark,
    ChevronLeft,
    ChevronRight,
    Printer,
    Settings,
    X,
    Download,
    ChevronsLeft,
    ChevronsRight as ChevronsRightIcon,
    Menu,
    BookOpen,
    Lightbulb,
    FileText,
    ChevronDown,
    ChevronUp
} from "lucide-react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getStoredTextbooksData } from "../../../utils/textbookStorage";
import { useResolvedUrl } from "../../../utils/fileStorage";

// Use CDN worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Pages = React.forwardRef((props, ref) => {
    return (
        <div className="bg-white h-full" ref={ref}>
            <div className="w-full h-full flex items-center justify-center">{props.children}</div>
        </div>
    );
});

Pages.displayName = "Pages";

function Flipbook({ pdfFile: propPdfFile }) {
    const { classId, bookSubject, chapterId } = useParams();
    const navigate = useNavigate();
    const bookRef = useRef();
    const scrollContainerRef = useRef(null);

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [zoom, setZoom] = useState(1);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // State for dynamic PDF path
    const [pdfPath, setPdfPath] = useState(null);
    const [loading, setLoading] = useState(true);

    // Right Sidebar States
    const [chapters, setChapters] = useState([]);
    const [bookInfo, setBookInfo] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showRightPanel, setShowRightPanel] = useState(window.innerWidth >= 1024);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setWindowWidth(width);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Fetch chapters list and active book data
    useEffect(() => {
        const fetchBookDetailsAndChapters = async () => {
            try {
                const textbooksData = getStoredTextbooksData();
                const classData = textbooksData.classes?.find((cls) => cls.id === Number(classId));
                const allBooks = classData?.books || [];
                const currentBook = allBooks.find(b => (b.subject || "General") === bookSubject || b.title === bookSubject);
                setBookInfo(currentBook);

                // Fetch chapters list
                if (currentBook && currentBook.chapters && currentBook.chapters.length > 0) {
                    setChapters(currentBook.chapters);
                } else {
                    const subjectSlug = (bookSubject || "Hindi").toLowerCase().replace(/[^a-z0-9]/g, '_');
                    const manifestUrl = `/PDFs/Class_${classId}/${subjectSlug}_manifest.json`;
                    const response = await fetch(manifestUrl);
                    if (response.ok) {
                        const manifestData = await response.json();
                        const mappedChapters = manifestData.chapters.map(c => ({
                            id: c.id,
                            title: c.title,
                            hindiTitle: c.hindiTitle || c.title,
                            type: "chapter"
                        }));
                        setChapters(mappedChapters);
                    } else {
                        // Fallback chapters
                        setChapters([
                            { id: 1, title: "Chapter 1", hindiTitle: "हँसते-खेलते", type: "chapter" },
                            { id: 2, title: "Chapter 2", hindiTitle: "हमारा गाँव (चित्रपठन)", type: "chapter" },
                        ]);
                    }
                }
            } catch (err) {
                console.error("Error fetching book chapters:", err);
                setChapters([
                    { id: 1, title: "Chapter 1", hindiTitle: "हँसते-खेलते", type: "chapter" },
                    { id: 2, title: "Chapter 2", hindiTitle: "हमारा गाँव (चित्रपठन)", type: "chapter" },
                ]);
            }
        };

        fetchBookDetailsAndChapters();
    }, [classId, bookSubject]);

    // Fetch active PDF file path
    useEffect(() => {
        const fetchManifestAndPath = async () => {
            if (propPdfFile) {
                setPdfPath(propPdfFile);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                // First check if the book has chapters in local storage with a custom PDF URL
                const textbooksData = getStoredTextbooksData();
                const classData = textbooksData.classes?.find((cls) => cls.id === Number(classId));
                const allBooks = classData?.books || [];
                const book = allBooks.find(b => (b.subject || "General") === bookSubject || b.title === bookSubject);
                
                if (book && book.chapters) {
                    const chapterData = book.chapters.find(c => String(c.id) === String(chapterId));
                    if (chapterData && chapterData.pdfUrl) {
                        setPdfPath(chapterData.pdfUrl);
                        setLoading(false);
                        return;
                    }
                }

                // Sanitize slug to match scraper logic: replace non-alphanumeric with '_'
                const subjectSlug = (bookSubject || "Hindi").toLowerCase().replace(/[^a-z0-9]/g, '_');
                const manifestUrl = `/PDFs/Class_${classId}/${subjectSlug}_manifest.json`;

                const response = await fetch(manifestUrl);
                if (!response.ok) {
                    // Fallback to old pattern if manifest missing
                    console.warn("Manifest not found, using fallback path");
                    setPdfPath(`/PDFs/Class_${classId}/${chapterId}_${subjectSlug}.pdf`);
                    return;
                }

                const manifest = await response.json();
                const chapterData = manifest.chapters.find(c => c.id == chapterId); // strict vs loose equality

                if (chapterData) {
                    setPdfPath(`/PDFs/Class_${classId}/${chapterData.fileName}`);
                } else {
                    console.error("Chapter not found in manifest");
                    if (chapterId === "preface" || chapterId === "contents") {
                        setPdfPath(null); // Will trigger error state
                    } else {
                        setPdfPath(`/PDFs/Class_${classId}/${chapterId}_${subjectSlug}.pdf`); // Final fallback attempt
                    }
                }

            } catch (err) {
                console.error("Error loading manifest:", err);
                // Fallback
                setPdfPath(`/PDFs/Class_${classId}/${chapterId}_${(bookSubject || "Hindi").toLowerCase()}.pdf`);
            } finally {
                setLoading(false);
            }
        };

        fetchManifestAndPath();
    }, [classId, bookSubject, chapterId, propPdfFile]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (scrollContainerRef.current) {
                const container = scrollContainerRef.current;
                const activeElement = container.querySelector('[data-active="true"]');
                if (activeElement) {
                    const containerHeight = container.clientHeight;
                    const elementTop = activeElement.offsetTop;
                    const elementHeight = activeElement.clientHeight;
                    container.scrollTo({
                        top: elementTop - (containerHeight / 2) + (elementHeight / 2),
                        behavior: "smooth"
                    });
                }
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [chapterId, chapters]);

    const resolvedPdf = useResolvedUrl(pdfPath);
    const resolvedCoverImage = useResolvedUrl(bookInfo?.image);
    const pdfFile = resolvedPdf;

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setLoading(false);
    }

    const onFlip = (e) => {
        setPageNumber(e.data + 1);
    };

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };

    const handleDownload = () => {
        if (!pdfFile) return;
        const link = document.createElement("a");
        link.href = pdfFile;
        link.download = pdfFile.split("/").pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Build pages array
    const pagesArray = numPages ? Array.from({ length: numPages }, (_, i) => i + 1) : [];

    const isMobile = windowWidth < 768;
    const isTablet = windowWidth >= 768 && windowWidth < 1024;
    
    // Adjust flipbook page size dynamically depending on whether sidebar is shown
    const sidebarWidth = showRightPanel ? (isMobile ? windowWidth : 360) : 0;
    const availableWidth = windowWidth - sidebarWidth;
    
    // Calculate page size to fit A4 ratio inside available space
    const bookWidth = isMobile 
        ? availableWidth * 0.9 
        : isTablet 
            ? Math.min(400, availableWidth * 0.42)
            : Math.min(460, availableWidth * 0.44);
            
    const bookHeight = bookWidth * 1.414;

    const filteredChapters = chapters.filter(c => 
        (c.title && c.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (c.hindiTitle && c.hindiTitle.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const bookTitle = bookInfo?.title || bookSubject || "Hindi";
    const currentChapter = chapters.find(c => String(c.id) === String(chapterId));
    const currentChapterTitle = currentChapter ? (currentChapter.hindiTitle || currentChapter.title) : `Chapter ${chapterId}`;
    
    let cleanedDescription = bookInfo?.description || `Official Bihar Board Class ${classId} textbook for '${bookTitle}'.`;
    cleanedDescription = cleanedDescription.replace(/[\s\.]*Complete digital reading material\s*&\s*chapters\.?/gi, "");

    return (
        <div className="h-screen w-full flex flex-col bg-[#f8fafc] overflow-hidden relative font-sans select-none">

            {/* Top Header Bar */}
            <header className="w-full bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between z-30 shrink-0 shadow-sm">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate(`/class/${classId}/read/${bookSubject || "Hindi"}`)}
                        className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 transition-colors shadow-sm cursor-pointer"
                        title="Close Reader"
                    >
                        <X size={16} />
                    </button>
                    <div>
                        <h1 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                            <span>Class {classId} &bull; {bookTitle}</span>
                        </h1>
                        <p className="text-[11px] text-slate-500 font-semibold tracking-wide uppercase mt-0.5">
                            Reading: {currentChapterTitle}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Sidebar Toggle Button */}
                    <button
                        onClick={() => setShowRightPanel(!showRightPanel)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                            showRightPanel 
                                ? "bg-blue-600 border-blue-600 text-white shadow-sm shadow-blue-500/20" 
                                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                    >
                        <Menu size={14} />
                        <span className="hidden sm:inline">{showRightPanel ? "Hide TOC" : "Show TOC"}</span>
                    </button>
                </div>
            </header>

            {/* Middle Container split into Viewer and Sidebar */}
            <div className="flex-1 flex overflow-hidden relative w-full">
                
                {/* Left Area: Flipbook Viewer */}
                <div className="flex-1 flex flex-col bg-[#f1f5f9] relative overflow-hidden">
                    <div className="flex-1 flex items-center justify-center relative p-6 sm:p-8 md:p-12 overflow-auto" data-lenis-prevent>
                        
                        {/* Large Left Arrow */}
                        {!isMobile && (
                            <button
                                onClick={() => bookRef.current?.pageFlip?.().flipPrev()}
                                className="absolute left-6 z-20 p-3 rounded-full bg-white/80 border border-slate-200 hover:bg-white text-slate-700 hover:text-black hover:scale-105 shadow-md transition-all cursor-pointer"
                            >
                                <ChevronLeft size={24} strokeWidth={2} />
                            </button>
                        )}

                        {/* Book Container with zoom */}
                        <div
                            className="transition-transform duration-300 ease-out origin-center z-10 my-auto"
                            style={{ transform: `scale(${zoom})` }}
                        >
                            <Document
                                file={pdfFile}
                                onLoadSuccess={onDocumentLoadSuccess}
                                className="flex items-center justify-center"
                                loading={
                                    <div className="flex flex-col items-center gap-3 bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                                        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                        <div className="text-slate-600 font-bold text-sm">Loading Chapter Document...</div>
                                    </div>
                                }
                                error={
                                    <div className="flex flex-col items-center gap-4 text-center bg-white p-8 rounded-2xl shadow-xl border border-slate-100 max-w-sm">
                                        
                                        <div className="text-red-500 font-extrabold text-lg">Document Not Available</div>
                                        <p className="text-slate-500 text-xs leading-relaxed">
                                            The PDF for <strong>{currentChapterTitle}</strong> is not loaded or is currently unavailable.
                                        </p>
                                        <button
                                            onClick={() => navigate(-1)}
                                            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl text-xs transition-colors shadow-sm"
                                        >
                                            Back to Chapters
                                        </button>
                                    </div>
                                }
                            >
                                {/* White border container as seen in reference */}
                                <div className="bg-white p-1.5 shadow-2xl rounded-sm border border-slate-200">
                                    <HTMLFlipBook
                                        width={bookWidth}
                                        height={bookHeight}
                                        size="fixed"
                                        minWidth={200}
                                        maxWidth={800}
                                        minHeight={300}
                                        maxHeight={1200}
                                        maxShadowOpacity={0.4}
                                        showCover={false}
                                        mobileScrollSupport={true}
                                        onFlip={onFlip}
                                        ref={bookRef}
                                        className="flip-book"
                                        style={{ backgroundColor: "#fff" }}
                                        drawShadow={true}
                                        flippingTime={800}
                                        useMouseEvents={true}
                                        usePortrait={isMobile}
                                        startPage={0}
                                    >
                                        {pagesArray.map((pageNum) => (
                                            <Pages key={pageNum}>
                                                <div className="w-full h-full relative">
                                                    <Page
                                                        pageNumber={pageNum}
                                                        width={bookWidth}
                                                        renderAnnotationLayer={false}
                                                        renderTextLayer={false}
                                                        className="pdf-page"
                                                    />
                                                </div>
                                            </Pages>
                                        ))}
                                    </HTMLFlipBook>
                                </div>
                            </Document>
                        </div>

                        {/* Large Right Arrow */}
                        {!isMobile && (
                            <button
                                onClick={() => bookRef.current?.pageFlip?.().flipNext()}
                                className="absolute right-6 z-20 p-3 rounded-full bg-white/80 border border-slate-200 hover:bg-white text-slate-700 hover:text-black hover:scale-105 shadow-md transition-all cursor-pointer"
                            >
                                <ChevronRight size={24} strokeWidth={2} />
                            </button>
                        )}
                    </div>

                    {/* Bottom Toolbar centered at the bottom of the viewer */}
                    <div className="w-full bg-white/85 backdrop-blur-sm border-t border-slate-200 p-2.5 flex justify-center z-25 shrink-0 shadow-[0_-2px_10px_rgba(0,0,0,0.02)]">
                        <div className="flex items-center gap-3 bg-slate-900 text-white px-4 py-2 rounded-full shadow-lg">

                            {/* Zoom Controls */}
                            <div className="flex items-center gap-1">
                                <button 
                                    onClick={() => setZoom(Math.max(0.6, zoom - 0.1))} 
                                    className="p-1 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                                    title="Zoom Out"
                                >
                                    <ZoomOut size={16} />
                                </button>
                                <button 
                                    onClick={() => setZoom(Math.min(1.8, zoom + 0.1))} 
                                    className="p-1 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                                    title="Zoom In"
                                >
                                    <ZoomIn size={16} />
                                </button>
                            </div>

                            <div className="w-px h-4 bg-slate-700"></div>

                            {/* Pagination Controls */}
                            <div className="flex items-center gap-2">
                                {/* First Page */}
                                <button 
                                    onClick={() => bookRef.current?.pageFlip?.().flip(0)} 
                                    className="p-1 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                                    title="First Page"
                                >
                                    <ChevronsLeft size={16} />
                                </button>

                                {/* Prev Page */}
                                <button 
                                    onClick={() => bookRef.current?.pageFlip?.().flipPrev()} 
                                    className="p-1 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                                    title="Previous Page"
                                >
                                    <ChevronLeft size={16} />
                                </button>

                                {/* Page Counter Pill */}
                                <div className="bg-white/10 border border-white/10 rounded-full px-3 py-0.5 text-center flex items-center justify-center gap-1.5">
                                    <span className="font-bold text-white text-xs">{pageNumber}</span>
                                    <span className="text-[9px] font-bold text-slate-400">OF</span>
                                    <span className="font-bold text-white text-xs">{numPages || '--'}</span>
                                </div>

                                {/* Next Page */}
                                <button 
                                    onClick={() => bookRef.current?.pageFlip?.().flipNext()} 
                                    className="p-1 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                                    title="Next Page"
                                >
                                    <ChevronRight size={16} />
                                </button>

                                {/* Last Page */}
                                <button 
                                    onClick={() => bookRef.current?.pageFlip?.().flip(numPages - 1)} 
                                    className="p-1 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                                    title="Last Page"
                                >
                                    <ChevronsRightIcon size={16} />
                                </button>
                            </div>

                            <div className="w-px h-4 bg-slate-700"></div>

                            {/* Utilities */}
                            <div className="flex items-center gap-1.5">
                                <button 
                                    onClick={toggleFullScreen} 
                                    className="p-1 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                                    title="Toggle Fullscreen"
                                >
                                    <Maximize size={16} />
                                </button>
                                <button 
                                    onClick={handleDownload} 
                                    className="bg-blue-600 text-white rounded-full p-1.5 hover:bg-blue-500 transition-colors shadow-sm cursor-pointer"
                                    title="Download PDF"
                                >
                                    <Download size={12} />
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Right Side: Chapter List & Text Panel */}
                {showRightPanel && (
                    <aside className="w-full md:w-[360px] border-l border-slate-200 bg-white flex flex-col shrink-0 z-20 shadow-[-4px_0_12px_rgba(0,0,0,0.015)] relative h-full">
                        
                        {/* Book Metadata Cover Card */}
                        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                            <div className="flex gap-3">
                                <div className="w-14 h-18 rounded-lg overflow-hidden border border-slate-200 shadow-sm shrink-0 bg-white flex items-center justify-center">
                                    <img 
                                        src={resolvedCoverImage || "/bookcover.png"} 
                                        alt={bookTitle}
                                        onError={(e) => { e.target.src = "/bookcover.png"; }}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="min-w-0 flex-1 flex flex-col justify-center">
                                    <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase">Class {classId} textbook</span>
                                    <h2 className="text-sm font-extrabold text-slate-900 truncate leading-snug">{bookTitle}</h2>
                                    <p className="text-[11px] text-slate-400 font-semibold truncate mt-0.5">By {bookInfo?.author || "Bihar Board"}</p>
                                </div>
                            </div>
                            {cleanedDescription && (
                                <p className="text-xs text-slate-500 leading-relaxed mt-3 bg-white p-2.5 rounded-xl border border-slate-200/60 line-clamp-3">
                                    {cleanedDescription}
                                </p>
                            )}
                        </div>

                        {/* Search and Table of Contents Title */}
                        <div className="p-4 border-b border-slate-100 shrink-0">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xs font-bold text-slate-800 tracking-wider uppercase flex items-center gap-1.5">
                                    <BookOpen size={14} className="text-blue-600" />
                                    <span>Table of Contents</span>
                                </h3>
                                <span className="text-[10px] font-extrabold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                                    {filteredChapters.length} Chapters
                                </span>
                            </div>

                            <div className="relative">
                                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search chapters..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 text-slate-700"
                                />
                            </div>
                        </div>

                        {/* Scrollable Chapters List */}
                        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-3 space-y-1.5 custom-scrollbar" data-lenis-prevent>
                            {filteredChapters.length > 0 ? (
                                filteredChapters.map((chap, idx) => {
                                    const isActive = String(chap.id) === String(chapterId);
                                    return (
                                        <Link
                                            data-active={isActive ? "true" : "false"}
                                            key={chap.id || idx}
                                            to={`/book/${classId}/${bookSubject}/${chap.id}/flip`}
                                            className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left group ${
                                                isActive
                                                    ? "bg-gradient-to-r from-blue-50 to-indigo-50/50 border-blue-200 shadow-sm"
                                                    : "bg-white border-slate-100 hover:bg-slate-50/80 hover:border-slate-200"
                                            }`}
                                        >
                                            {/* Chapter Index number */}
                                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                                                isActive 
                                                    ? "bg-blue-600 text-white" 
                                                    : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                                            }`}>
                                                {String(idx + 1).padStart(2, '0')}
                                            </div>

                                            {/* Chapter titles */}
                                            <div className="min-w-0 flex-1">
                                                <h4 className={`text-xs font-bold leading-snug truncate transition-colors ${
                                                    isActive ? "text-blue-700" : "text-slate-800 group-hover:text-blue-600"
                                                }`}>
                                                    {chap.hindiTitle || chap.title}
                                                </h4>
                                                {chap.title && chap.title !== chap.hindiTitle && (
                                                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider truncate mt-0.5">
                                                        {chap.title}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="shrink-0 text-slate-300 group-hover:text-blue-600 transition-colors">
                                                <ChevronRight size={14} />
                                            </div>
                                        </Link>
                                    );
                                })
                            ) : (
                                <div className="text-center py-12 text-slate-400 text-xs font-medium">
                                    No chapters found matching "{searchQuery}"
                                </div>
                            )}
                        </div>

                       

                    </aside>
                )}

            </div>

        </div>
    );
}

export default Flipbook;
