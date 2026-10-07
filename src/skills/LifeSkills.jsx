import React, { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Clock,
  Brain, Lightbulb, CheckCircle2, Trophy,
  XCircle, Target, Heart,
  ChefHat, Wallet, Shield, MessageCircle, Wrench,
  Droplets, Sparkles, Coins, HeartPulse, Utensils, Monitor, Smile, Home,
  RefreshCw, CreditCard, AlertCircle, Eye
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AtmLab from './labs/AtmLab';
import TrafficLab from './labs/TrafficLab';
import CashierLab from './labs/CashierLab';
import FirstAidLab from './labs/FirstAidLab';

const getQuizQuestions = (t) => [
  { question: t("lifeskills.q1", { defaultValue: "What is the first thing you should do when you get a small cut?" }), options: [t("lifeskills.q1_o1", { defaultValue: "Put a bandage on it immediately" }), t("lifeskills.q1_o2", { defaultValue: "Wash it with clean water and soap" }), t("lifeskills.q1_o3", { defaultValue: "Ignore it" }), t("lifeskills.q1_o4", { defaultValue: "Blow on it" })], correct: 1 },
  { question: t("lifeskills.q2", { defaultValue: "Why is it important to create a budget?" }), options: [t("lifeskills.q2_o1", { defaultValue: "To buy everything you want" }), t("lifeskills.q2_o2", { defaultValue: "To track income and expenses" }), t("lifeskills.q2_o3", { defaultValue: "To show off your money" }), t("lifeskills.q2_o4", { defaultValue: "To stop spending completely" })], correct: 1 },
  { question: t("lifeskills.q3", { defaultValue: "What is a healthy way to manage stress?" }), options: [t("lifeskills.q3_o1", { defaultValue: "Yelling at someone" }), t("lifeskills.q3_o2", { defaultValue: "Taking deep breaths or talking to a friend" }), t("lifeskills.q3_o3", { defaultValue: "Eating lots of junk food" }), t("lifeskills.q3_o4", { defaultValue: "Sleeping all day" })], correct: 1 },
  { question: t("lifeskills.q4", { defaultValue: "When boiling water on a stove, you should:" }), options: [t("lifeskills.q4_o1", { defaultValue: "Leave it unattended" }), t("lifeskills.q4_o2", { defaultValue: "Turn the handles inward" }), t("lifeskills.q4_o3", { defaultValue: "Touch the pot to see if it's hot" }), t("lifeskills.q4_o4", { defaultValue: "Put your face over it" })], correct: 1 },
  { question: t("lifeskills.q5", { defaultValue: "What does a balanced diet mean?" }), options: [t("lifeskills.q5_o1", { defaultValue: "Only eating vegetables" }), t("lifeskills.q5_o2", { defaultValue: "Eating from all food groups" }), t("lifeskills.q5_o3", { defaultValue: "Eating equal amounts of pizza and burgers" }), t("lifeskills.q5_o4", { defaultValue: "Skipping meals" })], correct: 1 },
];
const optionLabels = ['A', 'B', 'C', 'D'];

const QuizComponent = () => {
  const { t, i18n } = useTranslation();
  const quizQuestions = useMemo(() => getQuizQuestions(t), [t]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === quizQuestions[currentQ].correct) setScore(prev => prev + 10);
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
      ? 'bg-teal-50 border-teal-500 text-teal-700'
      : 'bg-white border-slate-200 text-slate-700 hover:border-teal-300 hover:bg-teal-50/50';
    if (idx === quizQuestions[currentQ].correct) return 'bg-green-50 border-green-500 text-green-700';
    if (idx === selectedOption) return 'bg-rose-50 border-rose-500 text-rose-700';
    return 'bg-slate-50 border-slate-100 text-slate-400';
  };

  const getLabelBg = (idx) => {
    if (!isAnswered) return selectedOption === idx ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-500';
    if (idx === quizQuestions[currentQ].correct) return 'bg-green-500 text-white';
    if (idx === selectedOption) return 'bg-rose-500 text-white';
    return 'bg-slate-200 text-slate-400';
  };

  const q = quizQuestions[currentQ];
  const progress = ((currentQ + (isAnswered ? 1 : 0)) / quizQuestions.length) * 100;

  return (
    <div className="w-full flex justify-center py-8 relative rounded-2xl overflow-hidden border border-slate-100">
      <div className="absolute inset-0 z-0">
        <img loading="lazy" decoding="async" src="/images/life skill/bg.webp" alt="Quiz Background" className="w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-teal-900/10 backdrop-blur-[2px]" />
      </div>

      <div className="w-full max-w-[450px] shrink-0 transition-all duration-300 relative z-10 px-4">
        <AnimatePresence mode="wait">
          {!showResult && (
            <motion.div key="active-quiz" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full">
              <div className="bg-white/80 backdrop-blur-md rounded-xl p-5 sm:p-6 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.08)]">

                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2 flex-row text-left">
                    <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center shadow-inner">
                      <Brain size={16} />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">Question {currentQ + 1}/{quizQuestions.length}</h3>
                      <p className="text-[10px] font-bold text-slate-400">{t("lifeskills.lifeSkillsTest", { defaultValue: "Life Skills Test" })}</p>
                    </div>
                  </div>
                  <div className="bg-slate-50/80 px-3 py-1.5 rounded-lg border border-slate-200/60 text-center">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">{t("lifeskills.score", { defaultValue: "Score" })}</span>
                    <span className="text-sm font-black text-teal-600 leading-none">{score}</span>
                  </div>
                </div>

                <div className="w-full h-1 bg-slate-100 rounded-full mb-5 overflow-hidden">
                  <motion.div animate={{ width: `${progress}%` }} className="h-full bg-teal-500 rounded-full" />
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
                      {selectedOption === q.correct ? t('lifeskills.correct', { defaultValue: 'Correct!' }) : selectedOption === null ? t('lifeskills.timeIsUp', { defaultValue: 'Time is up!' }) : t('lifeskills.wrongAnswer', { defaultValue: '❌ Wrong answer' })}
                    </span>
                  ) : <div />}

                  {isAnswered && (
                    <button onClick={handleNext}
                      className="flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-full text-xs font-bold transition-all shadow-md shadow-teal-200 active:scale-95 cursor-pointer"
                    >
                      {currentQ < quizQuestions.length - 1 ? t('lifeskills.next', { defaultValue: 'Next' }) : t('lifeskills.results', { defaultValue: 'Results' })} <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {showResult && (
            <motion.div key="quiz-results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full">
              <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 sm:p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] text-center">
                <div className="w-16 h-16 bg-teal-50 text-teal-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <Trophy size={32} />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">{t("lifeskills.challengeCompleted", { defaultValue: "Challenge Completed!" })}</h2>
                <p className="text-xs text-slate-500 mb-6 font-medium">{t("lifeskills.challengeCompletedDesc", { defaultValue: "You've successfully finished the Life Skills Challenge." })}</p>

                <div className="bg-slate-50/80 rounded-[16px] p-5 mb-6 border border-slate-200/60 inline-block min-w-[180px]">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">{t("lifeskills.totalScore", { defaultValue: "Total Score" })}</span>
                  <span className="text-3xl font-black text-teal-600">{score}</span>
                  <span className="text-[10px] font-bold text-slate-400 block mt-1">out of {quizQuestions.length * 10}</span>
                </div>

                <div className="flex justify-center">
                  <button onClick={handleRestart} className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-full text-xs font-bold transition-all shadow-md shadow-teal-200 active:scale-95 cursor-pointer">
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

const skillStepsData = {
  1: [
    {
      title: "Wash Vegetables & Prepare Ingredients / सब्जियां धोएं और सामग्री तैयार करें",
      desc: "Always wash fresh vegetables under clean running water. Chop them safely on a cutting board using a small knife. / ताजी सब्जियों को साफ बहते पानी में धोएं। एक छोटे चाकू का उपयोग करके उन्हें कटिंग बोर्ड पर सुरक्षित रूप से काटें।",
      image: "/images/life skill/cooking_step1.webp"
    },
    {
      title: "Light the Stove Safely / सावधानी से गैस चूल्हा जलाएं",
      desc: "Turn on the gas knob and use a lighter to ignite the burner. Keep your face and loose clothing away from the flame. / गैस का नॉब घुमाएं और बर्नर को जलाने के लिए लाइटर का उपयोग करें। अपने चेहरे और ढीले कपड़ों को आंच से दूर रखें।",
      image: "/images/life skill/cooking_step2.webp"
    },
    {
      title: "Stir and Simmer / चलाएं और धीमी आंच पर पकाएं",
      desc: "Use a wooden spatula to stir. Never leave the stove unattended while cooking. Turn off the burner immediately when done. / चलाने के लिए लकड़ी के स्पैटुला का उपयोग करें। खाना बनाते समय चूल्हे को कभी भी अकेला न छोड़ें। काम पूरा होने पर तुरंत बर्नर बंद कर दें।",
      image: "/images/life skill/cooking_step3.webp"
    }
  ],
  2: [
    {
      title: "Track Your Income / अपनी आय ट्रैक करें",
      desc: "Record how much money you receive (allowance, pocket money, or earnings). / आपको मिलने वाले कुल पैसे (भत्ता, जेब खर्च या कमाई) को रिकॉर्ड करें।",
      image: "/images/life skill/bg.webp"
    },
    {
      title: "Identify Needs vs. Wants / जरूरतें बनाम इच्छाएं पहचानें",
      desc: "Needs are essential (food, books, rent). Wants are optional (toys, candies, video games). Prioritize needs first. / जरूरतें आवश्यक हैं (भोजन, किताबें, किराया)। इच्छाएं वैकल्पिक हैं (खिलौने, कैंडी, वीडियो गेम)। पहले जरूरतों को प्राथमिकता दें।",
      image: "/images/life skill/bg.webp"
    },
    {
      title: "Save First, Spend Later / पहले बचत करें, बाद में खर्च करें",
      desc: "Set aside at least 10-20% of your money in a savings box or bank account before spending the rest. / बाकी खर्च करने से पहले अपने पैसों का कम से कम 10-20% गुल्लक या बैंक खाते में अलग रख दें।",
      image: "/images/life skill/bg.webp"
    }
  ],
  3: [
    {
      title: "Inspect the ATM Machine / एटीएम मशीन की जांच करें",
      desc: "Check the card reader slot for any extra attachments (skimmers). Look around to ensure no strangers are close. / कार्ड रीडर स्लॉट में किसी भी अतिरिक्त अटैचमेंट (स्किमर) की जांच करें। यह सुनिश्चित करने के लिए चारों ओर देखें कि कोई अजनबी पास न हो।",
      image: "/images/life skill/atm_step1.webp"
    },
    {
      title: "Shield the Keypad / कीपैड को ढकें",
      desc: "When entering your 4-digit PIN, cover the keypad with your free hand so no camera or person can see it. / अपना 4-अंकीय पिन दर्ज करते समय, कीपैड को अपने दूसरे हाथ से ढकें ताकि कोई कैमरा या व्यक्ति इसे न देख सके।",
      image: "/images/life skill/atm_step2.webp"
    },
    {
      title: "Collect Cash and Reset / नकद लें और रीसेट करें",
      desc: "Take your debit card and cash. Wait for the ATM screen to show the green 'Welcome' screen before leaving. / अपना डेबिट कार्ड और नकद लें। जाने से पहले एटीएम स्क्रीन पर हरे रंग की 'वेलकम' स्क्रीन दिखने का इंतजार करें।",
      image: "/images/life skill/atm_step3.webp"
    }
  ],
  4: [
    {
      title: "Stop at the Sidewalk / फुटपाथ पर रुकें",
      desc: "Never run straight onto the road. Stop and stand safely behind the curb. / कभी भी सीधे सड़क पर न भागें। रुकें और फुटपाथ के किनारे के पीछे सुरक्षित रूप से खड़े रहें।",
      image: "/images/life skill/road_step1.webp"
    },
    {
      title: "Look Right, Left, and Right / दाएं, बाएं और फिर दाएं देखें",
      desc: "Look Right, then Left, then Right again to ensure no speeding vehicles are approaching. / यह सुनिश्चित करने के लिए कि कोई तेज गति वाला वाहन न आ रहा हो, दाएं, फिर बाएं, फिर दोबारा दाएं देखें।",
      image: "/images/life skill/road_step2.webp"
    },
    {
      title: "Cross on Zebra Crossing / जेब्रा क्रॉसिंग पर पार करें",
      desc: "Wait for the pedestrian signal to turn green or for vehicles to stop completely before crossing smoothly. / सुचारू रूप से पार करने से पहले पैदल यात्री सिग्नल के हरे होने या वाहनों के पूरी तरह से रुकने का इंतजार करें।",
      image: "/images/life skill/road_safety_step.webp"
    }
  ],
  5: [
    {
      title: "Wash the Wound / घाव को धोएं",
      desc: "Clean the scraped skin under clean water using mild soap to remove dirt and bacteria. / गंदगी और बैक्टीरिया को हटाने के लिए हल्के साबुन का उपयोग करके साफ पानी से छिल गई त्वचा को साफ करें।",
      image: "/images/life skill/first_aid_step.webp"
    },
    {
      title: "Apply Antiseptic / एंटीसेप्टिक लगाएं",
      desc: "Gently apply antiseptic cream or ointment over the clean wound to prevent infection. / संक्रमण को रोकने के लिए साफ घाव पर धीरे से एंटीसेप्टिक क्रीम या मलहम लगाएं।",
      image: "/images/life skill/first_aid_step.webp"
    },
    {
      title: "Cover with Bandage / पट्टी से ढकें",
      desc: "Place a sterile adhesive band-aid or gauze over the wound to keep it protected from dust and germs. / धूल और कीटाणुओं से बचाने के लिए घाव पर एक साफ चिपकने वाली पट्टी (बैंड-एड) या धुंध लगाएं।",
      image: "/images/life skill/first_aid_step.webp"
    }
  ],
  6: [
    {
      title: "Create a Task List / कार्यों की सूची बनाएं",
      desc: "Write down everything you need to accomplish today. / आज आपको जो कुछ भी पूरा करना है उसे लिख लें।",
      image: "/images/life skill/bg.webp"
    },
    {
      title: "Prioritize Tasks / कार्यों को प्राथमिकता दें",
      desc: "Mark the most important and urgent tasks and focus on them first. / सबसे महत्वपूर्ण और आवश्यक कार्यों को चिह्नित करें और पहले उन पर ध्यान केंद्रित करें।",
      image: "/images/life skill/bg.webp"
    },
    {
      title: "Take Focused Breaks (Pomodoro) / ध्यान केंद्रित अंतराल लें",
      desc: "Work for 25 minutes, then take a short 5-minute break to refresh your mind. / 25 मिनट काम करें, फिर अपने दिमाग को तरोताजा करने के लिए 5 मिनट का छोटा अंतराल लें।",
      image: "/images/life skill/bg.webp"
    }
  ],
  7: [
    {
      title: "Maintain Eye Contact / नजरें मिलाकर बात करें",
      desc: "Look at the person who is speaking to show that you are paying attention. / यह दिखाने के लिए कि आप ध्यान दे रहे हैं, बात करने वाले व्यक्ति की ओर देखें।",
      image: "/images/life skill/bg.webp"
    },
    {
      title: "Listen Actively / सक्रिय रूप से सुनें",
      desc: "Listen to the words without interrupting. Try to understand their message fully. / बिना टोके शब्दों को सुनें। उनके संदेश को पूरी तरह से समझने की कोशिश करें।",
      image: "/images/life skill/bg.webp"
    },
    {
      title: "Respond Respectfully / सम्मानपूर्वक प्रतिक्रिया दें",
      desc: "Speak clearly and calmly. Use polite words to express your ideas. / स्पष्ट and शांति से बोलें। अपने विचारों को व्यक्त करने के लिए विनम्र शब्दों का प्रयोग करें।",
      image: "/images/life skill/bg.webp"
    }
  ],
  8: [
    {
      title: "Gather the Tools / उपकरण इकट्ठा करें",
      desc: "Choose the correct screwdriver, wrench, or tape required for the specific repair. / विशिष्ट मरम्मत के लिए आवश्यक सही पेचकश (स्क्रूड्राइवर), रिंच या टेप का चयन करें।",
      image: "/images/life skill/bg.webp"
    },
    {
      title: "Turn Off Power/Water / बिजली/पानी बंद करें",
      desc: "If changing a bulb or fixing a tap, turn off the main switch or valve first for safety. / यदि कोई बल्ब बदल रहे हैं या नल ठीक कर रहे हैं, तो सुरक्षा के लिए सबसे पहले मुख्य स्विच या वाल्व बंद करें।",
      image: "/images/life skill/bg.webp"
    },
    {
      title: "Tighten and Secure / कसें और सुरक्षित करें",
      desc: "Tighten screws or bolts in clockwise direction and double-check stability before testing. / स्क्रू या बोल्ट को घड़ी की दिशा (क्लॉकवाइज) में कसें और परीक्षण करने से पहले स्थिरता की दोबारा जांच करें।",
      image: "/images/life skill/bg.webp"
    }
  ],
  9: [
    {
      title: "Create Strong Passwords / मजबूत पासवर्ड बनाएं",
      desc: "Use a mix of letters, numbers, and symbols. Never share your password with anyone. / अक्षरों, संख्याओं और प्रतीकों के मिश्रण का उपयोग करें। अपना पासवर्ड कभी किसी के साथ साझा न करें।",
      image: "/images/life skill/bg.webp"
    },
    {
      title: "Verify the Sender / प्रेषक की पुष्टि करें",
      desc: "Before clicking links or downloading files, check if the email or message sender is trusted. / लिंक पर क्लिक करने या फाइलें डाउनलोड करने से पहले, जांच लें कि ईमेल या संदेश भेजने वाला विश्वसनीय है या नहीं।",
      image: "/images/life skill/bg.webp"
    },
    {
      title: "Log Out Safely / सुरक्षित रूप से लॉग आउट करें",
      desc: "Always log out of your accounts when using shared devices in public spaces or school labs. / सार्वजनिक स्थानों या स्कूल लैब में साझा उपकरणों का उपयोग करते समय हमेशा अपने खातों से लॉग आउट करें।",
      image: "/images/life skill/bg.webp"
    }
  ],
  10: [
    {
      title: "Recognize Your Emotion / अपनी भावना को पहचानें",
      desc: "Take a moment to notice if you feel angry, sad, anxious, or excited. / यह ध्यान देने के लिए एक क्षण लें कि क्या आप गुस्से में हैं, उदास हैं, चिंतित हैं, या उत्साहित हैं।",
      image: "/images/life skill/bg.webp"
    },
    {
      title: "Breathe and Pause / सांस लें और रुकें",
      desc: "Inhale deeply for 4 seconds, hold, and exhale slowly before reacting or responding. / प्रतिक्रिया देने या उत्तर देने से पहले 4 सेकंड के लिए गहरी सांस लें, रोकें और धीरे-धीरे छोड़ें।",
      image: "/images/life skill/bg.webp"
    },
    {
      title: "Practice Empathy / सहानुभूति का अभ्यास करें",
      desc: "Think about the other person's situation and feelings. Ask yourself why they are reacting this way. / दूसरे व्यक्ति की स्थिति और भावनाओं के बारे में सोचें। खुद से पूछें कि वे इस तरह क्यों प्रतिक्रिया दे रहे हैं।",
      image: "/images/life skill/bg.webp"
    }
  ]
};

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

const StepIllustration = ({ skillId, stepIndex, skillTitle }) => {
  const { t } = useTranslation();
  // If the skill has a pre-existing PNG image, we return that
  const imageMap = {
    1: { // Cooking
      0: "/images/life skill/cooking_step1.webp",
      1: "/images/life skill/cooking_step2.webp",
      2: "/images/life skill/cooking_step3.webp"
    },
    3: { // ATM Security
      0: "/images/life skill/atm_step1.webp",
      1: "/images/life skill/atm_step2.webp",
      2: "/images/life skill/atm_step3.webp"
    },
    4: { // Road Safety
      0: "/images/life skill/road_step1.webp",
      1: "/images/life skill/road_step2.webp",
      2: "/images/life skill/road_safety_step.webp"
    },
    5: { // First Aid
      0: "/images/life skill/first_aid_step.webp",
      1: "/images/life skill/first_aid_step.webp",
      2: "/images/life skill/first_aid_step.webp"
    }
  };

  if (imageMap[skillId] && imageMap[skillId][stepIndex]) {
    return (
      <img loading="lazy" decoding="async"
        src={imageMap[skillId][stepIndex]}
        alt={`${skillTitle} - Step ${stepIndex + 1}`}
        className="w-full h-full object-contain p-5 md:p-8"
      />
    );
  }

  // Otherwise, we render a highly premium custom educational SVG/CSS graphics panel:
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none">
      {skillId === 2 && ( // Money Management
        <div className="w-full max-w-[280px] bg-white rounded-2xl border border-slate-150 p-5 shadow-sm space-y-4">
          {stepIndex === 0 && ( // Track Income
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3 bg-teal-50/50 p-2 rounded-xl border border-teal-100/50">
                <BoyAvatarSVG expression="smile" className="w-9 h-9 shrink-0" />
                <div>
                  <div className="text-[10px] font-black text-teal-800">{t("lifeskills.pocketMoneyIncome", { defaultValue: "Pocket Money (Income)" })}</div>
                  <div className="text-xs font-black text-teal-600">+₹500</div>
                </div>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg text-slate-500">
                <span className="text-[10px] font-bold">📚 {t("lifeskills.buyBooks", { defaultValue: "Buy Books" })}</span>
                <span className="text-[10px] font-bold">-₹150</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg text-slate-500">
                <span className="text-[10px] font-bold">🍿 {t("lifeskills.snacks", { defaultValue: "Snacks" })}</span>
                <span className="text-[10px] font-bold">-₹50</span>
              </div>
              <div className="h-px bg-slate-100" />
              <div className="flex justify-between items-center pt-1">
                <span className="text-xs font-bold text-slate-705">{t("lifeskills.remainingBalance", { defaultValue: "Remaining Balance" })}</span>
                <span className="text-xs font-black text-slate-800">₹300</span>
              </div>
            </div>
          )}
          {stepIndex === 1 && ( // Needs vs Wants
            <div className="space-y-3">
              <div className="flex justify-center">
                <GirlAvatarSVG expression="smile" className="w-12 h-12" />
              </div>
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="bg-teal-50/50 p-2.5 rounded-xl border border-teal-100/50">
                  <span className="text-[9px] font-black text-teal-800 uppercase tracking-wider block mb-1">{t("lifeskills.needsHeader", { defaultValue: "Needs" })}</span>
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold text-slate-700">📚 {t("lifeskills.textBooks", { defaultValue: "Text Books" })}</div>
                    <div className="text-[10px] font-bold text-slate-700">🍎 {t("lifeskills.healthyFood", { defaultValue: "Healthy Food" })}</div>
                  </div>
                </div>
                <div className="bg-amber-50/50 p-2.5 rounded-xl border border-amber-100/50">
                  <span className="text-[9px] font-black text-amber-800 uppercase tracking-wider block mb-1">{t("lifeskills.wantsHeader", { defaultValue: "Wants" })}</span>
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold text-slate-650">🎮 {t("lifeskills.videoGames", { defaultValue: "Video Games" })}</div>
                    <div className="text-[10px] font-bold text-slate-650">🍬 {t("lifeskills.sweets", { defaultValue: "Sweets" })}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {stepIndex === 2 && ( // Save First
            <div className="space-y-3">
              <div className="relative w-16 h-16 mx-auto">
                <BoyAvatarSVG expression="smile" className="w-16 h-16" />
                <div className="absolute -top-1.5 -right-1.5 bg-teal-500 text-white rounded-full p-1 shadow-md animate-bounce">
                  <Coins size={12} />
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-black text-slate-805">{t("lifeskills.savingsTarget", { defaultValue: "Savings Target (20%)" })}</div>
                <div className="text-base font-black text-teal-600">{t("lifeskills.savedFirst", { defaultValue: "₹100 Saved First!" })}</div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-teal-500 h-full w-[80%] rounded-full" />
              </div>
            </div>
          )}
        </div>
      )}

      {skillId === 5 && ( // First Aid (Fallback / Safeguard)
        <div className="w-full max-w-[280px] bg-white rounded-2xl border border-slate-150 p-5 shadow-sm space-y-4">
          <div className="flex justify-center">
            <BoyAvatarSVG expression="smile" className="w-12 h-12" />
          </div>
          {stepIndex === 0 && (
            <div className="space-y-2">
              <div className="text-xs font-black text-slate-805">{t("lifeskills.washCleanWater", { defaultValue: "Wash under clean water" })}</div>
              <p className="text-[10px] font-semibold text-slate-500">{t("lifeskills.washCleanWaterDesc", { defaultValue: "Run clean water gently over the scrape." })}</p>
            </div>
          )}
          {stepIndex === 1 && (
            <div className="space-y-2">
              <div className="text-xs font-black text-slate-805">{t("lifeskills.applyAntisepticCream", { defaultValue: "Apply Antiseptic Cream" })}</div>
              <p className="text-[10px] font-semibold text-slate-500">{t("lifeskills.applyAntisepticCreamDesc", { defaultValue: "Squeeze a small pea-sized drop on the cut." })}</p>
            </div>
          )}
          {stepIndex === 2 && (
            <div className="space-y-2">
              <div className="text-xs font-black text-slate-805">{t("lifeskills.coverWithBandage", { defaultValue: "Cover with Bandage" })}</div>
              <p className="text-[10px] font-semibold text-slate-500">{t("lifeskills.coverWithBandageDesc", { defaultValue: "Wrap with sterile band-aid to keep germs away." })}</p>
            </div>
          )}
        </div>
      )}

      {skillId === 6 && ( // Time Management
        <div className="w-full max-w-[280px] bg-white rounded-2xl border border-slate-150 p-5 shadow-sm space-y-4">
          {stepIndex === 0 && ( // Task List
            <div className="space-y-3">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                <GirlAvatarSVG expression="smile" className="w-9 h-9 shrink-0" />
                <div className="text-xs font-black text-slate-805">{t("lifeskills.dailyPlanner", { defaultValue: "Daily Planner" })}</div>
              </div>
              <div className="space-y-1.5 text-left">
                <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-lg">
                  <input type="checkbox" checked readOnly className="rounded text-teal-600 focus:ring-teal-500 w-3 h-3" />
                  <span className="text-[10px] font-bold text-slate-500 line-through">{t("lifeskills.mathHomework", { defaultValue: "Math Homework" })}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-lg">
                  <input type="checkbox" checked readOnly className="rounded text-teal-600 focus:ring-teal-500 w-3 h-3" />
                  <span className="text-[10px] font-bold text-slate-500 line-through">{t("lifeskills.readChapter2", { defaultValue: "Read Chapter 2" })}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-lg">
                  <input type="checkbox" disabled className="rounded text-teal-600 focus:ring-teal-500 w-3 h-3" />
                  <span className="text-[10px] font-bold text-slate-800">{t("lifeskills.drawArtProject", { defaultValue: "Draw Art Project" })}</span>
                </div>
              </div>
            </div>
          )}
          {stepIndex === 1 && ( // Prioritize
            <div className="space-y-3">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                <BoyAvatarSVG expression="neutral" className="w-9 h-9 shrink-0" />
                <div className="text-xs font-black text-slate-805">{t("lifeskills.importantVsUrgent", { defaultValue: "Important vs Urgent" })}</div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-left">
                <div className="bg-red-50 p-2 rounded-lg border border-red-100">
                  <div className="text-[8px] font-black text-red-800 uppercase">{t("lifeskills.doNow", { defaultValue: "Do Now" })}</div>
                  <div className="text-[10px] font-black text-red-600 mt-0.5">{t("lifeskills.examPrep", { defaultValue: "Exam Prep ✍️" })}</div>
                </div>
                <div className="bg-blue-50 p-2 rounded-lg border border-blue-100">
                  <div className="text-[8px] font-black text-blue-800 uppercase">{t("lifeskills.planLater", { defaultValue: "Plan later" })}</div>
                  <div className="text-[10px] font-black text-blue-600 mt-0.5">{t("lifeskills.exerciseTask", { defaultValue: "Exercise 🏃‍♂️" })}</div>
                </div>
              </div>
            </div>
          )}
          {stepIndex === 2 && ( // Pomodoro
            <div className="space-y-3">
              <div className="relative w-16 h-16 mx-auto">
                <GirlAvatarSVG expression="closed" className="w-16 h-16" />
                <div className="absolute -top-1 -right-1 bg-red-50 text-red-500 border border-red-200 rounded-full p-0.5 animate-spin" style={{ animationDuration: '8s' }}>
                  <Clock size={14} />
                </div>
              </div>
              <div>
                <div className="text-xs font-black text-slate-805">{t("lifeskills.pomodoroTimer", { defaultValue: "Pomodoro Focus Timer" })}</div>
                <div className="text-lg font-black text-red-500 mt-0.5">25:00</div>
              </div>
              <p className="text-[9px] font-semibold text-slate-400">{t("lifeskills.deepStudyDesc", { defaultValue: "Deep study for 25 mins without distraction!" })}</p>
            </div>
          )}
        </div>
      )}

      {skillId === 7 && ( // Effective Comm.
        <div className="w-full max-w-[280px] bg-white rounded-2xl border border-slate-150 p-5 shadow-sm space-y-4">
          {stepIndex === 0 && ( // Eye contact
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-4">
                <BoyAvatarSVG expression="smile" className="w-12 h-12" />
                <span className="text-lg animate-pulse">💬</span>
                <GirlAvatarSVG expression="smile" className="w-12 h-12" />
              </div>
              <div className="text-xs font-black text-slate-850">{t("lifeskills.keepEyeContact", { defaultValue: "Keep Eye Contact" })}</div>
              <p className="text-[10px] font-semibold text-slate-500">{t("lifeskills.keepEyeContactDesc", { defaultValue: "Look at the other person politely and nod to show you are paying attention." })}</p>
            </div>
          )}
          {stepIndex === 1 && ( // Active listening
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <BoyAvatarSVG expression="closed" className="w-12 h-12 shrink-0" />
                <div className="space-y-1.5 text-left flex-1">
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-150 text-[10px] font-bold text-slate-500">
                    {t("lifeskills.chatBubble1", { defaultValue: '"I felt sad when the test was postponed."' })}
                  </div>
                  <div className="bg-teal-50 p-2 rounded-xl border border-teal-100 text-[10px] font-black text-teal-800">
                    {t("lifeskills.chatBubble2", { defaultValue: '"I understand. You worked hard for it."' })}
                  </div>
                </div>
              </div>
            </div>
          )}
          {stepIndex === 2 && ( // Respectful Response
            <div className="space-y-3">
              <div className="flex justify-center">
                <GirlAvatarSVG expression="smile" className="w-12 h-12" />
              </div>
              <div className="text-xs font-black text-slate-805">{t("lifeskills.usePoliteWords", { defaultValue: "Use Polite Words" })}</div>
              <div className="flex flex-wrap gap-1.5 justify-center">
                <span className="bg-teal-50 border border-teal-100 text-teal-800 text-[9px] font-black px-2.5 py-1 rounded-full">{t("lifeskills.pleaseWord", { defaultValue: "Please" })}</span>
                <span className="bg-blue-50 border border-blue-100 text-blue-800 text-[9px] font-black px-2.5 py-1 rounded-full">{t("lifeskills.thankYouWord", { defaultValue: "Thank you" })}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {skillId === 8 && ( // Basic Home Repair
        <div className="w-full max-w-[280px] bg-white rounded-2xl border border-slate-150 p-5 shadow-sm space-y-4">
          {stepIndex === 0 && ( // Tools
            <div className="space-y-3">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                <BoyAvatarSVG expression="smile" className="w-9 h-9 shrink-0" />
                <div className="text-xs font-black text-slate-805">{t("lifeskills.knowYourTools", { defaultValue: "Know Your Tools" })}</div>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-[9px] font-bold">
                <div className="bg-slate-50 p-1 rounded border border-slate-100">{t("lifeskills.wrenchTool", { defaultValue: "🔧 Wrench" })}</div>
                <div className="bg-slate-50 p-1 rounded border border-slate-100">{t("lifeskills.screwdriverTool", { defaultValue: "🪛 Screwdriver" })}</div>
                <div className="bg-slate-50 p-1 rounded border border-slate-100">{t("lifeskills.tapeTool", { defaultValue: "🩹 Tape" })}</div>
              </div>
            </div>
          )}
          {stepIndex === 1 && ( // Switch off power
            <div className="space-y-3">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                <BoyAvatarSVG expression="surprise" className="w-9 h-9 shrink-0" />
                <div className="text-xs font-black text-red-650">{t("lifeskills.safetyFirst", { defaultValue: "Safety First!" })}</div>
              </div>
              <div className="bg-red-50/60 border border-red-150 p-2 rounded-lg text-slate-505 text-left">
                <div className="text-[9px] font-black text-red-800 uppercase tracking-wider">{t("lifeskills.mainsSwitchBoard", { defaultValue: "Mains Switch Board" })}</div>
              </div>
            </div>
          )}
          {stepIndex === 2 && ( // Tighten
            <div className="space-y-2">
              <div className="text-xs font-black text-slate-805">{t("lifeskills.tightenRule", { defaultValue: "Righty-Tighty, Lefty-Loosey" })}</div>
              <div className="w-14 h-14 border-4 border-dashed border-teal-400 rounded-full flex items-center justify-center mx-auto animate-spin" style={{ animationDuration: '10s' }}>
                <span className="text-lg">⚙️</span>
              </div>
              <p className="text-[9px] font-semibold text-slate-400">{t("lifeskills.tightenRuleDesc", { defaultValue: "Turn clockwise (right) to tighten screws, counter-clockwise (left) to loosen." })}</p>
            </div>
          )}
        </div>
      )}

      {skillId === 9 && ( // Digital Literacy
        <div className="w-full max-w-[280px] bg-white rounded-2xl border border-slate-150 p-5 shadow-sm space-y-4">
          {stepIndex === 0 && ( // Strong Password
            <div className="space-y-2 text-left">
              <div className="text-xs font-black text-slate-850">{t("lifeskills.passwordMeter", { defaultValue: "Password Safety Meter" })}</div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-150 font-mono text-[11px] text-slate-800">
                P@$w0rd#2026
              </div>
              <div className="flex items-center justify-between text-[9px] font-black">
                <span className="text-teal-600">{t("lifeskills.strengthStrong", { defaultValue: "STRENGTH: STRONG" })}</span>
                <span className="text-slate-400">{t("lifeskills.twelveChars", { defaultValue: "12 Chars" })}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-teal-500 h-full w-full rounded-full" />
              </div>
            </div>
          )}
          {stepIndex === 1 && ( // Verify Sender
            <div className="space-y-2 text-left">
              <div className="text-xs font-black text-slate-855">{t("lifeskills.inboxEmailCheck", { defaultValue: "Inbox Email check" })}</div>
              <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-100 flex items-start gap-2">
                <span className="text-base mt-0.5">📧</span>
                <div>
                  <div className="text-[10px] font-black text-amber-800">{t("lifeskills.fakeEmailSubject", { defaultValue: "Urgent: Claim ₹10,000!" })}</div>
                  <div className="text-[8px] font-bold text-slate-400">{t("lifeskills.fakeEmailSender", { defaultValue: "From: win-prize@fake-bank.com" })}</div>
                  <div className="text-[9px] font-black text-red-600 mt-1">{t("lifeskills.doNotClickLinks", { defaultValue: "⚠️ DO NOT CLICK LINKS" })}</div>
                </div>
              </div>
            </div>
          )}
          {stepIndex === 2 && ( // Log Out
            <div className="space-y-3">
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500">
                <Monitor size={26} />
              </div>
              <div className="text-xs font-black text-slate-855 font-sans">{t("lifeskills.publicCompLab", { defaultValue: "Public Computer Lab" })}</div>
              <button className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-[10px] px-4 py-2 rounded-xl transition-all shadow-md">
                {t("lifeskills.logoutOfAccount", { defaultValue: "LOG OUT OF ACCOUNT" })}
              </button>
            </div>
          )}
        </div>
      )}

      {skillId === 10 && ( // Emotional Intel.
        <div className="w-full max-w-[280px] bg-white rounded-2xl border border-slate-150 p-5 shadow-sm space-y-4">
          {stepIndex === 0 && ( // Identify emotion
            <div className="space-y-3">
              <div className="text-xs font-black text-slate-805">{t("lifeskills.identifyMood", { defaultValue: "Identify Your Mood" })}</div>
              <div className="grid grid-cols-4 gap-1.5">
                <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-center text-lg filter grayscale cursor-pointer hover:grayscale-0 hover:border-teal-400 transition-all">😊</div>
                <div className="bg-teal-50 border border-teal-300 p-2.5 rounded-xl text-center text-lg filter-none cursor-pointer">😌</div>
                <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-center text-lg filter grayscale cursor-pointer hover:grayscale-0 hover:border-teal-400 transition-all">😢</div>
                <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-center text-lg filter grayscale cursor-pointer hover:grayscale-0 hover:border-teal-400 transition-all">😠</div>
              </div>
              <div className="text-[10px] font-black text-teal-600">{t("lifeskills.currentMoodCalm", { defaultValue: "CURRENT MOOD: CALM" })}</div>
            </div>
          )}
          {stepIndex === 1 && ( // Breathe
            <div className="space-y-3">
              <div className="w-16 h-16 bg-teal-50 border border-teal-105 rounded-full flex items-center justify-center mx-auto text-teal-650 animate-pulse animate-duration-3000">
                <Heart size={28} />
              </div>
              <div className="text-xs font-black text-slate-805">{t("lifeskills.deepBreathingTitle", { defaultValue: "Deep Breathing" })}</div>
              <div className="text-[10px] font-bold text-slate-400">{t("lifeskills.deepBreathingDesc", { defaultValue: "Inhale for 4s ... Pause ... Exhale for 4s" })}</div>
            </div>
          )}
          {stepIndex === 2 && ( // Empathy
            <div className="space-y-3">
              <div className="w-14 h-14 bg-teal-50 rounded-full flex items-center justify-center mx-auto text-teal-500">
                <Smile size={28} />
              </div>
              <div className="text-xs font-black text-slate-855">{t("lifeskills.walkInTheirShoes", { defaultValue: "Walk in their shoes" })}</div>
              <p className="text-[10px] font-semibold text-slate-500">{t("lifeskills.walkInTheirShoesDesc", { defaultValue: "Try to look at situations from the other person's eyes to build deep respect." })}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const lifeTheme = {
  backButtonHover: 'hover:text-teal-600',
  heroHighlightText: 'text-teal-600',
  
  card1Icon: 'text-teal-600',
  card1Bg: 'bg-teal-50',
  card2Icon: 'text-teal-600',
  card2Bg: 'bg-teal-50',
  card3Icon: 'text-teal-600',
  card3Bg: 'bg-teal-50',
  
  activeBorder: 'border-teal-500 ring-2 ring-teal-500/10 shadow-md',
  inactiveBorder: 'border-slate-50 shadow-[0_4px_20px_rgba(0,0,0,0.06)]',
  activeIconBg: 'bg-teal-600 text-white',
  activeTitleText: 'text-teal-700',
  inactiveTitleHover: 'text-[#1e1b4b] group-hover:text-teal-600',
  activeSubtitleText: 'text-teal-600/80',
  inactiveSubtitleText: 'text-slate-500'
};

const LifeSkills = () => {
  const { t, i18n } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('Learn Skills');
  const [selectedLab, setSelectedLab] = useState('atm'); // 'atm', 'traffic', 'cashier', 'firstaid'
  const [selectedGuideSkill, setSelectedGuideSkill] = useState(null);
  const [currentGuideStep, setCurrentGuideStep] = useState(0);

  const lifeSkillsFlashcards = useMemo(() => [
    { id: 1, title: t('lifeskills.card1_title', { defaultValue: 'Cooking Basics' }), tag: t('lifeskills.tag_Food', { defaultValue: 'Food' }), desc: t('lifeskills.card1_desc', { defaultValue: 'Learn how to make simple, healthy and delicious meals for you and your family.' }), icon: <ChefHat size={20} />, content: t('lifeskills.card1_content', { defaultValue: "Start with simple recipes like boiling eggs, making rice, and preparing a healthy salad. Always wash vegetables before cutting them and never leave a hot stove unattended!" }) },
    { id: 2, title: t('lifeskills.card2_title', { defaultValue: 'Money Management' }), tag: t('lifeskills.tag_Finance', { defaultValue: 'Finance' }), desc: t('lifeskills.card2_desc', { defaultValue: 'Learn how to save money, budget your expenses, and make smart financial decisions.' }), icon: <Wallet size={20} />, content: t('lifeskills.card2_content', { defaultValue: "Budgeting helps you track what you earn and what you spend. Always save a portion of your allowance or income for the future. Wants vs Needs is the core of budgeting." }) },
    { id: 3, title: t('lifeskills.card3_title', { defaultValue: 'ATM Security & Banking' }), tag: t('lifeskills.tag_Finance', { defaultValue: 'Finance' }), desc: t('lifeskills.card3_desc', { defaultValue: 'Master the safety checklist when withdrawing cash from an ATM machine securely.' }), icon: <CreditCard size={20} />, content: t('lifeskills.card3_content', { defaultValue: "Always inspect the card reader slot for skimming devices by wiggling it. Shield the numeric keypad with your free hand while entering your secret PIN. Make sure the ATM screen fully resets before leaving the counter." }) },
    { id: 4, title: t('lifeskills.card4_title', { defaultValue: 'Road Safety & Signals' }), tag: t('lifeskills.tag_Safety', { defaultValue: 'Safety' }), desc: t('lifeskills.card4_desc', { defaultValue: 'Learn crossing rules, traffic signals, and how to stay safe as a pedestrian on roads.' }), icon: <AlertCircle size={20} />, content: t('lifeskills.card4_content', { defaultValue: "Red light means Stop immediately. Yellow light means Get Ready. Green light means Go. Always cross at designated Zebra crossings, and look Left, Right, then Left again before stepping on the road." }) },
    { id: 5, title: t('lifeskills.card5_title', { defaultValue: 'First Aid Essentials' }), tag: t('lifeskills.tag_Safety', { defaultValue: 'Safety' }), desc: t('lifeskills.card5_desc', { defaultValue: 'Basic first aid skills everyone should know for emergencies.' }), icon: <Shield size={20} />, content: t('lifeskills.card5_content', { defaultValue: "Clean a wound with soap and water, apply an antibacterial ointment, and cover it with a bandage. For minor burns, run cool water over it for 10 minutes." }) },
    { id: 6, title: t('lifeskills.card6_title', { defaultValue: 'Time Management' }), tag: t('lifeskills.tag_Productivity', { defaultValue: 'Productivity' }), desc: t('lifeskills.card6_desc', { defaultValue: 'Organize your day, set goals, and stop procrastinating.' }), icon: <Clock size={20} />, content: t('lifeskills.card6_content', { defaultValue: "Create a daily schedule. Prioritize your most important tasks first (eat the frog!) and take short 5-minute breaks every 30 minutes to stay fresh." }) },
    { id: 7, title: t('lifeskills.card7_title', { defaultValue: 'Effective Comm.' }), tag: t('lifeskills.tag_Social', { defaultValue: 'Social' }), desc: t('lifeskills.card7_desc', { defaultValue: 'Learn to express your thoughts clearly and listen to others.' }), icon: <MessageCircle size={20} />, content: t('lifeskills.card7_content', { defaultValue: "Good communication involves 50% speaking and 50% active listening. Maintain eye contact, don't interrupt, and ask questions to show you are engaged." }) },
    { id: 8, title: t('lifeskills.card8_title', { defaultValue: 'Basic Home Repair' }), tag: t('lifeskills.tag_Maintenance', { defaultValue: 'Maintenance' }), desc: t('lifeskills.card8_desc', { defaultValue: 'Fix simple things around the house without calling a professional.' }), icon: <Wrench size={20} />, content: t('lifeskills.card8_content', { defaultValue: "Learn to tighten a loose screw, change a lightbulb safely (always turn off the switch first!), and unclog a sink using a plunger or baking soda and vinegar." }) },
    { id: 9, title: t('lifeskills.card9_title', { defaultValue: 'Digital Literacy' }), tag: t('lifeskills.tag_Technology', { defaultValue: 'Technology' }), desc: t('lifeskills.card9_desc', { defaultValue: 'Understand internet safety and basic computer hygiene.' }), icon: <Monitor size={20} />, content: t('lifeskills.card9_content', { defaultValue: "Never share your passwords with anyone. Always verify the source of emails before clicking any links, and keep your software updated." }) },
    { id: 10, title: t('lifeskills.card10_title', { defaultValue: 'Emotional Intel.' }), tag: t('lifeskills.tag_Mindset', { defaultValue: 'Mindset' }), desc: t('lifeskills.card10_desc', { defaultValue: 'Recognize and manage your own emotions and others.' }), icon: <Smile size={20} />, content: t('lifeskills.card10_content', { defaultValue: "Pause and take a deep breath before reacting to anger. Try to understand things from the other person’s perspective before jumping to conclusions." }) }
  ], [t]);

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
            className="absolute inset-0 w-full h-full bg-white rounded-xl p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col group-hover:border-slate-200 transition-colors"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600 text-xl shadow-inner">
                {skill.icon}
              </div>
            </div>

            <h3 className="text-[15px] font-bold text-slate-900 mb-2 leading-tight">{skill.title}</h3>
            <p className="text-[11px] text-slate-500 font-medium line-clamp-3">{skill.desc}</p>

            <div className="mt-auto pt-4 flex items-center justify-between text-[10px] font-bold text-slate-600">
              <span>{t('lifeskills.tapToFlip', { defaultValue: 'Tap to flip' })}</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl p-5 shadow-[0_8px_30px_rgb(16,185,129,0.3)] flex flex-col text-white"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <h3 className="text-[11px] font-bold mb-2 flex items-center gap-1.5 text-teal-100 uppercase tracking-wider">
              <Lightbulb size={13} /> {t('lifeskills.keyTakeaway', { defaultValue: 'Key Takeaway' })}
            </h3>
            <p className="text-[12px] font-semibold leading-relaxed flex-1 overflow-y-auto text-white mb-2 scrollbar-none pr-1">
              {skill.content}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedGuideSkill(skill);
                setCurrentGuideStep(0);
              }}
              className="w-full py-1.5 bg-white hover:bg-teal-50 text-teal-600 font-extrabold rounded-lg text-[10px] tracking-wide shadow transition-all flex items-center justify-center gap-1 cursor-pointer select-none"
            >
              {t('lifeskills.startGuide', { defaultValue: 'Start Guide ➔' })}
            </button>
            <div className="text-[10px] sm:text-[8px] font-bold text-teal-250 uppercase tracking-widest text-center mt-2 opacity-80">
              {t('lifeskills.tapToFlipBack', { defaultValue: 'Tap anywhere else to flip back' })}
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  const quickStats = [
    { label: 'Learn Skills', displayLabel: t('lifeskills.tabLearnSkills', { defaultValue: 'Learn Skills' }), value: t('lifeskills.valLearnSkills', { defaultValue: 'Step by step' }), icon: <Lightbulb className={lifeTheme.card1Icon} />, color: lifeTheme.card1Bg },
    { label: 'Practical Labs', displayLabel: t('lifeskills.tabPracticalLabs', { defaultValue: 'Practical Labs' }), value: t('lifeskills.valPracticalLabs', { defaultValue: 'Interactive labs' }), icon: <Target className={lifeTheme.card2Icon} />, color: lifeTheme.card2Bg },
    { label: 'Take Challenges', displayLabel: t('lifeskills.tabTakeChallenges', { defaultValue: 'Take Challenges' }), value: t('lifeskills.valTakeChallenges', { defaultValue: 'Test skills' }), icon: <Trophy className={lifeTheme.card3Icon} />, color: lifeTheme.card3Bg },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex font-sans text-slate-900 overflow-x-hidden">

      {/* Main Content */}
      <main className="flex-1 min-w-0 min-h-screen pb-4 overflow-y-auto">
        <div className="px-4 sm:px-6 md:px-12 2xl:px-20 space-y-6 md:space-y-8 pt-4 2xl:max-w-[1600px] 2xl:mx-auto">

          {/* Hero & Stats Section */}
          <div className="relative">
            {/* Hero Section */}
            <section className="bg-white rounded-[16px] md:rounded-[24px] overflow-hidden relative border border-slate-100 flex items-center min-h-[200px] sm:min-h-[260px] md:min-h-[300px] lg:h-[387px] lg:min-h-[387px] pb-4 md:pb-6 lg:pb-0 text-left">
              <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 lg:w-1/2 space-y-3 md:space-y-4">
                <h1 className="text-[24px] sm:text-[28px] md:text-[36px] lg:text-[42px] 2xl:text-[52px] font-extrabold leading-[1.05] tracking-tight text-[#1e293b]">
                  {t('lifeskills.heroTitle1', { defaultValue: 'Learn, Grow &' })} <br /> {t('lifeskills.heroTitle2', { defaultValue: 'Live Better with' })} <br />
                  <span className={lifeTheme.heroHighlightText}>{t('lifeskills.heroTitle3', { defaultValue: 'Life Skills' })}</span>
                </h1>
                <p className="text-slate-500 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-medium leading-relaxed max-w-sm">
                  {t('lifeskills.heroDesc', { defaultValue: 'Practical lessons and daily habits for an independent life.' })}
                </p>

                <div className="pt-2">
                </div>
              </div>

              <div className="hidden lg:block absolute top-0 right-0 w-[55%] h-full">
                <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/10 to-transparent z-10" />
                <img loading="lazy" decoding="async" src="/images/life skill/right.webp" alt="Life Skills" className="w-full h-auto object-contain object-right" />
              </div>
            </section>

            {/* Quick Stats Row — overlapping hero with negative margin */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 relative z-20 -mt-10 px-2 sm:px-6 md:px-8 text-left">
              {quickStats.map((stat, i) => {
                const isActive = activeFilter === stat.label;

                return (
                  <div
                    key={i}
                    onClick={() => {
                      setActiveFilter(stat.label);
                      const target = document.getElementById("content-section");
                      if (target) target.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`bg-white rounded-[16px] p-3 md:p-4 border flex items-center gap-3 md:gap-4 hover:shadow-md transition-shadow cursor-pointer group ${isActive ? lifeTheme.activeBorder : lifeTheme.inactiveBorder}`}
                  >
                    <div className={`w-[44px] h-[44px] rounded-[12px] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform [&>svg]:w-5 [&>svg]:h-5 ${isActive ? lifeTheme.activeIconBg : stat.color}`}>
                      {React.cloneElement(stat.icon, { className: isActive ? 'text-white' : stat.icon.props.className })}
                    </div>
                    <div>
                      <h4 className={`text-[13px] font-bold leading-tight transition-colors ${isActive ? lifeTheme.activeTitleText : lifeTheme.inactiveTitleHover}`}>{stat.displayLabel || stat.label}</h4>
                      <p className={`text-[11px] font-medium mt-0.5 ${isActive ? lifeTheme.activeSubtitleText : lifeTheme.inactiveSubtitleText}`}>{stat.value}</p>
                    </div>
                  </div>
                );
              })}
            </section>
          </div>

          {/* Content Section */}
          <div id="content-section" className="pt-6 px-2 sm:px-6 md:px-12">
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
                          title: t('lifeskills.labAtmTitle', { defaultValue: 'ATM Simulator' }),
                          desc: t('lifeskills.labAtmDesc', { defaultValue: 'Practice withdrawing cash safely.' }),
                          difficulty: 'Medium',
                          icon: <CreditCard />,
                          activeStyle: 'bg-white border-teal-500 ring-1 ring-teal-500 shadow-md text-slate-900 scale-[1.02]',
                          inactiveStyle: 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm text-slate-700 hover:text-slate-900',
                          iconBgActive: 'bg-teal-50 text-teal-600',
                          iconBgInactive: 'bg-slate-50 text-slate-400 group-hover:text-teal-500'
                        },
                        {
                          id: 'traffic',
                          title: t('lifeskills.labTrafficTitle', { defaultValue: 'Road Crossing' }),
                          desc: t('lifeskills.labTrafficDesc', { defaultValue: 'Learn how to read traffic signals.' }),
                          difficulty: 'Easy',
                          icon: <AlertCircle />,
                          activeStyle: 'bg-white border-teal-500 ring-1 ring-teal-500 shadow-md text-slate-900 scale-[1.02]',
                          inactiveStyle: 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm text-slate-700 hover:text-slate-900',
                          iconBgActive: 'bg-teal-50 text-teal-600',
                          iconBgInactive: 'bg-slate-50 text-slate-400 group-hover:text-teal-500'
                        },
                        {
                          id: 'cashier',
                          title: t('lifeskills.labCashierTitle', { defaultValue: 'Cashier Math' }),
                          desc: t('lifeskills.labCashierDesc', { defaultValue: 'Calculate the correct change to give back.' }),
                          difficulty: 'Medium',
                          icon: <Coins />,
                          activeStyle: 'bg-white border-teal-500 ring-1 ring-teal-500 shadow-md text-slate-900 scale-[1.02]',
                          inactiveStyle: 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm text-slate-700 hover:text-slate-900',
                          iconBgActive: 'bg-teal-50 text-teal-600',
                          iconBgInactive: 'bg-slate-50 text-slate-400 group-hover:text-teal-500'
                        },
                        {
                          id: 'firstaid',
                          title: t('lifeskills.labFirstAidTitle', { defaultValue: 'First Aid Basics' }),
                          desc: t('lifeskills.labFirstAidDesc', { defaultValue: 'Learn how to treat minor wounds.' }),
                          difficulty: 'Hard',
                          icon: <HeartPulse />,
                          activeStyle: 'bg-white border-teal-500 ring-1 ring-teal-500 shadow-md text-slate-900 scale-[1.02]',
                          inactiveStyle: 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm text-slate-700 hover:text-slate-900',
                          iconBgActive: 'bg-teal-50 text-teal-600',
                          iconBgInactive: 'bg-slate-50 text-slate-400 group-hover:text-teal-500'
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
                            className={`p-3 md:p-4 rounded-[12px] border transition-all duration-300 cursor-pointer text-left flex items-center gap-3 relative group ${isActive ? lab.activeStyle : lab.inactiveStyle}`}
                          >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-inner shrink-0 transition-colors ${isActive ? lab.iconBgActive : lab.iconBgInactive} [&>svg]:w-5 [&>svg]:h-5`}>
                              {lab.icon}
                            </div>
                            <div className="overflow-hidden">
                              <h3 className="text-[12px] md:text-[13px] font-display font-bold leading-tight mb-0.5 truncate">
                                {lab.title}
                              </h3>
                              <p className="text-[10px] md:text-[11px] opacity-80 leading-snug font-medium font-display truncate">
                                {lab.desc}
                              </p>
                            </div>
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
                        {selectedLab === 'atm' && <AtmLab />}
                        {selectedLab === 'traffic' && <TrafficLab />}
                        {selectedLab === 'cashier' && <CashierLab />}
                        {selectedLab === 'firstaid' && <FirstAidLab />}
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

      {/* Step-by-Step Guide Modal — Wide Side-by-Side Layout */}
      <AnimatePresence>
        {selectedGuideSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelectedGuideSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.93, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.93, y: 24 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[960px] max-h-[92vh] bg-white rounded-3xl border border-slate-100 shadow-[0_24px_64px_rgba(0,0,0,0.18)] overflow-hidden flex flex-col"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-5 md:px-7 py-3.5 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-white shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center shadow-inner">
                    {selectedGuideSkill.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm md:text-base font-black text-slate-800 leading-tight">{selectedGuideSkill.title}</h3>
                    <p className="text-[9px] md:text-[10px] font-bold text-teal-600 uppercase tracking-widest mt-0.5">{t("lifeskills.stepByStepGuide", { defaultValue: "Step-by-Step Guide" })}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedGuideSkill(null)}
                  className="w-8 h-8 rounded-full flex items-center justify-center border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all cursor-pointer"
                >
                  <XCircle size={18} />
                </button>
              </div>

              {/* Main Body — Side by Side */}
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden">

                {/* LEFT: Large Photo Panel */}
                <div className="w-full md:w-[50%] bg-gradient-to-br from-slate-50 to-slate-100/80 flex items-center justify-center relative overflow-hidden shrink-0 min-h-[220px] md:min-h-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${selectedGuideSkill.id}-step-${currentGuideStep}`}
                      initial={{ opacity: 0, x: 60, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -60, scale: 0.95 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <StepIllustration
                        skillId={selectedGuideSkill.id}
                        stepIndex={currentGuideStep}
                        skillTitle={selectedGuideSkill.title}
                      />
                    </motion.div>
                  </AnimatePresence>
                  {/* Step Badge */}
                  <div className="absolute top-4 left-4 bg-slate-900/75 text-white text-[10px] font-black px-3 py-1.5 rounded-full backdrop-blur-sm z-10 shadow-lg">
                    {t("lifeskills.stepIndicator", { defaultValue: "Step {{current}} / {{total}}", current: currentGuideStep + 1, total: skillStepsData[selectedGuideSkill.id]?.length || 3 })}
                  </div>
                  {/* Decorative corner accent */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-teal-500/5 rounded-tl-[60px]" />
                </div>

                {/* RIGHT: Text + Controls Panel */}
                <div className="w-full md:w-[50%] flex flex-col overflow-y-auto md:border-l border-slate-100">
                  <div className="p-5 md:p-7 flex-1 flex flex-col">

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-slate-100 rounded-full mb-5 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentGuideStep + 1) / (skillStepsData[selectedGuideSkill.id]?.length || 3)) * 100}%` }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    </div>

                    {/* Step Number Pill */}
                    <div className="flex items-center gap-2 mb-4">
                      {(skillStepsData[selectedGuideSkill.id] || [1, 2, 3]).map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentGuideStep(idx)}
                          className={`h-7 rounded-full text-[10px] font-black transition-all duration-300 cursor-pointer ${
                            currentGuideStep === idx
                              ? 'bg-teal-600 text-white px-4 shadow-md shadow-teal-200'
                              : 'bg-slate-100 text-slate-400 px-3 hover:bg-slate-200'
                          }`}
                        >
                          {idx + 1}
                        </button>
                      ))}
                    </div>

                    {/* Step Title */}
                    <h4 className="text-lg md:text-xl font-black text-slate-900 leading-snug mb-5">
                      {(i18n.language === "hi" && skillStepsData[selectedGuideSkill.id]?.[currentGuideStep]?.title.split(" / ")[1]) ? skillStepsData[selectedGuideSkill.id]?.[currentGuideStep]?.title.split(" / ")[1] : skillStepsData[selectedGuideSkill.id]?.[currentGuideStep]?.title.split(" / ")[0]}
                    </h4>

                    {/* Description Box */}
                    <div className="p-4 md:p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-3 flex-1">
                      <p className="text-[13px] md:text-sm font-semibold text-slate-700 leading-relaxed">
                        {(i18n.language === "hi" && skillStepsData[selectedGuideSkill.id]?.[currentGuideStep]?.desc.split(" / ")[1]) ? skillStepsData[selectedGuideSkill.id]?.[currentGuideStep]?.desc.split(" / ")[1] : skillStepsData[selectedGuideSkill.id]?.[currentGuideStep]?.desc.split(" / ")[0]}
                      </p>
                    </div>
                  </div>

                  {/* Footer Navigation */}
                  <div className="px-5 md:px-7 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
                    <button
                      onClick={() => setCurrentGuideStep(prev => Math.max(0, prev - 1))}
                      disabled={currentGuideStep === 0}
                      className="px-4 py-2.5 border border-slate-200 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-100 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                    >
                      {t("lifeskills.prevStep", { defaultValue: "← Previous" })}
                    </button>

                    {currentGuideStep < (skillStepsData[selectedGuideSkill.id]?.length || 3) - 1 ? (
                      <button
                        onClick={() => setCurrentGuideStep(prev => prev + 1)}
                        className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs active:scale-95 transition-all shadow-md shadow-teal-200 cursor-pointer"
                      >
                        {t("lifeskills.nextStep", { defaultValue: "Next Step →" })}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setCurrentGuideStep(0);
                          toast.success(`🎉 Congratulations! You have completed the step-by-step tutorial for ${selectedGuideSkill.title}!`);
                          setSelectedGuideSkill(null);
                        }}
                        className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold rounded-xl text-xs active:scale-95 transition-all shadow-lg shadow-teal-200 cursor-pointer"
                      >
                        {t("lifeskills.finishGuide", { defaultValue: "Finish Guide" })} 
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default LifeSkills;
