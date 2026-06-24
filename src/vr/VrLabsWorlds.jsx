import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Play, X, Search, Globe, FlaskConical, 
  Sparkles, Video, Clock, Layers, ChevronRight, ArrowRight, BookOpen
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

import { videoItems, vrCourseItems } from '../data/vrData';

const VrLabsWorlds = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSubject = queryParams.get('subject') || 'All Subjects';
  const initialTab = queryParams.get('tab') || 'all';

  const [activeTab, setActiveTab] = useState(initialTab); // 'all', 'labs', 'worlds', 'courses'
  const [activeSubject, setActiveSubject] = useState(initialSubject);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isAnimationDone, setIsAnimationDone] = useState(false);

  useEffect(() => {
    if (!selectedVideo) {
      setIsAnimationDone(false);
    }
  }, [selectedVideo]);

  // Filter items
  const filteredItems = videoItems.filter(item => {
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    const matchesSubject = activeSubject === 'All Subjects' || item.subject === activeSubject;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSubject && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EBF0FF] via-[#F4F6FB] to-white font-sans text-slate-900 overflow-x-hidden relative">
      {/* Back Button */}
      <button
        onClick={() => navigate('/vr-dashboard')}
        className="fixed top-3 left-3 md:top-5 md:left-5 z-50 w-9 h-9 md:w-11 md:h-11 bg-white rounded-full shadow-md flex items-center justify-center text-slate-500 hover:text-blue-600 hover:shadow-lg transition-all border border-slate-100 group"
      >
        <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>

      {/* Hero Section: Full screen size width background header */}
      <header className="relative w-full min-h-[260px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[50px] flex items-center overflow-hidden bg-[#EBF0FF]">
        {/* Background Image filling the entire header */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale:1 }}
            transition={{ duration: 1.0 }}
            src="/images/vr/heaven.png" 
            alt="Immersive World Background" 
            className="w-[120%] h-full object-cover object-right-bottom md:object-right"
          />
          {/* Subtle gradient overlay to fade the image on the left, making text highly readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#EBF0FF] via-transparent to-transparent z-10 md:block hidden" />
          <div className="absolute inset-0 bg-[#EBF0FF]/90 md:hidden block" />
        </div>

        {/* Hero Content centered to page width */}
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-14 md:py-16 lg:py-20 relative z-10 text-left">
          <div className="max-w-2xl space-y-6">
            
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-3xl lg:text-[50px] 2xl:text-[60px] font-extrabold tracking-tight text-[#1E293B] leading-[1.15]"
            >
              Virtual Labs & <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                360° Worlds
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed max-w-lg"
            >
              Dive into practical laboratory setups and wander around magnificent landmarks right from your classroom. Just click any card to start the experience!
            </motion.p>

            {/* Tab buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 md:gap-4 pt-4"
            >
              {[
                { id: 'all', title: 'All Activities', sub: 'Explore everything', icon: <Layers size={20} /> },
                { id: 'labs', title: 'Virtual Labs', sub: 'Hands-on experiments', icon: <FlaskConical size={20} className={activeTab === 'labs' ? 'text-white' : 'text-indigo-600'} /> },
                { id: 'worlds', title: '360° Worlds', sub: 'Immersive explorations', icon: <Globe size={20} className={activeTab === 'worlds' ? 'text-white' : 'text-blue-600'} /> },
                { id: 'courses', title: 'VR Courses', sub: '12-lesson full course', icon: <BookOpen size={20} className={activeTab === 'courses' ? 'text-white' : 'text-emerald-600'} /> },
              ].map(tab => (
                <div
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 py-3 sm:py-4 rounded-[16px] md:rounded-[20px] transition-all cursor-pointer w-full sm:flex-1 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-[#4F46E5] to-[#3B82F6] text-white shadow-lg shadow-blue-500/20 scale-[1.02]'
                      : 'bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-blue-100 hover:shadow-md text-slate-800'
                  }`}
                >
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 ${activeTab === tab.id ? 'bg-white/20' : 'bg-slate-50'}`}>
                    {activeTab === tab.id ? React.cloneElement(tab.icon, { className: 'text-white' }) : tab.icon}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <h4 className={`text-xs sm:text-sm font-bold leading-tight ${activeTab === tab.id ? 'text-white' : 'text-slate-900'}`}>{tab.title}</h4>
                    <p className={`text-[10px] font-medium mt-0.5 truncate ${activeTab === tab.id ? 'text-white/80' : 'text-slate-500'}`}>{tab.sub}</p>
                  </div>
                  <ChevronRight size={14} className={activeTab === tab.id ? 'text-white/70 shrink-0' : 'text-slate-300 shrink-0'} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main content container for the video list and filters */}
      <main className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-3 sm:px-4 md:px-8 lg:px-12 pb-12 md:pb-16 relative z-10 -mt-6 md:-mt-8">
        
        {/* Main Content Container (Neeche Section) */}
        <div className="bg-gradient-to-b from-white to-[#F8FAFC]/80 rounded-[20px] md:rounded-[32px] p-3 sm:p-4 md:p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative z-20">
          
          {/* Filters Row - hidden on VR Courses tab */}
          {activeTab !== 'courses' && (
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            {/* Subject Filter Chips */}
            <div className="flex flex-wrap items-center gap-2">
              {['All Subjects', 'Science', 'History', 'Geography', 'Technology', 'Art & Culture', 'Math'].map(subject => (
                <button
                  key={subject}
                  onClick={() => setActiveSubject(subject)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeSubject === subject 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'bg-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>

            {/* Search bar */}
            <div className="relative w-full lg:w-72 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="text"
                placeholder="Search by topic or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-full bg-slate-50/50 border border-slate-100 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all font-medium text-xs text-slate-800 placeholder-slate-400"
              />
            </div>
          </div>
          )}

          {/* VR Courses Tab Content */}
          {activeTab === 'courses' ? (
            <>
             

              {/* Course Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                <AnimatePresence mode="popLayout">
                  {vrCourseItems.map((item, idx) => (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className="group flex flex-col bg-white border border-slate-100 rounded-[16px] overflow-hidden hover:shadow-xl hover:border-emerald-100 transition-all cursor-pointer"
                      onClick={() => setSelectedVideo({ ...item, category: 'courses', subject: 'VR/AR' })}
                    >
                      {/* Thumbnail */}
                      <div className="relative w-full aspect-video overflow-hidden bg-slate-100">
                        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        
                        {/* Lesson number badge */}
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-extrabold shadow-sm uppercase tracking-widest text-white bg-emerald-600">
                          LESSON {item.lesson}
                        </span>

                        {/* Play overlay */}
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 flex items-center justify-center transition-all duration-300">
                          <div className="w-10 h-10 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                            <Play size={20} className="ml-1 fill-current" />
                          </div>
                        </div>

                        {/* Duration */}
                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                            <Clock size={10} /> {item.duration}
                          </span>
                        </div>
                      </div>

                      {/* Card Details */}
                      <div className="p-3 flex flex-col flex-1">
                        <div className="mb-2">
                          <span className="text-[9px] font-bold text-emerald-600 px-2 py-1 rounded-md bg-emerald-50 tracking-wider uppercase">
                            VR/AR Course
                          </span>
                        </div>
                        <h3 className="font-bold text-[#1E293B] text-sm leading-tight mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-slate-500 text-[11px] font-medium leading-relaxed line-clamp-2 mb-4 flex-1">
                          {item.desc}
                        </p>
                        <div className="mt-auto pt-3 border-t border-slate-50 flex items-center justify-between">
                          <div className="text-[10px] font-bold text-slate-400">
                            Level: <span className="text-emerald-600">{item.difficulty}</span>
                          </div>
                          <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            Watch <ArrowRight size={12} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              {/* Video Cards Grid View */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((item, idx) => (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className="group flex flex-col bg-white border border-slate-100 rounded-[16px] overflow-hidden hover:shadow-xl hover:border-blue-100 transition-all cursor-pointer"
                      onClick={() => setSelectedVideo(item)}
                    >
                      {/* Top Side: Thumbnail container */}
                      <div className="relative w-full aspect-video overflow-hidden bg-slate-100">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Category overlay badge */}
                        <span className={`absolute top-3 left-3 px-2 py-1 rounded-full text-[9px] font-extrabold shadow-sm uppercase tracking-widest text-white ${
                          item.category === 'labs' ? 'bg-blue-600' : 'bg-purple-600'
                        }`}>
                          {item.category === 'labs' ? 'VIRTUAL LAB' : '360° WORLD'}
                        </span>

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 flex items-center justify-center transition-all duration-300">
                          <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                            <Play size={20} className="ml-1 fill-current" />
                          </div>
                        </div>

                        {/* Bottom badges */}
                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                            <Clock size={10} /> {item.duration}
                          </span>
                        </div>
                      </div>

                      {/* Bottom Side: Card Details */}
                      <div className="p-3 flex flex-col flex-1">
                        <div className="mb-2">
                          <span className="text-[9px] font-bold text-blue-600 px-2 py-1 rounded-md bg-blue-50 tracking-wider uppercase">
                            {item.subject}
                          </span>
                        </div>

                        <h3 className="font-bold text-[#1E293B] text-sm leading-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {item.title}
                        </h3>

                        <p className="text-slate-500 text-[11px] font-medium leading-relaxed line-clamp-2 mb-4 flex-1">
                          {item.desc}
                        </p>

                        <div className="mt-auto pt-3 border-t border-slate-50 flex items-center justify-between">
                          <div className="text-[10px] font-bold text-slate-400">
                            Level: <span className="text-blue-600">{item.difficulty}</span>
                          </div>
                          
                          <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            Launch <ArrowRight size={12} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Empty state when no search result */}
              {filteredItems.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
                    <Search size={20} />
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900">No Experiences Found</h3>
                  <p className="text-slate-500 text-xs font-medium mt-1 max-w-[240px] mx-auto">
                    We couldn't find anything matching your search. Try adjusting your filters or query!
                  </p>
                </motion.div>
              )}
            </>
          )}

        </div>
      </main>

      {/* Beautiful Modal for Video Playback */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onAnimationComplete={() => setIsAnimationDone(true)}
              className="bg-white rounded-[24px] overflow-hidden shadow-2xl w-full max-w-2xl border border-slate-100 relative max-h-[90vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 rounded-full flex items-center justify-center shadow transition-colors cursor-pointer"
              >
                <X size={18} strokeWidth={2.5} />
              </button>

              {/* YouTube Video Embed Container */}
              <div className="aspect-video w-full bg-black shrink-0 relative flex items-center justify-center overflow-hidden">
                {isAnimationDone ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                    title={selectedVideo.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950">
                    {selectedVideo.thumbnail && (
                      <img 
                        src={selectedVideo.thumbnail} 
                        alt="" 
                        className="absolute inset-0 w-full h-full object-cover opacity-40 blur-[2px]"
                      />
                    )}
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-blue-500 animate-spin" />
                      <span className="text-white text-xs font-semibold tracking-wider uppercase opacity-80 animate-pulse">
                        Loading Experience...
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Details in Modal */}
              <div className="p-5 md:p-6 space-y-3 overflow-y-auto">
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                    selectedVideo.category === 'labs' 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500' 
                      : selectedVideo.category === 'courses'
                        ? 'bg-gradient-to-r from-emerald-500 to-green-500'
                        : 'bg-gradient-to-r from-purple-500 to-indigo-500'
                  }`}>
                    {selectedVideo.category === 'labs' ? 'Virtual Lab' : selectedVideo.category === 'courses' ? 'VR Course' : '360° World'}
                  </span>
                  <span className="text-xs font-bold text-blue-600 px-2.5 py-0.5 rounded-md bg-blue-50">
                    {selectedVideo.subject}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-bold text-slate-400 ml-auto">
                    <Clock size={13} /> {selectedVideo.duration}
                  </span>
                </div>

                <h2 className="text-lg md:text-xl font-extrabold text-[#1E293B]">
                  {selectedVideo.title}
                </h2>
                <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed">
                  {selectedVideo.desc}
                </p>

                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] md:text-xs font-bold text-slate-500 gap-4">
                  <div className="flex gap-4">
                    <span>Difficulty: <span className="text-slate-800">{selectedVideo.difficulty}</span></span>
                    <span>Platform: <span className="text-slate-800">YouTube VR</span></span>
                  </div>
                  <button 
                    onClick={() => setSelectedVideo(null)}
                    className="px-4 py-2 bg-slate-900 text-white rounded-full font-bold hover:bg-blue-600 transition-colors"
                  >
                    Done Exploring
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VrLabsWorlds;

