
import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

import { BookOpen, Award, Users, ShieldCheck, ArrowLeft, ArrowRight, History, Target, CheckCircle2, FileText, Globe, Landmark, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const Vrlab = () => {

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
      label: "VR Tour Library",
      value: "120K+",
      sub: "Immersive educational experiences",
      icon: <Globe size={20} />
    },
    {
      label: "Anytime Learning",
      value: "24/7",
      sub: "Explore anytime, anywhere",
      icon: <History size={20} />
    },
    {
      label: "Learning Categories",
      value: "100+",
      sub: "Science, history & careers",
      icon: <Target size={20} />
    },
    {
      label: "Inclusive Access",
      value: "100%",
      sub: "WCAG compliant VR design",
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
      title: "Explore Ancient History",
      image: "/images/vr/v1.png",
      description:
        "Step into ancient temples and monuments through immersive VR and explore history like you are really there.",
      details: [
        "Ancient Civilization Tours",
        "Immersive 3D Heritage Sites",
        "Interactive Historical Learning",
      ],
    },
    {
      title: "Virtual Science Lab",
      image: "/images/vr/v2.png",
      description:
        "Experience futuristic science labs and explore DNA, biology, and experiments in a safe virtual environment.",
      details: [
        "DNA & Biology Visual Learning",
        "Safe Virtual Experiments",
        "Interactive Lab Simulations",
      ],
    },
    {
      title: "Space Exploration",
      image: "/images/vr/v3.png",
      description:
        "Travel through galaxies, planets, and space missions using VR for an exciting astronomy learning experience.",
      details: [
        "Solar System & Galaxy Tour",
        "Space Mission Simulation",
        "Immersive Astronomy Learning",
      ],
    },
    {
      title: "Classroom VR Tours",
      image: "/images/vr/i2.png",
      description:
        "Students learn together using VR headsets in a guided classroom tour designed for interactive learning.",
      details: [
        "Group Learning with VR",
        "Teacher Guided Sessions",
        "Engaging Classroom Experience",
      ],
    },
  ];

  return (
    <div className="relative">
      {/* Back Button */}
      <button 
        onClick={() => navigate("/")} 
        className="fixed top-3 left-3 md:top-4 md:left-6 lg:left-8 w-9 h-9 md:w-11 md:h-11 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-blue-500 hover:shadow-lg transition-all border border-slate-50 z-50 group"
      >
        <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-1 transition-transform" />
      </button>

      <div className="bg-white flex items-center pt-10 pb-0">
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center relative z-10 mt-6 sm:mt-10 md:-mt-8 lg:-mt-12">

          {/* LEFT: Image */}
          <div className="flex justify-center">
            <img
              src="/images/vr/vr.png"
              alt="VR Education Illustration"
              className="w-full max-w-[320px] sm:max-w-[420px] md:max-w-[520px] lg:max-w-[620px] h-auto object-contain mx-auto"
            />
          </div>

          {/* RIGHT: Content */}
          <div>
            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-slate-900 mt-4 md:-mt-8">
              Immersive Virtual Reality Lab
            </h1>

            {/* Highlight text */}
            <p className="mt-4 text-lg font-semibold text-blue-500">
              Explore Interactive VR Educational Adventures!
            </p>

            {/* Description */}
            <p className="mt-4 text-slate-600 max-w-md">
              Immersive VR learning experiences designed for Grades 8–12 students, bridging the gap between theory and reality.
            </p>

            {/* Action Button */}
            <div className="mt-8">
              <Link to="/vr-dashboard">
                <button className="px-8 py-4 bg-blue-600 text-white rounded-full text-sm font-black uppercase tracking-widest hover:bg-slate-900 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-blue-200 flex items-center gap-2">
                  Start Exploring <ArrowRight size={18} />
                </button>
              </Link>
            </div>

            {/* Feature Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Card 1 */}
              <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                <div className="text-blue-500 text-xl"><Rocket size={24} /></div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    For Grades 8-12
                  </h3>
                  <p className="text-sm text-slate-600">
                    Tailored VR content specifically designed for middle and high school curriculums.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                <div className="text-blue-500 text-xl"><Target size={24} /></div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Curriculum Aligned
                  </h3>
                  <p className="text-sm text-slate-600">
                    Every module meets national educational standards for VR-based immersive learning.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="md:col-span-2 p-5 border rounded-xl shadow-sm flex gap-4">
                <div className="text-blue-500 text-xl"><Landmark size={24} /></div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Immersive VR Lessons
                  </h3>
                  <p className="text-sm text-slate-600">
                    Explore science labs, history tours, and space adventures in full 3D interactive environments.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      
      <section className="pt-8 pb-10 bg-white px-4 sm:px-6 mt-8 md:mt-12 lg:mt-16">
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left Content */}
            <div className="space-y-10">
              <div className="space-y-4">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">
                  Program Overview
                </h2>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                  Empowering Learning Through{" "}
                  <br />
                  <span className="text-slate-400">
                    VR Education Tours
                  </span>
                </h3>
              </div>

              <p className="text-lg text-slate-600 leading-relaxed font-light">
                Empowering Learning Through VR Education Tours means creating immersive learning experiences built on visual clarity, guided exploration, and accessibility. By combining virtual reality with thoughtfully designed visuals, we help learners connect with complex concepts.
              </p>

              <div className="space-y-4">
                {[
                  "Supports learning through full VR immersion and guided structure",
                  "Bridges learning gaps through interactive virtual experiences",
                  "Makes education engaging through exploration and storytelling",
                  "Designed to support understanding beyond traditional textbooks"
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
                src="/images/vr/i3.png"
                alt="VR Facility"
                className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>

          </div>
        </div>
      </section>

      <section className="py-10 bg-white px-4 sm:px-6">
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="space-y-4">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">
                VR Modules
              </h2>
             <h3 className="text-4xl font-extrabold text-slate-900 leading-tight">
                Interactive VR Learning Journey
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

export default Vrlab;
