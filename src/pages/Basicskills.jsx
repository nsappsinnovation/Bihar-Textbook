 
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
    title: "Communication Skills: Speaking Clearly",
    image: "/images/skills/a1.png",
    description:
      "Learn how to speak clearly and confidently so your message is understood in school, at home, and in daily life.",
    details: [
      "Speak with confidence and correct tone",
      "Use simple and clear sentences",
      "Improve pronunciation and voice clarity",
      "Learn how to explain your thoughts properly",
      "Practice speaking without fear or hesitation",
    ],
  },

  {
    title: "Interpersonal Skills: Listening & Understanding",
    image: "/images/skills/a2.png",
    description:
      "Build strong interpersonal skills by learning active listening, understanding others, and responding respectfully.",
    details: [
      "Learn active listening (not just hearing)",
      "Understand emotions and feelings in conversation",
      "Respond politely and respectfully",
      "Improve social behavior in group discussions",
      "Build stronger friendships and relationships",
    ],
  },

  {
    title: "Confidence Building: Self Introduction",
    image: "/images/skills/a3.png",
    description:
      "Master self-introduction skills to feel confident while meeting new people, speaking in class, or presenting yourself.",
    details: [
      "How to introduce yourself confidently",
      "Learn body language + eye contact",
      "Speak without nervousness or fear",
      "Build confidence for interviews and public speaking",
      "Improve personality and communication style",
    ],
  },

  {
    title: "Teamwork Skills: Working with Others",
    image: "/images/skills/a4.png",
    description:
      "Learn teamwork skills to collaborate in school projects, group activities, and daily life situations.",
    details: [
      "How to work in groups effectively",
      "Sharing responsibilities and helping others",
      "Respecting others’ ideas and opinions",
      "Building cooperation and team spirit",
      "Improving leadership inside a group",
    ],
  },

  {
    title: "Leadership Skills: Taking Initiative",
    image: "/images/skills/a5.png",
    description:
      "Develop leadership qualities like decision-making, responsibility, and guiding others with confidence.",
    details: [
      "Learn how to take responsibility and lead",
      "Improve decision-making and problem solving",
      "Become confident in taking initiative",
      "Learn how to motivate and support others",
      "Build discipline and strong personality skills",
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
        Basic Learning Skills
      </h1>

      {/* Highlight text */}
      <p className="mt-4 text-lg font-semibold text-yellow-500">
        Build Confidence, Communication & Life Skills — in a Fun Way!
      </p>

      {/* Description */}
      <p className="mt-4 text-slate-600 max-w-md">
        Interactive and engaging lessons designed to improve communication,
        interpersonal skills, leadership, teamwork, and everyday confidence for
        students.
      </p>

      {/* Feature Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Card 1 */}
        <div className="p-5 border rounded-xl shadow-sm flex gap-4">
          <div className="text-yellow-500 text-xl">🎯</div>
          <div>
            <h3 className="font-semibold text-slate-800">
              Skill-Based Learning
            </h3>
            <p className="text-sm text-slate-600">
              Focus on real-world skills like communication, confidence, and teamwork.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-5 border rounded-xl shadow-sm flex gap-4">
          <div className="text-yellow-500 text-xl">🤝</div>
          <div>
            <h3 className="font-semibold text-slate-800">
              Communication & Interpersonal
            </h3>
            <p className="text-sm text-slate-600">
              Improve speaking, listening, expressing emotions, and social interaction.
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
          Basic Learning Skills is a student-focused program designed to build
          strong foundations in communication, interpersonal behavior, teamwork,
          leadership, confidence, and problem-solving. These are the real-world
          skills that help students perform better in school, interact better in
          society, and grow into responsible and confident individuals.
        </p>

        <p className="text-lg text-slate-600 leading-relaxed font-light">
          Instead of only memorizing content, students learn how to express
          themselves clearly, work with others respectfully, handle emotions,
          take initiative, and improve their daily decision-making — skills that
          are essential for both academics and future careers.
        </p>

        <div className="space-y-4">
          {[
            "Build strong communication: speaking, listening, and expressing ideas clearly",
            "Develop interpersonal skills: respect, empathy, and social confidence",
            "Learn teamwork and collaboration for school projects and group activities",
            "Improve leadership qualities: initiative, responsibility, and decision-making",
            "Boost confidence through self-introduction, presentation, and interaction practice",
            "Strengthen problem-solving and critical thinking for real-life situations",
            "Encourage discipline, time management, and goal setting for better growth",
            "Support personality development and emotional intelligence in students",
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
      <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Image 1 */}
        <div className="relative group overflow-hidden rounded-[40px] border border-slate-100 shadow-xl md:col-span-2">
          <img
            src="/images/skills/a4.png"
            alt="Basic Skills Learning"
            className="w-full aspect-[16/9] object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          <div className="absolute bottom-10 left-10 text-white">
            <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">
              Core Skills Program
            </p>
          
          </div>
        </div>

        {/* Image 2 */}
        <div className="relative group overflow-hidden rounded-[40px] border border-slate-100 shadow-xl">
          <img
            src="/images/skills/a1.png"
            alt="Communication Skills"
            className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          <div className="absolute bottom-8 left-8 text-white">
            <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">
              Communication
            </p>
            
          </div>
        </div>

        {/* Image 3 */}
        <div className="relative group overflow-hidden rounded-[40px] border border-slate-100 shadow-xl">
          <img
            src="/images/skills/a3.png"
            alt="Teamwork Skills"
            className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          <div className="absolute bottom-8 left-8 text-white">
            <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">
              Teamwork
            </p>
            
          </div>
        </div>

        {/* Image 4 */}
        <div className="relative group overflow-hidden rounded-[40px] border border-slate-100 shadow-xl md:col-span-2">
          <img
            src="/images/skills/a2.png"
            alt="Leadership Skills"
            className="w-full aspect-[16/9] object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          <div className="absolute bottom-10 left-10 text-white">
            <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">
              Leadership & Confidence
            </p>
           
          </div>
        </div>

      </div>
    </div>
  </div>
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
      <section className="py-20 px-6 bg-white">
  <div className="max-w-6xl mx-auto border border-slate-300">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

      {/* LEFT */}
      <div className="p-10 border-b md:border-b-0 border-slate-300">
        <h2 className="text-red-600 font-bold text-lg uppercase tracking-wide mb-6">
          Trending Pages on Basic Skills
        </h2>

        <div className="space-y-10">
          {trendingPages.map((item, i) => (
            <Link
              key={i}
              to={`/trending/${item.slug}`}
              className="flex gap-4 group"
            >
              {/* Arrow */}
              <span
                className="mt-[6px] w-0 h-0 
                border-t-[5px] border-b-[5px] border-l-[7px]
                border-t-transparent border-b-transparent border-l-slate-700"
              />

              <div>
                <h3 className="text-blue-900 font-bold uppercase group-hover:underline">
                  {item.title}
                </h3>

                <p className="mt-2 text-slate-700 text-sm leading-relaxed">
                  {item.description}
                </p>

                <p className="mt-2 text-slate-500 text-xs">
                  {item.section}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="p-10">
        <h2 className="text-red-600 font-bold text-lg uppercase tracking-wide mb-2">
          Quizzes on Basic Skills
        </h2>

        <p className="text-slate-700 text-sm mb-6">
          Develop your skills with our interactive quizzes
        </p>

        <div className="space-y-10">
          {quizzes.map((quiz, i) => (
            <Link
              key={i}
              to={`/quiz/${quiz.slug}`}
              className="flex gap-4 group"
            >
              {/* Arrow */}
              <span
                className="mt-[6px] w-0 h-0 
                border-t-[5px] border-b-[5px] border-l-[7px]
                border-t-transparent border-b-transparent border-l-slate-700"
              />

              <div>
                <h3 className="text-blue-900 font-bold uppercase group-hover:underline">
                  {quiz.title}
                </h3>

                <p className="mt-2 text-slate-700 text-sm leading-relaxed">
                  {quiz.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Ad Box */}
       
      </div>

    </div>
  </div>
</section>

            
            
     </div>
     
   )
 }
 
 export default Basicskills
