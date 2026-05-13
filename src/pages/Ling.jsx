
import { useMemo, useState } from "react";

const knownLanguages = ["Hindi", "English", "Bhojpuri", "Maithili", "Magahi"];
const targetLanguages = ["English", "Hindi", "German", "French", "Bhojpuri", "Maithili"];
const lessons = [
  {
    id: "greetings",
    title: "Friendly greetings",
    scene: "Morning at school",
    color: "from-emerald-100 to-sky-100",
    words: [
      { id: "hello", word: "Hello", native: "Namaste", hindi: "नमस्ते", use: "Use it when you meet someone.", sound: "heh-low" },
      { id: "morning", word: "Good morning", native: "Shubh prabhat", hindi: "शुभ प्रभात", use: "Use it before school starts.", sound: "good mor-ning" },
      { id: "friend", word: "Friend", native: "Dost", hindi: "दोस्त", use: "Use it for someone you like learning with.", sound: "frend" },
      { id: "teacher", word: "Teacher", native: "Shikshak", hindi: "शिक्षक", use: "Use it for your class guide.", sound: "tee-cher" }
    ],
    phrases: [
      { target: "Hello, friend!", support: "Namaste, dost!", hindi: "नमस्ते, दोस्त!" },
      { target: "Good morning, teacher.", support: "Shubh prabhat, shikshak.", hindi: "शुभ प्रभात, शिक्षक।" },
      { target: "I am ready to learn.", support: "Main seekhne ke liye taiyar hoon.", hindi: "मैं सीखने के लिए तैयार हूँ।" }
    ]
  },
  {
    id: "classroom",
    title: "Classroom words",
    scene: "Inside the classroom",
    color: "from-amber-100 to-rose-100",
    words: [
      { id: "book", word: "Book", native: "Kitaab", hindi: "किताब", use: "Use it when asking for reading material.", sound: "book" },
      { id: "water", word: "Water", native: "Paani", hindi: "पानी", use: "A daily word you can use everywhere.", sound: "waa-ter" },
      { id: "school", word: "School", native: "Vidyalaya", hindi: "विद्यालय", use: "Use it when talking about learning place.", sound: "skool" },
      { id: "write", word: "Write", native: "Likhna", hindi: "लिखना", use: "Use it when practicing notebooks.", sound: "ryt" }
    ],
    phrases: [
      { target: "This is my book.", support: "Yeh meri kitaab hai.", hindi: "यह मेरी किताब है।" },
      { target: "May I drink water?", support: "Kya main paani pee sakta/sakti hoon?", hindi: "क्या मैं पानी पी सकता/सकती हूँ?" },
      { target: "I go to school.", support: "Main vidyalaya jaata/jaati hoon.", hindi: "मैं विद्यालय जाता/जाती हूँ।" }
    ]
  },
  {
    id: "market",
    title: "Market talk",
    scene: "Buying fruit in Bihar",
    color: "from-lime-100 to-orange-100",
    words: [
      { id: "apple", word: "Apple", native: "Seb", hindi: "सेब", use: "Use it in fruit market conversations.", sound: "ap-pul" },
      { id: "price", word: "Price", native: "Daam", hindi: "दाम", use: "Use it when asking cost politely.", sound: "prys" },
      { id: "please", word: "Please", native: "Kripya", hindi: "कृपया", use: "A soft word for polite requests.", sound: "pleez" },
      { id: "thanks", word: "Thank you", native: "Dhanyavaad", hindi: "धन्यवाद", use: "Use it after someone helps you.", sound: "thank yoo" }
    ],
    phrases: [
      { target: "What is the price?", support: "Iska daam kya hai?", hindi: "इसका दाम क्या है?" },
      { target: "Please give me an apple.", support: "Kripya mujhe seb dijiye.", hindi: "कृपया मुझे सेब दीजिए।" },
      { target: "Thank you!", support: "Dhanyavaad!", hindi: "धन्यवाद!" }
    ]
  }
];

const mascotTips = [
  "Learn in tiny bites. First see it, then say it, then play with it.",
  "Bihar has many home languages. Your first language is a superpower, not a problem.",
  "Speak softly at first if you feel shy. Practice still counts.",
  "A useful phrase is better than ten words you never use.",
  "When you make a mistake, your brain just found a new clue."
];

const stages = [
  { id: "setup", label: "Choose", sub: "Your path" },
  { id: "learn", label: "Learn", sub: "Words + scenes" },
  { id: "speak", label: "Speak", sub: "Repeat phrases" },
  { id: "play", label: "Play", sub: "Mini games" },
  { id: "quiz", label: "Practice", sub: "Gentle check" },
  { id: "reward", label: "Reward", sub: "Badge" }
];

function Ling() {
  const [known, setKnown] = useState("Hindi");
  const [target, setTarget] = useState("English");
  const [activeStage, setActiveStage] = useState("setup");
  const [unlocked, setUnlocked] = useState(0);
  const [lessonIndex, setLessonIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState("hello");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [matchScore, setMatchScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [quizAnswer, setQuizAnswer] = useState("");
  const [toast, setToast] = useState("");
  const [mascotMood, setMascotMood] = useState("happy");
  const [bubble, setBubble] = useState({
    label: "Namaste!",
    text: "I am Mithu. Choose your language path and I will unlock one fun activity at a time."
  });

  const lesson = lessons[lessonIndex];
  const currentWord = lesson.words.find((item) => item.id === selectedWord) || lesson.words[0];
  const currentPhrase = lesson.phrases[phraseIndex];
  const matchQuestion = lesson.words[matchScore % lesson.words.length];
  const progress = Math.round(((stages.findIndex((stage) => stage.id === activeStage) + 1) / stages.length) * 100);

  const dailyPlan = useMemo(() => [
    { title: "See", detail: `Look at ${lesson.scene.toLowerCase()} words`, done: unlocked >= 1 },
    { title: "Say", detail: "Repeat 3 useful phrases", done: unlocked >= 2 },
    { title: "Play", detail: "Match meaning and sound", done: unlocked >= 3 },
    { title: "Try", detail: "Take a friendly quiz", done: unlocked >= 4 }
  ], [lesson, unlocked]);

  function celebrate(message, label = "Mithu says") {
    setBubble({ label, text: message });
    setMascotMood("excited");
    setToast(message);
    window.setTimeout(() => setMascotMood("happy"), 700);
    window.setTimeout(() => setToast(""), 1700);
  }

  function unlockStage(stageId) {
    const index = stages.findIndex((stage) => stage.id === stageId);
    setUnlocked((value) => Math.max(value, index));
    setActiveStage(stageId);
  }

  function goStage(stageId) {
    const index = stages.findIndex((stage) => stage.id === stageId);
    if (index > unlocked) {
      celebrate("Finish the current step first. Tiny wins unlock the next door.", "Not yet");
      return;
    }
    setActiveStage(stageId);
    setBubble({
      label: stages[index].label,
      text: stageId === "learn"
        ? "Look at each word card. Tap one to see when you can use it."
        : stageId === "speak"
          ? "Say the phrase slowly. Then try it again like you are talking to a friend."
          : stageId === "play"
            ? "Now play with meanings. This is practice hiding inside a game."
            : stageId === "quiz"
              ? "You have learned first, so the quiz is just a small check."
              : "Choose your path and begin."
    });
  }

  function chooseLesson(nextIndex) {
    setLessonIndex(nextIndex);
    setSelectedWord(lessons[nextIndex].words[0].id);
    setPhraseIndex(0);
    setMatchScore(0);
    setSelectedAnswer("");
    setQuizAnswer("");
    celebrate(`Great choice. ${lessons[nextIndex].title} is ready.`, "New lesson");
  }

  function checkMatch(answerId) {
    setSelectedAnswer(answerId);
    if (answerId === matchQuestion.id) {
      const nextScore = matchScore + 1;
      setMatchScore(nextScore);
      celebrate("Correct match. Your word power is growing.", "Shabash!");
      window.setTimeout(() => setSelectedAnswer(""), 650);
      if (nextScore >= 4) {
        window.setTimeout(() => unlockStage("quiz"), 800);
      }
    } else {
      celebrate("Almost. Look at the Hindi meaning and try once more.", "Helpful clue");
      window.setTimeout(() => setSelectedAnswer(""), 750);
    }
  }

  function checkQuiz(answerId) {
    setQuizAnswer(answerId);
    if (answerId === "correct") {
      celebrate("Badge unlocked. You learned, spoke, played, and practiced.", "Badge earned");
      window.setTimeout(() => unlockStage("reward"), 900);
    } else {
      celebrate("Good try. Go back to the phrase card if you want a clue.", "Try again");
    }
  }

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-[28px] border border-white/70 bg-white/75 p-4 shadow-soft backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-leaf to-sky font-display text-2xl font-bold text-white shadow-lg">भ</div>
            <div>
              <p className="font-display text-xl font-bold leading-none">Bhasha Buddy</p>
              <p className="text-sm font-bold text-slate-500">Bihar language journey</p>
            </div>
          </div>

          <div className="mt-6 grid gap-2">
            {stages.map((stage, index) => (
              <button
                key={stage.id}
                onClick={() => goStage(stage.id)}
                className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-left transition hover:translate-x-1 ${
                  activeStage === stage.id ? "bg-white shadow-md" : "bg-transparent"
                } ${index > unlocked ? "opacity-45" : ""}`}
              >
                <span className={`grid h-8 w-8 place-items-center rounded-full text-sm font-black text-white ${index <= unlocked ? "bg-leaf" : "bg-slate-300"}`}>
                  {index + 1}
                </span>
                <span>
                  <span className="block font-black">{stage.label}</span>
                  <span className="block text-xs font-bold text-slate-500">{stage.sub}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-3xl bg-gradient-to-br from-yellow-100 to-orange-100 p-4">
            <div className="flex items-center justify-between">
              <p className="font-black">Daily plan</p>
              <span className="rounded-full bg-white px-3 py-1 text-sm font-black text-amber-600">24 ★</span>
            </div>
            <div className="mt-3 grid gap-2">
              {dailyPlan.map((item) => (
                <div key={item.title} className="flex gap-2 text-sm">
                  <span className={`mt-0.5 grid h-5 w-5 place-items-center rounded-full text-xs font-black ${item.done ? "bg-leaf text-white" : "bg-white text-slate-400"}`}>
                    {item.done ? "✓" : ""}
                  </span>
                  <div>
                    <p className="font-black">{item.title}</p>
                    <p className="text-xs font-bold text-slate-500">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="min-w-0">
          <header className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-black uppercase text-emerald-700">Bihar learning website</p>
              <h1 className="font-display text-4xl font-bold leading-none sm:text-5xl">Learn languages with Mithu</h1>
            </div>
            <div className="rounded-full bg-white px-4 py-3 shadow-md">
              <div className="flex items-center gap-3">
                <div className="h-2 w-24 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-leaf transition-all" style={{ width: `${progress}%` }} />
                </div>
                <span className="text-sm font-black">{progress}%</span>
              </div>
            </div>
          </header>

          <section className="mb-4 grid items-center gap-4 overflow-hidden rounded-[30px] border border-white/70 bg-white/75 p-4 shadow-soft backdrop-blur md:grid-cols-[150px_1fr]">
            <Mascot mood={mascotMood} />
            <div className="relative rounded-[34px] bg-white p-5 shadow-lg before:absolute before:-left-4 before:top-8 before:h-9 before:w-9 before:rounded-full before:bg-white after:absolute after:-left-9 after:top-20 after:h-4 after:w-4 after:rounded-full after:bg-white">
              <p className="font-black text-mango">{bubble.label}</p>
              <p className="mt-1 max-w-3xl font-bold text-slate-600">{bubble.text}</p>
            </div>
          </section>

          <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
            {stages.map((stage, index) => (
              <button
                key={stage.id}
                onClick={() => goStage(stage.id)}
                className={`min-w-36 rounded-2xl border border-white/80 px-4 py-3 text-left shadow-sm transition ${
                  activeStage === stage.id ? "bg-white" : "bg-white/60"
                } ${index > unlocked ? "opacity-45" : "hover:-translate-y-0.5"}`}
              >
                <span className="block font-black">{stage.label}</span>
                <span className="text-sm font-bold text-slate-500">{stage.sub}</span>
              </button>
            ))}
          </div>

          <section className="rounded-[30px] border border-white/70 bg-white/75 p-4 shadow-soft backdrop-blur">
            {activeStage === "setup" && (
              <SetupStage
                known={known}
                target={target}
                setKnown={setKnown}
                setTarget={setTarget}
                onStart={() => {
                  celebrate(`Lovely. We will use ${known} to learn ${target}.`, "Path ready");
                  unlockStage("learn");
                }}
              />
            )}

            {activeStage === "learn" && (
              <LearnStage
                lesson={lesson}
                lessonIndex={lessonIndex}
                chooseLesson={chooseLesson}
                currentWord={currentWord}
                selectedWord={selectedWord}
                setSelectedWord={setSelectedWord}
                onNext={() => unlockStage("speak")}
              />
            )}

            {activeStage === "speak" && (
              <SpeakStage
                lesson={lesson}
                phraseIndex={phraseIndex}
                setPhraseIndex={setPhraseIndex}
                currentPhrase={currentPhrase}
                onNext={() => unlockStage("play")}
                celebrate={celebrate}
              />
            )}

            {activeStage === "play" && (
              <PlayStage
                lesson={lesson}
                matchQuestion={matchQuestion}
                selectedAnswer={selectedAnswer}
                matchScore={matchScore}
                checkMatch={checkMatch}
              />
            )}

            {activeStage === "quiz" && (
              <QuizStage
                lesson={lesson}
                quizAnswer={quizAnswer}
                checkQuiz={checkQuiz}
              />
            )}

            {activeStage === "reward" && (
              <RewardStage
                lesson={lesson}
                onNextLesson={() => {
                  const next = (lessonIndex + 1) % lessons.length;
                  chooseLesson(next);
                  setUnlocked(1);
                  setActiveStage("learn");
                }}
              />
            )}
          </section>
        </main>
      </div>

      {toast && (
        <div className="fixed bottom-5 left-1/2 z-10 -translate-x-1/2 animate-pop rounded-full bg-ink px-5 py-3 text-sm font-black text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}

function Mascot({ mood }) {
  return (
    <div className="relative mx-auto h-36 w-36">
      <div className={`absolute left-5 top-2 h-28 w-24 animate-bob rounded-[50%_50%_44%_44%] bg-gradient-to-br from-emerald-300 to-leaf ${mood === "excited" ? "animate-wiggle" : ""}`}>
        <div className="absolute -top-4 left-9 h-7 w-6 rotate-[-22deg] rounded-[80%_20%_80%_20%] bg-emerald-500" />
        <div className="absolute -left-3 top-11 h-12 w-8 animate-flap rounded-full bg-emerald-300" />
        <div className="absolute -right-3 top-11 h-12 w-8 animate-flap rounded-full bg-emerald-300" />
        <div className="absolute left-7 top-9 h-4 w-3 rounded-full bg-slate-800 after:absolute after:left-1 after:top-1 after:h-1 after:w-1 after:rounded-full after:bg-white" />
        <div className="absolute right-7 top-9 h-4 w-3 rounded-full bg-slate-800 after:absolute after:left-1 after:top-1 after:h-1 after:w-1 after:rounded-full after:bg-white" />
        <div className="absolute left-10 top-14 h-4 w-5 bg-amber-400 [clip-path:polygon(0_0,100%_50%,0_100%)]" />
        <div className="absolute bottom-[-7px] left-8 h-3 w-10 rounded-full bg-amber-400" />
      </div>
      <div className="absolute bottom-1 left-7 h-5 w-24 rounded-full bg-slate-900/10" />
    </div>
  );
}

function SetupStage({ known, target, setKnown, setTarget, onStart }) {
  return (
    <div className="animate-pop">
      <StageTitle eyebrow="Start here" title="Tell Mithu what you know and what you want to learn" badge={`${known} to ${target}`} />
      <div className="grid gap-4 md:grid-cols-2">
        <LanguagePicker title="I know" items={knownLanguages} value={known} onChange={setKnown} />
        <LanguagePicker title="I want to learn" items={targetLanguages} value={target} onChange={setTarget} />
      </div>
      <div className="mt-5 grid gap-3 rounded-3xl bg-gradient-to-br from-sky-50 to-emerald-50 p-4 md:grid-cols-3">
        {["Visual words", "Speak slowly", "Play before quiz"].map((item) => (
          <div key={item} className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="font-black">{item}</p>
            <p className="mt-1 text-sm font-bold text-slate-500">A child learns better when the step feels small, clear, and playful.</p>
          </div>
        ))}
      </div>
      <ActionBar primary="Start learning" onPrimary={onStart} />
    </div>
  );
}

function LearnStage({ lesson, lessonIndex, chooseLesson, currentWord, selectedWord, setSelectedWord, onNext }) {
  return (
    <div className="animate-pop">
      <StageTitle eyebrow="Learn visually first" title={lesson.title} badge={lesson.scene} />
      <div className="mb-4 grid gap-3 md:grid-cols-3">
        {lessons.map((item, index) => (
          <button
            key={item.id}
            onClick={() => chooseLesson(index)}
            className={`rounded-3xl p-4 text-left font-bold shadow-sm transition hover:-translate-y-1 ${
              lessonIndex === index ? "bg-gradient-to-br from-leaf to-sky text-white" : "bg-white"
            }`}
          >
            <span className="text-sm opacity-80">Lesson {index + 1}</span>
            <span className="block font-display text-2xl">{item.title}</span>
            <span className="text-sm opacity-80">{item.scene}</span>
          </button>
        ))}
      </div>
      <div className={`rounded-[28px] bg-gradient-to-br ${lesson.color} p-4`}>
        <div className="grid gap-3 md:grid-cols-4">
          {lesson.words.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedWord(item.id)}
              className={`rounded-3xl border-2 p-4 text-left transition hover:-translate-y-1 ${
                selectedWord === item.id ? "border-leaf bg-white shadow-md" : "border-transparent bg-white/70"
              }`}
            >
              <p className="text-sm font-black text-emerald-700">{item.sound}</p>
              <p className="font-display text-2xl font-bold">{item.word}</p>
              <p className="font-black text-slate-500">{item.hindi}</p>
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
          <p className="text-sm font-black uppercase text-mango">When will I use this?</p>
          <p className="mt-1 text-xl font-black">{currentWord.word} means {currentWord.hindi}</p>
          <p className="mt-1 font-bold text-slate-600">{currentWord.use}</p>
        </div>
      </div>
      <ActionBar primary="Practice speaking" onPrimary={onNext} />
    </div>
  );
}

function SpeakStage({ lesson, phraseIndex, setPhraseIndex, currentPhrase, onNext, celebrate }) {
  return (
    <div className="animate-pop">
      <StageTitle eyebrow="Speak and understand" title="Build real phrases, not just isolated words" badge={`${phraseIndex + 1} / ${lesson.phrases.length}`} />
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="rounded-[28px] bg-gradient-to-br from-yellow-100 to-orange-100 p-5">
          <p className="text-sm font-black uppercase text-amber-700">Listen in your mind</p>
          <h3 className="mt-2 font-display text-4xl font-bold">{currentPhrase.target}</h3>
          <p className="mt-2 text-xl font-black text-slate-600">{currentPhrase.hindi}</p>
          <p className="mt-1 font-bold text-slate-500">{currentPhrase.support}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <button onClick={() => celebrate("Say it once slowly. Now say it like you are greeting a friend.", "Speaking tip")} className="rounded-2xl bg-white px-4 py-3 font-black shadow-sm">Hear / Repeat</button>
            <button onClick={() => celebrate("Nice. Try changing one word and make your own sentence.", "Creative try")} className="rounded-2xl bg-white px-4 py-3 font-black shadow-sm">I said it</button>
          </div>
        </div>
        <div className="grid gap-2">
          {lesson.phrases.map((phrase, index) => (
            <button
              key={phrase.target}
              onClick={() => setPhraseIndex(index)}
              className={`rounded-2xl p-4 text-left font-bold transition ${phraseIndex === index ? "bg-ink text-white" : "bg-white shadow-sm"}`}
            >
              {phrase.target}
              <span className="block text-sm opacity-70">{phrase.hindi}</span>
            </button>
          ))}
        </div>
      </div>
      <ActionBar primary="Play meaning game" onPrimary={onNext} />
    </div>
  );
}

function PlayStage({ lesson, matchQuestion, selectedAnswer, matchScore, checkMatch }) {
  return (
    <div className="animate-pop">
      <StageTitle eyebrow="Mini game" title="Match the Hindi meaning to the correct word" badge={`${Math.min(matchScore, 4)} / 4`} />
      <div className="rounded-[28px] bg-gradient-to-br from-sky-100 to-emerald-100 p-5">
        <p className="text-sm font-black uppercase text-sky-700">Question</p>
        <h3 className="mt-1 font-display text-4xl font-bold">Which word means {matchQuestion.hindi}?</h3>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {lesson.words.map((item) => (
            <button
              key={item.id}
              onClick={() => checkMatch(item.id)}
              className={`rounded-3xl p-4 text-left font-black shadow-sm transition hover:-translate-y-1 ${
                selectedAnswer === item.id
                  ? item.id === matchQuestion.id
                    ? "bg-emerald-200"
                    : "bg-rose-200"
                  : "bg-white"
              }`}
            >
              <span className="block text-sm text-slate-500">{item.sound}</span>
              <span className="block text-2xl">{item.word}</span>
              <span className="text-slate-500">{item.native}</span>
            </button>
          ))}
        </div>
      </div>
      <p className="mt-4 rounded-2xl bg-white p-4 text-sm font-bold text-slate-500 shadow-sm">Complete 4 correct matches to unlock the gentle quiz.</p>
    </div>
  );
}

function QuizStage({ lesson, quizAnswer, checkQuiz }) {
  const phrase = lesson.phrases[0];
  return (
    <div className="animate-pop">
      <StageTitle eyebrow="Gentle quiz" title="Now check what you learned" badge="No pressure" />
      <div className="rounded-[28px] bg-gradient-to-br from-rose-100 to-yellow-100 p-5">
        <p className="text-sm font-black uppercase text-rose-700">Scenario</p>
        <h3 className="mt-1 font-display text-3xl font-bold">You meet a classmate in the morning. What can you say?</h3>
        <div className="mt-5 grid gap-3">
          {[
            { id: "wrong1", text: "What is the price?", sub: "Market question" },
            { id: "correct", text: phrase.target, sub: phrase.hindi },
            { id: "wrong2", text: "May I drink water?", sub: "Classroom request" }
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => checkQuiz(option.id)}
              className={`rounded-2xl p-4 text-left font-black shadow-sm transition hover:-translate-y-1 ${
                quizAnswer === option.id
                  ? option.id === "correct"
                    ? "bg-emerald-200"
                    : "bg-rose-200"
                  : "bg-white"
              }`}
            >
              {option.text}
              <span className="block text-sm text-slate-500">{option.sub}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function RewardStage({ lesson, onNextLesson }) {
  return (
    <div className="animate-pop text-center">
      <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-yellow-200 to-orange-300 text-5xl shadow-lg">★</div>
      <h2 className="mt-4 font-display text-5xl font-bold">Badge unlocked!</h2>
      <p className="mx-auto mt-2 max-w-xl font-bold text-slate-600">You completed {lesson.title}: you saw words, spoke phrases, played a game, and finished practice.</p>
      <div className="mx-auto mt-5 grid max-w-2xl gap-3 md:grid-cols-3">
        {["Curious Learner", "Word Matcher", "Brave Speaker"].map((badge) => (
          <div key={badge} className="rounded-3xl bg-white p-4 font-black shadow-sm">{badge}</div>
        ))}
      </div>
      <ActionBar primary="Start next lesson" onPrimary={onNextLesson} />
    </div>
  );
}

function LanguagePicker({ title, items, value, onChange }) {
  return (
    <div>
      <p className="mb-2 font-black text-slate-600">{title}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={`rounded-full border-2 px-4 py-2 font-black transition hover:-translate-y-0.5 ${
              value === item ? "border-leaf bg-white text-ink shadow-sm" : "border-transparent bg-sky-50 text-slate-600"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function StageTitle({ eyebrow, title, badge }) {
  return (
    <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
      <div>
        <p className="text-xs font-black uppercase text-emerald-700">{eyebrow}</p>
        <h2 className="font-display text-3xl font-bold leading-none sm:text-4xl">{title}</h2>
      </div>
      <span className="w-fit rounded-full bg-white px-4 py-2 text-sm font-black shadow-sm">{badge}</span>
    </div>
  );
}

function ActionBar({ primary, onPrimary }) {
  return (
    <div className="mt-5 flex justify-end">
      <button onClick={onPrimary} className="rounded-2xl bg-gradient-to-br from-leaf to-sky px-5 py-3 font-black text-white shadow-lg transition hover:-translate-y-0.5">
        {primary}
      </button>
    </div>
  );
}
export default Ling;
