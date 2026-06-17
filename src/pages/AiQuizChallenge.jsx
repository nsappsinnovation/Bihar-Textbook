import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, Brain, Trophy, CheckCircle2, XCircle 
} from 'lucide-react';

const quizQuestions = [
  { question: "You want to write a superhero story — which AI tool will help you?", options: ["Calculator app", "AI Story Writer", "Paint app", "Camera"], correct: 1 },
  { question: "How does a self-driving car recognize traffic lights?", options: ["The driver tells it", "Computer Vision (AI eyes)", "Using GPS", "By honking"], correct: 1 },
  { question: "When you talk to Google Assistant, which AI technology does it use?", options: ["Computer Vision", "Data Science", "Natural Language Processing (NLP)", "Robotics"], correct: 2 },
  { question: "What do you need to give AI to create a cartoon character?", options: ["Your photo", "A good prompt or description", "Money", "Phone number"], correct: 1 },
  { question: "What can we do with Data Science?", options: ["Cook food", "Predict exam scores", "Sing songs", "Play cricket"], correct: 1 },
  { question: "What is a 'neural network' in Deep Learning?", options: ["Internet network", "Tiny thinking bulbs inside a computer", "WiFi signal", "Electric wire"], correct: 1 },
  { question: "What does a Chatbot do?", options: ["Takes photos", "Answers your questions", "Downloads games", "Makes videos"], correct: 1 },
  { question: "What does an AI Presentation maker do?", options: ["Creates slides automatically", "Prints from a printer", "Sends emails", "Nothing"], correct: 0 },
  { question: "What does AI learn in the Vision Lab?", options: ["Dancing", "Recognizing objects in photos", "Singing", "Handwriting"], correct: 1 },
  { question: "If you want to make a graph of your class marks, which AI topic will help?", options: ["Create with AI", "Chat with AI", "Fun with Data", "Meet AI Robots"], correct: 2 },
];

const optionLabels = ['A', 'B', 'C', 'D'];

const AiQuizChallenge = () => {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0); 
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === quizQuestions[currentQ].correct) setScore(prev => prev + 100);
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
      ? 'bg-indigo-50 border-indigo-500 text-indigo-750' 
      : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/50';
    if (idx === quizQuestions[currentQ].correct) return 'bg-emerald-50 border-emerald-500 text-emerald-700';
    if (idx === selectedOption) return 'bg-rose-50 border-rose-500 text-rose-700';
    return 'bg-slate-50 border-slate-100 text-slate-400';
  };

  const getLabelBg = (idx) => {
    if (!isAnswered) return selectedOption === idx ? 'bg-indigo-900 text-white' : 'bg-slate-100 text-slate-500';
    if (idx === quizQuestions[currentQ].correct) return 'bg-emerald-500 text-white';
    if (idx === selectedOption) return 'bg-rose-500 text-white';
    return 'bg-slate-200 text-slate-400';
  };

  const q = quizQuestions[currentQ];
  const progress = ((currentQ + (isAnswered ? 1 : 0)) / quizQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans text-slate-900 overflow-x-hidden relative flex flex-col items-center justify-center p-6">
      {/* Floating Back Button */}
      <button
        onClick={() => navigate("/ai-intelligence-dashboard")}
        className="fixed top-5 left-5 z-50 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-indigo-850 hover:shadow-lg transition-all border border-slate-100 group"
      >
        <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <div className="w-full max-w-[480px] shrink-0 transition-all duration-300 relative z-10 pt-10">
        <AnimatePresence mode="wait">
          {!showResult && (
            <motion.div key="active-quiz" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full">
              <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center shadow-inner">
                      <Brain size={16} />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">Question {currentQ + 1}/{quizQuestions.length}</h3>
                      <p className="text-[10px] font-bold text-slate-400">AI Knowledge Test</p>
                    </div>
                  </div>
                  <div className="bg-slate-50/80 px-3 py-1.5 rounded-lg border border-slate-200/60 text-center">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Score</span>
                    <span className="text-sm font-black text-indigo-750 leading-none">{score}</span>
                  </div>
                </div>

                <div className="w-full h-1 bg-slate-100 rounded-full mb-5 overflow-hidden">
                  <motion.div animate={{ width: `${progress}%` }} className="h-full bg-indigo-900 rounded-full" />
                </div>

                <h2 className="text-[15px] font-bold text-slate-900 leading-snug mb-5 min-h-[50px]">
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
                    <span className={`text-xs font-bold ${
                      selectedOption === q.correct ? 'text-emerald-600' 
                      : selectedOption === null ? 'text-amber-600' : 'text-rose-600'
                    }`}>
                      {selectedOption === q.correct ? 'Correct!' : selectedOption === null ? "Time is up!" : 'Wrong answer'}
                    </span>
                  ) : <div />}

                  {isAnswered && (
                    <button onClick={handleNext}
                      className="flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-indigo-850 to-indigo-900 hover:from-indigo-900 hover:to-indigo-950 text-white rounded-full text-xs font-bold transition-all shadow-md shadow-indigo-150 active:scale-95 cursor-pointer"
                    >
                      {currentQ < quizQuestions.length - 1 ? 'Next' : 'Results'} <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {showResult && (
            <motion.div key="quiz-results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full">
              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-750 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <Trophy size={32} />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">Challenge Completed!</h2>
                <p className="text-xs text-slate-500 mb-6 font-medium">You've successfully finished the AI Knowledge Challenge.</p>

                <div className="bg-slate-50/80 rounded-[16px] p-5 mb-6 border border-slate-200/60 inline-block min-w-[180px]">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Total Score</span>
                  <span className="text-3xl font-black text-indigo-850">{score}</span>
                  <span className="text-[10px] font-bold text-slate-400 block mt-1">out of {quizQuestions.length * 100}</span>
                </div>

                <div className="flex justify-center">
                  <button onClick={handleRestart} className="px-6 py-2.5 bg-gradient-to-r from-indigo-850 to-indigo-900 hover:from-indigo-900 hover:to-indigo-950 text-white rounded-full text-xs font-bold transition-all shadow-md shadow-indigo-150 active:scale-95 cursor-pointer">
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

export default AiQuizChallenge;
