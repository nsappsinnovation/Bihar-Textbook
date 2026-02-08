import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
            image: "/images/missions/headset.png",
            hoverImage: "/images/missions/headsethov.png",
            link: "/vr",
            paths: {
                active: "M2 8h20v10a2 2 0 01-2 2H4a2 2 0 01-2-2V8zm6 6c1.5 0 2-1 2-1s.5 1 2 1"
            }
        },
        {
            id: 2,
            title: "Audio Library",
            desc: "Accessible Digital Content",
            color: "text-blue-500",
            bgHover: "group-hover:bg-blue-50",
            borderColor: "group-hover:border-blue-200",
            image: "/images/missions/audio-book.png",
            hoverImage: "/images/missions/audio-bookhov.png",
            link: "/audio-books",
            paths: {
                active: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            }
        },
        {
            id: 3,
            title: "Sign Language",
            desc: "Inclusive Educational Tools",
            color: "text-teal-600",
            bgHover: "group-hover:bg-teal-50",
            borderColor: "group-hover:border-teal-200",
            image: "/images/missions/friend.png",
            hoverImage: "/images/missions/friendhov.png",
            link: "/sign",
            paths: {
                active: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            }
        },
        {
            id: 4,
            title: "Digital Portal",
            desc: "Universal Digital Access",
            color: "text-blue-600",
            bgHover: "group-hover:bg-blue-50",
            borderColor: "group-hover:border-blue-200",
            image: "/images/missions/portal.png",
            hoverImage: "/images/missions/portalhov.png",
            link: "/digital-portal",
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
            image: "/images/missions/ai.png",
            hoverImage: "/images/missions/aihov.png",
            link: "/ai-intelligence",
            paths: {
                active: "M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8z"
            }
        },
        {
            id: 6,
            title: "Teacher Training",
            desc: "Advanced Pedagogy Support",
            color: "text-purple-600",
            bgHover: "group-hover:bg-purple-50",
            borderColor: "group-hover:border-purple-200",
            image: "/images/missions/teacher.png",
            hoverImage: "/images/missions/teacherhov.png",
            link: "/teacher-training",
            paths: {
                active: "M12 14l9-5-9-5-9 5 9 5z"
            }
        },
        {
            id: 7,
            title: "Mobile Libraries",
            desc: "Rural Knowledge Outreach",
            color: "text-sky-500",
            bgHover: "group-hover:bg-sky-50",
            borderColor: "group-hover:border-sky-200",
            image: "/images/missions/library.png",
            hoverImage: "/images/missions/libraryhov.png",
            link: "/mobile-library",
            paths: {
                active: "M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
            }
        },
        {
            id: 8,
            title: "Heritage Archive",
            desc: "Cultural Document Preservation",
            color: "text-slate-700",
            bgHover: "group-hover:bg-slate-50",
            borderColor: "group-hover:border-slate-300",
            image: "/images/missions/history.png",
            hoverImage: "/images/missions/historyhov.png",
            link: "/heritage-archive",
            paths: {
                active: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6m-8 4h4m-4 4h4"
            }
        }
    ];

    return (
        <section className="py-24 px-6 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-4 [&>*]:border-slate-200 [&>*]:border-b [&>*]:border-r [&>*:nth-child(2n)]:border-r-0 lg:[&>*:nth-child(2n)]:border-r lg:[&>*:nth-child(4n)]:border-r-0 [&>*:nth-last-child(-n+2)]:border-b-0 lg:[&>*:nth-last-child(-n+4)]:border-b-0">
                    {missions.map((mission) => (
                        <div key={mission.id}>
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
        <Link to={mission.link} className="block h-full">
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group bg-white p-12 hover:bg-slate-50 transition-all duration-500 cursor-pointer flex flex-col items-center text-center h-full hover:border-blue-100 hover:shadow-lg hover:shadow-blue-900/5 relative"
            >
                <div
                    className={`relative w-16 h-16 flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110`}
                >
                    {/* Illustration (Normal State) */}
                    <motion.img
                        src={mission.image}
                        alt={mission.title}
                        className="w-full h-full object-contain absolute contrast-[1.1]"
                        animate={{
                            opacity: isHovered ? 0 : 1,
                            scale: isHovered ? 0.9 : 1
                        }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                    />

                    {/* Hover Image (If Exists - Takes Priority) */}
                    {mission.hoverImage ? (
                        <motion.img
                            src={mission.hoverImage}
                            alt={`${mission.title} Hover`}
                            className="w-full h-full object-contain absolute"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{
                                opacity: isHovered ? 1 : 0,
                                scale: isHovered ? 1 : 0.9
                            }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        />
                    ) : (
                        /* SVG Blueprint (Hover State) - Default Fallback */
                        <motion.svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-10 h-10 absolute text-blue-600"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{
                                opacity: isHovered ? 1 : 0,
                                scale: isHovered ? 1.05 : 0.5,
                                rotate: isHovered ? 0 : -10
                            }}
                            transition={{ duration: 0.4 }}
                        >
                            <motion.path
                                d={mission.paths.active}
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: isHovered ? 1 : 0 }}
                                transition={{ duration: 0.6, ease: "circOut" }}
                            />
                        </motion.svg>
                    )}
                </div>

                <div className="space-y-2">
                    {/* Title - Unifies to Blue on Hover */}
                    <h4 className="text-lg font-semibold text-slate-600 tracking-tight transition-colors duration-300 group-hover:text-blue-600">
                        {mission.title}
                    </h4>
                    <p className="text-sm font-normal text-slate-400 leading-relaxed group-hover:text-slate-500 transition-colors">
                        {mission.desc}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default MissionGrid;
