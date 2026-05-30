import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Trophy, Star, BookOpen, HelpCircle, 
  Award, Brain, ChevronRight, CheckCircle2, XCircle, Zap, Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Quiz Questions Data — Fun, kid-friendly questions across all 5 AI topics
const quizQuestions = [
  {
    question: "You want to write a superhero story — which AI tool will help you?",
    options: ["Calculator app", "AI Story Writer", "Paint app", "Camera"],
    correct: 1,
  },
  {
    question: "How does a self-driving car recognize traffic lights?",
    options: ["The driver tells it", "Computer Vision (AI eyes)", "Using GPS", "By honking"],
    correct: 1,
  },
  {
    question: "When you talk to Google Assistant, which AI technology does it use?",
    options: ["Computer Vision", "Data Science", "Natural Language Processing (NLP)", "Robotics"],
    correct: 2,
  },
  {
    question: "What do you need to give AI to create a cartoon character?",
    options: ["Your photo", "A good prompt or description", "Money", "Phone number"],
    correct: 1,
  },
  {
    question: "What can we do with Data Science?",
    options: ["Cook food", "Predict exam scores", "Sing songs", "Play cricket"],
    correct: 1,
  },
  {
    question: "What is a 'neural network' in Deep Learning?",
    options: ["Internet network", "Tiny thinking bulbs inside a computer", "WiFi signal", "Electric wire"],
    correct: 1,
  },
  {
    question: "What does a Chatbot do?",
    options: ["Takes photos", "Answers your questions", "Downloads games", "Makes videos"],
    correct: 1,
  },
  {
    question: "What does an AI Presentation maker do?",
    options: ["Creates slides automatically", "Prints from a printer", "Sends emails", "Nothing"],
    correct: 0,
  },
  {
    question: "What does AI learn in the Vision Lab?",
    options: ["Dancing", "Recognizing objects in photos", "Singing", "Handwriting"],
    correct: 1,
  },
  {
    question: "If you want to make a graph of your class marks, which AI topic will help?",
    options: ["Create with AI", "Chat with AI", "Fun with Data", "Meet AI Robots"],
    correct: 2,
  },
];

const optionLabels = ['A', 'B', 'C', 'D'];

const AiQuizChallenge = () => {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(850); 
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(3); 
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(true);
  const [activeTab, setActiveTab] = useState('quiz'); // 'quiz', 'leaderboard', 'badges'

  // Timer countdown
  useEffect(() => {
    if (!timerActive || showResult || activeTab !== 'quiz') return;
    if (timeLeft <= 0) { handleTimeout(); return; }
    const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, timerActive, showResult, activeTab]);

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
    setScore(850); setStreak(0); setLevel(3); setShowResult(false);
    setTimeLeft(30); setTimerActive(true); setActiveTab('quiz');
  };

  const getOptionStyle = (idx) => {
    if (!isAnswered) return selectedOption === idx 
      ? 'bg-blue-500/20 border-[#10b981] text-white' 
      : 'bg-[#0d1f42]/60 border-blue-500/30 text-white hover:bg-[#122b5c]/70 hover:border-blue-400';
    if (idx === quizQuestions[currentQ].correct) return 'bg-[#10b981]/25 border-[#10b981] text-white';
    if (idx === selectedOption) return 'bg-rose-500/20 border-rose-500/70 text-white';
    return 'bg-[#0d1f42]/30 border-blue-500/10 text-white/40';
  };

  const getLabelBg = (idx) => {
    if (!isAnswered) return selectedOption === idx ? 'bg-blue-500' : 'bg-white/10';
    if (idx === quizQuestions[currentQ].correct) return 'bg-[#10b981]';
    if (idx === selectedOption) return 'bg-rose-500';
    return 'bg-white/5';
  };

  const q = quizQuestions[currentQ];
  const progress = ((currentQ + (isAnswered ? 1 : 0)) / quizQuestions.length) * 100;

  // Real-time Leaderboard generation based on the live score state
  const getLeaderboardData = () => {
    const initialPlayers = [
      { name: 'Aarav Sharma', score: 1120, active: false },
      { name: 'Sneha Kumari', score: 960, active: false },
      { name: 'Priya Raj', score: 810, active: false },
      { name: 'Aditya Singh', score: 740, active: false }
    ];

    const playersList = [
      ...initialPlayers,
      { name: 'Aman Kumar (You)', score: score, active: true }
    ];

    playersList.sort((a, b) => b.score - a.score);

    return playersList.map((player, index) => {
      const rank = index + 1;
      let badge = '⭐';
      if (rank === 1) badge = '🥇';
      else if (rank === 2) badge = '🥈';
      else if (rank === 3) badge = '🥉';
      return { ...player, rank, badge };
    });
  };

  const getBadgesData = () => {
    return [
      { title: 'Prompt Master', desc: 'Reach Level 4', icon: '✍️', unlocked: level >= 4 },
      { title: 'Storyteller', desc: 'Answer 3 Questions', icon: '📖', unlocked: currentQ >= 3 },
      { title: 'Comic Artist', desc: 'Get 3 Streak Answers', icon: '🎭', unlocked: streak >= 3 },
      { title: 'Top Quizzer', desc: 'Score 1000+ XP', icon: '🧠', unlocked: score >= 1000 }
    ];
  };

  const leaderboardData = getLeaderboardData();
  const badgesData = getBadgesData();

  return (
    <div className="min-h-screen w-screen overflow-x-hidden overflow-y-auto lg:overflow-hidden relative font-sans select-none bg-[#0b1528]">
      {/* Full BG Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/ai/challenge.png')" }}
      />
      {/* Ambient gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-slate-950/20 to-slate-950/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/60" />

      {/* Main Container */}
      <div className="relative z-10 min-h-screen lg:h-full w-full flex flex-col justify-between p-3 sm:p-4 md:p-6 lg:p-8">

        {/* ──── HEADER AREA ──── */}
        <header className="w-full flex flex-col md:flex-row items-center justify-between shrink-0 gap-4">
          
          {/* Left: Score & Level Cards */}
          <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 w-full md:w-auto">
            {/* Back Button */}
            <button
              onClick={() => navigate('/ai-intelligence-dashboard')}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-[#071330]/80 backdrop-blur-md rounded-full flex items-center justify-center text-white/80 hover:bg-white/10 transition-all border border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.2)] shrink-0"
            >
              <ArrowLeft size={16} />
            </button>

            {/* Score Card */}
            <div className="bg-[#071330]/80 backdrop-blur-md border border-blue-500/30 rounded-xl sm:rounded-2xl p-1.5 px-3 sm:p-2 sm:px-4 flex items-center gap-2 sm:gap-3 shadow-[0_0_15px_rgba(59,130,246,0.15)] min-w-[90px] sm:min-w-[110px]">
              <Trophy className="w-5 h-5 sm:w-7 sm:h-7 text-yellow-400 fill-yellow-400/20" />
              <div className="flex flex-col">
                <span className="text-[8px] sm:text-[9px] font-black text-slate-400 tracking-wider uppercase">Score</span>
                <span className="text-sm sm:text-base font-black text-white leading-none mt-0.5">{score}</span>
              </div>
            </div>

            {/* Level Card */}
            <div className="bg-[#071330]/80 backdrop-blur-md border border-blue-500/30 rounded-xl sm:rounded-2xl p-1.5 px-3 sm:p-2 sm:px-4 flex items-center gap-2 sm:gap-3 shadow-[0_0_15px_rgba(59,130,246,0.15)] min-w-[80px] sm:min-w-[100px]">
              <Star className="w-5 h-5 sm:w-7 sm:h-7 text-yellow-400 fill-yellow-400" />
              <div className="flex flex-col">
                <span className="text-[8px] sm:text-[9px] font-black text-slate-400 tracking-wider uppercase">Level</span>
                <span className="text-sm sm:text-base font-black text-white leading-none mt-0.5">{level}</span>
              </div>
            </div>
          </div>

          {/* Center: Title & Subtitle */}
          <div className="text-center flex flex-col items-center w-full md:w-auto">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-none">
              AI QUIZ
            </h1>
            <h2 className="text-sm sm:text-lg lg:text-xl font-extrabold text-cyan-400 tracking-[0.2em] leading-none mt-1">
              CHALLENGE
            </h2>
          </div>

          {/* Right: Round Menu Tabs (Fully Functional) */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 w-full md:w-auto">
            {[
              
              { id: 'quiz', label: 'Quiz', icon: <HelpCircle className="w-4 h-4 text-blue-400" /> },
              { id: 'leaderboard', label: 'Leaderboard', icon: <Trophy className="w-4 h-4 text-yellow-400" /> },
              { id: 'badges', label: 'Badges', icon: <Award className="w-4 h-4 text-amber-500" /> }
            ].map((tab, idx) => (
              <button 
                key={idx} 
                onClick={() => {
                  if (tab.action) {
                    tab.action();
                  } else {
                    setActiveTab(tab.id);
                    if (tab.id === 'quiz' && showResult) {
                      handleRestart();
                    }
                  }
                }}
                className="flex flex-col items-center gap-1 group cursor-pointer focus:outline-none"
              >
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#071330]/80 backdrop-blur-md border transition-all group-hover:scale-105 flex items-center justify-center ${
                  activeTab === tab.id 
                    ? 'border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)] bg-cyan-950/40' 
                    : 'border-blue-500/25'
                }`}>
                  {tab.icon}
                </div>
                <span className={`text-[8px] font-black tracking-wider uppercase transition-colors ${
                  activeTab === tab.id ? 'text-cyan-300' : 'text-slate-355'
                }`}>{tab.label}</span>
              </button>
            ))}
          </div>

        </header>

        <div className="flex-1 w-full flex items-center mt-6 mb-6 justify-center lg:justify-end pr-0 lg:pr-8 xl:pr-16">
          
          {/* Content Card Wrapper */}
          <div className="w-full max-w-[370px] sm:max-w-[420px] lg:max-w-[390px] shrink-0 transition-all duration-300">
            <AnimatePresence mode="wait">
              

              {/* QUIZ TAB PANEL */}
              {activeTab === 'quiz' && !showResult && (
                <motion.div
                  key="active-quiz"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.2 }}
                  className="w-full"
                >
                  <div className="bg-[#061533]/85 backdrop-blur-xl border-2 border-blue-500/40 rounded-[24px] p-5 shadow-[0_0_35px_rgba(0,0,0,0.6)] text-white">
                    
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase">
                        QUESTION {currentQ + 1} / {quizQuestions.length}
                      </span>
                      <div className="flex items-center gap-2">
                        <Brain className="w-4 h-4 text-blue-400 animate-pulse" />
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
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
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

              {/* QUIZ RESULTS VIEW */}
              {activeTab === 'quiz' && showResult && (
                <motion.div
                  key="quiz-results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full"
                >
                  <div className="bg-[#061533]/85 backdrop-blur-xl border-2 border-blue-500/40 rounded-[24px] p-5 shadow-[0_0_35px_rgba(0,0,0,0.6)] text-center text-white">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-3 shadow-xl shadow-amber-500/35">🏆</div>
                    <h2 className="text-lg font-black text-white mb-1">Challenge Completed!</h2>
                    <p className="text-slate-400 text-[10px] font-bold mb-4">AI Quiz performance breakdown:</p>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="bg-[#0d1f42]/70 rounded-xl p-2.5 border border-blue-500/20">
                        <div className="text-base font-black text-amber-300">{score}</div>
                        <div className="text-[7px] font-black text-slate-400 uppercase mt-0.5">Score</div>
                      </div>
                      <div className="bg-[#0d1f42]/70 rounded-xl p-2.5 border border-blue-500/20">
                        <div className="text-base font-black text-emerald-300">Lv.{level}</div>
                        <div className="text-[7px] font-black text-slate-400 uppercase mt-0.5">Level</div>
                      </div>
                      <div className="bg-[#0d1f42]/70 rounded-xl p-2.5 border border-blue-500/20">
                        <div className="text-base font-black text-purple-300">
                          {Math.round((score / (quizQuestions.length * 140)) * 100)}%
                        </div>
                        <div className="text-[7px] font-black text-slate-400 uppercase mt-0.5">Accuracy</div>
                      </div>
                    </div>

                    <div className="bg-[#0d1f42]/40 rounded-xl p-2.5 mb-4 border border-blue-500/10">
                      <p className="text-xs text-slate-355 font-bold leading-relaxed">
                        {score >= 800 ? " Outstanding! You're a certified AI creative explorer!" : "Great job! Try again for a perfect score!"}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button onClick={handleRestart}
                        className="flex-1 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl text-xs font-black transition-all cursor-pointer active:scale-95 shadow-md shadow-blue-500/25"
                      > Play Again</button>
                      <button onClick={() => navigate('/ai-intelligence-dashboard')}
                        className="flex-1 py-2.5 bg-white/10 text-white rounded-xl text-xs font-black border border-white/15 hover:bg-white/15 transition-all cursor-pointer active:scale-95"
                      > Dashboard</button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* LEADERBOARD TAB PANEL (Dynamic Live Ranking) */}
              {activeTab === 'leaderboard' && (
                <motion.div
                  key="leaderboard-tab"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="w-full"
                >
                  <div className="bg-[#061533]/85 backdrop-blur-xl border-2 border-yellow-500/40 rounded-[24px] p-5 shadow-[0_0_35px_rgba(0,0,0,0.6)] text-white">
                    <div className="flex items-center gap-2 mb-3">
                      <Trophy className="w-5 h-5 text-yellow-400" />
                      <h3 className="text-sm font-black text-white tracking-wide">Top AI Explorers</h3>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {leaderboardData.map((player) => (
                        <div 
                          key={player.name}
                          className={`flex items-center justify-between p-2 rounded-xl border transition-all ${
                            player.active 
                              ? 'bg-yellow-500/15 border-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.15)] scale-[1.02]' 
                              : 'bg-[#0d1f42]/40 border-blue-500/10'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{player.badge}</span>
                            <span className={`text-xs font-bold ${player.active ? 'text-yellow-355 font-black' : 'text-slate-200'}`}>
                              {player.name}
                            </span>
                          </div>
                          <span className={`text-xs font-black ${player.active ? 'text-yellow-300' : 'text-slate-400'}`}>
                            {player.score} XP
                          </span>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => setActiveTab('quiz')}
                      className="w-full py-2.5 bg-yellow-500 hover:bg-yellow-600 text-slate-900 rounded-xl text-xs font-black transition-all active:scale-95 cursor-pointer"
                    >
                      Compete in Quiz! 
                    </button>
                  </div>
                </motion.div>
              )}

              {/* BADGES TAB PANEL (Dynamic Live Badges) */}
              {activeTab === 'badges' && (
                <motion.div
                  key="badges-tab"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="w-full"
                >
                  <div className="bg-[#061533]/85 backdrop-blur-xl border-2 border-amber-500/40 rounded-[24px] p-5 shadow-[0_0_35px_rgba(0,0,0,0.6)] text-white">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="w-5 h-5 text-amber-500" />
                      <h3 className="text-sm font-black text-white tracking-wide">Achievements & Badges</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {badgesData.map((badge, idx) => (
                        <div 
                          key={idx}
                          className={`p-2.5 rounded-xl border flex flex-col items-center text-center transition-all ${
                            badge.unlocked 
                              ? 'bg-amber-500/20 border-amber-500/50 shadow-[0_0_8px_rgba(245,158,11,0.2)]' 
                              : 'bg-slate-950/40 border-slate-800/80 opacity-40'
                          }`}
                        >
                          <span className="text-2xl mb-1">{badge.icon}</span>
                          <span className={`text-[10px] font-black leading-tight ${badge.unlocked ? 'text-amber-300' : 'text-slate-450'}`}>
                            {badge.title}
                          </span>
                          <span className="text-[8px] text-slate-400 mt-0.5 leading-none">{badge.desc}</span>
                        </div>
                      ))}
                    </div>

                    
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

        

      </div>
    </div>
  );
};

export default AiQuizChallenge;
