import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, BookOpen, 
  Shield, Trophy, Play, Clock, GraduationCap, FileText, ChevronRight, CheckCircle2, XCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const quizQuestions = [
  {
    question: "You get an email saying you won a lottery. What should you do?",
    options: ["Click the link to claim it", "Reply with your bank details", "Delete it and do not click any links", "Forward it to your friends"],
    correct: 2,
  },
  {
    question: "What makes a strong password?",
    options: ["Your pet's name", "12345678", "A mix of letters, numbers, and symbols", "Your birthdate"],
    correct: 2,
  },
  {
    question: "Someone online asks for your home address to send a free game. What do you do?",
    options: ["Give it to them", "Never share personal info online", "Ask your friends what to do", "Give a fake address"],
    correct: 1,
  },
  {
    question: "What is phishing?",
    options: ["Catching fish in a pond", "A scam to trick you into sharing passwords", "A new video game", "A secure way to chat"],
    correct: 1,
  },
  {
    question: "Why should you update your apps and games?",
    options: ["To make them load slower", "To get new colors", "To fix security bugs and keep hackers out", "To use more storage space"],
    correct: 2,
  },
  {
    question: "You see a pop-up saying your computer has a virus. What should you do?",
    options: ["Call the number on the screen", "Click 'Download Antivirus'", "Close the window and tell an adult", "Buy the suggested software"],
    correct: 2,
  },
  {
    question: "What does 2FA (Two-Factor Authentication) do?",
    options: ["Adds an extra layer of security", "Makes your internet twice as fast", "Logs you in automatically", "Shares your password with two friends"],
    correct: 0,
  },
  {
    question: "Which of these is safe to share on public social media?",
    options: ["Your school name and ID", "Your favorite movie", "Your exact live location", "Your phone number"],
    correct: 1,
  },
  {
    question: "What should you do before downloading a new app?",
    options: ["Check reviews and permissions", "Download it blindly if it looks fun", "Turn off your antivirus", "Share it with everyone"],
    correct: 0,
  },
  {
    question: "A stranger sends you a friend request. What is the best action?",
    options: ["Accept it immediately", "Chat with them first", "Ignore or decline it if you don't know them", "Send them your photo"],
    correct: 2,
  },
];

const optionLabels = ['A', 'B', 'C', 'D'];

const CyberSecurityQuiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0); 
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1); 
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    if (!timerActive || showResult) return;
    if (timeLeft <= 0) { handleTimeout(); return; }
    const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, timerActive, showResult]);

  const handleTimeout = () => {
    setTimerActive(false);
    setIsAnswered(true);
    setStreak(0);
  };

  const handleSelect = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    setTimerActive(false);
    const isCorrect = idx === quizQuestions[currentQ].correct;
    if (isCorrect) {
      const addedPoints = 50 + timeLeft * 3 + streak * 10;
      setScore(prev => prev + addedPoints);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak % 2 === 0) {
        setLevel(prev => Math.min(prev + 1, 10));
      }
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(30);
      setTimerActive(true);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0); setSelectedOption(null); setIsAnswered(false);
    setScore(0); setStreak(0); setLevel(1); setShowResult(false);
    setTimeLeft(30); setTimerActive(true);
  };

  const getOptionStyle = (idx) => {
    if (!isAnswered) return selectedOption === idx 
      ? 'bg-emerald-500/20 border-[#10b981] text-white' 
      : 'bg-[#06241b]/60 border-emerald-500/30 text-white hover:bg-[#093529]/70 hover:border-emerald-400';
    if (idx === quizQuestions[currentQ].correct) return 'bg-[#10b981]/25 border-[#10b981] text-white';
    if (idx === selectedOption) return 'bg-rose-500/20 border-rose-500/70 text-white';
    return 'bg-[#06241b]/30 border-emerald-500/10 text-white/40';
  };

  const getLabelBg = (idx) => {
    if (!isAnswered) return selectedOption === idx ? 'bg-emerald-500' : 'bg-white/10';
    if (idx === quizQuestions[currentQ].correct) return 'bg-[#10b981]';
    if (idx === selectedOption) return 'bg-rose-500';
    return 'bg-white/5';
  };

  const q = quizQuestions[currentQ];
  const progress = ((currentQ + (isAnswered ? 1 : 0)) / quizQuestions.length) * 100;

  return (
    <div className="w-full min-h-[580px] flex items-center justify-center font-sans select-none py-10 px-4 relative rounded-[32px] overflow-hidden shadow-2xl border border-emerald-500/30 my-4">
      {/* High-Tech Cyber Background Picture with Gradient & Mesh Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/cybersecurity/3rd.png" 
          onError={(e) => { e.target.src = '/images/cybersecurity/rhs.png'; }}
          alt="Cyber Security Background" 
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#02140d]/92 via-[#051c14]/85 to-[#010d08]/95 backdrop-blur-[4px]" />
        {/* Cyberpunk Grid & Glow Blobs */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-15" />
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      </div>

      <div className="w-full max-w-[520px] shrink-0 transition-all duration-300 relative z-10 my-auto">
        <AnimatePresence mode="wait">
          {!showResult && (
            <motion.div
              key="active-quiz"
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              <div className="bg-[#051c14]/90 backdrop-blur-2xl border-2 border-emerald-500/50 rounded-[28px] p-6 shadow-[0_0_50px_rgba(16,185,129,0.25)] text-white relative overflow-hidden">
                {/* Subtle top card shine */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-60" />

                {/* Header Row */}
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase flex items-center gap-2">
                    <span>QUESTION {currentQ + 1} / {quizQuestions.length}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                    <span className="text-yellow-400">SCORE: {score}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <div className={`px-2 py-0.5 rounded text-[9px] font-black border ${
                      timeLeft > 10 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse'
                    }`}>
                      ⏱ {timeLeft}s
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-white/10 rounded-full mb-4 overflow-hidden">
                  <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full" />
                </div>

                {/* Question Statement */}
                <h3 className="text-xs lg:text-sm font-bold text-white leading-relaxed mb-4 min-h-[45px]">
                  {q.question}
                </h3>

                {/* Options */}
                <div className="space-y-2">
                  {q.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      disabled={isAnswered}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer font-bold ${getOptionStyle(idx)}`}
                    >
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[9px] font-black shrink-0 text-white transition-all ${getLabelBg(idx)}`}>
                        {isAnswered && idx === q.correct ? <CheckCircle2 size={12} /> 
                          : isAnswered && idx === selectedOption && idx !== q.correct ? <XCircle size={12} />
                          : optionLabels[idx]}
                      </span>
                      <span className="text-xs font-semibold flex-1 leading-snug">{opt}</span>
                    </button>
                  ))}
                </div>

                {/* Footer Row */}
                <div className="mt-4 flex items-center justify-between min-h-[36px]">
                  {isAnswered ? (
                    <span className={`text-[11px] font-black ${
                      selectedOption === q.correct ? 'text-emerald-400' 
                      : selectedOption === null ? 'text-amber-400' : 'text-rose-400'
                    }`}>
                      {selectedOption === q.correct ? ' Correct Answer!' : selectedOption === null ? "Time is up!" : ' Wrong answer'}
                    </span>
                  ) : <div />}

                  {isAnswered && (
                    <button onClick={handleNext}
                      className="flex items-center gap-1.5 px-4.5 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-full text-[10px] font-black tracking-wide uppercase transition-all shadow-[0_0_12px_rgba(16,185,129,0.35)] cursor-pointer active:scale-95"
                    >
                      {currentQ < quizQuestions.length - 1 ? 'NEXT' : 'RESULTS'} <ChevronRight size={12} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {showResult && (
            <motion.div
              key="quiz-results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <div className="bg-[#051c14]/90 backdrop-blur-2xl border-2 border-emerald-500/50 rounded-[28px] p-6 shadow-[0_0_50px_rgba(16,185,129,0.25)] text-center text-white relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-60" />
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-3 shadow-xl shadow-emerald-500/35">🏆</div>
                <h2 className="text-lg font-black text-white mb-1">Challenge Completed!</h2>
                <p className="text-slate-400 text-[10px] font-bold mb-4">Cyber Security Quiz performance:</p>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-[#06241b]/70 rounded-xl p-2.5 border border-emerald-500/20">
                    <div className="text-base font-black text-amber-300">{score}</div>
                    <div className="text-[7px] font-black text-slate-400 uppercase mt-0.5">Score</div>
                  </div>
                  <div className="bg-[#06241b]/70 rounded-xl p-2.5 border border-emerald-500/20">
                    <div className="text-base font-black text-emerald-300">Lv.{level}</div>
                    <div className="text-[7px] font-black text-slate-400 uppercase mt-0.5">Level</div>
                  </div>
                  <div className="bg-[#06241b]/70 rounded-xl p-2.5 border border-emerald-500/20">
                    <div className="text-base font-black text-purple-300">
                      {Math.round((score / (quizQuestions.length * 140)) * 100)}%
                    </div>
                    <div className="text-[7px] font-black text-slate-400 uppercase mt-0.5">Accuracy</div>
                  </div>
                </div>

                <div className="bg-[#06241b]/40 rounded-xl p-2.5 mb-4 border border-emerald-500/10">
                  <p className="text-xs text-slate-300 font-bold leading-relaxed">
                    {score >= 800 ? " Outstanding! You're a certified Cyber Defender!" : "Great job! Try again for a perfect score!"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button onClick={handleRestart}
                    className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-xs font-black transition-all cursor-pointer active:scale-95 shadow-md shadow-emerald-500/25"
                  > Play Again</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const CyberSecurityDashboard = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Core Modules');
  const [selectedItem, setSelectedItem] = useState(null);

  const quickStats = [
    { label: 'Core Modules', value: 'Step-by-step', icon: <Shield className="text-emerald-600" />, color: 'bg-emerald-50' },
    { label: 'Knowledge Base', value: 'Glossary & Tips', icon: <BookOpen className="text-purple-600" />, color: 'bg-purple-50' },
    { label: 'Skill Assessment', value: 'Quizzes & Badges', icon: <Trophy className="text-orange-500" />, color: 'bg-orange-50' },
  ];

  const videos = [
    { id: 1, title: 'What is Phishing?', desc: 'Learn how to spot fake emails and malicious links.', image: '/images/skills/c2.png', duration: '5:30', level: 'Beginner', content: "Imagine someone wearing a mask pretending to be your best friend to take your toys. Phishing is just like that! Bad people send fake emails or messages pretending to be a real company to steal your passwords or secret information. Always double-check before clicking any links!" },
    { id: 2, title: 'Creating Strong Passwords', desc: 'Best practices for robust password creation.', image: '/images/skills/cybert.png', duration: '4:15', level: 'Beginner', content: "Your password is like the magic key to your secret treehouse! If you use '123456' or 'password', anyone can guess it. Make a super strong password by mixing big letters, small letters, numbers, and symbols. Like 'Sp!d3rM@n_2023'." },
    { id: 3, title: 'Safe Browsing Habits', desc: 'Avoid malware and dangerous websites.', image: '/images/skills/c5.png', duration: '6:45', level: 'Intermediate', content: "The internet is a giant playground, but some parts have hidden traps (like malware or bad websites). Only visit websites you trust, and never download anything without asking an adult first. If something looks too good to be true (like 'Free V-Bucks'), it's probably a trap!" },
    { id: 4, title: 'Two-Factor Authentication', desc: 'Add an extra layer of security to your accounts.', image: '/images/skills/c4.png', duration: '3:20', level: 'Beginner', content: "Two-Factor Authentication (2FA) is like having two locks on your front door. First, you need your key (your password). Then, you need a secret code sent to your phone! Even if someone guesses your password, they still can't get in without the secret code." },
  ];

  const articles = [
    { id: 1, title: 'Cyber Security Glossary', desc: 'Definitions for all the common cyber security terms.', content: "Let's learn the secret language of the internet!\n\n• Hacker: Someone who tries to break into computers.\n• Malware: A sick bug for your computer.\n• Firewall: A magical shield that blocks bad internet traffic." },
    { id: 2, title: 'Top 5 Tips for Online Safety', desc: 'A quick checklist to keep yourself safe on the web.', content: "1. Never share your real name or address.\n2. Keep your passwords a secret.\n3. Ask an adult before downloading apps.\n4. Don't talk to strangers online.\n5. Log out when you're done playing." },
    { id: 3, title: 'What to do if you are hacked?', desc: 'Steps to recover your accounts and secure your data.', content: "Oh no! If you think someone is in your account:\n\n1. Don't panic!\n2. Tell a trusted adult (like mom, dad, or a teacher) immediately.\n3. Let them help you change your passwords and scan your device for bugs." },
  ];

  const renderContent = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mt-10 px-4 md:px-12 pb-12"
        >
          {activeFilter === 'Core Modules' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                 <h2 className="text-xl font-extrabold text-slate-900">Video Modules</h2>
                 <button className="text-sm font-bold text-emerald-600 hover:underline">View all</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {videos.map(video => (
                  <div key={video.id} onClick={() => setSelectedItem({ ...video, type: 'video' })} className="bg-white rounded-[20px] overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group">
                    <div className="relative aspect-video bg-slate-100 overflow-hidden">
                       <img src={video.image} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 flex items-center justify-center transition-colors">
                          <div className="w-12 h-12 rounded-full bg-white/90 text-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                             <Play className="ml-1 w-6 h-6 fill-current" />
                          </div>
                       </div>
                       <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-md text-white text-[10px] font-bold flex items-center gap-1">
                          <Clock size={12} /> {video.duration}
                       </div>
                    </div>
                    <div className="p-4">
                       <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md uppercase tracking-wider">Course</span>
                       </div>
                       <h3 className="text-[15px] font-bold text-slate-900 leading-tight mb-1.5 group-hover:text-emerald-600 transition-colors">{video.title}</h3>
                       <p className="text-xs text-slate-500 font-medium line-clamp-2 mb-4">{video.desc}</p>
                       <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                          <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                             <GraduationCap size={14} className="text-emerald-500" /> {video.level}
                          </span>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeFilter === 'Knowledge Base' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                 <h2 className="text-xl font-extrabold text-slate-900">Reading Materials</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                 {articles.map(article => (
                   <div key={article.id} onClick={() => setSelectedItem({ ...article, type: 'article' })} className="bg-white p-5 rounded-[20px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                         <FileText size={20} />
                      </div>
                      <h3 className="text-[15px] font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">{article.title}</h3>
                      <p className="text-xs text-slate-500 font-medium">{article.desc}</p>
                   </div>
                 ))}
              </div>
            </div>
          )}

          {activeFilter === 'Skill Assessment' && (
            <div className="mt-4">
              <CyberSecurityQuiz />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex font-sans text-slate-900 overflow-x-hidden">
      <button
        onClick={() => navigate("/")}
        className="fixed top-5 left-5 z-50 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:shadow-lg transition-all border border-slate-100 group"
      >
        <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>
      
      <main className="flex-1 min-h-screen pb-4 overflow-y-auto">
        <div className="px-6 md:px-12 space-y-8 pt-4">

          <div className="relative">
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
                 </div>
              </div>

              <div className="hidden lg:block absolute top-0 right-0 w-[55%] h-full">
                 <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/40 to-transparent z-10" />
                 <img src="/images/cybersecurity/rhs.png" alt="Cyber Security" className="w-full h-full object-cover object-right-top" />
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 relative z-20 -mt-8 px-4 md:px-12">
              {quickStats.map((stat, i) => {
                const isActive = activeFilter === stat.label;
                return (
                  <div 
                    key={i} 
                    onClick={() => setActiveFilter(stat.label)}
                    className={`bg-white rounded-[16px] p-3 md:p-4 border ${isActive ? 'border-emerald-500 ring-2 ring-emerald-500/10 shadow-md' : 'border-slate-50 shadow-[0_4px_20px_rgba(0,0,0,0.06)]'} flex items-center gap-3 md:gap-4 hover:shadow-md transition-all cursor-pointer group`}
                  >
                     <div className={`w-[44px] h-[44px] ${isActive ? 'bg-emerald-600 text-white' : stat.color} rounded-[12px] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform [&>svg]:w-5 [&>svg]:h-5`}>
                        {React.cloneElement(stat.icon, { className: isActive ? 'text-white' : stat.icon.props.className })}
                     </div>
                     <div>
                        <h4 className={`text-[13px] font-bold leading-tight ${isActive ? 'text-emerald-700' : 'text-[#1e1b4b]'}`}>{stat.label}</h4>
                        <p className={`text-[11px] font-medium mt-0.5 ${isActive ? 'text-emerald-600/80' : 'text-slate-500'}`}>{stat.value}</p>
                     </div>
                  </div>
                );
              })}
            </section>
          </div>
        </div>
        
        <div id="content-section">
          {renderContent()}
        </div>
      </main>

      {/* Pop-up Modal Overlay */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200 transition-colors"
              >
                <XCircle size={20} />
              </button>
              
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                 {selectedItem.type === 'video' ? <Play size={28} className="ml-1" /> : <FileText size={28} />}
              </div>
              
              <h2 className="text-2xl font-black text-slate-900 mb-2">{selectedItem.title}</h2>
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 mt-4">
                 <p className="text-[15px] font-bold text-slate-700 leading-relaxed whitespace-pre-line">
                   {selectedItem.content}
                 </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CyberSecurityDashboard;
