import { useMemo, useState } from "react";
import EventCard from "./EventCard.jsx";

const pastEvents = [
  {
    id: 1,
    date: "January 12, 2026",
    location: "Patna",
    title: "Bihar Diwas 2026 Education Fair",
    organizer: "BSTPC",
    description:
      "A celebration of Bihar's educational history with a showcase of local textbook heritage.",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    tag: "Fair",
    mode: "Offline",
    audience: "Students • Parents",
    estFootfall: 12000,
  },
  {
    id: 2,
    date: "January 15, 2026",
    location: "Gaya",
    title: "Community Outreach for Rural Literacy",
    organizer: "District Education Office",
    description:
      "A massive textbook distribution camp for underprivileged students.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    tag: "Outreach",
    mode: "Offline",
    audience: "Students",
    estFootfall: 6500,
  },
  {
    id: 3,
    date: "January 20, 2026",
    location: "Muzaffarpur",
    title: "Teacher Training: New Curriculum 2026",
    organizer: "SCERT Bihar",
    description:
      "A workshop focused on training teachers for the newly introduced textbooks.",
    image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389",
    tag: "Training",
    mode: "Hybrid",
    audience: "Teachers",
    estFootfall: 1800,
  },
  {
    id: 4,
    date: "January 25, 2026",
    location: "Bhagalpur",
    title: "Digital Literacy Workshop for Students",
    organizer: "BSTPC Digital Team",
    description:
      "Introducing students to e-Lotani and digital learning materials.",
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
    date: "February 5, 2026",
    location: "Patna",
    title: "Launch of Academic Session 2026-27",
    organizer: "Education Department, Bihar",
    description: "Official launch ceremony and book distribution inauguration.",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6",
    tag: "Launch",
    mode: "Offline",
    audience: "All Stakeholders",
    estFootfall: 15000,
  },
  {
    id: 11,
    date: "February 18, 2026",
    location: "Darbhanga",
    title: "Audio Books & Inclusive Learning Drive",
    organizer: "BSTPC",
    description:
      "Awareness and onboarding for curriculum-based audiobooks for inclusive learning support.",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
    tag: "Inclusion",
    mode: "Hybrid",
    audience: "Students • Teachers",
    estFootfall: 3200,
  },
  {
    id: 12,
    date: "March 2, 2026",
    location: "Purnea",
    title: "AI Tutorials Pilot: Smart Revision Week",
    organizer: "BSTPC Digital Team",
    description:
      "Pilot rollout of AI-assisted tutorials for Maths, Science and English revision modules.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    tag: "AI Pilot",
    mode: "Online",
    audience: "Students",
    estFootfall: 5000,
  },
];

/** small util: safe parse for month/day/year strings like "January 12, 2026" */
const toDate = (s) => new Date(s);

/** badge style map */
const tagStyles = {
  Fair: "bg-indigo-50 text-indigo-700 ring-indigo-100",
  Outreach: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  Training: "bg-blue-50 text-blue-700 ring-blue-100",
  Workshop: "bg-orange-50 text-orange-700 ring-orange-100",
  Launch: "bg-purple-50 text-purple-700 ring-purple-100",
  Inclusion: "bg-rose-50 text-rose-700 ring-rose-100",
  "AI Pilot": "bg-amber-50 text-amber-800 ring-amber-100",
};

export default function EventsSection() {
  const [activeTab, setActiveTab] = useState("past");
  const [query, setQuery] = useState("");
  const [filterMode, setFilterMode] = useState("All"); // All | Offline | Online | Hybrid
  const [sortBy, setSortBy] = useState("Date"); // Date | Footfall

  const baseEvents = activeTab === "past" ? pastEvents : upcomingEvents;

  const filtered = useMemo(() => {
    let list = [...baseEvents];

    // search
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((e) => {
        const hay = `${e.title} ${e.location} ${e.organizer} ${e.tag} ${e.description}`.toLowerCase();
        return hay.includes(q);
      });
    }

    // mode filter
    if (filterMode !== "All") {
      list = list.filter((e) => (e.mode || "").toLowerCase() === filterMode.toLowerCase());
    }

    // sort
    if (sortBy === "Footfall") {
      list.sort((a, b) => (b.estFootfall || 0) - (a.estFootfall || 0));
    } else {
      // Date
      list.sort((a, b) => toDate(b.date) - toDate(a.date));
    }

    return list;
  }, [baseEvents, query, filterMode, sortBy]);

  const stats = useMemo(() => {
    const total = baseEvents.length;
    const totalFootfall = baseEvents.reduce((s, e) => s + (e.estFootfall || 0), 0);
    const locations = new Set(baseEvents.map((e) => e.location)).size;
    const online = baseEvents.filter((e) => e.mode === "Online").length;
    const hybrid = baseEvents.filter((e) => e.mode === "Hybrid").length;
    const offline = baseEvents.filter((e) => e.mode === "Offline").length;

    return { total, totalFootfall, locations, online, hybrid, offline };
  }, [baseEvents]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <div
            className="flex items-center gap-3 mb-2 opacity-0 animate-[fadeSlideUp_0.8s_ease-out_forwards]"
            style={{ animationDelay: "0.15s" }}
          >
            <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-[pulseDot_1.8s_ease-in-out_infinite]" />
            <p className="text-sm uppercase tracking-wide font-semibold text-gray-500">
              Educational Initiatives
            </p>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mt-3 tracking-tight text-[#1a1a1a]">
            Empowering Minds through <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-indigo-600 to-orange-500 bg-clip-text text-transparent italic">
              Comprehensive Learning
            </span>
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl">
            Explore key programs, workshops, launches, and outreach efforts led by BSTPC and partner
            institutions—organized by timeline, location, and delivery mode.
          </p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
          <StatCard label="Events" value={stats.total} />
          <StatCard label="Locations" value={stats.locations} />
          <StatCard label="Est. Footfall" value={formatCompact(stats.totalFootfall)} />
          <StatCard
            label="Modes"
            value={`${stats.offline}/${stats.hybrid}/${stats.online}`}
            sub="Off/Hy/On"
          />
        </div>
      </div>

      {/* Controls Row */}
      <div className="mt-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex gap-3">
          <TabButton active={activeTab === "past"} onClick={() => setActiveTab("past")}>
            Past Events
          </TabButton>
          <TabButton active={activeTab === "upcoming"} onClick={() => setActiveTab("upcoming")}>
            Upcoming Events
          </TabButton>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-[320px]">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, city, organizer..."
              className="w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
            />
            {query ? (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                aria-label="Clear search"
              >
                ✕
              </button>
            ) : null}
          </div>

          <select
            value={filterMode}
            onChange={(e) => setFilterMode(e.target.value)}
            className="rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
          >
            <option>All</option>
            <option>Offline</option>
            <option>Hybrid</option>
            <option>Online</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
          >
            <option value="Date">Sort: Date</option>
            <option value="Footfall">Sort: Footfall</option>
          </select>
        </div>
      </div>

      {/* Chips summary */}
      <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-gray-500">
          Showing <b className="text-gray-900">{filtered.length}</b> of{" "}
          <b className="text-gray-900">{baseEvents.length}</b>
        </span>
        {filterMode !== "All" ? (
          <Chip onRemove={() => setFilterMode("All")}>Mode: {filterMode}</Chip>
        ) : null}
        {query ? <Chip onRemove={() => setQuery("")}>Search: “{query}”</Chip> : null}
        {sortBy !== "Date" ? <Chip onRemove={() => setSortBy("Date")}>Sort: {sortBy}</Chip> : null}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {filtered.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            // optional: extra props if you want to render these chips inside EventCard
            meta={
              <div className="flex flex-wrap gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${
                    tagStyles[event.tag] || "bg-gray-50 text-gray-700 ring-gray-100"
                  }`}
                >
                  {event.tag}
                </span>
                <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold bg-gray-100 text-gray-700">
                  {event.mode}
                </span>
                <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold bg-gray-100 text-gray-700">
                  {event.location}
                </span>
              </div>
            }
            footerRight={
              <span className="text-xs text-gray-500">
                Est. Footfall: <b className="text-gray-800">{formatCompact(event.estFootfall)}</b>
              </span>
            }
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-gray-300 p-10 text-center text-gray-600">
          No events found. Try clearing filters or searching a different keyword.
        </div>
      ) : null}

      {/* Inline CSS keyframes (move to index.css if you prefer) */}
      <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseDot {
          0%,100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.6); opacity: 1; }
        }
      `}</style>
    </section>
  );
}

/* ---------- Small UI helpers ---------- */

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
        active
          ? "bg-indigo-600 text-white shadow-[0_14px_30px_-16px_rgba(79,70,229,0.6)]"
          : "border border-gray-200 text-gray-700 hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );
}

function StatCard({ label, value, sub }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
      <div className="text-xs text-gray-500 font-semibold">{label}</div>
      <div className="mt-1 text-lg font-bold text-gray-900 leading-tight">{value}</div>
      {sub ? <div className="text-[11px] text-gray-500">{sub}</div> : null}
    </div>
  );
}

function Chip({ children, onRemove }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-gray-700">
      {children}
      <button
        onClick={onRemove}
        className="text-gray-500 hover:text-gray-800"
        aria-label="Remove filter"
      >
        ✕
      </button>
    </span>
  );
}

function formatCompact(n) {
  const num = Number(n || 0);
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return `${num}`;
}
