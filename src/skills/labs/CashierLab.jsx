import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, HelpCircle, Coins } from 'lucide-react';

const BoyAvatarSVG = ({ expression = "smile", className = "w-14 h-14 mx-auto" }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <circle cx="50" cy="50" r="45" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="2" />
    <path d="M 25,40 C 25,20 75,20 75,40 C 80,45 75,50 75,40 C 70,30 30,30 25,40" fill="#1E293B" />
    <circle cx="50" cy="52" r="28" fill="#FDE047" opacity="0.8" />
    <circle cx="50" cy="52" r="28" fill="#FDBA74" opacity="0.5" />
    <path d="M 22,42 Q 35,32 50,42 Q 65,32 78,42 Q 80,30 50,22 Q 20,30 22,42" fill="#1E293B" />
    {expression === "closed" ? (
      <>
        <path d="M 36,52 Q 41,56 46,52" stroke="#1E293B" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 54,52 Q 59,56 64,52" stroke="#1E293B" strokeWidth="3" fill="none" strokeLinecap="round" />
      </>
    ) : (
      <>
        <circle cx="42" cy="52" r="3.5" fill="#1E293B" />
        <circle cx="58" cy="52" r="3.5" fill="#1E293B" />
      </>
    )}
    {expression === "neutral" ? (
      <line x1="44" y1="65" x2="56" y2="65" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
    ) : expression === "surprise" ? (
      <circle cx="50" cy="65" r="4" fill="#1E293B" />
    ) : (
      <path d="M 44,62 Q 50,70 56,62" stroke="#1E293B" strokeWidth="3" fill="none" strokeLinecap="round" />
    )}
  </svg>
);

const GirlAvatarSVG = ({ className = "w-14 h-14 mx-auto", expression = "smile" }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <circle cx="50" cy="50" r="45" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="2" />
    <circle cx="20" cy="40" r="12" fill="#475569" />
    <circle cx="80" cy="40" r="12" fill="#475569" />
    <circle cx="50" cy="52" r="28" fill="#FDE047" opacity="0.8" />
    <circle cx="50" cy="52" r="28" fill="#FDBA74" opacity="0.5" />
    <path d="M 22,44 C 30,36 70,36 78,44 C 70,38 30,38 22,44" fill="#475569" />
    <path d="M 22,44 Q 50,22 78,44" fill="#475569" />
    {expression === "closed" ? (
      <>
        <path d="M 36,52 Q 41,56 46,52" stroke="#1E293B" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 54,52 Q 59,56 64,52" stroke="#1E293B" strokeWidth="3" fill="none" strokeLinecap="round" />
      </>
    ) : (
      <>
        <circle cx="42" cy="52" r="3.5" fill="#1E293B" />
        <circle cx="58" cy="52" r="3.5" fill="#1E293B" />
      </>
    )}
    <path d="M 44,62 Q 50,70 56,62" stroke="#1E293B" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);

// Indian Currency Visual Components for Smart Cashier Lab
const IndianRupeeNote = ({ val, onClick, disabled = false, size = "md" }) => {
  const colorMap = {
    100: "from-[#818cf8] via-[#6366f1] to-[#4f46e5] border-[#a5b4fc] text-indigo-100",
    50: "from-[#22d3ee] via-[#06b6d4] to-[#0891b2] border-[#67e8f9] text-cyan-100",
    20: "from-[#fbbf24] via-[#f59e0b] to-[#d97706] border-[#fde047] text-amber-100",
    10: "from-[#ca8a04] via-[#a16207] to-[#854d0e] border-[#fef08a] text-yellow-100"
  };

  const bgStyle = colorMap[val] || "from-slate-500 to-slate-600 border-slate-400";
  const sizeClasses = size === "md"
    ? "w-36 h-20 text-[18px] p-2 rounded-xl border-2"
    : "w-20 h-11 text-[11px] p-1 rounded-lg border";

  return (
    <motion.div
      whileHover={disabled ? {} : { scale: 1.05, y: -4, rotate: 1 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      onClick={disabled ? undefined : onClick}
      className={`relative ${sizeClasses} flex flex-col justify-between font-mono font-black shadow-lg cursor-pointer bg-gradient-to-br transition-all select-none border-dashed overflow-hidden ${bgStyle} ${disabled ? 'opacity-40 pointer-events-none' : ''}`}
    >
      <div className="absolute inset-0.5 border border-white/25 rounded-lg pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[7px] opacity-20 font-sans">
        RBI
      </div>

      <div className="flex justify-between items-center leading-none z-10">
        <span className="text-[7.5px] font-sans tracking-tight opacity-90">भारतीय रिज़र्व बैंक</span>
        <span className="text-[7.5px] font-sans opacity-70">₹{val}</span>
      </div>

      <div className="text-center font-serif text-[15px] tracking-wider my-auto drop-shadow z-10">
        ₹{val}
      </div>

      <div className="flex justify-between items-end leading-none z-10">
        <span className="text-[6px] font-sans tracking-wide opacity-80 uppercase">RESERVE BANK</span>
        <span className="text-[7.5px] opacity-80">₹</span>
      </div>
    </motion.div>
  );
};

const IndianRupeeCoin = ({ val, onClick, disabled = false, size = "md" }) => {
  const colorMap = {
    5: "from-[#facc15] via-[#eab308] to-[#ca8a04] border-[#fef08a] text-yellow-950 shadow-yellow-600/30",
    2: "from-[#e2e8f0] via-[#cbd5e1] to-[#94a3b8] border-[#f1f5f9] text-slate-800 shadow-slate-400/30",
    1: "from-[#b45309] via-[#92400e] to-[#78350f] border-[#d97706] text-amber-100 shadow-amber-900/30"
  };

  const bgStyle = colorMap[val] || "from-slate-400 to-slate-500 border-slate-300";
  const sizeClasses = size === "md"
    ? "w-14 h-14 text-[15px] border-2"
    : "w-10 h-10 text-[11px] border";

  return (
    <motion.div
      whileHover={disabled ? {} : { scale: 1.1, y: -3, rotate: 10 }}
      whileTap={disabled ? {} : { scale: 0.9 }}
      onClick={disabled ? undefined : onClick}
      className={`relative rounded-full flex items-center justify-center font-mono font-black shadow-md cursor-pointer bg-gradient-to-br transition-all select-none border-double ${sizeClasses} ${bgStyle} ${disabled ? 'opacity-40 pointer-events-none' : ''}`}
    >
      <div className="absolute inset-0.5 rounded-full border border-white/20 pointer-events-none" />
      <span className="drop-shadow-sm">₹{val}</span>
    </motion.div>
  );
};

const cashierLevelConfig = {
  1: {
    title: "Junior Apprentice",
    grade: "Grade C (Junior)",
    badgeEmoji: "🌱",
    target: 1,
    items: [
      { name: 'Sweet Candy pack', price: 12, icon: '🍬' },
      { name: 'Party Balloon', price: 15, icon: '🎈' },
      { name: 'Pencil & Eraser set', price: 25, icon: '✏️' }
    ],
    notes: [20, 50]
  },
  2: {
    title: "Billing Assistant",
    grade: "Grade B (Bronze)",
    badgeEmoji: "🥉",
    target: 1,
    items: [
      { name: 'School Notebook', price: 45, icon: '📝' },
      { name: 'Color Pencil Box', price: 55, icon: '🖍️' },
      { name: 'Water Bottle', price: 65, icon: '🥤' }
    ],
    notes: [50, 100]
  },
  3: {
    title: "Senior Specialist",
    grade: "Grade B+ (Silver)",
    badgeEmoji: "🥈",
    target: 1,
    items: [
      { name: 'Fresh Mango Basket', price: 120, icon: '🥭' },
      { name: 'School Lunchbox', price: 135, icon: '🍱' },
      { name: 'Story Book set', price: 145, icon: '📚' }
    ],
    notes: [200]
  },
  4: {
    title: "Master Store Cashier",
    grade: "Grade A (Gold)",
    badgeEmoji: "🥇",
    target: 1,
    items: [
      { name: 'Toy Cricket Set', price: 240, icon: '🏏' },
      { name: 'School Backpack', price: 280, icon: '🎒' }
    ],
    notes: [500]
  },
  5: {
    title: "General Manager",
    grade: "Grade A+ (Superstar)",
    badgeEmoji: "👑",
    target: 1,
    items: [
      { name: 'Sports Running Shoes', price: 367, icon: '👟' },
      { name: 'Remote Toy Car', price: 413, icon: '🏎️' }
    ],
    notes: [500]
  }
};

const getChangeGuideSteps = (price, paid) => {
  const steps = [];
  const changeDue = paid - price;
  if (changeDue <= 0) return steps;

  steps.push({
    title: "Calculate Change Due",
    desc: `Customer paid ₹${paid} for an item costing ₹${price}.`,
    math: `₹${paid} - ₹${price} = ₹${changeDue}`
  });

  let current = price;
  const denoms = [100, 50, 20, 10, 5, 2, 1];
  const countSteps = [];

  let remaining = changeDue;
  for (let denom of denoms) {
    if (remaining >= denom) {
      const qty = Math.floor(remaining / denom);
      if (qty > 0) {
        countSteps.push({ denom, qty });
        remaining -= denom * qty;
      }
    }
  }

  let running = price;
  countSteps.forEach((step, index) => {
    const totalAdded = step.denom * step.qty;
    const previous = running;
    running += totalAdded;
    steps.push({
      title: `Step ${index + 1}: Serve ₹${step.denom}s`,
      desc: `Add ${step.qty} × ₹${step.denom} ${step.denom >= 10 ? 'note' : 'coin'}${step.qty > 1 ? 's' : ''} to the tray.`,
      math: `₹${previous} + ₹${totalAdded} = ₹${running}`
    });
  });

  return steps;
};

const CashierLab = () => {
  // --- Smart Cashier State ---
  const [cashierLevel, setCashierLevel] = useState(1);
  const [cashierLevelProgress, setCashierLevelProgress] = useState(0);
  const [cashierGameFinished, setCashierGameFinished] = useState(false);
  const [cashierCurrentItem, setCashierCurrentItem] = useState({ name: 'Sweet Candy pack', price: 12, icon: '🍬' });
  const [cashierPaidAmount, setCashierPaidAmount] = useState(20);
  const [cashierChangeTray, setCashierChangeTray] = useState({ 100: 0, 50: 0, 20: 0, 10: 0, 5: 0, 2: 0, 1: 0 });
  const [cashierFeedback, setCashierFeedback] = useState(null);
  const [cashierScore, setCashierScore] = useState(0);
  const [cashierCustomerType, setCashierCustomerType] = useState('boy');
  const [cashierExpression, setCashierExpression] = useState('smile');
  const [cashierMessage, setCashierMessage] = useState('नमस्ते! Can you help me buy this item? Here is my cash.');
  const [cashierStreak, setCashierStreak] = useState(0);
  const [showCashierHelp, setShowCashierHelp] = useState(false);

  // --- CASHIER FUNCTIONS ---
  const generateNewCashierCustomer = (overrideLevel = null) => {
    const activeLevel = overrideLevel || cashierLevel;
    const config = cashierLevelConfig[activeLevel] || cashierLevelConfig[1];

    const randomItem = config.items[Math.floor(Math.random() * config.items.length)];
    const paid = config.notes.find(n => n > randomItem.price) || config.notes[0];

    setCashierCurrentItem(randomItem);
    setCashierPaidAmount(paid);
    setCashierChangeTray({ 100: 0, 50: 0, 20: 0, 10: 0, 5: 0, 2: 0, 1: 0 });
    setCashierFeedback(null);
    setCashierExpression('smile');
    setShowCashierHelp(false);

    const customerTypes = ['boy', 'girl'];
    setCashierCustomerType(customerTypes[Math.floor(Math.random() * customerTypes.length)]);

    const greetings = [
      `नमस्ते! I would like to buy the ${randomItem.name}. Here is ₹${paid}.`,
      `Hello! Can you ring up this ${randomItem.name} for me? Handing you ₹${paid}.`,
      `Hi cashier! I am purchasing this ${randomItem.name}. I only have a ₹${paid} note.`,
      `Good day! I'll take this ${randomItem.name}, please. Here is ₹${paid}.`
    ];
    setCashierMessage(greetings[Math.floor(Math.random() * greetings.length)]);
  };

  const resetCashierLab = () => {
    setCashierScore(0);
    setCashierStreak(0);
    setCashierLevel(1);
    setCashierLevelProgress(0);
    setCashierChangeTray({ 100: 0, 50: 0, 20: 0, 10: 0, 5: 0, 2: 0, 1: 0 });
    setCashierFeedback(null);
    setShowCashierHelp(false);
    setCashierGameFinished(false);
    generateNewCashierCustomer(1);
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
      const nextProgress = cashierLevelProgress + 1;
      const config = cashierLevelConfig[cashierLevel];

      let levelUpOccurred = false;
      let gameFinishedOccurred = false;

      if (nextProgress >= config.target) {
        if (cashierLevel === 5) {
          gameFinishedOccurred = true;
        } else {
          levelUpOccurred = true;
        }
      }

      if (gameFinishedOccurred) {
        setCashierFeedback({
          type: 'success',
          text: `🎉 Perfect change! You served all customers correctly!`,
          isGameFinish: true
        });
        setCashierLevelProgress(nextProgress);
        setCashierScore(prev => prev + 150);
        setCashierStreak(prev => prev + 1);
      } else if (levelUpOccurred) {
        setCashierFeedback({
          type: 'success',
          text: `🎉 Level Up! You served the customer correctly and passed Level ${cashierLevel} with Grade: A+!`,
          isLevelUp: true,
          oldLevel: cashierLevel,
          newLevel: cashierLevel + 1
        });
        setCashierLevel(prev => prev + 1);
        setCashierLevelProgress(0);
        setCashierScore(prev => prev + 150);
        setCashierStreak(prev => prev + 1);
      } else {
        setCashierFeedback({
          type: 'success',
          text: `🎉 Perfect change! You handed back ₹${changeDue} correctly.`
        });
        setCashierLevelProgress(nextProgress);
        setCashierScore(prev => prev + 100);
        setCashierStreak(prev => prev + 1);
      }
      setCashierExpression('smile');
      setCashierMessage(`Great job! That is exactly ₹${changeDue}. Thank you! 😊`);
    } else if (trayTotal > changeDue) {
      setCashierFeedback({
        type: 'error',
        text: `❌ Wrong change! You handed back ₹${trayTotal}, but the change due is ₹${changeDue}.`
      });
      setCashierStreak(0);
      setCashierExpression('surprise');
      setCashierMessage(`Wait... you gave me ₹${trayTotal}. That is too much change! I am only owed ₹${changeDue}. 🤔`);
    } else {
      setCashierFeedback({
        type: 'error',
        text: `❌ Not enough change! You handed back ₹${trayTotal}, but the change due is ₹${changeDue}.`
      });
      setCashierStreak(0);
      setCashierExpression('surprise');
      setCashierMessage(`Wait a minute... you only gave me ₹${trayTotal}. That is not enough! You still owe me ₹${changeDue - trayTotal}. 🤨`);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-5 md:p-6 text-left space-y-6">

        {/* HEADER WITH STREAK, SCORE & PROGRESSIVE RANK */}
        <div className="flex flex-col gap-6 border-b border-slate-100 pb-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-[11px] font-black uppercase text-emerald-600 tracking-wider bg-emerald-50 px-3.5 py-1.5 rounded-full">
                Practical Lab 03
              </span>
              <h2 className="text-[26px] md:text-[34px] font-black text-slate-900 mt-2">Smart Cashier Lab</h2>
              <p className="text-[14px] text-slate-500 font-bold mt-1">Calculate and build correct change using Indian Rupee notes & coins.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 self-stretch sm:self-auto justify-end">
              {/* Streak Badge */}
              <div className="bg-amber-50 px-4 py-2 rounded-2xl border border-amber-100 text-center shrink-0 flex flex-col justify-center min-w-[70px]">
                <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest block">Streak</span>
                <span className="text-base font-black text-amber-700">{cashierStreak} 🔥</span>
              </div>
              {/* Score Badge */}
              <div className="bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100 text-center shrink-0 flex flex-col justify-center min-w-[75px]">
                <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest block">Score</span>
                <span className="text-base font-black text-emerald-700">{cashierScore} pts</span>
              </div>
              {/* Reset */}
              <button
                onClick={resetCashierLab}
                className="p-2 bg-white hover:bg-slate-50 rounded-xl text-slate-500 border border-slate-200 transition-colors cursor-pointer self-stretch flex items-center justify-center shrink-0 shadow-sm"
                title="Reset Cashier Game"
              >
                <RefreshCw size={15} />
              </button>
            </div>
          </div>

          {/* LEVEL PROGRESS TIMELINE */}
          <div className="w-full relative mt-3 pt-2">
            <div className="relative flex justify-between items-start w-full">
              {/* Background Line (connects all circles) */}
              <div className="absolute left-[8%] right-[8%] top-[14px] h-[3px] bg-slate-200 z-0 rounded-full">
                {/* Active Progress Line */}
                <motion.div
                  className="h-full bg-emerald-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((cashierLevel - 1) / 4) * 100}%` }}
                  transition={{ type: "spring", stiffness: 80, damping: 15 }}
                />
              </div>

              {/* Steps */}
              {[1, 2, 3, 4, 5].map((lvl) => {
                const isCompleted = cashierLevel > lvl;
                const isActive = cashierLevel === lvl;
                const isLocked = cashierLevel < lvl;

                return (
                  <div key={lvl} className="flex flex-col items-center z-10 flex-1 relative">
                    {/* Circle Node */}
                    <motion.div
                      whileHover={isLocked ? {} : { scale: 1.08 }}
                      className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 font-sans font-bold text-xs shadow-sm
                        ${isCompleted ? 'bg-emerald-500 border-emerald-600 text-white' : ''}
                        ${isActive ? 'bg-indigo-600 border-indigo-700 text-white shadow-[0_0_8px_rgba(79,70,229,0.35)] ring-4 ring-indigo-50' : ''}
                        ${isLocked ? 'bg-slate-100 border-slate-200 text-slate-400' : ''}
                      `}
                    >
                      {isCompleted ? "✓" : lvl}
                    </motion.div>

                    {/* Level label */}
                    <span className={`text-[10px] sm:text-[11.5px] font-black text-center mt-2 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
                      Level {lvl}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* LEFT COLUMN: CUSTOMER AVATAR, POS RECEIPT, MATH ASSISTANT */}
          <div className="lg:col-span-5 space-y-5">

            {/* Customer Avatar & Speech Bubble */}
            <div className="flex flex-col items-center bg-slate-50 border border-slate-200/60 rounded-3xl p-5 relative shadow-sm">
              <div className="relative w-20 h-20 bg-emerald-50 rounded-full border-2 border-emerald-250 flex items-center justify-center shadow-md">
                {cashierCustomerType === 'boy' ? (
                  <BoyAvatarSVG expression={cashierExpression} className="w-16 h-16" />
                ) : (
                  <GirlAvatarSVG expression={cashierExpression} className="w-16 h-16" />
                )}
              </div>
              <div className="mt-4 relative bg-white border border-slate-200 p-3.5 rounded-2xl text-[12px] font-bold text-slate-700 leading-relaxed text-center shadow-sm w-full">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-slate-200 rotate-45" />
                <p className="font-sans">{cashierMessage}</p>
              </div>
            </div>

            {/* POS INVOICE / THERMAL RECEIPT */}
            <div className="relative bg-white border border-slate-200 shadow-[0_8px_20px_rgba(0,0,0,0.04)] rounded-t-2xl rounded-b-none p-5 pt-6 font-mono text-[11.5px] text-slate-700 overflow-hidden border-b-0">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-slate-100 via-white to-slate-100" />

              {/* Store Name Header */}
              <div className="text-center space-y-2 mb-4">
                <img
                  src="/images/life skill/mithila_bazar_banner.png"
                  alt="Mithila Smart Bazar Banner"
                  className="w-full h-16 object-cover rounded-lg shadow-sm border border-slate-100"
                />
                <div>
                  <h5 className="font-black text-slate-900 tracking-wider text-[13px] uppercase mt-1">MITHILA SMART BAZAR</h5>
                  <p className="text-[9.5px] text-slate-400 font-bold uppercase tracking-widest">Patna, Bihar</p>
                  <div className="text-[8.5px] text-slate-400">Date: {new Date().toLocaleDateString()}</div>
                </div>
              </div>

              {/* Receipt Items Breakdown */}
              <div className="border-t border-dashed border-slate-250 py-3.5 space-y-2">
                <div className="flex justify-between items-center text-slate-500 font-bold">
                  <span>DESCRIPTION</span>
                  <span>QTY/AMT</span>
                </div>
                <div className="flex justify-between items-center text-slate-900 font-black">
                  <span className="flex items-center gap-1.5">
                    {cashierCurrentItem.icon} {cashierCurrentItem.name}
                  </span>
                  <span>1 x ₹{cashierCurrentItem.price}</span>
                </div>
              </div>

              {/* Subtotal, tax, due */}
              <div className="border-t border-dashed border-slate-250 pt-3.5 space-y-2">
                <div className="flex justify-between items-center">
                  <span>SUBTOTAL</span>
                  <span className="font-black text-slate-800">₹{cashierCurrentItem.price}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold">
                  <span>TAX (0%)</span>
                  <span>₹0</span>
                </div>
                <div className="flex justify-between items-center font-black text-slate-900 text-[13px] border-t border-dashed border-slate-250 pt-2 pb-1">
                  <span>TOTAL DUE</span>
                  <span>₹{cashierCurrentItem.price}</span>
                </div>
              </div>

              {/* Cash received and expected change */}
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3 space-y-2 mt-3 text-emerald-800">
                <div className="flex justify-between items-center font-semibold">
                  <span>Cash Received:</span>
                  <span className="font-black">₹{cashierPaidAmount}</span>
                </div>
                <div className="flex justify-between items-center font-black text-[13px] border-t border-emerald-200/50 pt-2 mt-1">
                  <span>CHANGE DUE:</span>
                  <span className="text-emerald-700">₹{cashierPaidAmount - cashierCurrentItem.price}</span>
                </div>

                <button
                  onClick={() => setShowCashierHelp(prev => !prev)}
                  className="w-full mt-1.5 py-1.5 px-3 bg-white hover:bg-emerald-100/50 text-emerald-800 text-[10px] font-black uppercase tracking-wider rounded-lg border border-emerald-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <HelpCircle size={11} className="text-emerald-600" />
                  {showCashierHelp ? "Hide Math Guide" : "Help Me Count! (गणित गाइड)"}
                </button>
              </div>

              {/* Barcode representation */}
              <div className="flex flex-col items-center mt-5 pt-3.5 space-y-1 border-t border-slate-100">
                <div className="h-6.5 w-32 flex justify-between bg-slate-900/10 p-0.5 rounded opacity-60">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className={`h-full bg-slate-800 ${i % 3 === 0 ? 'w-1.5' : i % 2 === 0 ? 'w-0.5' : 'w-1'}`} />
                  ))}
                </div>
                <span className="text-[8px] text-slate-400 select-none">MITHILA-POS-99812</span>
              </div>

              {/* Zig-zag bottom paper effect */}
              <div className="absolute -bottom-2.5 left-0 right-0 h-3 flex overflow-hidden pointer-events-none">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-white rotate-45 transform origin-top-left border border-slate-200/60 -mt-2" />
                ))}
              </div>
            </div>

            {/* "HELP ME COUNT" STEP-BY-STEP MATH ASSISTANT */}
            <AnimatePresence>
              {showCashierHelp && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-amber-50/70 border border-amber-250/50 rounded-2xl p-4 text-left space-y-3 overflow-hidden shadow-sm"
                >
                  <h4 className="text-[11px] font-black text-amber-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-amber-200/60 pb-1.5">
                    <HelpCircle size={13} className="text-amber-700" /> counting assistant (गणित गाइड)
                  </h4>
                  <div className="space-y-2.5">
                    {getChangeGuideSteps(cashierCurrentItem.price, cashierPaidAmount).map((step, idx) => (
                      <div key={idx} className="text-[11px] leading-relaxed text-amber-900 font-semibold">
                        <div className="font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
                          {step.title}
                        </div>
                        <p className="text-[10px] text-amber-800/80 font-medium pl-2.5 mt-0.5">{step.desc}</p>
                        <div className="inline-block bg-white/80 border border-amber-200/50 rounded px-1.5 py-0.5 font-mono text-[9.5px] font-bold text-amber-900 mt-1 ml-2.5">
                          {step.math}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* RIGHT COLUMN: CASH DRAWER & HANDOVER TRAY */}
          <div className="lg:col-span-7 space-y-5">

            {/* CASH REGISTER DRAWER */}
            <div className="bg-slate-800 border-4 border-slate-700 rounded-[28px] p-5 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-700 pb-2.5">
                <div className="flex items-center gap-2">
                  <div>
                    <h4 className="text-[12.5px] font-black text-white uppercase tracking-wider flex items-center gap-1">
                      Cash Register Drawer (कैश ड्रावर)
                    </h4>
                    <p className="text-[10px] text-slate-400 font-medium">Click on notes or coins to move them to the Handover Tray</p>
                  </div>
                </div>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest bg-slate-900/60 px-2 py-1 border border-slate-700 rounded-lg shadow-inner">Drawer Box</span>
              </div>

              {/* Paper Bills Section */}
              <div className="space-y-2.5">
                <div className="text-[9.5px] font-black text-slate-400 uppercase tracking-wider pl-1">Paper Bills (बैंक नोट)</div>
                <div className="grid grid-cols-2 gap-4">
                  {[100, 50, 20, 10].map(val => (
                    <div
                      key={val}
                      className="bg-slate-900/40 border border-slate-700 p-3 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-inner relative group animate-fade-in"
                    >
                      {/* Compartment Label */}
                      <div className="absolute top-1 right-2 text-[8px] font-mono text-slate-505 font-bold">₹{val} Slot</div>

                      {/* Stack of 3D notes */}
                      <div className="relative w-36 h-20 flex items-center justify-center mt-1">
                        {/* Back note */}
                        <div className="absolute top-1 left-1 transform rotate-[-2deg] scale-[0.98] opacity-30">
                          <IndianRupeeNote val={val} disabled={true} />
                        </div>
                        {/* Middle note */}
                        <div className="absolute top-0.5 left-0.5 transform rotate-[1deg] scale-[0.99] opacity-60">
                          <IndianRupeeNote val={val} disabled={true} />
                        </div>
                        {/* Front note (clickable) */}
                        <div className="absolute top-0 left-0">
                          <IndianRupeeNote val={val} onClick={() => addNoteToTray(val)} />
                        </div>
                      </div>

                      {/* Helper indicator */}
                      <button
                        onClick={() => addNoteToTray(val)}
                        className="w-full py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg font-bold text-[10px] text-slate-300 transition-colors uppercase tracking-wider cursor-pointer"
                      >
                        Take ₹{val} Note
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coins Section */}
              <div className="space-y-2.5 pt-3.5 border-t border-slate-700">
                <div className="text-[9.5px] font-black text-slate-400 uppercase tracking-wider pl-1">Metallic Coins (सिक्के)</div>
                <div className="grid grid-cols-3 gap-3">
                  {[5, 2, 1].map(val => (
                    <div
                      key={val}
                      className="bg-slate-900/40 border border-slate-700 p-3 rounded-2xl flex flex-col items-center justify-center gap-3 shadow-inner relative"
                    >
                      <div className="absolute top-1 right-1.5 text-[8px] font-mono text-slate-500 font-bold">₹{val} Slot</div>

                      {/* Stack of Coins */}
                      <div className="relative w-14 h-14 flex items-center justify-center mt-1">
                        {/* Back coin */}
                        <div className="absolute top-1 left-1 transform scale-95 opacity-30">
                          <IndianRupeeCoin val={val} disabled={true} />
                        </div>
                        {/* Middle coin */}
                        <div className="absolute top-0.5 left-0.5 transform scale-98 opacity-60">
                          <IndianRupeeCoin val={val} disabled={true} />
                        </div>
                        {/* Front coin */}
                        <div className="absolute top-0 left-0">
                          <IndianRupeeCoin val={val} onClick={() => addNoteToTray(val)} />
                        </div>
                      </div>

                      <button
                        onClick={() => addNoteToTray(val)}
                        className="w-full py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg font-bold text-[9px] text-slate-300 transition-colors uppercase tracking-wider cursor-pointer"
                      >
                        Take ₹{val} Coin
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* HANDOVER TRAY (हस्तांतरण ट्रे) */}
            <div className="bg-slate-900 rounded-[28px] p-5 text-white border-2 border-slate-800 min-h-[140px] flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

              <div className="flex justify-between items-center text-[10px] text-slate-400 font-black uppercase tracking-wider mb-3 z-10">
                <span className="flex items-center gap-1.5">
                  <Coins size={12} className="text-yellow-400 animate-pulse" />
                  Handover Tray (हस्तांतरण ट्रे)
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[8px] bg-slate-800 text-slate-500 px-2 py-0.5 rounded font-bold normal-case">Click items to return to drawer</span>
                  <button
                    onClick={() => setCashierChangeTray({ 100: 0, 50: 0, 20: 0, 10: 0, 5: 0, 2: 0, 1: 0 })}
                    disabled={Object.values(cashierChangeTray).every(v => v === 0)}
                    className="text-rose-400 hover:text-rose-350 disabled:opacity-30 disabled:pointer-events-none font-black cursor-pointer text-[10px] uppercase tracking-wider transition-colors"
                  >
                    Clear Tray
                  </button>
                </div>
              </div>

              {/* Visual notes and coins in the tray */}
              <div className="flex flex-wrap gap-3 items-center py-4 min-h-[70px] bg-slate-950/40 rounded-2xl border border-slate-800 px-4 z-10 shadow-inner">
                {Object.keys(cashierChangeTray).map(valStr => {
                  const val = parseInt(valStr, 10);
                  const qty = cashierChangeTray[val];
                  if (qty === 0) return null;
                  return Array.from({ length: qty }).map((_, i) => {
                    const isCoin = val <= 5;
                    return (
                      <motion.div
                        key={`${val}-${i}`}
                        initial={{ scale: 0.6, rotate: -15, opacity: 0 }}
                        animate={{ scale: 1, rotate: i % 2 === 0 ? 2 : -2, opacity: 1 }}
                        className="relative cursor-pointer hover:brightness-110 active:scale-95 transition-all"
                        title="Click to remove from tray"
                        onClick={() => removeNoteFromTray(val)}
                      >
                        {isCoin ? (
                          <IndianRupeeCoin val={val} size="sm" />
                        ) : (
                          <IndianRupeeNote val={val} size="sm" />
                        )}
                      </motion.div>
                    );
                  });
                })}
                {Object.values(cashierChangeTray).every(v => v === 0) && (
                  <span className="text-[11px] text-slate-500 font-semibold italic mx-auto">
                    Tray is empty. Click notes or coins in the drawer above to add them here.
                  </span>
                )}
              </div>

              {/* Footer details */}
              <div className="flex justify-between items-center border-t border-slate-800 pt-3 mt-3 z-10">
                <div className="text-[13px] font-bold">
                  Total Tray: <span className="font-mono text-yellow-400 font-black text-base">₹{
                    Object.keys(cashierChangeTray).reduce((sum, val) => sum + parseInt(val, 10) * cashierChangeTray[val], 0)
                  }</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={checkCashierChange}
                    disabled={Object.values(cashierChangeTray).every(v => v === 0)}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:pointer-events-none text-white rounded-xl text-[12px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-md hover:shadow-emerald-950/50"
                  >
                    Hand Over Change 🤝
                  </button>
                  <button
                    onClick={generateNewCashierCustomer}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-[12px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                  >
                    Skip / Next 👤
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Cashier Feedback Dialog Modal */}
      <AnimatePresence>
        {cashierFeedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-[32px] border-4 shadow-2xl p-6 md:p-8 max-w-lg w-full relative overflow-hidden text-left"
              style={{
                borderColor: cashierFeedback.type === 'success' ? '#10b981' : '#f43f5e'
              }}
            >
              {/* Decorative background accents */}
              <div className={`absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 blur-xl pointer-events-none ${cashierFeedback.type === 'success' ? 'bg-emerald-400' : 'bg-rose-500'
                }`} />

              <div className="flex flex-col items-center text-center space-y-4">
                {/* Character speaking section */}
                <div className="flex items-center gap-4 w-full">
                  <div className="shrink-0 w-20 h-20 bg-slate-50 border-2 border-slate-200 rounded-full flex items-center justify-center shadow-md relative">
                    <BoyAvatarSVG
                      expression={cashierFeedback.type === 'success' ? 'smile' : 'surprise'}
                      className="w-16 h-16"
                    />
                    {/* Badge */}
                    <div className={`absolute -bottom-1 -right-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full text-white ${cashierFeedback.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}>
                      {cashierFeedback.isGameFinish ? '🏆 GRADUATE' : cashierFeedback.isLevelUp ? '🚀 LEVEL UP' : cashierFeedback.type === 'success' ? 'SUCCESS' : 'CHECK'}
                    </div>
                  </div>

                  {/* Speech Bubble pointer tail and card */}
                  <div className="relative flex-1 bg-slate-50 border-2 border-slate-200 p-3.5 rounded-2xl text-[12px] font-bold text-slate-705 text-slate-700 leading-relaxed text-left shadow-sm">
                    <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-3.5 h-3.5 bg-slate-50 border-b-2 border-l-2 border-slate-200 rotate-45" />
                    <p className="font-sans font-bold text-slate-805 text-slate-800">
                      {cashierFeedback.isGameFinish
                        ? `🎉 INCREDIBLE! You served all customers correctly and graduated to General Manager!`
                        : cashierFeedback.isLevelUp
                          ? `🎉 AWESOME! You leveled up to Level ${cashierFeedback.newLevel}: ${cashierLevelConfig[cashierFeedback.newLevel]?.title}!`
                          : cashierFeedback.type === 'success'
                            ? `Aha! You got it right! Let's check the change guide below.`
                            : `Wait... let's count together to see why this is different!`}
                    </p>
                  </div>
                </div>

                {/* Big Badge Header */}
                <div className="w-full text-left border-b border-slate-100 pb-3">
                  <div className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-md inline-block ${cashierFeedback.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                    }`}>
                    {cashierFeedback.isGameFinish ? '🏆 Course Completed' : cashierFeedback.isLevelUp ? '🚀 Level Up Cleared' : cashierFeedback.type === 'success' ? '🏆 Correct Change Served' : '⚠️ Counting Guide Alert'}
                  </div>
                  <h3 className="text-base font-black text-slate-800 mt-2">{cashierFeedback.text}</h3>
                </div>

                {/* Always-visible step-by-step Counting assistant in the modal */}
                <div className="w-full bg-amber-50/70 border border-amber-250/50 rounded-2xl p-4 text-left space-y-2.5 shadow-inner">
                  <h4 className="text-[10.5px] font-black text-amber-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-amber-200/40 pb-1.5">
                    <HelpCircle size={13} className="text-amber-700" /> Counting Guide (काउंटिंग गाइड)
                  </h4>
                  <div className="space-y-2">
                    {getChangeGuideSteps(cashierCurrentItem.price, cashierPaidAmount).map((step, idx) => (
                      <div key={idx} className="text-[11px] leading-relaxed text-amber-900 font-sans">
                        <div className="font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
                          {step.title}
                        </div>
                        <p className="text-[10px] text-amber-800/80 font-medium pl-2.5 mt-0.5">{step.desc}</p>
                        <div className="inline-block bg-white/90 border border-amber-200/50 rounded px-1.5 py-0.5 font-mono text-[9px] font-bold text-amber-900 mt-1 ml-2.5 shadow-sm">
                          {step.math}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 w-full pt-2">
                  {cashierFeedback.type === 'success' ? (
                    cashierFeedback.isGameFinish ? (
                      <button
                        onClick={() => {
                          setCashierFeedback(null);
                          setCashierGameFinished(true);
                        }}
                        className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-lg hover:shadow-amber-500/20 text-center"
                      >
                        Claim Graduation Badge! 🎓
                      </button>
                    ) : cashierFeedback.isLevelUp ? (
                      <button
                        onClick={() => generateNewCashierCustomer(cashierLevel)}
                        className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-lg hover:shadow-indigo-600/20 text-center"
                      >
                        Next Level 🚀
                      </button>
                    ) : (
                      <button
                        onClick={() => generateNewCashierCustomer(cashierLevel)}
                        className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-lg hover:shadow-emerald-600/20 text-center"
                      >
                        Next Customer ➡️
                      </button>
                    )
                  ) : (
                    <>
                      <button
                        onClick={() => setCashierFeedback(null)}
                        className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md text-center"
                      >
                        Try Again 🔄
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CashierLab;
