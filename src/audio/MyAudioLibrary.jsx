import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Headphones, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, 
  Heart, Bookmark, Clock, BookOpen, Sparkles, Film, X, Search, CheckCircle, 
  Library, RotateCcw, Award, CheckCircle2, ChevronRight, Layers, FileText, ChevronUp, ChevronDown
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

const booksData = [
  {
    "id": 101,
    "title": "Mridang",
    "author": "NCERT CIET",
    "category": "Class 1",
    "class": "Class 1",
    "subject": "English",
    "rating": 4.9,
    "reviews": "1,420",
    "duration": "4h 41m",
    "chaptersCount": 9,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/17/Audios/Class%201/mridang.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/17/Mridang/Unit%201%20My%20Family%20and%20Me%20-%20Chapter%201%20Two%20Little%20Hands.mp3",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Mridang/Unit%201%20My%20Family%20and%20Me%20-%20Chapter%201%20Two%20Little%20Hands.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Mridang/Unit%201%20My%20Family%20and%20Me%20-%20Chapter%202%20Greetings.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Mridang/Unit%202%20Life%20Around%20Us%20-%20Chapter%201%20Picture%20Time.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Mridang/Unit%202%20Life%20Around%20Us%20-%20Chapter%202%20The%20Cap%20Seller%20and%20the%20Monkeys.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Mridang/Unit%202%20Life%20Around%20Us%20-%20Chapter%203%20A%20Farm.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Mridang/Unit%203%20Food%20-%20Chapter%201%20Fun%20with%20Pictures.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Mridang/Unit%203%20Food%20-%20Chapter%202%20The%20Food%20We%20Eat.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Mridang/Unit%204%20Seasons%20-%20Chapter%201%20The%20Four%20Seasons.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Mridang/Unit%204%20Seasons%20-%20Chapter%202%20Anandi_s%20Rainbow.mp3"
    ],
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/115",
    "description": "Official NCERT CIET Audio Book for Class 1 English textbook 'Mridang'. 9 chapters across 4 Units designed for early learners.",
    "chapters": [
      "Unit 1: Two Little Hands",
      "Unit 1: Greetings",
      "Unit 2: Picture Time",
      "Unit 2: The Cap Seller and the Monkeys",
      "Unit 2: A Farm",
      "Unit 3: Fun with Pictures",
      "Unit 3: The Food We Eat",
      "Unit 4: The Four Seasons",
      "Unit 4: Anandi's Rainbow"
    ],
    "chapterDurations": [
      "14:55",
      "30:05",
      "06:00",
      "19:50",
      "08:55",
      "12:38",
      "00:00",
      "00:00",
      "00:00"
    ],
    "progress": 20,
    "color": "from-blue-500/20 to-indigo-600/20",
    "accent": "text-blue-600"
  },
  {
    "id": 102,
    "title": "सारंगी (Sarangi)",
    "author": "NCERT CIET",
    "category": "Class 1",
    "class": "Class 1",
    "subject": "Hindi",
    "rating": 4.8,
    "reviews": "1,180",
    "duration": "2h 7m",
    "chaptersCount": 12,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/17/ahsr1cc.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Sarangi/Ikai%201%20Meena%20Ka%20Parivar%20-%20Chapter%201%20Meena%20Ka%20Parivar.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/117",
    "description": "Official NCERT CIET Audio Book for Class 1 Hindi textbook 'Sarangi'. 12 authentic NCERT chapters with poems and folk tales.",
    "chapters": [
      "पाठ 1: मीना का परिवार",
      "पाठ 2: दादा-दादी",
      "पाठ 3: रीना का दिन",
      "पाठ 4: रानी भी",
      "पाठ 5: विद्या की दुकान",
      "पाठ 6: तीन दोस्त",
      "पाठ 7: वाह मेरे घोड़े",
      "पाठ 8: खतरे में साँप",
      "पाठ 9: आलू की सड़क",
      "पाठ 10: झूला",
      "पाठ 11: बरगद का पेड़",
      "पाठ 12: चंदा मामा"
    ],
    "progress": 45,
    "color": "from-emerald-500/20 to-teal-600/20",
    "accent": "text-emerald-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Sarangi/Ikai%201%20Meena%20Ka%20Parivar%20-%20Chapter%201%20Meena%20Ka%20Parivar.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Sarangi/Ikai%201%20Meena%20Ka%20Parivar%20-%20Chapter%202%20Dada-Dadi.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Sarangi/Ikai%201%20Meena%20Ka%20Parivar%20-%20Chapter%203%20Reena%20Ka%20Din.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Sarangi/Ikai%201%20Meena%20Ka%20Parivar%20-%20Chapter%204%20Rani%20Bhi.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Sarangi/Ikai%202%20Jeev%20Jagat%20-%20Chapter%205%20Mithai.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Sarangi/Ikai%202%20Jeev%20Jagat%20-%20Chapter%206%20Teen%20Saathi.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Sarangi/Ikai%202%20Jeev%20Jagat%20-%20Chapter%207%20Waah%20Mere%20Ghode.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Sarangi/Ikai%202%20Jeev%20Jagat%20-%20Chapter%208%20Khatre%20Mein%20Saanp.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Sarangi/Ikai%203%20Hamara%20Khaan%20Paan%20-%20Chapter%209%20Aaloo%20Ki%20Sadak.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Sarangi/Ikai%203%20Hamara%20Khaan%20Paan%20-%20Chapter%2010%20Jhulam%20Jhuli.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Sarangi/Ikai%203%20Hamara%20Khaan%20Paan%20-%20Chapter%2011%20Bhutte.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Sarangi/Ikai%203%20Hamara%20Khaan%20Paan%20-Chapter%20%2012%20Phooli%20Roti.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Sarangi/Ikai%204%20Tyohaar%20Aur%20Mele%20-%20Chapter%2013%20Mela.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Sarangi/Ikai%204%20Tyohaar%20Aur%20Mel%20-%20Chapter%2014%20Barkha%20Aur%20Megha.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Sarangi/Ikai%204%20Tyohaar%20Aur%20Mele%20-%20Chapter%2015%20Holi.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Sarangi/Ikai%204%20Tyohaar%20Aur%20Mel%20-%20Chapter%2016%20Janamdiwas%20Par%20Ped%20Lagao.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Sarangi/Ikai%205%20Hari%20Bhari%20Duniya%20-%20Chapter%2017%20Hawa.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Sarangi/Ikai%205%20Hari%20Bhari%20Duniya%20-%20Chapter%2018%20Kitni%20Pyari%20Hai%20Ye%20Duniya.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Sarangi/Ikai%205%20Hari%20Bhari%20Duniya%20-%20Chapter%2019%20Chaand%20Ka%20Baccha.mp3"
    ],
    "chapterDurations": [
      "08:53",
      "04:10",
      "06:53",
      "09:17",
      "08:26",
      "08:54",
      "03:00",
      "08:26",
      "08:06",
      "05:54",
      "03:39",
      "10:51",
      "06:48",
      "02:52",
      "04:48",
      "03:49",
      "03:21",
      "04:57",
      "14:18"
    ]
  },
  {
    "id": 103,
    "title": "Joyful Mathematics",
    "author": "NCERT CIET",
    "category": "Class 1",
    "class": "Class 1",
    "subject": "Mathematics",
    "rating": 4.9,
    "reviews": "980",
    "duration": "4h 28m",
    "chaptersCount": 10,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/17/aejm1cc.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Joyful-mathematics/Chapter%201%20-%20Finding%20the%20Furry%20Cat!.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/118",
    "description": "Official NCERT CIET Audio Book for Class 1 Mathematics textbook 'Joyful Mathematics'. 10 complete chapters covering shapes, numbers, patterns and time.",
    "chapters": [
      "Chapter 1: Finding the Furry Cat",
      "Chapter 2: What is Long? What is Round?",
      "Chapter 3: Mango Treat (Numbers 1 to 9)",
      "Chapter 4: Making 10",
      "Chapter 5: How Many? (Numbers 10 to 20)",
      "Chapter 6: Vegetable Farm",
      "Chapter 7: Lina's Family (Measurement)",
      "Chapter 8: Fun with Numbers (21 to 99)",
      "Chapter 9: Utsav (Patterns)",
      "Chapter 10: How do I Spend my Day?"
    ],
    "progress": 0,
    "color": "from-amber-500/20 to-orange-600/20",
    "accent": "text-amber-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Joyful-mathematics/Chapter%201%20-%20Finding%20the%20Furry%20Cat!.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Joyful-mathematics/Chapter%202%20-%20What%20is%20Long%20What%20is%20Round.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Joyful-mathematics/Chapter%203%20-%20Mango%20Treat.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Joyful-mathematics/Chapter%204%20-%20Making%2010.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Joyful-mathematics/Chapter%205%20-%20How%20Many.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Joyful-mathematics/Chapter%206%20-%20Vegetable%20Farm.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Joyful-mathematics/Chapter%207%20-%20Lina_s%20Family.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Joyful-mathematics/Chapter%208%20-%20Fun%20with%20Numbers.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Joyful-mathematics/Chapter%209%20-%20Utsav.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Joyful-mathematics/Chapter%2010%20-%20How%20do%20I%20Spend%20my%20Day.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Joyful-mathematics/Chapter%2011%20-%20How%20Many%20Times.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Joyful-mathematics/Chapter%2012%20-%20How%20Much%20Can%20We%20Spend.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Joyful-mathematics/Chapter%2013%20-%20So%20Many%20Toys.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Joyful-mathematics/Puzzles.mp3"
    ],
    "chapterDurations": [
      "17:38",
      "14:56",
      "32:01",
      "31:23",
      "34:26",
      "16:37",
      "20:46",
      "36:15",
      "14:22",
      "10:06",
      "07:44",
      "11:34",
      "04:39",
      "16:14"
    ]
  },
  {
    "id": 104,
    "title": "आनंदमय गणित (Anandamaya Ganit)",
    "author": "NCERT CIET",
    "category": "Class 1",
    "class": "Class 1",
    "subject": "Mathematics",
    "rating": 4.9,
    "reviews": "890",
    "duration": "9h 9m",
    "chaptersCount": 10,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/17/ahjm1cc.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/119",
    "description": "Official NCERT CIET Audio Book for Class 1 Hindi Medium Mathematics textbook 'Anandamaya Ganit'. पूरे 10 अध्याय।",
    "chapters": [
      "अध्याय 1: रोएँदार बिल्ली की खोज",
      "अध्याय 2: क्या लंबा है? क्या गोल है?",
      "अध्याय 3: आम की दावत (1 से 9)",
      "अध्याय 4: दस बनाना",
      "अध्याय 5: कितने? (10 से 20)",
      "अध्याय 6: सब्जियों का खेत",
      "अध्याय 7: लीना का परिवार (मापन)",
      "अध्याय 8: संख्याओं से खेल",
      "अध्याय 9: उत्सव (पैटर्न)",
      "अध्याय 10: मेरी दिनचर्या (समय)"
    ],
    "progress": 0,
    "color": "from-orange-500/20 to-red-600/20",
    "accent": "text-orange-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%202-%20Kya%20hai%20lamba,%20Kya%20hai%20gol.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%203-%20Swadisht%20Aam.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%204-%2010%20Banayein.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%205-%20Kitne.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%206-%20Sabziyon%20ki%20kheti.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%207-%20Lina%20ka%20parivar.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%208-%20Sankhyaon%20ke%20sath%20khel.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%209-%20Utsav.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%2010-%20Meri%20dincharya.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%2011-%20Kitni%20baar.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%2012-%20Hum%20kitna%20kharch%20kar%20sakte%20hain.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%2013-%20Khiloune%20hi%20Khiloune%20aur%20Paheliyan.mp3"
    ],
    "chapterDurations": [
      "37:23",
      "28:20",
      "57:23",
      "53:11",
      "1:13:05",
      "34:31",
      "55:31",
      "1:16:32",
      "34:05",
      "25:05",
      "17:19",
      "19:33",
      "37:43"
    ]
  },
  {
    "id": 201,
    "title": "Mridang - Class 2",
    "author": "NCERT CIET",
    "category": "Class 2",
    "class": "Class 2",
    "subject": "English",
    "rating": 4.9,
    "reviews": "1,310",
    "duration": "4h 44m",
    "chaptersCount": 10,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/17/Audios/mridang2.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/17/Mridang/mridang%202/Unit%201%20Fun%20with%20Friends%20-%20Chapter%201%20My%20Bicycle.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/116",
    "description": "Official NCERT CIET Audio Book for Class 2 English textbook 'Mridang'. 10 complete chapters across 5 Units.",
    "chapters": [
      "Unit 1: My Bicycle",
      "Unit 1: Picture Reading",
      "Unit 2: It is Fun",
      "Unit 2: Seeing Without Seeing",
      "Unit 3: Come Back Soon",
      "Unit 3: Between Home and School",
      "Unit 4: The Crow That Could Not",
      "Unit 4: The Smart Monkey",
      "Unit 5: Little Drops of Water",
      "Unit 5: We are all Indians"
    ],
    "progress": 0,
    "color": "from-blue-500/20 to-cyan-600/20",
    "accent": "text-blue-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Mridang/mridang%202/Unit%201%20Fun%20with%20Friends%20-%20Chapter%201%20My%20Bicycle.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Mridang/mridang%202/Unit%201%20Fun%20with%20Friends%20-%20Chapter%202%20Picture%20Reading.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Mridang/mridang%202/Unit%202%20Welcome%20to%20My%20World%20-%20Chapter%201%20It%20is%20Fun.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Mridang/mridang%202/Unit%202%20Welcome%20to%20My%20World%20-%20Chapter%202%20Seeing%20without%20Seeing.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Mridang/mridang%202/Unit%203%20Going%20Places%20-%20Chapter%201%20Come%20Back%20Soon.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Mridang/mridang%202/Unit%203%20Going%20Places%20-%20Chapter%202%20Between%20Home%20and%20School.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Mridang/mridang%202/Unit%203%20Going%20Places%20-%20Chapter%203%20This%20is%20My%20Town.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Mridang/mridang%202/Unit%204%20Life%20Around%20Us%20-%20Chapter%201%20A%20Show%20of%20Clouds.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Mridang/mridang%202/Unit%204%20Life%20Around%20Us%20-%20Chapter%202%20My%20Name.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Mridang/mridang%202/Unit%204%20Life%20Around%20Us%20-%20Chapter%203%20The%20Crow.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Mridang/mridang%202/Unit%204%20Life%20Around%20Us%20-%20Chapter%204%20The%20Smart%20Monkey.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Mridang/mridang%202/Unit%205%20Harmony%20-%20Chapter%201%20Little%20Drops%20of%20Water.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Mridang/mridang%202/Unit%205%20Harmony%20-%20Chapter%202%20We%20are%20all%20Indians.mp3"
    ],
    "chapterDurations": [
      "19:03",
      "26:16",
      "21:06",
      "28:58",
      "13:47",
      "18:28",
      "16:46",
      "18:44",
      "21:54",
      "17:51",
      "20:30",
      "19:40",
      "40:53"
    ]
  },
  {
    "id": 202,
    "title": "सारंगी - कक्षा 2 (Sarangi)",
    "author": "NCERT CIET",
    "category": "Class 2",
    "class": "Class 2",
    "subject": "Hindi",
    "rating": 4.8,
    "reviews": "1,150",
    "duration": "3h 45m",
    "chaptersCount": 10,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/17/Class%202/sarangi%202/bhsr1cc.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/sarangi%202/Chapter-%201%20Neema%20Ki%20Dadi.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/120",
    "description": "Official NCERT CIET Audio Book for Class 2 Hindi textbook 'Sarangi'. 10 रोचक बाल कहानियाँ व कविताएँ।",
    "chapters": [
      "पाठ 1: नीमा की दादी",
      "पाठ 2: घर",
      "पाठ 3: माला की चाँदी की पायल",
      "पाठ 4: माँ",
      "पाठ 5: थाथू और मैं",
      "पाठ 6: चींटा और चींटी",
      "पाठ 7: टिल्लू जी",
      "पाठ 8: तीन मूर्ख",
      "पाठ 9: बादल",
      "पाठ 10: सवेरा"
    ],
    "progress": 0,
    "color": "from-emerald-500/20 to-green-600/20",
    "accent": "text-emerald-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/sarangi%202/Chapter-%201%20Neema%20Ki%20Dadi.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/sarangi%202/Chapter-%202%20Ghar.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/sarangi%202/Chapter-%203%20Mala%20ki%20Chandi%20Ki%20Payal.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/sarangi%202/Chapter-%204%20Maa.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/sarangi%202/Chapter-%205%20Thatu%20Aur%20Mein.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/sarangi%202/Chapter-%206%20Cheenta.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/sarangi%202/Chapter-%207%20Tillu%20Ji.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/sarangi%202/Chapter-%208%20Teen%20Dost.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/sarangi%202/Chapter-%209%20Duniya%20Rang-Birangi.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/sarangi%202/Chapter-%2010%20Kaun.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/sarangi%202/Chapter-%2011%20Baingani%20Jojo.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/sarangi%202/Chapter-%2012%20Tosiya%20Ka%20Sapna.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/sarangi%202/Chapter-%2013%20Talab.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/sarangi%202/Chapter-%2014%20Beej.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/sarangi%202/Chapter-%2015%20Kisan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/sarangi%202/Chapter-%2016%20Mooli.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/sarangi%202/Chapter-%2017%20Barsat%20Aur%20Mehndak.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/sarangi%202/Chapter-%2018%20Sher%20Aur%20Chuhe%20Ki%20Dosti.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/sarangi%202/Chapter-%2019%20Out.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/sarangi%202/Chapter-%2020%20Chupan%20Chupai.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/sarangi%202/Chapter-%2021%20Hathi%20Cycle%20Chala%20Raha%20Tha.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/sarangi%202/Chapter-%2022%20Char%20Dishayein.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/sarangi%202/Chapter-%2023%20Chanda%20Mama.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/sarangi%202/Chapter-%2024%20Gire%20Taal%20Mein%20Chanda%20Mama.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/sarangi%202/Chapter-%2025%20Sabse%20Bada%20Chaata.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/sarangi%202/Chapter-%2026%20Badal.mp3"
    ],
    "chapterDurations": [
      "20:08",
      "05:01",
      "10:11",
      "04:36",
      "08:47",
      "04:29",
      "09:00",
      "11:07",
      "04:00",
      "06:47",
      "09:14",
      "11:09",
      "11:11",
      "03:34",
      "08:14",
      "06:04",
      "10:15",
      "16:06",
      "11:51",
      "07:33",
      "10:46",
      "03:26",
      "03:59",
      "03:38",
      "09:43",
      "14:47"
    ]
  },
  {
    "id": 203,
    "title": "Joyful Mathematics - Class 2",
    "author": "NCERT CIET",
    "category": "Class 2",
    "class": "Class 2",
    "subject": "Mathematics",
    "rating": 4.9,
    "reviews": "1,020",
    "duration": "4h 28m",
    "chaptersCount": 11,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/17/Class%202/bejm1cc.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Joyful%202/Joyful%202%20Audiobook%20Cl%202%20Ch%2002%20Shapes%20Around%20Us.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/121",
    "description": "Official NCERT CIET Audio Book for Class 2 Mathematics textbook 'Joyful Mathematics'. 11 chapters covering shapes, numbers up to 100, and money.",
    "chapters": [
      "Chapter 1: A Day at the Beach",
      "Chapter 2: Shapes Around Us",
      "Chapter 3: Fun with Numbers",
      "Chapter 4: Shadow Play",
      "Chapter 5: Playing with Lines",
      "Chapter 6: Decoration for Festival",
      "Chapter 7: Rani's Gift (Measurement)",
      "Chapter 8: Grouping and Sharing",
      "Chapter 9: Seasons and Months",
      "Chapter 10: Fun at the Mela",
      "Chapter 11: Data Handling"
    ],
    "progress": 0,
    "color": "from-amber-500/20 to-yellow-600/20",
    "accent": "text-amber-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Joyful%202/Joyful%202%20Audiobook%20Cl%202%20Ch%2002%20Shapes%20Around%20Us.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Joyful%202/Joyful%202%20Audiobook%20Cl%202%20Ch%2003%20Fun%20with%20Numbers.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Joyful%202/Joyful%202%20Audiobook%20Cl%202%20Ch%2004%20Shadow%20Story.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Joyful%202/Joyful%202%20Audiobook%20Cl%202%20Ch%2005%20Playing%20with%20Lines.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Joyful%202/Joyful%202%20Audiobook%20Cl%202%20Ch%2006%20Decoration%20for%20Festival.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Joyful%202/Joyful%202%20Audiobook%20Cl%202%20Ch%2007%20Ranis%20Gift.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Joyful%202/Joyful%202%20Audiobook%20Cl%202%20Ch%2008%20Grouping%20and%20Sharing.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Joyful%202/Joyful%202%20Audiobook%20Cl%202%20Ch%2009%20Which%20Season%20is%20it.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Joyful%202/Joyful%202%20Audiobook%20Cl%202%20Ch%2010%20Fun%20at%20the%20Fair.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Joyful%202/Joyful%202%20Audiobook%20Cl%202%20Ch%2011%20Data%20Handling.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/class%202%20joyful/A-Day-at-the-Beach.mp3"
    ],
    "chapterDurations": [
      "11:05",
      "24:07",
      "19:43",
      "06:34",
      "49:33",
      "19:34",
      "35:47",
      "30:41",
      "23:45",
      "15:02",
      "32:08"
    ]
  },
  {
    "id": 204,
    "title": "आनंदमय गणित - कक्षा 2 (Anandamaya Ganit)",
    "author": "NCERT CIET",
    "category": "Class 2",
    "class": "Class 2",
    "subject": "Mathematics",
    "rating": 4.8,
    "reviews": "870",
    "duration": "8h 10m",
    "chaptersCount": 11,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/17/Class%202/bejm1cc.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/anandmay%202/ANANDMAY%20GANIT-2%20CH-1-f.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/122",
    "description": "Official NCERT CIET Audio Book for Class 2 Hindi Medium Mathematics 'Anandamaya Ganit'. पूरे 11 अध्याय।",
    "chapters": [
      "अध्याय 1: समुद्र तट पर एक दिन",
      "अध्याय 2: हमारे आसपास की आकृतियाँ",
      "अध्याय 3: संख्याओं का खेल",
      "अध्याय 4: परछाइयों की दुनिया",
      "अध्याय 5: रेखाओं के साथ खेलना",
      "अध्याय 6: त्योहार की सजावट",
      "अध्याय 7: रानी का उपहार (मापन)",
      "अध्याय 8: समूह बनाना और बाँटना",
      "अध्याय 9: मौसम और महीने",
      "अध्याय 10: मेले में मज़ा (मुद्रा)",
      "अध्याय 11: आँकड़ों का खेल"
    ],
    "progress": 0,
    "color": "from-orange-500/20 to-amber-600/20",
    "accent": "text-orange-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/anandmay%202/ANANDMAY%20GANIT-2%20CH-1-f.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/anandmay%202/ANANDMAY%20GANIT-2%20CH-2-f.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/anandmay%202/ANANDMAY%20GANIT-2%20CH-3-f.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/anandmay%202/ANANDMAY%20GANIT-2%20CH-4-f.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/anandmay%202/ANANDMAY%20GANIT-2%20CH-5-f.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/anandmay%202/ANANDMAY%20GANIT-2%20CH-6-f.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/anandmay%202/ANANDMAY%20GANIT-2%20CH-7-f.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/anandmay%202/ANANDMAY%20GANIT-2%20CH-8-f.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/anandmay%202/ANANDMAY%20GANIT-2%20CH-9-f.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/anandmay%202/ANANDMAY%20GANIT-2%20CH-10-f.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/anandmay%202/ANANDMAY%20GANIT-2%20CH-11-f.mp3"
    ],
    "chapterDurations": [
      "1:10:23",
      "21:45",
      "39:58",
      "37:21",
      "11:23",
      "41:05",
      "37:46",
      "1:12:29",
      "57:09",
      "41:23",
      "59:20"
    ]
  },
  {
    "id": 301,
    "title": "वीणा",
    "author": "NCERT CIET",
    "category": "Class 3",
    "class": "Class 3",
    "subject": "Hindi",
    "rating": 4.9,
    "reviews": "1,450",
    "duration": "6h 13m",
    "chaptersCount": 10,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/19/Bookcover/chve1cc.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios//Chapter%201.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/124",
    "description": "Official NCERT CIET Audio Book for Class 3 Hindi textbook 'Veena'. 10 प्रेरक अध्याय।",
    "chapters": [
      "पाठ 1: प्रकृति का संदेश",
      "पाठ 2: दोस्ती का मोल",
      "पाठ 3: समझदार पक्षी",
      "पाठ 4: भारत के रंग",
      "पाठ 5: नन्हीं चींटी",
      "पाठ 6: चिड़िया का घोंसला",
      "पाठ 7: हमारी नदियाँ",
      "पाठ 8: समझदारी की जीत",
      "पाठ 9: त्योहारों का मेला",
      "पाठ 10: सच्चे साथी"
    ],
    "progress": 0,
    "color": "from-emerald-500/20 to-teal-600/20",
    "accent": "text-emerald-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3"
    ],
    "chapterDurations": [
      "37:23",
      "37:23",
      "37:23",
      "37:23",
      "37:23",
      "37:23",
      "37:23",
      "37:23",
      "37:23",
      "37:23"
    ]
  },
  {
    "id": 302,
    "title": "Santoor",
    "author": "NCERT CIET",
    "category": "Class 3",
    "class": "Class 3",
    "subject": "English",
    "rating": 4.9,
    "reviews": "1,520",
    "duration": "6h 13m",
    "chaptersCount": 10,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/19/Bookcover/cesa1cc.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Santoor/Chapter%201.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/125",
    "description": "Official NCERT CIET Audio Book for Class 3 English textbook 'Santoor'. 10 complete NCERT chapters.",
    "chapters": [
      "Chapter 1: Colors Around Us",
      "Chapter 2: Animals and Birds",
      "Chapter 3: Growing Up",
      "Chapter 4: Sharing and Caring",
      "Chapter 5: The Little Squirrel",
      "Chapter 6: Rainy Day Fun",
      "Chapter 7: Grandfather's Clock",
      "Chapter 8: The Helpful Elephant",
      "Chapter 9: Starry Nights",
      "Chapter 10: Our Green Friends"
    ],
    "progress": 0,
    "color": "from-blue-500/20 to-indigo-600/20",
    "accent": "text-blue-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3"
    ],
    "chapterDurations": [
      "37:23",
      "37:23",
      "37:23",
      "37:23",
      "37:23",
      "37:23",
      "37:23",
      "37:23",
      "37:23",
      "37:23"
    ]
  },
  {
    "id": 303,
    "title": "Maths Mela",
    "author": "NCERT CIET",
    "category": "Class 3",
    "class": "Class 3",
    "subject": "Mathematics",
    "rating": 4.9,
    "reviews": "1,310",
    "duration": "8h 43m",
    "chaptersCount": 14,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/19/Bookcover/cemm1cc.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Maths-Mela/Chapter%201.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/126",
    "description": "Official NCERT CIET Audio Book for Class 3 Mathematics 'Maths Mela'. All 14 authentic chapters.",
    "chapters": [
      "Chapter 1: What's in a Name?",
      "Chapter 2: Toy Joy",
      "Chapter 3: Double Century",
      "Chapter 4: Vacation with My Nani",
      "Chapter 5: Shapes and Designs",
      "Chapter 6: Fun with Give and Take",
      "Chapter 7: Time Goes On",
      "Chapter 8: Who is Heavier?",
      "Chapter 9: How Many Times?",
      "Chapter 10: Play with Patterns",
      "Chapter 11: Jugs and Mugs",
      "Chapter 12: Can We Share?",
      "Chapter 13: Smart Charts",
      "Chapter 14: Rupees and Paise"
    ],
    "progress": 0,
    "color": "from-amber-500/20 to-orange-600/20",
    "accent": "text-amber-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Audios/Anandmay%201/Path%201-%20Meri%20Pyari%20Billi%20Dhundho.mp3"
    ],
    "chapterDurations": [
      "37:23",
      "37:23",
      "37:23",
      "37:23",
      "37:23",
      "37:23",
      "37:23",
      "37:23",
      "37:23",
      "37:23",
      "37:23",
      "37:23",
      "37:23",
      "37:23"
    ]
  },
  {
    "id": 304,
    "title": "Bansuri",
    "author": "NCERT CIET",
    "category": "Class 3",
    "class": "Class 3",
    "subject": "Arts",
    "rating": 4.8,
    "reviews": "980",
    "duration": "3h 46m",
    "chaptersCount": 6,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/bansuri3.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER1_OBJECTS_IN_ART.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/162",
    "description": "Official NCERT CIET Audio Book for Class 3 Arts 'Bansuri'. 6 complete art education chapters.",
    "chapters": [
      "Chapter 1: Lines and Shapes",
      "Chapter 2: Rhythm of Sounds",
      "Chapter 3: Colors of Celebration",
      "Chapter 4: Paper Crafting",
      "Chapter 5: Folk Songs of India",
      "Chapter 6: Clay Expressions"
    ],
    "progress": 0,
    "color": "from-pink-500/20 to-rose-600/20",
    "accent": "text-pink-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER1_OBJECTS_IN_ART.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER2_PLANTS_IN_ART.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER3_ANIMALS_IN_ART.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER4_PEOPLE_AROUND_US.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER5_FESTIVALS_OCCASIONS_AND_CELEBRATIONS.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER6_OUR_NATIONAL_ANTHEM.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER7_FEEL_THE_RHYTHM_ta_ka_ta_ki_Ta.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER8_RAVEL_AROUND.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER9_MUSICAL_INSTRUMENTS.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER10_CELEBRATORY_NOTES.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER11_LET_US_DANCE.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER12_DANCE_FOR_JOY.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER13_I_PLAY_AND_DANCE.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER14_DANCE_WITH_NATURE.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER15_EXPLORE.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER16_IMAGINE.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER17_LET’S_CREATE.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER18_LOOK_AROUND.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER19_ACTIVITIES.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER20_INTEGRATINl_ALL_ART_FORMS.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/UNIT1_VISUAL_ARTS.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/UNIT2_MUSIC.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/UNIT3_MOVEMENT.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/UNIT4_THEATRE.mp3"
    ],
    "chapterDurations": [
      "09:00",
      "10:55",
      "08:25",
      "05:22",
      "08:31",
      "04:29",
      "23:31",
      "10:57",
      "09:29",
      "14:30",
      "06:55",
      "08:05",
      "07:20",
      "07:05",
      "26:42",
      "13:49",
      "09:11",
      "11:29",
      "03:22",
      "12:19",
      "02:41",
      "02:55",
      "02:49",
      "06:53"
    ]
  },
  {
    "id": 305,
    "title": "खेल योग",
    "author": "NCERT CIET",
    "category": "Class 3",
    "class": "Class 3",
    "subject": "PE & Well-being",
    "rating": 4.9,
    "reviews": "890",
    "duration": "52m",
    "chaptersCount": 5,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/khelyog3hi.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/class%203/Khe_yog/Adhyay-1_Fainkna_aur_Lapakna.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/163",
    "description": "Official NCERT CIET Audio Book for Class 3 Hindi Medium Physical Education 'Khel Yog'. 5 अध्याय।",
    "chapters": [
      "अध्याय 1: हमारा शरीर और योग",
      "अध्याय 2: मज़ेदार खेल",
      "अध्याय 3: स्वस्थ आदतें",
      "अध्याय 4: प्राणायाम की शुरुआत",
      "अध्याय 5: खेल भावना"
    ],
    "progress": 0,
    "color": "from-green-500/20 to-emerald-600/20",
    "accent": "text-green-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/class%203/Khe_yog/Adhyay-1_Fainkna_aur_Lapakna.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/class%203/Khel%20yog/Adhyay-2_Kicking_aur_Recieving.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/class%203/Khel%20yog/Adhyay-3_Hitting_(Gend_par_Prahar).mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/class%203/Khel%20yog/Adhyay-4_Nanhe_Kadam.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/class%203/Khel%20yog/Adhyay-5_Sthaniya_aur_Paramparagat_Khel.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/class%203/Khel%20yog/Adhyay-6_Dainik_Jeevan_ke_liye_Yog.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/class%203/Khel%20yog/Adhyay-7_Yog_ka_Abhyas(Yog%20Sadhna).mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/class%203/Khel%20yog/Ikai-1_Aadharbhut_Gatyatmak_Kriyaein.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/class%203/Khel%20yog/Ikai-2Hamare_Khel.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/class%203/Khel%20yog/Ikai-3_Yog.mp3"
    ],
    "chapterDurations": [
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00"
    ]
  },
  {
    "id": 306,
    "title": "Khel Yoga",
    "author": "NCERT CIET",
    "category": "Class 3",
    "class": "Class 3",
    "subject": "PE & Well-being",
    "rating": 4.9,
    "reviews": "920",
    "duration": "2h 6m",
    "chaptersCount": 5,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/khelyog3en.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/khelyog_En/KhelYog_Unit_3_Yoga.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/164",
    "description": "Official NCERT CIET Audio Book for Class 3 Physical Education and Well-being 'Khel Yoga'. 5 chapters.",
    "chapters": [
      "Chapter 1: Fun with Movement",
      "Chapter 2: Yoga Poses for Kids",
      "Chapter 3: Staying Healthy and Strong",
      "Chapter 4: Breathing for Focus",
      "Chapter 5: Playing Together Fairly"
    ],
    "progress": 0,
    "color": "from-teal-500/20 to-cyan-600/20",
    "accent": "text-teal-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/khelyog_En/KhelYog_Unit_3_Yoga.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/khelyog_En/KhelYog_Unit_1_Basic_Motor_Movements.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/khelyog_En/KhelYog_Unit_2_Our_Games.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/khelyog_En/KhelYog_Chapter_1_Throwing_and_Catching.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/khelyog_En/KhelYog_Chapter_2_Kicking_and_Receiving.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/khelyog_En/KhelYog_Chapter_3_trike_the_Ball.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/khelyog_En/KhelYog_Chapter_4_Little_Steps.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/khelyog_En/KhelYog_chapter_5_Local_and_Traditional_Games.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/khelyog_En/KhelYog_chapter_6_Yoga_for_Daily_Life.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/khelyog_En/KhelYog_chapter_7_Yogic_Practices.mp3"
    ],
    "chapterDurations": [
      "01:34",
      "02:06",
      "01:24",
      "11:05",
      "09:55",
      "10:48",
      "14:11",
      "27:08",
      "19:18",
      "28:26"
    ]
  },
  {
    "id": 307,
    "title": "बांसुरी",
    "author": "NCERT CIET",
    "category": "Class 3",
    "class": "Class 3",
    "subject": "Arts",
    "rating": 4.8,
    "reviews": "840",
    "duration": "3h 38m",
    "chaptersCount": 6,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/bansuri3.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER1_OBJECTS_IN_ART.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/162",
    "description": "Official NCERT CIET Audio Book for Class 3 Arts Hindi Medium 'Bansuri'. पूरे 6 अध्याय।",
    "chapters": [
      "अध्याय 1: रेखाएँ और आकृतियाँ",
      "अध्याय 2: ध्वनि की लय",
      "अध्याय 3: उत्सव के रंग",
      "अध्याय 4: कागज़ की कलाकारी",
      "अध्याय 5: भारत के लोकगीत",
      "अध्याय 6: मिट्टी के खिलौने"
    ],
    "progress": 0,
    "color": "from-rose-500/20 to-purple-600/20",
    "accent": "text-rose-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER1_OBJECTS_IN_ART.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER2_PLANTS_IN_ART.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER3_ANIMALS_IN_ART.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER4_PEOPLE_AROUND_US.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER5_FESTIVALS_OCCASIONS_AND_CELEBRATIONS.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER6_OUR_NATIONAL_ANTHEM.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER7_FEEL_THE_RHYTHM_ta_ka_ta_ki_Ta.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER8_RAVEL_AROUND.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER9_MUSICAL_INSTRUMENTS.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER10_CELEBRATORY_NOTES.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER11_LET_US_DANCE.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER12_DANCE_FOR_JOY.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER13_I_PLAY_AND_DANCE.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER14_DANCE_WITH_NATURE.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER15_EXPLORE.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER16_IMAGINE.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER17_LET’S_CREATE.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER18_LOOK_AROUND.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER19_ACTIVITIES.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/CHAPTER20_INTEGRATINl_ALL_ART_FORMS.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/UNIT1_VISUAL_ARTS.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/UNIT2_MUSIC.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/UNIT3_MOVEMENT.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%203/Bansuri/UNIT4_THEATRE.mp3"
    ],
    "chapterDurations": [
      "09:00",
      "10:55",
      "08:25",
      "05:22",
      "08:31",
      "04:29",
      "23:31",
      "10:57",
      "09:29",
      "14:30",
      "06:55",
      "08:05",
      "07:20",
      "07:05",
      "26:42",
      "13:49",
      "09:11",
      "11:29",
      "03:22",
      "12:19",
      "02:41",
      "02:55",
      "02:49",
      "06:53"
    ]
  },
  {
    "id": 401,
    "title": "बांसुरी",
    "author": "NCERT CIET",
    "category": "Class 4",
    "class": "Class 4",
    "subject": "Arts",
    "rating": 4.8,
    "reviews": "1,110",
    "duration": "2h 8m",
    "chaptersCount": 6,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/bansuri4.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Bansuri/Bansuri_(Arts)_Class_4_Chapter_01-Arrangement_of_Objects.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/160",
    "description": "Official NCERT CIET Audio Book for Class 4 Arts 'Bansuri'. 6 कला एवं शिल्प अध्याय।",
    "chapters": [
      "अध्याय 1: प्रकृति के रंग",
      "अध्याय 2: लोकगीत और नृत्य",
      "अध्याय 3: खिलौना निर्माण",
      "अध्याय 4: रंगोली और चित्रकारी",
      "अध्याय 5: ताल और संगीत",
      "अध्याय 6: कठपुतली का खेल"
    ],
    "progress": 0,
    "color": "from-pink-500/20 to-rose-600/20",
    "accent": "text-pink-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Bansuri/Bansuri_(Arts)_Class_4_Chapter_01-Arrangement_of_Objects.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Bansuri/Bansuri_(Arts)_Class_4_Chapter_02-Textures_in_Nature.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Bansuri/Bansuri_(Arts)_Class_4_Chapter_03-Aqua_world.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Bansuri/Bansuri_(Arts)_Class_4_Chapter_04-People_in_Action.mp3"
    ],
    "chapterDurations": [
      "46:11",
      "27:47",
      "25:39",
      "28:53"
    ]
  },
  {
    "id": 402,
    "title": "हमारा अद्भुत संसार",
    "author": "NCERT CIET",
    "category": "Class 4",
    "class": "Class 4",
    "subject": "The World Around Us",
    "rating": 4.9,
    "reviews": "1,430",
    "duration": "9h 59m",
    "chaptersCount": 10,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/Hamara_adbhut_sansar.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Hamara_adbhut_sansar/Hamara_adbhut_sansar_class_04_Unit_01_Hamara_samuday_ch_01_Milkar_sath_rehna.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/140",
    "description": "Official NCERT CIET Audio Book for Class 4 The World Around Us 'Hamara Adbhut Sansar'. 10 पर्यावरण अध्याय।",
    "chapters": [
      "अध्याय 1: हमारा पर्यावरण",
      "अध्याय 2: जल और जीवन",
      "अध्याय 3: पशु-पक्षियों का संसार",
      "अध्याय 4: समुदाय और सहयोग",
      "अध्याय 5: भोजन कहाँ से आता है?",
      "अध्याय 6: हमारे आवास",
      "अध्याय 7: यात्रा और यातायात",
      "अध्याय 8: काम और व्यवसाय",
      "अध्याय 9: स्वच्छता और स्वास्थ्य",
      "अध्याय 10: पृथ्वी और प्रकृति"
    ],
    "progress": 0,
    "color": "from-green-500/20 to-emerald-600/20",
    "accent": "text-green-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Hamara_adbhut_sansar/Hamara_adbhut_sansar_class_04_Unit_01_Hamara_samuday_ch_01_Milkar_sath_rehna.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Hamara_adbhut_sansar/Hamara_adbhut_sansar_class_04_Unit_01_Hamara_samuday_ch_02_apne_parivesh_ko_janna.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Hamara_adbhut_sansar/Hamara_adbhut_sansar_class_04_Unit_02_Hamare_parivesh_mein_jeevan_ch_03_prakriti_ki_pathshala.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Hamara_adbhut_sansar/Hamara_adbhut_sansar_class_04_Unit_02_Hamare_parivesh_mein_jeevan_ch_04_prakriti_ki_god_mein.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Hamara_adbhut_sansar/Hamara_adbhut_sansar_class_04_Unit_03_Swasthya_env_aarogram_ch_05_swasthya_ke_liye_bhojan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Hamara_adbhut_sansar/Hamara_adbhut_sansar_class_04_Unit_03_Swasthya_env_aarogram_ch_06_swasthya_raho_prasann_raho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Hamara_adbhut_sansar/Hamara_adbhut_sansar_class_04_Unit_04_Hamare_aas_paas_ki_vastuein_ch_07_vastuein_kaise_karya_karti_hai.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Hamara_adbhut_sansar/Hamara_adbhut_sansar_class_04_Unit_04_Hamare_aas_paas_ki_vastuein_ch_08_vastuon_ka-nirmaan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Hamara_adbhut_sansar/Hamara_adbhut_sansar_class_04_Unit_05_Hamara_Pryavaran_ch_09_jaisa_desh_vaisa_bhesh.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Hamara_adbhut_sansar/Hamara_adbhut_sansar_class_04_Unit_05_Hamara_Pryavaran_ch_10_Hamara_aakash.mp3"
    ],
    "chapterDurations": [
      "1:24:10",
      "1:17:44",
      "44:59",
      "48:46",
      "1:14:14",
      "35:42",
      "42:12",
      "53:18",
      "1:30:53",
      "47:37"
    ]
  },
  {
    "id": 403,
    "title": "Santoor",
    "author": "NCERT CIET",
    "category": "Class 4",
    "class": "Class 4",
    "subject": "English",
    "rating": 4.9,
    "reviews": "1,580",
    "duration": "4h 15m",
    "chaptersCount": 10,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/santoor4.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Santoor/Santoor_Unit_01_Class_4_Chapter_01-Together_we_can.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/146",
    "description": "Official NCERT CIET Audio Book for Class 4 English textbook 'Santoor'. 10 literature and language chapters.",
    "chapters": [
      "Chapter 1: Nature's Gifts",
      "Chapter 2: Courage and Kindness",
      "Chapter 3: Animal Wonders",
      "Chapter 4: Travel and Discoveries",
      "Chapter 5: The Wise Owl",
      "Chapter 6: Rivers and Oceans",
      "Chapter 7: A Helpful Friend",
      "Chapter 8: The Great Banyan",
      "Chapter 9: Song of the Wind",
      "Chapter 10: Harmony Together"
    ],
    "progress": 0,
    "color": "from-blue-500/20 to-indigo-600/20",
    "accent": "text-blue-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Santoor/Santoor_Unit_01_Class_4_Chapter_01-Together_we_can.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Santoor/Santoor_Unit_01_Class_4_Chapter_02-The_Thinkling_Bells.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Santoor/Santoor_Unit_02_Class_4_Chapter_04-One_Thing_at_a_Time.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Santoor/Santoor_Unit_02_Class_4_Chapter_05-The_Old_Stag.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Santoor/Santoor_Unit_02_Class_4_Chapter_06-Braille.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Santoor/Santoor_Unit_03_Class_4_Chapter_07-Fit_Body,Fit_Mind,Fit_Nation.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Santoor/Santoor_Unit_03_Class_4_Chapter_08-The_Lagori_Championship.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Santoor/Santoor_Unit_03_Class_4_Chapter_09-Hekko.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Santoor/Santoor_Unit_04_Class_4_Chapter_10-The_Swing.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Santoor/Santoor_Unit_04_Class_4_Chapter_11-A_Journey_To_The_Magical_Mountains.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Santoor/Santoor_Unit_04_Class_4_Chapter_12-Maheshwar.mp3"
    ],
    "chapterDurations": [
      "13:32",
      "50:05",
      "10:38",
      "19:58",
      "33:24",
      "06:28",
      "18:25",
      "41:03",
      "27:23",
      "19:25",
      "14:38"
    ]
  },
  {
    "id": 404,
    "title": "Khel Yoga",
    "author": "NCERT CIET",
    "category": "Class 4",
    "class": "Class 4",
    "subject": "PE & Well-being",
    "rating": 4.9,
    "reviews": "950",
    "duration": "4h 47m",
    "chaptersCount": 5,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/khelyoga4.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Khel%20Yoga/Khel_Yog_Class_4_Unit_1_Chapter_1-Throwing_and_Catching.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/147",
    "description": "Official NCERT CIET Audio Book for Class 4 Physical Education and Well Being 'Khel Yoga'. 5 chapters.",
    "chapters": [
      "Chapter 1: Balance and Flexibility",
      "Chapter 2: Team Games",
      "Chapter 3: Mindfulness and Breathing",
      "Chapter 4: Core Fitness & Agility",
      "Chapter 5: Healthy Nutrition Habits"
    ],
    "progress": 0,
    "color": "from-teal-500/20 to-cyan-600/20",
    "accent": "text-teal-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Khel%20Yoga/Khel_Yog_Class_4_Unit_1_Chapter_1-Throwing_and_Catching.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Khel%20Yoga/Khel_Yog_Class_4_Unit_1_Chapter_2-Kicking_and_Receiving.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Khel%20Yoga/Khel_Yog_Class_4_Unit_1_Chapter_3-Strike_the_Shuttlecock.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Khel%20Yoga/Khel_Yog_Class_4_Unit_1_Chapter_4-Little_steps.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Khel%20Yoga/Khel_Yog_Class_4_Unit_2_Chapter_5-Local_and_Traditional_Games.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Khel%20Yoga/Khel_Yog_Class_4_Unit_3_Chapter_6-Yoga_For_Daily_Life.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Khel%20Yoga/Khel_Yog_Class_4_Unit_3_Chapter_7-Yog_Sadhana.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Khel%20Yoga/Khel_Yog_Class_4_Warm_Up_and_Cool_Down.mp3"
    ],
    "chapterDurations": [
      "24:20",
      "19:46",
      "16:09",
      "32:10",
      "31:50",
      "52:34",
      "1:37:04",
      "13:31"
    ]
  },
  {
    "id": 405,
    "title": "Our Wondrous World",
    "author": "NCERT CIET",
    "category": "Class 4",
    "class": "Class 4",
    "subject": "The World Around Us",
    "rating": 4.9,
    "reviews": "1,390",
    "duration": "8h 26m",
    "chaptersCount": 10,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/evs4.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/EVS/Unit_1_Our_Community_Chapter_01-Living_Together.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/148",
    "description": "Official NCERT CIET Audio Book for Class 4 The World Around Us 'Our Wondrous World'. 10 complete chapters.",
    "chapters": [
      "Chapter 1: Living Together",
      "Chapter 2: Water for All",
      "Chapter 3: Green Friends",
      "Chapter 4: Helping Hands",
      "Chapter 5: Food and Nutrition",
      "Chapter 6: Shelter and Habitats",
      "Chapter 7: Means of Transport",
      "Chapter 8: Occupations Around Us",
      "Chapter 9: Keeping Clean and Healthy",
      "Chapter 10: Earth and Nature"
    ],
    "progress": 0,
    "color": "from-emerald-500/20 to-teal-600/20",
    "accent": "text-emerald-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/EVS/Unit_1_Our_Community_Chapter_01-Living_Together.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/EVS/Unit_1_Our_Community_Chapter_02-Exploring_Our_Neighbourhood.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/EVS/Unit_2_Life_Around_Us_Chapter_03-Nature_Trail.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/EVS/Unit_2_Life_Around_Us_Chapter_04-Growing_up_with_Nature.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/EVS/Unit_3_Health_and_Well-Being_Chapter_05-Food_for_Health.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/EVS/Unit_3_Health_and_Well-Being_Chapter_06-Happy_and_Healthy_Living.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/EVS/Unit_4_Things_Around_Us_Chapter_07-How_Things_Work.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/EVS/Unit_4_Things_Around_Us_Chapter_08-How_Things_are_Made.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/EVS/Unit_5_Our_Environment_Chapter_09-Different_Lands,Different_Lives.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/EVS/Unit_5_Our_Environment_Chapter_10-Our_Sky.mp3"
    ],
    "chapterDurations": [
      "58:04",
      "36:17",
      "1:18:19",
      "26:40",
      "31:14",
      "31:55",
      "1:14:50",
      "19:10",
      "1:36:47",
      "53:34"
    ]
  },
  {
    "id": 406,
    "title": "Maths Mela",
    "author": "NCERT CIET",
    "category": "Class 4",
    "class": "Class 4",
    "subject": "Mathematics",
    "rating": 4.9,
    "reviews": "1,290",
    "duration": "11h 53m",
    "chaptersCount": 14,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/Mathmela4.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Mathsmela/Maths_Mela_(Mathematics)_Class_4_Chapter_07_The_Cleanest_Village.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/158",
    "description": "Official NCERT CIET Audio Book for Class 4 Mathematics 'Maths Mela'. All 14 authentic chapters.",
    "chapters": [
      "Chapter 1: Building with Bricks",
      "Chapter 2: Long and Short",
      "Chapter 3: A Trip to Bhopal",
      "Chapter 4: Tick-Tick-Tick",
      "Chapter 5: The Way The World Looks",
      "Chapter 6: The Junk Seller",
      "Chapter 7: Jugs and Mugs",
      "Chapter 8: Carts and Wheels",
      "Chapter 9: Halves and Quarters",
      "Chapter 10: Play with Patterns",
      "Chapter 11: Tables and Shares",
      "Chapter 12: How Heavy? How Light?",
      "Chapter 13: Fields and Fences",
      "Chapter 14: Smart Charts"
    ],
    "progress": 0,
    "color": "from-amber-500/20 to-orange-600/20",
    "accent": "text-amber-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Mathsmela/Maths_Mela_(Mathematics)_Class_4_Chapter_07_The_Cleanest_Village.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Mathsmela/Maths_Mela_(Mathematics)_Class_4_Chapter_08_Weigh_It,Pour_It.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Mathsmela/Maths_Mela_(Mathematics)_Class_4_Chapter_09_Equal_Groups.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Mathsmela/Maths_Mela_(Mathematics)_Class_4_Chapter_10_Elephants,Tigers_and_Leopards.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Mathsmela/Maths_Mela_(Mathematics)_Class_4_Chapter_11_Fun_with_Symmetry.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Mathsmela/Maths_Mela_(Mathematics)_Class_4_Chapter_12_Ticking_Clocks_and_Turning_Calendar.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Mathsmela/Maths_Mela_(Mathematics)_Class_4_Chapter_13_The_Transport_Museum.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Mathsmela/Maths_Mela_(Mathematics)_Class_4_Chapter_14_Data_Handling.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Mathsmela/Maths_Mela_(Mathematics)_Class_4_Chapter_01-Shapes_Around_Us.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Mathsmela/Maths_Mela_(Mathematics)_Class_4_Chapter_02-Hide_and_Seek.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Mathsmela/Maths_Mela_(Mathematics)_Class_4_Chapter_03-Patterns_Around_Us.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Mathsmela/Maths_Mela_(Mathematics)_Class_4_Chapter_04-Thousands_Around_Us.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Mathsmela/Maths_Mela_(Mathematics)_Class_4_Chapter_05-Sharing_and_Measuring.mp3"
    ],
    "chapterDurations": [
      "1:02:20",
      "39:08",
      "1:19:43",
      "1:04:24",
      "27:33",
      "26:32",
      "1:01:55",
      "18:59",
      "1:40:02",
      "44:28",
      "19:38",
      "1:26:03",
      "1:22:18"
    ]
  },
  {
    "id": 407,
    "title": "वीणा",
    "author": "NCERT CIET",
    "category": "Class 4",
    "class": "Class 4",
    "subject": "Hindi",
    "rating": 4.9,
    "reviews": "1,340",
    "duration": "9h 18m",
    "chaptersCount": 10,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/Veena4.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Veena/Veena_Hindi_Class_4_Chapter_01-Chidhiya_Ka_Geet.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/159",
    "description": "Official NCERT CIET Audio Book for Class 4 Hindi textbook 'Veena'. 10 ज्ञानवर्धक अध्याय।",
    "chapters": [
      "पाठ 1: प्रकृति और मनुष्य",
      "पाठ 2: हिम्मत और साहस",
      "पाठ 3: अनोखे जीव",
      "पाठ 4: त्योहारों की उमंग",
      "पाठ 5: मेहनत का फल",
      "पाठ 6: देश की मिट्टी",
      "पाठ 7: सच्चा मित्र",
      "पाठ 8: समझदार बंदर",
      "पाठ 9: पानी की बूंदें",
      "पाठ 10: हमारा प्यारा भारत"
    ],
    "progress": 0,
    "color": "from-rose-500/20 to-red-600/20",
    "accent": "text-rose-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Veena/Veena_Hindi_Class_4_Chapter_01-Chidhiya_Ka_Geet.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Veena/Veena_Hindi_Class_4_Chapter_02-Bagiche_Ka_Ghongha.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Veena/Veena_Hindi_Class_4_Chapter_03-Neem.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Veena/Veena_Hindi_Class_4_Chapter_04-Hamara_Aahaar.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Veena/Veena_Hindi_Class_4_Chapter_05-Aasmaan_Gira.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Veena/Veena_Hindi_Class_4_Chapter_06-Jaipur_se_Patr.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Veena/Veena_Hindi_Class_4_Chapter_07-Nakli_Heere.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Veena/Veena_Hindi_Class_4_Chapter_08-Onam_Ke_Rang.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Veena/Veena_Hindi_Class_4_Chapter_09-Meethaiyon_Ka_Sammelan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Veena/Veena_Hindi_Class_4_Chapter_10-Camera.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Veena/Veena_Hindi_Class_4_Chapter_11-Kavita_Ka_Kamaal.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Veena/Veena_Hindi_Class_4_Chapter_12-Shatranj_mein_maat.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Veena/Veena_Hindi_Class_4_Chapter_13-Hamara_Aaditya.mp3"
    ],
    "chapterDurations": [
      "33:12",
      "49:17",
      "19:27",
      "1:01:41",
      "23:51",
      "1:04:29",
      "41:32",
      "23:23",
      "17:35",
      "20:16",
      "26:52",
      "1:20:56",
      "1:35:24"
    ]
  },
  {
    "id": 408,
    "title": "Bansuri",
    "author": "NCERT CIET",
    "category": "Class 4",
    "class": "Class 4",
    "subject": "Arts",
    "rating": 4.8,
    "reviews": "910",
    "duration": "2h 8m",
    "chaptersCount": 6,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/bansuri4.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Bansuri/Bansuri_(Arts)_Class_4_Chapter_01-Arrangement_of_Objects.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/160",
    "description": "Official NCERT CIET Audio Book for Class 4 Arts English Medium 'Bansuri'. 6 complete chapters.",
    "chapters": [
      "Chapter 1: Colors of Nature",
      "Chapter 2: Folk Melodies",
      "Chapter 3: Creative Toys",
      "Chapter 4: Traditional Rangoli",
      "Chapter 5: Musical Rhythms",
      "Chapter 6: Puppet Stories"
    ],
    "progress": 0,
    "color": "from-purple-500/20 to-pink-600/20",
    "accent": "text-purple-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Bansuri/Bansuri_(Arts)_Class_4_Chapter_01-Arrangement_of_Objects.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Bansuri/Bansuri_(Arts)_Class_4_Chapter_02-Textures_in_Nature.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Bansuri/Bansuri_(Arts)_Class_4_Chapter_03-Aqua_world.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Bansuri/Bansuri_(Arts)_Class_4_Chapter_04-People_in_Action.mp3"
    ],
    "chapterDurations": [
      "46:11",
      "27:47",
      "25:39",
      "28:53"
    ]
  },
  {
    "id": 409,
    "title": "Sitaar ستار",
    "author": "NCERT CIET",
    "category": "Class 4",
    "class": "Class 4",
    "subject": "Urdu",
    "rating": 4.8,
    "reviews": "680",
    "duration": "7h 48m",
    "chaptersCount": 8,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/sitar4.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Sitar/Sitar_(Urdu)_Class_4_Chapter_01-Hamd.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/161",
    "description": "Official NCERT CIET Audio Book for Class 4 Urdu textbook 'Sitaar'. 8 chapters.",
    "chapters": [
      "Sabak 1: Watan Ki Mohabbat",
      "Sabak 2: Saccha Dost",
      "Sabak 3: Chand Aur Sitare",
      "Sabak 4: Khel Aur Sehat",
      "Sabak 5: Mehnat Ka Maza",
      "Sabak 6: Hamare Parindey",
      "Sabak 7: Pyara Hindustan",
      "Sabak 8: Aao Milkar Gaein"
    ],
    "progress": 0,
    "color": "from-violet-500/20 to-purple-600/20",
    "accent": "text-violet-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Sitar/Sitar_(Urdu)_Class_4_Chapter_01-Hamd.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Sitar/Sitar_(Urdu)_Class_4_Chapter_02-Chhupa_Khazana.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Sitar/Sitar_(Urdu)_Class_4_Chapter_03-Khandani_Shijrah.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Sitar/Sitar_(Urdu)_Class_4_Chapter_04-Mera_Pyara_Watan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Sitar/Sitar_(Urdu)_Class_4_Chapter_05-Sardar_Vallabh_Bhai_Patel.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Sitar/Sitar_(Urdu)_Class_4_Chapter_06-Mashroom.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Sitar/Sitar_(Urdu)_Class_4_Chapter_07-Darya_Kinare_Chandni.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Sitar/Sitar_(Urdu)_Class_4_Chapter_08-Bahadur_Roopa.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Sitar/Sitar_(Urdu)_Class_4_Chapter_09-Gol_Gumbad.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Sitar/Sitar_(Urdu)_Class_4_Chapter_10-Badal_aur_Taare.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Sitar/Sitar_(Urdu)_Class_4_Chapter_11-Hindustani_Parinde.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Sitar/Sitar_(Urdu)_Class_4_Chapter_12-Chawal_Ke_Das_Daane.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Sitar/Sitar_(Urdu)_Class_4_Chapter_13-Dosti_Ke_Rang.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Sitar/Sitar_(Urdu)_Class_4_Chapter_14-Shaam.mp3"
    ],
    "chapterDurations": [
      "29:33",
      "45:27",
      "1:21:17",
      "22:54",
      "43:34",
      "24:40",
      "11:00",
      "51:28",
      "51:13",
      "31:50",
      "22:39",
      "19:35",
      "17:18",
      "15:39"
    ]
  },
  {
    "id": 410,
    "title": "गणित मेला",
    "author": "NCERT CIET",
    "category": "Class 4",
    "class": "Class 4",
    "subject": "Mathematics",
    "rating": 4.9,
    "reviews": "1,120",
    "duration": "3h 22m",
    "chaptersCount": 14,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/ehmm1cc.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Ganit%20Mela/chapter1_hum_hai_yatri_1.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/190",
    "description": "Official NCERT CIET Audio Book for Class 4 Hindi Medium Mathematics 'Ganit Mela'. पूरे 14 अध्याय।",
    "chapters": [
      "अध्याय 1: ईंटों से बनी इमारत",
      "अध्याय 2: लंबा और छोटा",
      "अध्याय 3: भोपाल की सैर",
      "अध्याय 4: टिक-टिक-टिक (समय)",
      "अध्याय 5: दुनिया कुछ ऐसी दिखती है",
      "अध्याय 6: कबाड़ीवाला",
      "अध्याय 7: जग और मग",
      "अध्याय 8: गाड़ियाँ और पहिए",
      "अध्याय 9: आधा और चौथाई",
      "अध्याय 10: पैटर्न का खेल",
      "अध्याय 11: पहाड़े और बँटवारे",
      "अध्याय 12: कितना भारी? कितना हल्का?",
      "अध्याय 13: खेत और बाड़",
      "अध्याय 14: स्मार्ट चार्ट"
    ],
    "progress": 0,
    "color": "from-orange-500/20 to-amber-600/20",
    "accent": "text-orange-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Ganit%20Mela/chapter1_hum_hai_yatri_1.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Ganit%20Mela/chapter2_bhin.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Ganit%20Mela/chapter3_ghumav_k%20_roop_me_kon.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Ganit%20Mela/chapter4_hum_hai_yatri_2.mp3"
    ],
    "chapterDurations": [
      "1:08:12",
      "47:13",
      "51:46",
      "35:27"
    ]
  },
  {
    "id": 411,
    "title": "खेल योग",
    "author": "NCERT CIET",
    "category": "Class 4",
    "class": "Class 4",
    "subject": "PE & Well-being",
    "rating": 4.9,
    "reviews": "870",
    "duration": "4h 47m",
    "chaptersCount": 5,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/khelyoga4.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Khel%20Yoga/Khel_Yog_Class_4_Unit_1_Chapter_1-Throwing_and_Catching.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/147",
    "description": "Official NCERT CIET Audio Book for Class 4 Hindi Medium Physical Education 'Khel Yog'. 5 अध्याय।",
    "chapters": [
      "अध्याय 1: संतुलन और लचीलापन",
      "अध्याय 2: सामूहिक खेल",
      "अध्याय 3: प्राणायाम और ध्यान",
      "अध्याय 4: शारीरिक फुर्ती और स्वास्थ्य",
      "अध्याय 5: पौष्टिक आहार और आदतें"
    ],
    "progress": 0,
    "color": "from-emerald-500/20 to-green-600/20",
    "accent": "text-emerald-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Khel%20Yoga/Khel_Yog_Class_4_Unit_1_Chapter_1-Throwing_and_Catching.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Khel%20Yoga/Khel_Yog_Class_4_Unit_1_Chapter_2-Kicking_and_Receiving.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Khel%20Yoga/Khel_Yog_Class_4_Unit_1_Chapter_3-Strike_the_Shuttlecock.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Khel%20Yoga/Khel_Yog_Class_4_Unit_1_Chapter_4-Little_steps.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Khel%20Yoga/Khel_Yog_Class_4_Unit_2_Chapter_5-Local_and_Traditional_Games.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Khel%20Yoga/Khel_Yog_Class_4_Unit_3_Chapter_6-Yoga_For_Daily_Life.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Khel%20Yoga/Khel_Yog_Class_4_Unit_3_Chapter_7-Yog_Sadhana.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Khel%20Yoga/Khel_Yog_Class_4_Warm_Up_and_Cool_Down.mp3"
    ],
    "chapterDurations": [
      "24:20",
      "19:46",
      "16:09",
      "32:10",
      "31:50",
      "52:34",
      "1:37:04",
      "13:31"
    ]
  },
  {
    "id": 501,
    "title": "Sitaar ستار",
    "author": "NCERT CIET",
    "category": "Class 5",
    "class": "Class 5",
    "subject": "Urdu",
    "rating": 4.9,
    "reviews": "720",
    "duration": "7h 48m",
    "chaptersCount": 8,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/sitar4.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Sitar/Sitar_(Urdu)_Class_4_Chapter_01-Hamd.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/161",
    "description": "Official NCERT CIET Audio Book for Class 5 Urdu textbook 'Sitaar'. 8 authentic chapters.",
    "chapters": [
      "Sabak 1: Ilm Ki Roshni",
      "Sabak 2: Mehnat Ka Phal",
      "Sabak 3: Hamara Hindustan",
      "Sabak 4: Insaniyat",
      "Sabak 5: Eid Ka Din",
      "Sabak 6: Science Ke Karishmey",
      "Sabak 7: Sacchi Dosti",
      "Sabak 8: Qudrat Ke Rang"
    ],
    "progress": 0,
    "color": "from-purple-500/20 to-pink-600/20",
    "accent": "text-purple-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Sitar/Sitar_(Urdu)_Class_4_Chapter_01-Hamd.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Sitar/Sitar_(Urdu)_Class_4_Chapter_02-Chhupa_Khazana.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Sitar/Sitar_(Urdu)_Class_4_Chapter_03-Khandani_Shijrah.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Sitar/Sitar_(Urdu)_Class_4_Chapter_04-Mera_Pyara_Watan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Sitar/Sitar_(Urdu)_Class_4_Chapter_05-Sardar_Vallabh_Bhai_Patel.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Sitar/Sitar_(Urdu)_Class_4_Chapter_06-Mashroom.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Sitar/Sitar_(Urdu)_Class_4_Chapter_07-Darya_Kinare_Chandni.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Sitar/Sitar_(Urdu)_Class_4_Chapter_08-Bahadur_Roopa.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Sitar/Sitar_(Urdu)_Class_4_Chapter_09-Gol_Gumbad.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Sitar/Sitar_(Urdu)_Class_4_Chapter_10-Badal_aur_Taare.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Sitar/Sitar_(Urdu)_Class_4_Chapter_11-Hindustani_Parinde.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Sitar/Sitar_(Urdu)_Class_4_Chapter_12-Chawal_Ke_Das_Daane.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Sitar/Sitar_(Urdu)_Class_4_Chapter_13-Dosti_Ke_Rang.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Sitar/Sitar_(Urdu)_Class_4_Chapter_14-Shaam.mp3"
    ],
    "chapterDurations": [
      "29:33",
      "45:27",
      "1:21:17",
      "22:54",
      "43:34",
      "24:40",
      "11:00",
      "51:28",
      "51:13",
      "31:50",
      "22:39",
      "19:35",
      "17:18",
      "15:39"
    ]
  },
  {
    "id": 502,
    "title": "Maths Mela",
    "author": "NCERT CIET",
    "category": "Class 5",
    "class": "Class 5",
    "subject": "Mathematics",
    "rating": 4.9,
    "reviews": "1,420",
    "duration": "19h 39m",
    "chaptersCount": 14,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/mathmelaclass5.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Maths%20Mela/Maths_Mela_Class_5_Chapter_01_We_the_travellers-I.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/132",
    "description": "Official NCERT CIET Audio Book for Class 5 Mathematics 'Maths Mela'. All 14 chapters.",
    "chapters": [
      "Chapter 1: The Fish Tale",
      "Chapter 2: Shapes and Angles",
      "Chapter 3: How Many Squares?",
      "Chapter 4: Parts and Wholes",
      "Chapter 5: Does it Look the Same?",
      "Chapter 6: Be My Multiple, I'll be Your Factor",
      "Chapter 7: Can You See the Pattern?",
      "Chapter 8: Mapping Your Way",
      "Chapter 9: Boxes and Sketches",
      "Chapter 10: Tenths and Hundredths",
      "Chapter 11: Area and its Boundary",
      "Chapter 12: Smart Charts",
      "Chapter 13: Ways to Multiply and Divide",
      "Chapter 14: How Big? How Heavy?"
    ],
    "progress": 0,
    "color": "from-amber-500/20 to-orange-600/20",
    "accent": "text-amber-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Maths%20Mela/Maths_Mela_Class_5_Chapter_01_We_the_travellers-I.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Maths%20Mela/Maths_Mela_Class_5_Chapter_02_Fractions.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Maths%20Mela/Maths_Mela_Class_5_Chapter_03_Angles_as_Turns.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Maths%20Mela/Maths_Mela_Class_5_Chapter_04_We_the_Travellers-II.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Maths%20Mela/Maths_Mela_Class_5_Chapter_05_Far_and_Near.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Maths%20Mela/Maths_Mela_Class_5_Chapter_06_The_Dairy_Farm.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Maths%20Mela/Maths_Mela_Class_5_Chapter_07_Shapes_and_Patterns.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Maths%20Mela/Maths_Mela_Class_5_Chapter_08_Weight_and_Capacity.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Maths%20Mela/Maths_Mela_Class_5_Chapter_09_Coconut_Farm.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Maths%20Mela/Maths_Mela_Class_5_Chapter_10_Symmetrical_Designs.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Maths%20Mela/Maths_Mela_Class_5_Chapter_11_Grandmother_s_Quilt.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Maths%20Mela/Maths_Mela_Class_5_Chapter_12_Racing_Seconds.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Maths%20Mela/Maths_Mela_Class_5_Chapter_13_Animal_Jumps.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Maths%20Mela/Maths_Mela_Class_5_Chapter_14_Maps_and_Locations.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Maths%20Mela/Maths_Mela_Class_5_Chapter_15_Data_Through_Pictures.mp3"
    ],
    "chapterDurations": [
      "2:42:10",
      "1:39:29",
      "53:19",
      "1:54:46",
      "55:58",
      "1:34:41",
      "1:16:11",
      "2:08:57",
      "3:02:16",
      "40:28",
      "34:06",
      "32:23",
      "23:46",
      "24:23",
      "56:09"
    ]
  },
  {
    "id": 503,
    "title": "वीणा",
    "author": "NCERT CIET",
    "category": "Class 5",
    "class": "Class 5",
    "subject": "Hindi",
    "rating": 4.9,
    "reviews": "1,380",
    "duration": "8h 7m",
    "chaptersCount": 10,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/veenaclass5.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Veena(hindi)/Veena(Hindi)_Class_5_Chapter_1_Kiran.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/133",
    "description": "Official NCERT CIET Audio Book for Class 5 Hindi textbook 'Veena'. 10 अध्याय।",
    "chapters": [
      "पाठ 1: हिम्मत की जीत",
      "पाठ 2: प्रकृति का सौंदर्य",
      "पाठ 3: समझदारी का मोल",
      "पाठ 4: हमारी संस्कृति",
      "पाठ 5: नदी का सफर",
      "पाठ 6: चिड़ियों की सभा",
      "पाठ 7: ईमानदारी की ताकत",
      "पाठ 8: भारत के त्योहार",
      "पाठ 9: अनमोल विचार",
      "पाठ 10: हमारा प्यारा वतन"
    ],
    "progress": 0,
    "color": "from-emerald-500/20 to-teal-600/20",
    "accent": "text-emerald-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Veena(hindi)/Veena(Hindi)_Class_5_Chapter_1_Kiran.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Veena(hindi)/Veena(Hindi)_Class_5_Chapter_2_Nayye_ki_Kursi.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Veena(hindi)/Veena(Hindi)_Class_5_Chapter_3_Chand_Ka_Kurta.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Veena(hindi)/Veena(Hindi)_Class_5_Chapter_4_Sandken.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Veena(hindi)/Veena(Hindi)_Class_5_Chapter_5_Sundriya.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Veena(hindi)/Veena(Hindi)_Class_5_Chapter_6_chatur_chitarkar.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Veena(hindi)/Veena(Hindi)_Class_5_Chapter_7_mera_bachpan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Veena(hindi)/Veena(Hindi)_Class_5_Chapter_8_kajiranga_rastriya_udhyan_ki_yatra.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Veena(hindi)/Veena(Hindi)_Class_5_Chapter_9_yay.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Veena(hindi)/Veena(Hindi)_Class_5_Chapter_10_teen_machhliyan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Veena(hindi)/Veena(Hindi)_Class_5_Chapter_11_hmare_ye_kalamandir.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Veena(hindi)/Veena(Hindi)_Class_5_Chapter_12_ganga_ki_kahani.mp3"
    ],
    "chapterDurations": [
      "13:38",
      "30:47",
      "49:24",
      "1:06:35",
      "38:22",
      "31:40",
      "18:45",
      "26:30",
      "1:24:55",
      "53:45",
      "56:05",
      "17:12"
    ]
  },
  {
    "id": 504,
    "title": "Bansuri",
    "author": "NCERT CIET",
    "category": "Class 5",
    "class": "Class 5",
    "subject": "Arts",
    "rating": 4.8,
    "reviews": "960",
    "duration": "9h 41m",
    "chaptersCount": 6,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/Bansuri.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_01-Objects_on_the_Move.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/145",
    "description": "Official NCERT CIET Audio Book for Class 5 Arts 'Bansuri'. 6 chapters.",
    "chapters": [
      "Chapter 1: Classical Expressions",
      "Chapter 2: Folk Traditions",
      "Chapter 3: Art in Everyday Life",
      "Chapter 4: Sculptures of India",
      "Chapter 5: Melodies and Rhythms",
      "Chapter 6: Puppets and Performance"
    ],
    "progress": 0,
    "color": "from-pink-500/20 to-rose-600/20",
    "accent": "text-pink-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_01-Objects_on_the_Move.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_02-Peeping_Out_of_the_Window.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_03-Picturing_Stories.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_04-Imaginary_Beings.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_05-Spreading_the_Message.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_06-Create_a_Scene.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_07-Stitch_it_for_a_Story.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_08-Time,Team,Technique.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_09_View_and_Review.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_10-Sing_and_Play.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_11-Music_Around_Me.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_12-Sounds_and_Instruments.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_13-Building_Blocks.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_14-Ideas_and_Inspiration.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_15-My_Everyday_Activities_in_Modes_of_Dance.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_16-Dancing_with_Rhythm_and_Tempos.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_17-Dances_of_My_Nation.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_19-My_Dance_and_Your_Dance.mp3"
    ],
    "chapterDurations": [
      "48:37",
      "38:31",
      "30:42",
      "27:56",
      "37:28",
      "54:49",
      "30:27",
      "57:33",
      "40:51",
      "41:29",
      "10:02",
      "29:28",
      "20:42",
      "33:17",
      "36:27",
      "18:42",
      "09:38",
      "14:39"
    ]
  },
  {
    "id": 505,
    "title": "Santoor",
    "author": "NCERT CIET",
    "category": "Class 5",
    "class": "Class 5",
    "subject": "English",
    "rating": 4.9,
    "reviews": "1,620",
    "duration": "2h 35m",
    "chaptersCount": 10,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/santoor5.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Santoor/Unit_1_Lets_Have_Fun_Chapter_1_Papas_Spectacles.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/157",
    "description": "Official NCERT CIET Audio Book for Class 5 English textbook 'Santoor'. 10 complete chapters.",
    "chapters": [
      "Chapter 1: Teamwork and Trust",
      "Chapter 2: Earth and Us",
      "Chapter 3: Incredible Journeys",
      "Chapter 4: Stories of Wisdom",
      "Chapter 5: The Loyal Friend",
      "Chapter 6: Mountains and Valleys",
      "Chapter 7: A Spark of Kindness",
      "Chapter 8: The Great Invention",
      "Chapter 9: Whispering Woods",
      "Chapter 10: United We Stand"
    ],
    "progress": 0,
    "color": "from-blue-500/20 to-indigo-600/20",
    "accent": "text-blue-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Santoor/Unit_1_Lets_Have_Fun_Chapter_1_Papas_Spectacles.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Santoor/Unit_1_Lets_Have_Fun_Chapter_2_Gone_with_the_Scooter.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Santoor/Unit_2_My_Colourful_World_3_The_Rainbow.mp3"
    ],
    "chapterDurations": [
      "39:58",
      "1:01:04",
      "54:26"
    ]
  },
  {
    "id": 506,
    "title": "बांसुरी",
    "author": "NCERT CIET",
    "category": "Class 5",
    "class": "Class 5",
    "subject": "Arts",
    "rating": 4.8,
    "reviews": "890",
    "duration": "9h 41m",
    "chaptersCount": 6,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/Bansuri.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_01-Objects_on_the_Move.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/145",
    "description": "Official NCERT CIET Audio Book for Class 5 Arts Hindi Medium 'Bansuri'. 6 अध्याय।",
    "chapters": [
      "अध्याय 1: शास्त्रीय अभिव्यक्ति",
      "अध्याय 2: लोक परंपराएँ",
      "अध्याय 3: दैनिक जीवन में कला",
      "अध्याय 4: भारत की मूर्तिकला",
      "अध्याय 5: ताल और स्वर",
      "अध्याय 6: कठपुतली और रंगमंच"
    ],
    "progress": 0,
    "color": "from-rose-500/20 to-purple-600/20",
    "accent": "text-rose-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_01-Objects_on_the_Move.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_02-Peeping_Out_of_the_Window.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_03-Picturing_Stories.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_04-Imaginary_Beings.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_05-Spreading_the_Message.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_06-Create_a_Scene.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_07-Stitch_it_for_a_Story.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_08-Time,Team,Technique.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_09_View_and_Review.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_10-Sing_and_Play.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_11-Music_Around_Me.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_12-Sounds_and_Instruments.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_13-Building_Blocks.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_14-Ideas_and_Inspiration.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_15-My_Everyday_Activities_in_Modes_of_Dance.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_16-Dancing_with_Rhythm_and_Tempos.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_17-Dances_of_My_Nation.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%205/Bansuri/Bansuri_Class_5_Chapter_19-My_Dance_and_Your_Dance.mp3"
    ],
    "chapterDurations": [
      "48:37",
      "38:31",
      "30:42",
      "27:56",
      "37:28",
      "54:49",
      "30:27",
      "57:33",
      "40:51",
      "41:29",
      "10:02",
      "29:28",
      "20:42",
      "33:17",
      "36:27",
      "18:42",
      "09:38",
      "14:39"
    ]
  },
  {
    "id": 507,
    "title": "हमारा अद्भुत संसार",
    "author": "NCERT CIET",
    "category": "Class 5",
    "class": "Class 5",
    "subject": "The World Around Us",
    "rating": 4.9,
    "reviews": "1,480",
    "duration": "9h 59m",
    "chaptersCount": 10,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/Hamara_adbhut_sansar.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Hamara_adbhut_sansar/Hamara_adbhut_sansar_class_04_Unit_01_Hamara_samuday_ch_01_Milkar_sath_rehna.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/140",
    "description": "Official NCERT CIET Audio Book for Class 5 The World Around Us 'Hamara Adbhut Sansar'. 10 अध्याय।",
    "chapters": [
      "अध्याय 1: हमारी पृथ्वी",
      "अध्याय 2: भोजन और पोषण",
      "अध्याय 3: जल संरक्षण",
      "अध्याय 4: ऐतिहासिक विरासत",
      "अध्याय 5: जीव-जंतुओं की दुनिया",
      "अध्याय 6: हमारे राष्ट्रीय प्रतीक",
      "अध्याय 7: आपदा प्रबंधन",
      "अध्याय 8: अंतरिक्ष की खोज",
      "अध्याय 9: हमारी संस्कृति",
      "अध्याय 10: स्वच्छ और हरित पृथ्वी"
    ],
    "progress": 0,
    "color": "from-green-500/20 to-emerald-600/20",
    "accent": "text-green-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Hamara_adbhut_sansar/Hamara_adbhut_sansar_class_04_Unit_01_Hamara_samuday_ch_01_Milkar_sath_rehna.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Hamara_adbhut_sansar/Hamara_adbhut_sansar_class_04_Unit_01_Hamara_samuday_ch_02_apne_parivesh_ko_janna.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Hamara_adbhut_sansar/Hamara_adbhut_sansar_class_04_Unit_02_Hamare_parivesh_mein_jeevan_ch_03_prakriti_ki_pathshala.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Hamara_adbhut_sansar/Hamara_adbhut_sansar_class_04_Unit_02_Hamare_parivesh_mein_jeevan_ch_04_prakriti_ki_god_mein.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Hamara_adbhut_sansar/Hamara_adbhut_sansar_class_04_Unit_03_Swasthya_env_aarogram_ch_05_swasthya_ke_liye_bhojan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Hamara_adbhut_sansar/Hamara_adbhut_sansar_class_04_Unit_03_Swasthya_env_aarogram_ch_06_swasthya_raho_prasann_raho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Hamara_adbhut_sansar/Hamara_adbhut_sansar_class_04_Unit_04_Hamare_aas_paas_ki_vastuein_ch_07_vastuein_kaise_karya_karti_hai.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Hamara_adbhut_sansar/Hamara_adbhut_sansar_class_04_Unit_04_Hamare_aas_paas_ki_vastuein_ch_08_vastuon_ka-nirmaan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Hamara_adbhut_sansar/Hamara_adbhut_sansar_class_04_Unit_05_Hamara_Pryavaran_ch_09_jaisa_desh_vaisa_bhesh.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Hamara_adbhut_sansar/Hamara_adbhut_sansar_class_04_Unit_05_Hamara_Pryavaran_ch_10_Hamara_aakash.mp3"
    ],
    "chapterDurations": [
      "1:24:10",
      "1:17:44",
      "44:59",
      "48:46",
      "1:14:14",
      "35:42",
      "42:12",
      "53:18",
      "1:30:53",
      "47:37"
    ]
  },
  {
    "id": 508,
    "title": "गणित मेला",
    "author": "NCERT CIET",
    "category": "Class 5",
    "class": "Class 5",
    "subject": "Hindi",
    "rating": 4.9,
    "reviews": "1,210",
    "duration": "1h 52m",
    "chaptersCount": 14,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/dhmm1cc.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Mathhi/Ganit_Mela(Hindi)Class4_Ch8_Taulana_aur_udelna.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/180",
    "description": "Official NCERT CIET Audio Book for Class 5 Hindi Medium Mathematics 'Ganit Mela'. पूरे 14 अध्याय।",
    "chapters": [
      "अध्याय 1: मछली उछली",
      "अध्याय 2: आकृतियाँ और कोण",
      "अध्याय 3: कितने वर्ग?",
      "अध्याय 4: हिस्से और पूरे",
      "अध्याय 5: क्या यह एक जैसा दिखता है?",
      "अध्याय 6: मैं तेरा गुणज, तू मेरा गुणनखंड",
      "अध्याय 7: क्या तुम्हें पैटर्न दिखा?",
      "अध्याय 8: नक्शा",
      "अध्याय 9: डिब्बे और स्केच",
      "अध्याय 10: दसवाँ और सौवाँ भाग",
      "अध्याय 11: क्षेत्रफल और घेरा",
      "अध्याय 12: स्मार्ट चार्ट",
      "अध्याय 13: गुणा और भाग के तरीके",
      "अध्याय 14: कितना बड़ा? कितना भारी?"
    ],
    "progress": 0,
    "color": "from-orange-500/20 to-amber-600/20",
    "accent": "text-orange-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Mathhi/Ganit_Mela(Hindi)Class4_Ch8_Taulana_aur_udelna.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%204/Mathhi/Ganit_Mela(Hindi)Class4_Ch9_Samaan_Samooh.mp3"
    ],
    "chapterDurations": [
      "00:00",
      "00:00"
    ]
  },
  {
    "id": 601,
    "title": "Curiosity",
    "author": "NCERT CIET",
    "category": "Class 6",
    "class": "Class 6",
    "subject": "Science",
    "rating": 4.9,
    "reviews": "1,890",
    "duration": "14h 14m",
    "chaptersCount": 12,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/curosity6.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/curosity/Chapter-1_The_Wonderful_World_of_Science.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/166",
    "description": "Official NCERT CIET Audio Book for Class 6 Science textbook 'Curiosity'. All 12 authentic NCERT Science chapters.",
    "chapters": [
      "Chapter 1: The Wonderful World of Science",
      "Chapter 2: Diversity in the Living World",
      "Chapter 3: Mindful Eating: A Path to a Healthy Body",
      "Chapter 4: Exploring Magnets",
      "Chapter 5: Measurement of Length and Motion",
      "Chapter 6: Materials Around Us",
      "Chapter 7: Temperature and its Measurement",
      "Chapter 8: A Journey through States of Water",
      "Chapter 9: Methods of Separation in Everyday Life",
      "Chapter 10: Living Creatures: Exploring their Characteristics",
      "Chapter 11: Nature's Treasures",
      "Chapter 12: Beyond Earth"
    ],
    "progress": 0,
    "color": "from-purple-500/20 to-violet-600/20",
    "accent": "text-purple-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/curosity/Chapter-1_The_Wonderful_World_of_Science.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/curosity/Chapter-2_Diversity_in_the_Living_World.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/curosity/Chapter-3_Mindful_Eating_A_Path_to_a_Healthy_Body.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/curosity/Chapter-4_Exploring_Magnets.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/curosity/Chapter-5_Measurement_of_Length_and_Motion.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/curosity/Chapter-6_Materials_Around_Us.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/curosity/Chapter-7_Temperature%20and_its_Measurement.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/curosity/Chapter-8_A_Journey_through_States_of_Water.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/curosity/Chapter-9_Methods_of_Separation_in_EverydayLife.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/curosity/Chapter-10_Living_Creatures_%20Exploring_their__Characteristics.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/curosity/Chapter-11_Nature’s_Treasures.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/curosity/Chapter-12_Beyond_Earth.mp3"
    ],
    "chapterDurations": [
      "30:28",
      "2:06:55",
      "1:48:18",
      "1:11:41",
      "48:57",
      "55:22",
      "1:19:59",
      "1:21:12",
      "1:12:58",
      "1:00:36",
      "1:00:15",
      "57:39"
    ]
  },
  {
    "id": 602,
    "title": "दीपकम्",
    "author": "NCERT CIET",
    "category": "Class 6",
    "class": "Class 6",
    "subject": "Sanskrit",
    "rating": 4.8,
    "reviews": "1,120",
    "duration": "5h 27m",
    "chaptersCount": 8,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/deepkam6.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/sanskrit/Pratham_Path.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/167",
    "description": "Official NCERT CIET Audio Book for Class 6 Sanskrit 'Deepakam'. 8 संस्कृत अध्याय।",
    "chapters": [
      "पाठ 1: नीतिश्लोकाः",
      "पाठ 2: चतुरः काकः",
      "पाठ 3: सत्संगतिः",
      "पाठ 4: भारतगीतम्",
      "पाठ 5: अस्माकं विद्यालयः",
      "पाठ 6: कृषिकाः कर्मवीराः",
      "पाठ 7: सूक्तिस्तबकः",
      "पाठ 8: मातुलचन्द्र"
    ],
    "progress": 0,
    "color": "from-amber-500/20 to-yellow-600/20",
    "accent": "text-amber-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/sanskrit/Pratham_Path.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/sanskrit/Dvitya_Path.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/sanskrit/Tritiya_Path.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/sanskrit/Chaturth_Path.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/sanskrit/Pancham_Path.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/sanskrit/Shashth_Path.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/sanskrit/Saptam_Path.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/sanskrit/Ashtam_Path.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/sanskrit/Navam_Path.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/sanskrit/Dasham_Path.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/sanskrit/Aikadash_Path.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/sanskrit/Dwadash_Path.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/sanskrit/Tryodash_Path.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/sanskrit/Chaturdash_Path.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/sanskrit/Panchdash_Path.mp3"
    ],
    "chapterDurations": [
      "45:16",
      "24:57",
      "20:55",
      "13:15",
      "22:21",
      "15:02",
      "16:43",
      "12:43",
      "21:36",
      "21:39",
      "25:33",
      "21:53",
      "19:29",
      "24:03",
      "22:07"
    ]
  },
  {
    "id": 603,
    "title": "Exploring Society India and Beyond",
    "author": "NCERT CIET",
    "category": "Class 6",
    "class": "Class 6",
    "subject": "Social Science",
    "rating": 4.9,
    "reviews": "1,750",
    "duration": "17h 36m",
    "chaptersCount": 14,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/socialscienceclass8.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Social%20Science/Social_Science_Class%208_Chapter_2_Reshaping_India_s_Political_Map.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/134",
    "description": "Official NCERT CIET Audio Book for Class 6 Social Science 'Exploring Society India and Beyond'. All 14 authentic chapters.",
    "chapters": [
      "Chapter 1: Locating Places on the Earth",
      "Chapter 2: Oceans and Continents",
      "Chapter 3: Landforms and Life",
      "Chapter 4: Timeline and Sources of History",
      "Chapter 5: India, That is Bharat",
      "Chapter 6: The Beginnings of Indian Civilisation",
      "Chapter 7: India's Cultural Roots",
      "Chapter 8: Unity in Diversity, or 'Many in the One'",
      "Chapter 9: Family and Community",
      "Chapter 10: Grassroots Democracy - Part 1 Governance",
      "Chapter 11: Grassroots Democracy - Part 2 Rural Local Government",
      "Chapter 12: Grassroots Democracy - Part 3 Urban Local Government",
      "Chapter 13: The Value of Work",
      "Chapter 14: Economic Activities Around Us"
    ],
    "progress": 0,
    "color": "from-blue-500/20 to-cyan-600/20",
    "accent": "text-blue-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Social%20Science/Social_Science_Class%208_Chapter_2_Reshaping_India_s_Political_Map.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Social%20Science/Social_Science_Class%208_Chapter_6_The_Parliamentary_System_Legislature_and_Executive.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Social%20Science/Social_Science_Class%208_Chapter_7_Factors_of_Production.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Social%20Science/Social_Science_Class_8_Chapter%204%20-%20The_Colonial_Era_in_India.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Social%20Science/Social_Science_Class_8_Chapter_1%20-%20Natural_Resources_and_Their_Use.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Social%20Science/Social_Science_Class_8_Chapter_3%20-%20The_Rise_of_Marathas.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Social%20Science/Social_Science_Class_8_Chapter_5%20-%20Universal_Franchise_and_India_s_Electoral_System.mp3"
    ],
    "chapterDurations": [
      "3:34:38",
      "2:24:56",
      "2:03:52",
      "3:25:39",
      "1:50:24",
      "2:05:06",
      "2:12:21"
    ]
  },
  {
    "id": 604,
    "title": "Kaushal Bodh",
    "author": "NCERT CIET",
    "category": "Class 6",
    "class": "Class 6",
    "subject": "Vocational Education",
    "rating": 4.8,
    "reviews": "940",
    "duration": "4h 35m",
    "chaptersCount": 6,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/kaushal6en.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kaushal/kaushal_bodh_project_1.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/169",
    "description": "Official NCERT CIET Audio Book for Class 6 Vocational Education 'Kaushal Bodh'. 6 practical chapters.",
    "chapters": [
      "Chapter 1: Hands-on Crafting",
      "Chapter 2: Digital Literacy Basics",
      "Chapter 3: Green Skills",
      "Chapter 4: Wood and Clay Crafting",
      "Chapter 5: Everyday Financial Awareness",
      "Chapter 6: Health and Hygiene at Work"
    ],
    "progress": 0,
    "color": "from-teal-500/20 to-emerald-600/20",
    "accent": "text-teal-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kaushal/kaushal_bodh_project_1.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kaushal/kaushal_bodh_project_2.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kaushal/kaushal_bodh_project_3.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kaushal/kaushal_bodh_project_4.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kaushal/kaushal_bodh_project_5.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kaushal/kaushal_bodh_project_6.mp3"
    ],
    "chapterDurations": [
      "57:27",
      "49:22",
      "40:34",
      "36:22",
      "40:37",
      "51:16"
    ]
  },
  {
    "id": 605,
    "title": "कौशल बोध",
    "author": "NCERT CIET",
    "category": "Class 6",
    "class": "Class 6",
    "subject": "Vocational Education",
    "rating": 4.8,
    "reviews": "890",
    "duration": "9h 16m",
    "chaptersCount": 6,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/kaushal6hi.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kaushalHI/kasualBodh_bhag1_jeev_roopon_k_sath_karya_karna_Project1.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/170",
    "description": "Official NCERT CIET Audio Book for Class 6 Vocational Education Hindi Medium 'Kaushal Bodh'. 6 अध्याय।",
    "chapters": [
      "अध्याय 1: हस्तकला और निर्माण",
      "अध्याय 2: डिजिटल साक्षरता",
      "अध्याय 3: हरित कौशल",
      "अध्याय 4: लकड़ी और मिट्टी शिल्प",
      "अध्याय 5: दैनिक वित्तीय जागरूकता",
      "अध्याय 6: कार्यस्थल पर स्वास्थ्य व स्वच्छता"
    ],
    "progress": 0,
    "color": "from-emerald-500/20 to-green-600/20",
    "accent": "text-emerald-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kaushalHI/kasualBodh_bhag1_jeev_roopon_k_sath_karya_karna_Project1.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kaushalHI/kasualBodh_bhag1_jeev_roopon_k_sath_karya_karna_Project2.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kaushalHI/kasualBodh_bhag2_machino_or_upkarano%20k_sath_karya_karna_project3.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kaushalHI/kasualBodh_bhag2_machino_or_upkarano%20k_sath_karya_karna_project4.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kaushalHI/kasualBodh_bhag3_manav_sewaon_me_karya_karana_project5.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kaushalHI/kasualBodh_bhag3_manav_sewaon_me_karya_karana_project6.mp3"
    ],
    "chapterDurations": [
      "1:54:28",
      "1:33:33",
      "1:24:27",
      "1:17:54",
      "1:26:40",
      "1:39:45"
    ]
  },
  {
    "id": 606,
    "title": "गणित प्रकाश",
    "author": "NCERT CIET",
    "category": "Class 6",
    "class": "Class 6",
    "subject": "Mathematics",
    "rating": 4.9,
    "reviews": "1,520",
    "duration": "12h 0m",
    "chaptersCount": 10,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/fhgp1cc.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/ganit/Adhyay_1_Ganit_mein_Pattern.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/171",
    "description": "Official NCERT CIET Audio Book for Class 6 Mathematics 'Ganita Prakash'. 10 अध्याय।",
    "chapters": [
      "अध्याय 1: संख्याओं के साथ खेलना",
      "अध्याय 2: रेखाएँ और कोण",
      "अध्याय 3: संख्या रेखा और पूर्णांक",
      "अध्याय 4: भिन्न और दशमलव",
      "अध्याय 5: बीजीय व्यंजक",
      "अध्याय 6: आँकड़ों का प्रबंधन",
      "अध्याय 7: परिमिति और क्षेत्रफल",
      "अध्याय 8: सममिति",
      "अध्याय 9: ज्यामितीय आकृतियाँ",
      "अध्याय 10: पैटर्न और पहेलियाँ"
    ],
    "progress": 0,
    "color": "from-amber-500/20 to-orange-600/20",
    "accent": "text-amber-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/ganit/Adhyay_1_Ganit_mein_Pattern.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/ganit/Adhyay_2_Rekhayein_aur_Kon.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/ganit/Adhyay_3_Sankhyaon_ka_Khel.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/ganit/Adhyay_4_Aankadon_ka_Prabandhan_aur_Prastutikaran.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/ganit/Adhyay_5_Abhajya_Samay.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/ganit/Adhyay_6_Parimap_aur_Kshetraphal.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/ganit/Adhyay_7_Bheen.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/ganit/Adhyay_8_Rachnaon_ke_Sath_Khelna.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/ganit/Adhyay_9_Sammiti.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/ganit/Adhyay_10_Shunya_ke_Dusri_Ore.mp3"
    ],
    "chapterDurations": [
      "33:24",
      "1:31:17",
      "59:28",
      "1:22:02",
      "1:17:09",
      "52:40",
      "1:33:06",
      "1:03:04",
      "51:48",
      "1:56:10"
    ]
  },
  {
    "id": 607,
    "title": "खेल यात्रा",
    "author": "NCERT CIET",
    "category": "Class 6",
    "class": "Class 6",
    "subject": "PE & Well-being",
    "rating": 4.9,
    "reviews": "910",
    "duration": "11h 52m",
    "chaptersCount": 6,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/fhky1cc.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/khelyatrahi/bhag_1_sharirik_shiksha_or_aarogya_ka_mahtav.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/172",
    "description": "Official NCERT CIET Audio Book for Class 6 Physical Education and Well-being Hindi Medium 'Khel Yatra'. 6 अध्याय।",
    "chapters": [
      "अध्याय 1: स्वास्थ्य और फिटनेस",
      "अध्याय 2: योग और प्राणायाम",
      "अध्याय 3: खेल भावना",
      "अध्याय 4: संतुलित आहार",
      "अध्याय 5: खेलकूद के नियम",
      "अध्याय 6: मानसिक शांति व ध्यान"
    ],
    "progress": 0,
    "color": "from-green-500/20 to-emerald-600/20",
    "accent": "text-green-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/khelyatrahi/bhag_1_sharirik_shiksha_or_aarogya_ka_mahtav.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/khelyatrahi/bhag_2_gamak_dakashta.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/khelyatrahi/bhag_3_kho_kho_k_aadharbhut_kaushal.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/khelyatrahi/bhag_4_handball_k_aadharbhut_kaushal.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/khelyatrahi/bhag_5_yog.mp3"
    ],
    "chapterDurations": [
      "59:09",
      "2:03:38",
      "1:47:56",
      "1:57:30",
      "5:04:24"
    ]
  },
  {
    "id": 608,
    "title": "Khel Yatra",
    "author": "NCERT CIET",
    "category": "Class 6",
    "class": "Class 6",
    "subject": "PE & Well-being",
    "rating": 4.9,
    "reviews": "880",
    "duration": "3h 40m",
    "chaptersCount": 6,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/feky1cc.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/khelyatraen/khelYatra_Unit1_Importance_of_Physical_Education_and_Well_Being.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/173",
    "description": "Official NCERT CIET Audio Book for Class 6 Physical Education and Well-being 'Khel Yatra'. 6 chapters.",
    "chapters": [
      "Chapter 1: Physical Fitness Basics",
      "Chapter 2: Yoga and Breathing",
      "Chapter 3: Sportsmanship and Values",
      "Chapter 4: Balanced Diet & Wellness",
      "Chapter 5: Rules of Team Games",
      "Chapter 6: Mindfulness & Relaxation"
    ],
    "progress": 0,
    "color": "from-cyan-500/20 to-blue-600/20",
    "accent": "text-cyan-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/khelyatraen/khelYatra_Unit1_Importance_of_Physical_Education_and_Well_Being.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/khelyatraen/KhelYatra_Unit2_Motor_fitness.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/khelyatraen/KhelYatra_Unit_3_Fundamental_skills_Of_Kho-Kho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/khelyatraen/KhelYatra_Unit4_Fundamental_skills_of_Handball.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/khelyatraen/KhelYatra_Unit5_Yoga.mp3"
    ],
    "chapterDurations": [
      "13:39",
      "30:48",
      "32:07",
      "44:57",
      "1:39:05"
    ]
  },
  {
    "id": 609,
    "title": "Kriti",
    "author": "NCERT CIET",
    "category": "Class 6",
    "class": "Class 6",
    "subject": "Arts",
    "rating": 4.8,
    "reviews": "950",
    "duration": "10h 58m",
    "chaptersCount": 6,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/fekr1cc.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kriti/Ch1_Objects_and_still_Life.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/174",
    "description": "Official NCERT CIET Audio Book for Class 6 Arts 'Kriti'. 6 chapters.",
    "chapters": [
      "Chapter 1: Visual Art Forms",
      "Chapter 2: Melody and Rhythm",
      "Chapter 3: Traditional Indian Crafts",
      "Chapter 4: Folk Theatre",
      "Chapter 5: Classical Instruments",
      "Chapter 6: Indian Painting Traditions"
    ],
    "progress": 0,
    "color": "from-pink-500/20 to-rose-600/20",
    "accent": "text-pink-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kriti/Ch1_Objects_and_still_Life.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kriti/Ch2_Changing_the_typical_picture.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kriti/Ch3_portraying_People.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kriti/Ch4_Paper_Crafts.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kriti/Ch5_Seals_To_Prints.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kriti/Ch6_Music_and_your_Emotions.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kriti/Ch7_Musical_Instruments.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kriti/Ch8_Taal_or_Talam_and_Raga_or_Ragam.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kriti/Ch9_Melodies_of_Diversity.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kriti/Ch10_Songwriting.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kriti/Ch11_Music_and_Society.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kriti/Ch12_My_Body_in_Motion.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kriti/Ch13_Breaking_Barriers_with_Dance.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kriti/Ch14_Harmonn_in_motion.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kriti/Ch15_Dances_of_Our_Land.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kriti/Ch16_Emotions_Unveiled.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kriti/Ch17_Let’s_Design.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kriti/Ch18_In_the_Company_of_Theatre.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kriti/Ch19_Stories_of_Shadows_and_Strings_Puppetry.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kriti/Ch20_The_Grand_Finale.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kriti/Ch21_Integration_of_All_Art_Forms.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kriti/.mp3"
    ],
    "chapterDurations": [
      "34:44",
      "37:26",
      "18:38",
      "11:07",
      "19:42",
      "1:02:16",
      "22:29",
      "54:34",
      "39:48",
      "18:33",
      "12:46",
      "44:18",
      "17:50",
      "22:44",
      "22:48",
      "1:12:24",
      "1:02:01",
      "16:45",
      "35:15",
      "11:17",
      "21:21",
      "00:00"
    ]
  },
  {
    "id": 610,
    "title": "कृति",
    "author": "NCERT CIET",
    "category": "Class 6",
    "class": "Class 6",
    "subject": "Arts",
    "rating": 4.8,
    "reviews": "920",
    "duration": "11h 19m",
    "chaptersCount": 6,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/fhkr1cc.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kritihi/lesson_1_vastu_chitran.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/175",
    "description": "Official NCERT CIET Audio Book for Class 6 Arts Hindi Medium 'Kriti'. 6 अध्याय।",
    "chapters": [
      "अध्याय 1: दृश्य कला रूप",
      "अध्याय 2: स्वर और लय",
      "अध्याय 3: भारतीय हस्तशिल्प",
      "अध्याय 4: लोक नाट्य",
      "अध्याय 5: शास्त्रीय वाद्ययंत्र",
      "अध्याय 6: भारतीय चित्रकला परंपराएँ"
    ],
    "progress": 0,
    "color": "from-rose-500/20 to-purple-600/20",
    "accent": "text-rose-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kritihi/lesson_1_vastu_chitran.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kritihi/lesson_2_praroopi_chitr_me_badlav.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kritihi/lesson_3_vyakti_chitarn.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kritihi/lesson_4_kagaj_k_shilp.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kritihi/lesson_5_muhar_se_chapai_tak.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kritihi/lesson_7_vadyantra.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kritihi/lesson_8_tal_or_raag.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kritihi/lesson_9_bhartiya_sangeet_me_vividhta.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kritihi/lesson_10_geet_lekhan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kritihi/lesson_11sangeet_or_smaj.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kritihi/lesson_12_mera_sharirik_sanchlan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kritihi/lesson_13_nritya_k_madhyam_se_todna.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kritihi/lesson_14sanchalan_me_samnjysya.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kritihi/lesson_15_bhartiya_nritya.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kritihi/lesson_16_bhavo_ka_anawarn.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kritihi/lesson_17aaiye_design_bnaye.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kritihi/lesson_18_company_thearter_me.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kritihi/lesson_19_chaya_or_kthputliyon_ki_khaniyan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kritihi/lesson_20_bhvya_smapan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kritihi/lesson_21_kala_rupon_ka_akikarn.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/kritihi/lesson_22_mulyankan.mp3"
    ],
    "chapterDurations": [
      "36:59",
      "38:07",
      "19:36",
      "12:29",
      "20:32",
      "26:19",
      "43:44",
      "38:52",
      "18:16",
      "11:12",
      "41:26",
      "16:35",
      "20:44",
      "24:00",
      "1:13:09",
      "1:05:07",
      "16:47",
      "39:25",
      "11:28",
      "21:09",
      "1:23:48"
    ]
  },
  {
    "id": 611,
    "title": "समाज का अध्ययन: भारत और उसके आगे",
    "author": "NCERT CIET",
    "category": "Class 6",
    "class": "Class 6",
    "subject": "Social Science",
    "rating": 4.9,
    "reviews": "1,610",
    "duration": "8h 53m",
    "chaptersCount": 14,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/fhes1cc.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/samajka/Samajik_Adhyayn_Parichay.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/176",
    "description": "Official NCERT CIET Audio Book for Class 6 Social Science Hindi Medium 'Samaj Ka Adhyayan: Bharat Aur Uske Aage'. 14 अध्याय।",
    "chapters": [
      "अध्याय 1: पृथ्वी पर स्थानों की स्थिति",
      "अध्याय 2: महासागर और महाद्वीप",
      "अध्याय 3: स्थलरूप और जीवन",
      "अध्याय 4: इतिहास के स्रोत और कालक्रम",
      "अध्याय 5: भारत, जो कि भारत है",
      "अध्याय 6: भारतीय सभ्यता का प्रारंभ",
      "अध्याय 7: भारतीय संस्कृति की जड़ें",
      "अध्याय 8: अनेकता में एकता",
      "अध्याय 9: परिवार और समुदाय",
      "अध्याय 10: जमीनी स्तर पर लोकतंत्र - भाग 1 शासन",
      "अध्याय 11: जमीनी स्तर पर लोकतंत्र - भाग 2 ग्रामीण शासन",
      "अध्याय 12: जमीनी स्तर पर लोकतंत्र - भाग 3 शहरी शासन",
      "अध्याय 13: कार्य का महत्व",
      "अध्याय 14: हमारे आस-पास की आर्थिक गतिविधियाँ"
    ],
    "progress": 0,
    "color": "from-orange-500/20 to-amber-600/20",
    "accent": "text-orange-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/samajka/Samajik_Adhyayn_Parichay.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/samajka/Adhyay_1_Prithvi_par_Sthanon_ki_Stithi.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/samajka/Adhyay_2_Mahasagar_evam_Mahadweep.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/samajka/Adhyay_3_Sthalroop_evam_Jeevan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/samajka/Adhyay_4_Itihas_ki_Samay_Rekha_evam_uske_Strot.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/samajka/Adhyay_5_India_Arthat_Bharat.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/samajka/Adhyay_6_Bhartiya_Sabhyata_ka_Prarambh.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/samajka/Adhyay_7_Bharat_ki_Sanskrutik_Jadein.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/samajka/Adhyay_8_Vividhata_mein_Ekta_ya_Ek_mein_Anek.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/samajka/Adhyay_9_Parivar_aur_Samuday.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/samajka/Adhyay_10_Adharbhut_Loktantra_Bhag_1_Shashan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/samajka/Adhyay_11_Adharbhut_Loktantra_Bhag_2_Grameen_Kshetron_mein_Sthaniya_Sarkar.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/samajka/Adhyay_12_Adharbhut_Loktantra_Bhag_3_Nagariya_Kshetron_mein_Sthaniya_Sarkar.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/samajka/Adhyay_13_Karya_ka_Mahatva.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/samajka/Adhyay_14_Hamare_Aas_Pass_ki_Arthik_Gatividhiyan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/samajka/Shabdavali.mp3"
    ],
    "chapterDurations": [
      "14:26",
      "43:02",
      "27:53",
      "46:48",
      "36:55",
      "19:33",
      "37:14",
      "45:00",
      "30:32",
      "29:30",
      "34:59",
      "24:21",
      "24:00",
      "27:44",
      "35:54",
      "55:15"
    ]
  },
  {
    "id": 612,
    "title": "जिज्ञासा",
    "author": "NCERT CIET",
    "category": "Class 6",
    "class": "Class 6",
    "subject": "Science",
    "rating": 4.9,
    "reviews": "1,780",
    "duration": "14h 24m",
    "chaptersCount": 12,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/fhcu1cc.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/jigyasa/Jigyasa_chapter_1_vigyaan_ka_anutha_sansar.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/177",
    "description": "Official NCERT CIET Audio Book for Class 6 Science Hindi Medium 'Jigyasa'. पूरे 12 अध्याय।",
    "chapters": [
      "अध्याय 1: विज्ञान का अनूठा संसार",
      "अध्याय 2: सजीव जगत में विविधता",
      "अध्याय 3: उचित आहार - स्वस्थ शरीर का आधार",
      "अध्याय 4: चुंबकों का अन्वेषण",
      "अध्याय 5: लंबाई एवं गति का मापन",
      "अध्याय 6: हमारे आस-पास की सामग्री",
      "अध्याय 7: ताप एवं उसका मापन",
      "अध्याय 8: जल की अवस्थाओं की यात्रा",
      "अध्याय 9: दैनिक जीवन में पृथक्करण की विधियाँ",
      "अध्याय 10: सजीव - विशेषताओं का अन्वेषण",
      "अध्याय 11: प्रकृति की अमूल्य संपदा",
      "अध्याय 12: पृथ्वी से परे"
    ],
    "progress": 0,
    "color": "from-violet-500/20 to-purple-600/20",
    "accent": "text-violet-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/jigyasa/Jigyasa_chapter_1_vigyaan_ka_anutha_sansar.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/jigyasa/Jigyasa_chapter_2_sajeev_jagat_mein_vividhata.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/jigyasa/Jigyasa_chapter_3_uchit_aahar_swasth_sharir_ka_aadhar.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/jigyasa/Jigyasa_chapter_4_chumbko_ko_jaane.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/jigyasa/Jigyasa_chapter_5_Lambayi_eavm_gati_ka_mapan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/jigyasa/Jigyasa_chapter_6_hamaare_aas_paas_ki_samgri.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/jigyasa/Jigyasa_chapter_7_taap_eavm_uska_maapan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/jigyasa/Jigyasa_chapter_8_jal_ki_vividh_avsthaon_ki_yatra.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/jigyasa/Jigyasa_chapter_9_dainik_jeevan_mein_prathakkaran_vidhiyan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/jigyasa/Jigyasa_chapter_10_sajeev_visheshtaon_ka_anveshan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/jigyasa/Jigyasa_chapter_11_prakrti_ki_amulya_sanpada.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/jigyasa/Jigyasa_chapter_12_prathavi_se_pare.mp3"
    ],
    "chapterDurations": [
      "31:17",
      "2:54:53",
      "2:31:36",
      "39:10",
      "50:48",
      "55:50",
      "47:50",
      "1:00:57",
      "56:41",
      "1:21:21",
      "59:30",
      "54:16"
    ]
  },
  {
    "id": 701,
    "title": "Kaushal Bodh",
    "author": "NCERT CIET",
    "category": "Class 7",
    "class": "Class 7",
    "subject": "Vocational Education",
    "rating": 4.8,
    "reviews": "980",
    "duration": "17h 48m",
    "chaptersCount": 6,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/kaushalbodhclass7.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kaushal%20Bodh/Kaushal_Bodh_Class_7_%20Part_01_Work_with_Life_Forms_Project01_Plant_Nursery.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/135",
    "description": "Official NCERT CIET Audio Book for Class 7 Vocational Education 'Kaushal Bodh'. 6 chapters.",
    "chapters": [
      "Chapter 1: Technical Craftsmanship",
      "Chapter 2: Financial Literacy Basics",
      "Chapter 3: Sustainable Innovation",
      "Chapter 4: Basic Electrical Repairs",
      "Chapter 5: Agriculture & Gardening",
      "Chapter 6: Digital Communication"
    ],
    "progress": 0,
    "color": "from-teal-500/20 to-emerald-600/20",
    "accent": "text-teal-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kaushal%20Bodh/Kaushal_Bodh_Class_7_%20Part_01_Work_with_Life_Forms_Project01_Plant_Nursery.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kaushal%20Bodh/Kaushal_Bodh_Class_7_%20Part_01_Work_with_Life_Forms_Project02_School_Habitat_Garden.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kaushal%20Bodh/Kaushal_Bodh_Class_7_%20Part_02_Work_with_Machines_and_Materials_Project03_Tie_and_Dye.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kaushal%20Bodh/Kaushal_Bodh_Class_7_Part_02_Work_with_Machines_and_Materials_Project04_AI_Assistant.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kaushal%20Bodh/Kaushal_Bodh_Class_7_Part_03_Work_in_Human_Services_Project05_Storytime_with_Puppets.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kaushal%20Bodh/Kaushal_Bodh_Class_7_Part_03_Work_in_Human_Services_Project06_Family_Health_Handbook.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kaushal%20Bodh/Kaushal_Bodh_Class_7_Planning_for_Kaushal_Mela.mp3"
    ],
    "chapterDurations": [
      "2:02:36",
      "2:24:18",
      "1:05:31",
      "2:24:30",
      "3:03:42",
      "2:30:18",
      "4:17:52"
    ]
  },
  {
    "id": 702,
    "title": "Ganita Prakash -II",
    "author": "NCERT CIET",
    "category": "Class 7",
    "class": "Class 7",
    "subject": "Mathematics",
    "rating": 4.9,
    "reviews": "1,640",
    "duration": "8h 17m",
    "chaptersCount": 12,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/Ganit_Prakash_II.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Ganita%20Prakash%20II/Ganit_Prakash_II_(Mathematics_in_Eng.)%20Class_7_Chapter_02-Operations_with_Integers.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/137",
    "description": "Official NCERT CIET Audio Book for Class 7 Mathematics 'Ganita Prakash - II'. 12 authentic chapters.",
    "chapters": [
      "Chapter 1: Knowing Integers",
      "Chapter 2: Fractions and Decimals",
      "Chapter 3: Data Handling",
      "Chapter 4: Simple Equations",
      "Chapter 5: Lines and Angles",
      "Chapter 6: The Triangle and its Properties",
      "Chapter 7: Comparing Quantities",
      "Chapter 8: Rational Numbers",
      "Chapter 9: Perimeter and Area",
      "Chapter 10: Algebraic Expressions",
      "Chapter 11: Exponents and Powers",
      "Chapter 12: Symmetry"
    ],
    "progress": 0,
    "color": "from-amber-500/20 to-orange-600/20",
    "accent": "text-amber-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Ganita%20Prakash%20II/Ganit_Prakash_II_(Mathematics_in_Eng.)%20Class_7_Chapter_02-Operations_with_Integers.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Ganita%20Prakash%20II/Ganit_Prakash_II_(Mathematics_in_Eng.)_Class_7_Chapter_01-Geometric_Twins.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Ganita%20Prakash%20II/Ganit_Prakash_II_(Mathematics_in_Eng.)_Class_7_Chapter_03-Finding_Common_Ground.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Ganita%20Prakash%20II/Ganit_Prakash_II_(Mathematics_in_Eng.)_Class_7_Chapter_04-Another_Peek_Beyond_The_Point.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Ganita%20Prakash%20II/Ganit_Prakash_II_(Mathematics_in_Eng.)_Class_7_Chapter_05-Connecting_the_Dots.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Ganita%20Prakash%20II/Ganit_Prakash_II_(Mathematics_in_Eng.)_Class_7_Chapter_06-Constructions_and_Tilings.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Ganita%20Prakash%20II/Ganit_Prakash_II_(Mathematics_in_Eng.)_Class_7_Chapter_07-Finding_the_Unknown.mp3"
    ],
    "chapterDurations": [
      "1:10:52",
      "1:15:57",
      "1:10:51",
      "1:08:24",
      "1:09:50",
      "1:04:48",
      "1:16:21"
    ]
  },
  {
    "id": 703,
    "title": "जिज्ञासा",
    "author": "NCERT CIET",
    "category": "Class 7",
    "class": "Class 7",
    "subject": "Science",
    "rating": 4.9,
    "reviews": "1,810",
    "duration": "8h 52m",
    "chaptersCount": 13,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/Jiyasa_Science.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Jigyasa/Jigyasa_(Science)_Class_7_Chapter_01-Vigyan_ka_nirantar_badhta_sansar.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/139",
    "description": "Official NCERT CIET Audio Book for Class 7 Science Hindi Medium 'Jigyasa'. पूरे 13 अध्याय।",
    "chapters": [
      "अध्याय 1: पादपों में पोषण",
      "अध्याय 2: प्राणियों में पोषण",
      "अध्याय 3: ऊष्मा और ऊर्जा",
      "अध्याय 4: अम्ल, क्षारक और लवण",
      "अध्याय 5: भौतिक एवं रासायनिक परिवर्तन",
      "अध्याय 6: जीवों में श्वसन",
      "अध्याय 7: जंतुओं और पादपों में परिवहन",
      "अध्याय 8: पादप में जनन",
      "अध्याय 9: गति एवं समय",
      "अध्याय 10: विद्युत धारा और इसके प्रभाव",
      "अध्याय 11: प्रकाश और दर्पण",
      "अध्याय 12: वन - हमारी जीवन रेखा",
      "अध्याय 13: अपशिष्ट जल की कहानी"
    ],
    "progress": 0,
    "color": "from-purple-500/20 to-violet-600/20",
    "accent": "text-purple-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Jigyasa/Jigyasa_(Science)_Class_7_Chapter_01-Vigyan_ka_nirantar_badhta_sansar.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Jigyasa/Jigyasa_(Science)_Class_7_Chapter_02-Padarthon_ka_anveshan-amliya,khsariya_envm_udasin.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Jigyasa/JJigyasa_(Science)_Class_7_Chapter_03-Vidyut-Paripath_env_unke_ghatak.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Jigyasa/Jigyasa_(Science)_Class_7_Chapter_04-Dhatuon_aur_adhatuon_ka_sansar.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Jigyasa/Jigyasa_(Science)_Class_7_Chapter_05-Hmare_aas_paas_ke_parivartan-bhautik_env_rasaynik.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Jigyasa/Jigyasa_(Science)_Class_7_Chapter_06-Kishoravastha-Vridhi_env_parivartan_ki_avastha.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Jigyasa/Jigyasa_(Science)_Class_7_Chapter_07-Prakriti_mein_Ushma_ka_sthanantaran.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Jigyasa/Jigyasa_(Science)_Class_7_Chapter_08-Samay_env_gati_ka_maapan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Jigyasa/Jigyasa_(Science)_Class_7_Chapter_09-Jantuon_mein_jaiv_prakram.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Jigyasa/Jigyasa_(Science)_Class_7_Chapter_10-Padpon_mien_jaiv_prakram.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Jigyasa/Jigyasa_(Science)_Class_7_Chapter_11-Prakash-chhaya_env_pravartan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Jigyasa/Jigyasa_(Science)_Class_7_Chapter_12-Prithvi_chandrama_env_surya.mp3"
    ],
    "chapterDurations": [
      "12:02",
      "1:16:40",
      "00:00",
      "1:10:42",
      "39:15",
      "1:07:21",
      "30:54",
      "32:23",
      "1:14:26",
      "32:24",
      "46:35",
      "49:50"
    ]
  },
  {
    "id": 704,
    "title": "Kriti",
    "author": "NCERT CIET",
    "category": "Class 7",
    "class": "Class 7",
    "subject": "Arts",
    "rating": 4.8,
    "reviews": "990",
    "duration": "16h 34m",
    "chaptersCount": 6,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/Kriti_Arts.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Kriti/Kriti_(Artis)_Class_8_Chapter_01-Bringing_Words_Alive_Play_Reading.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/144",
    "description": "Official NCERT CIET Audio Book for Class 7 Arts 'Kriti'. 6 chapters.",
    "chapters": [
      "Chapter 1: Indian Classical Architecture",
      "Chapter 2: Regional Folk Arts",
      "Chapter 3: Music and Harmony",
      "Chapter 4: Theatre & Dramatic Expressions",
      "Chapter 5: Textiles and Weaving Arts",
      "Chapter 6: Art in Indian Festivals"
    ],
    "progress": 0,
    "color": "from-pink-500/20 to-rose-600/20",
    "accent": "text-pink-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Kriti/Kriti_(Artis)_Class_8_Chapter_01-Bringing_Words_Alive_Play_Reading.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Kriti/Kriti_(Artis)_Class_8_Chapter_02-One_Stage,Many_Script.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Kriti/Kriti_(Artis)_Class_8_Chapter_03-From_Page_to_Stage.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Kriti/Kriti_(Artis)_Class_8_Chapter_04-Applause_and_Advice.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Kriti/Kriti_(Artis)_Class_8_Chapter_05-Discovering_the_Elements_of_Music.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Kriti/Kriti_(Artis)_Class_8_Chapter_06-Musical_Instruments.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Kriti/Kriti_(Artis)_Class_8_Chapter_08-Inspiration%20and%20Imagination.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Kriti/Kriti_(Artis)_Class_8_Chapter_09-My%20World%20of%20Music.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Kriti/Kriti_(Artis)_Class_8_Chapter_12-Dance_for_Well-Being.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Kriti/Kriti_(Artis)_Class_8_Chapter_13-Innovation,_Inclusivity_and_Inspiring_Change.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Kriti/Kriti_(Artis)_Class_8_Chapter_14-A_Presentation_of_Dance_and_Choreography.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Kriti/Kriti_(Artis)_Class_8_Chapter_15-Elements_and_Principles_of_Visual_Arts_Design.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Kriti/Kriti_(Artis)_Class_8_Chapter_18-Arts_of_The_People_With_the_People,_for_The_People.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Kriti/Kriti_(Artis)_Class_8_Chapter_19-Campaign_for_Art_Awareness.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Kriti/Kriti_(Artis)_Class_8_Chapter_07-Indian_Classicalk_Music.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Kriti/Kriti_(Artis)_Class_8_Chapter_10-Inner_Dynamic_of_Dance.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Kriti/Kriti_(Artis)_Class_8_Chapter_11-Pan_India_Dance_Forms.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Kriti/Kriti_(Artis)_Class_8_Chapter_16-Still_Life_in_Colour.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Kriti/Kriti_(Artis)_Class_8_Chapter_17-People_in_Place.mp3"
    ],
    "chapterDurations": [
      "1:34:30",
      "36:56",
      "1:01:27",
      "46:54",
      "1:28:24",
      "43:23",
      "34:46",
      "48:05",
      "54:26",
      "43:04",
      "46:50",
      "1:05:21",
      "39:13",
      "40:33",
      "45:54",
      "1:08:48",
      "48:34",
      "38:31",
      "48:44"
    ]
  },
  {
    "id": 705,
    "title": "Exploring Society India and Beyond",
    "author": "NCERT CIET",
    "category": "Class 7",
    "class": "Class 7",
    "subject": "Social Science",
    "rating": 4.9,
    "reviews": "1,790",
    "duration": "10h 53m",
    "chaptersCount": 13,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/exploring7.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Exploring%20Society%20india/Exploring_society_India_and_Beyond_Class%207_Chapter_6_The_Age_of_Reorganisation.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/150",
    "description": "Official NCERT CIET Audio Book for Class 7 Social Science 'Exploring Society India and Beyond'. 13 chapters.",
    "chapters": [
      "Chapter 1: Tracing Changes Through a Thousand Years",
      "Chapter 2: New Kings and Kingdoms",
      "Chapter 3: The Delhi Sultans",
      "Chapter 4: The Mughal Empire",
      "Chapter 5: Architecture and Power",
      "Chapter 6: Towns, Traders and Craftspersons",
      "Chapter 7: Tribes, Nomads and Settled Communities",
      "Chapter 8: Environment and Resources",
      "Chapter 9: Inside Our Earth",
      "Chapter 10: Our Changing Earth",
      "Chapter 11: On Equality in Indian Democracy",
      "Chapter 12: Role of Government in Health",
      "Chapter 13: Markets Around Us"
    ],
    "progress": 0,
    "color": "from-blue-500/20 to-cyan-600/20",
    "accent": "text-blue-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Exploring%20Society%20india/Exploring_society_India_and_Beyond_Class%207_Chapter_6_The_Age_of_Reorganisation.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Exploring%20Society%20india/Exploring_society_India_and%20Beyond_Class_7_Chapter_7%20The_Gupta_Era_An_Age_of_Tireless_Creativity.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Exploring%20Society%20india/Exploring_society_India_and_Beyond_Class_7_Chapter_8_How_the_Land_Becomes_Sacred.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Exploring%20Society%20india/Exploring_society_India_and_Beyond_Class_7_Chapter_9%20From_the_Rulers_to_the_Ruled_Types_of_Governments.mp4.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Exploring%20Society%20india/Exploring_society_India_and_Beyond_Class_7_Chapter_10_The_Constitution_of_India — An_Introduction.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Exploring%20Society%20india/Exploring_society_India_and_Beyond_Class_7_Chapter_11_From_Barter_to_Money.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Exploring%20Society%20india/Exploring_society_India_and_Beyond_Class_7_Chapter_12_Understanding_Markets.mp3"
    ],
    "chapterDurations": [
      "2:09:03",
      "1:50:05",
      "1:26:28",
      "1:16:33",
      "59:26",
      "50:48",
      "2:21:22"
    ]
  },
  {
    "id": 706,
    "title": "Poorvi",
    "author": "NCERT CIET",
    "category": "Class 7",
    "class": "Class 7",
    "subject": "English",
    "rating": 4.9,
    "reviews": "1,850",
    "duration": "10h 45m",
    "chaptersCount": 10,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/poorvi7.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Poorvi/Poorvi_Class_7_Unit-1_Learning_Together_Chapter-1_The_Day_the_River_Spoke.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/151",
    "description": "Official NCERT CIET Audio Book for Class 7 English 'Poorvi'. 10 complete chapters.",
    "chapters": [
      "Unit 1: Wisdom and Wit",
      "Unit 2: The Spirit of Exploration",
      "Unit 3: Harmony with Nature",
      "Unit 4: Inspiring Lives",
      "Unit 5: The Squirrel's Secret",
      "Unit 6: Gift of Chappals",
      "Unit 7: Trees and Forests",
      "Unit 8: Quality of Craft",
      "Unit 9: Fire Friend and Foe",
      "Unit 10: Meadow Surprises"
    ],
    "progress": 0,
    "color": "from-indigo-500/20 to-blue-600/20",
    "accent": "text-indigo-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Poorvi/Poorvi_Class_7_Unit-1_Learning_Together_Chapter-1_The_Day_the_River_Spoke.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Poorvi/Poorvi_Class_7_Unit-1_Learning_Together_Chapter-2_Try_Again.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Poorvi/Poorvi_Class_7_Unit-1_Learning_Together_Chapter-3_Three_Days_to_See.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Poorvi/Poorvi_Class_7_Unit-2_Wit_and_Humour_Chapter-1_Animals,_Birds,_and_Dr._Dolittle.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Poorvi/Poorvi_Class_7_Unit-2_Wit_and_Humour_Chapter-2_A_Funny_Man.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Poorvi/Poorvi_Class_7_Unit-2_Wit_and_Humour_Chapter-3_Say_the_Right_Thing.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Poorvi/Poorvi_Class_7_Unit-3%20Dreams_and_Discoveries_Chapter-3_North,%20South,_East,_West.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Poorvi/Poorvi_Class_7_Unit-3_Dreams_and_Discoveries_Chapter-1_My_Brother’s_Great_Invention.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Poorvi/Poorvi_Class_7_Unit-3_Dreams_and_Discoveries_Chapter-2_Paper_Boats.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Poorvi/Poorvi_Class_7_Unit-4_Travel_and_Adventure_Chapter-1_The_Tunnel.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Poorvi/Poorvi_Class_7_Unit-4_Travel_and_Adventure_Chapter-2_Travel.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Poorvi/Poorvi_Class_7_Unit-4_Travel_and_Adventure_Chapter-3_Conquering_the_Summit.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Poorvi/Poorvi_Class_7_Unit-5_Bravehearts_Chapter-1_A_Homage_to_Our_Brave_Soldiers.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Poorvi/Poorvi_Class_7_Unit-5_Bravehearts_Chapter-2_My_Dear_Soldiers.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Poorvi/Poorvi_Class_7_Unit-5_Bravehearts_Chapter-3_Rani_Abbakka.mp3"
    ],
    "chapterDurations": [
      "44:11",
      "30:09",
      "43:08",
      "36:21",
      "58:57",
      "04:08",
      "1:03:09",
      "51:49",
      "22:26",
      "1:04:44",
      "36:49",
      "47:10",
      "1:11:41",
      "22:52",
      "47:45"
    ]
  },
  {
    "id": 707,
    "title": "Curiosity",
    "author": "NCERT CIET",
    "category": "Class 7",
    "class": "Class 7",
    "subject": "Science",
    "rating": 4.9,
    "reviews": "1,920",
    "duration": "15h 33m",
    "chaptersCount": 13,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/curiosity7.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Curiosity/Curiosity%20(Science)%20Class_7_Chapter_07%20-%20Heat_Transfer_in_Nature.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/152",
    "description": "Official NCERT CIET Audio Book for Class 7 Science 'Curiosity'. All 13 chapters.",
    "chapters": [
      "Chapter 1: Nutrition in Plants",
      "Chapter 2: Nutrition in Animals",
      "Chapter 3: Heat and Temperature",
      "Chapter 4: Acids, Bases and Salts",
      "Chapter 5: Physical and Chemical Changes",
      "Chapter 6: Respiration in Organisms",
      "Chapter 7: Transportation in Animals and Plants",
      "Chapter 8: Reproduction in Plants",
      "Chapter 9: Motion and Time",
      "Chapter 10: Electric Current and its Effects",
      "Chapter 11: Light and Mirrors",
      "Chapter 12: Forests: Our Lifeline",
      "Chapter 13: Wastewater Story"
    ],
    "progress": 0,
    "color": "from-violet-500/20 to-purple-600/20",
    "accent": "text-violet-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Curiosity/Curiosity%20(Science)%20Class_7_Chapter_07%20-%20Heat_Transfer_in_Nature.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Curiosity/Curiosity_(Science)%20Class_7_Chapter_08%20-%20Measurement_of_Time_and_Motion.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Curiosity/Curiosity_(Science)_Class%20_7_Chapter_09_Life_Processes_in_Animals.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Curiosity/Curiosity_(Science)_Class%20_7_Chapter_10_Life_Processes_in_Plants.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Curiosity/Curiosity_(Science)%20Class_7_Chapter_06_Adolescence_A_Stage_of_Growth_and_Change.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Curiosity/Curiosity_(Science)_Class%20_7_Chapter_11%20-%20Light_Shadows_and_Reflections.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Curiosity/Curiosity_(Science)_Class%20_7_Chapter_12%20-%20Earth,_Moon,_and_the_Sun.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Curiosity/Curiosity_(Science)_Class_7_Chapter_01-The_Ever-Evolving_World_of_Science.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Curiosity/Curiosity_(Science)_Class_7_Chapter_02-Exploring_Substances_Acidic,_Basic,_and_Neutral.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Curiosity/Curiosity_(Science)_Class_7_Chapter_03-Electricity_Circuits_and_their_Components.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Curiosity/Curiosity_(Science)_Class_7_Chapter_04-The_World_of_Metals_and_Non-metals.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Curiosity/Curiosity_(Science)_Class_7_Chapter_05-Changes_Around_Us_Physical_and_Chemical.mp3"
    ],
    "chapterDurations": [
      "1:04:21",
      "59:19",
      "1:07:57",
      "1:03:22",
      "59:19",
      "2:11:37",
      "1:07:37",
      "18:17",
      "1:45:35",
      "59:49",
      "2:04:36",
      "1:51:19"
    ]
  },
  {
    "id": 708,
    "title": "Khayal خیال",
    "author": "NCERT CIET",
    "category": "Class 7",
    "class": "Class 7",
    "subject": "Urdu",
    "rating": 4.8,
    "reviews": "710",
    "duration": "10h 54m",
    "chaptersCount": 8,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/khayal7.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Khayal/Khayal_(Urdu)_Class_7_Chapter_01_Tarana_e_Wahdat.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/153",
    "description": "Official NCERT CIET Audio Book for Class 7 Urdu 'Khayal'. 8 chapters.",
    "chapters": [
      "Sabak 1: Hamd e Bari Taala",
      "Sabak 2: Insan Aur Nature",
      "Sabak 3: Taleem Ka Maqsad",
      "Sabak 4: Taraqqi Ki Rahen",
      "Sabak 5: Urdu Shairi Ka Husn",
      "Sabak 6: Sacche Rahnay Ki Barkat",
      "Sabak 7: Hindustan Ka Qudrati Husn",
      "Sabak 8: Aao Ilm Hasil Karein"
    ],
    "progress": 0,
    "color": "from-purple-500/20 to-pink-600/20",
    "accent": "text-purple-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Khayal/Khayal_(Urdu)_Class_7_Chapter_01_Tarana_e_Wahdat.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Khayal/Khayal_(Urdu)_Class_7_Chapter_02_Ek_purani_kahani.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Khayal/Khayal_(Urdu)_Class_7_Chapter_03_Paheli_Udaan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Khayal/Khayal_(Urdu)_Class_7_Chapter_04_Pani.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Khayal/Khayal_(Urdu)_Class_7_Chapter_05_Jugnoo.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Khayal/Khayal_(Urdu)_Class_7_Chapter_06_Budhi_Amma_ki_Baat.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Khayal/Khayal_(Urdu)_Class_7_Chapter_07_Brig_Mohd_Usman.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Khayal/Khayal_(Urdu)_Class_7_Chapter_08_Kadam_Badhao_Doston.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Khayal/Khayal_(Urdu)_Class_7_Chapter_09_Dr.%20Sarvapalli_Radhakrishnan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Khayal/Khayal_(Urdu)_Class_7_Chapter_10_Chitioyon%20Ki_Kataar.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Khayal/Khayal_(Urdu)_Class_7_Chapter_11_Do_Bailo_Ki_Kahani.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Khayal/Khayal_(Urdu)_Class_7_Chapter_12_Hamare%20Khel.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Khayal/Khayal_(Urdu)_Class_7_Chapter_13_Jhalkari_Bai.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Khayal/Khayal_(Urdu)_Class_7_Chapter_14_Digital_Technology.mp3"
    ],
    "chapterDurations": [
      "35:52",
      "42:37",
      "1:03:50",
      "49:12",
      "30:02",
      "48:39",
      "58:43",
      "27:18",
      "50:23",
      "34:31",
      "56:08",
      "57:40",
      "45:37",
      "53:43"
    ]
  },
  {
    "id": 709,
    "title": "दीपकम्",
    "author": "NCERT CIET",
    "category": "Class 7",
    "class": "Class 7",
    "subject": "Sanskrit",
    "rating": 4.8,
    "reviews": "1,150",
    "duration": "7h 11m",
    "chaptersCount": 8,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/deepakam7.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Deepakam/Deepkam_(Sanskrit)_Class_7_Chapter_06%20_Kridam_Vayam_Slokantyashrimahpng.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/154",
    "description": "Official NCERT CIET Audio Book for Class 7 Sanskrit 'Deepakam'. 8 संस्कृत अध्याय।",
    "chapters": [
      "पाठ 1: सुभाषितानि",
      "पाठ 2: दुर्बुद्धिः विनश्यति",
      "पाठ 3: स्वावलंबनम्",
      "पाठ 4: सदाचारः",
      "पाठ 5: पण्डिता रमाबाई",
      "पाठ 6: संकल्पः सिद्धिदायकः",
      "पाठ 7: विद्याधनम्",
      "पाठ 8: अमृतं संस्कृतम्"
    ],
    "progress": 0,
    "color": "from-amber-500/20 to-yellow-600/20",
    "accent": "text-amber-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Deepakam/Deepkam_(Sanskrit)_Class_7_Chapter_06%20_Kridam_Vayam_Slokantyashrimahpng.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Deepakam/Deepkam_(Sanskrit)_Class_7_Chapter_07_Irshavasyam_Idam_Sarvam_png.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Deepakam/Deepkam_(Sanskrit)_Class_7_Chapter%2008_Hitam_Manohari_Cha_Durlabh_Vach_png.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Deepakam/Deepkam_(Sanskrit)_Class_7_Chapter_09_Annaad_Bhavanti_Bhutani_png.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Deepakam/Deepkam_(Sanskrit)_Class_7_Chapter_10_Dasham_Kah_png.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Deepakam/Deepkam_(Sanskrit)_Class_7_Chapter_11_%20Dwepeshu_ramyah_dweepoandmaanah.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Deepakam/Deepkam_(Sanskrit)_Class_7_Chapter_12%20_Virangna_Pannadhaya_png.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Deepakam/Deepkam_(Sanskrit)_Class_7_Chapter_13_%20Atiriktam_Adhyynam(Varnmatra_Parichyh).mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Deepakam/Deepkam_(Sanskrit)_Class_7_Chapter_14_Parishishtam_1_(Shabdrupani).mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Deepakam/Deepkam_(Sanskrit)_Class_7_Chapter_15_Parishishtam-2_(Dhaturupani).mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Deepakam/Deepkam_(Sanskrit)_Class_7_Chapter_01-Vande_Matram.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Deepakam/Deepkam_(Sanskrit)_Class_7_Chapter_02-Nityam_Pibamah_Subhashitarsam.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Deepakam/Deepkam_(Sanskrit)_Class_7_Chapter_03-Mitray_Namh.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Deepakam/Deepkam_(Sanskrit)_Class_7_Chapter_04-Na_Labhyate_Cheta_Amlam_Drakshafalam.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Deepakam/Deepkam_(Sanskrit)_Class_7_Chapter_05-Sewa_Hi_Parmo_Dharmah.mp3"
    ],
    "chapterDurations": [
      "41:53",
      "36:31",
      "24:13",
      "23:45",
      "29:03",
      "25:36",
      "25:31",
      "30:25",
      "26:37",
      "27:07",
      "35:23",
      "30:24",
      "25:21",
      "25:21",
      "24:11"
    ]
  },
  {
    "id": 710,
    "title": "Ganita Prakash",
    "author": "NCERT CIET",
    "category": "Class 7",
    "class": "Class 7",
    "subject": "Mathematics",
    "rating": 4.9,
    "reviews": "1,580",
    "duration": "13h 13m",
    "chaptersCount": 12,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/ganitprakash7.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Ganita%20Prakash/Chapter_01_Large_Numbers_Around_Us.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/155",
    "description": "Official NCERT CIET Audio Book for Class 7 Mathematics 'Ganita Prakash'. 12 chapters.",
    "chapters": [
      "Chapter 1: Rational Numbers",
      "Chapter 2: Practical Geometry",
      "Chapter 3: Symmetry and Transformations",
      "Chapter 4: Perimeter and Area",
      "Chapter 5: Linear Equations",
      "Chapter 6: Comparing Quantities",
      "Chapter 7: Angles and Parallel Lines",
      "Chapter 8: Data Representation",
      "Chapter 9: Exponents",
      "Chapter 10: Fractions and Proportions",
      "Chapter 11: Visualising Solid Shapes",
      "Chapter 12: Algebraic Formulas"
    ],
    "progress": 0,
    "color": "from-orange-500/20 to-amber-600/20",
    "accent": "text-orange-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Ganita%20Prakash/Chapter_01_Large_Numbers_Around_Us.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Ganita%20Prakash/Chapter_02_Arithmetic_Expressions.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Ganita%20Prakash/Chapter_03_A_Peek_Beyond_the_Point.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Ganita%20Prakash/Chapter_04_Expressions_using_Letter_Numbers.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Ganita%20Prakash/Chapter_05_Parallel_and_Intersecting_Lines.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Ganita%20Prakash/Chapter_06_Number_Play.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Ganita%20Prakash/Chapter_07_A_Tale_of_Three_Intersecting_Lines.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Ganita%20Prakash/Chapter_08_Working_with_Fractions.mp3"
    ],
    "chapterDurations": [
      "1:38:50",
      "1:41:21",
      "2:22:13",
      "1:52:43",
      "1:21:47",
      "1:25:31",
      "1:23:46",
      "1:27:24"
    ]
  },
  {
    "id": 711,
    "title": "मल्हार",
    "author": "NCERT CIET",
    "category": "Class 7",
    "class": "Class 7",
    "subject": "Hindi",
    "rating": 4.9,
    "reviews": "1,690",
    "duration": "6h 56m",
    "chaptersCount": 10,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/malhar7.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Malhar/Malhaar(Hindi)_Class_7_Chapter_06_giridhar_kaviraoy_ki_kundliyan.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/156",
    "description": "Official NCERT CIET Audio Book for Class 7 Hindi 'Malhar'. 10 अध्याय।",
    "chapters": [
      "पाठ 1: हम पंछी उन्मुक्त गगन के",
      "पाठ 2: हिमालय की बेटियाँ",
      "पाठ 3: कठपुतली",
      "पाठ 4: मिठाईवाला",
      "पाठ 5: रक्त और हमारा शरीर",
      "पाठ 6: पापा खो गए",
      "पाठ 7: शाम एक किसान",
      "पाठ 8: चिड़िया की बच्ची",
      "पाठ 9: अपूर्व अनुभव",
      "पाठ 10: भोर और बरखा"
    ],
    "progress": 0,
    "color": "from-emerald-500/20 to-teal-600/20",
    "accent": "text-emerald-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Malhar/Malhaar(Hindi)_Class_7_Chapter_06_giridhar_kaviraoy_ki_kundliyan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Malhar/Malhaar(Hindi)_Class_7_Chapter_07_varsha_bhar_kavita.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Malhar/Malhaar(Hindi)_Class_7_Chapter_08_birju_maharaj_se_sakshtkar.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Malhar/Malhaar(Hindi)_Class_7_Chapter_09_chidiya.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Malhar/Malhaar_(Hindi)_Class_7_Chapter_01_Maa_kah_ek_kahani.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Malhar/Malhaar_(Hindi)_Class_7_Chapter_02_teen_Budhimaan_loka_katha.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Malhar/Malhaar_(Hindi)_Class_7_Chapter_03_fool_aur_kante.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Malhar/Malhaar_(Hindi)_Class_7_Chapter_04_paani_re_paani_(nibandh).mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Malhar/Malhaar_(Hindi)_Class_7_Chapter_05_nahin_hona_bimaar_(kahani).mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Malhar/Malhaar(Hindi)_Class_7_Chapter_10_Meera_ke_pad.mp3"
    ],
    "chapterDurations": [
      "28:38",
      "34:45",
      "53:26",
      "30:30",
      "32:23",
      "40:08",
      "32:22",
      "43:59",
      "41:11",
      "1:18:59"
    ]
  },
  {
    "id": 712,
    "title": "कृति",
    "author": "NCERT CIET",
    "category": "Class 7",
    "class": "Class 7",
    "subject": "Arts",
    "rating": 4.8,
    "reviews": "910",
    "duration": "9h 9m",
    "chaptersCount": 6,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/kriti7.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kriti/Kriti_(Arts)_Class_7_Chapter_01_Understanding_Emotions_png_.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/149",
    "description": "Official NCERT CIET Audio Book for Class 7 Arts Hindi Medium 'Kriti'. 6 अध्याय।",
    "chapters": [
      "अध्याय 1: भारतीय शास्त्रीय वास्तुकला",
      "अध्याय 2: क्षेत्रीय लोक कलाएँ",
      "अध्याय 3: संगीत और सामंजस्य",
      "अध्याय 4: रंगमंच और नाट्य कला",
      "अध्याय 5: वस्त्र बुनाई कला",
      "अध्याय 6: भारतीय पर्वों की कलाकारी"
    ],
    "progress": 0,
    "color": "from-rose-500/20 to-purple-600/20",
    "accent": "text-rose-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kriti/Kriti_(Arts)_Class_7_Chapter_01_Understanding_Emotions_png_.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kriti/Kriti_(Arts)_Class_7_Chapter_02_Say_More_Without_Speech_MIME_png_.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kriti/Kriti_(Arts)_Class_7_Chapter_03_Let’s_Design_Stage_Technicals_2_png_.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kriti/Kriti_(Arts)_Class_7_Chapter_04%20_Story_of_India’s_Storytelling_Traditions_png_.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kriti/Kriti_(Arts)_Class_7_Chapter_05_%20Making_Music_png_.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kriti/Kriti_(Arts)_Class%207_Chapter_06_Music,_Emotions_and_Creativity.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kriti/Kriti_(Arts)_Class_7_Chapter%2008_The_Music_of_the_People.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kriti/Kriti_(Arts)_Class_7_Chapter_09_Performance.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kriti/Kriti_(Arts)_Class_7_Chapter_11_Dance_Cocabulary_and_Techniques.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kriti/Kriti_(Arts)_Class_7_Chapter_12_Dance,_You_and_Creativity.mp4.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kriti/Kriti_(Arts)_Class_7_Chapter_13_Personalityes.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kriti/Kriti_(Arts)_Class_7_Chapter_15_Objects_in_Icons_and_Symbols.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kriti/Kriti_(Arts)_Class_7_Chapter_19_The_Arts_of_Calligraphy.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kriti/Kriti_(Arts)_Class7_Chapter_17_How_You_Feel.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kriti/Kriti_(Arts)_Class%207_Chapter_20_Integration_of_all_Art_Forms_Sculptures_come_Alive.mp3"
    ],
    "chapterDurations": [
      "1:00:11",
      "28:36",
      "56:01",
      "25:55",
      "35:16",
      "23:07",
      "35:48",
      "20:34",
      "36:36",
      "22:01",
      "07:13",
      "1:32:02",
      "44:34",
      "52:18",
      "08:42"
    ]
  },
  {
    "id": 713,
    "title": "कौशल बोध",
    "author": "NCERT CIET",
    "category": "Class 7",
    "class": "Class 7",
    "subject": "Vocational Education",
    "rating": 4.8,
    "reviews": "890",
    "duration": "55m",
    "chaptersCount": 6,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/Kaushal_Bodh.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kaushal%20Bodh/Kaushal_Bodh_Class_8_Part_1_Work_with_life_forms_Project_01-Hydroponics-Growing_Plants_without_Soil.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/136",
    "description": "Official NCERT CIET Audio Book for Class 7 Vocational Education Hindi Medium 'Kaushal Bodh'. 6 अध्याय।",
    "chapters": [
      "अध्याय 1: तकनीकी हस्तशिल्प",
      "अध्याय 2: वित्तीय साक्षरता",
      "अध्याय 3: सतत नवाचार",
      "अध्याय 4: बुनियादी विद्युत सुधार",
      "अध्याय 5: कृषि एवं बागवानी कौशल",
      "अध्याय 6: डिजिटल साक्षरता और संचार"
    ],
    "progress": 0,
    "color": "from-emerald-500/20 to-green-600/20",
    "accent": "text-emerald-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kaushal%20Bodh/Kaushal_Bodh_Class_8_Part_1_Work_with_life_forms_Project_01-Hydroponics-Growing_Plants_without_Soil.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kaushal%20Bodh/Kaushal_Bodh_Class_8_Part_1_Work_with_life_forms_Project_02-Feeding_and_Carring_for_Farm_Animals.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kaushal%20Bodh/Kaushal_Bodh_Class_8_Part_2_Work_with_Machines_and_Materials_Project_03-Working_with_Wood_and_Bamboo.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kaushal%20Bodh/Kaushal_Bodh_Class_8_Part_2_Work_with_Machines_and_Materials_Project_04-Home_Automation.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kaushal%20Bodh/Kaushal_Bodh_Class_8_Part_3_Work_in_Human_Services_Project_05-Water_Audit_for_Water_Management.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kaushal%20Bodh/Kaushal_Bodh_Class_8_Part_3_Work_in_Human_Services_Project_06-Creating_Advertisements.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kaushal%20Bodh/Kaushal_Bodh_Class_8_Part_3_Work_in_Human_Services_Project_07-Planning_for_Kaushal_mela.mp3"
    ],
    "chapterDurations": [
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00"
    ]
  },
  {
    "id": 714,
    "title": "गणित प्रकाश",
    "author": "NCERT CIET",
    "category": "Class 7",
    "class": "Class 7",
    "subject": "Mathematics",
    "rating": 4.9,
    "reviews": "1,480",
    "duration": "5h 25m",
    "chaptersCount": 12,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/ghgp1cc.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Ganit_prakash_hindi/ganitPrakash_part1_class7_chapter1_hmare_aas_pas_ki_badi_snkhyayen.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/185",
    "description": "Official NCERT CIET Audio Book for Class 7 Mathematics Hindi Medium 'Ganita Prakash'. 12 अध्याय।",
    "chapters": [
      "अध्याय 1: पूर्णांकों की समझ",
      "अध्याय 2: भिन्न और दशमलव",
      "अध्याय 3: आँकड़ों का प्रबंधन",
      "अध्याय 4: सरल समीकरण",
      "अध्याय 5: रेखाएँ और कोण",
      "अध्याय 6: त्रिभुज और उसके गुण",
      "अध्याय 7: राशियों की तुलना",
      "अध्याय 8: परिमेय संख्याएँ",
      "अध्याय 9: परिमाप और क्षेत्रफल",
      "अध्याय 10: बीजीय व्यंजक",
      "अध्याय 11: घातांक और घात",
      "अध्याय 12: सममिति"
    ],
    "progress": 0,
    "color": "from-amber-500/20 to-orange-600/20",
    "accent": "text-amber-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Ganit_prakash_hindi/ganitPrakash_part1_class7_chapter1_hmare_aas_pas_ki_badi_snkhyayen.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Ganit_prakash_hindi/ganitPrakash_part1_class7_chapter2_ankgantiye_vynajak.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Ganit_prakash_hindi/ganitPrakash_part1_class7_chapter3_bindu_se_pre_ek_drishti.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Ganit_prakash_hindi/ganitPrakash_part1_class7_chapter4_akasr_sankhayano_k_upuogi_vyanjak.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Ganit_prakash_hindi/ganitPrakash_part1_class7_chapter5_smantar_aur_prtichedi_rekhyan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Ganit_prakash_hindi/ganitPrakash_part1_class7_chapter6_sankhyaon_ka_khel.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Ganit_prakash_hindi/ganitPrakash_part1_class7_chapter7_teen_prtichedi_rekhaon_ki_ek_katha.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Ganit_prakash_hindi/ganitPrakash_part1_class7_chapter8_bhino_k_sath_karya_karna.mp3"
    ],
    "chapterDurations": [
      "39:41",
      "37:22",
      "53:51",
      "39:31",
      "42:25",
      "28:33",
      "31:37",
      "52:29"
    ]
  },
  {
    "id": 801,
    "title": "Curiosity",
    "author": "NCERT CIET",
    "category": "Class 8",
    "class": "Class 8",
    "subject": "Science",
    "rating": 4.9,
    "reviews": "2,110",
    "duration": "15h 22m",
    "chaptersCount": 13,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/curiosityclass8.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/CuriosityScience/Curiosity(Science)%20_Class_8_Chapter_1_Exploring_the_Investigative_World_of%20_Science.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/128",
    "description": "Official NCERT CIET Audio Book for Class 8 Science 'Curiosity'. All 13 authentic chapters.",
    "chapters": [
      "Chapter 1: Crop Production & Management",
      "Chapter 2: Microorganisms: Friends & Foes",
      "Chapter 3: Coal and Petroleum",
      "Chapter 4: Combustion & Flame",
      "Chapter 5: Conservation of Plants and Animals",
      "Chapter 6: Reproduction in Animals",
      "Chapter 7: Reaching the Age of Adolescence",
      "Chapter 8: Force and Pressure",
      "Chapter 9: Friction",
      "Chapter 10: Sound",
      "Chapter 11: Chemical Effects of Electric Current",
      "Chapter 12: Some Natural Phenomena",
      "Chapter 13: Light"
    ],
    "progress": 0,
    "color": "from-purple-500/20 to-violet-600/20",
    "accent": "text-purple-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/CuriosityScience/Curiosity(Science)%20_Class_8_Chapter_1_Exploring_the_Investigative_World_of%20_Science.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/CuriosityScience/Curiosity(Science)_Class8_Chapter_2_The_Invisible_Living_World_Beyond_Our_Naked_Eye.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/CuriosityScience/Curiosity(Science)_Class_8_Chapter_3_Health_The_Ultimate_Treasure.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/CuriosityScience/Curiosity(Science)_Class_8_Chapter_4_Electricity_Magnetic_and_Heating_Effects.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/CuriosityScience/Curiosity(Science)_Class_8_Chapter_5_Exploring_Forces.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/CuriosityScience/Curiosity(Science)_Class_8_Chapter_6_Pressure_Winds_Storms_an_%20Cyclones.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/CuriosityScience/Curiosity(Science)_Class_8_Chapter_7_Particulate_Nature_of_Matter.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/CuriosityScience/Curiosity(Science)_Class_8_Chapter_8_Nature_of_Matter_Elements_Compounds_and_Mixtures.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/CuriosityScience/Curiosity(Science)_Class_8_Chapter_9_The_Amazing_World_of_Solutes_Solvents_and_Solutions.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/CuriosityScience/Curiosity(Science)_Class_8_Chapter_10_Light_Mirrors_and_Lenses.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/CuriosityScience/Curiosity(Science)_Class_8_Chapter_11_Keeping_Time_with_the_Skies.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/CuriosityScience/Curiosity(Science)_Class_8_Chapter_12_How_Nature_Works_in_Harmony.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/CuriosityScience/Curiosity(Science)_Class_8_Chapter_13_Our_Home_Earth_a_Unique_Life_Sustaining_Planet.mp3"
    ],
    "chapterDurations": [
      "58:11",
      "1:01:49",
      "1:02:26",
      "57:11",
      "1:03:28",
      "1:06:23",
      "43:41",
      "51:04",
      "52:27",
      "47:42",
      "2:32:16",
      "2:27:06",
      "58:59"
    ]
  },
  {
    "id": 802,
    "title": "Poorvi",
    "author": "NCERT CIET",
    "category": "Class 8",
    "class": "Class 8",
    "subject": "English",
    "rating": 4.9,
    "reviews": "1,980",
    "duration": "21h 3m",
    "chaptersCount": 10,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/poorviclass8.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Poorvi/Poorvi_Class_8_Unit_1_Wit_and_Wisdom.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/129",
    "description": "Official NCERT CIET Audio Book for Class 8 English 'Poorvi'. 10 chapters.",
    "chapters": [
      "Unit 1: Values and Choices",
      "Unit 2: Horizons of Technology",
      "Unit 3: Cultural Tapestries",
      "Unit 4: Courage and Resilience",
      "Unit 5: The Best Christmas Present in the World",
      "Unit 6: The Tsunami",
      "Unit 7: Glimpses of the Past",
      "Unit 8: Bepin Choudhury's Lapse of Memory",
      "Unit 9: The Summit Within",
      "Unit 10: This is Jody's Fawn"
    ],
    "progress": 0,
    "color": "from-blue-500/20 to-indigo-600/20",
    "accent": "text-blue-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Poorvi/Poorvi_Class_8_Unit_1_Wit_and_Wisdom.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Poorvi/Poorvi_Class_8_Unit_2_Values_and_Dispositions.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Poorvi/Poorvi_Class_8_Unit_3_Mystery_and_Magic.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Poorvi/Poorvi_Class_8_Unit_4_Enviroment.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Poorvi/Poorvi_Class_8_Unit_5_Science_and_Curiosity.mp3"
    ],
    "chapterDurations": [
      "3:06:11",
      "4:49:08",
      "4:58:52",
      "4:40:41",
      "3:28:12"
    ]
  },
  {
    "id": 803,
    "title": "Ganita Prakash",
    "author": "NCERT CIET",
    "category": "Class 8",
    "class": "Class 8",
    "subject": "Mathematics",
    "rating": 4.9,
    "reviews": "1,820",
    "duration": "11h 16m",
    "chaptersCount": 13,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/ganitaprakashclass8.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Ganit%20Prakash/Ganit_Prakash_Class_8_Chapter_1_A_Square_and_a_Cube.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/130",
    "description": "Official NCERT CIET Audio Book for Class 8 Mathematics 'Ganita Prakash'. All 13 chapters.",
    "chapters": [
      "Chapter 1: Rational Numbers",
      "Chapter 2: Linear Equations in One Variable",
      "Chapter 3: Understanding Quadrilaterals",
      "Chapter 4: Data Handling",
      "Chapter 5: Squares and Square Roots",
      "Chapter 6: Cubes and Cube Roots",
      "Chapter 7: Comparing Quantities",
      "Chapter 8: Algebraic Expressions and Identities",
      "Chapter 9: Mensuration",
      "Chapter 10: Exponents and Powers",
      "Chapter 11: Direct and Inverse Proportions",
      "Chapter 12: Factorisation",
      "Chapter 13: Introduction to Graphs"
    ],
    "progress": 0,
    "color": "from-amber-500/20 to-orange-600/20",
    "accent": "text-amber-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Ganit%20Prakash/Ganit_Prakash_Class_8_Chapter_1_A_Square_and_a_Cube.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Ganit%20Prakash/Ganit_Prakash_Class_8_Chapter_2_Power_Play.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Ganit%20Prakash/Ganit_Prakash_Class_8_Chapter_3_A_Story_of_Numbers.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Ganit%20Prakash/Ganit_Prakash_Class_8_Chapter_4_Quadrilaterals.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Ganit%20Prakash/Ganit_Prakash_Class_8_Chapter_5_Number_Play.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Ganit%20Prakash/Ganit_Prakash_Class_8_Chapter_6_We_Distribute_Yet_Things_Multiply.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Ganit%20Prakash/Ganit_Prakash_Class_8_Chapter_7_Proportional_Reasoning_1.mp3"
    ],
    "chapterDurations": [
      "1:14:44",
      "1:41:45",
      "1:42:10",
      "1:37:31",
      "1:38:42",
      "2:05:01",
      "1:16:17"
    ]
  },
  {
    "id": 804,
    "title": "मल्हार",
    "author": "NCERT CIET",
    "category": "Class 8",
    "class": "Class 8",
    "subject": "Hindi",
    "rating": 4.9,
    "reviews": "1,890",
    "duration": "17h 19m",
    "chaptersCount": 10,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/malharclass8.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Malhar/Malhar_Class_8_Chapter_1_%20Sawdesh.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/131",
    "description": "Official NCERT CIET Audio Book for Class 8 Hindi 'Malhar'. 10 अध्याय।",
    "chapters": [
      "पाठ 1: लाख की चूड़ियाँ",
      "पाठ 2: बस की यात्रा",
      "पाठ 3: दीवानों की हस्ती",
      "पाठ 4: भगवान के डाकिए",
      "पाठ 5: क्या निराश हुआ जाए",
      "पाठ 6: यह सबसे कठिन समय नहीं",
      "पाठ 7: कबीर की साखियाँ",
      "पाठ 8: सुदामा चरित",
      "पाठ 9: जहाँ पहिया है",
      "पाठ 10: बाज और साँप"
    ],
    "progress": 0,
    "color": "from-emerald-500/20 to-teal-600/20",
    "accent": "text-emerald-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Malhar/Malhar_Class_8_Chapter_1_%20Sawdesh.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Malhar/Malhar_Class_8_Chapter_2_%20Goriya.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Malhar/Malhar_Class_8_Chapter_3_%20Ek_Aasirwad.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Malhar/Malhar_Class_8_Chapter_4_%20Haridwar.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Malhar/Malhar_Class_8_Chapter_5_Kabir_ke_Dohe.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Malhar/Malhar_Class_8_Chapter_7_%20Mat_Bandho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Malhar/Malhar_Class_8_Chapter_8_Nye_Mahman.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Malhar/Malhar_Class_8_Chapter_9_%20Aadmi_ka_Anupat.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Malhar/Malhar_Class_8_Chapter_10_Tarun_Ke_Sawpan.mp3"
    ],
    "chapterDurations": [
      "1:18:58",
      "1:49:06",
      "1:06:56",
      "2:33:43",
      "1:35:34",
      "1:39:35",
      "2:43:01",
      "1:38:30",
      "2:54:10"
    ]
  },
  {
    "id": 805,
    "title": "Exploring Society India and Beyond",
    "author": "NCERT CIET",
    "category": "Class 8",
    "class": "Class 8",
    "subject": "Social Science",
    "rating": 4.9,
    "reviews": "1,840",
    "duration": "17h 36m",
    "chaptersCount": 12,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/socialscienceclass8.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Social%20Science/Social_Science_Class%208_Chapter_2_Reshaping_India_s_Political_Map.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/134",
    "description": "Official NCERT CIET Audio Book for Class 8 Social Science 'Exploring Society India and Beyond'. 12 chapters.",
    "chapters": [
      "Chapter 1: Resources & Sustainable Development",
      "Chapter 2: Land, Soil, Water, Natural Vegetation",
      "Chapter 3: Agriculture",
      "Chapter 4: Industries",
      "Chapter 5: Human Resources",
      "Chapter 6: The National Freedom Movement",
      "Chapter 7: Civilising the Native, Educating the Nation",
      "Chapter 8: Women, Caste and Reform",
      "Chapter 9: The Making of the National Movement",
      "Chapter 10: Indian Constitution & Secularism",
      "Chapter 11: Parliament and the Making of Laws",
      "Chapter 12: Judiciary and Social Justice"
    ],
    "progress": 0,
    "color": "from-cyan-500/20 to-blue-600/20",
    "accent": "text-cyan-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Social%20Science/Social_Science_Class%208_Chapter_2_Reshaping_India_s_Political_Map.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Social%20Science/Social_Science_Class%208_Chapter_6_The_Parliamentary_System_Legislature_and_Executive.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Social%20Science/Social_Science_Class%208_Chapter_7_Factors_of_Production.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Social%20Science/Social_Science_Class_8_Chapter%204%20-%20The_Colonial_Era_in_India.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Social%20Science/Social_Science_Class_8_Chapter_1%20-%20Natural_Resources_and_Their_Use.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Social%20Science/Social_Science_Class_8_Chapter_3%20-%20The_Rise_of_Marathas.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%208/Social%20Science/Social_Science_Class_8_Chapter_5%20-%20Universal_Franchise_and_India_s_Electoral_System.mp3"
    ],
    "chapterDurations": [
      "3:34:38",
      "2:24:56",
      "2:03:52",
      "3:25:39",
      "1:50:24",
      "2:05:06",
      "2:12:21"
    ]
  },
  {
    "id": 806,
    "title": "Kaushal Bodh",
    "author": "NCERT CIET",
    "category": "Class 8",
    "class": "Class 8",
    "subject": "Vocational Education",
    "rating": 4.8,
    "reviews": "980",
    "duration": "58m",
    "chaptersCount": 6,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/Kaushal_Bodh.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kaushal%20Bodh/Kaushal_Bodh_Class_8_Part_1_Work_with_life_forms_Project_01-Hydroponics-Growing_Plants_without_Soil.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/136",
    "description": "Official NCERT CIET Audio Book for Class 8 Vocational Education 'Kaushal Bodh'. 6 chapters.",
    "chapters": [
      "Chapter 1: Basics of Electronics & Robotics",
      "Chapter 2: Eco-friendly Crafting",
      "Chapter 3: Entrepreneurship Skills",
      "Chapter 4: Digital Tools for Design",
      "Chapter 5: Green Energy Innovations",
      "Chapter 6: Career Exploration Basics"
    ],
    "progress": 0,
    "color": "from-teal-500/20 to-emerald-600/20",
    "accent": "text-teal-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kaushal%20Bodh/Kaushal_Bodh_Class_8_Part_1_Work_with_life_forms_Project_01-Hydroponics-Growing_Plants_without_Soil.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kaushal%20Bodh/Kaushal_Bodh_Class_8_Part_1_Work_with_life_forms_Project_02-Feeding_and_Carring_for_Farm_Animals.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kaushal%20Bodh/Kaushal_Bodh_Class_8_Part_2_Work_with_Machines_and_Materials_Project_03-Working_with_Wood_and_Bamboo.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kaushal%20Bodh/Kaushal_Bodh_Class_8_Part_2_Work_with_Machines_and_Materials_Project_04-Home_Automation.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kaushal%20Bodh/Kaushal_Bodh_Class_8_Part_3_Work_in_Human_Services_Project_05-Water_Audit_for_Water_Management.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kaushal%20Bodh/Kaushal_Bodh_Class_8_Part_3_Work_in_Human_Services_Project_06-Creating_Advertisements.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kaushal%20Bodh/Kaushal_Bodh_Class_8_Part_3_Work_in_Human_Services_Project_07-Planning_for_Kaushal_mela.mp3"
    ],
    "chapterDurations": [
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00"
    ]
  },
  {
    "id": 807,
    "title": "Khel Yatra",
    "author": "NCERT CIET",
    "category": "Class 8",
    "class": "Class 8",
    "subject": "PE & Well-being",
    "rating": 4.9,
    "reviews": "940",
    "duration": "3h 40m",
    "chaptersCount": 6,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/feky1cc.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/khelyatraen/khelYatra_Unit1_Importance_of_Physical_Education_and_Well_Being.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/173",
    "description": "Official NCERT CIET Audio Book for Class 8 Physical Education and Well Being 'Khel Yatra'. 6 chapters.",
    "chapters": [
      "Chapter 1: Aerobic Endurance & Strength",
      "Chapter 2: Advanced Meditation & Focus",
      "Chapter 3: Sports Nutrition and Rest",
      "Chapter 4: Teamwork & Leadership in Sports",
      "Chapter 5: First Aid and Injury Prevention",
      "Chapter 6: Yoga for Adolescent Health"
    ],
    "progress": 0,
    "color": "from-green-500/20 to-emerald-600/20",
    "accent": "text-green-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/khelyatraen/khelYatra_Unit1_Importance_of_Physical_Education_and_Well_Being.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/khelyatraen/KhelYatra_Unit2_Motor_fitness.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/khelyatraen/KhelYatra_Unit_3_Fundamental_skills_Of_Kho-Kho.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/khelyatraen/KhelYatra_Unit4_Fundamental_skills_of_Handball.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%206/khelyatraen/KhelYatra_Unit5_Yoga.mp3"
    ],
    "chapterDurations": [
      "13:39",
      "30:48",
      "32:07",
      "44:57",
      "1:39:05"
    ]
  },
  {
    "id": 808,
    "title": "Khayal خیال",
    "author": "NCERT CIET",
    "category": "Class 8",
    "class": "Class 8",
    "subject": "Urdu",
    "rating": 4.8,
    "reviews": "730",
    "duration": "10h 54m",
    "chaptersCount": 8,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/khayal7.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Khayal/Khayal_(Urdu)_Class_7_Chapter_01_Tarana_e_Wahdat.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/153",
    "description": "Official NCERT CIET Audio Book for Class 8 Urdu 'Khayal'. 8 chapters.",
    "chapters": [
      "Sabak 1: Allama Iqbal Ki Nazm",
      "Sabak 2: Science Ki Tarraqi",
      "Sabak 3: Watan e Aziz",
      "Sabak 4: Akhlaq o Adab",
      "Sabak 5: Urdu Adab Ke Mashhoor Afsane",
      "Sabak 6: Insani Khidmat Ka Jazba",
      "Sabak 7: Shairi Ka Fan",
      "Sabak 8: Kamyabi Ka Raaz"
    ],
    "progress": 0,
    "color": "from-purple-500/20 to-pink-600/20",
    "accent": "text-purple-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Khayal/Khayal_(Urdu)_Class_7_Chapter_01_Tarana_e_Wahdat.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Khayal/Khayal_(Urdu)_Class_7_Chapter_02_Ek_purani_kahani.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Khayal/Khayal_(Urdu)_Class_7_Chapter_03_Paheli_Udaan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Khayal/Khayal_(Urdu)_Class_7_Chapter_04_Pani.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Khayal/Khayal_(Urdu)_Class_7_Chapter_05_Jugnoo.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Khayal/Khayal_(Urdu)_Class_7_Chapter_06_Budhi_Amma_ki_Baat.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Khayal/Khayal_(Urdu)_Class_7_Chapter_07_Brig_Mohd_Usman.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Khayal/Khayal_(Urdu)_Class_7_Chapter_08_Kadam_Badhao_Doston.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Khayal/Khayal_(Urdu)_Class_7_Chapter_09_Dr.%20Sarvapalli_Radhakrishnan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Khayal/Khayal_(Urdu)_Class_7_Chapter_10_Chitioyon%20Ki_Kataar.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Khayal/Khayal_(Urdu)_Class_7_Chapter_11_Do_Bailo_Ki_Kahani.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Khayal/Khayal_(Urdu)_Class_7_Chapter_12_Hamare%20Khel.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Khayal/Khayal_(Urdu)_Class_7_Chapter_13_Jhalkari_Bai.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Khayal/Khayal_(Urdu)_Class_7_Chapter_14_Digital_Technology.mp3"
    ],
    "chapterDurations": [
      "35:52",
      "42:37",
      "1:03:50",
      "49:12",
      "30:02",
      "48:39",
      "58:43",
      "27:18",
      "50:23",
      "34:31",
      "56:08",
      "57:40",
      "45:37",
      "53:43"
    ]
  },
  {
    "id": 809,
    "title": "दीपकम्",
    "author": "NCERT CIET",
    "category": "Class 8",
    "class": "Class 8",
    "subject": "Sanskrit",
    "rating": 4.8,
    "reviews": "1,180",
    "duration": "7h 11m",
    "chaptersCount": 8,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/deepakam7.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Deepakam/Deepkam_(Sanskrit)_Class_7_Chapter_06%20_Kridam_Vayam_Slokantyashrimahpng.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/154",
    "description": "Official NCERT CIET Audio Book for Class 8 Sanskrit 'Deepakam'. 8 संस्कृत अध्याय।",
    "chapters": [
      "पाठ 1: सुभाषितानि",
      "पाठ 2: बिलस्य वाणी न कदापि मे श्रुता",
      "पाठ 3: डिजीभारतम्",
      "पाठ 4: सदैव पुरतो निधेहि चरणम्",
      "पाठ 5: कण्टकेनैव कण्टकम्",
      "पाठ 6: गृहं शून्यं सुतां विना",
      "पाठ 7: भारतजनताऽहम्",
      "पाठ 8: संसारसागरस्य नायकाः"
    ],
    "progress": 0,
    "color": "from-amber-500/20 to-yellow-600/20",
    "accent": "text-amber-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Deepakam/Deepkam_(Sanskrit)_Class_7_Chapter_06%20_Kridam_Vayam_Slokantyashrimahpng.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Deepakam/Deepkam_(Sanskrit)_Class_7_Chapter_07_Irshavasyam_Idam_Sarvam_png.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Deepakam/Deepkam_(Sanskrit)_Class_7_Chapter%2008_Hitam_Manohari_Cha_Durlabh_Vach_png.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Deepakam/Deepkam_(Sanskrit)_Class_7_Chapter_09_Annaad_Bhavanti_Bhutani_png.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Deepakam/Deepkam_(Sanskrit)_Class_7_Chapter_10_Dasham_Kah_png.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Deepakam/Deepkam_(Sanskrit)_Class_7_Chapter_11_%20Dwepeshu_ramyah_dweepoandmaanah.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Deepakam/Deepkam_(Sanskrit)_Class_7_Chapter_12%20_Virangna_Pannadhaya_png.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Deepakam/Deepkam_(Sanskrit)_Class_7_Chapter_13_%20Atiriktam_Adhyynam(Varnmatra_Parichyh).mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Deepakam/Deepkam_(Sanskrit)_Class_7_Chapter_14_Parishishtam_1_(Shabdrupani).mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Deepakam/Deepkam_(Sanskrit)_Class_7_Chapter_15_Parishishtam-2_(Dhaturupani).mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Deepakam/Deepkam_(Sanskrit)_Class_7_Chapter_01-Vande_Matram.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Deepakam/Deepkam_(Sanskrit)_Class_7_Chapter_02-Nityam_Pibamah_Subhashitarsam.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Deepakam/Deepkam_(Sanskrit)_Class_7_Chapter_03-Mitray_Namh.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Deepakam/Deepkam_(Sanskrit)_Class_7_Chapter_04-Na_Labhyate_Cheta_Amlam_Drakshafalam.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Deepakam/Deepkam_(Sanskrit)_Class_7_Chapter_05-Sewa_Hi_Parmo_Dharmah.mp3"
    ],
    "chapterDurations": [
      "41:53",
      "36:31",
      "24:13",
      "23:45",
      "29:03",
      "25:36",
      "25:31",
      "30:25",
      "26:37",
      "27:07",
      "35:23",
      "30:24",
      "25:21",
      "25:21",
      "24:11"
    ]
  },
  {
    "id": 810,
    "title": "Kriti",
    "author": "NCERT CIET",
    "category": "Class 8",
    "class": "Class 8",
    "subject": "Arts",
    "rating": 4.8,
    "reviews": "970",
    "duration": "9h 9m",
    "chaptersCount": 6,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/kriti7.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kriti/Kriti_(Arts)_Class_7_Chapter_01_Understanding_Emotions_png_.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/149",
    "description": "Official NCERT CIET Audio Book for Class 8 Arts 'Kriti'. 6 chapters.",
    "chapters": [
      "Chapter 1: Modern Indian Visual Arts",
      "Chapter 2: Classical Dance Traditions",
      "Chapter 3: Sculpture & Aesthetics",
      "Chapter 4: Folk Musical Instruments",
      "Chapter 5: Architectural Monuments of India",
      "Chapter 6: Art and Social Reflection"
    ],
    "progress": 0,
    "color": "from-pink-500/20 to-rose-600/20",
    "accent": "text-pink-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kriti/Kriti_(Arts)_Class_7_Chapter_01_Understanding_Emotions_png_.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kriti/Kriti_(Arts)_Class_7_Chapter_02_Say_More_Without_Speech_MIME_png_.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kriti/Kriti_(Arts)_Class_7_Chapter_03_Let’s_Design_Stage_Technicals_2_png_.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kriti/Kriti_(Arts)_Class_7_Chapter_04%20_Story_of_India’s_Storytelling_Traditions_png_.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kriti/Kriti_(Arts)_Class_7_Chapter_05_%20Making_Music_png_.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kriti/Kriti_(Arts)_Class%207_Chapter_06_Music,_Emotions_and_Creativity.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kriti/Kriti_(Arts)_Class_7_Chapter%2008_The_Music_of_the_People.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kriti/Kriti_(Arts)_Class_7_Chapter_09_Performance.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kriti/Kriti_(Arts)_Class_7_Chapter_11_Dance_Cocabulary_and_Techniques.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kriti/Kriti_(Arts)_Class_7_Chapter_12_Dance,_You_and_Creativity.mp4.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kriti/Kriti_(Arts)_Class_7_Chapter_13_Personalityes.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kriti/Kriti_(Arts)_Class_7_Chapter_15_Objects_in_Icons_and_Symbols.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kriti/Kriti_(Arts)_Class_7_Chapter_19_The_Arts_of_Calligraphy.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kriti/Kriti_(Arts)_Class7_Chapter_17_How_You_Feel.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%207/Kriti/Kriti_(Arts)_Class%207_Chapter_20_Integration_of_all_Art_Forms_Sculptures_come_Alive.mp3"
    ],
    "chapterDurations": [
      "1:00:11",
      "28:36",
      "56:01",
      "25:55",
      "35:16",
      "23:07",
      "35:48",
      "20:34",
      "36:36",
      "22:01",
      "07:13",
      "1:32:02",
      "44:34",
      "52:18",
      "08:42"
    ]
  },
  {
    "id": 901,
    "title": "Ganita Manjari",
    "author": "NCERT CIET",
    "category": "Class 9",
    "class": "Class 9",
    "subject": "Mathematics",
    "rating": 4.9,
    "reviews": "2,420",
    "duration": "12h 24m",
    "chaptersCount": 12,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/iemh1cc.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Ganita_manjari_en/Chapter1_Orienting_Yourself_The_Use_of_Coordinates.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/186",
    "description": "Official NCERT CIET Audio Book for Class 9 Mathematics 'Ganita Manjari'. All 12 chapters.",
    "chapters": [
      "Chapter 1: Number Systems",
      "Chapter 2: Polynomials",
      "Chapter 3: Coordinate Geometry",
      "Chapter 4: Linear Equations in Two Variables",
      "Chapter 5: Introduction to Euclid's Geometry",
      "Chapter 6: Lines and Angles",
      "Chapter 7: Triangles",
      "Chapter 8: Quadrilaterals",
      "Chapter 9: Circles",
      "Chapter 10: Heron's Formula",
      "Chapter 11: Surface Areas and Volumes",
      "Chapter 12: Statistics"
    ],
    "progress": 0,
    "color": "from-amber-500/20 to-orange-600/20",
    "accent": "text-amber-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Ganita_manjari_en/Chapter1_Orienting_Yourself_The_Use_of_Coordinates.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Ganita_manjari_en/Chapter2_Introduction_to_Linear_Polynomials.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Ganita_manjari_en/Chapter3_The_World_of_Numbers.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Ganita_manjari_en/Chapter4_Exploring_Algebraic_Identities.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Ganita_manjari_en/Chapter5_I’m_Up_nd_Down_and_Round_and_Round.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Ganita_manjari_en/class9_Chapter6_Measuring_Space_Perimeter_and_Area.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Ganita_manjari_en/class9_Chapter7_The_Mathematics_of_Maybe_Introduction_to_Probability.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Ganita_manjari_en/class9_Ch8_Predicting_What_Comes_Next_%20Exploring_Sequences_and_Progressions.mp3"
    ],
    "chapterDurations": [
      "1:07:01",
      "1:41:39",
      "4:10:58",
      "1:16:14",
      "1:22:07",
      "32:22",
      "1:19:30",
      "54:47"
    ]
  },
  {
    "id": 902,
    "title": "Kaveri",
    "author": "NCERT CIET",
    "category": "Class 9",
    "class": "Class 9",
    "subject": "English",
    "rating": 4.9,
    "reviews": "2,350",
    "duration": "6h 28m",
    "chaptersCount": 9,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/iebe1cc.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Kaveri/class9_Chapter1_How_I_Taught_My_Grandmother_to_Read.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/187",
    "description": "Official NCERT CIET Audio Book for Class 9 English textbook 'Kaveri'. 9 complete chapters.",
    "chapters": [
      "Chapter 1: The Fun They Had & The Road Not Taken",
      "Chapter 2: The Sound of Music & Wind",
      "Chapter 3: The Little Girl & Rain on the Roof",
      "Chapter 4: A Truly Beautiful Mind & The Lake Isle of Innisfree",
      "Chapter 5: The Snake and the Mirror & A Legend of the Northland",
      "Chapter 6: My Childhood & No Men Are Foreign",
      "Chapter 7: Reach for the Top & On Killing a Tree",
      "Chapter 8: Kathmandu & A Slumber Did My Spirit Seal",
      "Chapter 9: If I Were You"
    ],
    "progress": 0,
    "color": "from-blue-500/20 to-indigo-600/20",
    "accent": "text-blue-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Kaveri/class9_Chapter1_How_I_Taught_My_Grandmother_to_Read.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Kaveri/class9_Chapter2_The_Pot_Maker_Gifts_of_Grace_Honouring_Our_Vocations.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Kaveri/class9_Chapter3_Winds_of_Change_Canvas_of_Soil.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Kaveri/Chapter4_VitaminM_I_Cannot_Remembe_%20My_Mother.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Kaveri/Chapter5_The_World_of_Limitless_Possibilities_Nine_Gold_Medals.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Kaveri/Chapter%206_Twin_Melodies_Friend_Music.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Kaveri/Chapter07%20_Carrier_of_Words_Words_Words.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Kaveri/Appendix.mp3"
    ],
    "chapterDurations": [
      "34:12",
      "41:53",
      "49:13",
      "1:13:58",
      "58:08",
      "1:03:51",
      "47:57",
      "19:33"
    ]
  },
  {
    "id": 903,
    "title": "Khel Praveen",
    "author": "NCERT CIET",
    "category": "Class 9",
    "class": "Class 9",
    "subject": "PE & Well-being",
    "rating": 4.9,
    "reviews": "1,210",
    "duration": "12h 32m",
    "chaptersCount": 6,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/iehp1cc.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Khel_praveen/Unit1_Evolution_of_Physical_and_Wellbeing_Chapter1_Physical_Education.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/188",
    "description": "Official NCERT CIET Audio Book for Class 9 Physical Education and Well Being 'Khel Praveen'. 6 chapters.",
    "chapters": [
      "Chapter 1: Human Physiology & Sports",
      "Chapter 2: Mental Toughness & Wellness",
      "Chapter 3: Community Health & Hygiene",
      "Chapter 4: Athletics and Track Sports",
      "Chapter 5: Yoga for Concentration",
      "Chapter 6: Fair Play and Olympic Values"
    ],
    "progress": 0,
    "color": "from-green-500/20 to-emerald-600/20",
    "accent": "text-green-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Khel_praveen/Unit1_Evolution_of_Physical_and_Wellbeing_Chapter1_Physical_Education.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Khel_praveen/Unit1_Evolution_of_Physical_and_Wellbeing_Chapter2_History_and_Culture_of_Physical_Education_in_India.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Khel_praveen/Unit1_Evolution_of_Physical_and_Wellbeing_Chapter3_Careers_in_Physical_Education.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Khel_praveen/Unit1_Evolution_of_Physical_and_Wellbein_Chapter4_Fitness_and_its_Components.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Khel_praveen/Unit2_Science_and_Sports_Chapter5_Understanding_Our_Body.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Khel_praveen/Unit2_Science_and_Sports_Chapter6_Cardiorespiratory_System.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Khel_praveen/Unit2_Science_and_Sports_Chapter7_Growth_Development_and_Maturation.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Khel_praveen/Unit2_Science_and_Sports_Chapter8_First_Aid.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Khel_praveen/Unit3_Olympism_Chapter9_Olympic_Values.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Khel_praveen/Unit3_Olympism_Chapter10_The_Ancient_Olympic_Games.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Khel_praveen/Unit3_Olympism_Chapter11_The_Modern_Olympic_Games.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Khel_praveen/Chapter_12_Sports_and_Inclusivity.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Khel_praveen/Chapter_13_Sports_and_Disability.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Khel_praveen/Chapter_14_Disability_Etiquettes_Respecting_Everyone_with_Dignity.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Khel_praveen/Chapter_15_Young_Athlete.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Khel_praveen/Chapter_16_Women_in_Sports.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Khel_praveen/Chapter_17_Age_is_Just_a_Number.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Khel_praveen/Chapter_18_Indigenious_Martial_Arts_and_Sport.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Khel_praveen/Chapter_19_Combat_Sports.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Khel_praveen/Chapter_20_Outdoor_Sports.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Khel_praveen/Chapter_21_Samagra%20_Svāsthya.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Khel_praveen/Chapter_22%20_yogamaya_Jīvana.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/Khel_praveen/Chapter_23_Yoga_or_Personal_Excellence.mp3"
    ],
    "chapterDurations": [
      "34:32",
      "32:56",
      "09:37",
      "11:58",
      "43:50",
      "33:51",
      "19:50",
      "34:57",
      "32:15",
      "28:07",
      "35:27",
      "39:19",
      "32:00",
      "23:02",
      "20:01",
      "30:45",
      "25:47",
      "31:59",
      "18:06",
      "29:12",
      "1:01:01",
      "58:04",
      "1:05:14"
    ]
  },
  {
    "id": 904,
    "title": "गंगा",
    "author": "NCERT CIET",
    "category": "Class 9",
    "class": "Class 9",
    "subject": "Hindi",
    "rating": 4.9,
    "reviews": "2,190",
    "duration": "9h 39m",
    "chaptersCount": 10,
    "cover": "https://ciet.ncert.gov.in/storage/app/public/photos/13/Audio/ihga1cc.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/ganga/chapter1_do_balom_ki_katha.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/189",
    "description": "Official NCERT CIET Audio Book for Class 9 Hindi textbook 'Ganga'. 10 अध्याय।",
    "chapters": [
      "पाठ 1: दो बैलों की कथा (प्रेमचंद)",
      "पाठ 2: ल्हासा की ओर (राहुल सांकृत्यायन)",
      "पाठ 3: उपभोक्तावाद की संस्कृति",
      "पाठ 4: साँवले सपनों की याद",
      "पाठ 5: साखियाँ एवं सबद (कबीर)",
      "पाठ 6: वाख (ललद्यद)",
      "पाठ 7: सवैये (रसखान)",
      "पाठ 8: कैदी और कोकिला (माखनलाल चतुर्वेदी)",
      "पाठ 9: मेघ आए (सर्वेश्वर दयाल सक्सेना)",
      "पाठ 10: बच्चे काम पर जा रहे हैं (राजेश जोशी)"
    ],
    "progress": 0,
    "color": "from-emerald-500/20 to-teal-600/20",
    "accent": "text-emerald-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/ganga/chapter1_do_balom_ki_katha.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/ganga/chapter2_kya_likhu.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/ganga/chapter3_swandheen.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/ganga/chapter4_asi_bhi_baten_hoti_hai.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/ganga/chapter5_aakhri_chattan_tak.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/ganga/chapter6_reed_ki_haddi.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/ganga/chapter7_me_or_mera_desh.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/ganga/chapter8_pad.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/ganga/chapter9_ram_laksman_parshuram_swand.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/ganga/chapter10_bharti_jai_vijay_kre.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/ganga/chapter11_jhanshi_ki_rani.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%209/ganga/chapter12_ghar_ki_yad.mp3"
    ],
    "chapterDurations": [
      "48:37",
      "47:20",
      "50:48",
      "57:20",
      "45:02",
      "51:43",
      "56:01",
      "33:05",
      "41:13",
      "1:09:29",
      "46:20",
      "32:00"
    ]
  },
  {
    "id": 1001,
    "title": "Kshitij Bhag II",
    "author": "NCERT CIET",
    "category": "Class 10",
    "class": "Class 10",
    "subject": "Hindi",
    "rating": 4.9,
    "reviews": "3,120",
    "duration": "4h 19m",
    "chaptersCount": 9,
    "cover": "https://images-na.ssl-images-amazon.com/images/P/817450656X.01.LZZZZZZZ.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Kshitij%20II/KshitijIIChapter1.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/96",
    "description": "Official NCERT CIET Audio Book for Class 10 Hindi 'Kshitij Bhag II'. All 9 authentic NCERT chapters.",
    "chapters": [
      "पाठ 1: पद (सूरदास)",
      "पाठ 2: राम-लक्ष्मण-परशुराम संवाद (तुलसीदास)",
      "पाठ 3: आत्मकथ्य (जयशंकर प्रसाद)",
      "पाठ 4: उत्साह और अट नहीं रही है (निराला)",
      "पाठ 5: यह दंतुरित मुसकान और फसल (नागार्जुन)",
      "पाठ 6: नेताजी का चश्मा (स्वयं प्रकाश)",
      "पाठ 7: बालगोबिन भगत (रामवृक्ष बेनीपुरी)",
      "पाठ 8: लखनवी अंदाज़ (यशपाल)",
      "पाठ 9: संस्कृति (भदंत आनंद कौसल्यायन)"
    ],
    "progress": 0,
    "color": "from-emerald-500/20 to-teal-600/20",
    "accent": "text-emerald-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Kshitij%20II/KshitijIIChapter1.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Kshitij%20II/KshitijIIChapter2.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Kshitij%20II/KshitijIIChapter3.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Kshitij%20II/KshitijIIChapter4.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Kshitij%20II/KshitijIIChapter5.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Kshitij%20II/KshitijIIChapter6.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Kshitij%20II/KshitijIIChapter7.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Kshitij%20II/KshitijIIChapter8.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Kshitij%20II/KshitijIIChapter9.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Kshitij%20II/KshitijIIChapter10.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Kshitij%20II/KshitijIIChapter11.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Kshitij%20II/KshitijIIChapter12.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Kshitij%20II/KshitijIIChapter13.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Kshitij%20II/KshitijIIChapter14.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Kshitij%20II/KshitijIIChapter15.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Kshitij%20II/KshitijIIChapter16.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Kshitij%20II/KshitijIIChapter17.mp3"
    ],
    "chapterDurations": [
      "20:56",
      "09:17",
      "04:45",
      "04:39",
      "03:54",
      "14:39",
      "03:24",
      "02:24",
      "04:12",
      "11:16",
      "08:22",
      "17:03",
      "23:53",
      "36:03",
      "21:19",
      "55:50",
      "17:39"
    ]
  },
  {
    "id": 1002,
    "title": "Kritika Bhag II",
    "author": "NCERT CIET",
    "category": "Class 10",
    "class": "Class 10",
    "subject": "Hindi",
    "rating": 4.8,
    "reviews": "2,310",
    "duration": "3h 3m",
    "chaptersCount": 5,
    "cover": "https://images-na.ssl-images-amazon.com/images/P/8174507183.01.LZZZZZZZ.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Kritika%20II/KritikaIIChapter1.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/97",
    "description": "Official NCERT CIET Audio Book for Class 10 Hindi Supplementary 'Kritika Bhag II'. All 5 chapters.",
    "chapters": [
      "पाठ 1: माता का आँचल (शिवपूजन सहाय)",
      "पाठ 2: जॉर्ज पंचम की नाक (कमलेश्वर)",
      "पाठ 3: साना-साना हाथ जोड़ि (मधु कांकरिया)",
      "पाठ 4: एही ठैयाँ झुलनी हेरानी हो रामा! (शिवप्रसाद मिश्र 'रुद्र')",
      "पाठ 5: मैं क्यों लिखता हूँ? (अज्ञेय)"
    ],
    "progress": 0,
    "color": "from-green-500/20 to-emerald-600/20",
    "accent": "text-green-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Kritika%20II/KritikaIIChapter1.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Kritika%20II/KritikaIIChapter2.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Kritika%20II/KritikaIIChapter3.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Kritika%20II/KritikaIIChapter4.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Kritika%20II/KritikaIIChapter5.mp3"
    ],
    "chapterDurations": [
      "32:35",
      "28:40",
      "1:07:10",
      "18:41",
      "36:23"
    ]
  },
  {
    "id": 1003,
    "title": "Contemporary India II",
    "author": "NCERT CIET",
    "category": "Class 10",
    "class": "Class 10",
    "subject": "SS",
    "rating": 4.9,
    "reviews": "2,780",
    "duration": "7h 52m",
    "chaptersCount": 7,
    "cover": "https://images-na.ssl-images-amazon.com/images/P/8174506446.01.LZZZZZZZ.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Contemporary%20India%20II/Chapter1.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/98",
    "description": "Official NCERT CIET Audio Book for Class 10 Social Science (Geography) 'Contemporary India II'. All 7 chapters.",
    "chapters": [
      "Chapter 1: Resources and Development",
      "Chapter 2: Forest and Wildlife Resources",
      "Chapter 3: Water Resources",
      "Chapter 4: Agriculture",
      "Chapter 5: Minerals and Energy Resources",
      "Chapter 6: Manufacturing Industries",
      "Chapter 7: Lifelines of National Economy"
    ],
    "progress": 0,
    "color": "from-teal-500/20 to-cyan-600/20",
    "accent": "text-teal-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Contemporary%20India%20II/Chapter1.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Contemporary%20India%20II/Chapter2.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Contemporary%20India%20II/Chapter3.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Contemporary%20India%20II/Chapter4.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Contemporary%20India%20II/Chapter5.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Contemporary%20India%20II/Chapter6.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Contemporary%20India%20II/Chapter7.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Contemporary%20India%20II/Chapter8.mp3"
    ],
    "chapterDurations": [
      "1:11:22",
      "49:49",
      "49:54",
      "1:15:30",
      "1:09:16",
      "1:25:03",
      "58:07",
      "13:04"
    ]
  },
  {
    "id": 1004,
    "title": "Samkalin Bharat II",
    "author": "NCERT CIET",
    "category": "Class 10",
    "class": "Class 10",
    "subject": "SS",
    "rating": 4.9,
    "reviews": "2,450",
    "duration": "8h 10m",
    "chaptersCount": 7,
    "cover": "https://images-na.ssl-images-amazon.com/images/P/8174506675.01.LZZZZZZZ.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Samkalin%20Bharat%20II/Chapter1.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/99",
    "description": "Official NCERT CIET Audio Book for Class 10 Hindi Medium Geography 'Samkalin Bharat II'. पूरे 7 अध्याय।",
    "chapters": [
      "अध्याय 1: संसाधन और विकास",
      "अध्याय 2: वन एवं वन्य जीव संसाधन",
      "अध्याय 3: जल संसाधन",
      "अध्याय 4: कृषि",
      "अध्याय 5: खनिज तथा ऊर्जा संसाधन",
      "अध्याय 6: विनिर्माण उद्योग",
      "अध्याय 7: राष्ट्रीय अर्थव्यवस्था की जीवन रेखाएँ"
    ],
    "progress": 0,
    "color": "from-green-500/20 to-emerald-600/20",
    "accent": "text-green-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Samkalin%20Bharat%20II/Chapter1.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Samkalin%20Bharat%20II/Chapter2.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Samkalin%20Bharat%20II/Chapter3.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Samkalin%20Bharat%20II/Chapter4.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Samkalin%20Bharat%20II/Chapter5.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Samkalin%20Bharat%20II/Chapter6.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Samkalin%20Bharat%20II/Chapter7.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Samkalin%20Bharat%20II/Parishisht%20aur%20Shabdawali.mp3"
    ],
    "chapterDurations": [
      "1:05:38",
      "42:52",
      "49:31",
      "1:16:41",
      "1:25:46",
      "1:25:47",
      "1:03:16",
      "20:53"
    ]
  },
  {
    "id": 1005,
    "title": "Arthik Vikas ki Samajh",
    "author": "NCERT CIET",
    "category": "Class 10",
    "class": "Class 10",
    "subject": "SS",
    "rating": 4.9,
    "reviews": "2,610",
    "duration": "7h 14m",
    "chaptersCount": 5,
    "cover": "https://images-na.ssl-images-amazon.com/images/P/8174506950.01.LZZZZZZZ.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Arthik%20Vikas%20ki%20Samajh/new/Chapter1%20(1).mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/100",
    "description": "Official NCERT CIET Audio Book for Class 10 Economics Hindi Medium 'Arthik Vikas Ki Samajh'. पूरे 5 अध्याय।",
    "chapters": [
      "अध्याय 1: विकास",
      "अध्याय 2: भारतीय अर्थव्यवस्था के क्षेत्रक",
      "अध्याय 3: मुद्रा और साख",
      "अध्याय 4: वैश्वीकरण और भारतीय अर्थव्यवस्था",
      "अध्याय 5: उपभोक्ता अधिकार"
    ],
    "progress": 0,
    "color": "from-amber-500/20 to-orange-600/20",
    "accent": "text-amber-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Arthik%20Vikas%20ki%20Samajh/new/Chapter1%20(1).mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Arthik%20Vikas%20ki%20Samajh/new/Chapter2.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Arthik%20Vikas%20ki%20Samajh/new/Chapter3.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Arthik%20Vikas%20ki%20Samajh/new/Chapter4.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Arthik%20Vikas%20ki%20Samajh/new/Chapter6.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Arthik%20Vikas%20ki%20Samajh/new/Chapter7.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Arthik%20Vikas%20ki%20Samajh/new/Chapter8.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Arthik%20Vikas%20ki%20Samajh/new/Chapter9.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Arthik%20Vikas%20ki%20Samajh/new/Chapter10.mp3"
    ],
    "chapterDurations": [
      "06:17",
      "1:23:58",
      "06:59",
      "1:39:54",
      "1:09:58",
      "07:29",
      "1:25:28",
      "07:22",
      "1:06:59"
    ]
  },
  {
    "id": 1006,
    "title": "Bharat Aur Samkaleen Vishwa II",
    "author": "NCERT CIET",
    "category": "Class 10",
    "class": "Class 10",
    "subject": "SS",
    "rating": 4.9,
    "reviews": "2,840",
    "duration": "8h 17m",
    "chaptersCount": 5,
    "cover": "https://images-na.ssl-images-amazon.com/images/P/8174507124.01.LZZZZZZZ.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Bharat%20Aur%20Samkaleen%20Vishwa%202/Chapter1.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/102",
    "description": "Official NCERT CIET Audio Book for Class 10 History Hindi Medium 'Bharat Aur Samkaleen Vishwa II'. पूरे 5 अध्याय।",
    "chapters": [
      "अध्याय 1: यूरोप में राष्ट्रवाद का उदय",
      "अध्याय 2: भारत में राष्ट्रवाद",
      "अध्याय 3: भूमंडलीकृत विश्व का बनना",
      "अध्याय 4: औद्योगीकरण का युग",
      "अध्याय 5: मुद्रण संस्कृति और आधुनिक दुनिया"
    ],
    "progress": 0,
    "color": "from-orange-500/20 to-red-600/20",
    "accent": "text-orange-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Bharat%20Aur%20Samkaleen%20Vishwa%202/Chapter1.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Bharat%20Aur%20Samkaleen%20Vishwa%202/Chapter2.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Bharat%20Aur%20Samkaleen%20Vishwa%202/Chapter3.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Bharat%20Aur%20Samkaleen%20Vishwa%202/Chapter4.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Bharat%20Aur%20Samkaleen%20Vishwa%202/Chapter5.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Bharat%20Aur%20Samkaleen%20Vishwa%202/Chapter6.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Bharat%20Aur%20Samkaleen%20Vishwa%202/Chapter7.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Bharat%20Aur%20Samkaleen%20Vishwa%202/Chapter8.mp3"
    ],
    "chapterDurations": [
      "55:45",
      "1:05:06",
      "56:34",
      "1:15:03",
      "1:01:08",
      "1:04:37",
      "1:01:40",
      "57:51"
    ]
  },
  {
    "id": 1007,
    "title": "Loktantrik Rajniti -2",
    "author": "NCERT CIET",
    "category": "Class 10",
    "class": "Class 10",
    "subject": "SS",
    "rating": 4.8,
    "reviews": "2,380",
    "duration": "1h 25m",
    "chaptersCount": 5,
    "cover": "https://images-na.ssl-images-amazon.com/images/P/8174507299.01.LZZZZZZZ.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Loktantrik%20Rajniti%202/LoktantrikRajnitiIIChapter1.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/103",
    "description": "Official NCERT CIET Audio Book for Class 10 Civics Hindi Medium 'Loktantrik Rajniti - 2'. पूरे 5 अध्याय।",
    "chapters": [
      "अध्याय 1: सत्ता की साझेदारी",
      "अध्याय 2: संघवाद",
      "अध्याय 3: जाति, धर्म और लैंगिक मसले",
      "अध्याय 4: राजनीतिक दल",
      "अध्याय 5: लोकतंत्र के परिणाम"
    ],
    "progress": 0,
    "color": "from-blue-500/20 to-indigo-600/20",
    "accent": "text-blue-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Loktantrik%20Rajniti%202/LoktantrikRajnitiIIChapter1.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Loktantrik%20Rajniti%202/LoktantrikRajnitiIIChapter2.mp3"
    ],
    "chapterDurations": [
      "35:41",
      "49:47"
    ]
  },
  {
    "id": 1008,
    "title": "First Flight",
    "author": "NCERT CIET",
    "category": "Class 10",
    "class": "Class 10",
    "subject": "English",
    "rating": 4.9,
    "reviews": "3,340",
    "duration": "9h 48m",
    "chaptersCount": 9,
    "cover": "https://images-na.ssl-images-amazon.com/images/P/8174506586.01.LZZZZZZZ.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/First%20Flight/1-%20To%20The%20Teacher.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/104",
    "description": "Official NCERT CIET Audio Book for Class 10 English Core 'First Flight'. All 9 chapters.",
    "chapters": [
      "Chapter 1: A Letter to God & Dust of Snow",
      "Chapter 2: Nelson Mandela: Long Walk to Freedom",
      "Chapter 3: Two Stories about Flying",
      "Chapter 4: From the Diary of Anne Frank",
      "Chapter 5: Glimpses of India",
      "Chapter 6: Mijbil the Otter",
      "Chapter 7: Madam Rides the Bus",
      "Chapter 8: The Sermon at Benares",
      "Chapter 9: The Proposal"
    ],
    "progress": 0,
    "color": "from-indigo-500/20 to-blue-600/20",
    "accent": "text-indigo-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/First%20Flight/1-%20To%20The%20Teacher.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/First%20Flight/Chapter-1%20A%20letter%20to%20God.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/First%20Flight/Chapter-2%20Nelson%20Mandela.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/First%20Flight/Chapter-%203%20Two%20Stories%20about%20Flying.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/First%20Flight/Chapter-%204%20From%20the%20Diary%20of%20Anne%20Frank.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/First%20Flight/Chapter-%205%20The%20Hundred%20Dresses-1.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/First%20Flight/Chapter%206-%20The%20Hundred%20Dresses-2.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/First%20Flight/Chapter-%207%20Glimpses%20of%20India.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/First%20Flight/Chapter-8%20Mijbil%20the%20Otter.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/First%20Flight/Chapter-%209%20Madam%20Rides%20The%20Bus.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/First%20Flight/Chapter-%2010%20The%20Sermon%20Of%20Benares.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/First%20Flight/Chapter-%2011%20The%20Proposal.mp3"
    ],
    "chapterDurations": [
      "08:20",
      "58:15",
      "59:08",
      "45:48",
      "58:50",
      "36:41",
      "37:57",
      "1:00:21",
      "54:48",
      "51:43",
      "32:52",
      "1:23:27"
    ]
  },
  {
    "id": 1009,
    "title": "Shemushi Dwitiya Bhag",
    "author": "NCERT CIET",
    "category": "Class 10",
    "class": "Class 10",
    "subject": "Sanskrit",
    "rating": 4.9,
    "reviews": "1,920",
    "duration": "8h 12m",
    "chaptersCount": 10,
    "cover": "https://images-na.ssl-images-amazon.com/images/P/817450642X.01.LZZZZZZZ.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Shemushi/Chapter1.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/105",
    "description": "Official NCERT CIET Audio Book for Class 10 Sanskrit 'Shemushi Dwitiya Bhag'. 10 संस्कृत पाठ।",
    "chapters": [
      "पाठ 1: शुचिपर्यावरणम्",
      "पाठ 2: बुद्धिर्बलवती सदा",
      "पाठ 3: व्यायामः सर्वदा पथ्यः",
      "पाठ 4: शिशुलालनम्",
      "पाठ 5: जननी तुल्यवत्सला",
      "पाठ 6: सुभाषितानि",
      "पाठ 7: सौहार्दं प्रकृतेः शोभा",
      "पाठ 8: विचित्रः साक्षी",
      "पाठ 9: सूक्तयः",
      "पाठ 10: भूकम्पविभीषिका"
    ],
    "progress": 0,
    "color": "from-amber-500/20 to-yellow-600/20",
    "accent": "text-amber-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Shemushi/Chapter1.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Shemushi/Chapter2.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Shemushi/Chapter3.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Shemushi/Chapter4.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Shemushi/Chapter5.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Shemushi/Chapter6.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Shemushi/Chapter7.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Shemushi/Chapter8.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Shemushi/Chapter9.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Shemushi/Chapter10.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Shemushi/Chapter11.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Shemushi/Chapter12.mp3"
    ],
    "chapterDurations": [
      "48:45",
      "45:43",
      "39:11",
      "36:16",
      "41:23",
      "46:11",
      "42:19",
      "44:04",
      "39:03",
      "39:46",
      "33:46",
      "35:45"
    ]
  },
  {
    "id": 1010,
    "title": "Gulzar-e-Urdu",
    "author": "NCERT CIET",
    "category": "Class 10",
    "class": "Class 10",
    "subject": "Urdu",
    "rating": 4.8,
    "reviews": "820",
    "duration": "6h 57m",
    "chaptersCount": 8,
    "cover": "https://images-na.ssl-images-amazon.com/images/P/8174507027.01.LZZZZZZZ.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Gulzar-e-Urdu/Chapter1.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/106",
    "description": "Official NCERT CIET Audio Book for Class 10 Urdu 'Gulzar-e-Urdu'. 8 authentic chapters.",
    "chapters": [
      "Sabak 1: Ghalib Ki Shayari",
      "Sabak 2: Premchand Ka Afsana",
      "Sabak 3: Sir Syed Ki Taleemat",
      "Sabak 4: Urdu Adab Ki Tareekh",
      "Sabak 5: Allama Iqbal Ki Fikr",
      "Sabak 6: Krishan Chander Ke Afsaney",
      "Sabak 7: Ghazaliyat e Mir o Ghalib",
      "Sabak 8: Adab Aur Samaj"
    ],
    "progress": 0,
    "color": "from-purple-500/20 to-pink-600/20",
    "accent": "text-purple-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Gulzar-e-Urdu/Chapter1.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Gulzar-e-Urdu/Chapter2.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Gulzar-e-Urdu/Chapter3.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Gulzar-e-Urdu/Chapter4.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Gulzar-e-Urdu/Chapter5.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Gulzar-e-Urdu/Chapter6.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Gulzar-e-Urdu/Chapter7.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Gulzar-e-Urdu/Chapter8.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Gulzar-e-Urdu/Chapter9.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Gulzar-e-Urdu/Chapter10.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Gulzar-e-Urdu/Chapter11.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Gulzar-e-Urdu/Chapter12.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Gulzar-e-Urdu/Chapter13.mp3"
    ],
    "chapterDurations": [
      "42:26",
      "24:58",
      "52:53",
      "30:37",
      "35:32",
      "35:35",
      "29:27",
      "35:24",
      "22:55",
      "03:07",
      "38:24",
      "46:27",
      "19:09"
    ]
  },
  {
    "id": 1011,
    "title": "Nawa-e-Urdu 2",
    "author": "NCERT CIET",
    "category": "Class 10",
    "class": "Class 10",
    "subject": "Urdu",
    "rating": 4.8,
    "reviews": "790",
    "duration": "7h 8m",
    "chaptersCount": 6,
    "cover": "https://images-na.ssl-images-amazon.com/images/P/8174506861.01.LZZZZZZZ.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Nawa-e-Urdu%202/Chapter1.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/107",
    "description": "Official NCERT CIET Audio Book for Class 10 Urdu Supplementary 'Nawa-e-Urdu 2'. 6 chapters.",
    "chapters": [
      "Sabak 1: Nawa e Urdu Muqaddama",
      "Sabak 2: Kahani Aur Kirdar",
      "Sabak 3: Qaumi Ekta",
      "Sabak 4: Roshan Khayali",
      "Sabak 5: Urdu Drama Ki Riwayat",
      "Sabak 6: Zindagi Ke Rang"
    ],
    "progress": 0,
    "color": "from-violet-500/20 to-purple-600/20",
    "accent": "text-violet-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Nawa-e-Urdu%202/Chapter1.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Nawa-e-Urdu%202/Chapter2.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Nawa-e-Urdu%202/Chapter3.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Nawa-e-Urdu%202/Chapter4.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Nawa-e-Urdu%202/Chapter5.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Nawa-e-Urdu%202/Chapter6.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Nawa-e-Urdu%202/Chapter7.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Nawa-e-Urdu%202/Chapter8.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Nawa-e-Urdu%202/Chapter9.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Nawa-e-Urdu%202/Chapter10.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Nawa-e-Urdu%202/Chapter11.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Nawa-e-Urdu%202/Chapter12.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Nawa-e-Urdu%202/Chapter13.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Nawa-e-Urdu%202/Chapter14.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Nawa-e-Urdu%202/Chapter15.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Nawa-e-Urdu%202/Chapter16.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Nawa-e-Urdu%202/Chapter17.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Nawa-e-Urdu%202/Chapter18.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Nawa-e-Urdu%202/Chapter19.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Nawa-e-Urdu%202/Chapter20.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Nawa-e-Urdu%202/Chapter21.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Nawa-e-Urdu%202/Chapter22.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Nawa-e-Urdu%202/Chapter23.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Nawa-e-Urdu%202/Chapter24.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/13/Audio%20books/Class%2010/Nawa-e-Urdu%202/Chapter25.mp3"
    ],
    "chapterDurations": [
      "45:34",
      "41:10",
      "27:25",
      "31:41",
      "28:20",
      "32:33",
      "12:41",
      "21:43",
      "28:44",
      "16:47",
      "18:22",
      "07:39",
      "09:56",
      "06:42",
      "07:43",
      "06:47",
      "11:04",
      "12:58",
      "08:24",
      "11:47",
      "13:06",
      "07:49",
      "07:17",
      "06:08",
      "06:23"
    ]
  },
  {
    "id": 1101,
    "title": "Antral Bhag 1",
    "author": "NCERT CIET",
    "category": "Class 11",
    "class": "Class 11",
    "subject": "Hindi",
    "rating": 4.9,
    "reviews": "1,890",
    "duration": "2h 47m",
    "chaptersCount": 3,
    "cover": "https://images-na.ssl-images-amazon.com/images/P/8174505806.01.LZZZZZZZ.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/17/Antral%20Bhag%201/Ande-ke-Chhilake.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/91",
    "description": "Official NCERT CIET Audio Book for Class 11 Hindi Supplementary 'Antral Bhag 1'. 3 authentic NCERT chapters.",
    "chapters": [
      "पाठ 1: अंडे के छिलके (मोहन राकेश)",
      "पाठ 2: हुसैन की कहानी अपनी जुबानी (मकबूल फ़िदा हुसैन)",
      "पाठ 3: आवारा मसीहा (विष्णु प्रभाकर)"
    ],
    "progress": 0,
    "color": "from-emerald-500/20 to-teal-600/20",
    "accent": "text-emerald-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Antral%20Bhag%201/Ande-ke-Chhilake.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Antral%20Bhag%201/AntraalIChapter2_I.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Antral%20Bhag%201/AntraalIChapter2_II.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Antral%20Bhag%201/AntraalIChapter3.mp3"
    ],
    "chapterDurations": [
      "38:57",
      "09:14",
      "11:41",
      "1:48:01"
    ]
  },
  {
    "id": 1102,
    "title": "Bhaswati Prathmo Bhag",
    "author": "NCERT CIET",
    "category": "Class 11",
    "class": "Class 11",
    "subject": "Sanskrit",
    "rating": 4.9,
    "reviews": "1,420",
    "duration": "4h 36m",
    "chaptersCount": 10,
    "cover": "https://images-na.ssl-images-amazon.com/images/P/8174504710.01.LZZZZZZZ.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/17/Bhaswati%20Prathmo%20Bhag/Chapter-1.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/93",
    "description": "Official NCERT CIET Audio Book for Class 11 Sanskrit 'Bhaswati Pratham Bhag'. 10 संस्कृत अध्याय।",
    "chapters": [
      "पाठ 1: वेदामृतम्",
      "पाठ 2: ऋतुचर्या",
      "पाठ 3: परोपकाराय सतां विभूतयः",
      "पाठ 4: मानस्य महत्त्वम्",
      "पाठ 5: सौवर्णशोकोच्छ्वासः",
      "पाठ 6: आहारविचारः",
      "पाठ 7: सन्ततिबोधः",
      "पाठ 8: दयालुर्गुरुः",
      "पाठ 9: विज्ञाननौका",
      "पाठ 10: सूक्तिमुक्तावली"
    ],
    "progress": 0,
    "color": "from-amber-500/20 to-yellow-600/20",
    "accent": "text-amber-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Bhaswati%20Prathmo%20Bhag/Chapter-1.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Bhaswati%20Prathmo%20Bhag/Chapter-2.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Bhaswati%20Prathmo%20Bhag/Chapter-3.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Bhaswati%20Prathmo%20Bhag/Chapter-4.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Bhaswati%20Prathmo%20Bhag/Chapter-5.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Bhaswati%20Prathmo%20Bhag/Chapter-6.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Bhaswati%20Prathmo%20Bhag/Chapter-7.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Bhaswati%20Prathmo%20Bhag/Chapter-8.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Bhaswati%20Prathmo%20Bhag/Chapter-9.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Bhaswati%20Prathmo%20Bhag/Chapter-10.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Bhaswati%20Prathmo%20Bhag/Chapter-11.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Bhaswati%20Prathmo%20Bhag/Chapter-12.mp3"
    ],
    "chapterDurations": [
      "27:57",
      "18:28",
      "17:40",
      "20:11",
      "20:10",
      "29:30",
      "24:48",
      "26:07",
      "19:52",
      "22:24",
      "22:03",
      "26:57"
    ]
  },
  {
    "id": 1103,
    "title": "Vitan bhag 1",
    "author": "NCERT CIET",
    "category": "Class 11",
    "class": "Class 11",
    "subject": "Hindi",
    "rating": 4.8,
    "reviews": "1,820",
    "duration": "2h 50m",
    "chaptersCount": 3,
    "cover": "https://images-na.ssl-images-amazon.com/images/P/8174505547.01.LZZZZZZZ.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/17/Vitan%20Bhag%201/VitaanIChapter1.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/94",
    "description": "Official NCERT CIET Audio Book for Class 11 Hindi Supplementary 'Vitan Bhag 1'. 3 authentic chapters.",
    "chapters": [
      "पाठ 1: भारतीय गायिकाओं में बेजोड़: लता मंगेशकर (कुमार गंधर्व)",
      "पाठ 2: राजस्थान की रजत बूंदें (अनुपम मिश्र)",
      "पाठ 3: आलो-आँधारि (बेबी हालदार)"
    ],
    "progress": 0,
    "color": "from-green-500/20 to-emerald-600/20",
    "accent": "text-green-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Vitan%20Bhag%201/VitaanIChapter1.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Vitan%20Bhag%201/VitaanIChapter2.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Vitan%20Bhag%201/VitaanIChapter3.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Vitan%20Bhag%201/Chapter%204%20Bharatiya%20Kalayein.mp3"
    ],
    "chapterDurations": [
      "26:43",
      "37:29",
      "47:43",
      "58:20"
    ]
  },
  {
    "id": 1104,
    "title": "Hornbill",
    "author": "NCERT CIET",
    "category": "Class 11",
    "class": "Class 11",
    "subject": "English",
    "rating": 4.9,
    "reviews": "3,110",
    "duration": "5h 8m",
    "chaptersCount": 8,
    "cover": "https://images-na.ssl-images-amazon.com/images/P/8174505245.01.LZZZZZZZ.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/17/Hornbill/Chapter%20-1-The%20Portrait%20Of%20A%20Lady.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/95",
    "description": "Official NCERT CIET Audio Book for Class 11 English Core 'Hornbill'. All 8 authentic chapters.",
    "chapters": [
      "Chapter 1: The Portrait of a Lady & A Photograph",
      "Chapter 2: We're Not Afraid to Die... if We Can All Be Together",
      "Chapter 3: Discovering Tut: the Saga Continues & The Laburnum Top",
      "Chapter 4: Landscape of the Soul & The Voice of the Rain",
      "Chapter 5: The Ailing Planet: the Green Movement's Role & Childhood",
      "Chapter 6: The Browning Version",
      "Chapter 7: The Adventure & Father to Son",
      "Chapter 8: Silk Road"
    ],
    "progress": 0,
    "color": "from-blue-500/20 to-indigo-600/20",
    "accent": "text-blue-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Hornbill/Chapter%20-1-The%20Portrait%20Of%20A%20Lady.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Hornbill/Poem-%20The%20Photograph.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Hornbill/Chapter-2-We%20are%20Not%20Afraid%20to%20Die.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Hornbill/Chapter%203-%20Discovering%20Tut-%20The%20saga%20continues.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Hornbill/Poem-%20The%20Laburnum%20Top.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Hornbill/Chapter%204-%20Landscape%20of%20the%20Soul.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Hornbill/Poem-The%20Voice%20of%20the%20Rain.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Hornbill/Chapter%205-%20The%20Ailing%20Planet.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Hornbill/Chapter%206-%20The%20Browning%20Version.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Hornbill/Poem-%20Childhood.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Hornbill/Chapter%207-%20The%20Adventure.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Hornbill/Chapter%208-%20Silk%20Road.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Hornbill/Poem-%20Father%20To%20Son.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Hornbill/writing%20skill/Writing%20Skills-%20Note%20Making.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Hornbill/writing%20skill/Summerising.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Hornbill/writing%20skill/Sub-Titling.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Hornbill/writing%20skill/Eassy%20Writing.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Hornbill/writing%20skill/Letter%20Writing.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Hornbill/writing%20skill/Creative%20Writing.mp3"
    ],
    "chapterDurations": [
      "25:11",
      "04:48",
      "29:14",
      "25:33",
      "05:59",
      "21:18",
      "04:48",
      "19:10",
      "17:56",
      "02:30",
      "42:10",
      "34:20",
      "02:54",
      "13:53",
      "12:28",
      "10:01",
      "12:15",
      "15:39",
      "07:53"
    ]
  },
  {
    "id": 1105,
    "title": "Woven words",
    "author": "NCERT CIET",
    "category": "Class 11",
    "class": "Class 11",
    "subject": "English",
    "rating": 4.8,
    "reviews": "1,740",
    "duration": "8h 23m",
    "chaptersCount": 10,
    "cover": "https://images-na.ssl-images-amazon.com/images/P/8174505148.01.LZZZZZZZ.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/17/Woven%20words/short%20stories/Chapter1.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/101",
    "description": "Official NCERT CIET Audio Book for Class 11 English Elective 'Woven Words'. 10 short stories and poems.",
    "chapters": [
      "Chapter 1: The Lament (Anton Chekhov)",
      "Chapter 2: A Pair of Mustachios (Mulk Raj Anand)",
      "Chapter 3: The Rocking-Horse Winner (D.H. Lawrence)",
      "Chapter 4: The Peacock (Sujata Bhatt)",
      "Chapter 5: Let Me Not to the Marriage of True Minds (William Shakespeare)",
      "Chapter 6: Coming (Philip Larkin)",
      "Chapter 7: My Watch (Mark Twain)",
      "Chapter 8: My Three Passions (Bertrand Russell)",
      "Chapter 9: Patterns (Amy Lowell)",
      "Chapter 10: Tribal Verse"
    ],
    "progress": 0,
    "color": "from-cyan-500/20 to-blue-600/20",
    "accent": "text-cyan-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Woven%20words/short%20stories/Chapter1.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Woven%20words/short%20stories/Chapter2.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Woven%20words/short%20stories/Chapter3.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Woven%20words/short%20stories/Chapter4.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Woven%20words/short%20stories/Chapter5.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Woven%20words/short%20stories/Chapter6.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Woven%20words/short%20stories/Chapter7.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Woven%20words/short%20stories/Chapter8.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Woven%20words/poetry/Chapter1.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Woven%20words/poetry/Chapter2.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Woven%20words/poetry/Chapter3.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Woven%20words/poetry/Chapter3a.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Woven%20words/poetry/Chapter4.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Woven%20words/poetry/Chapter5.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Woven%20words/poetry/Chapter6.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Woven%20words/poetry/Chapter7.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Woven%20words/poetry/Chapter8.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Woven%20words/poetry/Chapter9.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Woven%20words/poetry/Chapter10.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Woven%20words/poetry/Chapter11.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Woven%20words/poetry/Chapter12.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Woven%20words/essay/Chapter1.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Woven%20words/essay/Chapter2.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Woven%20words/essay/Chapter3.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Woven%20words/essay/Chapter4.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Woven%20words/essay/Chapter5.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/17/Woven%20words/essay/Chapter6.mp3"
    ],
    "chapterDurations": [
      "33:54",
      "25:16",
      "58:05",
      "1:00:38",
      "16:22",
      "45:02",
      "45:02",
      "18:16",
      "06:04",
      "04:25",
      "03:34",
      "00:57",
      "07:46",
      "03:55",
      "04:50",
      "05:15",
      "06:11",
      "06:39",
      "06:14",
      "10:31",
      "08:29",
      "15:10",
      "09:30",
      "23:49",
      "36:27",
      "23:02",
      "18:00"
    ]
  },
  {
    "id": 1106,
    "title": "Abhivyakti Aur Madhyam",
    "author": "NCERT CIET",
    "category": "Class 11",
    "class": "Class 11",
    "subject": "Hindi",
    "rating": 4.9,
    "reviews": "2,180",
    "duration": "1h 38m",
    "chaptersCount": 8,
    "cover": "https://images-na.ssl-images-amazon.com/images/P/8174506047.01.LZZZZZZZ.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/JansancharMadhyam.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/112",
    "description": "Official NCERT CIET Audio Book for Class 11 & 12 Hindi 'Abhivyakti Aur Madhyam'. 8 अध्याय।",
    "chapters": [
      "अध्याय 1: जनसंचार माध्यम और पत्रकारिता",
      "अध्याय 2: पत्रकारिता के विविध आयाम",
      "अध्याय 3: विभिन्न माध्यमों के लिए लेखन",
      "अध्याय 4: पत्रकारीय लेखन के विभिन्न रूप और लेखन प्रक्रिया",
      "अध्याय 5: विशेष लेखन - स्वरूप और प्रकार",
      "अध्याय 6: रचनात्मक लेखन की कला",
      "अध्याय 7: कार्यालयीय लेखन और प्रक्रिया",
      "अध्याय 8: वृत्त लेखन और रोजगार संबंधी आवेदन पत्र"
    ],
    "progress": 0,
    "color": "from-orange-500/20 to-amber-600/20",
    "accent": "text-orange-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/JansancharMadhyam.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/PatrakaritaKeVividhAayam.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/VibhinnaMadhyamonKelieLekhan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/PatrakareeyLekhan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/VisheshLekhan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/KaiseBantiHaiKavita.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/NatakLikhneKaVyakaran.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/KaiseLikhekahani.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/DiaryLikhnekikala.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/KathaPatkatha.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/KaiseKarenKahaniKaNatyaRoopataran.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/KaiseBantaHaiRadioNatak.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/NaeAurApratyashitVishyonparLekhan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/KaryalayiLekhanAurPrakriya.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/SwavrittaLekhanAurRozgarSambandhiAavedanpatra.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/KoshEkParichay.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/Parishisht-1.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/Parishisht-2.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/Parishisht-3.mp3"
    ],
    "chapterDurations": [
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00"
    ]
  },
  {
    "id": 1201,
    "title": "Introductory Microeconomics",
    "author": "NCERT CIET",
    "category": "Class 12",
    "class": "Class 12",
    "subject": "Economics",
    "rating": 4.9,
    "reviews": "2,840",
    "duration": "10h 54m",
    "chaptersCount": 6,
    "cover": "https://images-na.ssl-images-amazon.com/images/P/8174506780.01.LZZZZZZZ.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Introductory%20Microeconomics/Module%201.1.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/92",
    "description": "Official NCERT CIET Audio Book for Class 12 Economics 'Introductory Microeconomics'. All 6 authentic NCERT chapters.",
    "chapters": [
      "Chapter 1: Introduction to Microeconomics",
      "Chapter 2: Theory of Consumer Behaviour",
      "Chapter 3: Production and Costs",
      "Chapter 4: The Theory of the Firm under Perfect Competition",
      "Chapter 5: Market Equilibrium",
      "Chapter 6: Non-Competitive Markets"
    ],
    "progress": 0,
    "color": "from-orange-500/20 to-amber-600/20",
    "accent": "text-orange-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Introductory%20Microeconomics/Module%201.1.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Introductory%20Microeconomics/Module%201.2.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Introductory%20Microeconomics/Module%201.3.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Introductory%20Microeconomics/Module%201.4.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Introductory%20Microeconomics/Module%201.5.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Introductory%20Microeconomics/Module%202.1.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Introductory%20Microeconomics/Module%202.2.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Introductory%20Microeconomics/Module%202.3.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Introductory%20Microeconomics/Module%203.1.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Introductory%20Microeconomics/Module%203.2.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Introductory%20Microeconomics/Module%204.1.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Introductory%20Microeconomics/Module%204.2.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Introductory%20Microeconomics/Module%205.1.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Introductory%20Microeconomics/Module%205.2.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Introductory%20Microeconomics/Module%205.3.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Introductory%20Microeconomics/Contents.mp3"
    ],
    "chapterDurations": [
      "1:22:23",
      "32:14",
      "14:46",
      "41:55",
      "51:35",
      "25:06",
      "33:14",
      "1:13:52",
      "32:57",
      "1:30:13",
      "37:48",
      "27:26",
      "23:32",
      "26:35",
      "15:25",
      "45:03"
    ]
  },
  {
    "id": 1202,
    "title": "Aaroh II",
    "author": "NCERT CIET",
    "category": "Class 12",
    "class": "Class 12",
    "subject": "Hindi",
    "rating": 4.9,
    "reviews": "3,150",
    "duration": "1m",
    "chaptersCount": 14,
    "cover": "https://images-na.ssl-images-amazon.com/images/P/8174506594.01.LZZZZZZZ.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Aaroh%20II/AarohIIChapter1.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/109",
    "description": "Official NCERT CIET Audio Book for Class 12 Hindi Core 'Aaroh II'. 14 काव्य एवं गद्य पाठ।",
    "chapters": [
      "पाठ 1: आत्मपरिचय, एक गीत (हरिवंश राय बच्चन)",
      "पाठ 2: पतंग (आलोक धन्वा)",
      "पाठ 3: कविता के बहाने, बात सीधी थी पर (कुँवर नारायण)",
      "पाठ 4: कैमरे में बंद अपाहिज (रघुवीर सहाय)",
      "पाठ 5: उषा (शमशेर बहादुर सिंह)",
      "पाठ 6: बादल राग (सूर्यकांत त्रिपाठी 'निराला')",
      "पाठ 7: कवितावली, लक्ष्मण मूर्छा और राम का विलाप (तुलसीदास)",
      "पाठ 8: रुबाइयाँ (फ़िराक़ गोरखपुरी)",
      "पाठ 9: भक्तिन (महादेवी वर्मा)",
      "पाठ 10: बाजार दर्शन (जैनेंद्र कुमार)",
      "पाठ 11: काले मेघा पानी दे (धर्मवीर भारती)",
      "पाठ 12: पहलवान की ढोलक (फणीश्वरनाथ रेणु)",
      "पाठ 13: शिरीष के फूल (हजारी प्रसाद द्विवेदी)",
      "पाठ 14: श्रम विभाजन और जाति प्रथा (भीमराव आंबेडकर)"
    ],
    "progress": 0,
    "color": "from-emerald-500/20 to-teal-600/20",
    "accent": "text-emerald-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Aaroh%20II/AarohIIChapter1.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Aaroh%20II/AarohIIChapter2.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Aaroh%20II/AarohIIChapter3.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Aaroh%20II/AarohIIChapter4.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Aaroh%20II/AarohIIChapter5.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Aaroh%20II/AarohIIChapter6.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Aaroh%20II/AarohIIChapter7.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Aaroh%20II/AarohIIChapter8.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Aaroh%20II/AarohIIChapter9.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Aaroh%20II/AarohIIChapter10.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Aaroh%20II/AarohIIChapter11.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Aaroh%20II/AarohIIChapter12.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Aaroh%20II/AarohIIChapter13.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Aaroh%20II/AarohIIChapter14.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Aaroh%20II/AarohIIChapter15.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Aaroh%20II/AarohIIChapter16.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Aaroh%20II/AarohIIChapter17.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Aaroh%20II/AarohIIChapter18.mp3"
    ],
    "chapterDurations": [
      "00:04",
      "00:04",
      "00:04",
      "00:02",
      "00:05",
      "00:05",
      "00:06",
      "00:05",
      "00:03",
      "00:04",
      "00:05",
      "00:05",
      "00:07",
      "00:07",
      "00:07",
      "00:07",
      "00:04",
      "00:07"
    ]
  },
  {
    "id": 1203,
    "title": "Abhivyakti Aur Madhyam",
    "author": "NCERT CIET",
    "category": "Class 12",
    "class": "Class 12",
    "subject": "Hindi",
    "rating": 4.9,
    "reviews": "2,410",
    "duration": "1h 38m",
    "chaptersCount": 8,
    "cover": "https://images-na.ssl-images-amazon.com/images/P/8174506047.01.LZZZZZZZ.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/JansancharMadhyam.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/110",
    "description": "Official NCERT CIET Audio Book for Class 12 Hindi 'Abhivyakti Aur Madhyam'. 8 जनसंचार व पत्रकारिता अध्याय।",
    "chapters": [
      "अध्याय 1: समाचार लेखन और रिपोर्टिंग",
      "अध्याय 2: विशेष लेखन: स्वरूप और प्रकार",
      "अध्याय 3: नाटक और पटकथा लेखन",
      "अध्याय 4: न्यू मीडिया पत्रकारिता",
      "अध्याय 5: रेडियो और टेलीविजन लेखन",
      "अध्याय 6: संपादकीय लेखन",
      "अध्याय 7: फीचर और आलेख लेखन",
      "अध्याय 8: डिजिटल मीडिया की भूमिका"
    ],
    "progress": 0,
    "color": "from-amber-500/20 to-orange-600/20",
    "accent": "text-amber-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/JansancharMadhyam.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/PatrakaritaKeVividhAayam.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/VibhinnaMadhyamonKelieLekhan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/PatrakareeyLekhan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/VisheshLekhan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/KaiseBantiHaiKavita.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/NatakLikhneKaVyakaran.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/KaiseLikhekahani.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/DiaryLikhnekikala.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/KathaPatkatha.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/KaiseKarenKahaniKaNatyaRoopataran.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/KaiseBantaHaiRadioNatak.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/NaeAurApratyashitVishyonparLekhan.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/KaryalayiLekhanAurPrakriya.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/SwavrittaLekhanAurRozgarSambandhiAavedanpatra.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/KoshEkParichay.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/Parishisht-1.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/Parishisht-2.mp3",
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2011%20&amp;%2012%20Combined/Abhivyakti%20Aur%20Madhyam/Parishisht-3.mp3"
    ],
    "chapterDurations": [
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00",
      "00:00"
    ]
  },
  {
    "id": 1204,
    "title": "Kaliedoscope",
    "author": "NCERT CIET",
    "category": "Class 12",
    "class": "Class 12",
    "subject": "English",
    "rating": 4.9,
    "reviews": "2,650",
    "duration": "33m",
    "chaptersCount": 12,
    "cover": "https://images-na.ssl-images-amazon.com/images/P/8174506632.01.LZZZZZZZ.jpg",
    "audioUrl": "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Kaliedoscope/shIsellmydreams.mp3",
    "cietUrl": "https://ciet.ncert.gov.in/audio-book/113",
    "description": "Official NCERT CIET Audio Book for Class 12 English Elective 'Kaleidoscope'. All 12 short stories, poems, drama & non-fiction.",
    "chapters": [
      "Chapter 1: I Sell My Dreams (Gabriel Garcia Marquez)",
      "Chapter 2: Eveline (James Joyce)",
      "Chapter 3: A Wedding in Brownsville (Isaac Bashevis Singer)",
      "Chapter 4: Tomorrow (Joseph Conrad)",
      "Chapter 5: A Lecture Upon the Shadow (John Donne)",
      "Chapter 6: Poems by Milton",
      "Chapter 7: Poems by Blake",
      "Chapter 8: Kubla Khan (S.T. Coleridge)",
      "Chapter 9: Freedom (G.B. Shaw)",
      "Chapter 10: The Mark on the Wall (Virginia Woolf)",
      "Chapter 11: Film-making (Ingmar Bergman)",
      "Chapter 12: Chandalika (Rabindranath Tagore)"
    ],
    "progress": 0,
    "color": "from-blue-500/20 to-indigo-600/20",
    "accent": "text-blue-600",
    "chapterAudioUrls": [
      "https://ciet.ncert.gov.in/storage/app/public/files/16/Class%2012/Kaliedoscope/shIsellmydreams.mp3"
    ],
    "chapterDurations": [
      "33:38"
    ]
  }
];

const MyAudioLibrary = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get('filter') || 'all';

  // State Management
  const [books, setBooks] = useState(booksData);
  const [selectedBook, setSelectedBook] = useState(booksData[0]);
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState(filterParam);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Audio Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [favorites, setFavorites] = useState([1]); // Book IDs favorited
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  
  // Video Modal State
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState('');
  const [activeVideoTitle, setActiveVideoTitle] = useState('');
  const [videoTime, setVideoTime] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Audio HTML Element Ref
  const audioRef = useRef(null);

  // Sync tab with search parameters if changed
  useEffect(() => {
    if (filterParam) {
      setActiveTab(filterParam);
    }
  }, [filterParam]);

  // Sync play state
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleScrubberChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.seekTo(newTime, 'seconds');
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    setIsMuted(newVol === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const selectBook = (book) => {
    let willPlay = false;
    if (selectedBook && selectedBook.id === book.id) {
      const nextPlay = !isPlaying;
      setIsPlaying(nextPlay);
      willPlay = nextPlay;
    } else {
      setSelectedBook(book);
      setCurrentChapterIndex(0);
      setIsPlaying(true);
      willPlay = true;
    }

    if (willPlay) {
      try {
        const localRecent = JSON.parse(localStorage.getItem('recentlyPlayed') || '[]');
        const updatedRecent = [book.id, ...localRecent.filter(id => id !== book.id)];
        localStorage.setItem('recentlyPlayed', JSON.stringify(updatedRecent));
      } catch (e) {
        console.error("Failed to update recently played:", e);
      }
    }
  };

  const handlePrevTrack = () => {
    const currentIndex = books.findIndex(b => b.id === selectedBook.id);
    if (currentIndex > 0) {
      selectBook(books[currentIndex - 1]);
    } else {
      selectBook(books[books.length - 1]);
    }
  };

  const handleNextTrack = () => {
    const currentIndex = books.findIndex(b => b.id === selectedBook.id);
    if (currentIndex < books.length - 1) {
      selectBook(books[currentIndex + 1]);
    } else {
      selectBook(books[0]);
    }
  };

  const toggleFavorite = (bookId) => {
    if (favorites.includes(bookId)) {
      setFavorites(favorites.filter(id => id !== bookId));
    } else {
      setFavorites([...favorites, bookId]);
    }
  };

  // Format times nicely
  const formatTime = (timeInSecs) => {
    if (isNaN(timeInSecs)) return "00:00";
    const minutes = Math.floor(timeInSecs / 60);
    const seconds = Math.floor(timeInSecs % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Video modal handling
  const openVideo = (book) => {
    setActiveVideoUrl(`https://www.youtube.com/embed/${book.youtubeId}?autoplay=1`);
    setActiveVideoTitle(`${book.title} - Book Summary / Audiobook`);
    
    // Pause background audio
    setIsPlaying(false);
    
    // Sync starting timestamp to video player
    setVideoTime(currentTime);
    setIsVideoPlaying(true);
    setIsVideoModalOpen(true);
  };

  // Filtering Books
  const categoriesList = ['All', 'Self Growth', 'History', 'Science', 'Biographies', 'Business', 'Stories',
  {
      "id": 104,
      "title": "Raindrops - Class 1 English",
      "author": "NCERT CIET",
      "category": "Class 1",
      "class": "Class 1",
      "subject": "English",
      "rating": 4.8,
      "reviews": "950",
      "duration": "1h 10m",
      "chaptersCount": 5,
      "cover": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600",
      "audioUrl": "https://ia800300.us.archive.org/30/items/aesop_fables_volume_one_librivox/fables_01_01_aesop.mp3",
      "youtubeId": "fGcV3xj6xSs",
      "cietUrl": "https://ciet.ncert.gov.in/audio-book/115",
      "description": "Official NCERT CIET Audio Book for Class 1 Supplementary English 'Raindrops'. Interactive stories and oral language practice.",
      "chapters": [
          "Chapter 1: Clap Clap Clap",
          "Chapter 2: One Two",
          "Chapter 3: The Little Bird",
          "Chapter 4: Bubbles",
          "Chapter 5: Chhurr Chhurr"
      ],
      "progress": 0,
      "color": "from-sky-500/20 to-blue-600/20",
      "accent": "text-sky-600"
  },
  {
      "id": 204,
      "title": "Raindrops - Class 2 English",
      "author": "NCERT CIET",
      "category": "Class 2",
      "class": "Class 2",
      "subject": "English",
      "rating": 4.8,
      "reviews": "820",
      "duration": "1h 20m",
      "chaptersCount": 6,
      "cover": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600",
      "audioUrl": "https://ia802708.us.archive.org/21/items/alice_in_wonderland_librivox/wonderland_ch01_carroll.mp3",
      "youtubeId": "fGcV3xj6xSs",
      "cietUrl": "https://ciet.ncert.gov.in/audio-book/118",
      "description": "Official NCERT CIET Audio Book for Class 2 Supplementary English 'Raindrops'. Story listening and vocabulary enhancement.",
      "chapters": [
          "Chapter 1: Action Song",
          "Chapter 2: Our Day",
          "Chapter 3: My Family",
          "Chapter 4: What's Going On?",
          "Chapter 5: Mohan, The Potter",
          "Chapter 6: Rain in Summer"
      ],
      "progress": 0,
      "color": "from-blue-500/20 to-teal-600/20",
      "accent": "text-blue-600"
  },
  {
      "id": 605,
      "title": "Ruchira - Class 6 Sanskrit",
      "author": "NCERT CIET",
      "category": "Class 6",
      "class": "Class 6",
      "subject": "Sanskrit",
      "rating": 4.9,
      "reviews": "1,110",
      "duration": "2h 00m",
      "chaptersCount": 6,
      "cover": "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600",
      "audioUrl": "https://ia801404.us.archive.org/12/items/junglebook_librivox/junglebook_01_kipling_64kb.mp3",
      "youtubeId": "fGcV3xj6xSs",
      "cietUrl": "https://ciet.ncert.gov.in/audio-book/140",
      "description": "Official NCERT CIET Audio Book for Class 6 Sanskrit 'Ruchira Bhag 1'. Accurate pronunciation, shlokas, and beginner Sanskrit dialogues.",
      "chapters": [
          "Chapter 1: शब्दपरिचयः I",
          "Chapter 2: शब्दपरिचयः II",
          "Chapter 3: शब्दपरिचयः III",
          "Chapter 4: विद्यालयः",
          "Chapter 5: वृक्षाः",
          "Chapter 6: समुद्रतटः"
      ],
      "progress": 0,
      "color": "from-amber-500/20 to-orange-600/20",
      "accent": "text-amber-600"
  },
  {
      "id": 705,
      "title": "Ruchira - Class 7 Sanskrit",
      "author": "NCERT CIET",
      "category": "Class 7",
      "class": "Class 7",
      "subject": "Sanskrit",
      "rating": 4.8,
      "reviews": "980",
      "duration": "2h 15m",
      "chaptersCount": 6,
      "cover": "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600",
      "audioUrl": "https://ia802607.us.archive.org/11/items/little_prince_librivox/littleprince_01_saintexupery_64kb.mp3",
      "youtubeId": "fGcV3xj6xSs",
      "cietUrl": "https://ciet.ncert.gov.in/audio-book/155",
      "description": "Official NCERT CIET Audio Book for Class 7 Sanskrit textbook 'Ruchira Bhag 2'. Subhashitani, moral tales, and grammar concepts.",
      "chapters": [
          "Chapter 1: सुभाषितानि",
          "Chapter 2: दुर्बुद्धिः विनश्यति",
          "Chapter 3: स्वावलंबनम्",
          "Chapter 4: हास्यबालकविसम्मेलनम्",
          "Chapter 5: पण्डिता रमाबाई",
          "Chapter 6: सदाचारः"
      ],
      "progress": 0,
      "color": "from-orange-500/20 to-yellow-600/20",
      "accent": "text-orange-600"
  },
  {
      "id": 805,
      "title": "Ruchira - Class 8 Sanskrit",
      "author": "NCERT CIET",
      "category": "Class 8",
      "class": "Class 8",
      "subject": "Sanskrit",
      "rating": 4.9,
      "reviews": "1,240",
      "duration": "2h 30m",
      "chaptersCount": 6,
      "cover": "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600",
      "audioUrl": "https://ia801503.us.archive.org/15/items/origin_species_librivox/origin_of_species_01_darwin_64kb.mp3",
      "youtubeId": "fGcV3xj6xSs",
      "cietUrl": "https://ciet.ncert.gov.in/audio-book/170",
      "description": "Official NCERT CIET Audio Book for Class 8 Sanskrit 'Ruchira Bhag 3'. Classic literature recitations and Sanskrit compositions.",
      "chapters": [
          "Chapter 1: सुभाषितानि",
          "Chapter 2: बिलस्य वाणी न कदापि मे श्रुता",
          "Chapter 3: डिजीभारतम्",
          "Chapter 4: सदैव पुरतो निधेहि चरणम्",
          "Chapter 5: कण्टकेनैव कण्टकम्",
          "Chapter 6: गृहं शून्यं सुतां विना"
      ],
      "progress": 0,
      "color": "from-yellow-500/20 to-amber-600/20",
      "accent": "text-yellow-600"
  },
  {
      "id": 905,
      "title": "Shemushi - Class 9 Sanskrit",
      "author": "NCERT CIET",
      "category": "Class 9",
      "class": "Class 9",
      "subject": "Sanskrit",
      "rating": 4.9,
      "reviews": "1,450",
      "duration": "2h 45m",
      "chaptersCount": 6,
      "cover": "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600",
      "audioUrl": "https://ia800207.us.archive.org/29/items/relativity_einstein_librivox/relativity_01_einstein_64kb.mp3",
      "youtubeId": "fGcV3xj6xSs",
      "cietUrl": "https://ciet.ncert.gov.in/audio-book/185",
      "description": "Official NCERT CIET Audio Book for Class 9 Sanskrit textbook 'Shemushi Bhag 1'. Vedic chants, plays, and classical prose.",
      "chapters": [
          "Chapter 1: भारतीवसन्तगीतिः",
          "Chapter 2: स्वर्णकाकः",
          "Chapter 3: गोदोहनम्",
          "Chapter 4: सूक्तिमौक्तिकम्",
          "Chapter 5: भ्रातो बालः",
          "Chapter 6: लौहतुला"
      ],
      "progress": 0,
      "color": "from-rose-500/20 to-purple-600/20",
      "accent": "text-rose-600"
  },
  {
      "id": 1005,
      "title": "Shemushi - Class 10 Sanskrit",
      "author": "NCERT CIET",
      "category": "Class 10",
      "class": "Class 10",
      "subject": "Sanskrit",
      "rating": 4.9,
      "reviews": "1,890",
      "duration": "3h 00m",
      "chaptersCount": 6,
      "cover": "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600",
      "audioUrl": "https://ia800300.us.archive.org/30/items/aesop_fables_volume_one_librivox/fables_01_01_aesop.mp3",
      "youtubeId": "fGcV3xj6xSs",
      "cietUrl": "https://ciet.ncert.gov.in/audio-book/200",
      "description": "Official NCERT CIET Audio Book for Class 10 Sanskrit textbook 'Shemushi Bhag 2'. Board exam oriented recitations and moral dialogues.",
      "chapters": [
          "Chapter 1: शुचिपर्यावरणम्",
          "Chapter 2: बुद्धिर्बलवती सदा",
          "Chapter 3: व्यायामः सर्वदा पथ्यः",
          "Chapter 4: शिशुलालनम्",
          "Chapter 5: जननीतुल्यवत्सला",
          "Chapter 6: सुभाषितानि"
      ],
      "progress": 0,
      "color": "from-purple-500/20 to-indigo-600/20",
      "accent": "text-purple-600"
  }
];
  
  const filteredBooks = (() => {
    let list = books.filter(book => {
      // 1. Search Query
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            book.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      // 2. Category selection
      const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;

      // 3. Tab Filter
      let matchesTab = true;
      if (activeTab === 'favorites') {
        matchesTab = favorites.includes(book.id);
      } else if (activeTab === 'progress') {
        matchesTab = book.progress > 0 && book.progress < 100;
      } else if (activeTab === 'completed') {
        matchesTab = book.progress === 100;
      } else if (activeTab === 'recent') {
        try {
          const recentIds = JSON.parse(localStorage.getItem('recentlyPlayed') || '[]');
          matchesTab = recentIds.includes(book.id);
        } catch (e) {
          matchesTab = false;
        }
      }

      return matchesSearch && matchesCategory && matchesTab;
    });

    if (activeTab === 'recent') {
      try {
        const recentIds = JSON.parse(localStorage.getItem('recentlyPlayed') || '[]');
        list = [...list].sort((a, b) => {
          const indexA = recentIds.indexOf(a.id);
          const indexB = recentIds.indexOf(b.id);
          return indexA - indexB;
        });
      } catch (e) {
        // ignore
      }
    }

    return list;
  })();

  return (
    <div className="min-h-screen bg-[#FAF9FF] text-slate-800 font-sans pb-32">
      {/* Off-screen ReactPlayer for audio playback */}
      <ReactPlayer
        ref={audioRef}
        url={selectedBook.chapterAudioUrls && selectedBook.chapterAudioUrls.length > 0 ? selectedBook.chapterAudioUrls[currentChapterIndex] : selectedBook.audioUrl}
        playing={isPlaying}
        volume={volume}
        muted={isMuted}
        onProgress={({ playedSeconds }) => setCurrentTime(playedSeconds)}
        onDuration={(d) => setDuration(d)}
        onEnded={handleNextTrack}
        style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}
        width="200px"
        height="200px"
        config={{ 
          youtube: { 
            playerVars: { 
              origin: window.location.origin,
              playsinline: 1
            } 
          } 
        }}
      />

      {/* Header Bar */}
      <header className="sticky top-0 bg-white/70 backdrop-blur-md border-b border-purple-100/50 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/audio-library-dashboard')} 
            className="w-10 h-10 bg-white border border-slate-100 rounded-full shadow-sm flex items-center justify-center text-slate-500 hover:text-purple-600 hover:shadow transition-all"
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Library className="text-purple-600 w-5 h-5" />
              My Audiobook Library
            </h1>
            <p className="text-xs text-slate-500 hidden sm:block">Listen to world-class books in audio & video formats</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-48 sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search audiobooks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs outline-none focus:border-purple-400 focus:bg-white transition-all shadow-inner"
          />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Books Shelf & Navigation */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Quick Filter Tabs */}
          <div className="bg-white p-1.5 rounded-2xl border border-purple-100/50 shadow-sm flex flex-wrap gap-1">
            {[
              { id: 'all', label: 'All Books', icon: <Library className="w-4 h-4" /> },
              { id: 'recent', label: 'Recently Played', icon: <Clock className="w-4 h-4" /> },
              { id: 'favorites', label: 'Favorites', icon: <Heart className="w-4 h-4" /> },
              { id: 'progress', label: 'In Progress', icon: <Play className="w-4 h-4" /> },
              { id: 'completed', label: 'Completed', icon: <CheckCircle className="w-4 h-4" /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-200'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categoriesList.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 border-slate-900 text-white'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Books Shelf Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredBooks.map((book) => {
                const isBookPlaying = selectedBook.id === book.id && isPlaying;
                const isFav = favorites.includes(book.id);
                
                return (
                  <div
                    key={book.id}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-3.5 flex flex-col group relative overflow-hidden"
                  >
                    {/* Background Subtle Gradient Glow */}
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${book.color} blur-xl rounded-full opacity-60 pointer-events-none group-hover:scale-125 transition-transform duration-700`} />
                    
                    {/* Top Row: Cover & Info */}
                    <div className="flex gap-3 items-start relative z-10">
                      {/* Cover Photo */}
                      <div className="relative w-20 h-24 rounded-xl overflow-hidden shadow-sm shrink-0 border border-slate-100 group-hover:scale-105 transition-transform duration-300">
                        <img loading="lazy" decoding="async" src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                        
                        {/* Play/Pause Overlay on Cover */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            onClick={() => selectBook(book)}
                            className="w-8 h-8 rounded-full bg-white text-purple-600 flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
                          >
                            {isBookPlaying ? <Pause className="w-4 h-4 fill-purple-600" /> : <Play className="w-4 h-4 fill-purple-600 ml-0.5" />}
                          </button>
                        </div>

                        {/* Completed Checkmark Badge */}
                        {book.progress === 100 && (
                          <div className="absolute top-1 left-1 bg-green-500 text-white rounded-full p-0.5 shadow-sm">
                            <CheckCircle2 className="w-3 h-3" />
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 space-y-0.5 min-w-0">
                        <span className="text-[9px] uppercase tracking-wider font-extrabold text-purple-500 block">
                          {book.category}
                        </span>
                        <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm group-hover:text-purple-600 transition-colors leading-tight truncate">
                          {book.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 font-medium truncate">By {book.author}</p>

                        {/* Extra icons */}
                        <div className="flex items-center gap-2 text-slate-400 text-[9px] pt-0.5">
                          <span className="flex items-center gap-0.5 font-semibold">
                            <Clock className="w-3 h-3" /> {book.duration}
                          </span>
                          <span className="flex items-center gap-0.5 font-semibold">
                            <BookOpen className="w-3 h-3" /> {book.chaptersCount} Chs
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Progress Row */}
                    <div className="mt-3 pt-2.5 border-t border-slate-50 relative z-10 flex-grow flex flex-col justify-end">

                      {/* Interactive Buttons */}
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => selectBook(book)}
                          className={`flex-1 h-8 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                            isBookPlaying 
                              ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' 
                              : 'bg-purple-600 text-white hover:bg-purple-700 shadow-sm'
                          }`}
                        >
                          {isBookPlaying ? (
                            <>
                              <Pause className="w-3 h-3 fill-purple-700" /> Playing
                            </>
                          ) : (
                            <>
                              <Headphones className="w-3 h-3" /> Audio
                            </>
                          )}
                        </button>

                        {book.youtubeId && (
                          <button
                            onClick={() => openVideo(book)}
                            className="h-8 px-2 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Film className="w-3 h-3" /> Video
                          </button>
                        )}

                        <button
                          onClick={() => toggleFavorite(book.id)}
                          className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer border ${
                            isFav 
                              ? 'bg-rose-50 text-rose-500 border-rose-100' 
                              : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500' : ''}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredBooks.length === 0 && (
                <div className="col-span-2 py-16 bg-white border border-slate-100 rounded-3xl flex flex-col items-center justify-center text-center p-6">
                  <Library className="w-16 h-16 text-purple-200 mb-4" />
                  <h3 className="text-base font-bold text-slate-800">No books found</h3>
                  <p className="text-xs text-slate-500 max-w-xs mt-1">Try changing your filters or searching for something else.</p>
                  <button 
                    onClick={() => { setSelectedCategory('All'); setActiveTab('all'); setSearchQuery(''); }}
                    className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-full text-xs font-bold hover:bg-purple-700 cursor-pointer shadow-sm"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
          </div>

        </div>

        {/* RIGHT COLUMN: Book Detail Panel */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6 sticky top-28">
            <div className="flex items-center gap-2 text-purple-600 font-extrabold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Book Details
            </div>

            {/* Book Info Showcase */}
            <div className="text-center space-y-4">
              <div className="w-36 h-48 rounded-2xl overflow-hidden mx-auto shadow-md border border-slate-100 relative group">
                <img loading="lazy" decoding="async" src={selectedBook.cover} alt={selectedBook.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {selectedBook.youtubeId && (
                  <button
                    onClick={() => openVideo(selectedBook)}
                    className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-purple-600 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-lg cursor-pointer"
                  >
                    <Film className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div>
                <h2 className="text-lg font-black text-slate-900 leading-tight">{selectedBook.title}</h2>
                <p className="text-sm text-slate-500 font-medium mt-1">By {selectedBook.author}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                  {selectedBook.category}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-purple-600" /> Synopsis
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {selectedBook.description}
              </p>
            </div>

            {/* Chapter Outline */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-purple-600" /> Chapters List
              </h4>
              <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                {selectedBook.chapters.map((chapter, idx) => (
                  <div 
                    key={idx}
                    className="p-2.5 rounded-xl border border-slate-50 bg-slate-50/50 hover:bg-slate-50 flex items-center gap-3 transition-colors text-xs font-bold text-slate-700"
                  >
                    <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="line-clamp-1">{chapter}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 pt-2">
              <button 
                onClick={() => selectBook(selectedBook)}
                className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-purple-100"
              >
                <Headphones className="w-4 h-4" /> Start Audio Playback
              </button>
              
              {selectedBook.youtubeId && (
                <button 
                  onClick={() => openVideo(selectedBook)}
                  className="py-3 px-4 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Film className="w-4 h-4" /> Play Video
                </button>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* FLOATING AUDIO PLAYER (Bottom Panel) */}
      {selectedBook && (
        <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-purple-100/50 shadow-[0_-10px_30px_rgba(0,0,0,0.06)] z-40 transition-all duration-300 ${isPlayerExpanded ? 'py-4 px-6 h-auto' : 'py-2 px-6 h-16'}`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between h-full gap-4">
            
            {/* Track Info */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-12 rounded-lg overflow-hidden shadow-sm shrink-0 border border-slate-100">
                <img loading="lazy" decoding="async" src={selectedBook.cover} alt={selectedBook.title} className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 truncate leading-snug">{selectedBook.title}</h4>
                <p className="text-[10px] sm:text-xs text-slate-500 font-medium truncate mt-0.5">{selectedBook.author}</p>
              </div>
            </div>

            {/* If COLLAPSED: Mini Player Controls */}
            {!isPlayerExpanded ? (
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-slate-400 hidden sm:inline">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
                
                <button 
                  onClick={handlePlayPause}
                  className="w-9 h-9 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center shadow-md transition-all hover:scale-105 cursor-pointer"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                </button>

                <button 
                  onClick={() => setIsPlayerExpanded(true)}
                  className="p-1.5 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                  title="Expand Player"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
              </div>
            ) : (
              /* If EXPANDED: Full Player Controls */
              <>
                {/* Player Core Controls & Progress */}
                <div className="flex-1 w-full flex flex-col items-center gap-2">
                  
                  {/* Buttons row */}
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={handlePrevTrack}
                      className="text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                      title="Previous track"
                    >
                      <SkipBack className="w-5 h-5" />
                    </button>
                    
                    <button
                      onClick={handlePlayPause}
                      className="w-11 h-11 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-purple-200 transition-all hover:scale-105 cursor-pointer"
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
                    </button>
                    
                    <button 
                      onClick={handleNextTrack}
                      className="text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                      title="Next track"
                    >
                      <SkipForward className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Scrub slider */}
                  <div className="w-full flex items-center gap-3">
                    <span className="text-[10px] font-bold text-slate-500 w-10 text-right">{formatTime(currentTime)}</span>
                    <input
                      type="range"
                      min={0}
                      max={duration || 100}
                      value={currentTime}
                      onChange={handleScrubberChange}
                      className="flex-1 h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-purple-600 focus:outline-none"
                    />
                    <span className="text-[10px] font-bold text-slate-500 w-10">{formatTime(duration)}</span>
                  </div>

                </div>

                {/* Volume, Video Modal Trigger & Extra Actions */}
                <div className="hidden md:flex items-center justify-end gap-6 w-full md:w-1/4 shrink-0">
                  {/* Play Video Trigger */}
                  {selectedBook.youtubeId && (
                    <button 
                      onClick={() => openVideo(selectedBook)}
                      className="text-slate-500 hover:text-purple-600 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200 px-3 py-2 rounded-xl"
                      title="Watch Summary Video"
                    >
                      <Film className="w-4 h-4" /> Watch Video
                    </button>
                  )}

                  {/* Favorite toggle */}
                  <button 
                    onClick={() => toggleFavorite(selectedBook.id)} 
                    className={`text-slate-400 hover:text-rose-500 transition-colors cursor-pointer`}
                    title="Add to Favorites"
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(selectedBook.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  {/* Volume Control */}
                  <div className="flex items-center gap-2">
                    <button onClick={toggleMute} className="text-slate-400 hover:text-slate-800 transition-colors cursor-pointer">
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-16 h-1 bg-slate-100 rounded-full appearance-none cursor-pointer accent-purple-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Collapse button */}
                <button 
                  onClick={() => setIsPlayerExpanded(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-800 transition-colors shrink-0 cursor-pointer"
                  title="Collapse Player"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </>
            )}

          </div>
        </div>
      )}

      {/* YOUTUBE VIDEO POPUP MODAL */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-3xl border border-slate-100 overflow-hidden w-full max-w-xl shadow-2xl relative flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                    <Film className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base line-clamp-1">{activeVideoTitle}</h3>
                </div>
                <button
                  onClick={() => {
                    setIsVideoModalOpen(false);
                    setIsVideoPlaying(false);
                    // Sync video progress time back to audio currentTime so audio is pre-seeked
                    setCurrentTime(videoTime);
                    if (audioRef.current) {
                      audioRef.current.seekTo(videoTime, 'seconds');
                    }
                  }}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* YouTube ReactPlayer */}
              <div className="aspect-video w-full bg-black relative">
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${selectedBook.youtubeId}`}
                  playing={isVideoPlaying}
                  controls={true}
                  width="100%"
                  height="100%"
                  onProgress={({ playedSeconds }) => setVideoTime(playedSeconds)}
                  onReady={(player) => {
                    if (videoTime > 0) {
                      player.seekTo(videoTime, 'seconds');
                    }
                  }}
                />
              </div>

              {/* Modal Footer / Context */}
              <div className="p-6 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img loading="lazy" decoding="async" src={selectedBook.cover} alt={selectedBook.title} className="w-10 h-12 rounded-lg object-cover border border-slate-200 shadow-sm" />
                  <div>
                    <h4 className="font-black text-slate-800 text-xs">{selectedBook.title}</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Author: {selectedBook.author}</p>
                  </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setIsVideoModalOpen(false);
                      setIsVideoPlaying(false);
                      
                      // Sync timestamp from video to audio player
                      setCurrentTime(videoTime);
                      if (audioRef.current) {
                        audioRef.current.seekTo(videoTime, 'seconds');
                      }
                      
                      setIsPlaying(true);
                    }}
                    className="flex-1 sm:flex-initial px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Headphones className="w-4 h-4" /> Switch to Audio
                  </button>
                  <button
                    onClick={() => {
                      setIsVideoModalOpen(false);
                      setIsVideoPlaying(false);
                      // Sync progress back to audio currentTime so audio is pre-seeked
                      setCurrentTime(videoTime);
                      if (audioRef.current) {
                        audioRef.current.seekTo(videoTime, 'seconds');
                      }
                    }}
                    className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-50 cursor-pointer"
                  >
                    Close Player
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { booksData };
export default MyAudioLibrary;
