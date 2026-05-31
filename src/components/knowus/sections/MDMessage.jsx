import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote, Award, Zap, ShieldCheck, CheckCircle2, MessageSquare, ArrowUpRight, Shield } from 'lucide-react';

const MDMessage = () => {
    const [data, setData] = useState({
        name: 'Shri Yatendra Kumar Pal',
        designation: 'Managing Director',
        photo: '/images/KeyParticipants/shri_yatendra_pal.png',
        quote: 'Ensuring that textbooks of knowledge reach every student in Bihar, timely and with uncompromised quality.',
        welcomeNote: 'It gives me immense pleasure to connect with all stakeholders through this platform. The Bihar State Text Book Publishing Corporation Ltd. plays a pivotal role in strengthening the foundation of education by ensuring the timely production and distribution of quality textbooks across the state.',
        qualityNote: 'Quality remains at the core of our operations. From manuscript approval to final printing, every stage undergoes strict supervision and inspection.',
        collaboration: 'The successful execution of our responsibilities is possible through the collective efforts of our officers, employees, registered printers, wholesalers, depot staff, and education departments across districts.',
        movingForward: 'As we move ahead, our vision remains clear — to ensure that every student in Bihar receives quality textbooks on time, without compromise.'
    });

    useEffect(() => {
        const saved = localStorage.getItem('module_content_ku-md-message');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed && typeof parsed === 'object' && parsed.name) {
                    setData(parsed);
                }
            } catch (e) {
                console.error("Error loading MD data", e);
            }
        }
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const commitments = [
        { icon: <Zap size={18} />, title: "Rapid Logistics", text: "Ensuring timely printing and distribution of textbooks across all districts" },
        { icon: <Award size={18} />, title: "Highest Standards", text: "Maintaining the highest standards of quality in paper, printing, and binding" },
        { icon: <ShieldCheck size={18} />, title: "Full Transparency", text: "Strengthening transparency and accountability in all operations" },
        { icon: <CheckCircle2 size={18} />, title: "Digital Integration", text: "Adopting digital systems for efficient inventory and supply chain management" }
    ];

    return (
        <div className="relative bg-[#FDFDFF] min-h-screen py-16 lg:py-24 overflow-hidden">
            {/* Minimal Background Art */}
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />
            <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-blue-50/50 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-indigo-50/30 blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10 font-sans">
                
                {/* Back Link or Navigation Indicator */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <span>About Us</span>
                        <span>/</span>
                        <span className="text-blue-600">MD Message</span>
                    </div>
                </div>

                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start"
                >
                    
                    {/* Left Column: Minimal & Aesthetic Profile Card */}
                    <motion.div 
                        variants={fadeIn}
                        className="lg:col-span-5 space-y-8"
                    >
                        {/* Gallery-Style Image container */}
                        <div className="bg-white border border-slate-100 rounded-[28px] p-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.03)] relative group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 to-indigo-600/5 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            <div className="rounded-[20px] overflow-hidden aspect-[4/5] bg-slate-50 relative">
                                <img 
                                    src={data.photo} 
                                    alt={data.name} 
                                    className="w-full h-full object-cover transition-transform duration-[1.8s] hover:scale-[1.03] will-change-transform"
                                />
                            </div>
                        </div>

                        {/* Elegant Meta Description */}
                        <div className="space-y-4 px-2">
                            <div className="space-y-1.5">
                                <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Leadership Biography</span>
                                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                                    {data.name}
                                </h2>
                                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{data.designation}</p>
                            </div>
                            <p className="text-[13px] text-slate-400 font-semibold leading-relaxed">
                                Under the administrative control of the Department of Education, Bihar State Text Book Publishing Corporation Ltd., Patna.
                            </p>
                        </div>

                        {/* Minimal Accent Quote */}
                        <div className="bg-slate-50/50 border border-slate-100/80 rounded-2xl p-6 relative overflow-hidden">
                            <Quote className="absolute -right-2 -bottom-2 text-slate-200/40 w-16 h-16 pointer-events-none" />
                            <p className="text-[14px] italic font-semibold text-slate-600 leading-relaxed relative z-10">
                                "{data.quote}"
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Column: Clean Editorial Typography */}
                    <motion.div 
                        variants={fadeIn}
                        className="lg:col-span-7 space-y-12"
                    >
                        {/* Elegant Title */}
                        <div className="space-y-3">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                                Executive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Message</span>
                            </h1>
                            <div className="w-16 h-[3px] bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
                        </div>

                        {/* Welcome Note */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.25em] flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Welcome Address
                            </h3>
                            <p className="text-[18px] font-medium text-slate-700 leading-relaxed">
                                {data.welcomeNote}
                            </p>
                        </div>

                        {/* Commitments Section (Aesthetic Minimal Cards) */}
                        <div className="space-y-6">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.25em] flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Our Core Commitments
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {commitments.map((item, i) => (
                                    <div key={i} className="bg-white border border-slate-100/80 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-100/50 transition-all duration-300 group">
                                        <div className="w-9 h-9 rounded-xl bg-blue-50/50 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform shrink-0 mb-4 border border-blue-100/20">
                                            {item.icon}
                                        </div>
                                        <h4 className="text-[13.5px] font-bold text-slate-900 mb-1">{item.title}</h4>
                                        <p className="text-[12.5px] text-slate-500 leading-relaxed font-medium">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quality Section */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.25em] flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Quality & Innovation Focus
                            </h3>
                            <div className="bg-slate-50/40 p-6 rounded-2xl border border-slate-100 space-y-4">
                                <p className="text-[14.5px] text-slate-600 leading-relaxed font-medium">
                                    {data.qualityNote}
                                </p>
                                <div className="border-l-2 border-blue-600 pl-4 py-0.5">
                                    <p className="text-[13.5px] font-bold text-blue-900 italic">
                                        "Our goal is not only to meet present demands but also to build a robust, technology-driven framework for the future."
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Collaboration & Future Path Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                            <div className="space-y-2.5">
                                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-1 h-3.5 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full shrink-0" />
                                    Collaboration
                                </h4>
                                <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                                    {data.collaboration}
                                </p>
                            </div>
                            <div className="space-y-2.5">
                                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-1 h-3.5 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full shrink-0" />
                                    Moving Forward
                                </h4>
                                <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                                    {data.movingForward}
                                </p>
                            </div>
                        </div>

                        {/* Signature Block */}
                        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                            <p className="text-slate-400 font-semibold italic text-xs md:text-sm text-center md:text-left max-w-sm">
                                "Let us work together to build a stronger educational ecosystem for future generations."
                            </p>
                            
                            <div className="text-center md:text-right">
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">{data.name}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Managing Director, BSTPC</p>
                            </div>
                        </div>

                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default MDMessage;
