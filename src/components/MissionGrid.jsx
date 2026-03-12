import React from 'react';
import { Link } from 'react-router-dom';

const MissionGrid = () => {
    const missions = [
        {
            id: 1,
            title: "Virtual Reality Lab",
            desc: "Immersive Learning Experiences",
            image: "/images/missions/headset.png",
            hoverImage: "/images/missions/headsethov.png",
            link: "/vr",
            accent: "blue"
        },
        {
            id: 2,
            title: "Audio Library",
            desc: "Accessible Digital Content",
            image: "/images/missions/audio-book.png",
            hoverImage: "/images/missions/audio-bookhov.png",
            link: "/audio-books",
            accent: "blue"
        },
        {
            id: 3,
            title: "Sign Language",
            desc: "Inclusive Educational Tools",
            image: "/images/missions/friend.png",
            hoverImage: "/images/missions/friendhov.png",
            link: "/sign",
            accent: "blue"
        },
        {
            id: 4,
            title: "Diverse language",
            desc: "Universal Digital Access",
            image: "/images/missions/diverse.png",
            hoverImage: "/images/missions/diversehov.png",
            link: "/linguistic",
            accent: "blue"
        },
        {
            id: 5,
            title: "AI Intelligence",
            desc: "Smart Adaptive Tutoring",
            image: "/images/missions/ai.png",
            hoverImage: "/images/missions/aihov.png",
            link: "/ai-intelligence",
            accent: "blue"
        },
        {
            id: 6,
            title: "Teacher Training",
            desc: "Advanced Pedagogy Support",
            image: "/images/missions/teacher.png",
            hoverImage: "/images/missions/teacherhov.png",
            link: "/teacher-training",
            accent: "blue"
        },
        {
            id: 7,
            title: "Mobile Libraries",
            desc: "Rural Knowledge Outreach",
            image: "/images/missions/library.png",
            hoverImage: "/images/missions/libraryhov.png",
            link: "/mobile-library",
            accent: "blue"
        },
        {
            id: 8,
            title: "Heritage Archive",
            desc: "Cultural Document Preservation",
            image: "/images/missions/history.png",
            hoverImage: "/images/missions/historyhov.png",
            link: "/heritage-archive",
            accent: "blue"
        },
        {
            id: 9,
            title: "Cyber Security",
            desc: "Online Safety & Scam Protection",
            image: "/images/missions/cyber-security.png",
            hoverImage: "/images/missions/cyber-securityhov.png",
            link: "/cyber-security",
            accent: "amber"
        },
        {
            id: 10,
            title: "Basic Learning Skills",
            desc: "Communication & Life Skills",
            image: "/images/missions/abilities.png",
            hoverImage: "/images/missions/abilitieshov.png",
            link: "/basic-skills",
            accent: "emerald"
        }
    ];

    return (
        <section className="py-24 px-6 bg-white border-t border-slate-100">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-4 border border-slate-100">
                    {missions.map((mission) => (
                        <MissionCard key={mission.id} mission={mission} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const MissionCard = ({ mission }) => {
    const accentStyles = {
        blue: {
            text: "group-hover:text-blue-600",
            bg: "group-hover:bg-blue-50/40",
            line: "bg-blue-600"
        },
        amber: {
            text: "group-hover:text-amber-500",
            bg: "group-hover:bg-amber-50",
            line: "bg-amber-500"
        },
        emerald: {
            text: "group-hover:text-emerald-500",
            bg: "group-hover:bg-emerald-50",
            line: "bg-emerald-500"
        }
    };

    const accent = accentStyles[mission.accent];

    return (
        <Link to={mission.link} className="group block">
            <div className={`relative p-12 text-center bg-white transition-all duration-500 border border-transparent hover:shadow-xl overflow-hidden ${accent.bg}`}>
                
                {/* ICON WRAPPER */}
                <div className="relative w-16 h-16 mx-auto mb-8 transition-transform duration-500 group-hover:scale-110">
                    
                    {/* Default Image */}
                    <img
                        src={mission.image}
                        alt={mission.title}
                        className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
                    />

                    {/* Hover Image */}
                    <img
                        src={mission.hoverImage}
                        alt={`${mission.title} hover`}
                        className="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                </div>

                {/* TITLE */}
                <h4 className={`text-sm font-black uppercase tracking-wider text-[#0d0e23] transition-colors duration-300 ${accent.text}`}>
                    {mission.title}
                </h4>

                {/* DESCRIPTION */}
                <p className="text-xs font-bold text-slate-400 mt-3 transition-colors duration-300 group-hover:text-slate-500">
                    {mission.desc}
                </p>

                {/* BOTTOM ACCENT LINE */}
                <div className={`absolute bottom-0 left-0 w-full h-[3px] ${accent.line} translate-y-full group-hover:translate-y-0 transition-transform duration-500`} />
            </div>
        </Link>
    );
};

export default MissionGrid;