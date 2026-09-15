import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, BookOpen, Clock,
  Hand, Play, GraduationCap, XCircle, Keyboard,
  HeartHandshake, Heart, Smile, Frown, Utensils, Users, ChevronRight,
  ExternalLink, Search, Landmark, Video
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const getToolsDataList = (t) => [
  { name: t('signLearn.tools_hello_name', 'Hello'), tag: t('signLearn.tools_hello_tag', 'Greeting'), desc: t('signLearn.tools_hello_desc', 'Wave your hand gently from side to side to say hello.'), image: '/images/signlanguage/hello.webp', color: 'bg-slate-50 text-slate-600', icon: <Hand size={28} />, categories: ['Greetings', 'Daily'] },
  { name: t('signLearn.tools_thankyou_name', 'Thank You'), tag: t('signLearn.tools_thankyou_tag', 'Greeting'), desc: t('signLearn.tools_thankyou_desc', 'Touch your chin with fingers, then move hand forward towards the person.'), image: '/images/signlanguage/thankyou.webp', color: 'bg-slate-50 text-slate-600', icon: <HeartHandshake size={28} />, categories: ['Greetings', 'Daily'] },
  { name: t('signLearn.tools_mother_name', 'Mother'), tag: t('signLearn.tools_mother_tag', 'Family'), desc: t('signLearn.tools_mother_desc', 'Tap your thumb on your chin with an open hand facing sideways.'), image: '/images/signlanguage/mother.webp', color: 'bg-slate-50 text-slate-600', icon: <Users size={28} />, categories: ['Family'] },
  { name: t('signLearn.tools_happy_name', 'Happy'), tag: t('signLearn.tools_happy_tag', 'Emotion'), desc: t('signLearn.tools_happy_desc', 'Brush both flat hands upward on your chest to show joy.'), image: '/images/signlanguage/happy.webp', color: 'bg-slate-50 text-slate-600', icon: <Smile size={28} />, categories: ['Emotions'] },
  { name: t('signLearn.tools_sorry_name', 'Sorry'), tag: t('signLearn.tools_sorry_tag', 'Greeting'), desc: t('signLearn.tools_sorry_desc', 'Rub a closed fist in a circular motion over your heart.'), image: '/images/signlanguage/sorry.webp', color: 'bg-slate-50 text-slate-600', icon: <Heart size={28} />, categories: ['Greetings', 'Emotions'] },
  { name: t('signLearn.tools_eat_name', 'Eat'), tag: t('signLearn.tools_eat_tag', 'Daily'), desc: t('signLearn.tools_eat_desc', 'Bring your flattened O-hand to your mouth a few times.'), image: '/images/signlanguage/eat.webp', color: 'bg-slate-50 text-slate-600', icon: <Utensils size={28} />, categories: ['Daily'] },
  { name: t('signLearn.tools_father_name', 'Father'), tag: t('signLearn.tools_father_tag', 'Family'), desc: t('signLearn.tools_father_desc', 'Tap your thumb on your forehead with an open hand facing sideways.'), image: '/images/signlanguage/father.webp', color: 'bg-slate-50 text-slate-600', icon: <Users size={28} />, categories: ['Family'] },
  { name: t('signLearn.tools_sad_name', 'Sad'), tag: t('signLearn.tools_sad_tag', 'Emotion'), desc: t('signLearn.tools_sad_desc', 'Place both hands in front of your face and pull them down while making a sad face.'), image: '/images/signlanguage/sad.webp', color: 'bg-slate-50 text-slate-600', icon: <Frown size={28} />, categories: ['Emotions'] }
];

const ExploreSignsComponent = () => {
  const { t } = useTranslation();
  const [selectedGif, setSelectedGif] = useState(null);

  useEffect(() => {
    if (selectedGif) {
      document.body.style.overflow = 'hidden';
      document.documentElement.classList.add('lenis-stopped');
    } else {
      document.body.style.overflow = '';
      document.documentElement.classList.remove('lenis-stopped');
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.classList.remove('lenis-stopped');
    };
  }, [selectedGif]);

  return (
    <div className="bg-white rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8 relative">
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>



      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {getToolsDataList(t).map((tool, index) => (
          <div
            key={tool.name}
            onClick={() => setSelectedGif(tool)}
            className="relative w-full aspect-[1.1] group perspective-1000 cursor-pointer"
          >
            <div className="w-full h-full relative preserve-3d transition-transform duration-500 group-hover:rotate-y-180">

              {/* Front of Card */}
              <div className="absolute inset-0 backface-hidden bg-white rounded-[20px] border border-slate-100 p-5 flex flex-col items-center justify-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] group-hover:border-slate-200 transition-colors">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl mb-4 bg-teal-100 text-teal-600 mx-auto shrink-0">
                  {tool.icon ? React.cloneElement(tool.icon, { className: "opacity-80" }) : <span className="font-black opacity-60 text-2xl">{tool.name.charAt(0)}</span>}
                </div>
                <h4 className="text-lg font-extrabold text-slate-700 leading-tight">{tool.name}</h4>
                <p className="text-[11px] text-slate-500 mt-3 line-clamp-2 font-medium">{tool.desc}</p>
                <div className="mt-auto text-[9px] text-slate-600 font-bold uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-full w-full">
                  {t('signLearn.hoverToFlip', 'Hover to flip')}
                </div>
              </div>

              {/* Back of Card */}
              <div className="absolute inset-0 backface-hidden rounded-[20px] shadow-lg shadow-slate-100/50 transition-all overflow-hidden rotate-y-180 border-2 border-slate-200 bg-white flex flex-col items-center justify-center p-4">
                <div className="w-full h-[60%] flex items-center justify-center relative">
                  <img loading="lazy" decoding="async"
                    src={tool.image}
                    alt={`Sign for ${tool.name}`}
                    className="max-w-full max-h-full object-contain mix-blend-multiply drop-shadow-sm"
                  />
                </div>
                <span className="text-[11px] font-black text-slate-700 bg-slate-50 px-3 py-1 rounded-full uppercase tracking-wider mt-2">
                  {tool.name}
                </span>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">
                  {t('signLearn.clickToPlay', 'Click to play GIF')}
                </span>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* GIF Animation Modal */}
      <AnimatePresence>
        {selectedGif && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
            onClick={() => setSelectedGif(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[32px] p-8 max-w-sm w-full relative flex flex-col items-center shadow-2xl border border-slate-100"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedGif(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 bg-slate-100 hover:bg-rose-50 rounded-full p-2 transition-colors cursor-pointer"
              >
                <XCircle size={24} />
              </button>

              <span className="text-[10px] font-black text-teal-600 bg-teal-50 px-3 py-1 rounded-full uppercase tracking-wider mb-2 mt-2">
                {t('signLearn.signAnimation', 'Sign Animation')}
              </span>
              <h4 className="text-3xl font-black text-slate-900 mb-6">{selectedGif.name}</h4>

              <div className="w-56 h-56 bg-slate-50 rounded-[24px] border-2 border-slate-100 flex items-center justify-center p-4 mb-6 shadow-inner relative overflow-hidden">
                <img loading="lazy" decoding="async"
                  src={`/explore sign/${selectedGif.image.split('/').pop().replace(/\.[^/.]+$/, '')}.gif`}
                  onError={(e) => { e.target.onerror = null; e.target.src = selectedGif.image; }}
                  alt={`Sign animation for ${selectedGif.name}`}
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>

              <p className="text-slate-500 text-center font-medium leading-relaxed mb-6 px-4">
                {selectedGif.desc}
              </p>

              <button
                onClick={() => setSelectedGif(null)}
                className="w-full py-3.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm transition-colors shadow-md shadow-teal-500/20 cursor-pointer"
              >
                {t('signLearn.gotIt', 'Got it!')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const getDictionary = (t) => [
  { word: t('signLearn.dict_hello_word', 'HELLO'), image: '/images/signlanguage/hello.webp', desc: t('signLearn.dict_hello_desc', 'Wave your hand gently from side to side to say hello.') },
  { word: t('signLearn.dict_thankyou_word', 'THANK YOU'), image: '/images/signlanguage/thankyou.webp', desc: t('signLearn.dict_thankyou_desc', 'Touch your chin with fingers, then move hand forward towards the person.') },
  { word: t('signLearn.dict_sorry_word', 'SORRY'), image: '/images/signlanguage/sorry.webp', desc: t('signLearn.dict_sorry_desc', 'Rub a closed fist in a circular motion over your heart.') },
  { word: t('signLearn.dict_happy_word', 'HAPPY'), image: '/images/signlanguage/happy.webp', desc: t('signLearn.dict_happy_desc', 'Brush both flat hands upward on your chest to show joy.') },
  { word: t('signLearn.dict_sad_word', 'SAD'), image: '/images/signlanguage/sad.webp', desc: t('signLearn.dict_sad_desc', 'Place both hands in front of your face and pull them down while making a sad face.') },
  { word: t('signLearn.dict_mother_word', 'MOTHER'), image: '/images/signlanguage/mother.webp', desc: t('signLearn.dict_mother_desc', 'Tap your thumb on your chin with an open hand facing sideways.') },
  { word: t('signLearn.dict_father_word', 'FATHER'), image: '/images/signlanguage/father.webp', desc: t('signLearn.dict_father_desc', 'Tap your thumb on your forehead with an open hand facing sideways.') },
  { word: t('signLearn.dict_eat_word', 'EAT'), image: '/images/signlanguage/eat.webp', desc: t('signLearn.dict_eat_desc', 'Bring your flattened O-hand to your mouth a few times.') },
  { word: t('signLearn.dict_goodmorning_word', 'GOOD MORNING'), image: '/images/signlanguage/goodmorning.webp', desc: t('signLearn.dict_goodmorning_desc', 'Make a thumbs-up sign, then bring your hands up in a rising sun motion.') },
  { word: t('signLearn.dict_goodafternoon_word', 'GOOD AFTERNOON'), image: '/images/signlanguage/goodafternoon.webp', desc: t('signLearn.dict_goodafternoon_desc', 'Make a thumbs-up sign, then place one hand flat with the other pointing down at it.') },
  { word: t('signLearn.dict_goodevening_word', 'GOOD EVENING'), image: '/images/signlanguage/goodevening.webp', desc: t('signLearn.dict_goodevening_desc', 'Make a thumbs-up sign, then cover one hand over the other in a setting sun motion.') },
  { word: t('signLearn.dict_goodnight_word', 'GOOD NIGHT'), image: '/images/signlanguage/goodnight.webp', desc: t('signLearn.dict_goodnight_desc', 'Make a thumbs-up sign, then close your eyes and lay your head on folded hands.') },
  { word: t('signLearn.dict_welcome_word', 'WELCOME'), image: '/images/signlanguage/welcome.webp', desc: t('signLearn.dict_welcome_desc', 'Bring both hands towards your chest in a welcoming motion.') },
  { word: t('signLearn.dict_please_word', 'PLEASE'), image: '/images/signlanguage/please.webp', desc: t('signLearn.dict_please_desc', 'Place your flat palm on your chest and move it in a circular motion.') },
  { word: 'YES', image: '/images/signlanguage/yes.webp', desc: 'Make a fist and nod it up and down like a head nodding yes.' },
  { word: 'NO', image: '/images/signlanguage/no.webp', desc: 'Extend your index and middle fingers and tap them against your thumb.' },
  { word: 'HELP', image: '/images/signlanguage/help.webp', desc: 'Place your closed fist with thumb up on top of your flat open palm.' },
  { word: 'PLAY', image: '/images/signlanguage/play.webp', desc: 'Extend your thumb and pinky fingers, then shake your hands gently.' },
  { word: 'SCHOOL', image: '/images/signlanguage/school.webp', desc: 'Clap your flat hands together twice horizontally.' },
  { word: 'TEACHER', image: '/images/signlanguage/teacher.webp', desc: 'Bring your fingertips to your forehead and move them forward twice.' },
  { word: 'STUDENT', image: '/images/signlanguage/student.webp', desc: 'Touch your forehead with fingertips, then mimic holding a book.' },
  { word: 'FRIEND', image: '/images/signlanguage/friend.webp', desc: 'Clasp your hands together in an interlocking hook gesture.' },
  { word: 'FAMILY', image: '/images/signlanguage/family.webp', desc: 'Form circles with thumb and index fingers of both hands, touching them, then circle outwards.' },
  { word: 'HOME', image: '/images/signlanguage/home.webp', desc: 'Touch your flat palms together overhead to form a roof shape.' },
  { word: 'BOOK', image: '/images/signlanguage/book.webp', desc: 'Place palms together, then open them up like opening a book.' },
  { word: 'WATER', image: '/images/signlanguage/water.webp', desc: 'Form a \'W\' shape with index, middle, and ring fingers and touch it to your chin.' },
  { word: 'FOOD', image: '/images/signlanguage/food.webp', desc: 'Bring fingertips of your hand to your mouth repeatedly.' },
  { word: 'DRINK', image: '/images/signlanguage/drink.webp', desc: 'Mimic holding a cup and tipping it towards your mouth.' },
  { word: 'MORE', image: '/images/signlanguage/more.webp', desc: 'Bring your fingertips of both hands together to touch repeatedly.' },
  { word: 'SLEEP', image: '/images/signlanguage/sleep.webp', desc: 'Place both hands together beside your cheek, tilting your head.' },
  { word: 'BATH', image: '/images/signlanguage/bath.webp', desc: 'Rub both closed fists up and down your chest.' },
  { word: 'TOILET', image: '/images/signlanguage/toilet.webp', desc: 'Shake your closed fist with the thumb tucked under the index finger.' },
  { word: 'COME', image: '/images/signlanguage/come.webp', desc: 'Beckon forward with your palm facing upwards.' },
  { word: 'GO', image: '/images/signlanguage/go.webp', desc: 'Point your index finger in the direction you want to go.' },
  { word: 'STOP', image: '/images/signlanguage/stop.webp', desc: 'Extend one hand flat, palm facing forward, in a blocking motion.' },
  { word: 'TODAY', image: '/images/signlanguage/today.webp', desc: 'Bring both hands in \'Y\' shape (thumb and pinky extended) downward twice.' },
  { word: 'TOMORROW', image: '/images/signlanguage/tomorrow.webp', desc: 'Place your thumb on your cheek and flick it forward.' },
  { word: 'YESTERDAY', image: '/images/signlanguage/yesterday.webp', desc: 'Touch your chin with your index finger, then point backward over your shoulder.' },
  { word: 'TIME', image: '/images/signlanguage/time.webp', desc: 'Tap your index finger on your opposite wrist, as if pointing to a watch.' },
  { word: 'NAME', image: '/images/signlanguage/name.webp', desc: 'Touch your index and middle fingers to your forehead, then point forward.' },
  { word: 'AGE', image: '/images/signlanguage/age.webp', desc: 'Place your hand at your chin and pull downward as if showing a beard.' },
  { word: 'HOT', image: '/images/signlanguage/hot.webp', desc: 'Place a clawed hand near your mouth, then quickly turn it away and open it.' },
  { word: 'COLD', image: '/images/signlanguage/cold.webp', desc: 'Hug yourself and shiver slightly with closed fists.' },
  { word: 'BIG', image: '/images/signlanguage/big.webp', desc: 'Hold both flat hands in front of you, then pull them far apart.' },
  { word: 'SMALL', image: '/images/signlanguage/small.webp', desc: 'Hold your index finger and thumb close together to show a tiny gap.' },
  { word: 'LOVE', image: '/images/signlanguage/love.webp', desc: 'Cross both arms over your chest, placing hands on opposite shoulders.' },
  { word: 'ANGRY', image: '/images/signlanguage/angry.webp', desc: 'Bring a clawed hand in front of your face with a frowning expression.' },
  { word: 'LAUGH', image: '/images/signlanguage/laugh.webp', desc: 'Point both index fingers towards your mouth and smile widely.' },
  { word: 'CRY', image: '/images/signlanguage/cry.webp', desc: 'Trace your index fingers down your cheeks to mimic tears falling.' },
  { word: 'CLEAN', image: '/images/signlanguage/clean.webp', desc: 'Slide the palm of your dominant hand across the palm of your other hand.' },
  { word: 'DIRTY', image: '/images/signlanguage/dirty.webp', desc: 'Place the back of your hand under your chin and wiggle your fingers.' },
  { word: 'SUN', image: '/images/signlanguage/sun.webp', desc: 'Draw a circle in the air with your index finger, then open your fingers wide like rays.' },
  { word: 'MOON', image: '/images/signlanguage/moon.webp', desc: 'Form a \'C\' shape with index finger and thumb, then hold it up near your eye.' },
  { word: 'STAR', image: '/images/signlanguage/star.webp', desc: 'Point your index fingers upward alternately towards the sky.' },
  { word: 'RAIN', image: '/images/signlanguage/rain.webp', desc: 'Bring both open hands downward from head level while wiggling all fingers.' },
  { word: 'WIND', image: '/images/signlanguage/wind.webp', desc: 'Wave both flat hands back and forth in front of your face.' },
  { word: 'RUN', image: '/images/signlanguage/run.webp', desc: 'Hook the index finger of one hand onto the thumb of the other, and move both forward.' },
  { word: 'WALK', image: '/images/signlanguage/walk.webp', desc: 'Mimic two legs walking by moving your flat hands back and forth.' },
  { word: 'WRITE', image: '/images/signlanguage/write.webp', desc: 'Mimic writing with a pen on the open palm of your other hand.' },
  { word: 'READ', image: '/images/signlanguage/read.webp', desc: 'Move your index and middle fingers down your open palm like scanning a page.' },
  { word: 'HAPPY NEW YEAR', image: '/images/signlanguage/happynewyear.webp', desc: 'Brush hands upward on your chest, then raise flat hands forward.' }
];

const FingerspellComponent = () => {
  const { t } = useTranslation();
  const dictionary = getDictionary(t);
  const [text, setText] = useState('HELLO');
  const [zoomedChar, setZoomedChar] = useState(null);
  const [selectedWordSign, setSelectedWordSign] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showDictionary, setShowDictionary] = useState(false);
  const [previewGif, setPreviewGif] = useState(null);

  useEffect(() => {
    if (showDictionary || previewGif) {
      document.body.style.overflow = 'hidden';
      document.documentElement.classList.add('lenis-stopped');
    } else {
      document.body.style.overflow = '';
      document.documentElement.classList.remove('lenis-stopped');
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.classList.remove('lenis-stopped');
    };
  }, [showDictionary, previewGif]);

  // Manual scroll state for dictionary list
  const listRef = useRef(null);
  const [isDraggingList, setIsDraggingList] = useState(false);
  const dragStartYRef = useRef(0);
  const dragStartScrollTopRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const handleListPointerDown = (e) => {
    if (!listRef.current) return;
    hasDraggedRef.current = false;
    setIsDraggingList(true);
    dragStartYRef.current = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;
    dragStartScrollTopRef.current = listRef.current.scrollTop;
    if (e.pointerId) listRef.current.setPointerCapture(e.pointerId);
  };

  const handleListPointerMove = (e) => {
    if (!isDraggingList || !listRef.current) return;
    const currentY = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;
    const deltaY = dragStartYRef.current - currentY;
    if (Math.abs(deltaY) > 5) {
      hasDraggedRef.current = true;
    }
    listRef.current.scrollTop = dragStartScrollTopRef.current + deltaY;
  };

  const handleListPointerUp = (e) => {
    if (isDraggingList && listRef.current && e.pointerId) {
      try { listRef.current.releasePointerCapture(e.pointerId); } catch(err) {}
    }
    setIsDraggingList(false);
  };

  const handleInputChange = (val) => {
    const uppercaseVal = val.toUpperCase().replace(/[^A-Z ]/g, '');
    setText(uppercaseVal);
    setIsFocused(true);
    if (selectedWordSign && uppercaseVal !== selectedWordSign.word) {
      setSelectedWordSign(null);
    }
  };

  const selectWord = (item) => {
    setText(item.word);
    setSelectedWordSign(item);
    setIsFocused(false);
  };

  const suggestions = isFocused && text.trim() && (!selectedWordSign || text !== selectedWordSign.word)
    ? dictionary.filter(item => item.word.includes(text.toUpperCase()))
    : [];

  return (
    <div className="w-full bg-white rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-12 flex flex-col items-center text-center relative overflow-hidden min-h-[400px]">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url('/images/signlanguage/rhs.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }} />

      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mb-6 shadow-inner">
          <Keyboard size={32} />
        </div>

        <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-3 tracking-tight">{t('signLearn.typeToSign', 'Type to Sign')}</h3>
        <p className="text-[15px] font-medium text-slate-500 mb-10 max-w-md">
          Type your name or any English word to instantly see how to spell it using sign language alphabet (Fingerspelling).
        </p>

        <div className="w-full relative mb-12">
          <input
            type="text"
            value={text}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            maxLength={15}
            placeholder={t('signLearn.typeWord', 'TYPE A WORD...')}
            className="w-full px-8 py-5 rounded-full bg-white border-2 border-slate-200 text-center text-2xl font-black text-slate-800 placeholder-slate-300 focus:outline-none focus:border-teal-500 focus:ring-4 ring-teal-100 transition-all tracking-[0.2em] shadow-sm"
          />
          <div className="absolute -bottom-7 left-0 right-0 flex justify-between items-center px-4">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Max 15 characters
            </div>
            <button 
              onClick={() => setShowDictionary(true)}
              className="text-[10px] font-bold text-teal-600 uppercase tracking-widest flex items-center gap-1 hover:text-teal-700 cursor-pointer transition-colors bg-teal-50 px-3 py-1 rounded-full"
            >
              <BookOpen size={12} /> {t('signLearn.dictionaryList', 'Dictionary List')}
            </button>
          </div>

          {/* Autocomplete Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-[20px] border border-slate-100 shadow-xl z-30 max-h-60 overflow-y-auto p-2">
              {suggestions.map(item => (
                <div
                  key={item.word}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    selectWord(item);
                  }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-teal-50 rounded-[14px] cursor-pointer text-left transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center shrink-0 font-bold text-[10px]">
                    ISL
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-bold text-slate-800 group-hover:text-teal-600 transition-colors">{item.word}</span>
                    <p className="text-[10px] text-slate-400 truncate">{item.desc}</p>
                  </div>
                  <ChevronRight size={14} className="text-slate-300 group-hover:text-teal-500 group-hover:translate-x-0.5 transition-all" />
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedWordSign ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md bg-white rounded-[24px] border-2 border-teal-500/20 p-6 flex flex-col items-center text-center shadow-lg relative overflow-hidden"
          >
            {/* Decorative background circle */}
            <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-teal-50/50 -z-10" />
            <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-purple-50/50 -z-10" />

            <span className="text-[10px] font-black text-teal-600 bg-teal-50 px-3 py-1 rounded-full uppercase tracking-wider mb-4">
              Whole Word Sign
            </span>

            <h4 className="text-xl font-black text-slate-900 mb-4">{selectedWordSign.word}</h4>

            <div
              onClick={() => setPreviewGif(selectedWordSign)}
              className="w-56 h-56 bg-slate-50 rounded-[20px] border border-slate-100 flex items-center justify-center p-4 mb-5 shadow-inner relative overflow-hidden cursor-pointer group/img hover:border-teal-350 transition-all duration-300"
              title="Click to play GIF animation"
            >
              <img loading="lazy" decoding="async"
                src={selectedWordSign.image}
                onError={(e) => { e.target.onerror = null; e.target.src = '/images/signlanguage/hand.webp'; }}
                alt={`ISL Sign for ${selectedWordSign.word}`}
                className="w-full h-full object-contain mix-blend-multiply drop-shadow-sm group-hover/img:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover/img:bg-slate-900/5 flex flex-col items-center justify-center transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-white/90 text-slate-800 flex items-center justify-center shadow-md scale-0 group-hover/img:scale-100 transition-all duration-300">
                  <Play size={18} className="fill-current ml-0.5 text-teal-600" />
                </div>
                <span className="text-[9px] font-bold text-slate-550 uppercase tracking-wider bg-white/95 px-2 py-0.5 rounded-full mt-2 shadow-sm scale-0 group-hover/img:scale-100 transition-all duration-300">
                  Play GIF
                </span>
              </div>
            </div>

            <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-6 px-4">
              {selectedWordSign.desc}
            </p>

            <div className="flex gap-3 w-full">
              <button
                onClick={() => setSelectedWordSign(null)}
                className="flex-1 py-3 px-4 rounded-full border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-700 font-bold text-xs transition-colors"
              >
                Fingerspell it
              </button>
              <button
                onClick={() => {
                  setText('');
                  setSelectedWordSign(null);
                }}
                className="flex-1 py-3 px-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
              >
                Clear Search
              </button>
            </div>
          </motion.div>
        ) : (
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
                    className="w-16 h-20 md:w-20 md:h-24 bg-white rounded-[16px] border-2 border-teal-100 flex flex-col items-center justify-center relative shadow-[0_4px_15px_rgb(16,185,129,0.1)] overflow-hidden group hover:border-teal-400 hover:shadow-[0_8px_20px_rgb(16,185,129,0.2)] hover:-translate-y-1 transition-all cursor-pointer"
                  >
                    <img loading="lazy" decoding="async"
                      src={`/images/signlanguage/alphabets/${char}.webp`}
                      onError={(e) => { e.target.onerror = null; e.target.src = '/images/signlanguage/hand.webp'; }}
                      alt={`Sign for ${char}`}
                      className="w-10 h-10 md:w-12 md:h-12 object-contain mix-blend-multiply opacity-80 mb-3 group-hover:scale-110 group-hover:opacity-100 transition-all"
                    />
                    <span className="absolute bottom-2 md:bottom-3 text-lg md:text-xl font-black text-teal-700 bg-teal-50/90 w-full text-center py-0.5 border-t border-teal-100 group-hover:bg-teal-100">{char}</span>
                  </motion.div>
                );
              })}
              {text.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full h-full flex flex-col items-center justify-center text-slate-400 py-8"
                >
                  <Hand size={32} className="mb-3 opacity-20" />
                  <span className="text-sm font-bold uppercase tracking-wider">{t('signLearn.startTyping', 'Start typing to see signs')}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
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

              <h4 className="text-4xl font-black text-slate-900 mb-6">{t('signLearn.letter', 'Letter')} {zoomedChar}</h4>

              <div className="w-56 h-56 bg-slate-50 rounded-[24px] border-2 border-slate-100 flex items-center justify-center p-6 mb-8 shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 bg-teal-500/5 mix-blend-multiply pointer-events-none" />
                <img loading="lazy" decoding="async"
                  src={`/images/signlanguage/alphabets/${zoomedChar}.webp`}
                  onError={(e) => { e.target.onerror = null; e.target.src = '/images/signlanguage/hand.webp'; }}
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

      {/* GIF Animation Modal */}
      <AnimatePresence>
        {previewGif && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
            onClick={() => setPreviewGif(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[32px] p-8 max-w-sm md:max-w-xl w-full relative flex flex-col items-center shadow-2xl border border-slate-100"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setPreviewGif(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 bg-slate-100 hover:bg-rose-50 rounded-full p-2 transition-colors cursor-pointer"
              >
                <XCircle size={24} />
              </button>

              <span className="text-[10px] font-black text-teal-600 bg-teal-50 px-3 py-1 rounded-full uppercase tracking-wider mb-2 mt-2">
                {t('signLearn.signDetails', 'Sign Details')}
              </span>
              <h4 className="text-3xl font-black text-slate-900 mb-6">{previewGif.word}</h4>

              <div className="flex flex-col md:flex-row gap-6 mb-6 w-full justify-center items-center">
                <div className="w-48 h-48 bg-slate-50 rounded-[24px] border-2 border-slate-100 flex flex-col items-center justify-center p-4 shadow-inner relative overflow-hidden">
                  <span className="absolute top-3 left-3 text-[10px] font-bold text-slate-400 uppercase bg-white/80 px-2 py-0.5 rounded-md backdrop-blur-sm z-10">{t('signLearn.photo', 'Photo')}</span>
                  <img loading="lazy" decoding="async"
                    src={previewGif.image}
                    onError={(e) => { e.target.onerror = null; e.target.src = '/images/signlanguage/hand.webp'; }}
                    alt={`Sign photo for ${previewGif.word}`}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
                <div className="w-48 h-48 bg-slate-50 rounded-[24px] border-2 border-slate-100 flex flex-col items-center justify-center p-4 shadow-inner relative overflow-hidden">
                  <span className="absolute top-3 left-3 text-[10px] font-bold text-teal-500 uppercase bg-white/80 px-2 py-0.5 rounded-md backdrop-blur-sm z-10">GIF</span>
                  <img loading="lazy" decoding="async"
                    src={`/explore sign/${previewGif.image.split('/').pop().replace(/\.[^/.]+$/, '')}.gif`}
                    onError={(e) => { e.target.onerror = null; e.target.src = previewGif.image; }}
                    alt={`Sign animation for ${previewGif.word}`}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
              </div>

              <p className="text-slate-500 text-center font-medium leading-relaxed mb-6 px-4">
                {previewGif.desc}
              </p>

              <button
                onClick={() => setPreviewGif(null)}
                className="w-full md:w-64 py-3.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm transition-colors shadow-md shadow-teal-500/20 cursor-pointer"
              >
                {t('signLearn.gotIt', 'Got it!')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dictionary Modal */}
      <AnimatePresence>
        {showDictionary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setShowDictionary(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[24px] border border-slate-100 shadow-2xl p-6 w-full max-w-2xl max-h-[85vh] flex flex-col relative"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900">{t('signLearn.dictionaryTitle', 'Sign Language Dictionary')}</h3>
                  <p className="text-sm text-slate-500 font-medium mt-1">{t('signLearn.dictionaryDesc', 'Words available with whole-word signs')}</p>
                </div>
                <button onClick={() => setShowDictionary(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer">
                  <XCircle size={20} />
                </button>
              </div>

              <div 
                ref={listRef}
                data-lenis-prevent="true"
                style={{
                  WebkitOverflowScrolling: 'touch',
                  overscrollBehavior: 'contain',
                  touchAction: 'pan-y'
                }}
                className="flex-1 overflow-y-auto pr-2 space-y-2 cyber-scrollbar select-none"
              >
                {dictionary.map(item => (
                  <div
                    key={item.word}
                    onClick={() => {
                      selectWord(item);
                      setPreviewGif(item);
                      setShowDictionary(false);
                    }}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-teal-50 border border-transparent hover:border-teal-100 cursor-pointer transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center shrink-0">
                      <img loading="lazy" decoding="async" 
                        src={item.image} 
                        onError={(e) => { e.target.onerror = null; e.target.src = '/images/signlanguage/hand.webp'; }}
                        alt={item.word} 
                        className="w-8 h-8 object-contain mix-blend-multiply" 
                      />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <h4 className="text-sm font-black text-slate-900 group-hover:text-teal-700 transition-colors">{item.word}</h4>
                      <p className="text-xs text-slate-500 truncate">{item.desc}</p>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-teal-500" />
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const signTheme = {
  backButtonHover: 'hover:text-teal-600',
  heroHighlightText: 'text-teal-600',
  
  card1Icon: 'text-teal-600',
  card1Bg: 'bg-teal-50',
  card2Icon: 'text-teal-600',
  card2Bg: 'bg-teal-50',
  card3Icon: 'text-teal-600',
  card3Bg: 'bg-teal-50',
  
  activeBorder: 'border-teal-600 ring-2 ring-teal-600/10 shadow-md',
  inactiveBorder: 'border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-teal-300',
  activeIconBg: 'bg-teal-600 text-white',
  activeTitleText: 'text-teal-800',
  inactiveTitleHover: 'text-slate-800 group-hover:text-teal-600',
  activeSubtitleText: 'text-teal-600',
  inactiveSubtitleText: 'text-slate-500'
};

const SignLearn = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Explore Signs');
  const [activeVideo, setActiveVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoCategoryFilter, setVideoCategoryFilter] = useState('All');
  const [videoLevelFilter, setVideoLevelFilter] = useState('All');
  const [videoSearchQuery, setVideoSearchQuery] = useState('');

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

  const externalSignVideos = [
    {
      id: 101,
      title: 'ISL 101: Alphabet',
      desc: 'Learn the Indian Sign Language alphabet from A to Z.',
      image: 'https://img.youtube.com/vi/qcdivQfA41Y/hqdefault.jpg',
      duration: '9:06',
      level: 'Beginner',
      channelName: 'ISL 101 Course',
      sourceType: 'external',
      sourceBadge: 'Private & Community',
      directUrl: 'https://www.youtube.com/watch?v=qcdivQfA41Y',
      youtubeUrl: 'https://www.youtube.com/embed/qcdivQfA41Y?autoplay=1',
      redirectOnly: true
    },
    {
      id: 102,
      title: 'ISL 101: Numbers',
      desc: 'Learn how to sign numbers and count in ISL.',
      image: 'https://img.youtube.com/vi/vnH2BmcSRMA/hqdefault.jpg',
      duration: '3:52',
      level: 'Beginner',
      channelName: 'ISL 101 Course',
      sourceType: 'external',
      sourceBadge: 'Private & Community',
      directUrl: 'https://www.youtube.com/watch?v=vnH2BmcSRMA',
      youtubeUrl: 'https://www.youtube.com/embed/vnH2BmcSRMA?autoplay=1',
      redirectOnly: true
    },
    {
      id: 103,
      title: 'ISL 101: Basic Words 1',
      desc: 'Introduction to foundational everyday words in ISL.',
      image: 'https://img.youtube.com/vi/VtbYvVDItvg/hqdefault.jpg',
      duration: '10:15',
      level: 'Beginner',
      channelName: 'ISL 101 Course',
      sourceType: 'external',
      sourceBadge: 'Private & Community',
      directUrl: 'https://www.youtube.com/watch?v=VtbYvVDItvg',
      youtubeUrl: 'https://www.youtube.com/embed/VtbYvVDItvg?autoplay=1',
      redirectOnly: true
    },
    {
      id: 104,
      title: 'ISL 101: Basic Words 2',
      desc: 'Expand your vocabulary with more everyday signs.',
      image: 'https://img.youtube.com/vi/lffGJ29IhZQ/hqdefault.jpg',
      duration: '6:59',
      level: 'Beginner',
      channelName: 'ISL 101 Course',
      sourceType: 'external',
      sourceBadge: 'Private & Community',
      directUrl: 'https://www.youtube.com/watch?v=lffGJ29IhZQ',
      youtubeUrl: 'https://www.youtube.com/embed/lffGJ29IhZQ?autoplay=1',
      redirectOnly: true
    },
    {
      id: 105,
      title: 'ISL 101: Question Words',
      desc: 'Learn how to ask Who, What, Where, When, and Why.',
      image: 'https://img.youtube.com/vi/DOFPRw6Epl0/hqdefault.jpg',
      duration: '4:00',
      level: 'Beginner',
      channelName: 'ISL 101 Course',
      sourceType: 'external',
      sourceBadge: 'Private & Community',
      directUrl: 'https://www.youtube.com/watch?v=DOFPRw6Epl0',
      youtubeUrl: 'https://www.youtube.com/embed/DOFPRw6Epl0?autoplay=1',
      redirectOnly: true
    },
    {
      id: 106,
      title: 'ISL 101: Colours',
      desc: 'Learn the signs for different colors.',
      image: 'https://img.youtube.com/vi/qtrBGmioR2Q/hqdefault.jpg',
      duration: '4:19',
      level: 'Beginner',
      channelName: 'ISL 101 Course',
      sourceType: 'external',
      sourceBadge: 'Private & Community',
      directUrl: 'https://www.youtube.com/watch?v=qtrBGmioR2Q',
      youtubeUrl: 'https://www.youtube.com/embed/qtrBGmioR2Q?autoplay=1',
      redirectOnly: true
    },
    {
      id: 107,
      title: 'ISL 101: Relations',
      desc: 'Signs for family members and relationships.',
      image: 'https://img.youtube.com/vi/drs0_jcKr5w/hqdefault.jpg',
      duration: '4:03',
      level: 'Intermediate',
      channelName: 'ISL 101 Course',
      sourceType: 'external',
      sourceBadge: 'Private & Community',
      directUrl: 'https://www.youtube.com/watch?v=drs0_jcKr5w',
      youtubeUrl: 'https://www.youtube.com/embed/drs0_jcKr5w?autoplay=1',
      redirectOnly: true
    },
    {
      id: 108,
      title: 'ISL 101: Days of the Week',
      desc: 'Learn how to sign Monday through Sunday.',
      image: 'https://img.youtube.com/vi/XPRtZQSKL-4/hqdefault.jpg',
      duration: '4:56',
      level: 'Beginner',
      channelName: 'ISL 101 Course',
      sourceType: 'external',
      sourceBadge: 'Private & Community',
      directUrl: 'https://www.youtube.com/watch?v=XPRtZQSKL-4',
      youtubeUrl: 'https://www.youtube.com/embed/XPRtZQSKL-4?autoplay=1',
      redirectOnly: true
    },
    {
      id: 109,
      title: 'ISL 101: Months',
      desc: 'Learn the signs for all 12 months of the year.',
      image: 'https://img.youtube.com/vi/x58C6-ZtW_8/hqdefault.jpg',
      duration: '5:15',
      level: 'Intermediate',
      channelName: 'ISL 101 Course',
      sourceType: 'external',
      sourceBadge: 'Private & Community',
      directUrl: 'https://www.youtube.com/watch?v=x58C6-ZtW_8',
      youtubeUrl: 'https://www.youtube.com/embed/x58C6-ZtW_8?autoplay=1',
      redirectOnly: true
    },
    {
      id: 110,
      title: 'ISL 101: Basic Words 3',
      desc: 'Advanced basic vocabulary for everyday use.',
      image: 'https://img.youtube.com/vi/bIkHfFlu4VU/hqdefault.jpg',
      duration: '6:59',
      level: 'Intermediate',
      channelName: 'ISL 101 Course',
      sourceType: 'external',
      sourceBadge: 'Private & Community',
      directUrl: 'https://www.youtube.com/watch?v=bIkHfFlu4VU',
      youtubeUrl: 'https://www.youtube.com/embed/bIkHfFlu4VU?autoplay=1',
      redirectOnly: true
    },
    {
      id: 111,
      title: 'ISL 101: Standard Signs',
      desc: 'Learn standard, universally understood signs.',
      image: 'https://img.youtube.com/vi/-Eh3ktA52jw/hqdefault.jpg',
      duration: '7:04',
      level: 'Advanced',
      channelName: 'ISL 101 Course',
      sourceType: 'external',
      sourceBadge: 'Private & Community',
      directUrl: 'https://www.youtube.com/watch?v=-Eh3ktA52jw',
      youtubeUrl: 'https://www.youtube.com/embed/-Eh3ktA52jw?autoplay=1',
      redirectOnly: true
    },
    {
      id: 112,
      title: 'ISL Vocab: Fruits',
      desc: 'Learn the names of common fruits in ISL.',
      image: 'https://img.youtube.com/vi/G6UY0amZ93s/hqdefault.jpg',
      duration: '1:32',
      level: 'Beginner',
      channelName: 'ISL Vocab Series',
      sourceType: 'external',
      sourceBadge: 'Private & Community',
      directUrl: 'https://www.youtube.com/watch?v=G6UY0amZ93s',
      youtubeUrl: 'https://www.youtube.com/embed/G6UY0amZ93s?autoplay=1',
      redirectOnly: true
    },
    {
      id: 113,
      title: 'ISL Vocab: Vegetables',
      desc: 'Learn the names of common vegetables.',
      image: 'https://img.youtube.com/vi/0tJ34RKNwC0/hqdefault.jpg',
      duration: '1:24',
      level: 'Beginner',
      channelName: 'ISL Vocab Series',
      sourceType: 'external',
      sourceBadge: 'Private & Community',
      directUrl: 'https://www.youtube.com/watch?v=0tJ34RKNwC0',
      youtubeUrl: 'https://www.youtube.com/embed/0tJ34RKNwC0?autoplay=1',
      redirectOnly: true
    },
    {
      id: 114,
      title: 'ISL Vocab: Animals',
      desc: 'Discover how to sign different animals.',
      image: 'https://img.youtube.com/vi/dnH8mo0s7go/hqdefault.jpg',
      duration: '1:28',
      level: 'Beginner',
      channelName: 'ISL Vocab Series',
      sourceType: 'external',
      sourceBadge: 'Private & Community',
      directUrl: 'https://www.youtube.com/watch?v=dnH8mo0s7go',
      youtubeUrl: 'https://www.youtube.com/embed/dnH8mo0s7go?autoplay=1',
      redirectOnly: true
    },
    {
      id: 115,
      title: 'ISL Learning: Good Manners & Habits',
      desc: 'Learn polite phrases and good habits in ISL.',
      image: 'https://img.youtube.com/vi/rKwokwZQ6FU/hqdefault.jpg',
      duration: '1:18',
      level: 'Intermediate',
      channelName: 'ISL Learning Series',
      sourceType: 'external',
      sourceBadge: 'Private & Community',
      directUrl: 'https://www.youtube.com/watch?v=rKwokwZQ6FU',
      youtubeUrl: 'https://www.youtube.com/embed/rKwokwZQ6FU?autoplay=1',
      redirectOnly: true
    },
    {
      id: 116,
      title: 'ISL Learning: Road & Traffic Signs',
      desc: 'Important road and traffic safety signs.',
      image: 'https://img.youtube.com/vi/Y6CSy7dbzik/hqdefault.jpg',
      duration: '1:02',
      level: 'Intermediate',
      channelName: 'ISL Learning Series',
      sourceType: 'external',
      sourceBadge: 'Private & Community',
      directUrl: 'https://www.youtube.com/watch?v=Y6CSy7dbzik',
      youtubeUrl: 'https://www.youtube.com/embed/Y6CSy7dbzik?autoplay=1',
      redirectOnly: true
    },
    {
      id: 117,
      title: 'ISL Learning: Facts About Indian Cities',
      desc: 'Learn signs for major cities and interesting facts.',
      image: 'https://img.youtube.com/vi/_yC1ZZXNcWI/hqdefault.jpg',
      duration: '1:16',
      level: 'Advanced',
      channelName: 'ISL Learning Series',
      sourceType: 'external',
      sourceBadge: 'Private & Community',
      directUrl: 'https://www.youtube.com/watch?v=_yC1ZZXNcWI',
      youtubeUrl: 'https://www.youtube.com/embed/_yC1ZZXNcWI?autoplay=1',
      redirectOnly: true
    }
  ];

  const allSignVideos = [
    ...signVideos.map(item => ({
      ...item,
      sourceType: 'official',
      sourceBadge: 'Govt. Official (ISLRTC)',
      channelName: 'ISLRTC Official Course',
      directUrl: item.youtubeUrl.replace('https://www.youtube.com/embed/', 'https://www.youtube.com/watch?v=').replace('?autoplay=1', '')
    })),
    ...externalSignVideos
  ];

  const filteredVideos = allSignVideos.filter(video => {
    if (videoCategoryFilter === 'Govt. Official (ISLRTC)' && video.sourceType !== 'official') return false;
    if (videoCategoryFilter === 'Private & Community' && video.sourceType !== 'external') return false;
    if (videoLevelFilter !== 'All' && video.level !== videoLevelFilter) return false;
    if (videoSearchQuery.trim()) {
      const q = videoSearchQuery.toLowerCase();
      const matchTitle = (video.title || '').toLowerCase().includes(q);
      const matchDesc = (video.desc || '').toLowerCase().includes(q);
      const matchChannel = (video.channelName || '').toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchChannel) return false;
    }
    return true;
  });

  const quickStats = [
    { label: t('signLearn.tabExploreSigns', 'Explore Signs'), value: t('signLearn.valExploreSigns', 'Visual library'), icon: <Hand className={signTheme.card1Icon} />, color: signTheme.card1Bg, key: 'Explore Signs' },
    { label: t('signLearn.tabTypeToSign', 'Type to Sign'), value: t('signLearn.valTypeToSign', 'Fingerspell Translator'), icon: <Keyboard className={signTheme.card2Icon} />, color: signTheme.card2Bg, key: 'Type to Sign' },
    { label: t('signLearn.tabLearnISL', 'Learn ISL'), value: t('signLearn.valLearnISL', `${allSignVideos.length} Video Lectures`), icon: <BookOpen className={signTheme.card3Icon} />, color: signTheme.card3Bg, key: 'Learn ISL' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex font-sans text-slate-900 overflow-x-hidden">
      <link rel="preconnect" href="https://www.youtube-nocookie.com" />
      <link rel="preconnect" href="https://img.youtube.com" />


      {/* Main Content */}
      <main className="flex-1 min-h-screen pb-4 overflow-y-auto">
        <button
          onClick={() => navigate("/#missions-grid")}
          className={`absolute top-[96px] md:top-[112px] left-[24px] md:left-[48px] z-50 w-9 h-9 md:w-10 md:h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 ${signTheme.backButtonHover} hover:shadow-lg transition-all border border-slate-100 group`}
        >
          <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <div className="px-4 sm:px-6 md:px-12 2xl:px-20 space-y-6 md:space-y-8 pt-4 2xl:max-w-[1600px] 2xl:mx-auto">

          {/* Hero & Stats Section */}
          <div className="relative">
            {/* Hero Section */}
            <section className="bg-white rounded-[16px] md:rounded-[24px] overflow-hidden relative border border-slate-100 flex items-center min-h-[200px] sm:min-h-[260px] md:min-h-[300px] lg:h-[387px] lg:min-h-[387px] pb-4 md:pb-6 lg:pb-0">
              <div className="relative z-10 p-5 sm:p-8 md:p-10 lg:w-1/2 space-y-3 md:space-y-4">
                <h1 className="text-[22px] sm:text-[28px] md:text-[36px] lg:text-[42px] 2xl:text-[52px] font-extrabold leading-[1.05] tracking-tight text-[#1e293b]">
                  {t('signLearn.heroTitle1', 'Build. Learn. &')} <br /> {t('signLearn.heroTitle2', 'Talk with')} <br />
                  <span className={signTheme.heroHighlightText}>{t('signLearn.heroTitle3', 'Sign Language')}</span>
                </h1>
                <p className="text-slate-500 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-medium leading-relaxed max-w-sm">
                  {t('signLearn.heroSub', 'Your visual learning hub for signs and expressions.')}
                </p>
              </div>

              <div className="hidden lg:block absolute top-0 right-0 w-[55%] h-full">
                <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/10 to-transparent z-10" />
                <img loading="lazy" decoding="async" src="/images/signlanguage/rhs.webp" alt="Sign Language" className="w-full h-full object-contain object-right" />
              </div>
            </section>

            {/* Quick Stats Row — overlapping hero with negative margin */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 relative z-20 -mt-8 px-4 md:px-12">
              {quickStats.map((stat, i) => {
                const isActive = activeFilter === (stat.key || stat.label);
                return (
                  <div
                    key={i}
                    onClick={() => {
                      setActiveFilter(stat.key || stat.label);
                      const target = document.getElementById("content-section");
                      if (target) target.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`bg-white rounded-[16px] p-3 md:p-4 border flex items-center gap-3 md:gap-4 hover:shadow-md transition-all cursor-pointer group ${isActive ? signTheme.activeBorder : signTheme.inactiveBorder}`}
                  >
                    <div className={`w-[44px] h-[44px] rounded-[12px] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform [&>svg]:w-5 [&>svg]:h-5 ${isActive ? signTheme.activeIconBg : stat.color}`}>
                      {React.cloneElement(stat.icon, { className: isActive ? 'text-white' : stat.icon.props.className })}
                    </div>
                    <div>
                      <h4 className={`text-[13px] font-bold leading-tight transition-colors ${isActive ? signTheme.activeTitleText : signTheme.inactiveTitleHover}`}>{stat.label}</h4>
                      <p className={`text-[11px] font-medium mt-0.5 ${isActive ? signTheme.activeSubtitleText : signTheme.inactiveSubtitleText}`}>{stat.value}</p>
                    </div>
                  </div>
                );
              })}
            </section>
          </div>

          {/* Content Section with standardized responsive layout margins */}
          <div id="content-section" className="px-2 sm:px-6 md:px-12 lg:px-10 xl:px-10 max-w-[1380px] mx-auto mt-8 sm:mt-10">
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
                  <div className="space-y-6">
                    {/* Filter & Search Toolbar */}
                    <div className="bg-white rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 sm:p-6 space-y-4">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* Source Category Pills */}
                        <div className="flex flex-wrap items-center gap-2">
                          {[
                            { id: 'All', label: t('signLearn.filterAll', 'All Videos'), badge: `${allSignVideos.length}` },
                            { id: 'Govt. Official (ISLRTC)', label: t('signLearn.filterGovt', 'Govt. & Official (ISLRTC)'), badge: `${allSignVideos.filter(v => v.sourceType === 'official').length}` },
                            { id: 'Private & Community', label: t('signLearn.filterPrivate', 'Private & Community Creators'), badge: `${allSignVideos.filter(v => v.sourceType === 'external').length}` }
                          ].map(tab => {
                            const isActive = videoCategoryFilter === tab.id;
                            return (
                              <button
                                key={tab.id}
                                onClick={() => setVideoCategoryFilter(tab.id)}
                                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                                  isActive
                                    ? 'bg-teal-600 text-white shadow-md shadow-teal-500/20'
                                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                }`}
                              >
                                <span>{tab.label}</span>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                                  isActive ? 'bg-white/20 text-white' : 'bg-white text-slate-600'
                                }`}>
                                  {tab.badge}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full lg:w-72">
                          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            placeholder={t('signLearn.searchPlaceholder', 'Search ISL videos...')}
                            value={videoSearchQuery}
                            onChange={(e) => setVideoSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 ring-teal-500/20 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Video Grid */}
                    {filteredVideos.length === 0 ? (
                      <div className="bg-white rounded-[24px] border border-slate-100 p-12 text-center space-y-3">
                        <Video size={40} className="text-slate-300 mx-auto" />
                        <h4 className="text-lg font-bold text-slate-800">No matching videos found</h4>
                        <p className="text-sm text-slate-500 max-w-sm mx-auto">Try selecting a different source category, level filter, or search term.</p>
                        <button
                          onClick={() => {
                            setVideoCategoryFilter('All');
                            setVideoLevelFilter('All');
                            setVideoSearchQuery('');
                          }}
                          className="mt-2 px-5 py-2 rounded-full bg-teal-600 text-white text-xs font-bold hover:bg-teal-700 transition-colors cursor-pointer shadow-sm"
                        >
                          Reset All Filters
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {filteredVideos.map(video => (
                          <div
                            key={video.id}
                            onClick={() => {
                              if (video.sourceType === 'external' || video.redirectOnly) {
                                window.open(video.directUrl || video.youtubeUrl, '_blank', 'noopener,noreferrer');
                              } else {
                                setActiveVideo(video);
                                setIsModalOpen(true);
                              }
                            }}
                            className="bg-white rounded-[20px] overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group flex flex-col"
                          >
                            <div className="relative aspect-video bg-slate-100 overflow-hidden shrink-0">
                              <img loading="lazy" decoding="async" src={video.image} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 flex items-center justify-center transition-colors">
                                <div className="w-12 h-12 rounded-full bg-white/90 text-slate-800 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                  {video.sourceType === 'external' ? (
                                    <ExternalLink className="w-5 h-5 text-slate-800" />
                                  ) : (
                                    <Play className="ml-0.5 w-6 h-6 fill-current text-slate-800" />
                                  )}
                                </div>
                              </div>
                              <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-md text-white text-[10px] font-bold flex items-center gap-1">
                                <Clock size={12} /> {video.duration}
                              </div>
                            </div>

                            <div className="p-4 flex-1 flex flex-col justify-between">
                              <div>
                                <div className="flex items-center justify-between gap-2 mb-2">
                                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider bg-slate-100 text-slate-700">
                                    {video.channelName || 'Lesson'}
                                  </span>
                                  <span className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
                                    <GraduationCap size={13} className="text-slate-400" /> {video.level}
                                  </span>
                                </div>

                                <h3 className="text-[15px] font-bold text-slate-900 leading-tight mb-1.5 group-hover:text-slate-700 transition-colors line-clamp-2">
                                  {video.title}
                                </h3>
                                <p className="text-xs text-slate-500 font-medium line-clamp-2 mb-3">
                                  {video.desc}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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
                  <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                    <Play size={16} className="fill-current" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight pr-8">{activeVideo.title}</h2>
                    <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500 mt-0.5">
                      <span className="flex items-center gap-1"><Clock size={12} /> {activeVideo.duration}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span className="text-teal-600">{activeVideo.level}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center gap-2">
                  <button
                    onClick={() => {
                      window.open(activeVideo.directUrl || activeVideo.youtubeUrl, '_blank', 'noopener,noreferrer');
                    }}
                    className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-900 text-slate-700 hover:text-white border border-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                    title="Watch directly on YouTube"
                  >
                    <span>Watch on YouTube</span>
                    <ExternalLink size={13} />
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <XCircle size={18} />
                  </button>
                </div>
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
                    <BookOpen size={18} className="text-teal-500" /> Lesson Summary
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
