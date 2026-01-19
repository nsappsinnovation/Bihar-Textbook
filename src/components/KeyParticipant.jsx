import { useState, useRef } from "react";
import { Link } from "react-router-dom";

const industryData = [
  {
    name: "Shri Nitish Kumar",
    role: "Hon'ble Chief Minister, Bihar",
    image: "/profile.png",
  },
  {
    name: "Shri Samrat Choudhary",
    role: "Hon'ble Deputy Chief Minister, Bihar",
    image: "/profile.png",
  },
  {
    name: "Shri Vijay Kumar Chaudhary",
    role: "Minister of Education, Bihar",
    image: "/profile.png",
  },
  {
    name: "S. Siddharth",
    role: "Additional Chief Secretary, Education Department",
    image: "/profile.png",
  },
];

const academiaData = [
  {
    name: "Anand Kumar",
    role: "Founder, Super 30 & Mathematician",
    image: "/profile.png",
  },
  {
    name: "HC Verma",
    role: "Renowned Physicist & Educator, IIT Kanpur (Born in Bihar)",
    image: "/profile.png",
  },
  {
    name: "Prof. Girish Kumar Choudhary",
    role: "Vice Chancellor, Patna University",
    image: "/profile.png",
  },
  {
    name: "Abhayanand",
    role: "Former DGP Bihar & Co-founder of Super 30",
    image: "/profile.png",
  },
];

export default function KeyParticipant() {
  const [tab, setTab] = useState("industry");
  const data = tab === "industry" ? industryData : academiaData;
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 350; // Approx card width
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="bg-[#f8f9fa] py-16 px-6 font-sans">
      <div className="max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <p className="uppercase tracking-widest text-xs font-bold text-gray-500 mb-2">
            KEY PARTICIPANTS
          </p>

          <div className="flex flex-col md:flex-row justify-between items-end gap-4">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] leading-tight">
              Leading the Way in <span className="bg-gradient-to-r from-[#332F82] to-[#a87b3e] bg-clip-text text-transparent">Educational Excellence</span>
            </h2>

            <div className="flex items-center gap-4">
              {/* Navigation Arrows */}
              <div className="flex gap-2">
                <button
                  onClick={() => scroll("left")}
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-[#332F82] hover:bg-gray-50 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-[#332F82] hover:bg-gray-50 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>

              <Link
                to="/key-participants"
                className="px-6 py-3 bg-[#332F82] text-white text-sm font-semibold rounded-md hover:bg-[#262266] transition-colors shadow-lg flex items-center gap-2"
              >
                View All
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-200 mb-8">
          <button
            onClick={() => setTab("industry")}
            className={`pb-3 text-sm font-bold tracking-wide transition-all ${tab === "industry"
              ? "text-[#332F82] border-b-2 border-[#332F82]"
              : "text-gray-400 hover:text-gray-600"
              }`}
          >
            Leadership
          </button>
          <button
            onClick={() => setTab("academia")}
            className={`pb-3 text-sm font-bold tracking-wide transition-all ${tab === "academia"
              ? "text-[#332F82] border-b-2 border-[#332F82]"
              : "text-gray-400 hover:text-gray-600"
              }`}
          >
            Visionaries & Educators
          </button>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-8 snap-x scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {data.map((item, i) => (
            <div key={i} className="min-w-[300px] md:min-w-[350px] snap-center">
              <ParticipantCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section >
  );
}

function ParticipantCard({ item }) {
  return (
    <div
      className="
        group relative h-[400px] w-full overflow-hidden
        rounded-3xl bg-white
        shadow-sm border border-gray-100
        transition-all duration-300 hover:shadow-xl
      "
    >
      {/* ===== TEXT CONTENT (Top Left) ===== */}
      <div className="relative z-20 p-6 text-left transition-colors duration-300">
        <h3 className="text-xl font-bold text-[#1a1a1a] leading-tight group-hover:text-white transition-colors duration-300">
          {item.name}
        </h3>
        <p className="mt-2 text-sm text-gray-500 font-medium leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
          {item.role}
        </p>
      </div>

      {/* ===== CURVED BACKGROUND (Bottom) ===== */}
      <div
        className="
          absolute bottom-0 left-0 right-0
          h-[180px] bg-[#332F82]
          rounded-t-[80%] scale-x-125
          z-0
          transition-all duration-500 ease-in-out
          group-hover:h-full group-hover:scale-x-100 group-hover:rounded-none
        "
      />

      {/* ===== IMAGE (Bottom Center) ===== */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end z-10 w-full h-full pointer-events-none overflow-hidden rounded-3xl">
        <img
          src={item.image}
          alt={item.name}
          className="
            h-[350px] absolute top-32 w-auto object-contain object-bottom
            transform transition-transform duration-500
            scale-110 group-hover:scale-125 group-hover:-translate-y-4
            drop-shadow-2xl
          "
        />
      </div>
    </div>
  );
}

