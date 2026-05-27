import { useMemo, useState } from "react";
import { Search, ChevronDown, Calendar, MapPin, Users, X, Clock, BarChart3, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const pastEvents = [
  {
    id: 1,
    date: "12 Jan, 2026",
    location: "Patna",
    title: "Bihar Diwas 2026 Education Fair",
    organizer: "BSTPC",
    description: "A celebration of Bihar's educational history with a showcase of local textbook heritage, interactive stalls, and rare manuscript displays.",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    tag: "Fair",
    mode: "Offline",
    audience: "Students • Parents",
    estFootfall: 12000,
  },
  {
    id: 2,
    date: "15 Jan, 2026",
    location: "Gaya",
    title: "Community Outreach for Rural Literacy",
    organizer: "District Education Office",
    description: "A massive textbook distribution camp and awareness drive for underprivileged students in remote regions of South Bihar.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    tag: "Outreach",
    mode: "Offline",
    audience: "Students",
    estFootfall: 6500,
  },
  {
    id: 4,
    date: "25 Jan, 2026",
    location: "Bhagalpur",
    title: "Digital Literacy Workshop for Students",
    organizer: "BSTPC Digital Team",
    description: "Introducing students to Digital Library and digital learning materials, featuring hands-on training with interactive e-books and apps.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998",
    tag: "Workshop",
    mode: "Offline",
    audience: "Students",
    estFootfall: 2400,
  },
];

const upcomingEvents = [
  {
    id: 10,
    date: "05 Feb, 2026",
    location: "Patna",
    title: "Launch of Academic Session 2026-27",
    organizer: "Education Department, Bihar",
    description: "Official launch ceremony and book distribution inauguration at the state level, attended by high-ranking educational authorities.",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6",
    tag: "Launch",
    mode: "Offline",
    audience: "All Stakeholders",
    estFootfall: 15000,
  },
  {
    id: 11,
    date: "18 Feb, 2026",
    location: "Darbhanga",
    title: "Audio Books & Inclusive Learning Drive",
    organizer: "BSTPC",
    description: "Awareness and onboarding for curriculum-based audiobooks for inclusive learning support, targeting visually impaired and diverse learners.",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
    tag: "Inclusion",
    mode: "Hybrid",
    audience: "Students • Teachers",
    estFootfall: 3200,
  },
  {
    id: 12,
    date: "02 Mar, 2026",
    location: "Purnea",
    title: "AI Tutorials Pilot: Smart Revision Week",
    organizer: "BSTPC Digital Team",
    description: "Pilot rollout of AI-assisted tutorials for Maths, Science and English revision modules, featuring real-time doubt clearing.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    tag: "AI Pilot",
    mode: "Online",
    audience: "Students",
    estFootfall: 5000,
  },
];

export default function EventsSection() {
  const [activeTab, setActiveTab] = useState("past");
  const [query, setQuery] = useState("");
  const [filterMode, setFilterMode] = useState("All");
  const [expandedEventId, setExpandedEventId] = useState(null);

  const baseEvents = activeTab === "past" ? pastEvents : upcomingEvents;

  const filtered = useMemo(() => {
    let list = [...baseEvents];
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((e) => {
        const hay = `${e.title} ${e.location} ${e.organizer} ${e.tag} ${e.description}`.toLowerCase();
        return hay.includes(q);
      });
    }
    if (filterMode !== "All") {
      list = list.filter((e) => (e.mode || "").toLowerCase() === filterMode.toLowerCase());
    }
    return list;
  }, [baseEvents, query, filterMode]);

  const toggleExpand = (id) => {
    setExpandedEventId(expandedEventId === id ? null : id);
  };

  return (
    <section className="w-full bg-[#fcfcfd] py-16 md:py-24 px-6 md:px-12 lg:px-24 font-sans text-slate-900 border-t border-slate-100 relative overflow-hidden">
      {/* Dynamic blurred glow background for premium look */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* --- LEFT SIDE: Sticky Dashboard Hub (5 Columns) --- */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 h-fit space-y-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px w-6 bg-blue-500"></div>
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em]">Latest Initiatives</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
                Empowering Education <br />
                Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Events</span>
              </h2>
              <p className="text-sm text-slate-500 font-normal leading-relaxed">
                A centralized, interactive timeline for tracking workshops, curriculum updates, and student-focused events across Bihar.
              </p>
            </div>

            {/* Custom Pill Tab Selector */}
            <div className="relative flex p-1 bg-slate-200/60 rounded-full w-full max-w-[280px] border border-slate-200/50">
              <button
                onClick={() => { setActiveTab("past"); setExpandedEventId(null); }}
                className={`relative z-10 w-1/2 py-2 text-xs font-bold transition-colors duration-300 ${
                  activeTab === "past" ? "text-white" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Past Events
                {activeTab === "past" && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-blue-600 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
              <button
                onClick={() => { setActiveTab("upcoming"); setExpandedEventId(null); }}
                className={`relative z-10 w-1/2 py-2 text-xs font-bold transition-colors duration-300 ${
                  activeTab === "upcoming" ? "text-white" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Upcoming
                {activeTab === "upcoming" && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-blue-600 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </div>

            {/* Interactive Search Bar */}
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search events by title, organizer, location..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-white text-xs font-semibold border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400 shadow-sm"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Mode Filters */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Mode Filter</span>
              <div className="flex flex-wrap gap-2">
                {["All", "Offline", "Hybrid", "Online"].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setFilterMode(mode)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                      filterMode === mode
                        ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                        : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Metrics Widget */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden hidden lg:block max-w-md">
              {/* Decorative background glow */}
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-4 flex items-center gap-1.5">
                <BarChart3 size={14} /> Live View Summary
              </h4>
              <div className="grid grid-cols-2 gap-6 relative z-10">
                <div>
                  <p className="text-[9px] text-slate-400 uppercase font-black tracking-wider">Filtered</p>
                  <p className="text-3xl font-black mt-0.5">{filtered.length}</p>
                  <p className="text-[10px] text-slate-400 mt-1">active records</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 uppercase font-black tracking-wider">Est. Impact</p>
                  <p className="text-3xl font-black mt-0.5 text-blue-300">
                    {formatCompact(filtered.reduce((acc, curr) => acc + (curr.estFootfall || 0), 0))}+
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">beneficiaries</p>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: Timeline Accordion Feed (7 Columns) --- */}
          <div className="lg:col-span-7 space-y-4 md:pl-6 lg:border-l border-slate-100 relative">
            
            {/* Timeline Vertical Pathway Line Indicator */}
            <div className="absolute left-0 top-6 bottom-6 w-px bg-slate-200 hidden lg:block" />

            <AnimatePresence mode="popLayout">
              {filtered.map((event, idx) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="relative group"
                >
                  {/* Floating timeline dot marker */}
                  <div className="absolute -left-[30px] top-[30px] w-4 h-4 rounded-full bg-white border-2 transition-all duration-300 z-10 hidden lg:flex items-center justify-center border-slate-200 group-hover:border-blue-400">
                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      expandedEventId === event.id ? "bg-blue-600 scale-125 animate-pulse" : "bg-slate-300 group-hover:bg-blue-400"
                    }`} />
                  </div>

                  {/* Main Accordion Panel Row */}
                  <div
                    onClick={() => toggleExpand(event.id)}
                    className={`w-full text-left p-5 md:p-6 bg-white rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col ${
                      expandedEventId === event.id
                        ? "border-blue-500/35 ring-1 ring-blue-500/10 shadow-lg shadow-blue-500/[0.03]"
                        : "border-slate-200 hover:border-slate-300 hover:shadow-md hover:shadow-slate-100"
                    }`}
                  >
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        {/* Date badge */}
                        <div className="flex flex-col items-center justify-center w-14 h-14 bg-slate-50 rounded-2xl border border-slate-100 text-center shrink-0">
                          <span className="text-xl font-black text-slate-800 leading-none">
                            {event.date.split(" ")[0]}
                          </span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase mt-1">
                            {event.date.split(" ")[1].replace(",", "")}
                          </span>
                        </div>

                        {/* Title & Tags */}
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-600 rounded-full text-[9px] font-bold uppercase tracking-wider">
                              {event.tag}
                            </span>
                            <span className="px-2.5 py-0.5 bg-slate-50 text-slate-500 rounded-full text-[9px] font-bold uppercase">
                              {event.mode}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                            {event.title}
                          </h3>
                        </div>
                      </div>

                      {/* Side info & Toggle */}
                      <div className="flex items-center justify-between sm:justify-start gap-4 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0">
                        <div className="flex flex-col text-left sm:text-right">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Venue</span>
                          <span className="text-xs font-bold text-slate-700">{event.location}</span>
                        </div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          expandedEventId === event.id ? "bg-blue-600 text-white rotate-180" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-600"
                        }`}>
                          <ChevronDown size={16} />
                        </div>
                      </div>
                    </div>

                    {/* Expandable Content Panel */}
                    <AnimatePresence initial={false}>
                      {expandedEventId === event.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-6 mt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-6" onClick={(e) => e.stopPropagation()}>
                            
                            {/* Left detailed text section (7/12 width) */}
                            <div className="md:col-span-7 flex flex-col justify-between space-y-6">
                              <div className="space-y-4">
                                <div>
                                  <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Objective Details</h4>
                                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                    {event.description}
                                  </p>
                                </div>

                                {/* Highlight Cards Grid */}
                                <div className="grid grid-cols-3 gap-2.5">
                                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-center">
                                    <span className="text-[8px] font-bold text-slate-400 uppercase flex items-center gap-1">
                                      <Building2 size={10} className="text-blue-500" /> Host
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-700 mt-1 line-clamp-1">{event.organizer}</span>
                                  </div>
                                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-center">
                                    <span className="text-[8px] font-bold text-slate-400 uppercase flex items-center gap-1">
                                      <Users size={10} className="text-blue-500" /> Target
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-700 mt-1 line-clamp-1">{event.audience}</span>
                                  </div>
                                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-center">
                                    <span className="text-[8px] font-bold text-slate-400 uppercase flex items-center gap-1">
                                      <BarChart3 size={10} className="text-blue-500" /> Impact
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-700 mt-1">{formatCompact(event.estFootfall)}+</span>
                                  </div>
                                </div>
                              </div>

                              <div className="pt-2 flex flex-wrap items-center gap-4">
                                <Link to={`/events/${event.id}`} className="w-full sm:w-auto">
                                  <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-full text-[10px] font-extrabold uppercase tracking-widest hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-md shadow-blue-500/10">
                                    Join Initiative
                                  </button>
                                </Link>
                                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                                  <Clock size={12} className="text-blue-500" />
                                  <span>Mode: <strong className="text-slate-600 font-bold">{event.mode}</strong></span>
                                </div>
                              </div>
                            </div>

                            {/* Right Image/Visual section (5/12 width) */}
                            <div className="md:col-span-5 relative h-48 md:h-auto min-h-[160px] rounded-2xl overflow-hidden shadow-inner border border-slate-100 bg-slate-50">
                              <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent" />
                              <div className="absolute bottom-4 left-4 right-4 text-white">
                                <span className="text-[9px] font-extrabold text-blue-300 uppercase tracking-widest flex items-center gap-1 mb-1">
                                  <MapPin size={10} /> {event.location}, BIHAR
                                </span>
                                <span className="text-xs font-bold line-clamp-1 opacity-90">{event.title}</span>
                              </div>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="py-20 text-center border rounded-2xl border-dashed border-slate-200 bg-white">
                <p className="text-slate-400 font-bold text-sm">No results match your search keywords or filters.</p>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}

function formatCompact(n) {
  const num = Number(n || 0);
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return `${num}`;
}
