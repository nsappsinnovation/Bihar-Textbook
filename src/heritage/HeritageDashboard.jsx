import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, ArrowRight, ChevronLeft, ChevronRight,
  Landmark, MapPin, Globe, Box, BookOpen, Flag, Palette,
  X, Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const heritageTheme = {
  backButtonHover: 'hover:text-[#B45309]',
  heroHighlightText: 'text-[#B45309]',
  cardIcon: 'text-amber-600',
  cardBg: 'bg-amber-50',
  activeBorder: 'border-amber-500 ring-2 ring-amber-500/10',
  inactiveBorder: 'border-slate-50',
  activeIconBg: 'bg-amber-600 text-white',
  activeTitleText: 'text-amber-700',
  inactiveTitleHover: 'text-[#1e1b4b] group-hover:text-amber-600',
  activeSubtitleText: 'text-amber-600/80',
  inactiveSubtitleText: 'text-slate-500'
};

const HeritageDashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedFactCard, setSelectedFactCard] = useState(null);

  // Lock body scroll when description modal is open
  useEffect(() => {
    if (selectedFactCard) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedFactCard]);

  const categories = useMemo(() => [
    { key: 'Ancient Civilizations', label: t("heritage.cat_AncientCivilizations", { defaultValue: "Ancient Civilizations" }), color: heritageTheme.cardBg, icon: <Landmark className={`${heritageTheme.cardIcon} w-4 h-4 md:w-5 md:h-5`} /> },
    { key: 'Indian Heritage', label: t("heritage.cat_IndianHeritage", { defaultValue: "Indian Heritage" }), color: heritageTheme.cardBg, icon: <MapPin className={`${heritageTheme.cardIcon} w-4 h-4 md:w-5 md:h-5`} /> },
    { key: 'World Heritage', label: t("heritage.cat_WorldHeritage", { defaultValue: "World Heritage" }), color: heritageTheme.cardBg, icon: <Globe className={`${heritageTheme.cardIcon} w-4 h-4 md:w-5 md:h-5`} /> },
    { key: 'Artifacts', label: t("heritage.cat_Artifacts", { defaultValue: "Artifacts" }), color: heritageTheme.cardBg, icon: <Box className={`${heritageTheme.cardIcon} w-4 h-4 md:w-5 md:h-5`} /> },
    { key: 'Manuscripts', label: t("heritage.cat_Manuscripts", { defaultValue: "Manuscripts" }), color: heritageTheme.cardBg, icon: <BookOpen className={`${heritageTheme.cardIcon} w-4 h-4 md:w-5 md:h-5`} /> },
    { key: 'Freedom Struggle', label: t("heritage.cat_FreedomStruggle", { defaultValue: "Freedom Struggle" }), color: heritageTheme.cardBg, icon: <Flag className={`${heritageTheme.cardIcon} w-4 h-4 md:w-5 md:h-5`} /> },
    { key: 'Folk Culture', label: t("heritage.cat_FolkCulture", { defaultValue: "Folk Culture" }), color: heritageTheme.cardBg, icon: <Palette className={`${heritageTheme.cardIcon} w-4 h-4 md:w-5 md:h-5`} /> },
  ], [t]);

  const flashcards = useMemo(() => [
    // 1. Ancient Civilizations
    {
      category: 'Ancient Civilizations',
      categoryDisplay: t("heritage.cat_AncientCivilizations", { defaultValue: "Ancient Civilizations" }),
      title: t("heritage.fc_TheIndusValley_title", { defaultValue: "The Indus Valley" }),
      desc: t("heritage.fc_TheIndusValley_desc", { defaultValue: "Discover the advanced urban planning of Harappa and Mohenjo-daro. They featured baked brick houses, elaborate drainage systems, and water supply systems." }),
      image: '/images/heritage/indus.webp',
      period: t("heritage.fc_TheIndusValley_period", { defaultValue: "2500 BCE - 1900 BCE" }),
      location: t("heritage.fc_TheIndusValley_loc", { defaultValue: "Ancient India & Pakistan" }),
      fullDescription: t("heritage.fc_TheIndusValley_full", { defaultValue: "The Indus Valley Civilization was one of the earliest urban societies in human history, flourishing across northwestern South Asia. Renowned for their planned cities such as Harappa and Mohenjo-daro, the citizens built standardized baked brick houses arranged in orderly grid patterns.\n\nWhat makes this civilization remarkable is its emphasis on public health and civic engineering. Every dwelling was connected to a sophisticated underground drainage and sewage network that surpassed any other ancient society. They engaged in widespread sea and land trade, utilizing uniform stone weights and seals engraved with animals and an undeciphered script." })
    },
    {
      category: 'Ancient Civilizations',
      categoryDisplay: t("heritage.cat_AncientCivilizations", { defaultValue: "Ancient Civilizations" }),
      title: t("heritage.fc_Mesopotamia_title", { defaultValue: "Mesopotamia" }),
      desc: t("heritage.fc_Mesopotamia_desc", { defaultValue: "Known as the cradle of civilization, located between the Tigris and Euphrates rivers, famous for the invention of writing." }),
      image: '/images/heritage/meso.webp',
      period: t("heritage.fc_Mesopotamia_period", { defaultValue: "3100 BCE - 539 BCE" }),
      location: t("heritage.fc_Mesopotamia_loc", { defaultValue: "Modern-day Iraq" }),
      fullDescription: t("heritage.fc_Mesopotamia_full", { defaultValue: "Mesopotamia, located between the Tigris and Euphrates rivers, is widely regarded as the cradle of civilization. It was here that humanity established its first organized cities, formal legal codes, and agricultural surpluses supported by extensive irrigation.\n\nAround 3200 BCE, Mesopotamian scribes invented cuneiform, the first written script, pressed into soft clay tablets. The society also pioneered wheel-making for transport and pottery, advanced astronomy, and monumental architecture exemplified by towering stepped temples known as ziggurats." })
    },
    {
      category: 'Ancient Civilizations',
      categoryDisplay: t("heritage.cat_AncientCivilizations", { defaultValue: "Ancient Civilizations" }),
      title: t("heritage.fc_AncientEgypt_title", { defaultValue: "Ancient Egypt" }),
      desc: t("heritage.fc_AncientEgypt_desc", { defaultValue: "Explore the civilization of the Nile Valley, known for its monumental pyramids, pharaohs, and hieroglyphic writing system." }),
      image: '/images/heritage/ancient egypt.webp',
      period: t("heritage.fc_AncientEgypt_period", { defaultValue: "3100 BCE - 30 BCE" }),
      location: t("heritage.fc_AncientEgypt_loc", { defaultValue: "Nile Valley, Egypt" }),
      fullDescription: t("heritage.fc_AncientEgypt_full", { defaultValue: "Ancient Egypt developed along the fertile banks of the Nile River, creating a stable kingdom ruled by monarchs known as pharaohs. The annual flood of the Nile provided rich soil that allowed Egyptian agriculture and culture to thrive over three millennia.\n\nEgyptian engineers constructed enduring monuments, including the limestone Pyramids of Giza and grand temple complexes. They developed hieroglyphic script, advanced medical practices, geometry for land surveying, and papyrus sheets that served as early writing paper." })
    },
    {
      category: 'Ancient Civilizations',
      categoryDisplay: t("heritage.cat_AncientCivilizations", { defaultValue: "Ancient Civilizations" }),
      title: t("heritage.fc_AncientRome_title", { defaultValue: "Ancient Rome" }),
      desc: t("heritage.fc_AncientRome_desc", { defaultValue: "A massive empire that shaped Western civilization, known for its engineering, architecture, and complex legal and political systems." }),
      image: '/images/heritage/ancient rome.webp',
      period: t("heritage.fc_AncientRome_period", { defaultValue: "753 BCE - 476 CE" }),
      location: t("heritage.fc_AncientRome_loc", { defaultValue: "Rome, Italy" }),
      fullDescription: t("heritage.fc_AncientRome_full", { defaultValue: "Originating as a republic along the Tiber River, Rome expanded into a vast empire encompassing the entire Mediterranean basin. Roman jurisprudence laid foundational principles for modern legal and governmental frameworks across the world.\n\nRoman civil engineering transformed civic life through enduring infrastructure. By developing strong volcanic concrete, they constructed thousands of miles of paved roads, monumental public baths, stone aqueducts to transport fresh water, and amphitheaters such as the Colosseum." })
    },
    {
      category: 'Ancient Civilizations',
      categoryDisplay: t("heritage.cat_AncientCivilizations", { defaultValue: "Ancient Civilizations" }),
      title: t("heritage.fc_MayanCivilization_title", { defaultValue: "Mayan Civilization" }),
      desc: t("heritage.fc_MayanCivilization_desc", { defaultValue: "A Mesoamerican civilization noted for its fully developed writing system, art, architecture, mathematics, and astronomical system." }),
      image: '/images/heritage/mayan.webp',
      period: t("heritage.fc_MayanCivilization_period", { defaultValue: "2000 BCE - 1500 CE" }),
      location: t("heritage.fc_MayanCivilization_loc", { defaultValue: "Mexico & Central America" }),
      fullDescription: t("heritage.fc_MayanCivilization_full", { defaultValue: "The Maya civilization flourished across tropical Mesoamerica, building independent city-states connected by trade networks. They are distinguished by their sophisticated hieroglyphic writing system capable of recording historical events and astronomical cycles.\n\nMayan mathematicians independently conceived the concept of zero, allowing them to perform complex calculations and develop highly precise solar calendars. Their architects constructed stepped stone pyramids, observatories, and palaces amidst dense tropical forests." })
    },

    // 2. Indian Heritage
    {
      category: 'Indian Heritage',
      categoryDisplay: t("heritage.cat_IndianHeritage", { defaultValue: "Indian Heritage" }),
      title: t("heritage.fc_TheCholaDynasty_title", { defaultValue: "The Chola Dynasty" }),
      desc: t("heritage.fc_TheCholaDynasty_desc", { defaultValue: "Learn about the powerful Chola empire, their art, and architecture. They were known for building grand temples like the Brihadeeswarar Temple." }),
      image: '/images/heritage/chola.webp',
      period: t("heritage.fc_TheCholaDynasty_period", { defaultValue: "300 BCE - 1279 CE" }),
      location: t("heritage.fc_TheCholaDynasty_loc", { defaultValue: "Southern India (Tamil Nadu)" }),
      fullDescription: t("heritage.fc_TheCholaDynasty_full", { defaultValue: "The Chola Dynasty was one of the longest-ruling empires in Indian history, celebrated for their administrative efficiency, maritime commerce, and Dravidian temple architecture. Their naval expeditions established trade routes stretching across Southeast Asia.\n\nUnder rulers like Rajaraja Chola I, they constructed grand granite temples such as the Brihadeeswarar Temple in Thanjavur. Chola artisans also perfected the lost-wax casting technique to produce exquisite bronze sculptures, most notably the cosmic representation of Shiva as Nataraja." })
    },
    {
      category: 'Indian Heritage',
      categoryDisplay: t("heritage.cat_IndianHeritage", { defaultValue: "Indian Heritage" }),
      title: t("heritage.fc_TajMahal_title", { defaultValue: "Taj Mahal" }),
      desc: t("heritage.fc_TajMahal_desc", { defaultValue: "An immense mausoleum of white marble, built in Agra by Mughal emperor Shah Jahan in memory of his favorite wife." }),
      image: '/images/heritage/taj mahal.webp',
      period: t("heritage.fc_TajMahal_period", { defaultValue: "Completed 1653 CE" }),
      location: t("heritage.fc_TajMahal_loc", { defaultValue: "Agra, Uttar Pradesh, India" }),
      fullDescription: t("heritage.fc_TajMahal_full", { defaultValue: "Commissioned by Mughal Emperor Shah Jahan in memory of his wife Mumtaz Mahal, the Taj Mahal stands as an iconic achievement of Indo-Islamic architecture. Located along the banks of the Yamuna River, the complex integrates Persian, Islamic, and Indian design principles.\n\nThe white marble structure is renowned for its symmetrical balance, reflecting pools, and intricate pietra dura stonework. Artisans inlaid semi-precious stones directly into the marble walls to depict delicate floral motifs and calligraphy." })
    },
    {
      category: 'Indian Heritage',
      categoryDisplay: t("heritage.cat_IndianHeritage", { defaultValue: "Indian Heritage" }),
      title: t("heritage.fc_AjantaEllora_title", { defaultValue: "Ajanta & Ellora" }),
      desc: t("heritage.fc_AjantaEllora_desc", { defaultValue: "Ancient rock-cut caves featuring magnificent Buddhist, Hindu, and Jain sculptures and paintings dating back to the 2nd century BCE." }),
      image: '/images/heritage/ajanta ellora.webp',
      period: t("heritage.fc_AjantaEllora_period", { defaultValue: "2nd Century BCE - 10th Century CE" }),
      location: t("heritage.fc_AjantaEllora_loc", { defaultValue: "Aurangabad, Maharashtra, India" }),
      fullDescription: t("heritage.fc_AjantaEllora_full", { defaultValue: "The Ajanta and Ellora Caves represent the pinnacle of Indian rock-cut architecture. Over centuries, master artisans carved detailed monasteries, prayer halls, and monumental sculptures directly into basalt cliffs.\n\nAjanta is celebrated for its ancient Buddhist mural paintings depicting Jataka tales with natural mineral pigments. Ellora features sanctuaries representing Buddhism, Hinduism, and Jainism side by side, including the Kailasa Temple, which was excavated top-down from a single solid rock." })
    },
    {
      category: 'Indian Heritage',
      categoryDisplay: t("heritage.cat_IndianHeritage", { defaultValue: "Indian Heritage" }),
      title: t("heritage.fc_VijayanagaraEmpire_title", { defaultValue: "Vijayanagara Empire" }),
      desc: t("heritage.fc_VijayanagaraEmpire_desc", { defaultValue: "The ruins of Hampi tell the story of a prosperous and wealthy empire known for its intricate temple architecture and grand bazaars." }),
      image: '/images/heritage/vijaynagar.webp',
      period: t("heritage.fc_VijayanagaraEmpire_period", { defaultValue: "1336 CE - 1646 CE" }),
      location: t("heritage.fc_VijayanagaraEmpire_loc", { defaultValue: "Hampi, Karnataka, India" }),
      fullDescription: t("heritage.fc_VijayanagaraEmpire_full", { defaultValue: "The Vijayanagara Empire served as a prominent cultural and economic power in South India. Its capital at Hampi was described by contemporary international travelers as one of the wealthiest and largest trading cities of its era.\n\nThe surviving ruins showcase distinct Dravidian stone architecture, featuring ornate pillared halls, aqueducts, royal pavilions, and the iconic Stone Chariot at the Vittala Temple complex." })
    },
    {
      category: 'Indian Heritage',
      categoryDisplay: t("heritage.cat_IndianHeritage", { defaultValue: "Indian Heritage" }),
      title: t("heritage.fc_KhajurahoTemples_title", { defaultValue: "Khajuraho Temples" }),
      desc: t("heritage.fc_KhajurahoTemples_desc", { defaultValue: "Famous for their nagara-style architectural symbolism and intricate, expressive sculptures built by the Chandela dynasty." }),
      image: '/images/heritage/khajuraho.webp',
      period: t("heritage.fc_KhajurahoTemples_period", { defaultValue: "950 CE - 1050 CE" }),
      location: t("heritage.fc_KhajurahoTemples_loc", { defaultValue: "Madhya Pradesh, India" }),
      fullDescription: t("heritage.fc_KhajurahoTemples_full", { defaultValue: "Constructed by the Chandela dynasty between 950 and 1050 CE, the Khajuraho Group of Monuments represents classic Nagara-style North Indian temple architecture. Out of 85 original temples dedicated to Hindu and Jain deities, around 25 remain well preserved today.\n\nThe temples are constructed from sandstone without mortar, relying on precise mortise-and-tenon interlocking joints. Their outer walls are adorned with thousands of finely carved sculptures depicting artistic celebrations, music, dance, and everyday community life." })
    },

    // 3. World Heritage
    {
      category: 'World Heritage',
      categoryDisplay: t("heritage.cat_WorldHeritage", { defaultValue: "World Heritage" }),
      title: t("heritage.fc_TheGreatWall_title", { defaultValue: "The Great Wall" }),
      desc: t("heritage.fc_TheGreatWall_desc", { defaultValue: "Explore the history and construction of the majestic Great Wall of China, built to protect against nomadic intrusions." }),
      image: '/images/heritage/greatwall.webp',
      period: t("heritage.fc_TheGreatWall_period", { defaultValue: "7th Century BCE - Ming Dynasty" }),
      location: t("heritage.fc_TheGreatWall_loc", { defaultValue: "Northern China" }),
      fullDescription: t("heritage.fc_TheGreatWall_full", { defaultValue: "The Great Wall of China is an extensive series of stone and earth fortifications extending across northern China. Built over successive dynasties over two millennia, its primary function was defensive protection along the northern frontier.\n\nBeyond military defense, the fortifications facilitated border control, regulated trade along the Silk Road, and served as an integrated communication corridor utilizing watchtowers and signal stations." })
    },
    {
      category: 'World Heritage',
      categoryDisplay: t("heritage.cat_WorldHeritage", { defaultValue: "World Heritage" }),
      title: t("heritage.fc_MachuPicchu_title", { defaultValue: "Machu Picchu" }),
      desc: t("heritage.fc_MachuPicchu_desc", { defaultValue: "An Incan citadel set high in the Andes Mountains in Peru, renowned for its sophisticated dry-stone walls and panoramic views." }),
      image: '/images/heritage/machu-picchu.webp',
      period: t("heritage.fc_MachuPicchu_period", { defaultValue: "Around 1450 CE" }),
      location: t("heritage.fc_MachuPicchu_loc", { defaultValue: "Andes Mountains, Peru" }),
      fullDescription: t("heritage.fc_MachuPicchu_full", { defaultValue: "Machu Picchu is a 15th-century Inca citadel situated on a mountain ridge nearly 8,000 feet above sea level in the Peruvian Andes. Built during the reign of Emperor Pachacuti, it served as an imperial estate and religious sanctuary.\n\nThe site demonstrates advanced Inca engineering adapted to mountainous terrain. It features polished dry-stone masonry fitted without mortar, extensive agricultural terracing to prevent soil erosion, and stone aqueducts providing fresh spring water." })
    },
    {
      category: 'World Heritage',
      categoryDisplay: t("heritage.cat_WorldHeritage", { defaultValue: "World Heritage" }),
      title: t("heritage.fc_Petra_title", { defaultValue: "Petra" }),
      desc: t("heritage.fc_Petra_desc", { defaultValue: "A famous archaeological site in Jordan's southwestern desert, known for its rock-cut architecture and water conduit system." }),
      image: '/images/heritage/petra.webp',
      period: t("heritage.fc_Petra_period", { defaultValue: "4th Century BCE" }),
      location: t("heritage.fc_Petra_loc", { defaultValue: "Jordan" }),
      fullDescription: t("heritage.fc_Petra_full", { defaultValue: "Petra served as the flourishing capital of the Nabataean Kingdom, strategically positioned at the crossroads of ancient Arabian spice and incense trade routes. The city is famous for its rose-toned sandstone facades carved directly into desert canyons.\n\nTo thrive in an arid desert environment, Nabataean engineers constructed an elaborate water management system composed of terracotta pipelines, dams, and rock-cut cisterns that stored seasonal flash floods for year-round supply." })
    },
    {
      category: 'World Heritage',
      categoryDisplay: t("heritage.cat_WorldHeritage", { defaultValue: "World Heritage" }),
      title: t("heritage.fc_Colosseum_title", { defaultValue: "Colosseum" }),
      desc: t("heritage.fc_Colosseum_desc", { defaultValue: "An oval amphitheater in the centre of the city of Rome, Italy, built of travertine limestone, tuff, and brick-faced concrete." }),
      image: '/images/heritage/colosseum.webp',
      period: t("heritage.fc_Colosseum_period", { defaultValue: "Completed 80 CE" }),
      location: t("heritage.fc_Colosseum_loc", { defaultValue: "Rome, Italy" }),
      fullDescription: t("heritage.fc_Colosseum_full", { defaultValue: "The Colosseum, originally named the Flavian Amphitheater, is the largest standing amphitheater in the world. Constructed of travertine limestone and Roman concrete, it could seat up to 50,000 spectators for civic assemblies and public performances.\n\nThe monument demonstrates sophisticated structural design, utilizing tiered arches and vaulting. Below the wooden arena floor lay the hypogeum, a complex network of underground tunnels and mechanical elevators used to transport stage scenery." })
    },
    {
      category: 'World Heritage',
      categoryDisplay: t("heritage.cat_WorldHeritage", { defaultValue: "World Heritage" }),
      title: t("heritage.fc_ChichenItza_title", { defaultValue: "Chichen Itza" }),
      desc: t("heritage.fc_ChichenItza_desc", { defaultValue: "A complex of Mayan ruins on Mexico's Yucatán Peninsula, dominated by the massive El Castillo step pyramid." }),
      image: '/images/heritage/chichen-itza.webp',
      period: t("heritage.fc_ChichenItza_period", { defaultValue: "600 CE - 1200 CE" }),
      location: t("heritage.fc_ChichenItza_loc", { defaultValue: "Yucatán Peninsula, Mexico" }),
      fullDescription: t("heritage.fc_ChichenItza_full", { defaultValue: "Chichen Itza was a major urban and ceremonial center of the Maya-Toltec civilization on the Yucatán Peninsula. The site reflects a synthesis of Mayan architectural traditions and Central Mexican design influences.\n\nAt its center stands El Castillo (the Temple of Kukulcan), a stepped pyramid aligned precisely with solar equinoxes. The pyramid features 365 steps corresponding to the solar year, demonstrating the builders' accurate astronomical knowledge." })
    },

    // 4. Artifacts
    {
      category: 'Artifacts',
      categoryDisplay: t("heritage.cat_Artifacts", { defaultValue: "Artifacts" }),
      title: t("heritage.fc_TerracottaWarriors_title", { defaultValue: "Terracotta Warriors" }),
      desc: t("heritage.fc_TerracottaWarriors_desc", { defaultValue: "Uncover the secrets of the massive underground army of the first Emperor of China, buried with him to protect him in the afterlife." }),
      image: '/images/heritage/terracotta.webp',
      period: t("heritage.fc_TerracottaWarriors_period", { defaultValue: "210 BCE" }),
      location: t("heritage.fc_TerracottaWarriors_loc", { defaultValue: "Xi'an, China" }),
      fullDescription: t("heritage.fc_TerracottaWarriors_full", { defaultValue: "The Terracotta Army is a collection of thousands of life-sized terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. Buried near his imperial mausoleum, the figures were intended to guard the monarch in the afterlife.\n\nDiscovered in 1974, the collection includes over 8,000 soldiers, chariots, and cavalry horses. Each sculpture was crafted with distinct facial features, hairstyles, and armor, representing the administrative and artistic capability of ancient China." })
    },
    {
      category: 'Artifacts',
      categoryDisplay: t("heritage.cat_Artifacts", { defaultValue: "Artifacts" }),
      title: t("heritage.fc_RosettaStone_title", { defaultValue: "Rosetta Stone" }),
      desc: t("heritage.fc_RosettaStone_desc", { defaultValue: "A granodiorite stele inscribed with three versions of a decree that became the key to deciphering Egyptian hieroglyphs." }),
      image: '/images/heritage/rosetta.webp',
      period: t("heritage.fc_RosettaStone_period", { defaultValue: "196 BCE" }),
      location: t("heritage.fc_RosettaStone_loc", { defaultValue: "Discovered in Egypt" }),
      fullDescription: t("heritage.fc_RosettaStone_full", { defaultValue: "The Rosetta Stone is an ancient Egyptian granodiorite stele inscribed with a royal decree issued at Memphis on behalf of King Ptolemy V. The inscription appears in three distinct scripts: Egyptian hieroglyphic, Demotic script, and Ancient Greek.\n\nBecause scholars could read the Greek text, the Rosetta Stone provided the linguistic key necessary to decipher ancient Egyptian hieroglyphics in 1822, opening thousands of years of recorded Egyptian history to modern study." })
    },
    {
      category: 'Artifacts',
      categoryDisplay: t("heritage.cat_Artifacts", { defaultValue: "Artifacts" }),
      title: t("heritage.fc_TutankhamunsMask_title", { defaultValue: "Tutankhamun's Mask" }),
      desc: t("heritage.fc_TutankhamunsMask_desc", { defaultValue: "The gold death mask of the 18th-dynasty ancient Egyptian Pharaoh Tutankhamun, discovered by Howard Carter in 1925." }),
      image: '/images/heritage/tutankhamun.webp',
      period: t("heritage.fc_TutankhamunsMask_period", { defaultValue: "Around 1323 BCE" }),
      location: t("heritage.fc_TutankhamunsMask_loc", { defaultValue: "Cairo, Egypt" }),
      fullDescription: t("heritage.fc_TutankhamunsMask_full", { defaultValue: "The funerary mask of Tutankhamun is one of the most recognized artworks of Ancient Egypt. Discovered intact in 1925 inside his tomb in the Valley of the Kings, it rested directly over the mummified remains of the young pharaoh.\n\nCrafted from high-purity solid gold weighing over 10 kilograms, the mask is inlaid with colored glass, quartz, obsidian, and lapis lazuli. The royal headdress features the royal insignia of the vulture and cobra, symbolizing sovereignty over Upper and Lower Egypt." })
    },
    {
      category: 'Artifacts',
      categoryDisplay: t("heritage.cat_Artifacts", { defaultValue: "Artifacts" }),
      title: t("heritage.fc_DancingGirl_title", { defaultValue: "Dancing Girl" }),
      desc: t("heritage.fc_DancingGirl_desc", { defaultValue: "A prehistoric bronze sculpture made in lost-wax casting, found in Mohenjo-daro, a symbol of the Indus Valley civilization." }),
      image: '/images/heritage/dancing girl.webp',
      period: t("heritage.fc_DancingGirl_period", { defaultValue: "Around 2300 BCE" }),
      location: t("heritage.fc_DancingGirl_loc", { defaultValue: "National Museum, New Delhi, India" }),
      fullDescription: t("heritage.fc_DancingGirl_full", { defaultValue: "The Dancing Girl is a prehistoric bronze statuette discovered in 1926 among the archaeological ruins of Mohenjo-daro. Standing approximately 10.5 centimeters tall, it represents one of the earliest examples of metal sculpture in South Asia.\n\nCreated using the lost-wax metallurgical casting process, the figurine depicts a young woman standing in a confident posture adorned with traditional arm bangles, illustrating the metallurgical skill and artistic expression of Indus Valley society." })
    },
    {
      category: 'Artifacts',
      categoryDisplay: t("heritage.cat_Artifacts", { defaultValue: "Artifacts" }),
      title: t("heritage.fc_VenusdeMilo_title", { defaultValue: "Venus de Milo" }),
      desc: t("heritage.fc_VenusdeMilo_desc", { defaultValue: "An ancient Greek marble sculpture, one of the most famous works of ancient Greek sculpture, depicting Aphrodite." }),
      image: '/images/heritage/venus de milo.webp',
      period: t("heritage.fc_VenusdeMilo_period", { defaultValue: "Around 100 BCE" }),
      location: t("heritage.fc_VenusdeMilo_loc", { defaultValue: "Louvre Museum, Paris" }),
      fullDescription: t("heritage.fc_VenusdeMilo_full", { defaultValue: "The Venus de Milo is an ancient Greek marble sculpture created during the Hellenistic period, attributed to Alexandros of Antioch. Discovered on the Aegean island of Milos in 1820, it depicts Aphrodite, the Greek goddess of beauty.\n\nStanding over two meters tall, the sculpture is admired for the naturalistic rendering of drapery wrapping around the lower body and classic proportioning, serving as a landmark example of classical Hellenistic artistic mastery." })
    },

    // 5. Manuscripts
    {
      category: 'Manuscripts',
      categoryDisplay: t("heritage.cat_Manuscripts", { defaultValue: "Manuscripts" }),
      title: t("heritage.fc_VedicScripts_title", { defaultValue: "Vedic Scripts" }),
      desc: t("heritage.fc_VedicScripts_desc", { defaultValue: "Understand the ancient wisdom preserved in the oldest Sanskrit texts, encompassing philosophy, rituals, and hymns." }),
      image: '/images/heritage/vedic.webp',
      period: t("heritage.fc_VedicScripts_period", { defaultValue: "1500 BCE - 500 BCE" }),
      location: t("heritage.fc_VedicScripts_loc", { defaultValue: "Ancient India" }),
      fullDescription: t("heritage.fc_VedicScripts_full", { defaultValue: "The Vedas are the foundational scriptures of ancient Indian literature and philosophical thought. Composed in classical Vedic Sanskrit, they represent some of the oldest preserved body of literature in human civilization.\n\nConsisting of four primary collections—the Rigveda, Samaveda, Yajurveda, and Atharvaveda—the texts were preserved for centuries through rigorous oral transmission before being recorded in manuscript form. They contain philosophical treatises, ethical principles, and hymns celebrating nature." })
    },
    {
      category: 'Manuscripts',
      categoryDisplay: t("heritage.cat_Manuscripts", { defaultValue: "Manuscripts" }),
      title: t("heritage.fc_DeadSeaScrolls_title", { defaultValue: "Dead Sea Scrolls" }),
      desc: t("heritage.fc_DeadSeaScrolls_desc", { defaultValue: "Ancient Jewish religious manuscripts found in the Qumran Caves in the Judaean Desert, of great historical and religious significance." }),
      image: '/images/heritage/dead sea scrolls.webp',
      period: t("heritage.fc_DeadSeaScrolls_period", { defaultValue: "3rd Century BCE - 1st Century CE" }),
      location: t("heritage.fc_DeadSeaScrolls_loc", { defaultValue: "Qumran Caves, Judaean Desert" }),
      fullDescription: t("heritage.fc_DeadSeaScrolls_full", { defaultValue: "The Dead Sea Scrolls comprise over 900 ancient religious manuscripts discovered inside earthenware jars across the Qumran Caves near the Dead Sea between 1947 and 1956.\n\nWritten on parchment, papyrus, and copper in Hebrew, Aramaic, and Greek, the collection contains the oldest known surviving manuscripts of biblical books along with historical records of community life during the Second Temple period." })
    },
    {
      category: 'Manuscripts',
      categoryDisplay: t("heritage.cat_Manuscripts", { defaultValue: "Manuscripts" }),
      title: t("heritage.fc_MagnaCarta_title", { defaultValue: "Magna Carta" }),
      desc: t("heritage.fc_MagnaCarta_desc", { defaultValue: "A royal charter of rights agreed to by King John of England, laying the foundation for modern democracy and constitutional law." }),
      image: '/images/heritage/magna carta.webp',
      period: t("heritage.fc_MagnaCarta_period", { defaultValue: "Signed 1215 CE" }),
      location: t("heritage.fc_MagnaCarta_loc", { defaultValue: "England" }),
      fullDescription: t("heritage.fc_MagnaCarta_full", { defaultValue: "The Magna Carta (Great Charter) was issued by King John of England at Runnymede in June 1215. Written on parchment in medieval Latin, it established the principle that everyone, including the sovereign ruler, is subject to the rule of law.\n\nThe document guaranteed due process of law and protection against arbitrary taxation and illegal imprisonment, serving as a foundational influence on modern constitutional democracies and international civil rights." })
    },
    {
      category: 'Manuscripts',
      categoryDisplay: t("heritage.cat_Manuscripts", { defaultValue: "Manuscripts" }),
      title: t("heritage.fc_BookofKells_title", { defaultValue: "Book of Kells" }),
      desc: t("heritage.fc_BookofKells_desc", { defaultValue: "An illuminated manuscript Gospel book in Latin, containing the four Gospels of the New Testament, renowned for its intricate artwork." }),
      image: '/images/heritage/book of kells.webp',
      period: t("heritage.fc_BookofKells_period", { defaultValue: "Around 800 CE" }),
      location: t("heritage.fc_BookofKells_loc", { defaultValue: "Dublin, Ireland" }),
      fullDescription: t("heritage.fc_BookofKells_full", { defaultValue: "The Book of Kells is a masterwork of medieval illuminated manuscript art created by Celtic monks around 800 CE. Preserved at Trinity College Dublin, it contains the four Gospels of the Christian New Testament written in Latin.\n\nThe calfskin vellum pages are decorated with intricate interlace patterns, Celtic knotwork, and vivid mineral pigments imported across continent-spanning trade routes." })
    },
    {
      category: 'Manuscripts',
      categoryDisplay: t("heritage.cat_Manuscripts", { defaultValue: "Manuscripts" }),
      title: t("heritage.fc_GutenbergBible_title", { defaultValue: "Gutenberg Bible" }),
      desc: t("heritage.fc_GutenbergBible_desc", { defaultValue: "The first major book printed using mass-produced movable metal type in Europe, marking the start of the printing revolution." }),
      image: '/images/heritage/gutenberg bible.webp',
      period: t("heritage.fc_GutenbergBible_period", { defaultValue: "1455 CE" }),
      location: t("heritage.fc_GutenbergBible_loc", { defaultValue: "Mainz, Germany" }),
      fullDescription: t("heritage.fc_GutenbergBible_full", { defaultValue: "Completed around 1455 by Johannes Gutenberg in Mainz, Germany, the Gutenberg Bible was the first major publication produced in Europe using movable metal type and a mechanical printing press.\n\nThis technological advancement replaced labor-intensive manual manuscript copying, significantly reducing the cost of books and enabling the widespread dissemination of scientific, philosophical, and literary knowledge across Europe." })
    },

    // 6. Freedom Struggle
    {
      category: 'Freedom Struggle',
      categoryDisplay: t("heritage.cat_FreedomStruggle", { defaultValue: "Freedom Struggle" }),
      title: t("heritage.fc_TheSaltMarch_title", { defaultValue: "The Salt March" }),
      desc: t("heritage.fc_TheSaltMarch_desc", { defaultValue: "Trace the path of non-violent resistance that changed the world, led by Mahatma Gandhi against the British salt monopoly." }),
      image: '/images/heritage/salt march.webp',
      period: t("heritage.fc_TheSaltMarch_period", { defaultValue: "March - April 1930" }),
      location: t("heritage.fc_TheSaltMarch_loc", { defaultValue: "Sabarmati Ashram to Dandi, Gujarat, India" }),
      fullDescription: t("heritage.fc_TheSaltMarch_full", { defaultValue: "The Salt March (Dandi Satyagraha) was a landmark non-violent civil disobedience movement led by Mahatma Gandhi in 1930 against colonial taxation and the British salt monopoly.\n\nOver 24 days, Gandhi and thousands of citizens marched 240 miles on foot from Sabarmati Ashram to the coastal village of Dandi, where they harvested natural salt from seawater. The protest drew global attention to India's independence movement and demonstrated the efficacy of peaceful non-cooperation." })
    },
    {
      category: 'Freedom Struggle',
      categoryDisplay: t("heritage.cat_FreedomStruggle", { defaultValue: "Freedom Struggle" }),
      title: t("heritage.fc_Revoltaf1857_title", { defaultValue: "Revolt of 1857" }),
      desc: t("heritage.fc_Revoltaf1857_desc", { defaultValue: "Also known as the First War of Independence, it was a major uprising in India against the rule of the British East India Company." }),
      image: '/images/heritage/revolt of 1857.webp',
      period: t("heritage.fc_Revoltaf1857_period", { defaultValue: "1857 - 1858" }),
      location: t("heritage.fc_Revoltaf1857_loc", { defaultValue: "Across Northern and Central India" }),
      fullDescription: t("heritage.fc_Revoltaf1857_full", { defaultValue: "The Revolt of 1857 marked the first widespread resistance against the administration of the British East India Company. Involving soldiers, regional rulers, peasants, and civil leaders across northern and central India, it united diverse communities in defiance of colonial rule.\n\nProminent figures including Rani Lakshmibai of Jhansi, Veer Kunwar Singh of Bihar, and Tatya Tope led defense movements that directly inspired subsequent generations of Indian national leadership." })
    },
    {
      category: 'Freedom Struggle',
      categoryDisplay: t("heritage.cat_FreedomStruggle", { defaultValue: "Freedom Struggle" }),
      title: t("heritage.fc_QuitIndiaMovement_title", { defaultValue: "Quit India Movement" }),
      desc: t("heritage.fc_QuitIndiaMovement_desc", { defaultValue: "Launched by Mahatma Gandhi in 1942, demanding an end to British rule in India during World War II." }),
      image: '/images/heritage/quit india movement.webp',
      period: t("heritage.fc_QuitIndiaMovement_period", { defaultValue: "August 1942" }),
      location: t("heritage.fc_QuitIndiaMovement_loc", { defaultValue: "Mumbai & Across India" }),
      fullDescription: t("heritage.fc_QuitIndiaMovement_full", { defaultValue: "Launched on August 8, 1942, at the Bombay session of the All-India Congress Committee, the Quit India Movement demanded an immediate end to colonial rule across India.\n\nFollowing Mahatma Gandhi's call to action, students, workers, and rural populations engaged in nationwide demonstrations, strikes, and underground information networks that significantly accelerated India's transition toward complete independence." })
    },
    {
      category: 'Freedom Struggle',
      categoryDisplay: t("heritage.cat_FreedomStruggle", { defaultValue: "Freedom Struggle" }),
      title: t("heritage.fc_JallianwalaBagh_title", { defaultValue: "Jallianwala Bagh" }),
      desc: t("heritage.fc_JallianwalaBagh_desc", { defaultValue: "A turning point in the Indian independence movement where peaceful protestors were fired upon by British colonial troops." }),
      image: '/images/heritage/jallianwala bagh.webp',
      period: t("heritage.fc_JallianwalaBagh_period", { defaultValue: "April 13, 1919" }),
      location: t("heritage.fc_JallianwalaBagh_loc", { defaultValue: "Amritsar, Punjab, India" }),
      fullDescription: t("heritage.fc_JallianwalaBagh_full", { defaultValue: "On April 13, 1919, thousands of unarmed citizens gathered peacefully at Jallianwala Bagh in Amritsar on the occasion of Baisakhi. British colonial troops blocked the main exit and fired upon the assembly.\n\nThe event served as a definitive turning point in the Indian independence movement, fostering nationwide unity and reinforcing national determination for self-governance." })
    },
    {
      category: 'Freedom Struggle',
      categoryDisplay: t("heritage.cat_FreedomStruggle", { defaultValue: "Freedom Struggle" }),
      title: t("heritage.fc_PartitionofIndia_title", { defaultValue: "Partition of India" }),
      desc: t("heritage.fc_PartitionofIndia_desc", { defaultValue: "The division of British India into two independent dominions, India and Pakistan, marking the end of colonial rule." }),
      image: '/images/heritage/partition of india.webp',
      period: t("heritage.fc_PartitionofIndia_period", { defaultValue: "August 1947" }),
      location: t("heritage.fc_PartitionofIndia_loc", { defaultValue: "Indian Subcontinent" }),
      fullDescription: t("heritage.fc_PartitionofIndia_full", { defaultValue: "In August 1947, British colonial rule concluded with the independence and partition of the Indian subcontinent into two independent sovereign nations: India and Pakistan.\n\nFollowing independence, India established a parliamentary democratic constitution guaranteeing equal civic rights, institutional representation, and secular governance across its diverse populations." })
    },

    // 7. Folk Culture
    {
      category: 'Folk Culture',
      categoryDisplay: t("heritage.cat_FolkCulture", { defaultValue: "Folk Culture" }),
      title: t("heritage.fc_MadhubaniArt_title", { defaultValue: "Madhubani Art" }),
      desc: t("heritage.fc_MadhubaniArt_desc", { defaultValue: "Learn the vibrant storytelling traditions of Bihar through mural paintings, traditionally created by women in the Mithila region." }),
      image: '/images/heritage/madhubani art.webp',
      period: t("heritage.fc_MadhubaniArt_period", { defaultValue: "Traditional Folk Heritage" }),
      location: t("heritage.fc_MadhubaniArt_loc", { defaultValue: "Mithila & Madhubani, Bihar, India" }),
      fullDescription: t("heritage.fc_MadhubaniArt_full", { defaultValue: "Madhubani painting, also known as Mithila art, originated in the Mithila region of Bihar. Traditionally painted by women on freshly plastered mud walls during festivals and weddings, the art form represents historical narratives and natural symbolism.\n\nArtisans utilize natural plant-derived pigments extracted from turmeric, marigold flowers, indigo, and soot. Characterized by intricate geometric border designs and vibrant imagery, no space on the surface is left unadorned." })
    },
    {
      category: 'Folk Culture',
      categoryDisplay: t("heritage.cat_FolkCulture", { defaultValue: "Folk Culture" }),
      title: t("heritage.fc_WarliPainting_title", { defaultValue: "Warli Painting" }),
      desc: t("heritage.fc_WarliPainting_desc", { defaultValue: "A tribal art form from Maharashtra that uses geometric shapes to depict social life, deeply rooted in nature and community." }),
      image: '/images/heritage/warli painting.webp',
      period: t("heritage.fc_WarliPainting_period", { defaultValue: "Traditional Tribal Art" }),
      location: t("heritage.fc_WarliPainting_loc", { defaultValue: "Maharashtra, India" }),
      fullDescription: t("heritage.fc_WarliPainting_full", { defaultValue: "Warli painting is a traditional indigenous art form created by tribal communities in Maharashtra. Unlike religious iconography, Warli art portrays everyday social life, community farming, and natural ecosystems.\n\nExecuted predominantly in white pigment made from rice paste mixed with water and tree gum on earth-toned clay walls, the artists use geometric shapes—circles representing the sun and moon, and triangles representing human figures and mountains." })
    },
    {
      category: 'Folk Culture',
      categoryDisplay: t("heritage.cat_FolkCulture", { defaultValue: "Folk Culture" }),
      title: t("heritage.fc_KalbeliaDance_title", { defaultValue: "Kalbelia Dance" }),
      desc: t("heritage.fc_KalbeliaDance_desc", { defaultValue: "A sensuous folk dance performed by the women of the Kalbelia snake-charming community in Rajasthan, India." }),
      image: '/images/heritage/kalbelia dance.webp',
      period: t("heritage.fc_KalbeliaDance_period", { defaultValue: "Traditional Folk Dance" }),
      location: t("heritage.fc_KalbeliaDance_loc", { defaultValue: "Rajasthan, India" }),
      fullDescription: t("heritage.fc_KalbeliaDance_full", { defaultValue: "Kalbelia is a traditional folk dance performed by the Kalbelia community of Rajasthan. Recognized by UNESCO as an Intangible Cultural Heritage of Humanity, the dance mirrors the graceful movements of desert serpents.\n\nFemale performers wear flowing embroidered black skirts adorned with silver mirror-work, dancing to traditional percussion instruments and the woodwind pungi." })
    },
    {
      category: 'Folk Culture',
      categoryDisplay: t("heritage.cat_FolkCulture", { defaultValue: "Folk Culture" }),
      title: t("heritage.fc_KathputliPuppetry_title", { defaultValue: "Kathputli Puppetry" }),
      desc: t("heritage.fc_KathputliPuppetry_desc", { defaultValue: "A string puppet theatre native to Rajasthan, known for its vibrant storytelling, colorful dolls, and traditional music." }),
      image: '/images/heritage/kathputli puppetry.webp',
      period: t("heritage.fc_KathputliPuppetry_period", { defaultValue: "Over 1,000 Years Old" }),
      location: t("heritage.fc_KathputliPuppetry_loc", { defaultValue: "Rajasthan, India" }),
      fullDescription: t("heritage.fc_KathputliPuppetry_full", { defaultValue: "Kathputli is a traditional string puppet theater native to Rajasthan. The name derives from \"Kath\" meaning wood and \"Putli\" meaning doll. The tradition has been passed down through generations of folk performers.\n\nCarved from mango wood and painted with expressive features, the puppets are manipulated with fine strings by puppeteers who narrate historical legends, moral lessons, and regional folklore." })
    },
    {
      category: 'Folk Culture',
      categoryDisplay: t("heritage.cat_FolkCulture", { defaultValue: "Folk Culture" }),
      title: t("heritage.fc_BaulSingers_title", { defaultValue: "Baul Singers" }),
      desc: t("heritage.fc_BaulSingers_desc", { defaultValue: "Mystic minstrels from Bengal whose music blends various religious influences, emphasizing a search for the inner divine." }),
      image: '/images/heritage/baul singers.webp',
      period: t("heritage.fc_BaulSingers_period", { defaultValue: "Centuries-Old Tradition" }),
      location: t("heritage.fc_BaulSingers_loc", { defaultValue: "Bengal (West Bengal & Bangladesh)" }),
      fullDescription: t("heritage.fc_BaulSingers_full", { defaultValue: "The Bauls are a community of mystic minstrels from Bengal known for their oral musical tradition celebrating universal humanity and inner spiritual harmony.\n\nPerforming with traditional acoustic instruments such as the one-stringed ektara and hand drums, Baul poetry emphasizes kindness, tolerance, and brotherhood beyond social boundaries." })
    }
  ], [t]);

  const [selectedCategory, setSelectedCategory] = useState('Ancient Civilizations');
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredCards = flashcards.filter(card => card.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex font-sans text-slate-900 overflow-hidden scrollbar-hide">
      <button
        onClick={() => navigate("/#missions-grid")}
        className={`absolute top-[96px] md:top-[112px] left-[24px] md:left-[48px] z-50 w-9 h-9 md:w-10 md:h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 ${heritageTheme.backButtonHover} hover:shadow-lg transition-all border border-slate-100 group`}
      >
        <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>
      
      {/* Main Content */}
      <main className="flex-1 min-h-screen pb-4 overflow-y-auto overflow-x-hidden scrollbar-hide">
        <div className="px-4 sm:px-6 md:px-12 2xl:px-20 space-y-6 md:space-y-8 pt-8 md:pt-6 2xl:max-w-[1600px] 2xl:mx-auto">
          
          {/* Hero Section */}
          <section className="bg-white rounded-[16px] md:rounded-[24px] overflow-hidden relative border border-slate-100 flex items-center min-h-[200px] sm:min-h-[260px] md:min-h-[300px] lg:h-[387px] lg:min-h-[387px] shadow-[0_4px_20px_rgba(0,0,0,0.04)] pb-4 md:pb-6 lg:pb-0">
            <div className="relative z-10 p-5 sm:p-8 md:p-10 lg:w-1/2 space-y-3 md:space-y-4">
              <h1 className="text-[24px] sm:text-[28px] md:text-[36px] lg:text-[42px] 2xl:text-[52px] font-extrabold leading-[1.05] tracking-tight text-[#1e293b]">
                {t("heritage.letsExplore", { defaultValue: "Let's explore" })} <br /> {t("heritage.ourRich", { defaultValue: "our rich" })} <br />
                <span className={heritageTheme.heroHighlightText}>{t("heritage.heritageArchive", { defaultValue: "Heritage Archive" })}</span>
              </h1>
              <p className="text-slate-500 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-medium leading-relaxed max-w-sm">
                {t("heritage.heroDesc", { defaultValue: "Discover, learn and preserve our rich history and cultural heritage in a new interactive way." })}
              </p>
            </div>

            <div className="hidden lg:block absolute top-0 right-0 w-[55%] h-full">
              <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/40 to-transparent z-10" />
              <img loading="lazy" decoding="async" src="/images/heritage/rhs.webp" alt="Heritage Explorers" className="w-full h-full object-cover object-[center_20%]" />
            </div>
            
            {/* Mobile Image */}
            <div className="lg:hidden absolute bottom-0 right-0 w-[40%] h-[80%] opacity-10 pointer-events-none">
              <img loading="lazy" decoding="async" src="/images/heritage/rhs.webp" alt="Heritage Explorers" className="w-full h-full object-contain object-bottom" />
            </div>
          </section>

          {/* Category Selection */}
          <section className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 md:gap-3 relative z-20 -mt-14 md:-mt-16 px-3 sm:px-4 md:px-12">
            {categories.map((cat, i) => {
              const isActive = selectedCategory === cat.key;
              const count = flashcards.filter(card => card.category === cat.key).length;
              const valueText = count === 1 
                ? t("heritage.card_singular", { defaultValue: "1 card" }) 
                : t("heritage.cards_plural", { count, defaultValue: `${count} cards` });
              return (
                <div 
                  key={i} 
                  onClick={() => {
                    setSelectedCategory(cat.key);
                    setCurrentIndex(0);
                  }}
                  className={`bg-white rounded-[16px] p-2.5 md:p-3 border flex items-center gap-2.5 md:gap-3 hover:shadow-md transition-shadow cursor-pointer group ${isActive ? heritageTheme.activeBorder + ' shadow-md' : heritageTheme.inactiveBorder + ' shadow-[0_4px_20px_rgba(0,0,0,0.06)]'}`}
                >
                   <div className={`w-[36px] h-[36px] md:w-[44px] md:h-[44px] rounded-[12px] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform [&>svg]:w-4 [&>svg]:h-4 md:[&>svg]:w-5 md:[&>svg]:h-5 ${isActive ? heritageTheme.activeIconBg : cat.color}`}>
                      {React.cloneElement(cat.icon, { className: isActive ? 'text-white' : cat.icon.props.className })}
                   </div>
                   <div>
                      <h4 className={`text-[11px] md:text-[13px] font-bold leading-tight transition-colors ${isActive ? heritageTheme.activeTitleText : heritageTheme.inactiveTitleHover}`}>{cat.label}</h4>
                      <p className={`text-[9px] md:text-[11px] font-medium mt-0.5 ${isActive ? heritageTheme.activeSubtitleText : heritageTheme.inactiveSubtitleText}`}>{valueText}</p>
                   </div>
                </div>
              );
            })}
          </section>

          {/* Carousel Section */}
          <div className="relative w-full max-w-[1400px] mx-auto h-[400px] md:h-[500px] flex items-center justify-center mt-2 md:-mt-1">
            
            {/* Bihar Map Background */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-50 mix-blend-multiply">
              <img loading="lazy" decoding="async" 
                src="/images/heritage/bihar.webp" 
                alt="Bihar Map Background" 
                className="w-[280px] sm:w-[420px] md:w-[420px] lg:w-[800px] h-auto object-contain mt-14 scale-107"
              />
            </div>

            {/* Carousel Container */}
            <div className="relative z-10 w-full h-[350px] md:h-[450px] flex items-center justify-center">
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
                        className={`relative w-56 h-56 md:w-[320px] md:h-[320px] overflow-hidden shadow-2xl border-[4px] md:border-[6px] border-white bg-slate-900 cursor-pointer group transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex flex-col ${
                          isCenter ? 'rounded-full hover:rounded-[28px] hover:h-[380px] md:hover:h-[460px]' : 'rounded-full'
                        }`}
                        onClick={() => {
                          if (!isCenter) {
                            if (offset > 0) setCurrentIndex(prev => (prev + 1) % len);
                            else setCurrentIndex(prev => (prev - 1 + len) % len);
                          } else {
                            setSelectedFactCard(card);
                          }
                        }}
                      >
                        {/* Image */}
                        <img loading="lazy" decoding="async" 
                          src={card.image} 
                          alt={card.title} 
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/20" />
                        
                        {/* Content when collapsed (Circle) */}
                        <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 md:pb-8 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                          <h3 className="text-white font-black text-lg md:text-2xl mb-1 text-center px-4 drop-shadow-md">{card.title}</h3>
                          <p className="text-white/80 text-[9px] md:text-xs font-bold uppercase tracking-widest">{card.categoryDisplay || card.category}</p>
                          {isCenter && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedFactCard(card);
                              }}
                              className="mt-3 md:mt-5 px-5 md:px-6 py-2 md:py-2.5 bg-white text-black font-black rounded-full text-[11px] md:text-sm hover:bg-amber-50 transition-colors shadow-lg cursor-pointer"
                            >
                              {t("heritage.explore", { defaultValue: "Explore" })}
                            </button>
                          )}
                        </div>

                        {/* Content when hovered (Expanded Card) */}
                        {isCenter && (
                          <div className="absolute inset-x-0 bottom-0 top-[160px] md:top-[200px] bg-white p-5 md:p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col transform translate-y-full group-hover:translate-y-0 z-20">
                            <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-widest rounded-full w-max mb-2">
                              {card.categoryDisplay || card.category}
                            </div>
                            <h3 className="text-lg md:text-xl font-black text-[#1E293B] mb-2">{card.title}</h3>
                            <p className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed overflow-y-auto scrollbar-hide pr-2 flex-1 mb-3">
                              {card.desc}
                            </p>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedFactCard(card);
                              }}
                              className="self-start px-4 py-2 bg-[#B45309] hover:bg-amber-800 text-white rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-200 shadow-sm shadow-orange-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                            >
                              {t("heritage.readOverview", { defaultValue: "Read Overview" })}
                              <ArrowRight size={13} strokeWidth={2.5} />
                            </button>
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
                  className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white shadow-xl flex items-center justify-center text-slate-800 hover:text-[#B45309] hover:scale-110 transition-all pointer-events-auto border border-slate-100 cursor-pointer"
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
                  className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white shadow-xl flex items-center justify-center text-slate-800 hover:text-[#B45309] hover:scale-110 transition-all pointer-events-auto border border-slate-100 cursor-pointer"
                >
                  <ChevronRight size={24} strokeWidth={3} className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Professional Overview Modal Card */}
        <AnimatePresence>
          {selectedFactCard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-900/65 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
              onClick={() => setSelectedFactCard(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 16 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden relative my-auto max-h-[85vh] flex flex-col"
              >
                {/* Header Banner Image */}
                <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-900 shrink-0">
                  <img loading="lazy" decoding="async"
                    src={selectedFactCard.image}
                    alt={selectedFactCard.title}
                    className="w-full h-full object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/45 to-transparent" />

                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedFactCard(null)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-colors cursor-pointer z-10"
                    aria-label="Close modal"
                  >
                    <X size={18} strokeWidth={2.5} />
                  </button>

                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-slate-900 font-bold text-xs rounded-full shadow-sm">
                      {selectedFactCard.categoryDisplay || selectedFactCard.category}
                    </span>
                  </div>

                  {/* Title & Metadata Over Banner */}
                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight drop-shadow-md mb-2">
                      {selectedFactCard.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-200 font-semibold">
                      {selectedFactCard.period && (
                        <span className="flex items-center gap-1.5 bg-black/45 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                          <Calendar size={13} className="text-amber-400" />
                          {selectedFactCard.period}
                        </span>
                      )}
                      {selectedFactCard.location && (
                        <span className="flex items-center gap-1.5 bg-black/45 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                          <MapPin size={13} className="text-amber-400" />
                          {selectedFactCard.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Internal Scrollable Modal Body */}
                <div className="p-6 sm:p-8 space-y-5 overflow-y-auto flex-1">
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {t("heritage.tab_Overview", { defaultValue: "Overview" })}
                    </h3>
                    <div className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal whitespace-pre-line space-y-3">
                      {selectedFactCard.fullDescription || selectedFactCard.desc}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default HeritageDashboard;
