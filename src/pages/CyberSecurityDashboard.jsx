import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, BookOpen, Flame, Star, 
  Clock, Award, Lock, Shield, Eye, ShieldCheck,
  Code, Compass, Layers, Bookmark,
  Palette, GraduationCap, FlaskConical, Trophy, Zap, AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CyberSecurityDashboard = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState('Phishing');

  // Per-topic course data for Continue Learning card
  const topicCourses = {
    'Phishing': {
      title: 'Spotting Fake Links',
      desc: 'Learn to identify phishing emails and malicious URLs.',
      image: '/images/skills/c2.png',
      progress: 70,
      timeLeft: '20 min left',
      level: 'Beginner',
    },
    'Passwords': {
      title: 'Strong Password Habits',
      desc: 'Master password managers and complex password creation.',
      image: '/images/skills/cybert.png',
      progress: 45,
      timeLeft: '30 min left',
      level: 'Beginner',
    },
    'Device Security': {
      title: 'Malware Protection',
      desc: 'Keep your devices safe from viruses and ransomware.',
      image: '/images/skills/c5.png',
      progress: 30,
      timeLeft: '40 min left',
      level: 'Intermediate',
    },
    'Account Safety': {
      title: 'Enabling 2FA',
      desc: 'Learn why Two-Factor Authentication is your best defense.',
      image: '/images/skills/c4.png',
      progress: 85,
      timeLeft: '10 min left',
      level: 'Beginner',
    },
    'Deepfakes': {
      title: 'AI & Photo Safety',
      desc: 'Recognize AI-generated images and deepfakes.',
      image: '/images/skills/deep.png',
      progress: 15,
      timeLeft: '50 min left',
      level: 'Advanced',
    },
  };

  const currentCourse = topicCourses[selectedTopic];

  const quickStats = [
    { label: 'Core Modules', value: 'Step-by-step', icon: <Shield className="text-emerald-600" />, color: 'bg-emerald-50' },
    { label: 'Practice Labs', value: 'Simulated attacks', icon: <FlaskConical className="text-emerald-600" />, color: 'bg-emerald-50' },
    { label: 'Knowledge Base', value: 'Glossary & Tips', icon: <BookOpen className="text-purple-600" />, color: 'bg-purple-50' },
    { label: 'Skill Assessment', value: 'Quizzes & Badges', icon: <Trophy className="text-orange-500" />, color: 'bg-orange-50' },
  ];

  const topics = [
    { label: 'Phishing', sub: 'Scam Detection', icon: <AlertTriangle size={20} className="text-emerald-600" />, bg: 'bg-emerald-50' },
    { label: 'Passwords', sub: 'Access Control', icon: <Lock size={20} className="text-amber-600" />, bg: 'bg-amber-50' },
    { label: 'Device Security', sub: 'Malware Defense', icon: <ShieldCheck size={20} className="text-emerald-600" />, bg: 'bg-emerald-50' },
    { label: 'Account Safety', sub: '2FA & Privacy', icon: <Shield size={20} className="text-purple-600" />, bg: 'bg-purple-50' },
    { label: 'Deepfakes', sub: 'AI Verification', icon: <Eye size={20} className="text-rose-500" />, bg: 'bg-rose-50' },
  ];

  const handleTopicSelect = (topicLabel) => {
    setSelectedTopic(topicLabel);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex font-sans text-slate-900 overflow-x-hidden">
      <button
        onClick={() => navigate("/cyber-security")}
        className="fixed top-5 left-5 z-50 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:shadow-lg transition-all border border-slate-100 group"
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
                    Stay Safe <br /> In The Digital <br />
                    <span className="text-emerald-600">World.</span>
                 </h1>
                 <p className="text-slate-500 text-[15px] md:text-[16px] font-medium leading-relaxed max-w-sm">
                   Learn to protect yourself from phishing, malware, and online scams.
                 </p>
                 
                 <div className="pt-2">
                   <button 
                     onClick={() => navigate('/cyber-security')}
                     className="px-6 py-3 bg-emerald-600 text-white rounded-full font-bold text-[14px] flex items-center gap-2 hover:bg-emerald-700 transition-colors w-max shadow-sm shadow-emerald-200"
                   >
                     Start Learning <ArrowRight size={16} />
                   </button>
                 </div>
              </div>

              <div className="hidden lg:block absolute top-0 right-0 w-[55%] h-full">
                 <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/40 to-transparent z-10" />
                 <img src="/images/cybersecurity/rhs.png" alt="Cyber Security" className="w-full h-full object-cover object-right-top" />
              </div>
            </section>

            {/* Quick Stats Row */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 relative z-20 -mt-8 px-4 md:px-12">
              {quickStats.map((stat, i) => (
                <div 
                  key={i} 
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
               <h3 className="text-base font-bold text-slate-900">Core Modules</h3>
               <button onClick={() => navigate('/cyber-security')} className="text-xs font-bold text-emerald-600 hover:underline">View all</button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
               {topics.map((topic, i) => (
                 <div 
                   key={i} 
                   onClick={() => handleTopicSelect(topic.label)}
                   className={`rounded-[20px] p-4 border shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center gap-3.5 hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer group ${
                     selectedTopic === topic.label 
                       ? 'bg-emerald-50 border-emerald-200 shadow-md' 
                       : 'bg-white border-slate-100'
                   }`}
                 >
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${topic.bg} group-hover:scale-110 transition-transform shadow-sm`}>
                       {topic.icon}
                    </div>
                    <div>
                       <h4 className={`text-xs font-bold leading-tight transition-colors ${
                         selectedTopic === topic.label ? 'text-emerald-600' : 'text-slate-800 group-hover:text-emerald-600'
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
                    <button onClick={() => navigate('/cyber-security')} className="text-xs font-bold text-emerald-600 hover:underline">See all</button>
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
                                 className="h-full bg-emerald-600 rounded-full" 
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
                        <button onClick={() => navigate('/cyber-security')} className="px-6 py-2.5 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-full font-bold text-xs flex items-center gap-2 transition-all active:scale-95 w-max">
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
                    <button onClick={() => navigate('/cyber-security')} className="text-xs font-bold text-emerald-600 hover:underline">See all</button>
                  </div>
                  
                  {/* Card Body */}
                  <div className="flex flex-col sm:flex-row items-stretch gap-5 flex-1">
                     <div className="w-[140px] h-[160px] rounded-[16px] shrink-0 overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
                        <img src="/images/skills/c1.png" alt="Phishing Simulation" className="w-full h-full object-cover transition-transform duration-500" />
                     </div>

                     <div className="flex-1 flex flex-col justify-center py-1">
                        <h4 className="text-[17px] font-bold text-slate-900 tracking-tight leading-tight">Phishing Simulation</h4>
                        <p className="text-xs font-medium text-slate-500 mt-1 mb-2">Test your skills with simulated phishing attacks.</p>
                        
                        <button onClick={() => navigate('/cyber-security')} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold text-xs flex items-center gap-2 shadow-sm transition-all active:scale-95 w-max">
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

export default CyberSecurityDashboard;
