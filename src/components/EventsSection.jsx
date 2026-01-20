import { useState } from "react";
import EventCard from './EventCard.jsx'
const pastEvents = [
  {
    id: 1,
    date: "January 12, 2026",
    location: "Patna",
    title: "Bihar Diwas 2026 Education Fair",
    organizer: "BSTPC",
    description:
      "A celebration of Bihar's educational history with a showcase of local textbook heritage.",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
  },
  {
    id: 2,
    date: "January 15, 2026",
    location: "Gaya",
    title: "Community Outreach for Rural Literacy",
    organizer: "District Education Office",
    description:
      "A massive textbook distribution camp for underprivileged students.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
  },
  {
    id: 3,
    date: "January 20, 2026",
    location: "Muzaffarpur",
    title: "Teacher Training: New Curriculum 2026",
    organizer: "SCERT Bihar",
    description:
      "A workshop focused on training teachers for the newly introduced textbooks.",
    image:
      "https://images.unsplash.com/photo-1544928147-79a2dbc1f389",
  },
  {
    id: 4,
    date: "January 25, 2026",
    location: "Bhagalpur",
    title: "Digital Literacy Workshop for Students",
    organizer: "BSTPC Digital Team",
    description:
      "Introducing students to e-Lotani and digital learning materials.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998",
  },
];

const upcomingEvents = [
  {
    id: 10,
    date: "February 5, 2026",
    location: "Patna",
    title: "Launch of Academic Session 2026-27",
    organizer: "Education Department, Bihar",
    description:
      "Official launch ceremony and book distribution inauguration.",
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6",
  },
];

export default function EventsSection() {
  const [activeTab, setActiveTab] = useState("past");

  const events = activeTab === "past" ? pastEvents : upcomingEvents;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <p className="text-sm uppercase tracking-wide text-gray-500">
        Educational Initiatives
      </p>
      <h2 className="text-4xl md:text-5xl font-bold mt-3 tracking-tight text-[#1a1a1a]">
        Empowering Minds through <br className="hidden md:block" />
        <span className="bg-gradient-to-r from-indigo-600 to-orange-500 bg-clip-text text-transparent italic">
          Comprehensive Learning
        </span>
      </h2>

      {/* Tabs */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={() => setActiveTab("past")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition ${activeTab === "past"
            ? "bg-indigo-600 text-white"
            : "border border-gray-300 text-gray-600"
            }`}
        >
          Past Events
        </button>

        <button
          onClick={() => setActiveTab("upcoming")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition ${activeTab === "upcoming"
            ? "bg-indigo-600 text-white"
            : "border border-gray-300 text-gray-600"
            }`}
        >
          Upcoming Events
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
