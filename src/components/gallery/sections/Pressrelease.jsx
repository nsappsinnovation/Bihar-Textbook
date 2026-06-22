import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, FileText, ArrowRight, FileDown, X } from 'lucide-react';

const pressReleases = [
  {
    id: 1,
    date: "October 15, 2025",
    title: "Launch of Digital Learning Initiatives Across 500 Schools",
    excerpt: "The State Text Book Publishing Corporation today announced a major rollout of VR and AR educational tools, aiming to modernize learning infrastructure in rural districts.",
    category: "Initiatives",
    fileSize: "1.2 MB",
    cardStyle: "gradient" // Solid blue/indigo gradient
  },
  {
    id: 2,
    date: "September 28, 2025",
    title: "New Curriculum Guidelines Released for Upcoming Academic Year",
    excerpt: "Updated guidelines emphasize regional history, environmental awareness, and foundational literacy skills. All textbooks have been revised accordingly.",
    category: "Curriculum",
    fileSize: "4.5 MB",
    cardStyle: "image", // Library image background
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
  },
  {
    id: 3,
    date: "August 10, 2025",
    title: "Partnership Announced with National Digital Library",
    excerpt: "To provide uninterrupted access to study materials, we have integrated our entire digital repository with the National Digital Library platform.",
    category: "Partnerships",
    fileSize: "800 KB",
    cardStyle: "glass" // White glass panel
  },
  {
    id: 4,
    date: "July 22, 2025",
    title: "Annual Board Meeting Summary and Future Outlook",
    excerpt: "Key decisions from the Q3 board meeting, including increased budgets for audiobooks and specialized learning resources for differently-abled students.",
    category: "Corporate",
    fileSize: "2.1 MB",
    cardStyle: "dark" // Dark slate block
  },
  {
    id: 5,
    date: "May 10, 2025",
    title: "NEP 2020 Textbook Alignment Milestone Completed",
    excerpt: "Bihar Board successfully aligns textbooks for classes 1 to 8 with the latest National Education Policy standards for foundational stages.",
    category: "Reform",
    fileSize: "3.4 MB",
    cardStyle: "glass" // White glass panel
  },
  {
    id: 6,
    date: "April 18, 2025",
    title: "Heritage Archive Digitization Campaign Launch",
    excerpt: "A major initiative to scan and preserve rare historical educational manuscripts and classic school materials dating back over 100 years.",
    category: "Heritage",
    fileSize: "1.8 MB",
    cardStyle: "image", // Classroom image background
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
  }
];

const Pressrelease = () => {
  const [selectedRelease, setSelectedRelease] = useState(null);

  const handleDownload = (e, release) => {
    e.stopPropagation();
    // Simulate file download
    const link = document.createElement("a");
    link.href = "/printer.pdf";
    link.download = `BSTPC_PressRelease_${release.id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="w-full bg-[#fdfbf9] relative py-16 lg:py-24 overflow-hidden min-h-screen">

      {/* Grid background & shapes */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-75 pointer-events-none" />
      <div className="absolute right-[-100px] top-1/4 w-80 h-80 border border-slate-200/50 rounded-[48px] rotate-[15deg] pointer-events-none" />
      <div className="absolute left-[-150px] bottom-1/4 w-[400px] h-[400px] border border-slate-200/40 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 font-sans">

        {/* Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-indigo-50/80 backdrop-blur-sm border border-indigo-100 mb-6 shadow-sm"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
            <span className="text-indigo-800 text-xs font-bold tracking-wider uppercase">
              Official Communications
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 tracking-tight leading-tight mb-6"
          >
            Press <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Releases</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Stay updated with our latest organizational statements, curriculum reforms, policy alignments, and strategic reviews.
          </motion.p>
        </div>

        {/* --- 6-Card Asymmetric Collage Grid (Press Release Version) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-stretch">

          {/* Column 1: Card 1 (Gradient Highlight - centered vertically) */}
          <div className="lg:col-span-3 py-6 flex flex-col justify-center">
            {pressReleases[0] && (
              <div
                onClick={() => setSelectedRelease(pressReleases[0])}
                className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-gradient-to-br from-indigo-600 to-blue-700 text-white p-6 flex flex-col justify-between aspect-[4/3] w-full border border-indigo-500/20"
              >
                <div>
                  <span className="px-2.5 py-0.5 bg-white/20 rounded-full text-[9px] font-bold uppercase tracking-wider block w-fit mb-3">
                    {pressReleases[0].category}
                  </span>
                  <h3 className="text-sm font-black tracking-tight leading-snug line-clamp-3 group-hover:text-blue-200 transition-colors">
                    {pressReleases[0].title}
                  </h3>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                  <span className="text-[10px] text-white/70 font-semibold uppercase">{pressReleases[0].date}</span>
                  <button
                    onClick={(e) => handleDownload(e, pressReleases[0])}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all shadow"
                  >
                    <FileDown size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Column 2: Card 2 (Tall Portrait Image Overlay) & Card 4 (Slate Dark Block) */}
          <div className="lg:col-span-3 flex flex-col gap-8 justify-between">
            {/* Card 2 - Image with text overlay */}
            {pressReleases[1] && (
              <div
                onClick={() => setSelectedRelease(pressReleases[1])}
                className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-200/50 aspect-[3/4] w-full"
              >
                <img
                  src={pressReleases[1].image}
                  alt={pressReleases[1].title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent flex flex-col justify-end p-6" />
                <div className="absolute inset-0 flex flex-col justify-between p-6 z-10 text-white">
                  <span className="px-2.5 py-0.5 bg-indigo-500 rounded-full text-[9px] font-bold uppercase tracking-wider block w-fit">
                    {pressReleases[1].category}
                  </span>
                  <div>
                    <h3 className="text-sm font-black tracking-tight leading-snug line-clamp-3 mb-3">
                      {pressReleases[1].title}
                    </h3>
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <span className="text-[10px] text-white/60 font-semibold uppercase">{pressReleases[1].date}</span>
                      <button
                        onClick={(e) => handleDownload(e, pressReleases[1])}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                      >
                        <FileDown size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Card 4 - Dark Slate Card */}
            {pressReleases[3] && (
              <div
                onClick={() => setSelectedRelease(pressReleases[3])}
                className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-slate-900 text-white p-6 flex flex-col justify-between aspect-square w-full border border-slate-800"
              >
                <div>
                  <span className="px-2.5 py-0.5 bg-slate-800 text-indigo-400 rounded-full text-[9px] font-bold uppercase tracking-wider block w-fit mb-3">
                    {pressReleases[3].category}
                  </span>
                  <h3 className="text-sm font-bold tracking-tight leading-snug line-clamp-3 group-hover:text-indigo-400 transition-colors">
                    {pressReleases[3].title}
                  </h3>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">{pressReleases[3].date}</span>
                  <button
                    onClick={(e) => handleDownload(e, pressReleases[3])}
                    className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-all"
                  >
                    <FileDown size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Column 3: Card 3 (Glassmorphic) & Card 5 (Glassmorphic) */}
          <div className="lg:col-span-3 flex flex-col gap-8 justify-between">
            {/* Card 3 - White Glass Panel */}
            {pressReleases[2] && (
              <div
                onClick={() => setSelectedRelease(pressReleases[2])}
                className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white/90 backdrop-blur-md p-6 flex flex-col justify-between aspect-[4/3] w-full border border-slate-200"
              >
                <div>
                  <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-600 rounded-full text-[9px] font-bold uppercase tracking-wider block w-fit mb-3">
                    {pressReleases[2].category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-800 tracking-tight leading-snug line-clamp-3 group-hover:text-indigo-600 transition-colors">
                    {pressReleases[2].title}
                  </h3>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">{pressReleases[2].date}</span>
                  <button
                    onClick={(e) => handleDownload(e, pressReleases[2])}
                    className="p-2 rounded-full bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition-all border border-slate-200"
                  >
                    <FileDown size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* Card 5 - White Glass Panel */}
            {pressReleases[4] && (
              <div
                onClick={() => setSelectedRelease(pressReleases[4])}
                className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white/90 backdrop-blur-md p-6 flex flex-col justify-between aspect-[4/3] w-full border border-slate-200"
              >
                <div>
                  <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-600 rounded-full text-[9px] font-bold uppercase tracking-wider block w-fit mb-3">
                    {pressReleases[4].category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-800 tracking-tight leading-snug line-clamp-3 group-hover:text-indigo-600 transition-colors">
                    {pressReleases[4].title}
                  </h3>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">{pressReleases[4].date}</span>
                  <button
                    onClick={(e) => handleDownload(e, pressReleases[4])}
                    className="p-2 rounded-full bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition-all border border-slate-200"
                  >
                    <FileDown size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Column 4: Card 6 (Blurred Classroom Image Overlay - centered vertically) */}
          <div className="lg:col-span-3 py-6 flex flex-col justify-center">
            {pressReleases[5] && (
              <div
                onClick={() => setSelectedRelease(pressReleases[5])}
                className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-200/50 aspect-[4/3] w-full"
              >
                <img
                  src={pressReleases[5].image}
                  alt={pressReleases[5].title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent flex flex-col justify-end" />

                {/* Centered Read expand icon matching reference layout */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/35 transition-colors duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white scale-90 group-hover:scale-100 group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all duration-300 shadow-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4M4 20l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                    </svg>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white z-10 pointer-events-none">
                  <span className="px-2.5 py-0.5 bg-indigo-500 rounded-full text-[9px] font-bold uppercase tracking-wider block w-fit mb-1.5">
                    {pressReleases[5].category}
                  </span>
                  <span className="text-xs font-bold line-clamp-1 opacity-90">{pressReleases[5].title}</span>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Press Release Reading Lightbox Drawer */}
      <AnimatePresence>
        {selectedRelease && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 md:p-8"
            onClick={() => setSelectedRelease(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="bg-white max-w-2xl w-full rounded-[32px] overflow-hidden shadow-2xl relative border border-slate-100 flex flex-col max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >

              {/* Close Button */}
              <button
                onClick={() => setSelectedRelease(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 rounded-full flex items-center justify-center transition-all z-20"
              >
                <X size={18} />
              </button>

              {/* Banner/Header */}
              <div className="p-8 md:p-10 bg-slate-50 border-b border-slate-100">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-extrabold uppercase tracking-widest block w-fit mb-4">
                  {selectedRelease.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-800 leading-snug">
                  {selectedRelease.title}
                </h2>
                <div className="flex items-center gap-2 mt-4 text-xs font-bold text-slate-400">
                  <Calendar size={14} className="text-indigo-500" />
                  <span className="uppercase">{selectedRelease.date}</span>
                </div>
              </div>

              {/* Excerpt/Body */}
              <div className="p-8 md:p-10 overflow-y-auto space-y-6 flex-grow custom-scrollbar">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Official Excerpt</h4>
                  <p className="text-base text-slate-600 leading-relaxed font-light">
                    {selectedRelease.excerpt}
                  </p>
                </div>
                <div className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                  <p className="text-xs text-indigo-700 font-medium leading-relaxed">
                    This is an official media briefing published by the Bihar State Text Book Publishing Corporation (BSTPC). You can download the complete press kit including images and statements below.
                  </p>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 md:p-8 border-t border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                  <FileText size={14} className="text-indigo-500" />
                  <span>Size: {selectedRelease.fileSize}</span>
                </div>
                <button
                  onClick={(e) => handleDownload(e, selectedRelease)}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-full text-xs font-extrabold uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-md shadow-indigo-500/10 flex items-center gap-2"
                >
                  <FileDown size={14} /> Download Press Release
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Pressrelease;
