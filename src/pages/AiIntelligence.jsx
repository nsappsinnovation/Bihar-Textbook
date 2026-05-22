
import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

import { BookOpen, Award, Users, ShieldCheck, ArrowLeft, ArrowRight, CheckCircle2, FileText, Brain, Cpu, Zap, Activity, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const AiIntelligence = () => {

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
      label: "Students",
      value: "500K+",
      sub: "Active Learners",
      icon: <Users size={20} />
    },
    {
      label: "Accuracy",
      value: "95%",
      sub: "Personalized Recommendations",
      icon: <Target size={20} />
    },
    {
      label: "Modules",
      value: "200+",
      sub: "AI-Driven Topics",
      icon: <BookOpen size={20} />
    },
    {
      label: "Availability",
      value: "24/7",
      sub: "Instant Doubt Resolution",
      icon: <Zap size={20} />
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
      title: "Smart Assessment",
      image: "/images/ai/step1.png", 
      description: "Analyze student strengths and weaknesses through adaptive quizzes and initial screening.",
      details: [
        "Skill Gap Analysis",
        "Knowledge Graphing",
        "Baseline Setting"
      ],
    },
    {
      title: "Personalized Roadmap",
      image: "/images/ai/step2.png",
      description: "Generate a custom learning path with curated content matching the student's pace and style.",
      details: [
        "Adaptive Schedules",
        "Content Recommendations",
        "Goal Setting"
      ],
    },
    {
      title: "Real-time Feedback",
      image: "/images/ai/step3.png",
      description: "Instant corrections and explanations for exercises to ensure concept mastery.",
      details: [
        "Instant Grading",
        "Step-by-step Solutions",
        "Mistake Analysis"
      ],
    },
    {
      title: "Progress Analytics",
      image: "/images/ai/step4.png",
      description: "Comprehensive dashboards for students and teachers to track improvement over time.",
      details: [
        "Growth Charts",
        "Performance Insights",
        "Future Predictions"
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
              src="/images/ai/hero_new.png"
              alt="AI Intelligence Illustration"
              className="w-[620px] h-auto object-contain"
            />
          </div>

          {/* RIGHT: Content */}
          <div>
            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-10">
              AI Intelligence Programs
            </h1>

            {/* Highlight text */}
            <p className="mt-4 text-lg font-semibold text-blue-500">
              Smart Adaptive Tutoring for Every Student
            </p>

            {/* Description */}
            <p className="mt-4 text-slate-600 max-w-md">
              Leveraging artificial intelligence to provide personalized learning experiences and real-time support for 21st-century learners.
            </p>

            {/* Action Button */}
            <div className="mt-8">
              <Link to="/ai-intelligence-dashboard">
                <button className="px-8 py-4 bg-blue-600 text-white rounded-full text-sm font-black uppercase tracking-widest hover:bg-slate-900 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-blue-200 flex items-center gap-2">
                  Start Learning <ArrowRight size={18} />
                </button>
              </Link>
            </div>

            {/* Feature Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Card 1 */}
              <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                <div className="text-blue-500 text-xl"><Brain size={24} /></div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Adaptive Learning
                  </h3>
                  <p className="text-sm text-slate-600">
                    Educational content that automatically adjusts to each student's unique learning pace.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                <div className="text-blue-500 text-xl"><Activity size={24} /></div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Data Driven Insights
                  </h3>
                  <p className="text-sm text-slate-600">
                    Deep performance analytics based on real-time data to help students improve.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="md:col-span-2 p-5 border rounded-xl shadow-sm flex gap-4">
                <div className="text-blue-500 text-xl"><Zap size={24} /></div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Smart Recommendations
                  </h3>
                  <p className="text-sm text-slate-600">
                    Get suggested topics and exercises to instantly improve weak areas and reinforce strengths.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      
      <section className="pt-2 pb-10 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left Content */}
            <div className="space-y-10">
              <div className="space-y-4">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 mt-16">
                  Program Overview
                </h2>
                <h3 className="text-4xl font-extrabold text-slate-900 leading-tight">
                  The Future of Learning with{" "}
                  <br />
                  <span className="text-slate-400">
                    AI Intelligence
                  </span>
                </h3>
              </div>

              <p className="text-lg text-slate-600 leading-relaxed font-light -mt-4">
                AI Intelligence in education transforms how students learn and teachers teach. By utilizing advanced algorithms, we create a dynamic educational environment that understands the unique needs of every learner.
              </p>

              <div className="space-y-4 -mt-6">
                {[
                  "Personalized learning paths for every student",
                  "Instant feedback and detailed step-by-step explanations",
                  "Predictive analytics to identify and bridge learning gaps",
                  "24/7 intelligent tutoring and support assistance"
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
            <div className="relative group overflow-hidden rounded-[40px] shadow-xl border border-slate-100 mt-16">
              <img
                src="/images/ai/program_overview.png"
                alt="AI Facility"
                className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>

          </div>
        </div>
      </section>

      <section className="py-10 bg-white px-6 -mt-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="space-y-4">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">
                AI Modules
              </h2>
             <h3 className="text-4xl font-extrabold text-slate-900 leading-tight">
                Smart Learning Journey
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

export default AiIntelligence;
