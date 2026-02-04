import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MissionGrid = () => {
    const missions = [
        {
            id: 1,
            title: "Virtual Reality Lab",
            desc: "Immersive Learning Experiences",
            color: "text-orange-500",
            bgHover: "group-hover:bg-orange-50",
            borderColor: "group-hover:border-orange-200",
            image: "/images/missions/icon_vr_lab.png",
            paths: {
                active: "M2 8h20v10a2 2 0 01-2 2H4a2 2 0 01-2-2V8zm6 6c1.5 0 2-1 2-1s.5 1 2 1"
            }
        },
        {
            id: 2,
            title: "Audio Library",
            desc: "Accessible Digital Content",
            color: "text-emerald-500",
            bgHover: "group-hover:bg-emerald-50",
            borderColor: "group-hover:border-emerald-200",
            image: "/images/missions/icon_audio_library.png",
            paths: {
                active: "M3 11a9 9 0 0118 0v7M12 11v8m-4-4v4m8-4v4"
            }
        },
        {
            id: 3,
            title: "Sign Language",
            desc: "Inclusive Educational Tools",
            color: "text-cyan-500",
            bgHover: "group-hover:bg-cyan-50",
            borderColor: "group-hover:border-cyan-200",
            image: "/images/missions/icon_sign_language.png",
            paths: {
                active: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            }
        },
        {
            id: 4,
            title: "Digital Portal",
            desc: "e-Lotani Universal Access",
            color: "text-blue-600",
            bgHover: "group-hover:bg-blue-50",
            borderColor: "group-hover:border-blue-200",
            image: "/images/missions/icon_digital_portal.png",
            paths: {
                active: "M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8zM12 2c4 0 4 20 0 20M2 12h20"
            }
        },
        {
            id: 5,
            title: "AI Intelligence",
            desc: "Smart Adaptive Tutoring",
            color: "text-rose-500",
            bgHover: "group-hover:bg-rose-50",
            borderColor: "group-hover:border-rose-200",
            image: "/images/missions/icon_ai_intelligence.png",
            paths: {
                active: "M12 3l1.91 5.86h6.15l-4.98 3.62 1.9 5.85L12 14.71l-4.98 3.62 1.9-5.85-4.98-3.62h6.15L12 3z"
            }
        },
        {
            id: 6,
            title: "Teacher Training",
            desc: "Advanced Pedagogy Support",
            color: "text-indigo-500",
            bgHover: "group-hover:bg-indigo-50",
            borderColor: "group-hover:border-indigo-200",
            image: "/images/missions/icon_teacher_training.png",
            paths: {
                active: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100-8 4 4 0 000 8zm14 14v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 110 7.75"
            }
        },
        {
            id: 7,
            title: "Mobile Libraries",
            desc: "Rural Knowledge Outreach",
            color: "text-amber-500",
            bgHover: "group-hover:bg-amber-50",
            borderColor: "group-hover:border-amber-200",
            image: "/images/missions/icon_mobile_library.png",
            paths: {
                active: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 13a3 3 0 100-6 3 3 0 000 6z"
            }
        },
        {
            id: 8,
            title: "Heritage Archive",
            desc: "Cultural Document Preservation",
            color: "text-slate-700",
            bgHover: "group-hover:bg-slate-50",
            borderColor: "group-hover:border-slate-300",
            image: "/images/missions/icon_heritage_archive.png",
            paths: {
                active: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6m-8 4h4m-4 4h4"
            }
        }
    ];

    return (
        <section className="py-24 px-6 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 shadow-sm"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Our Digital Services</span>
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
                        What We Are <br />
                        <span className="text-blue-600">Doing In BSTPC</span>
                    </h2>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-slate-200">
                    {missions.map((mission) => (
                        <div key={mission.id} className="border-b border-r border-slate-200">
                            <MissionCard mission={mission} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const MissionCard = ({ mission }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group bg-white p-12 hover:bg-slate-50 transition-all duration-500 cursor-pointer flex flex-col items-center text-center h-full hover:border-blue-100 hover:shadow-lg hover:shadow-blue-900/5 relative"
        >
            <div
                className={`relative w-32 h-32 rounded-full flex items-center justify-center mb-8 border transition-all duration-500 shadow-sm overflow-hidden
                bg-white border-slate-100 group-hover:border-blue-200 group-hover:bg-blue-50/30 group-hover:scale-110`}
            >
                {/* Illustration (Normal State) */}
                <motion.img
                    src={mission.image}
                    alt={mission.title}
                    className="w-full h-full object-cover absolute"
                    animate={{
                        opacity: isHovered ? 0 : 1,
                        scale: isHovered ? 0.9 : 1
                    }}
                    transition={{ duration: 0.4 }}
                />

                {/* SVG Blueprint (Hover State) - THEMED BLUE & ANIMATED */}
                <motion.svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-14 h-14 absolute text-blue-600"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        scale: isHovered ? 1 : 0.5,
                        rotate: isHovered ? 0 : -10
                    }}
                    transition={{ duration: 0.4 }}
                >
                    <motion.path
                        d={mission.paths.active}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                </motion.svg>
            </div>

            <div className="space-y-3">
                {/* Title - Unifies to Blue on Hover */}
                <h4 className="text-lg font-black text-slate-800 tracking-tight transition-colors duration-300 group-hover:text-blue-700">
                    {mission.title}
                </h4>
                <p className="text-xs font-semibold text-slate-400 line-clamp-2 px-2 group-hover:text-slate-500 transition-colors">
                    {mission.desc}
                </p>
            </div>
        </div>
    );
};

export default MissionGrid;
