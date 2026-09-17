import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Droplet, Leaf, Snowflake, PlusSquare, Scissors, Hand, ArrowUp, ArrowDown, Activity, Bug, ShieldAlert, CheckCircle, AlertTriangle, RefreshCw, XCircle, Eye, UserX, Wind } from 'lucide-react';

const scenarios = [
  {
    id: 'burn',
    title: 'Minor Heat Burn',
    desc: 'A minor burn from touching a hot surface or liquid. The skin is red and painful, but not blistered.',
    icon: <Flame size={24} />,
    steps: ['cool-water', 'aloe-vera', 'loose-gauze'],
    options: [
      { id: 'ice-pack', label: 'Ice Pack', icon: <Snowflake size={20} />, isError: true, errorMsg: 'Never apply ice to fresh burns! Extreme cold causes frostbite-like damage to raw tissues.' },
      { id: 'cool-water', label: 'Cool Running Water', icon: <Droplet size={20} /> },
      { id: 'aloe-vera', label: 'Aloe Vera Gel', icon: <Leaf size={20} /> },
      { id: 'loose-gauze', label: 'Loose Gauze Roll', icon: <ShieldAlert size={20} /> }
    ],
    hints: {
      'cool-water': 'First, cool the burn immediately under running water to stop tissue damage.',
      'aloe-vera': 'Apply soothing aloe vera to hydrate and calm the skin.',
      'loose-gauze': 'Wrap loosely to protect the burn from friction and air exposure.'
    }
  },
  {
    id: 'scrape',
    title: 'Scraped Knee',
    desc: 'A surface-level scrape from a fall. There is minor bleeding and some dirt in the wound.',
    icon: <Activity size={24} />,
    steps: ['wash', 'antiseptic', 'bandage'],
    options: [
      { id: 'wash', label: 'Sterile Water Wash', icon: <Droplet size={20} /> },
      { id: 'antiseptic', label: 'Antiseptic Cream', icon: <PlusSquare size={20} /> },
      { id: 'tweezer', label: 'Tweezers', icon: <Scissors size={20} />, isError: true, errorMsg: 'There are no splinters to remove. Using tweezers will just irritate the raw scrape!' },
      { id: 'bandage', label: 'Adhesive Bandage', icon: <ShieldAlert size={20} /> }
    ],
    hints: {
      'wash': 'First, thoroughly wash away dirt and bacteria with sterile water.',
      'antiseptic': 'Apply antiseptic cream to prevent infection.',
      'bandage': 'Cover the scrape with a bandage to protect it while it heals.'
    }
  },
  {
    id: 'bee-sting',
    title: 'Bee Sting',
    desc: 'A bee stung the arm. The area is swelling, red, and itching heavily. The stinger is still visible.',
    icon: <Bug size={24} />,
    steps: ['scrape-stinger', 'ice-pack', 'antihistamine'],
    options: [
      { id: 'scrape-stinger', label: 'Scrape Stinger', icon: <Scissors size={20} /> },
      { id: 'ice-pack', label: 'Ice Pack', icon: <Snowflake size={20} /> },
      { id: 'antihistamine', label: 'Antihistamine Cream', icon: <PlusSquare size={20} /> },
      { id: 'heat-pad', label: 'Warm Compress', icon: <Flame size={20} />, isError: true, errorMsg: 'Warmth increases blood flow and swelling, which spreads the venom! Always use cold for stings.' }
    ],
    hints: {
      'scrape-stinger': 'First, gently scrape the stinger away. Do not squeeze it, or more venom will release.',
      'ice-pack': 'Apply an ice pack to reduce local swelling and numb the pain.',
      'antihistamine': 'Apply antihistamine cream to block the allergic itching reaction.'
    }
  },
  {
    id: 'nosebleed',
    title: 'Sudden Nosebleed',
    desc: 'Due to dry air, a sudden nosebleed has started. The patient is sitting upright.',
    icon: <Droplet size={24} />,
    steps: ['lean-forward', 'pinch-nose', 'cold-pack'],
    options: [
      { id: 'lean-forward', label: 'Lean Head Forward', icon: <ArrowUp size={20} /> },
      { id: 'lean-backward', label: 'Lean Head Backward', icon: <ArrowDown size={20} />, isError: true, errorMsg: 'Never lean back! Blood will run down the throat, causing choking or nausea.' },
      { id: 'pinch-nose', label: 'Pinch Soft Bridge', icon: <Hand size={20} /> },
      { id: 'cold-pack', label: 'Cold Pack on Neck', icon: <Snowflake size={20} /> }
    ],
    hints: {
      'lean-forward': 'Lean forward so the blood drains out the nose, not down the throat.',
      'pinch-nose': 'Pinch the soft part of the nose firmly for 10 minutes to stop the bleeding.',
      'cold-pack': 'Apply a cold pack to the back of the neck to constrict blood vessels.'
    }
  },
  {
    id: 'sprain',
    title: 'Sprained Ankle',
    desc: 'The ankle was twisted during sports. It is starting to swell rapidly and hurts to put weight on.',
    icon: <Activity size={24} />,
    steps: ['ice-pack', 'elastic-wrap', 'elevate'],
    options: [
      { id: 'ice-pack', label: 'Ice Pack', icon: <Snowflake size={20} /> },
      { id: 'elastic-wrap', label: 'Elastic Wrap', icon: <ShieldAlert size={20} /> },
      { id: 'elevate', label: 'Elevate Leg', icon: <ArrowUp size={20} /> },
      { id: 'heat-pad', label: 'Heat Pad', icon: <Flame size={20} />, isError: true, errorMsg: 'Heat increases blood flow and worsens swelling on fresh sprains! Use ice initially.' }
    ],
    hints: {
      'ice-pack': 'Apply ice immediately to reduce internal bleeding and swelling.',
      'elastic-wrap': 'Wrap the ankle with an elastic bandage to compress and stabilize the joint.',
      'elevate': 'Elevate the leg above heart level to drain fluid and reduce throbbing pain.'
    }
  },
  {
    id: 'choking',
    title: 'Choking Episode',
    desc: 'The person is clutching their throat, unable to speak or cough, and their face is turning red.',
    icon: <UserX size={24} />,
    steps: ['encourage-cough', 'back-blows', 'abdominal-thrusts'],
    options: [
      { id: 'encourage-cough', label: 'Encourage Coughing', icon: <Wind size={20} /> },
      { id: 'back-blows', label: '5 Firm Back Blows', icon: <Hand size={20} /> },
      { id: 'abdominal-thrusts', label: 'Abdominal Thrusts', icon: <Activity size={20} /> },
      { id: 'drink-water', label: 'Give Water', icon: <Droplet size={20} />, isError: true, errorMsg: 'Never give water to someone actively choking! It can push the object deeper or enter the lungs.' }
    ],
    hints: {
      'encourage-cough': 'If they can still cough slightly, encourage them to keep coughing forcefully.',
      'back-blows': 'If coughing fails, deliver 5 firm back blows between the shoulder blades.',
      'abdominal-thrusts': 'If back blows fail, perform abdominal thrusts (Heimlich Maneuver) to force the object out.'
    }
  },
  {
    id: 'fainting',
    title: 'Fainting (Syncope)',
    desc: 'The patient felt dizzy and briefly lost consciousness. They are breathing normally but still lying on the floor.',
    icon: <Activity size={24} />,
    steps: ['lay-flat', 'elevate-legs', 'loosen-clothes'],
    options: [
      { id: 'lay-flat', label: 'Keep Laying Flat', icon: <ArrowDown size={20} /> },
      { id: 'elevate-legs', label: 'Elevate Legs', icon: <ArrowUp size={20} /> },
      { id: 'loosen-clothes', label: 'Loosen Clothing', icon: <Scissors size={20} /> },
      { id: 'sit-up', label: 'Force to Sit Up', icon: <UserX size={20} />, isError: true, errorMsg: 'Do not force them to sit up immediately! Blood needs to continue flowing back to the brain.' }
    ],
    hints: {
      'lay-flat': 'Keep the patient lying completely flat on their back.',
      'elevate-legs': 'Elevate their legs about 12 inches to restore blood flow to the brain.',
      'loosen-clothes': 'Loosen tight collars or belts to ensure unrestricted breathing.'
    }
  },
  {
    id: 'eye-debris',
    title: 'Dust or Sand in Eye',
    desc: 'Wind blew dust into the patient\'s eye. It is watering profusely and feels scratchy.',
    icon: <Eye size={24} />,
    steps: ['wash-hands', 'blink', 'flush-water'],
    options: [
      { id: 'wash-hands', label: 'Wash Hands', icon: <Droplet size={20} /> },
      { id: 'blink', label: 'Blink Repeatedly', icon: <Eye size={20} /> },
      { id: 'flush-water', label: 'Flush with Water', icon: <Droplet size={20} /> },
      { id: 'rub-eye', label: 'Rub the Eye', icon: <Hand size={20} />, isError: true, errorMsg: 'Never rub the eye! The sand particles will scratch the delicate cornea.' }
    ],
    hints: {
      'wash-hands': 'Always wash your hands with soap before touching near the eyes.',
      'blink': 'Encourage rapid blinking to let natural tears wash out the debris.',
      'flush-water': 'If blinking fails, gently flush the eye with a stream of clean water.'
    }
  },
  {
    id: 'splinter',
    title: 'Wooden Splinter',
    desc: 'A small wooden splinter is embedded in the finger. It is painful to touch.',
    icon: <Scissors size={24} />,
    steps: ['wash-hands', 'tweezer', 'bandage'],
    options: [
      { id: 'wash-hands', label: 'Wash with Soap', icon: <Droplet size={20} /> },
      { id: 'tweezer', label: 'Use Tweezers', icon: <Scissors size={20} /> },
      { id: 'bandage', label: 'Apply Bandage', icon: <ShieldAlert size={20} /> },
      { id: 'squeeze', label: 'Squeeze Skin', icon: <Hand size={20} />, isError: true, errorMsg: 'Never squeeze the skin! It can shatter the splinter or push it deeper into the tissue.' }
    ],
    hints: {
      'wash-hands': 'Wash the area to prevent dirt from entering the open skin.',
      'tweezer': 'Gently pull the splinter out at the exact angle it went in using sterile tweezers.',
      'bandage': 'Cover the tiny puncture wound to prevent infection.'
    }
  },
  {
    id: 'asthma',
    title: 'Asthma Attack',
    desc: 'The patient is wheezing, clutching their chest, and struggling to catch their breath.',
    icon: <Wind size={24} />,
    steps: ['sit-upright', 'inhaler', 'calm-breathing'],
    options: [
      { id: 'sit-upright', label: 'Sit Upright', icon: <ArrowUp size={20} /> },
      { id: 'inhaler', label: 'Assist with Inhaler', icon: <PlusSquare size={20} /> },
      { id: 'calm-breathing', label: 'Encourage Slow Breaths', icon: <Activity size={20} /> },
      { id: 'lay-down', label: 'Lay Patient Down', icon: <ArrowDown size={20} />, isError: true, errorMsg: 'Do not lay the patient down! Lying flat restricts lung expansion and makes breathing harder.' }
    ],
    hints: {
      'sit-upright': 'Have the patient sit upright to allow maximum lung expansion.',
      'inhaler': 'Help them find and use their prescribed reliever inhaler.',
      'calm-breathing': 'Take slow, calm breaths with them to reduce panic and hyperventilation.'
    }
  }
];

const FirstAidLab = () => {
  const { t } = useTranslation();
  const [activeScenarioId, setActiveScenarioId] = useState(scenarios[0].id);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [feedback, setFeedback] = useState(null);

  const activeScenario = scenarios.find(s => s.id === activeScenarioId);
  const isCompleted = completedSteps.length === activeScenario.steps.length;

  const handleSelectScenario = (id) => {
    setActiveScenarioId(id);
    setCompletedSteps([]);
    setFeedback(null);
  };

  const handleToolClick = (option) => {
    if (isCompleted) return;

    if (option.isError) {
      setFeedback({ type: 'error', message: option.errorMsg });
      return;
    }

    const expectedStep = activeScenario.steps[completedSteps.length];
    
    if (option.id === expectedStep) {
      const newSteps = [...completedSteps, option.id];
      setCompletedSteps(newSteps);
      setFeedback({ type: 'success', message: activeScenario.hints[option.id] });
    } else {
      // It's a correct tool, but used in the wrong order
      setFeedback({ type: 'warning', message: 'That is the right supply, but not the right time. Follow the correct medical protocol order!' });
    }
  };

  const handleReset = () => {
    setCompletedSteps([]);
    setFeedback(null);
  };

  return (
    <div className="bg-white rounded-[32px] border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.03)] p-6 md:p-8">
      <div className="w-full text-left space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-800 tracking-tight">First Aid Protocol Guide</h2>
            <p className="text-[13px] text-slate-500 font-medium mt-1">Learn the correct medical procedures and supplies for common emergencies.</p>
          </div>
          <button
            onClick={handleReset}
            className="p-2.5 bg-white hover:bg-slate-50 rounded-xl text-slate-500 border border-slate-200 hover:border-slate-350 transition-all cursor-pointer shadow-sm flex items-center justify-center shrink-0"
            title="Reset Protocol"
          >
            <RefreshCw size={15} />
          </button>
        </div>

        {/* Main Layout Stack */}
        <div className="flex flex-col gap-8">
          
          {/* TOP: Scenario Selection */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-[12px] font-black uppercase text-slate-400 tracking-widest pl-1">Select Emergency Case</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {scenarios.map((sc) => {
                const isActive = activeScenarioId === sc.id;
                return (
                  <button
                    key={sc.id}
                    onClick={() => handleSelectScenario(sc.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer select-none
                      ${isActive 
                        ? 'bg-blue-50 border-blue-500 shadow-sm ring-1 ring-blue-500/20' 
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                      }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors
                      ${isActive ? 'bg-blue-500 text-white shadow-md' : 'bg-white text-slate-500 border border-slate-200 shadow-sm'}`}>
                      {sc.icon}
                    </div>
                    <div className="font-display font-bold text-[15px] text-slate-800 leading-tight">
                      {sc.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* BOTTOM: Protocol Workspace */}
          <div className="w-full">
            <div className="bg-slate-50 border-2 border-slate-100 rounded-[28px] p-6 lg:p-8 shadow-inner flex flex-col space-y-8 relative overflow-hidden">
              
              {/* Problem Description */}
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[12px] font-black uppercase text-rose-500 bg-rose-50 px-2.5 py-0.5 rounded border border-rose-200 tracking-widest">
                    Emergency Case
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-rose-500">{activeScenario.icon}</span> {activeScenario.title}
                </h3>
                <p className="text-[15.5px] text-slate-600 font-medium leading-relaxed mt-2 max-w-2xl">
                  {activeScenario.desc}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                
                {/* Protocol Steps Checklist */}
                <div className="space-y-4">
                  <h4 className="text-[12px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-200 pb-2">
                    Treatment Protocol
                  </h4>
                  <div className="space-y-3">
                    {activeScenario.steps.map((stepId, index) => {
                      const isCompletedStep = completedSteps.includes(stepId);
                      const isCurrentStep = completedSteps.length === index;
                      const optionData = activeScenario.options.find(o => o.id === stepId);

                      return (
                        <div 
                          key={stepId}
                          className={`flex items-start gap-3 p-3 rounded-xl border-2 transition-all
                            ${isCompletedStep ? 'bg-teal-50 border-teal-200' : 
                              isCurrentStep ? 'bg-white border-blue-200 shadow-sm ring-2 ring-blue-500/10' : 'bg-slate-100/50 border-slate-200 opacity-60'}`}
                        >
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[13px] font-black ${isCompletedStep ? 'bg-teal-500 text-white' : isCurrentStep ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                            {isCompletedStep ? <CheckCircle size={15} /> : index + 1}
                          </div>
                          <div className="flex-1 min-w-0 pt-0.5">
                            <div className={`text-[15px] font-bold ${isCompletedStep ? 'text-teal-800' : isCurrentStep ? 'text-blue-900' : 'text-slate-500'}`}>
                              {isCompletedStep ? optionData.label : isCurrentStep ? 'Awaiting Action...' : 'Pending'}
                            </div>
                            {isCompletedStep && (
                              <p className="text-[12px] text-teal-650 mt-1 font-medium leading-snug">
                                {activeScenario.hints[stepId]}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {isCompleted && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="bg-teal-500 text-white p-3 rounded-xl font-bold text-center text-sm shadow-md flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={18} /> Protocol Completed Successfully!
                    </motion.div>
                  )}
                </div>

                {/* Supplies / Actions */}
                <div className="space-y-4">
                  <h4 className="text-[12px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-200 pb-2">
                    Select Medical Action
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Shuffle options based on scenario ID to avoid them being in the exact same order */}
                    {[...activeScenario.options].sort((a, b) => a.id.localeCompare(b.id)).map((opt) => {
                      const isUsed = completedSteps.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleToolClick(opt)}
                          disabled={isUsed || isCompleted}
                          className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all select-none
                            ${isUsed 
                              ? 'bg-slate-100 border-slate-200 opacity-50 cursor-not-allowed grayscale' 
                              : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md cursor-pointer text-slate-700 hover:text-blue-600'
                            }`}
                        >
                          <div className={`${isUsed ? 'text-slate-400' : 'text-slate-700'}`}>
                            {opt.icon}
                          </div>
                          <span className="text-[13px] font-bold text-center leading-tight">
                            {opt.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Area */}
                  <AnimatePresence mode="wait">
                    {feedback && (
                      <motion.div
                        key={feedback.message}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className={`p-3 rounded-xl border flex items-start gap-2.5 mt-4
                          ${feedback.type === 'error' ? 'bg-rose-50 border-rose-200 text-rose-700' : 
                            feedback.type === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-700' : 
                            'bg-teal-50 border-teal-200 text-teal-700'}`}
                        >
                          <div className="shrink-0 mt-0.5">
                            {feedback.type === 'error' ? <XCircle size={16} /> : 
                             feedback.type === 'warning' ? <AlertTriangle size={16} /> : 
                             <CheckCircle size={16} />}
                          </div>
                          <div className="text-[13px] font-semibold leading-snug">
                            {feedback.message}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstAidLab;
