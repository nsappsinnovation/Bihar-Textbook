import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { flagshipEvents } from "../data/flagshipEventsData";

export default function FlagshipEvent() {
  const [index, setIndex] = useState(0);

  // Card width(380) + gap(32)
  const CARD_WIDTH = 412;
  const VISIBLE = 3;
  const maxIndex = Math.max(0, flagshipEvents.length - VISIBLE);

  const prev = () => setIndex((i) => Math.max(i - 1, 0));
  const next = () => setIndex((i) => Math.min(i + 1, maxIndex));

  return (
    <section className="w-full bg-[#fcfcfd] py-24 px-6 md:px-12 lg:px-24 font-sans text-slate-900 border-t border-slate-100 overflow-hidden">
      {/* --- Minimalist Header (Matching EventsSection) --- */}
      <div className="max-w-[1280px] mx-auto mb-16">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-indigo-500"></div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em]">Flagship Programs</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6">
            Transforming the <span className="text-slate-400">Learning Landscape</span> <br /> In Bihar
          </h2>
          <p className="text-lg text-slate-500 font-normal leading-relaxed">
            Scalable initiatives designed to bring high-quality educational resources to every student across the state.
          </p>
        </div>

        {/* --- Carousel Controls --- */}
        <div className="flex items-center justify-end gap-3 mt-8 md:-mt-12">
          <button
            onClick={prev}
            disabled={index === 0}
            className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-600 disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-400 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            disabled={index === maxIndex}
            className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-600 disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-400 transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* --- Minimalist Carousel --- */}
      <div className="max-w-[1280px] mx-auto overflow-hidden relative">
        <motion.div
          animate={{ x: -index * CARD_WIDTH }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="flex gap-8"
        >
          {flagshipEvents.map((item, i) => (
            <div
              key={i}
              className="w-[380px] flex-shrink-0 group cursor-default"
            >
              <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden mb-6 bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-bold text-slate-600 uppercase tracking-wider shadow-sm border border-white/20">
                    {item.tag}
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-3">
                  <div className="w-4 h-px bg-indigo-500"></div>
                  <span>Initiative {i + 1}</span>
                </div>

                <h3 className="text-xl font-semibold text-slate-900 leading-tight mb-2 group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2 mb-4">
                  {item.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <Link 
                    to={`/flagship-events/${item.id}`}
                    className="text-indigo-600 text-[11px] font-bold hover:gap-2 transition-all flex items-center gap-1.5 uppercase tracking-wider"
                  >
                    Learn More <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* --- Pagination Indicator --- */}
      <div className="flex justify-center mt-12 gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-indigo-600" : "w-1.5 bg-slate-200"}`}
          />
        ))}
      </div>
    </section>
  );
}

