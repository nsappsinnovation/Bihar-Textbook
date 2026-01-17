import { useState, useRef } from "react";
import { Link } from "react-router-dom";

const industryData = [
  {
    name: "Jensen Huang",
    role: "Founder and CEO, NVIDIA",
    image: "https://impact.indiaai.gov.in/wp-content/uploads/2024/07/Jensen-Huang.png",
  },
  {
    name: "Nandan Nilekani",
    role: "Co-Founder and Chairman, Infosys Technologies Limited",
    image: "https://impact.indiaai.gov.in/wp-content/uploads/2024/06/Nandan-Nilekani.png",
  },
  {
    name: "Rishad Premji",
    role: "Executive Chairman, Wipro Limited",
    image: "https://impact.indiaai.gov.in/wp-content/uploads/2024/06/Rishad-Premji.png",
  },
  {
    name: "Dr. P. Anandan",
    role: "Former MD, Microsoft Research",
    image: "https://impact.indiaai.gov.in/wp-content/uploads/2024/06/Dr-P-Anandan.png",
  },
];

const academiaData = [
  {
    name: "Prof. Yoshua Bengio",
    role: "Full Professor, Department of Computer Science and Operations Research, Université de Montréal",
    image: "https://impact.indiaai.gov.in/wp-content/uploads/2024/07/Yoshua-Bengio.png",
  },
  {
    name: "Prof. Yejin Choi",
    role: "Professor, Paul G. Allen School of Computer Science & Engineering at the University of Washington",
    image: "https://impact.indiaai.gov.in/wp-content/uploads/2024/07/Yejin-Choi.png",
  },
  {
    name: "Prof. Yann LeCun",
    role: "VP & Chief AI Scientist, Meta",
    image: "https://impact.indiaai.gov.in/wp-content/uploads/2024/07/Yann-LeCun.png",
  },
  {
    name: "Prof. Fei-Fei Li",
    role: "Sequoia Professor, Computer Science Department, Stanford University",
    image: "https://impact.indiaai.gov.in/wp-content/uploads/2024/07/Fei-Fei-Li.png",
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
              Visionaries on the <span className="bg-gradient-to-r from-[#332F82] to-[#a87b3e] bg-clip-text text-transparent">Global Stage</span>
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
            Industry
          </button>
          <button
            onClick={() => setTab("academia")}
            className={`pb-3 text-sm font-bold tracking-wide transition-all ${tab === "academia"
              ? "text-[#332F82] border-b-2 border-[#332F82]"
              : "text-gray-400 hover:text-gray-600"
              }`}
          >
            Academia & Civil Society
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
    </section>
  );
}

function ParticipantCard({ item }) {
  return (
    <div
      className="
        group relative h-[420px] overflow-hidden cursor-pointer
        rounded-2xl bg-white border border-gray-100
        shadow-sm hover:shadow-2xl transition-shadow duration-300
      "
    >
      {/* ===== SMOOTH EXPANDING BACKGROUND (CLIP-PATH BASED) ===== */}
      <div
        className="
          absolute inset-0 bg-[#332F82]
          transition-[clip-path] duration-2000
          ease-[cubic-bezier(0.22,1,0.36,1)]
          z-0
          [clip-path:ellipse(60%_35%_at_50%_100%)]
          group-hover:[clip-path:ellipse(150%_150%_at_50%_50%)]
        "
      />

      {/* ===== CONTENT ===== */}
      <div className="relative z-20 p-6">
        <h3
          className="
            text-xl font-bold text-[#1a1a1a]
            transition-colors duration-300 delay-100
            group-hover:text-white
          "
        >
          {item.name}
        </h3>

        <p
          className="
            mt-2 text-sm text-gray-500 font-medium
            transition-colors duration-300 delay-150
            group-hover:text-indigo-100
          "
        >
          {item.role}
        </p>
      </div>

      {/* ===== IMAGE ===== */}
      <div className="relative z-20 mt-auto flex h-[300px] items-end justify-center">
        <img
          src={item.image}
          alt={item.name}
          className="
            h-[280px] object-contain drop-shadow-2xl
            transition-transform duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:scale-110
            group-hover:-translate-y-2
            origin-bottom
          "
        />
      </div>
    </div>
  );
}

