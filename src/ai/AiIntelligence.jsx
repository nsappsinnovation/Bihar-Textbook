import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Sparkles, ArrowLeft, ArrowRight, CheckCircle2, 
  XCircle, Compass, Atom, RotateCcw, TrendingUp, Target, 
  Zap, BookOpen, GraduationCap, Volume2, VolumeX, Award, Star
} from 'lucide-react';

const TOPICS_DATA = {
  space: {
    name: 'Space Exploration',
    icon: <Compass className="w-5 h-5 text-purple-600 animate-spin" style={{ animationDuration: '8s' }} />,
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-50',
    question: 'Which planet in our solar system is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter'],
    correctIndex: 1,
    roadmap: [
      { id: 1, title: 'Cosmic Basics', desc: 'Understanding gravity and planetary orbits.', status: 'completed' },
      { id: 2, title: 'Mars & Beyond', desc: 'Atmosphere, geography, and water search.', status: 'active' },
      { id: 3, title: 'Outer Mysteries', desc: 'Gas giants, asteroid belts, and deep space.', status: 'locked' }
    ],
    feedbackQuestion: 'Mars has two small moons. What is the name of the larger one?',
    feedbackOptions: ['Deimos', 'Phobos', 'Titan'],
    feedbackCorrectIndex: 1,
    explanations: {
      correct: 'Excellent! Phobos is the larger moon. It is heavily cratered and orbits Mars three times a day!',
      incorrect: 'Not quite. The correct answer is Phobos. Deimos is the smaller outer moon, and Titan belongs to Saturn.'
    },
    badgeName: 'Cosmic Explorer',
    mascotIntro: "Hey there, space cadet! Choose a topic and let's test your cosmic brainpower!"
  },
  math: {
    name: 'Mathematics',
    icon: <Brain className="w-5 h-5 text-blue-605" />,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    question: 'What is the next number in this sequence: 2, 4, 8, 16, ...?',
    options: ['20', '24', '32 (Doubles every time!)'],
    correctIndex: 2,
    roadmap: [
      { id: 1, title: 'Number Patterns', desc: 'Arithmetic and basic sequences.', status: 'completed' },
      { id: 2, title: 'Exponential Growth', desc: 'Geometric sequences and doubling rates.', status: 'active' },
      { id: 3, title: 'Advanced Algebra', desc: 'Functions, logarithms, and graphing.', status: 'locked' }
    ],
    feedbackQuestion: 'Solve using order of operations (PEMDAS): 5 + 3 * 2',
    feedbackOptions: ['16', '11', '10'],
    feedbackCorrectIndex: 1,
    explanations: {
      correct: 'Perfect! According to PEMDAS, we multiply first (3 * 2 = 6) and then add (5 + 6 = 11). You are a math star!',
      incorrect: 'Almost. Remember PEMDAS: multiplication (3 * 2 = 6) must be performed before addition (5 + 6 = 11).'
    },
    badgeName: 'Math Wizard',
    mascotIntro: "Hello, number cruncher! Let's solve some fun puzzles together!"
  },
  science: {
    name: 'General Science',
    icon: <Atom className="w-5 h-5 text-emerald-600" />,
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50',
    question: 'Which state of matter has a definite volume but no definite shape?',
    options: ['Solid', 'Liquid', 'Gas'],
    correctIndex: 1,
    roadmap: [
      { id: 1, title: 'States of Matter', desc: 'Solids, liquids, gases, and plasma.', status: 'completed' },
      { id: 2, title: 'Molecular Bonds', desc: 'How atoms connect and change phases.', status: 'active' },
      { id: 3, title: 'Thermodynamics', desc: 'Heat transfer and energy conservation.', status: 'locked' }
    ],
    feedbackQuestion: 'What is the chemical formula for water?',
    feedbackOptions: ['CO2', 'H2O', 'O2'],
    feedbackCorrectIndex: 1,
    explanations: {
      correct: 'Correct! A water molecule is made of two hydrogen atoms and one oxygen atom (H2O). Chemist in the making!',
      incorrect: 'Not quite. H2O is the chemical formula for water. CO2 is carbon dioxide, and O2 is oxygen gas.'
    },
    badgeName: 'Science Master',
    mascotIntro: "Welcome, junior scientist! Let's discover how the world works!"
  }
};

// Cute Animated SVG Mascot Sparky
const SparkyMascot = ({ expression = 'idle' }) => {
  let eyePathLeft = <circle cx="40" cy="45" r="5" fill="#4f46e5" className="transition-all duration-300" />;
  let eyePathRight = <circle cx="60" cy="45" r="5" fill="#4f46e5" className="transition-all duration-300" />;
  let mouthPath = <path d="M 45 60 Q 50 65 55 60" stroke="#4f46e5" strokeWidth="3" fill="none" strokeLinecap="round" className="transition-all duration-300" />;
  let antennaColor = "#94a3b8";
  let bulbGlow = "opacity-0";

  if (expression === 'happy') {
    eyePathLeft = <path d="M 35 47 Q 40 40 45 47" stroke="#10b981" strokeWidth="4" fill="none" strokeLinecap="round" />;
    eyePathRight = <path d="M 55 47 Q 60 40 65 47" stroke="#10b981" strokeWidth="4" fill="none" strokeLinecap="round" />;
    mouthPath = <path d="M 42 58 Q 50 68 58 58" stroke="#10b981" strokeWidth="4" fill="none" strokeLinecap="round" />;
    antennaColor = "#10b981";
    bulbGlow = "opacity-80 animate-ping";
  } else if (expression === 'sad') {
    eyePathLeft = <path d="M 35 43 Q 40 48 45 43" stroke="#f43f5e" strokeWidth="4" fill="none" strokeLinecap="round" />;
    eyePathRight = <path d="M 55 43 Q 60 48 65 43" stroke="#f43f5e" strokeWidth="4" fill="none" strokeLinecap="round" />;
    mouthPath = <path d="M 44 62 Q 50 58 56 62" stroke="#f43f5e" strokeWidth="3" fill="none" strokeLinecap="round" />;
    antennaColor = "#f43f5e";
  } else if (expression === 'thinking') {
    eyePathLeft = <ellipse cx="40" cy="42" rx="4" ry="6" fill="#6366f1" />;
    eyePathRight = <ellipse cx="60" cy="42" rx="4" ry="6" fill="#6366f1" />;
    mouthPath = <line x1="45" y1="60" x2="55" y2="60" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />;
    antennaColor = "#fbbf24";
    bulbGlow = "opacity-100 animate-pulse";
  }

  return (
    <motion.div 
      animate={expression === 'happy' ? { y: [0, -6, 0] } : {}}
      transition={{ duration: 0.5, repeat: expression === 'happy' ? 2 : 0 }}
      className="w-16 h-16 shrink-0 relative select-none"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Antenna */}
        <line x1="50" y1="25" x2="50" y2="10" stroke={antennaColor} strokeWidth="4" strokeLinecap="round" />
        <circle cx="50" cy="8" r="5" fill={antennaColor} className="transition-colors duration-300" />
        {/* Antenna Glow */}
        <circle cx="50" cy="8" r="10" fill="#fbbf24" className={`blur-[4px] ${bulbGlow} transition-opacity duration-300`} />

        {/* Head */}
        <rect x="20" y="22" width="60" height="56" rx="18" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="4" />
        {/* Screen */}
        <rect x="26" y="28" width="48" height="34" rx="10" fill="#ffffff" stroke="#f1f5f9" strokeWidth="2" />
        {/* Ears */}
        <rect x="14" y="40" width="6" height="20" rx="3" fill="#cbd5e1" />
        <rect x="80" y="40" width="6" height="20" rx="3" fill="#cbd5e1" />

        {/* Eyes */}
        {eyePathLeft}
        {eyePathRight}

        {/* Mouth */}
        {mouthPath}

        {/* Cheeks */}
        <circle cx="32" cy="52" r="3" fill="#f87171" className="opacity-40" />
        <circle cx="68" cy="52" r="3" fill="#f87171" className="opacity-40" />
      </svg>
    </motion.div>
  );
};

const AiIntelligence = () => {
  const navigate = useNavigate();
  const [simulatorStep, setSimulatorStep] = useState(1);
  const [selectedTopic, setSelectedTopic] = useState('space');
  const [assessmentAnswer, setAssessmentAnswer] = useState(null);
  const [tutorAnswer, setTutorAnswer] = useState(null);
  const [selectedNode, setSelectedNode] = useState(2);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [particles, setParticles] = useState([]);
  const [claimedBadge, setClaimedBadge] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);

  const topicData = TOPICS_DATA[selectedTopic];

  // Synthesis Beeps for Kids
  const playSound = (type) => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        osc.frequency.setValueAtTime(1046.50, now + 0.24); // C6
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.45);
      } else if (type === 'failure') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220.00, now); // A3
        osc.frequency.setValueAtTime(174.61, now + 0.12); // F3
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(392.00, now); // G4
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'levelUp') {
        osc.type = 'triangle';
        const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, index) => {
          osc.frequency.setValueAtTime(freq, now + (index * 0.08));
        });
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
        osc.start(now);
        osc.stop(now + 0.8);
      }
    } catch (e) {
      console.warn("Web Audio API blocked or unsupported", e);
    }
  };

  // Trigger Particle Confetti
  const triggerConfetti = () => {
    const newParticles = Array.from({ length: 35 }).map((_, i) => ({
      id: Math.random(),
      x: Math.random() * 160 - 80, // offset X
      y: Math.random() * -120 - 40, // offset Y
      color: ['#6366f1', '#10b981', '#fbbf24', '#f43f5e', '#a855f7'][Math.floor(Math.random() * 5)],
      size: Math.random() * 8 + 5
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1500);
  };

  const handleReset = () => {
    playSound('click');
    setSimulatorStep(1);
    setAssessmentAnswer(null);
    setTutorAnswer(null);
    setSelectedNode(2);
    setClaimedBadge(false);
    setShowBadgeModal(false);
  };

  const handleAssessmentAnswer = (idx) => {
    const isCorrect = idx === topicData.correctIndex;
    setAssessmentAnswer(idx);
    if (isCorrect) {
      playSound('success');
      triggerConfetti();
    } else {
      playSound('failure');
    }
  };

  const handleTutorAnswer = (idx) => {
    const isCorrect = idx === topicData.feedbackCorrectIndex;
    setTutorAnswer(idx);
    if (isCorrect) {
      playSound('success');
      triggerConfetti();
    } else {
      playSound('failure');
    }
  };

  const nextStep = () => {
    playSound('click');
    if (simulatorStep < 4) {
      setSimulatorStep(prev => prev + 1);
    }
  };

  const claimBadgeAction = () => {
    playSound('levelUp');
    setClaimedBadge(true);
    setShowBadgeModal(true);
  };

  // Determine Mascot Speech & Mood
  let mascotMood = 'thinking';
  let mascotSpeech = topicData.mascotIntro;

  if (simulatorStep === 1) {
    if (assessmentAnswer === null) {
      mascotMood = 'thinking';
      mascotSpeech = `Hey there! Choose a topic above and let's test your brainpower!`;
    } else if (assessmentAnswer === topicData.correctIndex) {
      mascotMood = 'happy';
      mascotSpeech = `Wow! You're a genius! Correct answer! Let's see your custom roadmap.`;
    } else {
      mascotMood = 'sad';
      mascotSpeech = `Aww, so close! Don't worry, that's how we learn. AI is customizing a roadmap to help you!`;
    }
  } else if (simulatorStep === 2) {
    mascotMood = 'happy';
    mascotSpeech = `Ta-da! AI analyzed your score and built this roadmap. Click on the nodes to see your future lessons!`;
  } else if (simulatorStep === 3) {
    if (tutorAnswer === null) {
      mascotMood = 'thinking';
      mascotSpeech = `Time for a live tutor challenge! Give it your best guess.`;
    } else if (tutorAnswer === topicData.feedbackCorrectIndex) {
      mascotMood = 'happy';
      mascotSpeech = `Outstanding! You got it right! You are officially ready for the dashboard.`;
    } else {
      mascotMood = 'sad';
      mascotSpeech = `Almost! Read my explanation below. We learn more from mistakes!`;
    }
  } else if (simulatorStep === 4) {
    mascotMood = 'happy';
    mascotSpeech = `Look at your awesome learning speed! Click below to claim your official badge!`;
  }

  return (
    <div className="relative min-h-screen bg-white text-slate-900 overflow-hidden font-sans pb-24">
      {/* Confetti Particles Render */}
      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, x: '50vw', y: '60vh', scale: 1 }}
            animate={{ 
              opacity: 0, 
              x: `calc(50vw + ${p.x}px)`, 
              y: `calc(60vh + ${p.y}px)`,
              scale: 0.2,
              rotate: 360
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              position: 'absolute',
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: p.color,
            }}
          />
        ))}
      </div>

      {/* Badge Claim Celebration Modal */}
      <AnimatePresence>
        {showBadgeModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center border border-slate-100 shadow-2xl relative space-y-6"
            >
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center shadow-lg shadow-amber-500/20 border-4 border-white animate-bounce">
                <Award size={48} className="text-white" />
              </div>
              <div className="pt-8 space-y-2">
                <h3 className="text-xl font-black text-slate-900">Congratulations!</h3>
                <p className="text-xs text-slate-500 font-semibold">You have successfully unlocked the badge:</p>
                <div className="inline-block px-4 py-2 bg-amber-50 border border-amber-100 rounded-2xl text-sm font-black text-amber-700 mt-2">
                  {topicData.badgeName}
                </div>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Your brain profile is now registered with the AI engine. Ready to take on real courses?
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    playSound('click');
                    setShowBadgeModal(false);
                  }}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                >
                  Close
                </button>
                <button 
                  onClick={() => navigate("/ai-intelligence-dashboard")}
                  className="flex-grow py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-500/10"
                >
                  Go to Dashboard
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle organic background elements */}
      <div className="absolute top-0 right-0 -z-10 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-indigo-500/5 to-violet-500/5 blur-[120px]" />
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-500/5 to-indigo-500/5 blur-[120px]" />

      {/* Container */}
      <div className="max-w-[1140px] mx-auto px-6 sm:px-8 pt-2 sm:pt-4">

        {/* Navigation - Simple Align Back Arrow */}
        <div className="mb-4 mt-2">
          <button 
            onClick={() => navigate("/#missions-grid")} 
            className="group w-10 h-10 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-full shadow-sm flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all duration-300 cursor-pointer"
            aria-label="Back to missions"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16 -mt-6">
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50/80 backdrop-blur-sm text-indigo-700 border border-indigo-200/50 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                AI Intelligence Mission
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                Adaptive <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">AI Intelligence</span> Programs
              </h1>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl">
                Leveraging artificial intelligence to provide personalized learning experiences and real-time support. Tailored for every student, our smart modules adapt to your unique learning pace.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap gap-3.5 pt-1"
            >
              <button 
                onClick={() => navigate("/ai-intelligence-dashboard")}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-full text-xs sm:text-sm font-bold shadow-md shadow-indigo-500/10 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                Start Learning
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              
              <a 
                href="#simulator-section"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                Try Simulator
              </a>
            </motion.div>

            {/* Premium Minimal Specs Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-3 gap-4 sm:gap-6 pt-5 border-t border-slate-200/80"
            >
              <div className="p-3.5 bg-white hover:bg-slate-50 border border-slate-200/60 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
                <div className="text-slate-900 font-bold flex items-center gap-1.5 text-xs sm:text-sm">
                  <Brain size={14} className="text-indigo-600" />
                  Adaptive Learning
                </div>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">Adjusts to each student's unique learning pace.</p>
              </div>
              <div className="p-3.5 bg-white hover:bg-slate-50 border border-slate-200/60 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
                <div className="text-slate-900 font-bold flex items-center gap-1.5 text-xs sm:text-sm">
                  <Target size={14} className="text-violet-600" />
                  Data Driven
                </div>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">Real-time analytics to help students improve.</p>
              </div>
              <div className="p-3.5 bg-white hover:bg-slate-50 border border-slate-200/60 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
                <div className="text-slate-900 font-bold flex items-center gap-1.5 text-xs sm:text-sm">
                  <Sparkles size={14} className="text-purple-600" />
                  Smart Recs
                </div>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">Suggests topics to reinforce strengths.</p>
              </div>
            </motion.div>
          </div>

          {/* Larger Hero Illustration - Clean and Professional */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative w-full max-w-[480px] group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-violet-500/25 rounded-full blur-[70px] -z-10 animate-pulse duration-[4000ms]" />
              <img
                src="/images/ai/hero_new.png"
                alt="AI Experience Illustration"
                className="w-auto h-auto max-h-[400px] object-contain select-none group-hover:scale-[1.02] transition-transform duration-500"
              />
            </motion.div>
          </div>
        </section>

        {/* Section title & subtitle for the simulator */}
        <div id="simulator-section" className="text-center max-w-2xl mx-auto mb-10 space-y-2 pt-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full text-[10px] font-bold tracking-widest uppercase">
            Simulated Sandbox
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Interactive AI Viewport</h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">Take a test drive of our AI-driven learning cycle below to see how the platform adapts.</p>
        </div>

        {/* Interactive Viewport Section - Sleek Glassmorphism */}
        <section className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-[32px] shadow-xl shadow-slate-100/50 p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20 relative">
          
          {/* Sound Effect Toggle in Viewport */}
          <div className="absolute top-6 right-6 z-20">
            <button 
              onClick={() => {
                playSound('click');
                setSoundEnabled(!soundEnabled);
              }}
              className="p-2 rounded-xl border border-slate-200/60 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-all shadow-sm flex items-center justify-center"
              title={soundEnabled ? "Mute Sounds" : "Unmute Sounds"}
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
          </div>

          {/* Left Column: Step Indicators */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Simulation Steps</span>
              
              <div className="space-y-3">
                {[
                  { step: 1, label: 'Smart Assessment', desc: 'Determine baseline level' },
                  { step: 2, label: 'Personalized Roadmap', desc: 'Tailored topic progression' },
                  { step: 3, label: 'Real-time Feedback', desc: 'Instant tutor explanations' },
                  { step: 4, label: 'Progress Analytics', desc: 'Visualizing learning growth' }
                ].map((s) => {
                  const isActive = simulatorStep === s.step;
                  const isCompleted = simulatorStep > s.step;
                  return (
                    <button
                      key={s.step}
                      disabled={s.step > simulatorStep && !isCompleted}
                      onClick={() => {
                        playSound('click');
                        setSimulatorStep(s.step);
                      }}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer relative overflow-hidden group ${
                        isActive 
                          ? 'border-indigo-500 bg-indigo-50/50 shadow-sm shadow-indigo-500/5' 
                          : isCompleted 
                            ? 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/40 hover:-translate-y-0.5 shadow-sm' 
                            : 'border-slate-100 bg-white/45 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-600" />
                      )}

                      <div className={`p-2.5 rounded-xl border transition-colors duration-300 ${
                        isActive 
                          ? 'bg-indigo-600 border-indigo-600 text-white' 
                          : isCompleted 
                            ? 'bg-emerald-100 border-emerald-200 text-emerald-700' 
                            : 'bg-slate-50 border-slate-100 text-slate-400'
                      }`}>
                        {isCompleted ? <CheckCircle2 size={16} /> : <span className="text-xs font-bold font-mono px-0.5">{s.step}</span>}
                      </div>

                      <div className="space-y-0.5">
                        <h3 className="text-sm font-bold text-slate-800 leading-snug group-hover:text-indigo-600 transition-colors">
                          {s.label}
                        </h3>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {s.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reset Button */}
            <div className="bg-slate-50/60 border border-slate-100/80 p-5 rounded-2xl flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">Ready to start over?</span>
              <button 
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-sm transition-all"
              >
                <RotateCcw size={12} />
                Reset
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Content Viewport */}
          <div className="lg:col-span-7 flex flex-col justify-between min-h-[400px] bg-slate-50/45 border border-slate-200/50 rounded-2xl p-6 relative">
            
            {/* Sparky Mascot Speech Bubble Section */}
            <div className="flex items-start gap-3.5 bg-white border border-slate-100 shadow-sm p-4 rounded-2xl mb-5">
              <SparkyMascot expression={mascotMood} />
              <div className="flex-1 space-y-1">
                <div className="text-[10px] font-extrabold text-indigo-600 tracking-wider uppercase">Sparky the AI Scout</div>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  {mascotSpeech}
                </p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={simulatorStep + selectedTopic}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="flex-grow flex flex-col justify-between"
              >
                {/* STEP 1: Assessment */}
                {simulatorStep === 1 && (
                  <div className="space-y-4">
                    {/* Topic Selector */}
                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(TOPICS_DATA).map(([key, data]) => (
                        <button
                          key={key}
                          onClick={() => {
                            playSound('click');
                            setSelectedTopic(key);
                            setAssessmentAnswer(null);
                            setTutorAnswer(null);
                          }}
                          className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-2 ${
                            selectedTopic === key 
                              ? 'border-indigo-500 bg-white shadow-sm ring-2 ring-indigo-500/10' 
                              : 'border-slate-200/60 bg-white/80 hover:border-slate-300'
                          }`}
                        >
                          <div className="p-1.5 rounded-lg bg-slate-50 w-fit border border-slate-100">
                            {data.icon}
                          </div>
                          <span className="text-[11px] font-bold text-slate-800">{data.name}</span>
                        </button>
                      ))}
                    </div>

                    {/* Question Card */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200/60 space-y-3.5">
                      <div className="text-xs font-bold text-slate-800">
                        {topicData.question}
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {topicData.options.map((option, idx) => {
                          const isCorrect = idx === topicData.correctIndex;
                          const isSelected = assessmentAnswer === idx;
                          
                          let btnStyle = 'border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300';
                          if (assessmentAnswer !== null) {
                            if (isSelected) {
                              btnStyle = isCorrect 
                                ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/10' 
                                : 'border-rose-500 bg-rose-50/50 text-rose-900 ring-2 ring-rose-500/10';
                            } else if (isCorrect) {
                              btnStyle = 'border-emerald-500 bg-emerald-50/30 text-emerald-900';
                            } else {
                              btnStyle = 'border-slate-200 opacity-60';
                            }
                          }

                          return (
                            <button
                              key={idx}
                              disabled={assessmentAnswer !== null}
                              onClick={() => handleAssessmentAnswer(idx)}
                              className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${btnStyle}`}
                            >
                              {option}
                              {assessmentAnswer !== null && isSelected && (
                                isCorrect ? <CheckCircle2 size={15} className="text-emerald-600" /> : <XCircle size={15} className="text-rose-600" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Dynamic Feedback */}
                    {assessmentAnswer !== null && (
                      <div className={`p-3.5 rounded-xl text-xs font-semibold border ${
                        assessmentAnswer === topicData.correctIndex 
                          ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
                          : 'bg-amber-50 border-amber-100 text-amber-800'
                      }`}>
                        {assessmentAnswer === topicData.correctIndex 
                          ? 'Correct! The AI detected strong proficiency and is generating an advanced roadmap.' 
                          : `That was close! The correct answer is ${topicData.options[topicData.correctIndex]}. The AI will start you with a foundational roadmap.`
                        }
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 2: Roadmap */}
                {simulatorStep === 2 && (
                  <div className="space-y-5">
                    {/* Timeline / Nodes */}
                    <div className="relative py-6">
                      {/* Connecting Line */}
                      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
                      
                      <div className="relative z-10 flex justify-between items-center">
                        {topicData.roadmap.map((node) => {
                          const isSelected = selectedNode === node.id;
                          return (
                            <button
                              key={node.id}
                              onClick={() => {
                                playSound('click');
                                setSelectedNode(node.id);
                              }}
                              className="flex flex-col items-center group focus:outline-none"
                            >
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                                node.status === 'completed'
                                  ? 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/10'
                                  : node.status === 'active'
                                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-500/10'
                                    : 'bg-white border-slate-200 text-slate-400 group-hover:border-slate-300'
                              } ${isSelected ? 'scale-110 ring-4 ring-indigo-500/10' : ''}`}>
                                {node.status === 'completed' ? (
                                  <CheckCircle2 size={16} />
                                ) : node.status === 'active' ? (
                                  <Zap size={14} />
                                ) : (
                                  <GraduationCap size={16} />
                                )}
                              </div>
                              <span className={`text-[11px] font-bold mt-2 ${
                                isSelected ? 'text-indigo-600' : 'text-slate-500'
                              }`}>
                                {node.title}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Active Node Detail Card */}
                    {selectedNode && (
                      <div className="p-4 rounded-2xl bg-white border border-slate-200/60 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${
                            topicData.roadmap.find(n => n.id === selectedNode)?.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-700'
                              : topicData.roadmap.find(n => n.id === selectedNode)?.status === 'active'
                                ? 'bg-indigo-100 text-indigo-700'
                                : 'bg-slate-100 text-slate-500'
                          }`}>
                            {topicData.roadmap.find(n => n.id === selectedNode)?.status}
                          </span>
                          <h4 className="text-xs font-bold text-slate-800">
                            {topicData.roadmap.find(n => n.id === selectedNode)?.title}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">
                          {topicData.roadmap.find(n => n.id === selectedNode)?.desc}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 3: Feedback */}
                {simulatorStep === 3 && (
                  <div className="space-y-4">
                    {/* Chat Bubble Interface */}
                    <div className="space-y-4">
                      {/* AI Question */}
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 shadow-sm">
                          <Brain size={15} />
                        </div>
                        <div className="bg-white border border-slate-200/60 rounded-2xl rounded-tl-sm p-4 max-w-[85%]">
                          <p className="text-xs font-bold text-slate-800 mb-3">
                            {topicData.feedbackQuestion}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {topicData.feedbackOptions.map((opt, idx) => {
                              const isSelected = tutorAnswer === idx;
                              return (
                                <button
                                  key={idx}
                                  disabled={tutorAnswer !== null}
                                  onClick={() => handleTutorAnswer(idx)}
                                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                                    isSelected 
                                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-500/10' 
                                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                                  }`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* AI Explanation Response */}
                      {tutorAnswer !== null && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex gap-3 justify-end"
                        >
                          <div className="bg-indigo-50/50 border border-indigo-100/60 rounded-2xl rounded-tr-sm p-4 max-w-[85%]">
                            <div className="flex items-center gap-1.5 mb-1">
                              <Sparkles size={12} className="text-indigo-600" />
                              <span className="text-[10px] font-bold text-indigo-950">AI Tutor</span>
                            </div>
                            <p className="text-xs text-slate-700 leading-relaxed font-medium">
                              {tutorAnswer === topicData.feedbackCorrectIndex 
                                ? topicData.explanations.correct 
                                : topicData.explanations.incorrect
                              }
                            </p>
                          </div>
                          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-indigo-500/15">
                            <Sparkles size={15} />
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}

                {/* STEP 4: Analytics */}
                {simulatorStep === 4 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Left: Circular Progress */}
                      <div className="bg-white border border-slate-200/60 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-2">
                        <div className="relative w-24 h-24 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle 
                              cx="50" cy="50" r="40" 
                              className="stroke-slate-100" 
                              strokeWidth="8" fill="transparent" 
                            />
                            <motion.circle 
                              cx="50" cy="50" r="40" 
                              className="stroke-indigo-600" 
                              strokeWidth="8" fill="transparent" 
                              strokeDasharray={251.2}
                              initial={{ strokeDashoffset: 251.2 }}
                              animate={{ strokeDashoffset: 251.2 - (251.2 * 0.92) }}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute flex flex-col items-center">
                            <span className="text-xl font-black text-slate-950">92%</span>
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Mastery</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800">Concept Accuracy</div>
                        </div>
                      </div>

                      {/* Right: Growth Stats */}
                      <div className="bg-white border border-slate-200/60 rounded-2xl p-4 flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="p-1 bg-indigo-50 rounded-lg text-indigo-600">
                              <Target size={14} />
                            </div>
                            <div>
                              <div className="text-[9px] text-slate-400 font-bold">STRENGTHS</div>
                              <div className="text-xs font-bold text-slate-800">Pattern Recall & Logic</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="p-1 bg-emerald-50 rounded-lg text-emerald-600">
                              <TrendingUp size={14} />
                            </div>
                            <div>
                              <div className="text-[9px] text-slate-400 font-bold">EFFICIENCY</div>
                              <div className="text-xs font-bold text-slate-800">1.4x Faster Mastery</div>
                            </div>
                          </div>
                        </div>

                        {/* Claim Badge Action */}
                        {!claimedBadge ? (
                          <button 
                            onClick={claimBadgeAction}
                            className="w-full py-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/10 hover:shadow-lg animate-pulse"
                          >
                            <Award size={14} />
                            Claim Badge!
                          </button>
                        ) : (
                          <button 
                            onClick={() => navigate("/ai-intelligence-dashboard")}
                            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1"
                          >
                            Launch Dashboard
                            <ArrowRight size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="border-t border-slate-200/60 pt-4 mt-6 flex justify-between items-center">
              <div className="text-xs font-semibold text-slate-400">
                Step {simulatorStep} of 4
              </div>
              <div className="flex gap-2">
                {simulatorStep > 1 && (
                  <button
                    onClick={() => {
                      playSound('click');
                      setSimulatorStep(prev => prev - 1);
                    }}
                    className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                  >
                    Previous
                  </button>
                )}
                {simulatorStep < 4 ? (
                  <button
                    onClick={nextStep}
                    disabled={simulatorStep === 1 ? assessmentAnswer === null : simulatorStep === 3 ? tutorAnswer === null : false}
                    className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                      (simulatorStep === 1 && assessmentAnswer === null) || (simulatorStep === 3 && tutorAnswer === null)
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-500/10'
                    }`}
                  >
                    Continue
                    <ArrowRight size={13} />
                  </button>
                ) : (
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <RotateCcw size={12} />
                    Try Again
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Sober Info Stats Grid - Upgraded to Gorgeous Bordered Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-slate-200/80 max-w-4xl mx-auto text-center">
          <div className="p-5 bg-white border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
            <h5 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">10+</h5>
            <p className="text-xs sm:text-sm font-bold text-slate-800">AI Learning Modules</p>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Spanning interactive prompt academy, quizzes, and AI tools.</p>
          </div>
          <div className="p-5 bg-white border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
            <h5 className="text-3xl font-extrabold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">100%</h5>
            <p className="text-xs sm:text-sm font-bold text-slate-800">Curriculum Aligned</p>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Mapped directly to board textbook lessons.</p>
          </div>
          <div className="p-5 bg-white border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
            <h5 className="text-3xl font-extrabold bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent">Active</h5>
            <p className="text-xs sm:text-sm font-bold text-slate-800">Interactive Lessons</p>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Includes built-in interactive simulations.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AiIntelligence;
