import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";

const row1 = [
  "Startups & Entrepreneurs",
  "Academia & Research Institutions",
  "Industry Leaders & CEOs",
  "Heads Of State & Government Leaders",
];

const row2 = [
  "Youth & Student Innovators",
  "Women Leaders In AI",
  "Technology Practitioners & Developers",
  "Media & Thought Leaders",
  "Investors & Venture Capitalists",
];

export default function StakeHolder() {
  const Button = ({ text }) => (
    <div className="inline-block px-6 py-4 rounded-xl text-sm md:text-base font-medium text-white
      bg-white/10 backdrop-blur-md border border-white/15
      transition-colors duration-300
      hover:bg-gradient-to-r hover:from-indigo-500 hover:to-orange-400
      whitespace-nowrap">
      {text}
    </div>
  );

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#1a1f4a] via-[#0e1233] to-[#06081f] py-24 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.35),transparent_65%)]" />

      <div className="relative max-w-7xl mx-auto text-center mb-16">
        <p className="uppercase tracking-[0.3em] text-xs text-white">
          Global Participants & Stakeholders
        </p>
        <h2 className="mt-5 text-3xl md:text-5xl font-bold text-white">
          Uniting Minds from Across the World to <br />
          <span className="text-indigo-300">Shape AI for Good</span>
        </h2>
      </div>

      {/* ROW 1 */}
      <Swiper
        modules={[Autoplay, FreeMode]}
        slidesPerView="auto"
        spaceBetween={24}
        loop
        freeMode
        freeModeMomentum={false}
        speed={6000}
        autoplay={{ delay: 0, disableOnInteraction: false }}
        allowTouchMove={false}
      >
        {[...row1, ...row1, ...row1].map((item, i) => (
          <SwiperSlide key={i} className="!w-auto">
            <Button text={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="h-10" />

      {/* ROW 2 */}
      <Swiper
        modules={[Autoplay, FreeMode]}
        slidesPerView="auto"
        spaceBetween={24}
        loop
        freeMode
        freeModeMomentum={false}
        speed={6000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: true,
        }}
        allowTouchMove={false}
      >
        {[...row2, ...row2].map((item, i) => (
          <SwiperSlide key={i} className="!w-auto">
            <Button text={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#06081f] to-transparent pointer-events-none" />
    </section>
  );
}
