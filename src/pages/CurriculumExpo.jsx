
import React from 'react'
import { Link } from "react-router-dom";
import { useRef } from "react";
import { BookOpen, Award, Users, Search, Target, CheckCircle2, FileText, ArrowLeft, ArrowRight, Zap, Monitor, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const CurriculumExpo = () => {
    const sliderRef = useRef(null);

    const stats = [
        { label: "EXHIBITS", value: "150+", sub: "Pedagogical Innovations", icon: <Zap size={20} /> },
        { label: "ATTENDEES", value: "10K+", sub: "Educators & Leaders", icon: <Users size={20} /> },
        { label: "WORKSHOPS", value: "40+", sub: "Interactive Sessions", icon: <BookOpen size={20} /> },
        { label: "LEGACY", value: "3Yrs+", sub: "Modernizing Education", icon: <Award size={20} /> }
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
            title: "NEP Integration",
            image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600",
            description: "Showcasing how the National Education Policy 2020 is being implemented in Bihar's curriculum.",
            details: [
                "NEP Framework",
                "Skill-Based Learning",
                "Holistic Pedagogy"
            ],
        },
        {
            title: "Interactive Textbooks",
            image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=600",
            description: "Demos of next-gen textbooks with QR codes, AR features, and embedded digital assets.",
            details: [
                "QR Integration",
                "AR Demos",
                "Digital Assets"
            ],
        },
        {
            title: "Teacher Empowerment",
            image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80&w=600",
            description: "Workshops focused on equipping teachers with modern tools and classroom management techniques.",
            details: [
                "Smart Tools",
                "Pedagogy Training",
                "Peer Networking"
            ],
        },
        {
            title: "Future of Learning",
            image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600",
            description: "Exhibitions on AI in education, coding for kids, and remote learning solutions.",
            details: [
                "AI in Classroom",
                "Coding Modules",
                "Hybrid Models"
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
                            src="public/images/curriculam expo/curriculam mobilization.png"
                            alt="Curriculum Mobilization Expo"
                            className="w-[620px] h-auto object-cover"
                        />
                    </div>

                    {/* RIGHT: Content */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                            Curriculum Mobilization Expo
                        </h1>
                        <p className="mt-4 text-lg font-semibold text-blue-500">
                            Innovating Education for the 21st Century
                        </p>
                        <p className="mt-4 text-slate-600 max-w-md">
                            The Curriculum Mobilization Expo is a showcase of Bihar's commitment to modernization, alignment with NEP 2020, and the introduction of interactive learning tools.
                        </p>

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                                <div className="text-blue-500 text-xl"><Monitor size={20} /></div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">Tech Integration</h3>
                                    <p className="text-sm text-slate-600">Demos of digital and AR learning.</p>
                                </div>
                            </div>
                            <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                                <div className="text-blue-500 text-xl"><Globe size={20} /></div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">NEP Aligned</h3>
                                    <p className="text-sm text-slate-600">Bringing policy to practice.</p>
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
                                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">
                                    Program Overview
                                </h2>
                                <h3 className="text-4xl font-extrabold text-slate-900 leading-tight">
                                    Modernizing Educational
                                    <br />
                                    <span className="text-slate-400">
                                        Pedagogy
                                    </span>
                                </h3>
                            </div>

                            <p className="text-lg text-slate-600 leading-relaxed font-light">
                                The Curriculum Mobilization Expo is more than just an exhibition; it's a movement to bring modern, student-centered learning to every classroom in Bihar. By showcasing the latest pedagogical innovations and aligning them with NEP 2020, we empower educators to create engaging and effective learning experiences.
                            </p>

                            <div className="space-y-4">
                                {[
                                    "Showcase of interactive and AR-powered textbooks",
                                    "Integration strategies for NEP 2020 guidelines",
                                    "Collaborative workshops for teacher empowerment",
                                    "Demonstrations of digital assets and smart classroom tools"
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
                                    src="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80&w=800"
                                    alt="Curriculum Mobilization Expo"
                                    className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                                <div className="absolute bottom-10 left-10 text-white">
                                    <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">Our Facility</p>
                                    <h4 className="text-2xl font-bold">Innovation Hub</h4>
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
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-400">Exhibition</h2>
                            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">Modernizing Pedagogy<br /></h3>
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
                                className="snap-start flex-shrink-0 w-[85%] sm:w-[60%] lg:w-[32%] bg-white/5 backdrop-blur-md border border-white/10 p-12 rounded-[40px] hover:border-blue-500/50 transition-all duration-500 group"
                            >
                                <div className="mb-10 rounded-3xl bg-white flex items-center justify-center h-64 overflow-hidden">
                                    <img src={step.image} alt={step.title} loading="lazy" className="h-full w-full object-cover" />
                                </div>
                                <h4 className="text-xl font-black text-white mb-6 uppercase tracking-tight">{step.title}</h4>
                                <p className="text-blue-100/60 leading-relaxed font-light mb-8 text-sm">{step.description}</p>
                                <div className="space-y-3 border-t border-white/5 pt-8">
                                    {step.details.map((detail, j) => (
                                        <div key={j} className="flex items-center gap-3 text-[11px] font-bold text-blue-100/40 uppercase tracking-widest">
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
                            <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Explore the Expo</h3>
                            <p className="text-lg text-slate-500 font-light max-w-xl mx-auto leading-relaxed">
                                Join us at the next Expo and see the future of education in Bihar firsthand.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/" className="w-full sm:w-auto px-12 py-5 bg-slate-900 text-white rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-blue-600 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-slate-200 flex items-center justify-center gap-3">
                                Back to Home <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CurriculumExpo
