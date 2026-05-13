import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';

// Reusing the same grid layout logic, but for videos
const videoItems = [
  {
    type: "video",
    src: "/gallery/biharFilmCityMeeting.jpeg",
    span: "col-span-1 md:col-span-2 row-span-2",
    alt: "Bihar Film City Meeting"
  },
  {
    type: "video",
    src: "/gallery/WhatsApp Image 2025-12-12 at 17.01.59.jpeg",
    span: "col-span-1 md:col-span-1 row-span-1",
    alt: "Video Gallery Image"
  },
  {
    type: "video",
    src: "/gallery/WhatsApp Image 2025-12-12 at 17.02.01.jpeg",
    span: "col-span-1 md:col-span-1 row-span-1",
    alt: "Video Gallery Image"
  },
  {
    type: "video",
    src: "/gallery/rubymam.jpeg",
    span: "col-span-1 md:col-span-1 row-span-2",
    alt: "Ruby Mam"
  },
  {
    type: "video",
    src: "/gallery/rubymam2.jpeg",
    span: "col-span-1 md:col-span-2 row-span-1",
    alt: "Ruby Mam"
  },
  {
    type: "video",
    src: "/gallery/WhatsApp Image 2025-12-12 at 17.02.07.jpeg",
    span: "col-span-1 md:col-span-1 row-span-1",
    alt: "Video Gallery Image"
  },
  {
    type: "video",
    src: "/gallery/WhatsApp Image 2025-12-12 at 17.02.09.jpeg",
    span: "col-span-1 md:col-span-2 row-span-2",
    alt: "Video Gallery Image"
  },
  {
    type: "video",
    src: "/gallery/WhatsApp Image 2025-12-12 at 17.02.10.jpeg",
    span: "col-span-1 md:col-span-1 row-span-1",
    alt: "Video Gallery Image"
  },
  {
    type: "video",
    src: "/gallery/WhatsApp Image 2025-12-12 at 17.02.12.jpeg",
    span: "col-span-1 md:col-span-1 row-span-1",
    alt: "Video Gallery Image"
  },
  {
    type: "video",
    src: "/gallery/WhatsApp Image 2025-12-12 at 17.02.13.jpeg",
    span: "col-span-1 md:col-span-2 row-span-1",
    alt: "Video Gallery Image"
  },
  {
    type: "video",
    src: "/gallery/WhatsApp Image 2025-12-12 at 17.02.04.jpeg",
    span: "col-span-1 md:col-span-1 row-span-2",
    alt: "Video Gallery Image"
  },
  {
    type: "video",
    src: "/gallery/WhatsApp Image 2025-12-12 at 17.02.15.jpeg",
    span: "col-span-1 md:col-span-2 row-span-2",
    alt: "Video Gallery Image"
  },
  {
    type: "video",
    src: "/gallery/WhatsApp Image 2025-12-12 at 17.02.17.jpeg",
    span: "col-span-1 md:col-span-1 row-span-1",
    alt: "Video Gallery Image"
  },
  {
    type: "video",
    src: "/gallery/WhatsApp Image 2025-12-12 at 17.02.15.jpeg",
    span: "col-span-1 md:col-span-1 row-span-1",
    alt: "Video Gallery Image"
  },
];

const Videogallery = () => {
  const [items, setItems] = useState(videoItems);

  useEffect(() => {
    const saved = localStorage.getItem('module_content_gl-video');
    if (saved) {
      const parsed = JSON.parse(saved);
      setItems(parsed.map(item => ({
        type: "video",
        src: item.document, // Thumbnail
        videoUrl: item.videoUrl || "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        span: "col-span-1 md:col-span-1 row-span-1",
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
              Video Testimonials & Highlights
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1a202c] tracking-tight leading-tight mb-6"
          >
            Video <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Gallery</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed"
          >
            Watch our initiatives come to life through exclusive footage and recorded events.
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
              onClick={() => window.open(item.videoUrl, '_blank')}
            >
              {/* Thumbnail */}
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Always visible gradient for contrast */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-500 shadow-xl">
                  <FaPlay className="text-white ml-1.5 w-6 h-6" />
                </div>
              </div>

              {/* Hover info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                <div className="p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 w-max">
                    <span className="text-white text-xs font-semibold tracking-wider uppercase">
                      Watch Video
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Videogallery;
