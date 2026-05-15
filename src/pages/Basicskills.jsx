
import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

import { BookOpen, Award, Users, ShieldCheck, ArrowLeft, ArrowRight, History, Target, CheckCircle2, FileText, Globe, Landmark, Rocket, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Basicskills = () => {

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
      title: "Road Safety & Signals",
      image: "/images/skills/a1.png",
      description:
        "Learn the meaning of traffic lights and how to follow signals properly to stay safe on the roads.",
      details: [
        "Red light means STOP",
        "Yellow light means GET READY",
        "Green light means GO safely",
      ],
    },
    {
      title: "How to Use an ATM",
      image: "/images/skills/i1.png",
      description:
        "A step-by-step guide to safely using an ATM machine for banking needs.",
      details: [
        "Insert your ATM card",
        "Enter PIN securely",
        "Collect cash and receipt",
      ],
    },
    {
      title: "Safe Road Crossing",
      image: "/images/skills/a2.png",
      description:
        "Understand the correct way to cross the road and avoid accidents in public areas.",
      details: [
        "Always use zebra crossing",
        "Look right → left → right",
        "Stay alert at all times",
      ],
    },
    {
      title: "Public Walking Rules",
      image: "/images/skills/a3.png",
      description:
        "Learn safe walking habits while using roads and navigating crowded public areas.",
      details: [
        "Walk on the left side",
        "Use footpaths always",
        "Follow safety signs",
      ],
    },
    {
      title: "Basic Money Handling",
      image: "/images/skills/image.png",
      description:
        "Learn how to manage and count money responsibly in your daily life.",
      details: [
        "Count money carefully",
        "Keep money safely",
        "Save small amounts regularly",
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
              src="/images/skills/a.png"
              alt="Basic Life Skills Illustration"
              className="w-[620px] h-auto object-contain"
            />
          </div>

          {/* RIGHT: Content */}
          <div>
            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              Essential Basic Life Skills
            </h1>

            {/* Highlight text */}
            <p className="mt-4 text-lg font-semibold text-blue-500">
              Learn Essential Daily Skills for Safe & Smart Living
            </p>

            {/* Description */}
            <p className="mt-4 text-slate-600 max-w-md">
              Practical lessons teaching students road safety, traffic rules, ATM usage, and responsible everyday behavior in modern society.
            </p>

            {/* Feature Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Card 1 */}
              <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                <div className="text-blue-500 text-xl"><Shield size={24} /></div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Road Awareness
                  </h3>
                  <p className="text-sm text-slate-600">
                    Learn vital traffic signals, road crossing rules, and public safety protocols.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                <div className="text-blue-500 text-xl"><Award size={24} /></div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Financial Basics
                  </h3>
                  <p className="text-sm text-slate-600">
                    Understand modern banking, ATM usage, and safe money handling habits.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="md:col-span-2 p-5 border rounded-xl shadow-sm flex gap-4">
                <div className="text-blue-500 text-xl"><Users size={24} /></div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Everyday Responsibility
                  </h3>
                  <p className="text-sm text-slate-600">
                    Build discipline, situational awareness, and responsible behavior in public environments.
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
                  Empowering Students Through{" "}
                  <br />
                  <span className="text-slate-400">
                    Basic Learning Skills
                  </span>
                </h3>
              </div>

              <p className="text-lg text-slate-600 leading-relaxed font-light">
                Basic Life Skills focuses on essential everyday knowledge that every student must know to stay safe, independent, and responsible in their community and beyond.
              </p>

              <div className="space-y-4">
                {[
                  "Complete understanding of traffic signals and safety rules",
                  "Mastery of safe road crossing and pedestrian techniques",
                  "Knowledge of essential banking and ATM usage procedures",
                  "Basic money management and responsible saving habits"
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
                src="/images/skills/i.png"
                alt="Skills Facility"
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
                Skills Modules
              </h2>
             <h3 className="text-4xl font-extrabold text-slate-900 leading-tight">
                Step-by-Step Learning Journey
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

export default Basicskills;
