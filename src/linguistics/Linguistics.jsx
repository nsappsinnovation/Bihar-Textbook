import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Compass, 
  Cpu, 
  Target, 
  Languages,
  MessageSquare,
  Globe,
  Mic,
  BookOpen,
  Info,
  Layers,
  MapPin
} from 'lucide-react';

const Linguistics = () => {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState(0);

  const playSpeech = (text, langCode) => {
    if (!text) return;
    const langMap = {
      'de': 'de-DE', 'fr': 'fr-FR', 'es': 'es-ES', 'hi': 'hi-IN', 'en': 'en-US', 
      'ja': 'ja-JP', 'ko': 'ko-KR', 'it': 'it-IT', 'ru': 'ru-RU', 'zh': 'zh-CN', 'ar': 'ar-SA',
      'bn': 'bn-IN', 'ta': 'ta-IN', 'te': 'te-IN'
    };
    const langNamesMap = {
      'ar': 'arabic', 'hi': 'hindi', 'de': 'german', 'fr': 'french', 'es': 'spanish',
      'ja': 'japanese', 'ko': 'korean', 'it': 'italian', 'ru': 'russian', 'zh': 'chinese', 'en': 'english',
      'bn': 'bengali', 'ta': 'tamil', 'te': 'telugu'
    };
    const targetLangTag = langMap[langCode] || langCode || 'en-US';
    const shortLang = (langCode || 'en').split('-')[0].toLowerCase();

    // Prioritize natural human-sounding pronunciation audio
    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${encodeURIComponent(shortLang)}&client=tw-ob&q=${encodeURIComponent(text)}`;
    const audio = new Audio(audioUrl);
    
    audio.play().catch(() => {
      // Fallback to browser speechSynthesis if offline or audio blocked
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = targetLangTag;
        utterance.rate = 0.95;

        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          const nameKeyword = langNamesMap[shortLang] || shortLang;
          const naturalVoice = voices.find(v => (v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Google')) && v.lang.replace('_', '-').toLowerCase().startsWith(targetLangTag.toLowerCase()))
                            || voices.find(v => v.lang.replace('_', '-').toLowerCase().startsWith(targetLangTag.toLowerCase()))
                            || voices.find(v => v.lang.replace('_', '-').toLowerCase().startsWith(shortLang))
                            || voices.find(v => v.name.toLowerCase().includes(nameKeyword))
                            || (shortLang === 'hi' && voices.find(v => v.name.includes('हिन्दी') || v.name.toLowerCase().includes('hemant') || v.name.toLowerCase().includes('kalpana') || v.name.toLowerCase().includes('swara') || v.name.toLowerCase().includes('madhur')));
          if (naturalVoice) {
            utterance.voice = naturalVoice;
            utterance.lang = naturalVoice.lang;
          }
        }
        window.speechSynthesis.speak(utterance);
      }
    });
  };
  
  // Interactive States
  const [selectedIndianLang, setSelectedIndianLang] = useState(0);
  const [selectedDialectPhrase, setSelectedDialectPhrase] = useState(0);
  const [selectedGlobalLang, setSelectedGlobalLang] = useState(0);
  const [hoveredSyllable, setHoveredSyllable] = useState(null);
  const [hoveredGlobalWord, setHoveredGlobalWord] = useState(null);

  const modules = [
    {
      title: "Indian Languages Hub",
      description: "Explore the syllable structure, phonetic breakdown, and grammatical composition of major national languages."
    },
    {
      title: "Bihari Dialects Explorer",
      description: "Compare vocabulary shifts across the regions of Bihar by analyzing common phrases in local dialects."
    },
    {
      title: "Global Immersion",
      description: "Analyze sentence structures, word order variations, and linguistic families across global tongues."
    }
  ];

  // Data for Module 0: Indian Languages Hub
  const indianLanguagesData = [
    {
      name: "Hindi",
      greeting: "नमस्ते",
      transliteration: "Na-mas-te",
      script: "Devanagari",
      fact: "Hindi uses a phonetic script where words are written exactly as they are pronounced.",
      syllables: [
        { char: "न", rom: "na", desc: "Short neutral vowel sound, produced at the dental ridge." },
        { char: "म", rom: "ma", desc: "Bilabial nasal sound, made with both lips closed." },
        { char: "स्", rom: "s", desc: "Alveolar sibilant, air flows through a narrow channel." },
        { char: "ते", rom: "te", desc: "Dental stop with a close-mid front vowel." }
      ]
    },
    {
      name: "Bengali",
      greeting: "নমস্কার",
      transliteration: "No-mosh-kar",
      script: "Bengali-Assamese",
      fact: "Bengali is known for its sweet, rounded vowel sounds and lacks grammatical gender.",
      syllables: [
        { char: "ন", rom: "no", desc: "Dental nasal sound with a rounded vowel flavor." },
        { char: "ম", rom: "mosh", desc: "Bilabial nasal followed by a soft palatal sibilant." },
        { char: "ষ্কা", rom: "ka", desc: "Voiceless velar stop, pronounced from the back of the mouth." },
        { char: "র", rom: "r", desc: "Alveolar tap, the tongue lightly taps the roof of the mouth." }
      ]
    },
    {
      name: "Tamil",
      greeting: "வணக்கம்",
      transliteration: "Va-nak-kam",
      script: "Tamil Script",
      fact: "One of the longest-surviving classical languages in the world, dating back over 2000 years.",
      syllables: [
        { char: "வ", rom: "va", desc: "Labiodental approximant, lower lip near upper teeth." },
        { char: "ணக்", rom: "nak", desc: "Retroflex nasal consonant, tongue tip curled back." },
        { char: "க", rom: "ka", desc: "Soft velar consonant, transitioning to an open vowel." },
        { char: "ம்", rom: "mam", desc: "Bilabial nasal, closing the lips to end the word." }
      ]
    },
    {
      name: "Telugu",
      greeting: "నమస్కారం",
      transliteration: "Na-mas-kaa-ram",
      script: "Telugu Script",
      fact: "Called the Italian of the East because every word traditionally ends with a vowel sound.",
      syllables: [
        { char: "న", rom: "na", desc: "Dental nasal sound, tip of the tongue against upper teeth." },
        { char: "మ", rom: "mas", desc: "Bilabial nasal transitioning to an alveolar sibilant." },
        { char: "స్కా", rom: "kaa", desc: "Elongated back vowel sound with a voiceless stop." },
        { char: "రం", rom: "ram", desc: "Tapped r-sound closing with a nasalized ring." }
      ]
    }
  ];

  // Data for Module 1: Bihari Dialects Explorer
  const dialectPhrases = [
    {
      english: "How are you?",
      hindi: "आप कैसे हैं?",
      dialects: [
        { name: "Maithili", text: "अहाँ केहन छी?", region: "Mithila (North Bihar)", syllables: "अ-हाँ के-हन छी? (A-hã ke-han chhi)" },
        { name: "Bhojpuri", text: "का हाल बा?", region: "Bhojpur (West Bihar)", syllables: "का हाल बा? (Kaa haal baa)" },
        { name: "Magahi", text: "का हाल हौ?", region: "Magadh (South Bihar)", syllables: "का हाल हौ? (Kaa haal hau)" },
        { name: "Angika", text: "केहेन छौ?", region: "Anga (Southeast Bihar)", syllables: "के-हेन छौ? (Ke-hen chau)" }
      ]
    },
    {
      english: "What is your name?",
      hindi: "आपका नाम क्या है?",
      dialects: [
        { name: "Maithili", text: "अहाँक नाम की अछि?", region: "Mithila (North Bihar)", syllables: "अ-हाँक नाम की अ-छि? (A-hãk naam kee a-chhi)" },
        { name: "Bhojpuri", text: "राउर नाम का ह?", region: "Bhojpur (West Bihar)", syllables: "रा-उर नाम का ह? (Raa-ur naam kaa ha)" },
        { name: "Magahi", text: "तोहर नाम की हौ?", region: "Magadh (South Bihar)", syllables: "तो-हर नाम की हौ? (To-har naam kee hau)" },
        { name: "Angika", text: "तोहार नाम की छौ?", region: "Anga (Southeast Bihar)", syllables: "तो-हार नाम की छौ? (To-haar naam kee chau)" }
      ]
    },
    {
      english: "Where are you going?",
      hindi: "आप कहाँ जा रहे हैं?",
      dialects: [
        { name: "Maithili", text: "अहाँ कतय जा रहल छी?", region: "Mithila (North Bihar)", syllables: "अ-हाँ क-तय जा र-हल छी? (A-hã ka-tay jaa ra-hal chhi)" },
        { name: "Bhojpuri", text: "रउआ कहाँ जात बानी?", region: "Bhojpur (West Bihar)", syllables: "र-उ-आ क-हाँ जात बा-नी? (Ra-u-aa ka-hã jaat baa-nee)" },
        { name: "Magahi", text: "तू कहाँ जा रहल ह?", region: "Magadh (South Bihar)", syllables: "तू क-हाँ जा र-हल ह? (Too ka-hã jaa ra-hal ha)" },
        { name: "Angika", text: "तूं कहाँ जाय रहलो छौ?", region: "Anga (Southeast Bihar)", syllables: "तूं क-हाँ जाय र-ह-लो छौ? (Tũ ka-hã jaay ra-ha-lo chau)" }
      ]
    }
  ];

  // Data for Module 2: Global Immersion
  const globalLanguagesData = [
    {
      name: "French",
      greeting: "Bonjour",
      transliteration: "Bohn-zhoor",
      meaning: "Hello",
      family: "Romance (Latin-based)",
      fact: "French is a Romance language where many final consonants are silent.",
      syllables: [
        { char: "Bon", rom: "bohn", desc: "Nasalized vowel sound, typical of French phonology." },
        { char: "jour", rom: "zhoor", desc: "Voiced palato-alveolar sibilant followed by a uvular r." }
      ]
    },
    {
      name: "Spanish",
      greeting: "Hola",
      transliteration: "Oh-la",
      meaning: "Hello",
      family: "Romance (Latin-based)",
      fact: "Spanish is a highly phonetic language—words are pronounced exactly as they are written.",
      syllables: [
        { char: "Ho", rom: "oh", desc: "The 'H' is completely silent. Start with a pure open 'o' sound." },
        { char: "la", rom: "lah", desc: "Alveolar lateral approximant, tongue tip touches the dental ridge." }
      ]
    },
    {
      name: "German",
      greeting: "Hallo",
      transliteration: "Hah-loh",
      meaning: "Hello",
      family: "Germanic",
      fact: "German is known for compound words and distinct glottal stops.",
      syllables: [
        { char: "Hal", rom: "hah-l", desc: "Voiceless glottal transition into a short open-front vowel." },
        { char: "lo", rom: "loh", desc: "Produced with rounded lips and a mid-back vowel tongue position." }
      ]
    },
    {
      name: "Italian",
      greeting: "Ciao",
      transliteration: "Chow",
      meaning: "Hello / Goodbye",
      family: "Romance (Latin-based)",
      fact: "Italian is known as the language of music and features expressive melodious vowel endings.",
      syllables: [
        { char: "Ci", rom: "ch", desc: "Voiceless palato-alveolar affricate, similar to English 'ch' in cheese." },
        { char: "ao", rom: "ow", desc: "Pure open diphthong ending with a rounded vowel." }
      ]
    }
  ];

  const renderViewportContent = () => {
    switch (activeModule) {
      case 0: {
        const currentData = indianLanguagesData[selectedIndianLang];
        return (
          <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 bg-slate-950 text-slate-100 relative">
            <div className="flex justify-between items-center">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase font-semibold">Phonetic Syllable Explorer</span>
                <h3 className="text-base sm:text-lg font-bold text-white">Indian Languages Hub</h3>
              </div>
              <div className="flex gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                {indianLanguagesData.map((lang, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedIndianLang(idx);
                      setHoveredSyllable(null);
                    }}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                      selectedIndianLang === idx 
                        ? 'bg-slate-500 text-slate-950 shadow-md' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Syllable Breakdown Area */}
            <div className="my-auto flex flex-col items-center space-y-6">
              <div className="text-center space-y-2">
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Selected Greeting ({currentData.script} Script)</p>
                <h4 className="text-3xl sm:text-4xl font-extrabold text-slate-400 tracking-wide flex items-center justify-center gap-3">
                  {currentData.greeting}
                  <button 
                    onClick={() => playSpeech(currentData.greeting, currentData.name === "Hindi" ? "hi" : currentData.name === "Bengali" ? "bn" : currentData.name === "Tamil" ? "ta" : currentData.name === "Telugu" ? "te" : "en")}
                    className="w-8 h-8 rounded-full bg-slate-500/20 text-slate-400 hover:bg-slate-500 hover:text-slate-950 flex items-center justify-center transition-all cursor-pointer shadow-sm"
                    title="Listen pronunciation"
                  >
                    <Mic size={16} />
                  </button>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 italic">{currentData.transliteration}</p>
              </div>

              <div className="flex flex-col items-center space-y-4 w-full">
                <p className="text-[10px] text-slate-400 font-medium">Hover or click a syllable below to analyze its phonetic origin:</p>
                
                <div className="flex justify-center gap-2.5">
                  {currentData.syllables.map((syl, idx) => (
                    <button
                      key={idx}
                      onMouseEnter={() => setHoveredSyllable(idx)}
                      onMouseLeave={() => setHoveredSyllable(null)}
                      className={`px-4 py-3 rounded-xl border transition-all duration-300 flex flex-col items-center min-w-[64px] cursor-pointer ${
                        hoveredSyllable === idx 
                          ? 'bg-slate-950/45 border-slate-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.15)]' 
                          : 'bg-slate-900/40 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-lg font-bold">{syl.char}</span>
                      <span className="text-[9px] text-slate-500 font-mono mt-1">{syl.rom}</span>
                    </button>
                  ))}
                </div>

                {/* Display Box for Syllable Info */}
                <div className="w-full max-w-sm h-16 flex items-center justify-center text-center px-4 bg-slate-900/60 border border-slate-800/85 rounded-2xl">
                  <AnimatePresence mode="wait">
                    {hoveredSyllable !== null ? (
                      <motion.p
                        key={hoveredSyllable}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="text-xs text-slate-200 font-medium leading-relaxed"
                      >
                        {currentData.syllables[hoveredSyllable].desc}
                      </motion.p>
                    ) : (
                      <p className="text-xs text-slate-500 font-medium">
                        {currentData.fact}
                      </p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="text-[9px] text-slate-600 text-center font-mono">
              Hovering displays mouth, tongue, and throat positions for each character
            </div>
          </div>
        );
      }
      case 1: {
        const currentPhrase = dialectPhrases[selectedDialectPhrase];
        return (
          <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 bg-slate-955 text-slate-100 relative">
            <div className="flex justify-between items-center">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-purple-400 tracking-wider uppercase font-semibold">Regional Phrase Matrix</span>
                <h3 className="text-base sm:text-lg font-bold text-white">Bihari Dialects Explorer</h3>
              </div>
              
              <div className="flex gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                {dialectPhrases.map((phrase, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedDialectPhrase(idx)}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                      selectedDialectPhrase === idx 
                        ? 'bg-purple-500 text-slate-950 shadow-md' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Phrase {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Dialect Comparison Grid */}
            <div className="my-auto space-y-4">
              <div className="text-center p-3 bg-slate-900/45 border border-slate-850 rounded-2xl max-w-sm mx-auto">
                <p className="text-[9px] font-mono text-slate-500 uppercase">Standard English / Hindi</p>
                <p className="text-xs sm:text-sm font-bold text-slate-200">"{currentPhrase.english}"  —  {currentPhrase.hindi}</p>
              </div>

              <div className="grid grid-cols-2 gap-3.5 w-full max-w-md mx-auto">
                {currentPhrase.dialects.map((d, idx) => (
                  <div 
                    key={idx}
                    className="p-3 bg-slate-900/30 border border-slate-800/80 hover:border-purple-500/30 rounded-xl space-y-1.5 transition-all group"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold text-purple-400 uppercase tracking-wider">{d.name}</span>
                      <span className="text-[8px] text-slate-500 flex items-center gap-0.5">
                        <MapPin size={8} />
                        {d.region.split(" ")[0]}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-white transition-colors">{d.text}</p>
                    {d.syllables && (
                      <p className="text-[10px] text-purple-300/80 font-medium tracking-wide italic mt-0.5">{d.syllables}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[9px] text-slate-600 text-center font-mono">
              Notice the shifts in verb endings and pronouns between northern and southern regions
            </div>
          </div>
        );
      }
      case 2: {
        const currentLang = globalLanguagesData[selectedGlobalLang];
        return (
          <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 bg-slate-955 text-slate-100 relative">
            <div className="flex justify-between items-center">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-blue-400 tracking-wider uppercase font-semibold">Phonetic Syllable Explorer</span>
                <h3 className="text-base sm:text-lg font-bold text-white">Global Immersion</h3>
              </div>

              <div className="flex gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                {globalLanguagesData.map((lang, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedGlobalLang(idx);
                      setHoveredGlobalWord(null);
                    }}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                      selectedGlobalLang === idx 
                        ? 'bg-blue-500 text-slate-955 shadow-md' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Syllable Breakdown Area */}
            <div className="my-auto flex flex-col items-center space-y-6">
              <div className="text-center space-y-2">
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Selected Greeting ({currentLang.family})</p>
                <h4 className="text-3xl sm:text-4xl font-extrabold text-blue-400 tracking-wide flex items-center justify-center gap-3">
                  {currentLang.greeting}
                  <button 
                    onClick={() => playSpeech(currentLang.greeting, currentLang.name === "French" ? "fr" : currentLang.name === "Spanish" ? "es" : currentLang.name === "German" ? "de" : "it")}
                    className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-slate-950 flex items-center justify-center transition-all cursor-pointer shadow-sm"
                    title="Listen pronunciation"
                  >
                    <Mic size={16} />
                  </button>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 italic">{currentLang.transliteration}</p>
                <p className="text-[10px] text-slate-500">Meaning: "{currentLang.meaning}"</p>
              </div>

              <div className="flex flex-col items-center space-y-4 w-full">
                <p className="text-[10px] text-slate-400 font-medium">Hover or click a syllable below to analyze its phonetic origin:</p>
                
                <div className="flex justify-center gap-2.5">
                  {currentLang.syllables.map((syl, idx) => (
                    <button
                      key={idx}
                      onMouseEnter={() => setHoveredGlobalWord(idx)}
                      onMouseLeave={() => setHoveredGlobalWord(null)}
                      className={`px-4 py-3 rounded-xl border transition-all duration-300 flex flex-col items-center min-w-[64px] cursor-pointer ${
                        hoveredGlobalWord === idx 
                          ? 'bg-blue-955/45 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
                          : 'bg-slate-900/40 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-lg font-bold">{syl.char}</span>
                      <span className="text-[9px] text-slate-550 font-mono mt-1">{syl.rom}</span>
                    </button>
                  ))}
                </div>

                {/* Display Box for Syllable Info */}
                <div className="w-full max-w-sm h-16 flex items-center justify-center text-center px-4 bg-slate-900/60 border border-slate-800/85 rounded-2xl">
                  <AnimatePresence mode="wait">
                    {hoveredGlobalWord !== null ? (
                      <motion.p
                        key={hoveredGlobalWord}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="text-xs text-slate-200 font-medium leading-relaxed"
                      >
                        {currentLang.syllables[hoveredGlobalWord].desc}
                      </motion.p>
                    ) : (
                      <p className="text-xs text-slate-500 font-medium">
                        {currentLang.fact}
                      </p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="text-[9px] text-slate-500 text-center font-mono">
              Hovering displays mouth, tongue, and throat positions for each character
            </div>
          </div>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-slate-900 overflow-hidden font-sans pb-24 pt-28">
      <div className="absolute top-0 right-0 -z-10 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-blue-500/5 to-indigo-500/5 blur-[120px]" />
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-cyan-500/5 to-blue-500/5 blur-[120px]" />

      <div className="max-w-[1140px] mx-auto px-6 sm:px-8 pt-2 sm:pt-4">
        <div className="mb-4 -mt-24">
          <button 
            onClick={() =>  navigate("/")} 
            className="group w-10 h-10 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-full shadow-sm flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all duration-300 cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50/80 backdrop-blur-sm text-blue-700 border border-blue-200/50 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                Linguistic Mission
              </span>
              <h1 className="text-[24px] sm:text-[28px] md:text-[36px] lg:text-[42px] 2xl:text-[52px] font-extrabold leading-[1.05] tracking-tight text-[#1e293b]">
                Diverse <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Linguistic Learning</span> Programs
              </h1>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl text-left">
                Experience interactive phonetic syllable mapping, regional dialect comparison, and global syntax structure analysis. Tailored for Grades 8–12, our linguistic modules bridge textbook theory with interactive conversational reality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap gap-3.5 pt-1"
            >
              <button 
                onClick={() => navigate("/ling")}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full text-xs sm:text-sm font-bold shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                Start Exploring
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              
              <a 
                href="#simulator-section"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                Try Viewport Demo
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-3 gap-4 sm:gap-6 pt-5 border-t border-slate-200/80"
            >
              <div className="p-3.5 bg-white hover:bg-slate-50 border border-slate-200/60 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1 text-left">
                <div className="text-slate-900 font-bold flex items-center gap-1.5 text-xs sm:text-sm">
                  <Cpu size={14} className="text-blue-600" />
                  Grades 8-12
                </div>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">Curated for secondary school lessons.</p>
              </div>
              <div className="p-3.5 bg-white hover:bg-slate-50 border border-slate-200/60 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1 text-left">
                <div className="text-slate-900 font-bold flex items-center gap-1.5 text-xs sm:text-sm">
                  <Target size={14} className="text-indigo-600" />
                  Aligned
                </div>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">Meets board curriculum standards.</p>
              </div>
              <div className="p-3.5 bg-white hover:bg-slate-50 border border-slate-200/60 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1 text-left">
                <div className="text-slate-900 font-bold flex items-center gap-1.5 text-xs sm:text-sm">
                  <Compass size={14} className="text-violet-600" />
                  Interactive Lab
                </div>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">Interactive preview mode included.</p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative w-full max-w-[480px] flex flex-col items-center pt-8 lg:pt-0"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 rounded-full blur-[60px] -z-10 animate-pulse duration-[5000ms]" />
              <div className="relative z-10 w-full flex flex-col items-center">
                <img loading="lazy" decoding="async"
                  src="/images/diverse_hero.webp"
                  alt="Diverse Language avatar"
                  className="w-[320px] sm:w-[380px] lg:w-[400px] h-auto object-contain select-none transform hover:scale-[1.02] transition-transform duration-500 z-10"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <div id="simulator-section" className="text-center max-w-2xl mx-auto mb-10 space-y-2 pt-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-[10px] font-bold tracking-widest uppercase">
            Simulated Sandbox
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Interactive Language Viewport</h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">Select a linguistic learning module below to load its preview inside our viewport player.</p>
        </div>

        <section className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.03)] p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-full blur-3xl -z-10" />
          
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 z-10">
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
                <Mic size={12} className="text-blue-500" />
                Select Language Module
              </span>
              <div className="space-y-3">
                {modules.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveModule(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer relative overflow-hidden group ${
                      activeModule === idx 
                        ? 'border-blue-500 bg-blue-50/80 shadow-md shadow-blue-500/10' 
                        : 'border-slate-100 bg-white hover:border-blue-200 hover:bg-blue-50/30 hover:-translate-y-0.5 shadow-sm'
                    }`}
                  >
                    {activeModule === idx && <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600 rounded-l-2xl" />}
                    
                    <div className={`p-3 rounded-xl border transition-colors duration-300 shadow-sm ${
                      activeModule === idx 
                        ? 'bg-gradient-to-br from-blue-600 to-indigo-600 border-blue-500 text-white' 
                        : 'bg-slate-50 border-slate-100 text-slate-500 group-hover:bg-white group-hover:text-blue-500'
                    }`}>
                      {idx === 0 && <MessageSquare size={18} />}
                      {idx === 1 && <Languages size={18} />}
                      {idx === 2 && <Globe size={18} />}
                    </div>
                    
                    <div className="space-y-1 mt-0.5 flex-1 flex flex-col justify-center">
                      <h3 className={`text-sm font-bold leading-snug transition-colors ${
                        activeModule === idx ? 'text-blue-700' : 'text-slate-800 group-hover:text-blue-600'
                      }`}>
                        {item.title}
                      </h3>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 border border-slate-100 p-5 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Languages size={64} />
              </div>
              <h4 className="text-[10px] font-extrabold text-blue-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Target size={12} />
                Module Objective
              </h4>
              <p className="text-xs sm:text-sm text-slate-650 font-medium leading-relaxed text-left relative z-10">
                {modules[activeModule].description}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col z-10">
            <div className="bg-slate-950 rounded-3xl p-4 border border-slate-800 flex-1 flex flex-col min-h-[400px] sm:min-h-[460px] relative overflow-hidden shadow-2xl shadow-blue-900/10">
              <div className="relative flex-1 rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center border border-slate-800/80 shadow-inner">
                
                <div className="w-full h-full absolute inset-0 bg-slate-900">
                  {renderViewportContent()}
                </div>

                <div className="absolute top-4 left-4 z-10 bg-slate-900/80 border border-slate-700 backdrop-blur-md text-[9px] text-slate-300 font-mono px-2.5 py-1 rounded-md flex items-center gap-2 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  LIVE PREVIEW
                </div>

                <div className="absolute inset-4 pointer-events-none z-10 opacity-30">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white" />
                </div>

              </div>
              <div className="mt-4 flex justify-end border-t border-slate-800 pt-4 px-2">
                <button
                  onClick={() => navigate("/ling")}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 cursor-pointer flex items-center gap-2 hover:-translate-y-0.5"
                >
                  Enter Full Course <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Sober Info Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-slate-200/80 max-w-4xl mx-auto text-center">
          <div className="p-5 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
            <h5 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">10+</h5>
            <p className="text-xs sm:text-sm font-bold text-slate-800">Linguistic Modules</p>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Spanning regional dialects, global languages, and vocabulary labs.</p>
          </div>
          <div className="p-5 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
            <h5 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">100%</h5>
            <p className="text-xs sm:text-sm font-bold text-slate-800">Curriculum Aligned</p>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Mapped directly to state board textbook lessons.</p>
          </div>
          <div className="p-5 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-1">
            <h5 className="text-3xl font-extrabold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">Active</h5>
            <p className="text-xs sm:text-sm font-bold text-slate-800">Interactive Lessons</p>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Includes built-in interactive feedback and visual support.</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Linguistics;
