import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, Cpu, Target, Compass, Play, BookOpen, Hand, Move, RefreshCw, Check 
} from 'lucide-react';

const Signlanguage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeSandboxModule, setActiveSandboxModule] = useState(0);
  const [panActive, setPanActive] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Secondary States for Interactive Modes
  const [activeAlphabet, setActiveAlphabet] = useState('A');
  const [activeGreetingIdx, setActiveGreetingIdx] = useState(0);

  // Interactive Quiz States
  const [viewportQuizIdx, setViewportQuizIdx] = useState(0);
  const [viewportSelectedAnswer, setViewportSelectedAnswer] = useState(null);
  const [viewportIsCorrect, setViewportIsCorrect] = useState(null);
  const [viewportQuizScore, setViewportQuizScore] = useState(0);
  const [viewportShowResult, setViewportShowResult] = useState(false);

  const sandboxModules = [
    {
      title: t('signLanguage.practiceChallenge', "Practice Challenge"),
      description: t('signLanguage.practiceChallengeDesc', "Interactive Sign Language Quiz. Look at the holographic gestures in the viewport feed and choose the correct meaning from the console below."),
      icon: <Target size={16} />,
      badge: t('signLanguage.interactiveBadge', "Interactive")
    },
    {
      title: t('signLanguage.fingerspellingTrainer', "Fingerspelling Trainer"),
      description: t('signLanguage.fingerspellingTrainerDesc', "Click on any alphabet key to load the respective Indian Sign Language fingerspelling sign in the high-fidelity viewport."),
      icon: <Compass size={16} />,
      badge: t('signLanguage.dictionaryBadge', "Dictionary")
    },
    {
      title: t('signLanguage.essentialVocabulary', "Essential Vocabulary"),
      description: t('signLanguage.essentialVocabularyDesc', "Explore core conversational gestures used for daily greetings, family members, emotions, and common communications in the deaf community."),
      icon: <BookOpen size={16} />,
      badge: t('signLanguage.vocabularyBadge', "Vocabulary")
    }
  ];

  const viewportQuizQuestions = [
    {
      image: '/images/signlanguage/hello.webp',
      options: [t('signLanguage.goodbye', 'Goodbye'), t('signLanguage.please', 'Please'), t('signLanguage.hello', 'Hello')],
      correct: t('signLanguage.hello', 'Hello'),
      explanation: t('signLanguage.expHello', 'Wave your hand gently side to side to greet someone.')
    },
    {
      image: '/images/signlanguage/thankyou.webp',
      options: [t('signLanguage.thankYou', 'Thank You'), t('signLanguage.sorry', 'Sorry'), t('signLanguage.welcome', 'Welcome')],
      correct: t('signLanguage.thankYou', 'Thank You'),
      explanation: t('signLanguage.expThankYou', 'Touch your chin with fingers, then move hand forward.')
    },
    {
      image: '/images/signlanguage/mother.webp',
      options: [t('signLanguage.father', 'Father'), t('signLanguage.mother', 'Mother'), t('signLanguage.friend', 'Friend')],
      correct: t('signLanguage.mother', 'Mother'),
      explanation: t('signLanguage.expMother', 'Tap your thumb on your chin with an open hand facing sideways.')
    },
    {
      image: '/images/signlanguage/father.webp',
      options: [t('signLanguage.mother', 'Mother'), t('signLanguage.teacher', 'Teacher'), t('signLanguage.father', 'Father')],
      correct: t('signLanguage.father', 'Father'),
      explanation: t('signLanguage.expFather', 'Tap your thumb on your forehead with an open hand facing sideways.')
    },
    {
      image: '/images/signlanguage/happy.webp',
      options: [t('signLanguage.sad', 'Sad'), t('signLanguage.angry', 'Angry'), t('signLanguage.happy', 'Happy')],
      correct: t('signLanguage.happy', 'Happy'),
      explanation: t('signLanguage.expHappy', 'Brush both flat hands upward on your chest to show joy.')
    },
    {
      image: '/images/signlanguage/sad.webp',
      options: [t('signLanguage.happy', 'Happy'), t('signLanguage.sad', 'Sad'), t('signLanguage.cry', 'Cry')],
      correct: t('signLanguage.sad', 'Sad'),
      explanation: t('signLanguage.expSad', 'Place both hands in front of your face and pull them down while making a sad face.')
    },
    {
      image: '/images/signlanguage/eat.webp',
      options: [t('signLanguage.drink', 'Drink'), t('signLanguage.eat', 'Eat'), t('signLanguage.sleep', 'Sleep')],
      correct: t('signLanguage.eat', 'Eat'),
      explanation: t('signLanguage.expEat', 'Bring your flattened O-hand to your mouth repeatedly.')
    },
    {
      image: '/images/signlanguage/sorry.webp',
      options: [t('signLanguage.please', 'Please'), t('signLanguage.sorry', 'Sorry'), t('signLanguage.happy', 'Happy')],
      correct: t('signLanguage.sorry', 'Sorry'),
      explanation: t('signLanguage.expSorry', 'Rub a closed fist in a circular motion over your heart.')
    },
    {
      image: '/images/signlanguage/welcome.webp',
      options: [t('signLanguage.welcome', 'Welcome'), t('signLanguage.hello', 'Hello'), t('signLanguage.eat', 'Eat')],
      correct: t('signLanguage.welcome', 'Welcome'),
      explanation: t('signLanguage.expWelcome', 'Bring both hands towards your chest in a welcoming motion.')
    }
  ];

  const greetingList = [
    { name: t('signLanguage.helloUpper', 'HELLO'), image: '/images/signlanguage/hello.webp', desc: t('signLanguage.descHello', 'Wave your hand gently from side to side to say hello.') },
    { name: t('signLanguage.thankYouUpper', 'THANK YOU'), image: '/images/signlanguage/thankyou.webp', desc: t('signLanguage.descThankYou', 'Touch your chin with fingers, then move hand forward towards the person.') },
    { name: t('signLanguage.motherUpper', 'MOTHER'), image: '/images/signlanguage/mother.webp', desc: t('signLanguage.descMother', 'Tap your thumb on your chin with an open hand facing sideways.') },
    { name: t('signLanguage.fatherUpper', 'FATHER'), image: '/images/signlanguage/father.webp', desc: t('signLanguage.descFather', 'Tap your thumb on your forehead with an open hand facing sideways.') },
    { name: t('signLanguage.happyUpper', 'HAPPY'), image: '/images/signlanguage/happy.webp', desc: t('signLanguage.descHappy', 'Brush both flat hands upward on your chest to show joy.') },
    { name: t('signLanguage.sadUpper', 'SAD'), image: '/images/signlanguage/sad.webp', desc: t('signLanguage.descSad', 'Place both hands in front of your face and pull them down while making a sad face.') },
    { name: t('signLanguage.sorryUpper', 'SORRY'), image: '/images/signlanguage/sorry.webp', desc: t('signLanguage.descSorry', 'Rub a closed fist in a circular motion over your heart.') },
    { name: t('signLanguage.eatUpper', 'EAT'), image: '/images/signlanguage/eat.webp', desc: t('signLanguage.descEat', 'Bring your flattened O-hand to your mouth a few times.') },
    { name: t('signLanguage.welcomeUpper', 'WELCOME'), image: '/images/signlanguage/welcome.webp', desc: t('signLanguage.descWelcome', 'Bring both hands towards your chest in a welcoming motion.') },
    { name: t('signLanguage.pleaseUpper', 'PLEASE'), image: '/images/signlanguage/please.webp', desc: t('signLanguage.descPlease', 'Place your flat palm on your chest and move it in a circular motion.') }
  ];

  const getLoadingStatus = (prog) => {
    if (prog < 25) return t('signLanguage.initializing', "Initializing challenge...");
    if (prog < 50) return t('signLanguage.loadingAsset', "Loading sign vector asset...");
    if (prog < 75) return t('signLanguage.configuringViewport', "Configuring viewport feed...");
    if (prog < 90) return t('signLanguage.validatingMatches', "Validating matches...");
    return t('signLanguage.ready', "Ready for challenge...");
  };

  // Skeletal Tracking simulation progress timer
  useEffect(() => {
    let interval;
    if (isSimulating) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 120);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isSimulating]);

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-slate-900 overflow-hidden font-sans pb-16">
      {/* Subtle organic background elements */}
      <div className="absolute top-0 right-0 -z-10 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-indigo-500/5 to-violet-500/5 blur-[120px]" />
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-blue-500/5 to-indigo-500/5 blur-[120px]" />

      {/* Container */}
      <div className="max-w-[1140px] mx-auto px-6 sm:px-8 pt-2 sm:pt-3">

        {/* Navigation - Simple Align Back Arrow */}
        <div className="mb-2 mt-4">
          <button 
            onClick={() => navigate("/#missions-grid")} 
            className="group w-10 h-10 bg-white hover:bg-slate-50 border border-slate-200/85 rounded-full shadow-sm flex items-center justify-center text-slate-650 hover:text-slate-950 transition-all duration-350 cursor-pointer"
            aria-label="Back to missions"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Hero Section - Matching the VR Lab layout perfectly */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-8 -mt-28">
          <div className="lg:col-span-7 space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-3.5"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50/80 backdrop-blur-sm text-indigo-700 border border-indigo-200/50 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                {t('signLanguage.missionBadge', 'Sign Language Mission')}
              </span>
             <h1 className="text-[24px] sm:text-[28px] md:text-[36px] lg:text-[42px] 2xl:text-[52px] font-extrabold leading-[1.05] tracking-tight text-[#1e293b]">
                {t('signLanguage.interactive', 'Interactive ')} <span className="text-blue-600">{t('signLanguage.signLanguage', 'Sign Language')}</span> {t('signLanguage.lab', 'Lab')}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl text-left">
                {t('signLanguage.heroDescription', 'Master Indian Sign Language (ISL) using our visual workspace, simulated skeletal node tracker, and fingerspelling dictionary. Designed to make learning inclusive and intuitive.')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap gap-3 pt-0.5"
            >
              <button 
                onClick={() => navigate("/sign-learn")}
                className="group inline-flex items-center gap-2.5 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-xs sm:text-sm font-bold shadow-md shadow-indigo-500/10 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                {t('signLanguage.startExploring', 'Start Exploring')}
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              
              <a 
                href="#simulator-section"
                className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                {t('signLanguage.tryViewportSandbox', 'Try Viewport Sandbox')}
              </a>
            </motion.div>

            {/* Premium Minimal Specs Row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200/80"
            >
              <div className="p-3 bg-white hover:bg-slate-55 border border-slate-200/60 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1 text-left">
                <div className="text-slate-900 font-bold flex items-center gap-1.5 text-xs sm:text-sm">
                  <Hand size={14} className="text-indigo-600" />
                  {t('signLanguage.visualFirst', 'Visual First')}
                </div>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">{t('signLanguage.visualFirstDesc', 'Learn gestures through animations.')}</p>
              </div>
              <div className="p-3 bg-white hover:bg-slate-55 border border-slate-200/60 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1 text-left">
                <div className="text-slate-900 font-bold flex items-center gap-1.5 text-xs sm:text-sm">
                  <Target size={14} className="text-violet-600" />
                  {t('signLanguage.grades', 'Grades 8-12')}
                </div>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">{t('signLanguage.gradesDesc', 'Mapped to textbook standards.')}</p>
              </div>
              <div className="p-3 bg-white hover:bg-slate-55 border border-slate-200/60 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1 text-left">
                <div className="text-slate-900 font-bold flex items-center gap-1.5 text-xs sm:text-sm">
                  <Cpu size={14} className="text-indigo-500" />
                  {t('signLanguage.aiSandbox', 'AI Sandbox')}
                </div>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">{t('signLanguage.aiSandboxDesc', 'Includes tracking simulator.')}</p>
              </div>
            </motion.div>
          </div>

          {/* Pedestal & Illustration - Made photo even bigger and removed duplicate CSS pedestal */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative w-full max-w-[480px] flex flex-col items-center"
            >
              {/* Pedestal Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-violet-500/10 rounded-full blur-[60px] -z-10 animate-pulse duration-[5000ms]" />
              
              {/* Pedestal Avatar Image (Even bigger layout) */}
              <img loading="lazy" decoding="async"
                src="/images/hello.webp"
                alt="Sign Language avatar greeting hello"
                className="w-[320px] sm:w-[360px] lg:w-[400px] h-auto object-contain select-none z-10 drop-shadow-[0_10px_25px_rgba(99,102,241,0.1)] transform hover:scale-[1.02] transition-transform duration-500"
              />
            </motion.div>
          </div>
        </section>

        {/* Section Title & Subtitle for Simulator */}
        <div id="simulator-section" className="text-center max-w-2xl mx-auto mb-6 space-y-1.5 pt-0">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full text-[10px] font-bold tracking-widest uppercase">
            {t('signLanguage.simulatedSandbox', 'Simulated Sandbox')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{t('signLanguage.interactiveViewportSandbox', 'Interactive Viewport Sandbox')}</h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">{t('signLanguage.selectModuleDesc', 'Select a module below to test gestures, spelling, and skeletal node matching overlays.')}</p>
        </div>

        {/* Interactive Viewport Section - MATCHING VR LAB Aesthetic */}
        <section className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-[32px] shadow-xl shadow-slate-100/50 p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-10">
          
          {/* Left Column: Selector */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{t('signLanguage.selectWorkspaceModule', 'Select Workspace Module')}</span>
              
              <div className="space-y-3">
                {sandboxModules.map((item, idx) => {
                  const isActive = activeSandboxModule === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (!isSimulating) {
                          setActiveSandboxModule(idx);
                        }
                      }}
                      disabled={isSimulating}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer relative overflow-hidden group ${
                        isActive 
                          ? 'border-indigo-650 bg-indigo-600 text-white shadow-lg shadow-indigo-600/10 -translate-y-0.5' 
                          : 'border-slate-200/60 bg-white hover:border-slate-300 hover:bg-slate-50/50 hover:-translate-y-0.5 shadow-sm'
                      }`}
                    >
                      {/* Left highlight strip */}
                      {isActive && (
                        <span className="absolute left-0 top-0 bottom-0 w-1 bg-white" />
                      )}

                      {/* Icon Container */}
                      <div className={`p-2.5 rounded-xl border transition-colors duration-300 ${
                        isActive 
                          ? 'bg-white border-white text-indigo-600' 
                          : 'bg-slate-50 border-slate-100 text-slate-500 group-hover:bg-slate-100 group-hover:text-slate-800'
                      }`}>
                        {item.icon}
                      </div>

                      {/* Info details */}
                      <div className="space-y-0.5 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className={`text-sm font-bold leading-snug transition-colors ${
                            isActive ? 'text-white' : 'text-slate-800 group-hover:text-indigo-655'
                          }`}>
                            {item.title}
                          </h3>
                          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded transition-all tracking-wider uppercase border ${
                            isActive 
                              ? 'bg-indigo-700/50 border-indigo-500/20 text-white' 
                              : 'bg-slate-100 border-slate-200/30 text-slate-500 group-hover:text-indigo-600 group-hover:bg-indigo-50'
                          }`}>
                            {item.badge}
                          </span>
                        </div>
                        <p className={`text-[10px] font-semibold transition-colors ${
                          isActive ? 'text-indigo-200' : 'text-slate-400'
                        }`}>
                          {idx === 0 ? 'Interactive Matcher' : idx === 1 ? 'Dictionary Builder' : 'Conversational Phrases'}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-slate-50/60 border border-slate-200/60 p-5 rounded-2xl">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{t('signLanguage.moduleObjective', 'Module Objective')}</h4>
              <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                {sandboxModules[activeSandboxModule].description}
              </p>
            </div>
          </div>

          {/* Right Column: Viewport Simulator - Light Modern UI */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 flex-1 flex flex-col min-h-[380px] sm:min-h-[420px] relative overflow-hidden shadow-md shadow-slate-150/40">
              
              {/* Screen Area - Clean light display board */}
              <div className="relative flex-1 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center border border-slate-150">
                
                {/* Mode 0: Practice Challenge Screen */}
                {activeSandboxModule === 0 && (
                  <div className="w-full h-full relative flex flex-col items-center justify-center p-4">
                    {viewportShowResult ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-4 max-w-xs"
                      >
                        <div className="w-12 h-12 rounded-full bg-teal-50 border border-teal-200 text-teal-600 flex items-center justify-center mx-auto shadow-sm animate-bounce">
                          <Check size={20} strokeWidth={3} />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-slate-900 tracking-wide">{t('signLanguage.challengeComplete', 'Challenge Complete!')}</h4>
                          <p className="text-[11px] text-slate-500 font-medium">{t('signLanguage.identifiedGestures', 'You identified all conversational gestures.')}</p>
                        </div>
                        <div className="bg-slate-100 border border-slate-200 rounded-xl p-3 font-mono text-center">
                          <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">{t('signLanguage.finalScore', 'Final Score')}</span>
                          <span className="text-lg font-black text-indigo-600">{viewportQuizScore} / {viewportQuizQuestions.length}</span>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={viewportQuizIdx}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex flex-col items-center gap-4 w-full"
                      >
                        {/* Enlarged full color cartoon drawing container */}
                        <div className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] bg-white border border-slate-200/60 rounded-2xl flex items-center justify-center p-5 shadow-sm relative">
                          <div className="absolute inset-1.5 border border-slate-100 rounded-lg pointer-events-none" />
                          <img loading="lazy" decoding="async" 
                            src={viewportQuizQuestions[viewportQuizIdx].image}
                            alt="Sign Language challenge gesture"
                            className="w-full h-full object-contain select-none"
                          />
                        </div>

                        {/* Interactive Match Status Overlay & Explanation Overlay (Fixed Height to prevent shifting) */}
                        <div className="flex flex-col items-center gap-1.5 min-h-[54px] justify-center px-4">
                          {viewportSelectedAnswer !== null ? (
                            <>
                              <div className={`px-3 py-1 rounded-full border text-[9px] font-mono tracking-wider uppercase font-extrabold ${
                                viewportIsCorrect 
                                  ? 'bg-teal-50 border-teal-200 text-teal-700' 
                                  : 'bg-rose-50 border-rose-200 text-rose-700'
                              }`}>
                                {viewportIsCorrect ? 'Correct Match (100%)' : 'Mismatch Detected'}
                              </div>
                              <p className={`text-[10px] font-bold text-center max-w-[280px] tracking-wide leading-tight ${
                                viewportIsCorrect ? 'text-teal-600' : 'text-rose-600'
                              }`}>
                                {viewportIsCorrect 
                                  ? viewportQuizQuestions[viewportQuizIdx].explanation
                                  : 'Look closely at the hand gestures and try again.'}
                              </p>
                            </>
                          ) : (
                            <div className="px-3.5 py-1 bg-slate-100 border border-slate-200/80 text-slate-500 rounded-full text-[9px] font-mono tracking-wider uppercase font-bold">
                              {t('signLanguage.awaitingMatch', 'Awaiting Match Option...')}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Mode 1: Fingerspelling Guide Screen */}
                {activeSandboxModule === 1 && (
                  <div className="w-full h-full relative flex items-center justify-center p-4">
                    <motion.div
                      key={activeAlphabet}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <div className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] bg-white border border-slate-200/60 rounded-2xl flex items-center justify-center p-5 shadow-sm relative">
                        <div className="absolute inset-1.5 border border-slate-100 rounded-lg pointer-events-none" />
                        <img loading="lazy" decoding="async" 
                          src={`/images/signlanguage/alphabets/${activeAlphabet}.webp`}
                          onError={(e) => { e.target.onerror = null; e.target.src = '/images/signlanguage/hand.webp'; }}
                          alt={`Sign for letter ${activeAlphabet}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs tracking-wider uppercase">
                        Letter {activeAlphabet}
                      </span>
                    </motion.div>
                  </div>
                )}

                {/* Mode 2: Everyday Greetings Screen */}
                {activeSandboxModule === 2 && (
                  <div className="w-full h-full relative flex items-center justify-center p-4">
                    <motion.div
                      key={activeGreetingIdx}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center gap-3.5 text-center max-w-[280px]"
                    >
                      <div className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] bg-white border border-slate-200/60 rounded-2xl flex items-center justify-center p-5 shadow-sm relative">
                        <div className="absolute inset-1.5 border border-slate-100 rounded-lg pointer-events-none" />
                        <img loading="lazy" decoding="async" 
                          src={greetingList[activeGreetingIdx].image}
                          alt={`Sign for greeting ${greetingList[activeGreetingIdx].name}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">
                          {greetingList[activeGreetingIdx].name}
                        </span>
                        <p className="text-[11px] text-slate-500 leading-normal font-semibold">
                          {greetingList[activeGreetingIdx].desc}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* HUD Overlays when active */}
                {panActive && !isSimulating && (
                  <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
                    {/* Central Crosshair */}
                    <div className="relative w-8 h-8 flex items-center justify-center">
                      <div className="absolute w-6 h-6 border border-indigo-500/10 rounded-full animate-ping" />
                      <div className="absolute w-1.5 h-1.5 bg-indigo-500/60 rounded-full" />
                      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-indigo-500/20 -translate-x-1/2 h-8" />
                      <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-indigo-500/20 -translate-y-1/2 w-8" />
                    </div>
                    
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 border border-slate-200 text-[9px] text-indigo-600 font-mono px-3 py-1 rounded-full tracking-wider uppercase flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                      {t('signLanguage.sensorMapping', 'Sensor mapping active')}
                    </div>
                  </div>
                )}

                {/* SIM FEED Badge */}
                <div className="absolute top-4 left-4 z-10 bg-white/90 border border-slate-200/80 backdrop-blur-sm text-[9px] text-slate-500 font-mono px-2.5 py-1 rounded-md flex items-center gap-1.5 font-bold shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-550 animate-pulse" />
                  {t('signLanguage.workspaceFeed', 'WORKSPACE FEED')}
                </div>

                {/* Simple clean framing corners */}
                <div className="absolute inset-4 pointer-events-none z-10">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-slate-300/40" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-slate-300/40" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-slate-300/40" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-slate-300/40" />
                </div>
              </div>

              {/* Viewport Control Panel - Dynamic depending on active module */}
              <div className="mt-3.5 border-t border-slate-200/60 pt-3 px-1 text-slate-650 bg-slate-50/50 rounded-xl flex flex-col gap-3">
                
                {/* Mode 0: Interactive Quiz Buttons */}
                {activeSandboxModule === 0 && !isSimulating && (
                  <div className="flex flex-col gap-2 py-1.5 border-b border-slate-200/60">
                    {viewportShowResult ? (
                      <div className="flex justify-center">
                        <button
                          onClick={() => {
                            setViewportQuizIdx(0);
                            setViewportSelectedAnswer(null);
                            setViewportIsCorrect(null);
                            setViewportQuizScore(0);
                            setViewportShowResult(false);
                          }}
                          className="px-6 py-2 bg-indigo-650 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-indigo-600/10 cursor-pointer"
                        >
                          {t('signLanguage.restartChallenge', 'Restart Challenge')}
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-center gap-2 flex-wrap">
                          {viewportQuizQuestions[viewportQuizIdx].options.map((option) => {
                            const isChosen = viewportSelectedAnswer === option;
                            const isCorrectOpt = option === viewportQuizQuestions[viewportQuizIdx].correct;
                            return (
                              <button
                                key={option}
                                onClick={() => {
                                  if (viewportIsCorrect === true) return;
                                  setViewportSelectedAnswer(option);
                                  if (isCorrectOpt) {
                                    setViewportIsCorrect(true);
                                    setViewportQuizScore(prev => prev + 1);
                                  } else {
                                    setViewportIsCorrect(false);
                                  }
                                }}
                                className={`px-4 py-2 rounded-lg text-xs font-extrabold uppercase transition-all border cursor-pointer ${
                                  isChosen
                                    ? isCorrectOpt
                                      ? 'bg-teal-600 border-teal-600 text-white shadow-sm'
                                      : 'bg-rose-600 border-rose-600 text-white shadow-sm'
                                    : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-750'
                                }`}
                              >
                                {option}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Inline controllers for Mode 1 & Mode 2 */}
                {activeSandboxModule === 1 && !isSimulating && (
                  <div className="flex flex-wrap gap-1.5 items-center justify-center max-h-[80px] overflow-y-auto py-1 border-b border-slate-200/60">
                    {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
                      <button
                        key={letter}
                        onClick={() => setActiveAlphabet(letter)}
                        className={`w-7 h-7 rounded text-[10px] font-black transition-all border cursor-pointer ${
                          activeAlphabet === letter
                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-600/10'
                            : 'bg-white border-slate-200 hover:bg-slate-150 text-slate-700'
                        }`}
                      >
                        {letter}
                      </button>
                    ))}
                  </div>
                )}

                {activeSandboxModule === 2 && !isSimulating && (
                  <div className="flex flex-wrap gap-1.5 items-center justify-center py-1 border-b border-slate-200/60">
                    {greetingList.map((greeting, idx) => (
                      <button
                        key={greeting.name}
                        onClick={() => setActiveGreetingIdx(idx)}
                        className={`px-3 py-1.5 rounded text-[9px] font-black uppercase tracking-wider transition-all border cursor-pointer ${
                          activeGreetingIdx === idx
                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-600/10'
                            : 'bg-white border-slate-200 hover:bg-slate-150 text-slate-750'
                        }`}
                      >
                        {greeting.name}
                      </button>
                    ))}
                  </div>
                )}

                {/* Bottom Bar: Action buttons */}
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <Link to="/sign-learn">
                      <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm shadow-indigo-600/10 cursor-pointer hover:-translate-y-0.5">
                        <BookOpen size={12} />
                        {t('signLanguage.openFullCourse', 'Open Full Course')}
                      </button>
                    </Link>
                  </div>

                  {activeSandboxModule === 0 && !viewportShowResult && (
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">
                        Question {viewportQuizIdx + 1}/{viewportQuizQuestions.length}
                      </span>
                      {viewportIsCorrect === true && (
                        <button
                          onClick={() => {
                            if (viewportQuizIdx < viewportQuizQuestions.length - 1) {
                              setViewportQuizIdx(prev => prev + 1);
                              setViewportSelectedAnswer(null);
                              setViewportIsCorrect(null);
                            } else {
                              setViewportShowResult(true);
                            }
                          }}
                          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all shadow-sm cursor-pointer hover:-translate-y-0.5"
                        >
                          {t('signLanguage.nextChallenge', 'Next Challenge')} <ArrowRight size={11} />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Info Stats Grid - Upgraded to match VR Lab perfectly */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-slate-200/80 max-w-4xl mx-auto text-center">
          <div className="p-5 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
            <h5 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-700 bg-clip-text text-transparent">4+</h5>
            <p className="text-xs sm:text-sm font-bold text-slate-800">{t('signLanguage.visualLearningModules', 'Visual Learning Modules')}</p>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{t('signLanguage.coveringAlphabets', 'Covering alphabets, numbers, Hindi swar & greetings.')}</p>
          </div>
          <div className="p-5 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
            <h5 className="text-3xl font-extrabold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">100%</h5>
            <p className="text-xs sm:text-sm font-bold text-slate-800">{t('signLanguage.curriculumAligned', 'Curriculum Aligned')}</p>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{t('signLanguage.mappedLessons', 'Mapped directly to secondary school lessons.')}</p>
          </div>
          <div className="p-5 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
            <h5 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Active</h5>
            <p className="text-xs sm:text-sm font-bold text-slate-800">{t('signLanguage.interactiveDemos', 'Interactive Demos')}</p>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{t('signLanguage.skeletalHand', 'Skeletal hand matching and dictionary explorers.')}</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Signlanguage;
