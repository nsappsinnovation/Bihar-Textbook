import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, BookOpen, Shield, Trophy, Play, Clock, GraduationCap, FileText, ChevronRight, CheckCircle2, XCircle, Gamepad2, Key,
  Bot, CreditCard, Ban, Zap, Sparkles, User, AlertOctagon, Smartphone, Rocket, Lock, Unlock, Search, Package, Hammer, Skull, Globe, Ghost, UserX, Volume2, Award, Star, RefreshCw, Target, Bell, HelpCircle, MessageSquare, LayoutGrid, RotateCcw
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
              <div className="bg-[#051c14]/90 backdrop-blur-2xl border-2 border-emerald-500/50 rounded-[28px] p-6 shadow-[0_0_50px_rgba(16,185,129,0.25)] text-center text-white relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-60" />
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
                  <p className="text-xs text-slate-300 font-bold leading-relaxed">
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
}// Chat Patrol mini-game component
const ChatPatrol = ({ onComplete }) => {
  const chatMissions = [
    {
      id: 1,
      title: "Robo-Gamer99's Cheat Trap",
      character: "Robo-Gamer99",
      iconType: "bot",
      avatarBg: "bg-purple-600",
      initialMessage: "Hey friend! Want free infinite gold and diamond pets in your game? Just send me a picture of your parent's credit card (the plastic bank card) and tell me the 3 tiny numbers on the back!",
      options: [
        {
          text: "Wow! Free gold! Let me find the credit card right now!",
          isCorrect: false,
          feedback: "Oh no! The gaming monster bought 100 digital alien space-bananas with your parents' card! Rule: NEVER share credit cards or bank card details with online strangers!"
        },
        {
          text: "Wait! Free stuff shouldn't ask for a credit card. I never share bank cards!",
          isCorrect: true,
          feedback: "Hooray! You blocked the monster! They got frustrated and self-destructed in a cloud of digital sparks!"
        }
      ]
    },
    {
      id: 2,
      title: "The Rainbow Unicorn Club",
      character: "Super-Unicorn-77",
      iconType: "unicorn",
      avatarBg: "bg-pink-500",
      initialMessage: "Omg! You won a giant, fluffy rainbow unicorn plushie! Tell me your home address and where you go to school so the delivery truck can drop it off right now!",
      options: [
        {
          text: "Yay! My address is 123 Rainbow Street and I go to Sunshine School...",
          isCorrect: false,
          feedback: "Oh no! The unicorn was actually a sneaky spyware robot in a costume! Now they know where you live and play. Rule: NEVER share your real name, address, or school online!"
        },
        {
          text: "Stop! I don't give my home address or school name to people online!",
          isCorrect: true,
          feedback: "Amazing job! You protected your secret base! The robot unicorn malfunctioned and rolled away on a unicycle!"
        }
      ]
    },
    {
      id: 3,
      title: "Uncle Pockets' Vault Key",
      character: "Uncle Pockets",
      iconType: "raccoon",
      avatarBg: "bg-amber-600",
      initialMessage: "Alert! Your digital piggy bank has a leak! Quick, read me the 4-digit code (OTP) that just popped up on your parent's phone so I can patch it!",
      options: [
        {
          text: "Oh no! Stop the leak! The code is 9987!",
          isCorrect: false,
          feedback: "Oh no! That code was the key to the vault! Uncle Pockets opened the piggy bank and flew away with all the coins! Rule: NEVER share OTP codes with anyone!"
        },
        {
          text: "Wait! I will ask my parents first. I never share security codes!",
          isCorrect: true,
          feedback: "Perfect! You kept the vault locked! Uncle Pockets cried: 'Curses! Foiled again!' and vanished into a puff of smoke!"
        }
      ]
    }
  ];

  const renderAvatar = (iconType) => {
    switch (iconType) {
      case 'bot': return <Bot size={18} />;
      case 'unicorn': return <Sparkles size={18} />;
      case 'raccoon': return <Ghost size={18} />;
      default: return <UserX size={18} />;
    }
  };

  const [activeMission, setActiveMission] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [completedMissions, setCompletedMissions] = useState({});

  const handleChoice = (choice) => {
    setSelectedChoice(choice);
    if (choice.isCorrect && activeMission) {
      setCompletedMissions(prev => ({ ...prev, [activeMission.id]: true }));
    }
  };

  const resetMission = () => {
    setSelectedChoice(null);
  };

  const getScore = () => Object.keys(completedMissions).length;

  return (
    <div className="bg-[#051c14]/90 text-white rounded-[24px] border-2 border-emerald-500/30 p-6 shadow-xl max-w-4xl mx-auto backdrop-blur-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3">
        <div>
          <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
            <MessageSquare size={18} /> Chat Patrol: Monster or Friend?
          </h3>
          <p className="text-[11px] text-slate-300 mt-1">
            Tricky monsters are trying to steal your family secrets or piggy bank! Read their messages and pick the safest reply. Don't share cards, passwords, or personal details!
          </p>
        </div>
        <div className="bg-emerald-950/60 border border-emerald-500/30 px-3.5 py-1.5 rounded-full flex items-center gap-2 w-max">
          <span className="text-[9px] font-black text-slate-300 uppercase tracking-wider">SHIELDS EARNED:</span>
          <span className="text-xs font-black text-yellow-400 flex items-center gap-1"><Shield size={12} className="fill-current" /> {getScore()} / {chatMissions.length}</span>
        </div>
      </div>

      {!activeMission ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {chatMissions.map((m) => {
            const isDone = completedMissions[m.id];
            return (
              <button
                key={m.id}
                onClick={() => { setActiveMission(m); setSelectedChoice(null); }}
                className={`p-4 rounded-2xl border text-left transition-all hover:scale-[1.02] flex flex-col justify-between h-[160px] cursor-pointer ${
                  isDone 
                    ? 'bg-emerald-950/45 border-emerald-500/50 hover:bg-emerald-950/60' 
                    : 'bg-[#06241b]/60 border-emerald-500/20 hover:border-emerald-500/50'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-white ${m.avatarBg}`}>
                      {renderAvatar(m.iconType)}
                    </span>
                    <div>
                      <h4 className="font-bold text-xs text-slate-100">{m.character}</h4>
                      <span className="text-[9px] text-slate-400">Suspicion: HIGH</span>
                    </div>
                  </div>
                  <h5 className="font-bold text-xs text-slate-200 line-clamp-2 leading-snug">{m.title}</h5>
                </div>
                
                <div className="flex items-center justify-between w-full mt-2 border-t border-white/5 pt-2">
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider">PLAY MISSION</span>
                  {isDone && <span className="text-[10px] font-black text-yellow-400 flex items-center gap-1"><Shield size={10} className="fill-current" /> CLEARED</span>}
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="space-y-6">
          <button 
            onClick={() => setActiveMission(null)}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 mb-2 font-bold cursor-pointer"
          >
            ← Back to Mission Select
          </button>

          <div className="bg-[#03140f] rounded-2xl border border-emerald-500/10 p-4 max-w-2xl mx-auto space-y-4 shadow-inner">
            {/* Scammer message */}
            <div className="flex items-start gap-3">
              <span className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shrink-0 ${activeMission.avatarBg} animate-bounce`}>
                {renderAvatar(activeMission.iconType)}
              </span>
              <div className="bg-[#06241b] text-slate-200 p-3.5 rounded-2xl rounded-tl-none text-xs font-semibold leading-relaxed max-w-[85%] border border-emerald-500/10 shadow-md">
                <span className="block text-[9px] font-black text-purple-300 uppercase tracking-wider mb-1">{activeMission.character}</span>
                {activeMission.initialMessage}
              </div>
            </div>

            {/* User Choices */}
            {selectedChoice === null ? (
              <div className="pt-4 space-y-2">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1 mb-1">Your reply:</p>
                {chatMissions.map((m) => {
                  if (m.id !== activeMission.id) return null;
                  return m.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChoice(opt)}
                      className="w-full text-left p-3.5 bg-[#051c14] border border-emerald-500/20 rounded-xl text-xs font-bold text-slate-200 hover:bg-[#072a1e] hover:border-emerald-500/50 transition-all cursor-pointer shadow-sm active:scale-[0.99]"
                    >
                      {opt.text}
                    </button>
                  ));
                })}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 space-y-4 border-t border-emerald-500/10"
              >
                {/* User Reply shown in chat */}
                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-emerald-950 border border-emerald-500/40 text-emerald-100 p-3.5 rounded-2xl rounded-tr-none text-xs font-semibold max-w-[85%]">
                    <span className="block text-[9px] font-black text-emerald-400 uppercase tracking-wider mb-1">You</span>
                    {selectedChoice.text}
                  </div>
                  <span className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shrink-0 bg-emerald-600">
                    <User size={18} />
                  </span>
                </div>

                {/* Outcome message */}
                <div className={`p-4 rounded-xl border ${
                  selectedChoice.isCorrect 
                    ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300' 
                    : 'bg-rose-955/80 border-rose-500/40 text-rose-300'
                } text-xs font-medium leading-relaxed`}>
                  <div className="flex items-center gap-2 mb-2 font-black text-sm uppercase tracking-wider">
                    {selectedChoice.isCorrect ? (
                      <span className="flex items-center gap-1.5"><Shield size={16} className="text-emerald-400" /> Success! Hacker Blocked!</span>
                    ) : (
                      <span className="flex items-center gap-1.5"><AlertOctagon size={16} className="text-rose-400" /> Alert! You got Tricked!</span>
                    )}
                  </div>
                  <p className="font-semibold">{selectedChoice.feedback}</p>
                </div>

                <div className="flex gap-2 justify-end mt-2">
                  {!selectedChoice.isCorrect && (
                    <button 
                      onClick={resetMission}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                    >
                      Try Again
                    </button>
                  )}
                  <button 
                    onClick={() => {
                      setActiveMission(null);
                      onComplete && onComplete();
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                  >
                    Finish Mission
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </div>
  );

};

// Scam Detective mini-game component
const ScamDetective = ({ onComplete }) => {
  const detectiveMissions = [
    {
      id: 1,
      title: "The Suspicious Text Message",
      type: "SMS Text Message",
      sender: "+1 (800) 555-SCAM (Claims: Bank of Safety)",
      messageTextPre: "ALERT: Your account is ",
      susText1: "SUSPENDED!",
      messageTextMid: " Click here immediately to verify or your money will be lost ",
      susText2: "FOREVER:",
      messageTextMid2: " ",
      susText3: "http://secure-login-bank-alert.xyz/rob-money",
      messageTextPost: " Do not delay!",
      flags: {
        1: {
          label: "Scary Panic Words (SUSPENDED!)",
          desc: "Scammers use scary words like 'SUSPENDED!' to make you panic and click quickly without thinking. Real banks or companies never talk to you like this! Always stay calm."
        },
        2: {
          label: "Threat of Losing Money (FOREVER:)",
          desc: "Saying your money is gone 'FOREVER' is a scare tactic. They want to make you scared so you act fast. Real banks will never threat-text you. Show it to a parent!"
        },
        3: {
          label: "Weird Web Link",
          desc: "Look at that address: it has random words and doesn't end in normal sites like '.com' or '.in'. Never click links in texts, they can steal your details or install bugs!"
        }
      }
    }
  ];

  const mission = detectiveMissions[0];
  const [clickedFlags, setClickedFlags] = useState({});
  const [selectedFlagInfo, setSelectedFlagInfo] = useState(null);

  const handleFlagClick = (flagId) => {
    setClickedFlags(prev => ({ ...prev, [flagId]: true }));
    setSelectedFlagInfo({ id: flagId, ...mission.flags[flagId] });
  };

  const isCompleted = Object.keys(clickedFlags).length === 3;

  useEffect(() => {
    if (isCompleted && onComplete) {
      onComplete();
    }
  }, [isCompleted]);

  const resetGame = () => {
    setClickedFlags({});
    setSelectedFlagInfo(null);
  };

  return (
    <div className="bg-[#051c14]/90 text-white rounded-[24px] border-2 border-emerald-500/30 p-6 shadow-xl max-w-4xl mx-auto backdrop-blur-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3">
        <div>
          <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
            <Search size={18} /> Scam Link Detective
          </h3>
          <p className="text-[11px] text-slate-300 mt-1">
            A sneaky scammer sent a text message to trick you! Tap the yellow words inside the SMS message to discover the 3 warning signs (Red Flags).
          </p>
        </div>
        <div className="bg-emerald-950/60 border border-emerald-500/30 px-3.5 py-1.5 rounded-full flex items-center gap-2 w-max">
          <span className="text-[9px] font-black text-slate-300 uppercase tracking-wider">RED FLAGS FOUND:</span>
          <span className="text-xs font-black text-yellow-400 flex items-center gap-1"><Search size={12} /> {Object.keys(clickedFlags).length} / 3</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side: Phone UI */}
        <div className="bg-slate-950 rounded-3xl p-4 border border-emerald-500/10 flex flex-col items-center">
          <div className="w-20 h-4 bg-slate-800 rounded-full mb-4"></div> {/* notch */}
          
          <div className="w-full bg-[#0d1e19] border border-emerald-900/40 rounded-2xl p-4 min-h-[200px] flex flex-col">
            <div className="flex items-center gap-2 pb-3 border-b border-emerald-950/60 mb-3">
              <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white"><MessageSquare size={16} /></span>
              <div>
                <div className="text-[10px] font-bold text-slate-300">{mission.sender}</div>
                <div className="text-[8px] text-slate-500">Text Message • Today</div>
              </div>
            </div>

            <div className="bg-[#132d25] border border-emerald-800/40 text-slate-205 p-4 rounded-2xl rounded-tl-none text-xs font-semibold leading-relaxed relative">
              {mission.messageTextPre}
              
              <button 
                onClick={() => handleFlagClick(1)}
                className={`px-1 rounded cursor-pointer font-black transition-all ${
                  clickedFlags[1] 
                    ? 'bg-rose-500/35 text-rose-300 border-b-2 border-rose-500' 
                    : 'bg-yellow-500/25 text-yellow-250 border-b-2 border-yellow-500 hover:bg-yellow-500/40'
                }`}
              >
                {mission.susText1}
              </button>

              {mission.messageTextMid}

              <button 
                onClick={() => handleFlagClick(2)}
                className={`px-1 rounded cursor-pointer font-black transition-all ${
                  clickedFlags[2] 
                    ? 'bg-rose-500/35 text-rose-300 border-b-2 border-rose-500' 
                    : 'bg-yellow-500/25 text-yellow-250 border-b-2 border-yellow-500 hover:bg-yellow-500/40'
                }`}
              >
                {mission.susText2}
              </button>

              {mission.messageTextMid2}

              <button 
                onClick={() => handleFlagClick(3)}
                className={`px-1 rounded cursor-pointer font-black break-all text-left transition-all ${
                  clickedFlags[3] 
                    ? 'bg-rose-500/35 text-rose-300 border-b-2 border-rose-500' 
                    : 'bg-yellow-500/25 text-yellow-250 border-b-2 border-yellow-500 hover:bg-yellow-500/40'
                }`}
              >
                {mission.susText3}
              </button>

              {mission.messageTextPost}
            </div>
          </div>
        </div>

        {/* Right Side: Detective Board */}
        <div className="bg-[#03140f] border border-emerald-500/15 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h4 className="text-[10px] font-black uppercase text-slate-400 mb-3 tracking-wider flex items-center gap-1.5">
              <Search size={12} /> Detective Clue Checklist
            </h4>

            {/* Clue Checklist */}
            <div className="mb-4 bg-emerald-950/20 border border-emerald-500/10 rounded-xl p-3 space-y-2">
              <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Clues to Discover:</span>
              <div className="flex items-center justify-between text-xs font-bold">
                <span className={clickedFlags[1] ? 'text-emerald-400' : 'text-slate-400'}>1. Scary Panic Words</span>
                <span className="text-[10px] font-black">{clickedFlags[1] ? '✓ FOUND' : '✗ HIDDEN'}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold">
                <span className={clickedFlags[2] ? 'text-emerald-400' : 'text-slate-400'}>2. Threat of Losing Money</span>
                <span className="text-[10px] font-black">{clickedFlags[2] ? '✓ FOUND' : '✗ HIDDEN'}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold">
                <span className={clickedFlags[3] ? 'text-emerald-400' : 'text-slate-400'}>3. Weird Scammy Web Link</span>
                <span className="text-[10px] font-black">{clickedFlags[3] ? '✓ FOUND' : '✗ HIDDEN'}</span>
              </div>
            </div>
            
            {selectedFlagInfo ? (
              <motion.div
                key={selectedFlagInfo.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-emerald-950/45 border border-emerald-500/30 rounded-xl p-4 space-y-2"
              >
                <div className="text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  {selectedFlagInfo.label}
                </div>
                <p className="text-xs text-slate-250 leading-relaxed font-semibold">
                  {selectedFlagInfo.desc}
                </p>
              </motion.div>
            ) : (
              <div className="text-slate-500 text-xs py-4 text-center italic font-semibold">
                Tap on any yellow highlighted word inside the message on the left to read its details!
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-emerald-500/10 mt-4">
            {isCompleted ? (
              <div className="space-y-4">
                <div className="bg-emerald-900/30 border border-emerald-500/30 p-3.5 rounded-xl text-emerald-300 text-xs font-bold leading-relaxed">
                  Fantastic work, Detective! You disarmed the scammer! Always remember: If a text has scary threats or weird links, NEVER click them. Tell a parent!
                </div>
                <button 
                  onClick={resetGame}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md active:scale-[0.98]"
                >
                  Investigate Again
                </button>
              </div>
            ) : (
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-wider text-center">
                Find all 3 items to complete the investigation!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Password Shield Forge mini-game component
const PasswordForge = ({ onComplete }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  // Strength Checks
  const checks = {
    length: password.length >= 8,
    mixed: /[a-z]/.test(password) && /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password)
  };

  const getStrengthLevel = () => {
    let score = 0;
    if (checks.length) score++;
    if (checks.mixed) score++;
    if (checks.number) score++;
    if (checks.symbol) score++;
    return score;
  };

  const strength = getStrengthLevel();

  const getShieldInfo = () => {
    if (password.length === 0) {
      return {
        name: "No Shield",
        color: "border-dashed border-slate-700 bg-slate-905 text-slate-500",
        desc: "Type a password to start forging!",
        iconType: "none"
      };
    }
    switch(strength) {
      case 0:
      case 1:
        return {
          name: "Fragile Cardboard Shield",
          color: "border-amber-850 bg-[#352515] text-amber-500 shadow-amber-900/10",
          desc: "Flimsy! Easily broken by the goblin's paper airplane.",
          iconType: "cardboard"
        };
      case 2:
        return {
          name: "Reinforced Wooden Shield",
          color: "border-yellow-750 bg-[#302510] text-yellow-600 shadow-[#302510]/10",
          desc: "Decent! Can handle small rocks but will break under laser fire.",
          iconType: "wood"
        };
      case 3:
        return {
          name: "Polished Iron Bulwark",
          color: "border-slate-500 bg-slate-800 text-slate-300 shadow-slate-700/20",
          desc: "Solid! Standard security that repels basic hacker slingshots.",
          iconType: "iron"
        };
      case 4:
        return {
          name: "Glowing Emerald Forcefield",
          color: "border-emerald-400 bg-emerald-950/60 text-emerald-300 shadow-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]",
          desc: "Incredible! Reflects the Goblin's plasma cannon right back at them!",
          iconType: "emerald"
        };
      default:
        return {
          name: "Cardboard Shield",
          color: "border-amber-800 bg-[#352515] text-amber-500",
          desc: "Type a stronger password!",
          iconType: "cardboard"
        };
    }
  };

  const shield = getShieldInfo();

  const handleTest = () => {
    setIsTesting(true);
    setTestResult(null);
    setTimeout(() => {
      setIsTesting(false);
      if (password.length === 0) {
        setTestResult("empty");
      } else if (strength <= 1) {
        setTestResult("weak");
      } else if (strength === 2) {
        setTestResult("medium");
      } else if (strength === 3) {
        setTestResult("strong");
      } else if (strength === 4) {
        setTestResult("perfect");
        onComplete && onComplete();
      }
    }, 1200);
  };

  return (
    <div className="bg-[#051c14]/90 text-white rounded-[24px] border-2 border-emerald-500/30 p-6 shadow-xl max-w-4xl mx-auto backdrop-blur-md">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
            <Shield size={18} /> Password Shield Forge
          </h3>
          <p className="text-[11px] text-slate-300 mt-1">
            Type a strong password to upgrade your defense shield and protect the castle from the Glitch Goblin!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left: Input & Checklist */}
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider pl-1">Forge Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setTestResult(null); }}
                placeholder="Type your password..."
                className="w-full bg-[#03140f] border-2 border-emerald-500/20 rounded-xl px-4 py-3 text-sm font-semibold tracking-wide text-white focus:outline-none focus:border-emerald-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-black text-emerald-500 hover:text-emerald-400 cursor-pointer"
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
          </div>

          {/* Checklist */}
          <div className="bg-[#03140f] rounded-2xl p-4 border border-emerald-500/10 space-y-3">
            <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-1 mb-2">Shield Blueprint Rules:</h4>
            
            <div className="flex items-center gap-2.5 text-xs font-bold">
              <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black ${checks.length ? 'bg-emerald-500 text-slate-950' : 'bg-[#051c14] border border-emerald-500/10 text-slate-550'}`}>
                {checks.length ? "✓" : "✗"}
              </span>
              <span className={checks.length ? 'text-emerald-400' : 'text-slate-500'}>8+ Characters (Wood Core)</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs font-bold">
              <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black ${checks.mixed ? 'bg-emerald-500 text-slate-950' : 'bg-[#051c14] border border-emerald-500/10 text-slate-550'}`}>
                {checks.mixed ? "✓" : "✗"}
              </span>
              <span className={checks.mixed ? 'text-emerald-400' : 'text-slate-500'}>Uppercase & Lowercase (Iron Plate)</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs font-bold">
              <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black ${checks.number ? 'bg-emerald-500 text-slate-950' : 'bg-[#051c14] border border-emerald-500/10 text-slate-550'}`}>
                {checks.number ? "✓" : "✗"}
              </span>
              <span className={checks.number ? 'text-emerald-400' : 'text-slate-500'}>Numbers 0-9 (Magic Runes)</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs font-bold">
              <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black ${checks.symbol ? 'bg-emerald-500 text-slate-950' : 'bg-[#051c14] border border-emerald-500/10 text-slate-550'}`}>
                {checks.symbol ? "✓" : "✗"}
              </span>
              <span className={checks.symbol ? 'text-emerald-400' : 'text-slate-500'}>Symbols like @,#,$,% (Laser Forcefield)</span>
            </div>
          </div>

          <button
            onClick={handleTest}
            disabled={isTesting || password.length === 0}
            className="w-full py-3 bg-[#10b981] hover:bg-[#059669] disabled:opacity-40 text-white rounded-xl text-xs font-black tracking-wide uppercase transition-all cursor-pointer shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            {isTesting ? (
              <span className="flex items-center gap-1.5"><RefreshCw size={14} className="animate-spin" /> Testing Shield Defenses...</span>
            ) : (
              <span className="flex items-center gap-1.5"><Shield size={14} /> Test Shield Against Goblin!</span>
            )}
          </button>
        </div>

        {/* Right: Shield Forge View / Simulation */}
        <div className="bg-[#03140f] rounded-3xl p-6 border border-emerald-500/10 min-h-[280px] flex flex-col justify-between items-center text-center relative overflow-hidden">
          {isTesting && (
            <div className="absolute inset-0 bg-[#051c14]/40 backdrop-blur-[1px] z-10 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400"></div>
            </div>
          )}

          <div className="w-full flex justify-between px-2 text-[10px] font-black text-slate-500 uppercase tracking-wider">
            <span>YOUR SHIELD</span>
            <span>GLITCH GOBLIN</span>
          </div>

          <div className="flex items-center justify-around w-full py-4 relative z-0">
            {/* The Shield display */}
            <div className="flex flex-col items-center gap-2">
              <div className={`w-20 h-20 rounded-full border-2 flex items-center justify-center shadow-inner transition-all duration-300 ${shield.color}`}>
                {shield.iconType === "none" && <Lock size={32} className="text-slate-500" />}
                {shield.iconType === "cardboard" && <Package size={32} className="text-amber-500" />}
                {shield.iconType === "wood" && <Hammer size={32} className="text-yellow-600" />}
                {shield.iconType === "iron" && <Shield size={32} className="text-slate-300" />}
                {shield.iconType === "emerald" && <Zap size={32} className="text-emerald-400 animate-pulse" />}
              </div>
              <div className="text-xs font-bold text-slate-200 mt-2">{shield.name}</div>
            </div>

            <div className="text-xs font-black text-slate-600 uppercase tracking-widest">VS</div>

            {/* Scammer Goblin display */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full border border-rose-500/20 bg-rose-950/20 flex items-center justify-center shadow-lg animate-pulse">
                <Skull size={32} className="text-rose-500" />
              </div>
              <div className="text-xs font-bold text-slate-200 mt-2">Glitch Goblin</div>
            </div>
          </div>

          {/* Test Outcomes */}
          <div className="w-full border-t border-emerald-500/10 pt-4 mt-2 min-h-[75px] flex items-center justify-center">
            {testResult === null && !isTesting && (
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider italic">Forge a shield above and click test to initiate combat!</span>
            )}
            
            {testResult === "weak" && (
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="text-xs font-semibold text-rose-400">
                The Glitch Goblin threw a wet tomato and completely shattered your Cardboard Shield! Access denied to castle! Try building a wooden or iron shield!
              </motion.div>
            )}

            {testResult === "medium" && (
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="text-xs font-semibold text-yellow-400">
                The Glitch Goblin threw a heavy rock. Your Wooden Shield blocked it, but got badly cracked! A hacker would eventually break in. Add symbols or capitals!
              </motion.div>
            )}

            {testResult === "strong" && (
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="text-xs font-semibold text-slate-300">
                The Goblin fired a Laser Pistol! Your Iron Shield blocked it, but got burnt. Very good, but can we make it perfect by adding symbols like @,#,$?
              </motion.div>
            )}

            {testResult === "perfect" && (
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 justify-center">
                <Trophy size={14} className="text-emerald-400" /> PERFECT! The Goblin fired a Giant Plasma Cannon! Your Emerald Forcefield reflected the beam back, vaporizing the goblin's weapon! Castle is 100% SECURE!
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Popup Blaster mini-game component (Lesson 4)
const PopupBlaster = ({ onComplete }) => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: "CRITICAL COMPUTER DANGER!",
      text: "Warning: 99 virus bugs detected in your system! Click to clean immediately!",
      actionText: "CLEAN DEVICE NOW",
      safeAction: "Close (X)",
    },
    {
      id: 2,
      title: "FREE IPHONE 25 WINNER!",
      text: "Congratulations! You have been randomly chosen to receive a free phone! Click below to claim!",
      actionText: "CLAIM PRIZE",
      safeAction: "Close (X)",
    },
    {
      id: 3,
      title: "SECURITY FIREWALL LEAK!",
      text: "Your computer security firewall has crashed! Click to download repairs!",
      actionText: "DOWNLOAD FIX",
      safeAction: "Close (X)",
    }
  ]);
  const [activeAlertIndex, setActiveAlertIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (score === 3 && onComplete) {
      onComplete();
    }
  }, [score, onComplete]);

  const handleScamClick = () => {
    setFeedback({
      isCorrect: false,
      text: "Oh no! Tapping that loaded a sneaky virus bug! Hackers got access! Remember: Never trust flashy pop-up warnings or free prize claims."
    });
  };

  const handleSafeClick = () => {
    setScore(prev => prev + 1);
    setFeedback({
      isCorrect: true,
      text: "Excellent choice! You closed the fake warning or clicked 'Ask a Parent'! That is exactly how to disarm a pop-up."
    });
  };

  const nextAlert = () => {
    setFeedback(null);
    if (activeAlertIndex < alerts.length - 1) {
      setActiveAlertIndex(prev => prev + 1);
    } else {
      onComplete && onComplete();
    }
  };

  const currentAlert = alerts[activeAlertIndex];

  return (
    <div className="bg-[#051c14]/90 text-white rounded-[24px] border-2 border-emerald-500/30 p-6 shadow-xl max-w-lg mx-auto relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-emerald-400 flex items-center gap-2"><Zap size={18} /> Pop-up Blaster</h4>
        <span className="text-xs bg-emerald-950 px-3 py-1 rounded-full text-yellow-400 font-bold">Score: {score}/3</span>
      </div>

      {score === 3 ? (
        <div className="text-center py-6 space-y-4">
          <div className="flex justify-center"><Trophy size={48} className="text-emerald-400 animate-bounce" /></div>
          <h5 className="font-bold text-emerald-400 text-sm">Perfect Score! All pop-up alerts closed safely!</h5>
          <p className="text-xs text-slate-350 leading-relaxed font-semibold">
            You are officially a Pop-up Blaster Master! You proved that fake alerts cannot trick you.
          </p>
        </div>
      ) : (
        <div className="bg-[#03140f] rounded-2xl p-5 border border-emerald-500/10 min-h-[200px] flex flex-col justify-between">
          {!feedback ? (
            <div className="bg-slate-900 border-2 border-red-500 rounded-xl p-4 relative animate-pulse">
              {/* Fake Pop-up Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                <span className="text-[10px] font-extrabold text-red-500 tracking-wider uppercase">{currentAlert.title}</span>
                <button 
                  onClick={handleSafeClick}
                  className="w-5 h-5 bg-white/10 hover:bg-white/20 text-white text-xs font-black rounded flex items-center justify-center cursor-pointer transition-colors"
                >
                  X
                </button>
              </div>

              {/* Fake Pop-up Body */}
              <p className="text-xs text-slate-200 leading-relaxed font-semibold mb-4 pr-6">
                {currentAlert.text}
              </p>

              {/* Fake Pop-up Scam Button */}
              <div className="flex flex-col gap-2">
                <button 
                  onClick={handleScamClick}
                  className="w-full py-2.5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-all shadow-md active:scale-98"
                >
                  {currentAlert.actionText}
                </button>
                <button 
                  onClick={handleSafeClick}
                  className="text-[9px] font-black text-slate-400 hover:text-white underline cursor-pointer text-center"
                >
                  Ignore & Ask Parent
                </button>
              </div>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 py-4 text-center">
              <div className="flex justify-center">{feedback.isCorrect ? <CheckCircle2 size={36} className="text-emerald-400" /> : <XCircle size={36} className="text-rose-500" />}</div>
              <p className={`text-xs font-semibold leading-relaxed ${feedback.isCorrect ? "text-emerald-400" : "text-rose-400"}`}>
                {feedback.text}
              </p>
              <button 
                onClick={feedback.isCorrect ? nextAlert : () => setFeedback(null)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                {feedback.isCorrect ? "Next Pop-up →" : "Try Again"}
              </button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

// Permission Shield mini-game component (Lesson 5)
const PermissionShield = ({ onComplete }) => {
  const apps = [
    {
      id: 1,
      name: "Super Flashlight App",
      description: "A simple flashlight that turns on your camera light.",
      requests: [
        { key: "camera", name: "Access Camera (to toggle light)", safe: true },
        { key: "contacts", name: "Read Contacts & Phone Messages", safe: false }
      ]
    },
    {
      id: 2,
      name: "Calculator Pro",
      description: "Quickly solve math equations and study helper.",
      requests: [
        { key: "mic", name: "Access Microphone", safe: false },
        { key: "photos", name: "Access Photo Gallery", safe: false }
      ]
    },
    {
      id: 3,
      name: "Dino Runner Game",
      description: "Help the dinosaur run and dodge obstacles online.",
      requests: [
        { key: "internet", name: "Access Internet", safe: true },
        { key: "location", name: "Access Real-time Location", safe: false }
      ]
    }
  ];

  const [activeAppIndex, setActiveAppIndex] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [completedApps, setCompletedApps] = useState(0);

  useEffect(() => {
    if (completedApps === 3 && onComplete) {
      onComplete();
    }
  }, [completedApps, onComplete]);

  const currentApp = apps[activeAppIndex];

  const handleToggle = (key, val) => {
    setSelectedChoices(prev => ({
      ...prev,
      [key]: val
    }));
  };

  const handleInstall = () => {
    let isSafeConfig = true;
    currentApp.requests.forEach(req => {
      const choice = selectedChoices[req.key];
      if (req.safe && choice !== true) isSafeConfig = false;
      if (!req.safe && choice !== false) isSafeConfig = false;
    });

    if (isSafeConfig) {
      setCompletedApps(prev => prev + 1);
      setFeedback({
        isCorrect: true,
        text: `Awesome! You allowed only necessary requests and denied the privacy threats. ${currentApp.name} is installed safely!`
      });
    } else {
      setFeedback({
        isCorrect: false,
        text: `Danger! Your setting allowed privacy leaks or disabled core functions. Flashlight doesn't need contacts; Calculator doesn't need photos! Try again.`
      });
    }
  };

  const nextApp = () => {
    setFeedback(null);
    setSelectedChoices({});
    if (activeAppIndex < apps.length - 1) {
      setActiveAppIndex(prev => prev + 1);
    } else {
      onComplete && onComplete();
    }
  };

  return (
    <div className="bg-[#051c14]/90 text-white rounded-[24px] border-2 border-emerald-500/30 p-6 shadow-xl max-w-lg mx-auto relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-emerald-400 flex items-center gap-2"><Shield size={18} /> Permission Shield</h4>
        <span className="text-xs bg-emerald-950 px-3 py-1 rounded-full text-yellow-400 font-bold">Safeguarded: {completedApps}/3</span>
      </div>

      {completedApps === 3 ? (
        <div className="text-center py-6 space-y-4">
          <div className="flex justify-center"><Award size={48} className="text-emerald-400 animate-bounce" /></div>
          <h5 className="font-bold text-emerald-400 text-sm">Perfect Setup! All apps secured!</h5>
          <p className="text-xs text-slate-355 leading-relaxed font-semibold">
            You successfully guarded your personal data from spying apps! Remember: always deny permissions that an app does not need to work.
          </p>
        </div>
      ) : (
        <div className="bg-[#03140f] rounded-2xl p-5 border border-emerald-500/10 min-h-[220px] flex flex-col justify-between">
          {!feedback ? (
            <div className="space-y-4">
              <div>
                <span className="text-[9px] font-black text-purple-400 uppercase tracking-wider">Simulated Download:</span>
                <h5 className="font-bold text-slate-100 text-xs mt-0.5">{currentApp.name}</h5>
                <p className="text-[10px] text-slate-400 mt-1">{currentApp.description}</p>
              </div>

              <div className="space-y-2.5">
                <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest">Adjust App Permissions:</span>
                {currentApp.requests.map(req => {
                  const currentVal = selectedChoices[req.key];
                  return (
                    <div key={req.key} className="flex items-center justify-between bg-emerald-950/20 p-2.5 rounded-xl border border-emerald-500/10">
                      <span className="text-xs font-bold text-slate-200">{req.name}</span>
                      <div className="flex gap-1.5 shrink-0">
                        <button 
                          onClick={() => handleToggle(req.key, true)}
                          className={`px-3 py-1 text-[9px] font-black rounded-lg cursor-pointer transition-all ${
                            currentVal === true 
                              ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/20' 
                              : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          ALLOW
                        </button>
                        <button 
                          onClick={() => handleToggle(req.key, false)}
                          className={`px-3 py-1 text-[9px] font-black rounded-lg cursor-pointer transition-all ${
                            currentVal === false 
                              ? 'bg-rose-600 text-white shadow-sm shadow-rose-500/20' 
                              : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          DENY
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button 
                onClick={handleInstall}
                className="w-full py-2.5 mt-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md active:scale-98"
              >
                Complete Installation
              </button>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 py-4 text-center">
              <div className="flex justify-center">{feedback.isCorrect ? <CheckCircle2 size={36} className="text-emerald-400" /> : <XCircle size={36} className="text-rose-500" />}</div>
              <p className={`text-xs font-semibold leading-relaxed ${feedback.isCorrect ? "text-emerald-400" : "text-rose-400"}`}>
                {feedback.text}
              </p>
              <button 
                onClick={feedback.isCorrect ? nextApp : () => setFeedback(null)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-705 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                {feedback.isCorrect ? "Next App →" : "Try Again"}
              </button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

// Lesson Quiz component
const LessonQuiz = ({ questions, onComplete }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === questions[currentQ].correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  const q = questions[currentQ];
  const isCorrectChoice = selectedOption === q.correct;
  const isAllCorrect = score === questions.length;

  return (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm max-w-2xl mx-auto overflow-hidden relative">
      {/* Decorative top header line */}
      <div className="h-2 w-full bg-gradient-to-r from-emerald-400 to-teal-500 absolute top-0 left-0" />

      {!showResult ? (
        <div className="p-6 sm:p-10">
          <div className="flex justify-between items-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-extrabold rounded-full uppercase tracking-wider">
              <Trophy size={14} /> Question {currentQ + 1} of {questions.length}
            </span>
            <span className="text-sm font-bold text-slate-500">
              Score: <span className="text-emerald-600 font-black">{score}</span>
            </span>
          </div>

          <h5 className="text-lg sm:text-xl font-extrabold text-[#1A1C2E] leading-relaxed mb-8">
            {q.question}
          </h5>

          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              let btnStyle = "bg-white border-slate-200 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/50 hover:shadow-sm";
              let icon = null;
              
              if (isAnswered) {
                if (idx === q.correct) {
                  btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm ring-1 ring-emerald-500/20";
                  icon = <CheckCircle2 size={18} className="text-emerald-500" />;
                } else if (idx === selectedOption) {
                  btnStyle = "bg-rose-50 border-rose-500 text-rose-800 shadow-sm ring-1 ring-rose-500/20";
                  icon = <XCircle size={18} className="text-rose-500" />;
                } else {
                  btnStyle = "bg-slate-50 border-slate-100 text-slate-400 opacity-60";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 sm:p-5 border-2 rounded-2xl text-sm sm:text-base font-bold transition-all duration-300 cursor-pointer flex items-center justify-between gap-3 ${btnStyle} ${!isAnswered && 'group'}`}
                >
                  <span>{opt}</span>
                  {icon && <span>{icon}</span>}
                  {!isAnswered && <div className="w-5 h-5 rounded-full border-2 border-slate-200 group-hover:border-emerald-400 transition-colors shrink-0" />}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {isAnswered && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 mt-4 border-t border-slate-100"
              >
                <span className={`text-sm sm:text-base font-bold flex items-center gap-2 ${isCorrectChoice ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {isCorrectChoice ? (
                    <><CheckCircle2 size={20} /> Excellent! That is the correct answer.</>
                  ) : (
                    <><XCircle size={20} /> Oops! That's not right.</>
                  )}
                </span>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNext}
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-sm font-extrabold transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  {currentQ < questions.length - 1 ? 'Next Question' : 'View Results'}
                  <ArrowRight size={16} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="p-8 sm:p-12 text-center space-y-6">
          <div className="flex justify-center mb-2">
            {isAllCorrect ? (
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center shadow-inner">
                <Trophy size={40} className="text-emerald-500" />
              </div>
            ) : (
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center shadow-inner">
                <RotateCcw size={40} className="text-amber-500" />
              </div>
            )}
          </div>
          
          <div>
            <h5 className="font-extrabold text-[#1A1C2E] text-2xl mb-2">
              {isAllCorrect ? "Perfect Score!" : "Almost There!"}
            </h5>
            <p className="text-base text-slate-500 leading-relaxed font-medium">
              {isAllCorrect 
                ? "Wonderful job! You got every question correct and earned your badge!" 
                : `You scored ${score} out of ${questions.length}. You need a perfect score to pass this lesson.`}
            </p>
          </div>

          <div className="pt-6">
            {isAllCorrect ? (
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onComplete}
                className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-2xl text-base font-extrabold transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 mx-auto"
              >
                Claim Badge & Unlock Next <Award size={20} />
              </motion.button>
            ) : (
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRestart}
                className="w-full sm:w-auto px-10 py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-2xl text-base font-extrabold transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 mx-auto"
              >
                Retry Quiz <RotateCcw size={20} />
              </motion.button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const ConfettiExplosion = () => {
  const [particles] = useState(() => {
    const colors = ['#0BB562', '#4F46E5', '#0284C7', '#F59E0B', '#9333EA', '#10B981'];
    return Array.from({ length: 45 }).map(() => {
      const angle = Math.random() * 360;
      const distance = 80 + Math.random() * 220;
      const size = 6 + Math.random() * 8;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const x = Math.cos(angle * (Math.PI / 180)) * distance;
      const y = Math.sin(angle * (Math.PI / 180)) * distance + 40;
      const rotate = Math.random() * 360;
      const duration = 1.2 + Math.random() * 0.5;
      const isCircle = Math.random() > 0.5;
      return { x, y, rotate, duration, isCircle, size, color };
    });
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50 flex items-center justify-center">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
          animate={{
            x: p.x,
            y: p.y,
            scale: [0, 1.3, 0.4],
            opacity: [1, 1, 0],
            rotate: p.rotate
          }}
          transition={{ duration: p.duration, ease: "easeOut" }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.isCircle ? '50%' : '3px'
          }}
        />
      ))}
    </div>
  );
};

// Curriculum Lessons Database
const lessons = [
  {
    id: 1,
    title: "Lesson 1: Monster or Friend?",
    badge: "Privacy Guard",
    topic: "Chat safety & Strangers",
    summary: "Learn why talking to strangers on the internet can be tricky, and what secrets you must keep safe!",
    image: "/images/cybersecurity/lesson1.png",
    learnSections: [
      {
        title: "The Digital Playground",
        desc: "The internet is like a giant, beautiful public playground where millions of kids play games, watch cartoons, and chat. But just like a real park, you must never talk to strangers who approach you without your parents knowing!",
        image: "/images/cybersecurity/lesson1.png"
      },
      {
        title: "Online Pretenders",
        desc: "Did you know that some tricky monsters pretend to be kids online? A character using a cute puppy picture or claiming to be '9-year-old Alex' could actually be a hacker trying to find your secrets. Always be cautious!",
        image: "/images/cybersecurity/3rd.png"
      },
      {
        title: "The Golden Safe Rules",
        desc: "Keep your personal keys safe! Never share these with anyone online:\n\n* Your home address and school name\n* Your phone number\n* Your parent's credit card or bank details\n* The 4-digit code (OTP) sent to your parents' phone.",
        image: "/images/cybersecurity/rhs.png"
      },
      {
        title: "Checklist for Chat Safety",
        desc: "DO: Play games with school friends you know in real life.\nDO: Tell a parent immediately if someone online asks where you live.\nDON'T: Send pictures of your house, school, or face to game strangers.\nDON'T: Share passwords, even if a stranger offers you 'free Robux' or game skins.",
        image: "/images/cybersecurity/lesson1.png"
      }
    ],
    content: "The internet is like a giant park! You can play games and chat, but sometimes tricky monsters pretend to be friendly characters.\n\nYour Secrets are Keys!\nNever give away your parent's bank cards, your address, or your 4-digit code (OTP) to anyone online. Keep them hidden inside your secret base!",
    game: "Chat Patrol",
    quiz: [
      {
        question: "A stranger online offers you free game items but asks for your parents' credit card details. What should you do?",
        options: ["Share it immediately", "Never share financial info and say NO", "Send a picture of the card"],
        correct: 1
      },
      {
        question: "Which of these is a secret you should NEVER share with strangers online?",
        options: ["Your favorite color", "Your home address and school name", "Your favorite animal"],
        correct: 1
      }
    ]
  },
  {
    id: 2,
    title: "Lesson 2: Link Detectives",
    badge: "Link Detective",
    topic: "SMS & Phishing Scams",
    summary: "Learn how to spot suspicious text messages (phishing) that try to scare you into clicking weird links.",
    image: "/images/cybersecurity/lesson2.png",
    learnSections: [
      {
        title: "Sneaky Fishing Hooks",
        desc: "Phishing (pronounced like 'fishing') is when a scammer drops a virtual hook into the digital water, hoping you will bite! They send fake text messages or emails pretending to be a bank, a game, or a delivery company.",
        image: "/images/cybersecurity/lesson2.png"
      },
      {
        title: "Spotting the Panic Trap",
        desc: "Scammers want to scare you! They use words like 'URGENT', 'BLOCKED', or 'LOST FOREVER'. They want you to panic and tap their sneaky link immediately before you can ask an adult. Stop, breathe, and analyze!",
        image: "/images/cybersecurity/3rd.png"
      },
      {
        title: "Decoding Web Links",
        desc: "Always look at the link (URL) before tapping! A safe site uses https and ends with a normal domain (like .com or .org). Scammers use weird links like bank-verify-now.xyz or free-gift-box.net/alert to sneak viruses onto your device.",
        image: "/images/cybersecurity/rhs.png"
      },
      {
        title: "Checklist for Link Safety",
        desc: "DO: Show suspicious text messages to a parent or teacher.\nDO: Delete the message immediately if you don't recognize the sender.\nDON'T: Click on links in SMS messages claiming you won a lottery or a phone.\nDON'T: Enter passwords or usernames on pages that look weird or suspicious.",
        image: "/images/cybersecurity/lesson2.png"
      }
    ],
    content: "Scammers send sneaky text messages that try to make you panic!\n\nLook for the 3 Red Flags:\n1. Scary Words: 'Your account is SUSPENDED!'\n2. Extreme Threats: 'Your money is lost FOREVER!'\n3. Weird Links: Websites ending in weird letters like '.xyz' instead of '.com'.\n\nIf you see these, don't tap! Call a parent!",
    game: "Scam Detective",
    quiz: [
      {
        question: "Why do scammers use scary words like 'SUSPENDED!' or 'FOREVER' in text messages?",
        options: ["To make you panic and click without thinking", "Because they want to help you", "To make you laugh"],
        correct: 0
      },
      {
        question: "Which web link looks safe and normal?",
        options: ["http://secure-login-bank-alert.xyz/rob-money", "https://www.google.com", "http://free-candy-click-here.net/virus"],
        correct: 1
      }
    ]
  },
  {
    id: 3,
    title: "Lesson 3: Shield Forging",
    badge: "Password Smith",
    topic: "Strong Password Creation",
    summary: "Learn how to create passwords that act like indestructible forcefields against the Glitch Goblin!",
    image: "/images/cybersecurity/lesson3.png",
    learnSections: [
      {
        title: "The Fortress Gate",
        desc: "A password is like the drawbridge of your digital castle. If it's weak (like '123456' or 'superman'), the Glitch Goblin and hacking robots can kick it down in seconds! A strong password keeps your account safe.",
        image: "/images/cybersecurity/lesson3.png"
      },
      {
        title: "The Materials of Defense",
        desc: "Cardboard Shield: 'cat' or 'password' — Cracks instantly!\nWooden Door: 'cat123' or 'superman10' — Cracks in a few minutes.\nIron Gate: 'CatDog2024' — Good, but robots can still guess it eventually.\nEmerald Forcefield: 'C@t&D0g#2026!' — Indestructible! Mixing letters, numbers, and symbols creates the ultimate defense.",
        image: "/images/cybersecurity/3rd.png"
      },
      {
        title: "How to Remember Your Shield",
        desc: "Create a fun, secret sentence! For example: 'I love eating pizza on Fridays!' becomes 'Il2ep0F!'. It is super easy for you to remember, but impossible for a hacking robot to guess!",
        image: "/images/cybersecurity/rhs.png"
      },
      {
        title: "Checklist for Password Safety",
        desc: "DO: Use different passwords for different games.\nDO: Keep your passwords written down in a secret notebook at home.\nDON'T: Use easy-to-guess things like your birthday or pet's name.\nDON'T: Share your password with anyone, not even your best friends at school!",
        image: "/images/cybersecurity/lesson3.png"
      }
    ],
    content: "Hackers use guessing robots to break into your accounts. If your password is too easy, they will crack it in a second!\n\nThe Shield Blueprint:\n• Simple passwords (like '123456' or 'doggy') are fragile like Cardboard.\n• Add capitals (ABC) and numbers (123) to make an Iron Gate.\n• Add symbols (@, #, $, %) to forge an Emerald Forcefield that blocks everything!",
    game: "Password Forge",
    quiz: [
      {
        question: "Which of these makes a password incredibly strong against hackers?",
        options: ["Using '12345678'", "Using your pet's name", "Using a mix of letters, numbers, and symbols"],
        correct: 2
      },
      {
        question: "If your password is 'cat', what kind of defense shield will you forge?",
        options: ["A fragile cardboard shield that breaks easily", "A glowing emerald forcefield", "A strong iron gate"],
        correct: 0
      }
    ]
  },
  {
    id: 4,
    title: "Lesson 4: Pop-up Blaster",
    badge: "Pop-up Blaster",
    topic: "Device Safety & Updates",
    summary: "Learn to ignore fake scary virus alerts and keep your device software updated to keep hackers out.",
    image: "/images/cybersecurity/lesson4.png",
    learnSections: [
      {
        title: "Beware of Loud Pop-ups",
        desc: "When browsing, some pages display red flashing warning boxes shouting: 'WARNING! 99 VIRUSES DETECTED!' or 'YOUR DEVICE IS INFECTED!'. Don't be scared! These are fake warnings designed to trick you into downloading viruses.",
        image: "/images/cybersecurity/lesson4.png"
      },
      {
        title: "Disarming the Trap",
        desc: "Never click the big, bright buttons in a pop-up. Instead, look closely for a tiny, white X button in the top corner. If you can't find it, close the browser tab or ask an adult to close it for you.",
        image: "/images/cybersecurity/3rd.png"
      },
      {
        title: "Software Updates are Shield Refills",
        desc: "Hacking robots constantly search for hidden holes (security bugs) in your games and operating systems. When you update your apps, the creators patch up these holes, keeping the robots locked out!",
        image: "/images/cybersecurity/rhs.png"
      },
      {
        title: "Checklist for Device Safety",
        desc: "DO: Turn on 'Automatic Updates' for your phone, tablet, or computer.\nDO: Close the browser tab if a flashy screen blocks your page.\nDON'T: Install 'device cleaner' or 'helper' apps suggested by pop-ups.\nDON'T: Postpone important system updates for too long.",
        image: "/images/cybersecurity/lesson4.png"
      }
    ],
    content: "While surfing the web, you might see scary pop-up boxes shouting: 'YOUR DEVICE HAS 50 VIRUSES! CLICK NOW TO REPAIR!'\n\nIt's a Trick!\nThese are fake pop-ups trying to make you download bad apps. Never click the big green buttons. Always close the window by clicking the small white 'X' or show it to a parent!",
    game: "Pop-up Blaster",
    quiz: [
      {
        question: "A web page pops up shouting that your device has a virus and asks you to click 'Install Antivirus'. What do you do?",
        options: ["Click Install immediately", "Ignore it, close the window, and tell an adult", "Buy the suggested app"],
        correct: 1
      },
      {
        question: "Why should we update our games and apps?",
        options: ["To slow down the device", "To change the background colors", "To fix security holes and block hacking robots"],
        correct: 2
      }
    ]
  },
  {
    id: 5,
    title: "Lesson 5: Permission Safeguard",
    badge: "Safe Downloader",
    topic: "2FA & App Permissions",
    summary: "Learn about Two-Factor Authentication (2FA) and how to deny sneaky apps from spying on your photos or location.",
    image: "/images/cybersecurity/lesson5.png",
    learnSections: [
      {
        title: "The Double-Lock Lockbox",
        desc: "Two-Factor Authentication (2FA) is like locking your chest with two different keys. When you log in with your password, a secret one-time code is sent to your parent's phone. Even if a hacker steals your password, they can't get in without that second key!",
        image: "/images/cybersecurity/lesson5.png"
      },
      {
        title: "Sneaky App Demands",
        desc: "When you download a new game, it asks for permission to access your device features. A driving game might need access to your screen controls, but does a calculator app need to see your photo gallery or know your location? Absolutely not!",
        image: "/images/cybersecurity/3rd.png"
      },
      {
        title: "The Permission Shield Rules",
        desc: "Always review permission requests! If an app asks for something it doesn't need to work, click DENY. It's better to be safe than let sneaky apps track your coordinates or read your private messages.",
        image: "/images/cybersecurity/rhs.png"
      },
      {
        title: "Checklist for Permission Safety",
        desc: "DO: Enable 2FA on your main gaming and school accounts with parent help.\nDO: Deny location access for games that do not require mapping.\nDON'T: Download apps from random websites. Only use official app stores.\nDON'T: Click 'Allow' to every popup without reading what it is asking for.",
        image: "/images/cybersecurity/lesson5.png"
      }
    ],
    content: "Keep your digital house safe with a double lock!\n\n2FA (Two-Factor Authentication):\nThis requires both a password AND a secret code sent to your parent's phone to log in. Even if a hacker guesses your password, they can't get in!\n\nApp Permission Rules:\nIf a simple Flashlight app asks to see your photos, contacts, or location, DENY IT! Apps should only access what they need to work.",
    game: "Permission Shield",
    quiz: [
      {
        question: "What is Two-Factor Authentication (2FA)?",
        options: ["Sharing your password with two friends", "An extra safety lock that needs a secret code to log in", "Making your internet twice as fast"],
        correct: 1
      },
      {
        question: "A simple calculator app asks for permission to access your photo gallery and location. What should you do?",
        options: ["Click ALLOW to use the calculator", "Click DENY because a calculator does not need your photos", "Delete your photos first"],
        correct: 1
      }
    ]
  }
];

const CyberSecurityDashboard = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Safety Playzone');
  const [selectedItem, setSelectedItem] = useState(null);

  // Curriculum State
  const [activeLessonId, setActiveLessonId] = useState(1);
  const [unlockedLessons, setUnlockedLessons] = useState(() => {
    const saved = localStorage.getItem('unlockedCyberLessons');
    return saved ? JSON.parse(saved) : [1];
  });
  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem('completedCyberLessons');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeLessonTab, setActiveLessonTab] = useState('learn'); // 'learn' | 'play' | 'test'
  const [gameCleared, setGameCleared] = useState(false);
  const [quizCleared, setQuizCleared] = useState(false);
  const [expandedSectionIndex, setExpandedSectionIndex] = useState(0);

  useEffect(() => {
    localStorage.setItem('unlockedCyberLessons', JSON.stringify(unlockedLessons));
  }, [unlockedLessons]);

  useEffect(() => {
    localStorage.setItem('completedCyberLessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    setActiveLessonTab('learn');
    setExpandedSectionIndex(0);
    const isCompleted = completedLessons.includes(activeLessonId);
    setGameCleared(isCompleted);
    setQuizCleared(isCompleted);
  }, [activeLessonId]);

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
    { label: 'Safety Playzone', value: 'Interactive Games', icon: <Shield className="text-emerald-600" />, color: 'bg-emerald-50' },
    { label: 'Knowledge Base', value: 'Glossary & Tips', icon: <BookOpen className="text-purple-600" />, color: 'bg-purple-50' },
    { label: 'Skill Assessment', value: 'Quizzes & Badges', icon: <Trophy className="text-orange-500" />, color: 'bg-orange-50' },
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
          {activeFilter === 'Safety Playzone' && (
            <div className="space-y-4 pt-2 sm:pt-4">
              {/* Sleek Lesson Selection Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 px-1">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                    <Shield size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#1A1C2E]">Cyber Security Course</h3>
                    <p className="text-[11px] text-slate-500 font-medium">Select an unlocked lesson module to begin training</p>
                  </div>
                </div>
                {completedLessons.length > 0 && (
                  <button
                    onClick={() => {
                      if (window.confirm("Do you want to reset your training progress and start from Lesson 1?")) {
                        setUnlockedLessons([1]);
                        setCompletedLessons([]);
                        setActiveLessonId(1);
                        setActiveLessonTab('learn');
                        setGameCleared(false);
                        setQuizCleared(false);
                      }
                    }}
                    className="text-xs font-bold text-slate-600 hover:text-rose-600 bg-white hover:bg-rose-50 border border-slate-200 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm hover:border-rose-200"
                  >
                    <RefreshCw size={13} /> Reset Progress
                  </button>
                )}
              </div>

              {/* Lesson Pills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 mb-2">
                {lessons.map((less) => {
                  const isUnlocked = unlockedLessons.includes(less.id);
                  const isCompleted = completedLessons.includes(less.id);
                  const isActive = activeLessonId === less.id;

                  return (
                    <button
                      key={less.id}
                      onClick={() => {
                        if (isUnlocked) {
                          setActiveLessonId(less.id);
                        }
                      }}
                      disabled={!isUnlocked}
                      className={`text-left px-3.5 py-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 min-h-[50px] ${
                        isActive
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-md font-bold scale-[1.02]'
                          : isUnlocked
                          ? 'bg-white text-[#1A1C2E] border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 shadow-sm font-medium'
                          : 'bg-slate-100/80 text-slate-400 border-slate-200 cursor-not-allowed opacity-60 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {isActive ? (
                          <span className="w-2.5 h-2.5 rounded-full bg-white shrink-0 animate-pulse" title="Active Lesson" />
                        ) : isCompleted ? (
                          <CheckCircle2 size={16} className="text-emerald-500 shrink-0" title="Completed" />
                        ) : isUnlocked ? (
                          <span className="w-2 h-2 rounded-full bg-emerald-300 shrink-0" />
                        ) : (
                          <Lock size={14} className="text-slate-400 shrink-0" title="Locked" />
                        )}
                        <span className="text-xs sm:text-sm font-bold truncate">
                          {less.id}. {less.title.split(': ')[1] || less.title}
                        </span>
                      </div>
                      {isUnlocked && !isActive && !isCompleted && (
                        <ChevronRight size={14} className="text-slate-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Active Lesson Main Container */}
              <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
                      <Award size={14} className="text-emerald-600" /> Lesson {activeLessonId} Badge: <span className="font-extrabold text-[#1A1C2E]">{lessons[activeLessonId - 1].badge}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1C2E] tracking-tight">
                      {lessons[activeLessonId - 1].title}
                    </h2>
                    <p className="text-sm text-slate-600 mt-1 font-medium">
                      Topic Focus: <span className="text-emerald-600 font-bold">{lessons[activeLessonId - 1].topic}</span>
                    </p>
                  </div>

                  {/* Sleek Inline Stage Switcher Pill */}
                  <div className="bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80 flex items-center gap-1 w-full sm:w-auto shrink-0 self-stretch sm:self-center flex-wrap">
                    {[
                      { id: 'learn', label: 'Learn Cards', icon: <BookOpen size={15} />, disabled: false, cleared: true },
                      { id: 'test', label: 'Take Quiz', icon: <Trophy size={15} />, disabled: false, cleared: quizCleared || completedLessons.includes(activeLessonId) }
                    ].map(stg => (
                      <button
                        key={stg.id}
                        onClick={() => !stg.disabled && setActiveLessonTab(stg.id)}
                        disabled={stg.disabled}
                        className={`flex-1 sm:flex-initial py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 min-h-[40px] ${
                          activeLessonTab === stg.id
                            ? 'bg-white text-[#1A1C2E] shadow-sm text-emerald-600 ring-1 ring-slate-200/50'
                            : stg.disabled
                            ? 'text-slate-300 cursor-not-allowed opacity-60 font-medium'
                            : stg.cleared
                            ? 'text-emerald-600 hover:bg-white/50 font-medium'
                            : 'text-slate-500 hover:text-slate-800 hover:bg-white/50 font-medium'
                        }`}
                      >
                        {stg.cleared && activeLessonTab !== stg.id ? <CheckCircle2 size={15} className="text-emerald-500" /> : stg.icon}
                        <span>{stg.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stage Content Area */}
                <div className="min-h-[350px]">
                  <AnimatePresence mode="wait">
                    {activeLessonTab === 'learn' && (
                      <motion.div
                        key="stage-learn"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-full space-y-6"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                          {lessons[activeLessonId - 1].learnSections.map((sec, idx) => (
                            <div
                              key={idx}
                              className="group p-5 rounded-3xl border border-slate-200 transition-all duration-300 bg-white hover:bg-gradient-to-b hover:from-white hover:to-emerald-50/30 shadow-sm hover:shadow-md hover:border-emerald-300 flex flex-col"
                            >
                              <div className="w-full h-36 mx-auto rounded-2xl bg-gradient-to-br from-slate-50 via-white to-slate-100 border border-slate-200/60 p-4 flex items-center justify-center mb-4 overflow-hidden group-hover:border-emerald-200 transition-colors shadow-inner shrink-0">
                                <img
                                  src={sec.image || lessons[activeLessonId - 1].image}
                                  alt={sec.title}
                                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                />
                              </div>

                              <div className="space-y-2 flex-1 flex flex-col">
                                <div>
                                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100/80 text-emerald-700 text-xs font-extrabold uppercase tracking-wider">
                                    Topic {idx + 1}
                                  </span>
                                </div>
                                <h4 className="font-extrabold text-lg text-[#1A1C2E] leading-snug group-hover:text-emerald-600 transition-colors">
                                  {sec.title}
                                </h4>
                                <p className="text-sm font-medium text-slate-500 leading-relaxed pt-1 whitespace-pre-line flex-1">
                                  {sec.desc}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 max-w-2xl mx-auto">
                          <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => setActiveLessonTab('test')}
                            className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-2xl text-sm font-extrabold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg cursor-pointer group"
                          >
                            <span>Ready to Test Knowledge?</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                          </motion.button>
                        </div>
                      </motion.div>
                    )}

                    {/* Play Game Stage Removed */}

                    {activeLessonTab === 'test' && (
                      <motion.div
                        key="stage-test"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="py-2"
                      >
                        {quizCleared ? (
                          <div className="bg-white border border-slate-200 text-[#1A1C2E] rounded-3xl p-6 sm:p-8 text-center max-w-xl mx-auto space-y-5 shadow-sm relative overflow-hidden">
                            <ConfettiExplosion />

                            <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto shadow-sm">
                              <Trophy size={32} className="text-amber-500" />
                            </div>

                            <div>
                              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                                Assessment Verified
                              </span>
                              <h4 className="font-extrabold text-xl sm:text-2xl text-[#1A1C2E] mt-3">
                                Module Completed: {lessons[activeLessonId - 1].badge}
                              </h4>
                              <p className="text-sm text-slate-600 leading-relaxed font-medium mt-2">
                                You have successfully demonstrated comprehension of this lesson module. Your recognition badge has been recorded.
                              </p>
                            </div>

                            {activeLessonId < lessons.length ? (
                              <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => {
                                  const nextId = activeLessonId + 1;
                                  if (!unlockedLessons.includes(nextId)) {
                                    setUnlockedLessons(prev => [...prev, nextId]);
                                  }
                                  setActiveLessonId(nextId);
                                  setActiveLessonTab('learn');
                                }}
                                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                              >
                                <span>Proceed to Lesson {activeLessonId + 1}: {lessons[activeLessonId].badge}</span> <ArrowRight size={18} />
                              </motion.button>
                            ) : (
                              <div className="space-y-4 pt-2">
                                <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-center shadow-sm">
                                  <p className="text-sm text-amber-900 font-bold">
                                    Amazing job! You completed all 5 Lessons and disarmed every hacker and scammer trap. You are a Certified Cyber Defender!
                                  </p>
                                </div>
                                <motion.button
                                  whileHover={{ scale: 1.01 }}
                                  whileTap={{ scale: 0.99 }}
                                  onClick={() => setActiveFilter('Knowledge Base')}
                                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                                >
                                  <Award size={18} /> Explore Knowledge Base
                                </motion.button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <LessonQuiz 
                            questions={lessons[activeLessonId - 1].quiz}
                            onComplete={() => {
                              if (!completedLessons.includes(activeLessonId)) {
                                setCompletedLessons(prev => [...prev, activeLessonId]);
                              }
                              setQuizCleared(true);
                              if (activeLessonId < 5) {
                                const nextId = activeLessonId + 1;
                                if (!unlockedLessons.includes(nextId)) {
                                  setUnlockedLessons(prev => [...prev, nextId]);
                                }
                              } else {
                                if (!completedLessons.includes(5)) {
                                  setCompletedLessons(prev => [...prev, 5]);
                                }
                              }
                            }}
                          />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </section>
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
        onClick={() => navigate("/#missions-grid")}
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
            {selectedItem.type === 'video' ? (
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
                          <Play size={12} fill="currentColor" /> VIDEO MODULE
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
            ) : (
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                className="bg-white rounded-[28px] max-w-xl w-[92%] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col border border-emerald-500/20"
                onClick={e => e.stopPropagation()}
              >
                {/* Header Banner */}
                <div className="relative bg-gradient-to-br from-[#063b2c] via-[#09523d] to-[#0d6e52] p-6 text-white overflow-hidden">
                  <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-emerald-400/10 rounded-full blur-xl pointer-events-none" />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/5 pointer-events-none">
                    <Shield size={120} />
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-all cursor-pointer backdrop-blur-md"
                  >
                    <XCircle size={20} />
                  </button>

                  <div className="relative z-10 pr-8">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1.5 shadow-sm">
                        <FileText size={12} className="text-emerald-300" /> READING MATERIAL
                      </span>
                      {selectedItem.duration && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-200/80 bg-black/20 px-2.5 py-0.5 rounded-full">
                          <Clock size={12} /> {selectedItem.duration}
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl md:text-2xl font-black text-white leading-tight">
                      {selectedItem.title}
                    </h2>
                  </div>
                </div>

                {/* Content Section */}
                <div 
                  data-lenis-prevent
                  className="p-6 md:p-7 max-h-[60vh] overflow-y-auto custom-modal-scrollbar space-y-5"
                >
                  <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/40 border border-emerald-500/15 rounded-2xl p-5 md:p-6 shadow-sm relative">
                    <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-xs uppercase tracking-wider mb-3.5 pb-2.5 border-b border-emerald-500/10">
                      <Shield className="text-emerald-600 shrink-0" size={16} />
                      <span>Lesson Details & Guidelines</span>
                    </div>
                    <div className="text-slate-700 font-semibold text-sm md:text-[15px] leading-relaxed whitespace-pre-line space-y-2">
                      {selectedItem.content}
                    </div>
                  </div>

                  {selectedItem.desc && (
                    <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200/60 p-3.5 rounded-xl text-xs font-bold text-slate-500">
                      <Sparkles size={16} className="text-amber-500 shrink-0" />
                      <span>{selectedItem.desc}</span>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-4">
                  <span className="text-xs font-bold text-slate-400 hidden sm:flex items-center gap-1.5">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> Stay secure & alert online!
                  </span>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="w-full sm:w-auto ml-auto px-6 py-2.5 bg-gradient-to-r from-[#10b981] to-[#0d9488] hover:from-[#059669] hover:to-[#0f766e] text-white rounded-full text-xs font-black tracking-wide uppercase transition-all shadow-md shadow-emerald-500/25 cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    Got It, Stay Safe <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CyberSecurityDashboard;
