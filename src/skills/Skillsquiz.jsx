
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const Skillsquiz = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const questions = [
    { q: "Is consistency important in learning?", a: true },
    { q: "Can basic life skills improve independence?", a: true },
    { q: "Is road safety only for drivers?", a: false },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-8 flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[40px] p-12 shadow-sm border border-slate-100 text-center"
        >
          {!finished ? (
            <>
              <h1 className="text-3xl font-black text-slate-900 mb-2 capitalize">
                {slug?.replace(/-/g, ' ') || 'Skill'} Quiz
              </h1>
              <p className="text-slate-500 mb-12">Test your knowledge and earn XP!</p>
              
              <div className="space-y-4">
                {questions.map((q, i) => (
                  <div key={i} className="p-6 bg-slate-50 rounded-3xl text-left flex items-center justify-between">
                    <span className="font-bold text-slate-700">{q.q}</span>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => { setScore(s => s + 1); if(i === questions.length - 1) setFinished(true); }}
                            className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center hover:bg-green-50 hover:text-green-600 transition-colors"
                        >
                            Yes
                        </button>
                        <button 
                            onClick={() => { if(i === questions.length - 1) setFinished(true); }}
                            className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                            No
                        </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="py-12">
              <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mx-auto mb-6">
                <Trophy size={48} />
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-2">Quiz Complete!</h2>
              <p className="text-slate-500 mb-8">You scored {score} out of {questions.length}</p>
              <button 
                onClick={() => navigate(-1)}
                className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-colors"
              >
                Return to Skills
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Skillsquiz;
