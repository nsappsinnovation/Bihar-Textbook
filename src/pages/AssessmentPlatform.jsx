
import React from 'react'
import { Link } from "react-router-dom";
import { useRef } from "react";
import { BookOpen, Award, Users, Search, Target, CheckCircle2, FileText, ArrowLeft, ArrowRight, Brain, Zap, LineChart } from 'lucide-react';
import { motion } from 'framer-motion';

const AssessmentPlatform = () => {
    const sliderRef = useRef(null);

    const stats = [
        { label: "ASSESSMENTS", value: "1M+", sub: "Tests Conducted", icon: <Target size={20} /> },
        { label: "STUDENTS", value: "300K+", sub: "Active Users", icon: <Users size={20} /> },
        { label: "ACCURACY", value: "99%", sub: "Automated Scoring", icon: <Award size={20} /> },
        { label: "SUBJECTS", value: "12+", sub: "Covered by NEP", icon: <BookOpen size={20} /> }
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
            title: "Adaptive Testing",
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600",
            description: "Assessments that adapt to student's skill levels, providing personalized difficulty paths.",
            details: [
                "Skill-Based Paths",
                "Dynamic Difficulty",
                "Personalized Growth"
            ],
        },
        {
            title: "Instant Feedback",
            image: "https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91?auto=format&fit=crop&q=80&w=600",
            description: "Receive immediate scores and detailed explanations for every answer, enhancing learning speed.",
            details: [
                "Real-time Scoring",
                "Detailed Explainers",
                "Concept Review"
            ],
        },
        {
            title: "Performance Analytics",
            image: "https://imgs.search.brave.com/QoeJQHGjKLl26FW7wFDi41KA59a-vdJ9AzAA7d9SIcU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMz/Mzc1MTM4NC92ZWN0/b3IvZWNvbm9teS1n/cm93dGgtY2hhcnQt/Z3JhcGgtcmlzZS1y/aXNpbmctdXAtZXhj/aGFuZ2UtZmluYW5j/aWFsLWJpdGNvaW4t/ZXRoZXJldW0tbGlu/ZXMtdmVjdG9yLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz03/RjdOMVBnbEdtb0lf/d1dyaWlraF9ZMEhT/bHNHWUozRmtjSU1w/a2pkWkZnPQ",
            description: "Comprehensive dashboards for students and teachers to track progress over time.",
            details: [
                "Progress Charts",
                "Strength Mapping",
                "Gap Analysis"
            ],
        },
        {
            title: "Practice Marketplace",
            image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=600",
            description: "Access a wide variety of practice papers and previous year questions for exam preparation.",
            details: [
                "Exam Bank",
                "Chapter Practice",
                "Quiz Challenges"
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
                            src="public/images/student assessment/student assessment.png"
                            alt="Student Assessment Platform"
                            className="w-[620px] h-auto object-cover"
                        />
                    </div>

                    {/* RIGHT: Content */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                            Assessment & Practice Platform
                        </h1>
                        <p className="mt-4 text-lg font-semibold text-violet-500">
                            Empowering Students with Data-Driven Growth
                        </p>
                        <p className="mt-4 text-slate-600 max-w-md">
                            Our integrated digital assessment system offers chapter-wise tests, instant evaluation, and personalized performance analytics to help every student excel.
                        </p>

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                                <div className="text-violet-500 text-xl"><Brain size={20} /></div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">Smart Learning</h3>
                                    <p className="text-sm text-slate-600">Adaptive tests for better understanding.</p>
                                </div>
                            </div>
                            <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                                <div className="text-violet-500 text-xl"><LineChart size={20} /></div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">Growth Tracking</h3>
                                    <p className="text-sm text-slate-600">Visual analytics for students & teachers.</p>
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
                                <div className="p-3 bg-violet-50 text-violet-600 rounded-xl w-fit">
                                    {stat.icon}
                                </div>
                                <div className="overflow-hidden">
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
                                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-violet-600">
                                    Program Overview
                                </h2>
                                <h3 className="text-4xl font-extrabold text-slate-900 leading-tight">
                                    Empowering Students Through
                                    <br />
                                    <span className="text-slate-400">
                                        Smart Assessment
                                    </span>
                                </h3>
                            </div>

                            <p className="text-lg text-slate-600 leading-relaxed font-light">
                                Our assessment platform provides students with a comprehensive suite of tools to evaluate their learning progress. From adaptive testing to real-time analytics, we help students identify their strengths and areas for improvement, ensuring a data-driven path to academic excellence.
                            </p>

                            <div className="space-y-4">
                                {[
                                    "Adaptive testing tailored to student skill levels",
                                    "Instant evaluation and detailed performance feedback",
                                    "Personalized analytics for students and teachers",
                                    "Chapter-wise tests aligned with the core curriculum"
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 text-sm font-bold text-slate-700"
                                    >
                                        <CheckCircle2 size={18} className="text-violet-600" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="lg:col-span-7 lg:mt-[120px]">
                            <div className="relative group overflow-hidden rounded-[40px] border border-slate-100 shadow-xl">
                                <img
                                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800"
                                    alt="Assessment Platform"
                                    className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                                <div className="absolute bottom-10 left-10 text-white">
                                    <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">Our Facility</p>
                                    <h4 className="text-2xl font-bold">Smart Evaluation</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-32 bg-slate-900 px-6 rounded-[60px] mx-4 mb-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                        <div className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-violet-400">Workflow</h2>
                            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">Practice & Evaluation<br /></h3>
                        </div>
                    </div>

                    <div ref={sliderRef} className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 no-scrollbar">
                        {processSteps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeIn}
                                transition={{ delay: i * 0.1 }}
                                className="snap-start flex-shrink-0 w-[85%] sm:w-[60%] lg:w-[32%] bg-white/5 backdrop-blur-md border border-white/10 p-12 rounded-[40px] hover:border-violet-500/50 transition-all duration-500 group"
                            >
                                <div className="mb-10 rounded-3xl bg-white flex items-center justify-center h-64 overflow-hidden">
                                    <img src={step.image} alt={step.title} loading="lazy" className="h-full w-full object-cover" />
                                </div>
                                <h4 className="text-xl font-black text-white mb-6 uppercase tracking-tight">{step.title}</h4>
                                <p className="text-violet-100/60 leading-relaxed font-light mb-8 text-sm">{step.description}</p>
                                <div className="space-y-3 border-t border-white/5 pt-8">
                                    {step.details.map((detail, j) => (
                                        <div key={j} className="flex items-center gap-3 text-[11px] font-bold text-violet-100/40 uppercase tracking-widest">
                                            <div className="w-1 h-1 rounded-full bg-violet-500" />
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
                    <div className="absolute top-0 right-0 w-64 h-64 bg-violet-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000" />
                    <div className="relative z-10 space-y-10">
                        <div className="flex justify-center">
                            <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                                <FileText size={32} className="text-violet-600" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Start Assessing</h3>
                            <p className="text-lg text-slate-500 font-light max-w-xl mx-auto leading-relaxed">
                                Join our platform and start your journey towards academic excellence with smart assessments.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/" className="w-full sm:w-auto px-12 py-5 bg-slate-900 text-white rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-violet-600 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-slate-200 flex items-center justify-center gap-3">
                                Back to Hub <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AssessmentPlatform
