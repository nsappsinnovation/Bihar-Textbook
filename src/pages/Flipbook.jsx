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
    ChevronsLeft, // For First Page
    ChevronsRight as ChevronsRightIcon // For Last Page
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

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

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [zoom, setZoom] = useState(1);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // State for dynamic PDF path
    const [pdfPath, setPdfPath] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchManifestAndPath = async () => {
            if (propPdfFile) {
                setPdfPath(propPdfFile);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
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
                    setPdfPath(`/PDFs/Class_${classId}/${chapterId}_${subjectSlug}.pdf`); // Fallback
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

    // Construct dynamic path if not provided (DEPRECATED by above logic, but keeping variable name for simple refactor)
    const pdfFile = pdfPath;

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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

    // Precise sizing to match reference: 
    // Reference shows a boxy look, likely A4 ratio.
    const isMobile = windowWidth < 768;
    const bookWidth = isMobile ? windowWidth * 0.9 : 450;
    const bookHeight = bookWidth * 1.4;

    return (
        <div className="h-screen w-full flex flex-col bg-[#e6e6e6] overflow-hidden relative font-sans select-none">

            {/* Top Header - Reference Style */}
            <div className="absolute top-0 left-0 w-full p-4 z-50 flex items-center justify-between pointer-events-none">
                <div className="pointer-events-auto flex items-center gap-4">
                    {/* Close Button (Hidden in reference but good UX) */}
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-white p-2 rounded-full hover:bg-slate-100 shadow-sm text-slate-700 transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <h1 className="text-lg font-bold text-black tracking-wide">
                        Class : Class {classId} ( {bookSubject || "Hindi"} )
                    </h1>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex items-center justify-center relative p-8">

                {/* Large Left Arrow */}
                <button
                    onClick={() => bookRef.current?.pageFlip?.().flipPrev()}
                    className="absolute left-4 md:left-12 z-40 p-2 text-slate-600 hover:text-black hover:scale-110 transition-all"
                >
                    <ChevronLeft size={64} strokeWidth={1.5} />
                </button>

                {/* Book Container */}
                <div
                    className="transition-transform duration-300 ease-out origin-center z-10"
                    style={{ transform: `scale(${zoom})` }}
                >
                    <Document
                        file={pdfFile}
                        onLoadSuccess={onDocumentLoadSuccess}
                        className="flex items-center justify-center"
                        loading={<div className="text-slate-500 font-medium">Loading Document...</div>}
                        error={<div className="text-red-500">Failed to load PDF</div>}
                    >
                        {/* White border container as seen in reference */}
                        <div className="bg-white p-1 shadow-2xl">
                            <HTMLFlipBook
                                width={bookWidth}
                                height={bookHeight}
                                size="fixed"
                                minWidth={300}
                                maxWidth={1000}
                                minHeight={400}
                                maxHeight={1500}
                                maxShadowOpacity={0.5}
                                showCover={false}
                                mobileScrollSupport={true}
                                onFlip={onFlip}
                                ref={bookRef}
                                className="flip-book"
                                style={{ backgroundColor: "#fff" }}
                                drawShadow={true}
                                flippingTime={1000}
                                useMouseEvents={true}
                                usePortrait={isMobile}
                                startPage={0}
                            >
                                {pagesArray.map((pageNum) => (
                                    <Pages key={pageNum}>
                                        {/* Outline Red Border on Page Content as usually seen in Bihar books to define safe area */}
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
                <button
                    onClick={() => bookRef.current?.pageFlip?.().flipNext()}
                    className="absolute right-4 md:right-12 z-40 p-2 text-slate-600 hover:text-black hover:scale-110 transition-all"
                >
                    <ChevronRight size={64} strokeWidth={1.5} />
                </button>
            </div>

            {/* Bottom Toolbar - Matching Reference */}
            <div className="w-full bg-[#dcdcdc] border-t border-slate-300 p-2.5 flex justify-center z-50">
                <div className="flex items-center gap-4 bg-[#f0f0f0] px-4 py-2 rounded-full shadow-sm">

                    {/* Zoom Controls */}
                    <div className="flex items-center gap-2">
                        <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} className="text-slate-500 hover:text-black">
                            <ZoomOut size={18} />
                        </button>
                        <button onClick={() => setZoom(Math.min(2, zoom + 0.1))} className="text-slate-500 hover:text-black">
                            <ZoomIn size={18} />
                        </button>
                    </div>

                    <div className="w-px h-4 bg-slate-300"></div>

                    {/* Pagination Controls */}
                    <div className="flex items-center gap-3">
                        <button className="text-slate-500 hover:text-black"><Bookmark size={18} /></button>

                        {/* First Page */}
                        <button onClick={() => bookRef.current?.pageFlip?.().flip(0)} className="text-slate-500 hover:text-black">
                            <ChevronsLeft size={18} />
                        </button>

                        {/* Prev Page */}
                        <button onClick={() => bookRef.current?.pageFlip?.().flipPrev()} className="text-slate-500 hover:text-black">
                            <ChevronLeft size={18} />
                        </button>

                        {/* Page Counter Pill */}
                        <div className="bg-white border border-slate-200 rounded-full px-3 py-0.5 min-w-[80px] text-center flex items-center justify-center gap-1">
                            <span className="font-bold text-slate-800 text-sm">{pageNumber}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">OF</span>
                            <span className="font-bold text-slate-800 text-sm">{numPages || '--'}</span>
                        </div>

                        {/* Next Page */}
                        <button onClick={() => bookRef.current?.pageFlip?.().flipNext()} className="text-slate-500 hover:text-black">
                            <ChevronRight size={18} />
                        </button>

                        {/* Last Page */}
                        <button onClick={() => bookRef.current?.pageFlip?.().flip(numPages - 1)} className="text-slate-500 hover:text-black">
                            <ChevronsRightIcon size={18} />
                        </button>
                    </div>

                    <div className="w-px h-4 bg-slate-300"></div>

                    {/* Utilities */}
                    <div className="flex items-center gap-3">
                        <button className="text-slate-500 hover:text-black"><Printer size={18} /></button>
                        <button onClick={toggleFullScreen} className="text-slate-500 hover:text-black"><Maximize size={18} /></button>
                        <button className="text-slate-500 hover:text-black"><Settings size={18} /></button>
                        <button onClick={handleDownload} className="bg-slate-800 text-white rounded-full p-1.5 hover:bg-black transition-colors">
                            <Download size={14} />
                        </button>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Flipbook;
