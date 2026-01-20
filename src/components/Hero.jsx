import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaLinkedinIn, FaPlay, FaPause } from 'react-icons/fa';

const Hero = () => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [timeLeft, setTimeLeft] = useState({
        days: 32,
        hours: 15,
        minutes: 9
    });

    // Stagger container for text elements
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0d0e23]">
            {/* Background Pattern - Subtle dots/stars and grid */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1b4b] via-[#0d0e23] to-[#050610]"></div>
                <div className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
                        backgroundSize: '30px 30px'
                    }}>
                </div>
                {/* Subtle Grid Overlay */}
                <div className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '100px 100px'
                    }}>
                </div>
            </div>

            <div className="container mx-auto px-6 lg:px-20 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* LEFT COLUMN: Large Graphic/Logo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="flex justify-center lg:justify-start"
                    >
                        <div className="relative max-w-[500px] w-full aspect-square">
                            {/* Decorative Spiral/Logo Element based on ref */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-full h-full border-[1px] border-white/10 rounded-full animate-[spin_60s_linear_infinite]"></div>
                                <div className="absolute w-[80%] h-[80%] border-[1px] border-white/5 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
                            </div>

                            {/* Premium Inner Graphic (Custom SVG Knowledge Wheel) */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="relative w-[70%] h-[70%] flex items-center justify-center opacity-40">
                                    <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_100s_linear_infinite]">
                                        {/* Outer Halo */}
                                        <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="1,3" opacity="0.3" />

                                        {/* Rays of Knowledge (Inspired by 24 spokes) */}
                                        {[...Array(24)].map((_, i) => (
                                            <g key={i} transform={`rotate(${i * 15} 50 50)`}>
                                                <line
                                                    x1="50" y1="50"
                                                    x2="50" y2="15"
                                                    stroke="white"
                                                    strokeWidth="0.4"
                                                    opacity="0.5"
                                                />
                                                <circle cx="50" cy="15" r="0.5" fill="white" />
                                            </g>
                                        ))}

                                        {/* Stylized Open Book Centerpiece */}
                                        <g transform="translate(35, 35) scale(0.6)" fill="white">
                                            <path d="M25 5C17.5 5 10 7.5 5 10V45C10 42.5 17.5 40 25 40C32.5 40 40 42.5 45 45V10C40 7.5 32.5 5 25 5Z" opacity="0.8" />
                                            <path d="M25 5C32.5 5 40 7.5 45 10L45 45C40 42.5 32.5 40 25 40C17.5 40 10 42.5 5 45L5 10C10 7.5 17.5 5 25 5Z" opacity="0.6" />
                                        </g>
                                    </svg>

                                    {/* Central Glow Aura */}
                                    <div className="absolute inset-0 bg-blue-500/10 blur-[60px] rounded-full scale-110"></div>
                                </div>
                            </div>

                            {/* Text integration inside graphic */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <div className="text-6xl lg:text-8xl font-black text-white/90 tracking-tighter mb-0 leading-none">
                                        BSTB
                                    </div>
                                    <div className="text-xl lg:text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent uppercase tracking-[0.2em]">
                                        Corporation
                                    </div>
                                    <div className="text-white/60 text-xs mt-4 font-medium tracking-widest uppercase italic">
                                        Educating Bihar • Serving India
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: Content & Countdown */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-white"
                    >
                        {/* Partner Logos Top Section */}
                        <motion.div variants={itemVariants} className="flex items-center gap-6 mb-8 bg-white/5 backdrop-blur-md p-4 pr-8 rounded-2xl border border-white/10 w-fit">
                            <div className="flex flex-col border-r border-white/20 pr-6">
                                <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-1">Government of Bihar</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-black italic">BR</div>
                                    <span className="text-sm font-bold">शिक्षा विभाग</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-[10px] font-black">BSTB</div>
                                <span className="text-xl font-black tracking-tighter">PUBLISHING</span>
                            </div>
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                            Bihar <span className="text-orange-400">State Text Book</span> <br />
                            Publishing Corporation
                        </motion.h1>

                        <motion.p variants={itemVariants} className="text-lg text-white/70 mb-8 max-w-xl font-light leading-relaxed">
                            Empowering millions through knowledge. Shaping the future of education with standardized, accessible, and affordable learning resources.
                        </motion.p>

                        {/* Location/Info */}
                        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8 text-white/80">
                            <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                            <span className="font-semibold text-lg">Patna, Bihar | Annual Publication Cycle </span>
                        </motion.div>

                        {/* Countdown Timer */}
                        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-10">
                            {[
                                { label: 'DAYS', value: timeLeft.days },
                                { label: 'HOURS', value: timeLeft.hours },
                                { label: 'MINUTES', value: timeLeft.minutes }
                            ].map((unit, idx) => (
                                <React.Fragment key={idx}>
                                    <div className="flex flex-col items-center">
                                        <div className="w-20 h-16 bg-white text-[#0d0e23] rounded-xl flex items-center justify-center text-3xl font-black shadow-lg shadow-white/10">
                                            {String(unit.value).padStart(2, '0')}
                                        </div>
                                        <span className="text-[10px] font-bold mt-2 tracking-widest text-white/50">{unit.label}</span>
                                    </div>
                                    {idx < 2 && <div className="text-3xl font-black mb-6">:</div>}
                                </React.Fragment>
                            ))}
                        </motion.div>

                        {/* Button */}
                        <motion.button
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#2a2b8d] hover:bg-[#3a3bbd] text-white px-10 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-colors shadow-xl shadow-[#1a1b4b]/40"
                        >
                            Explore Library Now
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                        </motion.button>
                    </motion.div>
                </div>
            </div>

            {/* SOCIAL SIDEBAR - Original Design Style on the Right */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-1 px-4 py-8 bg-white/5 backdrop-blur-xl border-l border-y border-white/10 rounded-l-3xl z-20">
                {[FaLinkedinIn, FaTwitter, FaYoutube, FaInstagram, FaFacebookF].map((Icon, idx) => (
                    <motion.a
                        key={idx}
                        href="#"
                        whileHover={{ backgroundColor: "rgba(255,255,255,0.15)", x: -5 }}
                        className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 text-white/70 hover:text-white transition-all duration-300"
                    >
                        <Icon className="text-lg" />
                    </motion.a>
                ))}
            </div>

            {/* BOTTOM CONTROLS */}
            <div className="absolute bottom-10 left-10 z-20">
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-14 h-14 flex items-center justify-center rounded-full bg-white text-[#0d0e23] hover:bg-white/90 transition-all shadow-xl"
                >
                    {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} className="translate-x-0.5" />}
                </button>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
                <div className="w-3 h-3 rounded-full bg-white ring-4 ring-white/20"></div>
                {[0, 1, 2, 3, 4].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-white/30 hover:bg-white/50 cursor-pointer transition-colors"></div>
                ))}
            </div>
        </section>
    );
};

export default Hero;

