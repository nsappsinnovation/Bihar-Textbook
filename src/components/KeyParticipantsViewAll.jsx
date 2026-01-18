import { useState } from "react";

const allParticipants = [
    {
        name: "Shri Nitish Kumar",
        category: "Leadership",
        image: "/Avatar.jpg",
        description: "Hon'ble Chief Minister of Bihar, guiding the state towards educational excellence."
    },
    {
        name: "Shri Samrat Choudhary",
        category: "Leadership",
        image: "/Avatar.jpg",
        description: "Hon'ble Deputy Chief Minister of Bihar."
    },
    {
        name: "Shri Vijay Kumar Chaudhary",
        category: "Leadership",
        image: "/Avatar.jpg",
        description: "Minister of Education, Bihar, overseeing the state's literacy mission."
    },
    {
        name: "S. Siddharth",
        category: "Leadership",
        image: "/Avatar.jpg",
        description: "Additional Chief Secretary, Education Department, Bihar."
    },
    {
        name: "Anand Kumar",
        category: "Visionaries",
        image: "/Avatar.jpg",
        description: "Founder of Super 30, world-renowned mathematician."
    },
    {
        name: "HC Verma",
        category: "Visionaries",
        image: "/Avatar.jpg",
        description: "Renowned physicist and educator, known for concepts of physics."
    },
];

export default function KeyParticipantViewAll() {
    const [filter, setFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const filtered = allParticipants.filter((p) => {
        const matchesCategory = filter === "All" || p.category === filter;
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <section className="min-h-screen bg-[#f6f6f9]">
            {/* TOP BANNER */}
            <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 py-20 text-center">
                <p className="uppercase tracking-widest text-xs  font-semibold text-orange-300">
                    Our Leadership & Visionaries
                </p>
                <h1 className="mt-4 text-3xl md:text-5xl font-semibold text-white">
                    Guiding the Future of Education in Bihar
                </h1>
            </div>

            {/* CONTENT */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                {/* Search and Filters Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-b border-gray-200 pb-4">

                    {/* Search Bar (Left) */}
                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Search participants..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>

                    {/* Filters (Right) */}
                    <div className="flex flex-wrap gap-6 text-sm font-bold">
                        {["All", "Leadership", "Visionaries"].map((item) => (
                            <button
                                key={item}
                                onClick={() => setFilter(item)}
                                className={`pb-2 border-b-2 transition uppercase tracking-wide ${filter === item
                                    ? "text-indigo-900 border-indigo-900"
                                    : "text-gray-400 border-transparent hover:text-gray-600"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
                    {filtered.map((p, i) => (
                        <div key={i} className="flex flex-col">
                            {/* Image Container */}
                            <div className="overflow-hidden rounded-[2rem] mb-6 shadow-sm">
                                <img
                                    src={p.image}
                                    alt={p.name}
                                    className="w-full aspect-[4/5] object-cover object-top"
                                />
                            </div>

                            {/* Details Section (Below Image) */}
                            <div className="flex flex-col items-start">
                                {/* Category Tag */}
                                <span className="mb-3 px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold uppercase tracking-wider rounded-md">
                                    {p.category}
                                </span>

                                {/* Name */}
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {p.name}
                                </h3>

                                {/* Placeholder Description */}
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {p.description}
                                </p>
                            </div>
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="col-span-full text-center py-20 text-gray-500">
                            No participants found matching your search.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
