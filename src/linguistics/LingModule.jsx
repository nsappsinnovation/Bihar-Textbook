import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  ArrowLeft, Volume2, CheckCircle, ChevronRight, Star, Trophy, 
  X, ArrowRight, LayoutGrid, Flame, Eye, EyeOff
} from "lucide-react";

// Syllable Map for phonetic breakdowns of words, phrases, and distractors in all target/source languages
const SYLLABLE_MAP = {
  // --- HINDI (hi) ---
  "पानी": "पा-नी",
  "नदी": "न-दी",
  "समुद्र": "स-मु-द्र",
  "झरना": "झर-ना",
  "घर": "घर",
  "कमरा": "कम-रा",
  "छत": "छत",
  "महल": "म-हल",
  "सेब": "सेब",
  "केला": "के-ला",
  "अंगूर": "अं-गूर",
  "फल": "फल",
  "किताब": "कि-ताब",
  "कलम": "क-लम",
  "कागज": "का-गज",
  "लाइब्रेरी": "लाइ-ब्रे-री",
  "दोस्त": "दो-स्त",
  "दुश्मन": "दु-श्मन",
  "परिवार": "प-रि-वार",
  "भाई": "भाई",
  "पेड़": "पेड़",
  "पौधा": "पौ-धा",
  "पत्ती": "प-त्ती",
  "जंगल": "जं-गल",
  "सूरज": "सू-रज",
  "तारा": "ता-रा",
  "बादल": "बा-दल",
  "आसमान": "आस-मान",
  "चन्द्रमा": "च-न्द्र-मा",
  "रात": "रात",
  "ग्रह": "ग्रह",
  "गाड़ी": "गा-ड़ी",
  "बस": "बस",
  "ट्रेन": "ट्रेन",
  "साइकिल": "साइ-किल",
  "बिल्ली": "बि-ल्ली",
  "कुत्ता": "कु-त्ता",
  "चूहा": "चू-हा",
  "शेर": "शेर",
  "भेड़िया": "भे-ड़ि-या",
  "लोमड़ी": "लोम-ड़ी",
  "चिड़िया": "चि-ड़ि-या",
  "उड़ान": "उ-ड़ान",
  "हवा": "ह-वा",
  "पंख": "पंख",
  "फूल": "फूल",
  "घास": "घास",
  "आग": "आग",
  "धुआं": "धु-आं",
  "गर्मी": "ग-र्मी",
  "राख": "राख",
  "पृथ्वी": "पृ-थ्वी",
  "दूध": "दूध",
  "चाय": "चाय",
  "कॉफ़ी": "कॉ-फ़ी",
  "रोटी": "रो-टी",
  "चावल": "चा-वल",
  "सब्जी": "सब्-जी",
  "विद्यालय": "वि-द्या-लय",
  "दुकान": "दु-कान",
  "अस्पताल": "अस्-प-ताल",
  "सड़क": "स-ड़क",
  "पुल": "पुल",
  "पार्क": "पार्क",
  "समय": "स-मय",
  "दिन": "दिन",
  "घड़ी": "घ-ड़ी",

  // --- ENGLISH (en) ---
  "water": "Wa-ter",
  "river": "Riv-er",
  "ocean": "O-cean",
  "waterfall": "Wa-ter-fall",
  "house": "House",
  "room": "Room",
  "roof": "Roof",
  "palace": "Pal-ace",
  "apple": "Ap-ple",
  "banana": "Ba-nan-a",
  "grape": "Grape",
  "fruit": "Fruit",
  "book": "Book",
  "pen": "Pen",
  "paper": "Pa-per",
  "library": "Li-brary",
  "friend": "Friend",
  "enemy": "En-e-my",
  "family": "Fam-i-ly",
  "brother": "Broth-er",
  "tree": "Tree",
  "plant": "Plant",
  "leaf": "Leaf",
  "forest": "For-est",
  "sun": "Sun",
  "star": "Star",
  "cloud": "Cloud",
  "sky": "Sky",
  "moon": "Moon",
  "night": "Night",
  "planet": "Plan-et",
  "car": "Car",
  "bus": "Bus",
  "train": "Train",
  "bicycle": "Bi-cy-cle",
  "cat": "Cat",
  "dog": "Dog",
  "mouse": "Mouse",
  "lion": "Li-on",
  "wolf": "Wolf",
  "fox": "Fox",
  "bird": "Bird",
  "flight": "Flight",
  "wind": "Wind",
  "feather": "Feath-er",
  "flower": "Flow-er",
  "grass": "Grass",
  "fire": "Fire",
  "smoke": "Smoke",
  "heat": "Heat",
  "ash": "Ash",
  "earth": "Earth",
  "milk": "Milk",
  "tea": "Tea",
  "coffee": "Cof-fee",
  "bread": "Bread",
  "rice": "Rice",
  "vegetable": "Veg-e-ta-ble",
  "school": "School",
  "shop": "Shop",
  "hospital": "Hos-pi-tal",
  "road": "Road",
  "bridge": "Bridge",
  "park": "Park",
  "time": "Time",
  "day": "Day",
  "clock": "Clock",

  // --- GERMAN (de) ---
  "wasser": "Was-ser",
  "fluss": "Fluss",
  "ozean": "O-ze-an",
  "wasserfall": "Was-ser-fall",
  "haus": "Haus",
  "zimmer": "Zim-mer",
  "dach": "Dach",
  "palast": "Pa-last",
  "apfel": "Ap-fel",
  "banane": "Ba-na-ne",
  "traube": "Trau-be",
  "frucht": "Frucht",
  "buch": "Buch",
  "stift": "Stift",
  "papier": "Pa-pier",
  "bibliothek": "Bib-lio-thek",
  "freund": "Freund",
  "feind": "Feind",
  "familie": "Fa-mi-lie",
  "bruder": "Bru-der",
  "baum": "Baum",
  "pflanze": "Pflan-ze",
  "blatt": "Blatt",
  "wald": "Wald",
  "sonne": "Son-ne",
  "stern": "Stern",
  "wolke": "Wol-ke",
  "himmel": "Him-mel",
  "mond": "Mond",
  "nacht": "Nacht",
  "planet": "Pla-net",
  "auto": "Au-to",
  "zug": "Zug",
  "fahrrad": "Fahr-rad",
  "katze": "Kat-ze",
  "hund": "Hund",
  "maus": "Maus",
  "löwe": "Lö-we",
  "wolf": "Wolf",
  "fuchs": "Fuchs",
  "vogel": "Vo-gel",
  "flug": "Flug",
  "feder": "Fe-der",
  "blume": "Blu-me",
  "gras": "Gras",
  "feuer": "Feu-er",
  "rauch": "Rauch",
  "hitze": "Hit-ze",
  "asche": "As-che",
  "erde": "Er-de",
  "milch": "Milch",
  "tee": "Tee",
  "kaffee": "Kaf-fee",
  "brot": "Brot",
  "reis": "Reis",
  "gemüse": "Ge-mü-se",
  "schule": "Schu-le",
  "geschäft": "Ge-schäft",
  "krankenhaus": "Kran-ken-haus",
  "straße": "Stra-ße",
  "brücke": "Brü-cke",
  "zeit": "Zeit",
  "tag": "Tag",
  "uhr": "Uhr",

  // --- FRENCH (fr) ---
  "eau": "Eau (oh)",
  "rivière": "Ri-vière",
  "océan": "O-cé-an",
  "cascade": "Cas-cade",
  "maison": "Mai-son",
  "chambre": "Cham-bre",
  "toit": "Toit",
  "palais": "Pa-lais",
  "pomme": "Pom-me",
  "raisin": "Rai-sin",
  "livre": "Li-vre",
  "stylo": "Sty-lo",
  "bibliothèque": "Bib-lio-thèque",
  "ami": "A-mi",
  "ennemi": "En-ne-mi",
  "famille": "Fa-mille",
  "frère": "Frère",
  "arbre": "Ar-bre",
  "plante": "Plan-te",
  "feuille": "Feuille",
  "forêt": "Fo-rêt",
  "soleil": "So-leil",
  "étoile": "É-toile",
  "nuage": "Nua-ge",
  "ciel": "Ciel",
  "lune": "Lu-ne",
  "nuit": "Nuit",
  "planète": "Pla-nète",
  "voiture": "Voi-tu-re",
  "vélo": "Vé-lo",
  "chat": "Chat",
  "chien": "Chien",
  "souris": "Sou-ris",
  "loup": "Loup",
  "renard": "Re-nard",
  "oiseau": "Oi-seau",
  "vol": "Vol",
  "vent": "Vent",
  "plume": "Plu-me",
  "fleur": "Fleur",
  "herbe": "Her-be",
  "feu": "Feu",
  "fumée": "Fu-mée",
  "chaleur": "Cha-leur",
  "cendre": "Cen-dre",
  "terre": "Ter-re",
  "lait": "Lait",
  "thé": "Thé",
  "café": "Ca-fé",
  "pain": "Pain",
  "riz": "Riz",
  "légume": "Lé-gu-me",
  "école": "É-co-le",
  "magasin": "Ma-ga-sin",
  "hôpital": "Hô-pi-tal",
  "route": "Rou-te",
  "pont": "Pont",
  "parc": "Parc",
  "temps": "Temps",
  "jour": "Jour",
  "horloge": "Hor-lo-ge",

  // --- SPANISH (es) ---
  "agua": "A-gua",
  "río": "Rí-o",
  "océano": "O-cé-a-no",
  "cascada": "Cas-ca-da",
  "casa": "Ca-sa",
  "habitación": "Ha-bi-ta-ción",
  "techo": "Te-cho",
  "palacio": "Pa-la-cio",
  "manzana": "Man-za-na",
  "plátano": "Plá-ta-no",
  "uva": "U-va",
  "fruta": "Fru-ta",
  "libro": "Li-bro",
  "pluma": "Plu-ma",
  "papel": "Pa-pel",
  "biblioteca": "Bib-lio-te-ca",
  "amigo": "A-mi-go",
  "enemigo": "E-ne-mi-go",
  "familia": "Fa-mi-lia",
  "hermano": "Her-ma-no",
  "árbol": "Á-rbol",
  "planta": "Plan-ta",
  "hoja": "Ho-ja",
  "bosque": "Bos-que",
  "sol": "Sol",
  "estrella": "Es-tre-lla",
  "nube": "Nu-be",
  "cielo": "Cie-lo",
  "luna": "Lu-na",
  "noche": "No-che",
  "planeta": "Pla-ne-ta",
  "coche": "Co-che",
  "autobús": "Au-to-bús",
  "bicicleta": "Bi-ci-cle-ta",
  "gato": "Ga-to",
  "perro": "Pe-rro",
  "ratón": "Ra-tón",
  "león": "Le-ón",
  "lobo": "Lo-bo",
  "zorro": "Zo-rro",
  "pájaro": "Pá-ja-ro",
  "vuelo": "Vue-lo",
  "viento": "Vien-to",
  "flor": "Flor",
  "hierba": "Hier-ba",
  "fuego": "Fue-go",
  "humo": "Hu-mo",
  "calor": "Ca-lor",
  "ceniza": "Ce-ni-za",
  "tierra": "Tier-ra",
  "leche": "Le-che",
  "té": "Té",
  "pan": "Pan",
  "arroz": "A-rroz",
  "verdura": "Ver-du-ra",
  "escuela": "Es-cue-la",
  "tienda": "Tien-da",
  "camino": "Ca-mi-no",
  "puente": "Puen-te",
  "parque": "Par-que",
  "tiempo": "Tiem-po",
  "día": "Dí-a",
  "reloj": "Re-loj",

  // --- JAPANESE (ja) ---
  "水": "Mi-zu",
  "川": "Ka-wa",
  "海": "U-mi",
  "滝": "Ta-ki",
  "家": "I-e",
  "部屋": "He-ya",
  "屋根": "Ya-ne",
  "宮殿": "Kyū-den",
  "リンゴ": "Rin-go",
  "バナナ": "Ba-na-na",
  "ブドウ": "Bu-dō",
  "果物": "Ku-da-mo-no",
  "本": "Hon",
  "ペン": "Pen",
  "紙": "Ka-mi",
  "図書館": "To-sho-kan",
  "友達": "To-mo-da-chi",
  "敵": "Te-ki",
  "家族": "Ka-zo-ku",
  "兄弟": "Kyō-dai",
  "木": "Ki",
  "植物": "Sho-ku-bu-tsu",
  "葉": "Ha",
  "森": "Mo-ri",
  "太陽": "Tai-yō",
  "星": "Ho-shi",
  "雲": "Ku-mo",
  "空": "So-ra",
  "月": "Tsu-ki",
  "夜": "Yo-ru",
  "惑星": "Wa-ku-sei",
  "車": "Ku-ru-ma",
  "バス": "Ba-su",
  "電車": "Den-sha",
  "自転車": "Ji-ten-sha",
  "猫": "Ne-ko",
  "犬": "I-nu",
  "ネズミ": "Ne-zu-mi",
  "ライオン": "Rai-on",
  "オオカミ": "Ō-ka-mi",
  "キツネ": "Ki-tsu-ne",
  "鳥": "To-ri",
  "飛行": "Hi-kō",
  "風": "Ka-ze",
  "羽": "Ha-ne",
  "花": "Ha-na",
  "草": "Ku-sa",
  "火": "Hi",
  "煙": "Ke-mu-ri",
  "熱": "Ne-tsu",
  "灰": "Hai",
  "地球": "Chi-kyū",
  "牛乳": "Gyū-nyū",
  "お茶": "O-cha",
  "コーヒー": "Kō-hī",
  "パン": "Pan",
  "ご飯": "Go-han",
  "野菜": "Ya-sai",
  "学校": "Gak-kō",
  "店": "Mi-se",
  "病院": "Byō-in",
  "道路": "Dō-ro",
  "橋": "Ha-shi",
  "公園": "Kō-en",
  "時間": "Ji-kan",
  "日": "Hi",
  "時計": "To-kei",

  // --- ITALIAN (it) ---
  "acqua": "Ac-qua",
  "fiume": "Fiu-me",
  "oceano": "O-ce-a-no",
  "cascata": "Cas-ca-ta",
  "stanza": "Stan-za",
  "tetto": "Tet-to",
  "palazzo": "Pa-laz-zo",
  "mela": "Me-la",
  "frutta": "Frut-ta",
  "penna": "Pen-na",
  "carta": "Car-ta",
  "amico": "A-mi-co",
  "nemico": "Ne-mi-co",
  "famiglia": "Fa-mi-glia",
  "fratello": "Fra-tel-lo",
  "albero": "Al-be-ro",
  "pianta": "Pian-ta",
  "foglia": "Fo-glia",
  "foresta": "Fo-re-sta",
  "sole": "So-le",
  "stella": "Stel-la",
  "nuvola": "Nu-vo-la",
  "notte": "Not-te",
  "pianeta": "Pia-ne-ta",
  "autobus": "Au-to-bus",
  "treno": "Tre-no",
  "bicicletta": "Bi-ci-clet-ta",
  "gatto": "Gat-to",
  "cane": "Ca-ne",
  "topo": "To-po",
  "leone": "Le-o-ne",
  "lupo": "Lu-po",
  "volpe": "Vol-pe",
  "uccello": "Uc-cel-lo",
  "volo": "Vo-lo",
  "vento": "Ven-to",
  "piuma": "Piu-ma",
  "fiore": "Fio-re",
  "erba": "Er-ba",
  "fuoco": "Fuo-co",
  "fumo": "Fu-mo",
  "calore": "Ca-lo-re",
  "cenere": "Ce-ne-re",
  "terra": "Ter-ra",
  "latte": "Lat-te",
  "tè": "Tè",
  "caffè": "Caf-fè",
  "pane": "Pa-ne",
  "riso": "Ri-so",
  "scuola": "Scuo-la",
  "negozio": "Ne-go-zio",
  "ospedale": "O-spe-da-le",
  "strada": "Stra-da",
  "ponte": "Pon-te",
  "parco": "Par-co",
  "tempo": "Tem-po",
  "giorno": "Gior-no",
  "orologio": "O-ro-lo-gio",

  // --- PHRASES (ALL LANGUAGES) ---
  // Hindi
  "आपका क्या नाम है": "आप-का क्या नाम है",
  "आप कैसे हैं": "आप कै-से हैं",
  "कहाँ हैं": "क-हाँ हैं",
  "कौन हैं": "कौन हैं",
  "शुभ प्रभात": "शुभ प्र-भात",
  "शुभ रात्रि": "शुभ रा-त्रि",
  "नमस्ते": "न-म-स्ते",
  "अलविदा": "अल-वि-दा",
  "धन्यवाद": "धन्य-वाद",
  "माफ़ करें": "मा-फ़ क-रें",
  "हाँ": "हाँ",
  "नहीं": "नहीं",
  "शायद": "शा-यद",
  "कभी नहीं": "क-भी नहीं",
  "ठीक है": "ठीक है",
  "अच्छा": "अ-च्छा",
  "मुझे खेद है": "मु-झे खेद है",
  "कोई बात नहीं": "को-ई बात नहीं",
  "कृपया": "कृ-प-या",
  "मदद": "म-दद",
  "रुको": "रु-को",
  "जाओ": "जा-ओ",
  "आओ": "आ-ओ",
  "मैं नहीं समझता": "मैं न-हीं स-मझ-ता",
  "मुझे पता है": "मु-झे प-ता है",
  "मैंने देखा": "मै-ने दे-खा",
  "मैंने सुना": "मै-ने सु-ना",
  "क्या आप अंग्रेज़ी बोलते हैं": "क्या आप अं-ग्रे-ज़ी बोल-ते हैं",
  "शौचालय कहाँ है": "शौ-चा-लय क-हाँ है",
  "स्टेशन कहाँ है": "स्टे-शन क-हाँ है",
  "होटल कहाँ है": "हो-तल क-हाँ है",
  "अस्पताल कहाँ है": "अस्-प-ताल क-हाँ है",
  "यह कितने का है": "यह कि-त-ने का है",
  "यह क्या है": "यह क्या है",
  "यह कब है": "यह कब है",
  "यह कहाँ है": "यह क-हाँ है",
  "मुझे तुमसे प्यार है": "मु-झे तुम-से प्यार है",
  "मुझे यह पसंद है": "मु-झे यह प-संद है",
  "मैं खुश हूँ": "मैं खुश हूँ",
  "मैं दुखी हूँ": "मैं दु-खी हूँ",
  "आप कहाँ से हैं": "आप क-हाँ से हैं",
  "आप कहाँ जा रहे हैं": "आप क-हाँ जा रहे हैं",
  "आप क्या कर रहे हो": "आप क्या कर रहे हो",
  "आप कौन हैं": "आप कौन हैं",
  "मैं ठीक हूँ": "मैं ठीक हूँ",
  "मैं बीमार हूँ": "मैं बी-मार हूँ",
  "मैं व्यस्त हूँ": "मैं व्य-स्त हूँ",
  "आप क्या कर रहे हैं": "आप क्या कर र-हे हैं",
  "आप कहाँ हैं": "आप क-हाँ हैं",
  "आप कब आएंगे": "आप कब आ-एं-गे",
  "कल मिलते हैं": "कल मिल-ते हैं",
  "बाद में मिलते हैं": "बाद में मिल-ते हैं",
  "आपका दिन शुभ हो": "आप-का दिन शुभ हो",
  "शुभ संध्या": "शुभ सं-ध्या",

  // English
  "what is your name": "What is your name",
  "how are you": "How are you",
  "where are you": "Where are you",
  "who are you": "Who are you",
  "good morning": "Good morn-ing",
  "good night": "Good night",
  "hello": "Hel-lo",
  "goodbye": "Good-bye",
  "thank you": "Thank you",
  "sorry": "Sor-ry",
  "yes": "Yes",
  "no": "No",
  "maybe": "May-be",
  "never": "Nev-er",
  "okay": "O-kay",
  "good": "Good",
  "excuse me": "Ex-cuse me",
  "i am sorry": "I am sor-ry",
  "no problem": "No prob-lem",
  "please": "Please",
  "welcome": "Wel-come",
  "help": "Help",
  "stop": "Stop",
  "go": "Go",
  "come": "Come",
  "i don't understand": "I don't un-der-stand",
  "i know": "I know",
  "i saw": "I saw",
  "i heard": "I heard",
  "do you speak english": "Do you speak Eng-lish",
  "where is the bathroom": "Where is the bath-room",
  "where is the station": "Where is the sta-tion",
  "where is the hotel": "Where is the ho-tel",
  "where is the hospital": "Where is the hos-pi-tal",
  "how much is this": "How much is this",
  "what is this": "What is this",
  "when is this": "When is this",
  "where is this": "Where is this",
  "i love you": "I love you",
  "i like this": "I like this",
  "i am happy": "I am hap-py",
  "i am sad": "I am sad",
  "where are you from": "Where are you from",
  "where are you going": "Where are you go-ing",
  "what are you doing": "What are you do-ing",
  "i am fine": "I am fine",
  "i am sick": "I am sick",
  "i am busy": "I am bus-y",
  "when will you come": "When will you come",
  "see you tomorrow": "See you to-mor-row",
  "see you later": "See you la-ter",
  "have a good day": "Have a good day",
  "good evening": "Good eve-ning",

  // German
  "wie heißt du": "Wie heißt du",
  "wie geht es dir": "Wie geht es dir",
  "wo bist du": "Wo bist du",
  "wer bist du": "Wer bist du",
  "guten morgen": "Gu-ten Mor-gen",
  "gute nacht": "Gu-te Nacht",
  "hallo": "Hal-lo",
  "auf wiedersehen": "Auf Wie-der-se-hen",
  "danke": "Dan-ke",
  "entschuldigung": "Ent-schul-di-gung",
  "ja": "Ja",
  "nein": "Nein",
  "vielleicht": "Viel-leicht",
  "niemals": "Nie-mals",
  "gut": "Gut",
  "entschuldigen sie": "Ent-schul-di-gen Sie",
  "es tut mir leid": "Es tut mir leid",
  "kein problem": "Kein Pro-blem",
  "bitte": "Bit-te",
  "willkommen": "Will-kom-men",
  "hilfe": "Hil-fe",
  "halt": "Halt",
  "geh": "Geh",
  "komm": "Komm",
  "ich verstehe nicht": "Ich ver-ste-he nicht",
  "ich weiß": "Ich weiß",
  "ich sah": "Ich sah",
  "ich hörte": "Ich hör-te",
  "sprechen sie englisch": "Spre-chen Sie Eng-lisch",
  "wo ist die toilette": "Wo ist die Toi-let-te",
  "wo ist der bahnhof": "Wo ist der Bahn-hof",
  "wo ist das hotel": "Wo ist das Ho-tel",
  "wo ist das krankenhaus": "Wo ist das Kran-ken-haus",
  "wie viel kostet das": "Wie viel ko-stet das",
  "was ist das": "Was ist das",
  "wann ist das": "Wann ist das",
  "wo ist das": "Wo ist das",
  "ich liebe dich": "Ich lie-be dich",
  "ich mag das": "Ich mag das",
  "ich bin glücklich": "Ich bin glück-lich",
  "ich bin traurig": "Ich bin trau-rig",
  "woher kommst du": "Wo-her kommst du",
  "wohin gehst du": "Wo-hin gehst du",
  "mir geht es gut": "Mir geht es gut",
  "ich bin krank": "Ich bin krank",
  "ich bin beschäftigt": "Ich bin be-schäf-tigt",
  "wann kommst du": "Wann kommst du",
  "bis morgen": "Bis mor-gen",
  "bis später": "Bis spä-ter",
  "einen schönen tag noch": "Ei-nen schö-nen Tag noch",
  "guten abend": "Gu-ten A-bend",

  // French
  "comment t'appelles-tu": "Com-ment t'ap-pelles-tu",
  "comment ça va": "Com-ment ça va",
  "où es-tu": "Où es-tu",
  "qui es-tu": "Qui es-tu",
  "bonjour": "Bon-jour",
  "bonne nuit": "Bonne nuit",
  "au revoir": "Au re-voir",
  "merci": "Mer-ci",
  "pardon": "Par-don",
  "oui": "Oui",
  "non": "Non",
  "peut-être": "Peut-être",
  "jamais": "Ja-mais",
  "d'accord": "D'ac-cord",
  "bien": "Bien",
  "excusez-moi": "Ex-cu-sez-moi",
  "je suis désolé": "Je suis dé-so-lé",
  "pas de problème": "Pas de pro-blème",
  "s'il vous plaît": "S'il vous plaît",
  "bienvenue": "Bien-ve-nue",
  "aide": "Aide",
  "arrêt": "Ar-rêt",
  "aller": "Al-ler",
  "venir": "Ve-nir",
  "je ne comprends pas": "Je ne com-prends pas",
  "je sais": "Je sais",
  "j'ai vu": "J'ai vu",
  "j'ai entendu": "J'ai en-ten-du",
  "parlez-vous anglais": "Par-lez-vous an-glais",
  "où sont les toilettes": "Où sont les toi-let-tes",
  "oû est la gare": "Où est la gare",
  "oû est l'hôtel": "Où est l'hô-tel",
  "oû est l'hôpital": "Où est l'hô-pi-tal",
  "combien ça coûte": "Com-bien ça coûte",
  "qu'est-ce que c'est": "Qu'est-ce que c'est",
  "c'est quand": "C'est quand",
  "c'est où": "C'est où",
  "je t'aime": "Je t'aime",
  "j'aime ça": "J'aime ça",
  "je suis heureux": "Je suis heu-reux",
  "je suis triste": "Je suis triste",
  "d'où viens-tu": "D'où viens-tu",
  "où vas-tu": "Où vas-tu",
  "que fais-tu": "Que fais-tu",
  "ça va bien": "Ça va bien",
  "je suis malade": "Je suis ma-la-de",
  "je suis occupé": "Je suis oc-cu-pé",
  "quand viens-tu": "Quand viens-tu",
  "à demain": "À de-main",
  "à plus tard": "À plus tard",
  "bonne journée": "Bonne jour-née",
  "bonsoir": "Bon-soir",

  // Spanish
  "cómo te llamas": "¿Có-mo te lla-mas",
  "cómo estás": "¿Có-mo es-tás",
  "dónde estás": "¿Dón-de es-tás",
  "quién eres": "¿Quién e-res",
  "buenos días": "Bue-nos dí-as",
  "buenas noches": "Bue-nas no-ches",
  "hola": "Ho-la",
  "adiós": "A-diós",
  "gracias": "Gra-cias",
  "perdón": "Per-dón",
  "sí": "Sí",
  "tal vez": "Tal vez",
  "nunca": "Nun-ca",
  "vale": "Va-le",
  "perdone": "Per-do-ne",
  "lo siento": "Lo sien-to",
  "no hay problema": "No hay pro-ble-ma",
  "por favor": "Por fa-vor",
  "bienvenido": "Bien-ve-ni-do",
  "ayuda": "A-yu-da",
  "parar": "Pa-rar",
  "ir": "Ir",
  "no entiendo": "No en-tien-do",
  "lo sé": "Lo sé",
  "vi": "Vi",
  "escuché": "Es-cu-ché",
  "habla inglés": "¿Ha-bla in-glés",
  "dónde está el baño": "¿Dón-de es-tá el ba-ño",
  "dónde está la estación": "¿Dón-de es-tá la es-ta-ción",
  "dónde está el hotel": "¿Dón-de es-tá el ho-tel",
  "dónde está el hospital": "¿Dón-de es-tá el hos-pi-tal",
  "cuánto cuesta esto": "¿Cuán-to cues-ta es-to",
  "qué es esto": "¿Qué es es-to",
  "cuándo es esto": "¿Cuán-do es es-to",
  "dónde está esto": "¿Dón-de es-tá es-to",
  "te amo": "Te a-mo",
  "me gusta esto": "Me gus-ta es-to",
  "estoy feliz": "Es-toy fe-liz",
  "estoy triste": "Es-toy tris-te",
  "de dónde eres": "¿De dón-de e-res",
  "a dónde vas": "¿A dón-de vas",
  "qué haces": "¿Qué ha-ces",
  "estoy bien": "Es-toy bien",
  "estoy enfermo": "Es-toy en-fer-mo",
  "estoy ocupado": "Es-toy o-cu-pa-do",
  "cuándo vendrás": "¿Cuán-do ven-drás",
  "hasta mañana": "Has-ta ma-ña-na",
  "hasta luego": "Has-ta lue-go",
  "que tengas un buen día": "Que ten-gas un buen dí-a",
  "buenas tardes": "Bue-nas no-ches",

  // Japanese
  "名前は何ですか": "Na-mae wa nan desu ka",
  "お元気ですか": "O-gen-ki desu ka",
  "どこですか": "Do-ko desu ka",
  "誰ですか": "Da-re desu ka",
  "おはようございます": "O-ha-yō go-zai-ma-su",
  "おやすみなさい": "O-ya-su-mi-na-sai",
  "こんにちは": "Kon-ni-chi-wa",
  "さようなら": "Sa-yō-na-ra",
  "ありがとう": "A-ri-ga-tō",
  "ごめんなさい": "Go-men na-sai",
  "はい": "Hai",
  "いいえ": "Ii-e",
  "多分": "Ta-bun",
  "決して": "Kes-shi-te",
  "オーケー": "Ō-kē",
  "良い": "Yo-i",
  "すみません": "Su-mi-ma-sen",
  "問題ない": "Mon-dai nai",
  "お願いします": "O-ne-gai shi-ma-su",
  "ようこそ": "Yō-ko-so",
  "助けて": "Ta-su-ke-te",
  "止まれ": "To-ma-re",
  "行く": "I-ku",
  "来る": "Ku-ru",
  "わかりません": "Wa-ka-ri-ma-sen",
  "知っています": "Shit-te i-ma-su",
  "見ました": "Mi-ma-shi-ta",
  "聞きました": "Ki-ki-ma-shi-ta",
  "英語を話しますか": "Ei-go o ha-na-shi-ma-su ka",
  "トイレはどこですか": "Toi-re wa do-ko desu ka",
  "駅はどこですか": "E-ki wa do-ko desu ka",
  "ホテルはどこですか": "Ho-te-ru wa do-ko desu ka",
  "病院はどこですか": "Byō-in wa do-ko desu ka",
  "これはいくらですか": "Ko-re wa i-ku-ra de-su ka",
  "これは何ですか": "Ko-re wa nan de-su ka",
  "これはいつですか": "Ko-re wa i-tsu de-su ka",
  "これはどこですか": "Ko-re wa do-ko de-su ka",
  "愛しています": "Ai-shi-te-i-ma-su",
  "これが好きです": "Ko-re ga su-ki de-su",
  "私は幸せです": "Wa-ta-shi wa shi-a-wa-se de-su",
  "私は悲しいです": "Wa-ta-shi wa ka-na-shii de-su",
  "どこから来ましたか": "Do-ko ka-ra ki-ma-shi-ta ka",
  "どこに行きますか": "Do-ko ni i-ki-ma-su ka",
  "何をしていますか": "Na-ni o shi-te-i-ma-su ka",
  "元気です": "Gen-ki de-su",
  "病気です": "Byō-ki de-su",
  "悲しいです": "Ka-na-shii de-su",
  "忙しいです": "I-so-ga-shii de-su",
  "いつ来ますか": "I-tsu ki-ma-su ka",
  "また明日": "Ma-ta a-shi-ta",
  "また後で": "Ma-ta a-to de",
  "良い一日 को": "Yo-i i-chi-ni-chi o",
  "良い一日を": "Yo-i i-chi-ni-chi o",
  "おはよう": "Oh-ha-yō",
  "こんばんは": "Kon-ban-wa",
  "おやすみ": "O-ya-su-mi",

  // Italian
  "come ti chiami": "Co-me ti chia-mi",
  "come stai": "Co-me stai",
  "dove sei": "Do-ve sei",
  "chi sei": "Chi sei",
  "buongiorno": "Buon-gior-no",
  "buonamente": "Buon-a-men-te",
  "buonanotte": "Buon-a-not-te",
  "ciao": "Ciao",
  "arrivederci": "Ar-ri-ve-der-ci",
  "grazie": "Gra-zie",
  "scusa": "Scu-sa",
  "sì": "Sì",
  "forse": "For-se",
  "mai": "Mai",
  "va bene": "Va be-ne",
  "bene": "Be-ne",
  "scusami": "Scu-sa-mi",
  "mi dispiace": "Mi dis-pia-ce",
  "nessun problema": "Nes-sun pro-ble-ma",
  "per favore": "Per fa-vo-re",
  "benvenuto": "Ben-ve-nu-to",
  "aiuto": "A-iu-to",
  "fermati": "Fer-ma-ti",
  "vai": "Vai",
  "vieni": "Vie-ni",
  "non capisco": "Non ca-pis-co",
  "lo so": "Lo so",
  "ho visto": "Ho vi-sto",
  "ho sentito": "Ho sen-ti-to",
  "parli inglese": "Par-li in-gle-se",
  "dov'è il bagno": "Do-v'è il ba-gno",
  "dov'è la stazione": "Do-v'è la sta-zio-ne",
  "dov'è l'hotel": "Do-v'è l'ho-tel",
  "dov'è l'ospedale": "Do-v'è l'o-spe-da-le",
  "quanto costa": "Quan-to co-sta",
  "cos'è questo": "Co-s'è que-sto",
  "quand'è": "Quan-d'è",
  "dov'è": "Do-v'è",
  "ti amo": "Ti a-mo",
  "mi piace": "Mi pia-ce",
  "sono felice": "So-no fe-li-ce",
  "sono triste": "So-no tris-te",
  "di dove sei": "Di do-ve sei",
  "dove vai": "Do-ve vai",
  "cosa fai": "Co-sa fai",
  "sto bene": "Sto be-ne",
  "sono malato": "So-no ma-la-to",
  "sono occupato": "So-no oc-cu-pa-to",
  "cosa stai facendo": "Co-sa stai fa-cen-do",
  "quando vieni": "Quan-do vie-ni",
  "a domani": "A do-ma-ni",
  "a dopo": "A do-po",
  "buona giornata": "Buo-na gior-na-ta",
  "buonasera": "Buo-na-se-ra",

  // --- CONVERSATION FLOW EXTRA SENTENCES ---
  "नमस्ते राहुल आप कैसे हैं": "न-म-स्ते रा-हुल, आप कै-से हैं",
  "hello rahul how are you": "Hel-lo Ra-hul, how are you",
  "hallo rahul wie geht es dir": "Hal-lo Ra-hul, wie geht es dir",
  "bonjour rahul comment ça va": "Bon-jour Ra-hul, com-ment ça va",
  "hola rahul cómo estás": "Ho-la Ra-hul, ¿có-mo es-tás",
  "こんにちはラフルさんお元気ですか": "Kon-ni-chi-wa, Ra-fu-ru-san. O-gen-ki desu ka",
  "ciao rahul come stai": "Ciao Ra-hul, co-me stai",
  "मैं ठीक हूँ धन्यवाद और आप": "मैं ठीक हूँ, धन्य-वाद। और आप",
  "i'm fine thank you and you": "I'm fine, thank you. And you",
  "mir geht es gut danke und dir": "Mir geht es gut, dan-ke. Und dir",
  "ça va bien merci et toi": "Ça va bien, mer-ci. Et toi",
  "estoy bien gracias y tú": "Es-toy bien, gra-cias. ¿Y tú",
  "元気ですありがとうあなたは": "Gen-ki de-su, a-ri-ga-tō. A-na-ta wa",
  "sto bene grazie e tu": "Sto be-ne, gra-zie. E tu",
  "मैं भी ठीक हूँ आज आप क्या कर रहे हैं": "मैं भी ठीक हूँ। आज आप क्या कर रहे हैं",
  "i'm fine too what are you doing today": "I'm fine too. What are you do-ing to-day",
  "mir geht es auch gut was machst du heute": "Mir geht es auch gut. Was machst du heu-te",
  "ça va bien aussi que fais-tu aujourd'hui": "Ça va bien aus-si. Que fais-tu au-jour-d'hui",
  "yo también estoy bien qué haces hoy": "Yo tam-bién es-toy bien. ¿Qué ha-ces hoy",
  "私も元気です今日は何をしていますか": "Wa-ta-shi mo gen-ki de-su. Kyō wa na-ni o shi-te-i-ma-su ka",
  "anche io sto bene cosa fai oggi": "An-che io sto be-ne. Co-sa fai og-gi",
  "mai ek nayi bhasha seekh rha hu": "mai ek na-yi bha-sha seekh rha hu",
  "i am learning a new language": "I am learn-ing a new lan-guage",
  "ich lerne eine neue sprache": "Ich ler-ne ei-ne neu-e Spra-che",
  "j'apprends une nouvelle langue": "J'ap-prends u-ne nou-vel-le lan-gue",
  "estoy aprendiendo un nuevo idioma": "Es-toy a-pren-dien-do un nue-vo i-dio-ma",
  "新しい言語を勉強しています": "A-ta-ra-shii gen-go o ben-kyō shi-te-i-ma-su",
  "sto imparando una nuova lingua": "Sto im-pa-ran-do u-na nuo-va lin-gua",
  "यह बहुत अच्छा है कौन सी भाषा": "यह बहुत अ-च्छा है! कौन सी भा-षा",
  "that's great which language": "That's great! Which lan-guage",
  "das ist toll welche sprache": "Das ist toll! Wel-che Spra-che",
  "c'est super quelle langue": "C'est su-per! Quel-le lan-gue",
  "eso es genial qué idioma": "¡E-so es ge-nial! ¿Qué i-dio-ma",
  "それは素晴らしいですねどの言語ですか": "So-re wa su-ba-ra-shii de-su ne! Do-no gen-go de-su ka",
  "è fantastico quale lingua": "È fan-ta-sti-co! Qua-le lin-gua",
  "मैं अभी जर्मन सीख रहा हूँ": "मैं अ-भी जर-मन सीख रहा हूँ",
  "i am learning german right now": "I am learn-ing Ger-man right now",
  "ich lerne gerade deutsch": "Ich ler-ne ge-ra-de Deutsch",
  "j'apprends l'allemand en ce moment": "J'ap-prends l'al-le-mand en ce mo-ment",
  "estoy aprendiendo alemán ahora mismo": "Es-toy a-pren-dien-do a-le-mán a-ho-ra mis-mo",
  "今ドイツ語 を勉強しています": "I-ma, Doi-tsu-go o ben-kyō shi-te-i-ma-su",
  "adesso sto imparando il tedesco": "A-des-so sto im-pa-ran-do il te-de-sco",
  "जर्मन एक सुंदर भाषा है": "जर-मन एक सुं-दर भा-षा है",
  "german is a beautiful language": "Ger-man is a beau-ti-ful lan-guage",
  "deutsch ist eine schöne sprache": "Deutsch ist ei-ne schö-ne Spra-che",
  "l'allemand est une belle langue": "L'al-le-mand est u-ne bel-le lan-gue",
  "el alemán es un idioma hermoso": "El a-le-mán es un i-dio-ma her-mo-so",
  "ドイツ語は美しい言語です": "Doi-tsu-go wa u-tsu-ku-shii gen-go de-su",
  "il tedesco è una lingua bellissima": "Il te-de-sco è u-na lin-gua bel-lis-si-ma",
  "हाँ मुझे यह बहुत पसंद है": "हाँ, मु-झे यह बहुत प-संद है",
  "yes i like it very much": "Yes, I like it ver-y much",
  "ja ich mag es sehr": "Ja, ich mag es sehr",
  "oui j'aime beaucoup ça": "Oui, j'aime beau-coup ça",
  "sí me gusta mucho": "Sí, me gus-ta mu-cho",
  "はいとても気に入っています": "Hai, to-te-mo ki ni it-te-i-ma-su",
  "sì mi piace molto": "Sì, mi pia-ce mol-to",
  "शुभकामनाएं बाद में मिलते हैं": "शुभ-काम-ना-एं! बाद में मिल-ते हैं",
  "good luck see you later": "Good luck! See you la-ter",
  "viel glück bis später": "Viel Glück! Bis spä-ter",
  "bonne chance à plus tard": "Bonne chan-ce! À plus tard",
  "buena suerte hasta luego": "¡Bue-na suer-te! Has-ta lue-go",
  "頑張ってくださいまた後で": "Gan-bat-te ku-da-sai! Ma-ta a-to de",
  "buona fortuna a dopo": "Buo-na for-tu-na! A do-po"
};

const cleanForLookup = (str) => {
  if (!str) return "";
  return str
    .replace(/\s*\([^)]*\)\s*/g, '')
    .replace(/[?.,!¿¡":;।？、。]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
};

const getSyllables = (str) => {
  if (!str) return "";
  const cleaned = cleanForLookup(str);
  return SYLLABLE_MAP[cleaned] || "";
};

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
    distractors: { hi: ["माफ़ करें", "हाँ", "नहीं"], en: ["Sorry", "Yes", "No"], de: ["Entschuldigung", "Ja", "Nein"], fr: ["Pardon", "Oui", "Non"], es: ["Perdón", "Sí", "No"], ja: ["ごめんなさい (Gomen nasai)", "はい (Hai)", "いいえ (Iie)"], it: ["Scusa", "Sì", "No"] },
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
    translations: { hi: "माफ़ करें", en: "Excuse me", de: "Entschuldigen Sie", fr: "Excusez-moi", es: "Perdone", ja: "すみません (Sumimasen)", it: "Scusami" }, 
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
    translations: { hi: "मैं नहीं समझता", en: "I don't understand", de: "Ich verstehe nicht", fr: "Je ne comprends pas", es: "No entiendo", ja: "わかりません (Wakarimasen)", it: "Non capisco" }, 
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
    translations: { hi: "आप क्या कर रहे हैं?", en: "What are you doing?", de: "Was machst du?", fr: "Que fais-tu ?", es: "¿Qué haces?", ja: "何をしていますか？ (Nani o shiteimasu ka?)", it: "Cosa stai facendo?" }, 
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
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showSyllables, setShowSyllables] = useState(false);
  const currentAudioRef = useRef(null);
  
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
    setIsAudioPlaying(true);
    const shortLang = langCode.split('-')[0];
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode;
    utterance.rate = 0.9;
    
    utterance.onend = () => {
      setIsAudioPlaying(false);
    };
    utterance.onerror = () => {
      setIsAudioPlaying(false);
    };

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

    setTimeout(() => {
      setIsAudioPlaying(false);
    }, 7000);
  };

  const handleSpeak = (text, langCode, audioFileName) => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    setIsAudioPlaying(true);

    if (audioFileName) {
      const folderName = type === 'conversations' ? 'conversation' : type;
      const audioUrl = `/audio/${folderName}/${langCode}/${audioFileName}.mp3`;
      const audio = new Audio(audioUrl);
      currentAudioRef.current = audio;

      audio.onended = () => {
        setIsAudioPlaying(false);
      };
      audio.onerror = () => {
        console.warn("Failed to play local audio, falling back to TTS");
        fallbackTTS(text, langCode);
      };

      audio.play().catch((err) => {
        console.warn("Failed to play local audio, falling back to TTS:", err);
        fallbackTTS(text, langCode);
      });
    } else {
      fallbackTTS(text, langCode);
    }
  };

  const handleNext = () => {
    if (isAudioPlaying) return;
    if (step < items.length - 1) {
      const nextStep = step + 1;
      setStep(nextStep);
      setInputValue("");
      setShowFeedback(false);
      setIsCorrect(null);
      setShowSyllables(false);
      setIsAudioPlaying(true);
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
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
      }
      window.speechSynthesis.cancel();
      setStep(step - 1);
      setInputValue("");
      setShowFeedback(false);
      setIsCorrect(null);
      setShowSyllables(false);
      setIsAudioPlaying(false);
    }
  };

  const shuffledOptions = useMemo(() => {
    if (!currentItem || type === 'conversations') return [];
    const uniqueOptions = Array.from(new Set([...currentItem.distractors, currentItem.target]));
    return uniqueOptions.sort(() => Math.random() - 0.5);
  }, [currentItem, type]);

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-[#EFF6FF] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-300/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-yellow-300/20 blur-[60px] rounded-full pointer-events-none" />
        
        <div className="bg-white rounded-[40px] shadow-2xl shadow-blue-100/50 p-10 md:p-14 max-w-lg w-full flex flex-col items-center border border-blue-50 z-10 animate-fade-in-up">
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
              className="flex-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-5 rounded-2xl font-black text-[17px] shadow-lg shadow-blue-200 transition-all hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2"
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
        .convo-bg { background-image: url('/images/linguistic/convo.webp'); background-size: cover; background-position: center; position: absolute; inset: 0; opacity: 0.9; }
        .bubble-glow { box-shadow: 0 0 40px rgba(255, 255, 255, 0.4), 0 10px 20px rgba(0, 0, 0, 0.1); }
      `}</style>
      
      {type === 'conversations' && <div className="convo-bg" />}

      {showFeedback && (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300 ${isCorrect ? 'bg-blue-500/10' : 'bg-rose-500/10'} backdrop-blur-[4px]`}>
          <div className="bg-white rounded-[40px] p-8 shadow-xl border border-slate-100 flex flex-col items-center gap-6 animate-fade-in-up max-w-[320px] w-full mx-4">
              {isCorrect ? (
                <>
                  <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-blue-500"><CheckCircle size={60} strokeWidth={2.5} /></div>
                  <div className="text-center">
                    <h2 className="text-3xl font-black text-slate-900 mb-2">{t.amazing}</h2>
                    <p className="text-blue-600 font-bold leading-tight mb-2">{t.correct_msg}</p>
                    <p className="text-slate-800 font-black text-lg">{currentItem.target}</p>
                    {getSyllables(currentItem.target) && (
                      <p className="text-blue-500 font-bold text-xs tracking-wider italic mt-0.5">({getSyllables(currentItem.target)})</p>
                    )}
                  </div>
                  <button onClick={handleNext} className="w-full bg-[#2563EB] text-white py-4 rounded-2xl font-black shadow-lg shadow-blue-200 active:scale-95 transition-all flex items-center justify-center gap-2">Continue <ChevronRight size={20} strokeWidth={3} /></button>
                </>
              ) : (
                <>
                  <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center text-rose-500"><X size={60} strokeWidth={2.5} /></div>
                  <div className="text-center">
                    <h2 className="text-3xl font-black text-slate-900 mb-2">{t.oops}</h2>
                    <p className="text-slate-500 font-bold leading-tight mb-2">{t.wrong_msg}</p>
                    <p className="text-slate-500 text-xs mb-1">Correct answer:</p>
                    <p className="text-slate-800 font-black text-lg">{currentItem.target}</p>
                    {getSyllables(currentItem.target) && (
                      <p className="text-rose-400 font-bold text-xs tracking-wider italic mt-0.5">({getSyllables(currentItem.target)})</p>
                    )}
                  </div>
                  <button onClick={handleTryAgain} className="w-full bg-rose-500 text-white py-4 rounded-2xl font-black shadow-lg shadow-rose-200 active:scale-95 transition-all flex items-center justify-center gap-2">Try Again <ArrowRight size={20} strokeWidth={3} /></button>
                </>
              )}
          </div>
        </div>
      )}

       <main className={`flex-1 ${type === 'conversations' ? 'flex flex-col' : 'grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] items-center px-4 md:px-12 pb-5 gap-2'} min-h-0 relative max-w-[1400px] mx-auto w-full z-10`}>
        <button onClick={() => navigate("/ling", { state: { source: sourceLang, target: targetLang } })} className="absolute top-4 left-2 md:left-8 w-8 h-8 md:w-10 md:h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-sm flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all border border-slate-50 z-50">
          <ArrowLeft strokeWidth={2.5} className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        {type === 'conversations' ? (
          <div className="flex-1 flex flex-col relative overflow-hidden">
             <div className="flex-1 relative flex flex-col justify-center px-4 md:pl-[40%] md:pr-[18%] pb-48 gap-4">
                
                <div key={step} className={`flex w-full ${currentItem.speaker === 'boy' ? 'justify-start' : 'justify-end'} animate-fade-in-up`}>
                   <div className={`relative max-w-[260px] p-4 rounded-[30px] shadow-[0_8px_30px_rgba(0,0,0,0.05)] border-2 transition-all duration-500
                      ${currentItem.speaker === 'boy' 
                        ? 'bg-[#EFF6FF] border-blue-50 rounded-bl-none' 
                        : 'bg-[#FFFDF9] border-orange-50 rounded-br-none mr-48'}`}>
                      
                      <div className="flex items-center gap-3 py-1">
                         <div 
                           onClick={() => handleSpeak(currentItem.text, targetLang, currentItem.audioFile)} 
                           className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-sm flex-shrink-0
                              ${currentItem.speaker === 'boy' ? 'bg-white text-[#2563EB]' : 'bg-white text-orange-400'}`}
                         >
                            <Volume2 size={18} fill="currentColor" />
                         </div>
                         <div className="flex-1">
                            <h2 className="text-[17px] font-black text-slate-800 leading-snug mb-0.5">{currentItem.text}</h2>
                            <p className="text-[13px] font-medium text-slate-500 leading-tight">{currentItem.native}</p>
                            {showSyllables && getSyllables(currentItem.text) && (
                               <p className={`text-[12px] font-bold mt-1 tracking-wide leading-tight italic ${currentItem.speaker === 'boy' ? 'text-blue-500' : 'text-orange-500'}`}>
                                 ({getSyllables(currentItem.text)})
                               </p>
                            )}
                         </div>
                         <div
                           onClick={() => setShowSyllables(!showSyllables)}
                           className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-sm flex-shrink-0 bg-white ${showSyllables ? (currentItem.speaker === 'boy' ? 'text-blue-500' : 'text-orange-500') : 'text-slate-400 hover:text-slate-600'}`}
                           title="Toggle Syllables"
                         >
                           <Eye size={16} />
                         </div>
                      </div>

                      <div className={`absolute -bottom-5 flex flex-col gap-1 ${currentItem.speaker === 'boy' ? 'left-4' : 'right-4'}`}>
                         <div className="w-3.5 h-3.5 rounded-full bg-white shadow-sm border border-slate-50" />
                         <div className="w-2 h-2 rounded-full bg-white shadow-sm border border-slate-50" />
                      </div>

                      <div className={`absolute -top-2 px-2.5 py-0.5 rounded-full text-[7.5px] font-black uppercase tracking-[0.2em] shadow-sm
                         ${currentItem.speaker === 'boy' ? 'left-5 bg-[#2563EB] text-white' : 'right-5 bg-orange-400 text-white'}`}>
                         {currentItem.speaker}
                      </div>
                   </div>
                </div>

                <div className={`flex w-full opacity-5 grayscale scale-50 ${currentItem.speaker === 'boy' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`w-16 h-8 rounded-[15px] border-2 border-dashed ${currentItem.speaker === 'boy' ? 'border-orange-200' : 'border-blue-200'}`} />
                </div>
             </div>

             <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4">
                {step > 0 && (
                   <button 
                     onClick={handleBack}
                     className="px-6 md:px-8 py-3.5 bg-white text-slate-400 rounded-2xl font-black text-[15px] md:text-[17px] shadow-lg border-b-4 border-slate-200 hover:translate-y-[-2px] active:border-b-0 active:translate-y-[2px] transition-all flex items-center gap-2 group"
                   >
                     <ArrowLeft size={20} strokeWidth={3} className="group-hover:-translate-x-1.5 transition-transform" /> Back
                   </button>
                )}

                <button 
                  onClick={handleNext}
                  disabled={isAudioPlaying}
                  className={`px-10 md:px-14 py-3.5 rounded-2xl font-black text-[16px] md:text-[18px] transition-all flex items-center gap-3 group ${
                    isAudioPlaying
                      ? 'bg-slate-300 text-slate-500 border-b-4 border-slate-400 cursor-not-allowed opacity-75'
                      : 'bg-[#2563EB] text-white shadow-xl shadow-blue-100 border-b-4 border-blue-700 hover:translate-y-[-2px] active:border-b-0 active:translate-y-[2px] cursor-pointer'
                  }`}
                >
                  {step === items.length - 1 ? 'Finish' : 'Next'} <ArrowRight size={24} strokeWidth={3} className={`transition-transform ${isAudioPlaying ? '' : 'group-hover:translate-x-1.5'}`} />
                </button>
             </div>
          </div>
        ) : (
          <>
            <div className="hidden lg:flex relative h-full flex-col justify-end items-center pb-4">
              <div className="absolute top-[18%] left-[60%] -translate-x-1/2 w-40 p-3 bg-[#DBEAFE] rounded-[20px] rounded-bl-none shadow-md border border-blue-50 z-10"><p className="text-[14px] font-medium leading-relaxed">{t.question_sia(currentItem.native, targetLangName)}</p><div className="absolute -bottom-7 left-6 flex flex-col gap-2"><div className="w-5 h-5 rounded-full bg-[#DBEAFE]" /><div className="w-3 h-3 rounded-full bg-[#DBEAFE]" /></div></div>
              <img src="/images/linguistic/boy.webp" alt="Boy" className="w-[260px] h-auto object-contain max-h-[55vh] -ml-24 -translate-y-12" />
            </div>
            <div className="flex flex-col items-center gap-3 py-2 lg:-ml-16 mx-auto w-full">
              <h1 className="text-lg font-black text-center mb-0">{t.question_main(targetLangName)}</h1>
              <div className="w-full max-w-[280px] aspect-[1/1.1] bg-white rounded-[32px] shadow-xl shadow-slate-300/40 flex flex-col items-center justify-center p-6 relative border border-slate-50">
                  <div onClick={() => handleSpeak(currentItem.target, targetLang, currentItem.audioFile)} className="absolute top-4 right-4 w-9 h-9 bg-[#EFF6FF] rounded-full flex items-center justify-center text-[#2563EB] cursor-pointer hover:scale-110 transition-transform active:scale-90"><Volume2 size={18} /></div>
                  {currentItem.icon ? (
                    <div className="text-[90px] leading-none mb-4 animate-bounce-subtle select-none flex items-center justify-center h-[100px] w-[100px] drop-shadow-xl">{currentItem.icon}</div>
                  ) : (
                    <img src={currentItem.image} className="w-[100px] h-[100px] object-contain mb-4 animate-bounce-subtle" alt="Word" />
                  )}
                  <div className="text-center"><div className="text-4xl font-black mb-1">{currentItem.native}</div><div className="h-0.5 w-20 bg-[#EFF6FF] mx-auto mb-2" /><div className="text-[14px] text-slate-400 font-bold tracking-widest uppercase opacity-60">{currentItem.translation}</div></div>
              </div>
              <div className="w-full max-w-[380px] space-y-3">
                <div className={`${type === 'phrases' ? 'grid grid-cols-2' : 'flex flex-wrap justify-center'} gap-2 w-full`}>
                  {shuffledOptions.map((option, idx) => {
                    const syllables = getSyllables(option);
                    return (
                      <button 
                        key={idx} 
                        onClick={() => !showFeedback && setInputValue(option)} 
                        className={`px-3 py-2.5 rounded-2xl font-black transition-all border-2 active:scale-95 flex flex-col items-center justify-center min-w-[100px] ${
                          inputValue === option 
                            ? "bg-[#2563EB] text-white border-[#2563EB] shadow-lg shadow-blue-100" 
                            : "bg-white text-slate-600 border-slate-100 hover:border-blue-100"
                        } ${type === 'phrases' ? 'w-full' : ''}`}
                      >
                        <span className="text-[13.5px] text-center leading-tight">{option}</span>
                        {syllables && (
                          <span className={`text-[9px] font-bold mt-1 tracking-wide text-center leading-tight ${
                            inputValue === option ? 'text-blue-100' : 'text-slate-400'
                          }`}>
                            {syllables}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-center mt-10 z-20 w-full max-w-[480px]">
                {step > 0 && (<button onClick={handleBack} className="flex-1 min-w-[80px] py-2.5 bg-white border border-slate-300 rounded-[16px] text-[13px] font-black text-slate-400 hover:text-slate-600 flex items-center justify-center gap-1.5 shadow-sm"><ArrowLeft size={16} strokeWidth={3} /> {t.back}</button>)}
                <button onClick={() => setInputValue(currentItem.target)} className="flex-1 min-w-[100px] py-2.5 bg-white border border-slate-300 rounded-[16px] text-[13px] font-black text-slate-500 hover:text-slate-700 shadow-sm">{t.dont_know}</button>
                <button onClick={handleCheck} disabled={!inputValue || showFeedback} className={`flex-[1.5] min-w-[120px] justify-center py-2.5 rounded-[16px] font-black text-[14px] flex items-center gap-2 shadow-lg transition-all active:scale-95 ${!inputValue || showFeedback ? 'bg-slate-100 text-slate-300' : 'bg-[#2563EB] text-white shadow-blue-200'}`}>{t.check} <ArrowRight size={16} strokeWidth={3} /></button>
              </div>
            </div>
            <div className="hidden lg:flex relative h-full flex-col justify-end items-center pb-4">
              <div className="absolute top-[20%] right-[75%] translate-x-1/2 w-44 p-3 bg-orange-50 rounded-[20px] rounded-br-none shadow-md border border-yellow-100 z-10">
                <p className="text-[14px] font-medium leading-relaxed text-slate-800">
                  {t.guess_girl(currentItem.target)}
                  {getSyllables(currentItem.target) && (
                    <span className="block text-[11px] text-orange-500 font-bold mt-1 tracking-wider">
                      ({getSyllables(currentItem.target)})
                    </span>
                  )}
                </p>
                <div className="absolute -bottom-7 right-6 flex flex-col gap-2"><div className="w-5 h-5 rounded-full bg-orange-50 shadow-sm" /><div className="w-3 h-3 rounded-full bg-[#FFFDF9] shadow-sm" /></div>
              </div>
              
              <div className="absolute top-1/2 -right-2 sm:-right-4 md:-right-8 -translate-y-1/2 w-[160px] bg-white rounded-[32px] p-6 shadow-xl border border-slate-50 z-30 scale-95 origin-center">
                  <div className="text-center"><div className="text-[13px] font-medium text-slate-600 mb-4">{t.streak}</div><div className="relative w-24 h-24 mx-auto flex items-center justify-center"><svg className="w-full h-full -rotate-90" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="transparent" stroke="#FFF8EA" strokeWidth="8" /><circle cx="50" cy="50" r="40" fill="transparent" stroke="#FF9800" strokeWidth="8" strokeDasharray="251" strokeDashoffset={251 - ((streak % 7 || 7) / 7) * 251} strokeLinecap="round" className="transition-all duration-1000" /></svg><div className="absolute flex flex-col items-center"><div className="flex items-center gap-1"><Flame size={20} className="text-[#FF9800] fill-[#FF9800]" /><span className="text-2xl font-black text-[#1A1C2E]">{streak}</span></div><span className="text-[10px] font-bold text-slate-400">{t.days}</span></div></div></div>
                  <div className="space-y-3 mt-4"><div className="text-[13px] text-center font-medium text-slate-600">{t.goal}</div><div className="flex items-baseline gap-1"><span className="text-sm font-black text-[#1A1C2E]">{Math.min(dailyProgress, dailyTotal)} / {dailyTotal}</span><span className="text-[10px] font-bold text-slate-400">{t.words}</span></div><div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-[#2563EB] transition-all duration-500 rounded-full" style={{ width: `${Math.min((dailyProgress/dailyTotal) * 100, 100)}%` }} /></div></div>
                  <div className="text-center pt-2 mt-4"><div className="text-[13px] font-medium text-slate-600 mb-4">{t.progress}</div><div className="relative w-24 h-24 mx-auto flex items-center justify-center"><svg className="w-full h-full -rotate-90" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="transparent" stroke="#EFF6FF" strokeWidth="8" /><circle cx="50" cy="50" r="40" fill="transparent" stroke="#2563EB" strokeWidth="8" strokeDasharray="251" strokeDashoffset={251 - ((step/items.length)*251)} strokeLinecap="round" /></svg><div className="absolute flex flex-col items-center"><div className="text-xl font-black text-[#1A1C2E]">{step + 1}/{items.length}</div><span className="text-[10px] font-bold text-slate-400">{t.words}</span></div></div></div>
              </div>

              <img src="/images/linguistic/girl.webp" alt="Girl" className="w-[230px] h-auto object-contain max-h-[55vh] -ml-20 -translate-y-12" />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
