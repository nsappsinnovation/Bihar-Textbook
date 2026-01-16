import React, { useState } from "react";

const events = [
  {
    title: "India AI Impact Expo 2026",
    description:
      "The India AI Impact Expo 2026 for Responsible Intelligence will bring together 300+ exhibitors from India and 30+ countries across 10+ thematic pavilions.",
    image: "https://picsum.photos/seed/expo/1200/800",
  },
  {
    title: "AI For ALL: Global Impact Challenge",
    description:
      "Identifying AI solutions that enable large-scale impact. Leading solutions showcased at the India AI Impact Summit in New Delhi, February 2026.",
    image: "https://picsum.photos/seed/forall/1200/800",
  },
  {
    title: "AI by HER: Global Impact Challenge",
    description:
      "Focused on inclusive innovation and global impact, promoting gender equity and Global South innovation with scalable AI-for-good applications.",
    image: "https://picsum.photos/seed/her/1200/800",
  },
  {
    title: "Research Symposium",
    description:
      "An interdisciplinary forum bringing together leading researchers from India, the Global South, and beyond.",
    image: "https://picsum.photos/seed/research/1200/800",
  },
  {
    title: "YUVAi – Global Youth Challenge",
    description:
      "A platform for youth (13–21) to present innovative AI ideas solving real-world problems.",
    image: "https://picsum.photos/seed/yuvai/1200/800",
  },
];

export default function FlagshipEvent() {
  const [index, setIndex] = useState(0);
  const slides = events;
  const visibleCards = 3;
  const totalDots = Math.ceil(slides.length / visibleCards);

  return (
    <section className="w-full bg-white py-20 px-6">
      {/* Heading */}
      <div className="max-w-7xl mx-auto mb-14">
        <p className="uppercase text-sm tracking-widest text-gray-500">
          Flagship Events
        </p>
        <h2 className="text-4xl font-bold mt-3">
          Flagship Events that Shape the Future of
          <br />
          <span className="text-[#211fa9]">Humanity and Technology</span>
        </h2>
      </div>

      {/* Carousel */}
      <div className="relative max-w-7xl mx-auto overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${index * 100}%)`,
          }}
        >
          {slides.map((item, i) => (
            <div
              key={i}
              className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
            >
              <div className="bg-gray-100 rounded-3xl overflow-hidden h-full border border-gray-200 hover:border-gray-300 transition">
                {/* Image */}
                <figure className="overflow-hidden rounded-t-2xl border-b border-gray-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-52 object-cover"
                  />
                </figure>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-4">
                    <button className="text-[#211fa9] font-semibold hover:underline">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-10">
        {Array.from({ length: totalDots }).map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-3 rounded-full transition-all duration-300 ${
              i === index
                ? "w-8 bg-[#211fa9]"
                : "w-3 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
