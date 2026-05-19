
import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

import { BookOpen, Headphones, Rocket, Users, ArrowLeft, ArrowRight, CheckCircle2, Globe, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Audiolib = () => {

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
      label: "Audio Library",
      value: "10K+",
      sub: "Stories, lessons & knowledge",
      icon: <BookOpen size={20} />
    },
    {
      label: "Listening Time",
      value: "24/7",
      sub: "Learn anytime, anywhere",
      icon: <Headphones size={20} />
    },
    {
      label: "Skill Growth",
      value: "100+",
      sub: "Topics for students & careers",
      icon: <Rocket size={20} />
    },
    {
      label: "Inclusive Access",
      value: "100%",
      sub: "WCAG compliant audio design",
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
      title: "Diverse Content and Accessibility",
      image: "/images/audio/a2.png",
      description:
        "Audiobooks offer a vast library of knowledge and stories, making learning accessible to everyone, including learners with different reading preferences.",
      details: [
        "Huge Audiobook Library",
        "Accessible for All Learners",
        "Easy Listening on Any Device",
      ],
    },
    {
      title: "Professional Development",
      image: "/images/audio/a3.png",
      description:
        "Audiobooks are an excellent resource for professional growth, helping learners build new skills through structured audio learning.",
      details: [
        "Career-Focused Learning",
        "Skill Development Anytime",
        "Work + Learning Together",
      ],
    },
    {
      title: "Active and Hands-Free Learning",
      image: "/images/audio/a4.png",
      description:
        "Audiobooks support hands-free learning for active students—perfect during workouts, traveling, or daily routines.",
      details: [
        "Hands-Free Learning",
        "Perfect for Fitness & Travel",
        "Learn While Doing Activities",
      ],
    },
    {
      title: "Shared Learning and Engagement",
      image: "/images/audio/a5.png",
      description:
        "Audiobooks are great for shared learning, especially for families. Parents and children can enjoy stories together.",
      details: [
        "Family Learning Time",
        "Fun Story Listening Together",
        "Build Love for Reading",
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

      <div className="bg-white flex items-center pt-0 pb-0">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* LEFT: Image */}
          <div className="flex justify-center">
            <img
              src="/images/audio/audio.png"
              alt="Audiobook Learning Illustration"
              className="w-[620px] h-auto object-contain"
            />
          </div>

          {/* RIGHT: Content */}
          <div>
            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-10">
              Enriching Audio Learning Programs
            </h1>

            {/* Highlight text */}
            <p className="mt-4 text-lg font-semibold text-blue-500">
              Empowering Education Through Auditory Immersion
            </p>

            {/* Description */}
            <p className="mt-4 text-slate-600 max-w-md">
              Interactive audio-book learning programs designed for Grades 8–12 students, offering a vast library of knowledge and stories.
            </p>

            {/* Action Button */}
            <div className="mt-8">
              <Link to="/audio-library-dashboard">
                <button className="px-8 py-4 bg-blue-600 text-white rounded-full text-sm font-black uppercase tracking-widest hover:bg-slate-900 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-blue-200 flex items-center gap-2">
                  Start Listening <ArrowRight size={18} />
                </button>
              </Link>
            </div>

            {/* Feature Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Card 1 */}
              <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                <div className="text-blue-500 text-xl"><Headphones size={24} /></div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Hands-Free Learning
                  </h3>
                  <p className="text-sm text-slate-600">
                    Learn while walking, traveling, or relaxing with our seamless audio player.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                <div className="text-blue-500 text-xl"><BookOpen size={24} /></div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Huge Audio Library
                  </h3>
                  <p className="text-sm text-slate-600">
                    Access a curated collection of stories, lessons, and academic resources.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="md:col-span-2 p-5 border rounded-xl shadow-sm flex gap-4">
                <div className="text-blue-500 text-xl"><Rocket size={24} /></div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Learn Anytime, Anywhere
                  </h3>
                  <p className="text-sm text-slate-600">
                    Perfect for students, families, and professionals looking to grow their skills on the go.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      
      <section className="pt-12 pb-10 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left Content */}
            <div className="space-y-10">
              <div className="space-y-4">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">
                  Program Overview
                </h2>
                <h3 className="text-4xl font-extrabold text-slate-900 leading-tight">
                  Empowering Learning Through{" "}
                  <br />
                  <span className="text-slate-400">
                    Auditory Resources
                  </span>
                </h3>
              </div>

              <p className="text-lg text-slate-600 leading-relaxed font-light">
                Our Audio Learning initiative helps students gain knowledge through listening, making education more flexible and accessible. With engaging narration, students can explore stories, concepts, and skills without being limited to traditional reading methods.
              </p>

              <div className="space-y-4">
                {[
                  "Supports learning for all reading preferences and abilities",
                  "Improves listening, comprehension, and vocabulary",
                  "Perfect for multitasking and active learning",
                  "Encourages family engagement and shared learning"
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
                src="/images/audio/a1.png"
                alt="Audiobook Facility"
                className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>

          </div>
        </div>
      </section>

      <section className="py-6 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="space-y-4">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">
                Audio Modules
              </h2>
             <h3 className="text-4xl font-extrabold text-slate-900 leading-tight">
                Interactive Audio Learning Journey
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

export default Audiolib;
