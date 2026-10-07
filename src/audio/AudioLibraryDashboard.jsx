import React, { useState, useRef, useEffect, cloneElement } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, BookOpen, 
  Clock, Library, CheckCircle2, Headphones, Search, 
  Heart, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  X, CheckCircle, Sparkles, FileText, Layers, ChevronUp, ChevronDown, BookMarked, ExternalLink
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { booksData } from './MyAudioLibrary';

const audioTheme = {
  backButtonHover: 'hover:text-purple-600',
  heroHighlightText: 'text-purple-600',
  
  card1Icon: 'text-purple-600',
  card1Bg: 'bg-purple-50',
  card2Icon: 'text-purple-600',
  card2Bg: 'bg-purple-50',
  card3Icon: 'text-purple-600',
  card3Bg: 'bg-purple-50',
  
  activeBorder: 'border-purple-600 ring-2 ring-purple-600/10',
  inactiveBorder: 'border-slate-100',
  activeIconBg: 'bg-purple-600 text-white',
  activeTitleText: 'text-purple-700',
  inactiveTitleHover: 'text-slate-800 group-hover:text-purple-600',
  activeSubtitleText: 'text-purple-600',
  inactiveSubtitleText: 'text-slate-500'
};

const AudioLibraryDashboard = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get('filter') || 'all';

  // State Management
  const [books, setBooks] = useState(booksData);
  const [selectedBook, setSelectedBook] = useState(null); // No card selected initially until clicked
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(true);
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
  const [favorites, setFavorites] = useState([]); // Book IDs favorited
  const [activeChapterIdx, setActiveChapterIdx] = useState(null);
  
  // Refs
  const audioRef = useRef(null);
  const htmlAudioRef = useRef(null);
  const shelfRef = useRef(null);
  const chaptersListRef = useRef(null);
  const activeChapterRef = useRef(null);
  const pendingSeekRef = useRef(null);

  // Slide-to-scroll state & refs for chapters modal list
  const [isDraggingList, setIsDraggingList] = useState(false);
  const dragStartYRef = useRef(0);
  const dragStartScrollTopRef = useRef(0);
  const hasDraggedRef = useRef(false);

  // Auto-scroll active chapter into view when modal opens
  useEffect(() => {
    if (viewTimestampsBook && activeChapterRef.current) {
      setTimeout(() => {
        activeChapterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 120);
    }
  }, [viewTimestampsBook]);

  const handleListPointerDown = (e) => {
    if (!chaptersListRef.current) return;
    hasDraggedRef.current = false;
    setIsDraggingList(true);
    dragStartYRef.current = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    dragStartScrollTopRef.current = chaptersListRef.current.scrollTop;
  };

  const handleListPointerMove = (e) => {
    if (!isDraggingList || !chaptersListRef.current) return;
    const currentY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    const deltaY = dragStartYRef.current - currentY;
    if (Math.abs(deltaY) > 5) {
      hasDraggedRef.current = true;
    }
    chaptersListRef.current.scrollTop = dragStartScrollTopRef.current + deltaY;
  };

  const handleListPointerUp = () => {
    setIsDraggingList(false);
  };

  // Sync HTML5 Audio playback state
  useEffect(() => {
    const audioEl = htmlAudioRef.current;
    if (!audioEl) return;
    audioEl.volume = isMuted ? 0 : volume;
    audioEl.muted = isMuted;

    if (isPlaying) {
      const playPromise = audioEl.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Audio play prevented or waiting:", err);
        });
      }
    } else {
      audioEl.pause();
    }
  }, [isPlaying, selectedBook?.id, selectedBook?.audioUrl, volume, isMuted]);

  // Sync tab with search parameters if changed
  useEffect(() => {
    if (filterParam) {
      setActiveTab(filterParam);
    }
  }, [filterParam]);

  // Lock background scrolling when chapters & timestamps modal card is open
  useEffect(() => {
  if (viewTimestampsBook) {
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";

    document.documentElement.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.width = "";

    document.documentElement.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.width = "";

    document.documentElement.style.overflow = "";
  };
}, [viewTimestampsBook]);

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

  // Helper to get exact chapter duration from CIET portal
  const getChapterDuration = (book, idx) => {
    if (!book || !book.chapterAudioUrls || !book.chapterAudioUrls[idx]) {
      return "00:00";
    }
    if (book.chapterDurations && book.chapterDurations[idx]) {
      return book.chapterDurations[idx];
    }
    return "00:00";
  };

  // Helper to compute active chapter info
  const getCurrentChapterInfo = (book, currentSecs, totalSecs) => {
    if (!book || !book.chapters || book.chapters.length === 0) return null;
    const count = book.chapters.length;
    
    // Lock chapter index to current active chapter (default to 0) so it remains fixed during full audio playback
    const activeIdx = (activeChapterIdx !== null && activeChapterIdx >= 0 && activeChapterIdx < count)
      ? activeChapterIdx
      : 0;

    return {
      chapterNumber: activeIdx + 1,
      totalChapters: count,
      chapterTitle: t(`audio.book_chap_${book.id}_${activeIdx}`, book.chapters[activeIdx]),
      duration: getChapterDuration(book, activeIdx)
    };
  };

  // Helper to get time range and exact CIET portal duration for any chapter index
  const getChapterTimeRange = (book, idx, totalSecs) => {
    const dur = (selectedBook && selectedBook.id === book.id && totalSecs > 0) ? totalSecs : 1200;
    const count = book.chapters && book.chapters.length > 0 ? book.chapters.length : 1;
    const chapterDur = dur / count;
    const startSecs = idx * chapterDur;
    const endSecs = (idx + 1) * chapterDur;
    return {
      startSecs,
      endSecs,
      durationText: getChapterDuration(book, idx)
    };
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleScrubberChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (htmlAudioRef.current && htmlAudioRef.current.currentTime !== undefined) {
      htmlAudioRef.current.currentTime = newTime;
    } else if (audioRef.current && audioRef.current.seekTo) {
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

  const selectBook = (book, chapterIdx = null, startSecs = null) => {
    const effChapterIdx = chapterIdx === null ? 0 : chapterIdx;
    setActiveChapterIdx(effChapterIdx);
    
    let willPlay = false;
    const targetUrl = (book.chapterAudioUrls && book.chapterAudioUrls[effChapterIdx]) || book.audioUrl;

    if (selectedBook && selectedBook.id === book.id && effChapterIdx === 0 && startSecs === null) {
      const nextPlay = !isPlaying;
      setIsPlaying(nextPlay);
      willPlay = nextPlay;
    } else {
      setSelectedBook(book);
      setIsPlaying(true);
      willPlay = true;
    }

    if (willPlay && htmlAudioRef.current && targetUrl) {
      const currentSrc = htmlAudioRef.current.src || "";
      const decodedTarget = encodeURI(targetUrl);
      
      if (!currentSrc.endsWith(targetUrl) && !currentSrc.endsWith(decodedTarget)) {
        if (startSecs === null) setCurrentTime(0);
        if (startSecs !== null) pendingSeekRef.current = startSecs;
        htmlAudioRef.current.src = targetUrl;
        htmlAudioRef.current.load();
      } else {
        if (startSecs !== null) {
          htmlAudioRef.current.currentTime = startSecs;
          setCurrentTime(startSecs);
        } else if (effChapterIdx !== 0 || selectedBook?.id !== book.id) {
          htmlAudioRef.current.currentTime = 0;
          setCurrentTime(0);
        }
      }
      
      const playPromise = htmlAudioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((e) => console.warn("Audio play prevented or waiting:", e));
      }
    } else if (!willPlay && htmlAudioRef.current) {
      htmlAudioRef.current.pause();
    }

    if (willPlay && audioRef.current && audioRef.current.seekTo && startSecs !== null) {
      audioRef.current.seekTo(startSecs, 'seconds');
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

  const libraryStats = [
    { label: selectedCategory === 'All' ? t('audio.ui_TotalLibrary', 'Total Library') : t('audio.ui_ClassLibrary', '{{class}} Library', { class: t(`audio.cat_${selectedCategory.replace(' ', '')}`, selectedCategory) }), value: `${libraryCount} ${t('audio.ui_audiobooks', 'audiobooks')}`, icon: <Library className={audioTheme.card1Icon} />, color: audioTheme.card1Bg, tab: 'all' },
    { label: t('audio.ui_RecentlyPlayed', 'Recently Played'), value: t('audio.ui_inClass', '{{count}} in {{class}}', { count: recentlyPlayedCount, class: t(`audio.cat_${selectedCategory.replace(' ', '')}`, selectedCategory) }), icon: <Clock className={audioTheme.card2Icon} />, color: audioTheme.card2Bg, tab: 'recent' },
    { label: t('audio.ui_Favorites', 'Favorites'), value: `${favoritesCount} ${t('audio.ui_saved', 'saved')}`, icon: <Heart className={audioTheme.card3Icon} />, color: audioTheme.card3Bg, tab: 'favorites' }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex font-sans text-slate-900 overflow-x-hidden pb-36">
      {/* Background Audio Player (Supports both MP3 & YouTube) */}
      {selectedBook && selectedBook.audioUrl && selectedBook.audioUrl.endsWith('.mp3') ? (
        <audio
          ref={htmlAudioRef}
          src={selectedBook.audioUrl}
          onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
          onLoadedMetadata={(e) => {
            setDuration(e.target.duration || 1200);
            if (pendingSeekRef.current !== null) {
              e.target.currentTime = pendingSeekRef.current;
              setCurrentTime(pendingSeekRef.current);
              pendingSeekRef.current = null;
            }
          }}
          onDurationChange={(e) => setDuration(e.target.duration || 1200)}
          onEnded={handleNextTrack}
          style={{ display: 'none' }}
        />
      ) : (
        <ReactPlayer
          ref={audioRef}
          url={selectedBook ? selectedBook.audioUrl : ''}
          playing={isPlaying}
          volume={isMuted ? 0 : volume}
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
      <main className="flex-1 min-w-0 min-h-screen pb-0">

        <div className="px-4 sm:px-6 md:px-12 2xl:px-20 space-y-8 pt-4 2xl:max-w-[1600px] 2xl:mx-auto">
          
          {/* HERO & QUICK STATS SECTION */}
          <div className="relative">
            <section className="bg-white rounded-[16px] md:rounded-[24px] overflow-hidden relative border border-slate-100 flex items-center min-h-[200px] sm:min-h-[260px] md:min-h-[300px] lg:h-[387px] lg:min-h-[387px] pb-4 md:pb-6 lg:pb-0">
              <div className="relative z-10 p-5 sm:p-8 md:p-10 lg:w-1/2 space-y-3 md:space-y-4">
                 <h1 className="text-[24px] sm:text-[28px] md:text-[36px] lg:text-[42px] 2xl:text-[52px] font-extrabold leading-[1.05] tracking-tight text-[#1e293b]">
                    {t('audio.ui_Listenlearn_49c2', 'Listen, learn &')} <br /> {t('audio.ui_growwith_9563', 'grow with')} <br />
                    <span className={audioTheme.heroHighlightText}>{t('audio.ui_AudioLibrary_6bbd', 'Audio Library')}</span>
                 </h1>
                 <p className="text-slate-500 text-[15px] md:text-[16px] font-medium leading-relaxed max-w-sm">
                   {t('audio.ui_Yourpockethubforaudi_f836', 'Your pocket hub for audiobooks and knowledge.')}
                 </p>
              </div>

              <div className="hidden lg:block absolute top-0 right-0 w-[55%] h-full">
                 <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
                 <img src="/images/audio/rhs.webp" onError={(e) => { e.currentTarget.src = "/images/audio/rhs.png"; }} alt={t('audio.ui_AudioLibrary_6bbd', 'Audio Library')} className="w-full h-full object-cover object-right-top" />
                 <div className="absolute bottom-12 right-24 flex items-center gap-1.5 opacity-80 z-20">
                   {[1,2,3,4,5,6].map(i => (
                      <motion.div 
                        key={i}
                        animate={{ height: [15, 45, 25, 55, 20] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        className="w-1.5 bg-purple-600 rounded-full"
                      />
                   ))}
                 </div>
              </div>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 relative z-20 -mt-8 px-4 md:px-12">
              {libraryStats.map((stat, i) => {
                const isActive = activeTab === stat.tab;
                return (
                  <div 
                    key={i} 
                    onClick={() => {
                      setActiveTab(stat.tab);
                      setSelectedCategory('All');
                      scrollToShelf();
                    }}
                    className={`bg-white rounded-[16px] p-3 md:p-4 border flex items-center gap-3 md:gap-4 hover:shadow-md hover:border-purple-300 transition-all cursor-pointer group ${isActive ? audioTheme.activeBorder + ' shadow-md' : audioTheme.inactiveBorder + ' shadow-[0_4px_20px_rgba(0,0,0,0.06)]'}`}
                  >
                     <div className={`w-[44px] h-[44px] rounded-[12px] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform [&>svg]:w-5 [&>svg]:h-5 ${isActive ? audioTheme.activeIconBg : stat.color}`}>
                        {cloneElement(stat.icon, { className: isActive ? 'text-white' : stat.icon.props.className })}
                     </div>
                     <div>
                        <h4 className={`text-[13px] font-bold leading-tight transition-colors ${isActive ? audioTheme.activeTitleText : audioTheme.inactiveTitleHover}`}>{stat.label}</h4>
                        <p className={`text-[11px] font-medium mt-0.5 ${isActive ? audioTheme.activeSubtitleText : audioTheme.inactiveSubtitleText}`}>{stat.value}</p>
                     </div>
                  </div>
                );
              })}
            </section>
          </div>

          {/* AUDIOBOOK SHELF */}
          <div ref={shelfRef} className="px-4 sm:px-8 md:px-14 lg:px-16 xl:px-24 max-w-[1380px] mx-auto pt-4 space-y-6">
            
            {/* Filter Tabs & Search Bar Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-[20px] border border-slate-100 shadow-sm">
              <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
                {[
                  { id: 'all', label: t('audio.ui_AllBooks', 'All Books'), icon: <Library className="w-4 h-4" /> },
                  { id: 'recent', label: t('audio.ui_RecentlyPlayed', 'Recently Played'), icon: <Clock className="w-4 h-4" /> },
                  { id: 'favorites', label: t('audio.ui_Favorites', 'Favorites'), icon: <Heart className="w-4 h-4" /> },
                  { id: 'progress', label: t('audio.ui_InProgress', 'In Progress'), icon: <Play className="w-4 h-4" /> },
                  { id: 'completed', label: t('audio.ui_Completed', 'Completed'), icon: <CheckCircle className="w-4 h-4" /> },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                      activeTab === tab.id
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-72 shrink-0">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={t('audio.ui_Searchaudiobooks_c05e', 'Search audiobooks...')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-purple-600 focus:bg-white transition-all shadow-inner font-medium"
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
                  {t(`audio.cat_${cat.replace(' ', '')}`, cat)}
                </button>
              ))}
            </div>

            {/* Bookshelf Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
                {filteredBooks.map((book) => {
                  const isBookPlaying = selectedBook && selectedBook.id === book.id && isPlaying;
                  const isFav = favorites.includes(book.id);
                  
                  return (
                    <div
                      key={book.id}
                      onClick={() => {
                        setSelectedBook(book);
                        setViewTimestampsBook(book);
                      }}
                      className={`bg-white rounded-2xl border transition-all p-5 flex flex-col justify-between group relative overflow-hidden cursor-pointer ${
                        selectedBook && selectedBook.id === book.id 
                          ? 'border-purple-600 shadow-lg ring-2 ring-purple-600/10' 
                          : 'border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200'
                      }`}
                    >
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${book.color} blur-2xl rounded-full opacity-50 pointer-events-none group-hover:scale-125 transition-transform duration-700`} />
                      
                      {/* Top Section: Cover & Book Info */}
                      <div>
                        <div className="flex gap-4 items-start relative z-10">
                          {/* Book Cover with Play/Pause Overlay Button */}
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              selectBook(book);
                            }}
                            className="relative w-24 h-32 rounded-xl overflow-hidden shadow-md shrink-0 border border-slate-100 group-hover:scale-105 transition-transform duration-300 block cursor-pointer"
                            title={isBookPlaying ? "Pause audiobook" : "Play now"}
                          >
                            <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />

                            {/* Play Now / Pause Overlay */}
                            <div className={`absolute inset-0 bg-slate-900/35 flex items-center justify-center transition-opacity duration-200 ${
                              isBookPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                            }`}>
                              <div className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110">
                                {isBookPlaying ? (
                                  <Pause className="w-5 h-5 fill-purple-600 text-purple-600" />
                                ) : (
                                  <Play className="w-5 h-5 fill-purple-600 text-purple-600 ml-0.5" />
                                )}
                              </div>
                            </div>

                            {book.progress === 100 && (
                              <div className="absolute top-1.5 left-1.5 bg-green-500 text-white rounded-full p-0.5 shadow-sm">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1 space-y-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-[10px] uppercase tracking-wider font-extrabold text-purple-600 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full inline-block">
                                {t(`audio.cat_${book.subject.replace(' ', '')}`, book.subject)}
                              </span>
                            </div>
                            <button
                              onClick={() => selectBook(book)}
                              className="font-extrabold text-slate-900 text-base group-hover:text-purple-600 transition-colors leading-tight line-clamp-2 block pt-0.5 text-left cursor-pointer"
                            >
                              {t(`audio.book_title_${book.id}`, book.title)}
                            </button>
                            <p className="text-xs text-slate-500 font-medium truncate">{t('audio.ui_By', 'By')} {t(`audio.book_auth_${book.id}`, book.author)}</p>
                          </div>
                        </div>

                        {/* Synopsis preview */}
                        <p className="text-xs text-slate-500 line-clamp-2 mt-3.5 relative z-10 leading-relaxed font-medium">
                          {t(`audio.book_desc_${book.id}`, book.description)}
                        </p>
                      </div>

                      {/* Bottom Section: Meta & Listen Buttons */}
                      <div className="mt-4 pt-3.5 border-t border-slate-100/80 relative z-10 space-y-3">
                        <div className="flex items-center justify-between text-slate-400 text-[11px]">
                          <span className="flex items-center gap-1 font-semibold">
                            <Clock className="w-3.5 h-3.5 text-purple-600" /> {(!book.chapterAudioUrls || book.chapterAudioUrls.length === 0) ? "00:00" : book.duration}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setViewTimestampsBook(book);
                            }}
                            className={`flex items-center gap-1.5 font-bold ${book.accent}`}
                            title="Click to view all chapters and timestamps"
                          >
                            <Layers className="w-3.5 h-3.5" />
                            <span>{book.chaptersCount} {t('audio.ui_Chapters', 'Chapters')}</span>
                          </button>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              selectBook(book);
                            }}
                            className={`flex-1 h-10 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                              isBookPlaying
                                ? 'bg-purple-50 text-purple-600 border border-purple-300 shadow-sm'
                                : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/20 hover:-translate-y-0.5'
                            }`}
                          >
                            {isBookPlaying ? (
                              <>
                                <Pause className="w-4 h-4 fill-purple-600" />
                                <span>{t('audio.ui_PlayingNow_aedd', 'Playing Now')}</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4 fill-white" />
                                <span>{t('audio.ui_PlayNow_460a', 'Play Now')}</span>
                              </>
                            )}
                          </button>

                          <a
                            href={book.cietUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="h-10 px-3 rounded-xl bg-slate-50 hover:bg-purple-50 text-slate-600 hover:text-purple-600 border border-slate-200 flex items-center justify-center gap-1 text-xs font-bold transition-all shrink-0 cursor-pointer"
                            title="Open official NCERT CIET page"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">{t('audio.ui_NCERT_4b0c', 'NCERT')}</span>
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
                    <Library className="w-16 h-16 text-purple-300 mb-4" />
                    <h3 className="text-base font-bold text-slate-800">{t('audio.ui_Noaudiobooksfound_cad3', 'No audiobooks found')}</h3>
                    <p className="text-xs text-slate-500 max-w-xs mt-1">{t('audio.ui_Tryselectinganotherc_92d9', 'Try selecting another category or resetting your search terms.')}</p>
                    <button 
                      onClick={() => { setSelectedCategory('All'); setActiveTab('all'); setSearchQuery(''); }}
                      className="mt-4 px-5 py-2.5 bg-purple-600 text-white rounded-full text-xs font-bold hover:bg-purple-700 cursor-pointer shadow-sm transition-transform hover:scale-105"
                    >
                      {t('audio.ui_ResetFilters_937d', 'Reset Filters')}
                    </button>
                  </div>
                )}
            </div>

          </div>
        </div>
      </main>

      {/* FLOATING BOTTOM AUDIO PLAYER WITH CHAPTER TIMESTAMP & CONTROLS */}
      {selectedBook && (
        <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-purple-200 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] z-50 transition-all duration-300 ${isPlayerExpanded ? 'py-3.5 px-6 h-auto' : 'py-2.5 px-6 h-16'}`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between h-full gap-4">
            
            {/* Track Info & Current Chapter Timestamp */}
            <div className="flex items-center gap-3 min-w-0 flex-1 sm:flex-initial">
              <div 
                onClick={() => handlePlayPause()}
                className="w-10 h-12 rounded-lg overflow-hidden shadow-sm shrink-0 border border-slate-100 relative group cursor-pointer"
                title={isPlaying ? "Pause" : "Play"}
              >
                <img src={selectedBook.cover} alt={selectedBook.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  {isPlaying ? <Pause className="w-3.5 h-3.5 text-white" /> : <Play className="w-3.5 h-3.5 text-white ml-0.5" />}
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 truncate leading-snug">{selectedBook.title}</h4>
                  <span className="text-[10px] text-slate-400 hidden lg:inline font-medium">• {selectedBook.author}</span>
                </div>
                
                {/* Chapter Timestamp badge exactly as previous */}
                {(() => {
                  const chInfo = getCurrentChapterInfo(selectedBook, currentTime, duration);
                  if (!chInfo) return null;
                  return (
                    <button
                      onClick={() => setViewTimestampsBook(selectedBook)}
                      className="flex items-center gap-1.5 mt-0.5 hover:opacity-80 transition-opacity cursor-pointer text-left"
                      title="Click to view all chapters & timestamps list"
                    >
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
                      <p className="text-[11px] font-bold text-purple-600 truncate underline decoration-purple-300 underline-offset-2">
                        {t('audio.ui_Chapter', 'Ch')} {chInfo.chapterNumber}: {chInfo.chapterTitle} • {chInfo.duration}
                      </p>
                    </button>
                  );
                })()}
              </div>
            </div>

            {/* Collapsed vs Expanded Player Controls */}
            {!isPlayerExpanded ? (
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-xs font-bold text-slate-500 hidden sm:inline-block font-mono w-[85px] text-center tabular-nums shrink-0">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>

                <button 
                  onClick={handlePrevTrack}
                  className="text-slate-400 hover:text-slate-800 transition-colors cursor-pointer hidden sm:block"
                  title="Previous book"
                >
                  <SkipBack className="w-4 h-4" />
                </button>
                
                <button 
                  onClick={handlePlayPause}
                  className="w-10 h-10 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center shadow-md shadow-purple-600/20 transition-all hover:scale-105 cursor-pointer shrink-0"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                </button>

                <button 
                  onClick={handleNextTrack}
                  className="text-slate-400 hover:text-slate-800 transition-colors cursor-pointer hidden sm:block"
                  title="Next book"
                >
                  <SkipForward className="w-4 h-4" />
                </button>

                <button 
                  onClick={() => setIsPlayerExpanded(true)}
                  className="p-1.5 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                  title="Expand Full Controls"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 max-w-2xl mx-4 flex flex-col items-center gap-2">
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={handlePrevTrack}
                      className="text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                      title="Previous"
                    >
                      <SkipBack className="w-5 h-5" />
                    </button>
                    
                    <button
                      onClick={handlePlayPause}
                      className="w-11 h-11 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-purple-600/20 transition-all hover:scale-105 cursor-pointer"
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
                    </button>
                    
                    <button 
                      onClick={handleNextTrack}
                      className="text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                      title="Next"
                    >
                      <SkipForward className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => setViewTimestampsBook(selectedBook)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 hover:bg-purple-200 text-purple-600 rounded-xl text-xs font-bold transition-colors cursor-pointer ml-2"
                      title="View Chapters & Timestamps List"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{t('audio.ui_ChaptersList_de9b', 'Chapters List')}</span>
                    </button>
                  </div>

                  <div className="w-full flex items-center gap-3">
                    <span className="text-[10px] font-bold text-slate-500 w-11 shrink-0 inline-block text-right font-mono tabular-nums">{formatTime(currentTime)}</span>
                    <input
                      type="range"
                      min={0}
                      max={duration || 100}
                      value={currentTime}
                      onChange={handleScrubberChange}
                      className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer accent-purple-600 focus:outline-none"
                      style={{
                        background: `linear-gradient(to right, #9333ea ${duration > 0 ? (currentTime / duration) * 100 : 0}%, #f1f5f9 ${duration > 0 ? (currentTime / duration) * 100 : 0}%)`
                      }}
                    />
                    <span className="text-[10px] font-bold text-slate-500 w-11 shrink-0 inline-block font-mono tabular-nums">{formatTime(duration)}</span>
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-end gap-5 w-auto shrink-0">
                  <button 
                    onClick={() => toggleFavorite(selectedBook.id)} 
                    className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                    title={favorites.includes(selectedBook.id) ? "Saved to Favorites" : "Save to Favorites"}
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(selectedBook.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  <div className="flex items-center gap-2">
                    <button onClick={toggleMute} className="text-slate-400 hover:text-slate-800 transition-colors cursor-pointer">
                      {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-16 h-1.5 rounded-full appearance-none cursor-pointer accent-purple-600 focus:outline-none"
                      style={{
                        background: `linear-gradient(to right, #9333ea ${(isMuted ? 0 : volume) * 100}%, #f1f5f9 ${(isMuted ? 0 : volume) * 100}%)`
                      }}
                    />
                  </div>
                </div>

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

      {/* CHAPTER TIMESTAMPS MODAL */}
      <AnimatePresence>
        {viewTimestampsBook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] overflow-hidden bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setViewTimestampsBook(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[28px] max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="shrink-0 p-6 bg-gradient-to-r from-purple-600 to-purple-950 text-white flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={viewTimestampsBook.cover}
                    alt={viewTimestampsBook.title}
                    className="w-12 h-16 rounded-lg object-cover shadow-md border border-white/20 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-extrabold tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full inline-block mb-1">
                      {viewTimestampsBook.subject || viewTimestampsBook.category}
                    </span>
                    <h3 className="text-lg font-extrabold leading-tight">{viewTimestampsBook.title}</h3>
                    <p className="text-xs text-purple-50 font-medium mt-0.5">{t('audio.ui_ChaptersTimestamps_7706', 'Chapters & Timestamps')}</p>
                  </div>
                </div>
                <button
                  onClick={() => setViewTimestampsBook(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chapters List */}
              <div
                ref={chaptersListRef}
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
                onPointerDown={handleListPointerDown}
                onPointerMove={handleListPointerMove}
                onPointerUp={handleListPointerUp}
                onPointerLeave={handleListPointerUp}
                style={{
                  WebkitOverflowScrolling: 'touch',
                  overscrollBehavior: 'contain',
                  touchAction: 'pan-y'
                }}
                className="flex-1 min-h-0 overflow-y-auto custom-modal-scrollbar p-6 space-y-3 divide-y divide-slate-100 select-none"
              >
                {viewTimestampsBook.chapters && viewTimestampsBook.chapters.map((chTitle, idx) => {
                  const range = getChapterTimeRange(viewTimestampsBook, idx, duration);
                  const isCurrentChapter = selectedBook?.id === viewTimestampsBook.id && activeChapterIdx === idx;

                  return (
                    <div
                      key={idx}
                      ref={isCurrentChapter ? activeChapterRef : null}
                      onClick={() => {
                        if (hasDraggedRef.current) {
                          hasDraggedRef.current = false;
                          return;
                        }
                        const hasChapterAudio = viewTimestampsBook.chapterAudioUrls && viewTimestampsBook.chapterAudioUrls[idx];
                        if (hasChapterAudio) {
                           selectBook(viewTimestampsBook, idx);
                        } else {
                           selectBook(viewTimestampsBook, idx, range.startSecs);
                        }
                        setViewTimestampsBook(null);
                      }}
                      className={`pt-3 first:pt-0 flex items-center justify-between gap-4 p-3 rounded-xl transition-all cursor-pointer group ${
                        isCurrentChapter
                          ? 'bg-purple-50 border border-purple-200'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="min-w-0">
                          <h4 className={`text-xs font-bold truncate leading-snug`}>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isCurrentChapter ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-500 group-hover:bg-purple-50 group-hover:text-purple-600'}`}>
                            {t('audio.ui_Chapter', 'Ch')} {idx + 1}
                          </span>
                          <span className={`text-sm font-bold truncate pr-4 ${isCurrentChapter ? 'text-purple-700' : 'text-slate-700 group-hover:text-purple-600'}`}>
                            {t(`audio.book_chap_${viewTimestampsBook.id}_${idx}`, chTitle)}
                          </span>
                          </h4>
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 mt-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{range.durationText}</span>
                          </span>
                        </div>
                      </div>

                      <button className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 ${
                        isCurrentChapter
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-100 text-slate-700 group-hover:bg-purple-600 group-hover:text-white'
                      }`}>
                        {isCurrentChapter && isPlaying ? (
                          <>
                            <Pause className="w-3 h-3 fill-current" />
                            <span>{t('audio.ui_Playing_c9db', 'Playing')}</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3 h-3 fill-current" />
                            <span>{t('audio.ui_PlayChapter_af32', 'Play Chapter')}</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Modal Footer */}
              <div className="shrink-0 p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>{t('audio.ui_TotalChapters', 'Total Chapters')}: {viewTimestampsBook.chaptersCount || viewTimestampsBook.chapters?.length}</span>
                <button
                  onClick={() => setViewTimestampsBook(null)}
                  className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl font-bold text-slate-700 transition-colors cursor-pointer"
                >
                  {t('audio.ui_Close_d3d2', 'Close')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AudioLibraryDashboard;

