import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, BookOpen, Flame, Star, 
  Clock, Calendar, BookMarked, Library, BookText,
  Rocket, Globe, Microscope, Lightbulb, GraduationCap, MapPin,
  X, CheckCircle2, Trophy
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MobileLibraryDashboard = () => {
  const navigate = useNavigate();

  // Content mapping for different categories with persistence simulation
  const [contentStates, setContentStates] = useState({
    'Educational': {
      title: 'Mathematics Simplified',
      desc: 'Master the basics of algebra and geometry with interactive lessons.',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400',
      progress: 45,
      color: 'bg-green-50'
    },
    'Fiction': {
      title: 'The Alchemist',
      desc: 'Follow the journey of Santiago in this world-renowned tale of magic.',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
      progress: 65,
      color: 'bg-blue-50'
    },
    'Science': {
      title: 'Cosmos & Beyond',
      desc: 'Explore the mysteries of the universe and our place within the stars.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400',
      progress: 20,
      color: 'bg-purple-50'
    },
    'Biographies': {
      title: 'Life of Mahatma',
      desc: 'The inspiring story of peace and non-violence that shaped a nation.',
      image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&q=80&w=400',
      progress: 85,
      color: 'bg-orange-50'
    },
    'History': {
      title: 'Ancient Bihar',
      desc: 'Uncover the glorious past of Nalanda and the Magadha Empire.',
      image: '/images/heritage/indus.png',
      progress: 10,
      color: 'bg-amber-50'
    },
    'Mystery': {
      title: 'The Secret Room',
      desc: 'A thrilling adventure that keeps you on the edge of your seat.',
      image: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=400',
      progress: 30,
      color: 'bg-slate-50'
    },
    'Arts': {
      title: 'Madhubani Traditions',
      desc: 'Learn the vibrant storytelling traditions through mural paintings.',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=400',
      progress: 90,
      color: 'bg-pink-50'
    }
  });

  const [selectedCategory, setSelectedCategory] = useState('Fiction');
  const [showLocationModal, setShowLocationModal] = useState(false);
  
  // Real-time stats state
  const [stats, setStats] = useState({
    booksRead: 18,
    hoursSpent: 24.5,
    booksInLibrary: 56,
    streak: 7,
    points: 1250
  });

  const activeContent = contentStates[selectedCategory] || contentStates['Fiction'];

  // Handle "Continue" or "Start Reading" which simulates progress
  const handleStartLearning = () => {
    // Simulate real-time update
    setStats(prev => ({
      ...prev,
      hoursSpent: parseFloat((prev.hoursSpent + 0.1).toFixed(1)),
      points: prev.points + 10
    }));
    
    // Update local content progress
    setContentStates(prev => ({
      ...prev,
      [selectedCategory]: {
        ...prev[selectedCategory],
        progress: Math.min(prev[selectedCategory].progress + 2, 100)
      }
    }));

    // Actual Navigation
    setTimeout(() => navigate("/mobile-courses"), 300);
  };

  const categories = [
    { label: 'Educational', icon: '🎓', color: 'bg-green-50' },
    { label: 'Fiction', icon: '📖', color: 'bg-blue-50' },
    { label: 'Science', icon: '🔬', color: 'bg-purple-50' },
    { label: 'Biographies', icon: '👤', color: 'bg-orange-50' },
    { label: 'History', icon: '🏛️', color: 'bg-amber-50' },
    { label: 'Mystery', icon: '🔍', color: 'bg-slate-50' },
    { label: 'Arts', icon: '🎨', color: 'bg-pink-50' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-slate-900 pb-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/mobile-library")}
        className="fixed top-5 left-5 z-50 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-green-600 hover:shadow-lg transition-all border border-slate-100 group"
      >
        <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>

      {/* Hero Section - Compact */}
      <section className="relative pt-12 pb-6 px-6 md:px-12 lg:px-12 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10 py-2">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-black text-[#1E293B] leading-[1.1]">
              Your journey starts with <br />
              <span className="text-green-600">Mobile Library</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl font-medium max-w-md">
              Read, learn and grow – anytime, anywhere at your doorstep.
            </p>
            <button 
              onClick={handleStartLearning}
              className="px-8 py-3.5 bg-green-600 text-white rounded-full font-bold text-base flex items-center gap-3 hover:bg-green-700 transition-all active:scale-95 group shadow-xl shadow-green-100"
            >
              Start reading <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="relative h-[300px] flex items-center justify-center">
            <div className="relative z-20 w-full h-full">
              <img src="/images/mobile/rhs.png" alt="Library" className="w-full h-full object-contain object-center scale-110" />
            </div>
          </div>
        </div>
      </section>

      

      {/* Dashboard Grid - Equally Divided Layout */}
      <section className="px-6 md:px-12 lg:px-12 py-4 mt-2">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Continue Reading - Compact 50/50 */}
          <div className="lg:col-span-6 bg-white rounded-[40px] p-4 border border-slate-100 shadow-sm flex flex-col min-h-[180px] justify-center">
            <h3 className="text-sm font-black mb-3 text-slate-900 tracking-tight">Continue Reading</h3>
            <div className={`${activeContent.color} rounded-[28px] p-4 flex flex-row items-center gap-6 flex-1 transition-colors duration-500`}>
              <div className="w-28 h-40 rounded-xl overflow-hidden shadow-xl border-2 border-white shrink-0">
                <img src={activeContent.image} alt={activeContent.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-3 w-full">
                <div>
                  <h4 className="font-black text-slate-900 text-lg tracking-tight leading-tight line-clamp-1">{activeContent.title}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Lesson</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-black text-slate-400">
                    <span>Progress</span>
                    <span className="text-green-600 font-bold">{activeContent.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-white/50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${activeContent.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-green-600 rounded-full shadow-sm" 
                    />
                  </div>
                </div>
                <button 
                  onClick={handleStartLearning}
                  className="px-4 py-1.5 bg-green-600 text-white rounded-lg font-bold text-[11px] flex items-center gap-2 hover:bg-green-700 transition-all active:scale-95 shadow-md shadow-green-100"
                >
                  Continue <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Today's Pick - Compact 50/50 */}
          <div className="lg:col-span-6 bg-white rounded-[40px] p-4 border border-slate-100 shadow-sm flex flex-col min-h-[180px]">
            <h3 className="text-sm font-black mb-3 text-slate-900 tracking-tight">Today's Pick</h3>
            <div className="bg-[#FFF9ED] rounded-[28px] p-4 flex flex-row items-center gap-6 flex-1 group">
                <div className="flex-1 space-y-3">
                  <h4 className="text-lg font-black text-[#92400E] leading-tight">Discover something new today!</h4>
                  <p className="text-[11px] text-[#92400E]/70 font-medium leading-tight line-clamp-2">
                    Explore handpicked books curated for your journey.
                  </p>
                  <button 
                    onClick={() => navigate("/mobile-courses")}
                    className="px-4 py-1.5 bg-[#D97706] text-white rounded-lg font-bold text-[11px] flex items-center gap-2 hover:bg-amber-700 transition-all active:scale-95 shadow-md shadow-amber-100"
                  >
                    Explore Now <ArrowRight size={14} />
                  </button>
                </div>
                <div className="w-24 h-32 rounded-xl overflow-hidden shadow-lg border-2 border-white shrink-0 group-hover:rotate-2 transition-transform">
                   <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400" alt="Pick" className="w-full h-full object-cover" />
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Reading Progress - Real-time sync */}
      <section className="px-6 md:px-12 lg:px-12 py-4">
        <div className="max-w-[1600px] mx-auto space-y-6">
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Your Reading Progress</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Books Read', value: stats.booksRead, icon: <BookOpen size={24} className="text-green-500" />, color: 'bg-green-50' },
              { label: 'Hours Spent', value: `${stats.hoursSpent}h`, icon: <Clock size={24} className="text-yellow-600" />, color: 'bg-yellow-50' },
              { label: 'Books in Library', value: stats.booksInLibrary, icon: <BookMarked size={24} className="text-purple-500" />, color: 'bg-purple-50' },
              { label: 'Reading Streak', value: `${stats.streak} Days`, icon: <Calendar size={24} className="text-blue-500" />, color: 'bg-blue-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-[32px] p-6 border border-slate-50 shadow-sm flex flex-col items-center justify-center text-center space-y-4 hover:shadow-md transition-all group active:scale-95 cursor-default">
                <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                   {stat.icon}
                </div>
                <div>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                   <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default MobileLibraryDashboard;
