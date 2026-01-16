import { useState } from "react";
import { Link } from "react-router-dom";

// Combined data for the full list (mock data expanded for demo)
const allParticipants = [
    {
        name: "Jensen Huang",
        role: "Founder and CEO, NVIDIA",
        image: "https://impact.indiaai.gov.in/wp-content/uploads/2024/07/Jensen-Huang.png",
        category: "Industry",
    },
    {
        name: "Nandan Nilekani",
        role: "Co-Founder and Chairman, Infosys Technologies Limited",
        image: "https://impact.indiaai.gov.in/wp-content/uploads/2024/06/Nandan-Nilekani.png",
        category: "Industry",
    },
    {
        name: "Rishad Premji",
        role: "Executive Chairman, Wipro Limited",
        image: "https://impact.indiaai.gov.in/wp-content/uploads/2024/06/Rishad-Premji.png",
        category: "Industry",
    },
    {
        name: "Dr. P. Anandan",
        role: "Former MD, Microsoft Research",
        image: "https://impact.indiaai.gov.in/wp-content/uploads/2024/06/Dr-P-Anandan.png",
        category: "Industry",
    },
    {
        name: "Prof. Yoshua Bengio",
        role: "Full Professor, Department of Computer Science and Operations Research, Université de Montréal",
        image: "https://impact.indiaai.gov.in/wp-content/uploads/2024/07/Yoshua-Bengio.png",
        category: "Academia & Civil Society",
    },
    {
        name: "Prof. Yejin Choi",
        role: "Professor, Paul G. Allen School of Computer Science & Engineering at the University of Washington",
        image: "https://impact.indiaai.gov.in/wp-content/uploads/2024/07/Yejin-Choi.png",
        category: "Academia & Civil Society",
    },
    {
        name: "Prof. Yann LeCun",
        role: "VP & Chief AI Scientist, Meta",
        image: "https://impact.indiaai.gov.in/wp-content/uploads/2024/07/Yann-LeCun.png",
        category: "Academia & Civil Society",
    },
    {
        name: "Prof. Fei-Fei Li",
        role: "Sequoia Professor, Computer Science Department, Stanford University",
        image: "https://impact.indiaai.gov.in/wp-content/uploads/2024/07/Fei-Fei-Li.png",
        category: "Academia & Civil Society",
    },
    // Add more mock participants if needed
    {
        name: "Satya Nadella",
        role: "Chairman and CEO, Microsoft",
        image: "https://impact.indiaai.gov.in/wp-content/uploads/2024/06/Satya-Nadella.png",
        category: "Industry",
    },
    {
        name: "Sundar Pichai",
        role: "CEO, Google and Alphabet",
        image: "https://impact.indiaai.gov.in/wp-content/uploads/2024/06/Sundar-Pichai.png",
        category: "Industry",
    },
];

export default function KeyParticipantsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("All");

    const filteredData = allParticipants.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.role.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === "All" || item.category === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-[#f8f9fa] pt-28 pb-20 px-4 md:px-8 font-sans">
            <div className="max-w-[1400px] mx-auto">
                {/* Breadcrumb / Back */}
                <div className="mb-8">
                    <Link to="/" className="text-[#332F82] font-semibold hover:underline flex items-center gap-2">
                        ← Back to Home
                    </Link>
                </div>

                {/* Header */}
                <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-8">
                    Key <span className="text-[#a87b3e]">Participants</span>
                </h1>

                {/* Controls */}
                <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
                    {/* Search */}
                    <div className="w-full md:w-96 relative">
                        <input
                            type="text"
                            placeholder="Search by name, designation..."
                            className="w-full pl-5 pr-12 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-[#332F82] focus:ring-1 focus:ring-[#332F82] shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Filters */}
                    <div className="flex bg-white rounded-full p-1 shadow-sm border border-gray-100">
                        {["All", "Industry", "Academia & Civil Society"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${filter === f
                                    ? "bg-[#332F82] text-white shadow-md"
                                    : "text-gray-600 hover:text-[#332F82]"
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {filteredData.map((item, i) => (
                        <ParticipantCard key={i} item={item} />
                    ))}
                </div>

                {filteredData.length === 0 && (
                    <div className="text-center py-20 text-gray-400 text-lg">
                        No participants found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
}

function ParticipantCard({ item }) {
    return (
        <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-[420px] flex flex-col cursor-pointer border border-gray-100">
            {/* Content */}
            <div className="p-6 relative z-20 transition-colors duration-300">
                <h3 className="text-xl font-bold text-[#1a1a1a] leading-tight mb-2 group-hover:text-white transition-colors duration-300">
                    {item.name}
                </h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed line-clamp-3 group-hover:text-indigo-100 transition-colors duration-300">
                    {item.role}
                </p>
            </div>

            {/* Image Container */}
            <div className="mt-auto relative w-full flex justify-center items-end h-[300px]">
                {/* Animated Background Shape */}
                <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] bg-[#332F82] transition-all duration-500 ease-in-out z-0"
                    style={{
                        height: "140px",
                        borderTopLeftRadius: "50%",
                        borderTopRightRadius: "50%",
                    }}
                >
                    {/* This expands to fill the background on hover */}
                    <style jsx>{`
            .group:hover .absolute.bg-\\[\\#332F82\\] {
              height: 100%;
              width: 100%;
              border-radius: 0;
            }
          `}</style>
                </div>

                {/* Person Image */}
                <img
                    src={item.image}
                    alt={item.name}
                    className="relative z-10 h-[280px] object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-110 origin-bottom"
                />
            </div>
        </div>
    );
}
