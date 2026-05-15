import React, { useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Award, Users, Printer, Truck, ShieldCheck, ArrowLeft, ArrowRight, History, Target, CheckCircle2, FileText, Globe, Languages, Library } from 'lucide-react';
import { motion } from 'framer-motion';

const Signlanguage = () => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -380, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 380, behavior: "smooth" });
  };

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
      title: "Sign Language Basics: Numbers (1-10)",
      image: "/images/s1.png",
      description: "Visual introduction to numbers 1 to 10 using clear and easy-to-follow sign language gestures.",
    },
    {
      title: "Hindi Swar (स्वर) in Sign Language",
      image: "/images/s2.png",
      description: "Visual learning of Hindi vowels from अ to अं (अंग) using clear and expressive sign language gestures.",
    },
    {
      title: "Greetings in Sign Language: Good Morning",
      image: "/images/s3.png",
      description: "Step-by-step demonstration of how to sign common greetings like 'Good Morning' clearly.",
    },
    {
      title: "Sign Language Alphabets (A-Z)",
      image: "/images/s4.png",
      description: "Complete visual guide to signing alphabets from A to Z for spelling and name signs.",
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

      {/* Hero Section */}
      <div className="bg-white flex items-center pb-2 pt-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* LEFT: Image */}
          <div className="flex justify-center">
            <img
              src="/images/hello.png"
              alt="Sign Language Illustration"
              className="w-[420px] h-auto object-contain object-top max-h-[420px]"
            />
          </div>

          {/* RIGHT: Content */}
          <div className=" -mt-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              Learn Sign Language
            </h1>

            <p className="mt-4 text-lg font-semibold text-blue-500">
              Master ASL with Fun and Engaging Lessons!
            </p>

            <p className="mt-4 text-slate-600 max-w-md">
              Interactive and engaging lessons designed for 8th to 12th class students.
            </p>

            <div className="mt-4">
              <Link to="/sign-learn">
                <button className="px-8 py-3 bg-blue-600 text-white rounded-full text-sm font-black uppercase tracking-widest hover:bg-slate-900 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-blue-200 flex items-center gap-2">
                  Start Learning <ArrowRight size={18} />
                </button>
              </Link>
            </div>

            {/* Feature Cards */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1 */}
              <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                <div className="text-blue-500 text-xl"></div>
                <div>
                  <h3 className="font-semibold text-slate-800">For Grades 8–12</h3>
                  <p className="text-sm text-slate-600">
                    Tailored content for middle and high school students.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                <div className="text-blue-500 text-xl"></div>
                <div>
                  <h3 className="font-semibold text-slate-800">Curriculum Aligned</h3>
                  <p className="text-sm text-slate-600">
                    Meets educational standards for sign language learning.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="md:col-span-2 p-5 border rounded-xl shadow-sm flex gap-4">
                <div className="text-blue-500 text-xl"></div>
                <div>
                  <h3 className="font-semibold text-slate-800">100+ Video Lessons</h3>
                  <p className="text-sm text-slate-600">
                    Comprehensive library of step-by-step ASL tutorials.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Program Overview */}
      <section className="py-4 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">
                  Program Overview
                </h2>
                <h3 className="text-4xl font-extrabold text-slate-900 leading-tight">
                  Empowering Communication Through <br />
                  <span className="text-slate-400">Sign Language</span>
                </h3>
              </div>

              <p className="text-lg text-slate-600 leading-relaxed font-light">
                Empowering Communication Through Sign Language means creating inclusive learning experiences that rely on visual clarity, structured expression, and accessibility. By combining sign language with thoughtfully designed visuals, we enable learners of all abilities to understand, express, and connect—without barriers imposed by spoken language.
              </p>

              <div className="space-y-4">
                {[
                  "A visual-first approach to inclusive learning and expression",
                  "Bridging communication gaps through accessible visual language",
                  "Making language accessible through signs, visuals, and clarity",
                  "Designed to support understanding beyond spoken words"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                    <CheckCircle2 size={18} className="text-blue-600" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative group overflow-hidden rounded-[40px] shadow-xl border border-slate-100">
              <img
                src="/images/sign.png"
                alt="Facility"
                className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Language Modules */}
      <section className="py-6 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <div className="space-y-4">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">
                Language Modules
              </h2>
              <h3 className="text-4xl font-extrabold text-slate-900 leading-tight">
                Interactive Sign Language Journey
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
                <div className="mb-8 rounded-2xl overflow-hidden aspect-[4/3] bg-slate-50 flex items-center justify-center p-4">
                  <img
                    src={step.image}
                    alt={step.title}
                    loading="lazy"
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
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
  );
};

export default Signlanguage;
