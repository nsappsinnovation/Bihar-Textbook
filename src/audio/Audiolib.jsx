import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  Pause,
  Compass, 
  Cpu, 
  BookOpen, 
  Target, 
  Headphones,
  Smartphone,
  Volume2,
  VolumeX,
  FastForward,
  RotateCcw,
  BookMarked
} from 'lucide-react';

const Audiolib = () => {
  const navigate = useNavigate();

  const [activeModule, setActiveModule] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [highlightedWordIndex, setHighlightedWordIndex] = useState(-1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);

  // Actual book data mapped from MyAudioLibrary.jsx
  const modules = [
    {
      id: 10,
      title: "A Brief History of Time",
      author: "Stephen Hawking",
      category: "Science",
      description: "Stephen Hawking's landmark introduction to the origins and nature of our universe, covering gravity, black holes, the Big Bang, and the search for a unified theory.",
      duration: "0:45",
      durationSec: 45,
      difficulty: "Grade 11",
      transcript: "Our picture of the universe is changing. Over three hundred years ago, Isaac Newton published his work on gravity and motion. In 1915, Albert Einstein proposed his general theory of relativity, showing that space and time are dynamic, curved by the matter and energy in them.",
      cover: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 7,
      title: "Sapiens: A Brief History",
      author: "Yuval Noah Harari",
      category: "History",
      description: "Sapiens integrates history and science to reconsider accepted narratives, connect past developments with contemporary concerns, and examine what the future might hold.",
      duration: "0:50",
      durationSec: 50,
      difficulty: "Grade 9",
      transcript: "About seventy thousand years ago, organisms belonging to the species Homo sapiens started to form even more elaborate structures called cultures. The subsequent development of these human cultures is called history. Three important revolutions shaped the course of history: the Cognitive, Agricultural, and Scientific.",
      cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 1,
      title: "The Alchemist",
      author: "Paulo Coelho",
      category: "Stories",
      description: "A magical story about Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure. His quest will lead him to riches far different—and far more satisfying—than he ever imagined.",
      duration: "0:42",
      durationSec: 42,
      difficulty: "Grade 8",
      transcript: "The boy's name was Santiago. He was an Andalusian shepherd boy who yearned to travel in search of a worldly treasure. His quest would lead him to riches far different—and far more satisfying—than he ever imagined, teaching him to listen to his heart and read the omens.",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      category: "Self Growth",
      description: "No matter your goals, Atomic Habits offers a proven framework for improving every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies to build good habits and break bad ones.",
      duration: "0:48",
      durationSec: 48,
      difficulty: "Grade 10",
      transcript: "An atomic habit is a regular practice or routine that is not only small and easy to do, but also the source of incredible power. A component of the system of compound growth. Changes that seem small and unimportant at first will compound into remarkable results if you stick with them.",
      cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400"
    }
  ];

  // Stop speech when switching modules
  useEffect(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setCurrentTime(0);
    setHighlightedWordIndex(-1);
  }, [activeModule]);

  // Sync speed changes in real-time
  useEffect(() => {
    if (isPlaying) {
      speakText();
    }
  }, [playbackRate]);

  // Sync mute changes
  useEffect(() => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      speakText();
    }
  }, [isMuted]);

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const speakText = () => {
    window.speechSynthesis.cancel();
    const text = modules[activeModule].transcript;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = playbackRate;
    utterance.volume = isMuted ? 0 : 1;

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const charIndex = event.charIndex;
        const textBefore = text.slice(0, charIndex);
        const wordsBefore = textBefore.trim().split(/\s+/);
        const currentWordIdx = textBefore.trim() === "" ? 0 : wordsBefore.length;
        setHighlightedWordIndex(currentWordIdx);

        // Update progress bar ratio
        const totalChars = text.length;
        const progressRatio = charIndex / totalChars;
        setCurrentTime(progressRatio * modules[activeModule].durationSec);
      }
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setHighlightedWordIndex(-1);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
      } else {
        setIsPlaying(true);
        speakText();
      }
    }
  };

  const handleRestart = () => {
    setCurrentTime(0);
    setHighlightedWordIndex(-1);
    if (isPlaying) {
      speakText();
    }
  };

  const handleSliderChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    
    // Web speech does not allow arbitrary seeking inside an active utterance natively.
    // So we restart from approximate word offset based on slide value.
    const text = modules[activeModule].transcript;
    const totalChars = text.length;
    const charIndex = Math.floor((newTime / modules[activeModule].durationSec) * totalChars);
    
    window.speechSynthesis.cancel();
    
    if (isPlaying) {
      const remainingText = text.slice(charIndex);
      const utterance = new SpeechSynthesisUtterance(remainingText);
      utterance.rate = playbackRate;
      utterance.volume = isMuted ? 0 : 1;

      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          const relativeCharIndex = event.charIndex;
          const absoluteCharIndex = charIndex + relativeCharIndex;
          const textBefore = text.slice(0, absoluteCharIndex);
          const wordsBefore = textBefore.trim().split(/\s+/);
          const currentWordIdx = textBefore.trim() === "" ? 0 : wordsBefore.length;
          setHighlightedWordIndex(currentWordIdx);
          setCurrentTime((absoluteCharIndex / totalChars) * modules[activeModule].durationSec);
        }
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        setHighlightedWordIndex(-1);
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  const cycleSpeed = () => {
    const rates = [1.0, 1.25, 1.5, 2.0];
    const nextIdx = (rates.indexOf(playbackRate) + 1) % rates.length;
    setPlaybackRate(rates[nextIdx]);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (timeInSecs) => {
    const mins = Math.floor(timeInSecs / 60);
    const secs = Math.floor(timeInSecs % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Render synchronized scrolling word highlights
  const renderTranscript = () => {
    const text = modules[activeModule].transcript;
    const words = text.split(" ");
    
    return (
      <p className="text-xs md:text-sm font-medium leading-relaxed text-slate-300">
        {words.map((word, idx) => {
          const isCurrentWord = idx === highlightedWordIndex;
          const isPastWord = idx < highlightedWordIndex;
          
          return (
            <span 
              key={idx} 
              className={`transition-colors duration-200 ${
                isCurrentWord 
                  ? "text-purple-300 font-extrabold scale-105 inline-block mx-0.5" 
                  : isPastWord 
                    ? "text-purple-200/60 font-medium" 
                    : "text-slate-500"
              }`}
            >
              {word}{" "}
            </span>
          );
        })}
      </p>
    );
  };

  return (
    <div className="relative min-h-screen bg-[#FDFEFF] text-slate-900 overflow-hidden font-sans pb-24">
      {/* Subtle organic purple background elements */}
      <div className="absolute top-0 right-0 -z-10 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-purple-500/5 to-indigo-500/5 blur-[120px]" />
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-500/5 to-slate-200/5 blur-[120px]" />

      {/* Container - generous top spacing to prevent overlapping navbar */}
      <div className="max-w-[1140px] mx-auto px-6 sm:px-8 pt-12 sm:pt-16">

        {/* Back Navigation */}
        <div className="mb-10 -mt-6">
          <button 
            onClick={() => navigate("/#missions-grid")} 
            className="group w-10 h-10 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-full shadow-sm flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all duration-300 cursor-pointer"
            aria-label="Back to missions"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16 -mt-24">
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200/50 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
                Audiobooks Mission
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                Enriching <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Audio Learning</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl">
                Experience curriculum-aligned audiobooks designed for Grades 8–12. Our interactive modules bridge textbook theory with hands-free auditory learning to reduce screen time and improve retention.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap gap-3.5 pt-1"
            >
              <button 
                onClick={() => navigate("/audio-library-dashboard")}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full text-xs sm:text-sm font-bold shadow-md shadow-purple-500/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                Start Listening
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              
              <a 
                href="#player-section"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                Try Preview Demo
              </a>
            </motion.div>

            {/* Premium specs under CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-3 gap-4 sm:gap-6 pt-5 border-t border-slate-200/80"
            >
              <div className="p-3.5 bg-white hover:bg-slate-50 border border-slate-200/60 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
                <div className="text-slate-900 font-bold flex items-center gap-1.5 text-xs sm:text-sm">
                  <Headphones size={14} className="text-purple-600" />
                  Grades 8-12
                </div>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">Curated audiobook chapters & syllabus.</p>
              </div>
              <div className="p-3.5 bg-white hover:bg-slate-50 border border-slate-200/60 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
                <div className="text-slate-900 font-bold flex items-center gap-1.5 text-xs sm:text-sm">
                  <Smartphone size={14} className="text-purple-600" />
                  Screen-Free
                </div>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">Reduces eye fatigue and boosts concentration.</p>
              </div>
              <div className="p-3.5 bg-white hover:bg-slate-50 border border-slate-200/60 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
                <div className="text-slate-900 font-bold flex items-center gap-1.5 text-xs sm:text-sm">
                  <BookOpen size={14} className="text-purple-600" />
                  Interactive
                </div>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">Synchronized reader transcripts included.</p>
              </div>
            </motion.div>
          </div>

          {/* Hero Illustration */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative w-full max-w-[480px]"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-indigo-500/15 rounded-full blur-[70px] -z-10" />
              <img loading="lazy" decoding="async"
                src="/images/audio/audio.webp"
                alt="Audio Experience Illustration"
                className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(147,51,234,0.06)] select-none"
              />
            </motion.div>
          </div>
        </section>

        {/* Section Header */}
        <div id="player-section" className="text-center max-w-2xl mx-auto mb-10 space-y-2 pt-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-purple-50 text-purple-700 border border-purple-100 rounded-full text-[10px] font-bold tracking-widest uppercase">
            Curated Showcase
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Interactive Audio Deck</h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">Select a textbook from the shelf and load it into our responsive vinyl turntable deck below.</p>
        </div>

        {/* Purplish Vinyl Turntable Showcase */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          
          {/* Left Column: Shelf */}
          <div className="lg:col-span-4 flex flex-col justify-start space-y-4">
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">Select audiobook</span>
            
            <div className="space-y-4">
              {modules.map((item, idx) => {
                const isActive = activeModule === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveModule(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 cursor-pointer relative overflow-hidden group hover:-translate-y-1 shadow-sm ${
                      isActive 
                        ? 'border-purple-400 bg-white shadow-md shadow-purple-50' 
                        : 'border-slate-200/60 bg-white hover:border-slate-300'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-purple-600" />
                    )}

                    {/* Miniature book cover */}
                    <div className="w-12 h-16 rounded-lg overflow-hidden shadow-md shrink-0 group-hover:scale-105 transition-transform duration-300 relative border border-slate-100 bg-slate-50">
                      <img loading="lazy" decoding="async" src={item.cover} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/10" />
                    </div>

                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`text-[9px] font-extrabold uppercase tracking-wider ${isActive ? 'text-purple-600' : 'text-slate-400'}`}>
                          {item.category}
                        </span>
                        <span className="text-[9px] font-medium text-slate-400">
                          {item.duration}
                        </span>
                      </div>
                      <h3 className="text-sm font-extrabold text-slate-800 leading-snug truncate">
                        {item.title}
                      </h3>
                      <p className="text-[10px] text-slate-400 font-medium">
                        {item.difficulty} • {item.author}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Virtual Turntable (Purplish Tone) */}
          <div className="lg:col-span-8">
            <div className="h-full bg-[#0F081D] text-white border border-[#21153E] rounded-[32px] p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              
              {/* Turntable Core */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center flex-grow mb-6">
                
                {/* Vinyl Record */}
                <div className="md:col-span-6 flex justify-center relative select-none">
                  {/* Outer ring */}
                  <div className="w-56 h-56 rounded-full bg-slate-950 border-[6px] border-[#21153E] flex items-center justify-center relative shadow-2xl">
                    
                    {/* The Disc */}
                    <motion.div
                      animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                      transition={isPlaying ? { duration: 5, repeat: Infinity, ease: "linear" } : { duration: 0.5 }}
                      className="w-48 h-48 rounded-full bg-zinc-950 border border-zinc-900 flex items-center justify-center relative cursor-pointer"
                      onClick={handlePlayPause}
                    >
                      {/* Groove rings */}
                      <div className="absolute inset-2 rounded-full border border-zinc-900/30" />
                      <div className="absolute inset-4 rounded-full border border-zinc-900/40" />
                      <div className="absolute inset-8 rounded-full border border-zinc-900/55" />
                      <div className="absolute inset-12 rounded-full border border-zinc-900/70" />
                      <div className="absolute inset-16 rounded-full border border-zinc-900/80" />

                      {/* Cover Center Label */}
                      <div className="w-16 h-16 rounded-full overflow-hidden border border-zinc-800 shadow-inner relative flex items-center justify-center">
                        <img loading="lazy" decoding="async" 
                          src={modules[activeModule].cover} 
                          alt="Disc Artwork" 
                          className="w-full h-full object-cover select-none pointer-events-none"
                        />
                        <div className="absolute inset-0 bg-black/10 rounded-full" />
                      </div>

                      {/* Turntable center hole */}
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-600 border border-slate-950 absolute z-10" />
                    </motion.div>

                    {/* The Tonearm */}
                    <div 
                      className="absolute top-2 right-4 w-28 h-28 origin-top-right transition-transform duration-500 pointer-events-none z-10"
                      style={{
                        transform: isPlaying ? 'rotate(18deg)' : 'rotate(0deg)',
                      }}
                    >
                      <div className="w-1.5 h-24 bg-gradient-to-r from-slate-400 to-slate-200 shadow-md absolute right-8 top-0 origin-top rotate-[25deg]" />
                      <div className="w-6 h-6 rounded-full bg-zinc-700 border border-zinc-600 absolute right-6 -top-1" />
                      <div className="w-3.5 h-6 bg-zinc-800 rounded-sm absolute right-[50px] top-[74px] rotate-[15deg] shadow-sm flex flex-col justify-end items-center">
                        <div className="w-1 h-1 rounded-full bg-red-500 mb-1" />
                      </div>
                    </div>

                  </div>
                </div>

                {/* Details & Transcript (Purplish Box) */}
                <div className="md:col-span-6 space-y-4 flex flex-col justify-between h-full">
                  <div>
                    <span className="text-[10px] font-extrabold tracking-widest text-purple-300 bg-purple-950/60 px-3 py-1 rounded-full uppercase border border-purple-900/60">
                      NOW PLAYING
                    </span>
                    <h3 className="text-xl font-extrabold text-white mt-3.5 leading-snug">
                      {modules[activeModule].title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-400 mt-1">
                      By {modules[activeModule].author} • {modules[activeModule].difficulty}
                    </p>
                  </div>

                  {/* Sync lyrics / Transcript */}
                  <div className="bg-[#180E2B]/50 border border-[#2B1B4A] rounded-2xl p-4 h-36 overflow-y-auto scrollbar-thin relative">
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-purple-300 mb-2 border-b border-[#2B1B4A] pb-1.5">
                      <BookMarked size={12} />
                      <span>Synchronized Narration</span>
                    </div>
                    {renderTranscript()}
                  </div>
                </div>

              </div>

              {/* Slider & Seek Controls */}
              <div className="border-t border-[#21153E] pt-4 mt-2 space-y-4">
                
                <div className="space-y-1.5">
                  <input
                    type="range"
                    min="0"
                    max={modules[activeModule].durationSec}
                    value={currentTime}
                    onChange={handleSliderChange}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400 transition-colors"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(modules[activeModule].durationSec)}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  
                  {/* Speed & Mute */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={cycleSpeed}
                      className="px-2.5 py-1 bg-[#180E2B] hover:bg-[#251543] text-slate-300 hover:text-white rounded-md text-[11px] font-bold transition-colors flex items-center gap-1 border border-[#2B1B4A]"
                      title="Playback Speed"
                    >
                      <FastForward size={11} />
                      {playbackRate.toFixed(2)}x
                    </button>

                    <button
                      onClick={toggleMute}
                      className={`p-1.5 rounded-md border transition-all ${
                        isMuted 
                          ? 'text-red-400 border-red-950 bg-red-950/20' 
                          : 'text-slate-400 border-[#2B1B4A] hover:bg-[#180E2B] hover:text-slate-200'
                      }`}
                      title={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    </button>
                  </div>

                  {/* Play button */}
                  <button
                    onClick={handlePlayPause}
                    className="w-12 h-12 bg-purple-600 hover:bg-purple-500 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 border border-purple-500/20"
                  >
                    {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
                  </button>

                  {/* Restart & link */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleRestart}
                      className="p-1.5 rounded-md border border-[#2B1B4A] hover:bg-[#180E2B] text-slate-400 hover:text-slate-200 transition-colors"
                      title="Restart Track"
                    >
                      <RotateCcw size={14} />
                    </button>

                    <button
                      onClick={() => navigate("/audio-library-dashboard")}
                      className="px-3.5 py-1.5 bg-[#180E2B] hover:bg-[#251543] border border-[#2B1B4A] text-purple-300 hover:text-white rounded-lg text-xs font-bold transition-colors"
                    >
                      Library Dashboard
                    </button>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-slate-200/80 max-w-4xl mx-auto text-center">
          <div className="p-5 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
            <h5 className="text-3xl font-extrabold bg-gradient-to-r from-purple-700 to-indigo-900 bg-clip-text text-transparent">100+</h5>
            <p className="text-xs sm:text-sm font-bold text-slate-800">Audiobooks Library</p>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Spanning science, history, linguistics, and literature.</p>
          </div>
          <div className="p-5 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
            <h5 className="text-3xl font-extrabold bg-gradient-to-r from-purple-700 to-indigo-900 bg-clip-text text-transparent">100%</h5>
            <p className="text-xs sm:text-sm font-bold text-slate-800">Curriculum Aligned</p>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Mapped directly to board textbook lessons.</p>
          </div>
          <div className="p-5 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
            <h5 className="text-3xl font-extrabold bg-gradient-to-r from-purple-700 to-indigo-900 bg-clip-text text-transparent">Screen-Free</h5>
            <p className="text-xs sm:text-sm font-bold text-slate-800">Active Learning</p>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Reduces eye fatigue and improves attention span.</p>
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default Audiolib;
