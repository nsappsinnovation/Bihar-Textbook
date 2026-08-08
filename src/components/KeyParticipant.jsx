import { useState, useRef } from "react";
import { Link } from "react-router-dom";

const industryData = [
  {
    name: "Shri Samrat Choudhary",
    role: "Hon'ble Chief Minister, Bihar",
    image: "/images/KeyParticipants/samrat.webp",
  },
  {
    name: "Shri Mithilesh Tiwari",
    role: "Hon'ble Education Minister, Bihar",
    image: "/images/KeyParticipants/sri_mithlesh.webp",
  },
  {
    name: "Shri Vinod Singh Gunjiyal",
    role: "Secretary, Education Department",
    image: "/images/KeyParticipants/sri-vinod.webp",
  },
  {
    name: "Shri Yatendra Kumar Pal, IAS",
    role: "Managing Director, BSTBPC",
    image: "/images/KeyParticipants/shri_yatendra_pal.webp",
  },
];



export default function KeyParticipant() {

  const [allData, setAllData] = useState(() => {
    const saved = localStorage.getItem('website_leaders_v3');
    if (saved) {
      try {
        let parsed = JSON.parse(saved);
        let updated = false;
        parsed = parsed.map(item => {
          let name = item.name ? item.name.replace(/^Sri\b/gi, 'Shri') : item.name;
          if (name === "Shri Sunil Kumar") {
            updated = true;
            return {
              ...item,
              name: "Shri Mithilesh Tiwari",
              role: "Hon'ble Education Minister, Bihar",
              image: "/images/KeyParticipants/sri_mithlesh.webp"
            };
          }
          if (name === "Shri Dr. B. Rajender, IAS" || name === "Dr. B. Rajender") {
            updated = true;
            return {
              ...item,
              name: "Shri Vinod Singh Gunjiyal",
              role: "Secretary, Education Department",
              image: "/images/KeyParticipants/sri-vinod.webp"
            };
          }
          if (item.name !== name) {
            updated = true;
            return { ...item, name };
          }
          return item;
        });
        if (updated) {
          localStorage.setItem('website_leaders_v3', JSON.stringify(parsed));
        }
        return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return industryData.map(i => ({...i, tag: 'LEADERSHIP'}));
  });

  const data = allData.filter(d => d.tag === 'LEADERSHIP');

  return (
    <section id="key-participants" className="bg-[#f8f9fa] py-14 px-6 font-sans">
      <div className="max-w-[1400px] mx-auto">
        {/* --- Minimalist Header (Matching FlagshipEvents) --- */}
        <div className="max-w-[1280px] mx-auto mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-6 bg-blue-600"></div>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">Leadership</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4 leading-tight">
              Leading The Way <br />
              <span className="text-slate-400 font-medium">In Educational Excellence</span>
            </h2>
            <p className="text-sm text-slate-500 font-medium leading-relaxed mb-4">
              Meet the visionary leaders shaping the future of learning in Bihar.
            </p>
          </div>


        </div>

        <div className="max-w-[1280px] mx-auto">
          {/* Grid View */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pb-6">
            {data.map((item, i) => (
              <div key={i} className="w-full">
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
  const isMithilesh = item.name === "Sri Mithilesh Tiwari" || item.name === "Shri Mithilesh Tiwari";

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
          transition-[clip-path] duration-[1800ms]
          ease-in-out
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
            transition-colors duration-[1800ms] ease-in-out
            group-hover:text-white
          "
        >
          {item.name}
        </h3>

        <p
          className="
            mt-2 text-[13px] leading-relaxed text-gray-500 font-medium
            transition-colors duration-[1800ms] ease-in-out
            group-hover:text-indigo-100
          "
        >
          {item.role}
        </p>
      </div>

      {/* IMAGE FIXED TO CARD BOTTOM */}
      <div className={`absolute bottom-0 left-0 right-0 z-20 flex ${isMithilesh ? 'h-[320px]' : 'h-[385px]'} items-end justify-center px-0`}>
        <img
          src={item.image}
          alt={item.name}
          className={`
            block ${isMithilesh ? 'h-[265px]' : 'h-[300px]'} max-w-full object-contain object-bottom drop-shadow-2xl
            transition-transform duration-[1500ms]
            ease-in-out
            group-hover:scale-105
            group-hover:translate-y-0
            origin-bottom
          `}
        />
      </div>
    </div>
  );
}
