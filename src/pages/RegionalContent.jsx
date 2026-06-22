
import React from 'react'
import { Link } from "react-router-dom";
import { useRef } from "react";
import { BookOpen, Award, Users, Search, Target, CheckCircle2, FileText, ArrowLeft, ArrowRight, Languages, Globe, Map } from 'lucide-react';
import { motion } from 'framer-motion';

const RegionalContent = () => {
    const sliderRef = useRef(null);

    const stats = [
        { label: "LANGUAGES", value: "10+", sub: "Regional Dialects", icon: <Languages size={20} /> },
        { label: "TEXTBOOKS", value: "500+", sub: "Translated Modules", icon: <BookOpen size={20} /> },
        { label: "REACH", value: "100%", sub: "District Coverage", icon: <Globe size={20} /> },
        { label: "IMPACT", value: "2M+", sub: "Vernacular Learners", icon: <Users size={20} /> }
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
            title: "Dialect Research",
            image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=600",
            description: "Identifying and documenting regional dialects to ensure content authenticity and cultural relevance.",
            details: [
                "Field Research",
                "Linguistic Depth",
                "Cultural Mapping"
            ],
        },
        {
            title: "Content Translation",
            image: "https://imgs.search.brave.com/okrHYvm6B-jzxh_MuDVvxs5PqebLHz-deVNzxZVLy-A/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTc5/MzU1MjkxNS9waG90/by90cmFuc2xhdGlv/bi1zZXJ2aWNlcy1j/b25jZXB0LXRoZS1t/ZWV0aW5nLWF0LXRo/ZS13aGl0ZS1vZmZp/Y2UtdGFibGUuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPUV6/QkI0d2tENWxTWnNt/MVl3S1I1ZHZFd3p3/SklJNjh6dHRwSFRv/NlE2eVk9",
            description: "Adapting core curriculum materials into regional languages without losing academic rigor.",
            details: [
                "Expert Linguists",
                "Subject Integrity",
                "Peer Review"
            ],
        },
        {
            title: "Digital Localization",
            image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=600",
            description: "Converting physical content into digital formats, including audio and interactive modules in local languages.",
            details: [
                "Regional App UI",
                "Vernacular Audio",
                "Digital Resources"
            ],
        },
        {
            title: "Community Outreach",
            image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600",
            description: "Engaging with local communities to distribute and promote usage of regional learning materials.",
            details: [
                "Local Satellites",
                "Teacher Kits",
                "Awareness Drives"
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
                            src="public/images/regional content/regional content.png"
                            alt="Regional Content Drive"
                            className="w-[620px] h-auto object-cover "
                        />
                    </div>

                    {/* RIGHT: Content */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                            Regional Content Drive
                        </h1>
                        <p className="mt-4 text-lg font-semibold text-violet-500">
                            Learning in the Language of the Heart
                        </p>
                        <p className="mt-4 text-slate-600 max-w-md">
                            We are committed to making education inclusive by developing and promoting textbooks, audio content, and digital resources in regional languages of Bihar.
                        </p>

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                                <div className="text-violet-500 text-xl"><Languages size={20} /></div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">10+ Dialects</h3>
                                    <p className="text-sm text-slate-600">Covering Bhojpuri, Maithili, Magahi, and more.</p>
                                </div>
                            </div>
                            <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                                <div className="text-violet-500 text-xl"><Map size={20} /></div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">State-wide Reach</h3>
                                    <p className="text-sm text-slate-600">Ensuring access in every village.</p>
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
                                    Preserving Linguistic
                                    <br />
                                    <span className="text-slate-400">
                                        Diversity
                                    </span>
                                </h3>
                            </div>

                            <p className="text-lg text-slate-600 leading-relaxed font-light">
                                Our Regional Content Drive aims to bridge the gap between traditional learning and modern education by providing resources in the regional languages of Bihar. From Maithili to Bhojpuri, we ensure that every student can learn in their mother tongue, fostering better understanding and cultural pride.
                            </p>

                            <div className="space-y-4">
                                {[
                                    "Textbooks and audio content in 10+ regional dialects",
                                    "Culturally relevant learning materials designed for local communities",
                                    "Digital localization of core educational resources",
                                    "Widespread distribution through local outreach programs"
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
                                    src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=800"
                                    alt="Regional Content Drive"
                                    className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                                <div className="absolute bottom-10 left-10 text-white">
                                    <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">Our Facility</p>
                                    <h4 className="text-2xl font-bold">Vernacular Learning</h4>
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
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-violet-400">Strategy</h2>
                            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">Preserving Linguistic Heritage<br /></h3>
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
                            <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Explore the Drive</h3>
                            <p className="text-lg text-slate-500 font-light max-w-xl mx-auto leading-relaxed">
                                Access our repository of regional textbooks and digital resources to see our commitment to linguistic diversity.
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

export default RegionalContent
