import { useState, useRef } from "react";
import { Link } from "react-router-dom";

const industryData = [
  {
    name: "Shri Samrat Choudhary",
    role: "Hon'ble Chief Minister, Bihar",
    image: "/images/KeyParticipants/samrat.png",
  },
  {
    name: "Shri Sunil Kumar",
    role: "Hon'ble Education Minister, Bihar",
    image: "/images/KeyParticipants/Sunil-Kumar.png",
  },
  {
    name: "Shri Dr. B. Rajender, IAS",
    role: "Additional Chief Secretary, Education Department",
    image: "/images/KeyParticipants/B.Rajendra.png",
  },
  {
    name: "Shri Yatendra Kumar Pal, IAS",
    role: "Managing Director, Bihar State Text Book Publishing Corporation (BSTBPC)",
    image: "/images/KeyParticipants/shri_yatendra_pal.png",
  },
];

const academiaData = [
  {
    name: "Anand Kumar",
    role: "Founder, Super 30 & Mathematician",
    image: "/images/KeyParticipants/Anand kumar pic.png",
  },
  {
    name: "HC Verma",
    role: "Renowned Physicist & Educator, IIT Kanpur (Born in Bihar)",
    image: "/images/KeyParticipants/hc-verma-pic.png",
  },
  {
    name: "Prof. Girish Kumar Choudhary",
    role: "Vice Chancellor, Patna University",
    image: "/images/KeyParticipants/girish_kumar_choudhary.png",
  },
  {
    name: "Abhayanand",
    role: "Former DGP Bihar & Co-founder of Super 30",
    image: "/images/KeyParticipants/abhyanand.png",
  },
];

export default function KeyParticipant() {
  const [tab, setTab] = useState("industry");
  const scrollRef = useRef(null);

  const [allData, setAllData] = useState(() => {
    const saved = localStorage.getItem('website_leaders_v3');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      ...industryData.map(i => ({...i, tag: 'LEADERSHIP'})),
      ...academiaData.map(a => ({...a, tag: 'VISIONARIES'}))
    ];
  });

  const industryList = allData.filter(d => d.tag === 'LEADERSHIP');
  const academiaList = allData.filter(d => d.tag === 'VISIONARIES' || d.tag === 'EDUCATORS');
  const data = tab === "industry" ? industryList : academiaList;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 320; // Approx card width
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="bg-[#f8f9fa] py-14 px-6 font-sans">
      <div className="max-w-[1400px] mx-auto">
        {/* --- Minimalist Header (Matching FlagshipEvents) --- */}
        <div className="max-w-[1280px] mx-auto mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-indigo-500"></div>
              <span className="text-[9px] font-bold text-blue-500 uppercase tracking-[0.2em]">Leadership & Academia</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6">
              Leading the Way in <br />
              <span className="text-slate-400">Educational Excellence</span>
            </h2>
            <p className="text-base text-slate-500 font-normal leading-relaxed">
              Meet the visionary leaders and esteemed educators shaping the future of learning in Bihar.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end gap-4 mt-8 md:-mt-12">
            <div></div> {/* Spacer for grid alignment if needed */}
            <div className="flex items-center gap-4">
              {/* Navigation Arrows */}
              <div className="flex gap-3">
                <button
                  onClick={() => scroll("left")}
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>

              <Link
                to="/key-participants"
                className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200 flex items-center gap-2 uppercase tracking-tight"
              >
                View All
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto">
          {/* Tabs */}
          <div className="flex gap-8 border-b border-gray-200 mb-6">
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
            className="flex overflow-x-auto gap-5 pb-6 snap-x scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {data.map((item, i) => (
              <div key={i} className="min-w-[280px] md:min-w-[310px] snap-center">
                <ParticipantCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function ParticipantCard({ item }) {
  return (
    <div
      className="
        group relative h-[390px] overflow-hidden cursor-pointer
        rounded-2xl bg-white border border-gray-100
      "
    >
      {/* BLUE BACKGROUND */}
      <div
        className="
          absolute inset-0 bg-[#332F82]
          transition-[clip-path] duration-1500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          z-0
          [clip-path:ellipse(75%_50%_at_50%_100%)]
          group-hover:[clip-path:ellipse(180%_180%_at_50%_50%)]
        "
      />

      {/* TEXT */}
      <div className="relative z-20 p-5">
        <h3
          className="
            text-lg font-bold text-[#1a1a1a] leading-snug
            transition-colors duration-300
            group-hover:text-white
          "
        >
          {item.name}
        </h3>

        <p
          className="
            mt-2 text-[13px] leading-relaxed text-gray-500 font-medium
            transition-colors duration-300
            group-hover:text-indigo-100
          "
        >
          {item.role}
        </p>
      </div>

      {/* IMAGE FIXED TO CARD BOTTOM */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex h-[285px] items-end justify-center px-0">
        <img
          src={item.image}
          alt={item.name}
          className="
            block h-[270px] max-w-full object-contain object-bottom drop-shadow-2xl
            transition-transform duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:scale-105
            group-hover:translate-y-0
            origin-bottom
          "
        />
      </div>
    </div>
  );
}
