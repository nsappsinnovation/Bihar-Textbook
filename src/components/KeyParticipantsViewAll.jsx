import { useState } from 'react';
import Participantcard    from "./Participantcards"
import { participants } from './participants';

function KeyParticipantsViewAll() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredParticipants = participants.filter((person) => {
    const matchesFilter =
      filter === 'All' || person.role.toUpperCase() === filter.toUpperCase();

    const matchesSearch = person.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">

      {/* TOP BANNER */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 py-20 text-center">
        <p className="uppercase tracking-widest text-xs font-semibold text-orange-300">
          Our Leadership & Visionaries
        </p>
        <h1 className="mt-4 text-3xl md:text-5xl font-semibold text-white">
          Guiding the Future of Education in Bihar
        </h1>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">

          {/* Search */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search participants..."
              className="
                w-full
                pl-10 pr-4 py-2
                rounded-full
                bg-white
                border border-gray-200
                text-gray-700
                shadow-none
                focus:outline-none
                focus:ring-2 focus:ring-blue-500
              "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2 bg-white p-1 rounded-full shadow-sm">
            {['All', 'Leadership', 'Visionaries'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filteredParticipants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredParticipants.map((participant) => (
              <Participantcard
                key={participant.id}
                participant={participant}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">
              No participants found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default KeyParticipantsViewAll;
