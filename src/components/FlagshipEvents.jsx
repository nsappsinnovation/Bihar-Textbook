import React, { useState } from "react";

const events = [
  {
    title: "e-Lotani: Digital Books Portal",
    description:
      "Access all Bihar state textbooks digitally through our comprehensive e-learning platform.",
    image:
      "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f",
  },
  {
    title: "Bihar State Pustak Mela",
    description:
      "An annual event bringing students, publishers, and educators together for a literary feast.",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8",
  },
  {
    title: "Mobile Library Initiative",
    description:
      "Taking books to the remotest corners of Bihar via our state-of-the-art mobile library units.",
    image:
      "https://i.dawn.com/primary/2020/11/5fa1c8942bb12.jpg",
  },
  {
    title: "Curriculum Modernization Expo",
    description:
      "A showcase of modern pedagogies and interactive textbooks for the 21st-century learner.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  },
  {
    title: "Interactive E-Books",
    description:
      "Engaging digital versions of textbooks with interactive elements for enhanced learning.",
    image: "https://pdcentrallibrary.home.blog/wp-content/uploads/2020/02/e-books.png",
  },
];

export default function FlagshipEvent() {
  const [index, setIndex] = useState(0);

  const CARD_WIDTH = 384; // card width + gap
  const VISIBLE = 3;
  const maxIndex = Math.max(0, events.length - VISIBLE);

  const prev = () => setIndex((i) => Math.max(i - 1, 0));
  const next = () => setIndex((i) => Math.min(i + 1, maxIndex));

  return (
    <section className="w-full bg-white py-20 font-sans">
      {/* HEADER */}
      <div className="max-w-[1400px] mx-auto px-6 mb-14">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 bg-gray-400 rounded-full" />
          <p className="uppercase tracking-widest text-sm font-bold text-gray-500">
            Flagship Events
          </p>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
          Flagship Initiatives Transforming
          <br />
          <span className="bg-gradient-to-r from-[#332F82] to-[#a87b3e] bg-clip-text text-transparent">
            the Learning Landscape in Bihar
          </span>
        </h2>
      </div>

      {/* CAROUSEL */}
      <div className="relative max-w-[1400px] mx-auto px-6">
        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${index * CARD_WIDTH}px)` }}
          >
            {events.map((item, i) => (
              <div
                key={i}
                className="w-[360px] flex-shrink-0 bg-[#F3F4F8] rounded-3xl p-4 h-[440px] flex flex-col"
              >
                <div className="relative h-[210px] rounded-2xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#332F82]/80 to-[#a87b3e]/80 mix-blend-multiply" />
                </div>

                <div className="flex flex-col flex-grow px-2 pt-6 pb-4">
                  <h3 className="text-lg font-bold mb-3 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-6 line-clamp-3">
                    {item.description}
                  </p>

                  <button className="mt-auto text-[#332F82] text-sm font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONTROLS */}
        <div className="flex justify-center items-center gap-8 mt-10">
          <button
            onClick={prev}
            disabled={index === 0}
            className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-[#332F82]
            disabled:opacity-40 hover:bg-[#332F82] hover:text-white transition"
          >
            ‹
          </button>

          <div className="flex gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <span
                key={i}
                className={`h-3 rounded-full transition-all duration-300 ${i === index
                  ? "w-10 bg-[#332F82]"
                  : "w-3 bg-gray-300"
                  }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={index === maxIndex}
            className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-[#332F82]
            disabled:opacity-40 hover:bg-[#332F82] hover:text-white transition"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
