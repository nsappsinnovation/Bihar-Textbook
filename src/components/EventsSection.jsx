import { useMemo, useState } from "react";
import { Search, ChevronDown, Calendar, MapPin, Users, Monitor, Globe, X, ArrowUpRight, Clock, UserCheck, BarChart3 } from "lucide-react";
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
    id: 3,
    date: "20 Jan, 2026",
    location: "Muzaffarpur",
    title: "Teacher Training: New Curriculum 2026",
    organizer: "SCERT Bihar",
    description: "A workshop focused on training teachers for the newly introduced textbooks and pedagogical shifts aligned with NEP 2020.",
    image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389",
    tag: "Training",
    mode: "Hybrid",
    audience: "Teachers",
    estFootfall: 1800,
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
  const [selectedEvent, setSelectedEvent] = useState(null);

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

  return (
    <section className="w-full bg-[#fcfcfd] py-24 px-6 md:px-12 lg:px-24 font-sans text-slate-900 border-t border-slate-100 relative">
      <div className="max-w-[1280px] mx-auto">

        {/* --- Minimal Header --- */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-4">
             <div className="h-px w-8 bg-blue-500"></div>
            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em]">Latest Initiatives</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6">
            Empowering Education <br /> Through <span className="text-slate-400">Events</span>
          </h2>
          <p className="text-lg text-slate-500 font-normal leading-relaxed">
            A centralized hub for tracking workshops, curriculum updates, and student-focused events across the state.
          </p>
        </div>

        {/* --- Minimal Navigation & Search --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 border-b border-slate-100 pb-8">

          <div className="flex items-center gap-8 text-center scrollbar-hide">
            <button
              onClick={() => setActiveTab("past")}
              className={`pb-8 -mb-8 text-sm font-semibold transition-all duration-300 relative ${activeTab === "past" ? "text-blue-600" : "text-slate-400 hover:text-slate-600"}`}
            >
              Past Events
              {activeTab === "past" && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></motion.div>}
            </button>
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`pb-8 -mb-8 text-sm font-semibold transition-all duration-300 relative ${activeTab === "upcoming" ? "text-blue-600" : "text-slate-400 hover:text-slate-600"}`}
            >
              Upcoming Events
              {activeTab === "upcoming" && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></motion.div>}
            </button>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-[320px]">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <input
                type="text"
                placeholder="Search by title or location..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-6 pr-4 py-2 bg-transparent text-sm focus:outline-none border-b border-slate-200 focus:border-blue-500 transition-all placeholder:text-slate-300"
              />
              {query && <X onClick={() => setQuery("")} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-300 cursor-pointer hover:text-slate-600" size={14} />}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-300 uppercase">View</span>
              <select
                value={filterMode}
                onChange={(e) => setFilterMode(e.target.value)}
                className="bg-transparent text-sm font-semibold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option>All</option>
                <option>Offline</option>
                <option>Hybrid</option>
                <option>Online</option>
              </select>
            </div>
          </div>
        </div>

        {/* --- Minimalist Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedEvent(event)}
              className="flex flex-col group cursor-pointer"
            >
              <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden mb-6 bg-slate-100">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-all duration-700 opacity-95 blur-[0.5px] group-hover:opacity-100 group-hover:blur-0 group-hover:scale-105"
                  style={{ willChange: 'transform, filter, opacity' }}
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-bold text-slate-600 uppercase tracking-wider shadow-sm border border-white/20">
                    {event.tag}
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-3">
                  <Calendar size={12} strokeWidth={2.5} />
                  <span>{event.date}</span>
                </div>

                <h3 className="text-lg font-semibold text-slate-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                  {event.title}
                </h3>

                <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2 mb-4">
                  {event.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400">
                    <MapPin size={12} />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-blue-600 text-xs font-bold group-hover:gap-2.5 transition-all">
                    DETAIL <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-24 text-center border rounded-2xl border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">No results found for your search.</p>
          </div>
        )}

        <div className="mt-20 flex justify-center">
          <Link 
            to="/events-all"
            className="group flex items-center gap-3 px-10 py-4 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-500/20"
          >
            VIEW ALL EVENTS
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 40 }}
              transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.8 }}
              className="relative bg-white w-full max-w-2xl max-h-[95vh] rounded-[32px] shadow-[0_30px_100px_rgba(0,0,0,0.25)] overflow-y-auto scrollbar-hide flex flex-col"
            >
              {/* Header Image with Close Button */}
              <div className="relative h-72 md:h-80 w-full overflow-hidden">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent" />

                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white transition-all hover:rotate-90 active:scale-90"
                >
                  <X size={20} />
                </button>

                <div className="absolute bottom-8 left-10 right-10 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2.5 py-0.5 bg-blue-500 rounded-md text-[9px] font-black uppercase tracking-wider shadow-lg shadow-blue-500/20 text-white">
                      {selectedEvent.tag}
                    </span>
                    <span className="text-[10px] font-bold text-white/80 flex items-center gap-1.5 uppercase tracking-widest backdrop-blur-md bg-white/5 px-2 py-0.5 rounded border border-white/10">
                      <Clock size={11} className="text-blue-400" /> {selectedEvent.mode}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black leading-tight tracking-tight">
                    {selectedEvent.title}
                  </h2>
                </div>
              </div>

              {/* Content Panel */}
              <div className="p-10 md:p-12 space-y-10">
                {/* Info Grid - Clean & Minimal */}
                <div className="flex flex-wrap items-center gap-x-12 gap-y-6 pb-10 border-b border-slate-50">
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Schedule</p>
                    <div className="flex items-center gap-2.5 text-[15px] font-bold text-slate-800">
                      <Calendar size={16} className="text-blue-600" />
                      <span>{selectedEvent.date}</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Venue</p>
                    <div className="flex items-center gap-2.5 text-[15px] font-bold text-slate-800">
                      <MapPin size={16} className="text-blue-600" />
                      <span>{selectedEvent.location}</span>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-right ml-auto hidden sm:block">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Participation</p>
                    <div className="flex items-center gap-2.5 text-[15px] font-bold text-slate-800">
                      <Users size={16} className="text-blue-600" />
                      <span>{selectedEvent.audience}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-4">
                  <h4 className="text-[11px] font-black text-slate-300 uppercase tracking-[0.2em]">Objective Details</h4>
                  <p className="text-[17px] text-slate-600 leading-relaxed font-light">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <Link to={`/events/${selectedEvent.id}`} className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-12 py-4 bg-[#211fa9f8] text-white rounded-full text-sm font-black uppercase tracking-widest shadow-[0_15px_30px_rgba(33,31,169,0.2)] hover:bg-blue-800 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(33,31,169,0.3)] transition-all duration-300">
                      Join Initiative
                    </button>
                  </Link>
                  <div className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 rounded-full border border-slate-100">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                      {formatCompact(selectedEvent.estFootfall)}+ Participating
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

function formatCompact(n) {
  const num = Number(n || 0);
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return `${num}`;
}
