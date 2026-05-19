import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Brain, Cpu, MessageSquare, Eye, BarChart3, 
  Play, RotateCcw, Award, CheckCircle2, ChevronRight, 
  HelpCircle, Sparkles, Send, Activity, Star, Settings, X, Check, Gamepad2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Sidebar Navigation Data
const topicsData = [
  {
    id: 'ml',
    title: 'Fruit Sorter (Machine Learning) 🍎🍋',
    sub: 'Teaching robots to sort by color & size!',
    icon: <Brain className="w-5 h-5" />,
    color: 'from-amber-400/20 to-orange-500/20',
    textAccent: 'text-amber-600',
    bgLight: 'bg-amber-50',
    pillColor: 'bg-amber-500',
    buttonColor: 'bg-amber-500 hover:bg-amber-600 shadow-amber-200',
    synopsis: "Machine Learning is like teaching a puppy! 🐶 We show the computer lots of examples (like 'Big Red fruit is an Apple') until it learns to sort them automatically!"
  },
  {
    id: 'dl',
    title: 'Brain Train (Deep Learning) 🧠🚂',
    sub: 'How a computer\'s mini-brain learns secrets!',
    icon: <Cpu className="w-5 h-5" />,
    color: 'from-pink-400/20 to-purple-500/20',
    textAccent: 'text-pink-600',
    bgLight: 'bg-pink-50',
    pillColor: 'bg-pink-500',
    buttonColor: 'bg-pink-500 hover:bg-pink-600 shadow-pink-200',
    synopsis: "Deep Learning uses artificial neural networks—which are like millions of tiny lightbulbs (thinking cells) in a computer brain! Let's train them to light up!"
  },
  {
    id: 'nlp',
    title: 'Emoji Mood Matcher (NLP) 🎭💬',
    sub: 'How computers read and understand our talk!',
    icon: <MessageSquare className="w-5 h-5" />,
    color: 'from-emerald-400/20 to-teal-500/20',
    textAccent: 'text-emerald-600',
    bgLight: 'bg-emerald-50',
    pillColor: 'bg-emerald-500',
    buttonColor: 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200',
    synopsis: "Natural Language Processing (NLP) helps computers read our messages, understand our talk, and even guess if we are happy, sad, or super excited!"
  },
  {
    id: 'cv',
    title: 'Robot Eyes (Computer Vision) 👁️🤖',
    sub: 'How cameras spot and label objects!',
    icon: <Eye className="w-5 h-5" />,
    color: 'from-sky-400/20 to-blue-500/20',
    textAccent: 'text-sky-600',
    bgLight: 'bg-sky-50',
    pillColor: 'bg-sky-500',
    buttonColor: 'bg-sky-500 hover:bg-sky-600 shadow-sky-200',
    synopsis: "Computer Vision gives robot eyes to cameras! It helps self-driving cars spot traffic signs and helps robots identify classroom items instantly!"
  },
  {
    id: 'ds',
    title: 'Star Chart (Data Science) 📊⭐',
    sub: 'Finding magic patterns in student data!',
    icon: <BarChart3 className="w-5 h-5" />,
    color: 'from-indigo-400/20 to-violet-500/20',
    textAccent: 'text-indigo-600',
    bgLight: 'bg-indigo-50',
    pillColor: 'bg-indigo-500',
    buttonColor: 'bg-indigo-500 hover:bg-indigo-600 shadow-indigo-200',
    synopsis: "Data Science is like playing detective! 🕵️‍♂️ We collect numbers (data) like study hours, connect the dots on charts, and predict your future quiz scores!"
  }
];

// Interactive Challenges Catalog
const challengesData = [
  {
    id: 'ml_ch',
    title: 'Challenge 1: Mixed Fruit Sorter 🧺🍎',
    desc: 'Help the robot sort a basket of mixed fruits perfectly!',
    icon: <Brain className="w-5 h-5" />,
    color: 'border-amber-200 bg-amber-50/50 hover:bg-amber-50',
    accentText: 'text-amber-700'
  },
  {
    id: 'nlp_ch',
    title: 'Challenge 2: Mood Detective 🕵️‍♂️💬',
    desc: 'Identify the emoji emotions inside three sentences!',
    icon: <MessageSquare className="w-5 h-5" />,
    color: 'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50',
    accentText: 'text-emerald-700'
  },
  {
    id: 'cv_ch',
    title: 'Challenge 3: Spot the School Bag 🎒👁️',
    desc: 'Click on the hidden school bag in a digital classroom image!',
    icon: <Eye className="w-5 h-5" />,
    color: 'border-sky-200 bg-sky-50/50 hover:bg-sky-50',
    accentText: 'text-sky-700'
  }
];

export default function AiCourses() {
  const navigate = useNavigate();
  
  // Sidebar select & layout state
  const [activeTopic, setActiveTopic] = useState(topicsData[0]);
  const [activeChallenge, setActiveChallenge] = useState(null); // 'ml_ch', 'nlp_ch', 'cv_ch' or null

  // Score stats
  const [xp, setXp] = useState(100);
  const [showXpAlert, setShowXpAlert] = useState(false);
  const [lastXpGain, setLastXpGain] = useState(0);

  // 1. ML Fruit Sorter States
  const [mlFruitSize, setMlFruitSize] = useState('Medium');
  const [mlFruitColor, setMlFruitColor] = useState('Red');
  const [mlClassification, setMlClassification] = useState(null);

  // 2. DL Neural Brain Train States
  const [dlBrainPower, setDlBrainPower] = useState('Medium');
  const [isTrainingDl, setIsTrainingDl] = useState(false);
  const [dlEpoch, setDlEpoch] = useState(0);
  const [dlBrainLog, setDlBrainLog] = useState("");
  const [dlAcc, setDlAcc] = useState(40);

  // 3. NLP Emotion Matcher States
  const [nlpInputText, setNlpInputText] = useState("I am super excited and happy to learn robotics today! 🎉");
  const [nlpMoodResult, setNlpMoodResult] = useState(null);

  // 4. CV Robot Eyes States
  const [cvFeedType, setCvFeedType] = useState('Classroom');
  const [cvDetections, setCvDetections] = useState(null);
  const [isCvDetecting, setIsCvDetecting] = useState(false);

  // 5. Data Science Star Chart States
  const [dsPracticeDays, setDsPracticeDays] = useState(3);
  const [dsRegressionPlot, setDsRegressionPlot] = useState(null);

  // ==================== CHALLENGES STATE MANAGEMENT ====================
  
  // Challenge 1: ML Mixed Sorter State
  const mlBasket = [
    { size: 'Large', color: 'Green', name: 'Watermelon 🍉' },
    { size: 'Small', color: 'Yellow', name: 'Lemon 🍋' },
    { size: 'Medium', color: 'Red', name: 'Juicy Apple 🍎' },
    { size: 'Small', color: 'Red', name: 'Little Cherry 🍒' },
    { size: 'Large', color: 'Red', name: 'Large Apple 🍎' }
  ];
  const [mlChIndex, setMlChIndex] = useState(0);
  const [mlChCorrectCount, setMlChCorrectCount] = useState(0);
  const [mlChCompleted, setMlChCompleted] = useState(false);
  const [mlChSelectedAns, setMlChSelectedAns] = useState(null);

  // Challenge 2: NLP Mood Detective State
  const nlpSentences = [
    { text: "I lost my favorite drawing book and I feel a bit sad today. 😢", correct: 'Sad' },
    { text: "I am super excited and happy for our school picnic holiday! 🥳", correct: 'Happy' },
    { text: "Why does the computer brain think, and how was it made? 🧐", correct: 'Curious' }
  ];
  const [nlpChIndex, setNlpChIndex] = useState(0);
  const [nlpChCorrectCount, setNlpChCorrectCount] = useState(0);
  const [nlpChCompleted, setNlpChCompleted] = useState(false);
  const [nlpChSelectedAns, setNlpChSelectedAns] = useState(null);

  // Challenge 3: CV Spot the School Bag State
  const [cvChSpotted, setCvChSpotted] = useState(false);

  // =====================================================================

  // Gain XP Trigger helper
  const triggerXpGain = (amount) => {
    setXp(prev => prev + amount);
    setLastXpGain(amount);
    setShowXpAlert(true);
    setTimeout(() => setShowXpAlert(false), 2000);
  };

  // Switch Topic states
  const handleTopicSwitch = (topic) => {
    setActiveTopic(topic);
    setActiveChallenge(null); // exit any active challenges to restore default simulator
  };

  // Simulator 1: ML Fruit Sorter prediction logic
  const runMlFruitSorter = () => {
    let fruit = "Unknown Fruit ❓";
    let emoji = "❓";
    
    if (mlFruitSize === 'Large') {
      if (mlFruitColor === 'Green') {
        fruit = "Big Watermelon";
        emoji = "🍉";
      } else if (mlFruitColor === 'Red') {
        fruit = "Large Apple";
        emoji = "🍎";
      } else {
        fruit = "Big Banana";
        emoji = "🍌";
      }
    } else if (mlFruitSize === 'Small') {
      if (mlFruitColor === 'Yellow') {
        fruit = "Sweet Lemon";
        emoji = "🍋";
      } else if (mlFruitColor === 'Red') {
        fruit = "Little Cherry";
        emoji = "🍒";
      } else {
        fruit = "Green Grapes";
        emoji = "🍇";
      }
    } else { // Medium size
      if (mlFruitColor === 'Red') {
        fruit = "Juicy Apple";
        emoji = "🍎";
      } else if (mlFruitColor === 'Yellow') {
        fruit = "Ripe Banana";
        emoji = "🍌";
      } else {
        fruit = "Green Pear";
        emoji = "🍐";
      }
    }

    setMlClassification({ fruit, emoji });
    triggerXpGain(20);
  };

  // Simulator 2: DL brain train live epochs loop
  const trainRobotBrain = () => {
    if (isTrainingDl) return;
    setIsTrainingDl(true);
    setDlEpoch(0);
    setDlAcc(35);
    setDlBrainLog("Plugging in thinking bulbs... 🔌");

    const maxEpochs = 15;
    let epoch = 0;
    
    const interval = setInterval(() => {
      epoch += 1;
      setDlEpoch(epoch);

      if (epoch === 3) setDlBrainLog("Finding edges of ears & whiskers... 🐱");
      if (epoch === 6) setDlBrainLog("Robot is identifying nose shape... 👃");
      if (epoch === 9) setDlBrainLog("Testing model accuracy with sound files... 🔊");
      if (epoch === 12) setDlBrainLog("Connecting brain layers perfectly... ⚡");
      if (epoch === 15) setDlBrainLog("Brain fully trained! Eureka, it knows a Cat! 🎉");

      const delta = epoch / maxEpochs;
      const powerMultiplier = dlBrainPower === 'Super' ? 1.2 : dlBrainPower === 'Low' ? 0.8 : 1.0;
      const calculatedAccuracy = Math.min(100, Math.round(35 + (60 * delta * powerMultiplier)));
      setDlAcc(calculatedAccuracy);

      if (epoch >= maxEpochs) {
        clearInterval(interval);
        setIsTrainingDl(false);
        triggerXpGain(40);
      }
    }, 200);
  };

  // Simulator 3: NLP simple mood matches
  const scanNlpMood = () => {
    const text = nlpInputText.toLowerCase();
    
    let mood = "Thinking Mode 🤔";
    let emoji = "🤔";
    let meter = "Curious / Neutral";
    let color = "text-amber-500 bg-amber-50 border-amber-100";
    
    if (text.includes("happy") || text.includes("excited") || text.includes("love") || text.includes("fun") || text.includes("picnic")) {
      mood = "Super Happy! 🥳";
      emoji = "🥳";
      meter = "98% Positive Energy!";
      color = "text-green-600 bg-green-50 border-green-100";
    } else if (text.includes("sad") || text.includes("lost") || text.includes("cry") || text.includes("hurt") || text.includes("bad")) {
      mood = "Feeling Sad... ❤️";
      emoji = "😢";
      meter = "92% Blue Energy... (Sending virtual hug!)";
      color = "text-rose-600 bg-rose-50 border-rose-100";
    } else if (text.includes("why") || text.includes("how") || text.includes("question") || text.includes("robot") || text.includes("learn")) {
      mood = "Curious Learner! 🧐";
      emoji = "🧐";
      meter = "95% Brain Power Alert!";
      color = "text-blue-600 bg-blue-50 border-blue-100";
    }

    setNlpMoodResult({ mood, emoji, meter, color });
    triggerXpGain(20);
  };

  // Simulator 4: CV Robot eyes boxes drawers
  const runRobotEyesScan = () => {
    if (isCvDetecting) return;
    setIsCvDetecting(true);
    setCvDetections(null);

    setTimeout(() => {
      setIsCvDetecting(false);
      let itemsList = [];

      if (cvFeedType === 'Classroom') {
        itemsList = [
          { label: 'School Bag 🎒', confidence: 99, style: 'top-[35%] left-[10%] w-[35%] h-[40%] border-amber-500 bg-amber-500/10 text-amber-500' },
          { label: 'Class Smartboard 📺', confidence: 96, style: 'top-[10%] left-[25%] w-[55%] h-[20%] border-blue-500 bg-blue-500/10 text-blue-500' },
          { label: 'Math book 📚', confidence: 95, style: 'top-[65%] left-[65%] w-[25%] h-[20%] border-purple-500 bg-purple-500/10 text-purple-500' }
        ];
      } else if (cvFeedType === 'Playground') {
        itemsList = [
          { label: 'Football ⚽', confidence: 98, style: 'top-[60%] left-[45%] w-[20%] h-[25%] border-emerald-500 bg-emerald-500/10 text-emerald-500' },
          { label: 'Puppy 🐶', confidence: 97, style: 'top-[45%] left-[15%] w-[28%] h-[35%] border-amber-600 bg-amber-600/10 text-amber-600' },
          { label: 'Swing Set 🛝', confidence: 94, style: 'top-[15%] left-[55%] w-[35%] h-[55%] border-sky-500 bg-sky-500/10 text-sky-500' }
        ];
      } else { // Zoo Animals
        itemsList = [
          { label: 'Friendly Lion 🦁', confidence: 99, style: 'top-[30%] left-[15%] w-[35%] h-[45%] border-amber-500 bg-amber-500/10 text-amber-500' },
          { label: 'Playful Monkey 🐒', confidence: 95, style: 'top-[15%] left-[55%] w-[25%] h-[35%] border-emerald-500 bg-emerald-500/10 text-emerald-500' },
          { label: 'Tall Giraffe 🦒', confidence: 98, style: 'top-[5%] left-[75%] w-[20%] h-[90%] border-orange-500 bg-orange-500/10 text-orange-500' }
        ];
      }

      setCvDetections(itemsList);
      triggerXpGain(30);
    }, 850);
  };

  // Simulator 5: Data Science stars connector
  const calculateStarPredictions = () => {
    let score = 50 + (dsPracticeDays * 9.5);
    score = Math.min(100, Math.round(score));
    
    let rewardMessage = "Good job! Keep practicing! 📚";
    if (score >= 90) rewardMessage = "Superstar Learner! A+ Guaranteed! 🌟🎉";
    else if (score >= 75) rewardMessage = "Awesome Progress! Very Close to A+! 🚀";

    setDsRegressionPlot({
      score,
      rewardMessage
    });
    triggerXpGain(25);
  };

  // Load default simulator configs when switching tabs
  useEffect(() => {
    if (!activeChallenge) {
      runMlFruitSorter();
      scanNlpMood();
      runRobotEyesScan();
      calculateStarPredictions();
    }
  }, [activeTopic, activeChallenge]);

  // ==================== CHALLENGES INTERACTIVE ACTIONS ====================

  // Challenge 1 Action: Sort item
  const handleMlChSort = (selectedName) => {
    if (mlChSelectedAns !== null) return;
    
    setMlChSelectedAns(selectedName);
    const currentFruit = mlBasket[mlChIndex];
    const isCorrect = currentFruit.name.includes(selectedName);

    if (isCorrect) {
      setMlChCorrectCount(prev => prev + 1);
      triggerXpGain(30);
    }

    setTimeout(() => {
      setMlChSelectedAns(null);
      if (mlChIndex < mlBasket.length - 1) {
        setMlChIndex(prev => prev + 1);
      } else {
        setMlChCompleted(true);
        triggerXpGain(100); // Grand prize XP
      }
    }, 800);
  };

  // Challenge 2 Action: Detect Sentiment
  const handleNlpChDetect = (selectedMood) => {
    if (nlpChSelectedAns !== null) return;

    setNlpChSelectedAns(selectedMood);
    const currentSentence = nlpSentences[nlpChIndex];
    const isCorrect = currentSentence.correct === selectedMood;

    if (isCorrect) {
      setNlpChCorrectCount(prev => prev + 1);
      triggerXpGain(30);
    }

    setTimeout(() => {
      setNlpChSelectedAns(null);
      if (nlpChIndex < nlpSentences.length - 1) {
        setNlpChIndex(prev => prev + 1);
      } else {
        setNlpChCompleted(true);
        triggerXpGain(100); // Grand prize XP
      }
    }, 800);
  };

  // Reset Challenge states
  const resetChallenge = (chId) => {
    if (chId === 'ml_ch') {
      setMlChIndex(0);
      setMlChCorrectCount(0);
      setMlChCompleted(false);
      setMlChSelectedAns(null);
    } else if (chId === 'nlp_ch') {
      setNlpChIndex(0);
      setNlpChCorrectCount(0);
      setNlpChCompleted(false);
      setNlpChSelectedAns(null);
    } else if (chId === 'cv_ch') {
      setCvChSpotted(false);
    }
  };

  const startChallenge = (chId) => {
    resetChallenge(chId);
    setActiveChallenge(chId);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-slate-800 font-sans pb-16 relative overflow-x-hidden">
      
      {/* Floating XP Gain Alert */}
      <AnimatePresence>
        {showXpAlert && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 10, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-900 px-6 py-2.5 rounded-full font-black text-xs shadow-md z-50 flex items-center gap-2 border border-yellow-300"
          >
            <Star className="w-4 h-4 fill-yellow-900 stroke-yellow-950 animate-bounce" />
            <span>+{lastXpGain} XP Earned! Great job! 🌟</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SOBER ELEGANT HEADER */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-100 z-40 px-6 py-4 flex items-center justify-between shadow-[0_1px_15px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/ai-intelligence-dashboard')} 
            className="w-10 h-10 bg-white border border-slate-150 rounded-full shadow-sm flex items-center justify-center text-slate-400 hover:text-purple-600 hover:shadow transition-all group active:scale-95 cursor-pointer"
          >
            <ArrowLeft size={18} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
          
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span>AI Intelligence Playground</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-semibold tracking-wide uppercase">Interactive AI Lab for Kids</p>
          </div>
        </div>

        {/* Sober XP score tracker */}
        <div className="flex items-center gap-2">
          <div className="bg-purple-50/80 border border-purple-200 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Star className="w-5 h-5 text-purple-600 fill-purple-400" />
            <div>
              <span className="text-[9px] font-bold text-purple-500 uppercase tracking-wider block leading-none">MY XP SCORE</span>
              <span className="text-sm font-black text-slate-800 leading-none mt-0.5 block">{xp} XP</span>
            </div>
          </div>
        </div>
      </header>

      {/* CORE GRID */}
      <div className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Sidebar Navigation & Challenge Selector */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Topics List Card */}
          <div className="bg-white rounded-[20px] border border-slate-150 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-4 space-y-2">
            <h3 className="text-[10px] font-bold uppercase text-slate-400 tracking-wider px-2 mb-2">Explore Concepts</h3>
            
            {topicsData.map((topic) => {
              const isActive = activeTopic.id === topic.id && activeChallenge === null;
              
              return (
                <button
                  key={topic.id}
                  onClick={() => handleTopicSwitch(topic)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer group text-left border ${
                    isActive 
                      ? 'bg-purple-600 border-purple-700 text-white shadow-sm shadow-purple-100' 
                      : 'hover:bg-slate-50 border-transparent bg-white text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${
                      isActive ? 'bg-white/20 border-white/20 text-white' : 'bg-purple-50 border-purple-100 text-purple-600 group-hover:scale-102 transition-transform'
                    }`}>
                      {topic.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold leading-tight">{topic.title.split(' (')[0]}</h4>
                      <p className={`text-[9px] font-medium mt-0.5 ${isActive ? 'text-purple-100' : 'text-slate-400'}`}>{topic.sub}</p>
                    </div>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 ${isActive ? 'text-white' : 'text-slate-350'}`} />
                </button>
              );
            })}
          </div>

          {/* AI Challenge Center (Clean, sober selectors replacing simple quizzes) */}
          <div className="bg-white rounded-[20px] border border-slate-150 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-5 space-y-4">
            <div className="flex items-center gap-2 text-purple-600 font-bold text-xs uppercase tracking-wider px-1">
              <Gamepad2 className="w-4 h-4 text-purple-500" /> AI Challenge Center 🏆
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed px-1">
              Test your AI skills in three real-time games! Select a challenge below to launch it directly in the visual dashboard.
            </p>

            <div className="space-y-2">
              {challengesData.map((ch) => {
                const isActive = activeChallenge === ch.id;

                return (
                  <button
                    key={ch.id}
                    onClick={() => startChallenge(ch.id)}
                    className={`w-full p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      isActive 
                        ? 'border-purple-500 bg-purple-50/50 shadow-sm' 
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-purple-100 text-purple-600' : 'bg-slate-50 text-slate-500'
                      }`}>
                        {ch.icon}
                      </div>
                      <div>
                        <h4 className={`text-xs font-bold ${isActive ? 'text-purple-700' : 'text-slate-800'}`}>{ch.title}</h4>
                        <p className="text-[9px] text-slate-400 mt-0.5 leading-tight">{ch.desc}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Playful yet Sober Visual Simulators */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Workspace Card */}
          <div className="bg-white rounded-[24px] border border-slate-150 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-6 sm:p-8 relative overflow-hidden flex flex-col min-h-[460px]">
            
            {/* Active Challenge View */}
            {activeChallenge !== null ? (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                
                {/* Challenge Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <span className="inline-block px-3 py-0.5 bg-purple-50 text-purple-600 border border-purple-100 rounded-full text-[9px] font-bold uppercase tracking-wider">
                      Interactive Challenge Mode ⚔️
                    </span>
                    <h2 className="text-base font-bold text-slate-900 mt-2">
                      {challengesData.find(c => c.id === activeChallenge)?.title}
                    </h2>
                  </div>

                  <button
                    onClick={() => setActiveChallenge(null)}
                    className="flex items-center gap-1 px-3 py-1 bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-200 rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" /> Exit Challenge
                  </button>
                </div>

                {/* CHALLENGE 1: ML MIXED FRUIT SORTER */}
                {activeChallenge === 'ml_ch' && (
                  <div className="flex-1 flex flex-col justify-center py-4">
                    {!mlChCompleted ? (
                      <div className="space-y-6 max-w-lg mx-auto w-full text-center">
                        <div className="space-y-2">
                          <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest block">Basket Fruit {mlChIndex + 1} of 5</span>
                          <h3 className="text-sm font-bold text-slate-600">The robot holds a fruit with these specs:</h3>
                        </div>

                        {/* Specs display */}
                        <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 flex justify-center items-center gap-8 shadow-inner max-w-sm mx-auto">
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 block uppercase">Size</span>
                            <span className="text-sm font-black text-slate-800">{mlBasket[mlChIndex].size === 'Small' ? '🔎 Small' : mlBasket[mlChIndex].size === 'Medium' ? '👌 Medium' : '👑 Large'}</span>
                          </div>
                          <div className="w-px h-8 bg-slate-200" />
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 block uppercase">Color</span>
                            <span className="text-sm font-black text-slate-800">{mlBasket[mlChIndex].color === 'Red' ? '❤️ Red' : mlBasket[mlChIndex].color === 'Yellow' ? '💛 Yellow' : '💚 Green'}</span>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-450 uppercase block tracking-wider">Sort this fruit to its correct tray!</label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-w-md mx-auto pt-1">
                            {['Apple 🍎', 'Lemon 🍋', 'Watermelon 🍉', 'Cherry 🍒', 'Banana 🍌'].map((opt) => {
                              const isSelected = mlChSelectedAns === opt.split(' ')[0];
                              const isCorrect = mlBasket[mlChIndex].name.includes(opt.split(' ')[0]);

                              let btnClass = "border-slate-200 bg-white hover:bg-slate-50 text-slate-700";
                              if (mlChSelectedAns !== null) {
                                if (isCorrect) {
                                  btnClass = "border-green-500 bg-green-50 text-green-900 font-extrabold";
                                } else if (isSelected) {
                                  btnClass = "border-rose-400 bg-rose-50 text-rose-900";
                                } else {
                                  btnClass = "border-slate-100 opacity-60 text-slate-400";
                                }
                              }

                              return (
                                <button
                                  key={opt}
                                  disabled={mlChSelectedAns !== null}
                                  onClick={() => handleMlChSort(opt.split(' ')[0])}
                                  className={`py-3 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer ${btnClass}`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* score preview */}
                        <p className="text-[10px] font-semibold text-slate-400">Score: {mlChCorrectCount} / {mlChIndex} correct</p>
                      </div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-md mx-auto w-full text-center space-y-5 p-6 bg-amber-50/50 border border-amber-100 rounded-3xl"
                      >
                        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-3xl mx-auto shadow-sm">🏆</div>
                        <div className="space-y-1">
                          <h3 className="text-base font-bold text-slate-800">Challenge Perfect Sorter Completed!</h3>
                          <p className="text-xs text-amber-700 font-bold">You successfully sorted {mlChCorrectCount} / 5 fruits correctly!</p>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          Great job! Your data sorting algorithm was fully verified. You gained +100 bonus XP points!
                        </p>
                        <button
                          onClick={() => resetChallenge('ml_ch')}
                          className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow shadow-amber-250"
                        >
                          Play Challenge Again! 🎮
                        </button>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* CHALLENGE 2: NLP MOOD DETECTIVE */}
                {activeChallenge === 'nlp_ch' && (
                  <div className="flex-1 flex flex-col justify-center py-4">
                    {!nlpChCompleted ? (
                      <div className="space-y-6 max-w-lg mx-auto w-full text-center">
                        <div className="space-y-2">
                          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block">Sentence {nlpChIndex + 1} of 3</span>
                          <h3 className="text-sm font-bold text-slate-600">The NLP analyzer receives this sentence:</h3>
                        </div>

                        {/* Statement display */}
                        <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5 shadow-inner max-w-md mx-auto">
                          <p className="text-xs font-bold text-slate-800 leading-relaxed italic">
                            "{nlpSentences[nlpChIndex].text}"
                          </p>
                        </div>

                        {/* Action buttons */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-450 uppercase block tracking-wider">Predict the correct emotion tag!</label>
                          <div className="grid grid-cols-3 gap-2.5 max-w-sm mx-auto pt-1">
                            {['Happy', 'Sad', 'Curious'].map((opt) => {
                              const isSelected = nlpChSelectedAns === opt;
                              const isCorrect = nlpSentences[nlpChIndex].correct === opt;

                              let btnClass = "border-slate-200 bg-white hover:bg-slate-50 text-slate-700";
                              if (nlpChSelectedAns !== null) {
                                if (isCorrect) {
                                  btnClass = "border-green-500 bg-green-50 text-green-900 font-extrabold";
                                } else if (isSelected) {
                                  btnClass = "border-rose-400 bg-rose-50 text-rose-900";
                                } else {
                                  btnClass = "border-slate-100 opacity-60 text-slate-400";
                                }
                              }

                              return (
                                <button
                                  key={opt}
                                  disabled={nlpChSelectedAns !== null}
                                  onClick={() => handleNlpChDetect(opt)}
                                  className={`py-3 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer ${btnClass}`}
                                >
                                  {opt === 'Happy' ? '🥳 Happy' : opt === 'Sad' ? '😢 Sad' : '🧐 Curious'}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Score preview */}
                        <p className="text-[10px] font-semibold text-slate-400">Score: {nlpChCorrectCount} / {nlpChIndex} correct</p>
                      </div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-md mx-auto w-full text-center space-y-5 p-6 bg-emerald-50/50 border border-emerald-100 rounded-3xl"
                      >
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-3xl mx-auto shadow-sm">🕵️‍♂️</div>
                        <div className="space-y-1">
                          <h3 className="text-base font-bold text-slate-800">Challenge Mood Detective Completed!</h3>
                          <p className="text-xs text-emerald-700 font-bold">You successfully detected {nlpChCorrectCount} / 3 moods correctly!</p>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          Awesome! Your sentence classification algorithms worked perfectly. You gained +100 bonus XP points!
                        </p>
                        <button
                          onClick={() => resetChallenge('nlp_ch')}
                          className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow shadow-emerald-250"
                        >
                          Play Challenge Again! 🎮
                        </button>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* CHALLENGE 3: CV SPOT THE BAG */}
                {activeChallenge === 'cv_ch' && (
                  <div className="flex-1 flex flex-col justify-center items-center py-4">
                    {!cvChSpotted ? (
                      <div className="space-y-4 text-center w-full max-w-md">
                        <div className="space-y-1">
                          <span className="text-[10px] font-black text-sky-600 uppercase tracking-widest block">Computer Vision Hunt</span>
                          <h3 className="text-sm font-bold text-slate-600">Scan and click on the School Bag 🎒!</h3>
                        </div>

                        {/* Interactive map classroom */}
                        <div className="w-full aspect-[4/3] bg-slate-100 border border-slate-200 rounded-[20px] overflow-hidden relative shadow-sm">
                          <div 
                            className="absolute inset-0 bg-cover bg-center" 
                            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=400)' }} 
                          />
                          <div className="absolute inset-0 bg-slate-900/10 pointer-events-none" />

                          {/* Hidden clickable hotzone for school bag (located on the left desk shelf zone) */}
                          <button
                            onClick={() => {
                              setCvChSpotted(true);
                              triggerXpGain(100); // Grand prize XP
                            }}
                            className="absolute top-[35%] left-[10%] w-[35%] h-[40%] bg-transparent border-2 border-transparent hover:border-sky-400 hover:bg-sky-500/10 rounded-xl transition-all cursor-crosshair focus:outline-none"
                            title="Locate item here"
                          />
                        </div>
                        <p className="text-[10px] font-semibold text-slate-400">Hint: Look on the shelves on the left side of the classroom! 🔎</p>
                      </div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-md mx-auto w-full text-center space-y-5 p-6 bg-sky-50/50 border border-sky-100 rounded-3xl"
                      >
                        <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center text-3xl mx-auto shadow-sm">🎒</div>
                        <div className="space-y-1">
                          <h3 className="text-base font-bold text-slate-800">School Bag Spotted successfully!</h3>
                          <p className="text-xs text-sky-700 font-bold">Confidence score: 99% Identified! 🎯</p>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          Incredible! You played the role of Computer Vision perfectly, immediately drawing a high-accuracy box around the target item. You gained +100 bonus XP points!
                        </p>
                        <button
                          onClick={() => resetChallenge('cv_ch')}
                          className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow shadow-sky-250"
                        >
                          Play Hunt Again! 🎮
                        </button>
                      </motion.div>
                    )}
                  </div>
                )}

              </div>
            ) : (
              // DEFAULT SIMULATORS
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                
                {/* Header section */}
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className={`inline-block px-3 py-0.5 ${activeTopic.bgLight} ${activeTopic.textAccent} border border-purple-200 rounded-full text-[9px] font-bold uppercase tracking-wider`}>
                      Sober Playground 🌟
                    </span>
                    <h2 className="text-base font-bold text-slate-900 mt-2">
                      {activeTopic.title}
                    </h2>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium max-w-sm sm:text-right leading-relaxed">
                    {activeTopic.synopsis}
                  </p>
                </div>

                {/* SIMULATOR VIEWS */}
                <div className="flex-1 py-4 relative z-10 flex flex-col justify-center">
                  
                  {/* MACHINE LEARNING (Fruit Sorter 🍎🍋) */}
                  {activeTopic.id === 'ml' && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      
                      {/* Controllers */}
                      <div className="md:col-span-5 space-y-4">
                        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Settings className="w-3.5 h-3.5 text-amber-500" /> Fruit Specs
                        </h3>
                        
                        {/* Size Select */}
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">How big is the fruit?</label>
                          <div className="grid grid-cols-3 gap-1.5">
                            {['Small', 'Medium', 'Large'].map(sz => (
                              <button
                                key={sz}
                                onClick={() => setMlFruitSize(sz)}
                                className={`py-1.5 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                                  mlFruitSize === sz ? 'bg-amber-500 border-amber-600 text-white shadow-sm shadow-amber-100' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                }`}
                              >
                                {sz}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Color Select */}
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">What color is it?</label>
                          <div className="grid grid-cols-3 gap-1.5">
                            {['Yellow', 'Red', 'Green'].map(col => (
                              <button
                                key={col}
                                onClick={() => setMlFruitColor(col)}
                                className={`py-1.5 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                                  mlFruitColor === col ? 'bg-amber-500 border-amber-600 text-white shadow-sm shadow-amber-100' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                }`}
                              >
                                {col}
                              </button>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={runMlFruitSorter}
                          className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow shadow-amber-100 transition-all border-b border-amber-700 active:translate-y-0.5"
                        >
                          <Play className="w-3.5 h-3.5 fill-white" /> Teach Sorter! 🤖
                        </button>
                      </div>

                      {/* Visual Output */}
                      <div className="md:col-span-7 bg-amber-50/30 border border-amber-100 rounded-[20px] p-5 flex flex-col items-center justify-center text-center min-h-[220px] relative overflow-hidden shadow-inner">
                        {mlClassification ? (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-3.5 w-full"
                          >
                            <h4 className="text-[9px] font-bold uppercase tracking-wider text-amber-600">Robot Sorter Output</h4>
                            
                            <div className="w-20 h-20 rounded-full bg-white border border-amber-300 flex items-center justify-center mx-auto shadow-sm text-3xl">
                              {mlClassification.emoji}
                            </div>

                            <div className="space-y-0.5">
                              <div className="text-sm font-bold text-slate-800">AI prediction: "{mlClassification.fruit}"</div>
                              <p className="text-[10px] font-bold text-amber-600">Sorting accuracy: 100% Labeled! 🎯</p>
                            </div>

                            <div className="bg-white border border-amber-100 rounded-xl p-2.5 text-[9px] font-mono text-left text-slate-500 space-y-0.5">
                              <div>IF Color matches <span className="font-bold text-red-500">"{mlFruitColor}"</span></div>
                              <div>AND Size matches <span className="font-bold text-blue-500">"{mlFruitSize}"</span></div>
                              <div>THEN Robot Sorter ➔ <span className="font-black text-green-600">{mlClassification.fruit}</span></div>
                            </div>
                          </motion.div>
                        ) : (
                          <div className="text-slate-400 space-y-2">
                            <Brain className="w-10 h-10 text-amber-300 mx-auto" />
                            <p className="text-[10px] font-bold">Configure specs & teach our puppy robot!</p>
                          </div>
                        )}
                      </div>

                    </div>
                  )}

                  {/* DEEP LEARNING (Brain Train 🧠🚂) */}
                  {activeTopic.id === 'dl' && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      
                      {/* Controllers */}
                      <div className="md:col-span-5 space-y-4">
                        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Settings className="w-3.5 h-3.5 text-pink-500" /> Brain Config
                        </h3>

                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Robot Thinking Power</label>
                          <div className="grid grid-cols-3 gap-1.5">
                            {['Low', 'Medium', 'Super'].map(pwr => (
                              <button
                                key={pwr}
                                onClick={() => setDlBrainPower(pwr)}
                                className={`py-1.5 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                                  dlBrainPower === pwr ? 'bg-pink-500 border-pink-600 text-white shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                }`}
                              >
                                {pwr}
                              </button>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={trainRobotBrain}
                          disabled={isTrainingDl}
                          className={`w-full py-2.5 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow border-b transition-all ${
                            isTrainingDl 
                              ? 'bg-slate-200 border-slate-350 shadow-none cursor-not-allowed translate-y-0.5 text-slate-400' 
                              : 'bg-pink-500 hover:bg-pink-600 border-pink-700 shadow-pink-100 active:translate-y-0.5'
                          }`}
                        >
                          <Activity className={`w-3.5 h-3.5 ${isTrainingDl ? 'animate-spin' : ''}`} />
                          {isTrainingDl ? `Training network...` : 'Train Robot Brain! 🚂'}
                        </button>
                      </div>

                      {/* Neural Graph Visual */}
                      <div className="md:col-span-7 bg-slate-900 border border-slate-950 rounded-[20px] p-4 text-white min-h-[220px] flex flex-col justify-between shadow-sm relative">
                        
                        {/* Nodes grid */}
                        <div className="flex-grow flex justify-center items-center gap-5 py-2">
                          <div className="flex flex-col gap-2">
                            <div className="w-4 h-4 rounded-full bg-slate-700 border border-slate-500" />
                            <div className="w-4 h-4 rounded-full bg-slate-700 border border-slate-500" />
                          </div>
                          
                          <div className="text-pink-400/40 text-[8px] font-mono shrink-0">➔</div>

                          <div className="flex flex-col gap-3">
                            {[1, 2, 3].map(n => (
                              <motion.div
                                key={n}
                                animate={isTrainingDl ? { scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] } : {}}
                                transition={{ repeat: Infinity, duration: 0.8, delay: n * 0.15 }}
                                className={`w-5 h-5 rounded-full border flex items-center justify-center text-[8px] ${
                                  isTrainingDl ? 'bg-pink-500 border-pink-300 shadow-[0_0_8px_rgba(244,63,94,0.5)]' : 'bg-slate-800 border-slate-650'
                                }`}
                              >
                                💡
                              </motion.div>
                            ))}
                          </div>

                          <div className="text-pink-400/40 text-[8px] font-mono shrink-0">➔</div>

                          <div className="flex flex-col gap-2">
                            <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs ${
                              dlAcc > 80 ? 'bg-green-500 border-green-300' : 'bg-slate-800 border-slate-600'
                            }`}>
                              🐱
                            </div>
                          </div>
                        </div>

                        {/* Stats block */}
                        <div className="bg-slate-950 border border-slate-850 rounded-xl p-3 space-y-1.5 mt-auto text-[10px]">
                          <div className="flex justify-between items-center text-slate-500">
                            <span>Thinking Rounds</span>
                            <span>Intelligence score</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="font-extrabold text-pink-400">Round {dlEpoch} / 15</div>
                            <div className="font-black text-green-400">{dlAcc}% Smart!</div>
                          </div>
                          <p className="text-[9px] text-slate-400 italic text-center border-t border-slate-900 pt-1 leading-none">{dlBrainLog}</p>
                        </div>

                      </div>

                    </div>
                  )}

                  {/* NATURAL LANGUAGE (Emoji Mood Matcher 🎭💬) */}
                  {activeTopic.id === 'nlp' && (
                    <div className="space-y-4">
                      {/* Message Input */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Type a happy or sad statement!</label>
                        <div className="relative">
                          <textarea
                            value={nlpInputText}
                            onChange={(e) => setNlpInputText(e.target.value)}
                            placeholder="Type a friendly statement..."
                            className="w-full min-h-[80px] p-3 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-400 focus:bg-white transition-all font-bold pr-16 shadow-inner"
                          />
                          <button
                            onClick={scanNlpMood}
                            className="absolute bottom-3 right-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg py-1.5 px-3 text-[10px] font-bold cursor-pointer flex items-center gap-1 transition-transform active:scale-95 border-b border-emerald-700 shadow-sm"
                          >
                            <Send className="w-3 h-3" /> Check Mood!
                          </button>
                        </div>
                      </div>

                      {/* Quick options */}
                      <div className="flex gap-1.5 items-center flex-wrap">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Samples:</span>
                        {[
                          "Tomorrow is a school holiday! Yay! 🥳🎈",
                          "I lost my drawing book at the playground. 😢",
                          "Why does the computer brain think, and how was it made? 🧐"
                        ].map((pst, pIdx) => (
                          <button
                            key={pIdx}
                            onClick={() => {
                              setNlpInputText(pst);
                              setTimeout(() => scanNlpMood(), 50);
                            }}
                            className="text-[9px] font-bold text-slate-650 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full cursor-pointer transition-colors"
                          >
                            Statement {pIdx + 1}
                          </button>
                        ))}
                      </div>

                      {/* Result */}
                      {nlpMoodResult && (
                        <motion.div 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`rounded-xl p-3 border-2 flex items-center gap-3.5 ${nlpMoodResult.color}`}
                        >
                          <span className="text-3xl">{nlpMoodResult.emoji}</span>
                          <div>
                            <div className="text-[9px] font-bold uppercase tracking-wider opacity-75 leading-none">Mood Analyzer Prediction</div>
                            <h4 className="text-xs font-bold leading-snug mt-1">AI says: "{nlpMoodResult.mood}"</h4>
                            <p className="text-[9px] font-bold opacity-80 mt-0.5">{nlpMoodResult.meter}</p>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* COMPUTER VISION (Robot Eyes 👁️🤖) */}
                  {activeTopic.id === 'cv' && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      
                      {/* Controllers */}
                      <div className="md:col-span-5 space-y-4">
                        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Settings className="w-3.5 h-3.5 text-sky-500" /> Robot Feeds
                        </h3>

                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Where should the robot look?</label>
                          <div className="grid grid-cols-3 gap-1.5">
                            {['Classroom', 'Playground', 'Zoo'].map(fd => (
                              <button
                                key={fd}
                                onClick={() => setCvFeedType(fd)}
                                className={`py-1.5 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                                  cvFeedType === fd ? 'bg-sky-500 border-sky-600 text-white shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                }`}
                              >
                                {fd}
                              </button>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={runRobotEyesScan}
                          disabled={isCvDetecting}
                          className={`w-full py-2.5 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer shadow border-b transition-all ${
                            isCvDetecting 
                              ? 'bg-slate-200 border-slate-350 shadow-none cursor-not-allowed translate-y-0.5 text-slate-400' 
                              : 'bg-sky-500 hover:bg-sky-600 border-sky-700 shadow-sky-100 active:translate-y-0.5'
                          }`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          {isCvDetecting ? 'Scanning feed...' : 'Activate Robot Eyes! 👁️'}
                        </button>
                      </div>

                      {/* Screen Visual */}
                      <div className="md:col-span-7 bg-slate-100 border border-slate-200 rounded-[20px] overflow-hidden aspect-[4/3] relative flex flex-col items-center justify-center shadow-inner min-h-[200px]">
                        <div className="absolute inset-0 bg-cover bg-center" style={{
                          backgroundImage: `url(${
                            cvFeedType === 'Classroom' ? 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=400' :
                            cvFeedType === 'Playground' ? 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=400' :
                            'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=400'
                          })`
                        }} />

                        <div className="absolute inset-0 bg-slate-900/30 pointer-events-none" />

                        {/* scanning overlay */}
                        {isCvDetecting && (
                          <motion.div 
                            initial={{ y: 0 }}
                            animate={{ y: '140px' }}
                            transition={{ repeat: Infinity, duration: 1.0, ease: "linear" }}
                            className="absolute left-0 right-0 h-1 bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,1)] z-20 pointer-events-none"
                          />
                        )}

                        {/* bounding boxes */}
                        {!isCvDetecting && cvDetections && cvDetections.map((det, dIdx) => (
                          <motion.div 
                            key={dIdx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`absolute border-2 rounded-lg flex flex-col justify-start p-0.5 pointer-events-none z-10 shadow-sm ${det.style}`}
                          >
                            <span className="bg-slate-900/90 text-white font-bold text-[7px] uppercase px-1 rounded leading-none w-max block border border-white/20">
                              {det.label.split(' ')[0]} {det.confidence}%
                            </span>
                          </motion.div>
                        ))}

                        {!cvDetections && !isCvDetecting && (
                          <div className="absolute z-20 text-white text-center p-4">
                            <Eye className="w-8 h-8 text-sky-300 mx-auto mb-1.5 drop-shadow-sm" />
                            <p className="text-[10px] font-bold drop-shadow">Click Activate Robot Eyes above to run scanners!</p>
                          </div>
                        )}
                      </div>

                    </div>
                  )}

                  {/* DATA SCIENCE (Star Chart 📊⭐) */}
                  {activeTopic.id === 'ds' && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      
                      {/* Controllers */}
                      <div className="md:col-span-5 space-y-4">
                        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Settings className="w-3.5 h-3.5 text-indigo-500" /> Data Points
                        </h3>

                        {/* Practice Slider */}
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Days of Practice: {dsPracticeDays}</label>
                          <input
                            type="range"
                            min={1}
                            max={5}
                            step={1}
                            value={dsPracticeDays}
                            onChange={(e) => setDsPracticeDays(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-indigo-500"
                          />
                          <div className="flex justify-between text-[7px] font-bold text-slate-400 uppercase tracking-wider">
                            <span>1 Day</span>
                            <span>3 Days</span>
                            <span>5 Days 🌟</span>
                          </div>
                        </div>

                        <button
                          onClick={calculateStarPredictions}
                          className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow shadow-indigo-100 border-b border-indigo-700 active:translate-y-0.5 transition-all"
                        >
                          <BarChart3 className="w-3.5 h-3.5" /> Plot Magic Line! 📊🌈
                        </button>
                      </div>

                      {/* Star Chart */}
                      <div className="md:col-span-7 bg-white border border-indigo-100 rounded-[20px] p-5 min-h-[200px] flex flex-col justify-between shadow-inner">
                        
                        <div className="w-full h-32 relative flex items-center justify-center">
                          <svg className="w-full h-full" viewBox="0 0 200 100">
                            <line x1="20" y1="90" x2="190" y2="90" stroke="#e2e8f0" strokeWidth="1.5" />
                            <line x1="20" y1="10" x2="20" y2="90" stroke="#e2e8f0" strokeWidth="1.5" />
                            
                            <g opacity="0.9">
                              <text x="35" y="83" fontSize="8">⭐</text>
                              <text x="75" y="68" fontSize="8">⭐</text>
                              <text x="115" y="53" fontSize="8">⭐</text>
                              <text x="155" y="38" fontSize="8">⭐</text>
                              {dsRegressionPlot && dsPracticeDays >= 5 && <text x="178" y="18" fontSize="10" className="animate-bounce">🌟</text>}
                            </g>

                            {dsRegressionPlot && (
                              <motion.line 
                                initial={{ x2: 20, y2: 85 }}
                                animate={{ x2: 20 + (dsPracticeDays * 32), y2: 85 - (dsPracticeDays * 13) }}
                                transition={{ duration: 0.5 }}
                                x1="20" y1="85" stroke="#6366f1" strokeWidth="2.5" 
                              />
                            )}
                          </svg>
                        </div>

                        {dsRegressionPlot && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-2.5 text-center text-[10px] mt-1 space-y-0.5"
                          >
                            <div className="text-[8px] font-bold text-indigo-500 uppercase tracking-wider leading-none">AI Star Prediction</div>
                            <div className="text-xs font-black text-indigo-900 leading-none mt-1">Predicted Score: {dsRegressionPlot.score}%</div>
                            <p className="text-[9px] font-bold text-slate-500 italic mt-0.5 leading-none">{dsRegressionPlot.rewardMessage}</p>
                          </motion.div>
                        )}
                      </div>

                    </div>
                  )}

                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
