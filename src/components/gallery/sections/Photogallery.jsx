import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultGalleryItems = [
  { type: "image", src: "/images/hero/classroom.webp", alt: "Primary Classroom Learning Environment" },
  { type: "image", src: "/images/hero/audio.webp", alt: "E-Learning & Digital Books Portal" },
  { type: "image", src: "/images/hero/vr.webp", alt: "Mobile VR Lab Tour Experience" },
  { type: "image", src: "/images/hero/sign.webp", alt: "Inclusive Sign Language Training Class" },
  { type: "image", src: "/images/hero/linguistic.webp", alt: "Diverse Regional Dialects Learning Program" },
  { type: "image", src: "/images/hero/classroom.webp", alt: "Primary Classroom Learning Environment" }
];

const Photogallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [items, setItems] = useState(defaultGalleryItems);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const loadData = () => {
      const saved = localStorage.getItem('module_content_gl-photo');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && Array.isArray(parsed)) {
            setItems(parsed.map((item) => {
              const hasValidDoc = item.document && typeof item.document === 'string' && item.document.trim() !== "" && item.document !== "undefined" && item.document !== "null";
              const finalSrc = hasValidDoc ? item.document : "";

              return {
                type: "image",
                src: finalSrc,
                alt: item.title || "Gallery Image"
              };
            }));
          } else {
             setItems(defaultGalleryItems);
          }
        } catch (e) {
          console.error("Error parsing gallery images", e);
        }
      } else {
        setItems(defaultGalleryItems);
      }
    };
    
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Get items for the current page
  const pageItems = items.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 0.5 - 0.5); // safe calculation
    }
  };

  return (
    <section className="w-full bg-white relative pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden min-h-screen">

      {/* Premium background grid & floating shapes matching the screenshot */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-75 pointer-events-none" />
      <div className="absolute right-[-100px] top-1/4 w-80 h-80 border border-slate-200/50 rounded-[48px] rotate-[22deg] pointer-events-none" />
      <div className="absolute left-[-150px] bottom-1/4 w-[400px] h-[400px] border border-slate-200/40 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 font-display">

        {/* Header */}
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 tracking-tight leading-tight mb-2"
          >
            Photo <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Gallery</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Explore our state-wide initiatives, active classrooms, teacher conferences, and key moments in digital education.
          </motion.p>
        </div>

        {/* --- 6-Card Asymmetric Collage Grid (Reference Image Layout) --- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-center"
          >

            {/* Column 1: Leftmost Column (Card 1) */}
            <div className="lg:col-span-3 py-6 flex flex-col justify-center">
              {pageItems[0] && (
                <div
                  onClick={() => setSelectedImage(pageItems[0])}
                  className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-100 aspect-[4/3] w-full"
                >
                  <img loading="lazy" decoding="async"
                    src={pageItems[0].src}
                    alt={pageItems[0].alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-medium line-clamp-2">{pageItems[0].alt}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Column 2: Middle-Left Column (Card 2 & Card 4) */}
            <div className="lg:col-span-3 flex flex-col gap-8">
              {/* Card 2 - Tall Portrait */}
              {pageItems[1] && (
                <div
                  onClick={() => setSelectedImage(pageItems[1])}
                  className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-100 aspect-[3/4] w-full"
                >
                  <img loading="lazy" decoding="async"
                    src={pageItems[1].src}
                    alt={pageItems[1].alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-medium line-clamp-2">{pageItems[1].alt}</span>
                  </div>
                </div>
              )}

              {/* Card 4 - Square/Medium */}
              {pageItems[3] && (
                <div
                  onClick={() => setSelectedImage(pageItems[3])}
                  className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-100 aspect-square w-full"
                >
                  <img loading="lazy" decoding="async"
                    src={pageItems[3].src}
                    alt={pageItems[3].alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-medium line-clamp-2">{pageItems[3].alt}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Column 3: Middle-Right Column (Card 3 & Card 5) */}
            <div className="lg:col-span-3 flex flex-col gap-8">
              {/* Card 3 - Landscape */}
              {pageItems[2] && (
                <div
                  onClick={() => setSelectedImage(pageItems[2])}
                  className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-100 aspect-[4/3] w-full"
                >
                  <img loading="lazy" decoding="async"
                    src={pageItems[2].src}
                    alt={pageItems[2].alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-medium line-clamp-2">{pageItems[2].alt}</span>
                  </div>
                </div>
              )}

              {/* Card 5 - Medium Landscape/Square */}
              {pageItems[4] && (
                <div
                  onClick={() => setSelectedImage(pageItems[4])}
                  className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-100 aspect-[4/3] w-full"
                >
                  <img loading="lazy" decoding="async"
                    src={pageItems[4].src}
                    alt={pageItems[4].alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-medium line-clamp-2">{pageItems[4].alt}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Column 4: Rightmost Column (Card 6 with expand icon overlay) */}
            <div className="lg:col-span-3 py-6 flex flex-col justify-center">
              {pageItems[5] && (
                <div
                  onClick={() => setSelectedImage(pageItems[5])}
                  className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-100 aspect-[4/3] w-full"
                >
                  <img loading="lazy" decoding="async"
                    src={pageItems[5].src}
                    alt={pageItems[5].alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Expand icon overlay matching the reference image layout */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/35 transition-colors duration-300">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-all duration-300 shadow-xl">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4M4 20l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                      </svg>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="text-xs font-semibold line-clamp-1 bg-black/30 px-3 py-1 rounded-full w-fit backdrop-blur-sm">
                      {pageItems[5].alt}
                    </span>
                  </div>
                </div>
              )}
            </div>

          </motion.div>
        </AnimatePresence>

        {/* Custom Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-6">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-bold text-xs uppercase tracking-widest shadow-sm"
            >
              Prev
            </button>
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-3.5 h-3.5 rounded-full transition-all ${currentPage === i ? "bg-blue-600 w-8" : "bg-slate-200 hover:bg-slate-300"
                    }`}
                />
              ))}
            </div>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-bold text-xs uppercase tracking-widest shadow-sm"
            >
              Next
            </button>
          </div>
        )}

      </div>

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/95 p-4 md:p-8 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 backdrop-blur-md transition-all z-50"
              onClick={() => setSelectedImage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Image Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full h-[75vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img loading="lazy" decoding="async"
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-full object-contain rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/10"
              />
            </motion.div>

            {/* Caption */}
            {selectedImage.alt && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mt-6 text-center max-w-2xl px-6 pointer-events-none"
              >
                <p className="text-white/90 text-sm font-semibold leading-relaxed drop-shadow-md">
                  {selectedImage.alt}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Photogallery;
