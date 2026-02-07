
import React from 'react'
import { Link } from "react-router-dom";
import { BookOpen, Award, Users, ShieldCheck, ArrowLeft, ArrowRight, CheckCircle2, FileText, GraduationCap, PenTool, Layout, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const TeacherTraining = () => {
    const stats = [
        { label: "Educators", value: "25K+", sub: "Certified Teachers", icon: <GraduationCap size={20} /> },
        { label: "Workshops", value: "150+", sub: "Hands-on Sessions", icon: <Users size={20} /> },
        { label: "Modules", value: "50+", sub: "Modern Pedagogy", icon: <BookOpen size={20} /> },
        { label: "Impact", value: "100%", sub: "Classroom Improvement", icon: <Award size={20} /> }
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
            title: "Digital Literacy",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600", 
            description: "Equipping teachers with essential digital skills to navigate modern educational technology.",
            details: [
                "Computer Basics",
                "Educational Software",
                "Online Resources"
            ],
        },
        {
            title: "Modern Pedagogy",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600",
            description: "Training on student-centered teaching methods and active learning strategies.",
            details: [
                "Active Learning",
                "Inclusive Classrooms",
                "Engagement Techniques"
            ],
        },
        {
            title: "Classroom Management",
            image: "/images/teacher/classroom_management.png",
            description: "Strategies for creating a positive and productive learning environment.",
            details: [
                "Behavioral Guidance",
                "Time Management",
                "Conflict Resolution"
            ],
        },
        {
            title: "Leadership Skills",
            image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600",
            description: "Developing leadership qualities to inspire students and colleagues alike.",
            details: [
                "Mentorship",
                "Community Building",
                "Vision Setting"
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
                            src="/images/teacher/teacher training.jpeg"
                            alt="Teacher Training Illustration"
                            className="w-[620px] h-[400px] object-cover rounded-3xl shadow-2xl"
                        />
                    </div>

                    {/* RIGHT: Content */}
                    <div>
                        {/* Heading */}
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                            Teacher Training
                        </h1>

                        {/* Highlight text */}
                        <p className="mt-4 text-lg font-semibold text-purple-600">
                            Empowering Educators with Modern Skills
                        </p>

                        {/* Description */}
                        <p className="mt-4 text-slate-600 max-w-md">
                            Comprehensive training programs designed to enhance teaching effectiveness and student outcomes.
                        </p>

                        {/* Feature Cards */}
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Card 1 */}
                            <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                                <div className="text-purple-600 text-xl">🎓</div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">
                                        Certified
                                    </h3>
                                    <p className="text-sm text-slate-600">
                                        Recognized certification courses.
                                    </p>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                                <div className="text-purple-600 text-xl">🛠️</div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">
                                        Practical
                                    </h3>
                                    <p className="text-sm text-slate-600">
                                        Hands-on workshops and tools.
                                    </p>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="md:col-span-2 p-5 border rounded-xl shadow-sm flex gap-4">
                                <div className="text-purple-600 text-xl">🚀</div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">
                                        Career Growth
                                    </h3>
                                    <p className="text-sm text-slate-600">
                                        Opportunities for professional development and advancement.
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
                                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl w-fit">
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
                        <div className="lg:col-span-5 space-y-10 sticky top-32">
                            <div className="space-y-4">
                                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-purple-600">
                                    Program Overview
                                </h2>
                                <h3 className="text-4xl font-extrabold text-slate-900 leading-tight">
                                    Building Future With
                                    <br />
                                    <span className="text-slate-400">
                                        Skilled Teachers
                                    </span>
                                </h3>
                            </div>

                            <p className="text-lg text-slate-600 leading-relaxed font-light">
                                Our Teacher Training initiative focuses on upskilling educators to meet the demands of the 21st-century classroom. By integrating technology, modern psychology, and leadership training, we ensure that every teacher is equipped to inspire and guide the next generation.
                            </p>

                            <div className="space-y-4">
                                {[
                                    "Workshops on digital tools and platforms",
                                    "Advanced classroom management techniques",
                                    "Inclusive education strategies",
                                    "Continuous professional development"
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 text-sm font-bold text-slate-700"
                                    >
                                        <CheckCircle2 size={18} className="text-purple-600" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="lg:col-span-7 grid grid-cols-1 gap-4">
                            <div className="relative group overflow-hidden rounded-[40px] border border-slate-100 shadow-xl">
                                <img
                                    src="https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg?w=996"
                                    alt="Professional Growth"
                                    className="w-full aspect-[4/3] object-contain bg-white transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                                <div className="absolute bottom-10 left-10 text-white">
                                    <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">Development</p>
                                    <h4 className="text-2xl font-bold">Professional Growth</h4>
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
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">Workflow</h2>
                            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">Training Modules <br /></h3>
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
                                className="min-w-[350px] md:min-w-[400px] bg-white/5 backdrop-blur-md border border-white/10 p-12 rounded-[40px] hover:border-purple-500/50 transition-all duration-500 group snap-center"
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
                                <p className="text-purple-100/60 leading-relaxed font-light mb-8 text-sm">{step.description}</p>
                                <div className="space-y-3 border-t border-white/5 pt-8">
                                    {step.details.map((detail, j) => (
                                        <div key={j} className="flex items-center gap-3 text-[11px] font-bold text-purple-100/40 uppercase tracking-widest">
                                            <div className="w-1 h-1 rounded-full bg-purple-500" />
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
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000" />

                    <div className="relative z-10 space-y-10">
                        <div className="flex justify-center">
                            <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                                <PenTool size={32} className="text-purple-600" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Join the Training</h3>
                            <p className="text-lg text-slate-500 font-light max-w-xl mx-auto leading-relaxed">
                                Enroll in our upcoming workshops and become a certified modern educator.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/teacher-courses" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto px-12 py-5 bg-slate-900 text-white rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-purple-600 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-slate-200 flex items-center justify-center gap-3">
                                    Start Training <ArrowRight size={16} />
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

export default TeacherTraining
