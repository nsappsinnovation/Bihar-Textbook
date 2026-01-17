import { useState } from "react";
import EventCard from'./EventCard.jsx'
const pastEvents = [
  {
    id: 1,
    date: "January 12, 2026",
    location: "Solapur",
    title: "Quantum machine learning for health care",
    organizer: "MIT VPU",
    description:
      "A six-day hybrid seminar exploring quantum machine learning applications in healthcare.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837",
  },

  {
    id: 2,
    date: "January 12, 2026",
    location: "Delhi",
    title: "AI in Education: Roundtable & Policy Dialogues",
    organizer: "Central Square Foundation",
    description:
      "Senior leaders discussed responsible AI adoption in education.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  },
  {
    id: 3,
    date: "January 12, 2026",
    location: "Solapur",
    title: "Quantum machine learning for health care",
    organizer: "MIT VPU",
    description:
      "A six-day hybrid seminar exploring quantum machine learning applications in healthcare.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837",
  },
  {
    id: 4,
    date: "January 12, 2026",
    location: "Solapur",
    title: "Quantum machine learning for health care",
    organizer: "MIT VPU",
    description:
      "A six-day hybrid seminar exploring quantum machine learning applications in healthcare.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837",
  },
  {
    id: 5,
    date: "January 12, 2026",
    location: "Solapur",
    title: "Quantum machine learning for health care",
    organizer: "MIT VPU",
    description:
      "A six-day hybrid seminar exploring quantum machine learning applications in healthcare.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837",
  },
  {
    id: 6,
    date: "January 12, 2026",
    location: "Solapur",
    title: "Quantum machine learning for health care",
    organizer: "MIT VPU",
    description:
      "A six-day hybrid seminar exploring quantum machine learning applications in healthcare.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837",
  },
  {
    id: 7,
    date: "January 12, 2026",
    location: "Solapur",
    title: "Quantum machine learning for health care",
    organizer: "MIT VPU",
    description:
      "A six-day hybrid seminar exploring quantum machine learning applications in healthcare.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837",
  },
   {
    id: 8,
    date: "January 12, 2026",
    location: "Solapur",
    title: "Quantum machine learning for health care",
    organizer: "MIT VPU",
    description:
      "A six-day hybrid seminar exploring quantum machine learning applications in healthcare.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837",
  },
   {
    id: 9,
    date: "January 12, 2026",
    location: "Solapur",
    title: "Quantum machine learning for health care",
    organizer: "MIT VPU",
    description:
      "A six-day hybrid seminar exploring quantum machine learning applications in healthcare.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837",
  },
  
  
];

const upcomingEvents = [
  {
    id: 10,
    date: "February 5, 2026",
    location: "Mumbai",
    title: "AI Governance Summit",
    organizer: "NITI Aayog",
    description:
      "A national dialogue on AI governance and policy frameworks.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
  },
];

export default function EventsSection() {
  const [activeTab, setActiveTab] = useState("past");

  const events = activeTab === "past" ? pastEvents : upcomingEvents;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <p className="text-sm uppercase tracking-wide text-gray-500">
        Pre-Summit Events
      </p>
      <h2 className="text-3xl md:text-4xl font-semibold mt-2">
        Exclusive Sessions and Dialogues Shaping{" "}
        <span className="bg-gradient-to-r  from-indigo-500 to-orange-400 bg-clip-text text-transparent
    transition-all duration-300
      ">the Future of AI</span>
      </h2>

      {/* Tabs */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={() => setActiveTab("past")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition ${
            activeTab === "past"
              ? "bg-indigo-600 text-white"
              : "border border-gray-300 text-gray-600"
          }`}
        >
          Past Events
        </button>

        <button
          onClick={() => setActiveTab("upcoming")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition ${
            activeTab === "upcoming"
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
