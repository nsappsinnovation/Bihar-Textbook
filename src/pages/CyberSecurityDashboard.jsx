import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, BookOpen,
  Shield, Trophy, Play, Clock, GraduationCap, FileText, ChevronRight, CheckCircle2, XCircle,
  Gamepad2, Key
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
                    <div className={`px-2 py-0.5 rounded text-[9px] font-black border ${timeLeft > 10
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
}// Chat Patrol mini-game component
const ChatPatrol = ({ onComplete }) => {
  const chatMissions = [
    {
      id: 1,
      title: "🤖 Robo-Gamer99's Cheat Trap",
      character: "Robo-Gamer99",
      avatar: "🤖",
      avatarBg: "bg-purple-600",
      initialMessage: "Hey friend! Want free infinite gold and diamond pets in your game? 🎮 Just send me a picture of your parent's credit card (the plastic bank card) and tell me the 3 tiny numbers on the back!",
      options: [
        {
          text: "Wow! Free gold! Let me find the credit card right now! 💳",
          isCorrect: false,
          feedback: "Oh no! The gaming monster bought 100 digital alien space-bananas with your parents' card! 🍌 Rule: NEVER share credit cards or bank card details with online strangers!"
        },
        {
          text: "Wait! Free stuff shouldn't ask for a credit card. I never share bank cards! 🚫",
          isCorrect: true,
          feedback: "Hooray! You blocked the monster! They got frustrated and self-destructed in a cloud of digital sparks! ⚡"
        }
      ]
    },
    {
      id: 2,
      title: "🦄 The Rainbow Unicorn Club",
      character: "Super-Unicorn-77",
      avatar: "🦄",
      avatarBg: "bg-pink-500",
      initialMessage: "Omg! You won a giant, fluffy rainbow unicorn plushie! 🦄 Tell me your home address and where you go to school so the delivery truck can drop it off right now!",
      options: [
        {
          text: "Yay! My address is 123 Rainbow Street and I go to Sunshine School...",
          isCorrect: false,
          feedback: "Oh no! The unicorn was actually a sneaky spyware robot in a costume! Now they know where you live and play. Rule: NEVER share your real name, address, or school online!"
        },
        {
          text: "Stop! I don't give my home address or school name to people online! 🛑",
          isCorrect: true,
          feedback: "Amazing job! You protected your secret base! The robot unicorn malfunctioned and rolled away on a unicycle! 🚲"
        }
      ]
    },
    {
      id: 3,
      title: "🦝 Uncle Pockets' Vault Key",
      character: "Uncle Pockets",
      avatar: "🦝",
      avatarBg: "bg-amber-600",
      initialMessage: "Alert! Your digital piggy bank has a leak! 🚨 Quick, read me the 4-digit code (OTP) that just popped up on your parent's phone so I can patch it!",
      options: [
        {
          text: "Oh no! Stop the leak! The code is 9987! 📱",
          isCorrect: false,
          feedback: "Oh no! That code was the key to the vault! Uncle Pockets opened the piggy bank and flew away with all the coins! 🚀 Rule: NEVER share OTP codes with anyone!"
        },
        {
          text: "Wait! I will ask my parents first. I never share security codes! 🕵️",
          isCorrect: true,
          feedback: "Perfect! You kept the vault locked! Uncle Pockets cried: 'Curses! Foiled again!' and vanished into a puff of smoke! 🔐"
        }
      ]
    }
  ];

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
            💬 Chat Patrol: Monster or Friend?
          </h3>
          <p className="text-[11px] text-slate-300 mt-1">
            🚨 Tricky monsters are trying to steal your family secrets or piggy bank! Read their messages and pick the safest reply. Don't share cards, passwords, or personal details!
          </p>
        </div>
        <div className="bg-emerald-950/60 border border-emerald-500/30 px-3.5 py-1.5 rounded-full flex items-center gap-2 w-max">
          <span className="text-[9px] font-black text-slate-300 uppercase tracking-wider">SHIELDS EARNED:</span>
          <span className="text-xs font-black text-yellow-400">🛡️ {getScore()} / {chatMissions.length}</span>
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
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-lg ${m.avatarBg}`}>
                      {m.avatar}
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
                  {isDone && <span className="text-[10px] font-black text-yellow-400">🛡️ CLEARED</span>}
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
              <span className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0 ${activeMission.avatarBg} animate-bounce`}>
                {activeMission.avatar}
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
                  <span className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0 bg-emerald-600 text-white font-bold">
                    👶
                  </span>
                </div>

                {/* Outcome message */}
                <div className={`p-4 rounded-xl border ${
                  selectedChoice.isCorrect 
                    ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300' 
                    : 'bg-rose-950/80 border-rose-500/40 text-rose-300'
                } text-xs font-medium leading-relaxed`}>
                  <div className="flex items-center gap-2 mb-2 font-black text-sm uppercase tracking-wider">
                    {selectedChoice.isCorrect ? "🏆 Success! Hacker Blocked!" : "🚨 Alert! You got Tricked!"}
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
      title: "🚨 The Suspicious Text Message",
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
          label: "🚨 Scary Panic Words (SUSPENDED!)",
          desc: "Scammers use scary words like 'SUSPENDED!' to make you panic and click quickly without thinking. Real banks or companies never talk to you like this! Always stay calm."
        },
        2: {
          label: "😱 Threat of Losing Money (FOREVER:)",
          desc: "Saying your money is gone 'FOREVER' is a scare tactic. They want to make you scared so you act fast. Real banks will never threat-text you. Show it to a parent!"
        },
        3: {
          label: "🔗 Weird Web Link",
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
            🕵️ Scam Link Detective
          </h3>
          <p className="text-[11px] text-slate-300 mt-1">
            🚨 A sneaky scammer sent a text message to trick you! Tap the yellow words inside the SMS message to discover the 3 warning signs (Red Flags).
          </p>
        </div>
        <div className="bg-emerald-950/60 border border-emerald-500/30 px-3.5 py-1.5 rounded-full flex items-center gap-2 w-max">
          <span className="text-[9px] font-black text-slate-300 uppercase tracking-wider">RED FLAGS FOUND:</span>
          <span className="text-xs font-black text-yellow-400">🔍 {Object.keys(clickedFlags).length} / 3</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side: Phone UI */}
        <div className="bg-slate-950 rounded-3xl p-4 border border-emerald-500/10 flex flex-col items-center">
          <div className="w-20 h-4 bg-slate-800 rounded-full mb-4"></div> {/* notch */}
          
          <div className="w-full bg-[#0d1e19] border border-emerald-900/40 rounded-2xl p-4 min-h-[200px] flex flex-col">
            <div className="flex items-center gap-2 pb-3 border-b border-emerald-950/60 mb-3">
              <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm">💬</span>
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
              🕵️ Detective Clue Checklist
            </h4>

            {/* Clue Checklist */}
            <div className="mb-4 bg-emerald-950/20 border border-emerald-500/10 rounded-xl p-3 space-y-2">
              <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">🔍 Clues to Discover:</span>
              <div className="flex items-center justify-between text-xs font-bold">
                <span className={clickedFlags[1] ? 'text-emerald-400' : 'text-slate-400'}>1. 🚨 Scary Panic Words</span>
                <span className="text-[10px] font-black">{clickedFlags[1] ? '✅ FOUND' : '❌ HIDDEN'}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold">
                <span className={clickedFlags[2] ? 'text-emerald-400' : 'text-slate-400'}>2. 😱 Threat of Losing Money</span>
                <span className="text-[10px] font-black">{clickedFlags[2] ? '✅ FOUND' : '❌ HIDDEN'}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold">
                <span className={clickedFlags[3] ? 'text-emerald-400' : 'text-slate-400'}>3. 🔗 Weird Scammy Web Link</span>
                <span className="text-[10px] font-black">{clickedFlags[3] ? '✅ FOUND' : '❌ HIDDEN'}</span>
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
                <div className="bg-emerald-900/30 border border-emerald-500/30 p-3.5 rounded-xl text-emerald-350 text-xs font-bold leading-relaxed">
                  🎉 Fantastic work, Detective! You disarmed the scammer! Always remember: If a text has scary threats or weird links, NEVER click them. Tell a parent!
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
        color: "border-dashed border-slate-700 bg-slate-900 text-slate-650",
        desc: "Type a password to start forging!",
        emoji: "💨"
      };
    }
    switch(strength) {
      case 0:
      case 1:
        return {
          name: "Fragile Cardboard Shield",
          color: "border-amber-850 bg-amber-955/40 text-amber-500 shadow-amber-900/10",
          desc: "Flimsy! Easily broken by the goblin's paper airplane.",
          emoji: "📦"
        };
      case 2:
        return {
          name: "Reinforced Wooden Shield",
          color: "border-yellow-750 bg-yellow-955/30 text-yellow-600 shadow-yellow-800/10",
          desc: "Decent! Can handle small rocks but will break under laser fire.",
          emoji: "🪵"
        };
      case 3:
        return {
          name: "Polished Iron Bulwark",
          color: "border-slate-500 bg-slate-800 text-slate-300 shadow-slate-700/20",
          desc: "Solid! Standard security that repels basic hacker slingshots.",
          emoji: "🛡️"
        };
      case 4:
        return {
          name: "Glowing Emerald Forcefield",
          color: "border-emerald-400 bg-emerald-950/60 text-emerald-300 shadow-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]",
          desc: "Incredible! Reflects the Goblin's plasma cannon right back at them!",
          emoji: "⚡"
        };
      default:
        return {
          name: "Cardboard Shield",
          color: "border-amber-800 bg-amber-950/40 text-amber-500",
          desc: "Type a stronger password!",
          emoji: "📦"
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
            🛡️ Password Shield Forge
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
            {isTesting ? "🔥 Testing Shield Defenses..." : "⚔️ Test Shield Against Goblin!"}
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
              <div className={`w-20 h-20 rounded-full border-2 flex items-center justify-center text-3xl shadow-inner transition-all duration-300 ${shield.color}`}>
                {shield.emoji}
              </div>
              <div className="text-xs font-bold text-slate-200 mt-2">{shield.name}</div>
            </div>

            <div className="text-xs font-black text-slate-605 uppercase tracking-widest">VS</div>

            {/* Scammer Goblin display */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full border border-rose-500/20 bg-rose-950/20 flex items-center justify-center text-3xl shadow-lg animate-pulse">
                🤢
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
                💥 The Glitch Goblin threw a wet tomato 🍅 and completely shattered your Cardboard Shield! Access denied to castle! Try building a wooden or iron shield!
              </motion.div>
            )}

            {testResult === "medium" && (
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="text-xs font-semibold text-yellow-400">
                🪵 The Glitch Goblin threw a heavy rock 🪨. Your Wooden Shield blocked it, but got badly cracked! A hacker would eventually break in. Add symbols or capitals!
              </motion.div>
            )}

            {testResult === "strong" && (
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="text-xs font-semibold text-slate-350">
                🛡️ The Goblin fired a Laser Pistol! Your Iron Shield blocked it, but got burnt. Very good, but can we make it perfect by adding symbols like @,#,$?
              </motion.div>
            )}

            {testResult === "perfect" && (
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="text-xs font-semibold text-emerald-400">
                🏆 PERFECT! The Goblin fired a Giant Plasma Cannon! Your Emerald Forcefield reflected the beam back, vaporizing the goblin's weapon! Castle is 100% SECURE!
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
      title: "⚠️ CRITICAL COMPUTER DANGER!",
      text: "Warning: 99 virus bugs detected in your system! Click to clean immediately!",
      actionText: "🔴 CLEAN DEVICE NOW",
      safeAction: "Close (X)",
    },
    {
      id: 2,
      title: "🎁 FREE IPHONE 25 WINNER!",
      text: "Congratulations! You have been randomly chosen to receive a free phone! Click below to claim!",
      actionText: "🎉 CLAIM PRIZE",
      safeAction: "Close (X)",
    },
    {
      id: 3,
      title: "🚨 SECURITY FIREWALL LEAK!",
      text: "Your computer security firewall has crashed! Click to download repairs!",
      actionText: "⚡ DOWNLOAD FIX",
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
      text: "Oh no! Tapping that loaded a sneaky virus bug! 👾 Hackers got access! Remember: Never trust flashy pop-up warnings or free prize claims."
    });
  };

  const handleSafeClick = () => {
    setScore(prev => prev + 1);
    setFeedback({
      isCorrect: true,
      text: "Excellent choice! You closed the fake warning or clicked 'Ask a Parent'! That is exactly how to disarm a pop-up. 🛡️"
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
        <h4 className="font-bold text-emerald-400 flex items-center gap-2">💥 Pop-up Blaster</h4>
        <span className="text-xs bg-emerald-950 px-3 py-1 rounded-full text-yellow-400 font-bold">Score: {score}/3</span>
      </div>

      {score === 3 ? (
        <div className="text-center py-6 space-y-4">
          <div className="text-4xl">🏆</div>
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
                  🛡️ Ignore & Ask Parent
                </button>
              </div>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 py-4 text-center">
              <span className="text-3xl">{feedback.isCorrect ? "✅" : "❌"}</span>
              <p className={`text-xs font-semibold leading-relaxed ${feedback.isCorrect ? "text-emerald-400" : "text-rose-400"}`}>
                {feedback.text}
              </p>
              <button 
                onClick={feedback.isCorrect ? nextAlert : () => setFeedback(null)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-705 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-md"
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
      name: "Super Flashlight App 🔦",
      description: "A simple flashlight that turns on your camera light.",
      requests: [
        { key: "camera", name: "Access Camera (to toggle light)", safe: true },
        { key: "contacts", name: "Read Contacts & Phone Messages", safe: false }
      ]
    },
    {
      id: 2,
      name: "Calculator Pro 🧮",
      description: "Quickly solve math equations and study helper.",
      requests: [
        { key: "mic", name: "Access Microphone", safe: false },
        { key: "photos", name: "Access Photo Gallery", safe: false }
      ]
    },
    {
      id: 3,
      name: "Dino Runner Game 🦖",
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
        text: `Awesome! You allowed only necessary requests and denied the privacy threats. ${currentApp.name} is installed safely! 🛡️`
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
        <h4 className="font-bold text-emerald-400 flex items-center gap-2">🛡️ Permission Shield</h4>
        <span className="text-xs bg-emerald-950 px-3 py-1 rounded-full text-yellow-400 font-bold">Safeguarded: {completedApps}/3</span>
      </div>

      {completedApps === 3 ? (
        <div className="text-center py-6 space-y-4">
          <div className="text-4xl">👑</div>
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
                📥 Complete Installation
              </button>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 py-4 text-center">
              <span className="text-3xl">{feedback.isCorrect ? "✅" : "❌"}</span>
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
    <div className="bg-[#051c14]/90 text-white rounded-[24px] border-2 border-emerald-500/30 p-5 shadow-xl max-w-md mx-auto">
      {!showResult ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <span>QUESTION {currentQ + 1} / {questions.length}</span>
            <span className="text-yellow-400">Score: {score}</span>
          </div>

          <h5 className="text-xs font-bold text-slate-100 min-h-[40px] leading-relaxed">
            {q.question}
          </h5>

          <div className="space-y-2">
            {q.options.map((opt, idx) => {
              let btnStyle = "bg-[#06241b]/60 border-emerald-500/30 text-white hover:bg-[#093529]/70 hover:border-emerald-400";
              if (isAnswered) {
                if (idx === q.correct) btnStyle = "bg-emerald-950 border-emerald-500 text-emerald-400";
                else if (idx === selectedOption) btnStyle = "bg-rose-955 border-rose-500 text-rose-400";
                else btnStyle = "bg-[#06241b]/20 border-white/5 text-slate-500";
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-3 border rounded-xl text-xs font-bold transition-all cursor-pointer ${btnStyle}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="flex justify-between items-center pt-2">
              <span className={`text-[11px] font-bold ${isCorrectChoice ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isCorrectChoice ? "Correct Answer! 🌟" : "Oops! Incorrect choice."}
              </span>
              <button 
                onClick={handleNext}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-black transition-all cursor-pointer"
              >
                {currentQ < questions.length - 1 ? 'NEXT' : 'FINISH'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-4 space-y-4">
          <div className="text-3xl">{isAllCorrect ? "🏆" : "🔁"}</div>
          <h5 className="font-bold text-slate-100 text-xs">
            {isAllCorrect ? "Lesson Quiz Cleared!" : "Quiz Failed!"}
          </h5>
          <p className="text-xs text-slate-400 leading-relaxed font-semibold">
            {isAllCorrect 
              ? "Wonderful job! You got all questions correct and earned your badge stamp!" 
              : `You scored ${score} out of ${questions.length}. Get 100% to pass the lesson!`}
          </p>

          <div className="flex gap-2">
            {isAllCorrect ? (
              <button 
                onClick={onComplete}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Claim Badge & Unlock Next →
              </button>
            ) : (
              <button 
                onClick={handleRestart}
                className="w-full py-2 bg-slate-800 hover:bg-slate-750 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Retry Quiz
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Curriculum Lessons Database
const lessons = [
  {
    id: 1,
    title: "Lesson 1: Monster or Friend? 💬",
    badge: "🛡️ Privacy Guard",
    topic: "Chat safety & Strangers",
    summary: "Learn why talking to strangers on the internet can be tricky, and what secrets you must keep safe!",
    image: "/images/cybersecurity/lesson1.png",
    learnSections: [
      {
        title: "The Digital Playground 🌐",
        desc: "The internet is like a giant, beautiful public playground where millions of kids play games, watch cartoons, and chat. But just like a real park, you must never talk to strangers who approach you without your parents knowing!"
      },
      {
        title: "Online Pretenders 🎭",
        desc: "Did you know that some tricky monsters pretend to be kids online? A character using a cute puppy picture or claiming to be '9-year-old Alex' could actually be a hacker trying to find your secrets. Always be cautious!"
      },
      {
        title: "The Golden Safe Rules 🔑",
        desc: "Keep your personal keys safe! Never share these with anyone online:\n\n🔑 Your home address and school name\n🔑 Your phone number\n🔑 Your parent's credit card or bank details\n🔑 The 4-digit code (OTP) sent to your parents' phone."
      },
      {
        title: "Checklist for Chat Safety ✅",
        desc: "✅ **DO:** Play games with school friends you know in real life.\n✅ **DO:** Tell a parent immediately if someone online asks where you live.\n❌ **DON'T:** Send pictures of your house, school, or face to game strangers.\n❌ **DON'T:** Share passwords, even if a stranger offers you 'free Robux' or game skins."
      }
    ],
    content: "🚨 The internet is like a giant park! You can play games and chat, but sometimes tricky monsters pretend to be friendly characters.\n\n🔒 **Your Secrets are Keys!**\nNever give away your parent's bank cards, your address, or your 4-digit code (OTP) to anyone online. Keep them hidden inside your secret base!",
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
    title: "Lesson 2: Link Detectives 🕵️",
    badge: "🔍 Link Detective",
    topic: "SMS & Phishing Scams",
    summary: "Learn how to spot suspicious text messages (phishing) that try to scare you into clicking weird links.",
    image: "/images/cybersecurity/lesson2.png",
    learnSections: [
      {
        title: "Sneaky Fishing Hooks 🎣",
        desc: "Phishing (pronounced like 'fishing') is when a scammer drops a virtual hook into the digital water, hoping you will bite! They send fake text messages or emails pretending to be a bank, a game, or a delivery company."
      },
      {
        title: "Spotting the Panic Trap 🚨",
        desc: "Scammers want to scare you! They use words like 'URGENT', 'BLOCKED', or 'LOST FOREVER'. They want you to panic and tap their sneaky link immediately before you can ask an adult. Stop, breathe, and analyze!"
      },
      {
        title: "Decoding Web Links 🌐",
        desc: "Always look at the link (URL) before tapping! A safe site uses https and ends with a normal domain (like .com or .org). Scammers use weird links like bank-verify-now.xyz or free-gift-box.net/alert to sneak viruses onto your device."
      },
      {
        title: "Checklist for Link Safety ✅",
        desc: "✅ **DO:** Show suspicious text messages to a parent or teacher.\n✅ **DO:** Delete the message immediately if you don't recognize the sender.\n❌ **DON'T:** Click on links in SMS messages claiming you won a lottery or a phone.\n❌ **DON'T:** Enter passwords or usernames on pages that look weird or suspicious."
      }
    ],
    content: "📱 Scammers send sneaky text messages that try to make you panic!\n\n⚠️ **Look for the 3 Red Flags:**\n1. **Scary Words:** 'Your account is SUSPENDED!'\n2. **Extreme Threats:** 'Your money is lost FOREVER!'\n3. **Weird Links:** Websites ending in weird letters like '.xyz' instead of '.com'.\n\nIf you see these, don't tap! Call a parent!",
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
    title: "Lesson 3: Shield Forging 🏰",
    badge: "⚔️ Password Smith",
    topic: "Strong Password Creation",
    summary: "Learn how to create passwords that act like indestructible forcefields against the Glitch Goblin!",
    image: "/images/cybersecurity/lesson3.png",
    learnSections: [
      {
        title: "The Fortress Gate 🏰",
        desc: "A password is like the drawbridge of your digital castle. If it's weak (like '123456' or 'superman'), the Glitch Goblin and hacking robots can kick it down in seconds! A strong password keeps your account safe."
      },
      {
        title: "The Materials of Defense ⚔️",
        desc: "📦 Cardboard Shield: 'cat' or 'password' — Cracks instantly!\n🪵 Wooden Door: 'cat123' or 'superman10' — Cracks in a few minutes.\n⛓️ Iron Gate: 'CatDog2024' — Good, but robots can still guess it eventually.\n💎 Emerald Forcefield: 'C@t&D0g#2026!' — Indestructible! Mixing letters, numbers, and symbols creates the ultimate defense."
      },
      {
        title: "How to Remember Your Shield 🧠",
        desc: "Create a fun, secret sentence! For example: 'I love eating pizza on Fridays!' becomes 'Il2ep0F!'. It is super easy for you to remember, but impossible for a hacking robot to guess!"
      },
      {
        title: "Checklist for Password Safety ✅",
        desc: "✅ **DO:** Use different passwords for different games.\n✅ **DO:** Keep your passwords written down in a secret notebook at home.\n❌ **DON'T:** Use easy-to-guess things like your birthday or pet's name.\n❌ **DON'T:** Share your password with anyone, not even your best friends at school!"
      }
    ],
    content: "🏰 Hackers use guessing robots to break into your accounts. If your password is too easy, they will crack it in a second!\n\n🛡️ **The Shield Blueprint:**\n• Simple passwords (like '123456' or 'doggy') are fragile like **Cardboard**.\n• Add capitals (ABC) and numbers (123) to make an **Iron Gate**.\n• Add symbols (@, #, $, %) to forge an **Emerald Forcefield** that blocks everything!",
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
    title: "Lesson 4: Pop-up Blaster 💥",
    badge: "⚡ Pop-up Blaster",
    topic: "Device Safety & Updates",
    summary: "Learn to ignore fake scary virus alerts and keep your device software updated to keep hackers out.",
    image: "/images/cybersecurity/lesson4.png",
    learnSections: [
      {
        title: "Beware of Loud Pop-ups 🔊",
        desc: "When browsing, some pages display red flashing warning boxes shouting: 'WARNING! 99 VIRUSES DETECTED!' or 'YOUR DEVICE IS INFECTED!'. Don't be scared! These are fake warnings designed to trick you into downloading viruses."
      },
      {
        title: "Disarming the Trap 💥",
        desc: "Never click the big, bright buttons in a pop-up. Instead, look closely for a tiny, white X button in the top corner. If you can't find it, close the browser tab or ask an adult to close it for you."
      },
      {
        title: "Software Updates are Shield Refills 🛡️",
        desc: "Hacking robots constantly search for hidden holes (security bugs) in your games and operating systems. When you update your apps, the creators patch up these holes, keeping the robots locked out!"
      },
      {
        title: "Checklist for Device Safety ✅",
        desc: "✅ **DO:** Turn on 'Automatic Updates' for your phone, tablet, or computer.\n✅ **DO:** Close the browser tab if a flashy screen blocks your page.\n❌ **DON'T:** Install 'device cleaner' or 'helper' apps suggested by pop-ups.\n❌ **DON'T:** Postpone important system updates for too long."
      }
    ],
    content: "💥 While surfing the web, you might see scary pop-up boxes shouting: 'YOUR DEVICE HAS 50 VIRUSES! CLICK NOW TO REPAIR!'\n\n👾 **It's a Trick!**\nThese are fake pop-ups trying to make you download bad apps. Never click the big green buttons. Always close the window by clicking the small white 'X' or show it to a parent!",
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
    title: "Lesson 5: Permission Safeguard 🛡️",
    badge: "👑 Safe Downloader",
    topic: "2FA & App Permissions",
    summary: "Learn about Two-Factor Authentication (2FA) and how to deny sneaky apps from spying on your photos or location.",
    image: "/images/cybersecurity/lesson5.png",
    learnSections: [
      {
        title: "The Double-Lock Lockbox 🔑🔑",
        desc: "Two-Factor Authentication (2FA) is like locking your chest with two different keys. When you log in with your password, a secret one-time code is sent to your parent's phone. Even if a hacker steals your password, they can't get in without that second key!"
      },
      {
        title: "Sneaky App Demands 📱",
        desc: "When you download a new game, it asks for permission to access your device features. A driving game might need access to your screen controls, but does a calculator app need to see your photo gallery or know your location? Absolutely not!"
      },
      {
        title: "The Permission Shield Rules 🛡️",
        desc: "Always review permission requests! If an app asks for something it doesn't need to work, click DENY. It's better to be safe than let sneaky apps track your coordinates or read your private messages."
      },
      {
        title: "Checklist for Permission Safety ✅",
        desc: "✅ **DO:** Enable 2FA on your main gaming and school accounts with parent help.\n✅ **DO:** Deny location access for games that do not require mapping.\n❌ **DON'T:** Download apps from random websites. Only use official app stores.\n❌ **DON'T:** Click 'Allow' to every popup without reading what it is asking for."
      }
    ],
    content: "👑 Keep your digital house safe with a double lock!\n\n🔑 **2FA (Two-Factor Authentication):**\nThis requires both a password AND a secret code sent to your parent's phone to log in. Even if a hacker guesses your password, they can't get in!\n\n📱 **App Permission Rules:**\nIf a simple Flashlight app asks to see your photos, contacts, or location, **DENY IT!** Apps should only access what they need to work.",
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
            <div className="space-y-6">
              {/* Timeline Header */}
              <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Your Learning Journey</span>
                  <span className="text-xs font-black text-emerald-600">
                    {completedLessons.length} / 5 Lessons Cleared
                  </span>
                </div>
                
                {/* Timeline Path */}
                <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                  {lessons.map((less, idx) => {
                    const isUnlocked = unlockedLessons.includes(less.id);
                    const isCompleted = completedLessons.includes(less.id);
                    const isActive = activeLessonId === less.id;
                    
                    return (
                      <React.Fragment key={less.id}>
                        {idx > 0 && (
                          <div className={`hidden md:block flex-grow h-[3px] transition-colors ${
                            isUnlocked ? 'bg-emerald-500' : 'bg-slate-200'
                          }`} />
                        )}
                        <button
                          onClick={() => isUnlocked && setActiveLessonId(less.id)}
                          disabled={!isUnlocked}
                          className={`flex-1 text-left p-3 rounded-2xl border transition-all cursor-pointer ${
                            isActive 
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/20'
                              : isUnlocked 
                                ? 'bg-white text-slate-800 border-slate-200 hover:border-emerald-400'
                                : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-60'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-[8px] font-black uppercase tracking-wider ${
                              isActive ? 'text-emerald-100' : 'text-slate-400'
                            }`}>
                              {less.badge}
                            </span>
                            <span>
                              {isCompleted ? '✅' : !isUnlocked ? '🔒' : '⭐'}
                            </span>
                          </div>
                          <div className="text-xs font-black truncate">{less.title}</div>
                        </button>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Active Lesson Details Card */}
              <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-6 space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                      {lessons[activeLessonId - 1].title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 font-semibold">
                      Topic: {lessons[activeLessonId - 1].topic}
                    </p>
                  </div>
                  
                  {/* Sub-tabs */}
                  <div className="flex gap-1.5 bg-slate-100 p-1 rounded-full border border-slate-200/60">
                    {[
                      { id: 'learn', label: '📖 Learn', disabled: false },
                      { id: 'play', label: '🎮 Play Game', disabled: false },
                      { id: 'test', label: '📝 Take Quiz', disabled: !gameCleared && !completedLessons.includes(activeLessonId) }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => !tab.disabled && setActiveLessonTab(tab.id)}
                        disabled={tab.disabled}
                        className={`px-4 py-2 rounded-full text-[10px] font-black tracking-wide uppercase transition-all cursor-pointer ${
                          activeLessonTab === tab.id
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : tab.disabled 
                              ? 'text-slate-300 cursor-not-allowed opacity-60'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sub-tab Content Area */}
                <div className="min-h-[300px]">
                  {activeLessonTab === 'learn' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                      {/* Left Side: Cartoon Illustration Card */}
                      <div className="lg:col-span-5 flex flex-col justify-between bg-slate-50 border border-slate-200/60 rounded-[28px] p-5 shadow-sm space-y-4">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 bg-white flex items-center justify-center shadow-inner group">
                          <img
                            src={lessons[activeLessonId - 1].image}
                            alt={lessons[activeLessonId - 1].title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 bg-emerald-600/90 backdrop-blur-sm px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider text-white shadow-sm">
                            Visual Guide
                          </div>
                        </div>
                        <div className="bg-[#051c14]/95 border border-emerald-500/25 p-4 rounded-2xl text-white shadow-sm">
                          <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest block mb-1">
                            🎯 Key Mission
                          </span>
                          <p className="text-[11px] font-bold text-slate-200 leading-relaxed">
                            {lessons[activeLessonId - 1].summary}
                          </p>
                        </div>
                      </div>

                      {/* Right Side: Detailed Expandable Reading Guide */}
                      <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
                            Interactive Knowledge Guide - Tap to Explore
                          </h4>
                          {lessons[activeLessonId - 1].learnSections.map((sec, idx) => {
                            const isExpanded = expandedSectionIndex === idx;
                            return (
                              <div
                                key={idx}
                                className={`border rounded-2xl transition-all ${
                                  isExpanded
                                    ? 'bg-emerald-50/50 border-emerald-300 shadow-sm'
                                    : 'bg-white border-slate-200/80 hover:border-slate-300'
                                }`}
                              >
                                <button
                                  onClick={() => setExpandedSectionIndex(idx)}
                                  className="w-full text-left px-5 py-4 flex items-center justify-between font-bold text-slate-800 text-xs cursor-pointer select-none"
                                >
                                  <span>{sec.title}</span>
                                  <span className={`text-xs transition-transform duration-200 ${
                                    isExpanded ? 'rotate-90 text-emerald-600' : 'text-slate-400'
                                  }`}>
                                    ▶
                                  </span>
                                </button>
                                <AnimatePresence initial={false}>
                                  {isExpanded && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.25 }}
                                      className="overflow-hidden"
                                    >
                                      <p className="px-5 pb-5 pt-1 text-[11px] font-semibold text-slate-600 leading-relaxed whitespace-pre-line border-t border-slate-100">
                                        {sec.desc}
                                      </p>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>

                        <div className="flex justify-end pt-2">
                          <button
                            onClick={() => setActiveLessonTab('play')}
                            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold text-[13px] flex items-center gap-2 cursor-pointer shadow-md transition-all active:scale-95 hover:shadow-emerald-500/20"
                          >
                            🎮 Play Game & Practice <ArrowRight size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeLessonTab === 'play' && (
                    <div className="space-y-6">
                      {activeLessonId === 1 && (
                        <ChatPatrol 
                          onComplete={() => {
                            setGameCleared(true);
                          }}
                        />
                      )}
                      {activeLessonId === 2 && (
                        <ScamDetective 
                          onComplete={() => {
                            setGameCleared(true);
                          }}
                        />
                      )}
                      {activeLessonId === 3 && (
                        <PasswordForge 
                          onComplete={() => {
                            setGameCleared(true);
                          }}
                        />
                      )}
                      {activeLessonId === 4 && (
                        <PopupBlaster 
                          onComplete={() => {
                            setGameCleared(true);
                          }}
                        />
                      )}
                      {activeLessonId === 5 && (
                        <PermissionShield 
                          onComplete={() => {
                            setGameCleared(true);
                          }}
                        />
                      )}

                      {gameCleared && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="max-w-md mx-auto bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-3 shadow-sm"
                        >
                          <span className="text-xs font-bold text-emerald-800 text-center md:text-left">
                            🎉 Game Cleared! Ready to test your knowledge?
                          </span>
                          <button
                            onClick={() => setActiveLessonTab('test')}
                            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md"
                          >
                            📝 Go to Quiz
                          </button>
                        </motion.div>
                      )}
                    </div>
                  )}

                  {activeLessonTab === 'test' && (
                    <div className="py-4">
                      <LessonQuiz 
                        questions={lessons[activeLessonId - 1].quiz}
                        onComplete={() => {
                          if (!completedLessons.includes(activeLessonId)) {
                            setCompletedLessons(prev => [...prev, activeLessonId]);
                          }
                          if (activeLessonId < 5) {
                            const nextId = activeLessonId + 1;
                            if (!unlockedLessons.includes(nextId)) {
                              setUnlockedLessons(prev => [...prev, nextId]);
                            }
                            setActiveLessonId(nextId);
                            setActiveLessonTab('learn');
                          } else {
                            setQuizCleared(true);
                            if (!completedLessons.includes(5)) {
                              setCompletedLessons(prev => [...prev, 5]);
                            }
                          }
                        }}
                      />
                    </div>
                  )}

                  {activeLessonId === 5 && quizCleared && (
                    <motion.div 
                      initial={{ scale: 0.95, opacity: 0 }} 
                      animate={{ scale: 1, opacity: 1 }} 
                      className="max-w-md mx-auto mt-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-6 rounded-3xl text-center space-y-4 shadow-xl"
                    >
                      <div className="text-4xl">👑</div>
                      <h4 className="font-extrabold text-sm uppercase tracking-wide">Cyber Academy Graduate!</h4>
                      <p className="text-xs leading-relaxed font-semibold text-emerald-55">
                        Amazing job! You completed all 5 Lessons and disarmed every hacker and scammer trap. You are a Certified Cyber Defender!
                      </p>
                    </motion.div>
                  )}
                </div>
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
