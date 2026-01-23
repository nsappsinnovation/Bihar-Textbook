import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiSearch, FiDownload, FiBook, FiFilter } from "react-icons/fi";
import data from "./Book.json";
import BookReader from "../components/BookReader";

const Books = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const classData = data.classes.find((cls) => cls.id === Number(classId));

  useEffect(() => {
    if (classData) {
      let filtered = classData.books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredBooks(filtered);
    }
  }, [searchTerm, classData]);

  if (!classData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-3xl font-bold text-gray-800 mb-2">Invalid Class</p>
          <button
            onClick={() => navigate("/")}
            className="text-orange-600 hover:text-orange-700 font-semibold"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  if (selectedBook) {
    return (
      <BookReader
        book={selectedBook}
        classData={classData}
        onBack={() => setSelectedBook(null)}
      />
    );
  }

  // Get unique languages
  const languages = [...new Set(classData.books.map((book) => book.language))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* HERO SECTION - PROFESSIONAL */}
      <section className="relative bg-gradient-to-r from-[#062d47] via-[#0f4a7e] to-[#062d47] text-white py-16 px-6 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 400">
            <circle cx="200" cy="100" r="150" fill="white" />
            <circle cx="1000" cy="300" r="200" fill="white" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-800 p-3 rounded-lg">
              <FiBook className="text-white text-3xl" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold">{classData.name}</h1>
          </div>
          <p className="text-blue-100 text-lg max-w-2xl">
            Explore comprehensive textbooks and learning materials for{" "}
            {classData.name}. Access all subjects with interactive reading
            experience.
          </p>
        </div>
      </section>

      {/* SEARCH & FILTER SECTION - MODERN */}
      <section className="sticky top-0 z-40 bg-white shadow-lg border-b-2 border-blue-300">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            {/* SEARCH BAR */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔍 Search Books
              </label>
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="E.g., English, Hindi, Mathematics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-700 focus:ring-2 focus:ring-blue-300 outline-none transition-all text-gray-800 placeholder-gray-500"
                />
              </div>
            </div>
          </div>

          {/* RESULTS COUNT */}
          <div className="mt-4 text-sm text-gray-600 font-medium">
            📖 Found{" "}
            <span className="font-bold text-blue-700">
              {filteredBooks.length}
            </span>{" "}
            {filteredBooks.length === 1 ? "book" : "books"}
          </div>
        </div>
      </section>

      {/* BOOKS GRID SECTION */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-gray-100"
                >
                  {/* BOOK IMAGE CONTAINER */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-blue-200 to-blue-100 h-72">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
                    />
                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* LANGUAGE BADGE */}
                    <div className="absolute top-3 right-3 bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {book.language}
                    </div>
                  </div>

                  {/* BOOK INFO */}
                  <div className="p-5">
                    <h3 className="text-base font-bold text-gray-800 mb-3 line-clamp-2 h-12 flex items-start">
                      {book.title}
                    </h3>

                    {/* BUTTONS */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedBook(book)}
                        className="flex-1 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-bold py-2.5 px-3 rounded-xl transition-all duration-300 text-sm shadow-md hover:shadow-lg active:scale-95"
                      >
                        📖 Read
                      </button>
                      <button className="bg-blue-200 hover:bg-blue-300 text-blue-700 hover:text-blue-800 font-bold py-2.5 px-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md active:scale-95">
                        <FiDownload className="text-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-gradient-to-b from-gray-50 to-white rounded-2xl border-2 border-dashed border-gray-300">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-3xl font-bold text-gray-800 mb-2">
                No Books Found
              </p>
              <p className="text-gray-600 text-lg">
                Try adjusting your search or filter criteria
              </p>
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterLanguage("all");
                  }}
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* FOOTER INFO */}
      <section className="bg-gradient-to-r from-blue-950 to-blue-900 text-white py-8 px-6 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">
            💡 Tip: Use the search bar to find specific subjects or book titles
          </p>
        </div>
      </section>
    </div>
  );
};

export default Books;
