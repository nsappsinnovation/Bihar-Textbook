 
 import React from 'react'
 import { Link } from "react-router-dom";
import { useRef } from "react";




 import { BookOpen, Award, Users, Printer, Truck, ShieldCheck, ArrowLeft, ArrowRight, History, Target, CheckCircle2, FileText } from 'lucide-react';
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
    image:"/images/linguistic/l3.png",
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
   return (
     <div>
        <div className="min-h-screen bg-white flex items-center">
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

    {/* LEFT: Image */}
    <div className="flex justify-center">
      <img
        src="/images/linguistic/l.png"
        alt="VR Education Illustration"
        className="w-[620px] h-auto object-contain"
      />
    </div>

    {/* RIGHT: Content */}
    <div>
      {/* Heading */}
     <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Diverse Linguistic Learning Programs</h1>

      {/* Highlight text */}
      <p className="mt-4 text-lg font-semibold text-blue-500">
        Empowering Multilingual Education Through Immersion
      </p>

      {/* Description */}
      <p className="mt-4 text-slate-600 max-w-md">
        Interactive multilingual learning programs designed for Grades 8–12 students, covering regional and global languages.
      </p>

    
      {/* Feature Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Card 1 */}
        <div className="p-5 border rounded-xl shadow-sm flex gap-4">
          <div className="text-blue-500 text-xl">🎓</div>
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
          <div className="text-blue-500 text-xl">✅</div>
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
          <div className="text-blue-500 text-xl">🕶️</div>
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
            Preserving Bihar's{" "}
            <span className="text-slate-400">Linguistic Heritage</span>
          </h3>
        </div>

        <p className="text-lg text-slate-600 leading-relaxed font-light">
          Our Linguistics initiative is dedicated to the documentation, study, and promotion of Bihar's diverse regional languages and dialects. By creating comprehensive educational resources, we foster an inclusive environment where students can stay rooted in their cultural identity while achieving academic excellence.
        </p>

        {/* Bullet Points */}
        <div className="space-y-4 pt-2">
          {[
            "Detailed documentation of endangered and native dialects",
            "Creation of specialized textbooks for multilingual education",
            "Promotes cultural pride and inclusive learning",
            "Advanced research and language preservation strategies",
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
            src="/images/linguistic/l6.png"
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


         <section className="py-28 bg-slate-900 px-6 rounded-[60px] mx-4 mb-8">
  <div className="max-w-7xl mx-auto">

    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
      <div>
        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-400 mb-4">
          Language Modules
        </h2>
        <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">
          Interactive Language Learning Journey
        </h3>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <button
          onClick={scrollLeft}
          className="w-12 h-12 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-blue-600 transition"
        >
          <ArrowLeft size={20} />
        </button>

        <button
          onClick={scrollRight}
          className="w-12 h-12 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-blue-600 transition"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </div>

    {/* Carousel */}
    <div
      ref={sliderRef}
      className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 no-scrollbar"
    >
      {processSteps.map((step, i) => (
        <motion.div
          key={i}
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="snap-start flex-shrink-0 w-[320px] bg-slate-800 p-8 rounded-3xl hover:bg-slate-700 transition"
        >
          <div className="h-52 overflow-hidden rounded-2xl mb-6">
            <img
              src={step.image}
              alt={step.title}
              className="w-full h-full object-cover"
            />
          </div>

          <h4 className="text-xl font-bold text-white mb-4">
            {step.title}
          </h4>

          <p className="text-slate-300 text-sm mb-6">
            {step.description}
          </p>

          <div className="space-y-2">
            {step.details.map((detail, j) => (
              <div
                key={j}
                className="flex items-center gap-2 text-xs text-slate-400"
              >
                <CheckCircle2 size={14} className="text-blue-500" />
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
 
 export default Linguistic;
