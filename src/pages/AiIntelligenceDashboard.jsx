import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, BookOpen, Flame, Star, 
  Clock, Award, Brain, Lightbulb, FlaskConical, Cpu, Trophy, 
  Code, Eye, BarChart3, MessageSquare, ChevronDown, Bookmark, 
  Heart, Settings, User, FolderGit2, Wrench, CheckCircle2, Home,
  FileCode2, Compass
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AiIntelligenceDashboard = () => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState('Create with AI');

  // Per-topic course data for Continue Learning card
  const topicCourses = {
    'Create with AI': {
      title: 'Create with AI',
      desc: 'Write your own stories, design cartoons, create comics and build presentations — all with just one click!',
      icon: <Brain size={64} className="text-blue-400 z-20" />,
      cardBg: 'bg-slate-900',
      gradientFrom: 'from-blue-900/40',
      gradientTo: 'to-indigo-900/40',
      progress: 65,
      accentColor: 'bg-blue-600 hover:bg-blue-700',
    },
    'Meet AI Robots': {
      title: 'Meet AI Robots',
      desc: 'Discover how robots think, make decisions and learn on their own — just like a smart student!',
      icon: <Cpu size={64} className="text-purple-400 z-20" />,
      cardBg: 'bg-purple-950',
      gradientFrom: 'from-purple-900/40',
      gradientTo: 'to-fuchsia-900/40',
      progress: 40,
      accentColor: 'bg-purple-600 hover:bg-purple-700',
    },
    'Chat with AI': {
      title: 'Chat with AI',
      desc: 'Build your own chatbot that can answer questions — learn to talk with AI and make it smarter!',
      icon: <MessageSquare size={64} className="text-emerald-400 z-20" />,
      cardBg: 'bg-emerald-950',
      gradientFrom: 'from-emerald-900/40',
      gradientTo: 'to-teal-900/40',
      progress: 25,
      accentColor: 'bg-emerald-600 hover:bg-emerald-700',
    },
    'AI Vision Lab': {
      title: 'AI Vision Lab',
      desc: 'Give AI eyes! Learn how computers can recognize things in photos — like traffic signs, animals and classroom items!',
      icon: <Eye size={64} className="text-sky-400 z-20" />,
      cardBg: 'bg-sky-950',
      gradientFrom: 'from-sky-900/40',
      gradientTo: 'to-blue-900/40',
      progress: 15,
      accentColor: 'bg-sky-600 hover:bg-sky-700',
    },
    'Fun with Data': {
      title: 'Fun with Data',
      desc: 'Numbers hide magic inside! Build graphs, find patterns and predict how many marks you will score in your next exam!',
      icon: <BarChart3 size={64} className="text-indigo-400 z-20" />,
      cardBg: 'bg-indigo-950',
      gradientFrom: 'from-indigo-900/40',
      gradientTo: 'to-violet-900/40',
      progress: 50,
      accentColor: 'bg-indigo-600 hover:bg-indigo-700',
    },
  };

  const currentCourse = topicCourses[selectedTopic];

  const quickStats = [
    { label: 'Learn Concepts', value: 'Step by step', icon: <Lightbulb className="text-blue-600" />, color: 'bg-blue-50', path: '/ai-courses', state: { activeSection: 'learn' } },
    { label: 'Practice & Build', value: 'With projects', icon: <FlaskConical className="text-emerald-600" />, color: 'bg-emerald-50', path: '/ai-courses', state: { activeSection: 'practice' } },
    { label: 'Explore Tools', value: 'AI powered', icon: <Cpu className="text-purple-600" />, color: 'bg-purple-50', path: '/explore-ai-tools' },
    { label: 'Take Challenges', value: 'Test skills', icon: <Trophy className="text-orange-500" />, color: 'bg-orange-50', path: '/ai-quiz-challenge', state: { activeTab: 'quiz' } },
  ];

  const topics = [
    { label: 'Create with AI', sub: 'Make art, stories, comics and more', icon: <Brain size={20} className="text-blue-600" />, bg: 'bg-blue-50' },
    { label: 'Meet AI Robots', sub: 'Learn how robots think and learn', icon: <Cpu size={20} className="text-purple-600" />, bg: 'bg-purple-50' },
    { label: 'Chat with AI', sub: 'Build chatbots and talk with AI', icon: <MessageSquare size={20} className="text-emerald-600" />, bg: 'bg-emerald-50' },
    { label: 'AI Vision Lab', sub: 'Explore AI that sees the world', icon: <Eye size={20} className="text-blue-500" />, bg: 'bg-blue-50' },
    { label: 'Fun with Data', sub: 'Make graphs, predictions and discover patterns', icon: <BarChart3 size={20} className="text-indigo-600" />, bg: 'bg-indigo-50' },
  ];

  const handleTopicSelect = (topicLabel) => {
    setSelectedTopic(topicLabel);
    setIsBookmarked(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex font-sans text-slate-900 overflow-x-hidden">
      <button
              onClick={() => navigate("/ai-intelligence")}
              className="fixed top-3 left-3 md:top-5 md:left-5 z-50 w-9 h-9 md:w-10 md:h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-green-600 hover:shadow-lg transition-all border border-slate-100 group"
            >
              <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
      
      {/* Main Content */}
      <main className="flex-1 min-h-screen pb-4 overflow-y-auto">
        <div className="px-4 sm:px-6 md:px-12 2xl:px-20 space-y-6 md:space-y-8 pt-4 2xl:max-w-[1600px] 2xl:mx-auto">

          {/* Hero & Stats Section */}
          <div className="relative">
            {/* Hero Section - AudioLibrary style */}
            <section className="bg-white rounded-[16px] md:rounded-[24px] overflow-hidden relative border border-slate-100 flex items-center min-h-[200px] sm:min-h-[260px] md:min-h-[300px] 2xl:min-h-[380px] pb-4 md:pb-6">
              <div className="relative z-10 p-5 sm:p-8 md:p-10 lg:w-1/2 space-y-3 md:space-y-4">
                 <h1 className="text-[22px] sm:text-[28px] md:text-[36px] lg:text-[42px] 2xl:text-[52px] font-extrabold leading-[1.05] tracking-tight text-[#1e293b]">
                    Build. Learn. &amp; <br /> Think Smarter with <br />
                    <span className="text-purple-600">AI Intelligence</span>
                 </h1>
                 <p className="text-slate-500 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-medium leading-relaxed max-w-sm">
                   Your AI-powered learning hub for skills and knowledge.
                 </p>
                 
                 <div className="pt-2">
                   <button 
                     onClick={() => navigate('/ai-courses')}
                      className="px-5 py-2.5 sm:px-6 sm:py-3 bg-purple-600 text-white rounded-full font-bold text-[12px] sm:text-[14px] flex items-center gap-2 hover:bg-purple-700 transition-colors w-max shadow-sm shadow-purple-200"
                   >
                     Start Learning <ArrowRight size={16} />
                   </button>
                 </div>
              </div>

              <div className="hidden lg:block absolute top-0 right-0 w-[55%] h-full">
                 <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
                 <img src="/images/ai/rhs.png" alt="AI Intelligence" className="w-full h-full object-cover object-right-top" />
                 
              </div>
            </section>

            {/* Quick Stats Row — overlapping hero with negative margin */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 relative z-20 -mt-8 px-4 md:px-12">
              {quickStats.map((stat, i) => (
                <div 
                  key={i} 
                  onClick={() => navigate(stat.path, { state: stat.state })}
                  className="bg-white rounded-[16px] p-3 md:p-4 border border-slate-50 shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex items-center gap-3 md:gap-4 hover:shadow-md transition-shadow cursor-pointer group"
                >
                   <div className={`w-[44px] h-[44px] ${stat.color} rounded-[12px] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform [&>svg]:w-5 [&>svg]:h-5`}>
                      {stat.icon}
                   </div>
                   <div>
                      <h4 className="text-[13px] font-bold text-[#1e1b4b] leading-tight group-hover:text-purple-600 transition-colors">{stat.label}</h4>
                      <p className="text-[11px] font-medium text-slate-500 mt-0.5">{stat.value}</p>
                   </div>
                </div>
              ))}
            </section>
          </div>

          {/* Explore Topics Row */}
          <div>
            <div className="flex items-center justify-between px-1 mb-4">
               <h3 className="text-base font-bold text-slate-900">Explore Topics</h3>
               <button onClick={() => navigate('/ai-courses')} className="text-xs font-bold text-purple-600 hover:underline">View all</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
               {topics.map((topic, i) => (
                 <div 
                   key={i} 
                   onClick={() => handleTopicSelect(topic.label)}
                   className={`rounded-[20px] p-4 border shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center gap-3.5 hover:border-purple-200 hover:shadow-md transition-all cursor-pointer group ${
                     selectedTopic === topic.label 
                       ? 'bg-purple-50 border-purple-200 shadow-md' 
                       : 'bg-white border-slate-100'
                   }`}
                 >
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${topic.bg} group-hover:scale-110 transition-transform shadow-sm`}>
                       {topic.icon}
                    </div>
                    <div>
                       <h4 className={`text-xs font-bold leading-tight transition-colors ${
                         selectedTopic === topic.label ? 'text-purple-600' : 'text-slate-800 group-hover:text-purple-600'
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
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-50">
                    <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Continue Learning</h3>
                    <button onClick={() => navigate('/ai-courses')} className="text-xs font-bold text-purple-600 hover:underline flex items-center gap-1">See all <ArrowRight size={12} /></button>
                  </div>
                  
                  {/* Card Body — dynamically updates based on selected topic */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-6 flex-1">
                     <div className={`w-32 h-32 rounded-[20px] ${currentCourse.cardBg} flex items-center justify-center shrink-0 relative overflow-hidden shadow-md group/cover transition-colors duration-300`}>
                        <div className={`absolute inset-0 bg-gradient-to-tr ${currentCourse.gradientFrom} ${currentCourse.gradientTo} z-10`} />
                        {currentCourse.icon}
                     </div>

                     <div className="flex-1 flex flex-col justify-center py-1 w-full sm:w-auto">
                        <div>
                           <p className="text-[11px] font-bold text-purple-600 uppercase tracking-wider mb-1">{selectedTopic}</p>
                           <h4 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">{currentCourse.title}</h4>
                           <p className="text-xs font-medium text-slate-500 mt-1 mb-4">{currentCourse.desc}</p>
                        </div>

                        {/* Progress */}
                        <div className="flex items-center gap-3 mb-5">
                           <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
                              <motion.div 
                                 key={selectedTopic}
                                 initial={{ width: 0 }}
                                 animate={{ width: `${currentCourse.progress}%` }}
                                 transition={{ duration: 0.6, ease: 'easeOut' }}
                                 className="h-full bg-purple-600 rounded-full" 
                              />
                           </div>
                           <span className="text-xs font-bold text-slate-700 shrink-0">{currentCourse.progress}%</span>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-3 mt-auto">
                           <button 
                             onClick={() => {
                               const topicIdMap = {
                                 'Create with AI': 'ml',
                                 'Meet AI Robots': 'dl',
                                 'Chat with AI': 'nlp',
                                 'AI Vision Lab': 'cv',
                                 'Fun with Data': 'ds'
                               };
                               navigate('/ai-courses', { state: { topicId: topicIdMap[selectedTopic] } });
                             }} 
                             className={`px-6 py-2.5 ${currentCourse.accentColor} text-white rounded-full font-bold text-xs flex items-center gap-2 shadow-sm transition-all active:scale-95`}
                           >
                              Continue <ArrowRight size={14} />
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Today's Challenge */}
            <div className="lg:col-span-5 flex flex-col">
               <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] relative overflow-hidden flex flex-col flex-1 group">
                  <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 shadow-sm">
                     <Star size={16} className="fill-amber-500" />
                  </div>

                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-50">
                    <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Today's Challenge</h3>
                  </div>
                  
                  {/* Card Body */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 flex-1">
                     <div className="w-24 h-24 rounded-[20px] bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-100/60 group-hover:scale-105 transition-transform shadow-sm">
                        <Code size={40} strokeWidth={2.5} />
                     </div>

                     <div className="flex-1 flex flex-col justify-center text-center sm:text-left py-1">
                        <h4 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">AI Quiz Challenge</h4>
                        <p className="text-xs font-medium text-slate-500 mt-1 mb-6">Test your understanding with a quick quiz.</p>
                        
                        <button onClick={() => navigate('/ai-quiz-challenge')} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold text-xs flex items-center justify-center sm:justify-start gap-2 shadow-sm transition-all active:scale-95 w-max mx-auto sm:mx-0">
                           Start Challenge <ArrowRight size={14} />
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

export default AiIntelligenceDashboard;
