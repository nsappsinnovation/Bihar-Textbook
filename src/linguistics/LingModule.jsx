import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  ArrowLeft, Volume2, CheckCircle, ChevronRight, Star, Trophy, 
  X, ArrowRight, LayoutGrid, Flame
} from "lucide-react";

// Curated Multi-language Data Structure with Intelligent Distractors
const WORD_CONCEPTS = [
  { 
    id: 1, 
    translations: { hi: "पानी", en: "Water", de: "Wasser", fr: "Eau", es: "Agua", ja: "水 (Mizu)", it: "Acqua" }, 
    distractors: { hi: ["नदी", "समुद्र", "झरना"], en: ["River", "Ocean", "Waterfall"], de: ["Fluss", "Ozean", "Wasserfall"], fr: ["Rivière", "Océan", "Cascade"], es: ["Río", "Océano", "Cascada"], ja: ["川 (Kawa)", "海 (Umi)", "滝 (Taki)"], it: ["Fiume", "Oceano", "Cascata"] },
    icon: "💧" 
  },
  { 
    id: 2, 
    translations: { hi: "घर", en: "House", de: "Haus", fr: "Maison", es: "Casa", ja: "家 (Ie)", it: "Casa" }, 
    distractors: { hi: ["कमरा", "छत", "महल"], en: ["Room", "Roof", "Palace"], de: ["Zimmer", "Dach", "Palast"], fr: ["Chambre", "Toit", "Palais"], es: ["Habitación", "Techo", "Palacio"], ja: ["部屋 (Heya)", "屋根 (Yane)", "宮殿 (Kyūden)"], it: ["Stanza", "Tetto", "Palazzo"] },
    icon: "🏠" 
  },
  { 
    id: 3, 
    translations: { hi: "सेब", en: "Apple", de: "Apfel", fr: "Pomme", es: "Manzana", ja: "リンゴ (Ringo)", it: "Mela" }, 
    distractors: { hi: ["केला", "अंगूर", "फल"], en: ["Banana", "Grape", "Fruit"], de: ["Banane", "Traube", "Frucht"], fr: ["Banane", "Raisin", "Fruit"], es: ["Plátano", "Uva", "Fruta"], ja: ["バナナ (Banana)", "ブドウ (Budō)", "果物 (Kudamono)"], it: ["Banana", "Uva", "Frutta"] },
    icon: "🍎" 
  },
  { 
    id: 4, 
    translations: { hi: "किताब", en: "Book", de: "Buch", fr: "Livre", es: "Libro", ja: "本 (Hon)", it: "Libro" }, 
    distractors: { hi: ["कलम", "कागज", "लाइब्रेरी"], en: ["Pen", "Paper", "Library"], de: ["Stift", "Papier", "Bibliothek"], fr: ["Stylo", "Papier", "Bibliothèque"], es: ["Pluma", "Papel", "Biblioteca"], ja: ["ペン (Pen)", "紙 (Kami)", "図書館 (Toshokan)"], it: ["Penna", "Carta", "Biblioteca"] },
    icon: "📖" 
  },
  { 
    id: 5, 
    translations: { hi: "दोस्त", en: "Friend", de: "Freund", fr: "Ami", es: "Amigo", ja: "友達 (Tomodachi)", it: "Amico" }, 
    distractors: { hi: ["दुश्मन", "परिवार", "भाई"], en: ["Enemy", "Family", "Brother"], de: ["Feind", "Familie", "Bruder"], fr: ["Ennemi", "Familie", "Frère"], es: ["Enemigo", "Familia", "Hermano"], ja: ["敵 (Teki)", "家族 (Kazoku)", "兄弟 (Kyōdai)"], it: ["Nemico", "Famiglia", "Fratello"] },
    icon: "🤝" 
  },
  { 
    id: 6, 
    translations: { hi: "पेड़", en: "Tree", de: "Baum", fr: "Arbre", es: "Árbol", ja: "木 (Ki)", it: "Albero" }, 
    distractors: { hi: ["पौधा", "पत्ती", "जंगल"], en: ["Plant", "Leaf", "Forest"], de: ["Pflanze", "Blatt", "Wald"], fr: ["Plante", "Feuille", "Forêt"], es: ["Planta", "Hoja", "Bosque"], ja: ["植物 (Shokubutsu)", "葉 (Ha)", "森 (Mori)"], it: ["Pianta", "Foglia", "Foresta"] },
    icon: "🌳" 
  },
  { 
    id: 7, 
    translations: { hi: "सूरज", en: "Sun", de: "Sonne", fr: "Soleil", es: "Sol", ja: "太陽 (Taiyō)", it: "Sole" }, 
    distractors: { hi: ["तारा", "बादल", "आसमान"], en: ["Star", "Cloud", "Sky"], de: ["Stern", "Wolke", "Himmel"], fr: ["Étoile", "Nuage", "Ciel"], es: ["Estrella", "Nube", "Cielo"], ja: ["星 (Hoshi)", "雲 (Kumo)", "空 (Sora)"], it: ["Stella", "Nuvola", "Cielo"] },
    icon: "☀️" 
  },
  { 
    id: 8, 
    translations: { hi: "चन्द्रमा", en: "Moon", de: "Mond", fr: "Lune", es: "Luna", ja: "月 (Tsuki)", it: "Luna" }, 
    distractors: { hi: ["रात", "तारा", "ग्रह"], en: ["Night", "Star", "Planet"], de: ["Nacht", "Stern", "Planet"], fr: ["Nuit", "Étoile", "Planète"], es: ["Noche", "Estrella", "Planeta"], ja: ["夜 (Yoru)", "星 (Hoshi)", "惑星 (Wakusei)"], it: ["Notte", "Stella", "Pianeta"] },
    icon: "🌙" 
  },
  { 
    id: 9, 
    translations: { hi: "गाड़ी", en: "Car", de: "Auto", fr: "Voiture", es: "Coche", ja: "車 (Kuruma)", it: "Auto" }, 
    distractors: { hi: ["बस", "ट्रेन", "साइकिल"], en: ["Bus", "Train", "Bicycle"], de: ["Bus", "Zug", "Fahrrad"], fr: ["Bus", "Train", "Vélo"], es: ["Autobús", "Tren", "Bicicleta"], ja: ["バス (Basu)", "電車 (Densha)", "自転車 (Jitensha)"], it: ["Autobus", "Treno", "Bicicletta"] },
    icon: "🚗" 
  },
  { 
    id: 10, 
    translations: { hi: "बिल्ली", en: "Cat", de: "Katze", fr: "Chat", es: "Gato", ja: "猫 (Neko)", it: "Gatto" }, 
    distractors: { hi: ["कुत्ता", "चूहा", "शेर"], en: ["Dog", "Mouse", "Lion"], de: ["Hund", "Maus", "Löwe"], fr: ["Chien", "Souris", "Lion"], es: ["Perro", "Ratón", "León"], ja: ["犬 (Inu)", "ネズミ (Nezumi)", "ライオン (Raion)"], it: ["Cane", "Topo", "Leone"] },
    icon: "🐱" 
  },
  { 
    id: 11, 
    translations: { hi: "कुत्ता", en: "Dog", de: "Hund", fr: "Chien", es: "Perro", ja: "犬 (Inu)", it: "Cane" }, 
    distractors: { hi: ["बिल्ली", "भेड़िया", "लोमड़ी"], en: ["Cat", "Wolf", "Fox"], de: ["Katze", "Wolf", "Fuchs"], fr: ["Chat", "Loup", "Renard"], es: ["Gato", "Lobo", "Zorro"], ja: ["猫 (Neko)", "オオカミ (Ōkami)", "キツネ (Kitsune)"], it: ["Gatto", "Lupo", "Volpe"] },
    icon: "🐶" 
  },
  { 
    id: 12, 
    translations: { hi: "चिड़िया", en: "Bird", de: "Vogel", fr: "Oiseau", es: "Pájaro", ja: "鳥 (Tori)", it: "Uccello" }, 
    distractors: { hi: ["उड़ान", "हवा", "पंख"], en: ["Flight", "Wind", "Feather"], de: ["Flug", "Wind", "Feder"], fr: ["Vol", "Vent", "Plume"], es: ["Vuelo", "Viento", "Pluma"], ja: ["飛行 (Hikō)", "風 (Kaze)", "羽 (Hane)"], it: ["Volo", "Vento", "Piuma"] },
    icon: "🐦" 
  },
  { 
    id: 13, 
    translations: { hi: "फूल", en: "Flower", de: "Blume", fr: "Fleur", es: "Flor", ja: "花 (Hana)", it: "Fiore" }, 
    distractors: { hi: ["पत्ती", "पेड़", "घास"], en: ["Leaf", "Tree", "Grass"], de: ["Blatt", "Baum", "Gras"], fr: ["Feuille", "Arbre", "Herbe"], es: ["Hoja", "Árbol", "Hierba"], ja: ["葉 (Ha)", "木 (Ki)", "草 (Kusa)"], it: ["Foglia", "Albero", "Erba"] },
    icon: "🌸" 
  },
  { 
    id: 14, 
    translations: { hi: "आग", en: "Fire", de: "Feuer", fr: "Feu", es: "Fuego", ja: "火 (Hi)", it: "Fuoco" }, 
    distractors: { hi: ["धुआं", "गर्मी", "राख"], en: ["Smoke", "Heat", "Ash"], de: ["Rauch", "Hitze", "Asche"], fr: ["Fumée", "Chaleur", "Cendre"], es: ["Humo", "Calor", "Ceniza"], ja: ["煙 (Kemuri)", "熱 (Netsu)", "灰 (Hai)"], it: ["Fumo", "Calore", "Cenere"] },
    icon: "🔥" 
  },
  { 
    id: 15, 
    translations: { hi: "पृथ्वी", en: "Earth", de: "Erde", fr: "Terre", es: "Tierra", ja: "地球 (Chikyū)", it: "Terra" }, 
    distractors: { hi: ["आसमान", "ग्रह", "तारा"], en: ["Sky", "Planet", "Star"], de: ["Himmel", "Planet", "Stern"], fr: ["Ciel", "Planète", "Étoile"], es: ["Cielo", "Planeta", "Estrella"], ja: ["空 (Sora)", "惑星 (Wakusei)", "星 (Hoshi)"], it: ["Cielo", "Pianeta", "Stella"] },
    icon: "🌍" 
  },
  { 
    id: 16, 
    translations: { hi: "दूध", en: "Milk", de: "Milch", fr: "Lait", es: "Leche", ja: "牛乳 (Gyūnyū)", it: "Latte" }, 
    distractors: { hi: ["पानी", "चाय", "कॉफ़ी"], en: ["Water", "Tea", "Coffee"], de: ["Wasser", "Tee", "Kaffee"], fr: ["Eau", "Thé", "Café"], es: ["Agua", "Té", "Café"], ja: ["水 (Mizu)", "お茶 (Ocha)", "コーヒー (Kōhī)"], it: ["Acqua", "Tè", "Caffè"] },
    icon: "🥛" 
  },
  { 
    id: 17, 
    translations: { hi: "रोटी", en: "Bread", de: "Brot", fr: "Pain", es: "Pan", ja: "パン (Pan)", it: "Pane" }, 
    distractors: { hi: ["चावल", "फल", "सब्जी"], en: ["Rice", "Fruit", "Vegetable"], de: ["Reis", "Frucht", "Gemüse"], fr: ["Riz", "Fruit", "Légume"], es: ["Arroz", "Fruta", "Verdura"], ja: ["ご飯 (Gohan)", "果物 (Kudamono)", "野菜 (Yasai)"], it: ["Riso", "Frutta", "Verdura"] },
    icon: "🍞" 
  },
  { 
    id: 18, 
    translations: { hi: "विद्यालय", en: "School", de: "Schule", fr: "École", es: "Escuela", ja: "学校 (Gakkō)", it: "Scuola" }, 
    distractors: { hi: ["घर", "दुकान", "अस्पताल"], en: ["House", "Shop", "Hospital"], de: ["Haus", "Geschäft", "Krankenhaus"], fr: ["Maison", "Magasin", "Hôpital"], es: ["Casa", "Tienda", "Hospital"], ja: ["家 (Ie)", "店 (Mise)", "病院 (Byōin)"], it: ["Casa", "Negozio", "Ospedale"] },
    icon: "🏫" 
  },
  { 
    id: 19, 
    translations: { hi: "सड़क", en: "Road", de: "Straße", fr: "Route", es: "Camino", ja: "道路 (Dōro)", it: "Strada" }, 
    distractors: { hi: ["नदी", "पुल", "पार्क"], en: ["River", "Bridge", "Park"], de: ["Fluss", "Brücke", "Park"], fr: ["Rivière", "Pont", "Parc"], es: ["Río", "Puente", "Parque"], ja: ["川 (Kawa)", "橋 (Hashi)", "公園 (Kōen)"], it: ["Fiume", "Ponte", "Parco"] },
    icon: "🛣️" 
  },
  { 
    id: 20, 
    translations: { hi: "समय", en: "Time", de: "Zeit", fr: "Temps", es: "Tiempo", ja: "時間 (Jikan)", it: "Tempo" }, 
    distractors: { hi: ["दिन", "रात", "घड़ी"], en: ["Day", "Night", "Clock"], de: ["Tag", "Nacht", "Uhr"], fr: ["Jour", "Nuit", "Horloge"], es: ["Día", "Noche", "Reloj"], ja: ["日 (Hi)", "夜 (Yoru)", "時計 (Tokei)"], it: ["Giorno", "Notte", "Orologio"] },
    icon: "⏱️" 
  }
];

const PHRASE_CONCEPTS = [
  { 
    id: 1, 
    translations: { hi: "आपका क्या नाम है?", en: "What is your name?", de: "Wie heißt du?", fr: "Comment t'appelles-tu ?", es: "¿Cómo te llamas?", ja: "名前は何ですか？ (Namae wa nan desu ka?)", it: "Come ti chiami?" }, 
    distractors: { hi: ["आप कैसे हैं?", "कहाँ हैं?", "कौन हैं?"], en: ["How are you?", "Where are you?", "Who are you?"], de: ["Wie geht es dir?", "Wo bist du?", "Wer bist du?"], fr: ["Comment ça va ?", "Où es-tu ?", "Qui es-tu ?"], es: ["¿Cómo estás?", "¿Dónde estás?", "¿Quién eres?"], ja: ["お元気ですか？ (Ogenki desu ka?)", "どこですか？ (Doko desu ka?)", "誰ですか？ (Dare desu ka?)"], it: ["Come stai?", "Dove sei?", "Chi sei?"] },
    icon: "👋" 
  },
  { 
    id: 2, 
    translations: { hi: "शुभ प्रभात", en: "Good morning", de: "Guten Morgen", fr: "Bonjour", es: "Buenos días", ja: "おはようございます (Ohayō gozaimasu)", it: "Buongiorno" }, 
    distractors: { hi: ["शुभ रात्रि", "नमस्ते", "अलविदा"], en: ["Good night", "Hello", "Goodbye"], de: ["Gute Nacht", "Hallo", "Auf Wiedersehen"], fr: ["Bonne nuit", "Bonjour", "Au revoir"], es: ["Buenas noches", "Hola", "Adiós"], ja: ["おやすみなさい (Oyasuminasai)", "こんにちは (Konnichiwa)", "さようなら (Sayōnara)"], it: ["Buonanotte", "Ciao", "Arrivederci"] },
    icon: "🌅" 
  },
  { 
    id: 3, 
    translations: { hi: "धन्यवाद", en: "Thank you", de: "Danke", fr: "Merci", es: "Gracias", ja: "ありがとう (Arigatō)", it: "Grazie" }, 
    distractors: { hi: ["maaf kre", "हाँ", "नहीं"], en: ["Sorry", "Yes", "No"], de: ["Entschuldigung", "Ja", "Nein"], fr: ["Pardon", "Oui", "Non"], es: ["Perdón", "Sí", "No"], ja: ["ごめんなさい (Gomen nasai)", "はい (Hai)", "いいえ (Iie)"], it: ["Scusa", "Sì", "No"] },
    icon: "🙏" 
  },
  { 
    id: 4, 
    translations: { hi: "हाँ", en: "Yes", de: "Ja", fr: "Oui", es: "Sí", ja: "はい (Hai)", it: "Sì" }, 
    distractors: { hi: ["नहीं", "शायद", "कभी नहीं"], en: ["No", "Maybe", "Never"], de: ["Nein", "Vielleicht", "Niemals"], fr: ["Non", "Peut-être", "Jamais"], es: ["No", "Tal vez", "Nunca"], ja: ["いいえ (Iie)", "多分 (Tabun)", "決して (Kesshite)"], it: ["No", "Forse", "Mai"] },
    icon: "✅" 
  },
  { 
    id: 5, 
    translations: { hi: "नहीं", en: "No", de: "Nein", fr: "Non", es: "No", ja: "いいえ (Iie)", it: "No" }, 
    distractors: { hi: ["हाँ", "ठीक है", "अच्छा"], en: ["Yes", "Okay", "Good"], de: ["Ja", "Okay", "Gut"], fr: ["Oui", "D'accord", "Bien"], es: ["Sí", "Vale", "Bien"], ja: ["はい (Hai)", "オーケー (Ōkē)", "良い (Yoi)"], it: ["Sì", "Va bene", "Bene"] },
    icon: "❌" 
  },
  { 
    id: 6, 
    translations: { hi: "maaf kre", en: "Excuse me", de: "Entschuldigen Sie", fr: "Excusez-moi", es: "Perdone", ja: "すみません (Sumimasen)", it: "Scusami" }, 
    distractors: { hi: ["धन्यवाद", "अलविदा", "नमस्ते"], en: ["Thank you", "Goodbye", "Hello"], de: ["Danke", "Auf Wiedersehen", "Hallo"], fr: ["Merci", "Au revoir", "Bonjour"], es: ["Gracias", "Adiós", "Hola"], ja: ["ありがとう (Arigatō)", "さようなら (Sayōnara)", "こんにちは (Konnichiwa)"], it: ["Grazie", "Arrivederci", "Ciao"] },
    icon: "🙋" 
  },
  { 
    id: 7, 
    translations: { hi: "मुझे खेद है", en: "I am sorry", de: "Es tut mir leid", fr: "Je suis désolé", es: "Lo siento", ja: "ごめんなさい (Gomen nasai)", it: "Mi dispiace" }, 
    distractors: { hi: ["कोई बात नहीं", "धन्यवाद", "कृपया"], en: ["No problem", "Thank you", "Please"], de: ["Kein Problem", "Danke", "Bitte"], fr: ["Pas de problème", "Merci", "S'il vous plaît"], es: ["No hay problema", "Gracias", "Por favor"], ja: ["問題ない (Mondai nai)", "ありがとう (Arigatō)", "お願いします (Onegai shimasu)"], it: ["Nessun problema", "Grazie", "Per favore"] },
    icon: "😔" 
  },
  { 
    id: 8, 
    translations: { hi: "अलविदा", en: "Goodbye", de: "Auf Wiedersehen", fr: "Au revoir", es: "Adiós", ja: "さようなら (Sayōnara)", it: "Arrivederci" }, 
    distractors: { hi: ["नमस्ते", "स्वागत है", "धन्यवाद"], en: ["Hello", "Welcome", "Thank you"], de: ["Hallo", "Willkommen", "Danke"], fr: ["Bonjour", "Bienvenue", "Merci"], es: ["Hola", "Bienvenido", "Gracias"], ja: ["こんにちは (Konnichiwa)", "ようこそ (Yōkoso)", "ありがとう (Arigatō)"], it: ["Ciao", "Benvenuto", "Grazie"] },
    icon: "👋" 
  },
  { 
    id: 9, 
    translations: { hi: "कृपया", en: "Please", de: "Bitte", fr: "S'il vous plaît", es: "Por favor", ja: "お願いします (Onegai shimasu)", it: "Per favore" }, 
    distractors: { hi: ["धन्यवाद", "हाँ", "नहीं"], en: ["Thank you", "Yes", "No"], de: ["Danke", "Ja", "Nein"], fr: ["Merci", "Oui", "Non"], es: ["Gracias", "Sí", "No"], ja: ["ありがとう (Arigatō)", "はい (Hai)", "いいえ (Iie)"], it: ["Grazie", "Sì", "No"] },
    icon: "🥺" 
  },
  { 
    id: 10, 
    translations: { hi: "मदद", en: "Help", de: "Hilfe", fr: "Aide", es: "Ayuda", ja: "助けて (Tasukete)", it: "Aiuto" }, 
    distractors: { hi: ["रुको", "जाओ", "आओ"], en: ["Stop", "Go", "Come"], de: ["Halt", "Geh", "Komm"], fr: ["Arrêt", "Aller", "Venir"], es: ["Parar", "Ir", "Venir"], ja: ["止まれ (Tomare)", "行く (Iku)", "来る (Kuru)"], it: ["Fermati", "Vai", "Vieni"] },
    icon: "🆘" 
  },
  { 
    id: 11, 
    translations: { hi: "mai ni smjhta", en: "I don't understand", de: "Ich verstehe nicht", fr: "Je ne comprends pas", es: "No entiendo", ja: "わかりません (Wakarimasen)", it: "Non capisco" }, 
    distractors: { hi: ["मुझे पता है", "मैंने देखा", "मैंने सुना"], en: ["I know", "I saw", "I heard"], de: ["Ich weiß", "Ich sah", "Ich hörte"], fr: ["Je sais", "J'ai vu", "J'ai entendu"], es: ["Lo sé", "Vi", "Escuché"], ja: ["知っています (Shitte imasu)", "見ました (Mimashita)", "聞きました (Kikimashita)"], it: ["Lo so", "Ho visto", "Ho sentito"] },
    icon: "🤷" 
  },
  { 
    id: 12, 
    translations: { hi: "क्या आप अंग्रेज़ी बोलते हैं?", en: "Do you speak English?", de: "Sprechen Sie Englisch?", fr: "Parlez-vous anglais ?", es: "¿Habla inglés?", ja: "英語を話しますか？ (Eigo o hanashimasu ka?)", it: "Parli inglese?" }, 
    distractors: { hi: ["आप कैसे हैं?", "आपका क्या नाम है?", "आप कहाँ हैं?"], en: ["How are you?", "What is your name?", "Where are you?"], de: ["Wie geht es dir?", "Wie heißt du?", "Wo bist du?"], fr: ["Comment ça va ?", "Comment t'appelles-tu ?", "Où es-tu ?"], es: ["¿Cómo estás?", "¿Cómo te llamas?", "¿Dónde estás?"], ja: ["お元気ですか？ (Ogenki desu ka?)", "名前は何ですか？ (Namae wa nan desu ka?)", "どこですか？ (Doko desu ka?)"], it: ["Come stai?", "Come ti chiami?", "Dove sei?"] },
    icon: "🗣️" 
  },
  { 
    id: 13, 
    translations: { hi: "शौचालय कहाँ है?", en: "Where is the bathroom?", de: "Wo ist die Toilette?", fr: "Où sont les toilettes ?", es: "¿Dónde está el baño?", ja: "トイレはどこですか？ (Toire wa doko desu ka?)", it: "Dov'è il bagno?" }, 
    distractors: { hi: ["स्टेशन कहाँ है?", "होटल कहाँ है?", "अस्पताल कहाँ है?"], en: ["Where is the station?", "Where is the hotel?", "Where is the hospital?"], de: ["Wo ist der Bahnhof?", "Wo ist das Hotel?", "Wo ist das Krankenhaus?"], fr: ["Où est la gare ?", "Où est l'hôtel ?", "Où est l'hôpital ?"], es: ["¿Dónde está la estación?", "¿Dónde está el hotel?", "¿Dónde está el hospital?"], ja: ["駅はどこですか？ (Eki wa doko desu ka?)", "ホテルはどこですか？ (Hoteru wa doko desu ka?)", "病院はどこですか？ (Byōin wa doko desu ka?)"], it: ["Dov'è la stazione?", "Dov'è l'hotel?", "Dov'è l'ospedale?"] },
    icon: "🚻" 
  },
  { 
    id: 14, 
    translations: { hi: "यह कितने का है?", en: "How much is this?", de: "Wie viel kostet das?", fr: "Combien ça coûte ?", es: "¿Cuánto cuesta esto?", ja: "これはいくらですか？ (Kore wa ikura desu ka?)", it: "Quanto costa?" }, 
    distractors: { hi: ["यह क्या है?", "यह कब है?", "यह कहाँ है?"], en: ["What is this?", "When is this?", "Where is this?"], de: ["Was ist das?", "Wann ist das?", "Wo ist das?"], fr: ["Qu'est-ce que c'est ?", "C'est quand ?", "C'est où ?"], es: ["¿Qué es esto?", "¿Cuándo es esto?", "¿Dónde está esto?"], ja: ["これは何ですか？ (Kore wa nan desu ka?)", "これはいつですか？ (Kore wa itsu desu ka?)", "これはどこですか？ (Kore wa doko desu ka?)"], it: ["Cos'è questo?", "Quand'è?", "Dov'è?"] },
    icon: "💰" 
  },
  { 
    id: 15, 
    translations: { hi: "मुझे तुमसे प्यार है", en: "I love you", de: "Ich liebe dich", fr: "Je t'aime", es: "Te amo", ja: "愛しています (Aishiteimasu)", it: "Ti amo" }, 
    distractors: { hi: ["मुझे यह पसंद है", "मैं खुश हूँ", "मैं दुखी हूँ"], en: ["I like this", "I am happy", "I am sad"], de: ["Ich mag das", "Ich bin glücklich", "Ich bin traurig"], fr: ["J'aime ça", "Je suis heureux", "Je suis triste"], es: ["Me gusta esto", "Estoy feliz", "Estoy triste"], ja: ["これが好きです (Kore ga suki desu)", "私は幸せです (Watashi wa shiawase desu)", "私は悲しいです (Watashi wa kanashii desu)"], it: ["Mi piace", "Sono felice", "Sono triste"] },
    icon: "❤️" 
  },
  { 
    id: 16, 
    translations: { hi: "आप कहाँ से हैं?", en: "Where are you from?", de: "Woher kommst du?", fr: "D'où viens-tu ?", es: "¿De dónde eres?", ja: "どこから来ましたか？ (Doko kara kimashita ka?)", it: "Di dove sei?" }, 
    distractors: { hi: ["आप कहाँ जा रहे हैं?", "आप क्या कर रहे हो?", "आप कौन हैं?"], en: ["Where are you going?", "What are you doing?", "Who are you?"], de: ["Wohin gehst du?", "Was machst du?", "Wer bist du?"], fr: ["Où vas-tu ?", "Que fais-tu ?", "Qui es-tu ?"], es: ["¿A dónde vas?", "¿Qué haces?", "¿Quién eres?"], ja: ["どこに行きますか？ (Doko ni ikimasu ka?)", "何をしていますか？ (Nani o shiteimasu ka?)", "誰ですか？ (Dare desu ka?)"], it: ["Dove vai?", "Cosa fai?", "Chi sei?"] },
    icon: "🗺️" 
  },
  { 
    id: 17, 
    translations: { hi: "मैं ठीक हूँ", en: "I am fine", de: "Mir geht es gut", fr: "Ça va bien", es: "Estoy bien", ja: "元気です (Genki desu)", it: "Sto bene" }, 
    distractors: { hi: ["मैं बीमार हूँ", "मैं दुखी हूँ", "मैं व्यस्त हूँ"], en: ["I am sick", "I am sad", "I am busy"], de: ["Ich bin krank", "Ich bin traurig", "Ich bin beschäftigt"], fr: ["Je suis malade", "Je suis triste", "Je suis occupé"], es: ["Estoy enfermo", "Estoy triste", "Estoy ocupado"], ja: ["病気です (Byōki desu)", "悲しいです (Kanashii desu)", "忙しいです (Isogashii desu)"], it: ["Sono malato", "Sono triste", "Sono occupato"] },
    icon: "👍" 
  },
  { 
    id: 18, 
    translations: { hi: "aap kya kr rhe hai?", en: "What are you doing?", de: "Was machst du?", fr: "Que fais-tu ?", es: "¿Qué haces?", ja: "何をしていますか？ (Nani o shiteimasu ka?)", it: "Cosa stai facendo?" }, 
    distractors: { hi: ["आप कहाँ हैं?", "आप कब आएंगे?", "यह क्या है?"], en: ["Where are you?", "When will you come?", "What is this?"], de: ["Wo bist du?", "Wann kommst du?", "Was ist das?"], fr: ["Où es-tu ?", "Quand viens-tu ?", "Qu'est-ce que c'est ?"], es: ["¿Dónde estás?", "¿Cuándo vendrás?", "¿Qué es esto?"], ja: ["どこにいますか？ (Doko ni imasu ka?)", "いつ来ますか？ (Itsu kimasu ka?)", "これは何ですか？ (Kore wa nan desu ka?)"], it: ["Dove sei?", "Quando vieni?", "Cos'è questo?"] },
    icon: "🤔" 
  },
  { 
    id: 19, 
    translations: { hi: "कल मिलते हैं", en: "See you tomorrow", de: "Bis morgen", fr: "À demain", es: "Hasta mañana", ja: "また明日 (Mata ashita)", it: "A domani" }, 
    distractors: { hi: ["बाद में मिलते हैं", "शुभ रात्रि", "अलविदा"], en: ["See you later", "Good night", "Goodbye"], de: ["Bis später", "Gute Nacht", "Auf Wiedersehen"], fr: ["À plus tard", "Bonne nuit", "Au revoir"], es: ["Hasta luego", "Buenas noches", "Adiós"], ja: ["また後で", "おやすみなさい (Oyasuminasai)", "さようなら (Sayōnara)"], it: ["A dopo", "Buonanotte", "Arrivederci"] },
    icon: "📅" 
  },
  { 
    id: 20, 
    translations: { hi: "आपका दिन शुभ हो", en: "Have a good day", de: "Einen schönen Tag noch", fr: "Bonne journée", es: "Que tengas un buen día", ja: "良い一日を (Yoi ichinichi o)", it: "Buona giornata" }, 
    distractors: { hi: ["शुभ प्रभात", "शुभ संध्या", "शुभ रात्रि"], en: ["Good morning", "Good evening", "Good night"], de: ["Guten Morgen", "Guten Abend", "Gute Nacht"], fr: ["Bonjour", "Bonsoir", "Bonne nuit"], es: ["Buenos días", "Buenas tardes", "Buenas noches"], ja: ["おはよう (Ohayō)", "こんばんは (Konbanwa)", "おやすみ (Oyasumi)"], it: ["Buongiorno", "Buonasera", "Buonanotte"] },
    icon: "✨" 
  }
];

const CONVERSATION_FLOW = [
  { speaker: 'boy', audioFile: '1_Boy_Hello', hi: "नमस्ते", en: "Hello", de: "Hallo", fr: "Bonjour", es: "Hola", ja: "こんにちは (Konnichiwa)", it: "Ciao" },
  { speaker: 'girl', audioFile: '2_Girl_Hello_Rahul_how_are_you', hi: "नमस्ते राहुल, आप कैसे हैं?", en: "Hello Rahul, how are you?", de: "Hallo Rahul, wie geht es dir?", fr: "Bonjour Rahul, comment ça va ?", es: "Hola Rahul, ¿cómo estás?", ja: "こんにちは、ラフルさん。お元気ですか？ (Konnichiwa, Rafuru-san. Ogenki desu ka?)", it: "Ciao Rahul, come stai?" },
  { speaker: 'boy', audioFile: '3_Boy_Im_fine_thank_you_And_you', hi: "मैं ठीक हूँ, धन्यवाद। और आप?", en: "I'm fine, thank you. And you?", de: "Mir geht es gut, danke. Und dir?", fr: "Ça va bien, merci. Et toi ?", es: "Estoy bien, gracias. ¿Y tú?", ja: "元気です、ありがとう。あなたは？ (Genki desu, arigatō. Anata wa?)", it: "Sto bene, grazie. E tu?" },
  { speaker: 'girl', audioFile: '4_Girl_Im_fine_too_What_are_you_doing', hi: "मैं भी ठीक हूँ। आज आप क्या कर रहे हैं?", en: "I'm fine too. What are you doing today?", de: "Mir geht es auch gut. Was machst du heute?", fr: "Ça va bien aussi. Que fais-tu aujourd'hui ?", es: "Yo también estoy bien. ¿Qué haces hoy?", ja: "私も元気です。今日は何をしていますか？ (Watashi mo genki desu. Kyō wa nani o shiteimasu ka?)", it: "Anche io sto bene. Cosa fai oggi?" },
  { speaker: 'boy', audioFile: '5_Boy_I_am_learning_a_new_language', hi: "mai ek nayi bhasha seekh rha hu", en: "I am learning a new language.", de: "Ich lerne eine neue Sprache.", fr: "J'apprends une nouvelle langue.", es: "Estoy aprendiendo un nuevo idioma.", ja: "新しい言語を勉強しています。 (Atarashii gengo o benkyō shiteimasu.)", it: "Sto imparando una nuova lingua." },
  { speaker: 'girl', audioFile: '6_Girl_Thats_great_Which_language', hi: "यह बहुत अच्छा है! कौन सी भाषा?", en: "That's great! Which language?", de: "Das ist toll! Welche Sprache?", fr: "C'est super ! Quelle langue ?", es: "¡Eso es genial! ¿Qué idioma?", ja: "それは素晴らしいですね！どの言語ですか？ (Sore wa subarashii desu ne! Dono gengo desu ka?)", it: "È fantastico! Quale lingua?" },
  { speaker: 'boy', audioFile: '7_Boy_I_am_learning_German_right_now', hi: "मैं अभी जर्मन सीख रहा हूँ।", en: "I am learning German right now.", de: "Ich lerne gerade Deutsch.", fr: "J'apprends l'allemand en ce moment.", es: "Estoy aprendiendo alemán ahora mismo.", ja: "今、ドイツ語 を勉強しています。 (Ima, Doitsugo o benkyō shiteimasu.)", it: "Adesso sto imparando il tedesco." },
  { speaker: 'girl', audioFile: '8_Girl_German_is_a_beautiful_language', hi: "जर्मन एक सुंदर भाषा है।", en: "German is a beautiful language.", de: "Deutsch ist eine schöne Sprache.", fr: "L'allemand est une belle langue.", es: "El alemán es un idioma hermoso.", ja: "ドイツ語は美しい言語です。 (Doitsugo wa utsukushii gengo desu.)", it: "Il tedesco è una lingua bellissima." },
  { speaker: 'boy', audioFile: '9_Boy_Yes_I_like_it_very_much', hi: "हाँ, मुझे यह बहुत पसंद है।", en: "Yes, I like it very much.", de: "Ja, ich mag es sehr.", fr: "Oui, j'aime beaucoup ça.", es: "Sí, me gusta mucho.", ja: "はい、とても気に入っています。 (Hai, totemo ki ni itteimasu.)", it: "Sì, mi piace molto." },
  { speaker: 'girl', audioFile: '10_Girl_Good_luck_See_you_later', hi: "शुभकामनाएं! बाद में मिलते हैं।", en: "Good luck! See you later.", de: "Viel Glück! Bis später.", fr: "Bonne chance ! À plus tard.", es: "¡Buena suerte! Hasta luego.", ja: "頑張ってください！また後で。 (Ganbatte kudasai! Mata ato de.)", it: "Buona fortuna! A dopo." }
];

const LANG_NAMES = {
  hi: { hi: "हिंदी", en: "अंग्रेजी", de: "जर्मन", fr: "फ्रेंच", es: "स्पैनिश", ja: "जापानी", it: "इतालवी" },
  en: { hi: "Hindi", en: "English", de: "German", fr: "French", es: "Spanish", ja: "Japanese", it: "Italian" },
  de: { hi: "Hindi", en: "Englisch", de: "Deutsch", fr: "Französisch", es: "Spanisch", ja: "Japanisch", it: "Italienisch" },
  fr: { hi: "Hindi", en: "Anglais", de: "Allemand", fr: "Français", es: "Espagnol", ja: "Japonais", it: "Italien" },
  es: { hi: "Hindi", en: "Inglés", de: "Alemán", fr: "Francés", es: "Español", ja: "Japonés", it: "Italiano" },
  ja: { hi: "ヒンディー語", en: "英語", de: "ドイツ語", fr: "フランス語", es: "スペイン語", ja: "日本語 (Nihongo)", it: "イタリア語" },
  zh: { hi: "印地语", en: "英语", de: "德语", fr: "法语", es: "西班牙语", ja: "日语", it: "意大利语" },
  it: { hi: "Hindi", en: "Inglese", de: "Tedesco", fr: "Francese", es: "Spagnolo", ja: "Giapponese", it: "Italiano" },
  ru: { hi: "Хинди", en: "Английский", de: "Немецкий", fr: "Французский", es: "Испанский", ja: "Японский", it: "Итальянский" },
  ko: { hi: "힌디어", en: "영어", de: "독일어", fr: "프랑스어", es: "스페인어", ja: "일본어", it: "이탈리아어" }
};

const UI_STRINGS = {
  hi: {
    question_sia: (word, target) => `सिया, क्या आप जानते हैं कि '${word}' को ${target} में क्या कहते हैं?`,
    question_main: (target) => `क्या आप जानते हैं कि इसे ${target} में क्या कहते हैं?`,
    question_conv: (target) => `इस बातचीत को ${target} में पूरा करें:`,
    guess_girl: (word) => `हम्म... मुझे लगता है कि यह "${word}" हो सकता है?`,
    streak: "डेली स्ट्रीक", goal: "आज का लक्ष्य", progress: "पाठ की प्रगति", dont_know: "पता नहीं", check: "जांचें", back: "पीछे", amazing: "अद्भुत!", excellent: "बहुत बढ़िया!", oops: "ओह!", correct_msg: "सही उत्तर! अगले सवाल पर...", wrong_msg: "यह सही नहीं है।", try_again: "फिर से कोशिश करें", words: "शब्द", days: "दिन", lesson_complete: "पाठ पूरा हुआ!", lesson_complete_msg: "आपने बहुत अच्छा किया! आपका अभ्यास सफल रहा।", back_home: "वापस घर", try_again_hint: "चिंता न करें, आप फिर से कोशिश कर सकते हैं!", continue: "जारी रखें"
  },
  en: {
    question_sia: (word, target) => `Sia, do you know what '${word}' is called in ${target}?`,
    question_main: (target) => `Do you know what this is called in ${target}?`,
    question_conv: (target) => `Complete this conversation in ${target}:`,
    guess_girl: (word) => `Hmm... I think it might be "${word}"?`,
    streak: "Daily Streak", goal: "Today's Goal", progress: "Lesson Progress", dont_know: "I don't know", check: "Check", back: "Back", amazing: "Amazing!", excellent: "Excellent!", oops: "Oops!", correct_msg: "You got it right! Next...", wrong_msg: "That's not correct.", try_again: "Try Again", words: "words", days: "days", lesson_complete: "Lesson Complete!", lesson_complete_msg: "You did a great job! Your practice was successful.", back_home: "Back to Home", try_again_hint: "Don't worry, you can try again!", continue: "Continue"
  },
  de: {
    question_sia: (word, target) => `Sia, weißt du, wie man '${word}' auf ${target} sagt?`,
    question_main: (target) => `Weißt du, wie man das auf ${target} nennt?`,
    question_conv: (target) => `Vervollständige dieses Gespräch auf ${target}:`,
    guess_girl: (word) => `Hmm... ich glaube, es könnte "${word}" sein?`,
    streak: "Streak", goal: "Tagesziel", progress: "Fortschritt", dont_know: "Ich weiß nicht", check: "Prüfen", back: "Zurück", amazing: "Toll!", excellent: "Sehr gut!", oops: "Hoppla!", correct_msg: "Das ist richtig! Weiter...", wrong_msg: "Falsch.", try_again: "Erneut versuchen", words: "Wörter", days: "Tage", lesson_complete: "Abgeschlossen!", lesson_complete_msg: "Du hast großartige Arbeit geleistet! Deine Übung war erfolgreich.", back_home: "Startseite", try_again_hint: "Versuche es noch einmal!", continue: "Weiter"
  },
  it: {
    question_sia: (word, target) => `Sia, sai come si dice '${word}' in ${target}?`,
    question_main: (target) => `Sai come si chiama questo in ${target}?`,
    question_conv: (target) => `Completa questa conversazione in ${target}:`,
    guess_girl: (word) => `Hmm... penso che possa essere "${word}"?`,
    streak: "Serie Giornaliera", goal: "Obiettivo di Oggi", progress: "Progresso Lezione", dont_know: "Non lo so", check: "Controlla", back: "Indietro", amazing: "Fantastico!", excellent: "Eccellente!", oops: "Ops!", correct_msg: "Risposta esatta! Avanti...", wrong_msg: "Non è corretto.", try_again: "Riprova", words: "parole", days: "giorni", lesson_complete: "Lezione Completata!", lesson_complete_msg: "Hai fatto un ottimo lavoro! La tua pratica è stata un successo.", back_home: "Torna alla Home", try_again_hint: "Non preoccuparti, puoi riprovare!", continue: "Continua"
  }
};

export default function LingModule({ type }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const initialSource = location.state?.source || localStorage.getItem("ling_source_lang") || "hi";
  const initialTarget = location.state?.target || localStorage.getItem("ling_target_lang") || "en";
  const [sourceLang, setSourceLang] = useState(initialSource);
  const [targetLang, setTargetLang] = useState(initialTarget);

  useEffect(() => {
    if (sourceLang) localStorage.setItem("ling_source_lang", sourceLang);
    if (targetLang) localStorage.setItem("ling_target_lang", targetLang);
  }, [sourceLang, targetLang]);

  const t = UI_STRINGS[sourceLang] || UI_STRINGS.en;
  const targetLangName = (LANG_NAMES[sourceLang] || LANG_NAMES.en)[targetLang] || targetLang;
  
  let rawData = [];
  if (type === "words") rawData = WORD_CONCEPTS;
  else if (type === "phrases") rawData = PHRASE_CONCEPTS;
  else if (type === "conversations") rawData = CONVERSATION_FLOW;

  const items = useMemo(() => {
    return rawData.map((concept, idx) => {
      if (type === "conversations") {
        return {
          id: idx + 1,
          speaker: concept.speaker,
          text: concept[targetLang] || concept.en,
          native: concept[sourceLang] || concept.hi,
          distractors: [],
          target: concept[targetLang] || concept.en,
          isConversation: true,
          audioFile: concept.audioFile
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
        icon: concept.icon,
        image: concept.image,
        translation: concept.translations.en,
        audioFile: concept.translations.en.replace(/['?,!.]/g, '').replace(/ /g, '_')
      };
    });
  }, [rawData, type, targetLang, sourceLang]);

  const [step, setStep] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [streak, setStreak] = useState(0);
  const [dailyProgress, setDailyProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const currentItem = items[step];
  const dailyTotal = type === 'conversations' ? 10 : 20;

  useEffect(() => {
    const savedStreak = localStorage.getItem("ling_streak") || "1";
    const savedProgress = localStorage.getItem("ling_daily_progress") || "0";
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
          handleSpeak(currentItem.target, targetLang, currentItem.audioFile);
        } else {
          handleSpeak(currentItem.text, targetLang, currentItem.audioFile);
        }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let timer;
    if (isCorrect === true && type !== 'conversations') {
      const newDailyProgress = Math.min(dailyProgress + 1, dailyTotal);
      setDailyProgress(newDailyProgress);
      localStorage.setItem("ling_daily_progress", newDailyProgress);
      const moduleKey = `ling_${type}_progress`;
      const maxLimit = type === 'conversations' ? 10 : 20;
      const currentModVal = parseInt(localStorage.getItem(moduleKey) || "0");
      if (currentModVal < maxLimit) {
        localStorage.setItem(moduleKey, currentModVal + 1);
      }
      timer = setTimeout(() => handleNext(), 2000);
    }
    return () => clearTimeout(timer);
  }, [isCorrect]);

  const fallbackTTS = (text, langCode) => {
    const shortLang = langCode.split('-')[0];
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode;
    utterance.rate = 0.9;
    
    const voices = window.speechSynthesis.getVoices();
    const targetVoices = voices.filter(v => v.lang.startsWith(shortLang));
    if (targetVoices.length > 0) {
      const preferredVoice = targetVoices.find(v => 
        v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Premium")
      ) || targetVoices[0];
      utterance.voice = preferredVoice;
    }
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const handleSpeak = (text, langCode, audioFileName) => {
    if (audioFileName) {
      const folderName = type === 'conversations' ? 'conversation' : type;
      const audioUrl = `/audio/${folderName}/${langCode}/${audioFileName}.mp3`;
      const audio = new Audio(audioUrl);
      
      audio.play().catch((err) => {
        console.warn("Failed to play local audio, falling back to TTS:", err);
        fallbackTTS(text, langCode);
      });
    } else {
      fallbackTTS(text, langCode);
    }
  };

  const handleNext = () => {
    if (step < items.length - 1) {
      const nextStep = step + 1;
      setStep(nextStep);
      setInputValue("");
      setShowFeedback(false);
      setIsCorrect(null);
      if (type === 'conversations') {
        const newDailyProgress = Math.min(dailyProgress + 1, dailyTotal);
        setDailyProgress(newDailyProgress);
        localStorage.setItem("ling_daily_progress", newDailyProgress);
        const moduleKey = `ling_${type}_progress`;
        const maxLimit = type === 'conversations' ? 10 : 20;
        const currentModVal = parseInt(localStorage.getItem(moduleKey) || "0");
        if (currentModVal < maxLimit) {
          localStorage.setItem(moduleKey, currentModVal + 1);
        }
        setTimeout(() => handleSpeak(items[nextStep].text, targetLang, items[nextStep].audioFile), 500);
      } else {
        setTimeout(() => handleSpeak(items[nextStep].target, targetLang, items[nextStep].audioFile), 500);
      }
    } else setIsCompleted(true);
  };

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

  const shuffledOptions = useMemo(() => {
    if (!currentItem || type === 'conversations') return [];
    return [...currentItem.distractors, currentItem.target].sort(() => Math.random() - 0.5);
  }, [currentItem, type]);

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-[#F1FAF6] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-300/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-yellow-300/20 blur-[60px] rounded-full pointer-events-none" />
        
        <div className="bg-white rounded-[40px] shadow-2xl shadow-emerald-100/50 p-10 md:p-14 max-w-lg w-full flex flex-col items-center border border-emerald-50 z-10 animate-fade-in-up">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-yellow-100 rounded-full blur-xl opacity-70 animate-pulse" />
            <Trophy size={120} className="text-[#FF9800] relative z-10 animate-bounce-subtle" strokeWidth={1.5} />
            <Star size={32} className="text-yellow-400 absolute -top-4 -right-4 animate-spin-slow" fill="currentColor" />
            <Star size={24} className="text-yellow-400 absolute top-10 -left-6" fill="currentColor" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 tracking-tight">{t.lesson_complete}</h1>
          <p className="text-lg text-slate-500 font-medium mb-10 max-w-[280px] leading-relaxed">
            {t.lesson_complete_msg}
          </p>
          
          <div className="flex gap-4 w-full">
            <button 
              onClick={() => navigate("/ling", { state: { source: sourceLang, target: targetLang } })} 
              className="flex-1 bg-[#0BB562] hover:bg-[#0a9e55] text-white py-5 rounded-2xl font-black text-[17px] shadow-lg shadow-emerald-200 transition-all hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2"
            >
              <LayoutGrid size={22} strokeWidth={2.5} /> {t.back_home}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentItem) return null;

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
        <button onClick={() => navigate("/ling", { state: { source: sourceLang, target: targetLang } })} className="absolute top-4 left-8 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-sm flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all border border-slate-50 z-50">
          <ArrowLeft size={20} strokeWidth={2.5} />
        </button>

        {type === 'conversations' ? (
          <div className="flex-1 flex flex-col relative overflow-hidden">
             <div className="flex-1 relative flex flex-col justify-center px-4 md:pl-[40%] md:pr-[18%] pb-48 gap-4">
                
                <div key={step} className={`flex w-full ${currentItem.speaker === 'boy' ? 'justify-start' : 'justify-end'} animate-fade-in-up`}>
                   <div className={`relative max-w-[260px] p-4 rounded-[30px] shadow-[0_8px_30px_rgba(0,0,0,0.05)] border-2 transition-all duration-500
                      ${currentItem.speaker === 'boy' 
                        ? 'bg-[#F1FAF6] border-emerald-50 rounded-bl-none' 
                        : 'bg-[#FFFDF9] border-orange-50 rounded-br-none mr-48'}`}>
                      
                      <div className="flex items-center gap-3 py-1">
                         <div 
                           onClick={() => handleSpeak(currentItem.text, targetLang, currentItem.audioFile)} 
                           className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-sm flex-shrink-0
                              ${currentItem.speaker === 'boy' ? 'bg-white text-[#0BB562]' : 'bg-white text-orange-400'}`}
                         >
                            <Volume2 size={18} fill="currentColor" />
                         </div>
                         <div className="flex-1">
                            <h2 className="text-[17px] font-black text-slate-800 leading-snug mb-0.5">{currentItem.text}</h2>
                            <p className="text-[13px] font-medium text-slate-500 leading-tight">{currentItem.native}</p>
                         </div>
                      </div>

                      <div className={`absolute -bottom-5 flex flex-col gap-1 ${currentItem.speaker === 'boy' ? 'left-4' : 'right-4'}`}>
                         <div className="w-3.5 h-3.5 rounded-full bg-white shadow-sm border border-slate-50" />
                         <div className="w-2 h-2 rounded-full bg-white shadow-sm border border-slate-50" />
                      </div>

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
                  <div onClick={() => handleSpeak(currentItem.target, targetLang, currentItem.audioFile)} className="absolute top-4 right-4 w-9 h-9 bg-[#F1FAF6] rounded-full flex items-center justify-center text-[#0BB562] cursor-pointer hover:scale-110 transition-transform active:scale-90"><Volume2 size={18} /></div>
                  {currentItem.icon ? (
                    <div className="text-[90px] leading-none mb-4 animate-bounce-subtle select-none flex items-center justify-center h-[100px] w-[100px] drop-shadow-xl">{currentItem.icon}</div>
                  ) : (
                    <img src={currentItem.image} className="w-[100px] h-[100px] object-contain mb-4 animate-bounce-subtle" alt="Word" />
                  )}
                  <div className="text-center"><div className="text-4xl font-black mb-1">{currentItem.native}</div><div className="h-0.5 w-20 bg-[#F1FAF6] mx-auto mb-2" /><div className="text-[14px] text-slate-400 font-bold tracking-widest uppercase opacity-60">{currentItem.translation}</div></div>
              </div>
              <div className="w-full max-w-[380px] space-y-3"><div className="flex flex-wrap justify-center gap-2">{shuffledOptions.map((option, idx) => (<button key={idx} onClick={() => !showFeedback && setInputValue(option)} className={`px-6 py-3 rounded-2xl font-black text-[15px] transition-all border-2 active:scale-95 ${inputValue === option ? "bg-[#0BB562] text-white border-[#0BB562] shadow-lg shadow-emerald-100" : "bg-white text-slate-600 border-slate-100 hover:border-emerald-100"}`}>{option}</button>))}</div></div>
            </div>
            <div className="relative h-full flex flex-col justify-end items-center pb-4">
              <div className="absolute top-[20%] right-[75%] translate-x-1/2 w-44 p-3 bg-orange-50 rounded-[20px] rounded-br-none shadow-md border border-yellow-100 z-10">
                <p className="text-[14px] font-medium leading-relaxed text-slate-800">{t.guess_girl(currentItem.target)}</p>
                <div className="absolute -bottom-7 right-6 flex flex-col gap-2"><div className="w-5 h-5 rounded-full bg-orange-50 shadow-sm" /><div className="w-3 h-3 rounded-full bg-[#FFFDF9] shadow-sm" /></div>
              </div>
              
              <div className="absolute top-1/2 right-0 sm:right-2 md:right-4 -translate-y-1/2 w-[160px] bg-white rounded-[32px] p-6 shadow-xl border border-slate-50 z-30 scale-95 origin-center">
                  <div className="text-center"><div className="text-[13px] font-medium text-slate-600 mb-4">{t.streak}</div><div className="relative w-24 h-24 mx-auto flex items-center justify-center"><svg className="w-full h-full -rotate-90" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="transparent" stroke="#FFF8EA" strokeWidth="8" /><circle cx="50" cy="50" r="40" fill="transparent" stroke="#FF9800" strokeWidth="8" strokeDasharray="251" strokeDashoffset={251 - ((streak % 7 || 7) / 7) * 251} strokeLinecap="round" className="transition-all duration-1000" /></svg><div className="absolute flex flex-col items-center"><div className="flex items-center gap-1"><Flame size={20} className="text-[#FF9800] fill-[#FF9800]" /><span className="text-2xl font-black text-[#1A1C2E]">{streak}</span></div><span className="text-[10px] font-bold text-slate-400">{t.days}</span></div></div></div>
                  <div className="space-y-3 mt-4"><div className="text-[13px] text-center font-medium text-slate-600">{t.goal}</div><div className="flex items-baseline gap-1"><span className="text-sm font-black text-[#1A1C2E]">{Math.min(dailyProgress, dailyTotal)} / {dailyTotal}</span><span className="text-[10px] font-bold text-slate-400">{t.words}</span></div><div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-[#0BB562] transition-all duration-500 rounded-full" style={{ width: `${Math.min((dailyProgress/dailyTotal) * 100, 100)}%` }} /></div></div>
                  <div className="text-center pt-2 mt-4"><div className="text-[13px] font-medium text-slate-600 mb-4">{t.progress}</div><div className="relative w-24 h-24 mx-auto flex items-center justify-center"><svg className="w-full h-full -rotate-90" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="transparent" stroke="#F1FAF6" strokeWidth="8" /><circle cx="50" cy="50" r="40" fill="transparent" stroke="#0BB562" strokeWidth="8" strokeDasharray="251" strokeDashoffset={251 - ((step/items.length)*251)} strokeLinecap="round" /></svg><div className="absolute flex flex-col items-center"><div className="text-xl font-black text-[#1A1C2E]">{step + 1}/{items.length}</div><span className="text-[10px] font-bold text-slate-400">{t.words}</span></div></div></div>
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
