import React from 'react';
import { Link } from 'react-router-dom';

const MissionGrid = () => {
    // Reordered missions to match the reference image exactly for the first 6 items
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
            id: 8,
            title: "Heritage Archive",
            desc: "Cultural Document Preservation",
            image: "/images/missions/history.png",
            hoverImage: "/images/missions/historyhov.png",
            link: "/heritage-archive",
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
        <section className="py-20 px-4 md:px-8 bg-white font-sans overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                {/* Main Container Wrapper */}
                <div className="relative bg-gradient-to-br from-[#f8fbff] via-[#f9fbff] to-[#f0f5ff] rounded-[2.5rem] pt-16 pb-12 px-6 md:px-12 border border-blue-50/60 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.05)] overflow-hidden">
                    
                    {/* Subtle Background Glow */}
                    <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none"></div>

                   
                    {/* Header Section */}
                    <div className="text-center relative z-10 mb-16">
                        <h2 className="text-[28px] md:text-3xl font-extrabold text-[#1e293b] mb-2 tracking-tight">
                            One Platform. Many Possibilities.
                        </h2>
                        <p className="text-[#475569] text-[15px] font-medium">
                            Tools and resources designed to make learning accessible for all.
                        </p>
                    </div>

                    {/* Items Slider / Layout */}
                    <div className="relative w-full overflow-x-auto pb-6 hide-scrollbar z-10 cursor-default">
                        <div className="flex items-start w-max mx-auto px-2 relative">
                            
                            {/* Horizontal Dotted Connecting Line */}
                            <div 
                                className="absolute h-px border-t-[2px] border-dotted border-[#cbd5e1] -z-10" 
                                style={{ top: '3.5rem', left: '70px', right: '70px' }}
                            />

                            {missions.map((mission, idx) => (
                                <React.Fragment key={mission.id}>
                                    {/* Individual Item */}
                                    <div className="flex flex-col items-center group w-[140px] shrink-0">
                                        <Link to={mission.link} className="relative mb-5 transition-transform duration-300 hover:-translate-y-1 block outline-none">
                                            {/* Circular Icon Wrapper */}
                                            <div className="w-[7rem] h-[7rem] bg-white rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.06)] border border-blue-50 transition-all duration-300 group-hover:shadow-[0_15px_35px_rgba(37,99,235,0.12)] group-hover:border-blue-100 relative z-10">
                                                <img 
                                                    src={mission.image} 
                                                    alt={mission.title} 
                                                    className="w-[3.25rem] h-[3.25rem] object-contain transition-opacity duration-300 group-hover:opacity-0 absolute"
                                                />
                                                <img 
                                                    src={mission.hoverImage} 
                                                    alt={`${mission.title} hover`} 
                                                    className="w-[3.25rem] h-[3.25rem] object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100 absolute"
                                                />
                                            </div>
                                        </Link>
                                        
                                        {/* Text Content */}
                                        <div className="text-center px-1">
                                            <h4 className="text-[#1e293b] text-[13px] font-bold leading-tight mb-1.5 group-hover:text-[#2563eb] transition-colors duration-300">
                                                {mission.title}
                                            </h4>
                                            <p className="text-[11px] text-[#64748b] font-medium leading-[1.4] tracking-wide">
                                                {mission.desc}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Tiny Dot Separator */}
                                    {idx < missions.length - 1 && (
                                        <div className="w-8 md:w-12 shrink-0 flex justify-center pt-[3.5rem] -z-10">
                                            <div className="w-1.5 h-1.5 bg-[#cbd5e1] rounded-full transform -translate-y-1/2 opacity-70" />
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Global style to hide scrollbar for the sliding container */}
            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
};

export default MissionGrid;