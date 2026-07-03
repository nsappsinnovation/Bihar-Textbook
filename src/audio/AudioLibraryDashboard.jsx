import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, BookOpen, Star, 
  Clock, Library, CheckCircle2, Headphones, Search, 
  Heart, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  X, CheckCircle, Sparkles, FileText, Layers, ChevronUp, ChevronDown, BookMarked
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { booksData } from './MyAudioLibrary';

const AudioLibraryDashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get('filter') || 'all';

  // State Management
  const [books, setBooks] = useState(booksData);
  const [selectedBook, setSelectedBook] = useState(booksData[0]); // The Alchemist by default
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState(filterParam); // 'all' | 'recent' | 'favorites' | 'progress' | 'completed'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Audio Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [favorites, setFavorites] = useState([1]); // Book IDs favorited
  
  // Refs
  const audioRef = useRef(null);
  const shelfRef = useRef(null);

  // Sync tab with search parameters if changed
  useEffect(() => {
    if (filterParam) {
      setActiveTab(filterParam);
    }
  }, [filterParam]);

  // Sync recently played from localStorage
  const [recentlyPlayedIds, setRecentlyPlayedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('recentlyPlayed') || '[]');
    } catch (e) {
      return [];
    }
  });

  // Calculate Quick Stats for Dashboard Header
  const libraryCount = books.length;
  const recentlyPlayedCount = recentlyPlayedIds.length;
  const favoritesCount = favorites.length;

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
        setRecentlyPlayedIds(updatedRecent);
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

  const formatTime = (timeInSecs) => {
    if (isNaN(timeInSecs)) return "00:00";
    const minutes = Math.floor(timeInSecs / 60);
    const seconds = Math.floor(timeInSecs % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const scrollToShelf = () => {
    if (shelfRef.current) {
      shelfRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const categoriesList = ['All', 'Self Growth', 'History', 'Science', 'Biographies', 'Business', 'Stories'];

  const filteredBooks = (() => {
    let list = books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;

      let matchesTab = true;
      if (activeTab === 'favorites') {
        matchesTab = favorites.includes(book.id);
      } else if (activeTab === 'progress') {
        matchesTab = book.progress > 0 && book.progress < 100;
      } else if (activeTab === 'completed') {
        matchesTab = book.progress === 100;
      } else if (activeTab === 'recent') {
        matchesTab = recentlyPlayedIds.includes(book.id);
      }

      return matchesSearch && matchesCategory && matchesTab;
    });

    if (activeTab === 'recent') {
      list = [...list].sort((a, b) => {
        const indexA = recentlyPlayedIds.indexOf(a.id);
        const indexB = recentlyPlayedIds.indexOf(b.id);
        return indexA - indexB;
      });
    }

    return list;
  })();

  const quickStats = [
    { label: 'My Library', value: `${libraryCount} items`, icon: <Library className="text-purple-600" />, color: 'bg-purple-50', tab: 'all' },
    { label: 'Recently Played', value: `${recentlyPlayedCount} items`, icon: <Clock className="text-blue-500" />, color: 'bg-blue-50', tab: 'recent' },
    { label: 'Favorites', value: `${favoritesCount} saved`, icon: <Heart className={`transition-colors ${favoritesCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-rose-500'}`} />, color: 'bg-rose-50', tab: 'favorites' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex font-sans text-slate-900 overflow-x-hidden pb-32">
      {/* Background Audio Player */}
      <ReactPlayer
        ref={audioRef}
        url={selectedBook ? selectedBook.audioUrl : ''}
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

      {/* Main Content */}
      <main className="flex-1 min-h-screen pb-0">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="fixed top-5 left-5 z-50 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-blue-600 hover:shadow-lg transition-all border border-slate-100 group cursor-pointer"
        >
          <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <div className="px-6 md:px-12 space-y-8 pt-4">
          
          {/* HERO & QUICK STATS SECTION (EXACT ORIGINAL DASHBOARD PRESERVED) */}
          <div className="relative">
            {/* Hero Section */}
            <section className="bg-white rounded-[24px] overflow-hidden relative border border-slate-100 flex items-center min-h-[300px] pb-6">
              <div className="relative z-10 p-8 md:p-10 lg:w-1/2 space-y-4">
                 <h1 className="text-[32px] md:text-[42px] font-extrabold leading-[1.05] tracking-tight text-[#1e293b]">
                    Listen, learn & <br /> grow with <br />
                    <span className="text-purple-600">Audio Library</span>
                 </h1>
                 <p className="text-slate-500 text-[15px] md:text-[16px] font-medium leading-relaxed max-w-sm">
                   Your pocket hub for audiobooks and knowledge.
                 </p>
                 
                 <div className="pt-2">
                   <button 
                     onClick={() => {
                       setActiveTab('all');
                       setSelectedCategory('All');
                       scrollToShelf();
                     }}
                     className="px-6 py-3 bg-purple-600 text-white rounded-full font-bold text-[14px] flex items-center gap-2 hover:bg-purple-700 transition-colors w-max shadow-sm shadow-purple-200 cursor-pointer"
                   >
                     Start Listening <ArrowRight size={16} />
                   </button>
                 </div>
              </div>

              <div className="hidden lg:block absolute top-0 right-0 w-[55%] h-full">
                 <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
                 <img src="/images/audio/rhs.png" alt="Audio Library" className="w-full h-full object-cover object-right-top" />
                 {/* Wave Effect Overlay */}
                 <div className="absolute bottom-12 right-24 flex items-center gap-1.5 opacity-80 z-20">
                   {[1,2,3,4,5,6].map(i => (
                      <motion.div 
                        key={i}
                        animate={{ height: [15, 45, 25, 55, 20] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        className="w-1.5 bg-purple-500 rounded-full"
                      />
                   ))}
                 </div>
              </div>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 relative z-20 -mt-8 px-4 md:px-12">
              {quickStats.map((stat, i) => (
                <div 
                  key={i} 
                  onClick={() => {
                    setActiveTab(stat.tab);
                    setSelectedCategory('All');
                    scrollToShelf();
                  }}
                  className="bg-white rounded-[16px] p-3 md:p-4 border border-slate-50 shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex items-center gap-3 md:gap-4 hover:shadow-md transition-shadow cursor-pointer group"
                >
                   <div className={`w-[44px] h-[44px] ${stat.color} rounded-[12px] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform [&>svg]:w-5 [&>svg]:h-5`}>
                      {stat.icon}
                   </div>
                   <div>
                      <h4 className="text-[13px] font-bold text-[#1e1b4b] leading-tight group-hover:text-purple-600 transition-colors">{stat.label}</h4>
                      <p className="text-[11px] font-medium text-slate-500 mt-0.5">{stat.value}</p>
                   </div>
                </div>
              ))}
            </section>
          </div>

          {/* AUDIOBOOK SHELF (Full Width, Video Removed) */}
          <div ref={shelfRef} className="pt-4 space-y-6">
            
            {/* Filter Tabs & Search Bar Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-[20px] border border-slate-100 shadow-sm">
              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
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
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                      activeTab === tab.id
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-200'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72 shrink-0">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search audiobooks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-purple-400 focus:bg-white transition-all shadow-inner font-medium"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {categoriesList.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all shrink-0 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Bookshelf Grid (Responsive 1/2/3/4 Columns across full width) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
              <AnimatePresence mode="popLayout">
                {filteredBooks.map((book) => {
                  const isBookPlaying = selectedBook && selectedBook.id === book.id && isPlaying;
                  const isFav = favorites.includes(book.id);
                  
                  return (
                    <motion.div
                      key={book.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className={`bg-white rounded-2xl border transition-all p-5 flex flex-col justify-between group relative overflow-hidden ${
                        selectedBook && selectedBook.id === book.id 
                          ? 'border-purple-400 shadow-lg ring-2 ring-purple-500/10' 
                          : 'border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200'
                      }`}
                    >
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${book.color} blur-2xl rounded-full opacity-50 pointer-events-none group-hover:scale-125 transition-transform duration-700`} />
                      
                      {/* Top Section: Cover & Book Info */}
                      <div>
                        <div className="flex gap-4 items-start relative z-10">
                          <div 
                            onClick={() => selectBook(book)}
                            className="relative w-24 h-32 rounded-xl overflow-hidden shadow-md shrink-0 border border-slate-100 group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                          >
                            <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                            
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button
                                className="w-10 h-10 rounded-full bg-white text-purple-600 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                              >
                                {isBookPlaying ? <Pause className="w-4 h-4 fill-purple-600" /> : <Play className="w-4 h-4 fill-purple-600 ml-0.5" />}
                              </button>
                            </div>

                            {book.progress === 100 && (
                              <div className="absolute top-1.5 left-1.5 bg-green-500 text-white rounded-full p-0.5 shadow-sm">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1 space-y-1 min-w-0">
                            <span className="text-[10px] uppercase tracking-wider font-extrabold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full inline-block">
                              {book.category}
                            </span>
                            <h3 
                              onClick={() => selectBook(book)}
                              className="font-extrabold text-slate-900 text-base group-hover:text-purple-600 transition-colors leading-tight line-clamp-2 cursor-pointer pt-0.5"
                            >
                              {book.title}
                            </h3>
                            <p className="text-xs text-slate-500 font-medium truncate">By {book.author}</p>
                            
                            <div className="flex items-center gap-1.5 pt-1">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              <span className="text-xs font-bold text-slate-800">{book.rating}</span>
                              <span className="text-[11px] text-slate-400">({book.reviews})</span>
                            </div>
                          </div>
                        </div>

                        {/* Synopsis preview */}
                        <p className="text-xs text-slate-500 line-clamp-2 mt-3.5 relative z-10 leading-relaxed font-medium">
                          {book.description}
                        </p>
                      </div>

                      {/* Bottom Section: Meta & Play Buttons */}
                      <div className="mt-4 pt-3.5 border-t border-slate-100/80 relative z-10 space-y-3">
                        <div className="flex items-center justify-between text-slate-400 text-[11px]">
                          <span className="flex items-center gap-1 font-semibold">
                            <Clock className="w-3.5 h-3.5 text-purple-500" /> {book.duration}
                          </span>
                          <span className="flex items-center gap-1 font-semibold">
                            <BookOpen className="w-3.5 h-3.5 text-purple-500" /> {book.chaptersCount} Chapters
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => selectBook(book)}
                            className={`flex-1 h-10 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                              isBookPlaying 
                                ? 'bg-purple-100 text-purple-700 hover:bg-purple-200 ring-2 ring-purple-500/20 font-extrabold' 
                                : 'bg-purple-600 text-white hover:bg-purple-700 shadow-md shadow-purple-500/15 hover:-translate-y-0.5'
                            }`}
                          >
                            {isBookPlaying ? (
                              <>
                                <Pause className="w-4 h-4 fill-purple-700" /> Playing Now
                              </>
                            ) : (
                              <>
                                <Headphones className="w-4 h-4" /> Play Audio
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => toggleFavorite(book.id)}
                            className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all cursor-pointer border ${
                              isFav 
                                ? 'bg-rose-50 text-rose-500 border-rose-200 shadow-sm' 
                                : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50 hover:text-rose-500'
                            }`}
                            title={isFav ? "Remove from favorites" : "Add to favorites"}
                          >
                            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {filteredBooks.length === 0 && (
                  <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 py-16 bg-white border border-slate-100 rounded-3xl flex flex-col items-center justify-center text-center p-6 shadow-sm">
                    <Library className="w-16 h-16 text-purple-200 mb-4" />
                    <h3 className="text-base font-bold text-slate-800">No audiobooks found</h3>
                    <p className="text-xs text-slate-500 max-w-xs mt-1">Try selecting another category or resetting your search terms.</p>
                    <button 
                      onClick={() => { setSelectedCategory('All'); setActiveTab('all'); setSearchQuery(''); }}
                      className="mt-4 px-5 py-2.5 bg-purple-600 text-white rounded-full text-xs font-bold hover:bg-purple-700 cursor-pointer shadow-sm transition-transform hover:scale-105"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </main>

      {/* FLOATING BOTTOM AUDIO PLAYER  */}
      {selectedBook && (
        <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-purple-100 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] z-40 transition-all duration-300 ${isPlayerExpanded ? 'py-4 px-6 h-auto' : 'py-2.5 px-6 h-16'}`}>
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

            {/* Collapsed vs Expanded Player Controls */}
            {!isPlayerExpanded ? (
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-slate-400 hidden sm:inline font-mono">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
                
                <button 
                  onClick={handlePlayPause}
                  className="w-10 h-10 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center shadow-md transition-all hover:scale-105 cursor-pointer shrink-0"
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
              <>
                <div className="flex-1 w-full flex flex-col items-center gap-2">
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={handlePrevTrack}
                      className="text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                    >
                      <SkipBack className="w-5 h-5" />
                    </button>
                    
                    <button
                      onClick={handlePlayPause}
                      className="w-11 h-11 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-purple-200 transition-all hover:scale-105 cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
                    </button>
                    
                    <button 
                      onClick={handleNextTrack}
                      className="text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                    >
                      <SkipForward className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="w-full flex items-center gap-3">
                    <span className="text-[10px] font-bold text-slate-500 w-10 text-right font-mono">{formatTime(currentTime)}</span>
                    <input
                      type="range"
                      min={0}
                      max={duration || 100}
                      value={currentTime}
                      onChange={handleScrubberChange}
                      className="flex-1 h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-purple-600 focus:outline-none"
                    />
                    <span className="text-[10px] font-bold text-slate-500 w-10 font-mono">{formatTime(duration)}</span>
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-end gap-5 w-full md:w-1/4 shrink-0">
                  <button 
                    onClick={() => toggleFavorite(selectedBook.id)} 
                    className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(selectedBook.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

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
                      className="w-16 h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-purple-600 focus:outline-none"
                    />
                  </div>
                </div>

                <button 
                  onClick={() => setIsPlayerExpanded(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-800 transition-colors shrink-0 cursor-pointer"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioLibraryDashboard;
