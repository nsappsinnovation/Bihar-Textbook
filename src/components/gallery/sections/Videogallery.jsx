import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { getSections } from '../../../services/sectionService';
import { fileUrl, isUploadedFile } from '../../../services/api';
import GalleryStatus from './GalleryStatus';

const getYouTubeId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const Videogallery = () => {
  const { t } = useTranslation();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [rows, setRows] = useState(null); // null while loading
  const [currentPage, setCurrentPage] = useState(0);

  // Videos are managed in Admin → Gallery → Video Gallery.
  // videoUrl holds either a YouTube link or an uploaded "/api/uploads/videos/..." file.
  // Fetched once; labels are translated when rendering.
  useEffect(() => {
    getSections('gl-video')
      .then(setRows)
      .catch(() => setRows([]));
  }, []);

  // Only rows that have a video are shown
  const items = (rows || [])
    .filter((row) => row.videoUrl)
    .map((row) => {
      const isUploaded = isUploadedFile(row.videoUrl);
      const ytId = isUploaded ? null : getYouTubeId(row.videoUrl);
      // hqdefault exists for every YouTube video (maxresdefault is large and missing for non-HD uploads)
      const autoThumbnail = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : "";
      return {
        type: "video",
        src: fileUrl(row.imageUrl) || autoThumbnail,
        videoUrl: isUploaded ? "" : row.videoUrl,
        uploadedVideo: isUploaded ? fileUrl(row.videoUrl) : "",
        alt: row.title || t("galleryPage.video.fallbackAlt"),
      };
    });

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
      setCurrentPage(prev => prev - 1);
    }
  };

  function getEmbedUrl(url) {
    if (!url) return "";
    let id = "";
    if (url.includes("youtube.com/watch?v=")) {
      id = url.split("v=")[1]?.split("&")[0];
    } else if (url.includes("youtu.be/")) {
      id = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("youtube.com/embed/")) {
      return url;
    } else {
      return url; // fallback for other formats
    }
    return `https://www.youtube.com/embed/${id}`;
  }

  return (
    <section className="w-full bg-white relative pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden min-h-screen">

      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-75 pointer-events-none" />
      <div className="absolute left-[-100px] top-1/4 w-80 h-80 border border-slate-200/50 rounded-[48px] rotate-[15deg] pointer-events-none" />
      <div className="absolute right-[-150px] bottom-1/4 w-[400px] h-[400px] border border-slate-200/40 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 font-display">

        {/* Header */}
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 tracking-tight leading-tight mb-2"
          >
            {t("galleryPage.video.headingPrefix")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {t("galleryPage.video.headingHighlight")}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed"
          >
            {t("galleryPage.video.description")}
          </motion.p>
        </div>

        {/* --- 6-Card Asymmetric Collage Grid (Video Version) --- */}
        {rows === null || items.length === 0 ? (
          <GalleryStatus loading={rows === null} />
        ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-center"
          >

            {/* Column 1: Card 1 */}
            <div className="lg:col-span-3 py-6 flex flex-col justify-center">
              {pageItems[0] && (
                <div
                  onClick={() => setSelectedVideo(pageItems[0])}
                  className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-100 aspect-[4/3] w-full"
                >
                  <img loading="lazy" decoding="async"
                    src={pageItems[0].src || undefined}
                    alt={pageItems[0].alt}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white scale-90 group-hover:scale-100 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300 shadow-xl">
                      <FaPlay className="text-white ml-0.5 text-sm" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                    <span className="text-[10px] font-bold line-clamp-1 bg-black/40 px-2.5 py-1 rounded-full w-fit backdrop-blur-sm">
                      {pageItems[0].alt}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Column 2: Card 2 & Card 4 */}
            <div className="lg:col-span-3 flex flex-col gap-8">
              {/* Card 2 - Tall portrait */}
              {pageItems[1] && (
                <div
                  onClick={() => setSelectedVideo(pageItems[1])}
                  className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-100 aspect-[3/4] w-full"
                >
                  <img loading="lazy" decoding="async"
                    src={pageItems[1].src || undefined}
                    alt={pageItems[1].alt}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white scale-90 group-hover:scale-100 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300 shadow-xl">
                      <FaPlay className="text-white ml-0.5 text-sm" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                    <span className="text-[10px] font-bold line-clamp-1 bg-black/40 px-2.5 py-1 rounded-full w-fit backdrop-blur-sm">
                      {pageItems[1].alt}
                    </span>
                  </div>
                </div>
              )}

              {/* Card 4 - Square/Medium */}
              {pageItems[3] && (
                <div
                  onClick={() => setSelectedVideo(pageItems[3])}
                  className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-100 aspect-square w-full"
                >
                  <img loading="lazy" decoding="async"
                    src={pageItems[3].src || undefined}
                    alt={pageItems[3].alt}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white scale-90 group-hover:scale-100 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300 shadow-xl">
                      <FaPlay className="text-white ml-0.5 text-sm" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                    <span className="text-[10px] font-bold line-clamp-1 bg-black/40 px-2.5 py-1 rounded-full w-fit backdrop-blur-sm">
                      {pageItems[3].alt}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Column 3: Card 3 & Card 5 */}
            <div className="lg:col-span-3 flex flex-col gap-8">
              {/* Card 3 - Landscape */}
              {pageItems[2] && (
                <div
                  onClick={() => setSelectedVideo(pageItems[2])}
                  className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-100 aspect-[4/3] w-full"
                >
                  <img loading="lazy" decoding="async"
                    src={pageItems[2].src || undefined}
                    alt={pageItems[2].alt}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white scale-90 group-hover:scale-100 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300 shadow-xl">
                      <FaPlay className="text-white ml-0.5 text-sm" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                    <span className="text-[10px] font-bold line-clamp-1 bg-black/40 px-2.5 py-1 rounded-full w-fit backdrop-blur-sm">
                      {pageItems[2].alt}
                    </span>
                  </div>
                </div>
              )}

              {/* Card 5 - Medium */}
              {pageItems[4] && (
                <div
                  onClick={() => setSelectedVideo(pageItems[4])}
                  className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-100 aspect-[4/3] w-full"
                >
                  <img loading="lazy" decoding="async"
                    src={pageItems[4].src || undefined}
                    alt={pageItems[4].alt}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white scale-90 group-hover:scale-100 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300 shadow-xl">
                      <FaPlay className="text-white ml-0.5 text-sm" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                    <span className="text-[10px] font-bold line-clamp-1 bg-black/40 px-2.5 py-1 rounded-full w-fit backdrop-blur-sm">
                      {pageItems[4].alt}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Column 4: Card 6 (with expand icon overlay) */}
            <div className="lg:col-span-3 py-6 flex flex-col justify-center">
              {pageItems[5] && (
                <div
                  onClick={() => setSelectedVideo(pageItems[5])}
                  className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-100 aspect-[4/3] w-full"
                >
                  <img loading="lazy" decoding="async"
                    src={pageItems[5].src || undefined}
                    alt={pageItems[5].alt}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                  />

                  {/* Expand / Play button overlay matching reference layout */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/15 group-hover:bg-black/35 transition-colors duration-300">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white scale-90 group-hover:scale-100 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300 shadow-xl">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4M4 20l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                      </svg>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                    <span className="text-[10px] font-bold line-clamp-1 bg-black/40 px-2.5 py-1 rounded-full w-fit backdrop-blur-sm">
                      {pageItems[5].alt}
                    </span>
                  </div>
                </div>
              )}
            </div>

          </motion.div>
        </AnimatePresence>
        )}

        {/* Custom Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-6">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-bold text-xs uppercase tracking-widest shadow-sm"
            >
              {t("common.prev")}
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
              {t("common.next")}
            </button>
          </div>
        )}

      </div>

      {/* Full-Screen Video Lightbox Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/95 p-4 md:p-8 backdrop-blur-md"
            onClick={() => setSelectedVideo(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 backdrop-blur-md transition-all z-50"
              onClick={() => setSelectedVideo(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video Box Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedVideo.uploadedVideo ? (
                <video
                  src={selectedVideo.uploadedVideo}
                  controls
                  autoPlay
                  className="absolute inset-0 w-full h-full object-contain bg-black"
                />
              ) : (
                <iframe
                  src={getEmbedUrl(selectedVideo.videoUrl)}
                  title={selectedVideo.alt}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full bg-black"
                />
              )}
            </motion.div>

            {/* Video Description */}
            {selectedVideo.alt && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mt-6 text-center max-w-2xl px-6 pointer-events-none"
              >
                <p className="text-white/90 text-sm font-semibold leading-relaxed drop-shadow-md">
                  {selectedVideo.alt}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Videogallery;
