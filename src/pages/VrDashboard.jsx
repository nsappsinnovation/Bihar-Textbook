import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, BookOpen, Flame, Star, 
  Clock, Award, Globe, Landmark, Rocket, Microscope,
  Code, Eye, Compass, Layers, MapPin, Bookmark,
  Palette, GraduationCap, FlaskConical, Trophy, X, Play
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { videoItems } from '../data/vrData';

const VrDashboard = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState('Science');
  const [activeVideo, setActiveVideo] = useState(null);

  // Per-topic course data for Continue Learning card
  const topicCourses = {
    'Science': {
      title: 'The Solar System',
      desc: 'Explore planets and beyond',
      image: '/images/vr/v3.png',
      progress: 60,
      timeLeft: '35 min left',
      level: 'Beginner',
      youtubeId: 'PsSvqvK_3Zo',
    },
    'History': {
      title: 'Ancient Civilizations',
      desc: 'Walk through ancient temples & monuments',
      image: '/images/vr/v1.png',
      progress: 45,
      timeLeft: '50 min left',
      level: 'Intermediate',
      youtubeId: 'sPyAQQkMc1s',
    },
    'Geography': {
      title: 'World Landscapes',
      desc: 'Travel across continents & terrains',
      image: '/images/vr/i3.png',
      progress: 30,
      timeLeft: '40 min left',
      level: 'Beginner',
      youtubeId: '2OzlSjhW8qo',
    },
    'Technology': {
      title: 'Inside a Computer',
      desc: 'Explore CPU, RAM & circuits in 3D',
      image: '/images/vr/i2.png',
      progress: 20,
      timeLeft: '55 min left',
      level: 'Advanced',
      youtubeId: 'aF0dY20qgOM',
    },
    'Art & Culture': {
      title: 'Museum Gallery Tour',
      desc: 'Visit world-famous museums in VR',
      image: '/images/vr/i.png',
      progress: 55,
      timeLeft: '25 min left',
      level: 'Beginner',
      youtubeId: 'IOVMgEWY7og',
    },
    'Math': {
      title: '3D Geometry Lab',
      desc: 'Visualize shapes & theorems in VR',
      image: '/images/vr/i4.png',
      progress: 35,
      timeLeft: '45 min left',
      level: 'Intermediate',
      youtubeId: 'G0TfT21YmLY',
    },
  };

  const currentCourse = topicCourses[selectedTopic];

  const quickStats = [
    { label: 'VR Courses', value: 'Curriculum-based', icon: <Rocket className="text-blue-600" />, color: 'bg-blue-50', path: '/vr-labs-worlds?tab=courses' },
    { label: 'Virtual Labs', value: 'Practice in VR', icon: <FlaskConical className="text-emerald-600" />, color: 'bg-emerald-50', path: '/vr-labs-worlds' },
    { label: '360° Worlds', value: 'Explore places', icon: <Globe className="text-purple-600" />, color: 'bg-purple-50', path: '/vr-labs-worlds' },
  ];

  const getSubjectCountText = (subject) => {
    const count = videoItems.filter(item => item.subject === subject).length;
    return `${count} ${count === 1 ? 'Experience' : 'Experiences'}`;
  };

  const topics = [
    { label: 'Science', sub: getSubjectCountText('Science'), icon: <Microscope size={20} className="text-blue-600" />, bg: 'bg-blue-50' },
    { label: 'History', sub: getSubjectCountText('History'), icon: <Landmark size={20} className="text-amber-600" />, bg: 'bg-amber-50' },
    { label: 'Geography', sub: getSubjectCountText('Geography'), icon: <MapPin size={20} className="text-emerald-600" />, bg: 'bg-emerald-50' },
    { label: 'Technology', sub: getSubjectCountText('Technology'), icon: <Layers size={20} className="text-purple-600" />, bg: 'bg-purple-50' },
    { label: 'Art & Culture', sub: getSubjectCountText('Art & Culture'), icon: <Palette size={20} className="text-rose-500" />, bg: 'bg-rose-50' },
    { label: 'Math', sub: getSubjectCountText('Math'), icon: <GraduationCap size={20} className="text-sky-600" />, bg: 'bg-sky-50' },
  ];

  const handleTopicSelect = (topicLabel) => {
    setSelectedTopic(topicLabel);
    navigate(`/vr-labs-worlds?subject=${encodeURIComponent(topicLabel)}`);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex font-sans text-slate-900 overflow-x-hidden ">
      <button
        onClick={() => navigate("/vr")}
        className="fixed top-3 left-3 md:top-5 md:left-5 z-50 w-9 h-9 md:w-10 md:h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-blue-600 hover:shadow-lg transition-all border border-slate-100 group"
      >
        <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>
      
      {/* Main Content */}
      <main className="flex-1 min-h-screen pb-4 overflow-y-auto">
        <div className="px-4 sm:px-6 md:px-12 2xl:px-20 space-y-6 md:space-y-8 pt-4 2xl:max-w-[1600px] 2xl:mx-auto">

          {/* Hero & Stats Section */}
          <div className="relative">
            {/* Hero Section */}
            <section className="bg-white rounded-[16px] md:rounded-[24px] overflow-hidden relative border border-slate-100 flex items-center min-h-[200px] sm:min-h-[260px] md:min-h-[300px] 2xl:min-h-[380px] pb-4 md:pb-6">
              <div className="relative z-10 p-5 sm:p-8 md:p-10 lg:w-1/2 space-y-3 md:space-y-4">
                 <h1 className="text-[24px] sm:text-[28px] md:text-[36px] lg:text-[42px] 2xl:text-[52px] font-extrabold leading-[1.05] tracking-tight text-[#1e293b]">
                    Step into <br /> Imagination. <br />
                    <span className="text-blue-600">Learn in VR.</span>
                 </h1>
                 <p className="text-slate-500 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-medium leading-relaxed max-w-sm">
                   Explore, interact and understand difficult concepts through immersive VR experiences.
                 </p>
                 
                 <div className="pt-2">
                   <button 
                     onClick={() => navigate('/vr-labs-worlds?tab=courses')}
                      className="px-5 py-2.5 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-full font-bold text-[12px] sm:text-[14px] flex items-center gap-2 hover:bg-blue-700 transition-colors w-max shadow-sm shadow-blue-200"
                   >
                     Explore Now <ArrowRight size={16} />
                   </button>
                 </div>
              </div>

              <div className="hidden lg:block absolute top-0 right-0 w-[55%] h-full">
                 <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
                 <img src="/images/vr/rhs.png" alt="VR Learning" className="w-full h-full object-cover object-right-top" />
                 
              </div>
            </section>

            {/* Quick Stats Row */}
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6 relative z-20 -mt-6 md:-mt-8 px-3 sm:px-4 md:px-12">
              {quickStats.map((stat, i) => (
                <div 
                  key={i}
                  onClick={() => navigate(stat.path)}
                  className="bg-white rounded-[16px] p-4 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex items-center gap-4 hover:shadow-lg hover:border-blue-100 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
                >
                   <div className={`w-[48px] h-[48px] ${stat.color} rounded-[12px] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform [&>svg]:w-5 [&>svg]:h-5`}>
                      {stat.icon}
                   </div>
                   <div>
                      <h4 className="text-[14px] font-extrabold text-[#1E293B] leading-tight transition-colors group-hover:text-blue-600">{stat.label}</h4>
                      <p className="text-[11px] font-medium text-slate-400 mt-0.5">{stat.value}</p>
                   </div>
                </div>
              ))}
            </section>
          </div>

          {/* Explore by Category */}
          <div>
            <div className="flex items-center justify-between px-1 mb-4">
               <h3 className="text-base font-bold text-slate-900">Explore by Category</h3>
               <button onClick={() => navigate('/vr-labs-worlds?tab=courses')} className="text-xs font-bold text-blue-600 hover:underline">View all</button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
               {topics.map((topic, i) => (
                 <div 
                   key={i} 
                   onClick={() => handleTopicSelect(topic.label)}
                   className={`rounded-[20px] p-4 border shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center gap-3.5 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group ${
                     selectedTopic === topic.label 
                       ? 'bg-blue-50 border-blue-200 shadow-md' 
                       : 'bg-white border-slate-100'
                   }`}
                 >
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${topic.bg} group-hover:scale-110 transition-transform shadow-sm`}>
                       {topic.icon}
                    </div>
                    <div>
                       <h4 className={`text-xs font-bold leading-tight transition-colors ${
                         selectedTopic === topic.label ? 'text-blue-600' : 'text-slate-800 group-hover:text-blue-600'
                       }`}>{topic.label}</h4>
                       <p className="text-[11px] font-medium text-slate-500 mt-0.5">{topic.sub}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Middle Split Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
            
            {/* Continue Learning */}
            <div className="lg:col-span-7 flex flex-col">
               <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col flex-1">
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Continue Learning</h3>
                    <button onClick={() => navigate('/ar-courses')} className="text-xs font-bold text-blue-600 hover:underline">See all</button>
                  </div>
                  
                  {/* Card Body */}
                  <div className="flex flex-col sm:flex-row items-stretch gap-5 flex-1">
                     {/* Image with badge */}
                      <div className="w-full sm:w-[140px] md:w-[160px] h-[180px] sm:h-[140px] md:h-[160px] rounded-[16px] shrink-0 relative overflow-hidden shadow-md">
                        <img src={currentCourse.image} alt={currentCourse.title} className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 px-2.5 py-1 bg-purple-600 text-white text-[10px] font-bold rounded-full shadow-sm">In Progress</span>
                     </div>

                     <div className="flex-1 flex flex-col justify-center py-1">
                        <h4 className="text-[17px] font-bold text-slate-900 tracking-tight leading-tight">{currentCourse.title}</h4>
                        <p className="text-xs font-medium text-slate-500 mt-1 mb-3">{currentCourse.desc}</p>



                        {/* Meta Info */}
                        <div className="flex items-center gap-4 mb-4">
                           <span className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                              <GraduationCap size={12} className="text-slate-400" /> {currentCourse.level}
                           </span>
                        </div>

                        {/* Resume Button - outlined style */}
                        <button 
                           onClick={() => setActiveVideo({ title: currentCourse.title, youtubeId: currentCourse.youtubeId })} 
                           className="px-6 py-2.5 border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white rounded-full font-bold text-xs flex items-center gap-2 transition-all active:scale-95 w-max"
                        >
                           Resume <ArrowRight size={14} />
                        </button>
                     </div>
                  </div>
               </div>
            </div>

            {/* Recommended for You */}
            <div className="lg:col-span-5 flex flex-col">
               <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] relative overflow-hidden flex flex-col flex-1 group">
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Recommended for You</h3>
                    <button onClick={() => navigate('/ar-courses')} className="text-xs font-bold text-blue-600 hover:underline">See all</button>
                  </div>
                  
                  {/* Card Body */}
                  <div className="flex flex-col sm:flex-row items-stretch gap-5 flex-1">
                      <div className="w-full sm:w-[130px] md:w-[140px] h-[180px] sm:h-[140px] md:h-[160px] rounded-[16px] shrink-0 overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
                        <img src="/images/vr/v2.png" alt="Human Anatomy" className="w-full h-full object-cover  transition-transform duration-500" />
                     </div>

                     <div className="flex-1 flex flex-col justify-center py-1">
                        <h4 className="text-[17px] font-bold text-slate-900 tracking-tight leading-tight">Human Anatomy</h4>
                        <p className="text-xs font-medium text-slate-500 mt-1 mb-2">Understand the human body in 3D</p>
                        <p className="text-[11px] font-bold text-orange-500 flex items-center gap-1.5 mb-5">Popular</p>
                        
                        <button 
                           onClick={() => setActiveVideo({ title: 'Human Anatomy', youtubeId: 'kw9EJbezlK4' })} 
                           className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold text-xs flex items-center gap-2 shadow-sm transition-all active:scale-95 w-max"
                        >
                           Start Learning <ArrowRight size={14} />
                        </button>
                     </div>
                  </div>
               </div>
            </div>

          </div>

        </div>
      </main>

      {/* Video Overlay Modal */}
      <AnimatePresence>
        {activeVideo && (
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
              className="bg-white rounded-[24px] overflow-hidden shadow-2xl w-full max-w-2xl border border-slate-100 relative max-h-[90vh] flex flex-col"
            >
               {/* Close Button */}
               <button
                 onClick={() => setActiveVideo(null)}
                 className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 rounded-full flex items-center justify-center shadow transition-colors cursor-pointer"
               >
                 <X size={18} strokeWidth={2.5} />
               </button>

               {/* YouTube Video Embed */}
               <div className="aspect-video w-full bg-black shrink-0">
                 <iframe
                   src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                   title={activeVideo.title}
                   className="w-full h-full"
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                   allowFullScreen
                 />
               </div>

               {/* Details in Modal */}
               <div className="p-5 md:p-6 space-y-3 overflow-y-auto">
                 <div className="flex items-center gap-3">
                   <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500">
                     VR Immersive Lesson
                   </span>
                   <span className="text-xs font-bold text-blue-600 px-2.5 py-0.5 rounded-md bg-blue-50">
                     Topic: {selectedTopic}
                   </span>
                 </div>

                 <h2 className="text-lg md:text-xl font-extrabold text-[#1E293B]">
                   {activeVideo.title}
                 </h2>
                 <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed">
                   Experience this educational topic in complete 3D immersive video standard. Perfect for visual learning.
                 </p>

                 <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] md:text-xs font-bold text-slate-500">
                   <span>Category: <span className="text-slate-800">VR Course</span></span>
                   <button 
                     onClick={() => setActiveVideo(null)}
                     className="px-4 py-2 bg-slate-900 text-white rounded-full font-bold hover:bg-blue-600 transition-colors"
                   >
                     Done Learning
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

export default VrDashboard;
