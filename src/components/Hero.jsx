import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';

// --- DATA: Main Hero Slides ---
const slides = [
    {
        id: "slide-0",
        title: "BIHAR STATE",
        subtitle: "TEXT BOOK PUBLISHING",
        description: "Delivering reliable, well-designed textbooks so every Bihar Board student learns from clear and standardized academic resources.",
        image: "/images/hero_classroom.png",
        link: "/publishing-mission"
    },
    {
        id: "slide-1",
        title: "IMMERSIVE Mobile",
        subtitle: "VR Learning",
        description: "Our travelling VR labs reach schools across the state, letting students explore science, space, and the human body through interactive experiences.",
        image: "/images/hero_vr_new.png",
        link: "/vr"
    },

    {
        id: "slide-2",
        title: "Empowering Communication Through",
        subtitle: "Sign Language",
        description: "Structured programs help students communicate confidently and encourage a more inclusive and supportive school community.",
        image: "/images/hero_sign.png",
        link: "/sign"
    },

    {
        id: "slide-3",
        title: "Diverse Linguistic",
        subtitle: "Learning Programs",
        description: "Courses in foreign languages, Indian languages, and regional dialects expand cultural understanding and learning opportunities.",
        image: "/images/hero_linguistic.png",
        link: "/linguistic"
    },
    {
        id: "slide-4",
        title: "Accessible Learning",
        subtitle: " with Audiobooks",
        description: "Audio study materials assist special children and dyslexic learners, enabling comfortable and independent study.",
        image: "/images/hero_audio_new.png",
        link: "/audio-books"
    }
];

// Animation Variants
const textVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: { duration: 0.4, ease: "easeIn" }
    }
};

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Derived indices
    const nextIndex = (currentIndex + 1) % slides.length;
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;

    const currentSlide = slides[currentIndex];
    const nextSlide = slides[nextIndex];
    const prevSlide = slides[prevIndex];

    // Auto-rotate slides every 12 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 12000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    return (
        <section className="relative w-full h-screen bg-[#0f172a] text-white overflow-hidden font-sans">

            {/* 0. PREVIOUS BACKGROUND (Buffer) */}
            <div className="absolute inset-0 z-0">
                <img
                    key={prevSlide.id + "-static-bg"}
                    src={prevSlide.image}
                    alt=""
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f1025]/90 via-[#0f1025]/60 to-transparent" />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* 1. ACTIVE WALLPAPER (Crossfade Slide) */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentSlide.id + "-bg"}
                        initial={{ opacity: 0, scale: 1.2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 1.5,
                            ease: [0.25, 1, 0.5, 1]
                        }}
                        className="absolute inset-0 w-full h-full z-10"
                    >
                        <img
                            src={currentSlide.image}
                            alt={currentSlide.title}
                            className="w-full h-full object-cover opacity-95 blur-[0.5px] brightness-95 transition-all duration-700"
                            style={{ willChange: 'transform, filter, opacity' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1025]/95 via-[#0f1025]/40 to-transparent" />
                        <div className="absolute inset-0 bg-black/10" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* 2. CONTENT */}
            <div className="relative z-10 w-full h-full flex items-center px-6 lg:px-16 pt-20">
                <div className="max-w-4xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide.id + "-content"}
                            variants={textVariant}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <div className="overflow-hidden">
                                <motion.h1 className="text-5xl md:text-7xl lg:text-[85px] uppercase font-black tracking-tighter leading-[0.95] mb-4">
                                    <span className="block text-white drop-shadow-2xl">
                                        {currentSlide.title}
                                    </span>
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white/90 to-blue-200">
                                        {currentSlide.subtitle}
                                    </span>
                                </motion.h1>
                            </div>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="text-blue-100/70 text-lg md:text-xl max-w-xl font-light leading-relaxed mb-8"
                            >
                                {currentSlide.description}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="flex items-center gap-5"
                            >
                                <Link to={currentSlide.link} className="cursor-pointer">
                                    <button className="cursor-pointer group relative bg-white text-black px-8 py-3.5 rounded-full font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-blue-50 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(59,130,246,0.3)] hover:-translate-y-1">
                                        Explore Now
                                        <span className="bg-black text-white w-7 h-7 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                                            <FaPlay size={10} className="ml-0.5" />
                                        </span>
                                    </button>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* 3. PREVIEW CARD */}
            <div
                className="absolute bottom-12 right-6 lg:right-16 z-20 w-[240px] md:w-[320px] aspect-[16/9] cursor-pointer group"
                onClick={handleNext}
            >
                {/* Standard hover effect only, no shared element transition */}
                <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group-hover:border-white/30 transition-all duration-500 transform group-hover:-translate-y-1">
                    <div className="absolute inset-0 w-full h-full">
                        <img
                            src={nextSlide.image}
                            alt={nextSlide.title}
                            className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-all duration-700 opacity-98 blur-[0.3px]"
                            style={{ willChange: 'transform, filter, opacity' }}
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                    </div>

                    <div className="absolute inset-0 p-5 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                        <motion.h4
                            key={nextSlide.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-white font-bold uppercase text-base leading-none drop-shadow-md"
                        >
                            {nextSlide.title}
                        </motion.h4>
                        <p className="text-white/60 text-[10px] mt-1 uppercase tracking-widest font-medium">Coming Next</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 h-1 bg-white/10 w-full">
                        <motion.div
                            key={currentIndex}
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 12, ease: "linear" }}
                            className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"
                        />
                    </div>
                </div>
            </div>

            {/* Pagination Indicators */}
            <div className="absolute left-6 lg:left-16 bottom-12 flex items-center gap-4 z-20">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className="relative h-2 group"
                    >
                        <div className={`transition-all duration-500 rounded-full h-full ${idx === currentIndex ? 'w-10 bg-white' : 'w-2 bg-white/30 group-hover:bg-white/50'}`} />
                        {idx === currentIndex && (
                            <motion.div
                                layoutId="dot-outline"
                                className="absolute -inset-2 border border-white/20 rounded-full"
                            />
                        )}
                    </button>
                ))}
            </div>

        </section>
    );
};

export default Hero;
