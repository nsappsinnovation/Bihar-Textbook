
import React from 'react'
import { Link } from "react-router-dom";
import { useRef } from "react";
import { BookOpen, Award, Users, Printer, Truck, ShieldCheck, ArrowLeft, ArrowRight, History, Target, CheckCircle2, FileText, Star, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const PustakMela = () => {
    const sliderRef = useRef(null);

    const stats = [
        { label: "EXHIBITORS", value: "200+", sub: "Publishers & Bookstores", icon: <BookOpen size={20} /> },
        { label: "VISITORS", value: "500K+", sub: "Annual Footfall", icon: <Users size={20} /> },
        { label: "EVENTS", value: "50+", sub: "Author Meets & Workshops", icon: <Star size={20} /> },
        { label: "LEGACY", value: "25Yrs+", sub: "Promoting Literacy", icon: <History size={20} /> }
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
            title: "Author Interactions",
            image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80&w=600",
            description: "Meet your favorite authors, attend book signings, and participate in engaging literary discussions.",
            details: [
                "Live Q&A Sessions",
                "Book Signings",
                "Workshops"
            ],
        },
        {
            title: "Digital Learning Expo",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600",
            description: "Experience the latest in educational technology, including e-books and interactive learning platforms.",
            details: [
                "E-Book Demos",
                "Ed-Tech Stalls",
                "Digital Resources"
            ],
        },
        {
            title: "Children's Corner",
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600",
            description: "A dedicated space for young readers with storytelling, competitions, and fun educational games.",
            details: [
                "Storytelling",
                "Drawing Contests",
                "Educational Games"
            ],
        },
        {
            title: "Cultural Showcase",
            image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=600",
            description: "Celebrate Bihar's rich heritage through cultural performances and traditional art exhibitions.",
            details: [
                "Folk Performances",
                "Art Exhibits",
                "Heritage Stalls"
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
                            src="public/images/pustak mela/pustak mela.png"
                            alt="Bihar Pustak Mela"
                            className="w-[620px] h-auto object-cover"
                        />
                    </div>

                    {/* RIGHT: Content */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                            Bihar Pustak Mela
                        </h1>
                        <p className="mt-4 text-lg font-semibold text-blue-500">
                            Celebrating the Joy of Reading & Culture
                        </p>
                        <p className="mt-4 text-slate-600 max-w-md">
                            The Bihar Pustak Mela is an annual celebration of literature, heritage, and education, bringing together authors, publishers, and readers from across the country.
                        </p>

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                                <div className="text-blue-500 text-xl"><Calendar size={20} /></div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">Annual Event</h3>
                                    <p className="text-sm text-slate-600">A fixture in Bihar's cultural calendar.</p>
                                </div>
                            </div>
                            <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                                <div className="text-blue-500 text-xl"><MapPin size={20} /></div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">Patna & More</h3>
                                    <p className="text-sm text-slate-600">Rotating across major cities in Bihar.</p>
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
                                                A Hub for
                                                <br />
                                                <span className="text-slate-400">
                                                    Knowledge & Innovation
                                                </span>
                                            </h3>
                                        </div>
            
                                        <p className="text-lg text-slate-600 leading-relaxed font-light">
                                             Our mission is to foster a reading culture and provide a platform for educational excellence. We bring the best of literature and educational tools directly to the people of Bihar.
                                </p>
            
                                        <div className="space-y-4">
                                            {[ "Promoting local and national publishers",
                                    "Fostering literacy among youth",
                                    "Showcasting digital educational tools",
                                    "Celebrating regional languages & arts"
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
                                                src="public/images/pustak mela/image.png"
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
            
                       
            { /* <section className="py-32 px-6 font-sans">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
                        <div className="lg:col-span-12 space-y-10">
                            <div className="space-y-4 text-center">
                                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">Program Overview</h2>
                                <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                                    A Hub for <span className="text-slate-400">Knowledge & Innovation</span>
                                </h3>
                                <p className="text-lg text-slate-600 leading-relaxed font-light max-w-3xl mx-auto">
                                    Our mission is to foster a reading culture and provide a platform for educational excellence. We bring the best of literature and educational tools directly to the people of Bihar.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-10">
                                {[
                                    "Promoting local and national publishers",
                                    "Fostering literacy among youth",
                                    "Showcasting digital educational tools",
                                    "Celebrating regional languages & arts"
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col items-center text-center p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm hover:shadow-md transition-shadow">
                                        <CheckCircle2 size={32} className="text-blue-500 mb-6" />
                                        <p className="text-sm font-bold text-slate-700">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section> */

            <section className="py-32 bg-slate-900 px-6 rounded-[60px] mx-4 mb-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                        <div className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-400">Highlights</h2>
                            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">Experience Pustak Mela<br /></h3>
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
            </section> }

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
                            <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Visit the Mela</h3>
                            <p className="text-lg text-slate-500 font-light max-w-xl mx-auto leading-relaxed">
                                Join us at the next Bihar Pustak Mela and immerse yourself in the world of books and culture.
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

export default PustakMela
