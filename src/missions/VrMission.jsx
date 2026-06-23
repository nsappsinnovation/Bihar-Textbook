import React from 'react';
import { motion } from 'framer-motion';
import { 
  Monitor, 
  Code, 
  Upload, 
  Glasses, 
  Building2, 
  Users, 
  GraduationCap, 
  Play, 
  ChevronRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const VrMission = () => {
    return (
        <div className="bg-white min-h-screen font-sans selection:bg-blue-100 selection:text-blue-700">
            {/* SECTION 1: CORPORATE MISSION & STRATEGY */}
            <section className="pt-32 pb-20 px-6 bg-white">
                <div className="max-w-5xl mx-auto text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 shadow-sm"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Immersive Experience</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-[56px] font-black text-slate-900 leading-[1.1] tracking-tight"
                    >
                        Immersive Mobile <br />
                        <span className="text-blue-600">VR Learning</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        Our travelling VR labs reach schools across the state, letting students explore science, space, and the human body through interactive experiences.
                    </motion.p>
                </div>
            </section>

            {/* SECTION 2: OUR ECOSYSTEM */}
            <section className="py-24 bg-[#f8fafc] px-6 border-t border-b border-slate-100 relative overflow-hidden">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
                    <div className="lg:col-span-5 space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-0.5 bg-blue-600" />
                                <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Our Ecosystem</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-black text-slate-900 leading-tight tracking-tight">
                                A Seamless Cycle <br />
                                of <span className="text-blue-600">Learning Impact</span>
                            </h2>
                        </div>
                        <p className="text-base md:text-lg text-slate-500 font-light leading-relaxed">
                            From conceptualization to deployment, every step is optimized for engaging and modern education.
                        </p>
                        <div className="pt-2">
                            <a href="#ecosystem-orbit" className="inline-flex items-center gap-3 px-6 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-full text-sm hover:bg-blue-600 hover:text-white transition-all duration-300 group">
                                See How It Works
                                <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-white group-hover:text-blue-600 transition-colors duration-300">
                                    <Play size={10} className="fill-current ml-0.5" />
                                </span>
                            </a>
                        </div>
                    </div>

                    <div id="ecosystem-orbit" className="lg:col-span-7 flex justify-center items-center relative py-12">
                        <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                                className="absolute w-[80%] h-[80%] border-2 border-dashed border-blue-200/50 rounded-full z-10"
                            >
                                <div className="absolute top-[15%] left-[15%] w-2 h-2 rounded-full bg-blue-200/80" />
                                <div className="absolute top-[15%] right-[15%] w-2 h-2 rounded-full bg-blue-200/80" />
                                <div className="absolute top-[78.3%] left-[21.7%] w-2 h-2 rounded-full bg-blue-200/80" />
                                <div className="absolute top-[78.3%] left-[78.3%] w-3.5 h-3.5 rounded-full bg-blue-600 shadow-md border border-white" />
                                <div className="absolute top-[50%] left-[8%] w-1.5 h-1.5 rounded-full bg-blue-200/80 -translate-x-1/2 -translate-y-1/2" />
                                <div className="absolute top-[50%] right-[8%] w-1.5 h-1.5 rounded-full bg-blue-200/80 translate-x-1/2 -translate-y-1/2" />

                                <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }} className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 group">
                                    <div className="w-16 h-16 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md">
                                            <Monitor size={18} />
                                        </div>
                                    </div>
                                    <div className="absolute top-full mt-2 text-center w-20">
                                        <span className="block text-[10px] font-extrabold text-blue-600 tracking-wider">01</span>
                                        <span className="block text-xs font-black text-slate-800 uppercase tracking-wide">Design</span>
                                    </div>
                                </motion.div>

                                <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }} className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 group">
                                    <div className="w-16 h-16 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md">
                                            <Code size={16} />
                                        </div>
                                    </div>
                                    <div className="absolute top-full mt-2 text-center w-20">
                                        <span className="block text-[10px] font-extrabold text-blue-600 tracking-wider">02</span>
                                        <span className="block text-xs font-black text-slate-800 uppercase tracking-wide">Build</span>
                                    </div>
                                </motion.div>

                                <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }} className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex flex-col items-center z-20 group">
                                    <div className="w-16 h-16 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md">
                                            <Upload size={18} />
                                        </div>
                                    </div>
                                    <div className="absolute top-full mt-2 text-center w-20">
                                        <span className="block text-[10px] font-extrabold text-blue-600 tracking-wider">03</span>
                                        <span className="block text-xs font-black text-slate-800 uppercase tracking-wide">Deploy</span>
                                    </div>
                                </motion.div>

                                <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }} className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 group">
                                    <div className="w-16 h-16 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md">
                                            <Glasses size={18} />
                                        </div>
                                    </div>
                                    <div className="absolute top-full mt-2 text-center w-20">
                                        <span className="block text-[10px] font-extrabold text-blue-600 tracking-wider">04</span>
                                        <span className="block text-xs font-black text-slate-800 uppercase tracking-wide">Experience</span>
                                    </div>
                                </motion.div>
                            </motion.div>

                            <div className="absolute w-[44%] h-[44%] rounded-full overflow-hidden border-8 border-white shadow-xl z-10">
                                <img src="/images/hero/vr.png" alt="VR Learning" className="w-full h-full object-cover scale-105" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: OUR IMPACT */}
            <section className="py-24 bg-white px-6 relative overflow-hidden">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
                    <div className="lg:col-span-6 flex justify-center relative">
                        <div className="absolute -top-6 -left-6 w-24 h-24 bg-[radial-gradient(#e2e8f0_2px,transparent_2px)] [background-size:12px_12px] opacity-70" />
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[radial-gradient(#e2e8f0_2px,transparent_2px)] [background-size:12px_12px] opacity-70" />
                        <div className="relative w-full max-w-[450px] aspect-[5/4] shadow-2xl overflow-hidden z-10 border border-slate-100" style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}>
                            <img src="/images/hero/vr.png" alt="VR Impact" className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-[2s]" />
                        </div>
                    </div>

                    <div className="lg:col-span-6 space-y-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-0.5 bg-blue-600" />
                                <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Our Impact</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-black text-slate-900 leading-tight tracking-tight">
                                Empowering Today, <br />
                                <span className="text-blue-600">Inspiring Tomorrow</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-3 gap-4 md:gap-6 pt-4">
                            <div className="flex flex-col items-center text-center space-y-3">
                                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-blue-500 bg-white shadow-xl shadow-blue-50 flex flex-col items-center justify-center p-3 relative group hover:scale-105 transition-transform duration-300">
                                    <Building2 size={22} className="text-blue-600 mb-0.5" />
                                    <span className="text-lg md:text-xl font-black text-slate-900 tracking-tight">38</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-[10px] md:text-xs font-extrabold text-slate-800 leading-tight">Districts</span>
                                    <span className="block text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Covered</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center text-center space-y-3">
                                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-orange-400 bg-white shadow-xl shadow-orange-50 flex flex-col items-center justify-center p-3 relative group hover:scale-105 transition-transform duration-300">
                                    <Users size={22} className="text-orange-500 mb-0.5" />
                                    <span className="text-lg md:text-xl font-black text-slate-900 tracking-tight">1L+</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-[10px] md:text-xs font-extrabold text-slate-800 leading-tight">Teachers</span>
                                    <span className="block text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Supported</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center text-center space-y-3">
                                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-purple-500 bg-white shadow-xl shadow-purple-50 flex flex-col items-center justify-center p-3 relative group hover:scale-105 transition-transform duration-300">
                                    <GraduationCap size={22} className="text-purple-600 mb-0.5" />
                                    <span className="text-lg md:text-xl font-black text-slate-900 tracking-tight">10M+</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-[10px] md:text-xs font-extrabold text-slate-800 leading-tight">Learners</span>
                                    <span className="block text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Empowered</span>
                                </div>
                            </div>
                        </div>
                        <div className="pt-6">
                            <Link to="/vr" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-blue-600/30 text-blue-600 font-extrabold rounded-full text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white shadow-lg shadow-blue-100 hover:shadow-xl hover:shadow-blue-200 transition-all duration-300">
                                Explore Our Resources
                                <ChevronRight size={14} className="stroke-[3]" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default VrMission;
