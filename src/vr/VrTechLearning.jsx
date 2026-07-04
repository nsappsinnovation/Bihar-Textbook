/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, BookOpen, Shield, Trophy,
  GraduationCap, ChevronRight, CheckCircle2, XCircle,
  Gamepad2, Sparkles, AlertOctagon, Rocket, Lock,
  Cpu, Eye, RefreshCw, Star, HelpCircle, Check, Hand,
  Volume2, VolumeX, Award, Play, Compass, Zap, Bot,
  Radio, Volume1, LayoutGrid, Heart, User, Target,
  Sliders, SlidersHorizontal, Maximize2, RotateCcw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// 5 Curriculum Lessons Database (Texts kept exactly intact, unique images assigned to every lesson & section)
const lessons = [
  {
    id: 1,
    title: "Lesson 1: The Magic Portal",
    badge: "Space Explorer",
    topic: "What is VR?",
    summary: "Step inside a new world and learn how VR headsets teleport your eyes and ears!",
    image: "/images/vr/vr_intro.png",
    learnSections: [
      {
        title: "Magic Glasses for Your Eyes",
        desc: "Virtual Reality (VR) is like putting on a pair of magic goggles. Instead of looking at a flat screen like a TV, these goggles completely cover your eyes. When you turn your head, you see a brand new 3D world all around you!",
        image: "/images/vr/v1.png"
      },
      {
        title: "Tricking Your Brain",
        desc: "How does it feel so real? The headset shows slightly different pictures to each of your eyes (just like how we see in real life). It also plays 3D sounds that change depending on where you look. Your brain gets tricked into thinking you are actually there!",
        image: "/images/vr/v2.png"
      },
      {
        title: "Where Can You Go?",
        desc: "With VR, you don't just watch a video. You can walk on Mars, swim next to a giant blue whale, explore an ancient castle, or sit inside a spaceship. The possibilities are endless!",
        image: "/images/vr/v3.png"
      }
    ],
    quiz: [
      {
        question: "What does VR stand for, and what does it do?",
        options: [
          "Very Remote: It lets you call friends from far away",
          "Virtual Reality: It covers your eyes to put you inside a computer-made 3D world",
          "Visual Radio: It plays music with screensavers"
        ],
        correct: 1
      },
      {
        question: "How does VR make you feel like you are inside a different place?",
        options: [
          "By showing a 3D world around you and playing sounds that match your head movement",
          "By vibrating the headset very hard",
          "By making the room colder"
        ],
        correct: 0
      }
    ]
  },
  {
    id: 2,
    title: "Lesson 2: The Brains of the Headset",
    badge: "Sensor Master",
    topic: "How does it track you?",
    summary: "Find out how screens, curved lenses, and tracking sensors follow your movement!",
    image: "/images/vr/vr_sensors_chip.png",
    learnSections: [
      {
        title: "The Screen & Curvy Glass Lenses",
        desc: "Inside the headset, there is a small, bright high-definition screen. But since the screen is super close to your face, it would look blurry. That's why there are two curved glass lenses in between! They bend the light so your eyes can focus comfortably on the virtual world.",
        image: "/images/vr/vr.png"
      },
      {
        title: "Follow-Me Sensors",
        desc: "How does the headset know you turned your head? It has built-in sensors called gyroscopes and accelerometers (the same sensors that track steps on a phone). They measure your movements hundreds of times a second so the virtual camera moves instantly!",
        image: "/images/vr/i.png"
      },
      {
        title: "Low Latency (Fast Response)",
        desc: "If the screen camera moves too slowly when you turn your head, it feels weird. Good VR headsets update the image instantly (in less than 20 milliseconds) so everything feels natural and comfortable.",
        image: "/images/vr/i3.png"
      }
    ],
    quiz: [
      {
        question: "What do the curved glass lenses inside a VR headset do?",
        options: [
          "They protect the screen from dust and dirt",
          "They bend the light from the screen so your eyes can focus close-up without blur",
          "They change the color of the screen to green"
        ],
        correct: 1
      },
      {
        question: "Which sensor helps the VR headset detect when you turn your head?",
        options: [
          "A gyroscope sensor",
          "A temperature thermometer",
          "A light brightness sensor"
        ],
        correct: 0
      }
    ]
  },
  {
    id: 3,
    title: "Lesson 3: Magic Wand Hands",
    badge: "Tech Sorcerer",
    topic: "VR Controllers & Hands",
    summary: "Learn how wireless controllers translate your real hand gestures into virtual actions!",
    image: "/images/vr/vr_controllers.png",
    learnSections: [
      {
        title: "Your Hands in the Virtual World",
        desc: "To interact with the VR world, you hold wireless controllers in your hands. The headset tracks their position using sensors or cameras. When you move your hand in real life, a virtual hand or magic wand moves exactly the same way in the headset!",
        image: "/images/vr/i4.png"
      },
      {
        title: "Pressing Buttons & Grabbing",
        desc: "VR controllers have buttons, joysticks, and trigger buttons under your fingers. You can squeeze the trigger to pick up a virtual sword, pull a lever, throw a basketball, or draw in the air!",
        image: "/images/vr/vr_controllers.png"
      },
      {
        title: "Feeling the Action (Haptics)",
        desc: "When you touch or grab something in VR, the controllers rumble or vibrate. This is called haptic feedback. It lets you 'feel' the virtual environment, like the tension of drawing a bow string or the bounce of a ball.",
        image: "/images/vr/audio.png"
      }
    ],
    quiz: [
      {
        question: "How does the VR system know where your hands are moving?",
        options: [
          "It guesses based on your age",
          "It tracks the position of the wireless controllers using cameras or sensors",
          "You have to speak into a microphone to move your hands"
        ],
        correct: 1
      },
      {
        question: "What is 'haptic feedback' in VR controllers?",
        options: [
          "A system that plays music",
          "A vibration or rumble that lets you feel physical contact in the virtual world",
          "A light that turns red when you are low on battery"
        ],
        correct: 1
      }
    ]
  },
  {
    id: 4,
    title: "Lesson 4: The Reality Spectrum",
    badge: "Dimension Hopper",
    topic: "VR vs AR vs MR",
    summary: "Explore the differences between fully virtual worlds and holograms in your real room!",
    image: "/images/vr/vr_ar_mr.png",
    learnSections: [
      {
        title: "Virtual Reality (VR) - The Closed Eye",
        desc: "VR completely blocks out the real world. You see only digital computer graphics. If you turn around, you see the digital sky, not your room wall. You are 100% inside the computer's world.",
        image: "/images/vr/vr_hero.png"
      },
      {
        title: "Augmented Reality (AR) - The Digital Overlay",
        desc: "AR does NOT hide your real room. It overlays digital stickers or holograms on top of it. Think of Pokémon GO or camera filters that add puppy ears to your face. You see the real world with virtual extras!",
        image: "/images/vr/rhs.png"
      },
      {
        title: "Mixed Reality (MR) - The Interactive Merge",
        desc: "MR is a super-advanced blend. Digital objects don't just float; they interact with real physical items! For example, a digital puppy can hide behind your real chair, or a virtual ball can bounce off your real kitchen table.",
        image: "/images/vr/vr_ar_mr.png"
      }
    ],
    quiz: [
      {
        question: "Which technology overlays virtual objects on top of the real world without hiding it?",
        options: [
          "Virtual Reality (VR)",
          "Augmented Reality (AR)",
          "Old TV Screens"
        ],
        correct: 1
      },
      {
        question: "What makes Mixed Reality (MR) different from Augmented Reality (AR)?",
        options: [
          "In MR, virtual objects can interact with real things, like bouncing off your real desk",
          "MR is only in black and white",
          "MR requires you to wear heavy gloves"
        ],
        correct: 0
      }
    ]
  },
  {
    id: 5,
    title: "Lesson 5: Safety First in VR",
    badge: "Safety Guardian",
    topic: "VR Safety & Health",
    summary: "Establish your safety circle to play without bumping into walls or straining your eyes!",
    image: "/images/vr/vr_safety_zone.png",
    learnSections: [
      {
        title: "The Guardian Boundary",
        desc: "Since you cannot see your actual room while in VR, you must draw a safe play circle on the floor first. If you get too close to the edge, a glowing virtual grid appears in your view to warn you. This is the Guardian System!",
        image: "/images/vr/vr_safety_zone.png"
      },
      {
        title: "Clear the Floor!",
        desc: "Before putting on the headset, always make sure the floor is empty. Clear away toys, skateboards, cups of water, and move chairs. Keep pets out of the room so you don't accidentally step on your dog or cat!",
        image: "/images/vr/heaven.png"
      },
      {
        title: "The 20-20-20 Rule for Eyes",
        desc: "VR screens are close to your eyes. To avoid headaches or eye strain, take a break every 20 minutes. Look at something 20 feet away for 20 seconds. If you ever feel dizzy, take off the headset immediately and rest.",
        image: "/images/vr/vr_headset_work.png"
      }
    ],
    quiz: [
      {
        question: "What is a 'Guardian System' in VR?",
        options: [
          "A password lock that protects your account",
          "A glowing virtual boundary grid that warns you if you are about to hit real furniture",
          "A voice that tells you how to play the game"
        ],
        correct: 1
      },
      {
        question: "What should you do to protect your eyes and body during long VR sessions?",
        options: [
          "Take a break every 20 minutes, look far away, and clear all hazards from the floor before playing",
          "Play in a dark closet so the light doesn't leak",
          "Keep the headset on even if you feel dizzy"
        ],
        correct: 0
      }
    ]
  }
];

// Helper: Pure Confetti / Particle Explosion (Clean, bright, non-AI style colors)
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

// Helper Hook: Text-to-Speech Read Aloud
const useSpeechSynthesis = () => {
  const [speakingId, setSpeakingId] = useState(null);

  const speak = (text, id) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (speakingId === id) {
      setSpeakingId(null);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    window.speechSynthesis.speak(utterance);
    setSpeakingId(id);
  };

  const stop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingId(null);
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return { speakingId, speak, stop };
};

// Lesson 1 Mini-Game: Wear the Headset
const HeadsetGame = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [ipd, setIpd] = useState(50);
  const [screenFlashed, setScreenFlashed] = useState(false);

  const handlePutOn = () => {
    setScreenFlashed(true);
    setTimeout(() => {
      setScreenFlashed(false);
      setStep(2);
    }, 500);
  };

  const handleLockFocus = () => {
    setScreenFlashed(true);
    setTimeout(() => {
      setScreenFlashed(false);
      setStep(3);
    }, 500);
  };

  const isFocused = Math.abs(ipd - 65) <= 1;
  const blurAmount = isFocused ? 0 : Math.abs(ipd - 65) * 0.45;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 text-[#1A1C2E] relative overflow-hidden flex flex-col justify-between shadow-sm">
      <AnimatePresence>
        {screenFlashed && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-white z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <h4 className="font-extrabold text-indigo-700 flex items-center gap-2 text-base sm:text-lg">
          <Gamepad2 size={22} className="text-indigo-600" /> Mini-Game: Wear and Setup Headset
        </h4>
        <span className="text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full">
          Step {step} of 3
        </span>
      </div>

      {step === 1 && (
        <div className="flex-grow flex flex-col justify-between space-y-6">
          <div className="text-center space-y-2">
            <h5 className="text-lg font-bold text-[#1A1C2E]">Step 1: Pick Up The VR Headset</h5>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Click the button below to put on the VR Headset sitting on the table and initialize the virtual world.
            </p>
          </div>

          <div className="w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center relative group">
            <img
              src="/images/vr/vr_headset_table.png"
              alt="VR Headset on table"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handlePutOn}
            className="w-full py-3.5 bg-[#0BB562] hover:bg-[#099b53] text-white rounded-xl text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            Put On Headset <ArrowRight size={18} />
          </motion.button>
        </div>
      )}

      {step === 2 && (
        <div className="flex-grow flex flex-col justify-between space-y-6">
          <div className="text-center space-y-2">
            <h5 className="text-lg font-bold text-[#1A1C2E]">Step 2: Calibrate Lens Focus (IPD Slider)</h5>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              The display is blurry. Adjust the slider until the picture snaps into focus (Target: <span className="text-indigo-600 font-bold">65mm</span>).
            </p>
          </div>

          <div className="w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center relative">
            <img
              src="/images/vr/v3.png"
              alt="Blur Space Portal"
              className="w-full h-full object-cover transition-all duration-100"
              style={{ filter: `blur(${blurAmount}px)` }}
            />
            {!isFocused ? (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
                <span className="bg-rose-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-sm">
                  Lenses Misaligned ({ipd}mm)
                </span>
              </div>
            ) : (
              <div className="absolute inset-0 bg-emerald-500/15 flex items-center justify-center pointer-events-none">
                <span className="bg-[#0BB562] text-white text-sm font-bold uppercase tracking-wider px-5 py-2 rounded-full shadow-sm">
                  Focus Calibrated ({ipd}mm)
                </span>
              </div>
            )}
          </div>

          <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex justify-between text-xs font-bold text-slate-700 uppercase">
              <span>Lens Distance (IPD)</span>
              <span className={isFocused ? "text-[#0BB562] font-extrabold text-base" : "text-slate-600 font-bold text-sm"}>{ipd} mm</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setIpd(prev => Math.max(50, prev - 1))}
                className="w-10 h-10 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 flex items-center justify-center font-bold text-lg text-slate-700 transition-all select-none active:scale-95 cursor-pointer shadow-sm"
              >
                -
              </button>
              <input
                type="range"
                min="50"
                max="80"
                value={ipd}
                onChange={(e) => setIpd(Number(e.target.value))}
                className="flex-grow accent-[#0BB562] h-2.5 rounded-lg cursor-pointer"
              />
              <button
                type="button"
                onClick={() => setIpd(prev => Math.min(80, prev + 1))}
                className="w-10 h-10 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 flex items-center justify-center font-bold text-lg text-slate-700 transition-all select-none active:scale-95 cursor-pointer shadow-sm"
              >
                +
              </button>
            </div>
            <div className="flex justify-between text-xs text-slate-500 font-medium">
              <span>50mm (Narrow)</span>
              <span>80mm (Wide)</span>
            </div>
          </div>

          <motion.button
            whileHover={isFocused ? { scale: 1.01 } : {}}
            whileTap={isFocused ? { scale: 0.99 } : {}}
            onClick={handleLockFocus}
            disabled={!isFocused}
            className={`w-full py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              isFocused
                ? 'bg-[#0BB562] hover:bg-[#099b53] text-white cursor-pointer shadow-sm'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Lock Focus and Continue <ArrowRight size={18} />
          </motion.button>
        </div>
      )}

      {step === 3 && (
        <div className="flex-grow flex flex-col justify-between space-y-6">
          <div className="text-center space-y-2">
            <h5 className="text-lg font-bold text-[#0BB562] uppercase tracking-wider">
              Step 3: Headset Initialized
            </h5>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              You calibrated the optics successfully. You are now inside the virtual learning environment.
            </p>
          </div>

          <div className="w-full h-56 sm:h-64 rounded-2xl overflow-hidden border-2 border-[#0BB562] bg-slate-50 flex items-center justify-center relative shadow-sm">
            <img
              src="/images/vr/vr_headset_work.png"
              alt="Space Portal Active"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-white border border-slate-200 px-3.5 py-1 rounded-full text-xs font-bold text-indigo-700 shadow-sm">
              Lenses calibrated ({ipd}mm)
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={onComplete}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            Complete Step and Continue <Check size={18} />
          </motion.button>
        </div>
      )}
    </div>
  );
};

// Lesson 2 Mini-Game: Gyro Head Tracking
const GyroGame = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [roll, setRoll] = useState(30);
  const [pitch, setPitch] = useState(-25);
  const [screenFlashed, setScreenFlashed] = useState(false);

  const handlePowerUp = () => {
    setScreenFlashed(true);
    setTimeout(() => {
      setScreenFlashed(false);
      setStep(2);
    }, 500);
  };

  const handleCalibrate = () => {
    setScreenFlashed(true);
    setTimeout(() => {
      setScreenFlashed(false);
      setStep(3);
    }, 500);
  };

  const isStable = Math.abs(roll) <= 5 && Math.abs(pitch) <= 5;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 text-[#1A1C2E] relative overflow-hidden flex flex-col justify-between shadow-sm">
      <AnimatePresence>
        {screenFlashed && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-white z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <h4 className="font-extrabold text-indigo-700 flex items-center gap-2 text-base sm:text-lg">
          <Eye size={22} className="text-indigo-600" /> Mini-Game: Gyroscope Calibration
        </h4>
        <span className="text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full">
          Step {step} of 3
        </span>
      </div>

      {step === 1 && (
        <div className="flex-grow flex flex-col justify-between space-y-6">
          <div className="text-center space-y-2">
            <h5 className="text-lg font-bold text-[#1A1C2E]">Step 1: Inspect the Sensors</h5>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              The <span className="text-indigo-600 font-bold">Gyroscope</span> and <span className="text-indigo-600 font-bold">Accelerometer</span> chips track your rotational angles and movement speed.
            </p>
          </div>

          <div className="w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center relative group">
            <img
              src="/images/vr/vr_sensors_chip.png"
              alt="VR Headset Sensors"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handlePowerUp}
            className="w-full py-3.5 bg-[#0BB562] hover:bg-[#099b53] text-white rounded-xl text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            Activate Sensor Pod <ArrowRight size={18} />
          </motion.button>
        </div>
      )}

      {step === 2 && (
        <div className="flex-grow flex flex-col justify-between space-y-6">
          <div className="text-center space-y-1">
            <h5 className="text-lg font-bold text-[#1A1C2E]">Step 2: Center the Balance Indicator</h5>
            <p className="text-sm text-slate-600">
              Use the buttons or sliders below to move the blue circle indicator into the center target ring.
            </p>
          </div>

          <div className="w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 border border-slate-300 rounded-full flex items-center justify-center">
                <div className="w-32 h-32 border border-slate-300 rounded-full flex items-center justify-center">
                  <div className="w-20 h-20 border border-indigo-300 rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 border-2 border-emerald-500 bg-emerald-100/50 rounded-full flex items-center justify-center">
                      <Target size={18} className="text-emerald-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              className="absolute w-8 h-8 rounded-full bg-indigo-600 border-2 border-white shadow-md transition-all duration-150 flex items-center justify-center"
              style={{
                left: `calc(50% + ${roll * 2.4}px - 16px)`,
                top: `calc(50% + ${pitch * 2.4}px - 16px)`
              }}
            >
              <div className="w-2 h-2 bg-white rounded-full" />
            </motion.div>

            <div className="absolute bottom-4 left-4 bg-white border border-slate-200 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
              Status: {isStable ? (
                <span className="text-[#0BB562] font-bold">Stabilized ({roll} deg, {pitch} deg)</span>
              ) : (
                <span className="text-rose-600 font-bold">Tilted ({roll} deg, {pitch} deg)</span>
              )}
            </div>
          </div>

          <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-700 uppercase">
                <span>Roll (Left / Right Tilt)</span>
                <span className={Math.abs(roll) <= 5 ? "text-[#0BB562] font-bold" : "text-slate-600 font-bold"}>{roll} deg</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setRoll(prev => Math.max(-40, prev - 5))}
                  className="w-10 h-10 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 flex items-center justify-center font-bold text-base text-slate-700 transition-all cursor-pointer select-none active:scale-95 shadow-sm"
                >
                  ◀
                </button>
                <input
                  type="range"
                  min="-40"
                  max="40"
                  value={roll}
                  onChange={(e) => setRoll(Number(e.target.value))}
                  className="flex-grow accent-[#0BB562] h-2.5 rounded-lg cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => setRoll(prev => Math.min(40, prev + 5))}
                  className="w-10 h-10 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 flex items-center justify-center font-bold text-base text-slate-700 transition-all cursor-pointer select-none active:scale-95 shadow-sm"
                >
                  ▶
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-700 uppercase">
                <span>Pitch (Forward / Backward Tilt)</span>
                <span className={Math.abs(pitch) <= 5 ? "text-[#0BB562] font-bold" : "text-slate-600 font-bold"}>{pitch} deg</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPitch(prev => Math.max(-40, prev - 5))}
                  className="w-10 h-10 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 flex items-center justify-center font-bold text-base text-slate-700 transition-all cursor-pointer select-none active:scale-95 shadow-sm"
                >
                  ▲
                </button>
                <input
                  type="range"
                  min="-40"
                  max="40"
                  value={pitch}
                  onChange={(e) => setPitch(Number(e.target.value))}
                  className="flex-grow accent-[#0BB562] h-2.5 rounded-lg cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => setPitch(prev => Math.min(40, prev + 5))}
                  className="w-10 h-10 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 flex items-center justify-center font-bold text-base text-slate-700 transition-all cursor-pointer select-none active:scale-95 shadow-sm"
                >
                  ▼
                </button>
              </div>
            </div>
          </div>

          <div className="pt-1">
            {isStable ? (
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleCalibrate}
                className="w-full py-3.5 bg-[#0BB562] hover:bg-[#099b53] text-white rounded-xl text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                Lock Calibration and Continue <ArrowRight size={18} />
              </motion.button>
            ) : (
              <div className="text-center py-3 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-600 font-bold uppercase tracking-wider">
                Align the blue indicator inside the center circle
              </div>
            )}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex-grow flex flex-col justify-between space-y-6">
          <div className="text-center space-y-2">
            <h5 className="text-lg font-bold text-[#0BB562] uppercase tracking-wider">
              Step 3: Sensors Calibrated
            </h5>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              The gyroscope and accelerometer are synchronized. Head movements will now register accurately without latency.
            </p>
          </div>

          <div className="w-full h-56 sm:h-64 rounded-2xl overflow-hidden border-2 border-[#0BB562] bg-slate-50 flex items-center justify-center relative shadow-sm">
            <img
              src="/images/vr/a1.png"
              alt="Astronaut Space Calibration Active"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-white border border-slate-200 px-3.5 py-1 rounded-full text-xs font-bold text-indigo-700 shadow-sm">
              Calibration complete (0 deg Roll / 0 deg Pitch)
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={onComplete}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            Complete Step and Continue <Check size={18} />
          </motion.button>
        </div>
      )}
    </div>
  );
};

// Lesson 3 Mini-Game: Catch the falling stars
const ControllersGame = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [screenFlashed, setScreenFlashed] = useState(false);
  const [scanActive, setScanActive] = useState(false);
  const [scanPercent, setScanPercent] = useState(0);

  const [laserAngle, setLaserAngle] = useState(0);
  const [targets, setTargets] = useState([
    { id: 1, angle: -30, popped: false },
    { id: 2, angle: 0, popped: false },
    { id: 3, angle: 30, popped: false }
  ]);
  const [laserFired, setLaserFired] = useState(false);

  const [handX, setHandX] = useState(50);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState([
    { id: 1, x: 25, y: 10, speed: 3 },
    { id: 2, x: 75, y: 35, speed: 4 },
    { id: 3, x: 50, y: 60, speed: 3 }
  ]);
  const gameInterval = useRef(null);

  const startConstellationScan = () => {
    setScanActive(true);
    setScanPercent(0);
    const interval = setInterval(() => {
      setScanPercent(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setScreenFlashed(true);
            setTimeout(() => {
              setScreenFlashed(false);
              setStep(2);
            }, 500);
          }, 400);
          return 100;
        }
        return p + 5;
      });
    }, 40);
  };

  const fireTrigger = () => {
    if (laserFired) return;
    setLaserFired(true);
    setTargets(prev =>
      prev.map(t => {
        if (!t.popped && Math.abs(laserAngle - t.angle) <= 12) {
          return { ...t, popped: true };
        }
        return t;
      })
    );
    setTimeout(() => {
      setLaserFired(false);
    }, 300);
  };

  const allTargetsPopped = targets.every(t => t.popped);

  const handleStartStarCatcher = () => {
    setScreenFlashed(true);
    setTimeout(() => {
      setScreenFlashed(false);
      setStep(3);
    }, 500);
  };

  useEffect(() => {
    if (step !== 3) return;
    if (score >= 10) {
      clearInterval(gameInterval.current);
      return;
    }

    gameInterval.current = setInterval(() => {
      setStars(prevStars => {
        const moved = prevStars.map(star => ({
          ...star,
          y: star.y + star.speed
        }));

        let active = moved.filter(star => {
          const isAtBottom = star.y >= 80 && star.y <= 95;
          const isAligned = Math.abs(star.x - handX) <= 15;

          if (isAtBottom && isAligned) {
            setScore(s => Math.min(s + 1, 10));
            return false;
          }
          return star.y < 100;
        });

        if (active.length < 3) {
          active.push({
            id: Math.random(),
            x: 15 + Math.random() * 70,
            y: 0,
            speed: 2.5 + Math.random() * 2
          });
        }
        return active;
      });
    }, 110);

    return () => clearInterval(gameInterval.current);
  }, [step, handX, score]);

  const moveLeft = () => setHandX(x => Math.max(15, x - 14));
  const moveRight = () => setHandX(x => Math.min(85, x + 14));

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 text-[#1A1C2E] relative overflow-hidden flex flex-col justify-between shadow-sm">
      <AnimatePresence>
        {screenFlashed && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-white z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <h4 className="font-extrabold text-indigo-700 flex items-center gap-2 text-base sm:text-lg">
          <Gamepad2 size={22} className="text-indigo-600" /> Mini-Game: Wireless Controller Setup
        </h4>
        <span className="text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full">
          Step {step} of 3
        </span>
      </div>

      {step === 1 && (
        <div className="flex-grow flex flex-col justify-between space-y-6">
          <div className="text-center space-y-2">
            <h5 className="text-lg font-bold text-[#1A1C2E]">Step 1: Scan Controller LED Ring</h5>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              VR headsets use cameras to scan invisible <span className="text-indigo-600 font-bold">Infrared (IR) LED lights</span> on controllers. Click below to begin scanning.
            </p>
          </div>

          <div className="w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center relative">
            <img
              src="/images/vr/vr_controllers.png"
              alt="VR Controllers"
              className="w-full h-full object-cover"
            />
            {scanActive && (
              <div
                className="absolute left-0 right-0 h-1.5 bg-indigo-600 shadow-sm transition-all duration-75"
                style={{ top: `${scanPercent}%` }}
              />
            )}

            {scanActive && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] flex flex-col items-center justify-center">
                <span className="text-base font-bold text-indigo-700 tracking-wide">
                  Scanning LEDs: {scanPercent}%
                </span>
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={startConstellationScan}
            disabled={scanActive}
            className="w-full py-3.5 bg-[#0BB562] hover:bg-[#099b53] disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            {scanActive ? 'Scanning Controller LEDs...' : 'Start LED Detection Scan'} <ArrowRight size={18} />
          </motion.button>
        </div>
      )}

      {step === 2 && (
        <div className="flex-grow flex flex-col justify-between space-y-6">
          <div className="text-center space-y-1">
            <h5 className="text-lg font-bold text-[#1A1C2E]">Step 2: Aim Laser Pointer and Fire Trigger</h5>
            <p className="text-sm text-slate-600">
              Aim the virtual pointer at each target circle, then click <span className="text-[#0BB562] font-bold">Fire Trigger</span> to select it.
            </p>
          </div>

          <div className="w-full h-56 sm:h-60 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 relative flex items-center justify-center shadow-inner">
            {targets.map(t => (
              <div
                key={t.id}
                className="absolute flex flex-col items-center transition-all duration-200"
                style={{
                  left: `calc(50% + ${t.angle * 2.8}px - 18px)`,
                  top: '18%'
                }}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center border shadow-sm ${t.popped ? 'bg-[#0BB562] border-emerald-400 text-white' : 'bg-white border-indigo-500 text-indigo-600'}`}>
                  {t.popped ? <Check size={18} /> : <Target size={18} />}
                </div>
              </div>
            ))}

            <div
              className="absolute origin-bottom w-1 h-48 bg-indigo-600 shadow-sm transition-transform duration-75"
              style={{
                bottom: '10%',
                left: '50%',
                transform: `translateX(-50%) rotate(${laserAngle}deg)`,
                opacity: laserFired ? 1 : 0.6
              }}
            />

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-white border border-slate-300 flex items-center justify-center text-indigo-600 shadow-sm">
                <Hand size={20} className={laserFired ? 'scale-90 text-[#0BB562]' : ''} />
              </div>
            </div>

            <div className="absolute bottom-3 right-3 bg-white border border-slate-200 px-3 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm">
              Targets Selected: {targets.filter(t => t.popped).length} of 3
            </div>
          </div>

          <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-700 uppercase">
                <span>Pointer Angle</span>
                <span className="text-indigo-600 font-bold text-sm">{laserAngle} deg</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setLaserAngle(prev => Math.max(-45, prev - 5))}
                  className="w-10 h-10 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 flex items-center justify-center font-bold text-base text-slate-700 transition-all cursor-pointer select-none active:scale-95 shadow-sm"
                >
                  ◀
                </button>
                <input
                  type="range"
                  min="-45"
                  max="45"
                  value={laserAngle}
                  onChange={(e) => setLaserAngle(Number(e.target.value))}
                  className="flex-grow accent-[#0BB562] h-2.5 rounded-lg cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => setLaserAngle(prev => Math.min(45, prev + 5))}
                  className="w-10 h-10 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 flex items-center justify-center font-bold text-base text-slate-700 transition-all cursor-pointer select-none active:scale-95 shadow-sm"
                >
                  ▶
                </button>
              </div>
            </div>

            <button
              onClick={fireTrigger}
              disabled={allTargetsPopped}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm uppercase tracking-wider rounded-lg transition-all shadow-sm active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Fire Trigger
            </button>
          </div>

          <div className="pt-1">
            {allTargetsPopped && (
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleStartStarCatcher}
                className="w-full py-3.5 bg-[#0BB562] hover:bg-[#099b53] text-white rounded-xl text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                Start Star Catcher Challenge <ArrowRight size={18} />
              </motion.button>
            )}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex-grow flex flex-col justify-between space-y-6">
          {score >= 10 ? (
            <div className="flex-grow flex flex-col justify-between space-y-6">
              <div className="text-center space-y-2">
                <h5 className="text-lg font-bold text-[#0BB562] uppercase tracking-wider">
                  Star Catcher Mastered
                </h5>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  You successfully navigated wireless controllers in spatial 3D space with accuracy.
                </p>
              </div>

              <div className="w-full h-56 sm:h-64 rounded-2xl overflow-hidden border-2 border-[#0BB562] bg-slate-50 flex flex-col items-center justify-center relative py-6 space-y-4 shadow-sm">
                <Trophy size={48} className="text-amber-500" />
                <span className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                  Controllers Active and Synced
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={onComplete}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                Complete Step and Continue <Check size={18} />
              </motion.button>
            </div>
          ) : (
            <div className="flex-grow flex flex-col justify-between space-y-6">
              <div className="text-center space-y-1">
                <h5 className="text-lg font-bold text-[#1A1C2E]">Step 3: Catch 10 Star Items</h5>
                <p className="text-sm text-slate-600">
                  Catch <span className="text-indigo-600 font-bold">10 star items</span> by sliding the controller left and right.
                </p>
              </div>

              <div className="w-full h-56 sm:h-60 bg-slate-50 rounded-2xl border border-slate-200 relative overflow-hidden shadow-inner">
                <div className="absolute top-4 right-4 bg-white border border-slate-200 text-slate-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
                  <Star size={14} className="text-amber-500 fill-amber-400" /> {score} of 10
                </div>

                {stars.map(star => (
                  <div
                    key={star.id}
                    className="absolute text-amber-500 transition-all duration-100"
                    style={{ left: `${star.x}%`, top: `${star.y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    <Star size={24} className="fill-amber-400 text-amber-500" />
                  </div>
                ))}

                <div
                  className="absolute w-20 h-10 bg-indigo-600 border border-white rounded-xl flex items-center justify-center transition-all duration-75 shadow-sm"
                  style={{ left: `${handX}%`, top: '84%', transform: 'translateX(-50%)' }}
                >
                  <Gamepad2 size={18} className="text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={moveLeft}
                  className="py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm uppercase select-none cursor-pointer shadow-sm flex items-center justify-center gap-2"
                >
                  ◀ Slide Left
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={moveRight}
                  className="py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm uppercase select-none cursor-pointer shadow-sm flex items-center justify-center gap-2"
                >
                  Slide Right ▶
                </motion.button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Lesson 4 Mini-Game: VR vs AR vs MR
const RealityGame = ({ onComplete }) => {
  const [selectedMode, setSelectedMode] = useState('none');
  const [visited, setVisited] = useState({});

  const handleSelect = (mode) => {
    setSelectedMode(mode);
    setVisited(prev => ({ ...prev, [mode]: true }));
  };

  const isCompleted = visited.VR && visited.AR && visited.MR;
  const exploredCount = Object.keys(visited).length;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 text-[#1A1C2E] min-h-[460px] flex flex-col justify-between shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <h4 className="font-extrabold text-indigo-700 flex items-center gap-2 text-base sm:text-lg">
          <Sparkles size={22} className="text-indigo-600" /> Mini-Game: Reality Dimension Switcher
        </h4>
        <span className="text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full">
          Modes Explored: {exploredCount} of 3
        </span>
      </div>

      <div className="space-y-6">
        <p className="text-sm text-slate-600 font-medium text-center">
          Click all three buttons below to observe how VR, AR, and MR change the viewer environment.
        </p>

        <div className="w-full h-60 sm:h-72 border border-slate-200 rounded-2xl relative overflow-hidden flex items-center justify-center bg-slate-50 shadow-inner">
          {selectedMode === 'none' && (
            <div className="text-center p-6 space-y-3">
              <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center mx-auto text-indigo-600 border border-indigo-200">
                <Sparkles size={28} />
              </div>
              <div className="text-base text-[#1A1C2E] font-bold">
                Select a Reality Mode below to test the viewer
              </div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Toggle between Virtual, Augmented, and Mixed environments.
              </p>
            </div>
          )}

          {selectedMode === 'VR' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-slate-100">
              <img
                src="/images/vr/vr_hero.png"
                alt="VR Environment"
                className="absolute inset-0 w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-white/40 pointer-events-none" />

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative z-10 flex flex-col items-center text-center space-y-2 bg-white/95 p-5 rounded-2xl border border-slate-200 max-w-sm shadow-md"
              >
                <Rocket size={28} className="text-indigo-600" />
                <h6 className="font-bold text-base text-[#1A1C2E]">Virtual Reality (VR)</h6>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  The physical room is replaced completely by a simulated 3D computer graphic environment.
                </p>
              </motion.div>
            </div>
          )}

          {selectedMode === 'AR' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-slate-50">
              <img
                src="/images/vr/rhs.png"
                alt="Real room table"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-white/20 pointer-events-none" />

              <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-md">
                  <Star size={24} className="text-amber-500 fill-amber-400" />
                </div>
              </div>

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative z-10 mt-auto flex flex-col items-center text-center space-y-1.5 bg-white/95 p-4 rounded-2xl border border-slate-200 max-w-sm shadow-md"
              >
                <h6 className="font-bold text-base text-[#1A1C2E]">Augmented Reality (AR)</h6>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  The physical room remains visible while digital items are overlaid on top of the scene.
                </p>
              </motion.div>
            </div>
          )}

          {selectedMode === 'MR' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-slate-50">
              <img
                src="/images/vr/rhs.png"
                alt="Real room table"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-white/20 pointer-events-none" />

              <div className="absolute left-[38%] top-[50%] w-10 h-10 bg-[#0BB562] border border-white rounded-full shadow-md z-10 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute top-4 z-10 flex flex-col items-center text-center space-y-1 bg-white/95 p-4 rounded-2xl border border-slate-200 max-w-sm shadow-md"
              >
                <h6 className="font-bold text-base text-[#1A1C2E]">Mixed Reality (MR)</h6>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Digital items interact physically with real world objects, such as bouncing off surfaces.
                </p>
              </motion.div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {['VR', 'AR', 'MR'].map(mode => {
            const hasChecked = visited[mode];
            let activeColor = "border-slate-200 bg-white text-slate-700 hover:border-indigo-400 shadow-sm";
            if (selectedMode === mode) {
              if (mode === 'VR') activeColor = "border-indigo-600 bg-indigo-600 text-white shadow-sm";
              if (mode === 'AR') activeColor = "border-amber-500 bg-amber-500 text-white shadow-sm";
              if (mode === 'MR') activeColor = "border-[#0BB562] bg-[#0BB562] text-white shadow-sm";
            }

            return (
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                key={mode}
                onClick={() => handleSelect(mode)}
                className={`py-3.5 rounded-xl border font-bold text-sm transition-all cursor-pointer flex flex-col items-center gap-1 ${activeColor}`}
              >
                <span>{mode} Mode</span>
                <span className={`text-[10px] ${selectedMode === mode ? 'text-white/90' : 'text-slate-500'}`}>
                  {hasChecked ? 'Explored' : 'Select'}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 mt-6">
        {isCompleted ? (
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={onComplete}
            className="w-full py-3.5 bg-[#0BB562] hover:bg-[#099b53] text-white rounded-xl text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            Complete Step and Continue <Check size={18} />
          </motion.button>
        ) : (
          <div className="text-center py-2 text-xs text-slate-500 font-bold uppercase tracking-wider">
            Explore all 3 modes to unlock this step
          </div>
        )}
      </div>
    </div>
  );
};

// Lesson 5 Mini-Game: Safe play space sweeper
const SafetyGame = ({ onComplete }) => {
  const [hazards, setHazards] = useState([
    { id: 1, name: "Skateboard", desc: "Tripping hazard", icon: <AlertOctagon className="w-6 h-6 text-rose-600" />, inside: true, present: true },
    { id: 2, name: "Toy blocks", desc: "Slipping hazard", icon: <LayoutGrid className="w-6 h-6 text-amber-600" />, inside: true, present: true },
    { id: 3, name: "Sleeping Cat", desc: "Pet protection", icon: <Heart className="w-6 h-6 text-purple-600" />, inside: true, present: true },
    { id: 4, name: "Chair", desc: "Outside boundary", icon: <CheckCircle2 className="w-6 h-6 text-slate-400" />, inside: false, present: true },
    { id: 5, name: "Backpack", desc: "Outside boundary", icon: <CheckCircle2 className="w-6 h-6 text-slate-400" />, inside: false, present: true }
  ]);

  const handleClear = (id) => {
    setHazards(prev => prev.map(h => h.id === id ? { ...h, present: false } : h));
  };

  const activeHazardsInside = hazards.filter(h => h.inside && h.present).length;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 text-[#1A1C2E] min-h-[460px] flex flex-col justify-between shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <h4 className="font-extrabold text-indigo-700 flex items-center gap-2 text-base sm:text-lg">
          <Shield size={22} className="text-indigo-600" /> Mini-Game: Clear Safety Play Zone
        </h4>
        <span className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
          Hazards Left: {activeHazardsInside}
        </span>
      </div>

      <div className="space-y-6 flex-grow flex flex-col justify-between">
        <p className="text-sm text-slate-600 font-medium text-center">
          Click on the <span className="text-rose-600 font-bold">3 tripping hazards</span> inside the green dotted boundary to clear the room for safe play.
        </p>

        <div className="w-full h-60 sm:h-72 bg-slate-50 border border-slate-200 rounded-2xl relative overflow-hidden flex items-center justify-center shadow-inner">
          <img 
            src="/images/vr/heaven.png" 
            alt="Safety Room Play Zone" 
            className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none"
          />
          <div className="absolute inset-0 bg-white/40 pointer-events-none" />

          <div className="w-52 h-52 sm:w-60 sm:h-60 border-2 border-dashed border-[#0BB562] rounded-full flex items-center justify-center bg-emerald-50/40 relative shadow-sm">
            <span className="text-[10px] font-bold text-[#0BB562] uppercase tracking-wider absolute top-4">
              Guardian Safe Zone
            </span>
            
            <div className="absolute top-[40%] left-[40%] flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                <User size={24} />
              </div>
              <span className="text-[9px] font-bold bg-white border border-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full shadow-sm mt-1 uppercase">Player</span>
            </div>

            {hazards.filter(h => h.inside && h.present).map((h, i) => {
              const pos = [
                { left: '12%', top: '62%' },
                { left: '72%', top: '52%' },
                { left: '42%', top: '15%' }
              ][i];
              return (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  key={h.id}
                  onClick={() => handleClear(h.id)}
                  className="absolute group flex flex-col items-center cursor-pointer bg-white border border-slate-300 p-2 rounded-xl shadow-sm hover:border-rose-500"
                  style={pos}
                  title={h.name}
                >
                  {h.icon}
                  <span className="text-[10px] font-bold text-slate-700 mt-1">{h.name}</span>
                </motion.button>
              );
            })}
          </div>

          {hazards.filter(h => !h.inside).map((h, i) => {
            const pos = [
              { left: '6%', top: '40%' },
              { right: '6%', top: '35%' }
            ][i];
            return (
              <div
                key={h.id}
                className="absolute flex flex-col items-center opacity-50 select-none bg-slate-100 border border-slate-200 p-2 rounded-xl"
                style={pos}
                title={h.name}
              >
                {h.icon}
                <span className="text-[9px] font-bold text-slate-500 mt-1">{h.name} (Safe)</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 mt-6">
        {activeHazardsInside === 0 ? (
          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={onComplete}
            className="w-full py-3.5 bg-[#0BB562] hover:bg-[#099b53] text-white rounded-xl text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            Complete Step and Continue <Check size={18} />
          </motion.button>
        ) : (
          <div className="text-center py-2 text-xs text-slate-500 font-bold uppercase tracking-wider">
            Clear all hazards inside the green circle to unlock this step
          </div>
        )}
      </div>
    </div>
  );
};

// Quiz Challenge Component
const LessonQuiz = ({ questions, onComplete, lessonBadge }) => {
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
    <div className="bg-white border border-slate-200 text-[#1A1C2E] rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto shadow-sm relative overflow-hidden">
      {showResult && isAllCorrect && <ConfettiExplosion />}

      {!showResult ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle size={16} className="text-indigo-600" /> Question {currentQ + 1} of {questions.length}
            </span>
            <span className="text-xs font-bold text-slate-700 bg-white px-3 py-1 rounded-full border border-slate-200">
              Score: {score}
            </span>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h5 className="text-base sm:text-lg font-bold text-[#1A1C2E] leading-relaxed">
              {q.question}
            </h5>
          </div>

          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              let btnStyle = "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-indigo-400 shadow-sm";
              if (isAnswered) {
                if (idx === q.correct) btnStyle = "bg-emerald-50 border-[#0BB562] text-emerald-900 font-bold shadow-sm";
                else if (idx === selectedOption) btnStyle = "bg-rose-50 border-rose-500 text-rose-900";
                else btnStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
              }
              return (
                <motion.button
                  whileHover={!isAnswered ? { scale: 1.01, x: 3 } : {}}
                  whileTap={!isAnswered ? { scale: 0.99 } : {}}
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 sm:p-5 border rounded-xl text-sm sm:text-base font-semibold transition-all cursor-pointer flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && idx === q.correct && <CheckCircle2 size={20} className="text-[#0BB562] shrink-0" />}
                  {isAnswered && idx === selectedOption && idx !== q.correct && <XCircle size={20} className="text-rose-500 shrink-0" />}
                </motion.button>
              );
            })}
          </div>

          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between items-center pt-4 border-t border-slate-100"
            >
              <span className={`text-sm font-bold flex items-center gap-1.5 ${isCorrectChoice ? 'text-[#0BB562]' : 'text-rose-600'}`}>
                {isCorrectChoice ? "Correct answer." : "Incorrect answer."}
              </span>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold transition-all cursor-pointer shadow-sm flex items-center gap-2"
              >
                <span>{currentQ < questions.length - 1 ? 'Next Question' : 'View Results'}</span>
                <ArrowRight size={16} />
              </motion.button>
            </motion.div>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8 space-y-6"
        >
          <div className="flex justify-center">
            {isAllCorrect ? (
              <div className="w-20 h-20 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto shadow-sm">
                <Trophy size={40} className="text-amber-500" />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto shadow-sm">
                <RefreshCw size={40} className="text-slate-500 animate-spin" />
              </div>
            )}
          </div>

          <div>
            <h5 className="font-extrabold text-[#1A1C2E] text-xl sm:text-2xl">
              {isAllCorrect ? "Quiz Completed Successfully" : "Quiz Requires Review"}
            </h5>
            <p className="text-sm text-slate-600 leading-relaxed font-medium mt-2 max-w-md mx-auto">
              {isAllCorrect
                ? `You achieved 100% accuracy and earned the ${lessonBadge} stamp for your curriculum profile.`
                : `You scored ${score} out of ${questions.length}. A score of 100% is required to earn the lesson badge stamp.`}
            </p>
          </div>

          <div className="pt-2">
            {isAllCorrect ? (
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={onComplete}
                className="w-full py-3.5 bg-[#0BB562] hover:bg-[#099b53] text-white rounded-xl text-sm font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
              >
                <Award size={18} className="text-white" /> Claim {lessonBadge} Stamp <ArrowRight size={18} />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleRestart}
                className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <RefreshCw size={16} /> Retry Quiz
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Main VR Technology Learning Dashboard Component
const VrTechLearning = ({ isEmbedded = false, onBack }) => {
  const navigate = useNavigate();
  const [activeLessonId, setActiveLessonId] = useState(1);
  const [unlockedLessons, setUnlockedLessons] = useState(() => {
    const saved = localStorage.getItem('unlockedVrTechLessons');
    return saved ? JSON.parse(saved) : [1];
  });
  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem('completedVrTechLessons');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Clean, simple step tracker: 1: Story Cards, 2: Gamer Simulator, 3: Stamp Quiz
  const [activeStage, setActiveStage] = useState(1);
  const [gameCleared, setGameCleared] = useState(() => {
    const saved = localStorage.getItem('completedVrTechLessons');
    const comp = saved ? JSON.parse(saved) : [];
    return comp.includes(1);
  });
  const [quizCleared, setQuizCleared] = useState(() => {
    const saved = localStorage.getItem('completedVrTechLessons');
    const comp = saved ? JSON.parse(saved) : [];
    return comp.includes(1);
  });

  const { speakingId, speak, stop } = useSpeechSynthesis();

  useEffect(() => {
    localStorage.setItem('unlockedVrTechLessons', JSON.stringify(unlockedLessons));
  }, [unlockedLessons]);

  useEffect(() => {
    localStorage.setItem('completedVrTechLessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  const currentLesson = lessons[activeLessonId - 1];

  const handleSelectLesson = (id) => {
    setActiveLessonId(id);
    setActiveStage(1);
    stop();
    const isCompleted = completedLessons.includes(id);
    setGameCleared(isCompleted);
    setQuizCleared(isCompleted);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleGameComplete = () => {
    setGameCleared(true);
    setActiveStage(3);
  };

  const handleQuizComplete = () => {
    setQuizCleared(true);
    if (!completedLessons.includes(activeLessonId)) {
      setCompletedLessons(prev => [...prev, activeLessonId]);
    }
    if (activeLessonId < lessons.length) {
      const nextId = activeLessonId + 1;
      if (!unlockedLessons.includes(nextId)) {
        setUnlockedLessons(prev => [...prev, nextId]);
      }
    }
  };

  const handleNextLesson = () => {
    if (activeLessonId < lessons.length) {
      const nextId = activeLessonId + 1;
      setActiveLessonId(nextId);
      setActiveStage(1);
      stop();
      const isCompleted = completedLessons.includes(nextId);
      setGameCleared(isCompleted);
      setQuizCleared(isCompleted);
      window.scrollTo({ top: 350, behavior: 'smooth' });
    }
  };

  const handleRestartJourney = () => {
    if (window.confirm("Do you want to reset your training progress and start from Lesson 1?")) {
      setUnlockedLessons([1]);
      setCompletedLessons([]);
      setActiveLessonId(1);
      setActiveStage(1);
      setGameCleared(false);
      setQuizCleared(false);
    }
  };

  const renderGame = () => {
    switch (activeLessonId) {
      case 1: return <HeadsetGame onComplete={handleGameComplete} />;
      case 2: return <GyroGame onComplete={handleGameComplete} />;
      case 3: return <ControllersGame onComplete={handleGameComplete} />;
      case 4: return <RealityGame onComplete={handleGameComplete} />;
      case 5: return <SafetyGame onComplete={handleGameComplete} />;
      default: return <div>Game module unavailable</div>;
    }
  };


  return (
    <div className={`${isEmbedded ? '' : 'min-h-screen bg-[#F8FAFC]'} flex flex-col font-sans text-[#1A1C2E] overflow-x-hidden selection:bg-indigo-500 selection:text-white transition-all duration-300`}>
      {!isEmbedded && (
        <button
          onClick={() => navigate("/vr-dashboard")}
          className="fixed top-5 left-5 z-50 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-indigo-600 transition-all cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to VR Dashboard
        </button>
      )}

      <main className="flex-1 pb-16">
        <div className="px-4 sm:px-6 md:px-12 max-w-[1400px] mx-auto space-y-4 pt-4 sm:pt-6">

          {/* Sleek Lesson Selection Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 px-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                <LayoutGrid size={16} />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#1A1C2E]">VR Course</h3>
                <p className="text-[11px] text-slate-500 font-medium">Select an unlocked lesson module to begin training</p>
              </div>
            </div>
            {completedLessons.length > 0 && (
              <button
                onClick={handleRestartJourney}
                className="text-xs font-bold text-slate-600 hover:text-rose-600 bg-white hover:bg-rose-50 border border-slate-200 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm hover:border-rose-200"
              >
                <RotateCcw size={13} /> Reset Progress
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 mb-2">
            {lessons.map((less) => {
              const isUnlocked = unlockedLessons.includes(less.id);
              const isCompleted = completedLessons.includes(less.id);
              const isActive = activeLessonId === less.id;

              return (
                <button
                  key={less.id}
                  onClick={() => {
                    if (isUnlocked) {
                      handleSelectLesson(less.id);
                    }
                  }}
                  disabled={!isUnlocked}
                  className={`text-left px-3.5 py-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 min-h-[50px] ${
                    isActive
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md font-bold scale-[1.02]'
                      : isUnlocked
                      ? 'bg-white text-[#1A1C2E] border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 shadow-sm font-medium'
                      : 'bg-slate-100/80 text-slate-400 border-slate-200 cursor-not-allowed opacity-60 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {isActive ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-white shrink-0 animate-pulse" title="Active Lesson" />
                    ) : isCompleted ? (
                      <CheckCircle2 size={16} className="text-[#0BB562] shrink-0" title="Completed" />
                    ) : isUnlocked ? (
                      <span className="w-2 h-2 rounded-full bg-indigo-300 shrink-0" />
                    ) : (
                      <Lock size={14} className="text-slate-400 shrink-0" title="Locked" />
                    )}
                    <span className="text-xs sm:text-sm font-bold truncate">
                      {less.id}. {less.title.split(': ')[1]}
                    </span>
                  </div>
                  {isUnlocked && !isActive && !isCompleted && (
                    <ChevronRight size={14} className="text-slate-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Lesson Main Container */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
                  <Award size={14} className="text-indigo-600" /> Lesson {activeLessonId} Badge: <span className="font-extrabold text-[#1A1C2E]">{currentLesson.badge}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1C2E] tracking-tight">
                  {currentLesson.title}
                </h2>
                <p className="text-sm text-slate-600 mt-1 font-medium">
                  Topic Focus: <span className="text-indigo-600 font-bold">{currentLesson.topic}</span>
                </p>
              </div>

              {/* Sleek Inline Stage Switcher Pill */}
              <div className="bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80 flex items-center gap-1 w-full sm:w-auto shrink-0 self-stretch sm:self-center">
                {[
                  { id: 1, step: "Step 1", label: "Learn Cards", icon: <BookOpen size={15} />, cleared: true },
                  { id: 2, step: "Step 2", label: "Take Quiz", icon: <Trophy size={15} />, cleared: quizCleared }
                ].map(stg => (
                  <button
                    key={stg.id}
                    onClick={() => setActiveStage(stg.id)}
                    className={`flex-1 sm:flex-initial py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 min-h-[40px] ${
                      activeStage === stg.id
                        ? 'bg-white text-[#1A1C2E] shadow-sm text-indigo-600 ring-1 ring-slate-200/50'
                        : stg.cleared
                        ? 'text-[#0BB562] hover:bg-white/50 font-medium'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-white/50 font-medium'
                    }`}
                  >
                    {stg.cleared && activeStage !== stg.id ? <CheckCircle2 size={15} className="text-[#0BB562]" /> : stg.icon}
                    <span>{stg.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stage Content Area */}
            <div className="min-h-[350px]">
              <AnimatePresence mode="wait">
                {activeStage === 1 && (
                  <motion.div
                    key="stage-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="max-w-4xl mx-auto space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {currentLesson.learnSections.map((sec, idx) => (
                        <div
                          key={idx}
                          className="group p-5 rounded-3xl border border-slate-200 transition-all duration-300 bg-white hover:bg-gradient-to-b hover:from-white hover:to-slate-50/80 shadow-sm hover:shadow-md hover:border-indigo-300 flex flex-col justify-between"
                        >
                          <div>
                            <div className="w-full aspect-square max-h-40 mx-auto rounded-2xl bg-gradient-to-br from-slate-50 via-white to-slate-100 border border-slate-200/60 p-3 flex items-center justify-center mb-4 overflow-hidden group-hover:border-indigo-200 transition-colors shadow-inner">
                              <img
                                src={sec.image}
                                alt={sec.title}
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>

                            <div className="space-y-2">
                              <span className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-700 text-[10px] font-extrabold uppercase tracking-wider">
                                Topic {idx + 1}
                              </span>
                              <h4 className="font-extrabold text-base sm:text-lg text-[#1A1C2E] leading-snug group-hover:text-indigo-600 transition-colors">
                                {sec.title}
                              </h4>
                              <p className="text-xs sm:text-sm font-normal text-slate-600 leading-relaxed pt-1">
                                {sec.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setActiveStage(2)}
                        className="w-full py-4 bg-gradient-to-r from-[#0BB562] to-[#099b53] hover:from-[#099b53] hover:to-[#088748] text-white rounded-2xl text-sm font-extrabold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg cursor-pointer group"
                      >
                        <span>Next Stage</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {activeStage === 2 && (
                  <motion.div
                    key="stage-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="py-2"
                  >
                    {quizCleared ? (
                      <div className="bg-white border border-slate-200 text-[#1A1C2E] rounded-3xl p-6 sm:p-8 text-center max-w-xl mx-auto space-y-5 shadow-sm relative overflow-hidden">
                        <ConfettiExplosion />

                        <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto shadow-sm">
                          <Trophy size={32} className="text-amber-500" />
                        </div>

                        <div>
                          <span className="text-xs font-bold text-[#0BB562] uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                            Assessment Verified
                          </span>
                          <h4 className="font-extrabold text-xl sm:text-2xl text-[#1A1C2E] mt-3">
                            Module Completed: {currentLesson.badge}
                          </h4>
                          <p className="text-sm text-slate-600 leading-relaxed font-medium mt-2">
                            You have successfully demonstrated comprehension of this lesson module. Your recognition badge has been recorded.
                          </p>
                        </div>

                        {activeLessonId < lessons.length ? (
                          <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={handleNextLesson}
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <span>Proceed to Lesson {activeLessonId + 1}: {lessons[activeLessonId].badge}</span> <ArrowRight size={18} />
                          </motion.button>
                        ) : (
                          <div className="space-y-4 pt-2">
                            <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-center shadow-sm">
                              <p className="text-sm text-amber-900 font-bold">
                                You have successfully completed all 5 VR Technology modules.
                              </p>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => {
                                if (isEmbedded && onBack) {
                                  onBack();
                                } else {
                                  navigate('/vr-dashboard');
                                }
                              }}
                              className="w-full py-3 bg-[#0BB562] hover:bg-[#099b53] text-white rounded-xl text-sm font-bold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <Award size={18} /> Return to VR Dashboard
                            </motion.button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <LessonQuiz
                        questions={currentLesson.quiz}
                        onComplete={handleQuizComplete}
                        lessonBadge={currentLesson.badge}
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default VrTechLearning;
