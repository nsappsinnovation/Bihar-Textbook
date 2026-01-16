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
            description: "Digital transformation with e-books and interactive learning modules for students."
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

    // Premium Inline SVG for Ashoka Chakra
    const AshokaChakra = () => (
        <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_120s_linear_infinite]">
            <defs>
                <radialGradient id="chakraGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#222f6d" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#222f6d" stopOpacity="0.2" />
                </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="49" fill="url(#chakraGradient)" stroke="#222f6d" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="46" fill="none" stroke="#222f6d" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="8" fill="none" stroke="#222f6d" strokeWidth="1.5" />
            {[...Array(24)].map((_, i) => (
                <g key={i} transform={`rotate(${i * 15} 50 50)`}>
                    <line
                        x1="50" y1="50"
                        x2="50" y2="10"
                        stroke="#222f6d" strokeWidth="1.2"
                    />
                    <circle cx="50" cy="12" r="1" fill="#222f6d" />
                </g>
            ))}
            <circle cx="50" cy="50" r="42" fill="none" stroke="#222f6d" strokeWidth="0.5" strokeDasharray="1,2" />
        </svg>
    );

    // Precise coordinate mapping for nodes (relative to center 0,0)
    // Increased radius for better clarity and static placement
    const getFixedPosition = (pos) => {
        switch (pos) {
            case 'top': return { x: 0, y: -400 };
            case 'right-top': return { x: 500, y: -240 };
            case 'right-bottom': return { x: 500, y: 240 };
            case 'bottom': return { x: 0, y: 400 };
            case 'left-bottom': return { x: -500, y: 240 };
            case 'left-center': return { x: -580, y: 0 };
            case 'left-top': return { x: -500, y: -240 };
            default: return { x: 0, y: 0 };
        }
    };

    // Precise SVG path strings (Box 1200x1200, center is 600,600)
    const getPath = (pos) => {
        const c = 600;
        switch (pos) {
            case 'top': return `M ${c} ${c - 140} L ${c} ${c - 400}`;
            case 'right-top': return `M ${c + 140} ${c} Q ${c + 300} ${c} ${c + 500} ${c - 240}`;
            case 'right-bottom': return `M ${c + 140} ${c} Q ${c + 300} ${c} ${c + 500} ${c + 240}`;
            case 'bottom': return `M ${c} ${c + 140} L ${c} ${c + 400}`;
            case 'left-bottom': return `M ${c - 140} ${c} Q ${c - 300} ${c} ${c - 500} ${c + 240}`;
            case 'left-center': return `M ${c - 140} ${c} L ${c - 580} ${c}`;
            case 'left-top': return `M ${c - 140} ${c} Q ${c - 300} ${c} ${c - 500} ${c - 240}`;
            default: return '';
        }
    };

    return (
        <section className="py-24 bg-[#fafbfc] overflow-hidden relative min-h-[1200px] flex items-center">
            {/* Premium Background Pattern (Dot Map) */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23222f6d' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                }}>
            </div>

            {/* Large Faded World Map or Decorative Map (Mocked with large SVG) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
                <svg viewBox="0 0 1000 600" className="w-[120%] h-auto grayscale">
                    <path d="M150,200 Q300,50 500,200 T850,200 Q950,350 700,500 T200,500 Q50,350 150,200" fill="#222f6d" />
                </svg>
            </div>

            <div className="container mx-auto px-6 relative z-10 w-full">
                <div className="text-center mb-16">
                    <div className="inline-block px-5 py-2 bg-blue-50 rounded-full mb-8 border border-blue-100 shadow-sm">
                        <span className="text-blue-700 font-bold tracking-[0.15em] uppercase text-[11px]">
                            Strategic Framework
                        </span>
                    </div>

                    <h2 className="text-5xl md:text-8xl font-black text-[#0d0e23] mb-10 tracking-tight">
                        The Seven <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700">Chakras</span>
                    </h2>

                    <p className="max-w-4xl mx-auto text-gray-400 text-2xl font-light leading-relaxed mb-8 opacity-90 transition-opacity">
                        Translating guiding Sutras into concrete areas of action for the students of Bihar.
                        <br className="hidden md:block" /> Spanning resource accessibility, digital transformation, and inclusive excellence.
                    </p>
                </div>

                {/* Mobile View */}
                <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    {missions.map((mission) => (
                        <div
                            key={mission.id}
                            className="bg-white p-10 rounded-[2.5rem] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.06)] border border-gray-100 flex items-start gap-8 relative group overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-36 h-36 opacity-0 group-hover:opacity-100 rounded-full -mr-16 -mt-16 transition-all duration-500" style={{ backgroundColor: `${mission.color}10` }}></div>

                            <div className="w-20 h-20 shrink-0 rounded-3xl bg-gray-50 flex items-center justify-center text-3xl shadow-inner transition-transform group-hover:scale-110 duration-500" style={{ color: mission.color }}>
                                {mission.icon}
                            </div>
                            <div className="relative z-10">
                                <h3 className="font-bold text-2xl text-[#0d0e23] mb-3">{mission.title}</h3>
                                <p className="text-base text-gray-500 leading-relaxed">{mission.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop Radial View - All Static */}
                <div className="hidden lg:flex justify-center items-center h-[1000px] relative mt-16 scale-[0.85] xxl:scale-100 origin-center">

                    {/* Central Hub */}
                    <div className="relative z-30 w-80 h-80 bg-white rounded-full shadow-[0_50px_120px_-20px_rgba(34,47,109,0.2)] border-[2px] border-gray-50 flex items-center justify-center p-16 overflow-hidden cursor-pointer group">
                        <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="relative z-10 w-full h-full">
                            <AshokaChakra />
                        </div>
                    </div>

                    {/* Nodes and Branched Connections */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-1 h-1">
                            {missions.map((mission, idx) => {
                                const pos = getFixedPosition(mission.position);
                                const isLeft = mission.position.includes('left');

                                return (
                                    <div key={idx} className="absolute inset-0 flex items-center justify-center">

                                        {/* Static Branch Line */}
                                        <svg className="absolute w-[1200px] h-[1200px] overflow-visible pointer-events-none" viewBox="0 0 1200 1200">
                                            <defs>
                                                <linearGradient id={`grad-static-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#222f6d" stopOpacity="0.1" />
                                                    <stop offset="100%" stopColor={mission.color} stopOpacity="0.6" />
                                                </linearGradient>
                                            </defs>
                                            <path
                                                d={getPath(mission.position)}
                                                fill="none"
                                                stroke={`url(#grad-static-${idx})`}
                                                strokeWidth="2.5"
                                                strokeDasharray="6 6"
                                                opacity="0.5"
                                            />
                                        </svg>

                                        {/* Static Strategic Node */}
                                        <div
                                            className="absolute"
                                            style={{
                                                top: pos.y,
                                                left: pos.x,
                                                transform: 'translate(-50%, -50%)',
                                                pointerEvents: 'auto'
                                            }}
                                        >
                                            <div className={`flex items-center gap-12 group ${isLeft ? 'flex-row-reverse text-right' : ''}`}>

                                                {/* Card Icon Hub */}
                                                <div className="relative shrink-0">
                                                    <div className="w-28 h-28 rounded-full bg-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)] flex items-center justify-center text-4xl relative z-20 border border-gray-50 transition-all duration-500 group-hover:scale-110 group-hover:border-blue-200" style={{ color: mission.color }}>
                                                        {mission.icon}
                                                    </div>

                                                    {/* Interactive Rings */}
                                                    <div className="absolute inset-0 rounded-full border border-blue-100 scale-125 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700 pulse-slow z-10"></div>
                                                    <div className="absolute inset-0 rounded-full scale-110 opacity-20 z-0 animate-pulse" style={{ backgroundColor: mission.color }}></div>
                                                </div>

                                                {/* Content Bubble */}
                                                <div className={`${isLeft ? 'mr-4' : 'ml-4'} w-[380px]`}>
                                                    <h4 className="font-black text-3xl text-[#0d0e23] mb-3 leading-tight group-hover:text-blue-700 transition-colors">
                                                        {mission.title}
                                                    </h4>

                                                    <div className="h-0 group-hover:h-16 overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                                                        <p className="text-[15px] text-gray-500 font-medium leading-relaxed">
                                                            {mission.description}
                                                        </p>
                                                    </div>

                                                    <div className="mt-4 flex items-center gap-3 text-[12px] font-black tracking-[0.3em] text-blue-600 uppercase cursor-pointer group/btn">
                                                        <span className="group-hover:tracking-[0.4em] transition-all duration-300">View Details</span>
                                                        <FiChevronRight className="text-xl group-hover/btn:translate-x-2 transition-transform" />
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

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes pulse-slow {
                    0% { transform: scale(1.25); opacity: 0; }
                    50% { opacity: 0.5; }
                    100% { transform: scale(1.6); opacity: 0; }
                }
                .pulse-slow {
                    animation: pulse-slow 2s infinite ease-out;
                }
            `}} />
        </section>
    );
};

export default CoreMissions;
