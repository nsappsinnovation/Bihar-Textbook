import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, GraduationCap, Users, TrendingUp, BookOpenText } from 'lucide-react';

const Hero = () => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const imgRef = useRef(null);

    // Safety check in case image is cached and loads before hydration
    useEffect(() => {
        if (imgRef.current?.complete) {
            setIsImageLoaded(true);
        }
    }, []);
    return (
        <section className="relative w-full min-h-screen bg-[#f8f5f0] overflow-hidden font-sans pt-[clamp(120px,15vh,160px)] flex flex-col justify-center">
            
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <img 
                    ref={imgRef}
                    src="/hero.webp" 
                    alt="Background decorative elements" 
                    className="absolute inset-0 w-full h-full object-cover object-right"
                    fetchPriority="high"
                    loading="eager"
                    onLoad={() => setIsImageLoaded(true)}
                />
            </div>

            {/* Main Content Container */}
            <div className={`relative z-10 w-full max-w-[1536px] mx-auto px-[clamp(1.5rem,5vw,4rem)] h-full flex flex-col justify-center pb-[5vh] ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}>
                
                <div className="max-w-[85vw] xl:max-w-3xl">
                    {/* Top pre-heading */}
                    <div className="flex items-center gap-[clamp(0.5rem,1vw,1rem)] mb-[clamp(0.8rem,2vw,1.5rem)]">
                        <div className="flex items-center">
                            <div className="w-[clamp(2rem,4vw,3rem)] h-[1.5px] bg-[#124d9c]"></div>
                            <div className="w-[4px] h-[4px] rounded-full bg-[#124d9c] -ml-[2px]"></div>
                        </div>
                        <span className="text-[#124d9c] font-black text-[clamp(0.5rem,1vw,0.6rem)] tracking-[0.15em] uppercase">
                            Empowering minds. Enriching futures.
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-[clamp(2rem,5vw,4.5rem)] font-black text-[#0b2b4f] leading-[1.05] tracking-tight">
                        BIHAR STATE<br />
                        <span className="text-blue-600">TEXTBOOK</span><br />
                        PUBLISHING<br />
                        CORPORATION LTD.
                    </h1>

                  

                    {/* Feature Icons Row */}
                    <div className="mt-[clamp(2rem,4vw,3rem)] flex flex-wrap lg:flex-nowrap items-center gap-[clamp(0.6rem,2vw,2rem)]">
                        {/* Feature 1 */}
                        <div className="flex flex-col items-center gap-[clamp(0.4rem,1vw,0.8rem)] w-[clamp(3rem,6vw,5.5rem)] group">
                            <div className="w-[clamp(2.5rem,4.5vw,4rem)] h-[clamp(2.5rem,4.5vw,4rem)] rounded-full bg-white border border-blue-200 flex items-center justify-center text-[#0b2b4f] shadow-sm group-hover:bg-[#124d9c] group-hover:text-white cursor-pointer">
                                <BookOpen size="45%" strokeWidth={1.5} />
                            </div>
                            <span className="text-[clamp(0.4rem,0.75vw,0.6rem)] font-bold text-[#0b2b4f] text-center tracking-[0.08em] leading-tight opacity-90">
                                QUALITY<br />CONTENT
                            </span>
                        </div>

                        <div className="hidden sm:block w-[1px] h-[clamp(1rem,2vw,2rem)] bg-blue-200 opacity-70"></div>

                        {/* Feature 2 */}
                        <div className="flex flex-col items-center gap-[clamp(0.4rem,1vw,0.8rem)] w-[clamp(3rem,6vw,5.5rem)] group">
                            <div className="w-[clamp(2.5rem,4.5vw,4rem)] h-[clamp(2.5rem,4.5vw,4rem)] rounded-full bg-white border border-blue-200 flex items-center justify-center text-[#0b2b4f] shadow-sm group-hover:bg-[#124d9c] group-hover:text-white cursor-pointer">
                                <GraduationCap size="50%" strokeWidth={1.5} />
                            </div>
                            <span className="text-[clamp(0.4rem,0.75vw,0.6rem)] font-bold text-[#0b2b4f] text-center tracking-[0.08em] leading-tight opacity-90">
                                LEARNING<br />FOR ALL
                            </span>
                        </div>

                        <div className="hidden md:block w-[1px] h-[clamp(1rem,2vw,2rem)] bg-blue-200 opacity-70"></div>

                        {/* Feature 3 */}
                        <div className="flex flex-col items-center gap-[clamp(0.4rem,1vw,0.8rem)] w-[clamp(3rem,6vw,5.5rem)] group">
                            <div className="w-[clamp(2.5rem,4.5vw,4rem)] h-[clamp(2.5rem,4.5vw,4rem)] rounded-full bg-white border border-blue-200 flex items-center justify-center text-[#0b2b4f] shadow-sm group-hover:bg-[#124d9c] group-hover:text-white cursor-pointer">
                                <Users size="45%" strokeWidth={1.5} />
                            </div>
                            <span className="text-[clamp(0.4rem,0.75vw,0.6rem)] font-bold text-[#0b2b4f] text-center tracking-[0.08em] leading-tight opacity-90">
                                INCLUSIVE<br />EDUCATION
                            </span>
                        </div>

                        <div className="hidden lg:block w-[1px] h-[clamp(1rem,2vw,2rem)] bg-blue-200 opacity-70"></div>

                        {/* Feature 4 */}
                        <div className="flex flex-col items-center gap-[clamp(0.4rem,1vw,0.8rem)] w-[clamp(3rem,6vw,5.5rem)] group">
                            <div className="w-[clamp(2.5rem,4.5vw,4rem)] h-[clamp(2.5rem,4.5vw,4rem)] rounded-full bg-white border border-blue-200 flex items-center justify-center text-[#0b2b4f] shadow-sm group-hover:bg-[#124d9c] group-hover:text-white cursor-pointer">
                                <TrendingUp size="45%" strokeWidth={1.5} />
                            </div>
                            <span className="text-[clamp(0.4rem,0.75vw,0.6rem)] font-bold text-[#0b2b4f] text-center tracking-[0.08em] leading-tight opacity-90">
                                EMPOWERING<br />BIHAR
                            </span>
                        </div>
                    </div>
                </div>



            </div>

            {/* Right side floating box content */}
            <div 
                className={`absolute bottom-[clamp(2.5rem,8vw,5rem)] right-[clamp(1.5rem,6vw,5rem)] z-20 flex items-center gap-[clamp(1rem,2vw,1.5rem)] ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            >
                <div className="flex items-center gap-[clamp(0.8rem,1.5vw,1.2rem)]">
                    <div className="w-[clamp(2rem,4vw,3rem)] h-[clamp(2rem,4vw,3rem)] flex items-center justify-center shrink-0">
                        <BookOpenText size="100%" strokeWidth={1} className="text-white opacity-90" />
                    </div>
                    <div className="h-[clamp(2.5rem,5vw,3.5rem)] w-[2px] bg-white"></div>
                    <p className="text-white text-[clamp(0.65rem,1.2vw,0.85rem)] font-medium leading-[1.6] tracking-wide opacity-90 max-w-[10rem]">
                        Bringing world-class textbooks to every learner in Bihar.
                    </p>
                </div>

            </div>

        </section>
    );
};

export default Hero;
