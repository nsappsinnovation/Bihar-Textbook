import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, Users, Printer, Truck, ShieldCheck, ArrowLeft, ArrowRight, History, Target, CheckCircle2, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const PublishingMission = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const stats = [
        { label: "ANNUAL VOLUME", value: "25M+", sub: "Books Produced", icon: <BookOpen size={20} /> },
        { label: "USER REACH", value: "10M+", sub: "Active Students", icon: <Users size={20} /> },
        { label: "COMPLIANCE", value: "100%", sub: "NEP Standards", icon: <ShieldCheck size={20} /> },
        { label: "EXPERIENCE", value: "50+", sub: "Years of Service", icon: <Award size={20} /> }
    ];

    const processSteps = [
        {
            title: "Phase 1: Academic Strategy",
            description: "Detailed curriculum mapping and content development by state-approved panels.",
            details: ["NEP 2020 Realignment", "Expert Peer Review", "Digital Resource Mapping"],
            icon: <Target className="w-5 h-5" />
        },
        {
            title: "Phase 2: Technical Production",
            description: "High-precision automated printing workflow ensuring durability and clarity.",
            details: ["Eco-friendly Inks", "High-GSM Paper Quality", "Rigid Quality Control"],
            icon: <Printer className="w-5 h-5" />
        },
        {
            title: "Phase 3: Strategic Logistics",
            description: "Tiered distribution network delivering to every district and school center.",
            details: ["Real-time Tracking", "District Hub Management", "Last-mile Verification"],
            icon: <Truck className="w-5 h-5" />
        }
    ];

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-blue-100 selection:text-blue-700">
            {/* --- Minimal Header Hero --- */}
            <section className="pt-32 pb-20 px-6 border-b border-slate-50">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 shadow-sm"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Corporate Mission & Strategy</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight"
                    >
                        Foundation of High-Quality <br />
                        <span className="text-blue-600">Educational Literacy</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        The Bihar State Text Book Publishing Corporation is the authoritative body dedicated to the creation, production, and distribution of standardized curriculum materials.
                    </motion.p>
                </div>
            </section>

            {/* --- Facts Dashboard --- */}
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

            {/* --- Narrative Section --- */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
                        <div className="lg:col-span-5 space-y-10 sticky top-32">
                            <div className="space-y-4">
                                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">Institution Overview</h2>
                                <h3 className="text-4xl font-extrabold text-slate-900 leading-tight">
                                    Strategic Vision for <br />
                                    <span className="text-slate-400">Institutional Excellence</span>
                                </h3>
                            </div>
                            <p className="text-lg text-slate-600 leading-relaxed font-light">
                                Established in 1970, our mission transcends mere production. We serve as the backbone of the state's educational infrastructure, ensuring every learner accesses materials that are culturally relevant, pedagogically sound, and physically durable.
                            </p>
                            <div className="space-y-4">
                                {["Authorized NCERT Alignments", "State-wide Distribution Control", "Curriculum Compliance Framework"].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                                        <CheckCircle2 size={18} className="text-blue-600" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-7 grid grid-cols-1 gap-4">
                            <div className="relative group overflow-hidden rounded-[40px] border border-slate-100 shadow-xl">
                                <img
                                    src="/images/hero_classroom.png"
                                    alt="Facility"
                                    className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                                <div className="absolute bottom-10 left-10 text-white">
                                    <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">Our Facility</p>
                                    <h4 className="text-2xl font-bold">Standardized Manufacturing</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Process Flow --- */}
            <section className="py-32 bg-slate-900 px-6 rounded-[60px] mx-4 mb-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                        <div className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-400">Workflow</h2>
                            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">Standard Operating <br /> Procedures</h3>
                        </div>
                        <p className="text-blue-100/40 max-w-md font-light">
                            Our rigorous three-stage lifecycle ensures precision from the initial manuscript to the final delivery at rural school doorsteps.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {processSteps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeIn}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/5 backdrop-blur-md border border-white/10 p-12 rounded-[40px] hover:border-blue-500/50 transition-all duration-500 group"
                            >
                                <div className="mb-8 p-4 bg-blue-500/10 text-blue-400 rounded-2xl w-fit group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                    {step.icon}
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

            {/* --- Footer Engagement --- */}
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
                            <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Explore the Repository</h3>
                            <p className="text-lg text-slate-500 font-light max-w-xl mx-auto leading-relaxed">
                                Our standardized materials are available for review. Access the digital archive to understand our curriculum depth.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/books/1" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto px-12 py-5 bg-slate-900 text-white rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-blue-600 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-slate-200 flex items-center justify-center gap-3">
                                    Enter Library <ArrowRight size={16} />
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
    );
};

export default PublishingMission;
