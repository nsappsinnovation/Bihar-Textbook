import React, { useState } from "react";

const events = [
  {
    title: "e-Lotani: Digital Books Portal",
    description:
      "Access all Bihar state textbooks digitally through a centralized, student-friendly e-learning platform available anytime, anywhere.",
    image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f",
  },
  {
    title: "Bihar State Pustak Mela",
    description:
      "An annual flagship event bringing students, publishers, authors, and educators together to celebrate books, learning, and innovation.",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8",
  },
  {
    title: "Mobile Library Initiative",
    description:
      "Reaching the remotest corners of Bihar with mobile library vans equipped with textbooks, reference books, and digital learning kiosks.",
    image: "https://i.dawn.com/primary/2020/11/5fa1c8942bb12.jpg",
  },
  {
    title: "Curriculum Modernization Expo",
    description:
      "A platform showcasing modern pedagogies, NEP-aligned curriculum reforms, and interactive textbooks for 21st-century learners.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  },
  {
    title: "Interactive E-Books",
    description:
      "Smart digital textbooks enriched with videos, quizzes, animations, and practice exercises to enhance conceptual understanding.",
    image:
      "https://pdcentrallibrary.home.blog/wp-content/uploads/2020/02/e-books.png",
  },
  {
    title: "Audio Books for Inclusive Learning",
    description:
      "Curriculum-based audiobooks in Hindi and regional languages to support visually impaired students, slow readers, and auditory learners.",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
  },
  {
    title: "AI-Powered Learning Tutorials",
    description:
      "Personalized AI-driven tutorials that help students understand difficult concepts, revise chapters, and prepare for exams at their own pace.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
  },
  {
    title: "VR Education Tours",
    description:
      "Immersive virtual reality experiences that take students on guided tours of historical sites, science labs, museums, and geography landscapes.",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620",
  },

  {
    title: "Student Assessment & Practice Platform",
    description:
      "An integrated digital assessment system offering chapter-wise tests, instant evaluation, performance analytics, and learning recommendations.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  },
  {
    title: "Local Language & Regional Content Drive",
    description:
      "Development and promotion of textbooks, audio content, and digital resources in Hindi and regional languages to strengthen learning outcomes.",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df",
  },
  {
    title: "Digital Archive of Bihar Textbooks",
    description:
      "A long-term digital repository preserving all editions of Bihar state textbooks for academic reference, research, and policy planning.",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
  },
];

export default function FlagshipEvent() {
  const [index, setIndex] = useState(0);

  // Card width(360) + gap(24 = gap-6)
  const CARD_WIDTH = 384;
  const VISIBLE = 3;
  const maxIndex = Math.max(0, events.length - VISIBLE);

  const prev = () => setIndex((i) => Math.max(i - 1, 0));
  const next = () => setIndex((i) => Math.min(i + 1, maxIndex));

  return (
    <section className="w-full bg-white py-20 font-sans">
      {/* HEADER */}
      <div className="max-w-[1400px] mx-auto px-6 mb-14">
        {/* Subtitle with subtle animation */}
        <div
          className="flex items-center gap-3 mb-2 opacity-0 animate-[fadeSlideUp_0.8s_ease-out_forwards]"
          style={{ animationDelay: "0.2s" }}
        >
          <span className="w-2.5 h-2.5 bg-[#332F82] rounded-full animate-[pulseDot_1.8s_ease-in-out_infinite]" />
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
                className="
                  group
                  w-[360px] flex-shrink-0
                  bg-[#F3F4F8]
                  rounded-3xl
                  p-4
                  h-[440px]
                  flex flex-col
                  transition-all duration-500 ease-out
                  hover:-translate-y-2 hover:scale-[1.015]
                  hover:shadow-[0_30px_60px_-20px_rgba(51,47,130,0.35)]
                "
              >
                <div className="relative h-[210px] rounded-2xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="
                      w-full h-full object-cover
                      transition-transform duration-700 ease-out
                      group-hover:scale-110
                    "
                  />
                  <div
                    className="
                      absolute inset-0
                      bg-gradient-to-r from-[#332F82]/80 to-[#a87b3e]/80
                      mix-blend-multiply
                      transition-opacity duration-500
                      group-hover:opacity-60
                    "
                  />
                </div>

                <div className="flex flex-col flex-grow px-2 pt-6 pb-4">
                  <h3
                    className="
                      text-lg font-bold mb-3 leading-snug
                      transition-colors duration-300
                      group-hover:text-[#332F82]
                    "
                  >
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-6 line-clamp-3">
                    {item.description}
                  </p>

                  <button
                    className="
                      mt-auto
                      text-[#332F82]
                      text-sm font-semibold
                      flex items-center gap-2
                      transition-all duration-300
                      group-hover:gap-3
                    "
                  >
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
                className={`h-3 rounded-full transition-all duration-300 ${
                  i === index ? "w-10 bg-[#332F82]" : "w-3 bg-gray-300"
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

      {/* Inline CSS (so you don't forget). You can move this to index.css */}
      <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseDot {
          0%,100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.6); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
