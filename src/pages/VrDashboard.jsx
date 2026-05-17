import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, BookOpen, Flame, Star, 
  Clock, Award, Globe, Landmark, Rocket, Microscope,
  Code, Eye, Compass, Layers, MapPin, Bookmark,
  Palette, GraduationCap, FlaskConical, Trophy
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VrDashboard = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState('Science');

  // Per-topic course data for Continue Learning card
  const topicCourses = {
    'Science': {
      title: 'The Solar System',
      desc: 'Explore planets and beyond',
      image: '/images/vr/v3.png',
      progress: 60,
      timeLeft: '35 min left',
      level: 'Beginner',
    },
    'History': {
      title: 'Ancient Civilizations',
      desc: 'Walk through ancient temples & monuments',
      image: '/images/vr/v1.png',
      progress: 45,
      timeLeft: '50 min left',
      level: 'Intermediate',
    },
    'Geography': {
      title: 'World Landscapes',
      desc: 'Travel across continents & terrains',
      image: '/images/vr/i3.png',
      progress: 30,
      timeLeft: '40 min left',
      level: 'Beginner',
    },
    'Technology': {
      title: 'Inside a Computer',
      desc: 'Explore CPU, RAM & circuits in 3D',
      image: '/images/vr/i2.png',
      progress: 20,
      timeLeft: '55 min left',
      level: 'Advanced',
    },
    'Art & Culture': {
      title: 'Museum Gallery Tour',
      desc: 'Visit world-famous museums in VR',
      image: '/images/vr/i.png',
      progress: 55,
      timeLeft: '25 min left',
      level: 'Beginner',
    },
    'Math': {
      title: '3D Geometry Lab',
      desc: 'Visualize shapes & theorems in VR',
      image: '/images/vr/i4.png',
      progress: 35,
      timeLeft: '45 min left',
      level: 'Intermediate',
    },
  };

  const currentCourse = topicCourses[selectedTopic];

  const quickStats = [
    { label: 'VR Courses', value: 'Curriculum-based', icon: <Rocket className="text-blue-600" />, color: 'bg-blue-50' },
    { label: 'Virtual Labs', value: 'Practice in VR', icon: <FlaskConical className="text-emerald-600" />, color: 'bg-emerald-50' },
    { label: '360° Worlds', value: 'Explore places', icon: <Globe className="text-purple-600" />, color: 'bg-purple-50' },
    { label: 'Create & Learn', value: 'Build & visualize', icon: <Compass className="text-orange-500" />, color: 'bg-orange-50' },
  ];

  const topics = [
    { label: 'Science', sub: '24 Courses', icon: <Microscope size={20} className="text-blue-600" />, bg: 'bg-blue-50' },
    { label: 'History', sub: '18 Courses', icon: <Landmark size={20} className="text-amber-600" />, bg: 'bg-amber-50' },
    { label: 'Geography', sub: '20 Courses', icon: <MapPin size={20} className="text-emerald-600" />, bg: 'bg-emerald-50' },
    { label: 'Technology', sub: '15 Courses', icon: <Layers size={20} className="text-purple-600" />, bg: 'bg-purple-50' },
    { label: 'Art & Culture', sub: '12 Courses', icon: <Palette size={20} className="text-rose-500" />, bg: 'bg-rose-50' },
    { label: 'Math', sub: '14 Courses', icon: <GraduationCap size={20} className="text-sky-600" />, bg: 'bg-sky-50' },
  ];

  const handleTopicSelect = (topicLabel) => {
    setSelectedTopic(topicLabel);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex font-sans text-slate-900 overflow-x-hidden">
      <button
        onClick={() => navigate("/vr")}
        className="fixed top-5 left-5 z-50 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-blue-600 hover:shadow-lg transition-all border border-slate-100 group"
      >
        <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>
      
      {/* Main Content */}
      <main className="flex-1 min-h-screen pb-4 overflow-y-auto">
        <div className="px-6 md:px-12 space-y-8 pt-4">

          {/* Hero & Stats Section */}
          <div className="relative">
            {/* Hero Section */}
            <section className="bg-white rounded-[24px] overflow-hidden relative border border-slate-100 flex items-center min-h-[300px] pb-6">
              <div className="relative z-10 p-8 md:p-10 lg:w-1/2 space-y-4">
                 <h1 className="text-[32px] md:text-[42px] font-extrabold leading-[1.05] tracking-tight text-[#1e293b]">
                    Step into <br /> Imagination. <br />
                    <span className="text-blue-600">Learn in VR.</span>
                 </h1>
                 <p className="text-slate-500 text-[15px] md:text-[16px] font-medium leading-relaxed max-w-sm">
                   Explore, interact and understand difficult concepts through immersive VR experiences.
                 </p>
                 
                 <div className="pt-2">
                   <button 
                     onClick={() => navigate('/ar-courses')}
                     className="px-6 py-3 bg-blue-600 text-white rounded-full font-bold text-[14px] flex items-center gap-2 hover:bg-blue-700 transition-colors w-max shadow-sm shadow-blue-200"
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
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 relative z-20 -mt-8 px-4 md:px-12">
              {quickStats.map((stat, i) => (
                <div 
                  
                  className="bg-white rounded-[16px] p-3 md:p-4 border border-slate-50 shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex items-center gap-3 md:gap-4 hover:shadow-md transition-shadow cursor-pointer group"
                >
                   <div className={`w-[44px] h-[44px] ${stat.color} rounded-[12px] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform [&>svg]:w-5 [&>svg]:h-5`}>
                      {stat.icon}
                   </div>
                   <div>
                      <h4 className="text-[13px] font-bold text-[#1e1b4b] leading-tight ">{stat.label}</h4>
                      <p className="text-[11px] font-medium text-slate-500 mt-0.5">{stat.value}</p>
                   </div>
                </div>
              ))}
            </section>
          </div>

          {/* Explore by Category */}
          <div>
            <div className="flex items-center justify-between px-1 mb-4">
               <h3 className="text-base font-bold text-slate-900">Explore by Category</h3>
               <button onClick={() => navigate('/ar-courses')} className="text-xs font-bold text-blue-600 hover:underline">View all</button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
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
                     <div className="w-[160px] h-[160px] rounded-[16px] shrink-0 relative overflow-hidden shadow-md">
                        <img src={currentCourse.image} alt={currentCourse.title} className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 px-2.5 py-1 bg-purple-600 text-white text-[10px] font-bold rounded-full shadow-sm">In Progress</span>
                     </div>

                     <div className="flex-1 flex flex-col justify-center py-1">
                        <h4 className="text-[17px] font-bold text-slate-900 tracking-tight leading-tight">{currentCourse.title}</h4>
                        <p className="text-xs font-medium text-slate-500 mt-1 mb-3">{currentCourse.desc}</p>

                        {/* Progress */}
                        <div className="flex items-center gap-3 mb-3">
                           <div className="flex-1 h-[5px] bg-slate-100 rounded-full overflow-hidden relative">
                              <motion.div 
                                 key={selectedTopic}
                                 initial={{ width: 0 }}
                                 animate={{ width: `${currentCourse.progress}%` }}
                                 transition={{ duration: 0.6, ease: 'easeOut' }}
                                 className="h-full bg-blue-600 rounded-full" 
                              />
                           </div>
                           <span className="text-xs font-bold text-slate-700 shrink-0">{currentCourse.progress}%</span>
                        </div>

                        {/* Meta Info */}
                        <div className="flex items-center gap-4 mb-4">
                           <span className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                              <Clock size={12} className="text-slate-400" /> {currentCourse.timeLeft}
                           </span>
                           <span className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                              <GraduationCap size={12} className="text-slate-400" /> {currentCourse.level}
                           </span>
                        </div>

                        {/* Resume Button - outlined style */}
                        <button onClick={() => navigate('/ar-courses')} className="px-6 py-2.5 border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white rounded-full font-bold text-xs flex items-center gap-2 transition-all active:scale-95 w-max">
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
                     <div className="w-[140px] h-[160px] rounded-[16px] shrink-0 overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
                        <img src="/images/vr/v2.png" alt="Human Anatomy" className="w-full h-full object-cover  transition-transform duration-500" />
                     </div>

                     <div className="flex-1 flex flex-col justify-center py-1">
                        <h4 className="text-[17px] font-bold text-slate-900 tracking-tight leading-tight">Human Anatomy</h4>
                        <p className="text-xs font-medium text-slate-500 mt-1 mb-2">Understand the human body in 3D</p>
                        <p className="text-[11px] font-bold text-orange-500 flex items-center gap-1.5 mb-5">Popular</p>
                        
                        <button onClick={() => navigate('/ar-courses')} className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold text-xs flex items-center gap-2 shadow-sm transition-all active:scale-95 w-max">
                           Start Learning <ArrowRight size={14} />
                        </button>
                     </div>
                  </div>
               </div>
            </div>

          </div>

        </div>
      </main>

    </div>
  );
};

export default VrDashboard;
