 
 import React from 'react'
 import { Link } from "react-router-dom";
import { useRef } from "react";




 import { BookOpen, Award, Users, Printer, Truck, ShieldCheck, ArrowLeft, ArrowRight, History, Target, CheckCircle2, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

 const Vrlab = () => {

  const sliderRef = useRef(null);

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
   
  },
  {
    label: "Anytime Learning",
    value: "24/7",
    sub: "Explore anytime, anywhere",
    
  },
  {
    label: "Learning Categories",
    value: "100+",
    sub: "Science, history, careers & more",

  },
  {
    label: "Inclusive Access",
    value: "100%",
    sub: "WCAG compliant learning design",
    
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
    title: "Explore Ancient History in VR",
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
    title: "Virtual Science & Biology Lab in VR",
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
    title: "Space Exploration & Astronomy in VR",
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
    title: "Classroom VR Education Tour Experience",
    image: "/images/vr/i2.png",
    description:
      "Students learn together using VR headsets in a guided classroom tour designed for fun and interactive learning.",
    details: [
      "Group Learning with VR",
      "Teacher Guided Sessions",
      "Engaging Classroom Experience",
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
        src="/images/vr/vr.png"
        alt="VR Education Illustration"
        className="w-[620px] h-auto object-contain"
      />
    </div>

    {/* RIGHT: Content */}
    <div>
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
        Learn with Virtual Reality
      </h1>

      {/* Highlight text */}
      <p className="mt-4 text-lg font-semibold text-yellow-500">
        Explore Interactive VR Educational Adventures!
      </p>

      {/* Description */}
      <p className="mt-4 text-slate-600 max-w-md">
        Immersive VR learning experiences designed for 8th to 12th class
        students.
      </p>

      {/* Feature Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Card 1 */}
        <div className="p-5 border rounded-xl shadow-sm flex gap-4">
          <div className="text-yellow-500 text-xl"></div>
          <div>
            <h3 className="font-semibold text-slate-800">
              For Grades 8-12
            </h3>
            <p className="text-sm text-slate-600">
              Tailored VR content for middle and high school students.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-5 border rounded-xl shadow-sm flex gap-4">
          <div className="text-yellow-500 text-xl"></div>
          <div>
            <h3 className="font-semibold text-slate-800">
              Curriculum Aligned
            </h3>
            <p className="text-sm text-slate-600">
              Meets educational standards for VR-based learning.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="md:col-span-2 p-5 border rounded-xl shadow-sm flex gap-4">
          <div className="text-yellow-500 text-xl"></div>
          <div>
            <h3 className="font-semibold text-slate-800">
              Immersive VR Lessons
            </h3>
            <p className="text-sm text-slate-600">
              Explore science labs, history tours, and space adventures in 3D VR.
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

          {/* ONE LINE HEADING */}
          <h3 className="text-4xl font-extrabold text-slate-900 leading-tight">
            Empowering Learning Through{" "}
            <span className="text-slate-400">VR Education Tours</span>
          </h3>
        </div>

        <p className="text-lg text-slate-600 leading-relaxed font-light">
          Empowering Learning Through VR Education Tours means creating immersive
          learning experiences built on visual clarity, guided exploration, and
          accessibility. By combining virtual reality with thoughtfully designed
          visuals and structured narration, we help learners of all abilities
          understand, engage, and connect—without barriers caused by traditional
          classroom limitations.
        </p>

        {/* Bullet Points */}
        <div className="space-y-4 pt-2">
          {[
            "Supports learning through VR immersion, visuals, and guided structure",
            "Bridges learning gaps through interactive and accessible virtual experiences",
            "Makes education engaging through exploration, clarity, and storytelling",
            "Designed to support understanding beyond textbooks and spoken-only instruction",
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 text-sm font-bold text-slate-700"
            >
              <CheckCircle2 size={18} className="text-yellow-600 mt-0.5" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Right Image */}
      <div className="lg:col-span-7 lg:mt-[120px]">
        <div className="relative group overflow-hidden rounded-[40px] border border-slate-100 shadow-xl">
          <img
            src="/images/vr/i3.png"
            alt="Facility"
            className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />

          <div className="absolute bottom-10 left-10 text-white">
            <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">
              Our Facility
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
            
             <section className="py-32 px-6">
                            <div className="max-w-5xl mx-auto bg-slate-50 rounded-[48px] p-12 md:p-24 text-center border border-slate-100 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000" />
            
                                <div className="relative z-10 space-y-10">
                                    <div className="flex justify-center">
                                        <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                                            <FileText size={32} className="text-blue-600" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Explore the Courses</h3>
                                        <p className="text-lg text-slate-500 font-light max-w-xl mx-auto leading-relaxed">
                                            Our standardized materials are available for review. Access the digital archive to understand our curriculum depth.
                                        </p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                        <Link to="/ar-courses" className="w-full sm:w-auto">
                                            <button className="w-full sm:w-auto px-12 py-5 bg-slate-900 text-white rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-blue-600 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-slate-200 flex items-center justify-center gap-3">
                                                Enter course <ArrowRight size={16} />
                                            </button>
                                        </Link>
                                        <Link to="/" className="w-full sm:w-auto px-10 py-5 text-slate-400 hover:text-slate-900 text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2">
                                            <ArrowLeft size={16} /> Back to Hub
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>
            
     </div>
     
   )
 }
 
 export default Vrlab
