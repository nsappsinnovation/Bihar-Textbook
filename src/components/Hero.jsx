import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaLinkedinIn, FaPlay, FaPause, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const slides = [
    {
        id: 0,
        label: "Primary Mission",
        title: <>Bihar <span className="text-orange-400">State Text Book</span> <br /> Publishing Corporation</>,
        description: "Empowering millions through knowledge. Shaping the future of education with standardized, accessible, and affordable learning resources.",
        location: "Patna, Bihar | Annual Publication Cycle",
        image: null, // Uses the original graphic
        buttonText: "Explore Library Now",
        link: "/books/1"
    },
    {
        id: 1,
        label: "Future Tech",
        title: <>Immersive <span className="text-blue-400">VR Education</span> <br /> Virtual Field Trips</>,
        description: "Taking students beyond classrooms with immersive VR journeys to historical sites and scientific laboratories across the globe.",
        location: "State-wide Digital Initiative",
        image: "/images/hero_poster_vr.png",
        buttonText: "Start Virtual Tour",
        link: "/events/vr-education-tours"
    },
    {
        id: 2,
        label: "Smart Learning",
        title: <>Adaptive <span className="text-indigo-400">AI-Powered</span> <br /> Learning Tutorials</>,
        description: "Personalized AI-driven paths that adapt to every student's pace, ensuring mastery of difficult concepts through instant feedback.",
        location: "Personalized Digital Tutors",
        image: "/images/hero_poster_ai.png",
        buttonText: "Try AI Tutor",
        link: "/events/ai-powered-learning"
    },
    {
        id: 3,
        label: "Digital Innovation",
        title: <>Smart <span className="text-emerald-400">Interactive</span> <br /> Modern E-Books</>,
        description: "Rich digital textbooks enhanced with 3D models, videos, and interactive quizzes for a more engaging learning experience.",
        location: "Universal Digital Access",
        image: "/images/hero_poster_ebooks.png",
        buttonText: "Read Interactive Books",
        link: "/events/interactive-e-books"
    },
    {
        id: 4,
        label: "Knowledge Hub",
        title: <>The Digital <span className="text-amber-400">Bihar Archive</span> <br /> Knowledge Repository</>,
        description: "A centralized long-term digital repository preserving Bihar's educational heritage and textbook evolutions for all generations.",
        location: "Permanent Digital Archive",
        image: "/images/hero_poster_archive.png",
        buttonText: "Browse Archive",
        link: "/events/digital-archive-textbooks"
    }
];

const Hero = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        let timer;
        if (isPlaying) {
            timer = setInterval(() => {
                setActiveSlide((prev) => (prev + 1) % slides.length);
            }, 6000);
        }
        return () => clearInterval(timer);
    }, [isPlaying]);

    const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);

    // Animation variants
    const contentVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 } },
        exit: { opacity: 0, x: -50, transition: { duration: 0.5 } }
    };

    const graphicVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } },
        exit: { opacity: 0, scale: 1.1, transition: { duration: 0.5 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section className="relative h-[700px] md:h-[710px] flex items-center overflow-hidden bg-[#0d0e23] ">
            {/* BACKGROUND ANIMATION */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1b4b] via-[#0d0e23] to-[#050610]"></div>
                <AnimatePresence mode="wait">
                    {slides[activeSlide].image && (
                        <motion.div
                            key={`bg-${activeSlide}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.2 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5 }}
                            className="absolute inset-0"
                        >
                            <img src={slides[activeSlide].image} className="w-full h-full object-cover" alt="slide-bg" />
                            <div className="absolute inset-0 bg-[#0d0e23]/40"></div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
                        backgroundSize: '30px 30px'
                    }}>
                </div>
            </div>

            <div className="container mx-auto px-6 lg:px-24 relative z-10 w-full mb-20 lg:mb-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* LEFT COLUMN: Graphic or Product Image */}
                    <div className="order-2 lg:order-1 flex justify-center lg:justify-start h-[350px] lg:h-[500px] items-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`graphic-${activeSlide}`}
                                variants={graphicVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="relative w-full max-w-[450px] aspect-square flex items-center justify-center"
                            >
                                {activeSlide === 0 ? (
                                    <>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-full h-full border-[1px] border-white/10 rounded-full animate-[spin_60s_linear_infinite]"></div>
                                            <div className="absolute w-[80%] h-[80%] border-[1px] border-white/5 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
                                        </div>
                                        <div className="relative w-[70%] h-[70%] flex items-center justify-center opacity-40">
                                            <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_100s_linear_infinite]">
                                                <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="1,3" opacity="0.3" />
                                                {[...Array(24)].map((_, i) => (
                                                    <g key={i} transform={`rotate(${i * 15} 50 50)`}>
                                                        <line x1="50" y1="50" x2="50" y2="15" stroke="white" strokeWidth="0.4" opacity="0.5" />
                                                        <circle cx="50" cy="15" r="0.5" fill="white" />
                                                    </g>
                                                ))}
                                                <g transform="translate(35, 35) scale(0.6)" fill="white">
                                                    <path d="M25 5C17.5 5 10 7.5 5 10V45C10 42.5 17.5 40 25 40C32.5 40 40 42.5 45 45V10C40 7.5 32.5 5 25 5Z" opacity="0.8" />
                                                    <path d="M25 5C32.5 5 40 7.5 45 10L45 45C40 42.5 32.5 40 25 40C17.5 40 10 42.5 5 45L5 10C10 7.5 17.5 5 25 5Z" opacity="0.6" />
                                                </g>
                                            </svg>
                                        </div>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                            <div className="text-6xl lg:text-8xl font-black text-white/90 tracking-tighter mb-0 leading-none">BSTBP</div>
                                            <div className="text-xl lg:text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent uppercase tracking-[0.2em]">Corporation</div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="relative group w-full h-full overflow-hidden rounded-[40px] border border-white/10 shadow-2xl">
                                        <img src={slides[activeSlide].image} className="w-full h-full object-cover rounded-[40px]" alt="Feature" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e23] via-transparent to-transparent opacity-60"></div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* RIGHT COLUMN: Text Content */}
                    <div className="order-1 lg:order-2">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`content-${activeSlide}`}
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="text-white"
                            >
                                <motion.div variants={itemVariants} className="flex items-center gap-4 mb-3">
                                    <span className="px-3.5 py-1 rounded-full bg-white/10 border border-white/10 text-[9px] font-bold uppercase tracking-[3px] text-white/70">
                                        {slides[activeSlide].label}
                                    </span>
                                    <div className="h-[1px] w-10 bg-white/20"></div>
                                </motion.div>

                                <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold leading-[1.1] mb-5 tracking-tight">
                                    {slides[activeSlide].title}
                                </motion.h1>

                                <motion.p variants={itemVariants} className="text-lg md:text-xl text-white/60 mb-7 max-w-xl font-light leading-relaxed">
                                    {slides[activeSlide].description}
                                </motion.p>

                                <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8 text-white/50">
                                    <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                                    <span className="font-medium uppercase tracking-wider text-xs">{slides[activeSlide].location}</span>
                                </motion.div>

                                <motion.div variants={itemVariants} className="flex items-center gap-6">
                                    <Link to={slides[activeSlide].link}>
                                        <motion.button
                                            whileHover={{ scale: 1.05, backgroundColor: "#3a3bbd" }}
                                            whileTap={{ scale: 0.95 }}
                                            className="bg-[#2a2b8d] text-white px-7 py-3 rounded-xl font-bold text-base flex items-center gap-2.5 transition-all shadow-lg shadow-blue-900/10 border border-white/5"
                                        >
                                            {slides[activeSlide].buttonText}
                                            <FaChevronRight size={12} className="opacity-70" />
                                        </motion.button>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* NAVIGATION CONTROLS - REPOSITIONED TO FIX OVERLAP */}
            <div className="absolute right-8 lg:right-24 bottom-16 z-30 flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <button onClick={prevSlide} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all">
                        <FaChevronLeft />
                    </button>
                    <button onClick={nextSlide} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all">
                        <FaChevronRight />
                    </button>
                </div>
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-white text-[#0d0e23] hover:bg-white/90 transition-all"
                >
                    {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} className="translate-x-0.5" />}
                </button>
            </div>

            {/* PROGRESS DOTS - REPOSITIONED TO FIX OVERLAP */}
            <div className="absolute bottom-6 left-8 lg:left-1/2 lg:-translate-x-1/2 flex items-center gap-4 z-30">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveSlide(i)}
                        className={`h-2 rounded-full transition-all duration-500 ${activeSlide === i ? "w-12 bg-white" : "w-2 bg-white/20 hover:bg-white/40"}`}
                    />
                ))}
            </div>

            {/* SOCIAL FLOATER */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-1 px-4 py-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-l-3xl z-20">
                {[FaLinkedinIn, FaTwitter, FaYoutube, FaInstagram, FaFacebookF].map((Icon, idx) => (
                    <motion.a key={idx} href="#" whileHover={{ x: -5, color: "#fff" }} className="w-10 h-10 flex items-center justify-center text-white/40"><Icon /></motion.a>
                ))}
            </div>

            <style>{`
                @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </section>
    );
};

export default Hero;

