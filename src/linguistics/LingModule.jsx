import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  ArrowLeft, Volume2, CheckCircle, ChevronRight, Star, Flame, Trophy, 
  Mic, X, Check, ArrowRight, Play, LayoutGrid, Lightbulb, Keyboard, Info,
  Languages, User
} from "lucide-react";

// Curated Multi-language Data Structure with Intelligent Distractors
const WORD_CONCEPTS = [
  { 
    id: 1, 
    translations: { hi: "पानी", en: "Water", de: "Wasser", fr: "Eau", es: "Agua", ja: "水", zh: "水", ar: "ماء", ru: "Вода", ko: "물" }, 
    distractors: { hi: ["नदी", "समुद्र", "झरना"], en: ["River", "Ocean", "Waterfall"], de: ["Fluss", "Ozean", "Wasserfall"], fr: ["Rivière", "Océan", "Cascade"], es: ["Río", "Océano", "Cascada"], ja: ["川", "海", "滝"], zh: ["河流", "海洋", "瀑布"], ar: ["نهر", "محيط", "شلال"], ru: ["Река", "Океан", "Водопад"], ko: ["강", "바다", "폭포"] },
    image: "https://cdn-icons-png.flaticon.com/512/3105/3105807.png" 
  },
  { 
    id: 2, 
    translations: { hi: "घर", en: "House", de: "Haus", fr: "Maison", es: "Casa", ja: "家", zh: "房子", ar: "بيت", ru: "Дом", ko: "집" }, 
    distractors: { hi: ["कमरा", "छत", "महल"], en: ["Room", "Roof", "Palace"], de: ["Zimmer", "Dach", "Palast"], fr: ["Chambre", "Toit", "Palais"], es: ["Habitación", "Techo", "Palacio"], ja: ["部屋", "屋根", "宮殿"], zh: ["房间", "屋顶", "宫殿"], ar: ["غرفة", "سقف", "قصر"], ru: ["Комната", "Крыша", "Дворец"], ko: ["방", "지붕", "궁전"] },
    image: "https://cdn-icons-png.flaticon.com/512/619/619153.png" 
  },
  { 
    id: 3, 
    translations: { hi: "सेब", en: "Apple", de: "Apfel", fr: "Pomme", es: "Manzana", ja: "リンゴ", zh: "苹果", ar: "تفاح", ru: "Яблоко", ko: "사과" }, 
    distractors: { hi: ["केला", "अंगूर", "फल"], en: ["Banana", "Grape", "Fruit"], de: ["Banane", "Traube", "Frucht"], fr: ["Banane", "Raisin", "Fruit"], es: ["Plátano", "Uva", "Fruta"], ja: ["バナナ", "ブドウ", "果物"], zh: ["香蕉", "葡萄", "水果"], ar: ["موز", "عنب", "فاكهة"], ru: ["Банан", "Виноград", "Фрукт"], ko: ["바나나", "포도", "과일"] },
    image: "https://cdn-icons-png.flaticon.com/512/415/415733.png" 
  },
  { 
    id: 4, 
    translations: { hi: "किताब", en: "Book", de: "Buch", fr: "Livre", es: "Libro", ja: "本", zh: "书", ar: "كتاب", ru: "Книга", ko: "책" }, 
    distractors: { hi: ["कलम", "कागज", "लाइब्रेरी"], en: ["Pen", "Paper", "Library"], de: ["Stift", "Papier", "Bibliothek"], fr: ["Stylo", "Papier", "Bibliothèque"], es: ["Pluma", "Papel", "Biblioteca"], ja: ["ペン", "紙", "図書館"], zh: ["笔", "纸", "图书馆"], ar: ["قلم", "ورقة", "مكتبة"], ru: ["Ручка", "Бумага", "Библиотека"], ko: ["펜", "종이", "도서관"] },
    image: "https://cdn-icons-png.flaticon.com/512/3145/3145765.png" 
  },
  { 
    id: 5, 
    translations: { hi: "दोस्त", en: "Friend", de: "Freund", fr: "Ami", es: "Amigo", ja: "友達", zh: "朋友", ar: "صديق", ru: "Друг", ko: "친구" }, 
    distractors: { hi: ["दुश्मन", "परिवार", "भाई"], en: ["Enemy", "Family", "Brother"], de: ["Feind", "Familie", "Bruder"], fr: ["Ennemi", "Familie", "Frère"], es: ["Enemigo", "Familia", "Hermano"], ja: ["敵", "家族", "兄弟"], zh: ["敌人", "家人", "兄弟"], ar: ["عدو", "عائلة", "أخ"], ru: ["Враг", "Семья", "Брат"], ko: ["적", "가족", "형제"] },
    image: "https://cdn-icons-png.flaticon.com/512/2332/2332027.png" 
  },
  { 
    id: 6, 
    translations: { hi: "पेड़", en: "Tree", de: "Baum", fr: "Arbre", es: "Árbol", ja: "木", zh: "树", ar: "شجرة", ru: "Дерево", ko: "나무" }, 
    distractors: { hi: ["पौधा", "पत्ती", "जंगल"], en: ["Plant", "Leaf", "Forest"], de: ["Pflanze", "Blatt", "Wald"], fr: ["Plante", "Feuille", "Forêt"], es: ["Planta", "Hoja", "Bosque"], ja: ["植物", "葉", "森"], zh: ["植物", "叶子", "森林"], ar: ["نبات", "ورقة", "غابة"], ru: ["Растение", "Лист", "Лес"], ko: ["식물", "잎", "숲"] },
    image: "https://cdn-icons-png.flaticon.com/512/3039/3039006.png" 
  },
  { 
    id: 7, 
    translations: { hi: "सूरज", en: "Sun", de: "Sonne", fr: "Soleil", es: "Sol", ja: "太陽", zh: "太阳", ar: "شمس", ru: "Солнце", ko: "태양" }, 
    distractors: { hi: ["तारा", "बादल", "आसमान"], en: ["Star", "Cloud", "Sky"], de: ["Stern", "Wolke", "Himmel"], fr: ["Étoile", "Nuage", "Ciel"], es: ["Estrella", "Nube", "Cielo"], ja: ["星", "雲", "空"], zh: ["星星", "云", "天空"], ar: ["نجمة", "سحابة", "سماء"], ru: ["Звезда", "Облако", "Небо"], ko: ["별", "구름", "하늘"] },
    image: "https://cdn-icons-png.flaticon.com/512/869/869869.png" 
  },
  { 
    id: 8, 
    translations: { hi: "चांद", en: "Moon", de: "Mond", fr: "Lune", es: "Luna", ja: "月", zh: "月亮", ar: "قمر", ru: "Луна", ko: "달" }, 
    distractors: { hi: ["रात", "तारा", "ग्रह"], en: ["Night", "Star", "Planet"], de: ["Nacht", "Stern", "Planet"], fr: ["Nuit", "Étoile", "Planète"], es: ["Noche", "Estrella", "Planeta"], ja: ["夜", "星", "惑星"], zh: ["夜晚", "星星", "行星"], ar: ["ليل", "نجمة", "كوكب"], ru: ["Ночь", "Звезда", "Планета"], ko: ["밤", "별", "행성"] },
    image: "https://cdn-icons-png.flaticon.com/512/180/180700.png" 
  },
  { 
    id: 9, 
    translations: { hi: "गाड़ी", en: "Car", de: "Auto", fr: "Voiture", es: "Coche", ja: "車", zh: "汽车", ar: "سيارة", ru: "Машина", ko: "자동차" }, 
    distractors: { hi: ["बस", "ट्रेन", "साइकिल"], en: ["Bus", "Train", "Bicycle"], de: ["Bus", "Zug", "Fahrrad"], fr: ["Bus", "Train", "Vélo"], es: ["Autobús", "Tren", "Bicicleta"], ja: ["バス", "電車", "自転車"], zh: ["公交车", "火车", "自行车"], ar: ["حافلة", "قطار", "دراجة"], ru: ["Автобус", "Поезд", "Велосипед"], ko: ["버스", "기차", "자전거"] },
    image: "https://cdn-icons-png.flaticon.com/512/741/741407.png" 
  },
  { 
    id: 10, 
    translations: { hi: "बिल्ली", en: "Cat", de: "Katze", fr: "Chat", es: "Gato", ja: "猫", zh: "猫", ar: "قطة", ru: "Кот", ko: "고양이" }, 
    distractors: { hi: ["कुत्ता", "चूहा", "शेर"], en: ["Dog", "Mouse", "Lion"], de: ["Hund", "Maus", "Löwe"], fr: ["Chien", "Souris", "Lion"], es: ["Perro", "Ratón", "León"], ja: ["犬", "ネズミ", "ライオン"], zh: ["狗", "老鼠", "狮子"], ar: ["كلب", "فأر", "أسد"], ru: ["Собака", "Мышь", "Лев"], ko: ["개", "쥐", "사자"] },
    image: "https://cdn-icons-png.flaticon.com/512/1864/1864514.png" 
  },
  { 
    id: 11, 
    translations: { hi: "कुत्ता", en: "Dog", de: "Hund", fr: "Chien", es: "Perro", ja: "犬", zh: "狗", ar: "كلب", ru: "Собака", ko: "개" }, 
    distractors: { hi: ["बिल्ली", "भेड़िया", "लोमड़ी"], en: ["Cat", "Wolf", "Fox"], de: ["Katze", "Wolf", "Fuchs"], fr: ["Chat", "Loup", "Renard"], es: ["Gato", "Lobo", "Zorro"], ja: ["猫", "オオカミ", "キツネ"], zh: ["猫", "狼", "狐狸"], ar: ["قطة", "ذئب", "ثعلب"], ru: ["Кот", "Волк", "Лиса"], ko: ["고양이", "늑대", "여우"] },
    image: "https://cdn-icons-png.flaticon.com/512/91/91544.png" 
  },
  { 
    id: 12, 
    translations: { hi: "पक्षी", en: "Bird", de: "Vogel", fr: "Oiseau", es: "Pájaro", ja: "鳥", zh: "鸟", ar: "طائر", ru: "Птица", ko: "새" }, 
    distractors: { hi: ["उड़ान", "हवा", "पंख"], en: ["Flight", "Wind", "Feather"], de: ["Flug", "Wind", "Feder"], fr: ["Vol", "Vent", "Plume"], es: ["Vuelo", "Viento", "Pluma"], ja: ["飛行", "風", "羽"], zh: ["飞行", "风", "羽毛"], ar: ["طيران", "رياح", "ريشة"], ru: ["Полет", "Ветер", "Перо"], ko: ["비행", "바람", "깃털"] },
    image: "https://cdn-icons-png.flaticon.com/512/1864/1864554.png" 
  },
  { 
    id: 13, 
    translations: { hi: "फूल", en: "Flower", de: "Blume", fr: "Fleur", es: "Flor", ja: "花", zh: "花", ar: "زهرة", ru: "Цветок", ko: "꽃" }, 
    distractors: { hi: ["पत्ती", "पेड़", "घास"], en: ["Leaf", "Tree", "Grass"], de: ["Blatt", "Baum", "Gras"], fr: ["Feuille", "Arbre", "Herbe"], es: ["Hoja", "Árbol", "Hierba"], ja: ["葉", "木", "草"], zh: ["叶子", "树", "草"], ar: ["ورقة", "شجرة", "عشب"], ru: ["Лист", "Дерево", "Трава"], ko: ["잎", "나무", "풀"] },
    image: "https://cdn-icons-png.flaticon.com/512/869/869860.png" 
  },
  { 
    id: 14, 
    translations: { hi: "आग", en: "Fire", de: "Feuer", fr: "Feu", es: "Fuego", ja: "火", zh: "火", ar: "نار", ru: "Огонь", ko: "불" }, 
    distractors: { hi: ["धुआं", "गर्मी", "राख"], en: ["Smoke", "Heat", "Ash"], de: ["Rauch", "Hitze", "Asche"], fr: ["Fumée", "Chaleur", "Cendre"], es: ["Humo", "Calor", "Ceniza"], ja: ["煙", "熱", "灰"], zh: ["烟雾", "热量", "灰烬"], ar: ["دخان", "حرارة", "رماد"], ru: ["Дым", "Тепло", "Пепел"], ko: ["연기", "열기", "재"] },
    image: "https://cdn-icons-png.flaticon.com/512/785/785116.png" 
  },
  { 
    id: 15, 
    translations: { hi: "पृथ्वी", en: "Earth", de: "Erde", fr: "Terre", es: "Tierra", ja: "地球", zh: "地球", ar: "أرض", ru: "Земля", ko: "지구" }, 
    distractors: { hi: ["आसमान", "ग्रह", "तारा"], en: ["Sky", "Planet", "Star"], de: ["Himmel", "Planet", "Stern"], fr: ["Ciel", "Planète", "Étoile"], es: ["Cielo", "Planeta", "Estrella"], ja: ["空", "惑星", "星"], zh: ["天空", "行星", "星星"], ar: ["سماء", "كوكب", "نجمة"], ru: ["Небо", "Планета", "Звезда"], ko: ["하늘", "행성", "별"] },
    image: "https://cdn-icons-png.flaticon.com/512/185/185834.png" 
  }
];

const PHRASE_CONCEPTS = [
  { 
    id: 1, 
    translations: { hi: "आपका नाम क्या है?", en: "What is your name?", de: "Wie heißt du?", fr: "Comment t'appelles-tu ?", es: "¿Cómo te llamas?", ja: "名前は何ですか？", zh: "你叫什么名字？", ar: "ما اسمك؟", ru: "Как тебя зовут?", ko: "이름이 뭐예요?" }, 
    distractors: { hi: ["आप कैसे हैं?", "कहाँ हैं?", "कौन हैं?"], en: ["How are you?", "Where are you?", "Who are you?"], de: ["Wie geht es dir?", "Wo bist du?", "Wer bist du?"], fr: ["Comment ça va ?", "Où es-tu ?", "Qui es-tu ?"], es: ["¿Cómo estás?", "¿Dónde estás?", "¿Quién eres?"], ja: ["お元気ですか？", "どこですか？", "誰ですか？"], zh: ["你好吗？", "你在哪里？", "你是谁？"], ar: ["كيف حالك؟", "أين أنت؟", "من أنت？"], ru: ["Как дела?", "Где ты?", "Кто ты?"], ko: ["어떻게 지내세요?", "어디예요?", "누구세요?"] },
    image: "https://cdn-icons-png.flaticon.com/512/236/236831.png" 
  },
  { 
    id: 2, 
    translations: { hi: "शुभ प्रभात", en: "Good morning", de: "Guten Morgen", fr: "Bonjour", es: "Buenos días", ja: "おはようございます", zh: "早上好", ar: "صباح الخير", ru: "Доброе утро", ko: "좋은 아침" }, 
    distractors: { hi: ["शुभ रात्रि", "नमस्ते", "अलविदा"], en: ["Good night", "Hello", "Goodbye"], de: ["Gute Nacht", "Hallo", "Auf Wiedersehen"], fr: ["Bonne nuit", "Bonjour", "Au revoir"], es: ["Buenas noches", "Hola", "Adiós"], ja: ["おやすみなさい", "こんにちは", "さようなら"], zh: ["晚安", "你好", "再见"], ar: ["تصبح على خير", "أهلاً", "وداعاً"], ru: ["Спокойной ночи", "Привет", "До свидания"], ko: ["안녕히 주무세요", "안녕하세요", "안녕히 가세요"] },
    image: "https://cdn-icons-png.flaticon.com/512/1163/1163662.png" 
  },
  { 
    id: 3, 
    translations: { hi: "धन्यवाद", en: "Thank you", de: "Danke", fr: "Merci", es: "Gracias", ja: "ありがとう", zh: "谢谢", ar: "شكراً", ru: "Спасибо", ko: "감사합니다" }, 
    distractors: { hi: ["माफ़ कीजिए", "हाँ", "नहीं"], en: ["Sorry", "Yes", "No"], de: ["Entschuldigung", "Ja", "Nein"], fr: ["Pardon", "Oui", "Non"], es: ["Perdón", "Sí", "No"], ja: ["ごめんなさい", "はい", "いいえ"], zh: ["对不起", "是", "不是"], ar: ["آسف", "نعم", "لا"], ru: ["Извините", "Да", "Нет"], ko: ["미안해요", "네", "아니요"] },
    image: "https://cdn-icons-png.flaticon.com/512/1000/1000143.png" 
  },
  { 
    id: 4, 
    translations: { hi: "हाँ", en: "Yes", de: "Ja", fr: "Oui", es: "Sí", ja: "はい", zh: "是", ar: "نعم", ru: "Да", ko: "네" }, 
    distractors: { hi: ["नहीं", "शायद", "कभी नहीं"], en: ["No", "Maybe", "Never"], de: ["Nein", "Vielleicht", "Niemals"], fr: ["Non", "Peut-être", "Jamais"], es: ["No", "Tal vez", "Nunca"], ja: ["いいえ", "多分", "決して"], zh: ["不是", "也许", "从不"], ar: ["لا", "ربما", "أبداً"], ru: ["Нет", "Может быть", "Никогда"], ko: ["아니요", "아마도", "절대"] },
    image: "https://cdn-icons-png.flaticon.com/512/190/190411.png" 
  },
  { 
    id: 5, 
    translations: { hi: "नहीं", en: "No", de: "Nein", fr: "Non", es: "No", ja: "いいえ", zh: "不是", ar: "لا", ru: "Нет", ko: "아니요" }, 
    distractors: { hi: ["हाँ", "ठीक है", "अच्छा"], en: ["Yes", "Okay", "Good"], de: ["Ja", "Okay", "Gut"], fr: ["Oui", "D'accord", "Bien"], es: ["Sí", "Vale", "Bien"], ja: ["はい", "オーケー", "良い"], zh: ["是", "好的", "好"], ar: ["نعم", "حسناً", "جيد"], ru: ["Да", "Хорошо", "Хороший"], ko: ["네", "좋아요", "좋은"] },
    image: "https://cdn-icons-png.flaticon.com/512/190/190406.png" 
  },
  { 
    id: 6, 
    translations: { hi: "माफ़ कीजिए", en: "Excuse me", de: "Entschuldigen Sie", fr: "Excusez-moi", es: "Perdone", ja: "すみません", zh: "打扰一下", ar: "معذرة", ru: "Извините", ko: "실례합니다" }, 
    distractors: { hi: ["धन्यवाद", "अलविदा", "नमस्ते"], en: ["Thank you", "Goodbye", "Hello"], de: ["Danke", "Auf Wiedersehen", "Hallo"], fr: ["Merci", "Au revoir", "Bonjour"], es: ["Gracias", "Adiós", "Hola"], ja: ["ありがとう", "さようなら", "こんにちは"], zh: ["谢谢", "再见", "你好"], ar: ["شكراً", "وداعاً", "أهلاً"], ru: ["Спасибо", "До свидания", "Привет"], ko: ["감사합니다", "안녕히 가세요", "안녕하세요"] },
    image: "https://cdn-icons-png.flaticon.com/512/4844/4844005.png" 
  },
  { 
    id: 7, 
    translations: { hi: "मुझे खेद है", en: "I am sorry", de: "Es tut mir leid", fr: "Je suis désolé", es: "Lo siento", ja: "ごめんなさい", zh: "对不起", ar: "أنا آسف", ru: "Мне жаль", ko: "미안합니다" }, 
    distractors: { hi: ["कोई बात नहीं", "धन्यवाद", "कृपया"], en: ["No problem", "Thank you", "Please"], de: ["Kein Problem", "Danke", "Bitte"], fr: ["Pas de problème", "Merci", "S'il vous plaît"], es: ["No hay problema", "Gracias", "Por favor"], ja: ["問題ない", "ありがとう", "お願いします"], zh: ["没关系", "谢谢", "请"], ar: ["لا مشكلة", "شكراً", "من فضلك"], ru: ["Нет проблем", "Спасибо", "Пожалуйста"], ko: ["문제 없어요", "감사합니다", "제발"] },
    image: "https://cdn-icons-png.flaticon.com/512/3233/3233481.png" 
  },
  { 
    id: 8, 
    translations: { hi: "अलविदा", en: "Goodbye", de: "Auf Wiedersehen", fr: "Au revoir", es: "Adiós", ja: "さようなら", zh: "再见", ar: "وداعاً", ru: "До свидания", ko: "안녕히 가세요" }, 
    distractors: { hi: ["नमस्ते", "स्वागत है", "धन्यवाद"], en: ["Hello", "Welcome", "Thank you"], de: ["Hallo", "Willkommen", "Danke"], fr: ["Bonjour", "Bienvenue", "Merci"], es: ["Hola", "Bienvenido", "Gracias"], ja: ["こんにちは", "ようこそ", "ありがとう"], zh: ["你好", "欢迎", "谢谢"], ar: ["أهلاً", "أهلاً بك", "شكراً"], ru: ["Привет", "Добро пожаловать", "Спасибо"], ko: ["안녕하세요", "환영합니다", "감사합니다"] },
    image: "https://cdn-icons-png.flaticon.com/512/3596/3596144.png" 
  },
  { 
    id: 9, 
    translations: { hi: "कृपया", en: "Please", de: "Bitte", fr: "S'il vous plaît", es: "Por favor", ja: "お願いします", zh: "请", ar: "من فضلك", ru: "Пожалуйста", ko: "제발" }, 
    distractors: { hi: ["धन्यवाद", "हाँ", "नहीं"], en: ["Thank you", "Yes", "No"], de: ["Danke", "Ja", "Nein"], fr: ["Merci", "Oui", "Non"], es: ["Gracias", "Sí", "No"], ja: ["ありがとう", "はい", "いいえ"], zh: ["谢谢", "是", "不是"], ar: ["شكراً", "نعم", "لا"], ru: ["Спасибо", "Да", "Нет"], ko: ["감사합니다", "네", "아니요"] },
    image: "https://cdn-icons-png.flaticon.com/512/3364/3364402.png" 
  },
  { 
    id: 10, 
    translations: { hi: "मदद", en: "Help", de: "Hilfe", fr: "Aide", es: "Ayuda", ja: "助けて", zh: "帮助", ar: "مساعدة", ru: "Помощь", ko: "도와주세요" }, 
    distractors: { hi: ["रुको", "जाओ", "आओ"], en: ["Stop", "Go", "Come"], de: ["Halt", "Geh", "Komm"], fr: ["Arrêt", "Aller", "Venir"], es: ["Parar", "Ir", "Venir"], ja: ["止まれ", "行く", "来る"], zh: ["停止", "去", "来"], ar: ["قف", "اذهب", "تعال"], ru: ["Стоп", "Идти", "Прийти"], ko: ["멈춰", "가", "와"] },
    image: "https://cdn-icons-png.flaticon.com/512/1076/1076329.png" 
  },
  { 
    id: 11, 
    translations: { hi: "मुझे समझ नहीं आया", en: "I don't understand", de: "Ich verstehe nicht", fr: "Je ne comprends pas", es: "No entiendo", ja: "わかりません", zh: "我不明白", ar: "لا أفهم", ru: "Я не понимаю", ko: "이해를 못하겠어요" }, 
    distractors: { hi: ["मुझे पता है", "मैंने देखा", "मैंने सुना"], en: ["I know", "I saw", "I heard"], de: ["Ich weiß", "Ich sah", "Ich hörte"], fr: ["Je sais", "J'ai vu", "J'ai entendu"], es: ["Lo sé", "Vi", "Escuché"], ja: ["知っています", "見ました", "聞きました"], zh: ["我知道", "我看到了", "我听到了"], ar: ["أنا أعرف", "رأيت", "سمعت"], ru: ["Я знаю", "Я видел", "Я слышал"], ko: ["알아요", "봤어요", "들었어요"] },
    image: "https://cdn-icons-png.flaticon.com/512/6559/6559981.png" 
  },
  { 
    id: 12, 
    translations: { hi: "क्या आप अंग्रेज़ी बोलते हैं?", en: "Do you speak English?", de: "Sprechen Sie Englisch?", fr: "Parlez-vous anglais ?", es: "¿Habla inglés?", ja: "英語を話しますか？", zh: "你会说英语吗？", ar: "هل تتحدث الإنجليزية؟", ru: "Вы говорите по-английски?", ko: "영어 할 줄 아세요?" }, 
    distractors: { hi: ["आप कैसे हैं?", "आपका नाम क्या है?", "आप कहाँ हैं?"], en: ["How are you?", "What is your name?", "Where are you?"], de: ["Wie geht es dir?", "Wie heißt du?", "Wo bist du?"], fr: ["Comment ça va ?", "Comment t'appelles-tu ?", "Où es-tu ?"], es: ["¿Cómo estás?", "¿Cómo te llamas?", "¿Dónde estás?"], ja: ["お元気ですか？", "名前は何ですか？", "どこですか？"], zh: ["你好吗？", "你叫什么名字？", "你在哪里？"], ar: ["كيف حالك؟", "ما اسمك؟", "أين أنت؟"], ru: ["Как дела?", "Как тебя зовут?", "Где ты?"], ko: ["어떻게 지내세요?", "이름이 뭐예요?", "어디예요?"] },
    image: "https://cdn-icons-png.flaticon.com/512/2991/2991114.png" 
  },
  { 
    id: 13, 
    translations: { hi: "शौचालय कहाँ है?", en: "Where is the bathroom?", de: "Wo ist die Toilette?", fr: "Où sont les toilettes ?", es: "¿Dónde está el baño?", ja: "トイレはどこですか？", zh: "洗手间在哪里？", ar: "أين الحمام؟", ru: "Где туалет?", ko: "화장실이 어디예요?" }, 
    distractors: { hi: ["स्टेशन कहाँ है?", "होटल कहाँ है?", "अस्पताल कहाँ है?"], en: ["Where is the station?", "Where is the hotel?", "Where is the hospital?"], de: ["Wo ist der Bahnhof?", "Wo ist das Hotel?", "Wo ist das Krankenhaus?"], fr: ["Où est la gare ?", "Où est l'hôtel ?", "Où est l'hôpital ?"], es: ["¿Dónde está la estación?", "¿Dónde está el hotel?", "¿Dónde está el hospital?"], ja: ["駅はどこですか？", "ホテルはどこですか？", "病院はどこですか？"], zh: ["车站在哪里？", "酒店在哪里？", "医院在哪里？"], ar: ["أين المحطة؟", "أين الفندق؟", "أين المستشفى؟"], ru: ["Где вокзал?", "Где отель?", "Где больница?"], ko: ["역이 어디예요?", "호텔이 어디예요?", "병원이 어디예요?"] },
    image: "https://cdn-icons-png.flaticon.com/512/3233/3233483.png" 
  },
  { 
    id: 14, 
    translations: { hi: "यह कितने का है?", en: "How much is this?", de: "Wie viel kostet das?", fr: "Combien ça coûte ?", es: "¿Cuánto cuesta esto?", ja: "これはいくらですか？", zh: "这个多少钱？", ar: "بكم هذا؟", ru: "Сколько это стоит?", ko: "이거 얼마예요?" }, 
    distractors: { hi: ["यह क्या है?", "यह कब है?", "यह कहाँ है?"], en: ["What is this?", "When is this?", "Where is this?"], de: ["Was ist das?", "Wann ist das?", "Wo ist das?"], fr: ["Qu'est-ce que c'est ?", "C'est quand ?", "C'est où ?"], es: ["¿Qué es esto?", "¿Cuándo es esto?", "¿Dónde está esto?"], ja: ["これは何ですか？", "これはいつですか？", "これはどこですか？"], zh: ["这是什么？", "这是什么时候？", "这是哪里？"], ar: ["ما هذا؟", "متى هذا؟", "أين هذا؟"], ru: ["Что это?", "Когда это?", "Где это?"], ko: ["이게 뭐예요?", "이게 언제예요?", "이게 어디예요?"] },
    image: "https://cdn-icons-png.flaticon.com/512/3145/3145826.png" 
  },
  { 
    id: 15, 
    translations: { hi: "मैं तुमसे प्यार करता हूँ", en: "I love you", de: "Ich liebe dich", fr: "Je t'aime", es: "Te amo", ja: "愛しています", zh: "我爱你", ar: "أنا أحبك", ru: "Я тебя люблю", ko: "사랑해요" }, 
    distractors: { hi: ["मुझे यह पसंद है", "मैं खुश हूँ", "मैं दुखी हूँ"], en: ["I like this", "I am happy", "I am sad"], de: ["Ich mag das", "Ich bin glücklich", "Ich bin traurig"], fr: ["J'aime ça", "Je suis heureux", "Je suis triste"], es: ["Me gusta esto", "Estoy feliz", "Estoy triste"], ja: ["これが好きです", "私は幸せです", "私は悲しいです"], zh: ["我喜欢这个", "我很高兴", "我很伤心"], ar: ["يعجبني هذا", "أنا سعيد", "أنا حزين"], ru: ["Мне это нравится", "Я счастлив", "Мне грустно"], ko: ["이거 좋아해요", "저는 행복해요", "저는 슬퍼요"] },
    image: "https://cdn-icons-png.flaticon.com/512/833/833472.png" 
  }
];

const CONVERSATION_FLOW = [
  { speaker: 'boy', hi: "नमस्ते", en: "Hello", de: "Hallo", fr: "Bonjour", es: "Hola", ja: "こんにちは", zh: "你好", ar: "مرحباً", ru: "Привет", ko: "안녕하세요" },
  { speaker: 'girl', hi: "नमस्ते राहुल, आप कैसे हैं?", en: "Hello Rahul, how are you?", de: "Hallo Rahul, wie geht es dir?", fr: "Bonjour Rahul, comment ça va ?", es: "Hola Rahul, ¿cómo estás?", ja: "こんにちは、ラフルさん。お元気ですか？", zh: "你好，Rahul。你好吗？", ar: "مرحباً راهول، كيف حالك؟", ru: "Привет, Рахул. Как дела?", ko: "안녕하세요 라훌 씨. 어떻게 지내세요?" },
  { speaker: 'boy', hi: "मैं ठीक हूँ, धन्यवाद। और आप?", en: "I'm fine, thank you. And you?", de: "Mir geht es gut, danke. Und dir?", fr: "Ça va bien, merci. Et toi ?", es: "Estoy bien, gracias. ¿Y tú?", ja: "元気です、ありがとう。あなたは？", zh: "我很好，谢谢。你呢？", ar: "أنا بخير، شكراً. وأنت؟", ru: "Я в порядке, спасибо. А у тебя?", ko: "잘 지내요, 감사합니다. 당신은요?" },
  { speaker: 'girl', hi: "मैं भी ठीक हूँ। आज आप क्या कर रहे हैं?", en: "I'm fine too. What are you doing today?", de: "Mir geht es auch gut. Was machst du heute?", fr: "Ça va bien aussi. Que fais-tu aujourd'hui ?", es: "Yo también estoy bien. ¿Qué haces hoy?", ja: "私も元気です。今日は何をしていますか？", zh: "我也很好。你今天在做什么？", ar: "أنا بخير أيضاً. ماذا تفعل اليوم？", ru: "Я тоже в порядке. Что ты делаешь сегодня?", ko: "저도 잘 지내요. 오늘 뭐 하세요?" },
  { speaker: 'boy', hi: "मैं नई भाषा सीख रहा हूँ।", en: "I am learning a new language.", de: "Ich lerne eine neue Sprache.", fr: "J'apprends une nouvelle langue.", es: "Estoy aprendiendo un nuevo idioma.", ja: "新しい言語を勉強しています。", zh: "我正在学习一门新语言。", ar: "أنا أتعلم لغة جديدة.", ru: "Я изучаю новый язык.", ko: "저는 새로운 언어를 배우고 있어요." },
  { speaker: 'girl', hi: "यह बहुत अच्छा है! कौन सी भाषा?", en: "That's great! Which language?", de: "Das ist toll! Welche Sprache?", fr: "C'est super ! Quelle langue ?", es: "¡Eso es genial! ¿Qué idioma?", ja: "それは素晴らしいですね！どの言語ですか？", zh: "那太好了！哪种语言？", ar: "هذا رائع! أي لغة？", ru: "Это здорово! Какой язык?", ko: "대단하네요! 어떤 언어인가요?" },
  { speaker: 'boy', hi: "मैं अभी जर्मन सीख रहा हूँ।", en: "I am learning German right now.", de: "Ich lerne gerade Deutsch.", fr: "J'apprends l'allemand en ce moment.", es: "Estoy aprendiendo alemán ahora mismo.", ja: "今、ドイツ語 को勉強しています。", zh: "我正在学习德语。", ar: "أنا أتعلم الألمانية الآن.", ru: "Я сейчас изучаю немецкий.", ko: "지금 독일어를 배우고 있어요." },
  { speaker: 'girl', hi: "जर्मन एक सुंदर भाषा है।", en: "German is a beautiful language.", de: "Deutsch ist eine schöne Sprache.", fr: "L'allemand est une belle langue.", es: "El alemán es un idioma hermoso.", ja: "ドイツ語は美しい言語です。", zh: "德语是一门美丽的语言。", ar: "الألمانية لغة جميلة.", ru: "Немецкий — красивый язык.", ko: "독일어는 아름다운 언어예요." },
  { speaker: 'boy', hi: "हाँ, मुझे यह बहुत पसंद है।", en: "Yes, I like it very much.", de: "Ja, ich mag es sehr.", fr: "Oui, j'aime beaucoup ça.", es: "Sí, me gusta mucho.", ja: "はい、とても気に入っています。", zh: "是的，我很喜欢它。", ar: "نعم، أنا أحبها كثيراً.", ru: "Да, мне это очень нравится.", ko: "네, 정말 좋아해요." },
  { speaker: 'girl', hi: "शुभकामनाएं! बाद में मिलते हैं।", en: "Good luck! See you later.", de: "Viel Glück! Bis später.", fr: "Bonne chance ! À plus tard.", es: "¡Buena suerte! Hasta luego.", ja: "頑張ってください！また後で。", zh: "祝你好运！回头见。", ar: "بالتوفيق! أراك لاحقاً.", ru: "Удачи! До встречи.", ko: "행운을 빌어요! 나중에 봐요." }
];

const LANG_NAMES = {
  hi: { hi: "हिंदी", en: "अंग्रेजी", de: "जर्मन", fr: "फ्रेंच", es: "स्पैनिश", ja: "जापानी", ko: "कोरियाई", ru: "रूसी", ar: "अरबी", it: "इतालवी", zh: "चीनी" },
  en: { hi: "Hindi", en: "English", de: "German", fr: "French", es: "Spanish", ja: "Japanese", ko: "Korean", ru: "Russian", ar: "Arabic", it: "Italian", zh: "Chinese" },
  de: { hi: "Hindi", en: "Englisch", de: "Deutsch", fr: "Französisch", es: "Spanisch", ja: "Japanisch", ko: "Koreanisch", ru: "Russisch", ar: "Arabisch", it: "Italienisch", zh: "Chinesisch" },
  fr: { hi: "Hindi", en: "Anglais", de: "Allemand", fr: "Français", es: "Espagnol", ja: "Japonais", ko: "Coréen", ru: "Russe", ar: "Arabe", it: "Italien", zh: "Chinois" },
  es: { hi: "Hindi", en: "Inglés", de: "Alemán", fr: "Francés", es: "Español", ja: "Japonés", ko: "Coreano", ru: "Ruso", ar: "Árabe", it: "Italiano", zh: "Chino" },
  ja: { hi: "ヒンディー語", en: "英語", de: "ドイツ語", fr: "フランス語", es: "スペイン語", ja: "日本語", ko: "韓国語", ru: "ロシア語", ar: "アラビア語", it: "イタリア語", zh: "中国語" },
  zh: { hi: "印地语", en: "英语", de: "德语", fr: "法语", es: "西班牙语", ja: "日语", ko: "韩语", ru: "俄语", ar: "阿拉伯语", it: "意大利语", zh: "中文" },
  ar: { hi: "الهندية", en: "الإنجليزية", de: "الألمانية", fr: "الفرنسية", es: "الإسبانية", ja: "اليابانية", ko: "الكورية", ru: "الروسية", ar: "العربية", it: "الإيطالية", zh: "الصينية" },
  ru: { hi: "Хинди", en: "Английский", de: "Немецкий", fr: "Французский", es: "Испанский", ja: "Японский", ko: "Корейский", ru: "Русский", ar: "Арабский", it: "Итальянский", zh: "Китайский" },
  ko: { hi: "힌디어", en: "영어", de: "독일어", fr: "프랑스어", es: "스페인어", ja: "일본어", ko: "한국어", ru: "러시아어", ar: "아랍어", it: "이탈리아어", zh: "중국어" }
};

const UI_STRINGS = {
  hi: {
    question_sia: (word, target) => `सिया, क्या आप जानते हैं कि '${word}' को ${target} में क्या कहते हैं?`,
    question_main: (target) => `क्या आप जानते हैं कि इसे ${target} में क्या कहते हैं?`,
    question_conv: (target) => `इस बातचीत को ${target} में पूरा करें:`,
    guess_girl: (word) => `हम्म... मुझे लगता है कि यह "${word}" हो सकता है?`,
    streak: "डेली स्ट्रीक", goal: "आज का लक्ष्य", progress: "पाठ की प्रगति", dont_know: "पता नहीं", check: "जांचें", back: "पीछे", amazing: "अद्भुत!", excellent: "बहुत बढ़िया!", oops: "ओह!", correct_msg: "सही उत्तर! अगले सवाल पर...", wrong_msg: "यह सही नहीं है।", try_again: "फिर से कोशिश करें", words: "शब्द", days: "दिन", lesson_complete: "पाठ पूरा हुआ!", back_home: "वापस घर", try_again_hint: "चिंता न करें, आप फिर से कोशिश कर सकते हैं!", continue: "जारी रखें"
  },
  en: {
    question_sia: (word, target) => `Sia, do you know what '${word}' is called in ${target}?`,
    question_main: (target) => `Do you know what this is called in ${target}?`,
    question_conv: (target) => `Complete this conversation in ${target}:`,
    guess_girl: (word) => `Hmm... I think it might be "${word}"?`,
    streak: "Daily Streak", goal: "Today's Goal", progress: "Lesson Progress", dont_know: "I don't know", check: "Check", back: "Back", amazing: "Amazing!", excellent: "Excellent!", oops: "Oops!", correct_msg: "You got it right! Next...", wrong_msg: "That's not correct.", try_again: "Try Again", words: "words", days: "days", lesson_complete: "Lesson Complete!", back_home: "Back to Home", try_again_hint: "Don't worry, you can try again!", continue: "Continue"
  },
  de: {
    question_sia: (word, target) => `Sia, weißt du, wie man '${word}' auf ${target} sagt?`,
    question_main: (target) => `Weißt du, wie man das auf ${target} nennt?`,
    question_conv: (target) => `Vervollständige dieses Gespräch auf ${target}:`,
    guess_girl: (word) => `Hmm... ich glaube, es könnte "${word}" sein?`,
    streak: "Streak", goal: "Tagesziel", progress: "Fortschritt", dont_know: "Ich weiß nicht", check: "Prüfen", back: "Zurück", amazing: "Toll!", excellent: "Sehr gut!", oops: "Hoppla!", correct_msg: "Das ist richtig! Weiter...", wrong_msg: "Falsch.", try_again: "Erneut versuchen", words: "Wörter", days: "Tage", lesson_complete: "Abgeschlossen!", back_home: "Startseite", try_again_hint: "Versuche es noch einmal!", continue: "Weiter"
  }
};

export default function LingModule({ type }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const sourceLang = location.state?.source || "hi";
  const targetLang = location.state?.target || "de";
  const t = UI_STRINGS[sourceLang] || UI_STRINGS.en;
  const targetLangName = (LANG_NAMES[sourceLang] || LANG_NAMES.en)[targetLang] || targetLang;
  
  let rawData = [];
  if (type === "words") rawData = WORD_CONCEPTS;
  else if (type === "phrases") rawData = PHRASE_CONCEPTS;
  else if (type === "conversations") rawData = CONVERSATION_FLOW;

  const items = rawData.map((concept, idx) => {
    if (type === "conversations") {
      return {
        id: idx + 1,
        speaker: concept.speaker,
        text: concept[targetLang] || concept.en,
        native: concept[sourceLang] || concept.hi,
        distractors: [],
        target: concept[targetLang] || concept.en,
        isConversation: true
      };
    }
    const native = concept.translations[sourceLang] || concept.translations.en;
    const target = concept.translations[targetLang] || concept.translations.en;
    const distractors = concept.distractors?.[targetLang] || concept.distractors?.en || [];
    return {
      id: concept.id,
      native,
      target,
      distractors,
      image: concept.image,
      translation: concept.translations.en 
    };
  });
  
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [streak, setStreak] = useState(7);
  const [dailyProgress, setDailyProgress] = useState(5);
  const dailyTotal = 10;

  const currentItem = items[step];
  const progress = ((step + 1) / items.length) * 100;

  const shuffledOptions = useMemo(() => {
    if (!currentItem || type === 'conversations') return [];
    return [currentItem.target, ...currentItem.distractors];
  }, [currentItem, type]);

  const handleSpeak = (text, langCode) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const langMap = {
      'de': 'de-DE', 'fr': 'fr-FR', 'es': 'es-ES', 'hi': 'hi-IN', 'en': 'en-US', 
      'ja': 'ja-JP', 'ko': 'ko-KR', 'it': 'it-IT', 'ru': 'ru-RU', 'zh': 'zh-CN', 'ar': 'ar-SA'
    };
    utterance.lang = langMap[langCode] || 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.1; 
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      const voice = voices.find(v => v.lang.startsWith(utterance.lang));
      if (voice) utterance.voice = voice;
    }
    window.speechSynthesis.speak(utterance);
  };

  const handleNext = () => {
    if (step < items.length - 1) {
      const nextStep = step + 1;
      setStep(nextStep);
      setInputValue("");
      setShowFeedback(false);
      setIsCorrect(null);
      if (type === 'conversations') {
        const newDailyProgress = dailyProgress + 1;
        setDailyProgress(newDailyProgress);
        localStorage.setItem("ling_daily_progress", newDailyProgress);
        const moduleKey = `ling_${type}_progress`;
        localStorage.setItem(moduleKey, (parseInt(localStorage.getItem(moduleKey) || "0")) + 1);
        setTimeout(() => handleSpeak(items[nextStep].text, targetLang), 500);
      } else {
        handleSpeak(t.question_main(targetLangName), sourceLang);
        setTimeout(() => handleSpeak(items[nextStep].target, targetLang), 1800);
      }
    } else setIsCompleted(true);
  };

  useEffect(() => {
    const savedStreak = localStorage.getItem("ling_streak") || "7";
    const savedProgress = localStorage.getItem("ling_daily_progress") || "5";
    const lastDate = localStorage.getItem("ling_last_active");
    const today = new Date().toISOString().split('T')[0];
    let currentStreak = parseInt(savedStreak);
    let currentProgress = parseInt(savedProgress);

    if (lastDate !== today) {
      if (lastDate) {
        const last = new Date(lastDate);
        const current = new Date(today);
        const diffTime = Math.abs(current - last);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays === 1) currentStreak += 1;
        else if (diffDays > 1) currentStreak = 1;
      } else currentStreak = 1;
      currentProgress = 0;
      localStorage.setItem("ling_streak", currentStreak);
      localStorage.setItem("ling_last_active", today);
      localStorage.setItem("ling_daily_progress", "0");
    }
    setStreak(currentStreak);
    setDailyProgress(currentProgress);
    
    const timer = setTimeout(() => {
      if (currentItem) {
        if (type !== 'conversations') {
          handleSpeak(t.question_main(targetLangName), sourceLang);
          setTimeout(() => handleSpeak(currentItem.target, targetLang), 1800);
        } else handleSpeak(currentItem.text, targetLang);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let timer;
    if (isCorrect === true && type !== 'conversations') {
      handleSpeak(currentItem.target, targetLang);
      const newDailyProgress = dailyProgress + 1;
      setDailyProgress(newDailyProgress);
      localStorage.setItem("ling_daily_progress", newDailyProgress);
      const moduleKey = `ling_${type}_progress`;
      localStorage.setItem(moduleKey, (parseInt(localStorage.getItem(moduleKey) || "0")) + 1);
      timer = setTimeout(() => handleNext(), 2000);
    }
    return () => clearTimeout(timer);
  }, [isCorrect]);

  const handleCheck = () => {
    if (inputValue.toLowerCase() === currentItem.target.toLowerCase()) {
      setIsCorrect(true);
      setShowFeedback(true);
    } else {
      setIsCorrect(false);
      setShowFeedback(true);
    }
  };

  const handleTryAgain = () => {
    setShowFeedback(false);
    setIsCorrect(null);
    setInputValue("");
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setInputValue("");
      setShowFeedback(false);
      setIsCorrect(null);
    }
  };

  if (!currentItem) return null;
  if (isCompleted) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <Trophy size={100} className="text-[#0BB562] mb-8 animate-bounce" />
        <h1 className="text-4xl font-black mb-4">{t.lesson_complete}</h1>
        <button onClick={() => navigate("/")} className="bg-[#0BB562] text-white px-10 py-4 rounded-2xl font-bold">{t.back_home}</button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen font-sans text-[#1A1C2E] flex flex-col overflow-hidden transition-all duration-700 ${type === 'conversations' ? 'bg-black' : 'bg-[#F9FBFF]'}`}>
      <style>{`
        @keyframes bounce-subtle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .animate-bounce-subtle { animation: bounce-subtle 3s ease-in-out infinite; }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.4s ease-out forwards; }
        .convo-bg { background-image: url('/images/linguistic/convo.png'); background-size: cover; background-position: center; position: absolute; inset: 0; opacity: 0.9; }
        .bubble-glow { box-shadow: 0 0 40px rgba(255, 255, 255, 0.4), 0 10px 20px rgba(0, 0, 0, 0.1); }
      `}</style>
      
      {type === 'conversations' && <div className="convo-bg" />}

      {showFeedback && (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300 ${isCorrect ? 'bg-emerald-500/10' : 'bg-rose-500/10'} backdrop-blur-[4px]`}>
          <div className="bg-white rounded-[40px] p-8 shadow-xl border border-slate-100 flex flex-col items-center gap-6 animate-fade-in-up max-w-[320px] w-full mx-4">
              {isCorrect ? (
                <>
                  <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500"><CheckCircle size={60} strokeWidth={2.5} /></div>
                  <div className="text-center"><h2 className="text-3xl font-black text-slate-900 mb-2">{t.amazing}</h2><p className="text-emerald-600 font-bold leading-tight">{t.correct_msg}</p></div>
                  <button onClick={handleNext} className="w-full bg-[#0BB562] text-white py-4 rounded-2xl font-black shadow-lg shadow-emerald-200 active:scale-95 transition-all flex items-center justify-center gap-2">Continue <ChevronRight size={20} strokeWidth={3} /></button>
                </>
              ) : (
                <>
                  <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center text-rose-500"><X size={60} strokeWidth={2.5} /></div>
                  <div className="text-center"><h2 className="text-3xl font-black text-slate-900 mb-2">{t.oops}</h2><p className="text-slate-500 font-bold leading-tight mb-1">{t.wrong_msg}</p><p className="text-slate-400 text-sm">{t.try_again_hint}</p></div>
                  <button onClick={handleTryAgain} className="w-full bg-rose-500 text-slate-500 py-4 rounded-2xl font-black shadow-lg shadow-rose-200 active:scale-95 transition-all flex items-center justify-center gap-2">Try Again <ArrowRight size={20} strokeWidth={3} /></button>
                </>
              )}
          </div>
        </div>
      )}

       <main className={`flex-1 ${type === 'conversations' ? 'flex flex-col' : 'grid grid-cols-[1fr_1fr_1fr] items-center px-4 md:px-12 pb-5 gap-2'} min-h-0 relative max-w-[1400px] mx-auto w-full z-10`}>
        <button onClick={() => navigate("/ling")} className="absolute top-4 left-8 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-sm flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all border border-slate-50 z-50">
          <ArrowLeft size={20} strokeWidth={2.5} />
        </button>

        {type === 'conversations' ? (
          <div className="flex-1 flex flex-col relative overflow-hidden">
             {/* Fine-tuned Ultra Compact Dual Bubble Area */}
             <div className="flex-1 relative flex flex-col justify-center px-4 md:pl-[40%] md:pr-[18%] pb-48 gap-4">
                
                <div key={step} className={`flex w-full ${currentItem.speaker === 'boy' ? 'justify-start' : 'justify-end'} animate-fade-in-up`}>
                   <div className={`relative max-w-[260px] p-4 rounded-[30px] shadow-[0_8px_30px_rgba(0,0,0,0.05)] border-2 transition-all duration-500
                      ${currentItem.speaker === 'boy' 
                        ? 'bg-[#F1FAF6] border-emerald-50 rounded-bl-none' 
                        : 'bg-[#FFFDF9] border-orange-50 rounded-br-none mr-48'}`}>
                      
                      <div className="flex items-start gap-3">
                         <div 
                           onClick={() => handleSpeak(currentItem.text, targetLang)} 
                           className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-sm flex-shrink-0
                              ${currentItem.speaker === 'boy' ? 'bg-white text-[#0BB562]' : 'bg-white text-orange-400'}`}
                         >
                            <Volume2 size={18} fill="currentColor" />
                         </div>
                         <div className="flex-1">
                            <h2 className="text-[16px] font-black text-slate-800 leading-tight mb-0.5">{currentItem.text}</h2>
                            <p className="text-[13px] text-slate-400 font-bold mb-1.5">{currentItem.en || currentItem.text}</p>
                            <div className={`h-[1.2px] w-6 mb-1.5 ${currentItem.speaker === 'boy' ? 'bg-emerald-100' : 'bg-orange-100'}`} />
                            <p className="text-[14px] text-slate-500 font-bold italic leading-snug">{currentItem.native}</p>
                         </div>
                      </div>

                      {/* Micro Tail Decorations */}
                      <div className={`absolute -bottom-5 flex flex-col gap-1 ${currentItem.speaker === 'boy' ? 'left-4' : 'right-4'}`}>
                         <div className="w-3.5 h-3.5 rounded-full bg-white shadow-sm border border-slate-50" />
                         <div className="w-2 h-2 rounded-full bg-white shadow-sm border border-slate-50" />
                      </div>

                      {/* Micro Label */}
                      <div className={`absolute -top-2 px-2.5 py-0.5 rounded-full text-[7.5px] font-black uppercase tracking-[0.2em] shadow-sm
                         ${currentItem.speaker === 'boy' ? 'left-5 bg-[#0BB562] text-white' : 'right-5 bg-orange-400 text-white'}`}>
                         {currentItem.speaker}
                      </div>
                   </div>
                </div>

                <div className={`flex w-full opacity-5 grayscale scale-50 ${currentItem.speaker === 'boy' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`w-16 h-8 rounded-[15px] border-2 border-dashed ${currentItem.speaker === 'boy' ? 'border-orange-200' : 'border-emerald-200'}`} />
                </div>
             </div>

             {/* Sleek Centered Navigation */}
             <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4">
                {step > 0 && (
                   <button 
                     onClick={handleBack}
                     className="px-8 py-3.5 bg-white text-slate-400 rounded-2xl font-black text-[17px] shadow-lg border-b-4 border-slate-200 hover:translate-y-[-2px] active:border-b-0 active:translate-y-[2px] transition-all flex items-center gap-2 group"
                   >
                     <ArrowLeft size={20} strokeWidth={3} className="group-hover:-translate-x-1.5 transition-transform" /> Back
                   </button>
                )}

                <button 
                  onClick={handleNext}
                  className="px-14 py-3.5 bg-[#0BB562] text-white rounded-2xl font-black text-[18px] shadow-xl shadow-emerald-100 border-b-4 border-emerald-700 hover:translate-y-[-2px] active:border-b-0 active:translate-y-[2px] transition-all flex items-center gap-3 group"
                >
                  {step === items.length - 1 ? 'Finish' : 'Next'} <ArrowRight size={24} strokeWidth={3} className="group-hover:translate-x-1.5 transition-transform" />
                </button>
             </div>

             
          </div>
        ) : (
          <>
            <div className="relative h-full flex flex-col justify-end items-center pb-4">
              <div className="absolute top-[18%] left-[60%] -translate-x-1/2 w-40 p-3 bg-[#EDF9F2] rounded-[20px] rounded-bl-none shadow-md border border-emerald-50 z-10"><p className="text-[14px] font-medium leading-relaxed">{t.question_sia(currentItem.native, targetLangName)}</p><div className="absolute -bottom-7 left-6 flex flex-col gap-2"><div className="w-5 h-5 rounded-full bg-[#EDF9F2]" /><div className="w-3 h-3 rounded-full bg-[#EDF9F2]" /></div></div>
              <img src="/images/linguistic/boy.png" alt="Boy" className="w-[200px] h-auto object-contain max-h-[45vh] -ml-24" />
            </div>
            <div className="flex flex-col items-center gap-3 py-2 -ml-16">
              <h1 className="text-lg font-black text-center mb-0">{t.question_main(targetLangName)}</h1>
              <div className="w-full max-w-[280px] aspect-[1/1.1] bg-white rounded-[32px] shadow-xl shadow-slate-300/40 flex flex-col items-center justify-center p-6 relative border border-slate-50">
                  <div onClick={() => handleSpeak(currentItem.target, targetLang)} className="absolute top-4 right-4 w-9 h-9 bg-[#F1FAF6] rounded-full flex items-center justify-center text-[#0BB562] cursor-pointer hover:scale-110 transition-transform active:scale-90"><Volume2 size={18} /></div>
                  <img src={currentItem.image} className="w-[100px] h-[100px] object-contain mb-4 animate-bounce-subtle" alt="Word" />
                  <div className="text-center"><div className="text-4xl font-black mb-1">{currentItem.native}</div><div className="h-0.5 w-20 bg-[#F1FAF6] mx-auto mb-2" /><div className="text-[14px] text-slate-400 font-bold tracking-widest uppercase opacity-60">{currentItem.translation}</div></div>
              </div>
              <div className="w-full max-w-[380px] space-y-3"><div className="flex flex-wrap justify-center gap-2">{shuffledOptions.map((option, idx) => (<button key={idx} onClick={() => !showFeedback && setInputValue(option)} className={`px-6 py-3 rounded-2xl font-black text-[15px] transition-all border-2 active:scale-95 ${inputValue === option ? "bg-[#0BB562] text-white border-[#0BB562] shadow-lg shadow-emerald-100" : "bg-white text-slate-600 border-slate-100 hover:border-emerald-100"}`}>{option}</button>))}</div></div>
            </div>
            <div className="relative h-full flex flex-col justify-end items-center pb-4">
              {/* Girl's Hint Bubble (Restored Yellowish-Orange) */}
              <div className="absolute top-[20%] right-[75%] translate-x-1/2 w-44 p-3 bg-orange-50 rounded-[20px] rounded-br-none shadow-md border border-yellow-100 z-10">
                <p className="text-[14px] font-medium leading-relaxed text-slate-800">{t.guess_girl(currentItem.target)}</p>
                <div className="absolute -bottom-7 right-6 flex flex-col gap-2"><div className="w-5 h-5 rounded-full bg-orange shadow-sm" /><div className="w-3 h-3 rounded-full bg-[#FFFDF9] shadow-sm" /></div>
              </div>
              
              <div className="absolute top-1/2 -right-8 -translate-y-1/2 w-[160px] bg-white rounded-[32px] p-6 shadow-xl border border-slate-50 z-30 scale-90 origin-right">
                  <div className="text-center"><div className="text-[13px] font-medium text-slate-600 mb-4">{t.streak}</div><div className="relative w-24 h-24 mx-auto flex items-center justify-center"><svg className="w-full h-full -rotate-90"><circle cx="48" cy="48" r="42" fill="transparent" stroke="#FFF8EA" strokeWidth="6" /><circle cx="48" cy="48" r="42" fill="transparent" stroke="#FF9800" strokeWidth="6" strokeDasharray="264" strokeDashoffset={264 - ((streak % 7 || 7) / 7) * 264} strokeLinecap="round" className="transition-all duration-1000" /></svg><div className="absolute flex flex-col items-center"><div className="flex items-center gap-1"><Flame size={20} className="text-[#FF9800] fill-[#FF9800]" /><span className="text-2xl font-black text-[#1A1C2E]">{streak}</span></div><span className="text-[10px] font-bold text-slate-400">{t.days}</span></div></div></div>
                  <div className="space-y-3 mt-4"><div className="text-[13px] text-center font-medium text-slate-600">{t.goal}</div><div className="flex items-baseline gap-1"><span className="text-sm font-black text-[#1A1C2E]">{dailyProgress} / {dailyTotal}</span><span className="text-[10px] font-bold text-slate-400">{t.words}</span></div><div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-[#0BB562] transition-all duration-500 rounded-full" style={{ width: `${(dailyProgress/dailyTotal) * 100}%` }} /></div></div>
                  <div className="text-center pt-2 mt-4"><div className="text-[13px] font-medium text-slate-600 mb-4">{t.progress}</div><div className="relative w-24 h-24 mx-auto flex items-center justify-center"><svg className="w-full h-full -rotate-90"><circle cx="48" cy="48" r="42" fill="transparent" stroke="#F1FAF6" strokeWidth="8" /><circle cx="48" cy="48" r="42" fill="transparent" stroke="#0BB562" strokeWidth="8" strokeDasharray="264" strokeDashoffset={264 - (progress/100)*264} strokeLinecap="round" /></svg><div className="absolute flex flex-col items-center"><div className="text-xl font-black text-[#1A1C2E]">{step + 1}/{items.length}</div><span className="text-[10px] font-bold text-slate-400">{t.words}</span></div></div></div>
              </div>
              <img src="/images/linguistic/girl.png" alt="Girl" className="w-[170px] h-auto object-contain max-h-[45vh] -ml-28" />
            </div>
          </>
        )}
      </main>

      {type !== 'conversations' && (
        <div className="flex justify-center items-center gap-3 text-center mr-24 mb-6 z-20">
          {step > 0 && (<button onClick={handleBack} className="w-[100px] py-2.5 bg-white border border-slate-300 rounded-[16px] text-[13px] font-black text-slate-400 hover:text-slate-600 flex items-center justify-center gap-1.5 shadow-sm"><ArrowLeft size={16} strokeWidth={3} /> {t.back}</button>)}
          <button onClick={() => setInputValue(currentItem.target)} className="w-[170px] py-2.5 bg-white border border-slate-300 rounded-[16px] text-[13px] font-black text-slate-500 hover:text-slate-700 shadow-sm">{t.dont_know}</button>
          <button onClick={handleCheck} disabled={!inputValue || showFeedback} className={`w-[190px] justify-center py-2.5 rounded-[16px] font-black text-[14px] flex items-center gap-2 shadow-lg transition-all active:scale-95 ${!inputValue || showFeedback ? 'bg-slate-100 text-slate-300' : 'bg-[#0BB562] text-white shadow-emerald-200'}`}>{t.check} <ArrowRight size={16} strokeWidth={3} /></button>
        </div>
      )}
    </div>
  );
}
