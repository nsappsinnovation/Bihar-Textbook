import React, { useState, useEffect } from 'react';
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
    cardStyle: "gradient", // Solid blue/indigo gradient
    image: "/images/hero/classroom.webp"
  },
  {
    id: 2,
    date: "September 28, 2025",
    title: "New Curriculum Guidelines Released for Upcoming Academic Year",
    excerpt: "Updated guidelines emphasize regional history, environmental awareness, and foundational literacy skills. All textbooks have been revised accordingly.",
    category: "Curriculum",
    fileSize: "4.5 MB",
    cardStyle: "image", // Library image background
    image: "/images/hero/audio.webp"
  },
  {
    id: 3,
    date: "August 10, 2025",
    title: "Partnership Announced with National Digital Library",
    excerpt: "To expand access to supplementary reading materials across remote districts, a strategic partnership has been formalized.",
    category: "Partnerships",
    fileSize: "800 KB",
    cardStyle: "glass", // White glass panel
    image: "/images/hero/vr.webp"
  },
  {
    id: 4,
    date: "July 22, 2025",
    title: "Annual Board Meeting Summary and Future Outlook",
    excerpt: "Key stakeholders convened to discuss the previous quarter's achievements and outline strategic directions for upcoming distributions.",
    category: "Corporate",
    fileSize: "2.1 MB",
    cardStyle: "dark", // Dark slate block
    image: "/images/hero/sign.webp"
  },
  {
    id: 5,
    date: "May 10, 2025",
    title: "NEP 2020 Textbook Alignment Milestone Completed",
    excerpt: "The corporation has successfully completed the alignment of all primary and secondary level textbooks with the New Education Policy 2020 standards.",
    category: "Reform",
    fileSize: "3.4 MB",
    cardStyle: "glass", // White glass panel
    image: "/images/hero/linguistic.webp"
  }
];

const Pressrelease = () => {
  const [selectedRelease, setSelectedRelease] = useState(null);
  const [items, setItems] = useState(pressReleases);

  useEffect(() => {
    const loadData = () => {
      const saved = localStorage.getItem('module_content_gl-press');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && Array.isArray(parsed)) {
            setItems(parsed.map((item, index) => ({
              id: item.id || Date.now() + index,
              date: item.date ? new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
              title: item.title || "Press Release",
              excerpt: item.desc || "Official press release.",
              category: item.category || "General",
              fileSize: "1.2 MB",
              cardStyle: index % 3 === 0 ? "gradient" : index % 3 === 1 ? "image" : "glass",
              image: item.document || null,
              fileUrl: item.document
            })));
          }
        } catch (e) {
          console.error("Error parsing press release items", e);
        }
      }
    };
    
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const handleDownload = (e, release) => {
    e.stopPropagation();
    // Simulate file download
    const link = document.createElement("a");
    link.href = "/printer.pdf";
    link.download = `BSTBPC_PressRelease_${release.id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const RenderCard = ({ item, aspectClass }) => {
    const hasImage = !!item.image;
    
    return (
      <div
        onClick={() => setSelectedRelease(item)}
        className={`group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer w-full border ${aspectClass} ${hasImage ? 'border-slate-800' : 'bg-white border-slate-200'}`}
      >
        {hasImage ? (
          <>
            {/* Image Version */}
            <img loading="lazy" decoding="async"
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent flex flex-col justify-end p-6" />
            <div className="absolute inset-0 flex flex-col justify-between p-6 z-10 text-white">
              <span className="px-2.5 py-0.5 bg-blue-500 rounded-full text-[9px] font-bold uppercase tracking-wider block w-fit shadow-sm">
                {item.category}
              </span>
              <div>
                <h3 className="text-sm font-black tracking-tight leading-snug line-clamp-3 mb-3 group-hover:text-blue-200 transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between pt-3 border-t border-white/20">
                  <span className="text-[10px] text-white/70 font-semibold uppercase">{item.date}</span>
                  <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm">
                    <FileDown size={14} />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* White Background Version */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between bg-white text-slate-800">
              <span className="px-2.5 py-0.5 bg-blue-50 text-blue-600 rounded-full text-[9px] font-bold uppercase tracking-wider block w-fit mb-3 border border-blue-100">
                {item.category}
              </span>
              <div>
                <h3 className="text-sm font-black tracking-tight leading-snug line-clamp-3 mb-3 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="text-[10px] text-slate-500 font-semibold uppercase">{item.date}</span>
                  <button className="p-2 rounded-full bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-blue-600 transition-all border border-slate-200">
                    <FileDown size={14} />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <section className="w-full bg-white relative pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden min-h-screen">

      {/* Grid background & shapes */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-75 pointer-events-none" />
      <div className="absolute right-[-100px] top-1/4 w-80 h-80 border border-slate-200/50 rounded-[48px] rotate-[15deg] pointer-events-none" />
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
            Press <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Releases</span>
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

        {/* --- Simple Card Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col">
              <RenderCard item={item} aspectClass="aspect-[4/3]" />
            </div>
          ))}
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

              {/* Cover Image Header */}
              <div className="w-full h-48 md:h-64 relative shrink-0">
                <img loading="lazy" decoding="async" src={selectedRelease.image} alt={selectedRelease.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                <button
                  onClick={() => setSelectedRelease(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/30 text-white rounded-full flex items-center justify-center transition-all z-20 shadow-lg"
                >
                  <X size={18} />
                </button>
                
                {/* Overlay Text in Header */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur text-white rounded-full text-[10px] font-extrabold uppercase tracking-widest block w-fit mb-3 border border-white/20">
                    {selectedRelease.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black text-white leading-snug drop-shadow-md">
                    {selectedRelease.title}
                  </h2>
                  <div className="flex items-center gap-2 mt-4 text-xs font-bold text-slate-300">
                    <Calendar size={14} className="text-blue-400" />
                    <span className="uppercase">{selectedRelease.date}</span>
                  </div>
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
                <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                  <p className="text-xs text-blue-700 font-medium leading-relaxed">
                    This is an official media briefing published by the Bihar State Text Book Publishing Corporation (BSTBPC). You can download the complete press kit including images and statements below.
                  </p>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 md:p-8 border-t border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                  <FileText size={14} className="text-blue-500" />
                  <span>Size: {selectedRelease.fileSize}</span>
                </div>
                <button
                  onClick={(e) => handleDownload(e, selectedRelease)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-full text-xs font-extrabold uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-500/10 flex items-center gap-2"
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
