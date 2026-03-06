import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Send, CheckCircle2, Award, Zap, ShieldCheck } from 'lucide-react';

const MDMessage = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const commitments = [
        { icon: <Zap size={20} />, text: "Ensuring timely printing and distribution of textbooks across all districts" },
        { icon: <Award size={20} />, text: "Maintaining the highest standards of quality in paper, printing, and binding" },
        { icon: <ShieldCheck size={20} />, text: "Strengthening transparency and accountability in all operations" },
        { icon: <CheckCircle2 size={20} />, text: "Adopting digital systems for efficient inventory and supply chain management" }
    ];

    return (
        <div className="py-20 px-6 max-w-7xl mx-auto">
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="grid grid-cols-1 lg:grid-cols-12 gap-16"
            >
                {/* Left Sidebar: Profile Photo & Info */}
                <motion.div variants={fadeIn} className="lg:col-span-4 space-y-8">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[40px] opacity-10 blur-xl group-hover:opacity-20 transition-all duration-700" />
                        <div className="relative overflow-hidden rounded-[32px] aspect-[4/5] bg-slate-100 border border-slate-200 shadow-2xl">
                            <img 
                                src="/images/KeyParticipants/shri_yatendra_pal.png" 
                                alt="Managing Director" 
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-l-4 border-blue-600 pl-6">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
                            Shri Yatendra Kumar Pal
                        </h2>
                        <div className="space-y-1">
                            <p className="text-sm font-black uppercase tracking-widest text-blue-600">Managing Director</p>
                            <p className="text-sm font-medium text-slate-500 leading-tight">
                                Bihar State Text Book Publishing Corporation Ltd.
                            </p>
                        </div>
                    </div>

                    {/* Quick Stats or Highlights */}
                    <div className="bg-slate-50 rounded-3xl p-8 space-y-6 border border-white/80 italic text-slate-600 text-sm leading-relaxed relative">
                        <Quote className="absolute -top-4 -left-4 text-blue-600/10 w-20 h-20 rotate-180" />
                        "Ensuring that textiles of knowledge reach every student in Bihar, timely and with uncompromised quality."
                    </div>
                </motion.div>

                {/* Right Content: The Message */}
                <motion.div variants={fadeIn} className="lg:col-span-8 space-y-12">
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                            Managing Director’s <br />
                            <span className="text-slate-400 underline decoration-blue-100 underline-offset-8">Message</span>
                        </h1>
                        <p className="text-xl font-medium text-slate-500 leading-relaxed max-w-2xl">
                            A vision for excellence in educational resources and equitable access across Bihar.
                        </p>
                    </div>

                    <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-extra-relaxed space-y-8">
                        <section className="space-y-4">
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
                                <div className="w-8 h-[2px] bg-blue-600" /> Welcome Note
                            </h3>
                            <p>
                                It gives me immense pleasure to connect with all stakeholders through this platform. The Bihar State Text Book Publishing Corporation Ltd. plays a pivotal role in strengthening the foundation of education by ensuring the timely production and distribution of quality textbooks across the state.
                            </p>
                            <p>
                                Education is the backbone of a progressive society, and access to well-designed, affordable, and curriculum-aligned textbooks is essential for academic excellence. Our corporation remains committed to supporting the Government of Bihar in its mission to provide equitable and inclusive education to every child.
                            </p>
                        </section>

                        <section className="bg-slate-400 rounded-[40px] p-10 md:p-14 text-black space-y-8 shadow-2xl shadow-blue-500/20 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000" />
                            
                            <h3 className="text-2xl font-black tracking-tight">Our Commitment</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {commitments.map((item, i) => (
                                    <div key={i} className="flex gap-4 items-start bg-white/10 p-5 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-colors">
                                        <div className="text-blue-200">{item.icon}</div>
                                        <p className="text-sm font-semibold leading-relaxed">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-black font-medium">
                                Through strategic planning and continuous monitoring, we strive to ensure that textbooks reach students before the commencement of the academic session.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
                                <div className="w-8 h-[2px] bg-blue-600" /> Focus on Quality & Innovation
                            </h3>
                            <p>
                                Quality remains at the core of our operations. From manuscript approval to final printing, every stage undergoes strict supervision and inspection. We are progressively integrating modern printing technologies and digital tracking systems to enhance efficiency and reduce delays.
                            </p>
                            <p className="font-bold text-slate-800 border-l-4 border-indigo-600 pl-6 italic">
                                Our goal is not only to meet present demands but also to build a robust, technology-driven framework for the future.
                            </p>
                        </section>

                        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                            <div className="space-y-4">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Collaboration</h3>
                                <p className="text-sm">
                                    The successful execution of our responsibilities is possible through the collective efforts of our officers, employees, registered printers, wholesalers, depot staff, and education departments across districts.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Moving Forward</h3>
                                <p className="text-sm">
                                    As we move ahead, our vision remains clear — to ensure that every student in Bihar receives quality textbooks on time, without compromise. We remain committed to transparency, efficiency, and excellence in service.
                                </p>
                            </div>
                        </section>

                        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-end gap-10">
                            <div className="space-y-4">
                                <p className="text-slate-400 font-medium italic">Let us work together to build a stronger educational ecosystem for the future generations of our state.</p>
                                <div className="space-y-1">
                                    <h4 className="text-xl font-black text-slate-900"> Shri Yatendra Kumar Pal</h4>
                                    <p className="text-xs font-black uppercase text-blue-600 tracking-tighter">Managing Director, BSTPC</p>
                                </div>
                            </div>
                            
                            
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default MDMessage;

