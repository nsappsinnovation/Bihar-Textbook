import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import data from "./Book.json";

const Books = () => {
  const { classId } = useParams();

  // Find the class data
  const classData = data.classes.find((cls) => cls.id === Number(classId));

  // Placeholder image URL (Replace this with the path to the image I generated for you!)
  const PLACEHOLDER_IMG = "/images/placeholders/no-cover.png";

  if (!classData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xl text-gray-400 font-medium">Loading Class Data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* --- Modern Header Section --- */}
        <div className="relative mb-16 text-center">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-xs mb-2 block">
            Digital Library
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            {classData.name}
          </h2>
          <p className="max-w-2xl mx-auto text-slate-500 text-lg">
            Select a textbook below to start reading or downloading materials.
          </p>
          {/* Decorative blur behind header */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-400/20 blur-3xl rounded-full -z-10"></div>
        </div>

        {/* --- Books Grid --- */}
        {classData.books.filter(b => !b.localOnly).length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {classData.books.filter(b => !b.localOnly).map((book) => (
              <BookCard key={book.id} book={book} placeholder={PLACEHOLDER_IMG} classId={classId} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-slate-700">No books found</h3>
            <p className="text-slate-400">Content for this class is coming soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Sub-Component: Book Card ---
const BookCard = ({ book, placeholder, classId }) => {
  const [imgSrc, setImgSrc] = useState(book.image);

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 ease-out border border-slate-200/60 overflow-hidden hover:-translate-y-2">

      {/* Subject Badge (Top Left) */}
      {book.subject && (
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 text-[10px] font-bold tracking-wide text-white uppercase bg-blue-600/90 backdrop-blur-sm rounded-md shadow-sm">
            {book.subject}
          </span>
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-100">
        <img
          src={imgSrc}
          alt={book.title}
          onError={() => setImgSrc(placeholder)} // Fallback logic
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <Link
            to={`/class/${classId}/read/${book.subject || "General"}`}
            className="bg-white text-slate-900 text-xs font-bold py-2 px-4 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            Read Now
          </Link>
        </div>
      </div>

      {/* Title & Info */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-white relative z-20">
        <div>
          <h3 className="text-sm font-bold text-slate-800 leading-snug line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
            {book.title}
          </h3>
          <p className="text-xs text-slate-400">Bihar Board</p>
        </div>
      </div>
    </div>
  );
};

export default Books;