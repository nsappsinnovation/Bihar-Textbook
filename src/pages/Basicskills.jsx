 
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

 const Basicskills = () => {

  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -380, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 380, behavior: "smooth" });
  };
const trendingPages = [
  {
    title: "BMI - Body Mass Index",
    slug: "bmi-body-mass-index",
    description:
      "What does your BMI tell you about yourself? Use our calculator to find out.",
    section: "From our Personal Skills section.",
  },
  {
    title: "Negotiation Skills",
    slug: "negotiation-skills",
    description:
      "Learn more about negotiation and become a better negotiator at school, work, and in daily life.",
    section: "From our Interpersonal Skills section.",
  },
  {
    title: "Leadership Styles",
    slug: "leadership-styles",
    description:
      "Find out about different styles of leadership — what sort of leader are you?",
    section: "From our Leadership Skills section.",
  },
  {
    title: "How to Write a Letter",
    slug: "how-to-write-a-letter",
    description:
      "Is letter writing a dying art? Find out how to write a letter correctly and professionally.",
    section: "From our Writing Skills section.",
  },
  {
    title: "Percentage Calculators",
    slug: "percentage-calculators",
    description:
      "Need to work out some percentages? Use our calculators and learn how to solve percentage problems.",
    section: "From our Numeracy Skills section.",
  },
];

const quizzes = [
  {
    title: "Interpersonal Skills Self Assessment",
    slug: "interpersonal-skills-self-assessment",
    description:
      "Learn more about how good your interpersonal skills are and where you can improve.",
  },
  {
    title: "What Sort of Leader Are You?",
    slug: "what-sort-of-leader-are-you",
    description:
      "Discover your default leadership style, how to make the most of it, and how to develop new leadership traits.",
  },
  {
    title: "Time Management Self Assessment",
    slug: "time-management-self-assessment",
    description:
      "Test how well you manage time and learn ways to improve your daily productivity.",
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
    title: "Road Safety: Understanding Traffic Signals",
    image: "/images/skills/a1.png",
    description:
      "Learn the meaning of traffic lights and how to follow signals properly to stay safe.",
    details: [
      "Red light means STOP immediately",
      "Yellow light means GET READY to move",
      "Green light means GO safely",
      "Follow traffic police instructions",
      "Always respect road rules",
    ],
  },

  {
    title: "How to Cross the Road Safely",
    image: "/images/skills/a2.png",
    description:
      "Understand the correct way to cross the road and avoid accidents.",
    details: [
      "Always use zebra crossing",
      "Look right → left → right before crossing",
      "Do not run suddenly on the road",
      "Avoid using mobile phones while crossing",
      "Wait patiently for vehicles to stop",
    ],
  },

  {
    title: "Walking Rules: Which Side to Walk On",
    image: "/images/skills/a3.png",
    description:
      "Learn safe walking habits while using roads and public areas.",
    details: [
      "Walk on the left side of the road",
      "Use footpaths whenever available",
      "Stay alert while walking",
      "Avoid pushing or running in crowded places",
      "Follow public safety signs",
    ],
  },

  {
    title: "How to Use an ATM Machine",
    image: "/images/skills/a4.png",
    description:
      "Step-by-step guide to safely using an ATM machine.",
    details: [
      "Insert your ATM card properly",
      "Enter your PIN secretly",
      "Select withdrawal or balance inquiry",
      "Collect cash and receipt carefully",
      "Never share your PIN with anyone",
    ],
  },

  {
    title: "Basic Money Handling Skills",
    image: "/images/skills/a5.png",
    description:
      "Learn how to manage money responsibly in daily life.",
    details: [
      "Count money carefully before paying",
      "Check your balance before spending",
      "Keep money safely in wallet or bank",
      "Save small amounts regularly",
      "Avoid unnecessary spending",
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
        src= "/images/skills/a.png"
        alt="Basic Learning Skills Illustration"
        className="w-[620px] h-auto object-contain"
      />
    </div>

    {/* RIGHT: Content */}
    <div>
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
  Basic Life Skills
</h1>

<p className="mt-4 text-lg font-semibold text-yellow-400">
  Learn Essential Daily Skills for Safe & Smart Living
</p>

<p className="mt-4 text-slate-600 max-w-md">
  Practical lessons that teach students road safety, traffic rules,
  ATM usage, money handling, and responsible everyday behavior.
</p>
      {/* Feature Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Card 1 */}
      {/* Card 1 */}
<div className="p-5 border rounded-xl shadow-sm flex gap-4">
  <div className="text-yellow-500 text-xl">🚦</div>
  <div>
    <h3 className="font-semibold text-slate-800">
      Road & Traffic Awareness
    </h3>
    <p className="text-sm text-slate-600">
      Learn traffic signals, road crossing rules, and public safety.
    </p>
  </div>
</div>

{/* Card 2 */}
<div className="p-5 border rounded-xl shadow-sm flex gap-4">
  <div className="text-yellow-500 text-xl">🏧</div>
  <div>
    <h3 className="font-semibold text-slate-800">
      Financial Basics
    </h3>
    <p className="text-sm text-slate-600">
      Understand ATM usage, money handling, and safe banking habits.
    </p>
  </div>
</div>

{/* Card 3 */}
<div className="md:col-span-2 p-5 border rounded-xl shadow-sm flex gap-4">
  <div className="text-yellow-500 text-xl">🛣</div>
  <div>
    <h3 className="font-semibold text-slate-800">
      Everyday Responsibility Skills
    </h3>
    <p className="text-sm text-slate-600">
      Build discipline, awareness, and responsible public behavior.
    </p>
  </div>
</div>
        {/* Card 3 */}
        <div className="md:col-span-2 p-5 border rounded-xl shadow-sm flex gap-4">
          <div className="text-yellow-500 text-xl">🚀</div>
          <div>
            <h3 className="font-semibold text-slate-800">
              100+ Activities & Practice Tasks
            </h3>
            <p className="text-sm text-slate-600">
              Step-by-step lessons, daily life activities, and confidence-building exercises.
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
            Empowering Students Through
            <br />
            <span className="text-slate-400">
              Basic Learning Skills
            </span>
          </h3>
        </div>

    <p className="text-lg text-slate-600 leading-relaxed font-light">
  Basic Life Skills focuses on essential everyday knowledge that every student
  must know to stay safe, independent, and responsible in society.
</p>



        <div className="space-y-4">
          {[
  "Understand traffic signals and road safety rules",
  "Learn safe road crossing techniques",
  "Know which side of the road to walk on",
  "Understand ATM machine usage step-by-step",
  "Learn basic money management and saving habits",
  
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
                                    <div className="relative group overflow-hidden rounded-[40px] border border-slate-100 shadow-xl">
                                        <img
                                            src= "/images/skills/image.png"
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
 
 export default Basicskills
