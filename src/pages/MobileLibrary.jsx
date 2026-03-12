
import React from 'react'
import { Link } from "react-router-dom";
import { BookOpen, Map, Users, FolderOpen, Truck, Flag, ArrowLeft, ArrowRight, CheckCircle2, FileText, Globe, Book } from 'lucide-react';
import { motion } from 'framer-motion';

const MobileLibrary = () => {
    const stats = [
        { label: "Coverage", value: "500+", sub: "Villages Reached", icon: <Map size={20} /> },
        { label: "Books", value: "10K+", sub: "Distributed Monthly", icon: <BookOpen size={20} /> },
        { label: "Readers", value: "20K+", sub: "Students Engaged", icon: <Users size={20} /> },
        { label: "Vehicles", value: "50+", sub: "Mobile Units", icon: <Truck size={20} /> }
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
            title: "Route Planning",
            image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=600", 
            description: "Strategically planning routes to reach the most remote and underserved areas.",
            details: [
                "GPS Mapping",
                "Schedule Optimization",
                "Community Requests"
            ],
        },
        {
            title: "Book Selection",
            image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=600",
            description: "Curating a diverse collection of books suitable for various age groups and interests.",
            details: [
                "Regional Languages",
                "Educational Materials",
                "Storybooks"
            ],
        },
        {
            title: "Community Outreach",
            image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600",
            description: "Engaging with local communities to promote literacy and reading habits.",
            details: [
                "Reading Clubs",
                "Storytelling Sessions",
                "Parent Awareness"
            ],
        },
        {
            title: "Digital Access",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600",
            description: "Providing access to digital resources and tablets in mobile units.",
            details: [
                "E-Books",
                "Internet Access",
                "Digital Literacy"
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
                            src="images/mobile/mobile-library.png"
                            alt="Mobile Library Illustration"
                            className="w-[620px] h-auto object-contain"
                        />
                    </div>

                    {/* RIGHT: Content */}
                    <div>
                        {/* Heading */}
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                            Mobile Libraries
                        </h1>

                        {/* Highlight text */}
                        <p className="mt-4 text-lg font-semibold text-sky-500">
                            Bringing Knowledge to Your Doorstep
                        </p>

                        {/* Description */}
                        <p className="mt-4 text-slate-600 max-w-md">
                            Our fleet of mobile libraries travels to remote villages, ensuring every child has access to books and learning materials.
                        </p>

                        {/* Feature Cards */}
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Card 1 */}
                            <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                                <div className="text-sky-500 text-xl"><Truck /></div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">
                                        Accessibility
                                    </h3>
                                    <p className="text-sm text-slate-600">
                                        Reaching the unreached.
                                    </p>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                                <div className="text-sky-500 text-xl"><BookOpen /></div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">
                                        Diverse Collection
                                    </h3>
                                    <p className="text-sm text-slate-600">
                                        Books for all ages.
                                    </p>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="md:col-span-2 p-5 border rounded-xl shadow-sm flex gap-4">
                                <div className="text-sky-500 text-xl"><Globe /></div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">
                                        Community Impact
                                    </h3>
                                    <p className="text-sm text-slate-600">
                                        Fostering a culture of reading in rural communities.
                                    </p>
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
                                <div className="p-3 bg-sky-50 text-sky-600 rounded-xl w-fit">
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

            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">

                        {/* Left Content */}
                        <div className="lg:col-span-5 space-y-10">
                            <div className="space-y-4">
                                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-sky-600">
                                    Program Overview
                                </h2>
                                <h3 className="text-4xl font-extrabold text-slate-900 leading-tight">
                                    Education Without
                                    <br />
                                    <span className="text-slate-400">
                                        Boundaries
                                    </span>
                                </h3>
                            </div>

                            <p className="text-lg text-slate-600 leading-relaxed font-light">
                                The Mobile Library initiative is dedicated to eradicating illiteracy by taking the library to the people. We believe that distance should not be a barrier to education. Our vans are equipped with books, digital tools, and facilitators to create a holistic learning environment on wheels.
                            </p>

                            <div className="space-y-4">
                                {[
                                    "Regular visits to remote villages",
                                    "Access to curriculum and fictional books",
                                    "Interactive storytelling sessions",
                                    "Digital literacy workshops"
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 text-sm font-bold text-slate-700"
                                    >
                                        <CheckCircle2 size={18} className="text-sky-600" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="lg:col-span-7 lg:mt-[120px]">
                            <div className="relative group overflow-hidden rounded-[40px] border border-slate-100 shadow-xl">
                                <img
                                    src="images/mobile/mobile_library_outreach.jpg"
                                    alt="Rural Outreach"
                                    className="w-full aspect-[4/3] object-cover bg-white transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                                <div className="absolute bottom-10 left-10 text-white">
                                    <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">Outreach</p>
                                    <h4 className="text-2xl font-bold">Knowledge Network</h4>
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
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-sky-400">Workflow</h2>
                            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">Library Operations <br /></h3>
                        </div>
                    </div>

                    <div className="flex overflow-x-auto gap-8 pb-12 no-scrollbar snap-x snap-mandatory">
                        {processSteps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeIn}
                                transition={{ delay: i * 0.1 }}
                                className="min-w-[350px] md:min-w-[400px] bg-white/5 backdrop-blur-md border border-white/10 p-12 rounded-[40px] hover:border-sky-500/50 transition-all duration-500 group snap-center"
                            >
                                {/* Image */}
                                <div className="mb-10 overflow-hidden rounded-3xl">
                                    <img
                                        src={step.image}
                                        alt={step.title}
                                        loading="lazy"
                                        className="w-full h-auto max-h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>

                                <h4 className="text-xl font-black text-white mb-6 uppercase tracking-tight">{step.title}</h4>
                                <p className="text-sky-100/60 leading-relaxed font-light mb-8 text-sm">{step.description}</p>
                                <div className="space-y-3 border-t border-white/5 pt-8">
                                    {step.details.map((detail, j) => (
                                        <div key={j} className="flex items-center gap-3 text-[11px] font-bold text-sky-100/40 uppercase tracking-widest">
                                            <div className="w-1 h-1 rounded-full bg-sky-500" />
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
                    <div className="absolute top-0 right-0 w-64 h-64 bg-sky-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000" />

                    <div className="relative z-10 space-y-10">
                        <div className="flex justify-center">
                            <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                                <Book size={32} className="text-sky-600" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Explore the Courses</h3>
                            <p className="text-lg text-slate-500 font-light max-w-xl mx-auto leading-relaxed">
                                Our community initiatives and educational resources are available for review. Access our digital library to learn more.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/mobile-courses" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto px-12 py-5 bg-slate-900 text-white rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-sky-600 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-slate-200 flex items-center justify-center gap-3">
                                    Enter course <ArrowRight size={16} />
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

    )
}

export default MobileLibrary
