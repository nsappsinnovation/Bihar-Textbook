import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, BookOpen, Target, Star, BarChart2, User, Settings, 
  Search, Bell, Flame, ChevronRight, Play, CheckCircle2,
  Lock, ArrowRight, Heart, DollarSign, Shield, MessageCircle, Clock, Grid, ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LifeSkills = () => {
  const navigate = useNavigate();

  // Real-time state for practical tasks
  const [tasks, setTasks] = useState([
    { id: 1, label: 'Make your bed', done: false, icon: '🛏️' },
    { id: 2, label: 'Drink enough water', done: false, icon: '💧', active: true },
    { id: 3, label: 'Help in keeping home clean', done: false, icon: '🧹' },
  ]);

  const [selectedCategory, setSelectedCategory] = useState({
    label: 'Cooking Basics',
    icon: '🌿',
    desc: 'Learn how to make simple, healthy and delicious meals for you and your family.',
    image: '/images/life skill/cookingboy.png',
    progress: 60
  });

  const [showCongrats, setShowCongrats] = useState(false);

  const toggleTask = (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
    
    // Check if all done
    if (updatedTasks.every(t => t.done)) {
      setShowCongrats(true);
      setTimeout(() => setShowCongrats(false), 4000);
    }
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory({
      label: cat.label,
      icon: cat.iconLabel || '✨',
      desc: cat.desc || `Master the essentials of ${cat.label.toLowerCase()} for better independence.`,
      image: '/images/life skill/cookingboy.png',
      progress: Math.floor(Math.random() * 40) + 10 // Mock progress for demo
    });
  };

  const categories = [
    { icon: <User className="text-green-500" />, label: 'Personal Care', color: 'bg-green-50' },
    { icon: <Heart className="text-pink-500" />, label: 'Health & Wellness', color: 'bg-pink-50' },
    { icon: <DollarSign className="text-yellow-600" />, label: 'Money Management', color: 'bg-yellow-50' },
    { icon: <Home className="text-blue-500" />, label: 'Home Management', color: 'bg-blue-50' },
    { icon: <Shield className="text-red-500" />, label: 'Safety & First Aid', color: 'bg-red-50' },
    { icon: <MessageCircle className="text-purple-500" />, label: 'Communication Skills', color: 'bg-purple-50' },
    { icon: <Clock className="text-orange-500" />, label: 'Time Management', color: 'bg-orange-50' },
   
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      {/* Main Content */}
              <main className="flex-1 px-4 md:px-12 lg:px-24 pb-10 max-w-[1400px] mx-auto w-full overflow-hidden relative">
               {/* Back Button */}
                     <button
                       onClick={() => navigate("/basic-skill")}
                       className="fixed top-5 left-5 z-50 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-blue-600 hover:shadow-lg transition-all border border-slate-100 group"
                     >
                       <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
                     </button>
        {/* Hero Section */}
                        <div className="flex flex-col lg:flex-row justify-between items-center mb-4 relative mt-0">
                        <div className="space-y-1 z-10 w-[45%]">
                           <h1 className="text-4xl md:text-5xl font-black leading-tight">
               Let's build <br />
              <span className="text-[#22C55E]">Life Skills</span>
            </h1>
                           <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xs">
              Learn practical skills for a better and independent life.
            </p>
              <button
                onClick={() => navigate("/skill-learn")}
                 className="mt-2 px-7 py-3 bg-[#22C55E] text-white rounded-full font-bold text-sm flex items-center gap-2 hover:bg-green-600 transition-all shadow-lg shadow-green-200 hover:-translate-y-0.5"
              >
                Start learning <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
          </div>
          
                            <div className="relative flex items-end justify-center w-full lg:w-[55%] min-h-[300px] mt-8 lg:mt-0">
            {/* Background soft blob */}
            <div className="absolute left-[-10%] top-[-10%] w-[120%] h-[120%] bg-[#F1FAED] rounded-full -z-10 blur-3xl opacity-60"></div>
            
            {/* Combined RHS Image */}
            <div className="relative z-10 w-full max-w-[700px]">
              <img 
                src="/images/life skill/right.png" 
                alt="Learning Characters" 
                className="w-full h-auto object-contain transform lg:translate-x-12" 
              />
            </div>
            <div className="absolute -right-12 -bottom-12 opacity-30 -z-10 hidden md:block">
              <LeafIcon className="w-80 h-80 text-[#C8E6C9] fill-[#C8E6C9]" />
            </div>
          </div>
        </div>

        {/* Choose Section */}
        <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-black text-slate-900">Choose what you want to learn</h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-4 relative z-30">
                {categories.map((cat, i) => (
                    <motion.div 
                        key={i}
                        whileHover={{ y: -4, shadow: '0 12px 20px -5px rgba(0, 0, 0, 0.05)' }}
                        onClick={() => handleCategorySelect(cat)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 group ${
                          selectedCategory.label === cat.label 
                          ? 'bg-green-50 border-green-200 shadow-md ring-2 ring-green-100' 
                          : 'bg-white border-slate-100 shadow-sm hover:border-green-100'
                        }`}
                    >
                        <div className={`w-10 h-10 ${cat.color} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                            {React.cloneElement(cat.icon, { size: 18, strokeWidth: 2.5 })}
                        </div>
                        <span className="text-[11px] font-black text-slate-800 leading-tight text-left">
                            {cat.label}
                        </span>
                    </motion.div>
                ))}
            </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 relative">
            {/* Congrats Overlay */}
            {showCongrats && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute inset-x-0 -top-12 z-50 flex justify-center pointer-events-none"
              >
                <div className="bg-[#22C55E] text-white px-6 py-3 rounded-full font-black shadow-2xl flex items-center gap-3 animate-bounce">
                  <span>🎉</span> Good Job! You've completed your practicals! <span>🌟</span>
                </div>
              </motion.div>
            )}

            {/* Continue Learning */}
            <div className="lg:col-span-6 flex flex-col">
                <div className="bg-white rounded-[32px] p-4 border border-slate-50 shadow-sm flex-1 flex flex-col">
                    <h3 className="text-lg font-black mb-6 text-slate-900">Continue Learning</h3>
                    <div className="flex items-center gap-8">
                        <div className="w-48 h-48 rounded-[2.5rem] overflow-hidden bg-slate-50 shrink-0 border border-slate-100 shadow-inner">
                            <img src={selectedCategory.image} alt={selectedCategory.label} className="w-24 h-22 object-cover scale-220 translate-x-14 translate-y-13" />
                        </div>
                        <div className="flex-1 space-y-5">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h4 className="font-black text-slate-900 text-xl tracking-tight">{selectedCategory.label}</h4>
                                    <span className="text-2xl"></span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                        <div className={`h-full bg-green-500 rounded-full shadow-sm transition-all duration-1000`} style={{ width: `${selectedCategory.progress}%` }} />
                                    </div>
                                    <span className="text-xs font-black text-slate-400">{selectedCategory.progress}%</span>
                                </div>
                            </div>
                            <p className="text-sm text-slate-500 leading-relaxed font-medium max-w-[280px]">
                                {selectedCategory.desc}
                            </p>
                            <button 
                              onClick={() => navigate("/skill-learn")}
                              className="bg-[#22C55E] text-white px-8 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#16A34A] transition-all shadow-xl shadow-green-100 active:scale-95 group/btn"
                            >
                                Continue <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Practical Today */}
            <div className="lg:col-span-3">
                <div className="bg-white rounded-[32px] p-6 border border-slate-50 shadow-sm">
                    <h3 className="text-base font-black text-slate-900 mb-0.5">Practical Today</h3>
                    <p className="text-[10px] font-bold text-slate-400 mb-4">Apply a small skill in your day</p>
                    
                    <div className="space-y-2">
                        {tasks.map((task) => (
                            <div 
                                key={task.id} 
                                onClick={() => toggleTask(task.id)}
                                className={`flex items-center justify-between p-2.5 rounded-2xl transition-all group cursor-pointer active:scale-[0.98] ${
                                    task.active ? 'bg-slate-50/80 shadow-sm ring-1 ring-slate-100' : 'hover:bg-slate-50/50'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-base shadow-sm border border-slate-50">
                                        {task.icon}
                                    </div>
                                    <span className={`text-[11px] font-black transition-colors ${task.done ? 'text-black' : 'text-slate-700'}`}>
                                        {task.label}
                                    </span>
                                </div>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                    task.done ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-100' : 'border-slate-300 bg-white'
                                }`}>
                                    {task.done && <CheckCircle2 size={12} strokeWidth={3} />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Growth Card */}
            <div className="lg:col-span-3">
                <div className="bg-[#F8F9FF] rounded-[32px] p-5 border border-blue-50 shadow-sm h-full flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-5xl mb-4 shadow-sm">
                        🪴
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-base font-black text-slate-900 flex items-center justify-center gap-2">
                            Keep growing <span className="text-lg">🌿</span>
                        </h4>
                        <p className="text-[11px] font-bold text-slate-500 leading-relaxed max-w-[140px] mx-auto">
                            Every skill you learn adds to your independence.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        
      </main>
    </div>
  );
};

// Simple GraduationCap icon since it wasn't imported from lucide
const GraduationCap = ({ size, className }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>
);

const LeafIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a7 7 0 0 1-10 10Z" />
    <path d="M11 20c-1.5.5-3 1-5 1a4 4 0 0 1-4-4c0-2 1.5-3.5 1-5 2.5 0 4 1.5 5 1" />
    <path d="M11 20l1-5" />
  </svg>
);

export default LifeSkills;
