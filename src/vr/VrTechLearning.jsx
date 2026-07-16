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

// 5 Curriculum Lessons Database (Class 6-8 Age-Appropriate Science & Tech Concepts)
const lessons = [
  {
    id: 1,
    title: "Lesson 1: How VR Headsets Work",
    badge: "VR Explorer",
    topic: "3D Worlds & Headsets",
    summary: "Discover how VR headsets surround your eyes with 360-degree digital worlds!",
    image: "/images/vr/vr_intro.png",
    learnSections: [
      {
        title: "From Flat Screens to 360 Headsets",
        desc: "When you watch TV or play on a computer, you look at a flat screen in front of you. A VR headset is worn over your eyes so the screen surrounds your entire view. Wherever you turn your head—up, down, left, or right—you see a full 360-degree digital world!",
        image: "/images/vr/magic_goggles.png",
        funFact: "The very first virtual reality machine was built in 1962! Called the 'Sensorama', it let viewers ride a virtual motorcycle with 3D visuals, stereo sound, wind, and even flower scents!"
      },
      {
        title: "How Two Eyes See 3D Depth",
        desc: "Try closing one eye, then the other—notice how your left and right eyes see from slightly different angles? VR headsets use this same natural trick! Inside the headset, two separate images are shown (one for each eye). Your brain combines them to see realistic 3D depth and distance.",
        image: "/images/vr/brain_trick.png",
        funFact: "Because our two eyes are slightly apart, each sees a slightly different angle. VR headsets use this principle—called stereoscopy—to create true 3D depth inside flat displays!"
      },
      {
        title: "3D Sound That Moves With You",
        desc: "VR doesn't just trick your eyes; it uses 3D Spatial Audio for your ears! If a virtual rocket takes off to your right, the sound comes from the right earphone. When you turn your head toward the rocket, the sound moves right in front of you.",
        image: "/images/vr/mars_whale.png",
        funFact: "NASA astronauts train for real spacewalks inside VR headsets before ever leaving Earth, practicing how to use tools in zero gravity!"
      }
    ],
    quiz: [
      {
        question: "How is a VR headset different from a regular TV or computer screen?",
        options: [
          "It shows a flat picture only when you sit still",
          "It surrounds your eyes so you see a 360-degree world wherever you turn your head",
          "It only works in bright sunlight"
        ],
        correct: 1
      },
      {
        question: "How does a VR headset create realistic 3D depth?",
        options: [
          "By showing slightly different angles to your left eye and right eye",
          "By shining a red laser on the wall",
          "By making the screen flash rapidly"
        ],
        correct: 0
      }
    ]
  },
  {
    id: 2,
    title: "Lesson 2: Lenses & Motion Sensors",
    badge: "Sensor Detective",
    topic: "Lenses & Gyro Sensors",
    summary: "Learn how curved glass lenses keep screens clear and how smart sensors track your head.",
    image: "/images/vr/vr_sensors_chip.png",
    learnSections: [
      {
        title: "Why VR Headsets Need Lenses",
        desc: "If you hold a phone screen two inches from your nose, it looks blurry and hurts your eyes. VR headsets place special curved glass lenses between your eyes and the screen. These lenses bend light rays so your eyes can focus clearly without straining.",
        image: "/images/vr/lenses.png",
        funFact: "VR headset lenses use concentric Fresnel grooves to stay extremely thin and light while bending display light precisely to your eyes!"
      },
      {
        title: "Gyroscope Motion Sensors",
        desc: "How does the virtual world move instantly when you turn your head? Inside the headset is a tiny sensor called a Gyroscope. It measures your head turns more than 1,000 times every second so the camera moves exactly when you move!",
        image: "/images/vr/gyro_sensor.png",
        funFact: "A modern VR gyroscope measures head turns over 1,000 times per second—more than 10 times faster than the blink of a human eye!"
      },
      {
        title: "Fast Screen Refresh Rate",
        desc: "If a screen updates too slowly when you look around, it can make you feel dizzy. Good VR headsets refresh the picture 90 to 120 times every single second! This super-fast speed keeps motion smooth and natural.",
        image: "/images/vr/low_latency.png",
        funFact: "Human eyes notice motion lag if it takes more than 20 milliseconds—modern VR screens refresh up to 120 times every second!"
      }
    ],
    quiz: [
      {
        question: "Why do VR headsets have curved glass lenses between your eyes and the screen?",
        options: [
          "To change screen colors to black and white",
          "To bend light rays so your eyes can focus clearly on the close-up screen without blur",
          "To make the headset heavier"
        ],
        correct: 1
      },
      {
        question: "Which sensor inside the headset detects when you turn your head left or right?",
        options: [
          "A Gyroscope sensor",
          "A temperature thermometer",
          "A microphone sensor"
        ],
        correct: 0
      }
    ]
  },
  {
    id: 3,
    title: "Lesson 3: Controllers & Touch Feedback",
    badge: "Tech Master",
    topic: "Hand Tracking & Vibration",
    summary: "Find out how wireless controllers track your hands and vibrate when you touch virtual objects!",
    image: "/images/vr/vr_controllers.png",
    learnSections: [
      {
        title: "Tracking Your Hands in 3D Space",
        desc: "To grab objects in VR, you hold wireless hand controllers. Cameras on the headset track hidden infrared lights on the controllers. When you raise your real hand or wave, your virtual hand inside the headset moves the exact same way!",
        image: "/images/vr/virtual_hands.png",
        funFact: "VR controllers have tiny hidden infrared LEDs that cameras track with sub-millimeter precision in 3D space!"
      },
      {
        title: "Buttons, Joysticks & Grab Triggers",
        desc: "VR controllers have joysticks for walking and trigger buttons under your fingers. When you squeeze the trigger button, your virtual hand closes to pick up lab beakers, throw a basketball, or use scientific tools.",
        image: "/images/vr/controllers_buttons.png",
        funFact: "Advanced VR gloves can simulate physical resistance so grabbing a virtual baseball or bow feels solid and real in your hand!"
      },
      {
        title: "Feeling Virtual Contact (Haptic Vibration)",
        desc: "Have you noticed how a phone vibrates when you get a notification? VR controllers use tiny vibration motors inside. When your virtual hand touches a table or catches a ball, the controller rumbles so you actually feel the contact!",
        image: "/images/vr/haptics.png",
        funFact: "Haptic feedback uses linear resonant actuators—the exact same ultra-precise vibration motors used in high-end smartphones!"
      }
    ],
    quiz: [
      {
        question: "How does the VR headset know where your hands are moving?",
        options: [
          "By guessing based on sound",
          "By tracking infrared lights or sensors on your wireless controllers",
          "Using a wired computer mouse"
        ],
        correct: 1
      },
      {
        question: "Why do VR controllers vibrate when you touch an object in the virtual world?",
        options: [
          "To play music through your hands",
          "To give tactile haptic feedback so you feel physical contact with virtual objects",
          "Because the battery is empty"
        ],
        correct: 1
      }
    ]
  },
  {
    id: 4,
    title: "Lesson 4: VR vs. AR vs. Mixed Reality",
    badge: "Reality Explorer",
    topic: "VR, AR & MR",
    summary: "Understand the difference between full virtual worlds and digital holograms in your room!",
    image: "/images/vr/vr_ar_mr.png",
    learnSections: [
      {
        title: "Virtual Reality (VR) - Full Digital World",
        desc: "In Virtual Reality (VR), your view of the real room is completely replaced by a computer-generated 3D world. You can visit outer space, dive deep into the ocean, or walk inside an atom simulation.",
        image: "/images/vr/closed_eye.png",
        funFact: "Surgeons practice complex brain and heart operations inside VR medical simulators before ever operating on a real patient!"
      },
      {
        title: "Augmented Reality (AR) - Digital Overlays",
        desc: "Augmented Reality (AR) lets you see your real physical room while adding digital information or pictures on top. For example, pointing a tablet camera at a plant to see floating labels of its leaves and roots.",
        image: "/images/vr/augmented_overlay.png",
        funFact: "Pilots have used head-up augmented reality displays projected onto jet cockpits since the late 1970s!"
      },
      {
        title: "Mixed Reality (MR) - Smart Holograms",
        desc: "Mixed Reality (MR) uses headset cameras to scan your actual furniture. Digital 3D objects can recognize your real table or walls—like a virtual science ball that bounces off your real study desk!",
        image: "/images/vr/mixed_reality.png",
        funFact: "Mixed Reality headsets use depth sensors to scan your room and build an exact 3D wireframe mesh of your furniture in real time!"
      }
    ],
    quiz: [
      {
        question: "What is the main difference between Virtual Reality (VR) and Augmented Reality (AR)?",
        options: [
          "VR replaces your whole view with a 3D world, while AR adds digital info on top of your real room",
          "VR only works on TV screens",
          "AR completely blocks your eyes"
        ],
        correct: 0
      },
      {
        question: "What makes Mixed Reality (MR) special when used in your study room?",
        options: [
          "Digital 3D objects can recognize and interact with real physical furniture like desks and walls",
          "It turns off your room lights automatically",
          "It requires heavy wired backpacks"
        ],
        correct: 0
      }
    ]
  },
  {
    id: 5,
    title: "Lesson 5: Safety & Eye Care in VR",
    badge: "Safety Champion",
    topic: "Guardian & Eye Rules",
    summary: "Learn how to set up a safe play boundary and care for your eyes during VR learning.",
    image: "/images/vr/vr_safety_zone.png",
    learnSections: [
      {
        title: "The Guardian Safety Boundary",
        desc: "Because you can't see your real room inside VR, you draw a digital safety circle on your floor before starting. If you walk too close to your real wall or desk, a glowing grid lights up to warn you so you don't bump into anything!",
        image: "/images/vr/guardian_boundary.png",
        funFact: "The Guardian boundary system uses real-time computer vision to draw a safety grid in mid-air the moment you step within 6 inches of a wall!"
      },
      {
        title: "Matching Lens Width to Your Eyes (IPD)",
        desc: "Everyone's eyes are spaced slightly differently. Headsets have a slider wheel to adjust the distance between the two lenses. Aligning the lenses with the center of your pupils keeps the picture sharp and comfortable.",
        image: "/images/vr/clear_floor.png",
        funFact: "Professional VR labs measure every student's IPD in millimeters to customize optical lens spacing before simulations!"
      },
      {
        title: "The 20-20 Rest Rule for Healthy Eyes",
        desc: "Looking at any screen for too long can tire your eyes. Follow the 20-20 rule: every 20 minutes, take off your headset and look at something 20 feet away for 20 seconds to relax your eye muscles!",
        image: "/images/vr/eye_break.png",
        funFact: "Looking at an object 20 feet away completely relaxes the internal ciliary muscle inside your eye, instantly easing eye fatigue!"
      }
    ],
    quiz: [
      {
        question: "Why do VR headsets show a glowing Guardian grid when you walk near the edge of your play area?",
        options: [
          "To warn you before you bump into real walls or furniture",
          "To change the level of the game",
          "To turn off the headset"
        ],
        correct: 0
      },
      {
        question: "What is the 20-20 rule for keeping your eyes healthy during screen or VR time?",
        options: [
          "Every 20 minutes, look at something 20 feet away for 20 seconds to rest your eyes",
          "Blink 20 times every second",
          "Play for 20 hours straight"
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
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm max-w-2xl mx-auto overflow-hidden relative">
      {/* Decorative top header line */}
      <div className="h-2 w-full bg-gradient-to-r from-indigo-400 to-blue-500 absolute top-0 left-0" />
      {showResult && isAllCorrect && <ConfettiExplosion />}

      {!showResult ? (
        <div className="p-6 sm:p-10">
          <div className="flex justify-between items-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-extrabold rounded-full uppercase tracking-wider">
              <Trophy size={14} /> Question {currentQ + 1} of {questions.length}
            </span>
            <span className="text-sm font-bold text-slate-500">
              Score: <span className="text-indigo-600 font-black">{score}</span>
            </span>
          </div>

          <h5 className="text-lg sm:text-xl font-extrabold text-[#1A1C2E] leading-relaxed mb-8">
            {q.question}
          </h5>

          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              let btnStyle = "bg-white border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/50 hover:shadow-sm";
              let icon = null;
              
              if (isAnswered) {
                if (idx === q.correct) {
                  btnStyle = "bg-emerald-50 border-[#0BB562] text-emerald-900 shadow-sm ring-1 ring-emerald-500/20";
                  icon = <CheckCircle2 size={18} className="text-[#0BB562]" />;
                } else if (idx === selectedOption) {
                  btnStyle = "bg-rose-50 border-rose-500 text-rose-800 shadow-sm ring-1 ring-rose-500/20";
                  icon = <XCircle size={18} className="text-rose-500" />;
                } else {
                  btnStyle = "bg-slate-50 border-slate-100 text-slate-400 opacity-60";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 sm:p-5 border-2 rounded-2xl text-sm sm:text-base font-bold transition-all duration-300 cursor-pointer flex items-center justify-between gap-3 ${btnStyle} ${!isAnswered && 'group'}`}
                >
                  <span>{opt}</span>
                  {icon && <span>{icon}</span>}
                  {!isAnswered && <div className="w-5 h-5 rounded-full border-2 border-slate-200 group-hover:border-indigo-400 transition-colors shrink-0" />}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {isAnswered && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 mt-4 border-t border-slate-100"
              >
                <span className={`text-sm sm:text-base font-bold flex items-center gap-2 ${isCorrectChoice ? 'text-[#0BB562]' : 'text-rose-600'}`}>
                  {isCorrectChoice ? (
                    <><CheckCircle2 size={20} /> Excellent! That is the correct answer.</>
                  ) : (
                    <><XCircle size={20} /> Oops! That's not right.</>
                  )}
                </span>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNext}
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl text-sm font-extrabold transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  {currentQ < questions.length - 1 ? 'Next Question' : 'View Results'}
                  <ArrowRight size={16} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="p-8 sm:p-12 text-center space-y-6">
          <div className="flex justify-center mb-2">
            {isAllCorrect ? (
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center shadow-inner">
                <Trophy size={40} className="text-emerald-500" />
              </div>
            ) : (
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center shadow-inner">
                <RotateCcw size={40} className="text-amber-500" />
              </div>
            )}
          </div>
          
          <div>
            <h5 className="font-extrabold text-[#1A1C2E] text-2xl mb-2">
              {isAllCorrect ? "Quiz Completed Successfully!" : "Almost There!"}
            </h5>
            <p className="text-base text-slate-500 leading-relaxed font-medium">
              {isAllCorrect 
                ? `You achieved 100% accuracy and earned the ${lessonBadge} stamp for your curriculum profile.` 
                : `You scored ${score} out of ${questions.length}. A score of 100% is required to earn the lesson badge stamp.`}
            </p>
          </div>

          <div className="pt-6">
            {isAllCorrect ? (
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onComplete}
                className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-[#0BB562] to-[#099b53] hover:from-[#099b53] hover:to-emerald-700 text-white rounded-2xl text-base font-extrabold transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 mx-auto"
              >
                Claim {lessonBadge} Stamp <Award size={20} />
              </motion.button>
            ) : (
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRestart}
                className="w-full sm:w-auto px-10 py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-2xl text-base font-extrabold transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 mx-auto"
              >
                Retry Quiz <RotateCcw size={20} />
              </motion.button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Main VR Technology Learning Dashboard Component
const VrTechLearning = ({ isEmbedded = false, onBack }) => {
  const navigate = useNavigate();
  const [activeLessonId, setActiveLessonId] = useState(1);
  const unlockedLessons = [1, 2, 3, 4, 5];
  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem('completedVrTechLessons');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);

  useEffect(() => {
    localStorage.setItem('completedVrTechLessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  const currentLesson = lessons[activeLessonId - 1];

  const handleSelectLesson = (id) => {
    setActiveLessonId(id);
    setActiveTopicIndex(0);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleProceedNext = () => {
    if (!completedLessons.includes(activeLessonId)) {
      setCompletedLessons(prev => [...prev, activeLessonId]);
    }
    if (activeLessonId < lessons.length) {
      handleSelectLesson(activeLessonId + 1);
    } else {
      if (isEmbedded && onBack) {
        onBack();
      } else {
        navigate('/vr-dashboard');
      }
    }
  };


  return (
    <div className={`${isEmbedded ? '' : 'min-h-screen bg-[#F8FAFC]'} flex flex-col font-sans text-slate-900 overflow-x-hidden selection:bg-indigo-500 selection:text-white transition-all duration-300`}>
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

          <div className="bg-white border border-slate-100 rounded-[20px] p-2 shadow-[0_4px_20px_rgb(0,0,0,0.03)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 mb-3">
            {lessons.map((less) => {
              const isUnlocked = unlockedLessons.includes(less.id);
              const isCompleted = completedLessons.includes(less.id);
              const isActive = activeLessonId === less.id;

              return (
                <button
                  key={less.id}
                  onClick={() => handleSelectLesson(less.id)}
                  className={`text-left px-3.5 py-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2.5 min-h-[46px] font-display ${
                    isActive
                      ? 'bg-indigo-50/80 border-indigo-200 text-indigo-950 font-bold shadow-sm'
                      : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-700 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                      isCompleted ? 'bg-emerald-600 text-white' : isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {less.id}
                    </span>
                    <span className="text-xs sm:text-sm truncate">
                      {less.title.split(': ')[1]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Lesson Main Container */}
          <section className="bg-white rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 sm:p-7 md:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">
                  {currentLesson.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                  Topic Focus: <span className="text-indigo-600 font-bold">{currentLesson.topic}</span>
                </p>
              </div>
            </div>

            {/* Stage Content Area */}
            <div className="min-h-[350px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`lesson-${activeLessonId}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full"
                >
                  {(() => {
                    const selectedSec = currentLesson.learnSections[activeTopicIndex] || currentLesson.learnSections[0];
                    return (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                        {/* Sidebar with 3 sections */}
                        <div className="lg:col-span-4 flex flex-col gap-2.5">
                          <div className="px-1 pb-1">
                            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider font-display">
                              Lesson Topics ({currentLesson.learnSections.length})
                            </span>
                          </div>
                          {currentLesson.learnSections.map((sec, idx) => {
                            const isTopicActive = activeTopicIndex === idx;
                            return (
                              <button
                                key={idx}
                                onClick={() => setActiveTopicIndex(idx)}
                                className={`w-full text-left p-4 rounded-[18px] border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                                  isTopicActive
                                    ? 'bg-indigo-50/80 border-indigo-300 text-indigo-950 font-bold shadow-sm'
                                    : 'bg-white border-slate-200/80 hover:bg-slate-50 text-slate-700 font-medium shadow-[0_4px_16px_rgb(0,0,0,0.02)]'
                                }`}
                              >
                                <div className="min-w-0 space-y-1">
                                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider font-display ${
                                    isTopicActive ? 'bg-indigo-200 text-indigo-900' : 'bg-slate-100 text-slate-600'
                                  }`}>
                                    Section {idx + 1}
                                  </span>
                                  <h4 className="text-sm sm:text-base font-bold truncate font-display">
                                    {sec.title}
                                  </h4>
                                </div>
                                <ChevronRight size={16} className={`shrink-0 transition-transform ${isTopicActive ? 'text-indigo-600 translate-x-0.5' : 'text-slate-400'}`} />
                              </button>
                            );
                          })}

                          <div className="pt-2 mt-auto">
                            {activeLessonId < lessons.length && (
                                <button
                                  onClick={handleProceedNext}
                                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider font-display transition-all duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer group"
                                >
                                  <span>Proceed to Next Lesson</span>
                                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                              )}
                          </div>
                        </div>

                        {/* Description Details Card (No Images) */}
                        <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-[24px] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col justify-between space-y-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between gap-3 flex-wrap border-b border-slate-100 pb-4">
                              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider font-display">
                                Section {activeTopicIndex + 1} of {currentLesson.learnSections.length}
                              </span>
                            </div>

                            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">
                              {selectedSec.title}
                            </h3>

                            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal whitespace-pre-line">
                              {selectedSec.desc}
                            </p>

                            {selectedSec.funFact && (
                              <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-50/90 to-slate-50/80 border border-indigo-100 flex items-start gap-3.5 shadow-sm">
                                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                                  <Sparkles size={16} />
                                </div>
                                <div className="space-y-1">
                                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-700 font-display block">
                                    Did You Know? • VR Fun Fact
                                  </span>
                                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                                    {selectedSec.funFact}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Previous & Next Section Controls */}
                          <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
                            <button
                              onClick={() => setActiveTopicIndex(prev => Math.max(0, prev - 1))}
                              disabled={activeTopicIndex === 0}
                              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all font-display ${
                                activeTopicIndex === 0
                                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer'
                              }`}
                            >
                              Previous Section
                            </button>

                            {activeTopicIndex < currentLesson.learnSections.length - 1 ? (
                              <button
                                onClick={() => setActiveTopicIndex(prev => Math.min(currentLesson.learnSections.length - 1, prev + 1))}
                                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer font-display"
                              >
                                Next Section <ChevronRight size={16} />
                              </button>
                            ) : activeLessonId < lessons.length ? (
                              <button
                                onClick={handleProceedNext}
                                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer font-display"
                              >
                                Next Lesson <ArrowRight size={16} />
                              </button>
                            ) : (
                              <button
                                onClick={handleProceedNext}
                                className="px-5 py-2.5 rounded-xl bg-[#0BB562] hover:bg-[#099b53] text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer font-display"
                              >
                                Return to Dashboard <ArrowRight size={16} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default VrTechLearning;
