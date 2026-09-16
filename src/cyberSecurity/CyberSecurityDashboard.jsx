import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, BookOpen, Shield, Trophy, Play, Clock, GraduationCap, FileText, ChevronRight, CheckCircle2, XCircle, Gamepad2, Key,
  Bot, CreditCard, Ban, Zap, Sparkles, User, AlertOctagon, Smartphone, Rocket, Lock, Unlock, Search, Package, Hammer, Skull, Globe, Ghost, UserX, Volume2, Award, Star, RefreshCw, Target, Bell, HelpCircle, MessageSquare, LayoutGrid, RotateCcw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const getQuizQuestions = (t) => [
  {
    question: t("cyber.question_Yougetanemailsayingy", { defaultValue: "You get an email saying you won a lottery. What should you do?" }),
    options: [t("cyber.arr_Clickthelinktoclaimi", { defaultValue: "Click the link to claim it" }), t("cyber.arr_Replywithyourbankdet", { defaultValue: "Reply with your bank details" }), t("cyber.arr_Deleteitanddonotclic", { defaultValue: "Delete it and do not click any links" }), t("cyber.arr_Forwardittoyourfrien", { defaultValue: "Forward it to your friends" })],
    correct: 2,
  },
  {
    question: t("cyber.question_Whatmakesastrongpass", { defaultValue: "What makes a strong password?" }),
    options: [t("cyber.arr_Yourpetsname", { defaultValue: "Your pet's name" }), t("cyber.arr_12345678", { defaultValue: "12345678" }), t("cyber.arr_Amixoflettersnumbers", { defaultValue: "A mix of letters, numbers, and symbols" }), t("cyber.arr_Yourbirthdate", { defaultValue: "Your birthdate" })],
    correct: 2,
  },
  {
    question: t("cyber.question_Someoneonlineasksfor", { defaultValue: "Someone online asks for your home address to send a free game. What do you do?" }),
    options: [t("cyber.arr_Giveittothem", { defaultValue: "Give it to them" }), t("cyber.arr_Neversharepersonalin", { defaultValue: "Never share personal info online" }), t("cyber.arr_Askyourfriendswhatto", { defaultValue: "Ask your friends what to do" }), t("cyber.arr_Giveafakeaddress", { defaultValue: "Give a fake address" })],
    correct: 1,
  },
  {
    question: t("cyber.question_Whatisphishing", { defaultValue: "What is phishing?" }),
    options: [t("cyber.arr_Catchingfishinapond", { defaultValue: "Catching fish in a pond" }), t("cyber.arr_Ascamtotrickyouintos", { defaultValue: "A scam to trick you into sharing passwords" }), t("cyber.arr_Anewvideogame", { defaultValue: "A new video game" }), t("cyber.arr_Asecurewaytochat", { defaultValue: "A secure way to chat" })],
    correct: 1,
  },
  {
    question: t("cyber.question_Whyshouldyouupdateyo", { defaultValue: "Why should you update your apps and games?" }),
    options: [t("cyber.arr_Tomakethemloadslower", { defaultValue: "To make them load slower" }), t("cyber.arr_Togetnewcolors", { defaultValue: "To get new colors" }), t("cyber.arr_Tofixsecuritybugsand", { defaultValue: "To fix security bugs and keep hackers out" }), t("cyber.arr_Tousemorestoragespac", { defaultValue: "To use more storage space" })],
    correct: 2,
  },
  {
    question: t("cyber.question_Youseeapopupsayingyo", { defaultValue: "You see a pop-up saying your computer has a virus. What should you do?" }),
    options: [t("cyber.arr_Callthenumberonthesc", { defaultValue: "Call the number on the screen" }), t("cyber.arr_ClickDownloadAntivir", { defaultValue: "Click 'Download Antivirus'" }), t("cyber.arr_Closethewindowandtel", { defaultValue: "Close the window and tell an adult" }), t("cyber.arr_Buythesuggestedsoftw", { defaultValue: "Buy the suggested software" })],
    correct: 2,
  },
  {
    question: t("cyber.question_Whatdoes2FATwoFactor", { defaultValue: "What does 2FA (Two-Factor Authentication) do?" }),
    options: [t("cyber.arr_Addsanextralayerofse", { defaultValue: "Adds an extra layer of security" }), t("cyber.arr_Makesyourinternettwi", { defaultValue: "Makes your internet twice as fast" }), t("cyber.arr_Logsyouinautomatical", { defaultValue: "Logs you in automatically" }), t("cyber.arr_Sharesyourpasswordwi", { defaultValue: "Shares your password with two friends" })],
    correct: 0,
  },
  {
    question: t("cyber.question_Whichoftheseissafeto", { defaultValue: "Which of these is safe to share on public social media?" }),
    options: [t("cyber.arr_YourschoolnameandID", { defaultValue: "Your school name and ID" }), t("cyber.arr_Yourfavoritemovie", { defaultValue: "Your favorite movie" }), t("cyber.arr_Yourexactlivelocatio", { defaultValue: "Your exact live location" }), t("cyber.arr_Yourphonenumber", { defaultValue: "Your phone number" })],
    correct: 1,
  },
  {
    question: t("cyber.question_Whatshouldyoudobefor", { defaultValue: "What should you do before downloading a new app?" }),
    options: [t("cyber.arr_Checkreviewsandpermi", { defaultValue: "Check reviews and permissions" }), t("cyber.arr_Downloaditblindlyifi", { defaultValue: "Download it blindly if it looks fun" }), t("cyber.arr_Turnoffyourantivirus", { defaultValue: "Turn off your antivirus" }), t("cyber.arr_Shareitwitheveryone", { defaultValue: "Share it with everyone" })],
    correct: 0,
  },
  {
    question: t("cyber.question_Astrangersendsyouafr", { defaultValue: "A stranger sends you a friend request. What is the best action?" }),
    options: [t("cyber.arr_Acceptitimmediately", { defaultValue: "Accept it immediately" }), t("cyber.arr_Chatwiththemfirst", { defaultValue: "Chat with them first" }), t("cyber.arr_Ignoreordeclineitify", { defaultValue: "Ignore or decline it if you don't know them" }), t("cyber.arr_Sendthemyourphoto", { defaultValue: "Send them your photo" })],
    correct: 2,
  },
];

const optionLabels = ['A', 'B', 'C', 'D'];

const CyberSecurityQuiz = () => {
  const { t } = useTranslation();
  const quizQuestions = useMemo(() => getQuizQuestions(t), [t]);
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
    <div className="w-full min-h-[580px] flex items-center justify-center font-sans select-none py-10 px-4 relative rounded-[24px] overflow-hidden shadow-2xl border border-emerald-500/30">
      {/* High-Tech Cyber Background Picture with Gradient & Mesh Overlay */}
      <div className="absolute inset-0 z-0">
        <img loading="lazy" decoding="async" 
          src="/images/cybersecurity/cs_quiz_background.webp" 
          onError={(e) => { e.target.src = '/images/cybersecurity/rhs.webp'; }}
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
  const { t } = useTranslation();
  const chatMissions = useMemo(() => getChatMissions(t), [t]);
  const getChatMissions = (t) => [
    {
      id: 1,
      title: t("cyber.title_RoboGamer99sCheatTra", { defaultValue: "Robo-Gamer99's Cheat Trap" }),
      character: "Robo-Gamer99",
      iconType: "bot",
      avatarBg: "bg-purple-600",
      initialMessage: "Hey friend! Want free infinite gold and diamond pets in your game? Just send me a picture of your parent's credit card (the plastic bank card) and tell me the 3 tiny numbers on the back!",
      options: [
        {
          text: t("cyber.arr_WowFreegoldLetmefind", { defaultValue: "Wow! Free gold! Let me find the credit card right now!" }),
          isCorrect: false,
          feedback: t("cyber.arr_OhnoThegamingmonster", { defaultValue: "Oh no! The gaming monster bought 100 digital alien space-bananas with your parents' card! Rule: NEVER share credit cards or bank card details with online strangers!" })
        },
        {
          text: t("cyber.text_WaitFreestuffshouldn", { defaultValue: "Wait! Free stuff shouldn't ask for a credit card. I never share bank cards!" }),
          isCorrect: true,
          feedback: t("cyber.arr_HoorayYoublockedthem", { defaultValue: "Hooray! You blocked the monster! They got frustrated and self-destructed in a cloud of digital sparks!" })
        }
      ]
    },
    {
      id: 2,
      title: t("cyber.title_TheRainbowUnicornClu", { defaultValue: "The Rainbow Unicorn Club" }),
      character: "Super-Unicorn-77",
      iconType: "unicorn",
      avatarBg: "bg-pink-500",
      initialMessage: "Omg! You won a giant, fluffy rainbow unicorn plushie! Tell me your home address and where you go to school so the delivery truck can drop it off right now!",
      options: [
        {
          text: t("cyber.arr_YayMyaddressis123Rai", { defaultValue: "Yay! My address is 123 Rainbow Street and I go to Sunshine School..." }),
          isCorrect: false,
          feedback: t("cyber.arr_OhnoTheunicornwasact", { defaultValue: "Oh no! The unicorn was actually a sneaky spyware robot in a costume! Now they know where you live and play. Rule: NEVER share your real name, address, or school online!" })
        },
        {
          text: t("cyber.text_StopIdontgivemyhomea", { defaultValue: "Stop! I don't give my home address or school name to people online!" }),
          isCorrect: true,
          feedback: t("cyber.arr_AmazingjobYouprotect", { defaultValue: "Amazing job! You protected your secret base! The robot unicorn malfunctioned and rolled away on a unicycle!" })
        }
      ]
    },
    {
      id: 3,
      title: t("cyber.title_UnclePocketsVaultKey", { defaultValue: "Uncle Pockets' Vault Key" }),
      character: "Uncle Pockets",
      iconType: "raccoon",
      avatarBg: "bg-amber-600",
      initialMessage: "Alert! Your digital piggy bank has a leak! Quick, read me the 4-digit code (OTP) that just popped up on your parent's phone so I can patch it!",
      options: [
        {
          text: t("cyber.arr_OhnoStoptheleakTheco", { defaultValue: "Oh no! Stop the leak! The code is 9987!" }),
          isCorrect: false,
          feedback: t("cyber.arr_OhnoThatcodewastheke", { defaultValue: "Oh no! That code was the key to the vault! Uncle Pockets opened the piggy bank and flew away with all the coins! Rule: NEVER share OTP codes with anyone!" })
        },
        {
          text: t("cyber.arr_WaitIwillaskmyparent", { defaultValue: "Wait! I will ask my parents first. I never share security codes!" }),
          isCorrect: true,
          feedback: t("cyber.arr_PerfectYoukeptthevau", { defaultValue: "Perfect! You kept the vault locked! Uncle Pockets cried: 'Curses! Foiled again!' and vanished into a puff of smoke!" })
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
  const { t } = useTranslation();
  const detectiveMissions = useMemo(() => getDetectiveMissions(t), [t]);
  const getDetectiveMissions = (t) => [
    {
      id: 1,
      title: t("cyber.title_TheSuspiciousTextMes", { defaultValue: "The Suspicious Text Message" }),
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
          label: t("cyber.label_ScaryPanicWordsSUSPE", { defaultValue: "Scary Panic Words (SUSPENDED!)" }),
          desc: t("cyber.desc_Scammersusescaryword", { defaultValue: "Scammers use scary words like 'SUSPENDED!' to make you panic and click quickly without thinking. Real banks or companies never talk to you like this! Always stay calm." })
        },
        2: {
          label: t("cyber.label_ThreatofLosingMoneyF", { defaultValue: "Threat of Losing Money (FOREVER:)" }),
          desc: t("cyber.desc_Sayingyourmoneyisgon", { defaultValue: "Saying your money is gone 'FOREVER' is a scare tactic. They want to make you scared so you act fast. Real banks will never threat-text you. Show it to a parent!" })
        },
        3: {
          label: t("cyber.label_WeirdWebLink", { defaultValue: "Weird Web Link" }),
          desc: t("cyber.desc_Lookatthataddressith", { defaultValue: "Look at that address: it has random words and doesn't end in normal sites like '.com' or '.in'. Never click links in texts, they can steal your details or install bugs!" })
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
  const { t } = useTranslation();
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
        desc: t("cyber.desc_Typeapasswordtostart", { defaultValue: "Type a password to start forging!" }),
        iconType: "none"
      };
    }
    switch(strength) {
      case 0:
      case 1:
        return {
          name: "Fragile Cardboard Shield",
          color: "border-amber-850 bg-[#352515] text-amber-500 shadow-amber-900/10",
          desc: t("cyber.desc_FlimsyEasilybrokenby", { defaultValue: "Flimsy! Easily broken by the goblin's paper airplane." }),
          iconType: "cardboard"
        };
      case 2:
        return {
          name: "Reinforced Wooden Shield",
          color: "border-yellow-750 bg-[#302510] text-yellow-600 shadow-[#302510]/10",
          desc: t("cyber.desc_DecentCanhandlesmall", { defaultValue: "Decent! Can handle small rocks but will break under laser fire." }),
          iconType: "wood"
        };
      case 3:
        return {
          name: "Polished Iron Bulwark",
          color: "border-slate-500 bg-slate-800 text-slate-300 shadow-slate-700/20",
          desc: t("cyber.desc_SolidStandardsecurit", { defaultValue: "Solid! Standard security that repels basic hacker slingshots." }),
          iconType: "iron"
        };
      case 4:
        return {
          name: "Glowing Emerald Forcefield",
          color: "border-emerald-400 bg-emerald-950/60 text-emerald-300 shadow-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]",
          desc: t("cyber.desc_IncredibleReflectsth", { defaultValue: "Incredible! Reflects the Goblin's plasma cannon right back at them!" }),
          iconType: "emerald"
        };
      default:
        return {
          name: "Cardboard Shield",
          color: "border-amber-800 bg-[#352515] text-amber-500",
          desc: t("cyber.desc_Typeastrongerpasswor", { defaultValue: "Type a stronger password!" }),
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
  const { t } = useTranslation();
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: t("cyber.title_CRITICALCOMPUTERDANG", { defaultValue: "CRITICAL COMPUTER DANGER!" }),
      text: "Warning: 99 virus bugs detected in your system! Click to clean immediately!",
      actionText: "CLEAN DEVICE NOW",
      safeAction: "Close (X)",
    },
    {
      id: 2,
      title: t("cyber.title_FREEIPHONE25WINNER", { defaultValue: "FREE IPHONE 25 WINNER!" }),
      text: "Congratulations! You have been randomly chosen to receive a free phone! Click below to claim!",
      actionText: "CLAIM PRIZE",
      safeAction: "Close (X)",
    },
    {
      id: 3,
      title: t("cyber.title_SECURITYFIREWALLLEAK", { defaultValue: "SECURITY FIREWALL LEAK!" }),
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
  const { t } = useTranslation();
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

// Curriculum Lessons Database (Class 6-8 Step-by-Step Progressive Cybersecurity Learning)
const getLessons = (t) => [
  {
    id: 1,
    title: t("cyber.title_Lesson1WhatisCyberse", { defaultValue: "Lesson 1: What is Cybersecurity?" }),
    badge: t("cyber.badge_CyberExplorer_8388", { defaultValue: "Cyber Explorer" }),
    topic: t("cyber.topic_BasicsofOnlineSafety_555b", { defaultValue: "Basics of Online Safety" }),
    summary: t("cyber.summary_Startfromthebasicsle_7381", { defaultValue: "Start from the basics: learn what cybersecurity means and why computers and phones need protection." }),
    image: "/images/cybersecurity/lesson1.webp",
    learnSections: [
      {
        title: t("cyber.title_WhatDoesCybersecurit", { defaultValue: "What Does 'Cybersecurity' Mean?" }),
        desc: t("cyber.desc_Justlikewelockourhou", { defaultValue: "Just like we lock our house doors at night to keep our family and belongings safe, Cybersecurity means locking and protecting our digital world—our computers, mobile phones, internet accounts, and private information." }),
        image: "/images/cybersecurity/cs_digital_playground.webp",
        funFact: t("cyber.funFact_ThewordCybercomesfro_0136", { defaultValue: "The word 'Cyber' comes from 'Cybernetics', meaning anything related to computers, networks, and virtual reality!" })
      },
      {
        title: t("cyber.title_WhatAreWeProtecting", { defaultValue: "What Are We Protecting?" }),
        desc: t("cyber.desc_Whenyouusetheinterne", { defaultValue: "When you use the internet, your device holds valuable digital treasures: your school projects, family photos, email messages, game progress, and your parents' online banking details. Cybersecurity keeps these treasures safe from being stolen or damaged." }),
        image: "/images/cybersecurity/cs_online_pretenders.webp",
        funFact: t("cyber.funFact_Everydayover300billi_bca0", { defaultValue: "Every day, over 300 billion emails are sent across the internet containing personal and professional data!" })
      },
      {
        title: t("cyber.title_WhoAreOnlineHackers", { defaultValue: "Who Are Online Hackers?" }),
        desc: t("cyber.desc_Hackersorcybercrimin", { defaultValue: "Hackers or cybercriminals are people who search the internet looking for unlocked digital doors or weak security systems. They try to sneak into accounts to steal information or cause trouble." }),
        image: "/images/cybersecurity/cs_golden_rules.webp",
        funFact: t("cyber.funFact_NotallhackersarebadE_6edb", { defaultValue: "Not all hackers are bad! 'Ethical Hackers' (White Hat Hackers) are cybersecurity professionals hired by companies to test and strengthen their security locks!" })
      },
      {
        title: t("cyber.title_The3GoldenPillarsCIA", { defaultValue: "The 3 Golden Pillars (C-I-A)" }),
        desc: t("cyber.desc_Cybersecurityrelieso", { defaultValue: "Cybersecurity relies on 3 main rules:\n1. Confidentiality: Keeping private secrets private.\n2. Integrity: Making sure data is not altered or damaged.\n3. Availability: Ensuring your computer and internet work when you need them." }),
        image: "/images/cybersecurity/cs_chat_checklist.webp",
        funFact: t("cyber.funFact_TheCIATriadisthefoun_018b", { defaultValue: "The C-I-A Triad is the foundational rule taught to every cybersecurity engineer around the world!" })
      }
    ],
    content: t("cyber.content_WelcometoCybersecuri_b3bd", { defaultValue: "Welcome to Cybersecurity!\n\nWhat is Cybersecurity?\nIt is the practice of protecting computers, smartphones, and online accounts from unauthorized access or damage.\n\nWhy does it matter?\nBecause our digital lives hold valuable personal information that must be protected just like our physical homes." }),
    game: "Chat Patrol",
    quiz: [
      {
        question: t("cyber.question_WhatisthemaingoalofC", { defaultValue: "What is the main goal of Cybersecurity?" }),
        options: [
          t("cyber.arr_Tomakecomputersrunin", { defaultValue: "To make computers run internet games faster" }),
          t("cyber.arr_Toprotectcomputersmo", { defaultValue: "To protect computers, mobile phones, and online information from unauthorized access and harm" }),
          t("cyber.arr_Toturnofftheinternet", { defaultValue: "To turn off the internet at night" })
        ],
        correct: 1
      },
      {
        question: t("cyber.question_WhatisanEthicalHacke", { defaultValue: "What is an 'Ethical Hacker' (White Hat Hacker)?" }),
        options: [
          t("cyber.arr_Aprofessionalhiredto", { defaultValue: "A professional hired to test and improve computer security systems legally" }),
          t("cyber.arr_Someonewhobreaksinto", { defaultValue: "Someone who breaks into computers to steal money" }),
          t("cyber.arr_Arobotthatrepairscom", { defaultValue: "A robot that repairs computer screens" })
        ],
        correct: 0
      }
    ]
  },
  {
    id: 2,
    title: t("cyber.title_Lesson2YourDigitalFo", { defaultValue: "Lesson 2: Your Digital Footprint & Privacy" }),
    badge: t("cyber.badge_PrivacyDefender_81bd", { defaultValue: "Privacy Defender" }),
    topic: t("cyber.topic_PersonalDataFootprin_15fc", { defaultValue: "Personal Data & Footprints" }),
    summary: t("cyber.summary_Understandwhatperson_22f8", { defaultValue: "Understand what personal data is and how everything you do online leaves a lasting digital footprint." }),
    image: "/images/cybersecurity/lesson2.webp",
    learnSections: [
      {
        title: t("cyber.title_WhatisaDigitalFootpr", { defaultValue: "What is a Digital Footprint?" }),
        desc: t("cyber.desc_Everytimeyouvisitawe", { defaultValue: "Every time you visit a website, post a comment, or play an online game, you leave behind a trail of information called your Digital Footprint. Once something is shared online, it can stay there for a very long time." }),
        image: "/images/cybersecurity/cs_fishing_hooks.webp",
        funFact: t("cyber.funFact_DidyouknowSearchengi_8396", { defaultValue: "Did you know? Search engines can index web pages in seconds, meaning an online post can be saved even if deleted later!" })
      },
      {
        title: t("cyber.title_PersonalInformationP", { defaultValue: "Personal Information (PII)" }),
        desc: t("cyber.desc_PersonallyIdentifiab", { defaultValue: "Personally Identifiable Information (PII) is any detail that can identify who you are or where you live. Never share your full legal name, home address, school name, phone number, or parents' bank details with strangers online." }),
        image: "/images/cybersecurity/cs_panic_trap.webp",
        funFact: t("cyber.funFact_Professionalesportsg_ba6f", { defaultValue: "Professional esports gamers use anonymous gamer tags and never share their real birthdate or hometown publicly!" })
      },
      {
        title: t("cyber.title_SocialEngineeringTri", { defaultValue: "Social Engineering Tricks" }),
        desc: t("cyber.desc_Sometimescybercrimin", { defaultValue: "Sometimes cybercriminals don't hack computers—they trick people! This is called Social Engineering. A stranger in a game might pretend to be a game moderator offering 'free diamonds' if you tell them your email or password." }),
        image: "/images/cybersecurity/cs_decoding_links.webp",
        funFact: t("cyber.funFact_Cybersecuritystudies_42c2", { defaultValue: "Cybersecurity studies show that over 80% of cyber attacks start by tricking a person rather than hacking a machine!" })
      },
      {
        title: t("cyber.title_SmartPrivacyChecklis", { defaultValue: "Smart Privacy Checklist" }),
        desc: t("cyber.desc_DOKeepyourgamingprof", { defaultValue: "DO: Keep your gaming profiles and social media accounts set to Private.\nDO: Ask a parent or teacher before entering personal details on any website.\nDON'T: Send personal photos or your home address to online chat strangers.\nDON'T: Share OTP verification codes sent to your phone." }),
        image: "/images/cybersecurity/cs_link_checklist.webp",
        funFact: t("cyber.funFact_Banksandofficialplat_ebb6", { defaultValue: "Banks and official platforms never ask for OTP verification codes over chat messages!" })
      }
    ],
    content: t("cyber.content_Everythingyoushareon_e7d5", { defaultValue: "Everything you share online creates your Digital Footprint.\n\nProtecting Your Identity:\n• Keep PII Private: Never share your home address, school name, phone number, or OTP codes.\n• Watch Out for Social Engineering: Never trust strangers asking for passwords or private details." }),
    game: "Scam Detective",
    quiz: [
      {
        question: t("cyber.question_WhatisaDigitalFootpr", { defaultValue: "What is a 'Digital Footprint'?" }),
        options: [
          t("cyber.arr_Shoeprintsleftonthef", { defaultValue: "Shoe prints left on the floor near a computer desk" }),
          t("cyber.arr_Thetrailofinformatio", { defaultValue: "The trail of information and activity you leave behind whenever you use the internet" }),
          t("cyber.arr_Afingerprintscannero", { defaultValue: "A fingerprint scanner on a smartphone" })
        ],
        correct: 1
      },
      {
        question: t("cyber.question_Astrangerinanonlineg", { defaultValue: "A stranger in an online game offers you free game coins if you tell them your school name and home address. What should you do?" }),
        options: [
          t("cyber.arr_Givethemtheinformati", { defaultValue: "Give them the information to get the coins" }),
          t("cyber.arr_Neversharepersonalin_aa96", { defaultValue: "Never share personal information with online strangers and tell a parent" }),
          t("cyber.arr_Givethemafriendsaddr", { defaultValue: "Give them a friend's address instead" })
        ],
        correct: 1
      }
    ]
  },
  {
    id: 3,
    title: t("cyber.title_Lesson3StrongPasswor", { defaultValue: "Lesson 3: Strong Passwords & 2FA" }),
    badge: t("cyber.badge_LockMaster_41f7", { defaultValue: "Lock Master" }),
    topic: t("cyber.topic_PasswordsTwoFactorAu_4c3f", { defaultValue: "Passwords & Two-Factor Auth" }),
    summary: t("cyber.summary_Learnhowtobuildstron_bfc6", { defaultValue: "Learn how to build strong passphrases and use Two-Factor Authentication to lock your accounts." }),
    image: "/images/cybersecurity/lesson3.webp",
    learnSections: [
      {
        title: t("cyber.title_WhySimplePasswordsAr", { defaultValue: "Why Simple Passwords Are Unsafe" }),
        desc: t("cyber.desc_Ifyourpasswordisshor", { defaultValue: "If your password is short or common—like '123456', 'password', or your pet's name—automated computer programs can guess it in less than a second. Your password is the key to your digital lock!" }),
        image: "/images/cybersecurity/cs_fortress_gate.webp",
        funFact: t("cyber.funFact_An8charactersimplelo_97c8", { defaultValue: "An 8-character simple lowercase password can be cracked in less than 1 second by modern computers!" })
      },
      {
        title: t("cyber.title_BuildingaStrongPassp", { defaultValue: "Building a Strong Passphrase" }),
        desc: t("cyber.desc_Insteadofashortwordc", { defaultValue: "Instead of a short word, create a memorable Passphrase combining 4 unrelated words plus numbers and symbols! For example: 'BlueRocketCoffeeJump#99' is easy for you to remember but takes millions of years for a computer to guess." }),
        image: "/images/cybersecurity/cs_materials_defense.webp",
        funFact: t("cyber.funFact_A14characterpassphra_e3b1", { defaultValue: "A 14-character passphrase with uppercase, lowercase, numbers, and symbols takes over 200 million years to crack!" })
      },
      {
        title: t("cyber.title_NeverReusePasswords", { defaultValue: "Never Reuse Passwords" }),
        desc: t("cyber.desc_Ifyouusetheexactsame", { defaultValue: "If you use the exact same password for your email, school account, and games, a hacker who discovers it on one site can unlock all your accounts. Always use a unique password for each important service." }),
        image: "/images/cybersecurity/cs_secret_sentence.webp",
        funFact: t("cyber.funFact_Passwordmanagersusem_6efa", { defaultValue: "Password managers use military-grade AES-256 encryption to safely store unique passwords for every site!" })
      },
      {
        title: t("cyber.title_TwoFactorAuthenticat", { defaultValue: "Two-Factor Authentication (2FA)" }),
        desc: t("cyber.desc_TwoFactorAuthenticat", { defaultValue: "Two-Factor Authentication (2FA) adds a second lock! To log in, you need your password PLUS a temporary code sent to your phone. Even if someone discovers your password, they cannot get in without that second code." }),
        image: "/images/cybersecurity/cs_password_checklist.webp",
        funFact: t("cyber.funFact_EnablingTwoFactorAut_4b14", { defaultValue: "Enabling Two-Factor Authentication (2FA) blocks over 99.9% of automated hacking attempts instantly!" })
      }
    ],
    content: t("cyber.content_Lockyouraccountswith_8b77", { defaultValue: "Lock your accounts with high-strength keys!\n\nPassword Rules:\n• Create Passphrases: Use 4 unrelated words + numbers & symbols.\n• Enable 2FA: Require a password PLUS a verification code to log in safely." }),
    game: "Password Forge",
    quiz: [
      {
        question: t("cyber.question_Whichoftheseisthestr", { defaultValue: "Which of these is the strongest and safest password choice?" }),
        options: [
          t("cyber.arr_12345678", { defaultValue: "12345678" }),
          t("cyber.arr_Yourbirthdateorpetsn", { defaultValue: "Your birthdate or pet's name" }),
          t("cyber.arr_A14characterpassphra", { defaultValue: "A 14-character passphrase combining words, numbers, and symbols like 'BlueRocketCoffeeJump#99'" })
        ],
        correct: 2
      },
      {
        question: t("cyber.question_WhatisTwoFactorAuthe", { defaultValue: "What is Two-Factor Authentication (2FA)?" }),
        options: [
          t("cyber.arr_Anextrasecuritylockt", { defaultValue: "An extra security lock that requires both your password AND a verification code sent to your phone" }),
          t("cyber.arr_Sharingyourpasswordw", { defaultValue: "Sharing your password with two friends" }),
          t("cyber.arr_Typingyourpasswordtw", { defaultValue: "Typing your password twice as fast" })
        ],
        correct: 0
      }
    ]
  },
  {
    id: 4,
    title: t("cyber.title_Lesson4SpottingScams", { defaultValue: "Lesson 4: Spotting Scams & Phishing" }),
    badge: t("cyber.badge_LinkDetective_3976", { defaultValue: "Link Detective" }),
    topic: t("cyber.topic_PhishingFakeMessages_1cfb", { defaultValue: "Phishing & Fake Messages" }),
    summary: t("cyber.summary_Masterhowtorecognize_1d32", { defaultValue: "Master how to recognize fake messages, urgency traps, and suspicious web links before clicking." }),
    image: "/images/cybersecurity/lesson4.webp",
    learnSections: [
      {
        title: t("cyber.title_WhatisPhishing", { defaultValue: "What is Phishing?" }),
        desc: t("cyber.desc_Phishingisanonlinesc", { defaultValue: "Phishing is an online scam where attackers send fake SMS messages or emails pretending to be a trusted company (like a bank, delivery company, or game platform) to trick you into clicking harmful links." }),
        image: "/images/cybersecurity/cs_loud_popups.webp",
        funFact: t("cyber.funFact_Thewordphishingwasco_1938", { defaultValue: "The word 'phishing' was coined in 1996 as a metaphor for using digital bait to hook unsuspecting users!" })
      },
      {
        title: t("cyber.title_ThePanicUrgencyTrap", { defaultValue: "The Panic & Urgency Trap" }),
        desc: t("cyber.desc_Scamsalmostalwaystry", { defaultValue: "Scams almost always try to make you panic! They use alarming words like 'URGENT!', 'YOUR ACCOUNT IS BLOCKED!', or 'YOU WON A FREE GIFT!'. They want you to rush and click without thinking. Stop, breathe, and verify!" }),
        image: "/images/cybersecurity/cs_disarm_trap.webp",
        funFact: t("cyber.funFact_Scammessagesdelibera_3671", { defaultValue: "Scam messages deliberately create artificial panic because stress makes human brains skip logical safety checks!" })
      },
      {
        title: t("cyber.title_CheckingWebLinksURLs", { defaultValue: "Checking Web Links (URLs)" }),
        desc: t("cyber.desc_Alwaysinspectthewebl", { defaultValue: "Always inspect the web link before clicking! Safe official websites use HTTPS and correct spelling (like google.com). Phishing links often have subtle spelling mistakes or strange extensions like bank-security-verify.xyz." }),
        image: "/images/cybersecurity/cs_shield_refills.webp",
        funFact: t("cyber.funFact_ApadlockiconHTTPSmea_8888", { defaultValue: "A padlock icon (HTTPS) means data connection is encrypted, but always double-check the domain spelling!" })
      },
      {
        title: t("cyber.title_LinkSafetyChecklist", { defaultValue: "Link Safety Checklist" }),
        desc: t("cyber.desc_DOCheckunexpectedmes", { defaultValue: "DO: Check unexpected messages with a parent or teacher.\nDO: Look closely at the website domain spelling.\nDON'T: Click links in SMS messages claiming you won a lottery or reward.\nDON'T: Enter login details on unfamiliar pages." }),
        image: "/images/cybersecurity/cs_device_checklist.webp",
        funFact: t("cyber.funFact_Modernwebbrowsersche_0c8c", { defaultValue: "Modern web browsers check links against real-time security databases to block millions of phishing sites daily!" })
      }
    ],
    content: t("cyber.content_Phishingattacksusede_13d5", { defaultValue: "Phishing attacks use deceptive messages to trick you into clicking harmful links.\n\nSpotting Phishing:\n• Beware of Panic Words: Messages demanding urgent action.\n• Inspect URLs: Check for strange domain names or misspelled websites before clicking." }),
    game: "Pop-up Blaster",
    quiz: [
      {
        question: t("cyber.question_Whydophishingscammes", { defaultValue: "Why do phishing scam messages often use alarming words like 'URGENT!' or 'ACCOUNT BLOCKED!'?" }),
        options: [
          t("cyber.arr_Tocreatepanicsoyoucl", { defaultValue: "To create panic so you click the link without checking carefully" }),
          t("cyber.arr_Becausetheywanttogiv", { defaultValue: "Because they want to give you free rewards" }),
          t("cyber.arr_Tomakethemessagelook", { defaultValue: "To make the message look decorative" })
        ],
        correct: 0
      },
      {
        question: t("cyber.question_Whichweblinklookslik", { defaultValue: "Which web link looks like a legitimate and secure website address?" }),
        options: [
          t("cyber.arr_httpsecureloginbanka", { defaultValue: "http://secure-login-bank-alert.xyz/verify" }),
          t("cyber.arr_httpswwwgooglecom", { defaultValue: "https://www.google.com" }),
          t("cyber.arr_httpfreegiftboxnetal", { defaultValue: "http://free-gift-box.net/alert" })
        ],
        correct: 1
      }
    ]
  },
  {
    id: 5,
    title: t("cyber.title_Lesson5DeviceSafetyA", { defaultValue: "Lesson 5: Device Safety & Apps" }),
    badge: t("cyber.badge_SystemProtector_5d04", { defaultValue: "System Protector" }),
    topic: t("cyber.topic_UpdatesAppPermission_877f", { defaultValue: "Updates & App Permissions" }),
    summary: t("cyber.summary_Learnhowtohandlefake_cfdf", { defaultValue: "Learn how to handle fake virus alerts, update your device software, and manage app permissions." }),
    image: "/images/cybersecurity/lesson5.webp",
    learnSections: [
      {
        title: t("cyber.title_IgnoringFakeVirusPop", { defaultValue: "Ignoring Fake Virus Pop-ups" }),
        desc: t("cyber.desc_Whilebrowsingyoumigh", { defaultValue: "While browsing, you might see flashing pop-up ads claiming 'YOUR DEVICE IS INFECTED WITH 50 VIRUSES! CLICK TO CLEAN!'. Don't panic—these are scareware ads trying to trick you into downloading harmful software." }),
        image: "/images/cybersecurity/cs_double_lock.webp",
        funFact: t("cyber.funFact_Realoperatingsystems_9867", { defaultValue: "Real operating systems and web browsers never display alarming countdown timers in pop-up security alerts!" })
      },
      {
        title: t("cyber.title_SafeBrowsingHabits", { defaultValue: "Safe Browsing Habits" }),
        desc: t("cyber.desc_Neverclickbuttonsins", { defaultValue: "Never click buttons inside suspicious pop-up banners. Safely close the browser tab by clicking the small 'X' or pressing Alt+F4 on your keyboard without downloading anything." }),
        image: "/images/cybersecurity/cs_sneaky_apps.webp",
        funFact: t("cyber.funFact_Closingthebrowsertab_9437", { defaultValue: "Closing the browser tab instantly stops any unwanted pop-up script from running!" })
      },
      {
        title: t("cyber.title_WhySoftwareUpdatesMa", { defaultValue: "Why Software Updates Matter" }),
        desc: t("cyber.desc_Softwareupdatesdontj", { defaultValue: "Software updates don't just add new features—they include essential 'security patches'. Developers release updates to fix newly discovered security bugs so hackers cannot exploit your device." }),
        image: "/images/cybersecurity/cs_permission_shield.webp",
        funFact: t("cyber.funFact_Automaticupdatesprot_d6bd", { defaultValue: "Automatic updates protect your devices while you sleep so your operating system stays secure 24/7!" })
      },
      {
        title: t("cyber.title_SmartAppPermissions", { defaultValue: "Smart App Permissions" }),
        desc: t("cyber.desc_Wheninstallinganappc", { defaultValue: "When installing an app, check what permissions it asks for. While a navigation map app needs location access, a simple calculator app should never ask to see your photos, microphone, or contacts!" }),
        image: "/images/cybersecurity/cs_permission_checklist.webp",
        funFact: t("cyber.funFact_Denyingunnecessaryap_e565", { defaultValue: "Denying unnecessary app permissions prevents apps from secretly tracking your daily habits!" })
      }
    ],
    content: t("cyber.content_Keepyourdevicesrunni_5594", { defaultValue: "Keep your devices running safely!\n\nDevice Protection Rules:\n• Avoid Scareware: Never click buttons on pop-ups claiming your device has viruses.\n• Enable Automatic Updates: Regular software patches seal security holes.\n• Check App Permissions: Deny access if an app asks for permissions it doesn't need." }),
    game: "Permission Shield",
    quiz: [
      {
        question: t("cyber.question_Awebsitepopupclaimsy", { defaultValue: "A website pop-up claims your computer has viruses and asks you to click 'Install Cleaner Now'. What should you do?" }),
        options: [
          t("cyber.arr_ClickInstallimmediat", { defaultValue: "Click Install immediately" }),
          t("cyber.arr_Safelyclosethebrowse", { defaultValue: "Safely close the browser tab without clicking the banner" }),
          t("cyber.arr_Callthephonenumbersh", { defaultValue: "Call the phone number shown on the screen" })
        ],
        correct: 1
      },
      {
        question: t("cyber.question_Whyshouldyoudenyasim", { defaultValue: "Why should you deny a simple calculator app if it requests permission to access your GPS location and photos?" }),
        options: [
          t("cyber.arr_Becauseacalculatorap", { defaultValue: "Because a calculator app does not need your location or photos to function" }),
          t("cyber.arr_Becausecalculatorson", { defaultValue: "Because calculators only work offline" }),
          t("cyber.arr_Becausephotostaketoo", { defaultValue: "Because photos take too much memory" })
        ],
        correct: 0
      }
    ]
  }
];

const cyberTheme = {
  backButtonHover: 'hover:text-emerald-600',
  heroHighlightText: 'text-emerald-600',
  
  card1Icon: 'text-emerald-600',
  card1Bg: 'bg-emerald-50',
  card2Icon: 'text-emerald-600',
  card2Bg: 'bg-emerald-50',
  card3Icon: 'text-emerald-600',
  card3Bg: 'bg-emerald-50',
  
  activeBorder: 'border-emerald-500 ring-2 ring-emerald-500/10',
  inactiveBorder: 'border-slate-50',
  activeIconBg: 'bg-emerald-600 text-white',
  activeTitleText: 'text-emerald-700',
  inactiveTitleHover: 'text-[#1e1b4b] group-hover:text-emerald-600',
  activeSubtitleText: 'text-emerald-600/80',
  inactiveSubtitleText: 'text-slate-500'
};

const CyberSecurityDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('playzone');
  const [selectedItem, setSelectedItem] = useState(null);

  // Curriculum State
  const [activeLessonId, setActiveLessonId] = useState(1);
  const [unlockedLessons, setUnlockedLessons] = useState([1, 2, 3, 4, 5]);
  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem('completedCyberLessons');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);

  const handleSelectLesson = (id) => {
    setActiveLessonId(id);
    setActiveTopicIndex(0);
  };

  const handleProceedNext = () => {
    if (!completedLessons.includes(activeLessonId)) {
      setCompletedLessons(prev => [...prev, activeLessonId]);
    }
    if (activeLessonId < lessons.length) {
      handleSelectLesson(activeLessonId + 1);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const lessons = useMemo(() => getLessons(t), [t]);
  const quickStats = useMemo(() => getQuickStats(t), [t]);
  const articles = useMemo(() => getArticles(t), [t]);

  const currentLesson = lessons.find(less => less.id === activeLessonId) || lessons[0];
  const selectedSec = currentLesson.learnSections[activeTopicIndex] || currentLesson.learnSections[0];

  useEffect(() => {
    localStorage.setItem('unlockedCyberLessons', JSON.stringify(unlockedLessons));
  }, [unlockedLessons]);

  useEffect(() => {
    localStorage.setItem('completedCyberLessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    setActiveTopicIndex(0);
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

  const getQuickStats = (t) => [
  { id: 'playzone', label: t("cyber.label_SafetyPlayzone_45e1", { defaultValue: "Safety Playzone" }), value: t("cyber.value_CyberSecurityModules_086c", { defaultValue: "Cyber Security Modules" }), icon: <Shield className={cyberTheme.card1Icon} />, color: cyberTheme.card1Bg },
  { id: 'knowledge', label: t("cyber.label_KnowledgeBase_0830", { defaultValue: "Knowledge Base" }), value: t("cyber.value_GlossaryReadingMater_ddd4", { defaultValue: "Glossary & Reading Materials" }), icon: <BookOpen className={cyberTheme.card2Icon} />, color: cyberTheme.card2Bg },
  { id: 'assessment', label: t("cyber.label_SkillAssessment_31f8", { defaultValue: "Skill Assessment" }), value: t("cyber.value_QuizzesVerification_607a", { defaultValue: "Quizzes & Verification" }), icon: <Trophy className={cyberTheme.card3Icon} />, color: cyberTheme.card3Bg },
];

  const getArticles = (t) => [
    {
      id: 1,
      title: t("cyber.title_CoreCyberSecurityGlo", { defaultValue: "Core Cyber Security Glossary & Definitions" }),
      desc: t("cyber.desc_Essentialdefinitions", { defaultValue: "Essential definitions for core cyber security terminology and concepts." }),
      content: t("cyber.content_MASTERINGCYBERSECURI_0eae", { defaultValue: "MASTERING CYBER SECURITY TERMINOLOGY\n\n• Phishing: Deceptive communications disguised as legitimate entities designed to trick users into disclosing sensitive credentials.\n• Ransomware: Malicious software that encrypts user files and demands financial ransom for the decryption key.\n• Multi-Factor Authentication (MFA): A security mechanism requiring two or more independent credentials to verify user identity.\n• Zero-Day Exploit: A cyber attack targeting a newly discovered software vulnerability before a patch is available.\n• End-to-End Encryption: Cryptographic protocols that secure data in transit so only authorized recipients can decipher it.\n• Social Engineering: Psychological manipulation techniques used by threat actors to breach human security barriers." })
    },
    {
      id: 2,
      title: t("cyber.title_Top10RulesforDigital", { defaultValue: "Top 10 Rules for Digital Footprint & Online Privacy" }),
      desc: t("cyber.desc_Professionalchecklis", { defaultValue: "Professional checklist for maintaining personal privacy and securing your digital footprint." }),
      content: t("cyber.content_PROTECTINGYOURONLINE_b167", { defaultValue: "PROTECTING YOUR ONLINE IDENTIFIER & FOOTPRINT\n\n1. Practice Data Minimization: Never enter unnecessary personal details on public web forms.\n2. Enable Multi-Factor Authentication (MFA) on all financial and primary email accounts.\n3. Audit Application Permissions: Regularly revoke microphone, location, and background data access from unused apps.\n4. Use Unique Passwords: Avoid credential reuse across multiple web platforms.\n5. Inspect URLs Carefully: Verify HTTPS protocol and exact domain spelling before entering authentication credentials.\n6. Keep Software Updated: System updates contain critical patches for known exploits.\n7. Avoid Unsecured Public Wi-Fi: Use a trusted VPN or mobile network when logging into private accounts on public networks.\n8. Restrict Social & Profile Privacy: Regularly audit privacy settings to ensure only trusted contacts view your posts and personal details.\n9. Protect OTPs & Verification Codes: Never share One-Time Passwords with anyone—banks and platform admins will never request them.\n10. Think Before You Post: Remember that everything shared online leaves a lasting digital footprint—be mindful of location tags, personal photos, and sensitive data." })
    },
    {
      id: 3,
      title: t("cyber.title_EmergencyIncidentRes", { defaultValue: "Emergency Incident Response: What to Do If Compromised" }),
      desc: t("cyber.desc_Actionablestepbystep", { defaultValue: "Actionable step-by-step protocol to contain security breaches and recover compromised accounts." }),
      content: t("cyber.content_IMMEDIATERESPONSEPRO_bb99", { defaultValue: "IMMEDIATE RESPONSE PROTOCOL FOR COMPROMISED ACCOUNTS\n\nStep 1: Isolate the Affected Device — Disconnect from Wi-Fi or cellular networks to prevent lateral malware spread.\nStep 2: Reset Primary Credentials — Use a clean, uncompromised device to reset passwords for your primary email and bank accounts.\nStep 3: Terminate Active Sessions — Use account security settings to force 'Log Out of All Devices'.\nStep 4: Run Full Diagnostic Scans — Execute a comprehensive anti-malware scan to remove persistent trojans or keyloggers.\nStep 5: Monitor Financial Statements — Notify banking institutions immediately if unauthorized transactions appear." })
    },
    {
      id: 4,
      title: t("cyber.title_AnatomyofModernPhish", { defaultValue: "Anatomy of Modern Phishing, Smishing & Vishing Attacks" }),
      desc: t("cyber.desc_Indepthanalysisofema", { defaultValue: "In-depth analysis of email spoofing, SMS phishing (smishing), QR code scams (quishing), and AI voice calls." }),
      content: t("cyber.content_UNDERSTANDINGMODERNS_3924", { defaultValue: "UNDERSTANDING MODERN SOCIAL ENGINEERING VECTORS\n\n• Email Phishing: Look for spoofed sender headers, urgent emotional triggers ('Immediate Account Suspension'), and hidden destination URLs.\n• Smishing (SMS Scams): Unsolicited text messages claiming package delivery failures or bank KYC verification links.\n• Quishing (QR Code Scams): Malicious QR codes placed over legitimate parking or payment displays that redirect to credential harvesting forms.\n• Vishing & Deepfake Audio: Scammers using voice cloning technology over phone calls to impersonate colleagues or family members." })
    },
    {
      id: 5,
      title: t("cyber.title_NISTPasswordGuidelin", { defaultValue: "NIST Password Guidelines & Credential Management" }),
      desc: t("cyber.desc_Modernstandardsforpa", { defaultValue: "Modern standards for passphrase length, entropy, passkeys, and secure password managers." }),
      content: t("cyber.content_MODERNPASSWORDHYGIEN_1b20", { defaultValue: "MODERN PASSWORD HYGIENE (NIST SPECIAL PUBLICATION 800-63B)\n\n• Prioritize Length Over Complexity: A 16-character passphrase composed of memorable words is far stronger than an 8-character complex string.\n• Adopt Password Managers: Zero-knowledge encrypted vaults eliminate human memory limitations and generate unique high-entropy secrets.\n• Transition to Passkeys: Public-key cryptography (FIDO2/WebAuthn) replaces vulnerable passwords with hardware-backed biometric verification." })
    },
    {
      id: 6,
      title: t("cyber.title_SecuringPublicWiFiMo", { defaultValue: "Securing Public Wi-Fi, Mobile Devices & Smart Home IoT" }),
      desc: t("cyber.desc_Bestpracticesforsafe", { defaultValue: "Best practices for safe browsing on open networks and isolating connected smart devices." }),
      content: t("cyber.content_NETWORKDEVICEHARDENI_6f53", { defaultValue: "NETWORK & DEVICE HARDENING GUIDELINES\n\n• Public Wi-Fi Precautions: Never perform sensitive banking or corporate logins over unencrypted open Wi-Fi without a verified Virtual Private Network (VPN).\n• Bluetooth & AirDrop Hardening: Disable discoverability when in public terminals or crowded transport hubs.\n• IoT Network Isolation: Place smart TVs, cameras, and IoT home appliances on a dedicated Guest Wi-Fi network separated from primary work computers." })
    }
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
          className="pb-12"
        >
          {activeFilter === 'playzone' && (
            <div className="space-y-4 pt-2 sm:pt-4">
              {/* Top lesson selection bar matching VR module exactly */}
              <div className="bg-white border border-slate-100 rounded-[20px] p-2 shadow-[0_4px_20px_rgb(0,0,0,0.03)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 mb-3">
                {lessons.map((less) => {
                  const isCompleted = completedLessons.includes(less.id);
                  const isActive = activeLessonId === less.id;

                  return (
                    <button
                      key={less.id}
                      onClick={() => handleSelectLesson(less.id)}
                      className={`text-left px-3.5 py-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2.5 min-h-[46px] font-display ${
                        isActive
                          ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950 font-bold shadow-sm'
                          : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-700 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                          isCompleted ? 'bg-emerald-600 text-white' : isActive ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {less.id}
                        </span>
                        <span className="text-xs sm:text-sm truncate">
                          {less.title.replace(/^Lesson \d+:\s*/, '')}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Lesson Main Container exactly matching VR module */}
              <section className="bg-white rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 sm:p-7 md:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">
                      {currentLesson.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                      Topic Focus: <span className="text-emerald-600 font-bold">{currentLesson.topic}</span>
                    </p>
                  </div>
                </div>

                {/* Main 12-column Grid matching VR module */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                  {/* Left Sidebar with sections */}
                  <div className="lg:col-span-4 flex flex-col gap-2.5">
                    <div className="px-1 pb-1">
                      <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider font-display">
                        Lesson Topics ({currentLesson.learnSections.length})
                      </span>
                    </div>

                    {currentLesson.learnSections.map((sec, idx) => {
                      const isTopicActive = activeTopicIndex === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setActiveTopicIndex(idx)}
                          className={`w-full text-left p-4 rounded-[18px] border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isTopicActive
                              ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 font-bold shadow-sm'
                              : 'bg-white border-slate-200/80 hover:bg-slate-50 text-slate-700 font-medium shadow-[0_4px_16px_rgb(0,0,0,0.02)]'
                          }`}
                        >
                          <div className="min-w-0 space-y-1">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider font-display ${
                              isTopicActive ? 'bg-emerald-200 text-emerald-900' : 'bg-slate-100 text-slate-600'
                            }`}>
                              Section {idx + 1}
                            </span>
                            <h4 className="text-sm sm:text-base font-bold truncate font-display">
                              {sec.title}
                            </h4>
                          </div>
                          <ChevronRight size={16} className={`shrink-0 transition-transform ${isTopicActive ? 'text-emerald-600 translate-x-0.5' : 'text-slate-400'}`} />
                        </button>
                      );
                    })}

                    <div className="pt-2 mt-auto">
                      {activeLessonId < lessons.length ? (
                        <button
                          onClick={handleProceedNext}
                          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider font-display transition-all duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer group"
                        >
                          <span>{t("cyber.ui_ProceedtoNextLesson_4a12", { defaultValue: "Proceed to Next Lesson" })}</span>
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      ) : (
                        <button
                          onClick={handleProceedNext}
                          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider font-display transition-all duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer group"
                        >
                          <span>{t("cyber.ui_ReturntoDashboard_e76b", { defaultValue: "Return to Dashboard" })}</span>
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Right Content Area matching VR module */}
                  <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-[24px] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3 flex-wrap border-b border-slate-100 pb-4">
                        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider font-display">
                          Section {activeTopicIndex + 1} of {currentLesson.learnSections.length}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">
                        {selectedSec.title}
                      </h3>

                      <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal whitespace-pre-line">
                        {selectedSec.desc}
                      </p>

                      {selectedSec.funFact && (
                        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50/90 to-slate-50/80 border border-emerald-100 flex items-start gap-3.5 shadow-sm">
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                            <Sparkles size={16} />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 font-display block">
                              Did You Know? • Cyber Security Fun Fact
                            </span>
                            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                              {selectedSec.funFact}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Previous & Next Section Controls */}
                    <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
                      <button
                        onClick={() => setActiveTopicIndex(prev => Math.max(0, prev - 1))}
                        disabled={activeTopicIndex === 0}
                        className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all font-display ${
                          activeTopicIndex === 0
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer'
                        }`}
                      >
                        {t("cyber.ui_PreviousSection_ae60", { defaultValue: "Previous Section" })}
                      </button>

                      {activeTopicIndex < currentLesson.learnSections.length - 1 ? (
                        <button
                          onClick={() => setActiveTopicIndex(prev => Math.min(currentLesson.learnSections.length - 1, prev + 1))}
                          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer font-display"
                        >
                          {t("cyber.ui_NextSection_0955", { defaultValue: "Next Section" })} <ChevronRight size={16} />
                        </button>
                      ) : activeLessonId < lessons.length ? (
                        <button
                          onClick={handleProceedNext}
                          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer font-display"
                        >
                          {t("cyber.ui_NextLesson_46ef", { defaultValue: "Next Lesson" })} <ArrowRight size={16} />
                        </button>
                      ) : (
                        <button
                          onClick={handleProceedNext}
                          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer font-display"
                        >
                          {t("cyber.ui_ReturntoDashboard_e76b", { defaultValue: "Return to Dashboard" })} <ArrowRight size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeFilter === 'knowledge' && (
            <div className="space-y-4 pt-2 sm:pt-4">
              <section className="bg-white rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 sm:p-7 md:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">
                      {t("cyber.ui_CyberSecurityReading_e188", { defaultValue: "Cyber Security Reading Materials & Glossary" })}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                      {t("cyber.ui_Selectanarticleorglo_e606", { defaultValue: "Select an article or glossary card below to view detailed guidelines and definitions" })}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {articles.map(article => (
                    <div
                      key={article.id}
                      onClick={() => setSelectedItem({ ...article, type: 'article' })}
                      className="bg-white p-6 rounded-[20px] border border-slate-200/80 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group flex flex-col justify-between space-y-4"
                    >
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                          <FileText size={18} />
                        </div>
                        <h3 className="text-base font-bold text-slate-900 mb-2 font-display group-hover:text-emerald-600 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                          {article.desc}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-slate-100 flex items-center text-emerald-600 text-xs font-bold gap-1 font-display">
                        <span>{t("cyber.ui_ReadFullGuide_2700", { defaultValue: "Read Full Guide" })}</span>
                        <ChevronRight size={14} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeFilter === 'assessment' && (
            <div className="space-y-4 pt-2 sm:pt-4">
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
        className={`absolute top-[96px] md:top-[112px] left-[24px] md:left-[48px] z-50 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 ${cyberTheme.backButtonHover} hover:shadow-lg transition-all border border-slate-100 group`}
      >
        <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <main className={`flex-1 min-h-screen pb-16 cyber-scrollbar ${selectedItem ? 'overflow-hidden' : 'overflow-y-auto'}`}>
        <div className="px-4 sm:px-6 md:px-12 2xl:px-20 space-y-6 md:space-y-8 pt-4 2xl:max-w-[1600px] 2xl:mx-auto">

          <div className="relative">
            <section className="bg-white rounded-[16px] md:rounded-[24px] overflow-hidden relative border border-slate-100 flex items-center min-h-[200px] sm:min-h-[260px] md:min-h-[300px] lg:h-[387px] lg:min-h-[387px] pb-4 md:pb-6 lg:pb-0">
              <div className="relative z-10 p-8 md:p-10 lg:w-1/2 space-y-4">
                <h1 className="text-[24px] sm:text-[28px] md:text-[36px] lg:text-[42px] 2xl:text-[52px] font-extrabold leading-[1.05] tracking-tight text-[#1e293b]">
                  {t("cyber.ui_StaySafe_c518", { defaultValue: "Stay Safe" })} <br /> {t("cyber.ui_InTheDigital_6b6f", { defaultValue: "In The Digital" })} <br />
                  <span className={cyberTheme.heroHighlightText}>{t("cyber.ui_World_72b7", { defaultValue: "World." })}</span>
                </h1>
                <p className="text-slate-500 text-[15px] md:text-[16px] font-medium leading-relaxed max-w-sm">
                  {t("cyber.ui_Learntoprotectyourse_9af4", { defaultValue: "Learn to protect yourself from phishing, malware, and online scams." })}
                </p>
              </div>

              <div className="hidden lg:block absolute top-0 right-0 w-[55%] h-full">
                <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/40 to-transparent z-10" />
                <img loading="lazy" decoding="async" src="/images/cybersecurity/rhs.webp" alt="Cyber Security" className="w-full h-full object-cover object-right-top" />
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 relative z-20 -mt-8 px-4 md:px-8">
              {quickStats.map((stat, i) => {
                const isActive = activeFilter === stat.id;
                return (
                  <div
                    key={i}
                    onClick={() => {
                      setActiveFilter(stat.id);
                      const target = document.getElementById("content-section");
                      if (target) target.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`bg-white rounded-[16px] p-3 md:p-4 border flex items-center gap-3 md:gap-4 hover:shadow-md transition-shadow cursor-pointer group ${isActive ? cyberTheme.activeBorder + ' shadow-md' : cyberTheme.inactiveBorder + ' shadow-[0_4px_20px_rgba(0,0,0,0.06)]'}`}
                  >
                    <div className={`w-[44px] h-[44px] rounded-[12px] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform [&>svg]:w-5 [&>svg]:h-5 ${isActive ? cyberTheme.activeIconBg : stat.color}`}>
                      {React.cloneElement(stat.icon, { className: isActive ? 'text-white' : stat.icon.props.className })}
                    </div>
                    <div>
                      <h4 className={`text-[13px] font-bold leading-tight transition-colors ${isActive ? cyberTheme.activeTitleText : cyberTheme.inactiveTitleHover}`}>{stat.label}</h4>
                      <p className={`text-[11px] font-medium mt-0.5 ${isActive ? cyberTheme.activeSubtitleText : cyberTheme.inactiveSubtitleText}`}>{stat.value}</p>
                    </div>
                  </div>
                );
              })}
            </section>
          </div>
        </div>

        <div id="content-section" className="px-4 sm:px-6 md:px-12 2xl:px-18 2xl:max-w-[1480px] mx-auto mt-8 sm:mt-10">
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
                    className="flex-grow overflow-y-auto cyber-scrollbar my-6 mr-3 ml-6 lg:ml-8"
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
                  className="p-6 md:p-7 max-h-[60vh] overflow-y-auto cyber-scrollbar space-y-5"
                >
                  <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/40 border border-emerald-500/15 rounded-2xl p-5 md:p-6 shadow-sm relative">
                    <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-xs uppercase tracking-wider mb-3.5 pb-2.5 border-b border-emerald-500/10">
                      <Shield className="text-emerald-600 shrink-0" size={16} />
                      <span>{t("cyber.ui_LessonDetailsGuideli_2867", { defaultValue: "Lesson Details & Guidelines" })}</span>
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
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> {t("cyber.ui_Staysecurealertonlin_89ec", { defaultValue: "Stay secure & alert online!" })}
                  </span>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="w-full sm:w-auto ml-auto px-6 py-2.5 bg-gradient-to-r from-[#10b981] to-[#0d9488] hover:from-[#059669] hover:to-[#0f766e] text-white rounded-full text-xs font-black tracking-wide uppercase transition-all shadow-md shadow-emerald-500/25 cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    {t("cyber.ui_GotItStaySafe_ac7e", { defaultValue: "Got It, Stay Safe" })} <ChevronRight size={14} />
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
