import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Camera, CheckCircle, Video, Play, ArrowRight, RefreshCw, Hand, Volume2, RotateCcw, BookOpen, Check } from "lucide-react";

const SIGNS_DATA = {
  greetings: [
    { text: "Hello", image: "/images/s3.png" },
    { text: "Thank you", image: "/images/s4.png" },
    { text: "Good Morning", image: "/images/s1.png" },
    { text: "Goodbye", image: "/images/s2.png" }
  ],
  emotions: [
    { text: "Happy", image: "/images/s1.png" },
    { text: "Sad", image: "/images/s2.png" },
    { text: "Angry", image: "/images/s3.png" },
    { text: "Surprised", image: "/images/s4.png" }
  ],
  conversations: [
    { speaker: "boy", title: "Hello", sub: "Namaste", text: "Namaste!", en: "Hello!", signImg: "/images/s3.png" },
    { speaker: "girl", title: "How are you?", sub: "Aap kaise hain?", text: "Aap kaise hain?", en: "How are you?", signImg: "/images/s1.png" },
    { speaker: "boy", title: "I am fine", sub: "Main theek hoon", text: "Main theek hoon.", en: "I am fine.", signImg: "/images/s3.png" },
    { speaker: "girl", title: "Very good", sub: "Bahut achha", text: "Bahut achha!", en: "Very good!", signImg: "/images/s1.png" },
    { speaker: "boy", title: "Thank you", sub: "Dhanyavaad", text: "Dhanyavaad!", en: "Thank you!", signImg: "/images/s4.png" },
    { speaker: "girl", title: "See you later", sub: "Phir milenge", text: "Phir milenge!", en: "See you later!", signImg: "/images/s2.png" },
  ]
};

export default function SignModule({ type: initialType }) {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const category = state.category || "greetings";
  const type = state.type || initialType || "practice";
  
  const [step, setStep] = useState(0);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null
  
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const items = type === "conversations" ? SIGNS_DATA.conversations : (SIGNS_DATA[category.toLowerCase()] || SIGNS_DATA.greetings);
  const currentItem = items[step % items.length];

  // Camera handling
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
      setIsCameraActive(true);
      setFeedback(null);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera. Please allow permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsCameraActive(false);
  };

  // Cleanup camera on unmount
  useEffect(() => {
    return () => stopCamera();
  }, []);

  // Auto-start camera ONLY if type is camera
  useEffect(() => {
    if (type === "camera") {
      startCamera();
    } else {
      stopCamera();
    }
  }, [type]);

  const handleNext = () => {
    setFeedback(null);
    if (step < items.length - 1) {
      setStep(step + 1);
    } else if (type !== "conversations") {
      navigate("/sign-learn");
    }
  };

  const verifySign = () => {
    setIsAnalyzing(true);
    setFeedback(null);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      // Simulate logic: 80% chance of correct if camera is active
      const isCorrect = Math.random() > 0.2;
      setFeedback(isCorrect ? 'correct' : 'wrong');
      
      if (isCorrect) {
        setTimeout(() => {
          handleNext();
        }, 2000);
      }
    }, 1500);
  };

  if (type === "conversations") {
    const convoImages = [
      "/images/signlanguage/convo1.png",
      "/images/signlanguage/convo2.png",
      "/images/signlanguage/convo3.png",
      "/images/signlanguage/convo4.png",
      "/images/signlanguage/convo5.png",
      "/images/signlanguage/convo6.png",
    ];

    return (
      <div className="h-screen w-full bg-black relative flex flex-col font-sans overflow-hidden">
        <button 
          onClick={() => navigate("/sign-learn")} 
          className="absolute top-6 left-6 w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-all z-50 border border-white/10 shadow-lg"
        >
          <ArrowLeft size={24} strokeWidth={2.5} />
        </button>

        <div className="flex-1 w-full h-full relative flex items-center justify-center bg-black">
          <img 
            key={step}
            src={convoImages[step % convoImages.length]} 
            alt={`Conversation step ${step + 1}`} 
            className="w-full h-full object-cover animate-fade-in"
          />
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6">
          {step > 0 && (
            <button 
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-black text-lg tracking-widest backdrop-blur-md border border-white/20 transition-all uppercase"
            >
              <ArrowLeft size={22} strokeWidth={3} /> Prev
            </button>
          )}
          <button 
            onClick={() => {
              if (step < convoImages.length - 1) {
                setStep(step + 1);
              } else {
                navigate("/sign-learn");
              }
            }}
            className="flex items-center gap-3 px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-black text-lg tracking-widest shadow-xl shadow-blue-600/30 hover:-translate-y-1 transition-all uppercase"
          >
            {step < convoImages.length - 1 ? "Next" : "Finish"} <ArrowRight size={24} strokeWidth={3} />
          </button>
        </div>

        <style jsx>{`
          @keyframes fade-in {
            from { opacity: 0; transform: scale(1.02); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7FDF9] font-sans text-[#1A1C2E] flex flex-col">
      {/* Header */}
      <header className="p-5 flex items-center justify-between">
        <button onClick={() => { stopCamera(); navigate("/sign-learn"); }} className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-green-600 transition-all border border-slate-100">
          <ArrowLeft size={20} strokeWidth={2.5} />
        </button>
        
        <div className="flex-1 max-w-md mx-6">
          <div className="h-2.5 bg-green-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#22C55E] rounded-full transition-all duration-500" 
              style={{ width: `${((step + 1) / items.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="font-bold text-[#22C55E] bg-green-50 px-4 py-2 rounded-full capitalize">
          {category}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-5xl mx-auto w-full">
        
        {type === "conversations" ? null : (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Reference Sign */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center">
              <h2 className="text-2xl font-black text-slate-800 mb-6 text-center">
                Sign: <span className="text-[#22C55E]">"{currentItem.text}"</span>
              </h2>
              <div className="bg-slate-50 w-full flex-1 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden min-h-[300px]">
                <img src={currentItem.image} alt={currentItem.text} className="w-full h-full object-contain z-10" />
                <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                  <Hand size={200} />
                </div>
              </div>
              <p className="mt-6 text-slate-400 font-bold text-center">Look at the image and copy the sign</p>
            </div>

            {/* Camera / Practice Area */}
            <div className={`rounded-3xl p-6 shadow-xl flex flex-col items-center relative overflow-hidden transition-all duration-500 ${type === 'camera' ? 'bg-slate-900' : 'bg-white border border-slate-100 shadow-sm'}`}>
               
               {type === 'camera' ? (
                 <>
                   <div className="flex items-center justify-between w-full mb-4 z-10">
                     <div className="flex items-center gap-2 text-white/80 bg-black/30 px-3 py-1.5 rounded-full text-xs font-bold">
                       <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Live Practice
                     </div>
                   </div>

                   <div className="relative w-full flex-1 rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                     {isCameraActive ? (
                       <video 
                         ref={videoRef} 
                         autoPlay 
                         playsInline 
                         muted 
                         className="absolute w-full h-full object-cover -scale-x-100"
                       />
                     ) : (
                       <div className="flex flex-col items-center text-slate-600">
                         <Camera size={48} className="mb-2" />
                         <p>Camera is loading...</p>
                       </div>
                     )}
                     
                     {/* Overlay for Feedback */}
                     {isAnalyzing && (
                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-20">
                           <RefreshCw size={48} className="text-white animate-spin mb-4" />
                           <p className="text-white font-black text-xl uppercase tracking-widest">Analyzing Sign...</p>
                        </div>
                     )}

                     {feedback === 'correct' && (
                       <div className="absolute inset-0 bg-green-500/90 flex flex-col items-center justify-center animate-fade-in z-30">
                         <CheckCircle size={80} color="white" className="mb-4 drop-shadow-md" />
                         <h3 className="text-white text-3xl font-black drop-shadow-md">CORRECT!</h3>
                       </div>
                     )}

                     {feedback === 'wrong' && (
                       <div className="absolute inset-0 bg-rose-500/90 flex flex-col items-center justify-center animate-fade-in z-30">
                         <RefreshCw size={80} color="white" className="mb-4 drop-shadow-md" />
                         <h3 className="text-white text-3xl font-black drop-shadow-md uppercase">Try Again</h3>
                         <p className="text-white/80 font-bold mt-2">Adjust your hand position</p>
                       </div>
                     )}
                   </div>

                   <div className="w-full mt-6 flex gap-4 items-center z-10">
                      <button 
                        onClick={verifySign} 
                        disabled={isAnalyzing || feedback === 'correct'}
                        className="flex-1 bg-[#22C55E] disabled:bg-slate-700 text-white py-4 rounded-xl font-black text-lg shadow-lg hover:-translate-y-1 transition-all"
                      >
                        {isAnalyzing ? "Checking..." : "Verify Sign"}
                      </button>
                   </div>
                 </>
               ) : (
                 <div className="flex-1 w-full flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-[#22C55E] mb-6">
                      <Hand size={40} />
                    </div>
                    <h3 className="text-xl font-black text-slate-800 mb-4">Standard Practice Mode</h3>
                    <p className="text-slate-500 mb-8 max-w-[280px]">Take your time to memorize the sign. Click 'Next' when you are ready to move on.</p>
                    <button onClick={handleNext} className="w-full bg-[#22C55E] text-white py-4 rounded-xl font-black text-lg shadow-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                      Next Sign <ArrowRight size={20} />
                    </button>
                 </div>
               )}
            </div>
            
          </div>
        )}

      </main>

      <style jsx>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(8px); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
        .delay-100 {
          animation-delay: 100ms;
        }
      `}</style>
    </div>
  );
}
