 
 import React from 'react'
 import { Link } from "react-router-dom";
import { useRef } from "react";




 import { BookOpen, Award, Users, Printer, Truck, ShieldCheck, ArrowLeft, ArrowRight, History, Target, CheckCircle2, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

 const Signlanguage = () => {

  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -380, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 380, behavior: "smooth" });
  };

     const stats = [
            { label: "Accessibility", value: "25M+", sub: "Deaf & Hard-of-Hearing Learners", icon: <BookOpen size={20} /> },
            { label: "CONTENT", value: "120K+", sub: "Sign-Language Enabled Videos", icon: <Users size={20} /> },
            { label: "LANGUAGES", value: "15+", sub: "Regional Sign Variant", icon: <ShieldCheck size={20} /> },
            { label: "INCLUSION", value: "100%", sub: "WCAG Compliant", icon: <Award size={20} /> }
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
    title: "Sign Language Basics: Numbers (1-10)",
    image: "/images/s1.png",

    description:
      "Visual introduction to numbers 1 to 10 using clear and easy-to-follow sign language gestures.",
    details: [
      "Foundational Number Signs",
      "Clear Hand Positions",
      "Beginner-Friendly Learning",
    ],
  },
  {
    
  title: "Hindi Swar (स्वर) in Sign Language",
  image: "/images/s2.png",
  
  
  description:
    "Visual learning of Hindi vowels from अ to अं (अंग) using clear and expressive sign language gestures.",
  details: [
    "अ, आ, इ, ई, उ, ऊ",
    "ऋ, ए, ऐ, ओ, औ",
    "अं (अंग), अः (अः)",
  ],
}

,
  {
    title: "Greetings in Sign Language: Good Morning",
    image: "/images/s3.png",
    description:
      "Step-by-step demonstration of how to sign common greetings like 'Good Morning' clearly.",
    details: [
      "Greeting Expressions",
      "Correct Sign Flow",
      "Social Interaction Basics",
    ],
  },
  {
    title: "Sign Language Alphabets (A-Z)",
    image: "/images/s4.png",
    description:
      "Complete visual guide to signing alphabets from A to Z for spelling and name signs.",
    details: [
      "Finger Spelling Basics",
      "A-Z Alphabet Signs",
      "Foundation for Vocabulary",
    ],
  },
];


   return (
     <div>
        <div className="min-h-screen bg-white flex items-center">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* LEFT: Image */}
        <div className="flex justify-center">
          <img
            src= "/images/hello.png"


            alt="Sign Language Illustration"
            className="w-[620px] h-auto object-contain"
          />
        </div>

        {/* RIGHT: Content */}
        <div>
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            Learn Sign Language
          </h1>

          {/* Highlight text */}
          <p className="mt-4 text-lg font-semibold text-blue-500">
            Master ASL with Fun and Engaging Lessons!
          </p>

          {/* Description */}
          <p className="mt-4 text-slate-600 max-w-md">
            Interactive and engaging lessons designed for 8th to 12th class
            students.
          </p>

          {/* Action Button */}
          <div className="mt-8">
            <Link to="/courses">
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
                  For Grades 8–12
                </h3>
                <p className="text-sm text-slate-600">
                  Tailored content for middle and high school students.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-5 border rounded-xl shadow-sm flex gap-4">
              <div className="text-blue-500 text-xl"></div>
              <div>
                <h3 className="font-semibold text-slate-800">
                  Curriculum Aligned
                </h3>
                <p className="text-sm text-slate-600">
                  Meets educational standards for sign language learning.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="md:col-span-2 p-5 border rounded-xl shadow-sm flex gap-4">
              <div className="text-blue-500 text-xl"></div>
              <div>
                <h3 className="font-semibold text-slate-800">
                  100+ Video Lessons
                </h3>
                <p className="text-sm text-slate-600">
                  Comprehensive library of step-by-step ASL tutorials.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
    <section className="py-16 bg-slate-50/50 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white p-10 space-y-4 hover:bg-slate-50 transition-colors">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit">
                                    {stat.icon}
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                    <h4 className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</h4>
                                    <p className="text-xs font-semibold text-slate-500">{stat.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
         <section className="py-32 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
                  
                  {/* Left Content */}
                  <div className="lg:col-span-5 space-y-10">
                    <div className="space-y-4">
                      <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">
                        Program Overview
                      </h2>
                      <h3 className="text-4xl font-extrabold text-slate-900 leading-tight">
                      Empowering Communication Through 
         <br />
                        <span className="text-slate-400">
                    Sign Language
                        </span>
                      </h3>
                    </div>
        
                    <p className="text-lg text-slate-600 leading-relaxed font-light">
                     Empowering Communication Through Sign Language means creating inclusive learning experiences that rely on visual clarity, structured expression, and accessibility. By combining sign language with thoughtfully designed visuals, we enable learners of all abilities to understand, express, and connect—without barriers imposed by spoken language.
                    </p>
        
                    <div className="space-y-4">
                      {[
                      " A visual-first approach to inclusive learning and expression",
        
        "Bridging communication gaps through accessible visual language",
        
        "Making language accessible through signs, visuals, and clarity",
        
        "Designed to support understanding beyond spoken words"
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
                  <div className="lg:col-span-7 lg:mt-[120px]">
                                    <div className="relative group overflow-hidden rounded-[40px] border border-slate-100 shadow-xl">
                                        <img
                                            src= "/images/sign.png"
                                            alt="Facility"
                                            className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                                        <div className="absolute bottom-10 left-10 text-white">
                                            <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">Our Facility</p>
                                            <h4 className="text-2xl font-bold"></h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            </section>
               <section className="py-32 bg-slate-900 px-6 rounded-[60px] mx-4 mb-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-400">
              Workflow
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Expressing Meaning Visually <br />
            </h3>
          </div>

        </div>

        {/* Carousel Track */}
        <div
          ref={sliderRef}
          className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6
                     no-scrollbar"
        >
          {processSteps.map((step, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: i * 0.1 }}
              className="snap-start flex-shrink-0 w-[85%] sm:w-[60%] lg:w-[32%]
                         bg-white/5 backdrop-blur-md border border-white/10 p-12
                         rounded-[40px] hover:border-blue-500/50 transition-all duration-500 group"
            >
              {/* Image */}
           {/* Image */}
              {/* Image */}
<div className="mb-10 rounded-3xl bg-white flex items-center justify-center 
                h-64 sm:h-72 lg:h-80 overflow-hidden">
  <img
    src={step.image}
    alt={step.title}
    loading="lazy"
    className="h-full w-full object-contain p-4"
  />
</div>



              <h4 className="text-xl font-black text-white mb-6 uppercase tracking-tight">
                {step.title}
              </h4>

              <p className="text-blue-100/60 leading-relaxed font-light mb-8 text-sm">
                {step.description}
              </p>

              <div className="space-y-3 border-t border-white/5 pt-8">
                {step.details.map((detail, j) => (
                  <div
                    key={j}
                    className="flex items-center gap-3 text-[11px] font-bold text-blue-100/40 uppercase tracking-widest"
                  >
                    <div className="w-1 h-1 rounded-full bg-blue-500" />
                    {detail}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
            
            
     </div>
     
   )
 }
 
 export default Signlanguage
