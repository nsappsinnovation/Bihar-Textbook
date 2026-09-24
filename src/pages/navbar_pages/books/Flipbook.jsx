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
import { findBook } from "../../../services/bookService";
import { fileUrl } from "../../../services/api";
import { useTranslation } from "react-i18next";
import { useBookTranslation } from "../../../utils/useBookTranslation";

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
    const { t, i18n } = useTranslation();
    const { translateBookTitle, translateClassName } = useBookTranslation();
    const bookRef = useRef();
    const scrollContainerRef = useRef(null);

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [zoom, setZoom] = useState(1);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    // Size of the reading area (between header, toolbar and table of contents)
    const viewerRef = useRef(null);
    const [viewerSize, setViewerSize] = useState({ width: 0, height: 0 });

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
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        };
        window.addEventListener("resize", handleResize);
        window.addEventListener("orientationchange", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("orientationchange", handleResize);
        };
    }, []);

    // Track the reading area so the page always fits it (phones, rotation, TOC open/closed)
    useEffect(() => {
        const el = viewerRef.current;
        if (!el) return;
        const observer = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setViewerSize({ width: Math.round(width), height: Math.round(height) });
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Fetch chapters list and active book data
    useEffect(() => {
        const fetchBookDetailsAndChapters = async () => {
            try {
                const currentBook = await findBook(classId, bookSubject);
                setBookInfo(currentBook);

                // Fetch chapters list (books from the admin panel use exactly their own chapters)
                if (currentBook) {
                    setChapters(currentBook.chapters || []);
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

    // A new chapter starts on its first page
    useEffect(() => {
        setPageNumber(1);
    }, [chapterId]);

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

                // First check if the book has a chapter with an uploaded PDF
                const book = await findBook(classId, bookSubject);

                // Books from the admin panel: use the chapter's uploaded PDF, or show "not uploaded yet"
                if (book) {
                    const chapterData = (book.chapters || []).find(c => String(c.id) === String(chapterId));
                    setPdfPath(chapterData?.pdfUrl || null);
                    setLoading(false);
                    return;
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

    const resolvedPdf = fileUrl(pdfPath);
    const resolvedCoverImage = fileUrl(bookInfo?.image);
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
    // Phones held sideways: little height, so keep the chrome compact and show one page
    const isShortScreen = windowHeight < 560;
    const compact = isMobile || isShortScreen;
    const singlePage = compact;

    // Fit an A4 page (1 : 1.414) into the reading area; zoom enlarges it and the area scrolls
    const PAGE_RATIO = 1.414;
    // Wrapper padding + the page's white frame (+ side arrows on larger screens)
    const padX = compact ? 36 : 190;
    const padY = compact ? 36 : 84;
    const areaWidth = viewerSize.width || (windowWidth - (showRightPanel && !isMobile ? 360 : 0));
    const areaHeight = viewerSize.height || windowHeight - 140;
    const fitWidth = Math.min(
        (areaWidth - padX) / (singlePage ? 1 : 2),
        (areaHeight - padY) / PAGE_RATIO,
        singlePage ? 900 : 560,
    );
    // Rounded so small resizes don't rebuild the book on every pixel
    const bookWidth = Math.max(140, Math.floor((fitWidth * zoom) / 4) * 4);
    const bookHeight = Math.round(bookWidth * PAGE_RATIO);

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
        <div className="h-screen h-[100dvh] w-full flex flex-col bg-[#f8fafc] overflow-hidden relative font-sans select-none">

            {/* Top Header Bar */}
            <header className={`w-full bg-white border-b border-slate-200 px-3 sm:px-4 ${isShortScreen ? "py-1.5" : "py-2.5 sm:py-3"} flex items-center justify-between gap-3 z-30 shrink-0 shadow-sm`}>
                <div className="flex items-center gap-3 min-w-0">
                    <button
                        onClick={() => navigate(`/class/${classId}/read/${bookSubject || "Hindi"}`)}
                        className="w-9 h-9 shrink-0 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 transition-colors shadow-sm cursor-pointer"
                        title="Close Reader"
                    >
                        <X size={16} />
                    </button>
                    <div className="min-w-0">
                        <h1 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight truncate">
                            Class {classId} &bull; {bookTitle}
                        </h1>
                        {!isShortScreen && (
                            <p className="text-[11px] text-slate-500 font-semibold tracking-wide uppercase mt-0.5 truncate">
                                Reading: {currentChapterTitle}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
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
                    <div className="flex-1 min-h-0 relative">
                        {/* Large Left Arrow */}
                        {!compact && (
                            <button
                                onClick={() => bookRef.current?.pageFlip?.().flipPrev()}
                                className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/80 border border-slate-200 hover:bg-white text-slate-700 hover:text-black hover:scale-105 shadow-md transition-all cursor-pointer"
                            >
                                <ChevronLeft size={24} strokeWidth={2} />
                            </button>
                        )}
                    <div ref={viewerRef} className="absolute inset-0 flex overflow-auto overscroll-contain" data-lenis-prevent>

                        {/* Book Container with zoom */}
                        <div className={`m-auto z-10 ${compact ? "p-2" : "p-8"}`}>
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
                                noData={
                                    <div className="flex flex-col items-center gap-4 text-center bg-white p-8 rounded-2xl shadow-xl border border-slate-100 max-w-sm">
                                        <div className="text-slate-800 font-extrabold text-lg">PDF Not Uploaded Yet</div>
                                        <p className="text-slate-500 text-xs leading-relaxed">
                                            The PDF for <strong>{currentChapterTitle}</strong> has not been uploaded yet. Please check back later.
                                        </p>
                                        <button
                                            onClick={() => navigate(-1)}
                                            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl text-xs transition-colors shadow-sm"
                                        >
                                            Back to Chapters
                                        </button>
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
                                        key={`${pdfFile}-${bookWidth}-${singlePage}-${zoom > 1}`}
                                        width={bookWidth}
                                        height={bookHeight}
                                        size="fixed"
                                        minWidth={140}
                                        maxWidth={2000}
                                        minHeight={200}
                                        maxHeight={2800}
                                        maxShadowOpacity={0.4}
                                        showCover={false}
                                        mobileScrollSupport={true}
                                        onFlip={onFlip}
                                        ref={bookRef}
                                        className="flip-book"
                                        style={{ backgroundColor: "#fff" }}
                                        drawShadow={true}
                                        flippingTime={800}
                                        useMouseEvents={zoom <= 1}
                                        usePortrait={singlePage}
                                        startPage={Math.max(0, pageNumber - 1)}
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

                    </div>
                        {/* Large Right Arrow */}
                        {!compact && (
                            <button
                                onClick={() => bookRef.current?.pageFlip?.().flipNext()}
                                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/80 border border-slate-200 hover:bg-white text-slate-700 hover:text-black hover:scale-105 shadow-md transition-all cursor-pointer"
                            >
                                <ChevronRight size={24} strokeWidth={2} />
                            </button>
                        )}
                    </div>

                    {/* Bottom Toolbar centered at the bottom of the viewer */}
                    <div className={`w-full bg-white/85 backdrop-blur-sm border-t border-slate-200 ${isShortScreen ? "p-1.5" : "p-2.5"} flex justify-center z-25 shrink-0 shadow-[0_-2px_10px_rgba(0,0,0,0.02)] pb-[max(0.625rem,env(safe-area-inset-bottom))]`}>
                        <div className={`flex items-center ${compact ? "gap-2 px-3" : "gap-3 px-4"} ${isShortScreen ? "py-1.5" : "py-2"} bg-slate-900 text-white rounded-full shadow-lg max-w-full`}>

                            {/* Zoom Controls */}
                            <div className="flex items-center gap-1">
                                <button 
                                    onClick={() => setZoom(z => Math.max(0.6, Math.round((z - 0.2) * 10) / 10))} 
                                    className="p-1 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                                    title="Zoom Out"
                                >
                                    <ZoomOut size={16} />
                                </button>
                                <button 
                                    onClick={() => setZoom(z => Math.min(3, Math.round((z + 0.2) * 10) / 10))} 
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
                    <aside className="absolute inset-0 md:static md:inset-auto w-full md:w-[360px] border-l border-slate-200 bg-white flex flex-col shrink-0 z-30 md:z-20 shadow-[-4px_0_12px_rgba(0,0,0,0.015)] h-full">
                        
                        {/* Book Metadata Cover Card */}
                        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                            <div className="flex gap-3">
                                <div className="w-14 h-18 rounded-lg overflow-hidden border border-slate-200 shadow-sm shrink-0 bg-white flex items-center justify-center">
                                    <img loading="lazy" decoding="async" 
                                        src={resolvedCoverImage || "/bookcover.webp"} 
                                        alt={bookTitle}
                                        onError={(e) => { e.target.src = "/bookcover.webp"; }}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="min-w-0 flex-1 flex flex-col justify-center">
                                    <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase">Class {classId} textbook</span>
                                    <h2 className="text-sm font-extrabold text-slate-900 truncate leading-snug">{translateBookTitle(bookTitle, bookSubject)}</h2>
                                    <p className="text-[11px] text-slate-400 font-semibold truncate mt-0.5">{t("booksPage.flipbook.by", "By")} {bookInfo?.author || t("booksPage.biharBoard", "Bihar Board")}</p>
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
                                    <span>{t("booksPage.flipbook.tableOfContents", "Table of Contents")}</span>
                                </h3>
                                <span className="text-[10px] font-extrabold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                                    {filteredChapters.length} {t("booksPage.flipbook.chapters", "Chapters")}
                                </span>
                            </div>

                            <div className="relative">
                                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder={t("booksPage.flipbook.searchChapters", "Search chapters...")}
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
                                            onClick={() => { if (isMobile) setShowRightPanel(false); }}
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
                                                    {i18n.language === 'hi' ? (chap.hindiTitle || chap.title) : chap.title}
                                                </h4>
                                            </div>

                                            <div className="shrink-0 text-slate-300 group-hover:text-blue-600 transition-colors">
                                                <ChevronRight size={14} />
                                            </div>
                                        </Link>
                                    );
                                })
                            ) : (
                                <div className="text-center py-12 text-slate-400 text-xs font-medium">
                                    {t("booksPage.flipbook.noChaptersFound", "No chapters found matching")} "{searchQuery}"
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
