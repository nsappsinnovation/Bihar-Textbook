import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaPlay, FaVrCardboard, FaBookOpen, FaSignLanguage, FaGlobe, FaHeadphones, FaSchool, FaUserGraduate, FaBus, FaCheckCircle } from 'react-icons/fa';

// --- DATA: Main Hero Slides ---
const slides = [
    {
        id: "slide-0",
        title: "BIHAR STATE",
        subtitle: "TEXT BOOK\nPUBLISHING CORPORATION LTD.",
        description: "Delivering reliable, well-designed textbooks so every Bihar Board student learns from clear and standardized academic resources.",
        image: "/images/hero/classroom.png",
        link: "/books/1",
        badgeIcon: FaBookOpen,
        badgeText: "Quality\nTextbooks\nFor All"
    },
    {
        id: "slide-1",
        title: "IMMERSIVE Mobile",
        subtitle: "VR\nLearning",
        description: "Our travelling VR labs reach schools across the state, letting students explore science, space, and the human body through interactive experiences.",
        image: "/images/hero/vr.png",
        link: "/vr-dashboard",
        badgeIcon: FaVrCardboard,
        badgeText: "Bringing\nLearning\nTo Life"
    },
    {
        id: "slide-2",
        title: "Empowering",
        subtitle: "Communication\nThrough Sign Language",
        description: "Structured programs help students communicate confidently and encourage a more inclusive and supportive school community.",
        image: "/images/hero/sign.png",
        link: "/sign-learn",
        badgeIcon: FaSignLanguage,
        badgeText: "Inclusive\nLearning\nFor All"
    },
    {
        id: "slide-3",
        title: "Multilingual",
        subtitle: "Learning\nPrograms",
        description: "Courses in foreign languages, Indian languages, and regional dialects expand cultural understanding and learning opportunities.",
        image: "/images/hero/linguistic.png",
        link: "/ling",
        badgeIcon: FaGlobe,
        badgeText: "Explore\nLanguages\nGlobally"
    },
    {
        id: "slide-4",
        title: "Accessible",
        subtitle: "Learning with\nAudiobooks",
        description: "Audio study materials assist special children and dyslexic learners, enabling comfortable and independent study.",
        image: "/images/hero/audio.png",
        link: "/audio-library-dashboard",
        badgeIcon: FaHeadphones,
        badgeText: "Accessible\nAudio\nLearning"
    }
];

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentSlide = slides[currentIndex];

    // Auto-rotate slides every 8 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full h-[900px] lg:h-[750px] bg-blue-50 font-sans pt-[80px]">
            
            {/* SVG DEFINITION FOR THE ORGANIC/LOGARITHMIC SWOOPING CURVE */}
            <svg width="0" height="0" className="absolute">
                <defs>
                    <clipPath id="hero-curve" clipPathUnits="objectBoundingBox">
                        {/* 
                            Starts at x=15% at the top.
                            Curves smoothly to x=0% in the middle (using cubic bezier).
                            Curves back to x=15% at the bottom.
                            Fills the rest to the right (x=1).
                        */}
                        <path d="M 0.10,0 C 0,0.35 0,0.65 0.20,1 L 1,1 L 1,0 Z" />
                    </clipPath>
                </defs>
            </svg>
            
            {/* 1. RIGHT SIDE: IMAGE CAROUSEL WITH CURVED LEFT EDGE */}
            {/* Main wrapper. Starts exactly below navbar to merge with it */}
            <div className="absolute top-[80px] right-0 w-[100%] md:w-[70%] lg:w-[50%] h-[calc(100%-80px)] z-0 transition-all duration-500">
                
                {/* Image wrapper with drop-shadow. The drop-shadow will perfectly trace the SVG clipPath curve! */}
                <div className="absolute inset-0 drop-shadow-[-6px_0_0_#1e3a8a] md:drop-shadow-[-10px_0_0_#1e3a8a]">
                    <div 
                        className="absolute inset-0 overflow-hidden shadow-[-10px_0_40px_rgba(0,0,0,0.15)]"
                        style={{ clipPath: 'url(#hero-curve)' }}
                    >
                        <AnimatePresence mode="popLayout">
                            <motion.div
                                key={currentSlide.id + "-img"}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <img
                                    src={currentSlide.image}
                                    alt={currentSlide.title}
                                    className="w-full h-full object-cover object-center"
                                />
                                {/* Fade at the top to merge seamlessly with the navbar (bg-blue-50) */}
                                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-blue-50 to-transparent pointer-events-none z-10"></div>
                                
                               {/* Fade at the bottom right to blend into the stats banner/background */}
                               {/* <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#1c2b4d] via-[#1c2b4d]/40 to-transparent pointer-events-none"></div> */}
                                
                                {/* Mobile Text Legibility Gradient: Fades the left side into the background on small screens */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-blue-50/90 to-transparent lg:hidden z-10 pointer-events-none"></div>

                                {/* A slight dark overlay to ensure the image isn't too bright */}
                                <div className="absolute inset-0 bg-black/10 z-0 pointer-events-none"></div>
                               
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Floating Circular Badge positioned precisely on the apex of the SVG curve */}
                {/* Since the curve goes to 0% at the middle, we place the badge near left-0 */}
                <div className="hidden lg:flex absolute left-[-30px] xl:left-[-60px] top-[40%] bg-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex-col items-center justify-center w-28 h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 z-30 hover:scale-105 transition-transform duration-500 cursor-pointer overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide.id + "-badge"}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center justify-center w-full h-full"
                        >
                            <div className="text-blue-600 mb-1.5 xl:mb-2">
                                <currentSlide.badgeIcon className="text-2xl xl:text-4xl" />
                            </div>
                            <div className="text-blue-700 font-extrabold text-[9px] xl:text-[10px] text-center leading-[1.2] uppercase tracking-wide">
                                {currentSlide.badgeText.split('\n').map((line, idx) => (
                                    <React.Fragment key={idx}>
                                        {line}
                                        {idx < 2 && <br />}
                                    </React.Fragment>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* 2. MAIN CONTENT CONTAINER */}
            {/* Grid updated to 50/50 to give text more breathing room on large screens */}
            <div className="w-full max-w-[1536px] mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 h-[calc(100%-80px)] relative z-20">
                
                {/* Text Content */}
                {/* Adjusted padding to perfectly balance the text vertically */}
                <div className="flex flex-col justify-center h-full max-w-2xl pt-[40px] md:pt-[60px] lg:pt-[80px] pb-[160px] md:pb-[140px] lg:pb-[80px] relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide.id + "-text"}
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 30 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="flex flex-col"
                        >
                            <h1 className="uppercase font-black leading-[1.1] tracking-tight mb-5 text-4xl sm:text-5xl md:text-6xl lg:text-[50px] xl:text-[56px] 2xl:text-[62px] text-[#1c2b4d] drop-shadow-sm break-words hyphens-auto w-full">
                                {currentSlide.title}
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mt-1.5">
                                    {currentSlide.subtitle}
                                </span>
                            </h1>

                            <p className="text-blue-950/80 text-[14px] md:text-[15px] lg:text-[18px] font-medium leading-relaxed mb-7 max-w-[85%]">
                                {currentSlide.description}
                            </p>

                            <div className="flex items-center gap-5">
                                <Link to={currentSlide.link}>
                                    <button className="group relative bg-gradient-to-br from-[#0b2b4f] to-[#124d9c] hover:opacity-90 text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-widest flex items-center gap-3 transition-all duration-300 shadow-[0_10px_20px_rgba(11,43,79,0.3)] hover:shadow-[0_15px_30px_rgba(11,43,79,0.5)] hover:-translate-y-1">
                                        Explore Now
                                        <span className="bg-white text-[#0b2b4f] w-7 h-7 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                                            <FaPlay size={9} className="ml-0.5" />
                                        </span>
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Pagination Indicators - Moved up to prevent hiding */}
                    <div className="absolute bottom-20 md:bottom-24 lg:bottom-12 left-0 flex items-center gap-3">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className="relative h-2 group flex items-center justify-center cursor-pointer"
                                aria-label={`Slide ${idx + 1}`}
                            >
                                <div className={`transition-all duration-500 rounded-full h-full ${idx === currentIndex ? 'w-12 bg-gradient-to-br from-[#0b2b4f] to-[#124d9c]' : 'w-3 bg-blue-200 group-hover:bg-[#124d9c]/50'}`} />
                            </button>
                        ))}
                    </div>
                </div>

            {/* Right Side Empty Placeholder to push text left */}
                <div className="hidden lg:block pointer-events-none"></div>
            </div>

            {/* 3. BOTTOM STATS BANNER - Moved higher to ensure nothing hides */}
            <div className="absolute -bottom-6 lg:-bottom-12 left-1/2 -translate-x-1/2 w-[95%] max-w-[1400px] bg-gradient-to-br from-[#0b2b4f] to-[#124d9c] rounded-3xl p-6 lg:px-10 lg:py-8 z-30 shadow-2xl overflow-hidden">
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                
                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
                    
                    {/* Stat 1 */}
                    <div className="flex items-center gap-4 lg:justify-center pt-4 sm:pt-0 first:pt-0">
                        <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border border-white/20 flex items-center justify-center text-white shrink-0">
                            <FaGlobe className="text-xl lg:text-3xl" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white font-black text-2xl lg:text-[28px] leading-none mb-1.5">38</span>
                            <span className="text-white/90 text-[13px] lg:text-[15px] font-semibold leading-tight">Districts Covered</span>
                            <span className="text-white/50 text-[10px] lg:text-[12px] mt-0.5">Across the entire state</span>
                        </div>
                    </div>

                    {/* Stat 2 */}
                    <div className="flex items-center gap-4 lg:justify-center pt-4 sm:pt-0">
                        <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border border-white/20 flex items-center justify-center text-white shrink-0">
                            <FaUserGraduate className="text-xl lg:text-3xl" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white font-black text-2xl lg:text-[28px] leading-none mb-1.5">Millions</span>
                            <span className="text-white/90 text-[13px] lg:text-[15px] font-semibold leading-tight">Students Benefited</span>
                            <span className="text-white/50 text-[10px] lg:text-[12px] mt-0.5">Empowering the next generation</span>
                        </div>
                    </div>

                    {/* Stat 3 */}
                    <div className="flex items-center gap-4 lg:justify-center pt-4 sm:pt-0">
                        <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border border-white/20 flex items-center justify-center text-white shrink-0">
                            <FaBookOpen className="text-xl lg:text-3xl" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white font-black text-2xl lg:text-[28px] leading-none mb-1.5">1-12</span>
                            <span className="text-white/90 text-[13px] lg:text-[15px] font-semibold leading-tight">Classes Covered</span>
                            <span className="text-white/50 text-[10px] lg:text-[12px] mt-0.5">Comprehensive study materials</span>
                        </div>
                    </div>

                    {/* Stat 4 */}
                    <div className="flex items-center gap-4 lg:justify-center pt-4 sm:pt-0">
                        <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border border-white/20 flex items-center justify-center text-white shrink-0">
                            <FaCheckCircle className="text-xl lg:text-3xl" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white font-black text-2xl lg:text-[28px] leading-none mb-1.5">Official</span>
                            <span className="text-white/90 text-[13px] lg:text-[15px] font-semibold leading-tight">Textbook Publisher</span>
                            <span className="text-white/50 text-[10px] lg:text-[12px] mt-0.5">For Bihar State Board</span>
                        </div>
                    </div>

                </div>
            </div>        </section>
    );
};

export default Hero;
