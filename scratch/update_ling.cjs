const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/linguistics/LingModule.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update the isCorrect effect to remove handleSpeak
content = content.replace(
  /if \(isCorrect === true && type !== 'conversations'\) \{\s*handleSpeak\(currentItem\.target, targetLang, currentItem\.audioFile\);\s*/,
  `if (isCorrect === true && type !== 'conversations') {\n      `
);

// 2. Update "माफ़ कीजिए" to "maaf kre"
content = content.replace(
  /translations: \{ hi: "माफ़ कीजिए"/g,
  `translations: { hi: "maaf kre"`
);

// 3. Update the UI_STRINGS to add lesson_complete_msg
content = content.replace(
  /lesson_complete: "पाठ पूरा हुआ!",/g,
  `lesson_complete: "पाठ पूरा हुआ!", lesson_complete_msg: "आपने बहुत अच्छा किया! आपका अभ्यास सफल रहा।",`
);
content = content.replace(
  /lesson_complete: "Lesson Complete!",/g,
  `lesson_complete: "Lesson Complete!", lesson_complete_msg: "You did a great job! Your practice was successful.",`
);
content = content.replace(
  /lesson_complete: "Abgeschlossen!",/g,
  `lesson_complete: "Abgeschlossen!", lesson_complete_msg: "Du hast großartige Arbeit geleistet! Deine Übung war erfolgreich.",`
);
content = content.replace(
  /lesson_complete: "Lezione Completata!",/g,
  `lesson_complete: "Lezione Completata!", lesson_complete_msg: "Hai fatto un ottimo lavoro! La tua pratica è stata un successo.",`
);

// 4. Update the items map to include icon
content = content.replace(
  /image: concept\.image,\s*translation: concept\.translations\.en,/g,
  `icon: concept.icon,\n      image: concept.image,\n      translation: concept.translations.en,`
);

// 5. Update WORD_CONCEPTS image to icon mapping
const wordIcons = [
  '💧', '🏠', '🍎', '📖', '🤝', '🌳', '☀️', '🌙', '🚗', '🐱',
  '🐶', '🐦', '🌸', '🔥', '🌍', '🥛', '🍞', '🏫', '🛣️', '⏱️'
];
let wordMatches = 0;
content = content.replace(/const WORD_CONCEPTS = \[([\s\S]*?)\];/g, (match, p1) => {
  let updated = p1.replace(/image: "https:\/\/cdn-icons-png\.flaticon\.com[^"]+"/g, () => {
    const icon = wordIcons[wordMatches];
    wordMatches++;
    return `icon: "${icon}"`;
  });
  return `const WORD_CONCEPTS = [${updated}];`;
});

// 6. Update PHRASE_CONCEPTS image to icon mapping
const phraseIcons = [
  '👋', '🌅', '🙏', '✅', '❌', '🙋', '😔', '👋', '🥺', '🆘',
  '🤷', '🗣️', '🚻', '💰', '❤️', '🗺️', '👍', '🤔', '📅', '✨'
];
let phraseMatches = 0;
content = content.replace(/const PHRASE_CONCEPTS = \[([\s\S]*?)\];/g, (match, p1) => {
  let updated = p1.replace(/image: "https:\/\/cdn-icons-png\.flaticon\.com[^"]+"/g, () => {
    const icon = phraseIcons[phraseMatches];
    phraseMatches++;
    return `icon: "${icon}"`;
  });
  return `const PHRASE_CONCEPTS = [${updated}];`;
});

// 7. Update the render logic in words/phrases view
content = content.replace(
  /<img src=\{currentItem\.image\} className="w-\[100px\] h-\[100px\] object-contain mb-4 animate-bounce-subtle" alt="Word" \/>/g,
  `{currentItem.icon ? (
                    <div className="text-[90px] leading-none mb-4 animate-bounce-subtle select-none flex items-center justify-center h-[100px] w-[100px]">{currentItem.icon}</div>
                  ) : (
                    <img src={currentItem.image} className="w-[100px] h-[100px] object-contain mb-4 animate-bounce-subtle" alt="Word" />
                  )}`
);

// 8. Update the isCompleted render block
const isCompletedOld = /if \(isCompleted\) \{\s*return \(\s*<div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">\s*<Trophy size=\{100\} className="text-\[#0BB562\] mb-8 animate-bounce" \/>\s*<h1 className="text-4xl font-black mb-4">\{t\.lesson_complete\}<\/h1>\s*<button onClick=\{[^}]+\} className="bg-\[#0BB562\] text-white px-10 py-4 rounded-2xl font-bold">\{t\.back_home\}<\/button>\s*<\/div>\s*\);\s*\}/;

const isCompletedNew = `if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F1FAF6] via-white to-[#E1F5EB] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-1/3 left-1/3 w-36 h-36 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700" />
        </div>
        <div className="relative z-10 bg-white/70 backdrop-blur-xl p-10 rounded-[40px] shadow-2xl border border-white/80 max-w-[400px] w-full transform transition-all duration-700 hover:scale-[1.02]">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 bg-[#0BB562] rounded-full animate-ping opacity-20"></div>
            <div className="relative bg-gradient-to-tr from-[#0BB562] to-emerald-400 rounded-full w-full h-full flex items-center justify-center shadow-xl shadow-emerald-200">
              <Trophy size={60} className="text-white" strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-4xl font-black text-slate-800 mb-3 tracking-tight drop-shadow-sm">{t.lesson_complete}</h1>
          <p className="text-[15px] text-slate-500 font-bold mb-8 max-w-sm mx-auto leading-relaxed px-4">
            {t.lesson_complete_msg}
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex flex-col items-center justify-center">
              <div className="text-orange-500 mb-2"><Flame size={28} /></div>
              <div className="text-3xl font-black text-slate-800">{streak}</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{t.streak || 'Streak'}</div>
            </div>
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex flex-col items-center justify-center">
              <div className="text-blue-500 mb-2"><CheckCircle size={28} /></div>
              <div className="text-3xl font-black text-slate-800">{items.length}</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{t.words || 'Words'}</div>
            </div>
          </div>
          <button 
            onClick={() => navigate("/ling", { state: { source: sourceLang, target: targetLang } })} 
            className="w-full bg-[#1A1C2E] hover:bg-black text-white px-8 py-4 rounded-2xl font-black text-[17px] transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {t.back_home} <ArrowRight size={20} strokeWidth={3} />
          </button>
        </div>
      </div>
    );
  }`;

content = content.replace(isCompletedOld, isCompletedNew);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Update complete!');
