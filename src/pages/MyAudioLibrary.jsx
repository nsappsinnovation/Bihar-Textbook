import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Headphones, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, 
  Heart, Bookmark, Clock, BookOpen, Star, Sparkles, Film, X, Search, CheckCircle, 
  Library, RotateCcw, Award, CheckCircle2, ChevronRight, Layers, FileText
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

const booksData = [
  {
    id: 1,
    title: "Wisdom For Sale Story",
    author: "Hindi Fairy Tales",
    category: "Stories",
    rating: 4.8,
    reviews: "1,240",
    duration: "10m 15s",
    chaptersCount: 1,
    cover: "https://img.youtube.com/vi/fGcV3xj6xSs/hqdefault.jpg",
    audioUrl: "https://www.youtube.com/watch?v=fGcV3xj6xSs",
    description: "समझदारी यहाँ बिकती है | Wisdom For Sale Story in Hindi.",
    chapters: ["Full Story"],
    progress: 0,
    color: "from-purple-500/20 to-indigo-600/20",
    accent: "text-purple-600"
  },
  {
    id: 2,
    title: "Price of Food",
    author: "Hindi Stories",
    category: "Stories",
    rating: 4.6,
    reviews: "850",
    duration: "12m 30s",
    chaptersCount: 1,
    cover: "https://img.youtube.com/vi/3xmT-F46kWU/hqdefault.jpg",
    audioUrl: "https://www.youtube.com/watch?v=3xmT-F46kWU",
    description: "Price of food | Hindi stories | Hindi story 2025 | Story in Hindi.",
    chapters: ["Full Story"],
    progress: 0,
    color: "from-blue-500/20 to-teal-600/20",
    accent: "text-blue-600"
  },
  {
    id: 3,
    title: "School Homework Moral Story",
    author: "PunToon Kids",
    category: "Stories",
    rating: 4.9,
    reviews: "2,100",
    duration: "8m 45s",
    chaptersCount: 1,
    cover: "https://img.youtube.com/vi/6TDTzNyF2As/hqdefault.jpg",
    audioUrl: "https://www.youtube.com/watch?v=6TDTzNyF2As",
    description: "स्कूल का होमवर्क | घर का पाठ | Moral Values For Kids | नैतिक कहानी | PunToon Kids - Hindi.",
    chapters: ["Full Story"],
    progress: 0,
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
    setSelectedBook(book);
    setIsPlaying(true);
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
    setIsVideoModalOpen(true);
  };

  // Filtering Books
  const categoriesList = ['All', 'Self Growth', 'History', 'Science', 'Biographies', 'Business', 'Stories'];
  
  const filteredBooks = books.filter(book => {
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
    }

    return matchesSearch && matchesCategory && matchesTab;
  });

  return (
    <div className="min-h-screen bg-[#FAF9FF] text-slate-800 font-sans pb-32">
      {/* Hidden ReactPlayer for audio playback */}
      <ReactPlayer
        ref={audioRef}
        url={selectedBook.audioUrl}
        playing={isPlaying}
        volume={volume}
        muted={isMuted}
        onProgress={({ playedSeconds }) => setCurrentTime(playedSeconds)}
        onDuration={(d) => setDuration(d)}
        onEnded={handleNextTrack}
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
        width="1px"
        height="1px"
        config={{ youtube: { playerVars: { origin: window.location.origin } } }}
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
              { id: 'favorites', label: 'Favorites', icon: <Heart className="w-4 h-4" /> },
              { id: 'progress', label: 'In Progress', icon: <Clock className="w-4 h-4" /> },
              { id: 'completed', label: 'Completed', icon: <CheckCircle className="w-4 h-4" /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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
                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all shrink-0 cursor-pointer ${
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                    className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col group relative overflow-hidden"
                  >
                    {/* Background Subtle Gradient Glow */}
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${book.color} blur-2xl rounded-full opacity-60 pointer-events-none group-hover:scale-125 transition-transform duration-700`} />
                    
                    {/* Top Row: Cover & Info */}
                    <div className="flex gap-4 items-start relative z-10">
                      {/* Cover Photo */}
                      <div className="relative w-24 h-28 rounded-2xl overflow-hidden shadow-sm shrink-0 border border-slate-100 group-hover:scale-105 transition-transform duration-300">
                        <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                        
                        {/* Play/Pause Overlay on Cover */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            onClick={() => selectBook(book)}
                            className="w-10 h-10 rounded-full bg-white text-purple-600 flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
                          >
                            {isBookPlaying ? <Pause className="w-5 h-5 fill-purple-600" /> : <Play className="w-5 h-5 fill-purple-600 ml-0.5" />}
                          </button>
                        </div>

                        {/* Completed Checkmark Badge */}
                        {book.progress === 100 && (
                          <div className="absolute top-1 left-1 bg-green-500 text-white rounded-full p-0.5 shadow-sm">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 space-y-1">
                        <span className="text-[10px] uppercase tracking-wider font-extrabold text-purple-500">
                          {book.category}
                        </span>
                        <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-purple-600 transition-colors leading-tight line-clamp-1">
                          {book.title}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">By {book.author}</p>
                        
                        {/* Rating row */}
                        <div className="flex items-center gap-1 mt-1.5">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-bold text-slate-800">{book.rating}</span>
                          <span className="text-[10px] text-slate-400">({book.reviews})</span>
                        </div>

                        {/* Extra icons */}
                        <div className="flex items-center gap-3 text-slate-400 text-[10px] pt-1">
                          <span className="flex items-center gap-1 font-semibold">
                            <Clock className="w-3.5 h-3.5" /> {book.duration}
                          </span>
                          <span className="flex items-center gap-1 font-semibold">
                            <BookOpen className="w-3.5 h-3.5" /> {book.chaptersCount} Chs
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Progress Row */}
                    <div className="mt-4 pt-3 border-t border-slate-50 relative z-10 flex-grow flex flex-col justify-end">
                      {book.progress > 0 && (
                        <div className="space-y-1 mb-3">
                          <div className="flex justify-between text-[10px] font-bold text-slate-500">
                            <span>Progress</span>
                            <span>{book.progress}%</span>
                          </div>
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 rounded-full" style={{ width: `${book.progress}%` }} />
                          </div>
                        </div>
                      )}

                      {/* Interactive Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => selectBook(book)}
                          className={`flex-1 h-9 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                            isBookPlaying 
                              ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' 
                              : 'bg-purple-600 text-white hover:bg-purple-700 shadow-sm'
                          }`}
                        >
                          {isBookPlaying ? (
                            <>
                              <Pause className="w-3.5 h-3.5 fill-purple-700" /> Playing
                            </>
                          ) : (
                            <>
                              <Headphones className="w-3.5 h-3.5" /> Audio
                            </>
                          )}
                        </button>

                        {book.youtubeId && (
                          <button
                            onClick={() => openVideo(book)}
                            className="h-9 px-3 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Film className="w-3.5 h-3.5" /> Video
                          </button>
                        )}

                        <button
                          onClick={() => toggleFavorite(book.id)}
                          className={`h-9 w-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer border ${
                            isFav 
                              ? 'bg-rose-50 text-rose-500 border-rose-100' 
                              : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
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
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-purple-100/50 shadow-[0_-10px_30px_rgba(0,0,0,0.06)] px-6 py-4 z-40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Track Info */}
          <div className="flex items-center gap-4 w-full md:w-1/4 shrink-0">
            <div className="w-12 h-14 rounded-lg overflow-hidden shadow-sm shrink-0 border border-slate-100">
              <img src={selectedBook.cover} alt={selectedBook.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-extrabold text-slate-900 truncate leading-snug">{selectedBook.title}</h4>
              <p className="text-xs text-slate-500 font-medium truncate mt-0.5">{selectedBook.author}</p>
            </div>
            
            <button 
              onClick={() => toggleFavorite(selectedBook.id)} 
              className={`text-slate-400 hover:text-rose-500 transition-colors md:hidden`}
            >
              <Heart className={`w-5 h-5 ${favorites.includes(selectedBook.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>

          {/* Player Core Controls & Progress */}
          <div className="flex-1 w-full flex flex-col items-center gap-2">
            
            {/* Buttons row */}
            <div className="flex items-center gap-6">
              <button 
                onClick={handlePrevTrack}
                className="text-slate-400 hover:text-slate-800 transition-colors"
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
                className="text-slate-400 hover:text-slate-800 transition-colors"
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
              className={`text-slate-400 hover:text-rose-500 transition-colors`}
              title="Add to Favorites"
            >
              <Heart className={`w-5 h-5 ${favorites.includes(selectedBook.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <button onClick={toggleMute} className="text-slate-400 hover:text-slate-800 transition-colors">
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

        </div>
      </div>

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
              className="bg-white rounded-3xl border border-slate-100 overflow-hidden w-full max-w-4xl shadow-2xl relative flex flex-col"
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
                  onClick={() => setIsVideoModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* YouTube Iframe */}
              <div className="aspect-video w-full bg-black">
                <iframe
                  src={activeVideoUrl}
                  title={activeVideoTitle}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
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
                      selectBook(selectedBook);
                    }}
                    className="flex-1 sm:flex-initial px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Headphones className="w-4 h-4" /> Switch to Audio
                  </button>
                  <button
                    onClick={() => setIsVideoModalOpen(false)}
                    className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-50"
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

export default MyAudioLibrary;
