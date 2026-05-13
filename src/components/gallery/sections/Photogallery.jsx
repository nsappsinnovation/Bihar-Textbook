import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const galleryItems = [
  {
    type: "image",
    src: "/images/hero_classroom.png",
    span: "col-span-1 md:col-span-2 row-span-2",
    alt: "Bihar Text Book Corporation"
  },
  {
    type: "image",
    src: "/images/hero_digital.png",
    span: "col-span-1 md:col-span-1 row-span-1",
    alt: "Digital"
  },
  {
    type: "image",
    src: "/images/hero_ai_new.png",
    span: "col-span-1 md:col-span-1 row-span-1",
    alt: "AI"
  },
  {
    type: "image",
    src: "/images/hero_audio_new.png",
    span: "col-span-1 md:col-span-1 row-span-2",
    alt: "Audio"
  },
  {
    type: "image",
    src: "/images/hero_archive.png",
    span: "col-span-1 md:col-span-2 row-span-1",
    alt: "Archive"
  },
  {
    type: "image",
    src: "/images/s1.png",
    span: "col-span-1 md:col-span-1 row-span-1",
    alt: "Learning Session 1"
  },
  {
    type: "image",
    src: "/images/hero_linguistic.png",
    span: "col-span-1 md:col-span-2 row-span-2",
    alt: "Linguistic"
  },
  {
    type: "image",
    src: "/images/s2.png",
    span: "col-span-1 md:col-span-1 row-span-1",
    alt: "Learning Session 2"
  },
  {
    type: "image",
    src: "/images/s3.png",
    span: "col-span-1 md:col-span-1 row-span-1",
    alt: "Learning Session 3"
  },
  {
    type: "image",
    src: "/images/hero_sign.png",
    span: "col-span-1 md:col-span-2 row-span-1",
    alt: "Sign Language"
  },
  {
    type: "image",
    src: "/images/s4.png",
    span: "col-span-1 md:col-span-1 row-span-2",
    alt: "Learning Session 4"
  },
  {
    type: "image",
    src: "/images/hero_vr_new.png",
    span: "col-span-1 md:col-span-2 row-span-2",
    alt: "VR Learning"
  },
  {
    type: "image",
    src: "/images/sign.png",
    span: "col-span-1 md:col-span-1 row-span-1",
    alt: "Initiatives"
  },
  {
    type: "image",
    src: "/images/hello.png",
    span: "col-span-1 md:col-span-1 row-span-1",
    alt: "Hello"
  },
];

const Photogallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [items, setItems] = useState(galleryItems);

  useEffect(() => {
    const saved = localStorage.getItem('module_content_gl-photo');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Map stored format back to component format
      setItems(parsed.map(item => ({
        type: "image",
        src: item.document,
        span: item.span || "col-span-1 md:col-span-1 row-span-1",
        alt: item.title
      })));
    }
  }, []);

  return (
    <section className="w-full bg-white relative py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 font-sans">
        {/* Header */}
        <div className="mb-14 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-blue-50 border border-blue-100 mb-6 shadow-sm"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-blue-800 text-sm font-semibold tracking-wide uppercase">
              Visual Highlights
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1a202c] tracking-tight leading-tight mb-6"
          >
            Photo <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Gallery</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed"
          >
            A visual journey through our initiatives, memorable events, and the remarkable people driving our mission forward.
          </motion.p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-flow-dense grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4 md:gap-6">
          {/* Items */}
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer ${item.span}`}
              onClick={() => setSelectedImage(item)}
              layoutId={`gallery-image-${index}`}
            >
              <motion.img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
                layoutId={`gallery-img-src-${index}`}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                <div className="p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-1.5 w-max">
                    <span className="text-white text-xs font-semibold tracking-wider uppercase">
                      View Image
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 lg:top-10 lg:right-10 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 backdrop-blur-md transition-all z-50"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 lg:h-8 lg:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <motion.div
              layoutId={`gallery-image-${galleryItems.findIndex(i => i.src === selectedImage.src)}`}
              className="relative max-w-5xl w-full h-[80vh] flex items-center justify-center rounded-2xl overflow-hidden cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                layoutId={`gallery-img-src-${galleryItems.findIndex(i => i.src === selectedImage.src)}`}
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-full object-contain drop-shadow-2xl rounded-xl"
              />

              {/* Optional: Add caption in modal */}
              {selectedImage.alt && (
                <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                  <span className="bg-black/50 text-white/90 backdrop-blur-md px-6 py-2 rounded-full text-sm font-medium border border-white/10 shadow-lg">
                    {selectedImage.alt}
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Photogallery;
