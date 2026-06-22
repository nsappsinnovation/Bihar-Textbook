 
 import React from 'react'
 import { Link } from "react-router-dom";
import { useRef } from "react";



// import Img from "../assets/a.png"
// import I1 from "../assets/a1.png"
// import I2 from "../assets/a2.png"
// import I3 from "../assets/a3.png"
// import I4 from "../assets/a4.png"
// import I5 from "../assets/a5.png"
 import { BookOpen, Award, Users, Printer, Truck, ShieldCheck, ArrowLeft, ArrowRight, History, Target, CheckCircle2, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

 const Ebook = () => {

  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -380, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 380, behavior: "smooth" });
  };
const ebookModules = [
  {
    title: "Digital Interactive Textbooks",
    image: "/images/ebooks/digital-learning.png",
    description: "Smart digital textbooks enriched with multimedia content.",
  },
  {
    title: "Multimedia Learning",
    image: "/images/ebooks/multimedia-learning.png",
    description: "Concepts explained through videos, animations, and visuals.",
  },
  {
    title: "Interactive Quizzes",
    image: "/images/ebooks/interactive-quiz.png",
    description: "Knowledge checks and quizzes to test understanding.",
  },
  {
    title: "Practice Exercises",
    image: "/images/ebooks/practice-exercises.png",
    description: "Hands-on exercises to reinforce learning.",
  },
  {
    title: "Self-Paced Learning",
    image: "/images/ebooks/self-learning.png",
    description: "Students can learn anytime at their own pace.",
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
    title: "Digital Interactive Textbooks",
    image: "/images/ebooks/in1.png",
    description:
      "Smart digital textbooks designed to make learning engaging through visuals and interactive content.",
    details: [
      "Structured chapters with clear explanations",
      "Visual illustrations for better understanding",
      "Clickable elements and interactive content",
      "Easy navigation between lessons",
      "Supports self-paced learning",
    ],
  },

  {
    title: "Multimedia Learning Experience",
    image: "/images/ebooks/in2.png",
    description:
      "Lessons enhanced with videos, animations, and visual demonstrations to simplify complex concepts.",
    details: [
      "Concept explanation through short videos",
      "Animated diagrams and visual storytelling",
      "Step-by-step concept demonstrations",
      "Improves understanding through visuals",
      "Engaging multimedia learning environment",
    ],
  },

  {
    title: "Interactive Quizzes & Knowledge Checks",
    image: "/images/ebooks/in3.png",
    description:
      "Students can test their understanding through quizzes and interactive assessments.",
    details: [
      "Multiple-choice knowledge checks",
      "Instant feedback after answering questions",
      "Concept-based quiz activities",
      "Track learning progress",
      "Encourages active participation",
    ],
  },

  {
    title: "Practice Exercises & Activities",
    image: "/images/ebooks/in4.png",
    description:
      "Hands-on exercises help reinforce learning and improve problem-solving skills.",
    details: [
      "Practice tasks after each lesson",
      "Scenario-based learning activities",
      "Problem-solving exercises",
      "Interactive worksheets",
      "Builds confidence through repetition",
    ],
  },

  {
    title: "Self-Paced Digital Learning",
    image: "/images/ebooks/in5.png",
    description:
      "Students can explore lessons at their own pace and revisit topics whenever needed.",
    details: [
      "Flexible learning anytime",
      "Revisit chapters easily",
      "Track learning progress",
      "Supports independent study",
      "Encourages curiosity and exploration",
    ],
  },
];
   return (
   <div>
  <div className="min-h-screen bg-white flex items-center">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

      {/* LEFT IMAGE */}
      <div className="flex justify-center">
        <img
          src="/images/ebooks/int.png"
          alt="Interactive E-Book Learning"
          className="w-[620px] h-auto object-contain"
        />
      </div>

      {/* RIGHT CONTENT */}
      <div>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
          Interactive E-Books
        </h1>

        <p className="mt-4 text-lg font-semibold text-yellow-400">
          Explore Interactive E-Books for Engaging Digital Learning
        </p>

        <p className="mt-4 text-slate-600 max-w-md">
          Smart digital textbooks enriched with videos, animations,
          quizzes, and practice activities that help students
          understand concepts better and learn through interactive
          experiences.
        </p>

        {/* FEATURE CARDS */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Card 1 */}
          <div className="p-5 border rounded-xl shadow-sm flex gap-4">
            <div className="text-yellow-500 text-xl"></div>
            <div>
              <h3 className="font-semibold text-slate-800">
                Digital Interactive Textbooks
              </h3>
              <p className="text-sm text-slate-600">
                Smart digital books with structured lessons and visual explanations.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-5 border rounded-xl shadow-sm flex gap-4">
            <div className="text-yellow-500 text-xl"></div>
            <div>
              <h3 className="font-semibold text-slate-800">
                Multimedia Learning
              </h3>
              <p className="text-sm text-slate-600">
                Learn concepts through videos, animations, and interactive visuals.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="md:col-span-2 p-5 border rounded-xl shadow-sm flex gap-4">
            <div className="text-yellow-500 text-xl"></div>
            <div>
              <h3 className="font-semibold text-slate-800">
                Interactive Quizzes
              </h3>
              <p className="text-sm text-slate-600">
                Test your knowledge with quizzes and instant feedback.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="md:col-span-2 p-5 border rounded-xl shadow-sm flex gap-4">
            <div className="text-yellow-500 text-xl"></div>
            <div>
              <h3 className="font-semibold text-slate-800">
                Practice Activities & Exercises
              </h3>
              <p className="text-sm text-slate-600">
                Reinforce concepts through activities and practice tasks.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
      <section className="py-32 px-6">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">

      {/* Left Content */}
      <div className="lg:col-span-5 space-y-10 sticky top-32">
        <div className="space-y-4">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">
            Program Overview
          </h2>

          <h3 className="text-4xl font-extrabold text-slate-900 leading-tight">
  Enhancing Learning Through
  <br />
  <span className="text-slate-400">
    Interactive E-Books
  </span>
</h3>
        </div>
<p className="text-lg text-slate-600 leading-relaxed font-light">
  Interactive E-Books transform traditional textbooks into engaging digital
  learning experiences. Students can explore lessons enriched with videos,
  animations, quizzes, and practice activities that improve understanding
  and make learning more interactive.
</p>
        <div className="space-y-4">
          {[
  
  "Explore digital textbooks enriched with videos and animations",
  "Understand concepts through interactive illustrations and visual explanations",
  "Test knowledge using quizzes and instant feedback",
  "Practice concepts through exercises and activity-based learning",
  "Learn at your own pace with structured digital lessons"

].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 text-sm font-bold text-slate-700"
            >
              <CheckCircle2 size={18} className="text-yellow-600 mt-[2px]" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Images */}
        <div className="lg:col-span-7 grid grid-cols-1 gap-4">
                                    <div className=" mt-24 relative group overflow-hidden rounded-[40px] border border-slate-100 shadow-xl">
                                        <img
                                            src= "/images/ebooks/image.png"
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

        {/* Image 2 */}
   
</section>

               <section className="py-32 bg-slate-900 px-6 rounded-[60px] mx-4 mb-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}  {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-400">
             Learn Basic Skills
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">
               Step-by-Step <br />
            </h3>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition"
            >
              ←
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition"
            >
              →
            </button>
          </div>
        </div>

        {/* Carousel Track */}
        <div
          ref={sliderRef}
          className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6
                     scrollbar-hide"
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
    className="h-full w-full object-cover"
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
 
 export default Ebook
