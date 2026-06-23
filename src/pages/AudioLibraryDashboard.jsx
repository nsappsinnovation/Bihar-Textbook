import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, BookOpen, Flame, Star, 
  Clock, Calendar, BookMarked, Library, BookText,
  Rocket, Globe, Microscope, Lightbulb, GraduationCap, MapPin,
  X, CheckCircle2, Trophy, Headphones, Search, Bell, Settings,
  Heart, LayoutGrid, Play, SkipBack, Bookmark, Search as SearchIcon, Activity,
  Leaf, Landmark, Atom, User, Briefcase, Pause, Film
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { booksData } from './MyAudioLibrary';

const AudioLibraryDashboard = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState('Self Growth');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(true); // Default to true
  const [progress, setProgress] = useState(45);
  const [currentTime, setCurrentTime] = useState(1125); // 18:45 in seconds
  const [duration, setDuration] = useState(2430); // 40:30 in seconds

  // Get recently played books from localStorage
  const [recentlyPlayed, setRecentlyPlayed] = useState(() => {
    try {
      const ids = JSON.parse(localStorage.getItem('recentlyPlayed') || '[]');
      return ids.map(id => booksData.find(b => b.id === id)).filter(Boolean);
    } catch (e) {
      return [];
    }
  });

  const [recentlyPlayedCount, setRecentlyPlayedCount] = useState(recentlyPlayed.length);
  const [isRecentExpanded, setIsRecentExpanded] = useState(false);
  const [currentBook, setCurrentBook] = useState(() => {
    return recentlyPlayed[0] || booksData[0]; // The Alchemist or first book by default
  });

  // Real-time stats state
  const [completedBooksCount, setCompletedBooksCount] = useState(2); 
  const [libraryCount, setLibraryCount] = useState(booksData.length);
  const [favoritesCount, setFavoritesCount] = useState(1);
  const [listeningStreak, setListeningStreak] = useState(7);

  const formatTime = (timeInSecs) => {
    if (isNaN(timeInSecs)) return "00:00";
    const minutes = Math.floor(timeInSecs / 60);
    const seconds = Math.floor(timeInSecs % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgress = ({ playedSeconds }) => {
    setCurrentTime(playedSeconds);
    if (duration > 0) {
      const pct = Math.round((playedSeconds / duration) * 100);
      setProgress(pct);
      if (pct === 100 && progress < 100) {
        setCompletedBooksCount(prev => prev + 1);
      }
    }
  };

  const toggleBookmark = () => {
    if (isBookmarked) {
      setIsBookmarked(false);
      setFavoritesCount(prev => Math.max(0, prev - 1));
    } else {
      setIsBookmarked(true);
      setFavoritesCount(prev => prev + 1);
    }
  };

  const categories = [
    { label: 'Self Growth', icon: <Leaf size={20} />, iconColor: 'text-green-600', color: 'bg-purple-100/60' },
    { label: 'History', icon: <Landmark size={20} />, iconColor: 'text-amber-600', color: 'bg-orange-100/60' },
    { label: 'Science', icon: <Atom size={20} />, iconColor: 'text-teal-600', color: 'bg-teal-50' },
    { label: 'Biographies', icon: <User size={20} />, iconColor: 'text-purple-500', color: 'bg-fuchsia-50' },
    { label: 'Business', icon: <Briefcase size={20} />, iconColor: 'text-yellow-700', color: 'bg-orange-50' },
    { label: 'Stories', icon: <BookOpen size={20} />, iconColor: 'text-blue-600', color: 'bg-blue-50' },
  ];

  const quickStats = [
    { label: 'My Library', value: `${libraryCount} items`, icon: <Library className="text-purple-600" />, color: 'bg-purple-50', path: '/my-audio-library?filter=all' },
    { label: 'Recently Played', value: `${recentlyPlayedCount} items`, icon: <Clock className="text-blue-500" />, color: 'bg-blue-50', path: '/my-audio-library?filter=recent' },
    { label: 'Favorites', value: `${favoritesCount} saved`, icon: <Heart className={`transition-colors ${isBookmarked ? 'text-rose-500 fill-rose-500' : 'text-rose-500'}`} />, color: 'bg-rose-50', path: '/my-audio-library?filter=favorites' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex font-sans text-slate-900 overflow-x-hidden">
      {/* Off-screen ReactPlayer for dynamic audiobook playback */}
      <ReactPlayer
        ref={audioRef}
        url={currentBook.audioUrl}
        playing={isPlaying}
        onProgress={handleProgress}
        onDuration={(d) => setDuration(d)}
        style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}
        width="200px"
        height="200px"
        config={{ 
          youtube: { 
            playerVars: { 
              origin: window.location.origin,
              playsinline: 1
            } 
          } 
        }}
      />

      {/* Main Content */}
      <main className="flex-1 min-h-screen pb-0">
        {/* Back Button */}
                             <button
                               onClick={() => navigate("/audio-books")}
                               className="fixed top-5 left-5 z-50 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-blue-600 hover:shadow-lg transition-all border border-slate-100 group"
                             >
                               <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
                             </button>

        <div className="px-6 md:px-12 space-y-8 pt-4">
          
          {/* Hero & Stats Section */}
          <div className="relative">
            {/* Hero Section */}
            <section className="bg-white rounded-[24px] overflow-hidden relative border border-slate-100 flex items-center min-h-[300px] pb-6">
              <div className="relative z-10 p-8 md:p-10 lg:w-1/2 space-y-4">
                 <h1 className="text-[32px] md:text-[42px] font-extrabold leading-[1.05] tracking-tight text-[#1e293b]">
                    Listen, learn & <br /> grow with <br />
                    <span className="text-purple-600">Audio Library</span>
                 </h1>
                 <p className="text-slate-500 text-[15px] md:text-[16px] font-medium leading-relaxed max-w-sm">
                   Your pocket hub for audiobooks and knowledge.
                 </p>
                 
                 <div className="pt-2">
                   <button 
                     onClick={() => navigate("/my-audio-library")}
                     className="px-6 py-3 bg-purple-600 text-white rounded-full font-bold text-[14px] flex items-center gap-2 hover:bg-purple-700 transition-colors w-max shadow-sm shadow-purple-200"
                   >
                     Start Listening <ArrowRight size={16} />
                   </button>
                 </div>
              </div>

              <div className="hidden lg:block absolute top-0 right-0 w-[55%] h-full">
                 <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
                 <img src="/images/audio/rhs.png" alt="Audio Library" className="w-full h-full object-cover object-right-top" />
                 {/* Wave Effect Overlay */}
                 <div className="absolute bottom-12 right-24 flex items-center gap-1.5 opacity-80 z-20">
                   {[1,2,3,4,5,6].map(i => (
                      <motion.div 
                        key={i}
                        animate={{ height: [15, 45, 25, 55, 20] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        className="w-1.5 bg-purple-500 rounded-full"
                      />
                   ))}
                 </div>
              </div>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 relative z-20 -mt-8 px-4 md:px-12">
              {quickStats.map((stat, i) => (
                <div 
                  key={i} 
                  onClick={() => navigate(stat.path)}
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

          {/* Main Content Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Continue Listening */}
            <div className="lg:col-span-8 space-y-6">
               <div className="flex items-center justify-between px-1 mb-1">
                 <h3 className="text-[16px] font-bold text-[#1e1b4b]">Continue Listening</h3>
                 <button onClick={() => navigate('/my-audio-library?filter=progress')} className="text-[13px] font-medium text-[#1e1b4b] hover:text-purple-600 flex items-center gap-1 transition-colors">See all <ArrowRight size={14} /></button>
               </div>
               
               <div className="bg-white rounded-[24px] p-4 border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row items-center sm:items-stretch gap-6">
                  <div className="w-[140px] h-[140px] rounded-[16px] overflow-hidden shrink-0 relative group/cover shadow-sm">
                     <img src={currentBook.cover} alt={currentBook.title} className="w-full h-full object-cover" />
                     <div 
                        className="absolute bottom-2 right-2 w-10 h-10 bg-black/60 border-[2px] border-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-105 transition-transform shadow-lg" 
                        onClick={togglePlay}
                     >
                        {isPlaying ? <div className="flex gap-1"><div className="w-1 h-3.5 bg-white rounded-full" /><div className="w-1 h-3.5 bg-white rounded-full" /></div> : <Play fill="currentColor" size={16} className="ml-0.5" />}
                     </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-center py-1">
                     <div className="mb-3">
                        <h4 className="text-[18px] font-bold text-[#1e1b4b] tracking-tight leading-tight">{currentBook.title}</h4>
                        <p className="text-[13px] font-medium text-[#1e1b4b]/70 mt-1">{currentBook.author}</p>
                     </div>

                     <p className="text-[12px] font-medium text-[#1e1b4b]/60 mb-4">{formatTime(currentTime)} / {formatTime(duration)}</p>

                     <div className="flex items-center gap-3">
                        <button className="w-[100px] h-[40px] bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-full flex items-center justify-center transition-colors shadow-sm" onClick={togglePlay}>
                           {isPlaying ? <div className="flex gap-1"><div className="w-1 h-4 bg-white rounded-full" /><div className="w-1 h-4 bg-white rounded-full" /></div> : <Play fill="currentColor" size={18} className="ml-1" />}
                        </button>
                        
                        <button onClick={toggleBookmark} className={`w-[40px] h-[40px] rounded-full flex items-center justify-center transition-colors ${isBookmarked ? 'bg-rose-50 text-rose-500 hover:bg-rose-100' : 'bg-[#f8fafc] text-slate-600 hover:bg-slate-100'}`}>
                           <Heart size={18} className={isBookmarked ? 'fill-rose-500' : ''} />
                        </button>
                     </div>
                  </div>
               </div>

               {/* Browse by Category */}
               <section className="bg-white rounded-[15px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-4 border border-slate-50 relative overflow-hidden">
                 <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4 px-1">
                      <h3 className="text-[15px] font-bold text-[#1e1b4b]">Browse by Category</h3>
                      <button onClick={() => navigate('/my-audio-library')} className="text-[13px] font-semibold text-purple-600 flex items-center gap-1">See all <ArrowRight size={12} /></button>
                    </div>
                    
                    <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100/80">
                      {categories.map((cat, i) => (
                        <button 
                          key={i}
                          onClick={() => { setSelectedCategory(cat.label); navigate(`/my-audio-library`); }}
                          className="flex-1 flex flex-col items-center justify-center gap-1.5 px-1 py-3 md:py-1.5 group hover:bg-slate-50/50 transition-colors cursor-pointer"
                        >
                          <div className={`w-[56px] h-[46px] ${cat.color} rounded-xl flex items-center justify-center ${cat.iconColor} group-hover:scale-105 transition-transform`}>
                            {cat.icon}
                          </div>
                          <span className={`text-[13px] font-bold ${selectedCategory === cat.label ? 'text-purple-600' : 'text-[#1e1b4b]'}`}>
                            {cat.label}
                          </span>
                        </button>
                      ))}
                    </div>
                 </div>
               </section>

              
            </div>

            {/* Discover Section */}
            <div className="lg:col-span-4 flex flex-col">
               <div className="bg-[#F5F3FF] rounded-[40px] p-8 relative overflow-hidden group h-[328px]">
                  <div className="relative z-10 flex flex-col h-full pt-20">
                     <div className="space-y-2 max-w-[200px] mb-6">
                        <h3 className="text-[20px] font-black text-slate-900 leading-[1.2] tracking-tight">
                          Discover something <br /> new today
                        </h3>
                        <p className="text-slate-600 font-medium text-[14px] leading-snug tracking-tight">
                          Handpicked audio <br /> just for you
                        </p>
                     </div>
                     
                     <button onClick={() => navigate('/my-audio-library?filter=all')} className="mt-auto px-6 py-3 bg-white text-slate-900 rounded-full font-bold text-[14px] flex items-center justify-center gap-3 shadow-md shadow-purple-100 group/pick w-max hover:bg-slate-50 transition-colors cursor-pointer">
                        Explore Picks <ArrowRight size={16} className="group-hover/pick:translate-x-1 transition-transform" />
                     </button>
                  </div>

                  <div className="absolute inset-0 pointer-events-none">
                     <img src="images/audio/discover.png" alt="Headphones" className="w-full h-full object-contain" />
                  </div>
               </div>
            </div>
          </div>


            {/* Bottom Stats Grid */}
           <section className="bg-white rounded-[50px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-6 mb-6 border border-slate-200">
            <h2 className="text-lg font-bold text-[#1e1b4b] mb-6">Your Listening Journey</h2>
            
            <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100 mb-6">
               {[
                 { label: 'Hours Listened', value: '24h 30m', icon: <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center"><Headphones className="text-purple-600 w-5 h-5" /></div> },
                 { label: 'Audios Completed', value: `${completedBooksCount}`, icon: <Activity className="text-orange-500 w-6 h-6" /> },
                 { label: 'In Your Library', value: `${libraryCount}`, icon: <Bookmark className="text-green-500 w-6 h-6" /> },
                 { label: 'Listening Streak', value: `${listeningStreak} Days`, icon: <Flame className="text-rose-500 w-6 h-6 fill-rose-500" /> },
               ].map((stat, i) => (
                 <div key={i} className="flex-1 flex items-center justify-center md:justify-start gap-3 px-2 md:px-6 py-4 md:py-0 first:pl-0 last:pr-0">
                   <div className="flex items-center justify-center shrink-0 w-10">
                      {stat.icon}
                   </div>
                   <div>
                      <p className="text-[12px] font-medium text-slate-500 mb-0.5">{stat.label}</p>
                      <p className="text-[18px] font-bold text-[#1e1b4b] leading-tight">{stat.value}</p>
                   </div>
                 </div>
               ))}
            </div>

           </section>
          

        </div>
      </main>
    </div>
  );
};

export default AudioLibraryDashboard;
