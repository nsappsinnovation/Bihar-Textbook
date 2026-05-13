 
 import React from 'react'
 import { Link } from "react-router-dom";
import { useRef } from "react";




 import { BookOpen, Award, Users, Printer, Truck, ShieldCheck, ArrowLeft, ArrowRight, History, Target, CheckCircle2, FileText, Headphones, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

 const Audiolib = () => {

  const sliderRef = useRef(null);

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
    icon: <BookOpen size={20} />,
  },
  {
    label: "Listening Time",
    value: "24/7",
    sub: "Learn anytime, anywhere",
    icon: <Headphones size={20} />,
  },
  {
    label: "Skill Growth",
    value: "100+",
    sub: "Topics for students & careers",
    icon: <Rocket size={20} />,
  },
  {
    label: "Family Learning",
    value: "Shared",
    sub: "Parents & kids can learn together",
    icon: <Users size={20} />,
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
      "Audiobooks offer a vast library of knowledge and stories, making learning accessible to everyone, including learners with different reading preferences or visual impairments.",
    details: [
      "Huge Audiobook Library",
      "Accessible for All Learners",
      "Easy Listening on Any Device",
    ],
  },
  {
    title: "Professional Development and Skill Building",
    image: "/images/audio/a3.png",
    description:
      "Audiobooks are an excellent resource for professional growth, helping learners build new skills and stay updated in their field through structured audio learning.",
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
      "Audiobooks support hands-free learning for active students—perfect during workouts, jogging, traveling, or daily routines without stopping productivity.",
    details: [
      "Hands-Free Learning",
      "Perfect for Fitness & Travel",
      "Learn While Doing Activities",
    ],
  },
  {
    title: "Shared Learning and Family Engagement",
    image: "/images/audio/a5.png",
    description:
      "Audiobooks are great for shared learning, especially for families. Parents and children can enjoy stories together, creating fun and educational bonding moments.",
    details: [
      "Family Learning Time",
      "Fun Story Listening Together",
      "Build Love for Reading & Stories",
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
        src="/images/audio/audio.png"
        alt="Audiobook Learning Illustration"
        className="w-[620px] h-auto object-contain"
      />
    </div>

    {/* RIGHT: Content */}
    <div>
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
        Audio Book for Impulsive Learning
      </h1>

      <p className="mt-4 text-lg font-semibold text-blue-500">
        Learn through stories & lessons on the go!
      </p>

      <p className="mt-4 text-slate-600 max-w-md">
        Audiobook learning makes education accessible, flexible, and engaging for
        students of Grades 8 to 12.
      </p>

      {/* Action Button */}
      <div className="mt-8">
        <Link to="/audio-courses">
          <button className="px-8 py-4 bg-blue-600 text-white rounded-full text-sm font-black uppercase tracking-widest hover:bg-slate-900 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-blue-200 flex items-center gap-2">
            Start Learning <ArrowRight size={18} />
          </button>
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Card 1 */}
        <div className="p-5 border rounded-xl shadow-sm flex gap-4">
          <div className="text-blue-500 text-xl"><Headphones /></div>
          <div>
            <h3 className="font-semibold text-slate-800">
              Hands-Free Learning
            </h3>
            <p className="text-sm text-slate-600">
              Learn while walking, traveling, or relaxing.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-5 border rounded-xl shadow-sm flex gap-4">
          <div className="text-blue-500 text-xl"><BookOpen /></div>
          <div>
            <h3 className="font-semibold text-slate-800">
              Huge Audio Library
            </h3>
            <p className="text-sm text-slate-600">
              Access stories, lessons, and knowledge anytime.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="md:col-span-2 p-5 border rounded-xl shadow-sm flex gap-4">
          <div className="text-blue-500 text-xl"><Rocket /></div>
          <div>
            <h3 className="font-semibold text-slate-800">
              Learn Anytime, Anywhere
            </h3>
            <p className="text-sm text-slate-600">
              Perfect for students, families, and skill development.
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
            Empowering Learning Through{" "}
            <span className="text-slate-400">Audiobooks</span>
          </h3>
        </div>

        <p className="text-lg text-slate-600 leading-relaxed font-light">
          Audiobook learning helps students gain knowledge through listening,
          making education more flexible and accessible. With engaging narration,
          students can explore stories, concepts, and skills without being limited
          to traditional reading-only methods.
        </p>

        <div className="space-y-4 pt-2">
          {[
            "Supports learning for all reading preferences and abilities",
            "Improves listening, comprehension, and vocabulary",
            "Perfect for multitasking and active learning",
            "Encourages family engagement and shared learning",
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 text-sm font-bold text-slate-700"
            >
              <CheckCircle2 size={18} className="text-blue-600 mt-0.5" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Right Image */}
      <div className="lg:col-span-7 lg:mt-[120px]">
        <div className="relative group overflow-hidden rounded-[40px] border border-slate-100 shadow-xl">
          <img
            src="/images/audio/a1.png"
            alt="Audiobook Learning"
            className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />

          <div className="absolute bottom-10 left-10 text-white">
            <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">
              Audiobook Learning
            </p>
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
  How Audiobooks Improve Learning <br />
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
    className="h-full w-full object-cover "
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
 
 export default Audiolib
