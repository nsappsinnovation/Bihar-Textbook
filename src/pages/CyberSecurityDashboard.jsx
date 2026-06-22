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
      const addedPoints = 10;
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
    <div className="w-full flex justify-center font-sans select-none py-6">
      <div className="w-full max-w-[500px] shrink-0 transition-all duration-300">
        <AnimatePresence mode="wait">
          {!showResult && (
            <motion.div
              key="active-quiz"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <div className="bg-[#051c14]/85 backdrop-blur-xl border-2 border-emerald-500/40 rounded-[24px] p-5 shadow-[0_0_35px_rgba(0,0,0,0.6)] text-white">

                {/* Header Row */}
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase flex items-center gap-2">
                    <span>QUESTION {currentQ + 1} / {quizQuestions.length}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                    <span className="text-yellow-400">SCORE: {score}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <div className={`px-2 py-0.5 rounded text-[9px] font-black border flex items-center gap-1 ${timeLeft > 10
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse'
                      }`}>
                      <Clock size={10} /> {timeLeft}s
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
                    <span className={`text-[11px] font-black ${selectedOption === q.correct ? 'text-emerald-400'
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
              <div className="bg-[#051c14]/85 backdrop-blur-xl border-2 border-emerald-500/40 rounded-[24px] p-5 shadow-[0_0_35px_rgba(0,0,0,0.6)] text-center text-white">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-xl shadow-emerald-500/35">
                  <Trophy size={28} className="text-white" />
                </div>
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
                      {Math.round((score / (quizQuestions.length * 10)) * 100)}%
                    </div>
                    <div className="text-[7px] font-black text-slate-400 uppercase mt-0.5">Accuracy</div>
                  </div>
                </div>

                <div className="bg-[#06241b]/40 rounded-xl p-2.5 mb-4 border border-emerald-500/10">
                  <p className="text-xs text-slate-355 font-bold leading-relaxed">
                    {score >= 80 ? " Outstanding! You're a certified Cyber Defender!" : "Great job! Try again for a perfect score!"}
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

  // Prevent background scrolling when a cyber module modal is open
  useEffect(() => {
    if (selectedItem) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY, 10) * -1);
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [selectedItem]);

  const quickStats = [
    { label: 'Core Modules', value: 'Step-by-step', icon: <Shield className="text-emerald-600" />, color: 'bg-emerald-50' },
    { label: 'Knowledge Base', value: 'Glossary & Tips', icon: <BookOpen className="text-purple-600" />, color: 'bg-purple-50' },
    { label: 'Skill Assessment', value: 'Quizzes & Badges', icon: <Trophy className="text-orange-500" />, color: 'bg-orange-50' },
  ];

  const videos = [
    { id: 1, title: 'UPI Link Scams', desc: 'Learn how UPI frauds happen and how to protect your bank account.', image: 'https://img.youtube.com/vi/_BCqh-fgyys/hqdefault.jpg', duration: '5:30', level: 'Beginner', videoLink: 'https://www.youtube.com/embed/_BCqh-fgyys?si=KgvwfwaL-rH08Oxi', content: "A UPI Link Scam is a dangerous online fraud where scammers trick you into clicking unverified payment links.\n\nRemember the golden rule: You only need to enter your UPI PIN to SEND money, never to RECEIVE money. Always verify the sender's identity before interacting with any unexpected payment requests!" },
    { id: 2, title: 'Cyber Scam Recovery Guide', desc: 'How the 1930 Cyber Crime Helpline works.', image: 'https://img.youtube.com/vi/kidogsgTjK4/hqdefault.jpg', duration: '4:15', level: 'Beginner', videoLink: 'https://www.youtube.com/embed/kidogsgTjK4?si=kLplSkTFUSonF48l', content: "Got scammed? Don't panic! The 1930 Cyber Crime Helpline is specifically designed to help victims freeze stolen funds quickly. Learn exactly how to report financial frauds and the critical steps you must take within the first 24 hours to maximize your chances of recovering your money." },
    { id: 3, title: 'Scam Warning Signs', desc: '5 warning signs before a scam happens.', image: 'https://img.youtube.com/vi/mge4NBbDzKI/hqdefault.jpg', duration: '6:45', level: 'Intermediate', videoLink: 'https://www.youtube.com/embed/mge4NBbDzKI?si=9rG0Z-_QznNe15_-', content: "Cyber scams don't happen out of nowhere. There are always subtle warning signs! From urgent 'act now' messages to requests for secretive actions or strange payment methods. Recognizing these 5 red flags can stop you from falling into a hacker's trap before the damage is done." },
    { id: 4, title: 'UPI Request Scams', desc: 'Why accepting a UPI request can empty your account.', image: 'https://img.youtube.com/vi/RzyT482pt3M/hqdefault.jpg', duration: '3:20', level: 'Beginner', videoLink: 'https://www.youtube.com/embed/RzyT482pt3M?si=03bPYO14pz8wKg9V', content: "Many people mistakenly accept 'UPI Payment Requests' thinking they are receiving money. This is a massive trap! Approving a request means YOU are authorizing money to leave your account. Always read the screen carefully: if it asks for a PIN, you are paying, not receiving!" },
    { id: 5, title: 'OTP Scam Explained', desc: 'The dangers of sharing your One-Time Password.', image: 'https://img.youtube.com/vi/Em5qm5dQZxQ/hqdefault.jpg', duration: '5:10', level: 'Beginner', videoLink: 'https://www.youtube.com/embed/Em5qm5dQZxQ?si=t1Qd6Li5VpHPl--b', content: "OTPs are your final line of defense. Scammers use fake calls posing as bank reps, delivery agents, or lottery officials to trick you into sharing your OTP. Sharing it gives them instant access to your funds. Remember: Banks never call you to ask for your OTP!" },
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
        onClick={() => navigate("/cyber-security")}
        className="fixed top-5 left-5 z-50 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:shadow-lg transition-all border border-slate-100 group"
      >
        <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <main className={`flex-1 min-h-screen pb-4 ${selectedItem ? 'overflow-hidden' : 'overflow-y-auto'}`}>
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
                  <button
                    onClick={() => {
                      const target = document.getElementById("content-section");
                      if (target) target.scrollIntoView({ behavior: 'smooth' });
                    }}
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
            data-lenis-prevent
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-[32px] max-w-5xl w-[95%] shadow-2xl relative overflow-hidden flex flex-col lg:flex-row max-h-[90vh] lg:min-h-[550px] border border-slate-100"
              onClick={e => e.stopPropagation()}
            >
              {/* Floating Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors cursor-pointer"
              >
                <XCircle size={22} strokeWidth={2} />
              </button>

              {/* Left Side: Video Section */}
              {selectedItem.type === 'video' && selectedItem.videoLink ? (
                <div className="w-full lg:w-[60%] bg-black shrink-0 relative flex flex-col">
                  {/* Container that forces aspect ratio on mobile but fills height on desktop */}
                  <div className="w-full aspect-video lg:aspect-auto lg:h-full lg:absolute lg:inset-0">
                    <iframe
                      className="w-full h-full absolute inset-0"
                      src={`${selectedItem.videoLink}&autoplay=1`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              ) : (
                <div className="w-full lg:w-[60%] h-64 lg:h-auto bg-gradient-to-r from-emerald-500 to-teal-500 shrink-0 flex items-center justify-center relative">
                  <FileText size={64} className="text-white/30" />
                </div>
              )}
              
              {/* Right Side: Title and Content Section */}
              <div className="w-full lg:w-[40%] flex-1 bg-white flex flex-col overflow-hidden relative">
                {/* Offset Scrollable Area to keep scrollbar away from rounded corners */}
                <div 
                  data-lenis-prevent
                  className="flex-grow overflow-y-auto custom-modal-scrollbar my-6 mr-3 ml-6 lg:ml-8"
                >
                  <div className="pr-4 pb-2 mt-4 lg:mt-0">
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-700 flex items-center gap-1.5">
                        {selectedItem.type === 'video' ? <><Play size={12} fill="currentColor" /> VIDEO MODULE</> : <><FileText size={12} fill="currentColor" /> READING MATERIAL</>}
                      </span>
                      {selectedItem.duration && <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500"><Clock size={14} /> {selectedItem.duration}</span>}
                    </div>
                    
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-6 leading-tight pr-4">
                      {selectedItem.title}
                    </h2>
                    
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                      <h3 className="text-sm font-black text-slate-800 mb-4 flex items-center gap-2 uppercase tracking-wide">
                         <Shield className="text-emerald-500" size={18}/>
                         Lesson Details
                      </h3>
                      <p className="text-sm font-medium text-slate-700 leading-relaxed whitespace-pre-line">
                        {selectedItem.content}
                      </p>
                    </div>
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

export default CyberSecurityDashboard;
