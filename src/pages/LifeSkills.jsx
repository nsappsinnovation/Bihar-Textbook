import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Clock,
  Brain, Lightbulb, CheckCircle2, Trophy,
  XCircle, Target, Heart,
  ChefHat, Wallet, Shield, MessageCircle, Wrench,
  Droplets, Sparkles, Coins, HeartPulse, Utensils, Monitor, Smile, Home,
  RefreshCw, CreditCard, AlertCircle, Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const quizQuestions = [
  { question: "What is the first thing you should do when you get a small cut?", options: ["Put a bandage on it immediately", "Wash it with clean water and soap", "Ignore it", "Blow on it"], correct: 1 },
  { question: "Why is it important to create a budget?", options: ["To buy everything you want", "To track income and expenses", "To show off your money", "To stop spending completely"], correct: 1 },
  { question: "What is a healthy way to manage stress?", options: ["Yelling at someone", "Taking deep breaths or talking to a friend", "Eating lots of junk food", "Sleeping all day"], correct: 1 },
  { question: "When boiling water on a stove, you should:", options: ["Leave it unattended", "Turn the handles inward", "Touch the pot to see if it's hot", "Put your face over it"], correct: 1 },
  { question: "What does a balanced diet mean?", options: ["Only eating vegetables", "Eating from all food groups", "Eating equal amounts of pizza and burgers", "Skipping meals"], correct: 1 },
];
const optionLabels = ['A', 'B', 'C', 'D'];

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
    <div className="w-full flex justify-center py-8 relative rounded-2xl overflow-hidden border border-slate-100">
      <div className="absolute inset-0 z-0">
        <img src="/images/life skill/bg.png" alt="Quiz Background" className="w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-emerald-900/10 backdrop-blur-[2px]" />
      </div>

      <div className="w-full max-w-[450px] shrink-0 transition-all duration-300 relative z-10 px-4">
        <AnimatePresence mode="wait">
          {!showResult && (
            <motion.div key="active-quiz" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full">
              <div className="bg-white/80 backdrop-blur-md rounded-xl p-5 sm:p-6 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.08)]">

                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2 flex-row text-left">
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

                <h2 className="text-[15px] font-bold text-slate-900 leading-snug mb-5 text-left">
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
                    <span className={`text-xs font-bold ${selectedOption === q.correct ? 'text-green-600'
                      : selectedOption === null ? 'text-amber-600' : 'text-rose-600'
                      }`}>
                      {selectedOption === q.correct ? '🎉 Correct!' : selectedOption === null ? "Time is up!" : '❌ Wrong answer'}
                    </span>
                  ) : <div />}

                  {isAnswered && (
                    <button onClick={handleNext}
                      className="flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-full text-xs font-bold transition-all shadow-md shadow-emerald-200 active:scale-95 cursor-pointer"
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
              <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 sm:p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] text-center">
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
                  <button onClick={handleRestart} className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-full text-xs font-bold transition-all shadow-md shadow-emerald-200 active:scale-95 cursor-pointer">
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
  const [selectedLab, setSelectedLab] = useState('atm'); // 'atm', 'traffic', 'cashier', 'firstaid'

  // --- ATM Simulator State ---
  const [atmStep, setAtmStep] = useState('insert');
  const [pinInput, setPinInput] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedAccountType, setSelectedAccountType] = useState('');
  const [atmError, setAtmError] = useState('');

  // --- Traffic Lab State ---
  const [trafficLight, setTrafficLight] = useState('green');
  const [isCrossing, setIsCrossing] = useState(false);
  const [crossingResult, setCrossingResult] = useState('');

  // --- Smart Cashier State ---
  const cashierItems = [
    { name: 'School Notebook & Pencil', price: 45, icon: '📝' },
    { name: 'Fresh Mango Basket', price: 120, icon: '🥭' },
    { name: 'Water Bottle & Lunchbox', price: 175, icon: '🍱' },
    { name: 'Toy Cricket Set', price: 340, icon: '🏏' },
    { name: 'Drawing Color Pens', price: 85, icon: '🎨' },
  ];
  const [cashierCurrentItem, setCashierCurrentItem] = useState(cashierItems[0]);
  const [cashierPaidAmount, setCashierPaidAmount] = useState(100);
  const [cashierChangeTray, setCashierChangeTray] = useState({ 100: 0, 50: 0, 20: 0, 10: 0, 5: 0, 2: 0, 1: 0 });
  const [cashierFeedback, setCashierFeedback] = useState(null);
  const [cashierScore, setCashierScore] = useState(0);

  // --- First Aid Clinic State ---
  const firstAidScenarios = [
    {
      id: 'knee-scratch',
      title: 'Scraped Knee from Bicycle Fall',
      icon: '🛹',
      description: 'A student fell off their bicycle. The knee is bleeding slightly with some dirt around it.',
      correctOrder: ['wash', 'antiseptic', 'bandage'],
      hints: {
        wash: 'First, clean the dirt using sterile water spray.',
        antiseptic: 'Apply antiseptic cream to prevent bacterial infection.',
        bandage: 'Cover with a clean adhesive band-aid to keep it sealed.'
      }
    },
    {
      id: 'tea-burn',
      title: 'Hot Tea Hand Burn',
      icon: '☕',
      description: 'A cup of hot tea spilled on the patient\'s hand. The skin is red and painful, but not blistered.',
      correctOrder: ['water-cool', 'aloe-vera', 'loose-bandage'],
      hints: {
        'water-cool': 'Immediately run cool water over the burn to stop deep tissue damage.',
        'aloe-vera': 'Soothe the inflammation with moisturizing aloe vera gel.',
        'loose-bandage': 'Loosely wrap with a sterile bandage to shield it from friction.'
      }
    },
    {
      id: 'bee-sting',
      title: 'Garden Bee Sting',
      icon: '🐝',
      description: 'A bee stung the patient on the arm. The area is swelling and itching heavily.',
      correctOrder: ['tweezer', 'ice-pack', 'antihistamine'],
      hints: {
        tweezer: 'First, use tweezers to scrape out the sting gently without squeezing it.',
        'ice-pack': 'Apply a cold ice pack to reduce local swelling and soothe pain.',
        antihistamine: 'Apply soothing antihistamine cream to block the allergic reaction.'
      }
    }
  ];
  const [currentScenarioIdx, setCurrentScenarioIdx] = useState(0);
  const [firstAidSequence, setFirstAidSequence] = useState([]);
  const [firstAidFeedback, setFirstAidFeedback] = useState(null);
  const [firstAidFinished, setFirstAidFinished] = useState(false);
  const [firstAidScore, setFirstAidScore] = useState(0);

  // --- ATM FUNCTIONS ---
  const handlePinClick = (num) => {
    if (atmStep === 'pin') {
      if (pinInput.length < 4) {
        setPinInput(prev => prev + num);
        setAtmError('');
      }
    } else if (atmStep === 'amountInput') {
      setSelectedAmount(prev => {
        const val = prev + num;
        if (parseInt(val, 10) > 10000) return prev;
        return val;
      });
      setAtmError('');
    }
  };

  const handlePinDelete = () => {
    if (atmStep === 'pin') {
      setPinInput(prev => prev.slice(0, -1));
    } else if (atmStep === 'amountInput') {
      setSelectedAmount(prev => prev.slice(0, -1));
    }
  };

  const handlePinSubmit = () => {
    if (atmStep === 'pin') {
      if (pinInput.length === 4) {
        setAtmStep('processing');
        setTimeout(() => {
          setAtmStep('dispensing');
          setTimeout(() => {
            setAtmStep('success');
          }, 3000);
        }, 2000);
      } else {
        setAtmError('Please enter a 4-digit PIN.');
      }
    } else if (atmStep === 'amountInput') {
      const amtVal = parseInt(selectedAmount, 10);
      if (!selectedAmount || isNaN(amtVal) || amtVal <= 0) {
        setAtmError('Please enter a valid amount.');
      } else if (amtVal % 100 !== 0) {
        setAtmError('Amount must be in multiples of ₹100.');
      } else {
        setAtmStep('pin');
      }
    }
  };

  const resetAtm = () => {
    setAtmStep('insert');
    setPinInput('');
    setSelectedAmount('');
    setSelectedLanguage('');
    setSelectedAccountType('');
    setAtmError('');
  };

  // --- TRAFFIC FUNCTIONS ---
  const handleCrossRoad = () => {
    if (isCrossing) return;
    setIsCrossing(true);
    setCrossingResult('');

    setTimeout(() => {
      if (trafficLight === 'red') {
        setCrossingResult('safe');
      } else {
        setCrossingResult('scared');
      }
      setIsCrossing(false);
    }, 2000);
  };

  const resetTrafficLab = () => {
    setTrafficLight('green');
    setIsCrossing(false);
    setCrossingResult('');
  };

  // --- CASHIER FUNCTIONS ---
  const generateNewCashierCustomer = () => {
    const randomItem = cashierItems[Math.floor(Math.random() * cashierItems.length)];
    const notesPossible = [50, 100, 200, 500];
    const paid = notesPossible.find(n => n > randomItem.price) || 500;

    setCashierCurrentItem(randomItem);
    setCashierPaidAmount(paid);
    setCashierChangeTray({ 100: 0, 50: 0, 20: 0, 10: 0, 5: 0, 2: 0, 1: 0 });
    setCashierFeedback(null);
  };

  const resetCashierLab = () => {
    setCashierScore(0);
    setCashierChangeTray({ 100: 0, 50: 0, 20: 0, 10: 0, 5: 0, 2: 0, 1: 0 });
    setCashierFeedback(null);
    generateNewCashierCustomer();
  };

  const addNoteToTray = (val) => {
    setCashierChangeTray(prev => ({
      ...prev,
      [val]: prev[val] + 1
    }));
    setCashierFeedback(null);
  };

  const removeNoteFromTray = (val) => {
    setCashierChangeTray(prev => ({
      ...prev,
      [val]: Math.max(0, prev[val] - 1)
    }));
    setCashierFeedback(null);
  };

  const checkCashierChange = () => {
    const changeDue = cashierPaidAmount - cashierCurrentItem.price;
    const trayTotal = Object.keys(cashierChangeTray).reduce(
      (sum, val) => sum + parseInt(val, 10) * cashierChangeTray[val],
      0
    );

    if (trayTotal === changeDue) {
      setCashierFeedback({
        type: 'success',
        text: `🎉 Perfect change! You handed back ₹${changeDue} correctly. +100 Points!`
      });
      setCashierScore(prev => prev + 100);
    } else if (trayTotal > changeDue) {
      setCashierFeedback({
        type: 'error',
        text: `❌ Too much money! You handed back ₹${trayTotal}, but change due is ₹${changeDue}.`
      });
    } else {
      setCashierFeedback({
        type: 'error',
        text: `❌ Not enough money! You handed back ₹${trayTotal}, but change due is ₹${changeDue}.`
      });
    }
  };

  // --- FIRST AID CLINIC FUNCTIONS ---
  const selectFirstAidTool = (toolId) => {
    if (firstAidFinished) return;
    const scenario = firstAidScenarios[currentScenarioIdx];
    const expectedTool = scenario.correctOrder[firstAidSequence.length];

    if (toolId === expectedTool) {
      const nextSequence = [...firstAidSequence, toolId];
      setFirstAidSequence(nextSequence);
      setFirstAidFeedback({
        type: 'info',
        text: `✓ Correct step! ${scenario.hints[toolId]}`
      });

      if (nextSequence.length === scenario.correctOrder.length) {
        setFirstAidFinished(true);
        setFirstAidScore(prev => prev + 100);
        setFirstAidFeedback({
          type: 'success',
          text: `🎉 Excellent job! You treated the patient successfully using correct first aid protocols. +100 Points!`
        });
      }
    } else {
      let errorMsg = "Wrong step! Assess the injury carefully.";
      if (toolId === 'ice-pack' && scenario.id === 'tea-burn') {
        errorMsg = "❌ Caution: Never apply direct ice or ice packs to fresh burns! It can cause tissue damage. Use cool running water first.";
      } else if (toolId === 'tweezer' && scenario.id === 'knee-scratch') {
        errorMsg = "❌ Clean the wound first with water before picking with tweezers.";
      } else if (toolId === 'bandage' && scenario.id === 'tea-burn') {
        errorMsg = "❌ Do not apply tight band-aids on fresh burns. Cool it with water first.";
      }
      setFirstAidFeedback({
        type: 'error',
        text: errorMsg
      });
    }
  };

  const resetFirstAidLab = () => {
    setFirstAidSequence([]);
    setFirstAidFeedback(null);
    setFirstAidFinished(false);
  };

  const resetFirstAidGame = () => {
    setFirstAidScore(0);
    setCurrentScenarioIdx(0);
    setFirstAidSequence([]);
    setFirstAidFeedback(null);
    setFirstAidFinished(false);
  };

  const nextFirstAidScenario = () => {
    setCurrentScenarioIdx(prev => (prev + 1) % firstAidScenarios.length);
    resetFirstAidLab();
  };

  const lifeSkillsFlashcards = [
    { id: 1, title: 'Cooking Basics', tag: 'Food', desc: 'Learn how to make simple, healthy and delicious meals for you and your family.', icon: <ChefHat size={20} />, content: "Start with simple recipes like boiling eggs, making rice, and preparing a healthy salad. Always wash vegetables before cutting them and never leave a hot stove unattended!" },
    { id: 2, title: 'Money Management', tag: 'Finance', desc: 'Learn how to save money, budget your expenses, and make smart financial decisions.', icon: <Wallet size={20} />, content: "Budgeting helps you track what you earn and what you spend. Always save a portion of your allowance or income for the future. Wants vs Needs is the core of budgeting." },
    { id: 3, title: 'ATM Security & Banking', tag: 'Finance', desc: 'Master the safety checklist when withdrawing cash from an ATM machine securely.', icon: <CreditCard size={20} />, content: "Always inspect the card reader slot for skimming devices by wiggling it. Shield the numeric keypad with your free hand while entering your secret PIN. Make sure the ATM screen fully resets before leaving the counter." },
    { id: 4, title: 'Road Safety & Signals', tag: 'Safety', desc: 'Learn crossing rules, traffic signals, and how to stay safe as a pedestrian on roads.', icon: <AlertCircle size={20} />, content: "Red light means Stop immediately. Yellow light means Get Ready. Green light means Go. Always cross at designated Zebra crossings, and look Left, Right, then Left again before stepping on the road." },
    { id: 5, title: 'First Aid Essentials', tag: 'Safety', desc: 'Basic first aid skills everyone should know for emergencies.', icon: <Shield size={20} />, content: "Clean a wound with soap and water, apply an antibacterial ointment, and cover it with a bandage. For minor burns, run cool water over it for 10 minutes." },
    { id: 6, title: 'Time Management', tag: 'Productivity', desc: 'Organize your day, set goals, and stop procrastinating.', icon: <Clock size={20} />, content: "Create a daily schedule. Prioritize your most important tasks first (eat the frog!) and take short 5-minute breaks every 30 minutes to stay fresh." },
    { id: 7, title: 'Effective Comm.', tag: 'Social', desc: 'Learn to express your thoughts clearly and listen to others.', icon: <MessageCircle size={20} />, content: "Good communication involves 50% speaking and 50% active listening. Maintain eye contact, don't interrupt, and ask questions to show you are engaged." },
    { id: 8, title: 'Basic Home Repair', tag: 'Maintenance', desc: 'Fix simple things around the house without calling a professional.', icon: <Wrench size={20} />, content: "Learn to tighten a loose screw, change a lightbulb safely (always turn off the switch first!), and unclog a sink using a plunger or baking soda and vinegar." },
    { id: 9, title: 'Digital Literacy', tag: 'Technology', desc: 'Understand internet safety and basic computer hygiene.', icon: <Monitor size={20} />, content: "Never share your passwords with anyone. Always verify the source of emails before clicking any links, and keep your software updated." },
    { id: 10, title: 'Emotional Intel.', tag: 'Mindset', desc: 'Recognize and manage your own emotions and others.', icon: <Smile size={20} />, content: "Pause and take a deep breath before reacting to anger. Try to understand things from the other person’s perspective before jumping to conclusions." },
  ];

  const Flashcard = ({ skill }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
      <div
        className="relative w-full h-[220px] cursor-pointer group text-left"
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
            className="absolute inset-0 w-full h-full bg-white rounded-xl p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col group-hover:border-emerald-200 transition-colors"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 text-xl shadow-inner">
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
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 shadow-[0_8px_30px_rgb(16,185,129,0.3)] flex flex-col text-white"
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
    { label: 'Practical Labs', value: 'Interactive labs', icon: <Target className="text-blue-600" />, color: 'bg-blue-50' },
    { label: 'Take Challenges', value: 'Test skills', icon: <Trophy className="text-amber-500" />, color: 'bg-amber-50' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex font-sans text-slate-900 overflow-x-hidden">
      <button
        onClick={() => navigate("/basic-skills")}
        className="fixed top-3 left-3 md:top-5 md:left-5 z-50 w-9 h-9 md:w-10 md:h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:shadow-lg transition-all border border-slate-100 group cursor-pointer"
      >
        <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>

      {/* Main Content */}
      <main className="flex-1 min-h-screen pb-4 overflow-y-auto">
        <div className="px-4 sm:px-6 md:px-12 2xl:px-20 space-y-6 md:space-y-8 pt-4 2xl:max-w-[1600px] 2xl:mx-auto">

          {/* Hero & Stats Section */}
          <div className="relative">
            {/* Hero Section */}
            <section className="bg-white rounded-[16px] md:rounded-[24px] overflow-hidden relative border border-slate-100 flex items-center min-h-[180px] sm:min-h-[220px] md:min-h-[260px] 2xl:min-h-[320px] pb-4 md:pb-6 text-left">
              <div className="relative z-10 p-5 sm:p-0 md:p-2 lg:w-1/2 space-y-3 md:space-y-4">
                <h1 className="text-[22px] sm:text-[28px] md:text-[36px] lg:text-[42px] 2xl:text-[52px] font-extrabold leading-[1.05] tracking-tight text-[#1e293b]">
                  Learn, Grow & <br /> Live Better with <br />
                  <span className="text-emerald-600">Life Skills</span>
                </h1>
                <p className="text-slate-500 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-medium leading-relaxed max-w-sm">
                  Practical lessons and daily habits for an independent life.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      const target = document.getElementById("content-section");
                      if (target) target.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 sm:px-6 sm:py-3 bg-emerald-600 text-white rounded-full font-bold text-[12px] sm:text-[14px] flex items-center gap-2 hover:bg-emerald-700 transition-colors w-max shadow-sm shadow-emerald-200 cursor-pointer"
                  >
                    Start Learning <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              <div className="hidden lg:block absolute top-0 right-0 w-[55%] h-full">
                <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/10 to-transparent z-10" />
                <img src="/images/life skill/right.png" alt="Life Skills" className="w-full h-auto object-contain object-right" />
              </div>
            </section>

            {/* Quick Stats Row — overlapping hero with negative margin */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 relative z-20 -mt-4 px-4 md:px-12 text-left">
              {quickStats.map((stat, i) => {
                const isActive = activeFilter === stat.label;

                // Themed borders and icons, keeping white background
                let themeBg = 'bg-white';
                let themeBorder = '';
                let iconBg = '';
                let iconColor = '';
                let textColor = '';

                if (stat.label === 'Learn Skills') {
                  themeBorder = isActive ? 'border-emerald-500 ring-2 ring-emerald-500/10 shadow-md' : 'border-slate-100/70 hover:border-emerald-200';
                  iconBg = isActive ? 'bg-emerald-600 text-white' : 'bg-emerald-50';
                  iconColor = isActive ? 'text-white' : 'text-emerald-600';
                  textColor = isActive ? 'text-emerald-700' : 'text-slate-800 group-hover:text-emerald-600';
                } else if (stat.label === 'Practical Labs') {
                  themeBorder = isActive ? 'border-blue-500 ring-2 ring-blue-500/10 shadow-md' : 'border-slate-100/70 hover:border-blue-200';
                  iconBg = isActive ? 'bg-blue-650 text-white' : 'bg-blue-50';
                  iconColor = isActive ? 'text-white' : 'text-blue-600';
                  textColor = isActive ? 'text-blue-750 text-blue-700' : 'text-slate-800 group-hover:text-blue-600';
                } else { // Take Challenges
                  themeBorder = isActive ? 'border-amber-500 ring-2 ring-amber-500/10 shadow-md' : 'border-slate-100/70 hover:border-amber-200';
                  iconBg = isActive ? 'bg-amber-500 text-white' : 'bg-amber-50';
                  iconColor = isActive ? 'text-white' : 'text-amber-500';
                  textColor = isActive ? 'text-amber-700' : 'text-slate-800 group-hover:text-amber-600';
                }

                return (
                  <div
                    key={i}
                    onClick={() => {
                      setActiveFilter(stat.label);
                      const target = document.getElementById("content-section");
                      if (target) target.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`${themeBg} ${themeBorder} rounded-2xl p-3.5 md:p-4 border flex items-center gap-3 md:gap-4 hover:shadow-md transition-all cursor-pointer group`}
                  >
                    <div className={`w-[44px] h-[44px] ${iconBg} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform [&>svg]:w-5 [&>svg]:h-5`}>
                      {React.cloneElement(stat.icon, { className: iconColor })}
                    </div>
                    <div>
                      <h4 className={`text-[13px] font-black leading-tight transition-colors ${textColor}`}>{stat.label}</h4>
                      <p className="text-[11px] font-bold mt-0.5 opacity-80">{stat.value}</p>
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
                {activeFilter === 'Practical Labs' && (
                  <div className="space-y-8">
                    {/* Horizontal Workspace Selector Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                      {[
                        {
                          id: 'atm',
                          title: 'Bihar Gramin Bank ATM',
                          desc: 'Secure cash withdrawal simulation.',
                          difficulty: 'Medium',
                          icon: '🏦',
                          activeStyle: 'bg-[#f1f5f9] border-emerald-500 ring-2 ring-emerald-500/10 shadow-md text-slate-900',
                          inactiveStyle: 'bg-[#f8fafc]/95 border-slate-200/60 hover:bg-[#f1f5f9]/70 hover:border-slate-300 text-slate-700 hover:text-slate-900',
                          iconBgActive: 'bg-blue-600 text-white',
                          iconBgInactive: 'bg-blue-50 text-blue-600'
                        },
                        {
                          id: 'traffic',
                          title: 'Traffic Safety Lab',
                          desc: 'Signals & road crossing practice.',
                          difficulty: 'Easy',
                          icon: '🚦',
                          activeStyle: 'bg-[#f1f5f9] border-emerald-500 ring-2 ring-emerald-500/10 shadow-md text-slate-900',
                          inactiveStyle: 'bg-[#f8fafc]/95 border-slate-200/60 hover:bg-[#f1f5f9]/70 hover:border-slate-300 text-slate-700 hover:text-slate-900',
                          iconBgActive: 'bg-emerald-600 text-white',
                          iconBgInactive: 'bg-green-50 text-emerald-600'
                        },
                        {
                          id: 'cashier',
                          title: 'Smart Cashier Lab',
                          desc: 'Indian currency change calculator.',
                          difficulty: 'Medium',
                          icon: '🪙',
                          activeStyle: 'bg-[#f1f5f9] border-emerald-500 ring-2 ring-emerald-500/10 shadow-md text-slate-900',
                          inactiveStyle: 'bg-[#f8fafc]/95 border-slate-200/60 hover:bg-[#f1f5f9]/70 hover:border-slate-300 text-slate-700 hover:text-slate-900',
                          iconBgActive: 'bg-amber-600 text-white',
                          iconBgInactive: 'bg-amber-50 text-amber-600'
                        },
                        {
                          id: 'firstaid',
                          title: 'First Aid Clinic',
                          desc: 'Emergency wound treatment steps.',
                          difficulty: 'Hard',
                          icon: '🩹',
                          activeStyle: 'bg-[#f1f5f9] border-emerald-500 ring-2 ring-emerald-500/10 shadow-md text-slate-900',
                          inactiveStyle: 'bg-[#f8fafc]/95 border-slate-200/60 hover:bg-[#f1f5f9]/70 hover:border-slate-300 text-slate-700 hover:text-slate-900',
                          iconBgActive: 'bg-rose-600 text-white',
                          iconBgInactive: 'bg-rose-50 text-rose-600'
                        }
                      ].map(lab => {
                        const isActive = selectedLab === lab.id;
                        return (
                          <div
                            key={lab.id}
                            onClick={() => {
                              setSelectedLab(lab.id);
                              setTimeout(() => {
                                const target = document.getElementById("lab-workspace");
                                if (target) {
                                  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                              }, 100);
                            }}
                            className={`p-5 rounded-lg border transition-all duration-300 cursor-pointer text-left relative overflow-hidden group ${isActive ? lab.activeStyle : lab.inactiveStyle
                              }`}
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div className={`w-12 h-12 rounded-md flex items-center justify-center text-2xl shadow-inner ${isActive ? lab.iconBgActive : lab.iconBgInactive
                                }`}>
                                {lab.icon}
                              </div>
                              <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${lab.difficulty === 'Easy' ? 'bg-green-100/80 text-green-800 border border-green-200/30'
                                : lab.difficulty === 'Medium' ? 'bg-blue-100/80 text-blue-800 border border-blue-200/30'
                                  : 'bg-rose-100/80 text-rose-800 border border-rose-200/30'
                                }`}>
                                {lab.difficulty}
                              </span>
                            </div>
                            <h3 className="text-base font-black leading-tight mb-1">
                              {lab.title}
                            </h3>
                            <p className="text-[13px] opacity-90 leading-normal font-semibold">
                              {lab.desc}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Active Lab Workspace */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        id="lab-workspace"
                        key={selectedLab}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                      >
                        {selectedLab === 'atm' && (
                          <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-6 md:p-8">
                            <div className="max-w-[1100px] mx-auto text-left">
                              <div className="flex justify-between items-center mb-6">
                                <div>
                                  <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider bg-emerald-50 px-3 py-1.5 rounded-full">
                                    Practical Lab 01
                                  </span>
                                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">Bihar Gramin Bank ATM Simulator</h2>
                                  <p className="text-sm text-slate-500 font-bold mt-1">Simulate safe cash withdrawals under realistic Bihar state banking conditions.</p>
                                </div>
                                <button
                                  onClick={resetAtm}
                                  className="p-1.5 bg-slate-105 hover:bg-slate-100 rounded-lg text-slate-400 border border-slate-200 transition-colors cursor-pointer"
                                  title="Reset ATM"
                                >
                                  <RefreshCw size={14} />
                                </button>
                              </div>

                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-6">
                                {/* LEFT COLUMN: ATM GUIDE & INSTRUCTIONS */}
                                <div className="lg:col-span-5 space-y-5">
                                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/65 shadow-sm space-y-4">
                                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                                      <Shield size={16} className="text-emerald-600" /> ATM Operation Guide
                                    </h3>

                                    <div className="space-y-2">
                                      {[
                                        { key: 'insert', label: 'Insert Debit Card', desc: 'Place your card into the card reader slot.' },
                                        { key: 'language', label: 'Choose Language', desc: 'Select English or Hindi for instruction.' },
                                        { key: 'option', label: 'Select Withdrawal', desc: 'Choose "Cash Withdrawal" from the options.' },
                                        { key: 'accountType', label: 'Select Account Type', desc: 'Choose "Savings Account" for personal funds.' },
                                        { key: 'amountInput', label: 'Enter Amount', desc: 'Specify amount in multiples of ₹100.' },
                                        { key: 'pin', label: 'Enter Secret PIN', desc: 'Input your 4-digit code using the keypad.' },
                                        { key: 'success', label: 'Dispense & Collect Cash', desc: 'Collect paper cash from the green slot.' }
                                      ].map((step, idx) => {
                                        const stepOrder = ['insert', 'language', 'option', 'accountType', 'amountInput', 'pin', 'success'];
                                        const currentIdx = stepOrder.indexOf(atmStep === 'processing' || atmStep === 'dispensing' ? 'pin' : atmStep);
                                        const thisIdx = stepOrder.indexOf(step.key);

                                        const isCompleted = thisIdx < currentIdx;
                                        const isActive = thisIdx === currentIdx;

                                        return (
                                          <div
                                            key={step.key}
                                            className={`flex items-start gap-3 p-2.5 rounded-lg border transition-all ${isActive
                                              ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-sm ring-1 ring-emerald-350'
                                              : isCompleted
                                                ? 'bg-slate-100/80 border-slate-250 text-slate-400 opacity-75'
                                                : 'bg-white border-slate-150 text-slate-450 text-slate-400'
                                              }`}
                                          >
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${isActive
                                              ? 'bg-emerald-600 text-white'
                                              : isCompleted
                                                ? 'bg-slate-400 text-white'
                                                : 'bg-slate-100 text-slate-400'
                                              }`}>
                                              {isCompleted ? '✓' : idx + 1}
                                            </div>
                                            <div className="space-y-0.5 text-left font-semibold">
                                              <div className="text-[12px] font-black leading-tight">{step.label}</div>
                                              <div className="text-[10px] opacity-90 leading-tight font-medium">{step.desc}</div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>

                                  <div className="bg-amber-50/70 rounded-xl p-4 border border-amber-200/50 space-y-3">
                                    <h4 className="text-[11.5px] font-black uppercase text-amber-700 tracking-wider flex items-center gap-1.5">
                                      <Shield size={14} className="text-amber-600 animate-pulse" /> Bihar Gramin Bank Security Rules
                                    </h4>
                                    <ul className="text-[11.5px] text-amber-900 space-y-2 list-disc list-inside pl-1 font-bold leading-relaxed">
                                      <li>Always cover the keypad with your hand while typing your secret PIN.</li>
                                      <li>Make sure the person behind you is at least 3 feet away.</li>
                                      <li>Check that the card slot does not have any extra attachments (skimmers).</li>
                                      <li>Never take help from strangers inside the ATM room.</li>
                                      <li>Ensure the screen returns to the Welcome / Insert Card screen before you walk away.</li>
                                    </ul>
                                  </div>
                                </div>

                                {/* RIGHT COLUMN: INTERACTIVE ATM MACHINE */}
                                <div className="lg:col-span-7 flex justify-center w-full">
                                  {/* PHYSICAL ATM CABINET CABINET CASING */}
                                  <div className="bg-gradient-to-b from-[#eceef4] to-[#cdd6e4] border-[8px] border-slate-500 rounded-xl p-4 md:p-5 shadow-xl space-y-4 w-full max-w-[530px] border-double relative">
                                    {/* Top Banner/Engraving */}
                                    <div className="bg-[#003b80] text-white py-1.5 px-3 rounded-lg text-center shadow-inner border border-[#002a60] flex flex-col items-center select-none">
                                      <span className="text-[12px] font-black tracking-widest">BIHAR GRAMIN BANK</span>
                                      <span className="text-[8.5px] text-sky-200 font-bold uppercase tracking-wider">Automated Teller Machine • एटीएम</span>
                                    </div>

                                    {/* ATM Screen and Side Buttons Group */}
                                    <div className="flex items-center gap-2 bg-[#1e293b] p-3 rounded-[16px] shadow-inner border border-slate-700/80">
                                      {/* LEFT SIDE PHYSICAL BUTTONS */}
                                      <div className="flex flex-col justify-around h-[240px] py-4 shrink-0">
                                        <button
                                          onClick={() => {
                                            if (atmStep === 'option') {
                                              alert("Simulation: Fast Cash is disabled. Please choose Cash Withdrawal.");
                                            } else if (atmStep === 'accountType') {
                                              setSelectedAccountType('Current');
                                              setAtmStep('amountInput');
                                            }
                                          }}
                                          className="w-4.5 h-4.5 bg-slate-700 hover:bg-slate-650 rounded-full border border-slate-600 shadow-md active:bg-slate-500 transition-colors cursor-pointer"
                                        />
                                        <button
                                          onClick={() => {
                                            if (atmStep === 'option') {
                                              alert("Simulation: Balance Inquiry is disabled. Please choose Cash Withdrawal.");
                                            }
                                          }}
                                          className="w-4.5 h-4.5 bg-slate-700 hover:bg-slate-650 rounded-full border border-slate-600 shadow-md active:bg-slate-500 transition-colors cursor-pointer"
                                        />
                                        <button
                                          onClick={() => {
                                            if (atmStep === 'amountInput') {
                                              setSelectedAmount('');
                                            }
                                          }}
                                          className="w-4.5 h-4.5 bg-slate-700 hover:bg-slate-650 rounded-full border border-slate-600 shadow-md active:bg-slate-500 transition-colors cursor-pointer"
                                        />
                                      </div>

                                      {/* DIGITAL DISPLAY SCREEN */}
                                      <div className="flex-1 bg-gradient-to-b from-[#008cc9] to-[#004b76] border-2 border-slate-700 rounded-xl h-[240px] p-3 flex flex-col justify-between relative overflow-hidden font-sans shadow-inner text-white select-none">

                                        {/* Screen Header */}
                                        <div className="border-b border-white/20 pb-1 flex justify-between items-center text-[8.5px] font-bold tracking-wide">
                                          <span className="flex items-center gap-1">🏦 भारतीय स्टेट बैंक</span>
                                          <span className="text-[7.5px] text-sky-200">STATE BANK OF INDIA</span>
                                        </div>

                                        {/* SCREEN CONTENT */}
                                        {atmStep === 'insert' && (
                                          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 py-1">
                                            <CreditCard className="w-11 h-11 text-sky-300 animate-bounce" />
                                            <div className="space-y-0.5">
                                              <h4 className="text-xs font-black tracking-wide text-white">WELCOME TO STATE BANK ATM</h4>
                                              <p className="text-[9px] text-sky-100">कृपया अपना कार्ड डालें / Please insert your debit card</p>
                                            </div>
                                            <button
                                              onClick={() => setAtmStep('language')}
                                              className="px-4 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-slate-900 rounded-lg text-[10px] font-black uppercase transition-all shadow-md cursor-pointer"
                                            >
                                              Insert Card
                                            </button>
                                          </div>
                                        )}

                                        {atmStep === 'language' && (
                                          <div className="flex-1 flex flex-col justify-between py-2 text-right">
                                            <div className="text-center">
                                              <h4 className="text-xs font-black text-white">PLEASE SELECT LANGUAGE</h4>
                                              <p className="text-[9px] text-sky-100">भाषा का चयन करें</p>
                                            </div>
                                            <div className="space-y-3.5 pr-0.5 text-right flex flex-col items-end">
                                              <button
                                                onClick={() => {
                                                  setSelectedLanguage('English');
                                                  setAtmStep('option');
                                                }}
                                                className="w-[120px] py-1 bg-sky-900/60 hover:bg-sky-600 border border-sky-300/40 hover:border-sky-300 text-white rounded text-[10px] font-black text-center cursor-pointer"
                                              >
                                                ENGLISH ➔
                                              </button>
                                              <button
                                                onClick={() => {
                                                  setSelectedLanguage('Hindi');
                                                  setAtmStep('option');
                                                }}
                                                className="w-[120px] py-1 bg-sky-900/60 hover:bg-sky-600 border border-sky-300/40 hover:border-sky-300 text-white rounded text-[10px] font-black text-center cursor-pointer"
                                              >
                                                हिंदी / HINDI ➔
                                              </button>
                                            </div>
                                          </div>
                                        )}

                                        {atmStep === 'option' && (
                                          <div className="flex-1 flex flex-col justify-between py-1.5">
                                            <h4 className="text-xs font-black text-center text-white">SELECT TRANSACTION</h4>
                                            <div className="grid grid-cols-2 gap-x-2 gap-y-3 mt-1.5">
                                              <div className="space-y-2 text-left">
                                                <button
                                                  onClick={() => alert("Simulation: Fast Cash is disabled. Please choose Cash Withdrawal.")}
                                                  className="w-full text-left pl-1.5 py-0.5 bg-sky-900/40 text-[9px] font-black rounded border border-transparent hover:border-sky-400 cursor-pointer"
                                                >
                                                  ⬳ FAST CASH
                                                </button>
                                                <button
                                                  onClick={() => alert("Simulation: Balance Inquiry is disabled. Please choose Cash Withdrawal.")}
                                                  className="w-full text-left pl-1.5 py-0.5 bg-sky-900/40 text-[9px] font-black rounded border border-transparent hover:border-sky-400 cursor-pointer"
                                                >
                                                  ⬳ BALANCE INQUIRY
                                                </button>
                                              </div>
                                              <div className="space-y-2 text-right flex flex-col items-end">
                                                <button
                                                  onClick={() => setAtmStep('accountType')}
                                                  className="w-[125px] py-0.5 bg-yellow-500 text-slate-900 text-[9px] font-black rounded text-center shadow-sm cursor-pointer"
                                                >
                                                  CASH WITHDRAWAL ➔
                                                </button>
                                                <button
                                                  onClick={() => alert("Simulation: PIN Change is disabled.")}
                                                  className="w-[125px] py-0.5 bg-sky-900/40 text-white text-[9px] font-black rounded border border-sky-300/30 text-center cursor-pointer"
                                                >
                                                  PIN CHANGE ➔
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        )}

                                        {atmStep === 'accountType' && (
                                          <div className="flex-1 flex flex-col justify-between py-2">
                                            <div className="text-center">
                                              <h4 className="text-xs font-black text-white">SELECT ACCOUNT TYPE</h4>
                                              <p className="text-[9px] text-sky-100">खाता प्रकार चुनें</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 mt-2">
                                              <div className="text-left">
                                                <button
                                                  onClick={() => {
                                                    setSelectedAccountType('Current');
                                                    setAtmStep('amountInput');
                                                  }}
                                                  className="w-full text-left pl-1.5 py-1 bg-sky-900/50 text-[9px] font-black rounded border border-sky-300/30 hover:border-sky-300 cursor-pointer"
                                                >
                                                  ⬳ CURRENT A/C
                                                </button>
                                              </div>
                                              <div className="text-right flex flex-col items-end">
                                                <button
                                                  onClick={() => {
                                                    setSelectedAccountType('Savings');
                                                    setAtmStep('amountInput');
                                                  }}
                                                  className="w-[110px] py-1 bg-yellow-500 text-slate-900 text-[9px] font-black rounded text-center cursor-pointer"
                                                >
                                                  SAVINGS A/C ➔
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        )}

                                        {atmStep === 'amountInput' && (
                                          <div className="flex-1 flex flex-col justify-between py-1.5">
                                            <div className="text-center space-y-0.5">
                                              <h4 className="text-xs font-black text-white">ENTER AMOUNT TO WITHDRAW</h4>
                                              <p className="text-[8px] text-sky-100">Multiples of ₹100 | Maximum ₹10,000</p>
                                            </div>

                                            <div className="flex flex-col items-center">
                                              <div className="w-[140px] bg-slate-950/80 border border-sky-300 rounded-lg p-1.5 text-center text-yellow-400 text-sm font-black font-mono tracking-wide relative">
                                                ₹ {selectedAmount || '0'}
                                                <span className="animate-ping absolute right-3">|</span>
                                              </div>
                                              {atmError && (
                                                <p className="text-[8px] text-red-200 font-bold mt-1 flex items-center gap-0.5 bg-red-950/40 px-2 py-0.5 rounded border border-red-900/50">
                                                  <AlertCircle size={8} /> {atmError}
                                                </p>
                                              )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 mt-1">
                                              <div className="text-left">
                                                <button
                                                  onClick={() => setSelectedAmount('')}
                                                  className="w-full text-left pl-1.5 py-1 bg-sky-900/50 text-[9px] font-black rounded border border-sky-300/30 hover:bg-sky-800 cursor-pointer"
                                                >
                                                  ⬳ CLEAR
                                                </button>
                                              </div>
                                              <div className="text-right flex flex-col items-end">
                                                <button
                                                  onClick={handlePinSubmit}
                                                  className="w-[110px] py-1 bg-yellow-500 text-slate-900 text-[9px] font-black rounded text-center shadow-sm cursor-pointer"
                                                >
                                                  CONFIRM ➔
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        )}

                                        {atmStep === 'pin' && (
                                          <div className="flex-1 flex flex-col justify-between py-1.5">
                                            <div className="text-center space-y-0.5">
                                              <h4 className="text-xs font-black text-white">ENTER YOUR SECRET PIN</h4>
                                              <p className="text-[8px] text-sky-200">सुरक्षा के लिए अपना पिन गोपनीय रखें</p>
                                            </div>

                                            <div className="flex flex-col items-center py-1.5">
                                              <div className="flex gap-2">
                                                {[0, 1, 2, 3].map(idx => (
                                                  <div
                                                    key={idx}
                                                    className="w-8 h-8 border border-sky-300/80 rounded-lg flex items-center justify-center text-sm text-yellow-400 font-black bg-[#061e38]"
                                                  >
                                                    {pinInput[idx] ? '●' : ''}
                                                  </div>
                                                ))}
                                              </div>
                                              {atmError && (
                                                <p className="text-[8px] text-red-200 font-bold mt-1 flex items-center gap-0.5">
                                                  <AlertCircle size={8} /> {atmError}
                                                </p>
                                              )}
                                            </div>

                                            <div className="text-right flex flex-col items-end mt-0.5">
                                              <button
                                                onClick={handlePinSubmit}
                                                className="w-[110px] py-1 bg-yellow-500 text-slate-900 text-[9px] font-black rounded text-center shadow-sm cursor-pointer"
                                              >
                                                ENTER / हाँ ➔
                                              </button>
                                            </div>
                                          </div>
                                        )}

                                        {atmStep === 'processing' && (
                                          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 py-1.5">
                                            <div className="w-9 h-9 rounded-full border-2 border-t-yellow-400 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                                            <div className="space-y-0.5">
                                              <h4 className="text-xs font-bold text-sky-100">TRANSACTION PROCESSING</h4>
                                              <p className="text-[9px] text-sky-200">कृपया प्रतीक्षा करें / Please wait...</p>
                                            </div>
                                          </div>
                                        )}

                                        {atmStep === 'dispensing' && (
                                          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 py-1.5">
                                            <motion.div
                                              animate={{ y: [0, 8, 0] }}
                                              transition={{ repeat: Infinity, duration: 1.2 }}
                                              className="text-3xl"
                                            >
                                              💵
                                            </motion.div>
                                            <div className="space-y-0.5">
                                              <h4 className="text-xs font-black text-yellow-300">CASH DISPENSING</h4>
                                              <p className="text-[9px] text-white font-bold">Please collect your ₹ {selectedAmount} cash</p>
                                            </div>
                                          </div>
                                        )}

                                        {atmStep === 'success' && (
                                          <div className="flex-1 flex flex-col justify-between py-2 text-center font-bold">
                                            <div className="flex flex-col items-center space-y-1">
                                              <div className="w-9 h-9 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-300 border border-emerald-500/30">
                                                <CheckCircle2 size={22} />
                                              </div>
                                              <h4 className="text-xs font-black text-emerald-300">TRANSACTION SUCCESS</h4>
                                              <p className="text-[8.5px] text-sky-100 leading-normal">
                                                Please remove your card.<br />
                                                Thank you for banking with State Bank.
                                              </p>
                                            </div>
                                            <div className="text-right flex flex-col items-end">
                                              <button
                                                onClick={resetAtm}
                                                className="w-[110px] py-1 bg-yellow-500 text-slate-900 text-[9px] font-black rounded text-center shadow-sm cursor-pointer"
                                              >
                                                COMPLETE ➔
                                              </button>
                                            </div>
                                          </div>
                                        )}

                                        {/* Screen Footer */}
                                        <div className="border-t border-white/10 pt-0.5 flex justify-between text-[7px] text-sky-200 font-medium">
                                          <span>{selectedLanguage ? `Lang: ${selectedLanguage}` : 'Choose Language'}</span>
                                          <span>{selectedAccountType ? `A/C: ${selectedAccountType}` : 'Secure Session'}</span>
                                        </div>
                                      </div>

                                      {/* RIGHT SIDE PHYSICAL BUTTONS */}
                                      <div className="flex flex-col justify-around h-[240px] py-4 shrink-0">
                                        <button
                                          onClick={() => {
                                            if (atmStep === 'language') {
                                              setSelectedLanguage('English');
                                              setAtmStep('option');
                                            } else if (atmStep === 'option') {
                                              setAtmStep('accountType');
                                            } else if (atmStep === 'accountType') {
                                              setSelectedAccountType('Savings');
                                              setAtmStep('amountInput');
                                            }
                                          }}
                                          className="w-4.5 h-4.5 bg-slate-700 hover:bg-slate-650 rounded-full border border-slate-600 shadow-md active:bg-slate-500 transition-colors cursor-pointer"
                                        />
                                        <button
                                          onClick={() => {
                                            if (atmStep === 'language') {
                                              setSelectedLanguage('Hindi');
                                              setAtmStep('option');
                                            }
                                          }}
                                          className="w-4.5 h-4.5 bg-slate-700 hover:bg-slate-650 rounded-full border border-slate-600 shadow-md active:bg-slate-500 transition-colors cursor-pointer"
                                        />
                                        <button
                                          onClick={() => {
                                            if (atmStep === 'amountInput' || atmStep === 'pin') {
                                              handlePinSubmit();
                                            } else if (atmStep === 'success') {
                                              resetAtm();
                                            }
                                          }}
                                          className="w-4.5 h-4.5 bg-slate-700 hover:bg-slate-650 rounded-full border border-slate-600 shadow-md active:bg-slate-500 transition-colors cursor-pointer"
                                        />
                                      </div>
                                    </div>

                                    {/* MIDDLE ROW: RECEIPT PRINTER & CARD SLOT */}
                                    <div className="grid grid-cols-2 gap-3 pt-0.5">
                                      {/* Receipt Printer */}
                                      <div className="bg-[#1e293b] border border-slate-400 p-2.5 rounded-xl flex items-center justify-between text-white shadow-inner select-none">
                                        <div className="text-[8px] font-black text-slate-350 tracking-wider leading-none">
                                          RECEIPT
                                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-0.5 shadow-sm shadow-emerald-500/50 animate-pulse" />
                                        </div>
                                        <div className="w-18 h-1 bg-slate-950 rounded shadow-inner relative overflow-hidden">
                                          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-slate-200 animate-bounce" />
                                        </div>
                                      </div>

                                      {/* Card Reader Slot */}
                                      <div className="bg-[#1e293b] border border-slate-400 p-2.5 rounded-xl flex items-center justify-between text-white shadow-inner select-none">
                                        <div className="text-[8px] font-black text-slate-350 tracking-wider leading-none">
                                          CARD SLOT
                                          <div className={`w-1.5 h-1.5 rounded-full mt-0.5 shadow-sm ${atmStep === 'insert'
                                            ? 'bg-green-500 shadow-green-500/50 animate-pulse'
                                            : 'bg-slate-500'
                                            }`} />
                                        </div>

                                        <div className="relative w-16 h-3.5 bg-slate-950 border border-slate-700 rounded flex items-center justify-center overflow-hidden">
                                          <div className={`w-11 h-0.5 bg-green-500 rounded ${atmStep === 'insert' ? 'animate-pulse' : 'bg-slate-800'
                                            }`} />
                                        </div>
                                      </div>
                                    </div>

                                    {/* LOWER ROW: CASH DISPENSER SHUTTER */}
                                    <div className="bg-[#1e293b] border border-slate-400 p-2 rounded-xl text-center text-white shadow-inner space-y-0.5 select-none">
                                      <div className="flex justify-between items-center text-[8px] font-black text-slate-300 tracking-widest px-1">
                                        <span>CASH DISPENSING SLOT</span>
                                        <div className={`w-1.5 h-1.5 rounded-full ${atmStep === 'dispensing'
                                          ? 'bg-green-500 shadow-green-500/50 animate-ping'
                                          : 'bg-red-500'
                                          }`} />
                                      </div>

                                      <div className="w-full h-7.5 bg-slate-950 rounded-lg relative overflow-hidden flex items-center justify-center border-t border-slate-800">
                                        {atmStep === 'dispensing' ? (
                                          <motion.div
                                            initial={{ y: 15 }}
                                            animate={{ y: 0 }}
                                            className="text-[10px] font-black text-emerald-400 animate-bounce flex items-center gap-1 cursor-pointer select-none"
                                            onClick={() => setAtmStep('success')}
                                          >
                                            💵 Take ₹{selectedAmount} Cash (Click here)
                                          </motion.div>
                                        ) : (
                                          <div className="w-[80%] h-0.5 bg-slate-800 rounded" />
                                        )}
                                      </div>
                                    </div>

                                    {/* ATM PHYSICAL KEYPAD (Slanted panel look) */}
                                    <div className="bg-[#334155] border-t border-slate-450 border-b border-l border-r rounded-[16px] p-3 shadow-inner">
                                      <div className="grid grid-cols-4 gap-2.5 max-w-[380px] mx-auto">
                                        <div className="col-span-3 grid grid-cols-3 gap-2">
                                          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                                            <button
                                              key={num}
                                              onClick={() => handlePinClick(num)}
                                              disabled={atmStep !== 'pin' && atmStep !== 'amountInput'}
                                              className="py-2 bg-[#475569] hover:bg-[#3b4759] active:bg-[#1e293b] text-slate-150 text-slate-200 font-mono font-black text-xs rounded border-b-2 border-slate-900 border-r shadow disabled:opacity-40 transition-colors text-center cursor-pointer"
                                            >
                                              {num}
                                            </button>
                                          ))}
                                          <button disabled={true} className="py-1 bg-[#475569] text-slate-500 font-bold rounded border-b-2 border-slate-900 disabled:opacity-40">*</button>
                                          <button
                                            key={0}
                                            onClick={() => handlePinClick(0)}
                                            disabled={atmStep !== 'pin' && atmStep !== 'amountInput'}
                                            className="py-2 bg-[#475569] hover:bg-[#3b4759] active:bg-[#1e293b] text-slate-150 text-slate-200 font-mono font-black text-xs rounded border-b-2 border-slate-900 border-r shadow disabled:opacity-40 transition-colors text-center cursor-pointer"
                                          >
                                            0
                                          </button>
                                          <button disabled={true} className="py-1 bg-[#475569] text-slate-500 font-bold rounded border-b-2 border-slate-900 disabled:opacity-40">#</button>
                                        </div>

                                        <div className="flex flex-col gap-1.5">
                                          <button
                                            onClick={handlePinDelete}
                                            disabled={atmStep !== 'pin' && atmStep !== 'amountInput'}
                                            className="flex-1 py-1.5 bg-yellow-500 active:bg-yellow-600 border-b-2 border-yellow-800 text-slate-950 font-bold text-[9px] rounded transition-colors flex items-center justify-center cursor-pointer disabled:opacity-40"
                                          >
                                            CLEAR
                                          </button>
                                          <button
                                            onClick={resetAtm}
                                            className="flex-1 py-1.5 bg-rose-600 active:bg-rose-700 border-b-2 border-rose-800 text-white font-bold text-[9px] rounded transition-colors flex items-center justify-center cursor-pointer"
                                          >
                                            CANCEL
                                          </button>
                                          <button
                                            onClick={handlePinSubmit}
                                            disabled={atmStep !== 'pin' && atmStep !== 'amountInput'}
                                            className="flex-1 py-1.5 bg-green-600 active:bg-green-700 border-b-2 border-green-800 text-white font-bold text-[9px] rounded transition-colors flex items-center justify-center cursor-pointer disabled:opacity-40"
                                          >
                                            ENTER
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 flex items-start gap-3 mt-6">
                                <Shield className="text-emerald-600 shrink-0 mt-0.5" size={18} />
                                <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                                  <strong className="block font-black mb-0.5">Banking Safety Challenge:</strong> Try inserting the debit card, choose English or Hindi, select Cash Withdrawal, pick Savings A/C, type your withdrawal amount (e.g. 500 or 1000) using the keypad and click ENTER, then enter a secret 4-digit PIN to complete the transaction!
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedLab === 'traffic' && (
                          <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-5 md:p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                              {/* Left Column: Guidelines & Pedestrian Rules */}
                              <div className="lg:col-span-5 space-y-4 text-left">
                                <div>
                                  <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider bg-emerald-50 px-3 py-1.5 rounded-full">
                                    Practical Lab 02
                                  </span>
                                  <h2 className="text-2xl font-black text-slate-900 mt-2">Traffic Safety Sandbox</h2>
                                  <p className="text-xs text-slate-500 font-bold mt-1">Learn traffic lights and pedestrian guidelines for safe road crossing.</p>
                                </div>

                                {/* Rules Card */}
                                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 space-y-3">
                                  <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-2">
                                    🚦 Indian Traffic Light Rules
                                  </h3>

                                  <div className="space-y-2">
                                    <div className="flex items-start gap-2.5">
                                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0 mt-1 shadow-sm shadow-red-400" />
                                      <div className="text-[11px] leading-relaxed">
                                        <strong className="text-slate-800">RED LIGHT (रुको):</strong> Vehicles must stop completely. Safe time for pedestrians to use the zebra crossing.
                                      </div>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 shrink-0 mt-1 shadow-sm shadow-yellow-400" />
                                      <div className="text-[11px] leading-relaxed">
                                        <strong className="text-slate-800">YELLOW LIGHT (तैयार रहो):</strong> Vehicles slow down to stop. Do NOT start crossing now.
                                      </div>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                      <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0 mt-1 shadow-sm shadow-green-400" />
                                      <div className="text-[11px] leading-relaxed">
                                        <strong className="text-slate-800">GREEN LIGHT (चलो):</strong> Vehicles move. Pedestrians must stay on the sidewalk/footpath.
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Pedestrian Safety Tips */}
                                <div className="bg-white border border-slate-100 rounded-xl p-4 space-y-2.5 shadow-sm">
                                  <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-2">
                                    🚶‍♂️ Pedestrian Safety Tips
                                  </h3>
                                  <ul className="text-[11px] text-slate-500 space-y-1.5 list-disc pl-4 font-semibold">
                                    <li>Always cross at designated <strong>Zebra Crossings</strong>.</li>
                                    <li>Look <strong>Right, Left, then Right again</strong> before stepping on the road.</li>
                                    <li>Do not use mobile phones or wear headphones while crossing.</li>
                                    <li>Make eye contact with drivers to ensure they see you.</li>
                                  </ul>
                                </div>

                                <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100/70 flex items-start gap-2">
                                  <Shield className="text-emerald-600 shrink-0 mt-0.5" size={14} />
                                  <p className="text-[10px] text-emerald-800 leading-relaxed font-semibold">
                                    <strong>Safety Rule:</strong> Never cross when traffic light is GREEN or YELLOW. Walk only when cars stop completely for a RED light.
                                  </p>
                                </div>
                              </div>

                              {/* Right Column: Interactive Road Viewport */}
                              <div className="lg:col-span-7 space-y-4">
                                <div className="flex justify-between items-center bg-slate-50 p-2 rounded-xl border border-slate-100">
                                  <span className="text-[11px] font-bold text-slate-500 pl-2">Zebra Crossing Interactive Sandbox</span>
                                  <button
                                    onClick={resetTrafficLab}
                                    className="p-1.5 bg-white hover:bg-slate-50 rounded-lg text-slate-500 border border-slate-200 transition-colors cursor-pointer"
                                  >
                                    <RefreshCw size={12} />
                                  </button>
                                </div>

                                {/* ROAD VIEWPORT */}
                                <div className="relative bg-slate-800 rounded-xl h-[200px] w-full border border-slate-700 overflow-hidden shadow-inner flex flex-col justify-between">
                                  {/* Top Footpath */}
                                  <div className="h-7 bg-slate-600 border-b-4 border-dashed border-yellow-500 flex items-center px-4">
                                    <div className="text-[9px] text-slate-300 font-bold font-mono">SAFE WALK SIDEWALK</div>
                                  </div>

                                  {/* Lanes */}
                                  <div className="flex-1 relative flex items-center">
                                    <div className="absolute inset-x-0 h-0.5 border-t border-dashed border-white/40 top-1/2 -translate-y-1/2" />
                                    <div className="absolute left-[40%] top-0 bottom-0 w-20 flex justify-between px-1">
                                      {[0, 1, 2, 3, 4, 5].map(idx => (
                                        <div key={idx} className="w-1.5 h-full bg-white/90" />
                                      ))}
                                    </div>

                                    {trafficLight !== 'red' && !isCrossing && (
                                      <motion.div
                                        animate={{ x: [-80, 550] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                        className="absolute top-2.5 text-3xl"
                                      >
                                        🚓
                                      </motion.div>
                                    )}
                                    {trafficLight !== 'red' && !isCrossing && (
                                      <motion.div
                                        animate={{ x: [550, -80] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: 1 }}
                                        className="absolute bottom-2.5 text-3xl"
                                      >
                                        🚙
                                      </motion.div>
                                    )}

                                    <motion.div
                                      animate={isCrossing ? { y: [145, 20] } : { y: 145 }}
                                      transition={{ duration: 2 }}
                                      className="absolute left-[45%] text-3xl z-20"
                                      style={{ bottom: '5px' }}
                                    >
                                      🚶‍♂️
                                    </motion.div>
                                  </div>

                                  {/* Bottom Footpath */}
                                  <div className="h-7 bg-slate-600 border-t-4 border-dashed border-yellow-500 flex items-center px-4">
                                    <div className="text-[9px] text-slate-300 font-bold font-mono">START CROSSING POINT</div>
                                  </div>

                                  {/* Traffic Light Box */}
                                  <div className="absolute right-4 top-10 bg-slate-900 border-2 border-slate-700 rounded-full py-1 px-1.5 flex flex-col gap-1 shadow-md z-30">
                                    <div className={`w-3.5 h-3.5 rounded-full ${trafficLight === 'red' ? 'bg-red-500 shadow-md shadow-red-500/50' : 'bg-red-950'}`} />
                                    <div className={`w-3.5 h-3.5 rounded-full ${trafficLight === 'yellow' ? 'bg-yellow-500 shadow-md shadow-yellow-500/50' : 'bg-yellow-950'}`} />
                                    <div className={`w-3.5 h-3.5 rounded-full ${trafficLight === 'green' ? 'bg-green-500 shadow-md shadow-green-500/50' : 'bg-green-950'}`} />
                                  </div>
                                </div>

                                {/* CONTROLS */}
                                <div className="space-y-4 pt-3 border-t border-slate-200">
                                  <div className="flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
                                      <span className="text-[11px] font-bold text-slate-500">Light Signal:</span>
                                      <div className="flex gap-1.5">
                                        {['green', 'yellow', 'red'].map(color => (
                                          <button
                                            key={color}
                                            onClick={() => setTrafficLight(color)}
                                            className={`px-2.5 py-1 rounded text-[10px] font-black uppercase transition-all cursor-pointer ${trafficLight === color
                                              ? color === 'red' ? 'bg-red-500 text-white' : color === 'yellow' ? 'bg-yellow-500 text-slate-900' : 'bg-green-500 text-white'
                                              : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                                              }`}
                                          >
                                            {color}
                                          </button>
                                        ))}
                                      </div>
                                    </div>

                                    <button
                                      onClick={handleCrossRoad}
                                      disabled={isCrossing}
                                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[11px] font-black tracking-wide uppercase transition-all flex items-center gap-1.5 shadow-md shadow-emerald-200/50 disabled:opacity-50 cursor-pointer animate-pulse"
                                    >
                                      <Eye size={12} /> Cross zebra crossing
                                    </button>
                                  </div>

                                  <AnimatePresence mode="wait">
                                    {crossingResult === 'safe' && (
                                      <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="bg-green-100 border border-green-200 text-green-800 rounded-xl p-3 flex items-center gap-2 text-xs font-semibold"
                                      >
                                        <CheckCircle2 className="text-green-600 shrink-0" size={18} />
                                        <span>Great job! You waited for the traffic light to turn RED, causing vehicles to stop. The zebra crossing was safe to cross! +50 XP 🌟</span>
                                      </motion.div>
                                    )}
                                    {crossingResult === 'scared' && (
                                      <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="bg-red-100 border border-red-200 text-red-800 rounded-xl p-3 flex items-center gap-2 text-xs font-semibold"
                                      >
                                        <AlertCircle className="text-red-600 shrink-0" size={18} />
                                        <span>Watch out! The traffic light was {trafficLight.toUpperCase()} and vehicles were driving past. Never cross while cars are moving!</span>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              </div>

                            </div>
                          </div>
                        )}

                        {selectedLab === 'cashier' && (
                          <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-6 md:p-8">
                            <div className="max-w-[800px] mx-auto text-left space-y-6">
                              <div className="flex justify-between items-start">
                                <div>
                                  <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider bg-emerald-50 px-3 py-1.5 rounded-full">
                                    Practical Lab 03
                                  </span>
                                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">Smart Cashier Lab</h2>
                                  <p className="text-sm text-slate-500 font-bold mt-1">Calculate and build correct change using Indian Rupee notes & coins.</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="bg-amber-50 px-4 py-2 rounded-2xl border border-amber-100 text-center shrink-0">
                                    <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest block">Score</span>
                                    <span className="text-lg font-black text-amber-700">{cashierScore} pts</span>
                                  </div>
                                  <button
                                    onClick={resetCashierLab}
                                    className="p-2 bg-white hover:bg-slate-50 rounded-xl text-slate-500 border border-slate-200 transition-colors cursor-pointer self-stretch flex items-center justify-center"
                                    title="Reset Cashier Game"
                                  >
                                    <RefreshCw size={14} />
                                  </button>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                                {/* CUSTOMER PANEL */}
                                <div className="md:col-span-5 bg-slate-50 border border-slate-100 rounded-[24px] p-5 flex flex-col justify-between min-h-[300px]">
                                  <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                      <span className="text-3xl">👤</span>
                                      <div>
                                        <h4 className="text-sm font-black text-slate-800">Customer Checkout</h4>
                                        <p className="text-[10px] text-slate-400 font-bold">A customer is buying one item.</p>
                                      </div>
                                    </div>

                                    <div className="bg-white border border-slate-200/60 rounded-2xl p-4 space-y-3">
                                      <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold text-slate-500">Item Selected:</span>
                                        <span className="text-xs font-black text-slate-800 flex items-center gap-1">
                                          {cashierCurrentItem.icon} {cashierCurrentItem.name}
                                        </span>
                                      </div>
                                      <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold text-slate-500">Item Cost:</span>
                                        <span className="text-sm font-black text-slate-800">₹ {cashierCurrentItem.price}</span>
                                      </div>
                                      <div className="flex justify-between items-center pt-2.5 border-t border-dashed border-slate-100">
                                        <span className="text-xs font-bold text-slate-500">Cash Received:</span>
                                        <span className="text-sm font-black text-emerald-600">₹ {cashierPaidAmount}</span>
                                      </div>
                                      <div className="flex justify-between items-center pt-2.5 border-t border-dashed border-slate-100 bg-emerald-50/40 p-2 rounded-lg">
                                        <span className="text-xs font-black text-emerald-700">Change Due:</span>
                                        <span className="text-base font-black text-emerald-700">₹ {cashierPaidAmount - cashierCurrentItem.price}</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="pt-4">
                                    <button
                                      onClick={generateNewCashierCustomer}
                                      className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all text-center cursor-pointer"
                                    >
                                      Next Customer
                                    </button>
                                  </div>
                                </div>

                                {/* REGISTER TRAY */}
                                <div className="md:col-span-7 space-y-4">
                                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">Indian Currency Drawer</h4>
                                  <div className="grid grid-cols-2 gap-2">
                                    {[
                                      { val: 100, label: '₹100 Note', color: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
                                      { val: 50, label: '₹50 Note', color: 'bg-sky-50 border-sky-200 text-sky-700' },
                                      { val: 20, label: '₹20 Note', color: 'bg-orange-50 border-orange-200 text-orange-700' },
                                      { val: 10, label: '₹10 Note', color: 'bg-amber-50 border-amber-200 text-amber-850 text-amber-800' },
                                      { val: 5, label: '₹5 Coin', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
                                      { val: 2, label: '₹2 Coin', color: 'bg-teal-50 border-teal-200 text-teal-700' },
                                      { val: 1, label: '₹1 Coin', color: 'bg-slate-50 border-slate-200 text-slate-700' }
                                    ].map(curr => (
                                      <div
                                        key={curr.val}
                                        className={`p-2.5 border rounded-xl flex items-center justify-between shadow-sm ${curr.color}`}
                                      >
                                        <div className="font-mono font-black text-xs">{curr.label}</div>
                                        <div className="flex items-center gap-1.5 shrink-0">
                                          <button
                                            onClick={() => removeNoteFromTray(curr.val)}
                                            className="w-5.5 h-5.5 bg-white hover:bg-slate-100 rounded-md border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-600 transition-colors cursor-pointer"
                                          >
                                            -
                                          </button>
                                          <span className="font-mono text-xs font-black w-4 text-center">
                                            {cashierChangeTray[curr.val]}
                                          </span>
                                          <button
                                            onClick={() => addNoteToTray(curr.val)}
                                            className="w-5.5 h-5.5 bg-white hover:bg-slate-100 rounded-md border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-600 transition-colors cursor-pointer"
                                          >
                                            +
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>

                                  {/* PAY TRAY DISPLAY */}
                                  <div className="bg-[#121620] rounded-[24px] p-4 text-white border border-slate-800 min-h-[100px] flex flex-col justify-between">
                                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">
                                      <span>Current Cash Tray</span>
                                      <button
                                        onClick={() => setCashierChangeTray({ 100: 0, 50: 0, 20: 0, 10: 0, 5: 0, 2: 0, 1: 0 })}
                                        className="text-rose-400 hover:text-rose-300 font-black cursor-pointer text-[10px]"
                                      >
                                        Clear Tray
                                      </button>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5 items-center py-2 min-h-[40px]">
                                      {Object.keys(cashierChangeTray).map(val => {
                                        const qty = cashierChangeTray[val];
                                        if (qty === 0) return null;
                                        return Array.from({ length: qty }).map((_, i) => (
                                          <div
                                            key={`${val}-${i}`}
                                            className={`px-2 py-1 rounded font-mono font-black text-[9px] shadow-sm select-none border ${val === '100' ? 'bg-indigo-600 border-indigo-400 text-white'
                                              : val === '50' ? 'bg-sky-500 border-sky-400 text-white'
                                                : val === '20' ? 'bg-orange-500 border-orange-400 text-white'
                                                  : val === '10' ? 'bg-amber-600 border-amber-400 text-white'
                                                    : 'bg-yellow-505 bg-yellow-500 border-yellow-400 text-slate-900'
                                              }`}
                                          >
                                            ₹ {val}
                                          </div>
                                        ));
                                      })}
                                      {Object.values(cashierChangeTray).every(v => v === 0) && (
                                        <span className="text-[10px] text-slate-500 font-semibold italic">Tray is empty. Add notes or coins above.</span>
                                      )}
                                    </div>

                                    <div className="flex justify-between items-center border-t border-slate-800 pt-2 mt-2">
                                      <div className="text-xs font-bold">
                                        Total Tray: <span className="font-mono text-yellow-400 font-black">₹ {
                                          Object.keys(cashierChangeTray).reduce((sum, val) => sum + parseInt(val, 10) * cashierChangeTray[val], 0)
                                        }</span>
                                      </div>
                                      <button
                                        onClick={checkCashierChange}
                                        className="px-5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                                      >
                                        Hand Over Change
                                      </button>
                                    </div>
                                  </div>

                                  <AnimatePresence mode="wait">
                                    {cashierFeedback && (
                                      <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className={`p-3 rounded-xl text-xs font-medium border ${cashierFeedback.type === 'success'
                                          ? 'bg-green-50 border-green-200 text-green-800'
                                          : 'bg-rose-50 border-rose-200 text-rose-800'
                                          }`}
                                      >
                                        {cashierFeedback.text}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedLab === 'firstaid' && (
                          <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-6 md:p-8">
                            <div className="max-w-[800px] mx-auto text-left space-y-6">
                              <div className="flex justify-between items-start">
                                <div>
                                  <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider bg-emerald-50 px-3 py-1.5 rounded-full">
                                    Practical Lab 04
                                  </span>
                                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">Emergency First Aid Clinic</h2>
                                  <p className="text-sm text-slate-500 font-bold mt-1">Diagnose patient injuries and execute medical procedures in correct sequence.</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="bg-rose-50 px-4 py-2 rounded-2xl border border-rose-100 text-center shrink-0">
                                    <span className="text-[9px] font-bold text-rose-600 uppercase tracking-widest block">Score</span>
                                    <span className="text-lg font-black text-rose-700">{firstAidScore} pts</span>
                                  </div>
                                  <button
                                    onClick={resetFirstAidGame}
                                    className="p-2 bg-white hover:bg-slate-50 rounded-xl text-slate-500 border border-slate-200 transition-colors cursor-pointer self-stretch flex items-center justify-center"
                                    title="Reset First Aid Game"
                                  >
                                    <RefreshCw size={14} />
                                  </button>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                                {/* PATIENT WORKSPACE */}
                                <div className="md:col-span-5 bg-slate-50 border border-slate-100 rounded-[24px] p-5 flex flex-col justify-between min-h-[320px]">
                                  <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                      <span className="text-[9px] font-black uppercase bg-rose-50 text-rose-700 px-2.5 py-1 rounded-md border border-rose-100">
                                        Wound Station
                                      </span>
                                      <button
                                        onClick={nextFirstAidScenario}
                                        className="text-[10px] font-bold text-slate-500 hover:text-slate-700 cursor-pointer"
                                      >
                                        Skip Patient ➔
                                      </button>
                                    </div>

                                    <div className="space-y-2 text-center py-3">
                                      <div className="text-4xl">
                                        {firstAidScenarios[currentScenarioIdx].icon}
                                      </div>
                                      <h4 className="font-black text-base text-slate-800">
                                        {firstAidScenarios[currentScenarioIdx].title}
                                      </h4>
                                      <p className="text-xs text-slate-500 leading-relaxed font-semibold px-2">
                                        "{firstAidScenarios[currentScenarioIdx].description}"
                                      </p>
                                    </div>

                                    <div className="bg-white border border-slate-200/60 rounded-xl p-3 space-y-2">
                                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Clinic Treatment Steps:</span>
                                      {firstAidScenarios[currentScenarioIdx].correctOrder.map((step, idx) => {
                                        const isDone = firstAidSequence.length > idx;
                                        const isCurrent = firstAidSequence.length === idx;
                                        return (
                                          <div
                                            key={step}
                                            className={`flex items-center gap-2.5 p-1.5 rounded-lg border text-[11px] font-bold ${isDone ? 'bg-green-50 border-green-200 text-green-700'
                                              : isCurrent ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                                                : 'bg-slate-50/50 border-slate-100 text-slate-400'
                                              }`}
                                          >
                                            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black ${isDone ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-500'
                                              }`}>
                                              {idx + 1}
                                            </span>
                                            <span className="capitalize">{step.replace('-', ' ')}</span>
                                            {isDone && <span className="ml-auto text-[10px]">✓ Done</span>}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>

                                  <div className="pt-4">
                                    <button
                                      onClick={resetFirstAidLab}
                                      className="w-full py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 tracking-wider uppercase transition-all cursor-pointer"
                                    >
                                      Reset Clinic
                                    </button>
                                  </div>
                                </div>

                                {/* TOOL CABINET */}
                                <div className="md:col-span-7 space-y-4">
                                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">Clinic Tool Cabinet</h4>
                                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {[
                                      { id: 'wash', name: 'Sterile Water', desc: 'Wash off loose dirt', icon: '💧' },
                                      { id: 'antiseptic', name: 'Antiseptic Gel', desc: 'Prevent germs', icon: '🧴' },
                                      { id: 'bandage', name: 'Adhesive Bandage', desc: 'Seal scrap/minor cuts', icon: '🩹' },
                                      { id: 'water-cool', name: 'Cool Running Water', desc: 'Stop burn tissue damage', icon: '🚰' },
                                      { id: 'aloe-vera', name: 'Aloe Vera Extract', desc: 'Soothe burn skin', icon: '🌱' },
                                      { id: 'loose-bandage', name: 'Loose Gauze Roll', desc: 'Shield burn from air/dust', icon: '🧣' },
                                      { id: 'tweezer', name: 'Sterile Tweezers', desc: 'Scrape stings gently', icon: '✂️' },
                                      { id: 'ice-pack', name: 'Cold Ice Pack', desc: 'Reduce sting swelling', icon: '❄️' },
                                      { id: 'antihistamine', name: 'Antihistamine Cream', desc: 'Block allergic itch', icon: '🧪' }
                                    ].map(tool => {
                                      const isUsed = firstAidSequence.includes(tool.id);
                                      return (
                                        <button
                                          key={tool.id}
                                          onClick={() => selectFirstAidTool(tool.id)}
                                          disabled={firstAidFinished}
                                          className={`p-3 border rounded-2xl text-center space-y-1.5 transition-all shadow-sm flex flex-col items-center group cursor-pointer ${isUsed
                                            ? 'bg-slate-50 border-slate-200 opacity-60'
                                            : 'bg-white border-slate-100 hover:border-emerald-300 hover:shadow-md'
                                            }`}
                                        >
                                          <span className="text-3xl group-hover:scale-110 transition-transform">{tool.icon}</span>
                                          <div className="space-y-0.5">
                                            <div className="text-[10px] font-black text-slate-800 leading-none">{tool.name}</div>
                                            <div className="text-[8px] text-slate-400 font-bold leading-tight">{tool.desc}</div>
                                          </div>
                                        </button>
                                      );
                                    })}
                                  </div>

                                  <AnimatePresence mode="wait">
                                    {firstAidFeedback && (
                                      <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className={`p-3 rounded-xl text-xs font-semibold leading-relaxed border ${firstAidFeedback.type === 'success'
                                          ? 'bg-green-100 border-green-200 text-green-800'
                                          : firstAidFeedback.type === 'error'
                                            ? 'bg-rose-100 border-rose-200 text-rose-800'
                                            : 'bg-sky-50 border-sky-200 text-sky-850 text-sky-800'
                                          }`}
                                      >
                                        {firstAidFeedback.text}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                )}
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
