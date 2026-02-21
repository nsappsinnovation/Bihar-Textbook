import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiCalendar, FiFileText, FiArrowRight } from 'react-icons/fi';

const pressReleases = [
  {
    id: 1,
    date: "October 15, 2025",
    title: "Launch of Digital Learning Initiatives Across 500 Schools",
    excerpt: "The State Text Book Publishing Corporation today announced a major rollout of VR and AR educational tools, aiming to modernize learning infrastructure in rural districts.",
    category: "Initiatives",
    fileSize: "1.2 MB",
  },
  {
    id: 2,
    date: "September 28, 2025",
    title: "New Curriculum Guidelines Released for Upcoming Academic Year",
    excerpt: "Updated guidelines emphasize regional history, environmental awareness, and foundational literacy skills. All textbooks have been revised accordingly.",
    category: "Curriculum",
    fileSize: "4.5 MB",
  },
  {
    id: 3,
    date: "August 10, 2025",
    title: "Partnership announced with National Digital Library",
    excerpt: "To provide uninterrupted access to study materials, we have integrated our entire digital repository with the National Digital Library platform.",
    category: "Partnerships",
    fileSize: "800 KB",
  },
  {
    id: 4,
    date: "July 22, 2025",
    title: "Annual Board Meeting Summary and Future Outlook",
    excerpt: "Key decisions from the Q3 board meeting, including increased budgets for audiobooks and specialized learning resources for differently-abled students.",
    category: "Corporate",
    fileSize: "2.1 MB",
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const Pressrelease = () => {
  return (
    <section className="w-full bg-[#f8fafc] relative py-16 lg:py-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10 font-sans">

        {/* Header */}
        <div className="mb-16 text-center lg:text-left flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-6"
            >
              <FiFileText className="text-indigo-600" />
              <span className="text-indigo-800 text-sm font-semibold tracking-wide uppercase">
                Official Communications
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-[#1a202c] tracking-tight leading-tight mb-4"
            >
              Press <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Releases</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 text-lg font-light leading-relaxed"
            >
              Stay updated with our latest announcements, reports, and official press statements.
            </motion.p>
          </div>

          {/* Optional aesthetic element or search (placeholder) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden lg:block p-6 rounded-2xl bg-white border border-gray-100 shadow-sm w-72"
          >
            <h4 className="text-sm font-bold text-gray-900 mb-2">Media Enquiries</h4>
            <p className="text-xs text-gray-500 mb-4">For press access and media kits, please reach out to our PR team.</p>
            <button className="text-sm text-indigo-600 font-semibold flex items-center gap-1 hover:text-indigo-800 transition-colors">
              Contact PR <FiArrowRight />
            </button>
          </motion.div>
        </div>

        {/* List Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col gap-6"
        >
          {pressReleases.map((press) => (
            <motion.div
              key={press.id}
              variants={itemVariants}
              className="group bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-10px_rgba(79,70,229,0.15)] hover:border-indigo-100 transition-all duration-300 flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center relative overflow-hidden"
            >
              {/* Decorative Left Border */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-500 to-purple-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />

              {/* Date/Category Column */}
              <div className="flex-shrink-0 w-full md:w-48 flex flex-col gap-2 relative z-10">
                <span className="inline-flex items-center justify-center w-max px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 rounded-md">
                  {press.category}
                </span>
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mt-1">
                  <FiCalendar className="w-4 h-4" />
                  {press.date}
                </div>
              </div>

              {/* Content Column */}
              <div className="flex-grow relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300 leading-snug">
                  {press.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed font-light">
                  {press.excerpt}
                </p>
              </div>

              {/* Action Button */}
              <div className="flex-shrink-0 w-full md:w-auto flex justify-end mt-4 md:mt-0 relative z-10">
                <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-50 text-gray-700 font-semibold text-sm hover:bg-indigo-600 hover:text-white transition-all duration-300 border border-gray-200 hover:border-transparent group/btn">
                  <FiDownload className="text-lg group-hover/btn:-translate-y-0.5 transition-transform" />
                  <span>Download PDF</span>
                  <span className="text-xs font-normal opacity-70 ml-1">({press.fileSize})</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <button className="px-8 py-3 rounded-full text-indigo-600 font-semibold border-2 border-indigo-100 hover:border-indigo-600 hover:bg-indigo-50 transition-all duration-300 flex items-center gap-2">
            Load More Releases
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default Pressrelease;
