import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Headphones, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, 
  Heart, Bookmark, Clock, BookOpen, Star, Sparkles, Film, X, Search, CheckCircle, 
  Library, RotateCcw, Award, CheckCircle2, ChevronRight, Layers, FileText, ChevronUp, ChevronDown
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

const booksData = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Stories",
    rating: 4.9,
    reviews: "1,240",
    duration: "4h 15m",
    chaptersCount: 5,
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
    audioUrl: "https://www.youtube.com/watch?v=fKXr0wyw1gA",
    youtubeId: "fKXr0wyw1gA",
    description: "A magical story about Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure. His quest will lead him to riches far different—and far more satisfying—than he ever imagined.",
    chapters: ["Santiago's Dream & The Fortune Teller", "The Old King of Salem", "Crossing the Desert & The Oasis", "Meeting the Alchemist", "The Pyramids & The Real Treasure"],
    progress: 45,
    color: "from-amber-500/20 to-orange-600/20",
    accent: "text-amber-600"
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Growth",
    rating: 4.8,
    reviews: "3,820",
    duration: "5h 30m",
    chaptersCount: 4,
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400",
    audioUrl: "https://www.youtube.com/watch?v=4r6Vdjx9RqA",
    youtubeId: "4r6Vdjx9RqA",
    description: "No matter your goals, Atomic Habits offers a proven framework for improving every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies to build good habits and break bad ones.",
    chapters: ["The Surprising Power of Atomic Habits", "How Your Habits Shape Your Identity", "The 1st & 2nd Laws: Make it Obvious & Attractive", "The 3rd & 4th Laws: Make it Easy & Satisfying"],
    progress: 10,
    color: "from-blue-500/20 to-indigo-600/20",
    accent: "text-blue-600"
  },
  {
    id: 3,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    category: "Business",
    rating: 4.7,
    reviews: "2,980",
    duration: "6h 12m",
    chaptersCount: 6,
    cover: "https://images.unsplash.com/photo-1592492159418-09f31333cca8?auto=format&fit=crop&q=80&w=400",
    audioUrl: "https://www.youtube.com/watch?v=wF293QPbmvo",
    youtubeId: "wF293QPbmvo",
    description: "Robert Kiyosaki's legendary book explodes the myth that you need to earn a high income to be rich and explains the difference between working for money and having your money work for you.",
    chapters: ["Lesson 1: The Rich Don't Work for Money", "Lesson 2: Why Teach Financial Literacy?", "Lesson 3: Mind Your Own Business", "Lesson 4: The History of Taxes & Power of Corporations", "Lesson 5: The Rich Invent Money", "Lesson 6: Work to Learn—Don't Work for Money"],
    progress: 85,
    color: "from-emerald-500/20 to-teal-600/20",
    accent: "text-emerald-600"
  },
  {
    id: 4,
    title: "The Little Prince",
    author: "Antoine de Saint-Exupéry",
    category: "Stories",
    rating: 4.9,
    reviews: "950",
    duration: "2h 45m",
    chaptersCount: 4,
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
    audioUrl: "https://www.youtube.com/watch?v=83qff2e_1io",
    youtubeId: "83qff2e_1io",
    description: "A beautiful moral tale about a pilot stranded in the desert who meets a young prince fallen to Earth from a tiny asteroid. A story about friendship, love, and what is truly important in life.",
    chapters: ["The Pilot in the Sahara Desert", "Meeting the Asteroid Prince", "The Journey Across Six Planets", "The Fox's Golden Secret & Earth"],
    progress: 100,
    color: "from-purple-500/20 to-pink-600/20",
    accent: "text-purple-600"
  },
  {
    id: 5,
    title: "Sherlock Holmes",
    author: "Arthur Conan Doyle",
    category: "Stories",
    rating: 4.6,
    reviews: "1,110",
    duration: "4h 50m",
    chaptersCount: 5,
    cover: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&q=80&w=400",
    audioUrl: "https://www.youtube.com/watch?v=A4TU2h_rDlM",
    youtubeId: "A4TU2h_rDlM",
    description: "The classic introduction to the world's most famous consulting detective, Sherlock Holmes, and his companion Dr. John Watson, as they solve their first mystery: the Lauriston Gardens murder.",
    chapters: ["Meet Mr. Sherlock Holmes", "The Science of Deduction", "The Murder in Lauriston Gardens", "What John Rance Had to Tell", "Solving the Mystery"],
    progress: 0,
    color: "from-rose-500/20 to-red-600/20",
    accent: "text-rose-600"
  },
  {
    id: 6,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    category: "Business",
    rating: 4.7,
    reviews: "2,450",
    duration: "7h 20m",
    chaptersCount: 6,
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400",
    audioUrl: "https://www.youtube.com/watch?v=grR2wbamM54",
    youtubeId: "grR2wbamM54",
    description: "The landmark success manual based on Hill's conversations with 500 of the world's most successful individuals. It outlines the 13 principles of personal achievement and wealth generation.",
    chapters: ["Introduction: The Power of Thought", "Step 1: Intense Desire", "Step 2: Absolute Faith", "Step 3: Auto-Suggestion", "Step 4: Specialized Knowledge", "Step 5: Organized Planning"],
    progress: 100,
    color: "from-yellow-500/20 to-amber-600/20",
    accent: "text-yellow-600"
  },
  {
    id: 7,
    title: "Sapiens: A Brief History",
    author: "Yuval Noah Harari",
    category: "History",
    rating: 4.8,
    reviews: "2,150",
    duration: "8h 45m",
    chaptersCount: 4,
    cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400",
    audioUrl: "https://www.youtube.com/watch?v=IMVdr0IgXDM",
    youtubeId: "IMVdr0IgXDM",
    description: "Sapiens integrates history and science to reconsider accepted narratives, connect past developments with contemporary concerns, and examine what the future might hold.",
    chapters: ["Part 1: The Cognitive Revolution", "Part 2: The Agricultural Revolution", "Part 3: The Unification of Humankind", "Part 4: The Scientific Revolution"],
    progress: 30,
    color: "from-amber-600/20 to-orange-700/20",
    accent: "text-amber-700"
  },
  {
    id: 8,
    title: "Cosmos",
    author: "Carl Sagan",
    category: "Science",
    rating: 4.9,
    reviews: "1,820",
    duration: "6h 15m",
    chaptersCount: 5,
    cover: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=400",
    audioUrl: "https://www.youtube.com/watch?v=JHh1FHQq0k8",
    youtubeId: "JHh1FHQq0k8",
    description: "The iconic science exploration that details human consciousness, cosmic evolution, and the deep mysteries of the universe, explained by world-renowned astronomer Carl Sagan.",
    chapters: ["The Shores of the Cosmic Ocean", "One Voice in the Cosmic Fugue", "The Harmony of Worlds", "Heaven and Hell", "Blues for a Red Planet"],
    progress: 0,
    color: "from-cyan-500/20 to-sky-600/20",
    accent: "text-cyan-600"
  },
  {
    id: 9,
    title: "Steve Jobs",
    author: "Walter Isaacson",
    category: "Biographies",
    rating: 4.8,
    reviews: "3,110",
    duration: "9h 30m",
    chaptersCount: 5,
    cover: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=400",
    audioUrl: "https://www.youtube.com/watch?v=a98R2WPH7lk",
    youtubeId: "a98R2WPH7lk",
    description: "The exclusive biography of Apple's visionary co-founder Steve Jobs, detailing his creative passion and the revolutionary products that changed the world.",
    chapters: ["Childhood & Silicon Valley", "The Birth of Apple", "The Exile & NeXT", "The Return & Think Different", "The Legacy of a Visionary"],
    progress: 15,
    color: "from-slate-500/20 to-zinc-700/20",
    accent: "text-slate-700"
  },
  {
    id: 10,
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    rating: 4.7,
    reviews: "1,550",
    duration: "5h 10m",
    chaptersCount: 6,
    cover: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&q=80&w=400",
    audioUrl: "https://www.youtube.com/watch?v=kLAWEduZ6Yw",
    youtubeId: "kLAWEduZ6Yw",
    description: "Stephen Hawking's landmark introduction to the origins and nature of our universe, covering gravity, black holes, the Big Bang, and the search for a unified theory.",
    chapters: ["Our Picture of the Universe", "Space and Time", "The Expanding Universe", "The Uncertainty Principle", "Elementary Particles", "Black Holes"],
    progress: 100,
    color: "from-violet-500/20 to-fuchsia-600/20",
    accent: "text-violet-600"
  },
  {
    id: 11,
    title: "Elon Musk",
    author: "Walter Isaacson",
    category: "Biographies",
    rating: 4.6,
    reviews: "2,780",
    duration: "10h 15m",
    chaptersCount: 5,
    cover: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=400",
    audioUrl: "https://www.youtube.com/watch?v=prvucnMsJQE",
    youtubeId: "prvucnMsJQE",
    description: "The astonishingly intimate biography of the world's most controversial and fascinating innovator, tracing his journey from a difficult childhood to leading Tesla and SpaceX.",
    chapters: ["South Africa & Escape", "Zip2 & PayPal Days", "SpaceX: Reaching the Stars", "Tesla: Electric Revolution", "The Drive for Mars & AI"],
    progress: 0,
    color: "from-blue-600/20 to-cyan-700/20",
    accent: "text-blue-700"
  },
  {
    id: 12,
    title: "Gandhi: Experiments with Truth",
    author: "Mahatma Gandhi",
    category: "History",
    rating: 4.9,
    reviews: "1,940",
    duration: "7h 40m",
    chaptersCount: 5,
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400",
    audioUrl: "https://www.youtube.com/watch?v=klutCtYVDe8",
    youtubeId: "klutCtYVDe8",
    description: "The timeless autobiography of Mohandas K. Gandhi, detailing his early childhood, spiritual evolution, and his path of non-violent resistance.",
    chapters: ["Birth and Childhood", "Studies in London", "The Struggle in South Africa", "Birth of Satyagraha", "Return to India & Independence"],
    progress: 50,
    color: "from-orange-500/20 to-yellow-600/20",
    accent: "text-orange-600"
  },
  {
    id: 13,
    title: "Wisdom For Sale Story",
    author: "Hindi Fairy Tales",
    category: "Stories",
    rating: 4.8,
    reviews: "1,240",
    duration: "10m 15s",
    chaptersCount: 1,
    cover: "https://img.youtube.com/vi/fGcV3xj6xSs/hqdefault.jpg",
    audioUrl: "https://www.youtube.com/watch?v=fGcV3xj6xSs",
    youtubeId: "fGcV3xj6xSs",
    description: "समझदारी यहाँ बिकती है | Wisdom For Sale Story in Hindi.",
    chapters: ["Full Story"],
    progress: 35,
    color: "from-purple-500/20 to-indigo-600/20",
    accent: "text-purple-600"
  },
  {
    id: 14,
    title: "Price of Food",
    author: "Hindi Stories",
    category: "Stories",
    rating: 4.6,
    reviews: "850",
    duration: "12m 30s",
    chaptersCount: 1,
    cover: "https://img.youtube.com/vi/3xmT-F46kWU/hqdefault.jpg",
    audioUrl: "https://www.youtube.com/watch?v=3xmT-F46kWU",
    youtubeId: "3xmT-F46kWU",
    description: "Price of food | Hindi stories | Hindi story 2025 | Story in Hindi.",
    chapters: ["Full Story"],
    progress: 0,
    color: "from-blue-500/20 to-teal-600/20",
    accent: "text-blue-600"
  },
  {
    id: 15,
    title: "School Homework Moral Story",
    author: "PunToon Kids",
    category: "Stories",
    rating: 4.9,
    reviews: "2,100",
    duration: "8m 45s",
    chaptersCount: 1,
    cover: "https://img.youtube.com/vi/6TDTzNyF2As/hqdefault.jpg",
    audioUrl: "https://www.youtube.com/watch?v=6TDTzNyF2As",
    youtubeId: "6TDTzNyF2As",
    description: "स्कूल का होमवर्क | घर का पाठ | Moral Values For Kids | नैतिक कहानी | PunToon Kids - Hindi.",
    chapters: ["Full Story"],
    progress: 100,
    color: "from-emerald-500/20 to-green-600/20",
    accent: "text-emerald-600"
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
  const categoriesList = ['All', 'Self Growth', 'History', 'Science', 'Biographies', 'Business', 'Stories'];
  
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
        url={selectedBook.audioUrl}
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
            <AnimatePresence mode="popLayout">
              {filteredBooks.map((book) => {
                const isBookPlaying = selectedBook.id === book.id && isPlaying;
                const isFav = favorites.includes(book.id);
                
                return (
                  <motion.div
                    key={book.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-3.5 flex flex-col group relative overflow-hidden"
                  >
                    {/* Background Subtle Gradient Glow */}
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${book.color} blur-xl rounded-full opacity-60 pointer-events-none group-hover:scale-125 transition-transform duration-700`} />
                    
                    {/* Top Row: Cover & Info */}
                    <div className="flex gap-3 items-start relative z-10">
                      {/* Cover Photo */}
                      <div className="relative w-20 h-24 rounded-xl overflow-hidden shadow-sm shrink-0 border border-slate-100 group-hover:scale-105 transition-transform duration-300">
                        <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                        
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
                        
                        {/* Rating row */}
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="text-[11px] font-bold text-slate-800">{book.rating}</span>
                          <span className="text-[9px] text-slate-400">({book.reviews})</span>
                        </div>

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
                  </motion.div>
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
            </AnimatePresence>
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
                <img src={selectedBook.cover} alt={selectedBook.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
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
                <img src={selectedBook.cover} alt={selectedBook.title} className="w-full h-full object-cover" />
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
                  <img src={selectedBook.cover} alt={selectedBook.title} className="w-10 h-12 rounded-lg object-cover border border-slate-200 shadow-sm" />
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
