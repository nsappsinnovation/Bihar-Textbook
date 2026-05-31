import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, ChevronLeft, ChevronRight,
  Landmark, MapPin, Globe, Box, BookOpen, Flag, Palette
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const HeritageDashboard = () => {
  const navigate = useNavigate();

  const categories = [
    { label: 'Ancient Civilizations', color: 'bg-amber-50', icon: <Landmark className="text-amber-600 w-4 h-4 md:w-5 md:h-5" /> },
    { label: 'Indian Heritage', color: 'bg-amber-50', icon: <MapPin className="text-amber-600 w-4 h-4 md:w-5 md:h-5" /> },
    { label: 'World Heritage', color: 'bg-amber-50', icon: <Globe className="text-amber-600 w-4 h-4 md:w-5 md:h-5" /> },
    { label: 'Artifacts', color: 'bg-amber-50', icon: <Box className="text-amber-600 w-4 h-4 md:w-5 md:h-5" /> },
    { label: 'Manuscripts', color: 'bg-amber-50', icon: <BookOpen className="text-amber-600 w-4 h-4 md:w-5 md:h-5" /> },
    { label: 'Freedom Struggle', color: 'bg-amber-50', icon: <Flag className="text-amber-600 w-4 h-4 md:w-5 md:h-5" /> },
    { label: 'Folk Culture', color: 'bg-amber-50', icon: <Palette className="text-amber-600 w-4 h-4 md:w-5 md:h-5" /> },
  ];

  const flashcards = [
    // 1. Ancient Civilizations
    {
      category: 'Ancient Civilizations',
      title: 'The Indus Valley',
      desc: 'Discover the advanced urban planning of Harappa and Mohenjo-daro. They featured baked brick houses, elaborate drainage systems, and water supply systems.',
      image: '/images/heritage/indus.png'
    },
    {
      category: 'Ancient Civilizations',
      title: 'Mesopotamia',
      desc: 'Known as the cradle of civilization, located between the Tigris and Euphrates rivers, famous for the invention of writing.',
      image: '/images/heritage/meso.png'
    },
    {
      category: 'Ancient Civilizations',
      title: 'Ancient Egypt',
      desc: 'Explore the civilization of the Nile Valley, known for its monumental pyramids, pharaohs, and hieroglyphic writing system.',
      image: '/images/heritage/ancient egypt.png'
    },
    {
      category: 'Ancient Civilizations',
      title: 'Ancient Rome',
      desc: 'A massive empire that shaped Western civilization, known for its engineering, architecture, and complex legal and political systems.',
      image: '/images/heritage/ancient rome.png'
    },
    {
      category: 'Ancient Civilizations',
      title: 'Mayan Civilization',
      desc: 'A Mesoamerican civilization noted for its fully developed writing system, art, architecture, mathematics, and astronomical system.',
      image: '/images/heritage/mayan.png'
    },

    // 2. Indian Heritage
    {
      category: 'Indian Heritage',
      title: 'The Chola Dynasty',
      desc: 'Learn about the powerful Chola empire, their art, and architecture. They were known for building grand temples like the Brihadeeswarar Temple.',
      image: '/images/heritage/chola.png'
    },
    {
      category: 'Indian Heritage',
      title: 'Taj Mahal',
      desc: 'An immense mausoleum of white marble, built in Agra by Mughal emperor Shah Jahan in memory of his favorite wife.',
      image: '/images/heritage/taj mahal.png'
    },
    {
      category: 'Indian Heritage',
      title: 'Ajanta & Ellora',
      desc: 'Ancient rock-cut caves featuring magnificent Buddhist, Hindu, and Jain sculptures and paintings dating back to the 2nd century BCE.',
      image: '/images/heritage/ajanta ellora.png'
    },
    {
      category: 'Indian Heritage',
      title: 'Vijayanagara Empire',
      desc: 'The ruins of Hampi tell the story of a prosperous and wealthy empire known for its intricate temple architecture and grand bazaars.',
      image: '/images/heritage/vijaynagar.png'
    },
    {
      category: 'Indian Heritage',
      title: 'Khajuraho Temples',
      desc: 'Famous for their nagara-style architectural symbolism and intricate, expressive sculptures built by the Chandela dynasty.',
      image: '/images/heritage/khajuraho.png'
    },

    // 3. World Heritage
    {
      category: 'World Heritage',
      title: 'The Great Wall',
      desc: 'Explore the history and construction of the majestic Great Wall of China, built to protect against nomadic intrusions.',
      image: '/images/heritage/greatwall.png'
    },
    {
      category: 'World Heritage',
      title: 'Machu Picchu',
      desc: 'An Incan citadel set high in the Andes Mountains in Peru, renowned for its sophisticated dry-stone walls and panoramic views.',
      image: '/images/heritage/machu picchu.png'
    },
    {
      category: 'World Heritage',
      title: 'Petra',
      desc: 'A famous archaeological site in Jordan\'s southwestern desert, known for its rock-cut architecture and water conduit system.',
      image: '/images/heritage/petra.png'
    },
    {
      category: 'World Heritage',
      title: 'Colosseum',
      desc: 'An oval amphitheater in the centre of the city of Rome, Italy, built of travertine limestone, tuff, and brick-faced concrete.',
      image: '/images/heritage/colosseum.png'
    },
    {
      category: 'World Heritage',
      title: 'Chichen Itza',
      desc: 'A complex of Mayan ruins on Mexico\'s Yucatán Peninsula, dominated by the massive El Castillo step pyramid.',
      image: '/images/heritage/chichen itza.png'
    },

    // 4. Artifacts
    {
      category: 'Artifacts',
      title: 'Terracotta Warriors',
      desc: 'Uncover the secrets of the massive underground army of the first Emperor of China, buried with him to protect him in the afterlife.',
      image: '/images/heritage/terracotta.png'
    },
    {
      category: 'Artifacts',
      title: 'Rosetta Stone',
      desc: 'A granodiorite stele inscribed with three versions of a decree that became the key to deciphering Egyptian hieroglyphs.',
      image: '/images/heritage/rosetta.png'
    },
    {
      category: 'Artifacts',
      title: 'Tutankhamun\'s Mask',
      desc: 'The gold death mask of the 18th-dynasty ancient Egyptian Pharaoh Tutankhamun, discovered by Howard Carter in 1925.',
      image: '/images/heritage/tutankhamun.png'
    },
    {
      category: 'Artifacts',
      title: 'Dancing Girl',
      desc: 'A prehistoric bronze sculpture made in lost-wax casting, found in Mohenjo-daro, a symbol of the Indus Valley civilization.',
      image: '/images/heritage/dancing girl.png'
    },
    {
      category: 'Artifacts',
      title: 'Venus de Milo',
      desc: 'An ancient Greek marble sculpture, one of the most famous works of ancient Greek sculpture, depicting Aphrodite.',
      image: '/images/heritage/venus de milo.png'
    },

    // 5. Manuscripts
    {
      category: 'Manuscripts',
      title: 'Vedic Scripts',
      desc: 'Understand the ancient wisdom preserved in the oldest Sanskrit texts, encompassing philosophy, rituals, and hymns.',
      image: '/images/heritage/vedic.png'
    },
    {
      category: 'Manuscripts',
      title: 'Dead Sea Scrolls',
      desc: 'Ancient Jewish religious manuscripts found in the Qumran Caves in the Judaean Desert, of great historical and religious significance.',
      image: '/images/heritage/dead sea scrolls.png'
    },
    {
      category: 'Manuscripts',
      title: 'Magna Carta',
      desc: 'A royal charter of rights agreed to by King John of England, laying the foundation for modern democracy and constitutional law.',
      image: '/images/heritage/magna carta.png'
    },
    {
      category: 'Manuscripts',
      title: 'Book of Kells',
      desc: 'An illuminated manuscript Gospel book in Latin, containing the four Gospels of the New Testament, renowned for its intricate artwork.',
      image: '/images/heritage/book of kells.png'
    },
    {
      category: 'Manuscripts',
      title: 'Gutenberg Bible',
      desc: 'The first major book printed using mass-produced movable metal type in Europe, marking the start of the printing revolution.',
      image: '/images/heritage/gutenberg bible.png'
    },

    // 6. Freedom Struggle
    {
      category: 'Freedom Struggle',
      title: 'The Salt March',
      desc: 'Trace the path of non-violent resistance that changed the world, led by Mahatma Gandhi against the British salt monopoly.',
      image: '/images/heritage/salt march.png'
    },
    {
      category: 'Freedom Struggle',
      title: 'Revolt of 1857',
      desc: 'Also known as the First War of Independence, it was a major uprising in India against the rule of the British East India Company.',
      image: '/images/heritage/revolt of 1857.png'
    },
    {
      category: 'Freedom Struggle',
      title: 'Quit India Movement',
      desc: 'Launched by Mahatma Gandhi in 1942, demanding an end to British rule in India during World War II.',
      image: '/images/heritage/quit india movement.png'
    },
    {
      category: 'Freedom Struggle',
      title: 'Jallianwala Bagh',
      desc: 'A turning point in the Indian independence movement where peaceful protestors were fired upon by British colonial troops.',
      image: '/images/heritage/jallianwala bagh.png'
    },
    {
      category: 'Freedom Struggle',
      title: 'Partition of India',
      desc: 'The division of British India into two independent dominions, India and Pakistan, marking the end of colonial rule.',
      image: '/images/heritage/partition of india.png'
    },

    // 7. Folk Culture
    {
      category: 'Folk Culture',
      title: 'Madhubani Art',
      desc: 'Learn the vibrant storytelling traditions of Bihar through mural paintings, traditionally created by women in the Mithila region.',
      image: '/images/heritage/madhubani art.png'
    },
    {
      category: 'Folk Culture',
      title: 'Warli Painting',
      desc: 'A tribal art form from Maharashtra that uses geometric shapes to depict social life, deeply rooted in nature and community.',
      image: '/images/heritage/warli painting.png'
    },
    {
      category: 'Folk Culture',
      title: 'Kalbelia Dance',
      desc: 'A sensuous folk dance performed by the women of the Kalbelia snake-charming community in Rajasthan, India.',
      image: '/images/heritage/kalbelia dance.png'
    },
    {
      category: 'Folk Culture',
      title: 'Kathputli Puppetry',
      desc: 'A string puppet theatre native to Rajasthan, known for its vibrant storytelling, colorful dolls, and traditional music.',
      image: '/images/heritage/kathputli puppetry.png'
    },
    {
      category: 'Folk Culture',
      title: 'Baul Singers',
      desc: 'Mystic minstrels from Bengal whose music blends various religious influences, emphasizing a search for the inner divine.',
      image: '/images/heritage/baul singers.png'
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('Ancient Civilizations');
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredCards = flashcards.filter(card => card.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex font-sans text-slate-900 overflow-x-hidden">
      {/* Back Button */}
      <button
        onClick={() => navigate("/heritage-archive")}
        className="fixed top-5 left-5 md:top-5 md:left-5 z-50 w-9 h-9 md:w-10 md:h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-[#B45309] hover:shadow-lg transition-all border border-slate-100 group"
      >
        <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>

      {/* Main Content */}
      <main className="flex-1 min-h-screen pb-4 overflow-y-auto">
        <div className="px-4 sm:px-6 md:px-12 2xl:px-20 space-y-6 md:space-y-8 pt-8 md:pt-6 2xl:max-w-[1600px] 2xl:mx-auto">
          
          {/* Hero Section */}
          <section className="bg-white rounded-[16px] md:rounded-[24px] overflow-hidden relative border border-slate-100 flex items-center min-h-[200px] sm:min-h-[260px] md:min-h-[300px] 2xl:min-h-[380px] shadow-[0_4px_20px_rgba(0,0,0,0.04)] pb-4 md:pb-6">
            <div className="relative z-10 p-5 sm:p-8 md:p-10 lg:w-1/2 space-y-3 md:space-y-4">
              <h1 className="text-[24px] sm:text-[28px] md:text-[36px] lg:text-[42px] 2xl:text-[52px] font-extrabold leading-[1.05] tracking-tight text-[#1E293B]">
                Let's explore <br />
                <span className="text-[#B45309]">Heritage Archive</span>
              </h1>
              <p className="text-slate-500 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-medium leading-relaxed max-w-sm">
                Discover, learn and preserve our rich history and cultural heritage in a new interactive way.
              </p>
              <div className="pt-2">
                   <button 
                     onClick={() => navigate('')}
                      className="px-5 py-2.5 sm:px-6 sm:py-3 bg-[#B45309] text-white rounded-full font-bold text-[12px] sm:text-[14px] flex items-center gap-2 hover:bg-brown-500 transition-colors w-max shadow-sm shadow-orange-200"
                   >
                     Explore Now <ArrowRight size={16} />
                   </button>
                 </div>
            </div>

            <div className="hidden lg:block absolute top-0 right-0 w-[55%] h-full">
              <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/40 to-transparent z-10" />
              <img src="/images/heritage/rhs.png" alt="Heritage Explorers" className="w-full h-full object-cover object-[center_20%]" />
            </div>
            
            {/* Mobile Image (Optional) */}
            <div className="lg:hidden absolute bottom-0 right-0 w-[40%] h-[80%] opacity-10 pointer-events-none">
              <img src="/images/heritage/rhs.png" alt="Heritage Explorers" className="w-full h-full object-contain object-bottom" />
            </div>
          </section>

          {/* Category Selection - Overlapping Hero like Quick Stats */}
          <section className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 md:gap-3 relative z-20 -mt-12 md:-mt-12 px-3 sm:px-4 md:px-12">
            {categories.map((cat, i) => (
              <div 
                key={i} 
                onClick={() => {
                  setSelectedCategory(cat.label);
                  setCurrentIndex(0);
                }}
                className={`bg-white rounded-[16px] p-2.5 md:p-3 border shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex items-center gap-2.5 transition-all duration-300 cursor-pointer group hover:-translate-y-1 hover:shadow-lg ${
                  selectedCategory === cat.label ? 'border-amber-400 bg-amber-50/20 shadow-md ring-2 ring-amber-100' : 'border-slate-100 hover:border-amber-200'
                }`}
              >
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-[10px] md:rounded-[12px] flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${cat.color}`}>
                   {cat.icon}
                </div>
                <h4 className={`text-[11px] md:text-[12px] font-extrabold leading-tight transition-colors pr-1 ${
                  selectedCategory === cat.label ? 'text-[#B45309]' : 'text-slate-700 group-hover:text-[#B45309]'
                }`}>
                  {cat.label}
                </h4>
              </div>
            ))}
          </section>

          {/* Carousel Section */}
          <div className="relative w-full max-w-[1400px] mx-auto h-[400px] md:h-[500px] flex items-center justify-center mt-2 md:-mt-2">
            {/* Carousel Container */}
              <div className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center">
                
                {(() => {
                  let displayCards = [...filteredCards];
                  if (displayCards.length === 0) return (
                    <div className="text-center text-slate-500 font-medium z-50">No flashcards found for this category yet.</div>
                  );

                  if (displayCards.length > 0) {
                    while (displayCards.length < 5) {
                      displayCards = [...displayCards, ...filteredCards];
                    }
                  }

                  return displayCards.map((card, i) => {
                    const len = displayCards.length;
                    let offset = i - currentIndex;
                    if (offset > Math.floor(len / 2)) offset -= len;
                    if (offset < -Math.floor(len / 2)) offset += len;

                    const isVisible = Math.abs(offset) <= 1;
                    const isCenter = offset === 0;
                    
                    // Responsiveness for 3D spacing
                    const xBase = typeof window !== 'undefined' && window.innerWidth < 768 ? 120 : 250;
                    const x = offset * xBase; 
                    const scale = isCenter ? 1 : 0.75;
                    const zIndex = isCenter ? 30 : (isVisible ? 10 : 0);
                    const opacity = isVisible ? (isCenter ? 1 : 0.6) : 0;

                    return (
                      <motion.div
                        key={i}
                        animate={{ x, scale, zIndex, opacity }}
                        transition={{ type: "spring", stiffness: 260, damping: 25 }}
                        className={`absolute flex flex-col items-center justify-center ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}
                      >
                        <div
                          className="relative w-56 h-56 md:w-[320px] md:h-[320px] overflow-hidden shadow-2xl border-[4px] md:border-[6px] border-white bg-slate-900 cursor-pointer group transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex flex-col rounded-full"
                          onClick={() => !isCenter && (offset > 0 ? setCurrentIndex(prev => (prev + 1) % len) : setCurrentIndex(prev => (prev - 1 + len) % len))}
                        >
                          {/* Image */}
                          <img 
                            src={card.image} 
                            alt={card.title} 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/80 z-10" />
                          
                          {/* Content when collapsed (Circle) */}
                          <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 md:pb-8 opacity-100 group-hover:opacity-0 transition-opacity duration-300 z-20">
                            <h3 className="text-white font-black text-lg md:text-2xl mb-1 text-center px-4 drop-shadow-md">{card.title}</h3>
                            <p className="text-white/80 text-[9px] md:text-xs font-bold uppercase tracking-widest">{card.category}</p>
                            {isCenter && (
                              <button className="mt-3 md:mt-5 px-5 md:px-6 py-2 md:py-2.5 bg-white text-black font-black rounded-full text-[11px] md:text-sm hover:bg-amber-50 transition-colors shadow-lg">
                                Explore
                              </button>
                            )}
                          </div>

                          {/* Content when hovered (Expanded Card) - Only rendered for center */}
                          {isCenter && (
                            <div className="absolute inset-0 p-5 md:p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center text-center z-30 scale-95 group-hover:scale-100">
                               <div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 text-[10px] font-black uppercase tracking-widest rounded-full mb-2 md:mb-3 border border-amber-500/30 backdrop-blur-sm">
                                 {card.category}
                               </div>
                               <h3 className="text-lg md:text-2xl font-black text-white mb-2 drop-shadow-md">{card.title}</h3>
                               <p className="text-white/90 text-xs md:text-sm font-medium leading-relaxed overflow-y-auto custom-scrollbar scrollbar-hide px-2">
                                 {card.desc}
                               </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  });
                })()}
              </div>

              {/* Navigation Arrows */}
              {filteredCards.length > 0 && (
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 md:px-12 z-40 pointer-events-none">
                   <button 
                     onClick={() => setCurrentIndex(prev => {
                       let tempLen = filteredCards.length;
                       while (tempLen > 0 && tempLen < 5) tempLen += filteredCards.length;
                       const len = tempLen || 1;
                       return (prev - 1 + len) % len;
                     })} 
                     className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white shadow-xl flex items-center justify-center text-slate-800 hover:text-[#B45309] hover:scale-110 transition-all pointer-events-auto border border-slate-100"
                   >
                     <ChevronLeft size={24} strokeWidth={3} className="w-5 h-5 md:w-6 md:h-6" />
                   </button>
                   <button 
                     onClick={() => setCurrentIndex(prev => {
                       let tempLen = filteredCards.length;
                       while (tempLen > 0 && tempLen < 5) tempLen += filteredCards.length;
                       const len = tempLen || 1;
                       return (prev + 1) % len;
                     })} 
                     className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white shadow-xl flex items-center justify-center text-slate-800 hover:text-[#B45309] hover:scale-110 transition-all pointer-events-auto border border-slate-100"
                   >
                     <ChevronRight size={24} strokeWidth={3} className="w-5 h-5 md:w-6 md:h-6" />
                   </button>
                </div>
              )}
            </div>

        </div>
      </main>
    </div>
  );
};

export default HeritageDashboard;
