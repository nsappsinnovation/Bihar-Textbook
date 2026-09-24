import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getSections } from '../../services/sectionService';
import { fileUrl } from '../../services/api';

// Built-in icons have a hover variant named "<name>hov.webp"; uploaded icons reuse the same image
const hoverImageFor = (image) =>
    image?.startsWith('/images/missions/') ? image.replace(/\.webp$/, 'hov.webp') : fileUrl(image);

const defaultMissions = [
    {
        id: 1,
        titleKey: "missionGrid.vr.title",
        defaultTitle: "Virtual Reality Lab",
        descKey: "missionGrid.vr.desc",
        defaultDesc: "Immersive Learning Experiences",
        image: "/images/missions/headset.webp",
        hoverImage: "/images/missions/headsethov.webp",
        link: "/vr-dashboard",
    },
    {
        id: 2,
        titleKey: "missionGrid.audio.title",
        defaultTitle: "Audio Library",
        descKey: "missionGrid.audio.desc",
        defaultDesc: "Accessible Digital Content",
        image: "/images/missions/audio-book.webp",
        hoverImage: "/images/missions/audio-bookhov.webp",
        link: "/audio-library-dashboard",
    },
    {
        id: 3,
        titleKey: "missionGrid.sign.title",
        defaultTitle: "Sign Language",
        descKey: "missionGrid.sign.desc",
        defaultDesc: "Inclusive Educational Tools",
        image: "/images/missions/friend.webp",
        hoverImage: "/images/missions/friendhov.webp",
        link: "/sign-learn",
    },
    {
        id: 4,
        titleKey: "missionGrid.diverse.title",
        defaultTitle: "Diverse Language",
        descKey: "missionGrid.diverse.desc",
        defaultDesc: "Universal Digital Access",
        image: "/images/missions/diverse.webp",
        hoverImage: "/images/missions/diversehov.webp",
        link: "/ling",
    },
    {
        id: 5,
        titleKey: "missionGrid.ai.title",
        defaultTitle: "AI Intelligence",
        descKey: "missionGrid.ai.desc",
        defaultDesc: "Smart Adaptive Tutoring",
        image: "/images/missions/ai.webp",
        hoverImage: "/images/missions/aihov.webp",
        link: "/ai-intelligence-dashboard",
    },
    {
        id: 7,
        titleKey: "missionGrid.cyber.title",
        defaultTitle: "Cyber Security",
        descKey: "missionGrid.cyber.desc",
        defaultDesc: "Digital Safety & Ethics",
        image: "/images/missions/cyber-security.webp",
        hoverImage: "/images/missions/cyber-securityhov.webp",
        link: "/cyber-security-dashboard",
    },
    {
        id: 8,
        titleKey: "missionGrid.heritage.title",
        defaultTitle: "Heritage Archive",
        descKey: "missionGrid.heritage.desc",
        defaultDesc: "Cultural Document Preservation",
        image: "/images/missions/history.webp",
        hoverImage: "/images/missions/historyhov.webp",
        link: "/heritage-dashboard",
    },
    {
        id: 10,
        titleKey: "missionGrid.skills.title",
        defaultTitle: "Basic Learning Skills",
        descKey: "missionGrid.skills.desc",
        defaultDesc: "Communication & Life Skills",
        image: "/images/missions/abilities.webp",
        hoverImage: "/images/missions/abilitieshov.webp",
        link: "/life-skills",
    }
];

const MissionGrid = () => {
    const { t } = useTranslation();
    const [missions, setMissions] = useState(defaultMissions);

    useEffect(() => {
        getSections('tr')
            .then((rows) => {
                if (rows && rows.length > 0) {
                    setMissions(rows.map((row) => ({
                        id: row.id,
                        title: row.title,
                        desc: row.description,
                        image: fileUrl(row.imageUrl),
                        hoverImage: hoverImageFor(row.imageUrl),
                        link: row.link,
                    })));
                } else {
                    setMissions(defaultMissions);
                }
            })
            .catch(() => setMissions(defaultMissions));
    }, []);

    return (
        <section id="missions-grid" className="pt-28 lg:pt-36 pb-16 px-4 md:px-8 bg-white font-sans">
            <div className="max-w-[1200px] mx-auto overflow-hidden">
                <div className="grid grid-cols-2 md:grid-cols-4 -mt-px -ml-px">
                    {missions.map((mission) => {
                        const title = mission.titleKey ? t(mission.titleKey, mission.defaultTitle) : mission.title;
                        const desc = mission.descKey ? t(mission.descKey, mission.defaultDesc) : mission.desc;

                        return (
                            <Link 
                                key={mission.id} 
                                to={mission.link || '#'}
                                className="flex flex-col items-center group text-center py-8 px-3 sm:py-12 sm:px-6 border-t border-l border-gray-100 hover:bg-slate-50/40 transition-colors duration-300"
                            >
                                {/* Icon Container */}
                                <div className="w-14 h-14 mb-5 flex items-center justify-center relative transition-transform duration-300 group-hover:-translate-y-1">
                                    <img loading="lazy" decoding="async" 
                                        src={mission.image} 
                                        alt={title} 
                                        className="w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0 absolute"
                                    />
                                    <img loading="lazy" decoding="async" 
                                        src={mission.hoverImage || mission.image} 
                                        alt={`${title} hover`} 
                                        className="w-full h-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100 absolute"
                                    />
                                </div>
                                
                                {/* Text Content */}
                                <div className="space-y-1.5">
                                    <h4 className="text-[#1e293b] text-[15px] font-bold tracking-tight group-hover:text-blue-600 transition-colors duration-300">
                                        {title}
                                    </h4>
                                    <p className="text-[12px] text-[#64748b] font-medium leading-relaxed max-w-[180px] mx-auto">
                                        {desc}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default MissionGrid;