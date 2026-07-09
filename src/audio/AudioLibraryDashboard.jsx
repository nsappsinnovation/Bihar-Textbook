import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, BookOpen, Star, 
  Clock, Library, CheckCircle2, Headphones, Search, 
  Heart, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  X, CheckCircle, Sparkles, FileText, Layers, ChevronUp, ChevronDown, BookMarked, ExternalLink
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
  const [selectedBook, setSelectedBook] = useState(booksData[0]); // Default to Mridang Class 1 English
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState(filterParam); // 'all' | 'recent' | 'favorites' | 'progress' | 'completed'
  const [selectedCategory, setSelectedCategory] = useState('Class 1');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewTimestampsBook, setViewTimestampsBook] = useState(null);
  
  // Audio Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [favorites, setFavorites] = useState([101]); // Book IDs favorited
  
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

  // Calculate Quick Stats dynamically based on current selected class
  const currentClassBooks = books.filter(b => selectedCategory === 'All' || b.class === selectedCategory || b.category === selectedCategory);
  const libraryCount = currentClassBooks.length;
  const recentlyPlayedCount = recentlyPlayedIds.filter(id => currentClassBooks.some(b => b.id === id)).length;
  const favoritesCount = favorites.filter(id => currentClassBooks.some(b => b.id === id)).length;

  // Helper to compute active chapter and timestamp interval
  const getCurrentChapterInfo = (book, currentSecs, totalSecs) => {
    if (!book || !book.chapters || book.chapters.length === 0) return null;
    const dur = totalSecs && totalSecs > 0 ? totalSecs : 1200;
    const chapterDur = dur / book.chapters.length;
    const activeIdx = Math.min(book.chapters.length - 1, Math.floor((currentSecs || 0) / chapterDur));
    const startSecs = activeIdx * chapterDur;
    const endSecs = (activeIdx + 1) * chapterDur;
    return {
      chapterNumber: activeIdx + 1,
      totalChapters: book.chapters.length,
      chapterTitle: book.chapters[activeIdx],
      startTime: formatTime(startSecs),
      endTime: formatTime(endSecs)
    };
  };

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

  const categoriesList = [
    'Class 1', 'Class 2', 'Class 3', 'Class 4',
    'Class 5', 'Class 6', 'Class 7', 'Class 8',
    'Class 9', 'Class 10', 'Class 11', 'Class 12'
  ];

  const filteredBooks = (() => {
    let list = books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (book.subject && book.subject.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || book.class === selectedCategory || book.category === selectedCategory;

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
    { label: `${selectedCategory === 'All' ? 'Total Library' : selectedCategory + ' Library'}`, value: `${libraryCount} audiobooks`, icon: <Library className="text-purple-600" />, color: 'bg-purple-50', tab: 'all' },
    { label: 'Recently Played', value: `${recentlyPlayedCount} in ${selectedCategory}`, icon: <Clock className="text-blue-500" />, color: 'bg-blue-50', tab: 'recent' },
    { label: 'Favorites', value: `${favoritesCount} saved`, icon: <Heart className={`transition-colors ${favoritesCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-rose-500'}`} />, color: 'bg-rose-50', tab: 'favorites' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex font-sans text-slate-900 overflow-x-hidden pb-32">
      {/* Background Audio Player (Supports both MP3 & YouTube) */}
      {selectedBook && selectedBook.audioUrl && selectedBook.audioUrl.endsWith('.mp3') ? (
        <audio
          ref={(el) => {
            if (el) {
              el.volume = volume;
              el.muted = isMuted;
              if (isPlaying) {
                el.play().catch(() => {});
              } else {
                el.pause();
              }
            }
          }}
          src={selectedBook.audioUrl}
          onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
          onDurationChange={(e) => setDuration(e.target.duration || 1200)}
          onEnded={handleNextTrack}
          style={{ display: 'none' }}
        />
      ) : (
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
                playsinline: 1,
                autoplay: 1
              } 
            } 
          }}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 min-h-screen pb-0">
        {/* Back Button */}
        <button
          onClick={() => navigate("/#missions-grid")}
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
                 <h1 className="text-[24px] sm:text-[28px] md:text-[36px] lg:text-[42px] 2xl:text-[52px] font-extrabold leading-[1.05] tracking-tight text-[#1e293b]">
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
                {filteredBooks.map((book) => {
                  const isBookPlaying = selectedBook && selectedBook.id === book.id && isPlaying;
                  const isFav = favorites.includes(book.id);
                  const cardChapterInfo = isBookPlaying ? getCurrentChapterInfo(book, currentTime, duration) : null;
                  
                  return (
                    <div
                      key={book.id}
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
                          <a
                            href={book.cietUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-24 h-32 rounded-xl overflow-hidden shadow-md shrink-0 border border-slate-100 group-hover:scale-105 transition-transform duration-300 block"
                            title="Open official NCERT audio book page"
                          >
                            <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />

                            {book.progress === 100 && (
                              <div className="absolute top-1.5 left-1.5 bg-green-500 text-white rounded-full p-0.5 shadow-sm">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              </div>
                            )}
                          </a>

                          <div className="flex-1 space-y-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-[10px] uppercase tracking-wider font-extrabold text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full inline-block">
                                {book.subject || book.category}
                              </span>
                            </div>
                            <a 
                              href={book.cietUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="font-extrabold text-slate-900 text-base group-hover:text-purple-600 transition-colors leading-tight line-clamp-2 block pt-0.5"
                            >
                              {book.title}
                            </a>
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

                      {/* Bottom Section: Meta & Listen Button */}
                      <div className="mt-4 pt-3.5 border-t border-slate-100/80 relative z-10 space-y-3">
                        <div className="flex items-center justify-between text-slate-400 text-[11px]">
                          <span className="flex items-center gap-1 font-semibold">
                            <Clock className="w-3.5 h-3.5 text-purple-500" /> {book.duration}
                          </span>
                          <span className="flex items-center gap-1 font-semibold">
                            <BookOpen className="w-3.5 h-3.5 text-purple-500" /> {book.chaptersCount} Chapters
                          </span>
                        </div>

                        <div className="flex gap-2.5">
                          <a
                            href={book.cietUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 h-10 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-purple-500/15 hover:-translate-y-0.5"
                            title="Open official NCERT audio book page"
                          >
                            <Headphones className="w-4 h-4" />
                            <span>Listen Audiobook</span>
                            <ExternalLink className="w-3.5 h-3.5 opacity-80 ml-0.5" />
                          </a>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(book.id);
                            }}
                            className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all cursor-pointer border shrink-0 ${
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
                    </div>
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
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default AudioLibraryDashboard;
