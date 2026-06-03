import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, BookOpen, Clock, 
  Hand, Play, GraduationCap, XCircle, Keyboard
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const toolsDataList = [
  { name: 'Hello', tag: 'Greeting', desc: 'Wave your hand gently from side to side to say hello.', image: '/images/signlanguage/hand.png', color: 'bg-green-50 text-green-600', categories: ['Greetings', 'Daily'] },
  { name: 'Thank You', tag: 'Greeting', desc: 'Touch your chin with fingers, then move hand forward towards the person.', image: '/images/signlanguage/handl.png', color: 'bg-emerald-50 text-emerald-600', categories: ['Greetings', 'Daily'] },
  { name: 'Mother', tag: 'Family', desc: 'Tap your thumb on your chin with an open hand facing sideways.', image: '/images/signlanguage/hand.png', color: 'bg-pink-50 text-pink-600', categories: ['Family'] },
  { name: 'Happy', tag: 'Emotion', desc: 'Brush both flat hands upward on your chest to show joy.', image: '/images/signlanguage/thumb.png', color: 'bg-yellow-50 text-yellow-600', categories: ['Emotions'] },
  { name: 'Sorry', tag: 'Greeting', desc: 'Rub a closed fist in a circular motion over your heart.', image: '/images/signlanguage/ghosthand.png', color: 'bg-blue-50 text-blue-600', categories: ['Greetings', 'Emotions'] },
  { name: 'Eat', tag: 'Daily', desc: 'Bring your flattened O-hand to your mouth a few times.', image: '/images/signlanguage/hand.png', color: 'bg-orange-50 text-orange-600', categories: ['Daily'] },
  { name: 'Father', tag: 'Family', desc: 'Tap your thumb on your forehead with an open hand facing sideways.', image: '/images/signlanguage/handl.png', color: 'bg-cyan-50 text-cyan-600', categories: ['Family'] },
  { name: 'Sad', tag: 'Emotion', desc: 'Place both hands in front of your face and pull them down while making a sad face.', image: '/images/signlanguage/ghosthand.png', color: 'bg-purple-50 text-purple-600', categories: ['Emotions'] }
];

const ExploreSignsComponent = () => {
  return (
    <div className="bg-white rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8">
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
      
      

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {toolsDataList.map(tool => (
          <div key={tool.name} className="relative w-full h-[240px] group perspective-1000 cursor-pointer">
            <div className="w-full h-full relative preserve-3d transition-transform duration-500 group-hover:rotate-y-180">
              
              {/* Front of Card */}
              <div className="absolute inset-0 backface-hidden bg-white rounded-[20px] border border-slate-100 p-5 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] group-hover:border-green-200 transition-colors">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl mb-4 ${tool.color.replace('text-', 'bg-').replace('-50', '-100')} text-slate-700`}>
                  <span className="font-black text-slate-700 opacity-60 text-2xl">{tool.name.charAt(0)}</span>
                </div>
                <h4 className="text-lg font-black text-slate-900 leading-tight">{tool.name}</h4>
                <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md mt-1.5 inline-block ${tool.color}`}>
                  {tool.tag}
                </span>
                <p className="text-[11px] text-slate-500 mt-3 line-clamp-2 font-medium">{tool.desc}</p>
                <div className="mt-auto text-[9px] text-green-600 font-bold uppercase tracking-widest bg-green-50 px-3 py-1.5 rounded-full w-full">
                  Hover to flip & see sign
                </div>
              </div>
              
              {/* Back of Card */}
              <div className="absolute inset-0 backface-hidden bg-green-50 rounded-[20px] border-2 border-green-200 p-4 flex flex-col items-center justify-center rotate-y-180 shadow-lg shadow-green-100/50">
                <div className="w-full h-32 bg-white rounded-[12px] p-2 flex items-center justify-center mb-3 overflow-hidden border border-green-100">
                   <img src={tool.image} alt={tool.name} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <h4 className="text-[15px] font-black text-green-700 leading-tight">{tool.name}</h4>
                
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FingerspellComponent = () => {
  const [text, setText] = useState('HELLO');
  const [zoomedChar, setZoomedChar] = useState(null);

  return (
    <div className="w-full bg-white rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-12 flex flex-col items-center text-center relative overflow-hidden min-h-[400px]">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url('/images/signlanguage/rhs.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
      
      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-6 shadow-inner">
          <Keyboard size={32} />
        </div>
        
        <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-3 tracking-tight">Type to Sign</h3>
        <p className="text-[15px] font-medium text-slate-500 mb-10 max-w-md">
          Type your name or any English word to instantly see how to spell it using sign language alphabet (Fingerspelling).
        </p>

        <div className="w-full relative mb-12">
          <input 
            type="text" 
            value={text} 
            onChange={(e) => setText(e.target.value.toUpperCase().replace(/[^A-Z ]/g, ''))}
            maxLength={15}
            placeholder="TYPE A WORD..."
            className="w-full px-8 py-5 rounded-full bg-white border-2 border-slate-200 text-center text-2xl font-black text-slate-800 placeholder-slate-300 focus:outline-none focus:border-purple-400 focus:ring-4 ring-purple-100 transition-all tracking-[0.2em] shadow-sm"
          />
          <div className="absolute -bottom-6 left-0 right-0 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
            Max 15 characters
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 min-h-[140px] p-4 bg-slate-50/80 backdrop-blur-sm border border-slate-100 rounded-[24px] w-full shadow-inner">
          <AnimatePresence mode="popLayout">
            {text.split('').map((char, index) => {
              if (char === ' ') return <div key={`space-${index}`} className="w-6 md:w-8" />;
              return (
                <motion.div 
                  key={`${char}-${index}`}
                  initial={{ opacity: 0, y: 20, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: -20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.03 }}
                  onClick={() => setZoomedChar(char)}
                  className="w-16 h-20 md:w-20 md:h-24 bg-white rounded-[16px] border-2 border-green-100 flex flex-col items-center justify-center relative shadow-[0_4px_15px_rgb(34,197,94,0.1)] overflow-hidden group hover:border-green-400 hover:shadow-[0_8px_20px_rgb(34,197,94,0.2)] hover:-translate-y-1 transition-all cursor-pointer"
                >
                  <img 
                    src={`/images/signlanguage/alphabets/${char}.png`} 
                    onError={(e) => { e.target.onerror = null; e.target.src = '/images/signlanguage/hand.png'; }}
                    alt={`Sign for ${char}`} 
                    className="w-10 h-10 md:w-12 md:h-12 object-contain mix-blend-multiply opacity-80 mb-3 group-hover:scale-110 group-hover:opacity-100 transition-all" 
                  />
                  <span className="absolute bottom-2 md:bottom-3 text-lg md:text-xl font-black text-green-700 bg-green-50/90 w-full text-center py-0.5 border-t border-green-100 group-hover:bg-green-100">{char}</span>
                </motion.div>
              )
            })}
            {text.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="w-full h-full flex flex-col items-center justify-center text-slate-400 py-8"
              >
                <Hand size={32} className="mb-3 opacity-20" />
                <span className="text-sm font-bold uppercase tracking-wider">Start typing to see signs</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {zoomedChar && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
            onClick={() => setZoomedChar(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[32px] p-8 max-w-sm w-full relative flex flex-col items-center shadow-2xl border border-slate-100"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setZoomedChar(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 bg-slate-100 hover:bg-rose-50 rounded-full p-2 transition-colors"
              >
                <XCircle size={24} />
              </button>
              
              <h4 className="text-4xl font-black text-slate-900 mb-6">Letter {zoomedChar}</h4>
              
              <div className="w-56 h-56 bg-slate-50 rounded-[24px] border-2 border-slate-100 flex items-center justify-center p-6 mb-8 shadow-inner relative overflow-hidden">
                 <div className="absolute inset-0 bg-green-500/5 mix-blend-multiply pointer-events-none" />
                 <img 
                    src={`/images/signlanguage/alphabets/${zoomedChar}.png`} 
                    onError={(e) => { e.target.onerror = null; e.target.src = '/images/signlanguage/hand.png'; }}
                    alt={`Zoomed sign for ${zoomedChar}`} 
                    className="w-full h-full object-contain mix-blend-multiply drop-shadow-md" 
                 />
              </div>
              
              <p className="text-slate-500 text-center font-medium leading-relaxed">
                Practice the ISL sign for the alphabet <strong className="text-slate-800 text-lg">{zoomedChar}</strong>.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SignLearn = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Learn ISL');
  const [selectedItem, setSelectedItem] = useState(null);

  const signVideos = [
    { 
      id: 1, 
      title: 'ISL 101: Alphabet', 
      desc: 'Learn the Indian Sign Language alphabet from A to Z.', 
      image: 'https://img.youtube.com/vi/qcdivQfA41Y/hqdefault.jpg', 
      duration: '9:06', 
      level: 'Beginner', 
      content: 'Fingerspelling is the foundation of sign language. In this lesson, you will learn how to sign all the letters of the English alphabet in Indian Sign Language (ISL).', 
      youtubeUrl: 'https://www.youtube.com/embed/qcdivQfA41Y?autoplay=1' 
    },
    { 
      id: 2, 
      title: 'ISL 101: Numbers', 
      desc: 'Learn how to sign numbers and count in ISL.', 
      image: 'https://img.youtube.com/vi/vnH2BmcSRMA/hqdefault.jpg', 
      duration: '3:52', 
      level: 'Beginner', 
      content: 'Numbers are essential for daily communication. This lesson covers the basic counting system and how to express quantities using standard ISL number signs.', 
      youtubeUrl: 'https://www.youtube.com/embed/vnH2BmcSRMA?autoplay=1' 
    },
    { 
      id: 3, 
      title: 'ISL 101: Basic Words 1', 
      desc: 'Introduction to foundational everyday words in ISL.', 
      image: 'https://img.youtube.com/vi/VtbYvVDItvg/hqdefault.jpg', 
      duration: '10:15', 
      level: 'Beginner', 
      content: 'Start building your vocabulary! Learn the most common and essential words used in daily sign language interactions to help you form basic sentences.', 
      youtubeUrl: 'https://www.youtube.com/embed/VtbYvVDItvg?autoplay=1' 
    },
    { 
      id: 4, 
      title: 'ISL 101: Basic Words 2', 
      desc: 'Expand your vocabulary with more everyday signs.', 
      image: 'https://img.youtube.com/vi/lffGJ29IhZQ/hqdefault.jpg', 
      duration: '6:59', 
      level: 'Beginner', 
      content: 'Continuing from part 1, this lesson introduces more fundamental words to expand your conversational ability in Indian Sign Language.', 
      youtubeUrl: 'https://www.youtube.com/embed/lffGJ29IhZQ?autoplay=1' 
    },
    { 
      id: 5, 
      title: 'ISL 101: Question Words', 
      desc: 'Learn how to ask Who, What, Where, When, and Why.', 
      image: 'https://img.youtube.com/vi/DOFPRw6Epl0/hqdefault.jpg', 
      duration: '4:00', 
      level: 'Beginner', 
      content: 'Asking questions is crucial for learning. This lesson teaches you the WH-words and the proper facial expressions needed to ask questions in ISL.', 
      youtubeUrl: 'https://www.youtube.com/embed/DOFPRw6Epl0?autoplay=1' 
    },
    { 
      id: 6, 
      title: 'ISL 101: Colours', 
      desc: 'Learn the signs for different colors.', 
      image: 'https://img.youtube.com/vi/qtrBGmioR2Q/hqdefault.jpg', 
      duration: '4:19', 
      level: 'Beginner', 
      content: 'Make your conversations more descriptive by learning the signs for primary and secondary colors in Indian Sign Language.', 
      youtubeUrl: 'https://www.youtube.com/embed/qtrBGmioR2Q?autoplay=1' 
    },
    { 
      id: 7, 
      title: 'ISL 101: Relations', 
      desc: 'Signs for family members and relationships.', 
      image: 'https://img.youtube.com/vi/drs0_jcKr5w/hqdefault.jpg', 
      duration: '4:03', 
      level: 'Intermediate', 
      content: 'Learn the specific signs to introduce your family members, relatives, and describe your relationships with others.', 
      youtubeUrl: 'https://www.youtube.com/embed/drs0_jcKr5w?autoplay=1' 
    },
    { 
      id: 8, 
      title: 'ISL 101: Days of the Week', 
      desc: 'Learn how to sign Monday through Sunday.', 
      image: 'https://img.youtube.com/vi/XPRtZQSKL-4/hqdefault.jpg', 
      duration: '4:56', 
      level: 'Beginner', 
      content: 'Time references are important. Learn how to accurately sign the days of the week to help schedule and plan in sign language.', 
      youtubeUrl: 'https://www.youtube.com/embed/XPRtZQSKL-4?autoplay=1' 
    },
    { 
      id: 9, 
      title: 'ISL 101: Months', 
      desc: 'Learn the signs for all 12 months of the year.', 
      image: 'https://img.youtube.com/vi/x58C6-ZtW_8/hqdefault.jpg', 
      duration: '5:15', 
      level: 'Intermediate', 
      content: 'Expand your time-related vocabulary by learning the signs for the twelve months of the year in ISL.', 
      youtubeUrl: 'https://www.youtube.com/embed/x58C6-ZtW_8?autoplay=1' 
    },
    { 
      id: 10, 
      title: 'ISL 101: Basic Words 3', 
      desc: 'Advanced basic vocabulary for everyday use.', 
      image: 'https://img.youtube.com/vi/bIkHfFlu4VU/hqdefault.jpg', 
      duration: '6:59', 
      level: 'Intermediate', 
      content: 'The final part of our basic words series. Learn these additional signs to complete your foundational Indian Sign Language vocabulary.', 
      youtubeUrl: 'https://www.youtube.com/embed/bIkHfFlu4VU?autoplay=1' 
    },
    { 
      id: 11, 
      title: 'ISL 101: Standard Signs', 
      desc: 'Learn standard, universally understood signs.', 
      image: 'https://img.youtube.com/vi/-Eh3ktA52jw/hqdefault.jpg', 
      duration: '7:04', 
      level: 'Advanced', 
      content: 'Master standard signs that are widely recognized across different regions. This helps improve your overall fluency and clarity.', 
      youtubeUrl: 'https://www.youtube.com/embed/-Eh3ktA52jw?autoplay=1' 
    },
    { 
      id: 12, 
      title: 'ISL Vocab: Fruits', 
      desc: 'Learn the names of common fruits in ISL.', 
      image: 'https://img.youtube.com/vi/G6UY0amZ93s/hqdefault.jpg', 
      duration: '1:32', 
      level: 'Beginner', 
      content: 'A fun vocabulary lesson where you will learn how to visually express the names of your favorite fruits in Indian Sign Language.', 
      youtubeUrl: 'https://www.youtube.com/embed/G6UY0amZ93s?autoplay=1' 
    },
    { 
      id: 13, 
      title: 'ISL Vocab: Vegetables', 
      desc: 'Learn the names of common vegetables.', 
      image: 'https://img.youtube.com/vi/0tJ34RKNwC0/hqdefault.jpg', 
      duration: '1:24', 
      level: 'Beginner', 
      content: 'Expand your food vocabulary by learning the signs for various everyday vegetables.', 
      youtubeUrl: 'https://www.youtube.com/embed/0tJ34RKNwC0?autoplay=1' 
    },
    { 
      id: 14, 
      title: 'ISL Vocab: Animals', 
      desc: 'Discover how to sign different animals.', 
      image: 'https://img.youtube.com/vi/dnH8mo0s7go/hqdefault.jpg', 
      duration: '1:28', 
      level: 'Beginner', 
      content: 'Animal signs are highly visual and fun to learn! This lesson covers the signs for common household pets and wild animals.', 
      youtubeUrl: 'https://www.youtube.com/embed/dnH8mo0s7go?autoplay=1' 
    },
    { 
      id: 15, 
      title: 'ISL Learning: Good Manners & Habits', 
      desc: 'Learn polite phrases and good habits in ISL.', 
      image: 'https://img.youtube.com/vi/rKwokwZQ6FU/hqdefault.jpg', 
      duration: '1:18', 
      level: 'Intermediate', 
      content: 'Politeness goes a long way. Learn how to express good manners, positive habits, and moral values through sign language.', 
      youtubeUrl: 'https://www.youtube.com/embed/rKwokwZQ6FU?autoplay=1' 
    },
    { 
      id: 16, 
      title: 'ISL Learning: Road & Traffic Signs', 
      desc: 'Important road and traffic safety signs.', 
      image: 'https://img.youtube.com/vi/Y6CSy7dbzik/hqdefault.jpg', 
      duration: '1:02', 
      level: 'Intermediate', 
      content: 'An important safety lesson! Learn how to communicate about road safety, traffic rules, and signs in Indian Sign Language.', 
      youtubeUrl: 'https://www.youtube.com/embed/Y6CSy7dbzik?autoplay=1' 
    },
    { 
      id: 17, 
      title: 'ISL Learning: Facts About Indian Cities', 
      desc: 'Learn signs for major cities and interesting facts.', 
      image: 'https://img.youtube.com/vi/_yC1ZZXNcWI/hqdefault.jpg', 
      duration: '1:16', 
      level: 'Advanced', 
      content: 'Take a virtual tour across India! This advanced lesson teaches you the specific signs for major Indian cities along with interesting facts.', 
      youtubeUrl: 'https://www.youtube.com/embed/_yC1ZZXNcWI?autoplay=1' 
    }
  ];

  const quickStats = [
    { label: 'Learn ISL', value: 'Video Lectures', icon: <BookOpen className="text-emerald-600" />, color: 'bg-emerald-50' },
    { label: 'Explore Signs', value: 'Visual library', icon: <Hand className="text-blue-600" />, color: 'bg-blue-50' },
    { label: 'Type to Sign', value: 'Fingerspell Translator', icon: <Keyboard className="text-purple-600" />, color: 'bg-purple-50' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex font-sans text-slate-900 overflow-x-hidden">
      <button
        onClick={() => navigate("/sign")}
        className="fixed top-3 left-3 md:top-5 md:left-5 z-50 w-9 h-9 md:w-10 md:h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-green-600 hover:shadow-lg transition-all border border-slate-100 group"
      >
        <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>
      
      {/* Main Content */}
      <main className="flex-1 min-h-screen pb-4 overflow-y-auto">
        <div className="px-4 sm:px-6 md:px-12 2xl:px-20 space-y-6 md:space-y-8 pt-4 2xl:max-w-[1600px] 2xl:mx-auto">

          {/* Hero & Stats Section */}
          <div className="relative">
            {/* Hero Section */}
            <section className="bg-white rounded-[16px] md:rounded-[24px] overflow-hidden relative border border-slate-100 flex items-center min-h-[200px] sm:min-h-[260px] md:min-h-[300px] 2xl:min-h-[380px] pb-4 md:pb-6">
              <div className="relative z-10 p-5 sm:p-8 md:p-10 lg:w-1/2 space-y-3 md:space-y-4">
                 <h1 className="text-[22px] sm:text-[28px] md:text-[36px] lg:text-[42px] 2xl:text-[52px] font-extrabold leading-[1.05] tracking-tight text-[#1e293b]">
                    Build. Learn. &amp; <br /> Talk with <br />
                    <span className="text-green-600">Sign Language</span>
                 </h1>
                 <p className="text-slate-500 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-medium leading-relaxed max-w-sm">
                   Your visual learning hub for signs and expressions.
                 </p>
                 
                 <div className="pt-2">
                   <button 
                     onClick={() => navigate("/sign-module", { state: { type: "conversations" } })}
                      className="px-5 py-2.5 sm:px-6 sm:py-3 bg-green-600 text-white rounded-full font-bold text-[12px] sm:text-[14px] flex items-center gap-2 hover:bg-green-700 transition-colors w-max shadow-sm shadow-green-200"
                   >
                     Start a Conversation <ArrowRight size={16} />
                   </button>
                 </div>
              </div>

              <div className="hidden lg:block absolute top-0 right-0 w-[55%] h-full">
                 <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/10 to-transparent z-10" />
                 <img src="/images/signlanguage/rhs.png" alt="Sign Language" className="w-full h-full object-contain object-right" />
              </div>
            </section>

            {/* Quick Stats Row — overlapping hero with negative margin */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 relative z-20 -mt-8 px-4 md:px-12">
              {quickStats.map((stat, i) => {
                const isActive = activeFilter === stat.label;
                return (
                  <div 
                    key={i} 
                    onClick={() => {
                      setActiveFilter(stat.label);
                      const target = document.getElementById("content-section");
                      if(target) target.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`bg-white rounded-[16px] p-3 md:p-4 border ${isActive ? 'border-green-500 ring-2 ring-green-500/10 shadow-md' : 'border-slate-50 shadow-[0_4px_20px_rgba(0,0,0,0.06)]'} flex items-center gap-3 md:gap-4 hover:shadow-md transition-shadow cursor-pointer group`}
                  >
                     <div className={`w-[44px] h-[44px] ${isActive ? 'bg-green-600 text-white' : stat.color} rounded-[12px] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform [&>svg]:w-5 [&>svg]:h-5`}>
                        {React.cloneElement(stat.icon, { className: isActive ? 'text-white' : stat.icon.props.className })}
                     </div>
                     <div>
                        <h4 className={`text-[13px] font-bold leading-tight transition-colors ${isActive ? 'text-green-700' : 'text-[#1e1b4b] group-hover:text-green-600'}`}>{stat.label}</h4>
                        <p className={`text-[11px] font-medium mt-0.5 ${isActive ? 'text-green-600/80' : 'text-slate-500'}`}>{stat.value}</p>
                     </div>
                  </div>
                );
              })}
            </section>
          </div>

          {/* Content Section */}
          <div id="content-section" className="pt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {activeFilter === 'Explore Signs' && <ExploreSignsComponent />}
                {activeFilter === 'Type to Sign' && <FingerspellComponent />}
                {activeFilter === 'Learn ISL' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {signVideos.map(video => (
                      <div key={video.id} onClick={() => setSelectedItem({ ...video, type: 'video' })} className="bg-white rounded-[20px] overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group">
                        <div className="relative aspect-video bg-slate-100 overflow-hidden">
                           <img src={video.image} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                           <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 flex items-center justify-center transition-colors">
                              <div className="w-12 h-12 rounded-full bg-white/90 text-green-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                 <Play className="ml-1 w-6 h-6 fill-current" />
                              </div>
                           </div>
                           <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-md text-white text-[10px] font-bold flex items-center gap-1">
                              <Clock size={12} /> {video.duration}
                           </div>
                        </div>
                        <div className="p-4">
                           <div className="flex items-center gap-2 mb-2">
                              <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md uppercase tracking-wider">Lesson</span>
                           </div>
                           <h3 className="text-[15px] font-bold text-slate-900 leading-tight mb-1.5 group-hover:text-green-600 transition-colors">{video.title}</h3>
                           <p className="text-xs text-slate-500 font-medium line-clamp-2 mb-4">{video.desc}</p>
                           <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                              <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                                 <GraduationCap size={14} className="text-green-500" /> {video.level}
                              </span>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </main>

      {/* Video Content Modal */}
      <AnimatePresence>
        {selectedItem && selectedItem.type === 'video' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex p-4 sm:p-6 overflow-y-auto"
          >
            <div 
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setSelectedItem(null)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[24px] overflow-hidden shadow-2xl z-10 flex flex-col m-auto h-auto"
            >
              <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                    <Play size={20} className="fill-current" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight pr-8">{selectedItem.title}</h2>
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-500 mt-1">
                      <span className="flex items-center gap-1"><Clock size={14} /> {selectedItem.duration}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span className="text-green-600">{selectedItem.level}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 sm:top-6 right-4 sm:right-6 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 flex items-center justify-center transition-colors"
                >
                  <XCircle size={20} />
                </button>
              </div>

              <div className="flex-1 flex flex-col">
                <div className="w-full aspect-video bg-slate-900 relative group">
                  {selectedItem.youtubeUrl ? (
                    <iframe 
                      src={selectedItem.youtubeUrl} 
                      title={selectedItem.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <>
                      <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover opacity-50" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-green-600/90 text-white flex items-center justify-center shadow-lg shadow-green-500/30 cursor-pointer hover:scale-110 hover:bg-green-600 transition-all">
                          <Play className="ml-1.5 w-8 h-8 fill-current" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4">
                        <div className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                          <div className="h-full w-1/3 bg-green-500 rounded-full" />
                        </div>
                        <span className="text-xs text-white font-medium font-mono text-shadow">01:23 / {selectedItem.duration}</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <BookOpen size={20} className="text-green-500" /> Lesson Summary
                  </h3>
                  <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed">
                    <p>{selectedItem.content}</p>
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

export default SignLearn;
