import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSections } from '../../services/sectionService';
import { fileUrl } from '../../services/api';

// Built-in icons have a hover variant named "<name>hov.webp"; uploaded icons reuse the same image
const hoverImageFor = (image) =>
    image?.startsWith('/images/missions/') ? image.replace(/\.webp$/, 'hov.webp') : fileUrl(image);

const MissionGrid = () => {
    // Items are managed in Admin → Tools & Resources
    const [missions, setMissions] = useState([]);

    useEffect(() => {
        getSections('tr')
            .then((rows) => setMissions(rows.map((row) => ({
                id: row.id,
                title: row.title,
                desc: row.description,
                image: fileUrl(row.imageUrl),
                hoverImage: hoverImageFor(row.imageUrl),
                link: row.link,
            }))))
            .catch(() => setMissions([]));
    }, []);

    return (
        <section id="missions-grid" className="pt-28 lg:pt-36 pb-16 px-4 md:px-8 bg-white font-sans">
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
                                <img loading="lazy" decoding="async" 
                                    src={mission.image} 
                                    alt={mission.title} 
                                    className="w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0 absolute"
                                />
                                <img loading="lazy" decoding="async" 
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