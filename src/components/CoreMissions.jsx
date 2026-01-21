import React from 'react';
import {
    FiUsers,
    FiBookOpen,
    FiMonitor,
    FiTruck,
    FiCreditCard,
    FiZap,
    FiChevronRight
} from 'react-icons/fi';
import { RiGraduationCapLine } from 'react-icons/ri';

const CoreMissions = () => {
    const missions = [
        {
            id: 1,
            title: "Inclusive & Equitable Learning",
            icon: <FiUsers />,
            color: "#6366f1", // Indigo
            position: "right-top",
            description: "Ensuring every child in Bihar has equal access to quality education regardless of background."
        },
        {
            id: 2,
            title: "Quality Content Standards",
            icon: <FiBookOpen />,
            color: "#eab308", // Yellow
            position: "top",
            description: "Rigorous pedagogical standards and quality checks for all textbook materials."
        },
        {
            id: 3,
            title: "Digital Learning Ecosystem",
            icon: <FiMonitor />,
            color: "#22c55e", // Green
            position: "left-top",
            description: "Digital transformation with e- ebooks and interactive learning modules for students."
        },
        {
            id: 4,
            title: "Seamless Supply Chain",
            icon: <FiTruck />,
            color: "#3b82f6", // Blue
            position: "left-center",
            description: "Efficient distribution network reaching the remotest schools in every district."
        },
        {
            id: 5,
            title: "Affordable & Accessible",
            icon: <FiCreditCard />,
            color: "#ef4444", // Red
            position: "left-bottom",
            description: "Providing high-quality books at minimal costs to ensure affordability for all."
        },
        {
            id: 6,
            title: "Empowered Educators",
            icon: <FiZap />,
            color: "#f97316", // Orange
            position: "bottom",
            description: "Supporting teachers with well-structured manuals and classroom resources."
        },
        {
            id: 7,
            title: "Future Ready Students",
            icon: <RiGraduationCapLine />,
            color: "#a855f7", // Purple
            position: "right-bottom",
            description: "Preparing Bihar's youth with modern curriculum aligned with 21st-century skills."
        }
    ];

    // Central Book Element
    const CentralBook = () => (
        <div className="relative w-full h-full flex items-center justify-center text-[#222f6d]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            {/* Subtle decorative circles */}
            <div className="absolute inset-0 border border-[#222f6d]/10 rounded-full animate-[spin_8s_linear_infinite]" />
            <div className="absolute inset-[-4px] border border-dashed border-[#222f6d]/10 rounded-full animate-[spin_12s_linear_infinite_reverse]" />
        </div>
    );

    // Optimized coordinate mapping - Expanded for larger layout
    const getFixedPosition = (pos) => {
        switch (pos) {
            case 'top': return { x: 0, y: -250 };
            case 'right-top': return { x: 340, y: -160 };
            case 'right-bottom': return { x: 340, y: 160 };
            case 'bottom': return { x: 0, y: 250 };
            case 'left-bottom': return { x: -340, y: 160 };
            case 'left-center': return { x: -400, y: 0 };
            case 'left-top': return { x: -340, y: -160 };
            default: return { x: 0, y: 0 };
        }
    };

    // Hair-line path connections - Updated for new coordinates
    const getPath = (pos) => {
        const c = 500;
        const offset = 60; // Increased for larger hub
        switch (pos) {
            case 'top': return `M ${c} ${c - offset} L ${c} ${c - 250} `;
            case 'right-top': return `M ${c + offset} ${c} Q ${c + 180} ${c} ${c + 340} ${c - 160} `;
            case 'right-bottom': return `M ${c + offset} ${c} Q ${c + 180} ${c} ${c + 340} ${c + 160} `;
            case 'bottom': return `M ${c} ${c + offset} L ${c} ${c + 250} `;
            case 'left-bottom': return `M ${c - offset} ${c} Q ${c - 180} ${c} ${c - 340} ${c + 160} `;
            case 'left-center': return `M ${c - offset} ${c} L ${c - 400} ${c} `;
            case 'left-top': return `M ${c - offset} ${c} Q ${c - 180} ${c} ${c - 340} ${c - 160} `;
            default: return '';
        }
    };

    return (
        <section className="py-24 bg-white overflow-hidden relative min-h-[800px] flex items-center border-t border-gray-50/50">
            {/* Minimal Grid */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(#222f6d 1px, transparent 1px), linear-gradient(90deg, #222f6d 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}>
            </div>

            <div className="container mx-auto px-6 relative z-10 w-full">
                <div className="text-center mb-16">
                    <div className="inline-block px-3 py-1 bg-gray-50/80 rounded-full mb-4 border border-gray-100">
                        <span className="text-gray-400 font-bold tracking-[0.25em] uppercase text-[9px]">
                            Strategic Intent
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-[#0d0e23] mb-4 tracking-tight">
                        The Seven <span className="text-blue-600/80">Core Pillars</span>
                    </h2>

                    <p className="max-w-2xl mx-auto text-gray-400 text-base font-light leading-relaxed">
                        A refined framework for educational empowerment across Bihar.
                    </p>
                </div>

                {/* Mobile View - Compact & Clean */}
                <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-3 mt-8">
                    {missions.map((mission) => (
                        <div
                            key={mission.id}
                            className="bg-white p-4 rounded-xl border border-gray-50 flex items-center gap-4 group shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)]"
                        >
                            <div className="w-10 h-10 shrink-0 rounded-full bg-gray-50 flex items-center justify-center text-[14px] opacity-80" style={{ color: mission.color }}>
                                {mission.icon}
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm text-[#0d0e23] mb-0.5">{mission.title}</h3>
                                <p className="text-[11px] text-gray-400 leading-tight line-clamp-1">{mission.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop Radial - Scaled Up */}
                <div className="hidden lg:flex justify-center items-center h-[650px] relative mt-12">

                    {/* Larger Central Book Hub */}
                    <div className="relative z-30 w-32 h-32 bg-white rounded-full border border-gray-100/50 flex items-center justify-center p-6 transition-all hover:scale-105 shadow-sm">
                        <CentralBook />
                    </div>

                    {/* Nodes and Fine Connections */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-1 h-1">
                            {missions.map((mission, idx) => {
                                const pos = getFixedPosition(mission.position);
                                const isLeft = mission.position.includes('left');

                                return (
                                    <div key={idx} className="absolute inset-0 flex items-center justify-center">

                                        {/* Hair-line Branch Connection */}
                                        <svg className="absolute w-[1000px] h-[1000px] overflow-visible pointer-events-none" viewBox="0 0 1000 1000">
                                            <path
                                                d={getPath(mission.position)}
                                                fill="none"
                                                stroke="#e2e8f0"
                                                strokeWidth="0.5"
                                                strokeDasharray="3 3"
                                                className="opacity-60"
                                            />
                                        </svg>

                                        {/* Delicate Node */}
                                        <div
                                            className="absolute"
                                            style={{
                                                top: pos.y,
                                                left: pos.x,
                                                transform: 'translate(-50%, -50%)',
                                                pointerEvents: 'auto'
                                            }}
                                        >
                                            <div className={`flex items-center gap-4 group ${isLeft ? 'flex-row-reverse text-right' : ''}`}>

                                                {/* Mini Icon Pod */}
                                                <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-lg relative z-20 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:border-blue-200 group-hover:shadow-blue-50" style={{ color: mission.color }}>
                                                    {mission.icon}
                                                </div>

                                                {/* Minimal Content */}
                                                <div className="w-[200px]">
                                                    <h4 className="font-semibold text-base text-[#0d0e23] mb-0.5 transition-colors group-hover:text-blue-600">
                                                        {mission.title}
                                                    </h4>

                                                    <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100">
                                                        <p className="text-xs text-gray-400 font-medium leading-normal pt-1">
                                                            {mission.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CoreMissions;
