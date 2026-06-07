import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, Play, BookOpen, Shield, Trophy, 
  HelpCircle, CreditCard, Key, DollarSign, CheckCircle2, AlertCircle, 
  Car, Eye, Sparkles, RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ─── QUIZ DATA ───────────────────────────────────────────────────
const quizQuestions = [
  {
    question: "What should you do before stepping on a road to cross it?",
    options: ["Run across as fast as possible", "Look Left, then Right, then Left again", "Check your phone to see if it's safe", "Close your eyes and walk slowly"],
    correct: 1,
  },
  {
    question: "If the traffic light is GREEN for vehicles, should you walk across the street?",
    options: ["Yes, walk immediately", "No, vehicles are moving; wait until the pedestrian light is green or cars stop", "Only if you can run faster than the cars", "Yes, green means walk for everyone"],
    correct: 1,
  },
  {
    question: "What is the safest way to enter your secret PIN at an ATM?",
    options: ["Tell the security guard to enter it for you", "Cover the keypad with your hand while typing", "Read it out loud so you don't forget", "Write it on the back of your card"],
    correct: 1,
  },
  {
    question: "You buy a notebook for ₹35 and give the shopkeeper a ₹50 note. How much change should you get back?",
    options: ["₹10", "₹15", "₹20", "₹25"],
    correct: 1,
  },
  {
    question: "Where should you walk if a road has no footpath or sidewalk?",
    options: ["In the middle of the road", "Facing the oncoming traffic (on the side closest to cars heading towards you)", "With your back to traffic", "On the divider line in the middle"],
    correct: 1,
  }
];

const optionLabels = ['A', 'B', 'C', 'D'];

// ─── LESSON WIDGET 1: ROAD SAFETY GAME ────────────────────────────────
function RoadSafetyGame() {
  const [selectedSignal, setSelectedSignal] = useState('red');
  const [checklist, setChecklist] = useState([
    { id: 1, text: "Walking on the road while texting on a phone", type: "danger", status: null },
    { id: 2, text: "Crossing the road exactly on white Zebra crossing stripes", type: "safe", status: null },
    { id: 3, text: "Running suddenly onto the street from behind parked cars", type: "danger", status: null },
    { id: 4, text: "Using a pedestrian overpass bridge when crossing highway", type: "safe", status: null }
  ]);

  const handleCheck = (item, answer) => {
    setChecklist(prev => prev.map(i => {
      if (i.id === item.id) {
        return { ...i, status: i.type === answer ? 'correct' : 'incorrect' };
      }
      return i;
    }));
  };

  const signalText = {
    red: {
      color: "text-rose-600",
      bg: "bg-rose-50",
      border: "border-rose-100",
      desc: "🔴 RED light means STOP immediately! Vehicles must stand still behind the crossing line, allowing pedestrians to walk across the street safely."
    },
    yellow: {
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
      desc: "🟡 YELLOW light means GET READY. Vehicles are preparing to stop or start. Pedestrians must NOT cross yet—wait for a safe signal!"
    },
    green: {
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      desc: "🟢 GREEN light means GO for vehicles. Cars are moving fast! Keep standing safely on the footpath or sidewalk."
    }
  };

  return (
    <div className="space-y-5">
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
        <h4 className="text-sm font-black text-slate-500 uppercase tracking-wider mb-3">Traffic Light Interactive Controller</h4>
        <div className="flex flex-col md:flex-row gap-5 items-center">
          {/* Signal Pole drawing in CSS */}
          <div className="w-14 bg-slate-900 border border-slate-800 rounded-3xl p-2 flex flex-col gap-2.5 shadow-md shrink-0">
            {['red', 'yellow', 'green'].map(light => (
              <button
                key={light}
                onClick={() => setSelectedSignal(light)}
                className={`w-9 h-9 rounded-full transition-all duration-300 relative group cursor-pointer ${
                  selectedSignal === light
                    ? light === 'red' ? 'bg-red-500 shadow-md shadow-red-500/50 scale-105'
                      : light === 'yellow' ? 'bg-yellow-500 shadow-md shadow-yellow-500/50 scale-105'
                      : 'bg-green-500 shadow-md shadow-green-500/50 scale-105'
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
              >
                <span className="absolute inset-0 rounded-full border border-white/10" />
              </button>
            ))}
          </div>

          <div className={`flex-1 p-4 rounded-xl border transition-all ${signalText[selectedSignal].bg} ${signalText[selectedSignal].border}`}>
            <h5 className={`font-black text-sm mb-1.5 uppercase tracking-wide ${signalText[selectedSignal].color}`}>
              {selectedSignal.toUpperCase()} LIGHT RULE
            </h5>
            <p className="text-slate-700 text-sm leading-relaxed font-semibold">
              {signalText[selectedSignal].desc}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-5">
        <h4 className="text-sm font-black text-slate-500 uppercase tracking-wider mb-2">Road Safety Decision Game</h4>
        <p className="text-slate-500 text-xs font-bold mb-3">Determine if these pedestrian habits are SAFE or DANGEROUS:</p>
        <div className="space-y-2">
          {checklist.map(item => (
            <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 p-2.5 bg-slate-50/50 rounded-xl border border-slate-100">
              <span className="text-sm font-bold text-slate-700 leading-snug">{item.text}</span>
              <div className="flex gap-2 shrink-0">
                {item.status === null ? (
                  <>
                    <button
                      onClick={() => handleCheck(item, 'safe')}
                      className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-lg text-xs border border-emerald-200 transition-colors cursor-pointer"
                    >
                      Safe
                    </button>
                    <button
                      onClick={() => handleCheck(item, 'danger')}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-lg text-xs border border-rose-200 transition-colors cursor-pointer"
                    >
                      Dangerous
                    </button>
                  </>
                ) : (
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase ${
                    item.status === 'correct' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {item.status === 'correct' ? '🎉 Correct' : '❌ Incorrect'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function AtmBankingGame() {
  const [activeStep, setActiveStep] = useState(0);
  const [scanned, setScanned] = useState(false);
  const [shielded, setShielded] = useState(false);
  const [distanced, setDistanced] = useState(false);
  const [secured, setSecured] = useState(false);

  const steps = [
    {
      title: "1. Slot Check",
      icon: "🔒",
      label: "Card Slot"
    },
    {
      title: "2. PIN Shield",
      icon: "🛡️",
      label: "Keypad"
    },
    {
      title: "3. Proximity",
      icon: "👥",
      label: "Surroundings"
    },
    {
      title: "4. Cash Lock",
      icon: "💰",
      label: "Dispenser"
    }
  ];

  const resetGame = () => {
    setActiveStep(0);
    setScanned(false);
    setShielded(false);
    setDistanced(false);
    setSecured(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">ATM Safety Checkpoint Challenge</h4>
          <button 
            onClick={resetGame}
            className="p-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-500 transition-colors text-[10px] font-bold cursor-pointer"
          >
            Reset Scanner
          </button>
        </div>

        {/* Step Tabs Indicator */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {steps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                activeStep === idx 
                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-md' 
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="text-lg">{step.icon}</span>
              <span className="text-[10px] font-black leading-none">{step.title}</span>
            </button>
          ))}
        </div>

        {/* Active Step Panel */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 min-h-[220px] flex flex-col justify-between shadow-sm">
          
          {/* Step 1: Slot Scan */}
          {activeStep === 0 && (
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h5 className="font-black text-base text-slate-800 flex items-center gap-1.5">
                  🔍 Check Card Slot for Skimmers
                </h5>
                <p className="text-slate-500 text-sm font-semibold leading-relaxed">
                  Fraudsters sometimes attach fake plastic covers (skimmers) over the card reader slot to copy your chip details.
                </p>
              </div>

              <div className="flex flex-col items-center py-4 bg-slate-50 rounded-xl relative overflow-hidden">
                {/* Visual card reader representation */}
                <div className="w-16 h-8 bg-slate-800 border-t-2 border-slate-700 rounded-md relative flex items-center justify-center">
                  <div className="w-12 h-1 bg-slate-955 rounded animate-pulse" />
                  {scanned && (
                    <motion.div 
                      initial={{ top: 0 }}
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 1.5, repeat: 2 }}
                      className="absolute inset-x-0 h-0.5 bg-emerald-400" 
                    />
                  )}
                </div>

                <button
                  onClick={() => setScanned(true)}
                  className={`mt-4 px-4 py-2 rounded-lg text-xs font-black uppercase transition-all cursor-pointer ${
                    scanned 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                  }`}
                >
                  {scanned ? "✅ Scanner Safe (Tight Fit)" : "Scan Reader Wiggle"}
                </button>
              </div>

              {scanned && (
                <div className="text-sm text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100 font-bold leading-normal">
                  💡 **Rule:** Gently wiggle the card slot reader with your fingers. If it feels loose or pops off, do not use the ATM and report it to the bank!
                </div>
              )}
            </div>
          )}

          {/* Step 2: PIN Shield */}
          {activeStep === 1 && (
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h5 className="font-black text-base text-slate-800 flex items-center gap-1.5">
                  🖐️ Shield the Keypad While Typing
                </h5>
                <p className="text-slate-500 text-sm font-semibold leading-relaxed">
                  Criminals can place tiny hidden pinhole cameras above the keypad to record your hand movements as you enter your secret code.
                </p>
              </div>

              <div className="flex flex-col items-center py-4 bg-slate-50 rounded-xl relative">
                {/* Numeric keypad display */}
                <div className="w-24 bg-slate-200 p-2 border border-slate-300 rounded-lg grid grid-cols-3 gap-1 shadow-sm">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                    <div key={n} className="bg-slate-300 text-[6px] font-black text-slate-600 rounded flex items-center justify-center p-1 font-mono">
                      {n}
                    </div>
                  ))}
                </div>

                {shielded && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-slate-950/80 rounded-xl flex items-center justify-center"
                  >
                    <span className="text-white text-xs font-black flex items-center gap-1">
                      🛡️ PIN COVERED SECURELY
                    </span>
                  </motion.div>
                )}

                <button
                  onClick={() => setShielded(true)}
                  className={`mt-4 px-4 py-2 rounded-lg text-xs font-black uppercase transition-all cursor-pointer ${
                    shielded 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                  }`}
                >
                  {shielded ? "✅ Hand Shield Active" : "Cover Keypad with Hand"}
                </button>
              </div>

              {shielded && (
                <div className="text-sm text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100 font-bold leading-normal">
                  💡 **Rule:** Always cover the keypad with your free hand, wallet, or book while typing your code, even if you think you are alone.
                </div>
              )}
            </div>
          )}

          {/* Step 3: Proximity Alert */}
          {activeStep === 2 && (
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h5 className="font-black text-base text-slate-800 flex items-center gap-1.5">
                  👤 Maintain Bystander Proximity Distance
                </h5>
                <p className="text-slate-500 text-sm font-semibold leading-relaxed">
                  Never allow strangers to stand directly next to you or look over your shoulder when you operate the ATM.
                </p>
              </div>

              <div className="flex flex-col items-center py-4 bg-slate-50 rounded-xl relative">
                {/* Proximity visual */}
                <div className="flex items-center gap-16 py-2 relative">
                  <div className="text-3xl" title="You">🚶‍♂️ <span className="text-[8px] font-black block text-center text-slate-500">YOU</span></div>
                  <motion.div 
                    animate={{ x: distanced ? 40 : 0 }}
                    transition={{ duration: 1 }}
                    className="text-3xl filter grayscale" 
                    title="Bystander"
                  >
                    👤 <span className="text-[8px] font-black block text-center text-slate-450">STRANGER</span>
                  </motion.div>
                  
                  {/* Warning line */}
                  {!distanced && (
                    <div className="absolute left-[38%] right-[38%] top-1/2 h-0.5 border-t border-dashed border-red-500 animate-pulse" />
                  )}
                </div>

                <button
                  onClick={() => setDistanced(true)}
                  className={`mt-4 px-4 py-2 rounded-lg text-xs font-black uppercase transition-all cursor-pointer ${
                    distanced 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                  }`}
                >
                  {distanced ? "✅ Safe Space Secured" : "Ask Bystander to Step Back"}
                </button>
              </div>

              {distanced && (
                <div className="text-sm text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100 font-bold leading-normal">
                  💡 **Rule:** If someone stands too close, politely ask them to step outside the kiosk. If they refuse, cancel your transaction and leave.
                </div>
              )}
            </div>
          )}

          {/* Step 4: Cash Lock */}
          {activeStep === 3 && (
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h5 className="font-black text-base text-slate-800 flex items-center gap-1.5">
                  💰 Retrieve Cash & Reset Session
                </h5>
                <p className="text-slate-500 text-sm font-semibold leading-relaxed">
                  Never count money openly in public or leave the slot before the ATM screen resets.
                </p>
              </div>

              <div className="flex flex-col items-center py-4 bg-slate-50 rounded-xl relative">
                {/* Cash Slot visual */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-16 h-1.5 bg-slate-950 rounded" />
                  {!secured ? (
                    <motion.div 
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-2xl cursor-pointer"
                      onClick={() => setSecured(true)}
                    >
                      💵
                    </motion.div>
                  ) : (
                    <span className="text-xs font-black text-emerald-600 py-2">💼 CASH SECURED IN WALLET</span>
                  )}
                </div>

                <button
                  onClick={() => setSecured(true)}
                  className={`mt-4 px-4 py-2 rounded-lg text-xs font-black uppercase transition-all cursor-pointer ${
                    secured 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                  }`}
                >
                  {secured ? "✅ Money Secured" : "Take Money & Store In Wallet"}
                </button>
              </div>

              {secured && (
                <div className="text-sm text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100 font-bold leading-normal">
                  💡 **Rule:** Store cash in your wallet quickly before exiting. Press CANCEL and check that the ATM screen resets to the Welcome prompt.
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// ─── LESSON WIDGET 3: MONEY HANDLING GAME ────────────────────────────
function MoneyHandlingGame() {
  const [level, setLevel] = useState(0);
  const [shopItem, setShopItem] = useState(null);
  const [cashPaid, setCashPaid] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedAns, setSelectedAns] = useState(null);
  const [correctAns, setCorrectAns] = useState(null);

  const inventory = [
    { name: "Curriculum Notebook", price: 35 },
    { name: "Pencil Sketch Box", price: 45 },
    { name: "BSTBPC Hindi TextBook", price: 65 },
    { name: "Mathematics Geometry Box", price: 110 },
    { name: "School Backpack Bag", price: 230 }
  ];

  const paidBills = [50, 100, 200, 500];

  const generateScenario = () => {
    const item = inventory[Math.floor(Math.random() * inventory.length)];
    const validBills = paidBills.filter(bill => bill > item.price);
    const bill = validBills[Math.floor(Math.random() * validBills.length)];
    
    const correctChange = bill - item.price;
    
    const wrong1 = correctChange + 10;
    const wrong2 = Math.max(5, correctChange - 10);
    const wrong3 = correctChange + 5;
    
    const allOptions = Array.from(new Set([correctChange, wrong1, wrong2, wrong3]))
      .sort(() => Math.random() - 0.5);

    setShopItem(item);
    setCashPaid(bill);
    setCorrectAns(correctChange);
    setOptions(allOptions);
    setSelectedAns(null);
  };

  useEffect(() => {
    generateScenario();
  }, []);

  const handleSelect = (opt) => {
    setSelectedAns(opt);
    if (opt === correctAns) {
      setLevel(prev => prev + 1);
    }
  };

  if (!shopItem) return null;

  return (
    <div className="space-y-4">
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-black text-emerald-800 uppercase tracking-wider">Shopping Math Scoreboard</h4>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">Solve purchase calculations to gain levels!</p>
        </div>
        <div className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-sm font-black">
          🌟 LEVEL: {level}
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-4">
        <div className="text-center space-y-1.5">
          <span className="text-xs font-black tracking-wider uppercase bg-slate-100 text-slate-500 px-2.5 py-0.5 rounded-full">
             Bihar Textbook Mart
          </span>
          <h3 className="text-sm font-black text-slate-800 leading-relaxed">
            "You buy <span className="text-emerald-600 font-black">{shopItem.name}</span> for <span className="font-bold">₹{shopItem.price}</span>. <br />
            You pay with a <span className="text-slate-800 font-black">₹{cashPaid} note</span>."
          </h3>
          <p className="text-slate-400 text-xs font-semibold">How much change should the shopkeeper return to you?</p>
        </div>

        {/* Math Visual Formula */}
        <div className="flex items-center justify-center gap-2 py-1.5 bg-slate-50 rounded-lg border border-slate-100 font-mono text-xs font-bold text-slate-500">
          <span>Paid: ₹{cashPaid}</span>
          <span>-</span>
          <span>Price: ₹{shopItem.price}</span>
          <span>=</span>
          <span>Change: ?</span>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-2">
          {options.map((opt, idx) => {
            let buttonStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';
            if (selectedAns !== null) {
              if (opt === correctAns) buttonStyle = 'bg-green-100 border-green-300 text-green-800 font-black shadow-sm';
              else if (opt === selectedAns) buttonStyle = 'bg-red-100 border-red-300 text-red-800 font-black shadow-sm';
              else buttonStyle = 'opacity-40 bg-slate-50 border-slate-200 text-slate-400';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(opt)}
                disabled={selectedAns !== null}
                className={`py-2 rounded-xl border text-sm font-black transition-all text-center ${buttonStyle}`}
              >
                ₹{opt}
              </button>
            );
          })}
        </div>

        {/* Answer Explanation */}
        {selectedAns !== null && (
          <div className="animate-fadeIn space-y-3">
            {selectedAns === correctAns ? (
              <div className="bg-green-100 border border-green-200 text-green-800 p-3 rounded-xl text-sm font-semibold text-center">
                🎉 Correct! ₹{cashPaid} - ₹{shopItem.price} = ₹{correctAns}. Spot on calculation!
              </div>
            ) : (
              <div className="bg-red-100 border border-red-200 text-red-800 p-3 rounded-xl text-sm font-semibold text-center">
                ❌ Incorrect! ₹{cashPaid} - ₹{shopItem.price} = ₹{correctAns}. The correct change is ₹{correctAns}.
              </div>
            )}

            <button
              onClick={generateScenario}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-black uppercase transition-all shadow"
            >
              Next Customer Case ➔
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Dynamic Visualized Summary Renderer
function LessonSummaryVisualizer({ lessonId }) {
  if (lessonId === 'road-safety') {
    return (
      <div className="space-y-5 text-left">
        <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
          📖 Road Safety Guidelines
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-50/70 border border-red-100 rounded-2xl p-4 flex gap-3 items-start shadow-sm">
            <span className="text-3xl mt-0.5">🚦</span>
            <div>
              <h5 className="text-sm font-black text-slate-800">Traffic Signal Colors</h5>
              <p className="text-xs text-slate-600 font-bold mt-1.5 leading-relaxed">
                <span className="text-red-500 font-extrabold">🔴 Red</span> means Stop immediately.<br />
                <span className="text-amber-500 font-extrabold">🟡 Yellow</span> means Get Ready.<br />
                <span className="text-green-500 font-extrabold">🟢 Green</span> means Go safely.
              </p>
            </div>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-4 flex gap-3 items-start shadow-sm">
            <span className="text-2xl mt-0.5">🦓</span>
            <div>
              <h5 className="text-sm font-black text-slate-800">Zebra Crossings</h5>
              <p className="text-xs text-slate-600 font-bold mt-1.5 leading-relaxed">
                Only cross streets at Zebra Crossings (white stripes painted on roads) or designated pedestrian footbridges.
              </p>
            </div>
          </div>

          <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 flex gap-3 items-start shadow-sm">
            <span className="text-2xl mt-0.5">👀</span>
            <div>
              <h5 className="text-sm font-black text-slate-800">Look Both Ways</h5>
              <p className="text-xs text-slate-600 font-bold mt-1.5 leading-relaxed">
                Look <strong>Left</strong>, then <strong>Right</strong>, then <strong>Left</strong> again before stepping off the curb.
              </p>
            </div>
          </div>

          <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-4 flex gap-3 items-start shadow-sm">
            <span className="text-2xl mt-0.5">🚶‍♂️</span>
            <div>
              <h5 className="text-sm font-black text-slate-800">Walk Facing Traffic</h5>
              <p className="text-xs text-slate-600 font-bold mt-1.5 leading-relaxed">
                If there is no footpath, walk facing oncoming vehicles so you can see oncoming cars clearly.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (lessonId === 'atm-banking') {
    return (
      <div className="space-y-5 text-left">
        <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
          🛡️ ATM Security Protocols
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-4 flex gap-3 items-start shadow-sm">
            <span className="text-2xl mt-0.5">💳</span>
            <div>
              <h5 className="text-sm font-black text-slate-800">Card Handling</h5>
              <p className="text-xs text-slate-600 font-bold mt-1.5 leading-relaxed">
                Insert card gently. Remove it only when prompted by the ATM screen to avoid card capture.
              </p>
            </div>
          </div>

          <div className="bg-red-50/70 border border-red-100 rounded-2xl p-4 flex gap-3 items-start shadow-sm">
            <span className="text-2xl mt-0.5">🔑</span>
            <div>
              <h5 className="text-sm font-black text-slate-800">Keep PIN Secret</h5>
              <p className="text-xs text-slate-600 font-bold mt-1.5 leading-relaxed">
                Cover the keypad with your hand while typing. Never share it with anyone, not even bank employees.
              </p>
            </div>
          </div>

          <div className="bg-amber-50/70 border border-amber-100 rounded-2xl p-4 flex gap-3 items-start shadow-sm">
            <span className="text-2xl mt-0.5">⚠️</span>
            <div>
              <h5 className="text-sm font-black text-slate-800">Stay Alert</h5>
              <p className="text-xs text-slate-600 font-bold mt-1.5 leading-relaxed">
                Ensure bystanders maintain distance. If anyone gets too close, politely ask them to step back.
              </p>
            </div>
          </div>

          <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 flex gap-3 items-start shadow-sm">
            <span className="text-2xl mt-0.5">💰</span>
            <div>
              <h5 className="text-sm font-black text-slate-800">Collect Cash & Reset</h5>
              <p className="text-xs text-slate-600 font-bold mt-1.5 leading-relaxed">
                Secure your cash immediately. Wait until screen resets to the Welcome/Home screen before leaving.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (lessonId === 'money-handling') {
    return (
      <div className="space-y-5 text-left">
        <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
          💸 Cash & Money Handling Rules
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-4 flex gap-3 items-start shadow-sm">
            <span className="text-2xl mt-0.5">💵</span>
            <div>
              <h5 className="text-sm font-black text-slate-800">Identify Denominations</h5>
              <p className="text-xs text-slate-600 font-bold mt-1.5 leading-relaxed">
                Practice recognizing Rupees (₹10, ₹20, ₹50, ₹100, ₹200, ₹500) by checking sizes, colors, and numbers.
              </p>
            </div>
          </div>

          <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 flex gap-3 items-start shadow-sm">
            <span className="text-2xl mt-0.5">➕</span>
            <div>
              <h5 className="text-sm font-black text-slate-800">Calculate Change</h5>
              <p className="text-xs text-slate-600 font-bold mt-1.5 leading-relaxed">
                Use the formula: <span className="font-extrabold text-[#1e293b]">Change Due = Cash Given - Price</span>.<br />
                E.g. Giving ₹50 for a ₹35 item gets back ₹15.
              </p>
            </div>
          </div>

          <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-4 flex gap-3 items-start shadow-sm">
            <span className="text-2xl mt-0.5">🔍</span>
            <div>
              <h5 className="text-sm font-black text-slate-800">Double Check</h5>
              <p className="text-xs text-slate-600 font-bold mt-1.5 leading-relaxed">
                Always count the cash notes and coins handed back by the vendor before walking away.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default function SkillLearn() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('lessons'); // 'lessons', 'labs', 'quiz'
  const [selectedLesson, setSelectedLesson] = useState(null);

  // --- ATM Simulator State ---
  const [atmStep, setAtmStep] = useState('insert'); // 'insert', 'language', 'option', 'accountType', 'amountInput', 'pin', 'processing', 'dispensing', 'success'
  const [pinInput, setPinInput] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedAccountType, setSelectedAccountType] = useState('');
  const [atmError, setAtmError] = useState('');

  // --- Traffic Lab State ---
  const [trafficLight, setTrafficLight] = useState('green'); // 'red', 'yellow', 'green'
  const [isCrossing, setIsCrossing] = useState(false);
  const [crossingResult, setCrossingResult] = useState(''); // '', 'scared', 'safe'

  // --- Quiz State ---
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Prevent background scrolling when a lesson modal is open
  useEffect(() => {
    if (selectedLesson) {
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
  }, [selectedLesson]);

  // Lessons Data
  const lessons = [
    {
      id: 'road-safety',
      title: "Road Safety & Signals",
      desc: "Learn traffic lights, zebra crossing rules, and pedestrian safety.",
      image: "/images/skills/a1.png",
      level: "Beginner",
      duration: "5 mins",
      fullContent: `Staying safe on the road is one of the most important daily skills. Always follow these rules:

• **The Traffic Light Colors:**
  🔴 **Red** means Stop.
  🟡 **Yellow** means Get Ready.
  🟢 **Green** means Go.

• **Cross Safely:** Only cross the street at Zebra Crossings (white stripes painted on the road) or pedestrian subways/bridges.
• **Look Both Ways:** Before stepping off the curb, look **Left**, then **Right**, then **Left** again. Cross only when cars have fully stopped.
• **Walk Facing Traffic:** If there is no footpath, always walk on the side of the road facing oncoming vehicles, so you can see cars coming toward you.`
    },
    {
      id: 'atm-banking',
      title: "ATM Security & Transactions",
      desc: "A step-by-step guide to using ATMs safely without sharing credentials.",
      image: "/images/skills/i1.png",
      level: "Intermediate",
      duration: "8 mins",
      fullContent: `Using an Automated Teller Machine (ATM) allows you to withdraw cash safely, but security is vital:

• **Secure Card Handling:** Insert your card gently into the card reader. Remove it once prompted.
• **Keep PIN Secret:** Your Personal Identification Number (PIN) is a secret 4-digit code. Always cover the keypad with your hand while typing. Never share it with anyone—not even bank staff!
• **Beware of Strangers:** Do not let anyone stand too close or look over your shoulder while you make a transaction.
• **Retrieve Your Cash & Receipt:** Count your cash quickly, store it safely in your wallet, retrieve your debit card, and make sure the screen returns to the 'Welcome' home state before walking away.`
    },
    {
      id: 'money-handling',
      title: "Basic Money & Change Rules",
      desc: "Master currency notes and calculating correct change during shopping.",
      image: "/images/skills/image.png",
      level: "Beginner",
      duration: "6 mins",
      fullContent: `Handling cash confidently helps you shop independently.

• **Identify Denominations:** Practice recognizing Indian Rupee bank notes (₹10, ₹20, ₹50, ₹100, ₹200, ₹500) by color, size, and the prominent numbers printed on them.
• **Calculate Change:** When buying items, always check the price. 
  *Change Due = Money Given - Price of Item.*
  For example, if you buy a chocolate for ₹35 and hand over ₹50, the shopkeeper owes you ₹15 (50 - 35 = 15).
• **Double-check:** Count the change given back to you before leaving the counter.`
    }
  ];

  // ─── ATM SIMULATOR FUNCTIONS ───────────────────────────────────────
  const handlePinClick = (num) => {
    if (atmStep === 'pin') {
      if (pinInput.length < 4) {
        setPinInput(prev => prev + num);
        setAtmError('');
      }
    } else if (atmStep === 'amountInput') {
      setSelectedAmount(prev => {
        const val = prev + num;
        if (parseInt(val, 10) > 20000) return prev; // Limit to ₹20,000
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

  // ─── TRAFFIC SAFETY FUNCTIONS ──────────────────────────────────────
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

  // ─── QUIZ FUNCTIONS ────────────────────────────────────────────────
  const handleQuizSelect = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    const isCorrect = idx === quizQuestions[currentQ].correct;
    if (isCorrect) {
      setScore(prev => prev + 100);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleQuizNext = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQ(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setQuizFinished(false);
  };

  const getQuizOptionStyle = (idx) => {
    if (!isAnswered) return selectedOption === idx
      ? 'bg-emerald-50 border-emerald-500 text-slate-800'
      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300';
    if (idx === quizQuestions[currentQ].correct) return 'bg-green-50 border-green-500 text-green-800';
    if (idx === selectedOption) return 'bg-red-50 border-red-400 text-red-800';
    return 'bg-slate-50/50 border-slate-150 text-slate-400';
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans text-slate-900 overflow-x-hidden relative">
      
      {/* Floating Back Button */}
      <button
        onClick={() => navigate("/life-skills")}
        className="fixed top-5 left-5 z-50 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:shadow-lg transition-all border border-slate-100 group"
      >
        <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>

      {/* Hero Banner Section */}
      <div className="px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto pt-6 pb-2">
         <section className="bg-gradient-to-br from-white via-slate-50 to-emerald-50/20 rounded-[32px] overflow-hidden border border-slate-100 flex flex-col md:flex-row items-center justify-between p-8 md:p-10 lg:px-16 min-h-[280px] gap-6">
          <div className="w-full md:w-3/5 space-y-4 text-left">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-700">
              Interactive Hub
            </span>
            <h1 className="text-3xl md:text-5xl font-black leading-tight text-slate-800 tracking-tight">
              Basic Skills <br />
              <span className="text-emerald-600">Learning Center</span>
            </h1>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-md font-medium">
              Understand traffic rules, banking, and practical day-to-day skills through interactive guides and fun simulators.
            </p>
          </div>

          <div className="w-full md:w-2/5 flex justify-center md:justify-end items-center h-[200px] md:h-[240px]">
            <img 
              src="/images/skills/a.png" 
              alt="Basic skills learning" 
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </section>

        {/* Tab Filters */}
        <section className="flex justify-center border-b border-slate-100 mt-8 mb-6">
          <div className="flex gap-8">
            {[
              { id: 'lessons', label: 'Interactive Lessons', icon: <BookOpen size={18} /> },
              { id: 'labs', label: 'Practical Labs', icon: <Sparkles size={18} /> },
              { id: 'quiz', label: 'Skills Quiz', icon: <Trophy size={18} /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-4 font-bold text-sm transition-all border-b-2 px-1 relative ${
                  activeTab === tab.id 
                    ? 'border-emerald-600 text-emerald-600' 
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTabUnderline" 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" 
                  />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* ─── TAB CONTENT ───────────────────────────────────────────── */}
        <div className="min-h-[500px] pb-12">
          <AnimatePresence mode="wait">
            
            {/* 1. LESSONS TAB */}
            {activeTab === 'lessons' && (
              <motion.div
                key="lessons"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {lessons.map(lesson => (
                  <div
                    key={lesson.id}
                    onClick={() => setSelectedLesson(lesson)}
                    className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col group"
                  >
                    <div className="aspect-[16/10] bg-slate-50 overflow-hidden relative border-b border-slate-50">
                      <img 
                        src={lesson.image} 
                        alt={lesson.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[10px] font-bold">
                        {lesson.duration}
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                          {lesson.level}
                        </span>
                        <h3 className="text-lg font-black text-slate-800 group-hover:text-emerald-600 transition-colors">
                          {lesson.title}
                        </h3>
                        <p className="text-slate-500 text-xs leading-relaxed font-medium line-clamp-2">
                          {lesson.desc}
                        </p>
                      </div>
                      
                      <div className="pt-4 flex items-center gap-2 text-emerald-600 font-bold text-xs group/btn">
                        <span>Launch Lab</span>
                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* 2. LABS TAB */}
            {activeTab === 'labs' && (
              <motion.div
                key="labs"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                
                {/* ATM SIMULATOR WIDGET */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="bg-slate-900 rounded-[32px] p-6 text-white border border-slate-800 shadow-2xl relative">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Indian State Bank ATM Simulator
                        </span>
                      </div>
                      <button 
                        onClick={resetAtm}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                        title="Reset ATM"
                      >
                        <RefreshCw size={14} />
                      </button>
                    </div>

                    {/* ATM SCREEN GRID WITH SIDE BUTTONS */}
                    <div className="flex items-center gap-2 bg-[#121620] p-3 rounded-2xl border border-slate-800">
                      
                      {/* LEFT SIDE PHYSICAL BUTTONS */}
                      <div className="flex flex-col gap-9 justify-center py-4">
                        <button 
                          onClick={() => {
                            if (atmStep === 'option') {
                              alert("Simulation: Fast Cash is disabled. Please choose Cash Withdrawal.");
                            } else if (atmStep === 'accountType') {
                              setSelectedAccountType('Current');
                              setAtmStep('amountInput');
                            }
                          }}
                          className="w-4.5 h-4.5 bg-slate-700 hover:bg-slate-650 rounded-full border border-slate-600 shadow-md active:bg-slate-500 transition-colors shrink-0 cursor-pointer"
                        />
                        <button 
                          onClick={() => {
                            if (atmStep === 'option') {
                              alert("Simulation: Balance Inquiry is disabled. Please choose Cash Withdrawal.");
                            }
                          }}
                          className="w-4.5 h-4.5 bg-slate-700 hover:bg-slate-650 rounded-full border border-slate-600 shadow-md active:bg-slate-500 transition-colors shrink-0 cursor-pointer"
                        />
                        <button 
                          onClick={() => {
                            if (atmStep === 'amountInput') {
                              setSelectedAmount('');
                            }
                          }}
                          className="w-4.5 h-4.5 bg-slate-700 hover:bg-slate-650 rounded-full border border-slate-600 shadow-md active:bg-slate-500 transition-colors shrink-0 cursor-pointer"
                        />
                      </div>

                      {/* DIGITAL DISPLAY SCREEN */}
                      <div className="flex-1 bg-gradient-to-b from-[#008cc9] to-[#004b76] border-2 border-slate-700 rounded-xl h-[280px] p-3 flex flex-col justify-between relative overflow-hidden font-sans shadow-inner text-white select-none">
                        
                        {/* Screen Header */}
                        <div className="border-b border-white/20 pb-1 flex justify-between items-center text-[8px] font-bold tracking-wide">
                          <span className="flex items-center gap-1">🏦 भारतीय स्टेट बैंक</span>
                          <span className="text-[7px] text-sky-200">STATE BANK OF INDIA</span>
                        </div>

                        {/* SCREEN CONTENT BASED ON STATE */}
                        
                        {/* 1. Insert Card */}
                        {atmStep === 'insert' && (
                          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3.5 py-1">
                            <CreditCard className="w-12 h-12 text-sky-300 animate-bounce" />
                            <div className="space-y-1">
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

                        {/* 2. Select Language */}
                        {atmStep === 'language' && (
                          <div className="flex-1 flex flex-col justify-between py-2">
                            <div className="text-center">
                              <h4 className="text-xs font-black text-white">PLEASE SELECT LANGUAGE</h4>
                              <p className="text-[9px] text-sky-100">भाषा का चयन करें</p>
                            </div>
                            <div className="space-y-4 pr-1 text-right flex flex-col items-end">
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

                        {/* 3. Transaction Menu */}
                        {atmStep === 'option' && (
                          <div className="flex-1 flex flex-col justify-between py-1">
                            <h4 className="text-xs font-black text-center text-white">SELECT TRANSACTION</h4>
                            <div className="grid grid-cols-2 gap-x-2 gap-y-3.5 mt-2">
                              <div className="space-y-2.5">
                                <button 
                                  onClick={() => alert("Simulation: Fast Cash is disabled. Please choose Cash Withdrawal.")}
                                  className="w-full text-left pl-1.5 py-0.5 bg-sky-900/40 text-[9px] font-black rounded border border-transparent hover:border-sky-400"
                                >
                                  ⬳ FAST CASH
                                </button>
                                <button 
                                  onClick={() => alert("Simulation: Balance Inquiry is disabled. Please choose Cash Withdrawal.")}
                                  className="w-full text-left pl-1.5 py-0.5 bg-sky-900/40 text-[9px] font-black rounded border border-transparent hover:border-sky-400"
                                >
                                  ⬳ BALANCE INQUIRY
                                </button>
                              </div>
                              <div className="space-y-2.5 text-right flex flex-col items-end">
                                <button 
                                  onClick={() => setAtmStep('accountType')}
                                  className="w-[125px] py-0.5 bg-yellow-500 text-slate-900 text-[9px] font-black rounded text-center shadow-sm cursor-pointer"
                                >
                                  CASH WITHDRAWAL ➔
                                </button>
                                <button 
                                  onClick={() => alert("Simulation: PIN Change is disabled.")}
                                  className="w-[125px] py-0.5 bg-sky-900/40 text-white text-[9px] font-black rounded border border-sky-300/30 text-center"
                                >
                                  PIN CHANGE ➔
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 4. Select Account Type */}
                        {atmStep === 'accountType' && (
                          <div className="flex-1 flex flex-col justify-between py-2">
                            <div className="text-center">
                              <h4 className="text-xs font-black text-white">SELECT ACCOUNT TYPE</h4>
                              <p className="text-[9px] text-sky-100">खाता प्रकार चुनें</p>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              <div>
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

                        {/* 5. Amount Input */}
                        {atmStep === 'amountInput' && (
                          <div className="flex-1 flex flex-col justify-between py-1">
                            <div className="text-center space-y-0.5">
                              <h4 className="text-xs font-black text-white">ENTER AMOUNT TO WITHDRAW</h4>
                              <p className="text-[8px] text-sky-100">Multiples of ₹100 | Maximum ₹20,000</p>
                            </div>
                            
                            <div className="flex flex-col items-center">
                              <div className="w-[150px] bg-slate-950/80 border border-sky-300 rounded-lg p-2 text-center text-yellow-400 text-sm font-black font-mono tracking-wide relative">
                                ₹ {selectedAmount || '0'}
                                <span className="animate-ping absolute right-3">|</span>
                              </div>
                              {atmError && (
                                <p className="text-[8px] text-red-200 font-bold mt-1.5 flex items-center gap-0.5 bg-red-950/40 px-2 py-0.5 rounded border border-red-900/50">
                                  <AlertCircle size={8} /> {atmError}
                                </p>
                              )}
                            </div>

                            <div className="grid grid-cols-2 gap-2 mt-1">
                              <div>
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

                        {/* 6. Enter PIN Step */}
                        {atmStep === 'pin' && (
                          <div className="flex-1 flex flex-col justify-between py-1">
                            <div className="text-center space-y-0.5">
                              <h4 className="text-xs font-black text-white">ENTER YOUR SECRET PIN</h4>
                              <p className="text-[8px] text-sky-200">सुरक्षा के लिए अपना पिन गोपनीय रखें</p>
                            </div>
                            
                            <div className="flex flex-col items-center py-2">
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
                                <p className="text-[8px] text-red-200 font-bold mt-1.5 flex items-center gap-0.5">
                                  <AlertCircle size={8} /> {atmError}
                                </p>
                              )}
                            </div>

                            <div className="text-right flex flex-col items-end mt-1">
                              <button 
                                onClick={handlePinSubmit}
                                className="w-[110px] py-1 bg-yellow-500 text-slate-900 text-[9px] font-black rounded text-center shadow-sm cursor-pointer"
                              >
                                ENTER / हाँ ➔
                              </button>
                            </div>
                          </div>
                        )}

                        {/* 7. Processing Step */}
                        {atmStep === 'processing' && (
                          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-2">
                            <div className="w-10 h-10 rounded-full border-2 border-t-yellow-400 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                            <div className="space-y-1">
                              <h4 className="text-xs font-bold text-sky-100">TRANSACTION PROCESSING</h4>
                              <p className="text-[9px] text-sky-200">कृपया प्रतीक्षा करें / Please wait...</p>
                            </div>
                          </div>
                        )}

                        {/* 8. Dispensing Cash */}
                        {atmStep === 'dispensing' && (
                          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3.5 py-2">
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

                        {/* 9. Success */}
                        {atmStep === 'success' && (
                          <div className="flex-1 flex flex-col justify-between py-2 text-center">
                            <div className="flex flex-col items-center space-y-1.5">
                              <div className="w-9 h-9 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-300 border border-emerald-500/30">
                                <CheckCircle2 size={24} />
                              </div>
                              <h4 className="text-xs font-black text-emerald-300">TRANSACTION SUCCESS</h4>
                              <p className="text-[8px] text-sky-100 leading-normal">
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
                      <div className="flex flex-col gap-9 justify-center py-4">
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
                          className="w-4.5 h-4.5 bg-slate-700 hover:bg-slate-650 rounded-full border border-slate-600 shadow-md active:bg-slate-500 transition-colors shrink-0 cursor-pointer"
                        />
                        <button 
                          onClick={() => {
                            if (atmStep === 'language') {
                              setSelectedLanguage('Hindi');
                              setAtmStep('option');
                            }
                          }}
                          className="w-4.5 h-4.5 bg-slate-700 hover:bg-slate-650 rounded-full border border-slate-600 shadow-md active:bg-slate-500 transition-colors shrink-0 cursor-pointer"
                        />
                        <button 
                          onClick={() => {
                            if (atmStep === 'amountInput' || atmStep === 'pin') {
                              handlePinSubmit();
                            } else if (atmStep === 'success') {
                              resetAtm();
                            }
                          }}
                          className="w-4.5 h-4.5 bg-slate-700 hover:bg-slate-650 rounded-full border border-slate-600 shadow-md active:bg-slate-500 transition-colors shrink-0 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* PHYSICAL KEYPAD */}
                    <div className="mt-6 bg-[#16223f] border border-slate-800 rounded-2xl p-4 grid grid-cols-4 gap-3 shadow-lg">
                      <div className="col-span-3 grid grid-cols-3 gap-2.5">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                          <button
                            key={num}
                            onClick={() => handlePinClick(num)}
                            disabled={atmStep !== 'pin' && atmStep !== 'amountInput'}
                            className="py-2.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-black rounded-lg border border-slate-800 disabled:opacity-40 transition-colors text-center cursor-pointer"
                          >
                            {num}
                          </button>
                        ))}
                        <button
                          disabled={true}
                          className="py-2.5 bg-slate-900/90 text-slate-500 font-bold rounded-lg border border-slate-800 disabled:opacity-40"
                        >
                          *
                        </button>
                        <button
                          key={0}
                          onClick={() => handlePinClick(0)}
                          disabled={atmStep !== 'pin' && atmStep !== 'amountInput'}
                          className="py-2.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-black rounded-lg border border-slate-800 disabled:opacity-40 transition-colors text-center cursor-pointer"
                        >
                          0
                        </button>
                        <button
                          disabled={true}
                          className="py-2.5 bg-slate-900/90 text-slate-500 font-bold rounded-lg border border-slate-800 disabled:opacity-40"
                        >
                          #
                        </button>
                      </div>

                      {/* Control Keys */}
                      <div className="flex flex-col gap-2.5">
                        <button
                          onClick={handlePinDelete}
                          disabled={atmStep !== 'pin' && atmStep !== 'amountInput'}
                          className="flex-1 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-[10px] rounded-lg transition-colors flex items-center justify-center cursor-pointer disabled:opacity-40"
                        >
                          CLEAR
                        </button>
                        <button
                          onClick={resetAtm}
                          className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px] rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                        >
                          CANCEL
                        </button>
                        <button
                          onClick={handlePinSubmit}
                          disabled={atmStep !== 'pin' && atmStep !== 'amountInput'}
                          className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white font-bold text-[10px] rounded-lg transition-colors flex items-center justify-center cursor-pointer disabled:opacity-40"
                        >
                          ENTER
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 flex items-start gap-3">
                    <Shield className="text-emerald-600 shrink-0 mt-0.5" size={18} />
                    <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                      <strong className="block font-black mb-0.5">Banking Safety Challenge:</strong> Try inserting the debit card, choose English or Hindi, select Cash Withdrawal, pick Savings A/C, type your withdrawal amount (e.g. 500 or 1000) using the keypad and click ENTER, then enter a secret 4-digit PIN to complete the transaction!
                    </p>
                  </div>
                </div>

                {/* ROAD SAFETY SANDBOX */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="bg-slate-100 rounded-[32px] p-6 border border-slate-200 shadow-sm relative overflow-hidden min-h-[380px] flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                          Traffic Safety Lab
                        </span>
                        <button 
                          onClick={resetTrafficLab}
                          className="p-1.5 bg-white hover:bg-slate-50 rounded-lg text-slate-500 border border-slate-200 transition-colors"
                        >
                          <RefreshCw size={14} />
                        </button>
                      </div>

                      {/* SANDBOX ROAD CONTAINER */}
                      <div className="relative bg-slate-800 rounded-2xl h-[180px] w-full border border-slate-700 overflow-hidden shadow-inner flex flex-col justify-between">
                        
                        {/* Pedestrian Sidewalk Top */}
                        <div className="h-6 bg-slate-600 border-b-4 border-dashed border-yellow-500 flex items-center px-4">
                          <div className="text-[8px] text-slate-300 font-bold font-mono">SAFE WALK FOOTPATH</div>
                        </div>

                        {/* Road Lane with Zebra Crossing */}
                        <div className="flex-1 relative flex items-center">
                          {/* Lane Divider Stripes */}
                          <div className="absolute inset-x-0 h-0.5 border-t border-dashed border-white/40 top-1/2 -translate-y-1/2" />
                          
                          {/* Zebra Crossing Stripes */}
                          <div className="absolute left-[40%] top-0 bottom-0 w-20 flex justify-between px-1">
                            {[0, 1, 2, 3, 4, 5].map(idx => (
                              <div key={idx} className="w-1.5 h-full bg-white/90" />
                            ))}
                          </div>

                          {/* Animated Cars driving past */}
                          {trafficLight !== 'red' && !isCrossing && (
                            <motion.div
                              animate={{ x: [-80, 500] }}
                              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                              className="absolute top-2.5 text-3xl"
                            >
                              🚗
                            </motion.div>
                          )}
                          {trafficLight !== 'red' && !isCrossing && (
                            <motion.div
                              animate={{ x: [500, -80] }}
                              transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: 1 }}
                              className="absolute bottom-2.5 text-3xl"
                            >
                              🚙
                            </motion.div>
                          )}

                          {/* Pedestrian Character walking across */}
                          <motion.div
                            animate={
                              isCrossing 
                                ? { y: [130, 20] } 
                                : { y: 130 }
                            }
                            transition={{ duration: 2 }}
                            className="absolute left-[45%] text-3xl z-20"
                            style={{ bottom: '5px' }}
                          >
                            🚶‍♂️
                          </motion.div>
                        </div>

                        {/* Pedestrian Sidewalk Bottom */}
                        <div className="h-6 bg-slate-600 border-t-4 border-dashed border-yellow-500 flex items-center px-4">
                          <div className="text-[8px] text-slate-300 font-bold font-mono">START CROSSING POINT</div>
                        </div>

                        {/* Traffic Light Pole Overlay */}
                        <div className="absolute right-4 top-4 bg-slate-900 border-2 border-slate-700 rounded-full py-1 px-1.5 flex flex-col gap-1 shadow-md z-30">
                          <div className={`w-3.5 h-3.5 rounded-full ${trafficLight === 'red' ? 'bg-red-500 shadow-md shadow-red-500/50' : 'bg-red-950'}`} />
                          <div className={`w-3.5 h-3.5 rounded-full ${trafficLight === 'yellow' ? 'bg-yellow-500 shadow-md shadow-yellow-500/50' : 'bg-yellow-950'}`} />
                          <div className={`w-3.5 h-3.5 rounded-full ${trafficLight === 'green' ? 'bg-green-500 shadow-md shadow-green-500/50' : 'bg-green-950'}`} />
                        </div>
                      </div>
                    </div>

                    {/* ROAD CONTROLS */}
                    <div className="space-y-4 pt-4 border-t border-slate-200">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        
                        {/* Traffic Light Switcher */}
                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
                          <span className="text-xs font-bold text-slate-500">Light Signal:</span>
                          <div className="flex gap-1.5">
                            {['green', 'yellow', 'red'].map(color => (
                              <button
                                key={color}
                                onClick={() => setTrafficLight(color)}
                                className={`px-2.5 py-1 rounded text-[10px] font-black uppercase transition-all ${
                                  trafficLight === color
                                    ? color === 'red' ? 'bg-red-500 text-white' : color === 'yellow' ? 'bg-yellow-500 text-slate-900' : 'bg-green-500 text-white'
                                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                                }`}
                              >
                                {color}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* CROSS ACTION */}
                        <button
                          onClick={handleCrossRoad}
                          disabled={isCrossing}
                          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black tracking-wide uppercase transition-all flex items-center gap-1.5 shadow-md shadow-emerald-200/50 disabled:opacity-50"
                        >
                          <Eye size={14} /> Cross zebra crossing
                        </button>
                      </div>

                      {/* RESULTS ALERTS */}
                      <AnimatePresence mode="wait">
                        {crossingResult === 'safe' && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="bg-green-100 border border-green-200 text-green-800 rounded-xl p-3 flex items-center gap-2 text-xs font-medium"
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
                            className="bg-red-100 border border-red-200 text-red-800 rounded-xl p-3 flex items-center gap-2 text-xs font-medium animate-shake"
                          >
                            <AlertCircle className="text-red-600 shrink-0" size={18} />
                            <span>Watch out! The traffic light was {trafficLight.toUpperCase()} and vehicles were driving past. Never cross while cars are moving!</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                  </div>
                </div>

              </motion.div>
            )}

            {/* 3. QUIZ TAB */}
            {activeTab === 'quiz' && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full flex justify-center py-4"
              >
                <div className="w-full max-w-[580px] shrink-0">
                  <AnimatePresence mode="wait">
                    {!quizFinished ? (
                      <motion.div
                        key="active-quiz"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="bg-white border border-slate-200/80 rounded-[32px] p-6 md:p-8 shadow-lg flex flex-col justify-between text-slate-800 min-h-[380px]"
                      >
                        {/* Quiz Header */}
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-black text-slate-400 tracking-wider uppercase flex items-center gap-1.5">
                              <span>QUESTION {currentQ + 1} / {quizQuestions.length}</span>
                              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                              <span className="text-emerald-600">XP: {score}</span>
                            </span>
                            <div className="flex items-center gap-1.5 text-orange-500 font-bold text-[10px] bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100">
                              🔥 STREAK: {streak}
                            </div>
                          </div>

                          {/* Progress */}
                          <div className="w-full h-1.5 bg-slate-100 rounded-full mb-6 overflow-hidden">
                            <motion.div 
                              animate={{ width: `${((currentQ + (isAnswered ? 1 : 0)) / quizQuestions.length) * 100}%` }}
                              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" 
                            />
                          </div>

                          {/* Question */}
                          <h3 className="text-[15px] font-black text-slate-900 leading-snug mb-5">
                            {quizQuestions[currentQ].question}
                          </h3>

                          {/* Options */}
                          <div className="space-y-2.5">
                            {quizQuestions[currentQ].options.map((opt, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleQuizSelect(idx)}
                                disabled={isAnswered}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl border text-left transition-all cursor-pointer font-bold text-xs ${getQuizOptionStyle(idx)}`}
                              >
                                <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 transition-all ${
                                  isAnswered && idx === quizQuestions[currentQ].correct 
                                    ? 'bg-green-500 text-white' 
                                    : isAnswered && idx === selectedOption 
                                      ? 'bg-red-500 text-white' 
                                      : 'bg-slate-200/70 text-slate-500'
                                }`}>
                                  {isAnswered && idx === quizQuestions[currentQ].correct ? <CheckCircle2 size={12} />
                                    : isAnswered && idx === selectedOption && idx !== quizQuestions[currentQ].correct ? <AlertCircle size={12} />
                                      : optionLabels[idx]}
                                </span>
                                <span className="font-semibold leading-relaxed flex-1">{opt}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Quiz Footer Controls */}
                        <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-4 min-h-[36px]">
                          {isAnswered ? (
                            <span className={`text-[11px] font-black ${selectedOption === quizQuestions[currentQ].correct ? 'text-green-600' : 'text-red-500'}`}>
                              {selectedOption === quizQuestions[currentQ].correct ? '🎉 Correct Answer!' : '❌ Incorrect. Read the explanation in Lessons!'}
                            </span>
                          ) : <div />}

                          {isAnswered && (
                            <button
                              onClick={handleQuizNext}
                              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-[10px] font-black tracking-wide uppercase transition-all shadow-md shadow-emerald-200/50"
                            >
                              {currentQ < quizQuestions.length - 1 ? 'NEXT' : 'RESULTS'} <ArrowRight size={12} className="inline ml-1" />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="quiz-results"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-xl text-center text-slate-800"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-orange-500/20">🏆</div>
                        <h2 className="text-xl font-black text-slate-900 mb-1">Challenge Completed!</h2>
                        <p className="text-slate-400 text-xs font-bold mb-6">Skills Quiz Results:</p>

                        <div className="grid grid-cols-3 gap-3 mb-6">
                          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                            <div className="text-xl font-black text-emerald-600">{score}</div>
                            <div className="text-[8px] font-black text-slate-400 uppercase mt-0.5">Total XP</div>
                          </div>
                          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                            <div className="text-xl font-black text-orange-500">
                              {quizQuestions.length}
                            </div>
                            <div className="text-[8px] font-black text-slate-400 uppercase mt-0.5">Questions</div>
                          </div>
                          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                            <div className="text-xl font-black text-purple-600">
                              {Math.round((score / (quizQuestions.length * 100)) * 100)}%
                            </div>
                            <div className="text-[8px] font-black text-slate-400 uppercase mt-0.5">Accuracy</div>
                          </div>
                        </div>

                        {/* Badges Display */}
                        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-6">
                          <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Badges Earned</h4>
                          <div className="flex justify-center gap-4">
                            {score >= 300 ? (
                              <div className="flex flex-col items-center gap-1">
                                <span className="text-3xl" title="Smart Citizen">🛡️</span>
                                <span className="text-[9px] font-black text-slate-500">Smart Citizen</span>
                              </div>
                            ) : null}
                            {score === 500 ? (
                              <div className="flex flex-col items-center gap-1">
                                <span className="text-3xl" title="Master of Skills">🥇</span>
                                <span className="text-[9px] font-black text-slate-500">Skill Master</span>
                              </div>
                            ) : null}
                            {score < 300 && (
                              <span className="text-xs text-slate-400 italic font-medium">Score 300+ XP to unlock badges!</span>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={restartQuiz}
                            className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-black tracking-wide uppercase transition-all shadow-md shadow-emerald-200/50"
                          >
                            Play Again
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>

      {/* ─── LESSON READING OVERLAY / MODAL ─────────────────────────── */}
      <AnimatePresence>
        {selectedLesson && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLesson(null)}
            data-lenis-prevent
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              onClick={e => e.stopPropagation()}
              data-lenis-prevent
              className="bg-white rounded-[32px] max-w-3xl w-[95%] shadow-2xl relative overflow-hidden flex flex-col max-h-[85vh] border border-slate-100"
            >
              {/* Offset Scrollable Area to keep scrollbar away from rounded corners */}
              <div 
                data-lenis-prevent
                className="flex-grow overflow-y-auto custom-modal-scrollbar my-4 mr-3 ml-6 md:ml-8"
              >
                <div className="pr-3 pb-2">
                  
                  {/* Modal Title & Info */}
                  <div className="flex justify-between items-start mb-6 border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-[10px] font-black tracking-wider uppercase bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full mr-2">
                        {selectedLesson.level}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        ⏱ {selectedLesson.duration} interactive study
                      </span>
                      <h3 className="text-2xl md:text-3xl font-black text-slate-900 mt-2.5">
                        {selectedLesson.title}
                      </h3>
                    </div>
                    
                    {/* Close Button */}
                    <button
                      onClick={() => setSelectedLesson(null)}
                      className="w-10 h-10 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors shadow-sm shrink-0 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  {/* GAME WIDGET AREA */}
                  <div className="mb-8">
                    {selectedLesson.id === 'road-safety' && <RoadSafetyGame />}
                    {selectedLesson.id === 'atm-banking' && <AtmBankingGame />}
                    {selectedLesson.id === 'money-handling' && <MoneyHandlingGame />}
                  </div>

                  {/* TEXT STUDY CARD */}
                  <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 mb-6">
                    <LessonSummaryVisualizer lessonId={selectedLesson.id} />
                  </div>

                  {/* Modal Action Button */}
                  <div className="pt-4 border-t border-slate-100 flex justify-end shrink-0">
                    <button
                      onClick={() => setSelectedLesson(null)}
                      className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-emerald-100/50 cursor-pointer"
                    >
                      Got it, thanks!
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
