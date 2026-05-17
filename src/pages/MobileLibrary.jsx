
import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

import { BookOpen, Map, Users, ShieldCheck, ArrowLeft, ArrowRight, CheckCircle2, FileText, Globe, Truck, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const MobileLibrary = () => {

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
      label: "Coverage",
      value: "500+",
      sub: "Villages Reached",
      icon: <Map size={20} />
    },
    {
      label: "Books",
      value: "10K+",
      sub: "Distributed Monthly",
      icon: <BookOpen size={20} />
    },
    {
      label: "Readers",
      value: "20K+",
      sub: "Students Engaged",
      icon: <Users size={20} />
    },
    {
      label: "Vehicles",
      value: "50+",
      sub: "Mobile Units",
      icon: <Truck size={20} />
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
      title: "Route Planning",
      image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=600", 
      description: "Strategically planning routes to reach the most remote and underserved areas across Bihar.",
      details: [
        "GPS Mapping",
        "Schedule Optimization",
        "Community Requests"
      ],
    },
    {
      title: "Book Selection",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=600",
      description: "Curating a diverse collection of books suitable for various age groups and interests.",
      details: [
        "Regional Languages",
        "Educational Materials",
        "Storybooks"
      ],
    },
    {
      title: "Community Outreach",
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600",
      description: "Engaging with local communities to promote literacy and reading habits through storytelling.",
      details: [
        "Reading Clubs",
        "Storytelling Sessions",
        "Parent Awareness"
      ],
    },
    {
      title: "Digital Access",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600",
      description: "Providing access to digital resources and tablets within our specialized mobile units.",
      details: [
        "E-Books",
        "Internet Access",
        "Digital Literacy"
      ],
    },
  ];

  return (
    <div className="relative">
      {/* Back Button */}
      <button 
        onClick={() => navigate("/")} 
        className="absolute top-6 left-6 md:left-12 lg:left-16 w-11 h-11 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-blue-500 hover:shadow-lg transition-all border border-slate-50 z-50 group"
      >
        <ArrowLeft size={22} strokeWidth={2.5} className="group-hover:-translate-x-1 transition-transform" />
      </button>

      <div className="min-h-screen bg-white flex items-center py-5 pt-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* LEFT: Image */}
          <div className="flex justify-center">
            <img
              src="/images/mobile/mobile-library.png"
              alt="Mobile Library Illustration"
              className="w-[620px] h-auto object-contain"
            />
          </div>

          {/* RIGHT: Content */}
          <div>
            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              Mobile Library Services
            </h1>

            {/* Highlight text */}
            <p className="mt-4 text-lg font-semibold text-blue-500">
              Bringing Knowledge to Your Doorstep
            </p>

            {/* Description */}
            <p className="mt-4 text-slate-600 max-w-md">
              Our fleet of mobile libraries travels to remote villages, ensuring every child has access to quality books and learning materials.
            </p>

            {/* Action Button */}
            <div className="mt-8">
              <Link to="/mobile-library-dashboard">
                <button className="px-8 py-4 bg-blue-600 text-white rounded-full text-sm font-black uppercase tracking-widest hover:bg-slate-900 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-blue-200 flex items-center gap-2">
                  Start Learning <ArrowRight size={18} />
                </button>
              </Link>
            </div>

            {/* Feature Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Card 1 */}
              <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                <div className="text-blue-500 text-xl"><Truck size={24} /></div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Accessibility
                  </h3>
                  <p className="text-sm text-slate-600">
                    Reaching the most remote areas of the state to ensure no child is left behind in education.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                <div className="text-blue-500 text-xl"><BookOpen size={24} /></div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Diverse Collection
                  </h3>
                  <p className="text-sm text-slate-600">
                    A wide range of books for all ages, including academic texts, fiction, and regional literature.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="md:col-span-2 p-5 border rounded-xl shadow-sm flex gap-4">
                <div className="text-blue-500 text-xl"><Globe size={24} /></div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Community Impact
                  </h3>
                  <p className="text-sm text-slate-600">
                    Fostering a deep-rooted culture of reading and lifelong learning in rural communities.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      
      <section className="py-10 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left Content */}
            <div className="space-y-10">
              <div className="space-y-4">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">
                  Program Overview
                </h2>
                <h3 className="text-4xl font-extrabold text-slate-900 leading-tight">
                  Education Without{" "}
                  <br />
                  <span className="text-slate-400">
                    Boundaries
                  </span>
                </h3>
              </div>

              <p className="text-lg text-slate-600 leading-relaxed font-light">
                The Mobile Library initiative is dedicated to taking the library directly to the people. We believe that distance should never be a barrier to education. Our units are equipped with books and digital tools.
              </p>

              <div className="space-y-4">
                {[
                  "Regularly scheduled visits to remote and underserved villages",
                  "Access to curriculum-based textbooks and fictional literature",
                  "Interactive storytelling sessions and reading workshops",
                  "Digital literacy programs with access to E-books and tablets"
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
                src="/images/mobile/mobile_library_outreach.jpg"
                alt="Mobile Outreach"
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
                Library Operations
              </h2>
             <h3 className="text-4xl font-extrabold text-slate-900 leading-tight">
                Knowledge on Wheels Journey
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

export default MobileLibrary;
