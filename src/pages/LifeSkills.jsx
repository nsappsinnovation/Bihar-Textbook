import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, Clock, 
  Brain, Lightbulb, CheckCircle2, Trophy,
  XCircle, Target, Heart,
  ChefHat, Wallet, Shield, MessageCircle, Wrench,
  Droplets, Sparkles, Coins, HeartPulse, Utensils, Monitor, Smile, Home
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const toolsCategories = [
  { id: 'All', label: 'All Tasks'},
  { id: 'Home', label: 'Home' },
  { id: 'Health', label: 'Health' },
  { id: 'Finance', label: 'Finance' }
];

const toolsDataList = [
  { name: 'Make your bed', tag: 'Home Management', desc: 'Start your day right by making your bed every morning.', icon: <Home size={20} />, color: 'bg-emerald-50 text-emerald-600', iconBg: 'bg-emerald-100 text-emerald-600', categories: ['Home'] },
  { name: 'Drink water', tag: 'Health & Wellness', desc: 'Stay hydrated by drinking at least 8 glasses of water daily.', icon: <Droplets size={20} />, color: 'bg-blue-50 text-blue-600', iconBg: 'bg-blue-100 text-blue-600', categories: ['Health'] },
  { name: 'Clean your room', tag: 'Home Management', desc: 'Keep your living space tidy and organized for a clear mind.', icon: <Sparkles size={20} />, color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100 text-purple-600', categories: ['Home'] },
  { name: 'Save pocket money', tag: 'Money Management', desc: 'Put a small amount of money in your piggy bank every week.', icon: <Coins size={20} />, color: 'bg-amber-50 text-amber-600', iconBg: 'bg-amber-100 text-amber-600', categories: ['Finance'] },
  { name: 'Basic First Aid', tag: 'Safety', desc: 'Learn how to use a band-aid and clean a small scratch.', icon: <HeartPulse size={20} />, color: 'bg-rose-50 text-rose-600', iconBg: 'bg-rose-100 text-rose-600', categories: ['Health'] },
  { name: 'Help with cooking', tag: 'Home Management', desc: 'Assist in washing vegetables or setting up the dining table.', icon: <Utensils size={20} />, color: 'bg-orange-50 text-orange-600', iconBg: 'bg-orange-100 text-orange-600', categories: ['Home'] }
];

const quizQuestions = [
  { question: "What is the first thing you should do when you get a small cut?", options: ["Put a bandage on it immediately", "Wash it with clean water and soap", "Ignore it", "Blow on it"], correct: 1 },
  { question: "Why is it important to create a budget?", options: ["To buy everything you want", "To track income and expenses", "To show off your money", "To stop spending completely"], correct: 1 },
  { question: "What is a healthy way to manage stress?", options: ["Yelling at someone", "Taking deep breaths or talking to a friend", "Eating lots of junk food", "Sleeping all day"], correct: 1 },
  { question: "When boiling water on a stove, you should:", options: ["Leave it unattended", "Turn the handles inward", "Touch the pot to see if it's hot", "Put your face over it"], correct: 1 },
  { question: "What does a balanced diet mean?", options: ["Only eating vegetables", "Eating from all food groups", "Eating equal amounts of pizza and burgers", "Skipping meals"], correct: 1 },
];
const optionLabels = ['A', 'B', 'C', 'D'];

const SkillTasksComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const filteredTools = selectedCategory === 'All' ? toolsDataList : toolsDataList.filter(t => t.categories.includes(selectedCategory));

  return (
    <div className="bg-white rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Practical Tasks</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {toolsCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTools.map(tool => (
          <div key={tool.name} className="p-5 rounded-[20px] border border-slate-100 bg-white hover:border-emerald-200 hover:shadow-lg transition-all group cursor-pointer relative">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center text-2xl ${tool.iconBg}`}>
                {tool.icon}
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{tool.name}</h4>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mt-1 inline-block ${tool.color}`}>
                  {tool.tag}
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              {tool.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const QuizComponent = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0); 
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === quizQuestions[currentQ].correct) setScore(prev => prev + 100);
  };

  const handleNext = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0); setSelectedOption(null); setIsAnswered(false);
    setScore(0); setShowResult(false);
  };

  const getOptionStyle = (idx) => {
    if (!isAnswered) return selectedOption === idx 
      ? 'bg-emerald-50 border-emerald-500 text-emerald-700' 
      : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/50';
    if (idx === quizQuestions[currentQ].correct) return 'bg-green-50 border-green-500 text-green-700';
    if (idx === selectedOption) return 'bg-rose-50 border-rose-500 text-rose-700';
    return 'bg-slate-50 border-slate-100 text-slate-400';
  };

  const getLabelBg = (idx) => {
    if (!isAnswered) return selectedOption === idx ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500';
    if (idx === quizQuestions[currentQ].correct) return 'bg-green-500 text-white';
    if (idx === selectedOption) return 'bg-rose-500 text-white';
    return 'bg-slate-200 text-slate-400';
  };

  const q = quizQuestions[currentQ];
  const progress = ((currentQ + (isAnswered ? 1 : 0)) / quizQuestions.length) * 100;

  return (
    <div className="w-full flex justify-center py-8 relative rounded-[24px] overflow-hidden border border-slate-100">
      <div className="absolute inset-0 z-0">
        <img src="/images/life skill/bg.png" alt="Quiz Background" className="w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-emerald-900/10 backdrop-blur-[2px]" />
      </div>

      <div className="w-full max-w-[450px] shrink-0 transition-all duration-300 relative z-10 px-4">
        <AnimatePresence mode="wait">
          {!showResult && (
            <motion.div key="active-quiz" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full">
              <div className="bg-white/80 backdrop-blur-md rounded-[20px] p-5 sm:p-6 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                      <Brain size={16} />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">Question {currentQ + 1}/{quizQuestions.length}</h3>
                      <p className="text-[10px] font-bold text-slate-400">Life Skills Test</p>
                    </div>
                  </div>
                  <div className="bg-slate-50/80 px-3 py-1.5 rounded-lg border border-slate-200/60 text-center">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Score</span>
                    <span className="text-sm font-black text-emerald-600 leading-none">{score}</span>
                  </div>
                </div>

                <div className="w-full h-1 bg-slate-100 rounded-full mb-5 overflow-hidden">
                  <motion.div animate={{ width: `${progress}%` }} className="h-full bg-emerald-500 rounded-full" />
                </div>

                <h2 className="text-[15px] font-bold text-slate-900 leading-snug mb-5">
                  {q.question}
                </h2>

                <div className="space-y-2.5">
                  {q.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      disabled={isAnswered}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer font-bold ${getOptionStyle(idx)}`}
                    >
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black shrink-0 transition-all shadow-sm ${getLabelBg(idx)}`}>
                        {isAnswered && idx === q.correct ? <CheckCircle2 size={14} /> 
                          : isAnswered && idx === selectedOption && idx !== q.correct ? <XCircle size={14} />
                          : optionLabels[idx]}
                      </span>
                      <span className="text-[13px] font-semibold flex-1 leading-snug">{opt}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between min-h-[38px]">
                  {isAnswered ? (
                    <span className={`text-xs font-bold ${
                      selectedOption === q.correct ? 'text-green-600' 
                      : selectedOption === null ? 'text-amber-600' : 'text-rose-600'
                    }`}>
                      {selectedOption === q.correct ? '🎉 Correct!' : selectedOption === null ? "Time is up!" : '❌ Wrong answer'}
                    </span>
                  ) : <div />}

                  {isAnswered && (
                    <button onClick={handleNext}
                      className="flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-full text-xs font-bold transition-all shadow-md shadow-emerald-200 active:scale-95"
                    >
                      {currentQ < quizQuestions.length - 1 ? 'Next' : 'Results'} <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {showResult && (
            <motion.div key="quiz-results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full">
              <div className="bg-white/80 backdrop-blur-md rounded-[20px] p-6 sm:p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] text-center">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <Trophy size={32} />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">Challenge Completed!</h2>
                <p className="text-xs text-slate-500 mb-6 font-medium">You've successfully finished the Life Skills Challenge.</p>

                <div className="bg-slate-50/80 rounded-[16px] p-5 mb-6 border border-slate-200/60 inline-block min-w-[180px]">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Total Score</span>
                  <span className="text-3xl font-black text-emerald-600">{score}</span>
                  <span className="text-[10px] font-bold text-slate-400 block mt-1">out of {quizQuestions.length * 100}</span>
                </div>

                <div className="flex justify-center">
                  <button onClick={handleRestart} className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-full text-xs font-bold transition-all shadow-md shadow-emerald-200 active:scale-95">
                    Play Again
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const LifeSkills = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Learn Skills');

  const lifeSkillsFlashcards = [
    { id: 1, title: 'Cooking Basics', tag: 'Food', desc: 'Learn how to make simple, healthy and delicious meals for you and your family.', icon: <ChefHat size={20} />, content: "Start with simple recipes like boiling eggs, making rice, and preparing a healthy salad. Always wash vegetables before cutting them and never leave a hot stove unattended!" },
    { id: 2, title: 'Money Management', tag: 'Finance', desc: 'Learn how to save money, budget your expenses, and make smart financial decisions.', icon: <Wallet size={20} />, content: "Budgeting helps you track what you earn and what you spend. Always save a portion of your allowance or income for the future. Wants vs Needs is the core of budgeting." },
    { id: 3, title: 'First Aid Essentials', tag: 'Safety', desc: 'Basic first aid skills everyone should know for emergencies.', icon: <Shield size={20} />, content: "Clean a wound with soap and water, apply an antibacterial ointment, and cover it with a bandage. For minor burns, run cool water over it for 10 minutes." },
    { id: 4, title: 'Time Management', tag: 'Productivity', desc: 'Organize your day, set goals, and stop procrastinating.', icon: <Clock size={20} />, content: "Create a daily schedule. Prioritize your most important tasks first (eat the frog!) and take short 5-minute breaks every 30 minutes to stay fresh." },
    { id: 5, title: 'Effective Comm.', tag: 'Social', desc: 'Learn to express your thoughts clearly and listen to others.', icon: <MessageCircle size={20} />, content: "Good communication involves 50% speaking and 50% active listening. Maintain eye contact, don't interrupt, and ask questions to show you are engaged." },
    { id: 6, title: 'Basic Home Repair', tag: 'Maintenance', desc: 'Fix simple things around the house without calling a professional.', icon: <Wrench size={20} />, content: "Learn to tighten a loose screw, change a lightbulb safely (always turn off the switch first!), and unclog a sink using a plunger or baking soda and vinegar." },
    { id: 7, title: 'Digital Literacy', tag: 'Technology', desc: 'Understand internet safety and basic computer hygiene.', icon: <Monitor size={20} />, content: "Never share your passwords with anyone. Always verify the source of emails before clicking any links, and keep your software updated." },
    { id: 8, title: 'Emotional Intel.', tag: 'Mindset', desc: 'Recognize and manage your own emotions and others.', icon: <Smile size={20} />, content: "Pause and take a deep breath before reacting to anger. Try to understand things from the other person’s perspective before jumping to conclusions." },
  ];

  const Flashcard = ({ skill }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
      <div 
        className="relative w-full h-[220px] cursor-pointer group"
        style={{ perspective: '1000px' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div 
          className="w-full h-full relative"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* Front */}
          <div 
            className="absolute inset-0 w-full h-full bg-white rounded-[20px] p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col group-hover:border-emerald-200 transition-colors"
            style={{ backfaceVisibility: 'hidden' }}
          >
             <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-emerald-50 rounded-[12px] flex items-center justify-center text-emerald-600 text-xl shadow-inner">
                 {skill.icon}
               </div>
               <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md uppercase tracking-wider">{skill.tag}</span>
             </div>
             
             <h3 className="text-[15px] font-bold text-slate-900 mb-2 leading-tight">{skill.title}</h3>
             <p className="text-[11px] text-slate-500 font-medium line-clamp-3">{skill.desc}</p>
             
             <div className="mt-auto pt-4 flex items-center justify-between text-[10px] font-bold text-emerald-600">
               <span>Tap to flip</span>
               <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
             </div>
          </div>

          {/* Back */}
          <div 
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-[20px] p-6 shadow-[0_8px_30px_rgb(16,185,129,0.3)] flex flex-col text-white"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
             <h3 className="text-[12px] font-bold mb-3 flex items-center gap-2 text-emerald-100 uppercase tracking-wider">
               <Lightbulb size={14} /> Key Takeaway
             </h3>
             <p className="text-[13px] font-medium leading-relaxed flex-1 overflow-y-auto text-white">
               {skill.content}
             </p>
             <div className="mt-auto pt-2 flex items-center justify-center text-[9px] font-bold text-emerald-200 uppercase tracking-widest">
               Tap to flip back
             </div>
          </div>
        </motion.div>
      </div>
    );
  };

  const quickStats = [
    { label: 'Learn Skills', value: 'Step by step', icon: <Lightbulb className="text-emerald-600" />, color: 'bg-emerald-50' },
    { label: 'Practical Tasks', value: 'Daily habits', icon: <Target className="text-blue-600" />, color: 'bg-blue-50' },
    { label: 'Take Challenges', value: 'Test skills', icon: <Trophy className="text-amber-500" />, color: 'bg-amber-50' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex font-sans text-slate-900 overflow-x-hidden">
      <button
        onClick={() => navigate("/basic-skills")}
        className="fixed top-3 left-3 md:top-5 md:left-5 z-50 w-9 h-9 md:w-10 md:h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:shadow-lg transition-all border border-slate-100 group"
      >
        <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>
      
      {/* Main Content */}
      <main className="flex-1 min-h-screen pb-4 overflow-y-auto">
        <div className="px-4 sm:px-6 md:px-12 2xl:px-20 space-y-6 md:space-y-8 pt-4 2xl:max-w-[1600px] 2xl:mx-auto">

          {/* Hero & Stats Section */}
          <div className="relative">
            {/* Hero Section */}
            <section className="bg-white rounded-[16px] md:rounded-[24px] overflow-hidden relative border border-slate-100 flex items-center min-h-[180px] sm:min-h-[220px] md:min-h-[260px] 2xl:min-h-[320px] pb-4 md:pb-6">
              <div className="relative z-10 p-5 sm:p-0 md:p-2 lg:w-1/2 space-y-3 md:space-y-4">
                 <h1 className="text-[22px] sm:text-[28px] md:text-[36px] lg:text-[42px] 2xl:text-[52px] font-extrabold leading-[1.05] tracking-tight text-[#1e293b]">
                    Learn, Grow & <br /> Live Better with <br />
                    <span className="text-emerald-600">Life Skills</span>
                 </h1>
                 <p className="text-slate-500 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-medium leading-relaxed max-w-sm">
                   Practical lessons and daily habits for an independent life.
                 </p>
                 
                  <div className="pt-2">
                  </div>
              </div>

              <div className="hidden lg:block absolute top-0 right-0 w-[55%] h-full">
                 <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/10 to-transparent z-10" />
                 <img src="/images/life skill/right.png" alt="Life Skills" className="w-full h-auto object-contain object-right" />
              </div>
            </section>

            {/* Quick Stats Row — overlapping hero with negative margin */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 relative z-20 -mt-4 px-4 md:px-12">
              {quickStats.map((stat, i) => {
                const isActive = activeFilter === stat.label;
                return (
                  <div 
                    key={i} 
                    onClick={() => {
                      setActiveFilter(stat.label);
                      const target = document.getElementById("content-section");
                      if(target) target.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`bg-white rounded-[16px] p-3 md:p-4 border ${isActive ? 'border-emerald-500 ring-2 ring-emerald-500/10 shadow-md' : 'border-slate-50 shadow-[0_4px_20px_rgba(0,0,0,0.06)]'} flex items-center gap-3 md:gap-4 hover:shadow-md transition-shadow cursor-pointer group`}
                  >
                     <div className={`w-[44px] h-[44px] ${isActive ? 'bg-emerald-600 text-white' : stat.color} rounded-[12px] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform [&>svg]:w-5 [&>svg]:h-5`}>
                        {React.cloneElement(stat.icon, { className: isActive ? 'text-white' : stat.icon.props.className })}
                     </div>
                     <div>
                        <h4 className={`text-[13px] font-bold leading-tight transition-colors ${isActive ? 'text-emerald-700' : 'text-[#1e1b4b] group-hover:text-emerald-600'}`}>{stat.label}</h4>
                        <p className={`text-[11px] font-medium mt-0.5 ${isActive ? 'text-emerald-600/80' : 'text-slate-500'}`}>{stat.value}</p>
                     </div>
                  </div>
                );
              })}
            </section>
          </div>

          {/* Content Section */}
          <div id="content-section" className="pt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {activeFilter === 'Practical Tasks' && <SkillTasksComponent />}
                {activeFilter === 'Take Challenges' && <QuizComponent />}
                {activeFilter === 'Learn Skills' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
                    {lifeSkillsFlashcards.map(skill => (
                      <Flashcard key={skill.id} skill={skill} />
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </main>


    </div>
  );
};

export default LifeSkills;
