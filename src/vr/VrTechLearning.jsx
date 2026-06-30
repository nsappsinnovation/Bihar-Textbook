import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, BookOpen, Shield, Trophy,
  GraduationCap, ChevronRight, CheckCircle2, XCircle,
  Gamepad2, Sparkles, AlertOctagon, Rocket, Lock,
  Cpu, Eye, RefreshCw, Star, HelpCircle, Check, Hand
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// 5 Curriculum Lessons Database
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
        desc: "Virtual Reality (VR) is like putting on a pair of magic goggles. Instead of looking at a flat screen like a TV, these goggles completely cover your eyes. When you turn your head, you see a brand new 3D world all around you!"
      },
      {
        title: "Tricking Your Brain",
        desc: "How does it feel so real? The headset shows slightly different pictures to each of your eyes (just like how we see in real life). It also plays 3D sounds that change depending on where you look. Your brain gets tricked into thinking you are actually there!"
      },
      {
        title: "Where Can You Go?",
        desc: "With VR, you don't just watch a video. You can walk on Mars, swim next to a giant blue whale, explore an ancient castle, or sit inside a spaceship. The possibilities are endless!"
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
    image: "/images/vr/vr_headset_work.png",
    learnSections: [
      {
        title: "The Screen & Curvy Glass Lenses",
        desc: "Inside the headset, there is a small, bright high-definition screen. But since the screen is super close to your face, it would look blurry. That's why there are two curved glass lenses in between! They bend the light so your eyes can focus comfortably on the virtual world."
      },
      {
        title: "Follow-Me Sensors",
        desc: "How does the headset know you turned your head? It has built-in sensors called gyroscopes and accelerometers (the same sensors that track steps on a phone). They measure your movements hundreds of times a second so the virtual camera moves instantly!"
      },
      {
        title: "Low Latency (Fast Response)",
        desc: "If the screen camera moves too slowly when you turn your head, it feels weird. Good VR headsets update the image instantly (in less than 20 milliseconds) so everything feels natural and comfortable."
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
        desc: "To interact with the VR world, you hold wireless controllers in your hands. The headset tracks their position using sensors or cameras. When you move your hand in real life, a virtual hand or magic wand moves exactly the same way in the headset!"
      },
      {
        title: "Pressing Buttons & Grabbing",
        desc: "VR controllers have buttons, joysticks, and trigger buttons under your fingers. You can squeeze the trigger to pick up a virtual sword, pull a lever, throw a basketball, or draw in the air!"
      },
      {
        title: "Feeling the Action (Haptics)",
        desc: "When you touch or grab something in VR, the controllers rumble or vibrate. This is called haptic feedback. It lets you 'feel' the virtual environment, like the tension of drawing a bow string or the bounce of a ball."
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
        desc: "VR completely blocks out the real world. You see only digital computer graphics. If you turn around, you see the digital sky, not your room wall. You are 100% inside the computer's world."
      },
      {
        title: "Augmented Reality (AR) - The Digital Overlay",
        desc: "AR does NOT hide your real room. It overlays digital stickers or holograms on top of it. Think of Pokémon GO or camera filters that add puppy ears to your face. You see the real world with virtual extras!"
      },
      {
        title: "Mixed Reality (MR) - The Interactive Merge",
        desc: "MR is a super-advanced blend. Digital objects don't just float; they interact with real physical items! For example, a digital puppy can hide behind your real chair, or a virtual ball can bounce off your real kitchen table."
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
        desc: "Since you cannot see your actual room while in VR, you must draw a safe play circle on the floor first. If you get too close to the edge, a glowing virtual grid appears in your view to warn you. This is the Guardian System!"
      },
      {
        title: "Clear the Floor!",
        desc: "Before putting on the headset, always make sure the floor is empty. Clear away toys, skateboards, cups of water, and move chairs. Keep pets out of the room so you don't accidentally step on your dog or cat!"
      },
      {
        title: "The 20-20-20 Rule for Eyes",
        desc: "VR screens are close to your eyes. To avoid headaches or eye strain, take a break every 20 minutes. Look at something 20 feet away for 20 seconds. If you ever feel dizzy, take off the headset immediately and rest."
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

// Lesson 1 Mini-Game: Wear the Headset
const HeadsetGame = ({ onComplete }) => {
  const [step, setStep] = useState(1); // 1: Wear, 2: Calibrate IPD, 3: Enter Portal
  const [ipd, setIpd] = useState(50);
  const [screenFlashed, setScreenFlashed] = useState(false);

  const handlePutOn = () => {
    setScreenFlashed(true);
    setTimeout(() => {
      setScreenFlashed(false);
      setStep(2);
    }, 600);
  };

  const handleLockFocus = () => {
    setScreenFlashed(true);
    setTimeout(() => {
      setScreenFlashed(false);
      setStep(3);
    }, 600);
  };

  const isFocused = Math.abs(ipd - 65) <= 1;
  const blurAmount = isFocused ? 0 : Math.abs(ipd - 65) * 0.45;

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-900 border-2 border-indigo-500/40 rounded-2xl p-5 text-white relative overflow-hidden min-h-[380px] flex flex-col justify-between">
      {/* Screen flash effect */}
      <AnimatePresence>
        {screenFlashed && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-white z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <h4 className="font-bold text-indigo-400 flex items-center gap-2"><Gamepad2 size={18} /> Gamer Step: Wear & Setup Headset</h4>
        <span className="text-[10px] font-black text-yellow-400 bg-yellow-400/10 border border-yellow-500/35 px-2 py-0.5 rounded">STEP {step} / 3</span>
      </div>

      {step === 1 && (
        <div className="flex-grow flex flex-col justify-between space-y-4">
          <div className="text-center space-y-1">
            <h5 className="text-xs font-bold text-slate-100">Step 1: Pick Up The VR Headset</h5>
            <p className="text-[11px] text-slate-400">Put on the VR Headset sitting on the study table to boot up the virtual reality world!</p>
          </div>

          <div className="w-full h-44 md:h-52 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 flex items-center justify-center relative group">
            <img
              src="/images/vr/vr_headset_table.png"
              alt="VR Headset on table"
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-indigo-950/20 pointer-events-none" />
          </div>

          <button
            onClick={handlePutOn}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1"
          >
            Put On Headset <ArrowRight size={14} />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex-grow flex flex-col justify-between space-y-4">
          <div className="text-center space-y-1">
            <h5 className="text-xs font-bold text-slate-100">Step 2: Calibrate Lens Focus (IPD)</h5>
            <p className="text-[11px] text-slate-400">
              The screen looks extremely blurry! Slide the IPD (Interpupillary Distance) slider or use the buttons until the galaxy snaps into perfect focus (Target: <span className="text-cyan-400 font-bold">65mm</span>).
            </p>
          </div>

          {/* Blur Simulator View */}
          <div className="w-full h-56 md:h-64 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 flex items-center justify-center relative">
            <img
              src="/images/vr/vr_intro.png"
              alt="Blur Space Portal"
              className="w-full h-full object-cover transition-all duration-75"
              style={{ filter: `blur(${blurAmount}px)` }}
            />
            {!isFocused ? (
              <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
                <span className="bg-rose-500/80 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow border border-rose-400/30 animate-pulse">
                  Blurry: Lenses Misaligned ({ipd}mm)
                </span>
              </div>
            ) : (
              <div className="absolute inset-0 bg-emerald-500/10 flex items-center justify-center pointer-events-none">
                <span className="bg-emerald-500 text-slate-950 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow animate-bounce">
                  Perfect Focus! ({ipd}mm)
                </span>
              </div>
            )}
          </div>

          <div className="space-y-1.5 bg-slate-800/40 p-2.5 rounded-xl border border-slate-800">
            <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase">
              <span>LENS DISTANCE (IPD)</span>
              <span className={isFocused ? "text-emerald-400" : "text-slate-350"}>{ipd} mm</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIpd(prev => Math.max(50, prev - 1))}
                className="w-8 h-8 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 flex items-center justify-center font-black text-slate-300 hover:text-white transition-all select-none active:scale-95 cursor-pointer"
              >
                -
              </button>
              <input
                type="range"
                min="50"
                max="80"
                value={ipd}
                onChange={(e) => setIpd(Number(e.target.value))}
                className="flex-grow accent-indigo-500 bg-slate-950 h-1.5 rounded-lg cursor-pointer"
              />
              <button
                type="button"
                onClick={() => setIpd(prev => Math.min(80, prev + 1))}
                className="w-8 h-8 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 flex items-center justify-center font-black text-slate-300 hover:text-white transition-all select-none active:scale-95 cursor-pointer"
              >
                +
              </button>
            </div>
            <div className="flex justify-between text-[8px] text-slate-500 font-bold">
              <span>50mm (Narrow)</span>
              <span>80mm (Wide)</span>
            </div>
          </div>

          <button
            onClick={handleLockFocus}
            disabled={!isFocused}
            className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1 ${isFocused
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-md'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-750'
              }`}
          >
            Lock Focus & Engage Portal <ArrowRight size={14} />
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="flex-grow flex flex-col justify-between space-y-4">
          <div className="text-center space-y-1">
            <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Step 3: Portal Fully Initialized!</h5>
            <p className="text-[11px] text-slate-400">
              The digital universe dissolved your physical room. You are now floating inside the cosmic learning galaxy!
            </p>
          </div>

          {/* Sharp space kid visual */}
          <div className="w-full h-56 md:h-64 rounded-xl overflow-hidden border border-indigo-500/30 bg-slate-950 flex items-center justify-center relative shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <img
              src="/images/vr/vr_intro.png"
              alt="Space Portal Active"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-2 left-2 bg-indigo-600/30 border border-indigo-400/20 px-2 py-0.5 rounded text-[8px] font-black text-indigo-300 uppercase tracking-widest">
              Lenses calibrated ({ipd}mm)
            </div>
          </div>

          <button
            onClick={onComplete}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1 shadow-md shadow-indigo-500/20"
          >
            Claim Space Stamp & Continue <Check size={14} />
          </button>
        </div>
      )}
    </div>
  );
};
// Lesson 2 Mini-Game: Gyro Head Tracking
const GyroGame = ({ onComplete }) => {
  const [step, setStep] = useState(1); // 1: Sensor Check, 2: Bubble Balance Calibration, 3: Success
  const [roll, setRoll] = useState(30);   // left/right tilt: target is 0
  const [pitch, setPitch] = useState(-25); // forward/backward tilt: target is 0
  const [screenFlashed, setScreenFlashed] = useState(false);

  const handlePowerUp = () => {
    setScreenFlashed(true);
    setTimeout(() => {
      setScreenFlashed(false);
      setStep(2);
    }, 600);
  };

  const handleCalibrate = () => {
    setScreenFlashed(true);
    setTimeout(() => {
      setScreenFlashed(false);
      setStep(3);
    }, 600);
  };

  // Stable if both roll and pitch are within +/- 5
  const isStable = Math.abs(roll) <= 5 && Math.abs(pitch) <= 5;

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-900 border-2 border-indigo-500/40 rounded-2xl p-5 text-white relative overflow-hidden min-h-[380px] flex flex-col justify-between">
      {/* Screen flash effect */}
      <AnimatePresence>
        {screenFlashed && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-white z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <h4 className="font-bold text-indigo-400 flex items-center gap-2"><Eye size={18} /> Gamer Step: Gyroscope Calibration</h4>
        <span className="text-[10px] font-black text-yellow-400 bg-yellow-400/10 border border-yellow-500/35 px-2 py-0.5 rounded">STEP {step} / 3</span>
      </div>

      {step === 1 && (
        <div className="flex-grow flex flex-col justify-between space-y-4">
          <div className="text-center space-y-1">
            <h5 className="text-xs font-bold text-slate-100">Step 1: Inspect the Sensors</h5>
            <p className="text-[11px] text-slate-400">
              Meet the <span className="text-yellow-400 font-bold">Gyroscope</span> and <span className="text-yellow-400 font-bold">Accelerometer</span>. These twin chips inside the headset track your rotational angles and changes in speed!
            </p>
          </div>

          <div className="w-full h-56 md:h-64 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 flex items-center justify-center relative group">
            <img
              src="/images/vr/vr_sensors_chip.png"
              alt="VR Headset Sensors"
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-indigo-950/20 pointer-events-none" />
          </div>

          <button
            onClick={handlePowerUp}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1"
          >
            Power Up Balance Pod <ArrowRight size={14} />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex-grow flex flex-col justify-between space-y-4">
          <div className="text-center space-y-1">
            <h5 className="text-xs font-bold text-slate-100">Step 2: Center the Bubble (Gyro level)</h5>
            <p className="text-[11px] text-slate-400">
              Your gyroscope acts like a 3D bubble level. Click buttons or drag sliders to balance the bubble in the center of the crosshair!
            </p>
          </div>

          {/* Leveling Bubble Indicator */}
          <div className="w-full h-56 md:h-64 rounded-xl overflow-hidden border border-slate-750 bg-slate-950 flex items-center justify-center relative">
            {/* Attitude target grid */}
            <div className="absolute inset-0 border border-white/5 flex items-center justify-center pointer-events-none">
              {/* Target rings */}
              <div className="w-48 h-48 border border-slate-800 rounded-full flex items-center justify-center">
                <div className="w-36 h-36 border border-slate-700 rounded-full flex items-center justify-center">
                  <div className="w-24 h-24 border border-indigo-500/25 rounded-full flex items-center justify-center">
                    <div className="w-10 h-10 border border-emerald-500/40 bg-emerald-500/5 rounded-full flex items-center justify-center">
                      <span className="text-[10px] text-emerald-400 font-bold opacity-30">+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bubble element */}
            <div
              className="absolute w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 border border-white/40 shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-150 flex items-center justify-center"
              style={{
                left: `calc(50% + ${roll * 2.2}px - 14px)`,
                top: `calc(50% + ${pitch * 2.2}px - 14px)`
              }}
            >
              <div className="w-2.5 h-2.5 bg-white/60 rounded-full absolute top-1 left-1" />
            </div>

            {/* Live feedback text */}
            <div className="absolute bottom-2.5 left-2.5 bg-slate-900/90 border border-slate-700 px-2 py-1 rounded text-[8px] font-black uppercase tracking-wider">
              Status: {isStable ? (
                <span className="text-emerald-400 animate-pulse">● STABILIZED ({roll}°, {pitch}°)</span>
              ) : (
                <span className="text-rose-400">○ TILTED ({roll}°, {pitch}°)</span>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-3 bg-slate-800/40 p-3 rounded-xl border border-slate-800">
            {/* Roll Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[9px] font-black text-slate-455 uppercase">
                <span>Roll (Left / Right Tilt)</span>
                <span className={Math.abs(roll) <= 5 ? "text-emerald-400" : "text-slate-350"}>{roll}°</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setRoll(prev => Math.max(-40, prev - 5))}
                  className="w-7 h-7 rounded bg-slate-950 hover:bg-slate-850 border border-slate-800 flex items-center justify-center font-bold text-slate-300 hover:text-white transition-all cursor-pointer select-none active:scale-95"
                >
                  -
                </button>
                <input
                  type="range"
                  min="-40"
                  max="40"
                  value={roll}
                  onChange={(e) => setRoll(Number(e.target.value))}
                  className="flex-grow accent-cyan-400 bg-slate-950 h-1 rounded-lg cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => setRoll(prev => Math.min(40, prev + 5))}
                  className="w-7 h-7 rounded bg-slate-950 hover:bg-slate-850 border border-slate-800 flex items-center justify-center font-bold text-slate-300 hover:text-white transition-all cursor-pointer select-none active:scale-95"
                >
                  +
                </button>
              </div>
            </div>

            {/* Pitch Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[9px] font-black text-slate-455 uppercase">
                <span>Pitch (Tilt Forward / Backward)</span>
                <span className={Math.abs(pitch) <= 5 ? "text-emerald-400" : "text-slate-350"}>{pitch}°</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPitch(prev => Math.max(-40, prev - 5))}
                  className="w-7 h-7 rounded bg-slate-950 hover:bg-slate-850 border border-slate-800 flex items-center justify-center font-bold text-slate-300 hover:text-white transition-all cursor-pointer select-none active:scale-95"
                >
                  -
                </button>
                <input
                  type="range"
                  min="-40"
                  max="40"
                  value={pitch}
                  onChange={(e) => setPitch(Number(e.target.value))}
                  className="flex-grow accent-cyan-400 bg-slate-950 h-1 rounded-lg cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => setPitch(prev => Math.min(40, prev + 5))}
                  className="w-7 h-7 rounded bg-slate-950 hover:bg-slate-850 border border-slate-800 flex items-center justify-center font-bold text-slate-300 hover:text-white transition-all cursor-pointer select-none active:scale-95"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="pt-1">
            {isStable ? (
              <button
                onClick={handleCalibrate}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20"
              >
                Lock Calibration & Lock Orbit <ArrowRight size={14} />
              </button>
            ) : (
              <div className="text-center py-2 bg-slate-800/20 border border-slate-800/40 rounded-xl text-[9px] text-slate-400 font-black tracking-widest uppercase">
                Align the bubble inside the center ring!
              </div>
            )}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex-grow flex flex-col justify-between space-y-4">
          <div className="text-center space-y-1">
            <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Step 3: Orbit Locked!</h5>
            <p className="text-[11px] text-slate-400">
              The gyroscope and accelerometer synchronized successfully. You are now balanced and floating in orbit!
            </p>
          </div>

          {/* Astronaut floating in space visual (v3.png) */}
          <div className="w-full h-56 md:h-64 rounded-xl overflow-hidden border border-indigo-500/30 bg-slate-950 flex items-center justify-center relative shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <img
              src="/images/vr/v3.png"
              alt="Astronaut Space Calibration Active"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-2 left-2 bg-emerald-600/30 border border-emerald-450/20 px-2 py-0.5 rounded text-[8px] font-black text-emerald-300 uppercase tracking-widest">
              LENS CALIBRATION SYNCED (0° ROLL / 0° PITCH)
            </div>
          </div>

          <button
            onClick={onComplete}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1 shadow-md shadow-indigo-500/20"
          >
            Claim Sensor Stamp & Continue <Check size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

// Lesson 3 Mini-Game: Catch the falling stars
const ControllersGame = ({ onComplete }) => {
  const [step, setStep] = useState(1); // 1: Constellation Scan, 2: Laser Targeting, 3: Spatial Star Catcher
  const [screenFlashed, setScreenFlashed] = useState(false);
  const [scanActive, setScanActive] = useState(false);
  const [scanPercent, setScanPercent] = useState(0);

  // Step 2 Laser Aim states
  const [laserAngle, setLaserAngle] = useState(0); // -45 to 45 degrees
  const [targets, setTargets] = useState([
    { id: 1, angle: -30, popped: false },
    { id: 2, angle: 0, popped: false },
    { id: 3, angle: 30, popped: false }
  ]);
  const [laserFired, setLaserFired] = useState(false);

  // Step 3 Star catching states
  const [handX, setHandX] = useState(50);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState([
    { id: 1, x: 25, y: 10, speed: 3 },
    { id: 2, x: 75, y: 35, speed: 4 },
    { id: 3, x: 50, y: 60, speed: 3 }
  ]);
  const gameInterval = useRef(null);

  // Scan trigger in Step 1
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
            }, 600);
          }, 400);
          return 100;
        }
        return p + 4;
      });
    }, 50);
  };

  // Manual aiming - no sweep effect needed

  // Step 2 fire trigger
  const fireTrigger = () => {
    if (laserFired) return;
    setLaserFired(true);
    setTargets(prev =>
      prev.map(t => {
        if (!t.popped && Math.abs(laserAngle - t.angle) <= 8) {
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
    }, 600);
  };

  // Step 3 falling stars game loop
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
          const isAtBottom = star.y >= 82 && star.y <= 92;
          const isAligned = Math.abs(star.x - handX) <= 12;

          if (isAtBottom && isAligned) {
            setScore(s => Math.min(s + 1, 10));
            return false; // caught
          }
          return star.y < 100; // still on screen
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
    }, 120);

    return () => clearInterval(gameInterval.current);
  }, [step, handX, score]);

  const moveLeft = () => setHandX(x => Math.max(15, x - 10));
  const moveRight = () => setHandX(x => Math.min(85, x + 10));

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-900 border-2 border-indigo-500/40 rounded-2xl p-5 text-white relative overflow-hidden min-h-[380px] flex flex-col justify-between">
      {/* Screen flash effect */}
      <AnimatePresence>
        {screenFlashed && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-white z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <h4 className="font-bold text-indigo-400 flex items-center gap-2"><Gamepad2 size={18} /> Gamer Step: Controller Setup</h4>
        <span className="text-[10px] font-black text-yellow-400 bg-yellow-400/10 border border-yellow-500/35 px-2 py-0.5 rounded">STEP {step} / 3</span>
      </div>

      {step === 1 && (
        <div className="flex-grow flex flex-col justify-between space-y-4">
          <div className="text-center space-y-1">
            <h5 className="text-xs font-bold text-slate-100">Step 1: Constellation Detection</h5>
            <p className="text-[11px] text-slate-400">
              VR headsets use cameras to scan the invisible <span className="text-yellow-400 font-bold">Infrared (IR) LED rings</span> on your controllers to track their positions!
            </p>
          </div>

          <div className="w-full h-56 md:h-64 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 flex items-center justify-center relative">
            <img
              src="/images/vr/vr_controllers.png"
              alt="VR Controllers"
              className="w-full h-full object-cover opacity-80"
            />
            {/* Scan animation line */}
            {scanActive && (
              <div
                className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_10px_#22d3ee] transition-all duration-75"
                style={{ top: `${scanPercent}%` }}
              />
            )}

            {scanActive && (
              <div className="absolute inset-0 bg-cyan-950/20 flex flex-col items-center justify-center">
                <span className="text-xs font-black text-cyan-300 tracking-wider">SCANNING LEDS: {scanPercent}%</span>
              </div>
            )}
          </div>

          <button
            onClick={startConstellationScan}
            disabled={scanActive}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1"
          >
            {scanActive ? 'Scanning Constellation...' : 'Scan Controller LEDs'} <ArrowRight size={14} />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex-grow flex flex-col justify-between space-y-4">
          <div className="text-center space-y-1">
            <h5 className="text-xs font-bold text-slate-100">Step 2: Calibrate the Trigger</h5>
            <p className="text-[11px] text-slate-400">
              Controllers project virtual lasers. Drag the slider to aim the laser pointer at each target node, then click <span className="text-yellow-400 font-bold">FIRE TRIGGER</span> to pop it!
            </p>
          </div>

          {/* Laser targeting screen */}
          <div className="w-full h-56 md:h-64 rounded-xl overflow-hidden border border-slate-750 bg-slate-950 relative flex items-center justify-center">
            {/* Target nodes */}
            {targets.map(t => (
              <div
                key={t.id}
                className="absolute flex flex-col items-center transition-all duration-200"
                style={{
                  left: `calc(50% + ${t.angle * 2.5}px - 14px)`,
                  top: '15%'
                }}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 ${t.popped ? 'bg-emerald-500/20 border-emerald-400' : 'bg-slate-900 border-indigo-400/50 animate-pulse'}`}>
                  {t.popped ? <Check size={12} className="text-emerald-455" /> : <span className="text-[8px] font-bold text-indigo-300">Target</span>}
                </div>
              </div>
            ))}

            {/* Sweep laser line */}
            <div
              className="absolute origin-bottom w-0.5 h-44 bg-gradient-to-t from-cyan-400/20 to-cyan-400 shadow-[0_0_10px_#22d3ee] transition-transform duration-75"
              style={{
                bottom: '10%',
                left: '50%',
                transform: `translateX(-50%) rotate(${laserAngle}deg)`,
                opacity: laserFired ? 1 : 0.4
              }}
            />

            {/* Controller hand representation at base */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400">
                <Hand size={14} className={laserFired ? 'scale-90 text-cyan-400' : ''} />
              </div>
            </div>

            {/* Targets popped counter */}
            <div className="absolute bottom-2 right-2 bg-slate-900/90 border border-slate-700 px-2 py-0.5 rounded text-[8px] font-black text-slate-400">
              POPPED: {targets.filter(t => t.popped).length} / 3
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-3 bg-slate-800/40 p-3 rounded-xl border border-slate-800">
            <div className="space-y-1">
              <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase">
                <span>Aim Laser Pointer</span>
                <span className="text-cyan-400">{laserAngle}°</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLaserAngle(prev => Math.max(-45, prev - 5))}
                  className="w-7 h-7 rounded bg-slate-950 hover:bg-slate-850 border border-slate-800 flex items-center justify-center font-bold text-slate-350 hover:text-white transition-all cursor-pointer select-none active:scale-95"
                >
                  ◀
                </button>
                <input
                  type="range"
                  min="-45"
                  max="45"
                  value={laserAngle}
                  onChange={(e) => setLaserAngle(Number(e.target.value))}
                  className="flex-grow accent-cyan-400 bg-slate-950 h-1 rounded-lg cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => setLaserAngle(prev => Math.min(45, prev + 5))}
                  className="w-7 h-7 rounded bg-slate-950 hover:bg-slate-850 border border-slate-800 flex items-center justify-center font-bold text-slate-350 hover:text-white transition-all cursor-pointer select-none active:scale-95"
                >
                  ▶
                </button>
              </div>
            </div>

            <button
              onClick={fireTrigger}
              disabled={allTargetsPopped}
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)] active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border border-indigo-400/30"
            >
              🎯 Fire Trigger (Select Target)
            </button>
          </div>

          <div className="pt-1">
            {allTargetsPopped && (
              <button
                onClick={handleStartStarCatcher}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1 shadow-md shadow-emerald-500/20"
              >
                Start Spatial Catching <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex-grow flex flex-col justify-between space-y-4">
          {score >= 10 ? (
            <div className="flex-grow flex flex-col justify-between space-y-4">
              <div className="text-center space-y-1">
                <h5 className="text-xs font-bold text-emerald-455 uppercase tracking-wider">Spatial Lock Acquired!</h5>
                <p className="text-[11px] text-slate-400">
                  You successfully calibrated and navigated virtual wands in 6 Degrees of Freedom!
                </p>
              </div>

              {/* Success View */}
              <div className="w-full h-56 md:h-64 rounded-xl overflow-hidden border border-indigo-500/30 bg-slate-950 flex flex-col items-center justify-center relative py-4 space-y-4 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                <Trophy size={48} className="text-yellow-400 animate-bounce" />
                <span className="text-[9px] font-black uppercase text-indigo-300 tracking-widest">
                  CONTROLLERS ACTIVE & SYNCED
                </span>
              </div>

              <button
                onClick={onComplete}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1 shadow-md shadow-indigo-500/20"
              >
                Claim Sorcerer Stamp & Unlock Next <Check size={14} />
              </button>
            </div>
          ) : (
            <div className="flex-grow flex flex-col justify-between space-y-4">
              <div className="text-center space-y-1">
                <h5 className="text-xs font-bold text-slate-100">Step 3: 6-DOF Spatial Star Catcher</h5>
                <p className="text-[11px] text-slate-400">
                  Catch 10 falling star cores by sliding your hands left and right. 6-DOF tracks your hands in any direction!
                </p>
              </div>

              {/* Star catcher viewport */}
              <div className="w-full h-56 md:h-64 bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden">
                {/* Score badge */}
                <div className="absolute top-2 right-2 bg-yellow-400/10 border border-yellow-500/30 px-2 py-0.5 rounded text-[8px] font-black text-yellow-400 flex items-center gap-1">
                  <Star size={8} className="fill-current" /> {score} / 10
                </div>

                {/* Stars */}
                {stars.map(star => (
                  <div
                    key={star.id}
                    className="absolute text-yellow-400 text-lg transition-all duration-100"
                    style={{ left: `${star.x}%`, top: `${star.y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    ★
                  </div>
                ))}

                {/* Left & Right Hand controllers at bottom */}
                <div
                  className="absolute w-14 h-8 bg-indigo-600/30 border-2 border-indigo-400 rounded-lg flex items-center justify-center transition-all duration-75 shadow-[0_0_10px_rgba(99,102,241,0.4)]"
                  style={{ left: `${handX}%`, top: '85%', transform: 'translateX(-50%)' }}
                >
                  <Cpu size={14} className="text-cyan-400 animate-pulse" />
                </div>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={moveLeft}
                  className="py-2.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl font-black text-[10px] uppercase select-none active:scale-95 cursor-pointer"
                >
                  ◀ Slide Left
                </button>
                <button
                  onClick={moveRight}
                  className="py-2.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl font-black text-[10px] uppercase select-none active:scale-95 cursor-pointer"
                >
                  Slide Right ▶
                </button>
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
  const [selectedMode, setSelectedMode] = useState('none'); // 'none' | 'VR' | 'AR' | 'MR'
  const [visited, setVisited] = useState({});

  const handleSelect = (mode) => {
    setSelectedMode(mode);
    setVisited(prev => ({ ...prev, [mode]: true }));
  };

  const isCompleted = visited.VR && visited.AR && visited.MR;
  const exploredCount = Object.keys(visited).length;

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-900 border-2 border-indigo-500/40 rounded-2xl p-5 text-white min-h-[300px] flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <h4 className="font-bold text-indigo-400 flex items-center gap-2"><Sparkles size={18} /> Gamer Step: Reality Dimension Switcher</h4>
        <span className="text-[10px] font-black text-yellow-400 bg-yellow-400/10 border border-yellow-500/35 px-2 py-0.5 rounded">MODES: {exploredCount} / 3</span>
      </div>

      <div className="space-y-4">
        <p className="text-xs text-slate-350">
          Try out all three dimension modes below to see how VR, AR, and MR change what you see in the room.
        </p>

        {/* Dimension simulator visor */}
        <div className="w-full h-64 border-2 border-indigo-500/30 rounded-2xl relative overflow-hidden flex items-center justify-center bg-slate-950 shadow-inner">
          {selectedMode === 'none' && (
            <div className="text-center p-5 space-y-3">
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mx-auto text-indigo-400 border border-indigo-500/20 animate-pulse">
                <Sparkles size={20} />
              </div>
              <div className="text-xs text-indigo-300 font-extrabold uppercase tracking-wider">
                Select a Reality Dimension below to activate Visor
              </div>
              <p className="text-[10px] text-slate-400 max-w-xs mx-auto">
                Toggle between Virtual, Augmented, and Mixed environments to calibrate your sensory visor.
              </p>
            </div>
          )}

          {selectedMode === 'VR' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              {/* VR Background space portal */}
              <img
                src="/images/vr/v3.png"
                alt="VR Environment"
                className="absolute inset-0 w-full h-full object-cover opacity-90 animate-[pulse_6s_infinite]"
              />
              <div className="absolute inset-0 bg-indigo-950/45 pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center text-center space-y-1 bg-slate-950/70 p-3 rounded-xl border border-cyan-500/20 backdrop-blur-sm max-w-[280px]">
                <Rocket size={24} className="text-cyan-400 animate-bounce" />
                <h6 className="font-black text-xs text-cyan-200 uppercase tracking-wide">Virtual Reality (VR)</h6>
                <p className="text-[9px] text-slate-300 leading-relaxed">
                  Your physical room is 100% blocked! You are floating in a simulated digital space galaxy.
                </p>
              </div>
            </div>
          )}

          {selectedMode === 'AR' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              {/* AR Real room background */}
              <img
                src="/images/vr/vr_headset_table.png"
                alt="Real room table"
                className="absolute inset-0 w-full h-full object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-slate-950/30 pointer-events-none" />

              {/* Floating spin star hologram */}
              <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: 360 }}
                  transition={{
                    y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 6, repeat: Infinity, ease: "linear" }
                  }}
                  className="w-10 h-10 bg-yellow-400/20 border-2 border-yellow-400 rounded-lg flex items-center justify-center shadow-[0_0_15px_#facc15]"
                >
                  <Star size={20} className="text-yellow-400 fill-current" />
                </motion.div>
              </div>

              <div className="relative z-10 mt-auto flex flex-col items-center text-center space-y-1 bg-slate-950/70 p-3 rounded-xl border border-yellow-500/20 backdrop-blur-sm max-w-[280px]">
                <h6 className="font-black text-xs text-yellow-300 uppercase tracking-wide">Augmented Reality (AR)</h6>
                <p className="text-[9px] text-slate-350 leading-relaxed">
                  You see your real room table, but a digital star hologram is overlaid floating in space!
                </p>
              </div>
            </div>
          )}

          {selectedMode === 'MR' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              {/* MR Real room background */}
              <img
                src="/images/vr/vr_headset_table.png"
                alt="Real room table"
                className="absolute inset-0 w-full h-full object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-slate-950/30 pointer-events-none" />

              {/* Interactive Bouncing energy ball */}
              <motion.div
                animate={{
                  y: [10, 110, 10, 110, 10],
                  scaleY: [1, 0.7, 1, 0.7, 1],
                  scaleX: [1, 1.3, 1, 1.3, 1]
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute left-[38%] w-6 h-6 bg-emerald-400/30 border-2 border-emerald-400 rounded-full shadow-[0_0_12px_#34d399] z-10 flex items-center justify-center"
              >
                <div className="w-2 h-2 bg-white rounded-full animate-ping" />
              </motion.div>

              {/* Shadow of the bouncing ball on the table */}
              <motion.div
                animate={{
                  scale: [0.5, 1.2, 0.5, 1.2, 0.5],
                  opacity: [0.2, 0.7, 0.2, 0.7, 0.2]
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute left-[37%] top-[85%] w-7 h-1.5 bg-black/60 rounded-full blur-[1px] z-5"
              />

              <div className="absolute top-3 z-10 flex flex-col items-center text-center space-y-1 bg-slate-950/75 p-2 px-3 rounded-xl border border-emerald-500/20 backdrop-blur-sm max-w-[290px]">
                <h6 className="font-black text-xs text-emerald-300 uppercase tracking-wide">Mixed Reality (MR)</h6>
                <p className="text-[9px] text-slate-350 leading-relaxed">
                  The green energy ball bounces off your real physical table! The virtual and real worlds interact.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Selector Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {['VR', 'AR', 'MR'].map(mode => {
            const hasChecked = visited[mode];
            let activeColor = "border-slate-700 bg-slate-800 text-slate-300 hover:border-indigo-400";
            if (selectedMode === mode) {
              if (mode === 'VR') activeColor = "border-cyan-500 bg-cyan-950 text-cyan-200";
              if (mode === 'AR') activeColor = "border-yellow-500 bg-yellow-950 text-yellow-200";
              if (mode === 'MR') activeColor = "border-emerald-500 bg-emerald-950 text-emerald-200";
            }

            return (
              <button
                key={mode}
                onClick={() => handleSelect(mode)}
                className={`py-2.5 rounded-xl border text-xs font-black transition-all cursor-pointer flex flex-col items-center gap-1 ${activeColor}`}
              >
                <span>{mode} Mode</span>
                <span className="text-[8px] font-bold text-slate-500">
                  {hasChecked ? '✓ EXPLORED' : '○ LOCKED'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-4 border-t border-white/5 mt-4">
        {isCompleted ? (
          <button
            onClick={onComplete}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all"
          >
            Claim Dimension Badge & Continue
          </button>
        ) : (
          <div className="text-center py-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            Explore all 3 modes to complete the challenge!
          </div>
        )}
      </div>
    </div>
  );
};

// Lesson 5 Mini-Game: Safe play space sweeper
const SafetyGame = ({ onComplete }) => {
  const [hazards, setHazards] = useState([
    { id: 1, name: "Skateboard", desc: "Tripping hazard!", icon: "🛹", inside: true, present: true },
    { id: 2, name: "Toy blocks", desc: "Slipping hazard!", icon: "🧱", inside: true, present: true },
    { id: 3, name: "Sleeping Cat", desc: "Animal protection!", icon: "🐱", inside: true, present: true },
    { id: 4, name: "Chair", desc: "Already outside boundary", icon: "🪑", inside: false, present: true },
    { id: 5, name: "Backpack", desc: "Already outside boundary", icon: "🎒", inside: false, present: true }
  ]);

  const handleClear = (id) => {
    setHazards(prev => prev.map(h => h.id === id ? { ...h, present: false } : h));
  };

  const activeHazardsInside = hazards.filter(h => h.inside && h.present).length;

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-900 border-2 border-indigo-500/40 rounded-2xl p-5 text-white min-h-[300px] flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <h4 className="font-bold text-indigo-400 flex items-center gap-2"><Shield size={18} /> Gamer Step: Clear the Play Space</h4>
        <span className="text-[10px] font-black text-rose-455 bg-rose-500/10 border border-rose-500/35 px-2 py-0.5 rounded">HAZARDS LEFT: {activeHazardsInside}</span>
      </div>

      <div className="space-y-4 flex-grow flex flex-col justify-between">
        <p className="text-xs text-slate-350">
          We want to play VR inside the green dashed safety boundary. Click on the 3 dangerous tripping hazards inside the circle to clear them out!
        </p>

        {/* Room grid representation */}
        <div className="w-full h-64 bg-slate-950 border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center shadow-inner">
          {/* Room Background image */}
          <img 
            src="/images/vr/vr_safety_zone.png" 
            alt="Safety Room Play Zone" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
          />
          <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />

          {/* Green Guardian safety boundary */}
          <div className="w-48 h-48 border-2 border-dashed border-emerald-400 rounded-full flex items-center justify-center bg-emerald-500/10 relative shadow-[0_0_15px_rgba(52,211,153,0.2)]">
            <span className="text-[7px] font-black text-emerald-400 uppercase tracking-widest absolute top-3 animate-pulse">Guardian zone</span>
            
            {/* Player Avatar */}
            <div className="absolute top-[40%] left-[40%] flex flex-col items-center">
              <span className="text-2xl animate-pulse">😎</span>
              <span className="text-[7px] font-black bg-indigo-500 text-white px-1.5 py-0.5 rounded shadow mt-1 uppercase tracking-wider">Player</span>
            </div>

            {/* Hazards inside */}
            {hazards.filter(h => h.inside && h.present).map((h, i) => {
              const pos = [
                { left: '10%', top: '65%' },
                { left: '72%', top: '55%' },
                { left: '42%', top: '12%' }
              ][i];
              return (
                <button
                  key={h.id}
                  onClick={() => handleClear(h.id)}
                  className="absolute group flex flex-col items-center transition-all duration-300 hover:scale-125 cursor-pointer"
                  style={pos}
                  title={h.name}
                >
                  <span className="absolute -inset-2 rounded-full border border-rose-500/60 animate-ping pointer-events-none" />
                  <span className="absolute -inset-1.5 rounded-full bg-rose-500/10 border border-rose-500/40 group-hover:border-rose-400 group-hover:bg-rose-500/20" />
                  <span className="relative z-10 text-xl filter drop-shadow-[0_0_6px_rgba(239,68,68,0.5)]">{h.icon}</span>
                  <span className="absolute -top-6 bg-rose-500 text-white text-[7px] font-black px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider shadow whitespace-nowrap z-20">
                    {h.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Hazards outside */}
          {hazards.filter(h => !h.inside).map((h, i) => {
            const pos = [
              { left: '8%', top: '40%' },
              { right: '8%', top: '35%' }
            ][i];
            return (
              <div
                key={h.id}
                className="absolute group flex flex-col items-center opacity-40 select-none cursor-not-allowed"
                style={pos}
                title={h.name}
              >
                <span className="absolute -inset-1 rounded-full bg-emerald-500/5 border border-emerald-500/20" />
                <span className="text-xl filter grayscale">{h.icon}</span>
                <span className="absolute -top-6 bg-slate-800 text-slate-350 text-[7px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider shadow whitespace-nowrap z-20">
                  {h.name} (Safe)
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-4 border-t border-white/5 mt-4">
        {activeHazardsInside === 0 ? (
          <button 
            onClick={onComplete}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all"
          >
            Clear Play Zone & Complete Stamp
          </button>
        ) : (
          <div className="text-center py-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            Clear all hazards inside the green dotted boundary to pass!
          </div>
        )}
      </div>
    </div>
  );
};

// Quiz Tab Component
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
    <div className="bg-slate-900 border-2 border-indigo-500/30 text-white rounded-2xl p-5 max-w-md mx-auto shadow-xl">
      {!showResult ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <span>QUESTION {currentQ + 1} / {questions.length}</span>
            <span className="text-yellow-400">Score: {score}</span>
          </div>

          <h5 className="text-xs font-bold text-slate-100 min-h-[40px] leading-relaxed">
            {q.question}
          </h5>

          <div className="space-y-2">
            {q.options.map((opt, idx) => {
              let btnStyle = "bg-slate-800 border-slate-700 text-white hover:bg-slate-750 hover:border-indigo-400";
              if (isAnswered) {
                if (idx === q.correct) btnStyle = "bg-emerald-950 border-emerald-500 text-emerald-400";
                else if (idx === selectedOption) btnStyle = "bg-rose-950 border-rose-500 text-rose-400";
                else btnStyle = "bg-slate-900/40 border-white/5 text-slate-550";
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-3 border rounded-xl text-xs font-semibold transition-all cursor-pointer ${btnStyle}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="flex justify-between items-center pt-2">
              <span className={`text-[11px] font-bold ${isCorrectChoice ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isCorrectChoice ? "Correct Answer!" : "Oops! Incorrect choice."}
              </span>
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-black transition-all cursor-pointer"
              >
                {currentQ < questions.length - 1 ? 'NEXT' : 'FINISH'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-4 space-y-4">
          <div className="flex justify-center">
            {isAllCorrect ? <Trophy size={36} className="text-yellow-400 animate-bounce" /> : <RefreshCw size={36} className="text-slate-400" />}
          </div>
          <h5 className="font-bold text-slate-100 text-xs">
            {isAllCorrect ? "Lesson Quiz Cleared!" : "Quiz Failed!"}
          </h5>
          <p className="text-xs text-slate-450 leading-relaxed font-semibold">
            {isAllCorrect
              ? "Wonderful job! You got all questions correct and earned your badge stamp!"
              : `You scored ${score} out of ${questions.length}. Get 100% to pass the lesson!`}
          </p>

          <div className="flex gap-2">
            {isAllCorrect ? (
              <button
                onClick={onComplete}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Claim Badge Stamp
              </button>
            ) : (
              <button
                onClick={handleRestart}
                className="w-full py-2 bg-slate-800 hover:bg-slate-750 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Retry Quiz
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Main VR Technology Learning Dashboard Component
const VrTechLearning = () => {
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
  const [activeLessonTab, setActiveLessonTab] = useState('learn'); // 'learn' | 'play' | 'test'
  const [gameCleared, setGameCleared] = useState(false);
  const [quizCleared, setQuizCleared] = useState(false);
  const [expandedSectionIndex, setExpandedSectionIndex] = useState(0);

  useEffect(() => {
    localStorage.setItem('unlockedVrTechLessons', JSON.stringify(unlockedLessons));
  }, [unlockedLessons]);

  useEffect(() => {
    localStorage.setItem('completedVrTechLessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    setActiveLessonTab('learn');
    setExpandedSectionIndex(0);
    const isCompleted = completedLessons.includes(activeLessonId);
    setGameCleared(isCompleted);
    setQuizCleared(isCompleted);
  }, [activeLessonId]);

  const currentLesson = lessons[activeLessonId - 1];

  const handleGameComplete = () => {
    setGameCleared(true);
    setActiveLessonTab('test'); // Proceed automatically to quiz
  };

  const handleQuizComplete = () => {
    setQuizCleared(true);
    if (!completedLessons.includes(activeLessonId)) {
      setCompletedLessons(prev => [...prev, activeLessonId]);
    }
    // Unlock next lesson
    if (activeLessonId < lessons.length) {
      const nextId = activeLessonId + 1;
      if (!unlockedLessons.includes(nextId)) {
        setUnlockedLessons(prev => [...prev, nextId]);
      }
    }
  };

  const handleNextLesson = () => {
    if (activeLessonId < lessons.length) {
      setActiveLessonId(prev => prev + 1);
    }
  };

  const handleRestartJourney = () => {
    if (window.confirm("Do you want to reset your progress and start learning again?")) {
      setUnlockedLessons([1]);
      setCompletedLessons([]);
      setActiveLessonId(1);
      setActiveLessonTab('learn');
    }
  };

  // Render Playzone Active Game
  const renderGame = () => {
    switch (activeLessonId) {
      case 1: return <HeadsetGame onComplete={handleGameComplete} />;
      case 2: return <GyroGame onComplete={handleGameComplete} />;
      case 3: return <ControllersGame onComplete={handleGameComplete} />;
      case 4: return <RealityGame onComplete={handleGameComplete} />;
      case 5: return <SafetyGame onComplete={handleGameComplete} />;
      default: return <div>Game not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex flex-col font-sans text-slate-900 overflow-x-hidden">
      {/* Back Button */}
      <button
        onClick={() => navigate("/vr-dashboard")}
        className="fixed top-3 left-3 md:top-5 md:left-5 z-50 w-9 h-9 md:w-10 md:h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:shadow-lg transition-all border border-slate-100 group"
      >
        <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <main className="flex-1 min-h-screen pb-16">
        <div className="px-4 sm:px-6 md:px-12 2xl:px-20 space-y-6 md:space-y-8 pt-8 max-w-[1400px] mx-auto">

          {/* Hero Section */}
          <section className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 rounded-[28px] p-6 md:p-8 text-white relative overflow-hidden border border-indigo-500/20 shadow-lg shadow-indigo-950/20">
            {/* Ambient glows and grids */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #4f46e5 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="absolute -right-10 -top-10 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
              {/* Left Column: Text */}
              <div className="md:col-span-7 space-y-3.5 text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-indigo-500/20 to-indigo-500/10 border border-indigo-400/35 text-indigo-300 text-[10px] font-black rounded-full uppercase tracking-wider shadow-inner">
                  <Sparkles size={10} className="text-indigo-400" /> Grades 8-12 Technology Lab
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #ffffff, #93c5fd, #c7d2fe)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    How Virtual Reality Works
                  </span>
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed max-w-xl">
                  Step inside the technology of tomorrow! Clean, visual lessons and interactive mini-games to help you learn VR engineering principles in seconds.
                </p>
              </div>

              {/* Right Column: Hero Image with float animation */}
              <div className="md:col-span-5 flex justify-center md:justify-end">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-48 h-36 md:w-56 md:h-40 rounded-2xl overflow-hidden border border-indigo-500/30 shadow-[0_0_30px_rgba(79,70,229,0.3)] bg-slate-950/40 backdrop-blur-sm"
                >
                  <img
                    src="/images/vr/vr_hero.png"
                    alt="VR Technology Hero"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Timeline / Progress path */}
          <section className="bg-white border border-slate-100 rounded-[20px] p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4 px-1">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">VR Technology Learning Journey</span>
              <div className="flex items-center gap-3">
                <span className="text-xs font-black text-indigo-600">
                  {completedLessons.length} / 5 Stamp Badges Earned
                </span>
                {completedLessons.length > 0 && (
                  <button onClick={handleRestartJourney} className="text-[9px] font-black text-rose-500 hover:underline">
                    RESET PROGRESS
                  </button>
                )}
              </div>
            </div>

            {/* Path Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {lessons.map((less, idx) => {
                const isUnlocked = unlockedLessons.includes(less.id);
                const isCompleted = completedLessons.includes(less.id);
                const isActive = activeLessonId === less.id;

                return (
                  <button
                    key={less.id}
                    onClick={() => isUnlocked && setActiveLessonId(less.id)}
                    disabled={!isUnlocked}
                    className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[90px] ${isActive
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/25'
                        : isUnlocked
                          ? 'bg-white text-slate-800 border-slate-200 hover:border-indigo-400 hover:shadow-sm'
                          : 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed opacity-60'
                      }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className={`text-[8px] font-black uppercase tracking-widest ${isActive ? 'text-indigo-200' : 'text-slate-400'
                        }`}>
                        {less.badge}
                      </span>
                      <span>
                        {isCompleted ? (
                          <CheckCircle2 size={12} className={isActive ? "text-white" : "text-emerald-500"} />
                        ) : !isUnlocked ? (
                          <Lock size={12} className={isActive ? "text-indigo-200/50" : "text-slate-400"} />
                        ) : (
                          <Star size={12} className={isActive ? "text-yellow-200" : "text-yellow-500"} />
                        )}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] font-black text-indigo-400 block mb-0.5">LESSON {less.id}</span>
                      <div className="text-xs font-extrabold truncate">{less.title.split(': ')[1]}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Active Lesson details card */}
          <section className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-5 md:p-6 space-y-6">

            {/* Header with Sub-tabs */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-slate-100 pb-5">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  {currentLesson.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-semibold">
                  Focus: {currentLesson.topic}
                </p>
              </div>

              {/* Sub-tabs switch */}
              <div className="flex gap-1.5 bg-slate-150/70 p-1 rounded-full border border-slate-200/60">
                {[
                  { id: 'learn', label: '1. Learn', icon: <BookOpen size={12} />, disabled: false },
                  { id: 'play', label: '2. Gamer Step', icon: <Gamepad2 size={12} />, disabled: false },
                  { id: 'test', label: '3. Stamp Quiz', icon: <HelpCircle size={12} />, disabled: !gameCleared && !completedLessons.includes(activeLessonId) }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => !tab.disabled && setActiveLessonTab(tab.id)}
                    disabled={tab.disabled}
                    className={`px-4.5 py-2 rounded-full text-[10px] font-black tracking-wide uppercase transition-all cursor-pointer flex items-center gap-1.5 ${activeLessonTab === tab.id
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : tab.disabled
                          ? 'text-slate-350 cursor-not-allowed opacity-60'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-tab content */}
            <div className="min-h-[300px]">
              <AnimatePresence mode="wait">
                {activeLessonTab === 'learn' && (
                  <motion.div
                    key="learn"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
                  >
                    {/* Left: Cartoon illustration */}
                    <div className="lg:col-span-5 flex flex-col justify-between bg-slate-50 border border-slate-200/60 rounded-[28px] p-5 shadow-sm space-y-4">
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 bg-white flex items-center justify-center shadow-inner group p-2">
                        <img
                          src={currentLesson.image}
                          alt={currentLesson.title}
                          className="w-full h-full object-contain group-hover:scale-103 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-indigo-600/90 backdrop-blur-sm px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider text-white shadow-sm">
                          Visual Guide
                        </div>
                      </div>
                      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3.5">
                        <h5 className="text-[10px] font-black text-indigo-700 uppercase tracking-widest mb-1">Lesson Brief</h5>
                        <p className="text-xs font-semibold text-indigo-900 leading-relaxed">
                          {currentLesson.summary}
                        </p>
                      </div>
                    </div>

                    {/* Right: Collapsible Learn Sections */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pl-1">Knowledge Core</span>

                        {currentLesson.learnSections.map((sec, idx) => {
                          const isOpen = expandedSectionIndex === idx;
                          return (
                            <div
                              key={idx}
                              className={`border rounded-2xl transition-all overflow-hidden ${isOpen ? 'bg-indigo-50/20 border-indigo-200' : 'bg-white border-slate-200/80 hover:border-slate-300'
                                }`}
                            >
                              <button
                                onClick={() => setExpandedSectionIndex(idx)}
                                className="w-full text-left px-5 py-4 font-extrabold text-sm text-slate-800 flex justify-between items-center cursor-pointer"
                              >
                                <span>{sec.title}</span>
                                <span className={`text-xs font-black transition-transform ${isOpen ? 'rotate-90 text-indigo-600' : 'text-slate-400'}`}>▶</span>
                              </button>

                              <AnimatePresence initial={false}>
                                {isOpen && (
                                  <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: 'auto' }}
                                    exit={{ height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                  >
                                    <p className="px-5 pb-5 text-xs font-medium text-slate-600 leading-relaxed whitespace-pre-line">
                                      {sec.desc}
                                    </p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>

                      {/* Proceed to Gamer Step button */}
                      <button
                        onClick={() => setActiveLessonTab('play')}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                      >
                        Let's Try: Play Gamer Step <ArrowRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeLessonTab === 'play' && (
                  <motion.div
                    key="play"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex items-center justify-center py-6"
                  >
                    {renderGame()}
                  </motion.div>
                )}

                {activeLessonTab === 'test' && (
                  <motion.div
                    key="test"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex flex-col items-center py-6"
                  >
                    {quizCleared ? (
                      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 text-center max-w-md w-full space-y-5 shadow-xl">
                        <Trophy size={48} className="text-yellow-400 mx-auto animate-bounce" />
                        <div>
                          <h4 className="font-extrabold text-sm text-emerald-400">LESSON COMPLETE!</h4>
                          <p className="text-xs text-slate-350 leading-relaxed mt-1">
                            You've earned the <span className="font-black text-indigo-300">"{currentLesson.badge}"</span> badge stamp!
                          </p>
                        </div>
                        {activeLessonId < lessons.length ? (
                          <button
                            onClick={handleNextLesson}
                            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all"
                          >
                            Advance to Lesson {activeLessonId + 1} ➔
                          </button>
                        ) : (
                          <div className="space-y-4">
                            <p className="text-[11px] text-yellow-300 font-bold">★ Congratulations! You have fully completed the VR Technology curriculum! ★</p>
                            <button
                              onClick={() => navigate('/vr-dashboard')}
                              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all"
                            >
                              Return to Dashboard
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <LessonQuiz questions={currentLesson.quiz} onComplete={handleQuizComplete} />
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
