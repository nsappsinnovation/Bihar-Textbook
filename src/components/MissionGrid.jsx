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
            title: "Diverse Language",
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
            id: 10,
            title: "Basic Learning Skills",
            desc: "Communication & Life Skills",
            image: "/images/missions/abilities.png",
            hoverImage: "/images/missions/abilitieshov.png",
            link: "/basic-skills",
            accent: "emerald"
        }
    ];

    const missions = defaultMissions;

    return (
        <section className="pt-12 pb-8 px-4 md:px-8 bg-white font-sans">
            <div className="max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
                    {missions.map((mission) => (
                        <Link 
                            key={mission.id} 
                            to={mission.link || '#'}
                            className="flex flex-col items-center group text-center"
                        >
                            {/* Icon Container */}
                            <div className="w-16 h-16 mb-4 flex items-center justify-center relative transition-transform duration-300 group-hover:scale-110">
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
                            <div className="space-y-2">
                                <h4 className="text-[#1e293b] text-sm font-extrabold uppercase tracking-tight group-hover:text-blue-600 transition-colors duration-300">
                                    {mission.title}
                                </h4>
                                <p className="text-[11px] text-[#64748b] font-medium leading-relaxed max-w-[160px]">
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