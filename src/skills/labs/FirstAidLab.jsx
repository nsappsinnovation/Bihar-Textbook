import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Award } from 'lucide-react';

const NurseDiyaSVG = ({ expression = "smile", className = "w-16 h-16" }) => {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      {/* Background soft circle */}
      <circle cx="50" cy="50" r="45" fill="#F0FDFA" stroke="#CCFBF1" strokeWidth="2" />
      {/* Nurse Cap */}
      <path d="M 30,30 Q 50,15 70,30 L 68,36 Q 50,28 32,36 Z" fill="#FFFFFF" stroke="#0D9488" strokeWidth="1.5" />
      <path d="M 45,26 H 55 M 50,21 V 31" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" />

      {/* Face */}
      <circle cx="50" cy="54" r="22" fill="#FFE4E6" />
      {/* Hair (buns) */}
      <circle cx="28" cy="50" r="8" fill="#1E293B" />
      <circle cx="72" cy="50" r="8" fill="#1E293B" />
      <path d="M 28,45 Q 50,33 72,45 C 68,38 32,38 28,45" fill="#1E293B" />

      {/* Eyes */}
      {expression === "sad" ? (
        <>
          <path d="M 38,52 Q 43,56 46,52" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 54,52 Q 57,56 62,52" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </>
      ) : expression === "cheering" ? (
        <>
          <path d="M 38,55 Q 43,49 46,55" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 54,55 Q 57,49 62,55" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="42" cy="52" r="2.5" fill="#1E293B" />
          <circle cx="58" cy="52" r="2.5" fill="#1E293B" />
        </>
      )}

      {/* Cheeks */}
      <circle cx="36" cy="58" r="2.5" fill="#F43F5E" opacity="0.4" />
      <circle cx="64" cy="58" r="2.5" fill="#F43F5E" opacity="0.4" />

      {/* Mouth */}
      {expression === "sad" ? (
        <path d="M 45,64 Q 50,60 55,64" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M 44,61 Q 50,68 56,61" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      )}
    </svg>
  );
};

const PatientVisualizerSVG = ({ scenarioId, sequence = [], className = "w-36 h-36 mx-auto" }) => {
  const hasWash = sequence.includes('wash');
  const hasAntiseptic = sequence.includes('antiseptic');
  const hasBandage = sequence.includes('bandage');
  const hasWaterCool = sequence.includes('water-cool');
  const hasAloeVera = sequence.includes('aloe-vera');
  const hasLooseBandage = sequence.includes('loose-bandage');
  const hasTweezer = sequence.includes('tweezer');
  const hasIcePack = sequence.includes('ice-pack');
  const hasAntihistamine = sequence.includes('antihistamine');

  // NEW TOOLS/ACTIONS
  const hasTiltForward = sequence.includes('tilt-forward');
  const hasPinchBridge = sequence.includes('pinch-bridge');
  const hasElevateLeg = sequence.includes('elevate-leg');

  const isFinished =
    (scenarioId === 'knee-scratch' && hasBandage) ||
    (scenarioId === 'tea-burn' && hasLooseBandage) ||
    (scenarioId === 'bee-sting' && hasAntihistamine) ||
    (scenarioId === 'dog-bite' && hasLooseBandage) ||
    (scenarioId === 'nose-bleed' && hasIcePack) ||
    (scenarioId === 'ankle-sprain' && hasElevateLeg) ||
    (scenarioId === 'finger-splinter' && hasBandage);

  return (
    <svg viewBox="0 0 100 100" className={className}>
      <rect x="5" y="5" width="90" height="90" rx="20" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
      <circle cx="50" cy="40" r="20" fill="#FFD2B2" />
      <circle cx="50" cy="40" r="20" fill="#F3A67A" opacity="0.3" />
      <path d="M 28,34 Q 50,18 72,34 L 72,28 Q 50,15 28,28 Z" fill="#475569" />
      {isFinished ? (
        <>
          <path d="M 40,40 Q 44,36 47,40" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 53,40 Q 56,36 60,40" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M 40,42 L 46,38 M 40,38 L 46,42" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
          <path d="M 54,42 L 60,38 M 54,38 L 60,42" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
      {!isFinished && (
        <>
          <circle cx="36" cy="46" r="3" fill="#EF4444" opacity="0.4" />
          <circle cx="64" cy="46" r="3" fill="#EF4444" opacity="0.4" />
        </>
      )}
      {isFinished ? (
        <path d="M 43,48 Q 50,56 57,48" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M 44,52 Q 50,47 56,52" stroke="#EF4444" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      )}
      <path d="M 20,85 C 20,70 30,62 50,62 C 70,62 80,70 80,85 Z" fill="#3B82F6" />
      {scenarioId === 'knee-scratch' && (
        <g transform="translate(18, 65)">
          <circle cx="32" cy="10" r="10" fill="#FFD2B2" stroke="#E2E8F0" strokeWidth="1.5" />
          {!hasWash && (
            <>
              <circle cx="32" cy="10" r="5" fill="#DC2626" opacity="0.8" />
              <circle cx="29" cy="8" r="1.5" fill="#78350F" />
              <circle cx="34" cy="12" r="1.5" fill="#78350F" />
            </>
          )}
          {hasWash && !hasAntiseptic && (
            <circle cx="32" cy="10" r="5" fill="#F87171" opacity="0.6" />
          )}
          {hasWash && hasAntiseptic && !hasBandage && (
            <>
              <circle cx="32" cy="10" r="5" fill="#F87171" opacity="0.6" />
              <ellipse cx="32" cy="9" rx="3.5" ry="1.5" fill="#FFFFFF" opacity="0.9" />
            </>
          )}
          {hasBandage && (
            <>
              <rect x="25" y="7" width="14" height="6" rx="1.5" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
              <circle cx="29" cy="10" r="0.5" fill="#D97706" />
              <circle cx="32" cy="10" r="0.5" fill="#D97706" />
              <circle cx="35" cy="10" r="0.5" fill="#D97706" />
            </>
          )}
        </g>
      )}
      {scenarioId === 'tea-burn' && (
        <g transform="translate(45, 62)">
          <path d="M 5,5 Q 12,20 18,30" stroke="#FFD2B2" strokeWidth="8" strokeLinecap="round" fill="none" />
          {!hasWaterCool && (
            <circle cx="12" cy="18" r="8" fill="#EF4444" opacity="0.85" className="animate-pulse" />
          )}
          {hasWaterCool && !hasAloeVera && (
            <>
              <circle cx="12" cy="18" r="8" fill="#F87171" opacity="0.7" />
              <circle cx="10" cy="14" r="1.5" fill="#38BDF8" />
              <circle cx="14" cy="20" r="1.5" fill="#38BDF8" />
            </>
          )}
          {hasWaterCool && hasAloeVera && !hasLooseBandage && (
            <>
              <circle cx="12" cy="18" r="8" fill="#F87171" opacity="0.7" />
              <circle cx="12" cy="18" r="6" fill="#34D399" opacity="0.5" />
            </>
          )}
          {hasLooseBandage && (
            <>
              <path d="M 6,10 L 16,14 M 8,14 L 18,18 M 5,18 L 15,22" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
              <path d="M 6,10 L 16,14 M 8,14 L 18,18 M 5,18 L 15,22" stroke="#E2E8F0" strokeWidth="1" strokeLinecap="round" />
            </>
          )}
        </g>
      )}
      {scenarioId === 'bee-sting' && (
        <g transform="translate(45, 62)">
          <path d="M 5,5 Q 12,20 18,30" stroke="#FFD2B2" strokeWidth="8" strokeLinecap="round" fill="none" />
          {!hasIcePack && (
            <circle cx="12" cy="18" r="7" fill="#EF4444" opacity="0.75" />
          )}
          {hasIcePack && !hasAntihistamine && (
            <circle cx="12" cy="18" r="5" fill="#F87171" opacity="0.5" />
          )}
          {!hasTweezer && (
            <>
              <line x1="12" y1="18" x2="16" y2="12" stroke="#1E293B" strokeWidth="2.5" />
              <polygon points="12,18 10,15 15,15" fill="#F59E0B" />
            </>
          )}
          {hasTweezer && hasIcePack && !hasAntihistamine && (
            <rect x="5" y="12" width="14" height="12" rx="3" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" opacity="0.9" />
          )}
          {hasAntihistamine && (
            <>
              <circle cx="12" cy="18" r="4" fill="#34D399" opacity="0.4" />
              <circle cx="12" cy="18" r="2.5" fill="#FFFFFF" opacity="0.9" />
            </>
          )}
        </g>
      )}
      {scenarioId === 'dog-bite' && (
        <g transform="translate(18, 65)">
          <circle cx="32" cy="10" r="10" fill="#FFD2B2" stroke="#E2E8F0" strokeWidth="1.5" />
          {!hasWash && (
            <>
              <path d="M 28,6 Q 30,10 32,7" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
              <path d="M 31,8 Q 33,12 35,9" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
              <path d="M 33,5 Q 35,9 37,6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
            </>
          )}
          {hasWash && !hasAntiseptic && (
            <>
              <path d="M 28,6 Q 30,10 32,7" stroke="#F87171" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
              <path d="M 31,8 Q 33,12 35,9" stroke="#F87171" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
              <circle cx="27" cy="14" r="1" fill="#38BDF8" />
              <circle cx="37" cy="14" r="1" fill="#38BDF8" />
            </>
          )}
          {hasWash && hasAntiseptic && !hasLooseBandage && (
            <>
              <path d="M 28,6 Q 30,10 32,7" stroke="#F87171" strokeWidth="1.5" opacity="0.5" />
              <path d="M 31,8 Q 33,12 35,9" stroke="#F87171" strokeWidth="1.5" opacity="0.5" />
              <ellipse cx="32" cy="9" rx="4" ry="2" fill="#FFFFFF" opacity="0.95" stroke="#E2E8F0" strokeWidth="0.5" />
            </>
          )}
          {hasLooseBandage && (
            <>
              <rect x="25" y="4" width="14" height="12" rx="2" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
              <line x1="25" y1="7" x2="39" y2="7" stroke="#CBD5E1" strokeWidth="1" />
              <line x1="25" y1="10" x2="39" y2="10" stroke="#CBD5E1" strokeWidth="1" />
              <line x1="25" y1="13" x2="39" y2="13" stroke="#CBD5E1" strokeWidth="1" />
            </>
          )}
        </g>
      )}
      {scenarioId === 'nose-bleed' && (
        <g>
          {!hasPinchBridge && (
            <path d="M 50,44 L 50,56 L 49,58" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" fill="none" className="animate-pulse" />
          )}
          {hasTiltForward && !hasPinchBridge && (
            <text x="50" y="32" textAnchor="middle" className="text-[6px] fill-amber-500 font-black">🙇 Tilting...</text>
          )}
          {hasPinchBridge && !hasIcePack && (
            <>
              <path d="M 45,43 Q 50,45 55,43" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" fill="none" />
              <text x="50" y="32" textAnchor="middle" className="text-[6px] fill-emerald-500 font-black">🤏 Pinched</text>
            </>
          )}
          {hasIcePack && (
            <>
              <rect x="36" y="14" width="28" height="10" rx="3" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
              <circle cx="50" cy="19" r="2" fill="#FFFFFF" opacity="0.8" />
              <path d="M 50,44 L 50,46" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
            </>
          )}
        </g>
      )}
      {scenarioId === 'ankle-sprain' && (
        <g transform="translate(18, 65)">
          <circle cx="32" cy="10" r="10" fill="#FFD2B2" stroke="#E2E8F0" strokeWidth="1.5" />
          {!hasLooseBandage && (
            <circle cx="32" cy="10" r="8" fill="#EF4444" opacity={hasIcePack ? "0.3" : "0.6"} className="animate-pulse" />
          )}
          {hasIcePack && !hasLooseBandage && (
            <rect x="23" y="2" width="18" height="16" rx="3" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" opacity="0.9" />
          )}
          {hasLooseBandage && !hasElevateLeg && (
            <>
              <rect x="24" y="4" width="16" height="12" rx="2" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
              <line x1="24" y1="7" x2="40" y2="7" stroke="#94A3B8" strokeWidth="1" />
              <line x1="24" y1="11" x2="40" y2="11" stroke="#94A3B8" strokeWidth="1" />
            </>
          )}
          {hasElevateLeg && (
            <>
              <path d="M 18,18 Q 32,12 46,18 L 46,24 Q 32,18 18,24 Z" fill="#34D399" stroke="#059669" strokeWidth="1" />
              <rect x="24" y="2" width="16" height="12" rx="2" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" transform="rotate(-10 32 8)" />
            </>
          )}
        </g>
      )}
      {scenarioId === 'finger-splinter' && (
        <g transform="translate(45, 62)">
          <path d="M 5,20 C 5,10 8,2 12,2 C 16,2 18,10 18,20" stroke="#FFD2B2" strokeWidth="8" strokeLinecap="round" fill="none" />
          {!hasTweezer && (
            <>
              <line x1="12" y1="8" x2="16" y2="2" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="12" cy="8" r="3" fill="#EF4444" opacity="0.5" />
            </>
          )}
          {hasTweezer && !hasWash && (
            <circle cx="12" cy="8" r="2.5" fill="#EF4444" opacity="0.7" />
          )}
          {hasWash && !hasBandage && (
            <>
              <circle cx="10" cy="6" r="1" fill="#38BDF8" />
              <circle cx="14" cy="10" r="1.5" fill="#38BDF8" />
              <circle cx="12" cy="8" r="2" fill="#F87171" opacity="0.5" />
            </>
          )}
          {hasBandage && (
            <>
              <rect x="6" y="5" width="12" height="6" rx="1" fill="#F59E0B" stroke="#D97706" strokeWidth="0.5" />
              <circle cx="12" cy="8" r="0.5" fill="#FFFFFF" />
            </>
          )}
        </g>
      )}
    </svg>
  );
};

const ECGMonitorSVG = ({ bpm = 80, className = "w-28 h-16 bg-white rounded-lg border border-slate-200 p-2 overflow-hidden flex items-center justify-center shadow-sm relative" }) => {
  const duration = bpm > 100 ? 0.8 : bpm > 85 ? 1.1 : 1.5;
  return (
    <div className={className}>
      <div className="absolute top-1 left-2 text-[8px] font-black text-emerald-600 uppercase tracking-widest">ECG Vitals</div>
      <div className="absolute bottom-1 right-2 text-[9.5px] font-black text-slate-700 font-mono tracking-tight">{bpm} bpm</div>
      <svg viewBox="0 0 100 40" className="w-full h-full">
        <line x1="0" y1="20" x2="100" y2="20" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2,2" />
        <motion.path
          key={bpm}
          d="M 0,20 L 20,20 L 25,10 L 30,30 L 35,20 L 50,20 L 55,5 L 60,35 L 65,20 L 80,20 L 85,20 L 100,20"
          fill="none"
          stroke={bpm > 100 ? "#F43F5E" : bpm > 80 ? "#F59E0B" : "#10B981"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1] }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </svg>
    </div>
  );
};

const firstAidScenarios = [
  {
    id: 'knee-scratch',
    title: 'Scraped Knee from Bicycle Fall',
    icon: '🛹',
    patientName: 'Aarav Kumar / आरव कुमार',
    patientAge: '9 years old / 9 वर्ष',
    patientGender: 'Boy / लड़का',
    initialPainLevel: 80,
    description: 'A student fell off their bicycle. The knee is bleeding slightly with some dirt around it.',
    descriptionHindi: 'एक छात्र साइकिल से गिर गया। घुटने से हल्का खून बह रहा है और आसपास थोड़ी धूल-मिट्टी लगी है।',
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
    patientName: 'Priya Sharma / प्रिया शर्मा',
    patientAge: '8 years old / 8 वर्ष',
    patientGender: 'Girl / लड़की',
    initialPainLevel: 90,
    description: "A cup of hot tea spilled on the patient's hand. The skin is red and painful, but not blistered.",
    descriptionHindi: 'मरीज के हाथ पर गर्म चाय का कप गिर गया। त्वचा लाल और दर्दनाक है, लेकिन छाले नहीं पड़े हैं।',
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
    patientName: 'Kabir Singh / कबीर सिंह',
    patientAge: '10 years old / 10 वर्ष',
    patientGender: 'Boy / लड़का',
    initialPainLevel: 70,
    description: 'A bee stung the patient on the arm. The area is swelling and itching heavily.',
    descriptionHindi: 'मरीज के हाथ पर मधुमक्खी ने डंक मार दिया है। वह स्थान सूज रहा है और बहुत खुजली हो रही है।',
    correctOrder: ['tweezer', 'ice-pack', 'antihistamine'],
    hints: {
      tweezer: 'First, use tweezers to scrape out the sting gently without squeezing it.',
      'ice-pack': 'Apply a cold ice pack to reduce local swelling and soothe pain.',
      antihistamine: 'Apply soothing antihistamine cream to block the allergic reaction.'
    }
  },
  {
    id: 'dog-bite',
    title: 'Stray Dog Scratch/Bite',
    icon: '🐕',
    patientName: 'Rahul Verma / राहुल वर्मा',
    patientAge: '11 years old / 11 वर्ष',
    patientGender: 'Boy / लड़का',
    initialPainLevel: 85,
    description: 'A stray dog scratched the patient on the leg. The skin is broken and bleeding.',
    descriptionHindi: 'एक आवारा कुत्ते ने मरीज के पैर पर खरोंच/काट लिया है। त्वचा कट गई है और खून बह रहा है।',
    correctOrder: ['wash', 'antiseptic', 'loose-bandage'],
    hints: {
      wash: 'Immediately wash the scratch under clean running water to wash off saliva and bacteria.',
      antiseptic: 'Apply antiseptic gel to disinfect the area and prevent critical infections.',
      'loose-bandage': 'Loosely wrap with a clean gauze and advise visiting a hospital for Rabies & Tetanus shots!'
    }
  },
  {
    id: 'nose-bleed',
    title: 'Summer Nosebleed',
    icon: '👃',
    patientName: 'Aditi Sen / अदिति सेन',
    patientAge: '7 years old / 7 वर्ष',
    patientGender: 'Girl / लड़की',
    initialPainLevel: 60,
    description: "Due to dry summer heat, the patient's nose started bleeding. They feel dizzy and scared.",
    descriptionHindi: 'गर्मियों की शुष्क गर्मी के कारण मरीज की नाक से खून बहने लगा है। उन्हें चक्कर आ रहे हैं और वे डरे हुए हैं।',
    correctOrder: ['tilt-forward', 'pinch-bridge', 'ice-pack'],
    hints: {
      'tilt-forward': 'Sit straight and tilt the head slightly forward (never backward, as swallowing blood causes nausea).',
      'pinch-bridge': 'Pinch the soft nose bridge firmly and breathe through the mouth for 10 minutes.',
      'ice-pack': 'Place a cold ice pack on the forehead or nose bridge to constrict blood vessels and stop the bleeding.'
    }
  },
  {
    id: 'ankle-sprain',
    title: 'Sprained Ankle from Football',
    icon: '⚽',
    patientName: 'Ishaan Gupta / ईशान गुप्ता',
    patientAge: '12 years old / 12 वर्ष',
    patientGender: 'Boy / लड़का',
    initialPainLevel: 75,
    description: 'The patient twisted their ankle playing football. The ankle is starting to swell and hurts to step on.',
    descriptionHindi: 'फुटबॉल खेलते समय मरीज का टखना मुड़ गया। टखने में सूजन आने लगी है और पैर रखने पर दर्द हो रहा है।',
    correctOrder: ['ice-pack', 'loose-bandage', 'elevate-leg'],
    hints: {
      'ice-pack': 'Apply a cold ice pack immediately to reduce local blood flow and swelling.',
      'loose-bandage': 'Wrap the ankle with an elastic support bandage to stabilize and support the joint.',
      'elevate-leg': 'Elevate the sprained foot on pillows above heart level to drain excess fluid and prevent swelling.'
    }
  },
  {
    id: 'finger-splinter',
    title: 'Wooden Splinter in Finger',
    icon: '🪵',
    patientName: 'Meera Nair / मीरा नायर',
    patientAge: '6 years old / 6 वर्ष',
    patientGender: 'Girl / लड़की',
    initialPainLevel: 50,
    description: "While playing with wooden blocks, a small splinter entered the patient's finger. It is stinging and red.",
    descriptionHindi: 'लकड़ी के गुटकों से खेलते समय मरीज की उंगली में एक छोटा फांस (लकड़ी का टुकड़ा) घुस गया। वहां जलन और लाली है।',
    correctOrder: ['tweezer', 'wash', 'bandage'],
    hints: {
      tweezer: 'Gently scrape or pull the wood splinter out in the same direction it entered using sterile tweezers.',
      wash: 'Wash the area clean with soap and water to ensure no dirt gets trapped inside.',
      bandage: 'Cover with a clean adhesive band-aid to keep the tiny opening protected.'
    }
  }
];

const FirstAidLab = () => {
  const [currentScenarioIdx, setCurrentScenarioIdx] = useState(0);
  const [firstAidSequence, setFirstAidSequence] = useState([]);
  const [firstAidFeedback, setFirstAidFeedback] = useState(null);
  const [firstAidFinished, setFirstAidFinished] = useState(false);
  const [firstAidScore, setFirstAidScore] = useState(0);
  const [showFirstAidCertificate, setShowFirstAidCertificate] = useState(false);
  const [curedPatients, setCuredPatients] = useState({});

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
        setCuredPatients(prev => ({
          ...prev,
          [scenario.id]: true
        }));
        setFirstAidFeedback({
          type: 'success',
          text: `🎉 Excellent job! You treated the patient successfully using correct first aid protocols. +100 Points!`
        });
        // Open the bravery certificate modal!
        setShowFirstAidCertificate(true);
      }
    } else {
      // Each error has an English text + Hindi text
      let errorData = {
        text: "Wrong step! Assess the injury carefully.",
        textHindi: "गलत कदम! चोट को ध्यान से देखें और दोबारा कोशिश करें।"
      };

      // Educational rationale based on what correct action was expected
      if (expectedTool === 'wash') {
        errorData = {
          text: `Dirt, germs, or contaminants must be washed away first with Sterile Water. Applying other tools right now would trap bacteria in the wound!`,
          textHindi: `घाव को पहले साफ पानी से धोना ज़रूरी है। अभी कोई और चीज़ लगाने से घाव में बैक्टीरिया बंद हो जाएगा!`
        };
      } else if (expectedTool === 'water-cool') {
        errorData = {
          text: `For a fresh heat burn, running Cool Water over the skin is the top priority to stop deep tissue damage. Creams or bandages will trap heat inside!`,
          textHindi: `कीटाणुओं से बचाने और त्वचा को ठंडा करने के लिए पहले ठंडे पानी का इस्तेमाल करें!`
        };
      } else if (expectedTool === 'tweezer') {
        errorData = {
          text: `A foreign object (bee stinger or wooden splinter) is still lodged in the skin. We must remove it first using Tweezers before washing or applying creams!`,
          textHindi: `त्वचा में अभी भी कोई बाहरी चीज़ (मधुमक्खी का डंक या लकड़ी का टुकड़ा) फंसी है। पहले चिमटी से उसे निकालें!`
        };
      } else if (expectedTool === 'tilt-forward') {
        errorData = {
          text: `Before any other action, the nosebleed patient must lean/tilt their head forward to prevent blood from running down the throat.`,
          textHindi: `किसी भी अन्य कदम से पहले, नाक से खून बहने वाले मरीज़ का सिर आगे की ओर झुकाएं ताकि खून गले में न जाए।`
        };
      } else if (expectedTool === 'pinch-bridge') {
        errorData = {
          text: `To stop nasal bleeding, direct pressure must be applied to the blood vessels. You must pinch the nose bridge first!`,
          textHindi: `नाक की खून की नलियों पर दबाव देने के लिए पहले नाक को दबाएं!`
        };
      } else if (expectedTool === 'ice-pack') {
        if (scenario.id === 'ankle-sprain') {
          errorData = {
            text: `An ankle sprain requires immediate cold therapy (Cold Ice Pack) to reduce internal bleeding and swelling before we apply support wrapping.`,
            textHindi: `टखने की मोच के लिए पहले ठंडी सिकाई करें ताकि सूजन और अंदरूनी खून बहना कम हो, फिर पट्टी लगाएं।`
          };
        } else if (scenario.id === 'bee-sting') {
          errorData = {
            text: `After removing the stinger, apply a Cold Ice Pack to decrease localized swelling and pain before applying ointments.`,
            textHindi: `डंक निकालने के बाद, मरहम लगाने से पहले ठंडी सिकाई करें ताकि सूजन और दर्द कम हो।`
          };
        } else {
          errorData = {
            text: `We need to apply a Cold Ice Pack first to soothe swelling and numb the throbbing pain.`,
            textHindi: `सूजन को कम करने और दर्द को शांत करने के लिए पहले ठंडी सिकाई करें।`
          };
        }
      } else if (expectedTool === 'antiseptic') {
        errorData = {
          text: `The wound is washed and clean, but you must apply Antiseptic Gel now to disinfect the cut and kill remaining germs before sealing it.`,
          textHindi: `घाव साफ हो गया है, लेकिन अब एंटीसेप्टिक जेल लगाना ज़रूरी है ताकि बचे हुए कीटाणु नष्ट हों।`
        };
      } else if (expectedTool === 'aloe-vera') {
        errorData = {
          text: `The burn is cooled down, but you need to apply Aloe Vera Extract next to hydrate, soothe, and heal the damaged tissues.`,
          textHindi: `जलन ठंडी हो गई है, अब एलोवेरा लगाएं ताकि त्वचा को नमी और आराम मिले।`
        };
      } else if (expectedTool === 'antihistamine') {
        errorData = {
          text: `The sting site is clean and iced, but we must apply Antihistamine Cream now to stop the severe allergic itching and redness.`,
          textHindi: `डंक वाली जगह साफ और ठंडी है, अब एलर्जी की खुजली और लालिमा रोकने के लिए एंटीहिस्टामाइन लगाएं।`
        };
      } else if (expectedTool === 'bandage') {
        errorData = {
          text: `The wound is cleaned and disinfected. Now we must apply an Adhesive Bandage to protect the open skin from dust and friction.`,
          textHindi: `घाव साफ और कीटाणुरहित हो गया है। अब धूल और घर्षण से बचाने के लिए पट्टी लगाएं।`
        };
      } else if (expectedTool === 'loose-bandage') {
        errorData = {
          text: `We need to loosely wrap the area with a Loose Gauze Roll to shield the delicate skin from outside air and germs.`,
          textHindi: `नाजुक त्वचा को हवा और कीटाणुओं से बचाने के लिए ढीली पट्टी से लपेटें।`
        };
      } else if (expectedTool === 'elevate-leg') {
        errorData = {
          text: `The sprain is iced and bandaged. The final step is to Elevate the Leg on pillows to drain fluid away from the ankle and relieve throbbing pain.`,
          textHindi: `मोच पर सिकाई और पट्टी हो गई है। अब पैर को तकिए पर ऊँचा रखें ताकि सूजन और दर्द कम हो।`
        };
      }

      // Overrides for specific dangerous or inappropriate actions
      if (toolId === 'ice-pack' && scenario.id === 'tea-burn') {
        errorData = {
          text: "Caution: Never apply ice or direct ice packs to fresh burns! Extreme cold causes frostbite-like damage to raw tissues. Use cool running water first.",
          textHindi: "सावधान: ताज़ी जलन पर बर्फ या आइस पैक कभी न लगाएं! अत्यधिक ठंड से कच्ची त्वचा को गंभीर नुकसान होता है। पहले ठंडे बहते पानी का इस्तेमाल करें।"
        };
      } else if (toolId === 'bandage' && scenario.id === 'tea-burn') {
        errorData = {
          text: "Caution: Tight adhesive bandages can stick to raw burn skin and tear it when removed. Use a loose gauze wrap instead.",
          textHindi: "सावधान: चिपकने वाली पट्टी कच्ची जली त्वचा से चिपक सकती है और हटाते समय नुकसान पहुंचाती है। इसके बजाय ढीली पट्टी का उपयोग करें।"
        };
      } else if (toolId === 'elevate-leg' && scenario.id === 'nose-bleed') {
        errorData = {
          text: "Warning: Elevating the patient's legs during a nosebleed increases blood pressure in the head, making the nosebleed worse! Keep them sitting up.",
          textHindi: "चेतावनी: नाक से खून बहते समय पैर ऊँचे करने से सिर में रक्तचाप बढ़ता है और खून और तेज़ बहता है! मरीज़ को सीधे बैठाएं।"
        };
      } else if (toolId === 'tilt-forward' && scenario.id === 'ankle-sprain') {
        errorData = {
          text: "Head positioning will not treat a sprained ankle. Choose tools that target the foot.",
          textHindi: "सिर की स्थिति बदलने से मोच का इलाज नहीं होगा। पैर के लिए सही उपकरण चुनें।"
        };
      }

      setFirstAidFeedback({
        type: 'error',
        text: errorData.text,
        textHindi: errorData.textHindi
      });
    }
  };

  const resetFirstAidLab = () => {
    setFirstAidSequence([]);
    setFirstAidFeedback(null);
    setFirstAidFinished(false);
    setShowFirstAidCertificate(false);
  };

  const resetFirstAidGame = () => {
    setFirstAidScore(0);
    setCurrentScenarioIdx(0);
    setFirstAidSequence([]);
    setFirstAidFeedback(null);
    setFirstAidFinished(false);
    setShowFirstAidCertificate(false);
    setCuredPatients({});
  };

  const nextFirstAidScenario = () => {
    // Find next uncured scenario
    const nextUncuredIdx = firstAidScenarios.findIndex((sc, idx) => idx > currentScenarioIdx && !curedPatients[sc.id]);
    if (nextUncuredIdx !== -1) {
      setCurrentScenarioIdx(nextUncuredIdx);
    } else {
      const firstUncuredIdx = firstAidScenarios.findIndex((sc) => !curedPatients[sc.id]);
      if (firstUncuredIdx !== -1) {
        setCurrentScenarioIdx(firstUncuredIdx);
      } else {
        setCurrentScenarioIdx((currentScenarioIdx + 1) % firstAidScenarios.length);
      }
    }
    resetFirstAidLab();
  };

  return (
    <>
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.03)] p-6 md:p-8">
        <div className="w-full text-left space-y-8">
          {/* Clinical Dashboard Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-[11px] font-black uppercase text-teal-600 tracking-widest bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-100/50 animate-pulse">
                🔴 Clinic Waiting Room & ER Dashboard
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-800 mt-2 tracking-tight">First Aid Clinic Simulator</h2>
              <p className="text-[13px] text-slate-500 font-semibold mt-1">Diagnose patients, select cabinet supplies, and execute critical medical procedures.</p>
            </div>
            <div className="flex items-center gap-3 self-stretch sm:self-auto justify-end">
              <div className="bg-emerald-50 border border-emerald-100/80 px-4 py-2 rounded-2xl text-center shrink-0 min-w-[90px] shadow-sm">
                <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest block mb-0.5">Exp Points</span>
                <span className="text-xl font-black text-emerald-700">{firstAidScore} XP</span>
              </div>
              <button
                onClick={resetFirstAidGame}
                className="p-2.5 bg-white hover:bg-slate-50 rounded-xl text-slate-500 border border-slate-200 hover:border-slate-350 transition-all cursor-pointer shadow-sm flex items-center justify-center"
                title="Reset Score & Scenarios"
              >
                <RefreshCw size={15} />
              </button>
            </div>
          </div>

          {/* Split Flex Layout: Sidebar Patients Queue + Active Workspace */}
          <div className="flex flex-col xl:flex-row gap-6 items-start">

            {/* Left Side: Patient Queue Sidebar */}
            <div className="w-full xl:w-[300px] xl:shrink-0 bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Patient Queue</span>
                <span className="text-[10px] font-bold bg-teal-50 text-teal-700 px-2 py-0.5 rounded border border-teal-200">
                  {Object.keys(curedPatients).length}/7 Cured
                </span>
              </div>
              <div className="flex xl:flex-col gap-2.5 overflow-x-auto xl:overflow-x-visible pb-2 xl:pb-0 scrollbar-none">
                {firstAidScenarios.map((sc, idx) => {
                  const isActive = currentScenarioIdx === idx;
                  const isCured = curedPatients[sc.id];
                  return (
                    <button
                      key={sc.id}
                      onClick={() => {
                        setCurrentScenarioIdx(idx);
                        resetFirstAidLab();
                      }}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all shrink-0 w-[220px] xl:w-full cursor-pointer select-none ${isActive
                        ? 'bg-teal-50 border-teal-500 shadow-sm ring-1 ring-teal-500/25'
                        : 'bg-white border-slate-150 hover:border-slate-300'
                        }`}
                    >
                      <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-lg shrink-0">
                        {sc.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[13px] font-black text-slate-800 truncate leading-tight">
                          {sc.patientName.split('/')[0]}
                        </div>
                        <div className="text-[9px] text-slate-400 font-bold truncate">
                          {sc.title}
                        </div>
                      </div>
                      {isCured ? (
                        <span className="text-emerald-600 font-black text-sm shrink-0 bg-emerald-50 w-5 h-5 rounded-full flex items-center justify-center border border-emerald-150">✓</span>
                      ) : (
                        <span className="w-2 h-2 bg-rose-500 rounded-full shrink-0 animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Side: Active Workspace */}
            <div className="flex-1 w-full space-y-6">
              {/* EHR Patient Profile Card */}
              {(() => {
                const scenario = firstAidScenarios[currentScenarioIdx];
                const totalSteps = scenario.correctOrder.length;
                const completedSteps = firstAidSequence.length;
                const currentPain = Math.max(0, Math.round(scenario.initialPainLevel - (completedSteps * (scenario.initialPainLevel / totalSteps))));
                const currentBPM = currentPain === 0 ? 72 : Math.round(75 + (currentPain * 0.5));

                // Determine Nurse expression based on progress
                let nurseExpr = "smile";
                if (currentPain > 50) nurseExpr = "sad";
                if (currentPain === 0) nurseExpr = "cheering";

                return (
                  <div className="bg-slate-100/70 text-slate-800 rounded-xl p-5 md:p-6 shadow border-2 border-dashed border-slate-300 relative overflow-hidden">
                    {/* Decorative background grid */}
                    <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

                    <div className="relative z-10 flex flex-col lg:flex-row gap-6 items-center">
                      {/* Left: Patient Visualizer & Vital Stats */}
                      <div className="flex flex-col sm:flex-row items-center gap-5 w-full lg:w-auto shrink-0 border-b lg:border-b-0 lg:border-r border-slate-200/80 pb-5 lg:pb-0 lg:pr-6">
                        <div className="relative">
                          <PatientVisualizerSVG scenarioId={scenario.id} sequence={firstAidSequence} className="w-28 h-28 bg-white rounded-xl border border-slate-200 p-2 shadow-sm" />
                          {currentPain === 0 && (
                            <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full border border-emerald-400 shadow animate-bounce">
                              Recovered
                            </span>
                          )}
                        </div>
                        <div className="text-center sm:text-left space-y-2">
                          <div className="space-y-0.5">
                            <span className="text-[9px] font-black uppercase text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                              Patient File
                            </span>
                            <h3 className="text-lg font-black text-slate-800 leading-tight mt-1">{scenario.patientName}</h3>
                            <div className="text-xs font-bold text-slate-500 flex items-center justify-center sm:justify-start gap-2">
                              <span>{scenario.patientAge}</span>
                              <span className="text-slate-300">•</span>
                              <span>{scenario.patientGender}</span>
                            </div>
                          </div>

                          {/* ECG Pulse Monitor */}
                          <ECGMonitorSVG bpm={currentBPM} />
                        </div>
                      </div>

                      {/* Middle: Injury Report + Pain Level */}
                      <div className="flex-1 w-full space-y-3">
                        <div className="space-y-1">
                          <span className="text-[10px] font-black uppercase bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded border border-rose-200">
                            Admitted Injury / भर्ती चोट
                          </span>
                          <h4 className="text-[16px] font-extrabold text-slate-800 flex items-center gap-1.5 mt-1">
                            <span>{scenario.icon}</span> {scenario.title}
                          </h4>
                          <p className="text-[13px] text-slate-650 leading-relaxed font-semibold italic">
                            "{scenario.description}"
                          </p>
                          <p className="text-[12.5px] text-teal-800 leading-relaxed font-medium mt-0.5">
                            "{scenario.descriptionHindi}"
                          </p>
                        </div>
                        {/* Pain Level — now below the injury descriptions */}
                        <div className="bg-white rounded-lg px-3 py-2.5 border border-slate-200">
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">🩺 Patient Pain Level</span>
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${currentPain > 60 ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                              currentPain > 20 ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              }`}>
                              {currentPain > 0 ? `${currentPain}%` : 'Pain Free! ✓'}
                            </span>
                          </div>
                          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                            <motion.div
                              initial={{ width: '105%' }}
                              animate={{ width: `${currentPain}%` }}
                              className={`h-full rounded-full ${currentPain > 60 ? 'bg-gradient-to-r from-orange-500 to-rose-500' :
                                currentPain > 20 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                                  'bg-gradient-to-r from-emerald-500 to-teal-500'
                                }`}
                              transition={{ type: "spring", stiffness: 60 }}
                            />
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })()}

              {/* Bottom Section: Treatment Clipboard & Medical Supply Cabinet */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                {/* Left Column: Nurse Diya Guidance + Rx Treatment Clipboard */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Nurse Diya Clinical Memo */}
                  {(() => {
                    const scenario = firstAidScenarios[currentScenarioIdx];
                    const completedSteps = firstAidSequence.length;
                    const nurseExprBanner = firstAidFinished ? 'happy' : firstAidFeedback?.type === 'error' ? 'concerned' : 'neutral';
                    const currentStep = scenario.correctOrder[completedSteps];

                    const hintsHindi = {
                      'knee-scratch': { wash: 'पहले घाव को साफ पानी से धोएं।', antiseptic: 'कीटाणु मारने के लिए एंटीसेप्टिक क्रीम लगाएं।', bandage: 'घाव को बंद रखने के लिए पट्टी लगाएं।' },
                      'tea-burn': { 'water-cool': 'जलन वाली जगह पर तुरंत ठंडा पानी डालें।', 'aloe-vera': 'एलोवेरा जेल से जलन शांत करें।', 'loose-bandage': 'ढीली पट्टी से जलन को ढकें।' },
                      'bee-sting': { tweezer: 'चिमटी से डंक को धीरे से निकालें।', 'ice-pack': 'सूजन कम करने के लिए बर्फ की सिकाई करें।', antihistamine: 'एंटीहिस्टामाइन क्रीम लगाएं।' },
                      'dog-bite': { wash: 'खरोंच को तुरंत बहते पानी से धोएं।', antiseptic: 'एंटीसेप्टिक जेल लगाकर कीटाणु नष्ट करें।', 'loose-bandage': 'ढीली पट्टी लगाएं और अस्पताल जाएं।' },
                      'nose-bleed': { 'tilt-forward': 'सिर को थोड़ा आगे झुकाएं — पीछे नहीं।', 'pinch-bridge': 'नाक के नरम हिस्से को 10 मिनट दबाएं।', 'ice-pack': 'माथे या नाक पर ठंडी सिकाई करें।' },
                      'ankle-sprain': { 'ice-pack': 'टखने पर तुरंत ठंडी सिकाई करें।', 'loose-bandage': 'टखने को इलास्टिक पट्टी से सहारा दें।', 'elevate-leg': 'पैर को तकिए पर ऊँचा रखें।' },
                      'finger-splinter': { tweezer: 'चिमटी से फांस को उसी दिशा में निकालें।', wash: 'साबुन और पानी से अच्छी तरह धोएं।', bandage: 'पट्टी लगाकर उंगली को सुरक्षित करें।' }
                    };

                    const nurseMsg = firstAidFinished
                      ? "Great job! The patient is fully cured! You followed the correct first aid protocol."
                      : scenario.hints[currentStep];
                    const nurseMsgHindi = firstAidFinished
                      ? "शाबाश! मरीज पूरी तरह ठीक हो गया! आपने सही प्राथमिक उपचार किया।"
                      : (hintsHindi[scenario.id]?.[currentStep] || '');

                    return (
                      <div className={`flex items-start gap-4 p-4 rounded-xl border-y border-r border-l-[6px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all text-left ${firstAidFinished
                        ? 'bg-emerald-50/80 border-emerald-250 border-l-emerald-500'
                        : firstAidFeedback?.type === 'error'
                          ? 'bg-rose-50/80 border-rose-250 border-l-rose-500'
                          : 'bg-teal-50/80 border-teal-250 border-l-teal-500'
                        }`}>
                        {/* Avatar */}
                        <div className="shrink-0 relative">
                          <NurseDiyaSVG
                            expression={nurseExprBanner}
                            className={`w-11 h-11 rounded-lg p-0.5 border ${firstAidFinished
                              ? 'bg-emerald-100 border-emerald-300'
                              : firstAidFeedback?.type === 'error'
                                ? 'bg-rose-100 border-rose-300'
                                : 'bg-teal-100 border-teal-300'
                              }`}
                          />
                        </div>

                        {/* Memo Content */}
                        <div className="flex-1 min-w-0 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className={`text-[10px] font-black uppercase tracking-wider flex items-center gap-1 ${firstAidFinished ? 'text-emerald-700' : firstAidFeedback?.type === 'error' ? 'text-rose-700' : 'text-slate-500'
                              }`}>
                              <span className="text-[11px]">🩺</span> Clinical Memo
                            </span>
                            <span className={`text-[8.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${firstAidFinished
                              ? 'bg-emerald-100/70 text-emerald-800 border-emerald-200'
                              : firstAidFeedback?.type === 'error'
                                ? 'bg-rose-100/70 text-rose-800 border-rose-200'
                                : 'bg-teal-100/70 text-teal-800 border-teal-200'
                              }`}>
                              {firstAidFinished ? 'Cured' : `Step ${completedSteps + 1}/${scenario.correctOrder.length}`}
                            </span>
                          </div>

                          {/* English Instruction */}
                          <p className="text-[12px] font-black text-slate-800 leading-relaxed pt-0.5">
                            {nurseMsg}
                          </p>

                          {/* Hindi Instruction */}
                          {nurseMsgHindi && (
                            <p className="text-[11px] font-bold text-slate-500 leading-relaxed border-t border-slate-200/50 pt-2 mt-1.5">
                              {nurseMsgHindi}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Treatment Clipboard */}
                  <div className="bg-amber-50/25 border-2 border-slate-200/80 rounded-xl p-5 shadow-sm relative overflow-hidden">
                    {/* Clipboard Clip decoration */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-700 rounded-b-xl flex items-center justify-center border-t-2 border-slate-600 shadow-md">
                      <div className="w-8 h-2 bg-slate-500 rounded-full" />
                    </div>

                    <div className="pt-4 space-y-4">
                      <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                        <span className="text-[11px] font-black text-slate-505 tracking-widest">Rx Treatment Plan</span>
                        <button
                          onClick={nextFirstAidScenario}
                          className="text-xs font-black text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer flex items-center gap-1 transition-colors"
                        >
                          Skip Patient ➔
                        </button>
                      </div>

                      <div className="space-y-3">
                        {firstAidScenarios[currentScenarioIdx].correctOrder.map((step, idx) => {
                          const isDone = firstAidSequence.length > idx;
                          const isCurrent = firstAidSequence.length === idx;
                          return (
                            <div
                              key={step}
                              className={`flex items-center gap-3.5 p-3 rounded-2xl border transition-all ${isDone
                                ? 'bg-green-50/80 border-green-200 text-green-800 shadow-sm'
                                : isCurrent
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-md scale-[1.02] ring-2 ring-emerald-500/10'
                                  : 'bg-white/60 border-slate-150 text-slate-450 text-slate-400'
                                }`}
                            >
                              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black ${isDone
                                ? 'bg-green-500 text-white shadow-sm'
                                : isCurrent
                                  ? 'bg-emerald-600 text-white shadow-sm animate-pulse'
                                  : 'bg-slate-100 text-slate-400'
                                }`}>
                                {idx + 1}
                              </span>
                              <span className="text-[13.5px] font-black capitalize tracking-tight">
                                {step.replace('-', ' ')}
                              </span>
                              {isDone ? (
                                <span className="ml-auto text-[11px] font-black bg-green-200/50 text-green-700 px-2 py-0.5 rounded-full border border-green-300/30">
                                  ✓ Completed
                                </span>
                              ) : isCurrent ? (
                                <span className="ml-auto text-[10px] font-black uppercase text-emerald-600 tracking-wider animate-pulse">
                                  Next Up
                                </span>
                              ) : null}
                            </div>
                          );
                        })}
                      </div>

                      {/* ── Wrong Selection Clinical Alert (Bilingual) ── */}
                      {firstAidFeedback && firstAidFeedback.type === 'error' && (
                        <div className="mt-2 flex overflow-hidden rounded-2xl border border-rose-200/80 shadow-md bg-white">
                          {/* Left accent stripe */}
                          <div className="w-1.5 shrink-0 bg-gradient-to-b from-rose-500 to-rose-700 rounded-l-2xl" />

                          {/* Main content */}
                          <div className="flex-1 p-3.5 space-y-3 min-w-0">

                            {/* Header row */}
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                {/* Animated warning icon */}
                                <div className="relative shrink-0">
                                  <div className="absolute inset-0 bg-rose-400/30 rounded-full animate-ping" />
                                  <div className="relative w-7 h-7 bg-rose-600 rounded-full flex items-center justify-center shadow-sm">
                                    <span className="text-white text-[13px]">⚠</span>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-[11px] font-black uppercase tracking-widest text-rose-700 leading-none">Clinical Alert</p>
                                  <p className="text-[9px] font-bold text-rose-455 tracking-wide mt-0.5">Incorrect Supply Selected</p>
                                </div>
                              </div>
                              {/* Badge */}
                              <span className="shrink-0 text-[9px] font-black uppercase tracking-wider bg-rose-100 text-rose-600 border border-rose-200 px-2 py-0.5 rounded-full">
                                Wrong Step
                              </span>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-slate-100" />

                            {/* English explanation */}
                            <div className="space-y-1">

                              <p className="text-[12px] font-semibold text-slate-800 leading-relaxed pl-0.5">
                                {firstAidFeedback.text}
                              </p>
                            </div>

                            {/* Hindi explanation */}
                            <div className="space-y-1 bg-slate-50/80 border border-slate-100 rounded-xl p-2.5">

                              <p className="text-[12px] font-semibold text-slate-705 leading-relaxed pl-0.5">
                                {firstAidFeedback.textHindi}
                              </p>
                            </div>

                            {/* Footer guidance bar */}
                            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200/60 rounded-xl px-3 py-2">
                              <span className="text-sm shrink-0">💡</span>
                              <p className="text-[10.5px] font-bold text-amber-800 leading-tight">
                                Review the injury above and select the correct supply
                              </p>
                            </div>

                          </div>
                        </div>
                      )}

                      <div className="pt-2">
                        <button
                          onClick={resetFirstAidLab}
                          className="w-full py-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:border-slate-350 rounded-2xl text-[11px] font-black text-slate-600 tracking-widest uppercase transition-all cursor-pointer shadow-sm active:scale-98"
                        >
                          Reset Current Treatment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Medical Supply Cabinet */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex justify-between items-center pb-1">
                    <h4 className="text-[12px] font-black text-slate-500 uppercase tracking-widest">Medical Supply Cabinet</h4>
                    <span className="text-[10px] font-black text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100/50">
                      Select Correct Supply
                    </span>
                  </div>

                  {/* Cabinet Shelves Design */}
                  <div className="bg-slate-50 border-2 border-slate-200 rounded-[28px] p-4 md:p-5 shadow-inner space-y-4 relative">
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'ice-pack', name: 'Cold Ice Pack', desc: 'Reduce swelling', icon: '❄️' },
                        { id: 'wash', name: 'Sterile Water', desc: 'Wash dirt/debris', icon: '💧' },
                        { id: 'aloe-vera', name: 'Aloe Vera Extract', desc: 'Soothe burn skin', icon: '🌱' },
                        { id: 'tweezer', name: 'Sterile Tweezers', desc: 'Scrape stings gently', icon: '✂️' },
                        { id: 'elevate-leg', name: 'Elevate Leg', desc: 'Raise leg on pillows', icon: '🛌' },
                        { id: 'bandage', name: 'Adhesive Bandage', desc: 'Cover minor cuts', icon: '🩹' },
                        { id: 'water-cool', name: 'Cool Water', desc: 'Cool fresh burns', icon: '🚰' },
                        { id: 'pinch-bridge', name: 'Pinch Nose', desc: 'Squeeze nose bridge', icon: '🤏' },
                        { id: 'antihistamine', name: 'Antihistamine', desc: 'Block allergic itch', icon: '🧪' },
                        { id: 'loose-bandage', name: 'Loose Gauze Roll', desc: 'Shield burn area', icon: '🧣' },
                        { id: 'tilt-forward', name: 'Tilt Head', desc: 'Lean head forward', icon: '🙇' },
                        { id: 'antiseptic', name: 'Antiseptic Gel', desc: 'Disinfect wounds', icon: '🧴' }
                      ].map(tool => {
                        const isUsed = firstAidSequence.includes(tool.id);
                        return (
                          <button
                            key={tool.id}
                            onClick={() => selectFirstAidTool(tool.id)}
                            disabled={firstAidFinished}
                            className={`p-3 border-2 rounded-2xl text-center space-y-2.5 transition-all shadow-sm flex flex-col items-center group cursor-pointer ${isUsed
                              ? 'bg-slate-100 border-slate-200 opacity-55'
                              : 'bg-white border-slate-150 hover:border-teal-400 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0'
                              }`}
                          >
                            <span className="text-[34px] group-hover:scale-110 transition-transform block drop-shadow-sm select-none">
                              {tool.icon}
                            </span>
                            <div className="space-y-0.5">
                              <div className="text-[12px] font-black text-slate-800 leading-none">{tool.name}</div>
                              <div className="text-[9px] text-slate-400 font-bold leading-tight line-clamp-1">{tool.desc}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Success toast only inside cabinet — error details live in the Clipboard */}
                    <AnimatePresence mode="wait">
                      {firstAidFeedback && firstAidFeedback.type !== 'error' && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className={`p-3 rounded-2xl text-xs font-bold leading-relaxed border-2 shadow-sm ${firstAidFeedback.type === 'success'
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : 'bg-teal-50 border-teal-200 text-teal-800'
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

          </div>
        </div>
      </div>

      {/* First Aid Clinic Certificate Modal */}
      <AnimatePresence>
        {showFirstAidCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-955/70 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-[32px] border-[6px] border-emerald-500 shadow-2xl p-6 md:p-8 max-w-xl w-full relative overflow-hidden text-center"
            >
              {/* Confetti decoration */}
              <div className="absolute -top-12 -left-12 w-28 h-28 bg-emerald-100 rounded-full opacity-35 blur-xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-teal-100 rounded-full opacity-35 blur-xl pointer-events-none" />

              {/* Certificate badge */}
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-emerald-150 shadow-inner">
                <Award size={36} className="animate-bounce" />
              </div>

              {Object.keys(curedPatients).length === 7 ? (
                <>
                  <h2 className="text-xl md:text-2xl font-display font-bold text-slate-800 tracking-tight">
                    🏆 First Aid Master Graduate Certificate
                  </h2>
                  <h3 className="text-sm font-bold text-emerald-600 mt-0.5 tracking-wider uppercase">
                    प्राथमिक चिकित्सा मास्टर प्रमाणपत्र
                  </h3>
                </>
              ) : (
                <>
                  <h2 className="text-xl md:text-2xl font-display font-bold text-slate-800 tracking-tight">
                    Junior Doctor Bravery Certificate
                  </h2>
                  <h3 className="text-sm font-bold text-emerald-600 mt-0.5 tracking-wider uppercase">
                    जूनियर डॉक्टर वीरता प्रमाणपत्र
                  </h3>
                </>
              )}

              <div className="my-6 p-5 bg-slate-50 border border-slate-150 rounded-2xl text-left space-y-4">
                {Object.keys(curedPatients).length === 7 ? (
                  <div className="text-center pb-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Presented to a Master Doctor for curing</p>
                    <p className="text-lg font-black text-emerald-600 mt-1">
                      ALL 7 CLINIC PATIENTS SUCCESSFULLY!
                    </p>
                    <p className="text-xs font-semibold text-slate-505 mt-3 leading-relaxed">
                      Congratulations! You successfully triaged, diagnosed, and executed first aid protocols for Aarav, Priya, Kabir, Rahul, Aditi, Ishaan, and Meera. You saved lives and demonstrated perfect clinical skills!
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="text-center pb-2 border-b border-slate-200">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Awarded to doctor for curing</p>
                      <p className="text-lg font-black text-slate-800 mt-0.5">
                        {firstAidScenarios[currentScenarioIdx].patientName.split('/')[0]}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <span className="text-[11px] font-black text-teal-600 uppercase tracking-wider block mb-1">
                        What You Learned / आपने क्या सीखा:
                      </span>

                      {firstAidScenarios[currentScenarioIdx].id === 'knee-scratch' && (
                        <div className="space-y-2 text-xs font-bold text-slate-600 leading-relaxed">
                          <div className="flex items-start gap-2">
                            <span className="text-emerald-500 text-sm">💧</span>
                            <div>
                              <p className="text-slate-800">Sterile Water washes away dirt & stops germs.</p>
                              <p className="text-slate-400 font-medium">साफ पानी गंदगी को धोता है और कीटाणुओं को रोकता है।</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-emerald-500 text-sm">🧴</span>
                            <div>
                              <p className="text-slate-800">Antiseptic kills bacteria to prevent infection.</p>
                              <p className="text-slate-400 font-medium">एंटीसेप्टिक बैक्टीरिया को मारता है ताकि संक्रमण न फैले।</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-emerald-500 text-sm">🩹</span>
                            <div>
                              <p className="text-slate-800">Bandages protect the wound from open air & dust.</p>
                              <p className="text-slate-400 font-medium">बैंड-एड धूल और गंदगी से घाव को सुरक्षित रखता है।</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {firstAidScenarios[currentScenarioIdx].id === 'tea-burn' && (
                        <div className="space-y-2 text-xs font-bold text-slate-600 leading-relaxed">
                          <div className="flex items-start gap-2">
                            <span className="text-emerald-500 text-sm">🚰</span>
                            <div>
                              <p className="text-slate-800">Cool water stops heat from going deeper into the skin.</p>
                              <p className="text-slate-400 font-medium">ठंडा पानी त्वचा में गहराई तक जलन को जाने से रोकता है।</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-emerald-500 text-sm">🌱</span>
                            <div>
                              <p className="text-slate-800">Aloe vera cools the skin and reduces redness & pain.</p>
                              <p className="text-slate-400 font-medium">एलोवेरा त्वचा को ठंडक देता है और दर्द कम करता है।</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-emerald-500 text-sm">🧣</span>
                            <div>
                              <p className="text-slate-800">Loose gauze shields the skin from friction and dust.</p>
                              <p className="text-slate-400 font-medium">ढीली पट्टी त्वचा को रगड़ और बाहरी धूल से बचाती है।</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {firstAidScenarios[currentScenarioIdx].id === 'bee-sting' && (
                        <div className="space-y-2 text-xs font-bold text-slate-600 leading-relaxed">
                          <div className="flex items-start gap-2">
                            <span className="text-emerald-500 text-sm">✂️</span>
                            <div>
                              <p className="text-slate-800">Tweezers scrape the stinger out gently without squeezing venom.</p>
                              <p className="text-slate-400 font-medium">चिमटी बिना ज़हर फैलाए डंक को धीरे से बाहर निकालती है।</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-emerald-500 text-sm">❄️</span>
                            <div>
                              <p className="text-slate-800">Ice packs numb pain and reduce swelling immediately.</p>
                              <p className="text-slate-400 font-medium">बर्फ का पैक दर्द को शांत करता है और तुरंत सूजन घटाता है।</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-emerald-500 text-sm">🧪</span>
                            <div>
                              <p className="text-slate-800">Antihistamine cream blocks allergy, stopping redness & itch.</p>
                              <p className="text-slate-400 font-medium">एंटीहिस्टामाइन क्रीम एलर्जी को रोक खुजली शांत करती है।</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {firstAidScenarios[currentScenarioIdx].id === 'dog-bite' && (
                        <div className="space-y-2 text-xs font-bold text-slate-650 leading-relaxed">
                          <div className="flex items-start gap-2">
                            <span className="text-emerald-500 text-sm">💧</span>
                            <div>
                              <p className="text-slate-800">Immediately wash stray scratch under running water to clear saliva.</p>
                              <p className="text-slate-400 font-medium">लार साफ करने के लिए खरोंच को तुरंत बहते पानी से धोएं।</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-emerald-500 text-sm">🧴</span>
                            <div>
                              <p className="text-slate-800">Apply antiseptic gel to disinfect the wound from germs.</p>
                              <p className="text-slate-400 font-medium">कीटाणुओं से घाव को कीटाणुमुक्त करने के लिए एंटीसेप्टिक जेल लगाएं।</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-emerald-500 text-sm">🧣</span>
                            <div>
                              <p className="text-slate-800">Cover with sterile gauze and consult a doctor immediately for rabies shots.</p>
                              <p className="text-slate-400 font-medium">साफ पट्टी से ढकें और रेबीज के टीके के लिए तुरंत डॉक्टर से मिलें।</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {firstAidScenarios[currentScenarioIdx].id === 'nose-bleed' && (
                        <div className="space-y-2 text-xs font-bold text-slate-600 leading-relaxed">
                          <div className="flex items-start gap-2">
                            <span className="text-emerald-500 text-sm">🙇</span>
                            <div>
                              <p className="text-slate-800">Tilt head forward, not backward, to prevent blood swallowing.</p>
                              <p className="text-slate-400 font-medium">सिर को आगे झुकाएं, पीछे नहीं, ताकि खून गले में न जा सके।</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-emerald-500 text-sm">🤏</span>
                            <div>
                              <p className="text-slate-800">Pinch the soft nose bridge firmly for 10 minutes and breathe through mouth.</p>
                              <p className="text-slate-400 font-medium">नाक के नरम हिस्से को 10 मिनट तक दबाएं और मुंह से सांस लें।</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-emerald-500 text-sm">❄️</span>
                            <div>
                              <p className="text-slate-800">Place ice packs on forehead/nose bridge to contract blood vessels.</p>
                              <p className="text-slate-400 font-medium">रक्त वाहिकाओं को सिकोड़ने के लिए माथे या नाक पर बर्फ लगाएं।</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {firstAidScenarios[currentScenarioIdx].id === 'ankle-sprain' && (
                        <div className="space-y-2 text-xs font-bold text-slate-600 leading-relaxed">
                          <div className="flex items-start gap-2">
                            <span className="text-emerald-500 text-sm">❄️</span>
                            <div>
                              <p className="text-slate-800">Ice packs numb pain and slow blood flow to reduce initial swelling.</p>
                              <p className="text-slate-400 font-medium">बर्फ का पैक दर्द कम करता है और सूजन को रोकने में मदद करता है।</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-emerald-500 text-sm">🧣</span>
                            <div>
                              <p className="text-slate-800">Apply a support bandage to stabilize the joint and prevent extra movement.</p>
                              <p className="text-slate-400 font-medium">जोड़ को स्थिर करने के लिए संपीड़न पट्टी लपेटें।</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-emerald-500 text-sm">🛌</span>
                            <div>
                              <p className="text-slate-800">Prop the foot on pillows to drain fluid away from the sprain.</p>
                              <p className="text-slate-400 font-medium">तरल पदार्थ को कम करने के लिए पैर को तकिए पर ऊपर रखें।</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {firstAidScenarios[currentScenarioIdx].id === 'finger-splinter' && (
                        <div className="space-y-2 text-xs font-bold text-slate-650 leading-relaxed">
                          <div className="flex items-start gap-2">
                            <span className="text-emerald-500 text-sm">✂️</span>
                            <div>
                              <p className="text-slate-800">Use sterile tweezers to pull splinter out gently in the same angle it entered.</p>
                              <p className="text-slate-400 font-medium">चिमटी से लकड़ी के फांस को धीरे से उसी कोण पर बाहर निकालें।</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-emerald-500 text-sm">💧</span>
                            <div>
                              <p className="text-slate-800">Clean the spot with soap & water to avoid trapping dirt in the puncture.</p>
                              <p className="text-slate-400 font-medium">छिद्र में गंदगी रुकने से बचाने के लिए साबुन और पानी से साफ करें।</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-emerald-500 text-sm">🩹</span>
                            <div>
                              <p className="text-slate-800">Apply a band-aid to keep the tiny wound protected from outdoor dust.</p>
                              <p className="text-slate-400 font-medium">बारीक घाव को धूल से सुरक्षित रखने के लिए बैंड-एड लगाएं।</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                {Object.keys(curedPatients).length === 7 ? (
                  <button
                    onClick={resetFirstAidGame}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md active:scale-95 animate-pulse"
                  >
                    Reset & Practice Again / पुनरभ्यास करें 🔄
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowFirstAidCertificate(false);
                      nextFirstAidScenario();
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md active:scale-95"
                  >
                    Treat Next Patient / अगला मरीज 👤
                  </button>
                )}
                <button
                  onClick={() => setShowFirstAidCertificate(false)}
                  className="w-full sm:w-auto px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-655 text-slate-600 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
                >
                  Close / बंद करें ✖
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FirstAidLab;
