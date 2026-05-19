
import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

import { BookOpen, Map, Users, ShieldCheck, ArrowLeft, ArrowRight, CheckCircle2, FileText, Globe, Landmark, Scroll, Database, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const HeritageArchive = () => {

  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -380, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 380, behavior: "smooth" });
  };

  const stats = [
    {
      label: "Manuscripts",
      value: "2K+",
      sub: "Preserved Documents",
      icon: <Scroll size={20} />
    },
    {
      label: "History",
      value: "100+",
      sub: "Years of Records",
      icon: <Landmark size={20} />
    },
    {
      label: "Digital",
      value: "5TB+",
      sub: "Archived Data",
      icon: <Database size={20} />
    },
    {
      label: "Access",
      value: "Free",
      sub: "Public Domain",
      icon: <BookOpen size={20} />
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const processSteps = [
    {
      title: "Document Collection",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=600", 
      description: "Gathering historical textbooks, manuscripts, and educational records from across Bihar.",
      details: [
        "Sourcing Artifacts",
        "Historical Verification",
        "Conservation Cleaning"
      ],
    },
    {
      title: "Digitization Phase",
      image: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=600",
      description: "High-resolution scanning and OCR processing to convert physical copies into digital formats.",
      details: [
        "Pro-grade Scanning",
        "OCR Processing",
        "Metadata Tagging"
      ],
    },
    {
      title: "Digital Cataloging",
      image: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=600",
      description: "Organizing digital assets into a searchable and structured database for global access.",
      details: [
        "Index Creation",
        "Smart Categorization",
        "Cross-referencing"
      ],
    },
    {
      title: "Public Access Portal",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600",
      description: "Making the archive available to researchers, students, and historians worldwide online.",
      details: [
        "Interactive Web Portal",
        "Advanced Search Tools",
        "Open Download Options"
      ],
    },
  ];

  return (
    <div className="relative">
      {/* Back Button */}
      <button 
        onClick={() => navigate("/")} 
        className="absolute top-4 left-4 md:left-6 lg:left-8 w-11 h-11 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-blue-500 hover:shadow-lg transition-all border border-slate-50 z-50 group"
      >
        <ArrowLeft size={22} strokeWidth={2.5} className="group-hover:-translate-x-1 transition-transform" />
      </button>

      <div className="bg-white flex items-center pt-16 pb-0">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* LEFT: Image */}
          <div className="flex justify-center -mt-20">
            <img
              src="/images/heritage/heritage archive.png"
              alt="Heritage Archive Illustration"
              className="w-[620px] h-auto object-contain"
            />
          </div>

          {/* RIGHT: Content */}
          <div>
            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              Education Heritage Archive
            </h1>

            {/* Highlight text */}
            <p className="mt-4 text-lg font-semibold text-blue-500">
              Preserving the Legacy of Education
            </p>

            {/* Description */}
            <p className="mt-4 text-slate-600 max-w-md">
              A centralized digital repository safeguarding Bihar's rich educational history and artifacts for future generations.
            </p>

            {/* Action Button */}
            <div className="mt-8">
              <Link to="/heritage-dashboard">
                <button className="px-8 py-4 bg-blue-600 text-white rounded-full text-sm font-black uppercase tracking-widest hover:bg-slate-900 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-blue-200 flex items-center gap-2">
                  Start Learning <ArrowRight size={18} />
                </button>
              </Link>
            </div>

            {/* Feature Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Card 1 */}
              <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                <div className="text-blue-500 text-xl"><Landmark size={24} /></div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Historical Preservation
                  </h3>
                  <p className="text-sm text-slate-600">
                    Protection and preservation of rare books, manuscripts, and fragile documents.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                <div className="text-blue-500 text-xl"><Database size={24} /></div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Digital Accessibility
                  </h3>
                  <p className="text-sm text-slate-600">
                    High-quality digital versions accessible to everyone, anywhere in the world.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="md:col-span-2 p-5 border rounded-xl shadow-sm flex gap-4">
                <div className="text-blue-500 text-xl"><Search size={24} /></div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Research Ready
                  </h3>
                  <p className="text-sm text-slate-600">
                    A searchable database designed specifically for historians, researchers, and academicians.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      
      <section className="pt-20 pb-10 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">
                  Program Overview
                </h2>
                <h3 className="text-4xl font-extrabold text-slate-900 leading-tight">
                  Saving Our Educational{" "}
                  <br />
                  <span className="text-slate-400">
                    History
                  </span>
                </h3>
              </div>

              <p className="text-lg text-slate-600 leading-relaxed font-light">
                The Heritage Archive project is a monumental effort to digitize and preserve the educational artifacts of the region. From ancient manuscripts to early textbooks, we are ensuring knowledge of the past is preserved.
              </p>

              <div className="space-y-4">
                {[
                  "Active preservation of rare and fragile educational documents",
                  "High-quality digital scanning for maximum detail retention",
                  "Global online public access to historical educational records",
                  "Comprehensive educational resource for researchers and students"
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-sm font-bold text-slate-700"
                  >
                    <CheckCircle2 size={18} className="text-blue-600" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative group overflow-hidden rounded-[40px] shadow-xl border border-slate-100">
              <img
                src="/assets/library-heritage.png"
                alt="Archive Preservation"
                className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>

          </div>
        </div>
      </section>

      <section className="py-10 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="space-y-4">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">
                Preservation Workflow
              </h2>
             <h3 className="text-4xl font-extrabold text-slate-900 leading-tight">
                Historical Archiving Journey
              </h3>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              <button
                onClick={scrollLeft}
                className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={scrollRight}
                className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Carousel Track */}
          <div
            ref={sliderRef}
            className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-8 no-scrollbar"
          >
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: i * 0.1 }}
                className="snap-start flex-shrink-0 w-[75%] sm:w-[50%] lg:w-[23%]
                         bg-white border border-slate-200 p-8 rounded-[32px] 
                         shadow-xl hover:shadow-xl transition-all duration-500 group relative flex flex-col"
              >
                {/* Image */}
                <div className="mb-8 rounded-2xl overflow-hidden aspect-[4/3] bg-slate-50 flex items-center justify-center">
                  <img
                    src={step.image}
                    alt={step.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="space-y-4 mb-8 flex-grow">
                  <h4 className="text-xl font-bold text-slate-900 leading-tight">
                    {step.title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>


              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>

  )
}

export default HeritageArchive;
