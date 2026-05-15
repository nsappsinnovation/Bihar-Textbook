 
import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

import { BookOpen, Award, Users, Printer, Truck, ShieldCheck, ArrowLeft, ArrowRight, History, Target, CheckCircle2, FileText, Globe, Languages, Library } from 'lucide-react';
import { motion } from 'framer-motion';

const Linguistic = () => {

  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -380, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 380, behavior: "smooth" });
  };

  const stats = [
    {
      label: "Language Library",
      value: "120K+",
      sub: "Multilingual educational resources",
      icon: <BookOpen size={20} />
    },
    {
      label: "Linguistic reach",
      value: "15+",
      sub: "Regional and Global languages",
      icon: <Globe size={20} />
    },
    {
      label: "Learning Categories",
      value: "100+",
      sub: "Grammar, Vocab & Conversational",
      icon: <Languages size={20} />
    },
    {
      label: "Inclusive Access",
      value: "100%",
      sub: "WCAG compliant learning design",
      icon: <ShieldCheck size={20} />
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
      title: "Multilingual Storytelling Sessions",
      image: "/images/linguistic/l1.png",
      description:
        "Students explore regional and global languages through guided storytelling and immersive audio-visual lessons.",
      details: [
        "Interactive Listening Modules",
        "Cultural Narratives",
        "Language Comprehension Activities",
      ],
    },
    {
      title: "Live Conversation Practice",
      image: "/images/linguistic/l2.png",
      description:
        "Real-time speaking sessions with guided pronunciation and peer interaction.",
      details: [
        "Pronunciation Feedback",
        "Role-Play Conversations",
        "Confidence Building",
      ],
    },
    {
      title: "Regional Language Labs",
      image: "/images/linguistic/l3.png",
      description:
        "Dedicated digital labs for Hindi, Tamil, Telugu, Bengali and more.",
      details: [
        "Grammar Foundations",
        "Vocabulary Builders",
        "Interactive Quizzes",
      ],
    },
    {
      title: "Global Language Immersion",
      image: "/images/linguistic/l3.png",
      description:
        "Explore French, Spanish, Arabic and other global languages through immersive tools.",
      details: [
        "Audio-Visual Lessons",
        "Cultural Context Learning",
        "Global Communication Skills",
      ],
    },
    {
      title: "Inclusive Language Learning",
      image: "/images/linguistic/l5.png",
      description:
        "Accessible language education with subtitles, audio support and inclusive design.",
      details: [
        "Sign Language Support",
        "Subtitled Video Lessons",
        "Assistive Learning Tools",
      ],
    },
  ];

  const navigate = useNavigate();

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
              src="/images/linguistic/l.png"
              alt="Linguistic Education Illustration"
              className="w-[620px] h-auto object-contain"
            />
          </div>

          {/* RIGHT: Content */}
          <div>
            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              Diverse Linguistic Learning Programs
            </h1>

            {/* Highlight text */}
            <p className="mt-4 text-lg font-semibold text-blue-500">
              Empowering Multilingual Education Through Immersion
            </p>

            {/* Description */}
            <p className="mt-4 text-slate-600 max-w-md">
              Interactive multilingual learning programs designed for Grades 8–12 students, covering regional and global languages.
            </p>

            {/* Action Button */}
            <div className="mt-8">
              <Link to="/ling">
                <button className="px-8 py-4 bg-blue-600 text-white rounded-full text-sm font-black uppercase tracking-widest hover:bg-slate-900 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-blue-200 flex items-center gap-2">
                  Start Learning <ArrowRight size={18} />
                </button>
              </Link>
            </div>

            {/* Feature Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Card 1 */}
              <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                <div className="text-blue-500 text-xl"></div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Multilingual Learning
                  </h3>
                  <p className="text-sm text-slate-600">
                    Support for learning and understanding multiple languages to build global communication skills.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                <div className="text-blue-500 text-xl"></div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Language Skill Development
                  </h3>
                  <p className="text-sm text-slate-600">
                    Focus on reading, writing, speaking, and listening skills to strengthen language proficiency.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="md:col-span-2 p-5 border rounded-xl shadow-sm flex gap-4">
                <div className="text-blue-500 text-xl"></div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Cultural & Communication Awareness
                  </h3>
                  <p className="text-sm text-slate-600">
                    Learn languages alongside cultural context to improve communication and understanding across communities.
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
                  Preserving Bihar's{" "}
                  <br />
                  <span className="text-slate-400">
                    Linguistic Heritage
                  </span>
                </h3>
              </div>

              <p className="text-lg text-slate-600 leading-relaxed font-light">
                Our Linguistics initiative is dedicated to the documentation, study, and promotion of Bihar's diverse regional languages and dialects. By creating comprehensive educational resources, we foster an inclusive environment where students can stay rooted in their cultural identity while achieving academic excellence.
              </p>

              <div className="space-y-4">
                {[
                  "Detailed documentation of endangered and native dialects",
                  "Creation of specialized textbooks for multilingual education",
                  "Promotes cultural pride and inclusive learning",
                  "Advanced research and language preservation strategies"
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
                src="/images/linguistic/l6.png"
                alt="Facility"
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
                Language Modules
              </h2>
             <h3 className="text-4xl font-extrabold text-slate-900 leading-tight">
                Interactive Language Learning Journey
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

export default Linguistic;
