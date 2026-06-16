import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, BookOpen, Clock,
  Hand, Play, GraduationCap, XCircle, Keyboard,
  HeartHandshake, Heart, Smile, Frown, Utensils, Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const toolsDataList = [
  { name: 'Hello', tag: 'Greeting', desc: 'Wave your hand gently from side to side to say hello.', image: '/images/signlanguage/hand.png', color: 'bg-green-50 text-green-600', icon: <Hand size={28} />, categories: ['Greetings', 'Daily'] },
  { name: 'Thank You', tag: 'Greeting', desc: 'Touch your chin with fingers, then move hand forward towards the person.', image: '/images/signlanguage/handl.png', color: 'bg-green-50 text-green-600', icon: <HeartHandshake size={28} />, categories: ['Greetings', 'Daily'] },
  { name: 'Mother', tag: 'Family', desc: 'Tap your thumb on your chin with an open hand facing sideways.', image: '/images/signlanguage/hand.png', color: 'bg-green-50 text-green-600', icon: <Users size={28} />, categories: ['Family'] },
  { name: 'Happy', tag: 'Emotion', desc: 'Brush both flat hands upward on your chest to show joy.', image: '/images/signlanguage/thumb.png', color: 'bg-green-50 text-green-600', icon: <Smile size={28} />, categories: ['Emotions'] },
  { name: 'Sorry', tag: 'Greeting', desc: 'Rub a closed fist in a circular motion over your heart.', image: '/images/signlanguage/ghosthand.png', color: 'bg-green-50 text-green-600', icon: <Heart size={28} />, categories: ['Greetings', 'Emotions'] },
  { name: 'Eat', tag: 'Daily', desc: 'Bring your flattened O-hand to your mouth a few times.', image: '/images/signlanguage/hand.png', color: 'bg-green-50 text-green-600', icon: <Utensils size={28} />, categories: ['Daily'] },
  { name: 'Father', tag: 'Family', desc: 'Tap your thumb on your forehead with an open hand facing sideways.', image: '/images/signlanguage/handl.png', color: 'bg-green-50 text-green-600', icon: <Users size={28} />, categories: ['Family'] },
  { name: 'Sad', tag: 'Emotion', desc: 'Place both hands in front of your face and pull them down while making a sad face.', image: '/images/signlanguage/ghosthand.png', color: 'bg-green-50 text-green-600', icon: <Frown size={28} />, categories: ['Emotions'] }
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
        {toolsDataList.map((tool, index) => (
          <div key={tool.name} className="relative w-full aspect-[1.1] group perspective-1000 cursor-pointer">
            <div className="w-full h-full relative preserve-3d transition-transform duration-500 group-hover:rotate-y-180">

              {/* Front of Card */}
              <div className="absolute inset-0 backface-hidden bg-white rounded-[20px] border border-slate-100 p-5 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] group-hover:border-green-200 transition-colors">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl mb-4 bg-green-100 text-green-600`}>
                  {tool.icon ? React.cloneElement(tool.icon, { className: "opacity-80" }) : <span className="font-black opacity-60 text-2xl">{tool.name.charAt(0)}</span>}
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
              <div className="absolute inset-0 backface-hidden rounded-[20px] shadow-lg shadow-green-100/50 transition-all overflow-hidden rotate-y-180 border-2 border-green-200">
                <div
                  className="w-full h-full bg-no-repeat bg-white"
                  style={{
                    backgroundImage: "url('/images/signlanguage/common.png')",
                    backgroundSize: "400% 200%",
                    backgroundPosition: `${(index % 4) * 33.3333}% ${Math.floor(index / 4) * 100}%`
                  }}
                />
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
  const [activeVideo, setActiveVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const signVideos = [
    {
      id: 1,
      title: 'Guideline',
      desc: 'Understand the course guidelines, structure, and objectives of the Basic ISL course.',
      image: 'https://img.youtube.com/vi/5PF6JXzYyUI/hqdefault.jpg',
      duration: '3:29',
      level: 'Beginner',
      content: 'Get started with the Online Basic Indian Sign Language Course in Self Learning Mode. This guideline video introduces the syllabus, course structure, and how to practice effectively.',
      youtubeUrl: 'https://www.youtube.com/embed/5PF6JXzYyUI?autoplay=1'
    },
    {
      id: 2,
      title: 'Module 1.1: Manners and Etiquettes',
      desc: 'Learn basic sign language manners and etiquette for respectful communication.',
      image: 'https://img.youtube.com/vi/n42ohSmbAFI/hqdefault.jpg',
      duration: '7:17',
      level: 'Beginner',
      content: 'This lesson covers manners and etiquettes in Indian Sign Language (ISL), including how to politely address others and maintain appropriate sign language etiquette.',
      youtubeUrl: 'https://www.youtube.com/embed/n42ohSmbAFI?autoplay=1'
    },
    {
      id: 3,
      title: 'Module 1.2: Greeting and Salutations',
      desc: 'Master greetings and salutations to start your ISL conversations.',
      image: 'https://img.youtube.com/vi/5vHmvYA8Z6Q/hqdefault.jpg',
      duration: '2:08',
      level: 'Beginner',
      content: 'Learn signs for everyday greetings and salutations like Hello, Good Morning, Good Evening, and more in Indian Sign Language.',
      youtubeUrl: 'https://www.youtube.com/embed/5vHmvYA8Z6Q?autoplay=1'
    },
    {
      id: 4,
      title: 'Module 1.3: Polite Useful Phrases',
      desc: 'Essential polite phrases for daily sign language interactions.',
      image: 'https://img.youtube.com/vi/neE5Fg4FVtA/hqdefault.jpg',
      duration: '2:30',
      level: 'Beginner',
      content: 'Discover common polite phrases that will help you communicate respect and build rapport in the Deaf community using ISL.',
      youtubeUrl: 'https://www.youtube.com/embed/neE5Fg4FVtA?autoplay=1'
    },
    {
      id: 5,
      title: 'Module 1.4: Quiz',
      desc: 'Practice and test your knowledge on manners, greetings, and polite phrases.',
      image: 'https://img.youtube.com/vi/s-4jpblFYQk/hqdefault.jpg',
      duration: '2:44',
      level: 'Beginner',
      content: 'A quiz covering the content of Module 1. Test your understanding of manners, greetings, and useful polite phrases in Indian Sign Language.',
      youtubeUrl: 'https://www.youtube.com/embed/s-4jpblFYQk?autoplay=1'
    },
    {
      id: 6,
      title: 'Module 2.1: Manual Alphabet',
      desc: 'Learn the complete ISL manual alphabet for fingerspelling.',
      image: 'https://img.youtube.com/vi/0emXzSDO61U/hqdefault.jpg',
      duration: '3:49',
      level: 'Beginner',
      content: 'Fingerspelling is a foundational skill in ISL. In this module, you will learn the signs for letters A through Z to spell names and words.',
      youtubeUrl: 'https://www.youtube.com/embed/0emXzSDO61U?autoplay=1'
    },
    {
      id: 7,
      title: 'Module 2.2: Introducing Oneself',
      desc: 'Learn how to introduce yourself and share basic personal info in ISL.',
      image: 'https://img.youtube.com/vi/mc_NxVJlhi8/hqdefault.jpg',
      duration: '4:49',
      level: 'Beginner',
      content: 'Practice introducing yourself, sharing your name, occupation, location, and other basic details using Indian Sign Language.',
      youtubeUrl: 'https://www.youtube.com/embed/mc_NxVJlhi8?autoplay=1'
    },
    {
      id: 8,
      title: 'Module 2.3: Likes, Dislikes, and Emotions',
      desc: 'Express how you feel and what you like or dislike in ISL.',
      image: 'https://img.youtube.com/vi/N88aAdNtZu4/hqdefault.jpg',
      duration: '1:22',
      level: 'Beginner',
      content: 'Learn signs for basic emotions (happy, sad, angry) and express standard likes and dislikes in Indian Sign Language.',
      youtubeUrl: 'https://www.youtube.com/embed/N88aAdNtZu4?autoplay=1'
    },
    {
      id: 9,
      title: 'Module 2.4: Quiz',
      desc: 'Review and assess your learning of manual alphabet and personal expressions.',
      image: 'https://img.youtube.com/vi/PN-PUV1UTAQ/hqdefault.jpg',
      duration: '1:56',
      level: 'Beginner',
      content: 'A quiz covering the content of Module 2. Review the manual alphabet, self-introductions, and expressing feelings or preferences.',
      youtubeUrl: 'https://www.youtube.com/embed/PN-PUV1UTAQ?autoplay=1'
    },
    {
      id: 10,
      title: 'Module 3.1: People and Relations',
      desc: 'Learn signs for family members and relationships in ISL.',
      image: 'https://img.youtube.com/vi/pBTPi7fG0Gs/hqdefault.jpg',
      duration: '5:18',
      level: 'Beginner',
      content: 'Understand signs for family relationships, including mother, father, siblings, and other relatives in Indian Sign Language.',
      youtubeUrl: 'https://www.youtube.com/embed/pBTPi7fG0Gs?autoplay=1'
    },
    {
      id: 11,
      title: 'Module 3.2: Food Items',
      desc: 'Discover signs for common food, drinks, and meals in ISL.',
      image: 'https://img.youtube.com/vi/TFLz5Antqq4/hqdefault.jpg',
      duration: '3:57',
      level: 'Beginner',
      content: 'Learn vocabulary for daily meals, food items, drinks, and basic cooking/eating terms in Indian Sign Language.',
      youtubeUrl: 'https://www.youtube.com/embed/TFLz5Antqq4?autoplay=1'
    },
    {
      id: 12,
      title: 'Module 3.3: Daily Routine and Everyday Items',
      desc: 'Signs for daily tasks and items you use every day.',
      image: 'https://img.youtube.com/vi/RdAUR8z2mmM/hqdefault.jpg',
      duration: '3:59',
      level: 'Beginner',
      content: 'Expand your vocabulary by learning signs related to your daily routine, activities, and common household items.',
      youtubeUrl: 'https://www.youtube.com/embed/RdAUR8z2mmM?autoplay=1'
    },
    {
      id: 13,
      title: 'Module 3.4: Quiz',
      desc: 'Test your understanding of relationships, food, and daily routine.',
      image: 'https://img.youtube.com/vi/LU5CealXKjk/hqdefault.jpg',
      duration: '2:04',
      level: 'Beginner',
      content: 'A quiz covering the content of Module 3. Assess your learning of family relationships, foods, and daily routines in ISL.',
      youtubeUrl: 'https://www.youtube.com/embed/LU5CealXKjk?autoplay=1'
    },
    {
      id: 14,
      title: 'Module 4.1: Colors, Shapes, and Size of Objects',
      desc: 'Learn signs to describe colors, shapes, and sizes of items.',
      image: 'https://img.youtube.com/vi/1-5lDI6Xwks/hqdefault.jpg',
      duration: '3:17',
      level: 'Intermediate',
      content: 'Learn signs for primary/secondary colors, shapes, and qualifiers like big, small, heavy, or light in Indian Sign Language.',
      youtubeUrl: 'https://www.youtube.com/embed/1-5lDI6Xwks?autoplay=1'
    },
    {
      id: 15,
      title: 'Module 4.2: Number Concept and Money',
      desc: 'Learn numbers, counting, and money signs in ISL.',
      image: 'https://img.youtube.com/vi/1fGEDf7FSXY/hqdefault.jpg',
      duration: '4:46',
      level: 'Intermediate',
      content: 'Master counting from basic numbers to large figures, and understand signs related to money, transactions, and currency in ISL.',
      youtubeUrl: 'https://www.youtube.com/embed/1fGEDf7FSXY?autoplay=1'
    },
    {
      id: 16,
      title: 'Module 4.3: Time and Calendar',
      desc: 'Signs for days, months, and telling time in ISL.',
      image: 'https://img.youtube.com/vi/MCFEXhMbkxU/hqdefault.jpg',
      duration: '6:10',
      level: 'Intermediate',
      content: 'Learn how to sign days of the week, months of the year, telling time, and discussing calendar dates in Indian Sign Language.',
      youtubeUrl: 'https://www.youtube.com/embed/MCFEXhMbkxU?autoplay=1'
    },
    {
      id: 17,
      title: 'Module 4.4: Quiz',
      desc: 'A quiz on descriptions, numbers, money, and time concepts.',
      image: 'https://img.youtube.com/vi/YElPo6Ujqyc/hqdefault.jpg',
      duration: '2:16',
      level: 'Intermediate',
      content: 'Test your understanding of Module 4 content, including descriptive adjectives, number systems, and time-related expressions.',
      youtubeUrl: 'https://www.youtube.com/embed/YElPo6Ujqyc?autoplay=1'
    },
    {
      id: 18,
      title: 'Module 5.1: Simple Sentences and Statements',
      desc: 'Learn how to structure and sign simple statements in ISL.',
      image: 'https://img.youtube.com/vi/6FswHH6wUpI/hqdefault.jpg',
      duration: '5:19',
      level: 'Intermediate',
      content: 'This module covers the grammar of forming simple declarative sentences and basic statements in Indian Sign Language.',
      youtubeUrl: 'https://www.youtube.com/embed/6FswHH6wUpI?autoplay=1'
    },
    {
      id: 19,
      title: 'Module 5.2: Simple Questions',
      desc: 'Construct and sign simple questions using correct facial grammar.',
      image: 'https://img.youtube.com/vi/s812LFXz31E/hqdefault.jpg',
      duration: '2:49',
      level: 'Intermediate',
      content: 'Learn how to ask standard WH-questions and yes/no questions, emphasizing the crucial role of facial expressions in question grammar.',
      youtubeUrl: 'https://www.youtube.com/embed/s812LFXz31E?autoplay=1'
    },
    {
      id: 20,
      title: 'Module 5.3: Simple Negative Sentences',
      desc: 'Express negation and negative statements in ISL.',
      image: 'https://img.youtube.com/vi/jOB1gKI9iJ8/hqdefault.jpg',
      duration: '4:43',
      level: 'Intermediate',
      content: 'Learn how to form and sign negative statements, incorporating headshakes and negative sign markers in ISL.',
      youtubeUrl: 'https://www.youtube.com/embed/jOB1gKI9iJ8?autoplay=1'
    },
    {
      id: 21,
      title: 'Module 5.4: Quiz',
      desc: 'Quiz covering basic sentence structures and questions.',
      image: 'https://img.youtube.com/vi/s7AN4AyNc40/hqdefault.jpg',
      duration: '2:22',
      level: 'Intermediate',
      content: 'A quiz covering the content of Module 5. Review sentence formulation, questioning, and negation in Indian Sign Language.',
      youtubeUrl: 'https://www.youtube.com/embed/s7AN4AyNc40?autoplay=1'
    },
    {
      id: 22,
      title: 'Module 6.1: Fruits and Vegetables',
      desc: 'Learn vocabulary for fruits and vegetables in ISL.',
      image: 'https://img.youtube.com/vi/srmpYnQ4DGM/hqdefault.jpg',
      duration: '5:34',
      level: 'Intermediate',
      content: 'Learn specific signs for common fruits and vegetables, building your vocabulary for food and shopping in Indian Sign Language.',
      youtubeUrl: 'https://www.youtube.com/embed/srmpYnQ4DGM?autoplay=1'
    },
    {
      id: 23,
      title: 'Module 6.2: Birds and Animals',
      desc: 'Learn signs for domestic and wild animals and birds.',
      image: 'https://img.youtube.com/vi/TUs4C5VTUxI/hqdefault.jpg',
      duration: '3:06',
      level: 'Intermediate',
      content: 'Discover visual signs for common birds, domestic animals, wild beasts, and insects in Indian Sign Language.',
      youtubeUrl: 'https://www.youtube.com/embed/TUs4C5VTUxI?autoplay=1'
    },
    {
      id: 24,
      title: 'Module 6.3: School Related Terms',
      desc: 'Vocabulary for classroom items, school subjects, and roles.',
      image: 'https://img.youtube.com/vi/-asOc3_nEzE/hqdefault.jpg',
      duration: '3:37',
      level: 'Intermediate',
      content: 'Learn school-related vocabulary including subjects, classroom materials, and school roles in Indian Sign Language.',
      youtubeUrl: 'https://www.youtube.com/embed/-asOc3_nEzE?autoplay=1'
    },
    {
      id: 25,
      title: 'Module 6.4: Quiz',
      desc: 'Test your vocabulary on food, animals, and school items.',
      image: 'https://img.youtube.com/vi/ls5UctW74j8/hqdefault.jpg',
      duration: '2:15',
      level: 'Intermediate',
      content: 'A quiz covering the content of Module 6. Check your retention of fruits, vegetables, animals, and academic terms in ISL.',
      youtubeUrl: 'https://www.youtube.com/embed/ls5UctW74j8?autoplay=1'
    },
    {
      id: 26,
      title: 'Module 7.1: Health and Names of Diseases',
      desc: 'Learn signs for health, medical issues, and diseases.',
      image: 'https://img.youtube.com/vi/dMq2-nhVE6A/hqdefault.jpg',
      duration: '3:41',
      level: 'Intermediate',
      content: 'This lesson covers healthcare terms, symptoms, doctor interactions, and names of common diseases in Indian Sign Language.',
      youtubeUrl: 'https://www.youtube.com/embed/dMq2-nhVE6A?autoplay=1'
    },
    {
      id: 27,
      title: 'Module 7.2: Job and Professions',
      desc: 'Signs for various professions, occupations, and jobs.',
      image: 'https://img.youtube.com/vi/higjcR7-1dg/hqdefault.jpg',
      duration: '4:34',
      level: 'Intermediate',
      content: 'Learn signs for different careers and lines of work (e.g., teacher, doctor, engineer, police) in Indian Sign Language.',
      youtubeUrl: 'https://www.youtube.com/embed/higjcR7-1dg?autoplay=1'
    },
    {
      id: 28,
      title: 'Module 7.3: Means of Transportation',
      desc: 'Discover signs for vehicles, travel, and transportation.',
      image: 'https://img.youtube.com/vi/PVUqiQcTjTw/hqdefault.jpg',
      duration: '4:04',
      level: 'Intermediate',
      content: 'Learn signs for transportation types (bus, train, plane, car) and travel-related vocabulary in Indian Sign Language.',
      youtubeUrl: 'https://www.youtube.com/embed/PVUqiQcTjTw?autoplay=1'
    },
    {
      id: 29,
      title: 'Module 7.4: Quiz',
      desc: 'Quiz covering health, occupations, and transportation.',
      image: 'https://img.youtube.com/vi/R_zbw1Xq16M/hqdefault.jpg',
      duration: '2:07',
      level: 'Intermediate',
      content: 'A quiz covering the content of Module 7. Practice and test your recall of health terms, careers, and transport signs.',
      youtubeUrl: 'https://www.youtube.com/embed/R_zbw1Xq16M?autoplay=1'
    },
    {
      id: 30,
      title: 'Module 8.1: Festivals and Celebrations',
      desc: 'Learn signs for national festivals, holidays, and celebrations.',
      image: 'https://img.youtube.com/vi/SzkdC5-KUtc/hqdefault.jpg',
      duration: '2:46',
      level: 'Advanced',
      content: 'Discover signs for major Indian festivals (Diwali, Eid, Christmas) and common celebration terms in Indian Sign Language.',
      youtubeUrl: 'https://www.youtube.com/embed/SzkdC5-KUtc?autoplay=1'
    },
    {
      id: 31,
      title: 'Module 8.2: Famous Places and Languages',
      desc: 'Signs for Indian landmarks and regional languages.',
      image: 'https://img.youtube.com/vi/UsgXG15T35k/hqdefault.jpg',
      duration: '2:29',
      level: 'Advanced',
      content: 'Learn how to sign famous historical and tourist destinations in India, along with regional languages in ISL.',
      youtubeUrl: 'https://www.youtube.com/embed/UsgXG15T35k?autoplay=1'
    },
    {
      id: 32,
      title: 'Module 8.3: Country and States of India',
      desc: 'Signs for different countries and Indian states.',
      image: 'https://img.youtube.com/vi/A-glx15JuWE/hqdefault.jpg',
      duration: '3:29',
      level: 'Advanced',
      content: 'Practice signing the names of various countries, Indian states, union territories, and geographical locations in ISL.',
      youtubeUrl: 'https://www.youtube.com/embed/A-glx15JuWE?autoplay=1'
    },
    {
      id: 33,
      title: 'Module 8.4: Quiz',
      desc: 'Test your advanced knowledge of festivals, places, and states.',
      image: 'https://img.youtube.com/vi/8GJ_jkh1fqM/hqdefault.jpg',
      duration: '2:04',
      level: 'Advanced',
      content: 'A quiz covering the content of Module 8. Evaluate your understanding of signs for celebrations, landmarks, and geography in ISL.',
      youtubeUrl: 'https://www.youtube.com/embed/8GJ_jkh1fqM?autoplay=1'
    },
    {
      id: 34,
      title: 'Module 9.1: Games and Sports',
      desc: 'Vocabulary for popular sports and recreational activities.',
      image: 'https://img.youtube.com/vi/Ua_VvaTpcCg/hqdefault.jpg',
      duration: '3:52',
      level: 'Advanced',
      content: 'Learn signs for sports like cricket, football, chess, and other outdoor and indoor athletic games in Indian Sign Language.',
      youtubeUrl: 'https://www.youtube.com/embed/Ua_VvaTpcCg?autoplay=1'
    },
    {
      id: 35,
      title: 'Module 9.2: Weather and Climate',
      desc: 'Learn weather conditions, seasons, and climate signs.',
      image: 'https://img.youtube.com/vi/SffwKp1cPUQ/hqdefault.jpg',
      duration: '1:43',
      level: 'Advanced',
      content: 'Practice signs for weather states (rain, sun, wind, snow) and seasonal names (summer, winter, monsoon) in ISL.',
      youtubeUrl: 'https://www.youtube.com/embed/SffwKp1cPUQ?autoplay=1'
    },
    {
      id: 36,
      title: 'Module 9.3: Action Words',
      desc: 'Master standard action verbs and dynamic signs in ISL.',
      image: 'https://img.youtube.com/vi/AtCr2PYk5fQ/hqdefault.jpg',
      duration: '4:23',
      level: 'Advanced',
      content: 'Learn crucial action verbs (run, eat, think, write, walk) to make your ISL communication more dynamic and expressive.',
      youtubeUrl: 'https://www.youtube.com/embed/AtCr2PYk5fQ?autoplay=1'
    },
    {
      id: 37,
      title: 'Module 9.4: Quiz',
      desc: 'Quiz on sports, weather terms, and action verbs.',
      image: 'https://img.youtube.com/vi/zSnDtqlngic/hqdefault.jpg',
      duration: '2:04',
      level: 'Advanced',
      content: 'A quiz covering the content of Module 9. Review signs for games, weather variations, and essential verbs in Indian Sign Language.',
      youtubeUrl: 'https://www.youtube.com/embed/zSnDtqlngic?autoplay=1'
    },
    {
      id: 38,
      title: 'Module 10.1: Conversation Between Mother and Daughter',
      desc: 'Practice family conversation scenarios in ISL.',
      image: 'https://img.youtube.com/vi/xyfCxBxtkNg/hqdefault.jpg',
      duration: '2:14',
      level: 'Advanced',
      content: 'Watch and learn from a situational conversation between a mother and daughter, highlighting colloquial family expressions in ISL.',
      youtubeUrl: 'https://www.youtube.com/embed/xyfCxBxtkNg?autoplay=1'
    },
    {
      id: 39,
      title: 'Module 10.2: Conversation Between Teacher and Student',
      desc: 'Study educational and school conversational scenarios.',
      image: 'https://img.youtube.com/vi/jD6x6mp8y3Q/hqdefault.jpg',
      duration: '1:50',
      level: 'Advanced',
      content: 'Observe dialogue patterns between a teacher and student in an academic context, practicing common questions and responses.',
      youtubeUrl: 'https://www.youtube.com/embed/jD6x6mp8y3Q?autoplay=1'
    },
    {
      id: 40,
      title: 'Module 10.3: Conversation Between Doctor and Patient',
      desc: 'Learn medical consultations and health conversations.',
      image: 'https://img.youtube.com/vi/FUE2HWmUIS8/hqdefault.jpg',
      duration: '2:48',
      level: 'Advanced',
      content: 'Observe standard communication between a doctor and patient in Indian Sign Language, useful for describing symptoms and medical advice.',
      youtubeUrl: 'https://www.youtube.com/embed/FUE2HWmUIS8?autoplay=1'
    },
    {
      id: 41,
      title: 'Module 10.4: Quiz',
      desc: 'Final comprehensive quiz on conversational scenarios.',
      image: 'https://img.youtube.com/vi/FriJx9jk-eE/hqdefault.jpg',
      duration: '1:44',
      level: 'Advanced',
      content: 'A quiz covering the content of Module 10. Test your comprehension and synthesis of conversational scenarios in Indian Sign Language.',
      youtubeUrl: 'https://www.youtube.com/embed/FriJx9jk-eE?autoplay=1'
    }
  ];

  const quickStats = [
    { label: 'Learn ISL', value: 'Video Lectures', icon: <BookOpen className="text-emerald-600" />, color: 'bg-emerald-50' },
    { label: 'Explore Signs', value: 'Visual library', icon: <Hand className="text-blue-600" />, color: 'bg-blue-50' },
    { label: 'Type to Sign', value: 'Fingerspell Translator', icon: <Keyboard className="text-purple-600" />, color: 'bg-purple-50' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex font-sans text-slate-900 overflow-x-hidden">
      <link rel="preconnect" href="https://www.youtube-nocookie.com" />
      <link rel="preconnect" href="https://img.youtube.com" />
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
                      if (target) target.scrollIntoView({ behavior: 'smooth' });
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
                      <div key={video.id} onClick={() => { setActiveVideo(video); setIsModalOpen(true); }} className="bg-white rounded-[20px] overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group">
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
      <div
        className={`fixed inset-0 z-50 flex p-4 sm:p-6 overflow-y-auto transition-all duration-300 ${isModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsModalOpen(false)}
        />
        <div
          className={`relative w-full max-w-3xl bg-white rounded-[24px] overflow-hidden shadow-2xl z-10 flex flex-col m-auto h-auto transition-all duration-300 transform ${isModalOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
            }`}
        >
          {activeVideo && (
            <>
              <div className="p-3 sm:p-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                    <Play size={16} className="fill-current" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight pr-8">{activeVideo.title}</h2>
                    <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500 mt-0.5">
                      <span className="flex items-center gap-1"><Clock size={12} /> {activeVideo.duration}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span className="text-green-600">{activeVideo.level}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 flex items-center justify-center transition-colors"
                >
                  <XCircle size={18} />
                </button>
              </div>

              <div className="flex-1 flex flex-col">
                <div className="w-full aspect-video bg-slate-900 relative group">
                  <iframe
                    src={isModalOpen ? activeVideo.youtubeUrl.replace('youtube.com', 'youtube-nocookie.com') : ''}
                    title={activeVideo.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                <div className="p-5 sm:p-6 max-h-[200px] overflow-y-auto">
                  <h3 className="text-[15px] sm:text-[16px] font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <BookOpen size={18} className="text-green-500" /> Lesson Summary
                  </h3>
                  <div className="prose prose-slate max-w-none text-slate-600 text-[13px] sm:text-[15px] leading-relaxed">
                    <p>{activeVideo.content}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignLearn;
