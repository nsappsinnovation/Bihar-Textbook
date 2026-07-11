import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, BookOpen, Clock, 
  Brain, Lightbulb, Cpu, Trophy, CheckCircle2, 
  Play, GraduationCap, XCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const toolsCategories = [
  { id: 'All', label: 'All Tools'},
  { id: 'Indian AI', label: 'Indian AI' },
  { id: 'Writing', label: 'Writing' },
  { id: 'Image', label: 'Image' },
  { id: 'Voice', label: 'Voice' },
  { id: 'Learning', label: 'Learning'},
  { id: 'Productivity', label: 'Productivity' }
];

const toolsDataList = [
  { name: 'Sarvam AI', tag: 'Indic Voice & AI', desc: 'India’s foundational AI platform specialized in Indian languages, voice AI, and localized generative models.', icon: '🪄', color: 'bg-orange-50 text-orange-600', iconBg: 'bg-orange-100 text-orange-600', categories: ['Indian AI', 'Voice', 'Writing', 'Learning'] },
  { name: 'BharatGPT', tag: 'Multilingual AI', desc: 'India’s indigenous conversational AI assistant supporting 14+ Indian languages with voice and text capabilities.', icon: '🇮🇳', color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100 text-purple-600', categories: ['Indian AI', 'Writing', 'Learning', 'Productivity'] },
  { name: 'ChatGPT', tag: 'Writing Assistant', desc: 'AI chatbot that helps answer questions, write content, and explain ideas.', icon: '💬', color: 'bg-emerald-50 text-emerald-600', iconBg: 'bg-emerald-100 text-emerald-600', categories: ['Writing', 'Learning'] },
  { name: 'Google Gemini', tag: 'Learning Assistant', desc: 'AI assistant by Google that helps with writing, learning, and exploring ideas.', icon: '✨', color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100 text-purple-600', categories: ['Writing', 'Learning', 'Productivity'] },
  { name: 'Krutrim AI', tag: 'Indic LLM Platform', desc: 'India’s AI platform building multilingual foundational models and generative AI for Indian contexts.', icon: '⚡', color: 'bg-emerald-50 text-emerald-600', iconBg: 'bg-emerald-100 text-emerald-600', categories: ['Indian AI', 'Writing', 'Learning', 'Productivity'] },
  { name: 'Bhashini AI', tag: 'Indic Translation', desc: 'National AI platform breaking language barriers with speech-to-speech and text translation across Indian languages.', icon: '🗣️', color: 'bg-blue-50 text-blue-600', iconBg: 'bg-blue-100 text-blue-600', categories: ['Indian AI', 'Voice', 'Learning', 'Productivity'] },
  { name: 'Canva AI', tag: 'Image Creator', desc: 'AI design tool that helps create posters, presentations, and images easily.', icon: '🎨', color: 'bg-cyan-50 text-cyan-600', iconBg: 'bg-cyan-100 text-cyan-600', categories: ['Image', 'Productivity'] },
  { name: 'Project Indus', tag: 'Hindi & Dialect LLM', desc: 'A foundational Indian language model built specifically for Hindi and Indian regional dialects to democratize AI.', icon: '🧠', color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100 text-purple-600', categories: ['Indian AI', 'Learning', 'Writing'] },
  { name: 'QuillBot', tag: 'Writing Helper', desc: 'AI writing tool that helps paraphrase, summarize, and improve your writing.', icon: '🤖', color: 'bg-teal-50 text-teal-600', iconBg: 'bg-teal-100 text-teal-600', categories: ['Writing'] },
  { name: 'KissanAI', tag: 'Agri AI Assistant', desc: 'Multilingual AI voice and text assistant providing real-time agricultural advice and farming guidance in regional languages.', icon: '🌾', color: 'bg-teal-50 text-teal-600', iconBg: 'bg-teal-100 text-teal-600', categories: ['Indian AI', 'Voice', 'Productivity'] },
  { name: 'ElevenLabs', tag: 'Voice AI', desc: 'AI voice tool that converts text into natural-sounding speech.', icon: '🔊', color: 'bg-pink-50 text-pink-600', iconBg: 'bg-pink-100 text-pink-600', categories: ['Voice'] },
  { name: 'DeepL', tag: 'Translation', desc: 'AI tool that helps translate text more accurately and naturally.', icon: '🌐', color: 'bg-blue-50 text-blue-600', iconBg: 'bg-blue-100 text-blue-600', categories: ['Writing', 'Productivity'] }
];

const quizQuestions = [
  { question: "You want to write a superhero story — which AI tool will help you?", options: ["Calculator app", "AI Story Writer", "Paint app", "Camera"], correct: 1 },
  { question: "How does a self-driving car recognize traffic lights?", options: ["The driver tells it", "Computer Vision (AI eyes)", "Using GPS", "By honking"], correct: 1 },
  { question: "When you talk to Google Assistant, which AI technology does it use?", options: ["Computer Vision", "Data Science", "Natural Language Processing (NLP)", "Robotics"], correct: 2 },
  { question: "What do you need to give AI to create a cartoon character?", options: ["Your photo", "A good prompt or description", "Money", "Phone number"], correct: 1 },
  { question: "What can we do with Data Science?", options: ["Cook food", "Predict exam scores", "Sing songs", "Play cricket"], correct: 1 },
  { question: "What is a 'neural network' in Deep Learning?", options: ["Internet network", "Tiny thinking bulbs inside a computer", "WiFi signal", "Electric wire"], correct: 1 },
  { question: "What does a Chatbot do?", options: ["Takes photos", "Answers your questions", "Downloads games", "Makes videos"], correct: 1 },
  { question: "What does an AI Presentation maker do?", options: ["Creates slides automatically", "Prints from a printer", "Sends emails", "Nothing"], correct: 0 },
  { question: "What does AI learn in the Vision Lab?", options: ["Dancing", "Recognizing objects in photos", "Singing", "Handwriting"], correct: 1 },
  { question: "If you want to make a graph of your class marks, which AI topic will help?", options: ["Create with AI", "Chat with AI", "Fun with Data", "Meet AI Robots"], correct: 2 },
];
const optionLabels = ['A', 'B', 'C', 'D'];

const ExploreToolsComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const filteredTools = selectedCategory === 'All' ? toolsDataList : toolsDataList.filter(t => t.categories.includes(selectedCategory));

  return (
    <div className="bg-white rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Explore AI Tools</h2>
          
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {toolsCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-200'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{cat.icon}</span> <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTools.map(tool => (
          <div key={tool.name} className="p-5 rounded-[20px] border border-slate-100 bg-white hover:border-purple-200 hover:shadow-lg transition-all group cursor-pointer relative">
           
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center text-2xl ${tool.iconBg}`}>
                {tool.icon}
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors">{tool.name}</h4>
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
      ? 'bg-orange-50 border-orange-500 text-orange-700' 
      : 'bg-white border-slate-200 text-slate-700 hover:border-orange-300 hover:bg-orange-50/50';
    if (idx === quizQuestions[currentQ].correct) return 'bg-emerald-50 border-emerald-500 text-emerald-700';
    if (idx === selectedOption) return 'bg-rose-50 border-rose-500 text-rose-700';
    return 'bg-slate-50 border-slate-100 text-slate-400';
  };

  const getLabelBg = (idx) => {
    if (!isAnswered) return selectedOption === idx ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-500';
    if (idx === quizQuestions[currentQ].correct) return 'bg-emerald-500 text-white';
    if (idx === selectedOption) return 'bg-rose-500 text-white';
    return 'bg-slate-200 text-slate-400';
  };

  const q = quizQuestions[currentQ];
  const progress = ((currentQ + (isAnswered ? 1 : 0)) / quizQuestions.length) * 100;

  return (
    <div className="w-full flex justify-center py-8 relative rounded-[24px] overflow-hidden border border-slate-100">
      {/* Background Image with translucent overlay */}
      <div className="absolute inset-0 z-0">
        <img src="/images/ai/challenge.png" alt="Quiz Background" className="w-full h-full object-cover opacity-100" />
        
      </div>

      <div className="w-full max-w-[450px] shrink-0 transition-all duration-300 relative z-10 px-4">
        <AnimatePresence mode="wait">
          {!showResult && (
            <motion.div key="active-quiz" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full">
              <div className="bg-white/20 backdrop-blur-xl rounded-[20px] p-5 sm:p-6 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shadow-inner">
                      <Brain size={16} />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">Question {currentQ + 1}/{quizQuestions.length}</h3>
                      <p className="text-[10px] font-bold text-slate-400">AI Knowledge Test</p>
                    </div>
                  </div>
                  <div className="bg-slate-50/80 px-3 py-1.5 rounded-lg border border-slate-200/60 text-center">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Score</span>
                    <span className="text-sm font-black text-orange-600 leading-none">{score}</span>
                  </div>
                </div>

                <div className="w-full h-1 bg-slate-100 rounded-full mb-5 overflow-hidden">
                  <motion.div animate={{ width: `${progress}%` }} className="h-full bg-orange-500 rounded-full" />
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
                      selectedOption === q.correct ? 'text-emerald-600' 
                      : selectedOption === null ? 'text-amber-600' : 'text-rose-600'
                    }`}>
                      {selectedOption === q.correct ? '🎉 Correct!' : selectedOption === null ? "Time is up!" : '❌ Wrong answer'}
                    </span>
                  ) : <div />}

                  {isAnswered && (
                    <button onClick={handleNext}
                      className="flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full text-xs font-bold transition-all shadow-md shadow-orange-200 active:scale-95"
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
              <div className="bg-white/20 backdrop-blur-xl rounded-[20px] p-6 sm:p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] text-center">
                <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <Trophy size={32} />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">Challenge Completed!</h2>
                <p className="text-xs text-slate-800 mb-6 font-medium">You've successfully finished the AI Knowledge Challenge.</p>

                <div className="bg-slate-50/80 rounded-[16px] p-5 mb-6 border border-slate-200/60 inline-block min-w-[180px]">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Total Score</span>
                  <span className="text-3xl font-black text-orange-600">{score}</span>
                  <span className="text-[10px] font-bold text-slate-400 block mt-1">out of {quizQuestions.length * 100}</span>
                </div>

                <div className="flex justify-center">
                  <button onClick={handleRestart} className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full text-xs font-bold transition-all shadow-md shadow-orange-200 active:scale-95">
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

const AiIntelligenceDashboard = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Learn Concepts');
  const [selectedItem, setSelectedItem] = useState(null);

  const aiVideos = [
    { id: 1, title: 'What is Artificial Intelligence?', desc: 'A simple introduction to what AI is and how it helps us.', image: '/images/ai/rhs.png', duration: '4:20', level: 'Beginner', content: "Artificial Intelligence is like giving a computer a brain! It helps computers learn how to see, talk, and solve problems just like humans do." },
    { id: 2, title: 'How do Robots Learn?', desc: 'Discover how machines are trained with data.', image: '/images/ai/challenge.png', duration: '5:15', level: 'Beginner', content: "Just like you learn by reading books, robots learn by looking at lots of data (like pictures or text). The more data they see, the smarter they get!" },
    { id: 3, title: 'Computer Vision Magic', desc: 'Learn how computers can see and recognize objects.', image: '/images/ai/rhs.png', duration: '6:10', level: 'Intermediate', content: "Computer Vision is when AI uses cameras to understand what it's looking at. It can recognize dogs, cats, faces, and even read traffic signs!" },
    { id: 4, title: 'Talking to AI (Chatbots)', desc: 'Understand how AI can chat and answer questions.', image: '/images/ai/challenge.png', duration: '3:45', level: 'Beginner', content: "Chatbots use something called Natural Language Processing (NLP) to understand what you type or say, and then they figure out the best way to reply to you!" },
  ];

  const quickStats = [
    { label: 'Learn Concepts', value: 'Step by step', icon: <Lightbulb className="text-blue-600" />, color: 'bg-blue-50' },
    { label: 'Explore Tools', value: 'AI tools', icon: <Cpu className="text-purple-600" />, color: 'bg-purple-50' },
    { label: 'Take Challenges', value: 'Test skills', icon: <Trophy className="text-orange-500" />, color: 'bg-orange-50' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex font-sans text-slate-900 overflow-x-hidden">
      <button
        onClick={() => navigate("/")}
        className="fixed top-3 left-3 md:top-5 md:left-5 z-50 w-9 h-9 md:w-10 md:h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-green-600 hover:shadow-lg transition-all border border-slate-100 group"
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
                 <h1 className="text-[22px] sm:text-[28px] md:text-[36px] lg:text-[42px] 2xl:text-[52px] font-extrabold leading-[1.05] tracking-tight text-[#1e293b]">
                    Build. Learn. &amp; <br /> Think Smarter with <br />
                    <span className="text-purple-600">AI Intelligence</span>
                 </h1>
                 <p className="text-slate-500 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-medium leading-relaxed max-w-sm">
                   Your AI-powered learning hub for skills and knowledge.
                 </p>
                 
                 <div className="pt-2">
                 </div>
              </div>

              <div className="hidden lg:block absolute top-0 right-0 w-[55%] h-full">
                 <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
                 <img src="/images/ai/rhs.png" alt="AI Intelligence" className="w-full h-full object-cover object-right-top" />
              </div>
            </section>

            {/* Quick Stats Row — overlapping hero with negative margin */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 relative z-20 -mt-8 px-4 md:px-12">
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
                    className={`bg-white rounded-[16px] p-3 md:p-4 border ${isActive ? 'border-purple-500 ring-2 ring-purple-500/10 shadow-md' : 'border-slate-50 shadow-[0_4px_20px_rgba(0,0,0,0.06)]'} flex items-center gap-3 md:gap-4 hover:shadow-md transition-shadow cursor-pointer group`}
                  >
                     <div className={`w-[44px] h-[44px] ${isActive ? 'bg-purple-600 text-white' : stat.color} rounded-[12px] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform [&>svg]:w-5 [&>svg]:h-5`}>
                        {React.cloneElement(stat.icon, { className: isActive ? 'text-white' : stat.icon.props.className })}
                     </div>
                     <div>
                        <h4 className={`text-[13px] font-bold leading-tight transition-colors ${isActive ? 'text-purple-700' : 'text-[#1e1b4b] group-hover:text-purple-600'}`}>{stat.label}</h4>
                        <p className={`text-[11px] font-medium mt-0.5 ${isActive ? 'text-purple-600/80' : 'text-slate-500'}`}>{stat.value}</p>
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
                {activeFilter === 'Explore Tools' && <ExploreToolsComponent />}
                {activeFilter === 'Take Challenges' && <QuizComponent />}
                {activeFilter === 'Learn Concepts' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {aiVideos.map(video => (
                      <div key={video.id} onClick={() => setSelectedItem({ ...video, type: 'video' })} className="bg-white rounded-[20px] overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group">
                        <div className="relative aspect-video bg-slate-100 overflow-hidden">
                           <img src={video.image} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                           <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 flex items-center justify-center transition-colors">
                              <div className="w-12 h-12 rounded-full bg-white/90 text-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                 <Play className="ml-1 w-6 h-6 fill-current" />
                              </div>
                           </div>
                           <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-md text-white text-[10px] font-bold flex items-center gap-1">
                              <Clock size={12} /> {video.duration}
                           </div>
                        </div>
                        <div className="p-4">
                           <div className="flex items-center gap-2 mb-2">
                              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-wider">Lesson</span>
                           </div>
                           <h3 className="text-[15px] font-bold text-slate-900 leading-tight mb-1.5 group-hover:text-blue-600 transition-colors">{video.title}</h3>
                           <p className="text-xs text-slate-500 font-medium line-clamp-2 mb-4">{video.desc}</p>
                           <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                              <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                                 <GraduationCap size={14} className="text-blue-500" /> {video.level}
                              </span>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </main>

      {/* Video Content Modal */}
      <AnimatePresence>
        {selectedItem && selectedItem.type === 'video' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div 
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setSelectedItem(null)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[24px] overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
            >
              <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Play size={20} className="fill-current" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight pr-8">{selectedItem.title}</h2>
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-500 mt-1">
                      <span className="flex items-center gap-1"><Clock size={14} /> {selectedItem.duration}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span className="text-blue-600">{selectedItem.level}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 sm:top-6 right-4 sm:right-6 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 flex items-center justify-center transition-colors"
                >
                  <XCircle size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="w-full aspect-video bg-slate-900 relative group">
                  <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 cursor-pointer hover:scale-110 hover:bg-blue-600 transition-all">
                      <Play className="ml-1.5 w-8 h-8 fill-current" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4">
                    <div className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                      <div className="h-full w-1/3 bg-blue-500 rounded-full" />
                    </div>
                    <span className="text-xs text-white font-medium font-mono text-shadow">01:23 / {selectedItem.duration}</span>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <BookOpen size={20} className="text-blue-500" /> Lesson Summary
                  </h3>
                  <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed">
                    <p>{selectedItem.content}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AiIntelligenceDashboard;
