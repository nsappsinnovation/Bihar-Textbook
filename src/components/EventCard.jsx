
export default function EventCard({ event }) {
  return (
    <div className="group relative rounded-2xl overflow-hidden shadow-lg bg-white cursor-pointer">

      {/* Content */}
      <div className="p-4 sm:p-5">
        <p className="text-xs text-gray-500">
          {event.date} | {event.location}
        </p>

        <h3 className="text-lg sm:text-xl text-indigo-800 font-semibold mt-2 line-clamp-2">
          {event.title}
        </h3>

        <p className="text-sm font-semibold text-gray-800 mt-1">
          Organized by: {event.organizer}
        </p>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-2 pt-2" />

        {/* Description */}
        <p className="text-sm text-gray-500 mt-2 line-clamp-3">
          {event.description}
        </p>

        {/* Image */}
        <div className="rounded-2xl overflow-hidden mt-3">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-48 sm:h-56 object-cover"
          />
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-indigo-900 to-purple-950 text-white p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-sm leading-relaxed">
          {event.description}
        </p>
      </div>
    </div>
  );
}
