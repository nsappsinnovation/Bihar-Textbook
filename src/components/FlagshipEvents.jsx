import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import events from "../data/events.json";

export default function FlagshipEvent() {
  const CARD_WIDTH = 332; // 300 + 32 gap
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === "next" ? CARD_WIDTH : -CARD_WIDTH;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-[#fcfcfd] pt-12 pb-6 px-6 md:px-12 lg:px-24 font-sans text-slate-900 border-t border-slate-100 overflow-hidden relative">
      <div className="max-w-[1280px] mx-auto">

        {/* --- Minimal Header --- */}
        <div className="max-w-2xl mb-3">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-6 bg-blue-500"></div>
            <span className="text-[9px] font-bold text-blue-500 uppercase tracking-[0.2em]">Latest Initiatives</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-4 leading-tight">
            Connecting Communities <br /> Through <span className="text-slate-400">Collaborative Learning</span>
          </h2>
          <p className="text-base text-slate-500 font-normal leading-relaxed">
            A centralized hub for tracking workshops, curriculum updates, and student-focused initiatives across the state.
          </p>
        </div>

        {/* --- Minimal Navigation --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-6">
            <button className="pb-6 -mb-6 text-xs font-semibold text-blue-600 relative">
              All Initiatives
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>
            </button>
           
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => scroll("prev")}
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all active:scale-95 shadow-sm"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("next")}
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all active:scale-95 shadow-sm"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* --- Scrollable Content --- */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide relative flex gap-8 pb-6 scroll-smooth snap-x snap-mandatory"
        >
          {events.map((item, i) => (
            <div
              key={item.id}
              className="w-[300px] flex-shrink-0 group cursor-default snap-start"
            >
              <Link to= {item.link || `/events/${item.id}`} className="block">
                <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden mb-5 bg-slate-100 group-hover:shadow-lg transition-all duration-300">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-all duration-700 opacity-95 blur-[0.5px] brightness-95 group-hover:opacity-100 group-hover:blur-0 group-hover:brightness-100 group-hover:scale-105"
                    style={{ willChange: 'transform, filter, opacity' }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 bg-white/90 backdrop-blur-md rounded-full text-[8px] font-bold text-slate-600 uppercase tracking-wider shadow-sm border border-white/20">
                      {item.tag}
                    </span>
                  </div>
                </div>
              </Link>

              <div className="flex-1">
                <div className="flex items-center gap-2 text-[9px] font-bold text-blue-500 uppercase tracking-widest mb-2">
                  <Calendar size={11} strokeWidth={2.5} />
                  <span>{item.year || "2026 Initiative"}</span>
                </div>

              <Link to={item.link || `/events/${item.id}`}>
                  <h3 className="text-lg font-semibold text-slate-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                </Link>

                <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2 mb-3">
                  {item.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-400">
                    <MapPin size={11} />
                    <span>{item.region || "State-wide"}</span>
                  </div>
                  <Link
                     to={item.link || `/events/${item.id}`}
                    className="flex items-center gap-1 text-blue-600 text-[10px] font-bold group-hover:gap-2 transition-all"
                  >
                    DETAIL <ArrowUpRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {/* Spacer for right padding */}
          <div className="w-10 shrink-0" />
        </div>

        
      </div>
    </section>
  );
}
