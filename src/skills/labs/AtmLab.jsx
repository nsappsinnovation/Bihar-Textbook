import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Shield, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

const AtmLab = () => {
  // --- ATM Simulator State ---
  const [atmStep, setAtmStep] = useState('insert');
  const [pinInput, setPinInput] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedAccountType, setSelectedAccountType] = useState('');
  const [atmError, setAtmError] = useState('');

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

  return (
    <div className="bg-white rounded-[32px] border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.03)] p-6 md:p-8">
      <div className="w-full text-left space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-800 tracking-tight">ATM Simulator</h2>
            <p className="text-[13px] text-slate-500 font-semibold mt-1">Practice withdrawing cash safely.</p>
          </div>
          <button
            onClick={resetAtm}
            className="p-2.5 bg-white hover:bg-slate-50 rounded-xl text-slate-500 border border-slate-200 hover:border-slate-350 transition-all cursor-pointer shadow-sm flex items-center justify-center"
            title="Reset ATM Simulator"
          >
            <RefreshCw size={15} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 items-start mt-6">
          {/* LEFT COLUMN: ATM GUIDE & INSTRUCTIONS */}
          <div className="lg:col-span-5 space-y-5 pl-18">
            <div className="bg-slate-50 rounded-2xl py-5 pl-7 pr-5 border border-slate-200/60 shadow-sm space-y-4">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2 -ml-2">
                <Shield size={16} className="text-teal-600" /> ATM Operation Guide
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
                      className={`flex items-start gap-3.5 p-3 rounded-xl border transition-all ${isActive
                        ? 'bg-teal-50 border-teal-300 text-teal-800 shadow-sm ring-1 ring-teal-300/30'
                        : isCompleted
                          ? 'bg-slate-100/80 border-slate-200 text-slate-400 opacity-75'
                          : 'bg-white border-slate-150 text-slate-400'
                        }`}
                    >
                      <div className={`w-5.5 h-5.5 rounded-full flex items-center justify-center text-[10.5px] font-black shrink-0 ${isActive
                        ? 'bg-teal-600 text-white'
                        : isCompleted
                          ? 'bg-slate-400 text-white'
                          : 'bg-slate-200 text-slate-400'
                        }`}>
                        {isCompleted ? '✓' : idx + 1}
                      </div>
                      <div className="space-y-0.5 text-left font-semibold">
                        <div className="text-[12px] font-black leading-tight text-slate-700">{step.label}</div>
                        <div className="text-[10px] opacity-90 leading-tight font-medium text-slate-500">{step.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-amber-50/70 rounded-2xl py-5 pl-7 pr-5 border border-amber-200/50 space-y-3">
              <h4 className="text-[12px] font-black uppercase text-amber-700 tracking-wider flex items-center gap-1.5 -ml-2">
                <Shield size={14} className="text-amber-600 animate-pulse" /> Security Guidelines
              </h4>
              <ul className="text-[11.5px] text-amber-900/90 space-y-2.5 list-disc list-outside pl-4 font-bold leading-relaxed">
                <li>Always cover the keypad with your free hand while typing your secret PIN.</li>
                <li>Ensure no one else is standing close to you inside the ATM room.</li>
                <li>Inspect the card reader slot for any extra attachments (skimmers) before inserting card.</li>
                <li>Never share your ATM PIN with any stranger.</li>
                <li>Wait for the screen to show "Welcome" before leaving the ATM chamber.</li>
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE ATM MACHINE */}
          <div className="lg:col-span-7 flex justify-center w-full">
            {/* PHYSICAL ATM CABINET CASING */}
            <div className="bg-gradient-to-b from-[#1e293b] via-[#334155] to-[#0f172a] border-[12px] border-[#94a3b8] rounded-[32px] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.25)] space-y-4 w-full max-w-[530px] relative border-double">
              {/* Top Banner/Engraving */}
              <div className="bg-[#003b80] text-white py-2 px-3 rounded-xl text-center shadow-inner border border-[#002a60] flex flex-col items-center select-none">
                <span className="text-[13px] font-black tracking-widest">BIHAR GRAMIN BANK</span>
                <span className="text-[9px] text-sky-200 font-bold uppercase tracking-wider">Automated Teller Machine</span>
              </div>

              {/* ATM Screen and Side Buttons Group */}
              <div className="flex items-center gap-3.5 bg-[#111827] p-4 rounded-[24px] shadow-inner border border-slate-800">
                {/* LEFT SIDE PHYSICAL BUTTONS */}
                <div className="flex flex-col justify-around h-[240px] py-4 shrink-0">
                  {[1, 2, 3].map(btnIdx => (
                    <button
                      key={`left-btn-${btnIdx}`}
                      onClick={() => {
                        if (atmStep === 'option') {
                          toast.error("Simulation: Fast Cash is disabled. Please choose Cash Withdrawal.");
                        } else if (atmStep === 'accountType') {
                          setSelectedAccountType('Current');
                          setAtmStep('amountInput');
                        } else if (atmStep === 'amountInput' && btnIdx === 3) {
                          setSelectedAmount('');
                        }
                      }}
                      className="w-5 h-5 bg-gradient-to-r from-slate-300 via-slate-200 to-slate-400 hover:from-slate-200 hover:to-slate-350 rounded-full border border-slate-500 shadow-[0_2px_4px_rgba(0,0,0,0.3)] active:scale-90 transition-all cursor-pointer"
                    />
                  ))}
                </div>

                {/* DIGITAL DISPLAY SCREEN */}
                <div className="flex-1 bg-gradient-to-b from-[#0284c7] to-[#0369a1] border border-slate-900 rounded-xl h-[240px] p-3.5 flex flex-col justify-between relative overflow-hidden font-sans shadow-inner text-white select-none">
                  {/* Glass Glare Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-10" />

                  {/* Screen Header */}
                  <div className="border-b border-white/20 pb-1 flex justify-between items-center text-[9px] font-bold tracking-wide">
                    <span className="flex items-center gap-1">🏦 BIHAR GRAMIN BANK</span>
                    <span className="text-[8px] text-sky-200">BIHAR GRAMIN BANK</span>
                  </div>

                  {/* SCREEN CONTENT */}
                  {atmStep === 'insert' && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 py-1 z-20">
                      <CreditCard className="w-12 h-12 text-sky-200 animate-bounce" />
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-black tracking-wide text-white">WELCOME TO BIHAR GRAMIN BANK</h4>
                        <p className="text-[9px] text-sky-100 font-bold">Please insert your card</p>
                      </div>
                      <button
                        onClick={() => setAtmStep('language')}
                        className="px-5 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-450 text-slate-950 rounded-xl text-[10px] font-black uppercase transition-all shadow-md cursor-pointer active:scale-95"
                      >
                        Insert Card
                      </button>
                    </div>
                  )}

                  {atmStep === 'language' && (
                    <div className="flex-1 flex flex-col justify-between py-2 text-right z-20">
                      <div className="text-center">
                        <h4 className="text-xs font-black text-white">PLEASE SELECT LANGUAGE</h4>
                        <p className="text-[9px] text-sky-100">Select an option below</p>
                      </div>
                      <div className="space-y-3.5 pr-0.5 text-right flex flex-col items-end">
                        <button
                          onClick={() => {
                            setSelectedLanguage('English');
                            setAtmStep('option');
                          }}
                          className="w-[120px] py-1.5 bg-sky-950/70 hover:bg-sky-600 border border-sky-400/35 hover:border-sky-300 text-white rounded-lg text-[10px] font-black text-center cursor-pointer shadow-sm"
                        >
                          ENGLISH ➔
                        </button>
                        <button
                          onClick={() => {
                            setSelectedLanguage('Hindi');
                            setAtmStep('option');
                          }}
                          className="w-[120px] py-1.5 bg-sky-950/70 hover:bg-sky-600 border border-sky-400/35 hover:border-sky-300 text-white rounded-lg text-[10px] font-black text-center cursor-pointer shadow-sm"
                        >
                          HINDI ➔
                        </button>
                      </div>
                    </div>
                  )}

                  {atmStep === 'option' && (
                    <div className="flex-1 flex flex-col justify-between py-1.5 z-20">
                      <h4 className="text-xs font-black text-center text-white">SELECT TRANSACTION</h4>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-3 mt-1.5">
                        <div className="space-y-2 text-left">
                          <button
                            onClick={() => toast.error("Simulation: Fast Cash is disabled. Please choose Cash Withdrawal.")}
                            className="w-full text-left pl-1.5 py-1 bg-sky-950/45 text-[9px] font-black rounded border border-transparent hover:border-sky-300 cursor-pointer"
                          >
                            ⬳ FAST CASH
                          </button>
                          <button
                            onClick={() => toast.error("Simulation: Balance Inquiry is disabled. Please choose Cash Withdrawal.")}
                            className="w-full text-left pl-1.5 py-1 bg-sky-950/45 text-[9px] font-black rounded border border-transparent hover:border-sky-300 cursor-pointer"
                          >
                            ⬳ BALANCE INQUIRY
                          </button>
                        </div>
                        <div className="space-y-2 text-right flex flex-col items-end">
                          <button
                            onClick={() => setAtmStep('accountType')}
                            className="w-[125px] py-1 bg-amber-400 text-slate-900 text-[9px] font-black rounded-lg text-center shadow-md hover:bg-amber-300 cursor-pointer"
                          >
                            CASH WITHDRAWAL ➔
                          </button>
                          <button
                            onClick={() => toast.error("Simulation: PIN Change is disabled.")}
                            className="w-[125px] py-1 bg-sky-950/45 text-white text-[9px] font-black rounded-lg border border-sky-400/20 text-center cursor-pointer"
                          >
                            PIN CHANGE ➔
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {atmStep === 'accountType' && (
                    <div className="flex-1 flex flex-col justify-between py-2 z-20">
                      <div className="text-center">
                        <h4 className="text-xs font-black text-white">SELECT ACCOUNT TYPE</h4>
                        <p className="text-[9px] text-sky-100">Choose an account type</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="text-left">
                          <button
                            onClick={() => {
                              setSelectedAccountType('Current');
                              setAtmStep('amountInput');
                            }}
                            className="w-full text-left pl-1.5 py-1.5 bg-sky-950/50 text-[9px] font-black rounded border border-sky-400/20 hover:border-sky-300 cursor-pointer"
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
                            className="w-[110px] py-1.5 bg-amber-400 text-slate-900 text-[9px] font-black rounded-lg text-center shadow-md hover:bg-amber-300 cursor-pointer"
                          >
                            SAVINGS A/C ➔
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {atmStep === 'amountInput' && (
                    <div className="flex-1 flex flex-col justify-between py-1.5 z-20">
                      <div className="text-center space-y-0.5">
                        <h4 className="text-xs font-black text-white">ENTER AMOUNT TO WITHDRAW</h4>
                        <p className="text-[8px] text-sky-105 font-bold">Multiples of ₹100 | Maximum ₹10,000</p>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="w-[150px] bg-slate-950/90 border-2 border-sky-400 rounded-xl p-2 text-center text-yellow-400 text-base font-black font-mono tracking-wider relative shadow-inner">
                          ₹ {selectedAmount || '0'}
                          <span className="animate-ping absolute right-3">|</span>
                        </div>
                        {atmError && (
                          <p className="text-[9px] text-red-200 font-bold mt-1.5 flex items-center gap-1 bg-red-950/65 px-2.5 py-1 rounded border border-red-800/40">
                            <AlertCircle size={9} /> {atmError}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <div className="text-left">
                          <button
                            onClick={() => setSelectedAmount('')}
                            className="w-full text-left pl-1.5 py-1.5 bg-sky-950/50 text-[9px] font-black rounded border border-sky-400/20 hover:bg-sky-850 cursor-pointer"
                          >
                            ⬳ CLEAR
                          </button>
                        </div>
                        <div className="text-right flex flex-col items-end">
                          <button
                            onClick={handlePinSubmit}
                            className="w-[110px] py-1.5 bg-amber-400 text-slate-900 text-[9px] font-black rounded-lg text-center shadow-md hover:bg-amber-300 cursor-pointer"
                          >
                            CONFIRM ➔
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {atmStep === 'pin' && (
                    <div className="flex-1 flex flex-col justify-between py-1.5 z-20">
                      <div className="text-center space-y-0.5">
                        <h4 className="text-xs font-black text-white">ENTER YOUR SECRET PIN</h4>
                        <p className="text-[8px] text-sky-200 font-bold">Keep your PIN secret for security</p>
                      </div>

                      <div className="flex flex-col items-center py-1.5">
                        <div className="flex gap-2">
                          {[0, 1, 2, 3].map(idx => (
                            <div
                              key={idx}
                              className="w-9 h-9 border-2 border-sky-400/80 rounded-xl flex items-center justify-center text-base text-yellow-400 font-black bg-[#061e38] shadow-inner"
                            >
                              {pinInput[idx] ? '●' : ''}
                            </div>
                          ))}
                        </div>
                        {atmError && (
                          <p className="text-[9px] text-red-200 font-bold mt-1.5 flex items-center gap-1 bg-red-950/65 px-2.5 py-1 rounded border border-red-800/40">
                            <AlertCircle size={9} /> {atmError}
                          </p>
                        )}
                      </div>

                      <div className="text-right flex flex-col items-end mt-0.5">
                        <button
                          onClick={handlePinSubmit}
                          className="w-[110px] py-1.5 bg-amber-400 text-slate-900 text-[9px] font-black rounded-lg text-center shadow-md hover:bg-amber-350 cursor-pointer"
                        >
                          ENTER ➔
                        </button>
                      </div>
                    </div>
                  )}

                  {atmStep === 'processing' && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 py-1.5 z-20">
                      <div className="w-10 h-10 rounded-full border-4 border-t-yellow-400 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-sky-100">TRANSACTION PROCESSING</h4>
                        <p className="text-[9px] text-sky-250 font-bold">Please wait...</p>
                      </div>
                    </div>
                  )}

                  {atmStep === 'dispensing' && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 py-1.5 z-20">
                      <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.2 }}
                        className="text-4xl"
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
                    <div className="flex-1 flex flex-col justify-between py-2 text-center font-bold z-20">
                      <div className="flex flex-col items-center space-y-1">
                        <div className="w-10 h-10 bg-teal-500/10 rounded-full flex items-center justify-center text-teal-300 border border-teal-500/30">
                          <CheckCircle2 size={24} />
                        </div>
                        <h4 className="text-xs font-black text-teal-300">TRANSACTION SUCCESS</h4>
                        <p className="text-[8.5px] text-sky-100 leading-normal">
                          Please remove your card.<br />
                          Thank you for banking with State Bank.
                        </p>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <button
                          onClick={resetAtm}
                          className="w-[110px] py-1.5 bg-amber-400 text-slate-900 text-[9px] font-black rounded-lg text-center shadow-md hover:bg-amber-350 cursor-pointer"
                        >
                          COMPLETE ➔
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Screen Footer */}
                  <div className="border-t border-white/10 pt-1 flex justify-between text-[7.5px] text-sky-200 font-medium">
                    <span>{selectedLanguage ? `Lang: ${selectedLanguage}` : 'Choose Language'}</span>
                    <span>{selectedAccountType ? `A/C: ${selectedAccountType}` : 'Secure Session'}</span>
                  </div>
                </div>

                {/* RIGHT SIDE PHYSICAL BUTTONS */}
                <div className="flex flex-col justify-around h-[240px] py-4 shrink-0">
                  {[1, 2, 3].map(btnIdx => (
                    <button
                      key={`right-btn-${btnIdx}`}
                      onClick={() => {
                        if (atmStep === 'language') {
                          setSelectedLanguage(btnIdx === 1 ? 'English' : 'Hindi');
                          setAtmStep('option');
                        } else if (atmStep === 'option') {
                          if (btnIdx === 1) {
                            setAtmStep('accountType');
                          } else if (btnIdx === 2) {
                            toast.error("Simulation: PIN Change is disabled.");
                          }
                        } else if (atmStep === 'accountType') {
                          if (btnIdx === 1) {
                            setSelectedAccountType('Savings');
                            setAtmStep('amountInput');
                          }
                        } else if (atmStep === 'amountInput' || atmStep === 'pin') {
                          if (btnIdx === 3) handlePinSubmit();
                        } else if (atmStep === 'success' && btnIdx === 3) {
                          resetAtm();
                        }
                      }}
                      className="w-5 h-5 bg-gradient-to-r from-slate-300 via-slate-200 to-slate-400 hover:from-slate-200 hover:to-slate-350 rounded-full border border-slate-500 shadow-[0_2px_4px_rgba(0,0,0,0.3)] active:scale-90 transition-all cursor-pointer"
                    />
                  ))}
                </div>
              </div>

              {/* MIDDLE ROW: RECEIPT PRINTER & CARD SLOT */}
              <div className="grid grid-cols-2 gap-3 pt-0.5">
                {/* Receipt Printer */}
                <div className="bg-[#111827] border border-slate-700 p-3 rounded-2xl flex items-center justify-between text-white shadow-inner select-none">
                  <div className="text-[8.5px] font-black text-slate-300 tracking-wider leading-none">
                    RECEIPT
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1 shadow-sm shadow-teal-500/50 animate-pulse" />
                  </div>
                  <div className="w-20 h-1 bg-slate-950 rounded shadow-inner relative overflow-hidden">
                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-slate-200 animate-bounce" />
                  </div>
                </div>

                {/* Card Reader Slot */}
                <div className="bg-[#111827] border border-slate-700 p-3 rounded-2xl flex items-center justify-between text-white shadow-inner select-none">
                  <div className="text-[8.5px] font-black text-slate-300 tracking-wider leading-none">
                    CARD SLOT
                    <div className={`w-1.5 h-1.5 rounded-full mt-1 shadow-sm ${atmStep === 'insert'
                      ? 'bg-green-500 shadow-green-500/50 animate-pulse'
                      : 'bg-slate-500'
                      }`} />
                  </div>

                  <div className="relative w-18 h-4 bg-slate-950 border border-slate-800 rounded flex items-center justify-center overflow-hidden">
                    <div className={`w-12 h-0.5 bg-green-500 rounded ${atmStep === 'insert' ? 'animate-pulse' : 'bg-slate-850'
                      }`} />
                  </div>
                </div>
              </div>

              {/* LOWER ROW: CASH DISPENSER SHUTTER */}
              <div className="bg-[#111827] border border-slate-700 p-2.5 rounded-2xl text-center text-white shadow-inner space-y-0.5 select-none">
                <div className="flex justify-between items-center text-[8.5px] font-black text-slate-300 tracking-widest px-1">
                  <span>CASH DISPENSING SLOT</span>
                  <div className={`w-1.5 h-1.5 rounded-full ${atmStep === 'dispensing'
                    ? 'bg-green-500 shadow-green-500/50 animate-ping'
                    : 'bg-red-500'
                    }`} />
                </div>

                <div className="w-full h-8 bg-slate-950 rounded-lg relative overflow-hidden flex items-center justify-center border-t border-slate-900 shadow-inner">
                  {atmStep === 'dispensing' ? (
                    <motion.div
                      initial={{ y: 15 }}
                      animate={{ y: 0 }}
                      className="text-[11px] font-black text-teal-450 animate-bounce flex items-center gap-1.5 cursor-pointer select-none"
                      onClick={() => setAtmStep('success')}
                    >
                      💵 Take ₹{selectedAmount} Cash (Click here)
                    </motion.div>
                  ) : (
                    <div className="w-[85%] h-0.5 bg-slate-800 rounded animate-pulse" />
                  )}
                </div>
              </div>

              {/* ATM PHYSICAL KEYPAD (Slanted panel look) */}
              <div className="bg-[#1e293b] border-t border-slate-700 rounded-2xl p-4 shadow-inner">
                <div className="grid grid-cols-4 gap-3 max-w-[380px] mx-auto">
                  <div className="col-span-3 grid grid-cols-3 gap-2.5">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                      <button
                        key={num}
                        onClick={() => handlePinClick(num)}
                        disabled={atmStep !== 'pin' && atmStep !== 'amountInput'}
                        className="py-2.5 bg-gradient-to-b from-slate-200 to-slate-350 hover:from-slate-100 hover:to-slate-300 text-slate-800 font-mono font-black text-[13px] rounded-lg border border-slate-400 border-b-4 border-slate-550 shadow-md active:translate-y-0.5 active:border-b-2 disabled:opacity-40 transition-all text-center cursor-pointer"
                      >
                        {num}
                      </button>
                    ))}
                    <button disabled={true} className="py-2.5 bg-gradient-to-b from-slate-300 to-slate-400 text-slate-500 font-bold rounded-lg border-b-4 border-slate-500 disabled:opacity-35">*</button>
                    <button
                      key={0}
                      onClick={() => handlePinClick(0)}
                      disabled={atmStep !== 'pin' && atmStep !== 'amountInput'}
                      className="py-2.5 bg-gradient-to-b from-slate-200 to-slate-355 hover:from-slate-100 hover:to-slate-300 text-slate-800 font-mono font-black text-[13px] rounded-lg border border-slate-400 border-b-4 border-slate-550 shadow-md active:translate-y-0.5 active:border-b-2 disabled:opacity-40 transition-all text-center cursor-pointer"
                    >
                      0
                    </button>
                    <button disabled={true} className="py-2.5 bg-gradient-to-b from-slate-300 to-slate-400 text-slate-505 text-slate-500 font-bold rounded-lg border-b-4 border-slate-500 disabled:opacity-35">#</button>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={handlePinDelete}
                      disabled={atmStep !== 'pin' && atmStep !== 'amountInput'}
                      className="flex-1 py-2 bg-gradient-to-b from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-450 border border-amber-500 border-b-4 border-amber-700 text-slate-950 font-black text-[10px] rounded-lg shadow-md active:translate-y-0.5 active:border-b-2 disabled:opacity-40 transition-all flex items-center justify-center cursor-pointer"
                    >
                      CLEAR
                    </button>
                    <button
                      onClick={resetAtm}
                      className="flex-1 py-2 bg-gradient-to-b from-rose-500 to-rose-600 hover:from-rose-450 hover:to-rose-550 border border-rose-600 border-b-4 border-rose-800 text-white font-black text-[10px] rounded-lg shadow-md active:translate-y-0.5 active:border-b-2 transition-all flex items-center justify-center cursor-pointer"
                    >
                      CANCEL
                    </button>
                    <button
                      onClick={handlePinSubmit}
                      disabled={atmStep !== 'pin' && atmStep !== 'amountInput'}
                      className="flex-1 py-2 bg-gradient-to-b from-teal-500 to-teal-600 hover:from-teal-450 hover:to-teal-550 border border-teal-600 border-b-4 border-teal-800 text-white font-black text-[10px] rounded-lg shadow-md active:translate-y-0.5 active:border-b-2 disabled:opacity-40 transition-all flex items-center justify-center cursor-pointer"
                    >
                      ENTER
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtmLab;
