import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MissionGrid = () => {
    const defaultMissions = [
        {
            id: 1,
            title: "Virtual Reality Lab",
            desc: "Immersive Learning Experiences",
            image: "/images/missions/headset.png",
            hoverImage: "/images/missions/headsethov.png",
            link: "/vr-dashboard",
            accent: "blue"
        },
        {
            id: 2,
            title: "Audio Library",
            desc: "Accessible Digital Content",
            image: "/images/missions/audio-book.png",
            hoverImage: "/images/missions/audio-bookhov.png",
            link: "/audio-library-dashboard",
            accent: "blue"
        },
        {
            id: 3,
            title: "Sign Language",
            desc: "Learn Indian Sign Language",
            image: "/images/missions/friend.png",
            hoverImage: "/images/missions/friendhov.png",
            link: "/sign-learn",
            accent: "blue"
        },
        {
            id: 4,
            title: "Diverse Language",
            desc: "Explore New Languages",
            image: "/images/missions/diverse.png",
            hoverImage: "/images/missions/diversehov.png",
            link: "/ling",
            accent: "blue"
        },
        {
            id: 5,
            title: "AI Intelligence",
            desc: "Learn AI Basics",
            image: "/images/missions/ai.png",
            hoverImage: "/images/missions/aihov.png",
            link: "/ai-intelligence-dashboard",
            accent: "blue"
        },
        {
            id: 7,
            title: "Cyber Security",
            desc: "Digital Safety Guidelines",
            image: "/images/missions/cyber-security.png",
            hoverImage: "/images/missions/cyber-securityhov.png",
            link: "/cyber-security-dashboard",
            accent: "blue"
        },
        {
            id: 8,
            title: "Heritage Archive",
            desc: "Learn about Heritage",
            image: "/images/missions/history.png",
            hoverImage: "/images/missions/historyhov.png",
            link: "/heritage-dashboard",
            accent: "blue"
        },
        {
            id: 10,
            title: "Basic Learning Skills",
            desc: "Foundational Learning Tools",
            image: "/images/missions/abilities.png",
            hoverImage: "/images/missions/abilitieshov.png",
            link: "/life-skills",
            accent: "emerald"
        }
    ];

    const missions = defaultMissions;

    return (
        <section id="missions-grid" className="pt-12 pb-16 px-4 md:px-8 bg-white font-sans">
            <div className="max-w-[1200px] mx-auto overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 -mt-px -ml-px">
                    {missions.map((mission) => (
                        <Link 
                            key={mission.id} 
                            to={mission.link || '#'}
                            className="flex flex-col items-center group text-center py-12 px-6 border-t border-l border-gray-100 hover:bg-slate-50/40 transition-colors duration-300"
                        >
                            {/* Icon Container */}
                            <div className="w-14 h-14 mb-5 flex items-center justify-center relative transition-transform duration-300 group-hover:-translate-y-1">
                                <img 
                                    src={mission.image} 
                                    alt={mission.title} 
                                    className="w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0 absolute"
                                />
                                <img 
                                    src={mission.hoverImage || mission.image} 
                                    alt={`${mission.title} hover`} 
                                    className="w-full h-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100 absolute"
                                />
                            </div>
                            
                            {/* Text Content */}
                            <div className="space-y-1.5">
                                <h4 className="text-[#1e293b] text-[15px] font-bold tracking-tight group-hover:text-blue-600 transition-colors duration-300">
                                    {mission.title}
                                </h4>
                                <p className="text-[12px] text-[#64748b] font-medium leading-relaxed max-w-[180px] mx-auto">
                                    {mission.desc}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MissionGrid;